/* eslint-disable @typescript-eslint/no-require-imports -- Build-time Node CommonJS script. */
/**
 * Builds the static Al-Qur'an payload served from /quran-data/.
 *
 * The reader used to call the FastAPI backend from the browser, so nothing could
 * be shown without internet. This script pre-downloads the whole mushaf once at
 * build time (114 surah x 6.236 ayat) and writes:
 *
 *   public/quran-data/index.json          -> surah list + offsets
 *   public/quran-data/surah/001.json ...  -> 3.118 verses per file
 *   public/quran-data/sw-manifest.json     -> precache list for the service worker
 *
 * Tafsir, asbabun nuzul, and murottal stay online-only to keep the bundle small.
 *
 * Environment:
 *   QURAN_OFFLINE_BUILD=0  skip the download and keep existing files
 *   QURAN_REBUILD=1        ignore existing surah files and download again
 */
const fs = require("node:fs");
const path = require("node:path");

const SOURCE = "https://equran.id/api/v2/surat/";
const OUT_DIR = path.join(__dirname, "..", "public", "quran-data");
const SURAH_DIR = path.join(OUT_DIR, "surah");
const EXPECTED_SURAHS = 114;
const EXPECTED_VERSES = 6236;
const ATTEMPTS = 4;
const CONCURRENCY = 5;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadSurah(number) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(`${SOURCE}${number}`, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(45000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const data = payload && payload.data;
      if (!data || data.nomor !== number || !Array.isArray(data.ayat)) {
        throw new Error("Payload surah tidak sesuai");
      }
      if (data.ayat.length !== data.jumlahAyat) {
        throw new Error(`Ayat tidak lengkap (${data.ayat.length}/${data.jumlahAyat})`);
      }
      return normalize(data);
    } catch (error) {
      lastError = error;
      await sleep(800 * attempt);
    }
  }
  throw new Error(`Surah ${number} gagal diunduh: ${lastError && lastError.message}`);
}

function normalize(data) {
  return {
    nomor: data.nomor,
    nama: data.nama,
    namaLatin: data.namaLatin,
    arti: data.arti,
    tempatTurun: data.tempatTurun,
    jumlahAyat: data.jumlahAyat,
    ayat: data.ayat.map((item) => {
      const audio = item.audio || {};
      return {
        nomorAyat: item.nomorAyat,
        teksArab: item.teksArab,
        teksLatin: item.teksLatin,
        teksIndonesia: item.teksIndonesia,
        audio: audio["05"] || Object.values(audio)[0] || "",
      };
    }),
  };
}

function readExisting(number, fileName) {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(SURAH_DIR, fileName), "utf8"));
    return parsed && parsed.nomor === number && Array.isArray(parsed.ayat) ? parsed : null;
  } catch {
    return null;
  }
}

async function mapWithLimit(items, limit, task) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await task(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  if (process.env.QURAN_OFFLINE_BUILD === "0") {
    if (fs.existsSync(path.join(OUT_DIR, "index.json"))) {
      console.log("Qur'an statis dilewati (QURAN_OFFLINE_BUILD=0).");
      return;
    }
    console.log("Qur'an statis belum ada, tetap dibangun.");
  }

  fs.mkdirSync(SURAH_DIR, { recursive: true });
  const numbers = Array.from({ length: EXPECTED_SURAHS }, (_, index) => index + 1);
  const rebuild = process.env.QURAN_REBUILD === "1";
  const started = Date.now();
  let downloaded = 0;
  let reused = 0;

  const surahs = await mapWithLimit(numbers, CONCURRENCY, async (number) => {
    const fileName = `${String(number).padStart(3, "0")}.json`;
    if (!rebuild) {
      const existing = readExisting(number, fileName);
      if (existing) {
        reused += 1;
        return existing;
      }
    }
    const surah = await downloadSurah(number);
    fs.writeFileSync(path.join(SURAH_DIR, fileName), JSON.stringify(surah));
    downloaded += 1;
    if (downloaded % 10 === 0 || downloaded === EXPECTED_SURAHS) {
      console.log(`  ${downloaded} surah diunduh…`);
    }
    return surah;
  });

  const totalVerses = surahs.reduce((sum, surah) => sum + surah.ayat.length, 0);
  if (surahs.length !== EXPECTED_SURAHS || totalVerses !== EXPECTED_VERSES) {
    throw new Error(`Validasi gagal: ${surahs.length} surah, ${totalVerses} ayat (harus 114 surah, 6236 ayat)`);
  }

  const index = {
    version: 1,
    source: "equran.id",
    totalSurahs: surahs.length,
    totalVerses,
    surahs: surahs.map((surah) => ({
      nomor: surah.nomor,
      nama: surah.nama,
      namaLatin: surah.namaLatin,
      arti: surah.arti,
      tempatTurun: surah.tempatTurun,
      jumlahAyat: surah.jumlahAyat,
      file: `/quran-data/surah/${String(surah.nomor).padStart(3, "0")}.json`,
    })),
  };
  fs.writeFileSync(path.join(OUT_DIR, "index.json"), JSON.stringify(index));

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    files: ["/quran-data/index.json", ...index.surahs.map((surah) => surah.file)],
  };
  fs.writeFileSync(path.join(OUT_DIR, "sw-manifest.json"), JSON.stringify(manifest, null, 2));

  console.log(
    `Qur'an statis siap: ${surahs.length} surah, ${totalVerses} ayat ` +
      `(${downloaded} diunduh, ${reused} dipakai ulang, ${((Date.now() - started) / 1000).toFixed(1)}s).`,
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
