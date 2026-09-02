import { env } from 'cloudflare:workers';

const encoder = new TextEncoder();

function runtime() {
  return env as unknown as Record<string, string | undefined>;
}

function hex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256(value: string) {
  return hex(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))));
}

async function hmac(key: Uint8Array, value: string) {
  const keyBuffer = key.buffer.slice(key.byteOffset, key.byteOffset + key.byteLength) as ArrayBuffer;
  const imported = await crypto.subtle.importKey('raw', keyBuffer, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', imported, encoder.encode(value)));
}

export function smsConfigured() {
  const config = runtime();
  return Boolean(config.TENCENT_SECRET_ID && config.TENCENT_SECRET_KEY && config.TENCENT_SMS_SDK_APP_ID && config.TENCENT_SMS_SIGN_NAME && config.TENCENT_SMS_TEMPLATE_ID && config.AUTH_HASH_SECRET);
}

export async function sendVerificationSms(phone: string, code: string) {
  const config = runtime();
  if (!smsConfigured()) throw new Error('SMS provider is not configured');
  const host = 'sms.tencentcloudapi.com';
  const service = 'sms';
  const action = 'SendSms';
  const version = '2021-01-11';
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
  const payload = JSON.stringify({
    PhoneNumberSet: [`+86${phone}`],
    SmsSdkAppId: config.TENCENT_SMS_SDK_APP_ID,
    SignName: config.TENCENT_SMS_SIGN_NAME,
    TemplateId: config.TENCENT_SMS_TEMPLATE_ID,
    TemplateParamSet: config.TENCENT_SMS_TEMPLATE_CODE_ONLY === 'true' ? [code] : [code, '5'],
  });
  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${host}\nx-tc-action:${action.toLowerCase()}\n`;
  const signedHeaders = 'content-type;host;x-tc-action';
  const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${await sha256(payload)}`;
  const credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${credentialScope}\n${await sha256(canonicalRequest)}`;
  const secretDate = await hmac(encoder.encode(`TC3${config.TENCENT_SECRET_KEY}`), date);
  const secretService = await hmac(secretDate, service);
  const secretSigning = await hmac(secretService, 'tc3_request');
  const signature = hex(await hmac(secretSigning, stringToSign));
  const authorization = `TC3-HMAC-SHA256 Credential=${config.TENCENT_SECRET_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  const response = await fetch(`https://${host}`, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json; charset=utf-8',
      Host: host,
      'X-TC-Action': action,
      'X-TC-Version': version,
      'X-TC-Timestamp': String(timestamp),
      'X-TC-Region': config.TENCENT_SMS_REGION ?? 'ap-guangzhou',
    },
    body: payload,
  });
  const body = await response.json() as { Response?: { Error?: { Code: string; Message: string }; SendStatusSet?: Array<{ Code: string; Message: string }> } };
  const error = body.Response?.Error;
  const sendStatus = body.Response?.SendStatusSet?.[0];
  if (!response.ok || error || (sendStatus && sendStatus.Code !== 'Ok')) {
    throw new Error(error?.Code ?? sendStatus?.Code ?? `SMS_HTTP_${response.status}`);
  }
}
