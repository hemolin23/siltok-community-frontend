import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { getReadyDb } from '@/db/runtime';
import { createSession, parseCookies, sessionCookie, stableWechatUserId } from '@/lib/auth';

type TokenResponse = { access_token?: string; openid?: string; unionid?: string; errcode?: number; errmsg?: string };
type UserResponse = { nickname?: string; headimgurl?: string; unionid?: string; openid?: string; errcode?: number; errmsg?: string };

export async function GET(request: Request) {
  const input = new URL(request.url);
  const code = input.searchParams.get('code');
  const state = input.searchParams.get('state');
  const expected = parseCookies(request).siltok_wechat_state;
  if (!code || !state || !expected || state !== expected) return NextResponse.redirect(new URL('/login?error=wechat_state', request.url));

  const runtime = env as unknown as Record<string, string | undefined>;
  if (!runtime.WECHAT_WEB_APP_ID || !runtime.WECHAT_WEB_APP_SECRET) return NextResponse.redirect(new URL('/login?error=wechat_config', request.url));

  const tokenUrl = new URL('https://api.weixin.qq.com/sns/oauth2/access_token');
  tokenUrl.searchParams.set('appid', runtime.WECHAT_WEB_APP_ID);
  tokenUrl.searchParams.set('secret', runtime.WECHAT_WEB_APP_SECRET);
  tokenUrl.searchParams.set('code', code);
  tokenUrl.searchParams.set('grant_type', 'authorization_code');
  const token = await fetch(tokenUrl).then((response) => response.json() as Promise<TokenResponse>);
  if (!token.access_token || !token.openid) return NextResponse.redirect(new URL(`/login?error=${token.errcode ?? 'wechat_token'}`, request.url));

  const userUrl = new URL('https://api.weixin.qq.com/sns/userinfo');
  userUrl.searchParams.set('access_token', token.access_token);
  userUrl.searchParams.set('openid', token.openid);
  userUrl.searchParams.set('lang', 'zh_CN');
  const profile = await fetch(userUrl).then((response) => response.json() as Promise<UserResponse>);
  const identity = profile.unionid ?? token.unionid ?? profile.openid ?? token.openid;
  const userId = await stableWechatUserId(identity);
  const db = await getReadyDb();
  await db.prepare(`INSERT INTO users (id, display_name, avatar_url, wechat_union_id, role, status, created_at)
    VALUES (?, ?, ?, ?, 'member', 'active', ?)
    ON CONFLICT(id) DO UPDATE SET display_name = excluded.display_name, avatar_url = excluded.avatar_url, wechat_union_id = excluded.wechat_union_id`)
    .bind(userId, profile.nickname || '微信用户', profile.headimgurl ?? null, identity, Date.now()).run();

  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set('siltok_session', await createSession(userId), sessionCookie);
  response.cookies.set('siltok_wechat_state', '', { ...sessionCookie, maxAge: 0 });
  return response;
}
