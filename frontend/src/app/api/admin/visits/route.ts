import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminBackend, verifyAdminSession } from '@/lib/admin-session';

export async function GET(request: Request) {
  const headers = { 'Cache-Control': 'no-store' };
  if (!verifyAdminSession((await cookies()).get(ADMIN_COOKIE)?.value)) return Response.json({ detail: 'Silakan login admin.' }, { status: 401, headers });
  try {
    const backend = adminBackend();
    const incoming = new URL(request.url).searchParams;
    const query = new URLSearchParams();
    for (const key of ['start', 'end', 'device', 'page']) {
      const value = incoming.get(key);
      if (value) query.set(key, value.slice(0, 30));
    }
    const response = await fetch(`${backend.base}/api/admin/visits?${query}`, { headers: backend.headers, cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) return Response.json({ detail: [400, 422].includes(response.status) ? 'Periksa filter: rentang tanggal maksimal 30 hari.' : 'Riwayat kunjungan belum tersedia.' }, { status: [400, 422].includes(response.status) ? 400 : 503, headers });
    return Response.json(await response.json(), { headers });
  } catch { return Response.json({ detail: 'Gagal memuat riwayat. Silakan coba lagi.' }, { status: 503, headers }); }
}
