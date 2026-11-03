"use client";

import { useState, useMemo, useEffect } from "react";
import { 
  HeartHandshake, 
  Search, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  BookOpen
} from "lucide-react";
import hisnulMuslimData from "@/data/hisnul-muslim.json";

interface DoaItem {
  id: number;
  group_id: number;
  kategori: string;
  judul: string;
  arab: string;
  arti: string;
  sumber: string;
}

const ITEMS_PER_PAGE = 15;

export default function DoaPage() {
  const [query, setQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Load bookmarks from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("doa_bookmarks");
      if (saved) {
        const parsed = JSON.parse(saved);
        window.setTimeout(() => setBookmarks(parsed), 0);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      try {
        localStorage.setItem("doa_bookmarks", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    hisnulMuslimData.forEach((item) => set.add(item.kategori));
    return ["Semua", ...Array.from(set)];
  }, []);

  // Filtered items
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return (hisnulMuslimData as DoaItem[]).filter((d) => {
      if (showBookmarksOnly && !bookmarks.includes(d.id)) return false;
      if (selectedKategori !== "Semua" && d.kategori !== selectedKategori) return false;
      if (!q) return true;
      return (
        d.kategori.toLowerCase().includes(q) ||
        d.arti.toLowerCase().includes(q) ||
        d.arab.includes(q) ||
        d.sumber.toLowerCase().includes(q)
      );
    });
  }, [query, selectedKategori, bookmarks, showBookmarksOnly]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const copyDoa = (d: DoaItem) => {
    const text = `${d.kategori}\n\n${d.arab}\n\nArtinya:\n"${d.arti}"\n\nSumber: ${d.sumber || "Hisnul Muslim"}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(d.id);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleRandomDoa = () => {
    const randomItem = hisnulMuslimData[Math.floor(Math.random() * hisnulMuslimData.length)];
    setSelectedKategori("Semua");
    setShowBookmarksOnly(false);
    setQuery(randomItem.kategori);
    setCurrentPage(1);
  };

  const fontSizeClass = {
    sm: "text-xl sm:text-2xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-3xl sm:text-4xl",
  }[fontSize];

  return (
    <div className="max-w-4xl mx-auto w-full px-3 sm:px-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Doa &amp; Dzikir Hisnul Muslim
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold">
                267 Doa
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kumpulan doa &amp; dzikir shahih dari Al-Qur&apos;an dan As-Sunnah (Perisai Muslim)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Random Doa */}
          <button
            onClick={handleRandomDoa}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            title="Tampilkan doa acak"
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Doa Acak</span>
          </button>

          {/* Bookmarks Toggle */}
          <button
            onClick={() => {
              setShowBookmarksOnly(!showBookmarksOnly);
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              showBookmarksOnly
                ? "bg-amber-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}
            title="Tampilkan doa yang ditandai"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Tersimpan ({bookmarks.length})</span>
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 text-xs font-semibold">
            {(["sm", "md", "lg"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  fontSize === size
                    ? "bg-emerald-600 text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {size === "sm" ? "A-" : size === "md" ? "A" : "A+"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari doa atau dzikir… mis. tidur, masjid, istikharah, perlindungan, makan"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-xs"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 shrink-0 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            Kategori:
          </span>
          <select
            value={selectedKategori}
            onChange={(e) => {
              setSelectedKategori(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shrink-0 max-w-xs"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {selectedKategori !== "Semua" && (
            <button
              onClick={() => {
                setSelectedKategori("Semua");
                setCurrentPage(1);
              }}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
            >
              Reset Kategori
            </button>
          )}
        </div>
      </div>

      {/* Info Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 px-1">
        <span>
          Menampilkan {filtered.length} doa {selectedKategori !== "Semua" ? `dalam "${selectedKategori}"` : ""}
        </span>
        {totalPages > 1 && (
          <span>
            Halaman {currentPage} dari {totalPages}
          </span>
        )}
      </div>

      {/* Doa Cards List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800">
          <HeartHandshake className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Tidak ada doa yang cocok dengan pencarian Anda.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedKategori("Semua");
              setShowBookmarksOnly(false);
              setCurrentPage(1);
            }}
            className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            Tampilkan Semua Doa
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {paginated.map((d) => {
            const isBookmarked = bookmarks.includes(d.id);
            return (
              <div
                key={d.id}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md p-5 sm:p-6 space-y-4 transition-all hover:border-emerald-500/40"
              >
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold">
                      #{d.id}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {d.kategori}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleBookmark(d.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isBookmarked
                          ? "text-amber-500 bg-amber-50 dark:bg-amber-950/40"
                          : "text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                      title={isBookmarked ? "Hapus bookmark" : "Simpan bookmark"}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => copyDoa(d)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Salin doa"
                    >
                      {copiedIdx === d.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-[11px] text-emerald-500 font-medium">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-[11px]">Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Teks Arab */}
                <div className="py-2">
                  <p
                    dir="rtl"
                    className={`arabic-text text-right font-bold text-slate-900 dark:text-emerald-100 leading-loose ${fontSizeClass}`}
                  >
                    {d.arab}
                  </p>
                </div>

                {/* Terjemahan */}
                <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Artinya:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    &ldquo;{d.arti}&rdquo;
                  </p>
                </div>

                {/* Sumber Hadits */}
                {d.sumber && (
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="shrink-0 font-medium">📚 Sumber:</span>
                    <span className="leading-normal">{d.sumber}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 pb-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400 px-3">
            Halaman {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Berikutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
