import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';

export async function GET() {
  const runtime = env as unknown as Record<string, string | undefined>;
  const appId = runtime.WECHAT_WEB_APP_ID;
  const redirectUri = runtime.WECHAT_WEB_REDIRECT_URI;
  if (!appId || !redirectUri) return NextResponse.json({ error: '微信开放平台网站应用尚未配置' }, { status: 503 });
  const state = crypto.randomUUID().replaceAll('-', '');
  const url = new URL('https://open.weixin.qq.com/connect/qrconnect');
  url.searchParams.set('appid', appId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'snsapi_login');
  url.searchParams.set('state', state);
  const response = NextResponse.redirect(`${url.toString()}#wechat_redirect`);
  response.cookies.set('siltok_wechat_state', state, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 600 });
  return response;
}
