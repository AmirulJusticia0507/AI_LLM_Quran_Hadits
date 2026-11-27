"use client";

import { useMemo, useState } from 'react';
import { BookOpen, Check, Copy, Search, Sparkles, X } from 'lucide-react';
import { kamusData, type JenisKata } from '@/data/kamus-arab';

const JENIS_LIST: ('Semua' | JenisKata)[] = [
  'Semua',
  'Kata Benda',
  'Kata Kerja',
  'Kata Sifat',
  'Kata Keterangan',
  'Lainnya',
];

const JENIS_BADGE_STYLE: Record<JenisKata, string> = {
  'Kata Benda': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  'Kata Kerja': 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
  'Kata Sifat': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  'Kata Keterangan': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  Lainnya: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
};

/** Strip Arabic harakat/diacritics and normalize Latin transliteration marks for flexible search. */
function normalizeText(value: string): string {
  return value
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ḥ]/gi, 'h')
    .replace(/[ṣ]/gi, 's')
    .replace(/[ḍ]/gi, 'd')
    .replace(/[ṭ]/gi, 't')
    .replace(/[ẓ]/gi, 'z')
    .replace(/[ā]/gi, 'a')
    .replace(/[ī]/gi, 'i')
    .replace(/[ū]/gi, 'u')
    .replace(/[‘’'ʻ`]/g, '')
    .toLowerCase()
    .trim();
}

export default function KamusArab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJenis, setSelectedJenis] = useState<'Semua' | JenisKata>('Semua');
  const [sortMode, setSortMode] = useState<'default' | 'latin' | 'arab'>('default');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    const q = normalizeText(searchQuery);
    const list = kamusData.filter((entry) => {
      if (selectedJenis !== 'Semua' && entry.jenis !== selectedJenis) {
        return false;
      }
      if (!q) return true;
      return (
        normalizeText(entry.arab).includes(q) ||
        normalizeText(entry.latin).includes(q) ||
        normalizeText(entry.arti).includes(q) ||
        (entry.akar ? normalizeText(entry.akar).includes(q) : false) ||
        (entry.contoh ? normalizeText(entry.contoh).includes(q) : false)
      );
    });

    if (sortMode === 'latin') {
      return [...list].sort((a, b) => normalizeText(a.latin).localeCompare(normalizeText(b.latin)));
    }
    if (sortMode === 'arab') {
      return [...list].sort((a, b) => normalizeText(a.arab).localeCompare(normalizeText(b.arab), 'ar'));
    }
    return list;
  }, [searchQuery, selectedJenis, sortMode]);

  const handleCopy = async (id: string, arab: string) => {
    try {
      await navigator.clipboard.writeText(arab);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 1500);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 text-white p-8 sm:p-10 space-y-3">
        <p className="text-xs uppercase tracking-widest text-emerald-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Al-Hikmah • Bahasa Arab &amp; Kosakata Al-Qur&apos;an
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold">Kamus Bahasa Arab</h1>
        <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
          Telusuri {kamusData.length} kosakata penting Al-Qur&apos;an, Hadits, dan istilah keislaman lengkap dengan harakat, transliterasi, akar kata 3 huruf, jenis kata, dan contoh ayat.
        </p>
      </header>

      {/* Pencarian & Filter */}
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata Arab (dengan/tanpa harakat), latin, arti, atau akar kata..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-10 py-2.5 text-sm focus:outline-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="kamus-sort" className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Urutkan:
            </label>
            <select
              id="kamus-sort"
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as 'default' | 'latin' | 'arab')}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-medium focus:outline-emerald-500 cursor-pointer"
            >
              <option value="default">Tema</option>
              <option value="latin">Abjad Latin (A–Z)</option>
              <option value="arab">Abjad Arab (أ–ي)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {JENIS_LIST.map((jenis) => (
            <button
              key={jenis}
              type="button"
              onClick={() => setSelectedJenis(jenis)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedJenis === jenis
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
              }`}
            >
              {jenis}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Menampilkan <strong className="text-emerald-700 dark:text-emerald-400">{filteredEntries.length}</strong> dari {kamusData.length} entri kamus
        </p>
      </section>

      {/* Hasil Kamus */}
      {filteredEntries.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {filteredEntries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between gap-4 hover:border-emerald-500/60 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${JENIS_BADGE_STYLE[entry.jenis]}`}
                  >
                    {entry.jenis}
                  </span>
                  <div className="flex items-center gap-2">
                    {entry.akar && (
                      <span
                        dir="rtl"
                        title="Akar kata (Tsulatsi)"
                        className="text-xs font-amiri px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {entry.akar}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleCopy(entry.id, entry.arab)}
                      aria-label={`Salin kata ${entry.latin}`}
                      title="Salin teks Arab"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {copiedId === entry.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {entry.latin}
                  </h2>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-amiri text-3xl sm:text-4xl leading-relaxed text-emerald-700 dark:text-emerald-400 text-right"
                  >
                    {entry.arab}
                  </p>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {entry.arti}
                </p>
              </div>

              {entry.contoh && (
                <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 p-3 space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Contoh Penggunaan
                  </p>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-amiri text-base leading-loose text-slate-800 dark:text-slate-200 text-right"
                  >
                    {entry.contoh}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tidak ada kosakata yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedJenis('Semua');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
          >
            Tampilkan Semua Kosakata
          </button>
        </div>
      )}
    </div>
  );
}
