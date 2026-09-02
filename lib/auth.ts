import { env } from 'cloudflare:workers';

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function runtime() {
  return env as unknown as Record<string, string | undefined>;
}

function encode(input: Uint8Array | string) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input;
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function signature(payload: string) {
  const secret = runtime().AUTH_HASH_SECRET;
  if (!secret) throw new Error('AUTH_HASH_SECRET is not configured');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return encode(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))));
}

export function parseCookies(request: Request) {
  return Object.fromEntries((request.headers.get('cookie') ?? '').split(';').map((part) => part.trim()).filter(Boolean).map((part) => {
    const index = part.indexOf('=');
    return [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))];
  }));
}

export async function createSession(userId: string) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `${encode(userId)}.${expires}`;
  return `${payload}.${await signature(payload)}`;
}

export async function readSession(request: Request) {
  const token = parseCookies(request).siltok_session;
  if (!token) return null;
  const [encodedUserId, expires, supplied] = token.split('.');
  if (!encodedUserId || !expires || !supplied || Number(expires) < Date.now() / 1000) return null;
  const payload = `${encodedUserId}.${expires}`;
  if ((await signature(payload)) !== supplied) return null;
  const normalized = encodedUserId.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
}

export async function resolveActorId(request: Request) {
  if (runtime().AUTH_HASH_SECRET) {
    const sessionUser = await readSession(request);
    if (sessionUser) return sessionUser;
  }
  return 'usr_demo_sg';
}

export async function stableWechatUserId(identity: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(identity));
  return `usr_wx_${encode(new Uint8Array(digest)).slice(0, 28)}`;
}

export const sessionCookie = { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/', maxAge: SESSION_MAX_AGE };
