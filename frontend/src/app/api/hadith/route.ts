import { NextRequest } from "next/server";
import arbainJson from "@/data/arbain-nawawi.json";
import syafiiJson from "@/data/musnad-syafii.json";
import bulughulJson from "@/data/bulughul-maram.json";
import riyadhusJson from "@/data/riyadhus-shalihin.json";

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
  "arbain-nawawi": { name: "Arba'in An-Nawawi", max: 42 },
  "musnad-syafii": { name: "Musnad Asy-Syafi'i", max: 1800 },
  "bulughul-maram": { name: "Bulughul Maram", max: 1323 },
  "riyadhus-shalihin": { name: "Riyadhus Shalihin", max: 1903 },
};

const OFFLINE_ONLY = new Set<string>([]);

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

  // Handle Arba'in Nawawi locally from verified dataset
  if (kitab === "arbain-nawawi") {
    const item = arbainJson.data.find((h) => Number(h.no) === nomor);
    if (item) {
      return Response.json({
        status: "success",
        kitab: config.name,
        nomor,
        teks_arab: item.arab,
        terjemahan: item.indo,
        bab: item.judul,
        nomor_bab: 1,
        nomor_dalam_bab: nomor,
        source: "offline",
      });
    }
    return fail(`Hadits Arba'in nomor ${nomor} tidak ditemukan.`, 404);
  }

  // Handle Musnad Asy-Syafi'i locally from parsed dataset
  if (kitab === "musnad-syafii") {
    const list = syafiiJson as Array<{
      number: number;
      arab: string;
      id: string;
      chapter_title?: string;
      chapter_number?: number | null;
    }>;
    const item = list.find((h) => Number(h.number) === nomor);
    if (item) {
      return Response.json({
        status: "success",
        kitab: config.name,
        nomor,
        teks_arab: item.arab,
        terjemahan: item.id,
        bab: item.chapter_title || "",
        nomor_bab: item.chapter_number || 1,
        nomor_dalam_bab: nomor,
        source: "offline",
      });
    }
    return fail(`Hadits Musnad Asy-Syafi'i nomor ${nomor} tidak ditemukan.`, 404);
  }

  // Handle Bulughul Maram locally from verified dataset
  if (kitab === "bulughul-maram") {
    const list = bulughulJson as Array<{
      number: number;
      arab: string;
      id: string;
      bab?: string;
    }>;
    const item = list.find((h) => Number(h.number) === nomor);
    if (item) {
      return Response.json({
        status: "success",
        kitab: config.name,
        nomor,
        teks_arab: item.arab,
        terjemahan: item.id,
        bab: item.bab || "",
        nomor_bab: 1,
        nomor_dalam_bab: nomor,
        source: "offline",
      });
    }
    return fail(`Hadits Bulughul Maram nomor ${nomor} tidak ditemukan.`, 404);
  }

  // Handle Riyadhus Shalihin locally from parsed dataset
  if (kitab === "riyadhus-shalihin") {
    const list = riyadhusJson as Array<{
      number: number;
      arab: string;
      id: string;
      chapter_title?: string;
      chapter_number?: number | null;
      chapter_hadith_number?: number | null;
    }>;
    const item = list.find((h) => Number(h.number) === nomor);
    if (item) {
      return Response.json({
        status: "success",
        kitab: config.name,
        nomor,
        teks_arab: item.arab,
        terjemahan: item.id,
        bab: item.chapter_title || "",
        nomor_bab: item.chapter_number || 1,
        nomor_dalam_bab: item.chapter_hadith_number || nomor,
        source: "offline",
      });
    }
    return fail(`Hadits Riyadhus Shalihin nomor ${nomor} tidak ditemukan.`, 404);
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
