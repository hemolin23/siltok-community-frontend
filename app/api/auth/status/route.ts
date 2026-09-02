import { NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';

export async function GET(request: Request) {
  const openAiUser = request.headers.get('oai-authenticated-user-id');
  const runtime = env as unknown as Record<string, string | undefined>;
  return NextResponse.json({
    authenticated: Boolean(openAiUser),
    mode: openAiUser ? 'preview_identity' : 'demo_identity',
    user: { id: openAiUser ?? 'usr_demo_sg', displayName: '石根洁' },
    providers: {
      phoneOtp: runtime.TENCENT_SECRET_ID && runtime.TENCENT_SMS_SDK_APP_ID ? 'configured' : 'credentials_required',
      wechatWeb: runtime.WECHAT_WEB_APP_ID && runtime.WECHAT_WEB_APP_SECRET ? 'configured' : 'application_review_required',
    },
  });
}
