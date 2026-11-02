"use client";

/**
 * Reads the static mushaf from /quran-data (generated at build time by
 * scripts/build-quran-offline-data.cjs). Data is downloaded once per session,
 * kept in IndexedDB when available (so a full reload works offline), and every
 * tab is registered with the service worker for offline precaching.
 */

export interface QuranSurahInfo {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  tempatTurun: string;
  jumlahAyat: number;
  file: string;
}

export interface QuranIndex {
  version: number;
  source: string;
  totalSurahs: number;
  totalVerses: number;
  surahs: QuranSurahInfo[];
}

export interface QuranAyat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: string;
}

export interface QuranSurahData {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  tempatTurun: string;
  jumlahAyat: number;
  ayat: QuranAyat[];
}

const DB_NAME = "alhikmah-quran";
const DB_STORE = "surah";
const DB_VERSION = 1;
const INDEX_KEY = "index";

const memory = new Map<string, unknown>();
const pending = new Map<string, Promise<unknown>>();

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    let request: IDBOpenDBRequest;
    try {
      request = indexedDB.open(DB_NAME, DB_VERSION);
    } catch {
      resolve(null);
      return;
    }
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
}

async function dbGet<T>(key: string): Promise<T | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(DB_STORE, "readonly");
      const request = tx.objectStore(DB_STORE).get(key);
      request.onsuccess = () => resolve((request.result as T) ?? null);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    } finally {
      db.close();
    }
  });
}

async function dbPut(key: string, value: unknown): Promise<void> {
  const db = await openDb();
  if (!db) return;
  try {
    await new Promise<void>((resolve) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      tx.objectStore(DB_STORE).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    });
  } catch {
    // Ignore storage failures: the network path still works.
  } finally {
    db.close();
  }
}

function networkFetch<T>(key: string, url: string): Promise<T> {
  const existing = pending.get(key);
  if (existing) return existing as Promise<T>;

  const task = (async () => {
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      signal: typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(30000) : undefined,
    });
    if (!response.ok) throw new Error(`Gagal memuat data Qur'an (HTTP ${response.status})`);
    const data = (await response.json()) as T;
    memory.set(key, data);
    void dbPut(key, data);
    return data;
  })().finally(() => pending.delete(key));

  pending.set(key, task);
  return task;
}

async function load<T>(key: string, url: string): Promise<T> {
  const cached = memory.get(key) as T | undefined;
  if (cached) return cached;

  // While "offline" the fetch still goes out: the service worker answers it
  // from its cache (see public/sw.js). IndexedDB is only the second fallback.
  try {
    return await networkFetch<T>(key, url);
  } catch (error) {
    const stored = await dbGet<T>(key);
    if (stored) {
      memory.set(key, stored);
      return stored;
    }
    throw error;
  }
}

function surahPath(nomor: number) {
  return `/quran-data/surah/${String(nomor).padStart(3, "0")}.json`;
}

let indexTask: Promise<QuranIndex> | null = null;

export function loadQuranIndex(): Promise<QuranIndex> {
  if (!indexTask) {
    indexTask = load<QuranIndex>(INDEX_KEY, "/quran-data/index.json").catch((error) => {
      indexTask = null;
      throw error;
    });
  }
  return indexTask;
}

export function loadQuranSurah(nomor: number): Promise<QuranSurahData> {
  return load<QuranSurahData>(`surah-${nomor}`, surahPath(nomor));
}

/**
 * Hands the mushaf files to the service worker so a full page load works
 * without internet. Silently does nothing when the worker is unavailable.
 */
export async function prepareOfflineQuran() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  try {
    const index = await loadQuranIndex();
    const files = ["/quran-data/index.json", ...index.surahs.map((surah) => surah.file)];

    // Warms the HTTP cache so the worker's own precache fetch stays cheap.
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration?.active) {
      registration.active.postMessage({ type: "PRECACHE_QURAN", files });
      return;
    }

    // Not registered yet (first visit): store the mushaf in IndexedDB instead.
    // loadQuranSurah() falls back to it while the worker finishes installing.
    await Promise.all(
      index.surahs.map(async (surah) => {
        try {
          await loadQuranSurah(surah.nomor);
        } catch {
          // One missing surah must not abort the rest.
        }
      }),
    );
  } catch {
    // Offline precache is best effort.
  }
}
