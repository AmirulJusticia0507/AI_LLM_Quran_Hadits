import { NextRequest } from "next/server";

/**
 * Same-origin keyword search over the public hadith API, filtered to one kitab.
 * Mirrors the response shape the reader expects
 * ({ matches, scanned, total, partial }) so the page keeps working unchanged.
 */

export const runtime = "nodejs";

const UPSTREAM = "https://hadis-api-id.vercel.app";
const MAX_PAGES = 6;
const PAGE_SIZE = 100;

interface KitabConfig {
  name: string;
  max: number;
}

const KITAB: Record<string, KitabConfig> = {
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

interface SearchHit {
  number: number;
  arab: string;
  id: string;
  kitab: string;
}

function fail(message: string, status = 502) {
  return Response.json({ status: "error", message }, { status });
}

function normalize(text: string) {
  return text.toLowerCase().replace(/\s+/g, " ");
}

export async function POST(request: NextRequest) {
  let body: { kitab?: string; keyword?: string } = {};
  try {
    body = await request.json();
  } catch {
    return fail("Permintaan tidak valid.", 400);
  }

  const kitab = typeof body.kitab === "string" ? body.kitab.toLowerCase() : "";
  const keyword = typeof body.keyword === "string" ? body.keyword.trim() : "";

  if (!(kitab in KITAB)) return fail("Kitab tidak tersedia.", 400);
  if (keyword.length < 3) return fail("Kata kunci minimal 3 karakter.", 400);
  if (keyword.length > 100) return fail("Kata kunci terlalu panjang.", 400);

  const needle = normalize(keyword);
  const matches: SearchHit[] = [];
  let scanned = 0;
  let partial = false;

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    let payload: { items?: { number: number; arab?: string; id?: string }[] } | null = null;
    try {
      const response = await fetch(
        `${UPSTREAM}/hadith/${kitab}?page=${page}&limit=${PAGE_SIZE}`,
        {
          headers: { accept: "application/json" },
          signal: AbortSignal.timeout(15000),
          cache: "no-store",
        },
      );
      if (!response.ok) {
        partial = true;
        break;
      }
      payload = await response.json();
    } catch {
      partial = true;
      break;
    }

    const hadiths = payload?.items ?? [];
    if (hadiths.length === 0) break;

    for (const item of hadiths) {
      scanned += 1;
      if (matches.length >= 50) continue;
      const translation = normalize(item.id || "");
      if (translation.includes(needle)) {
        matches.push({
          number: item.number,
          arab: item.arab || "",
          id: item.id || "",
          kitab: KITAB[kitab].name,
        });
      }
    }

    if (hadiths.length < PAGE_SIZE) break;
  }

  return Response.json({
    status: "success",
    matches,
    scanned,
    total: scanned,
    partial: partial || scanned < KITAB[kitab].max,
  });
}
