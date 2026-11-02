import { NextRequest } from "next/server";

/**
 * Same-origin proxy for the hadith API.
 *
 * The reader used to call the FastAPI backend straight from the browser
 * (NEXT_PUBLIC_API_URL). When that backend is not running, or the variable is
 * not configured, every request fails with "Failed to fetch". Routing through
 * this route handler keeps the upstream reachable from the server and turns
 * network failures into clear Indonesian messages.
 */

export const runtime = "nodejs";

const UPSTREAM = "https://hadis-api-id.vercel.app";
const BACKEND = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export interface KitabConfig {
  name: string;
  max: number;
}

export const KITAB: Record<string, KitabConfig> = {
  bukhari: { name: "Shahih Bukhari", max: 6638 },
  muslim: { name: "Shahih Muslim", max: 4930 },
  tirmidzi: { name: "Jami' at-Tirmidzi", max: 3625 },
  "abu-dawud": { name: "Sunan Abu Dawud", max: 4419 },
  nasai: { name: "Sunan an-Nasa'i", max: 5364 },
  "ibnu-majah": { name: "Sunan Ibnu Majah", max: 4285 },
  ahmad: { name: "Musnad Ahmad", max: 4305 },
  malik: { name: "Muwatta Malik", max: 1587 },
  darimi: { name: "Sunan ad-Darimi", max: 2949 },
};

const OFFLINE_ONLY = new Set(["riyadhus-shalihin"]);

function fail(message: string, status = 502) {
  return Response.json({ status: "error", message }, { status });
}

async function fetchJson(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: unknown }> {
  const response = await fetch(url, {
    ...init,
    headers: { accept: "application/json", ...(init?.headers || {}) },
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, data };
}

export async function POST(request: NextRequest) {
  let body: { kitab?: string; nomor?: number } = {};
  try {
    body = await request.json();
  } catch {
    return fail("Permintaan tidak valid.", 400);
  }

  const kitab = typeof body.kitab === "string" ? body.kitab.toLowerCase() : "";
  const nomor = Number(body.nomor);
  const config = KITAB[kitab];

  if (OFFLINE_ONLY.has(kitab)) {
    return fail(
      "Riyadhus Shalihin membacakan data dari database backend, yang belum tersedia di situs ini. " +
        "Gunakan kitab lain untuk sementara.",
      503,
    );
  }
  if (!config) return fail("Kitab tidak tersedia.", 400);
  if (!Number.isInteger(nomor) || nomor < 1 || nomor > config.max) {
    return fail(`Nomor hadits harus antara 1 dan ${config.max.toLocaleString("id-ID")}.`, 400);
  }

  // 1) Local/hosted backend when it is configured (also serves the offline DB).
  if (BACKEND) {
    try {
      const local = await fetchJson(`${BACKEND}/api/hadith`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kitab, nomor }),
      });
      if (local.ok && local.data) return Response.json(local.data);
    } catch {
      // Backend unreachable: fall through to the public source.
    }
  }

  // 2) Public hadith API.
  try {
    const result = await fetchJson(`${UPSTREAM}/hadith/${kitab}/${nomor}`);
    if (!result.ok || !result.data) {
      if (result.status === 404) {
        return fail(
          `Hadits ${config.name} nomor ${nomor.toLocaleString("id-ID")} tidak ditemukan di sumber data.`,
          404,
        );
      }
      return fail("Sumber data hadits sedang tidak tersedia. Coba lagi beberapa saat lagi.");
    }
    const data = result.data as { name?: string; number?: number; arab?: string; id?: string };
    return Response.json({
      status: "success",
      kitab: data.name || config.name,
      nomor: data.number ?? nomor,
      teks_arab: data.arab || "",
      terjemahan: data.id || "",
      source: "online",
    });
  } catch {
    return fail("Tidak dapat menghubungi sumber data hadits. Periksa koneksi internet lalu coba lagi.");
  }
}
