import { NextResponse } from 'next/server';
import { getReadyDb } from '@/db/runtime';
import { decryptContact, requireAdmin } from '@/lib/auth';
import { apiError } from '@/lib/http';

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return NextResponse.json({ error: '需要管理员身份' }, { status: 403 });
    const db = await getReadyDb();
    const [users, events, attachments, counts] = await Promise.all([
      db.prepare(`SELECT u.id, u.display_name, u.role, u.status, u.created_at, c.phone_ciphertext
        FROM users u LEFT JOIN user_contacts c ON c.user_id = u.id ORDER BY u.created_at DESC LIMIT 100`).all(),
      db.prepare(`SELECT ae.id, ae.provider, ae.event_type, ae.detail, ae.created_at, u.display_name
        FROM auth_events ae LEFT JOIN users u ON u.id = ae.user_id ORDER BY ae.created_at DESC LIMIT 100`).all(),
      db.prepare(`SELECT a.id, a.filename, a.content_type, a.byte_size, a.visibility, a.created_at, u.display_name,
          p.title AS project_title, w.title AS workflow_title, i.title AS issue_title
        FROM attachments a JOIN users u ON u.id = a.owner_id
        LEFT JOIN projects p ON p.id = a.project_id LEFT JOIN workflows w ON w.id = a.workflow_id LEFT JOIN issues i ON i.id = a.issue_id
        ORDER BY a.created_at DESC LIMIT 100`).all(),
      db.batch([
        db.prepare('SELECT COUNT(*) AS total FROM users'),
        db.prepare('SELECT COUNT(*) AS total FROM projects'),
        db.prepare('SELECT COUNT(*) AS total FROM workflows'),
        db.prepare('SELECT COUNT(*) AS total FROM issues'),
        db.prepare('SELECT COUNT(*) AS total FROM attachments'),
        db.prepare('SELECT COUNT(*) AS total FROM community_posts'),
        db.prepare('SELECT COUNT(*) AS total FROM templates'),
      ]),
    ]);
    const userRows = users.results as Array<Record<string, unknown> & { phone_ciphertext?: string | null }>;
    return NextResponse.json({
      preview: admin.preview,
      counts: ['users', 'projects', 'workflows', 'issues', 'attachments', 'posts', 'templates'].reduce((result, key, index) => ({ ...result, [key]: Number((counts[index].results[0] as { total?: number } | undefined)?.total ?? 0) }), {}),
      users: await Promise.all(userRows.map(async (user) => ({ ...user, phone: await decryptContact(user.phone_ciphertext), phone_ciphertext: undefined }))),
      events: events.results,
      attachments: attachments.results,
    });
  } catch (error) {
    return apiError(error);
  }
}
