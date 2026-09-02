import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getReadyDb } from '@/db/runtime';
import { resolveActorId } from '@/lib/auth';
import { apiError } from '@/lib/http';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = await getReadyDb();
    const attachment = await db.prepare('SELECT owner_id, filename, object_key, content_type FROM attachments WHERE id = ?').bind(id).first<{
      owner_id: string; filename: string; object_key: string; content_type: string;
    }>();
    if (!attachment) return NextResponse.json({ error: '附件不存在' }, { status: 404 });
    if (attachment.owner_id !== await resolveActorId(request)) {
      return NextResponse.json({ error: '无权访问该附件' }, { status: 403 });
    }
    const object = await env.FILES.get(attachment.object_key);
    if (!object) return NextResponse.json({ error: '文件不存在' }, { status: 404 });
    return new Response(object.body, {
      headers: {
        'Content-Type': attachment.content_type,
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(attachment.filename)}`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
