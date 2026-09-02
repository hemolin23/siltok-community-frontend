import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getReadyDb } from '@/db/runtime';
import { resolveActorId } from '@/lib/auth';
import { apiError } from '@/lib/http';

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const ALLOWED_VISIBILITY = new Set(['private', 'team', 'beta', 'public']);
const ALLOWED_TYPES = new Set([
  'application/json', 'application/zip', 'text/plain', 'image/jpeg', 'image/png',
  'image/webp', 'video/mp4', 'audio/mpeg', 'audio/mp4', 'audio/wav',
]);

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file');
    const entityType = String(form.get('entityType') ?? 'issue');
    const entityId = String(form.get('entityId') ?? 'unassigned');
    const visibility = String(form.get('visibility') ?? 'private');
    if (!(file instanceof File)) return NextResponse.json({ error: '请选择文件' }, { status: 400 });
    if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: '不支持该文件类型' }, { status: 415 });
    if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: '单个文件不能超过 50MB' }, { status: 413 });
    if (!['issue', 'project', 'workflow'].includes(entityType)) return NextResponse.json({ error: '附件归属无效' }, { status: 400 });
    if (!ALLOWED_VISIBILITY.has(visibility)) return NextResponse.json({ error: '附件可见范围无效' }, { status: 400 });

    const actorId = await resolveActorId(request);
    const attachmentId = `att_${crypto.randomUUID()}`;
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(-120) || 'attachment';
    const objectKey = `private/${actorId}/${entityType}/${entityId}/${attachmentId}-${safeName}`;
    await env.FILES.put(objectKey, file.stream(), { httpMetadata: { contentType: file.type } });

    const db = await getReadyDb();
    const columns = { issue: 'issue_id', project: 'project_id', workflow: 'workflow_id' } as const;
    await db.prepare(`INSERT INTO attachments
      (id, owner_id, ${columns[entityType as keyof typeof columns]}, filename, object_key, content_type, byte_size, visibility, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(attachmentId, actorId, entityId === 'unassigned' ? null : entityId, file.name, objectKey, file.type, file.size, visibility, Date.now())
      .run();
    return NextResponse.json({ id: attachmentId, filename: file.name, byteSize: file.size }, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
