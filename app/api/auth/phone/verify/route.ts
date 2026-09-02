import { NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';
import { z } from 'zod';
import { getReadyDb } from '@/db/runtime';
import { clientIpHash, createSession, encryptContact, phoneHash, sessionCookie, stablePhoneUserId, verificationCodeHash } from '@/lib/auth';
import { apiError } from '@/lib/http';

const schema = z.object({ phone: z.string().regex(/^1[3-9]\d{9}$/), code: z.string().regex(/^\d{6}$/) });

export async function POST(request: Request) {
  try {
    const { phone, code } = schema.parse(await request.json());
    const db = await getReadyDb();
    const now = Date.now();
    const [pHash, ipHash, suppliedHash] = await Promise.all([phoneHash(phone), clientIpHash(request), verificationCodeHash(phone, code)]);
    const record = await db.prepare(`SELECT id, code_hash, attempts, expires_at FROM phone_verification_codes
      WHERE phone_hash = ? AND status = 'pending' ORDER BY created_at DESC LIMIT 1`).bind(pHash).first<{ id: string; code_hash: string; attempts: number; expires_at: number }>();
    if (!record || Number(record.expires_at) < now || Number(record.attempts) >= 5 || record.code_hash !== suppliedHash) {
      if (record) await db.prepare(`UPDATE phone_verification_codes SET attempts = attempts + 1, status = CASE WHEN attempts >= 4 THEN 'locked' ELSE status END WHERE id = ?`).bind(record.id).run();
      await db.prepare(`INSERT INTO auth_events (id, provider, event_type, ip_hash, detail, created_at) VALUES (?, 'phone', 'login_failed', ?, ?, ?)`)
        .bind(`aev_${crypto.randomUUID()}`, ipHash, JSON.stringify({ phoneTail: phone.slice(-4) }), now).run();
      return NextResponse.json({ error: '验证码错误或已失效' }, { status: 401 });
    }

    const config = env as unknown as Record<string, string | undefined>;
    const userId = await stablePhoneUserId(phone);
    const role = config.SILTOK_ADMIN_PHONE === phone ? 'admin' : 'member';
    const encryptedPhone = await encryptContact(phone);
    await db.batch([
      db.prepare(`INSERT OR IGNORE INTO users (id, display_name, phone_hash, role, status, created_at) VALUES (?, ?, ?, ?, 'active', ?)`)
        .bind(userId, `创作者 ${phone.slice(-4)}`, pHash, role, now),
      db.prepare(`UPDATE users SET role = CASE WHEN ? = 'admin' THEN 'admin' ELSE role END, status = 'active' WHERE id = ?`).bind(role, userId),
      db.prepare(`INSERT INTO user_contacts (user_id, phone_ciphertext, created_at, updated_at) VALUES (?, ?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET phone_ciphertext = excluded.phone_ciphertext, updated_at = excluded.updated_at`)
        .bind(userId, encryptedPhone, now, now),
      db.prepare(`UPDATE phone_verification_codes SET status = 'used', used_at = ? WHERE id = ?`).bind(now, record.id),
      db.prepare(`INSERT INTO auth_events (id, user_id, provider, event_type, ip_hash, detail, created_at) VALUES (?, ?, 'phone', 'login_succeeded', ?, ?, ?)`)
        .bind(`aev_${crypto.randomUUID()}`, userId, ipHash, JSON.stringify({ phoneTail: phone.slice(-4) }), now),
    ]);
    const response = NextResponse.json({ authenticated: true, user: { id: userId, displayName: `创作者 ${phone.slice(-4)}`, role } });
    response.cookies.set('siltok_session', await createSession(userId), sessionCookie);
    return response;
  } catch (error) {
    return apiError(error);
  }
}
