import { env } from 'cloudflare:workers';
import { getReadyDb } from '@/db/runtime';
import { ApiError } from '@/lib/http';

const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

function runtime() {
  return env as unknown as Record<string, string | undefined>;
}

function hex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function encode(input: Uint8Array | string) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input;
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decode(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function signature(payload: string) {
  const secret = runtime().AUTH_HASH_SECRET;
  if (!secret) throw new Error('AUTH_HASH_SECRET is not configured');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return encode(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))));
}

async function hmacValue(value: string) {
  const secret = runtime().AUTH_HASH_SECRET;
  if (!secret) throw new Error('AUTH_HASH_SECRET is not configured');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))));
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
    throw new ApiError(401, '请先登录');
  }
  return 'usr_demo_sg';
}

export async function stableWechatUserId(identity: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(identity));
  return `usr_wx_${encode(new Uint8Array(digest)).slice(0, 28)}`;
}

export async function phoneHash(phone: string) {
  return hmacValue(`phone:${phone}`);
}

export async function verificationCodeHash(phone: string, code: string) {
  return hmacValue(`otp:${phone}:${code}`);
}

export async function clientIpHash(request: Request) {
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  return hmacValue(`ip:${ip}`);
}

export async function stablePhoneUserId(phone: string) {
  return `usr_phone_${(await phoneHash(phone)).slice(0, 28)}`;
}

async function contactKey() {
  const secret = runtime().CONTACT_ENCRYPTION_SECRET ?? runtime().AUTH_HASH_SECRET;
  if (!secret) throw new Error('Contact encryption secret is not configured');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`siltok-contact:${secret}`));
  return crypto.subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

export async function encryptContact(value: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await contactKey(), new TextEncoder().encode(value));
  return `${encode(iv)}.${encode(new Uint8Array(encrypted))}`;
}

export async function decryptContact(value: string | null | undefined) {
  if (!value) return null;
  try {
    const [iv, ciphertext] = value.split('.');
    if (!iv || !ciphertext) return null;
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decode(iv) }, await contactKey(), decode(ciphertext));
    return new TextDecoder().decode(decrypted);
  } catch {
    return null;
  }
}

export function authRuntime() {
  return runtime();
}

export async function requireAdmin(request: Request) {
  if (!runtime().AUTH_HASH_SECRET) return { id: 'usr_demo_sg', role: 'admin', preview: true };
  const userId = await readSession(request);
  if (!userId) return null;
  const user = await (await getReadyDb()).prepare(`SELECT id, role FROM users WHERE id = ? AND status = 'active'`).bind(userId).first<{ id: string; role: string }>();
  return user?.role === 'admin' ? { ...user, preview: false } : null;
}

export const sessionCookie = { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/', maxAge: SESSION_MAX_AGE };
