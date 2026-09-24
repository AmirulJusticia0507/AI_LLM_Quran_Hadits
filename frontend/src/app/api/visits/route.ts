import { visitorDevice } from '@/lib/visitor-device';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!body || typeof body.visitor_id !== "string" || typeof body.event_id !== "string" || !uuid.test(body.visitor_id) || !uuid.test(body.event_id)) {
      return Response.json({ detail: "Data kunjungan tidak valid." }, { status: 400 });
    }
    const path = typeof body.path === 'string' ? body.path : '/';
    if (!/^\/[a-zA-Z0-9_/-]*$/.test(path) || path.length > 200 || path.startsWith('/admin') || path.startsWith('/api')) return Response.json({ detail: 'Halaman tidak valid.' }, { status: 400 });
    const base = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${base.replace(/\/$/, "")}/api/visits`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitor_id: body.visitor_id, event_id: body.event_id, path, ...visitorDevice(request.headers.get('user-agent') || '') }),
      signal: AbortSignal.timeout(10000), cache: "no-store",
    });
    if (!response.ok) throw new Error("Counter unavailable");
    return Response.json(await response.json(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ detail: "Statistik sementara tidak tersedia." }, { status: 503 });
  }
}
