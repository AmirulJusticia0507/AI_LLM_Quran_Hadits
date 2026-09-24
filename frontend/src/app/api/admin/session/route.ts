import { cookies } from 'next/headers';
import { ADMIN_COOKIE, SESSION_SECONDS, adminBackend, createAdminSession, sameOrigin, verifyAdminSession } from '@/lib/admin-session';

const headers = { 'Cache-Control': 'no-store' };
export async function GET() {
  return Response.json({ authenticated: verifyAdminSession((await cookies()).get(ADMIN_COOKIE)?.value) }, { headers });
}
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ detail: 'Permintaan tidak valid.' }, { status: 403, headers });
  let body;
  try { body = await request.json(); } catch { return Response.json({ detail: 'Data tidak valid.' }, { status: 400, headers }); }
  if (typeof body?.password !== 'string' || !body.password || body.password.length > 256) return Response.json({ detail: 'Masukkan password admin.' }, { status: 400, headers });
  try {
    const backend = adminBackend();
    const response = await fetch(`${backend.base}/api/admin/login`, { method: 'POST', headers: backend.headers, body: JSON.stringify({ password: body.password }), cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) {
      const status = response.status === 401 ? 401 : response.status === 429 ? 429 : 503;
      const detail = status === 401 ? 'Password admin salah.' : status === 429 ? 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' : 'Layanan admin belum tersedia. Periksa konfigurasi backend.';
      return Response.json({ detail }, { status, headers });
    }
    (await cookies()).set(ADMIN_COOKIE, createAdminSession(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: SESSION_SECONDS });
    return Response.json({ authenticated: true }, { headers });
  } catch { return Response.json({ detail: 'Layanan admin belum tersedia. Silakan coba lagi.' }, { status: 503, headers }); }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request)) return Response.json({ detail: 'Permintaan tidak valid.' }, { status: 403, headers });
  (await cookies()).delete(ADMIN_COOKIE);
  return Response.json({ authenticated: false }, { headers });
}
