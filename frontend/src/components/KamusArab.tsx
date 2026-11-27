"use client";

import { useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  MessageCircle,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { kamusData, type JenisKata, type KategoriKamus } from '@/data/kamus-arab';
import TesNgobrolArab from '@/components/TesNgobrolArab';

const JENIS_LIST: ('Semua' | JenisKata)[] = [
  'Semua',
  'Kata Benda',
  'Kata Kerja',
  'Kata Sifat',
  'Kata Keterangan',
  'Lainnya',
];

const PAGE_SIZE_OPTIONS = [12, 24, 48] as const;

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
  const [isTestingChat, setIsTestingChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKategori, setSelectedKategori] = useState<'semua' | KategoriKamus>('semua');
  const [selectedJenis, setSelectedJenis] = useState<'Semua' | JenisKata>('Semua');
  const [sortMode, setSortMode] = useState<'default' | 'latin' | 'arab'>('default');
  const [pageSize, setPageSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const kategoriCounts = useMemo(() => {
    let sehari = 0;
    let islami = 0;
    for (const item of kamusData) {
      if ((item.kategori ?? 'islami') === 'sehari-hari') {
        sehari += 1;
      } else {
        islami += 1;
      }
    }
    return { semua: kamusData.length, sehari, islami };
  }, []);

  const filteredEntries = useMemo(() => {
    const q = normalizeText(searchQuery);
    const list = kamusData.filter((entry) => {
      const entryKategori: KategoriKamus = entry.kategori ?? 'islami';
      if (selectedKategori !== 'semua' && entryKategori !== selectedKategori) {
        return false;
      }
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
  }, [searchQuery, selectedKategori, selectedJenis, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedEntries = filteredEntries.slice(startIndex, startIndex + pageSize);

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

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedKategori('semua');
    setSelectedJenis('Semua');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 text-white p-8 sm:p-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-emerald-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Al-Hikmah • Bahasa Arab &amp; Kosakata Al-Qur&apos;an
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold">Kamus Bahasa Arab</h1>
            <p className="text-emerald-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Telusuri {kamusData.length} kosakata &amp; ungkapan bahasa Arab untuk komunikasi sehari-hari serta pemahaman Al-Qur&apos;an &amp; Hadits, lengkap dengan harakat, transliterasi, akar kata, dan contoh kalimat.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsTestingChat((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-900 font-bold text-sm shadow-lg hover:bg-emerald-50 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            {isTestingChat ? 'Kembali ke Kamus' : 'Mulai Tes Ngobrol Bahasa Arab'}
          </button>
        </div>
      </header>

      {isTestingChat ? (
        <TesNgobrolArab onClose={() => setIsTestingChat(false)} />
      ) : (
        <>
          {/* Pencarian & Filter */}
          <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            {/* Filter Kategori Utama */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: 'semua', label: `Semua Topik (${kategoriCounts.semua})` },
                  { value: 'sehari-hari', label: `Komunikasi Sehari-hari (${kategoriCounts.sehari})` },
                  { value: 'islami', label: `Al-Qur\u2019an & Islam (${kategoriCounts.islami})` },
                ] as const
              ).map((kat) => (
                <button
                  key={kat.value}
                  type="button"
                  onClick={() => {
                    setSelectedKategori(kat.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    selectedKategori === kat.value
                      ? 'bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                  }`}
                >
                  {kat.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Cari kata Arab (dengan/tanpa harakat), latin, arti, atau akar kata..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-10 py-2.5 text-sm focus:outline-emerald-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    aria-label="Hapus pencarian"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <label htmlFor="kamus-sort" className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Urutkan:
                </label>
                <select
                  id="kamus-sort"
                  value={sortMode}
                  onChange={(e) => {
                    setSortMode(e.target.value as 'default' | 'latin' | 'arab');
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-medium focus:outline-emerald-500 cursor-pointer"
                >
                  <option value="default">Tema</option>
                  <option value="latin">Abjad Latin (A–Z)</option>
                  <option value="arab">Abjad Arab (أ–ي)</option>
                </select>

                <label htmlFor="kamus-limit" className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">
                  Per halaman:
                </label>
                <select
                  id="kamus-limit"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-medium focus:outline-emerald-500 cursor-pointer"
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {JENIS_LIST.map((jenis) => (
                <button
                  key={jenis}
                  type="button"
                  onClick={() => {
                    setSelectedJenis(jenis);
                    setCurrentPage(1);
                  }}
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

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <p>
                {filteredEntries.length > 0 ? (
                  <>
                    Menampilkan{' '}
                    <strong className="text-emerald-700 dark:text-emerald-400">
                      {startIndex + 1}–{Math.min(startIndex + pageSize, filteredEntries.length)}
                    </strong>{' '}
                    dari <strong className="text-slate-700 dark:text-slate-200">{filteredEntries.length}</strong> entri cocok
                  </>
                ) : (
                  'Tidak ada entri yang cocok'
                )}
              </p>
              <p>
                Halaman <strong>{safePage}</strong> dari <strong>{totalPages}</strong>
              </p>
            </div>
          </section>

          {/* Hasil Kamus */}
          {paginatedEntries.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                {paginatedEntries.map((entry) => (
                  <article
                    key={entry.id}
                    className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between gap-4 hover:border-emerald-500/60 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${JENIS_BADGE_STYLE[entry.jenis]}`}
                          >
                            {entry.jenis}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {(entry.kategori ?? 'islami') === 'sehari-hari' ? 'Sehari-hari' : 'Qur\u2019an & Islam'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  aria-label="Navigasi halaman kamus"
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-3.5"
                >
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Sebelumnya
                  </button>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                      .filter((page) => {
                        if (totalPages <= 7) return true;
                        if (page === 1 || page === totalPages) return true;
                        return Math.abs(page - safePage) <= 1;
                      })
                      .map((page, idx, arr) => {
                        const prev = arr[idx - 1];
                        const showEllipsis = prev !== undefined && page - prev > 1;
                        return (
                          <span key={page} className="inline-flex items-center gap-1.5">
                            {showEllipsis && (
                              <span className="px-1 text-xs text-slate-400">...</span>
                            )}
                            <button
                              type="button"
                              onClick={() => setCurrentPage(page)}
                              className={`min-w-8 h-8 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                safePage === page
                                  ? 'bg-emerald-700 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                              }`}
                            >
                              {page}
                            </button>
                          </span>
                        );
                      })}
                  </div>

                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Berikutnya
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 text-center space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Tidak ada kosakata yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
              >
                Tampilkan Semua Kosakata
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
