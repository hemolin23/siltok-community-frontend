import { NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';
import { getReadyDb } from '@/db/runtime';
import { readSession } from '@/lib/auth';

export async function GET(request: Request) {
  const openAiUser = request.headers.get('oai-authenticated-user-id');
  const runtime = env as unknown as Record<string, string | undefined>;
  const sessionUser = runtime.AUTH_HASH_SECRET ? await readSession(request) : null;
  const userId = sessionUser ?? openAiUser;
  const user = userId ? await (await getReadyDb()).prepare('SELECT id, display_name, avatar_url, role FROM users WHERE id = ?').bind(userId).first<{ id: string; display_name: string; avatar_url: string | null; role: string }>() : null;
  return NextResponse.json({
    authenticated: Boolean(sessionUser),
    mode: sessionUser ? 'app_identity' : openAiUser ? 'owner_preview' : 'demo_identity',
    user: user ? { id: user.id, displayName: user.display_name, avatarUrl: user.avatar_url, role: user.role } : { id: 'usr_demo_sg', displayName: '演示用户', role: 'admin' },
    providers: {
      phoneOtp: runtime.TENCENT_SECRET_ID && runtime.TENCENT_SECRET_KEY && runtime.TENCENT_SMS_SDK_APP_ID && runtime.TENCENT_SMS_SIGN_NAME && runtime.TENCENT_SMS_TEMPLATE_ID && runtime.AUTH_HASH_SECRET ? 'configured' : 'credentials_required',
      wechatWeb: runtime.WECHAT_WEB_APP_ID && runtime.WECHAT_WEB_APP_SECRET && runtime.WECHAT_WEB_REDIRECT_URI && runtime.AUTH_HASH_SECRET ? 'configured' : 'application_review_required',
    },
  });
}
