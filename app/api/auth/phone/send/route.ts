import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getReadyDb } from '@/db/runtime';
import { clientIpHash, phoneHash, verificationCodeHash } from '@/lib/auth';
import { apiError } from '@/lib/http';
import { sendVerificationSms, smsConfigured } from '@/lib/tencent-sms';

const schema = z.object({ phone: z.string().regex(/^1[3-9]\d{9}$/) });

function createCode() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return String(100000 + (bytes[0] % 900000));
}

export async function POST(request: Request) {
  try {
    if (!smsConfigured()) return NextResponse.json({ error: '短信服务尚未配置' }, { status: 503 });
    const { phone } = schema.parse(await request.json());
    const db = await getReadyDb();
    const now = Date.now();
    const [pHash, ipHash] = await Promise.all([phoneHash(phone), clientIpHash(request)]);
    const recentPhone = await db.prepare('SELECT created_at FROM phone_verification_codes WHERE phone_hash = ? ORDER BY created_at DESC LIMIT 1').bind(pHash).first<{ created_at: number }>();
    if (recentPhone && now - Number(recentPhone.created_at) < 60_000) return NextResponse.json({ error: '请在 60 秒后重新获取' }, { status: 429 });
    const phoneHour = await db.prepare('SELECT COUNT(*) AS total FROM phone_verification_codes WHERE phone_hash = ? AND created_at > ?').bind(pHash, now - 3_600_000).first<{ total: number }>();
    const ipHour = await db.prepare('SELECT COUNT(*) AS total FROM phone_verification_codes WHERE ip_hash = ? AND created_at > ?').bind(ipHash, now - 3_600_000).first<{ total: number }>();
    if (Number(phoneHour?.total ?? 0) >= 5 || Number(ipHour?.total ?? 0) >= 20) return NextResponse.json({ error: '请求过于频繁，请稍后再试' }, { status: 429 });

    const code = createCode();
    await sendVerificationSms(phone, code);
    const id = `otp_${crypto.randomUUID()}`;
    await db.batch([
      db.prepare(`UPDATE phone_verification_codes SET status = 'superseded' WHERE phone_hash = ? AND status = 'pending'`).bind(pHash),
      db.prepare(`INSERT INTO phone_verification_codes (id, phone_hash, ip_hash, code_hash, status, attempts, expires_at, created_at) VALUES (?, ?, ?, ?, 'pending', 0, ?, ?)`)
        .bind(id, pHash, ipHash, await verificationCodeHash(phone, code), now + 300_000, now),
      db.prepare(`INSERT INTO auth_events (id, provider, event_type, ip_hash, detail, created_at) VALUES (?, 'phone', 'otp_sent', ?, ?, ?)`)
        .bind(`aev_${crypto.randomUUID()}`, ipHash, JSON.stringify({ phoneTail: phone.slice(-4) }), now),
    ]);
    return NextResponse.json({ sent: true, expiresIn: 300 });
  } catch (error) {
    return apiError(error);
  }
}
