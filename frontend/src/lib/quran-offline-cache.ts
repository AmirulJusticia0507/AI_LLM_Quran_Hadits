/**
 * Local, per-device cache for the Qur'an reader.
 *
 * The reader talks to the FastAPI backend directly from the browser. When the
 * connection drops there is nothing to show unless the verse was read before,
 * so every successful response is mirrored into localStorage. Reads fall back
 * to that copy and never surface the raw "Failed to fetch" message.
 *
 * Only the most recent entries are kept to stay far below the ~5 MB
 * localStorage quota of most browsers.
 */

export interface CachedVerse {
  status: string;
  surah: string;
  nomor_surah: number;
  nomor_ayat: number;
  teks_arab: string;
  teks_latin: string;
  terjemahan: string;
  audio?: string;
}

export const VERSE_CACHE_LIMIT = 300;
export const TEXT_CACHE_LIMIT = 80;

const VERSE_CACHE_KEY = "alhikmah_quran_offline_verses_v1";
const TAFSIR_CACHE_KEY = "alhikmah_quran_offline_tafsir_v1";
const ASBAB_CACHE_KEY = "alhikmah_quran_offline_asbab_v1";

type Store<T> = Record<string, T>;

function getStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function readStore<T>(key: string): Store<T> {
  const storage = getStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(key);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Store<T>)
      : {};
  } catch {
    return {};
  }
}

function writeStore<T>(key: string, store: Store<T>) {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(store));
  } catch {
    // Quota exceeded or storage disabled: keep the app usable without caching.
  }
}

function put<T>(key: string, limit: number, entryKey: string, value: T) {
  const store = readStore<T>(key);
  // Re-insert so the newest entry is also the last one to be pruned.
  delete store[entryKey];
  store[entryKey] = value;

  const keys = Object.keys(store);
  while (keys.length > limit) {
    const oldest = keys.shift();
    if (oldest !== undefined) delete store[oldest];
  }

  writeStore(key, store);
}

function get<T>(key: string, entryKey: string): T | null {
  const store = readStore<T>(key);
  return Object.prototype.hasOwnProperty.call(store, entryKey) ? store[entryKey] : null;
}

export function verseCacheKey(surah: number, ayat: number) {
  return `${surah}:${ayat}`;
}

export function cacheVerse(verse: CachedVerse) {
  if (!verse || typeof verse.nomor_surah !== "number" || typeof verse.nomor_ayat !== "number") {
    return;
  }
  put(VERSE_CACHE_KEY, VERSE_CACHE_LIMIT, verseCacheKey(verse.nomor_surah, verse.nomor_ayat), verse);
}

export function getCachedVerse(surah: number, ayat: number): CachedVerse | null {
  return get<CachedVerse>(VERSE_CACHE_KEY, verseCacheKey(surah, ayat));
}

export function cacheTafsir(surah: number, ayat: number, text: string) {
  if (!text) return;
  put(TAFSIR_CACHE_KEY, TEXT_CACHE_LIMIT, verseCacheKey(surah, ayat), text);
}

export function getCachedTafsir(surah: number, ayat: number): string | null {
  return get<string>(TAFSIR_CACHE_KEY, verseCacheKey(surah, ayat));
}

export function cacheAsbabunNuzul(surah: number, ayat: number, text: string) {
  if (!text) return;
  put(ASBAB_CACHE_KEY, TEXT_CACHE_LIMIT, verseCacheKey(surah, ayat), text);
}

export function getCachedAsbabunNuzul(surah: number, ayat: number): string | null {
  return get<string>(ASBAB_CACHE_KEY, verseCacheKey(surah, ayat));
}

export function getOfflineCacheStats() {
  return {
    verses: Object.keys(readStore<CachedVerse>(VERSE_CACHE_KEY)).length,
    tafsir: Object.keys(readStore<string>(TAFSIR_CACHE_KEY)).length,
    asbabunNuzul: Object.keys(readStore<string>(ASBAB_CACHE_KEY)).length,
  };
}

export function clearOfflineCache() {
  const storage = getStorage();
  if (!storage) return;
  for (const key of [VERSE_CACHE_KEY, TAFSIR_CACHE_KEY, ASBAB_CACHE_KEY]) {
    try {
      storage.removeItem(key);
    } catch {
      // Ignore storage failures.
    }
  }
}
