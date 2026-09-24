import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'alhikmah_admin';
export const SESSION_SECONDS = 8 * 60 * 60;
function secret() {
  const value = process.env.ADMIN_SESSION_SECRET || '';
  if (value.length < 32) throw new Error('Admin session is not configured');
  return value;
}
export function createAdminSession(now = Date.now()) {
  const body = `${Math.floor(now / 1000) + SESSION_SECONDS}.${randomBytes(16).toString('hex')}`;
  return `${body}.${createHmac('sha256', secret()).update(body).digest('hex')}`;
}
export function verifyAdminSession(token: string | undefined, now = Date.now()) {
  if (!token || !/^\d{10}\.[a-f0-9]{32}\.[a-f0-9]{64}$/.test(token)) return false;
  try {
    const [expiry, nonce, signature] = token.split('.');
    const remaining = Number(expiry) - Math.floor(now / 1000);
    if (remaining <= 0 || remaining > SESSION_SECONDS) return false;
    const expected = createHmac('sha256', secret()).update(`${expiry}.${nonce}`).digest();
    return timingSafeEqual(Buffer.from(signature, 'hex'), expected);
  } catch { return false; }
}
export function adminBackend() {
  const token = process.env.ADMIN_API_TOKEN || '';
  if (token.length < 32) throw new Error('Admin backend is not configured');
  return {
    base: (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, ''),
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  };
}
export function sameOrigin(request: Request) {
  return request.headers.get('origin') === new URL(request.url).origin;
}
