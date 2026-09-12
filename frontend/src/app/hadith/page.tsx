"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { 
  ScrollText, 
  Search, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Shuffle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface HadithResult {
  status: string;
  kitab: string;
  nomor: number;
  teks_arab: string;
  terjemahan: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const KITAB_LIST = [
  { id: "bukhari", name: "Shahih Bukhari", maxHadith: 7563, tag: "Sahih Utama" },
  { id: "muslim", name: "Shahih Muslim", maxHadith: 7500, tag: "Sahih Utama" },
  { id: "tirmidzi", name: "Jami' at-Tirmidzi", maxHadith: 3956, tag: "Sunan" },
  { id: "abu-dawud", name: "Sunan Abu Dawud", maxHadith: 5274, tag: "Sunan" },
  { id: "nasai", name: "Sunan an-Nasa'i", maxHadith: 5761, tag: "Sunan" },
  { id: "ibnu-majah", name: "Sunan Ibnu Majah", maxHadith: 4341, tag: "Sunan" },
  { id: "ahmad", name: "Musnad Ahmad", maxHadith: 26363, tag: "Musnad" },
  { id: "malik", name: "Muwatta Malik", maxHadith: 1836, tag: "Muwatta" },
  { id: "darimi", name: "Sunan ad-Darimi", maxHadith: 3573, tag: "Sunan" },
];

export default function HadithPage() {
  const [kitab, setKitab] = useState("bukhari");
  const [nomor, setNomor] = useState(1);
  const [result, setResult] = useState<HadithResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(2.0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedHadiths, setBookmarkedHadiths] = useState<HadithResult[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ number: number; arab: string; id: string }[]>([]);
  const [searchMeta, setSearchMeta] = useState<{ scanned: number; total: number; partial: boolean } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const selectedKitab = KITAB_LIST.find((k) => k.id === kitab) || KITAB_LIST[0];

  const fetchHadith = async (targetKitab = kitab, targetNomor = nomor) => {
    setLoading(true);
    setResult(null);
    setCopied(false);

    try {
      const res = await fetch(`${API_URL}/api/hadith`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kitab: targetKitab, nomor: targetNomor }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Hadits tidak ditemukan");
      }

      setResult(data);

      const savedBookmarks: string[] = JSON.parse(localStorage.getItem("hadith_bookmarks") || "[]");
      const bookmarkKey = `${targetKitab}:${targetNomor}`;
      setIsBookmarked(savedBookmarks.includes(bookmarkKey));

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal mengambil data hadits";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
        confirmButtonColor: "#059669",
        customClass: {
          popup: "rounded-2xl dark:bg-slate-900 dark:text-white border dark:border-slate-800"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getRandomHadith = () => {
    const randomNum = Math.floor(Math.random() * (selectedKitab.maxHadith || 100)) + 1;
    setNomor(randomNum);
    fetchHadith(kitab, randomNum);
  };

  const searchKeyword = async () => {
    if (!keyword.trim() || searching) return;
    setSearching(true);
    setHasSearched(false);
    setSearchResults([]);
    setSearchMeta(null);
    try {
      const res = await fetch(`${API_URL}/api/hadith/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kitab, keyword: keyword.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Pencarian gagal");
      setSearchResults(data.matches ?? []);
      setSearchMeta({ scanned: data.scanned, total: data.total, partial: data.partial });
      setHasSearched(true);
    } catch (err: unknown) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err instanceof Error ? err.message : "Pencarian gagal",
        confirmButtonColor: "#059669",
        customClass: {
          popup: "rounded-2xl dark:bg-slate-900 dark:text-white border dark:border-slate-800"
        }
      });
    } finally {
      setSearching(false);
    }
  };

  const openSearchResult = (nomorHadits: number) => {
    setNomor(nomorHadits);
    fetchHadith(kitab, nomorHadits);
  };

  const goPrevHadith = () => {
    if (nomor > 1) {
      setNomor(nomor - 1);
      fetchHadith(kitab, nomor - 1);
    }
  };

  const goNextHadith = () => {
    if (nomor < selectedKitab.maxHadith) {
      setNomor(nomor + 1);
      fetchHadith(kitab, nomor + 1);
    }
  };

  const copyHadith = () => {
    if (!result) return;
    const textToCopy = `${result.kitab} - Hadits No. ${result.nomor}\n\n${result.teks_arab}\n\nTerjemahan:\n"${result.terjemahan}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBookmark = () => {
    if (!result) return;
    const bookmarkKey = `${result.kitab}:${result.nomor}`;
    const savedBookmarks: string[] = JSON.parse(localStorage.getItem("hadith_bookmarks") || "[]");

    let updated: string[];
    if (savedBookmarks.includes(bookmarkKey)) {
      updated = savedBookmarks.filter((k) => k !== bookmarkKey);
      setIsBookmarked(false);
      Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Hadits dihapus dari bookmark', showConfirmButton: false, timer: 1500 });
    } else {
      updated = [...savedBookmarks, bookmarkKey];
      setIsBookmarked(true);
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Hadits disimpan ke bookmark!', showConfirmButton: false, timer: 1500 });
    }
    localStorage.setItem("hadith_bookmarks", JSON.stringify(updated));
  };

  const loadBookmarks = async () => {
    const savedKeys: string[] = JSON.parse(localStorage.getItem("hadith_bookmarks") || "[]");
    if (savedKeys.length === 0) {
      setBookmarkedHadiths([]);
      setShowBookmarks(true);
      return;
    }

    const hadiths: HadithResult[] = [];
    for (const key of savedKeys) {
      const [k, n] = key.split(":");
      try {
        const res = await fetch(`${API_URL}/api/hadith`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kitab: k, nomor: Number(n) }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.status === "success") hadiths.push(data);
        }
      } catch {}
    }
    setBookmarkedHadiths(hadiths);
    setShowBookmarks(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/matan" className="block rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-5 text-emerald-800 dark:text-emerald-200 hover:underline">
        <span className="block font-bold">Baca Matan Kitab →</span>
        <span className="block text-sm mt-1">Arba’in Nawawi dan Bulughul Maram, dengan pencarian serta pilihan bagian kitab.</span>
      </Link>
      
      {/* Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-teal-900 via-emerald-800 to-slate-900 text-white p-6 md:p-8 shadow-xl shadow-teal-950/20">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-60 h-60 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <ScrollText className="w-4 h-4" /> Kutubut Tis&apos;ah Digital
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Pencarian Kitab Hadits
            </h1>
            <p className="text-sm text-teal-100/80 mt-1 max-w-xl">
              Telusuri riwayat 9 Perawi Kitab Hadits Utama lengkap dengan teks Arab dan terjemahan Indonesia.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadBookmarks}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4" /> Bookmark
            </button>
            <button
              onClick={getRandomHadith}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-teal-300" />
              <span>Hadits Acak</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bookmarks View */}
      {showBookmarks && (
        <div className="glass-card rounded-3xl p-6 shadow-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" /> Bookmark Hadits
            </h2>
            <button onClick={() => setShowBookmarks(false)} className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
              Tutup
            </button>
          </div>
          {bookmarkedHadiths.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">Belum ada bookmark tersimpan.</p>
          ) : (
            <div className="space-y-3">
              {bookmarkedHadiths.map((h, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setKitab(h.kitab);
                    setNomor(h.nomor);
                    setResult(h);
                    setShowBookmarks(false);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white text-[10px] font-bold">{h.kitab}</span>
                    <span className="text-[10px] text-slate-500">Hadits #{h.nomor}</span>
                  </div>
                  <p className="arabic-text text-right text-lg text-slate-800 dark:text-teal-100 line-clamp-2">{h.teks_arab}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{h.terjemahan}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Kitab Selector Grid */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          📚 Pilih Kitab Perawi:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
          {KITAB_LIST.map((k) => (
            <button
              key={k.id}
              onClick={() => {
                setKitab(k.id);
                setNomor(1);
                fetchHadith(k.id, 1);
              }}
              className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                kitab === k.id
                  ? "bg-linear-to-br from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20"
                  : "bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50"
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  kitab === k.id
                    ? "bg-white/20 text-white"
                    : "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {k.tag}
                </span>
                <h3 className="font-bold text-sm mt-1.5 line-clamp-1">{k.name}</h3>
              </div>
              <p className={`text-[11px] mt-2 ${kitab === k.id ? "text-emerald-100" : "text-slate-400 dark:text-slate-500"}`}>
                Maks: {k.maxHadith.toLocaleString()} Hadits
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Pencarian Kata Kunci */}
      <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          🔍 Cari Berdasarkan Kata Kunci <span className="normal-case font-normal">(di kitab {selectedKitab.name})</span>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchKeyword();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="mis. niat, shalat, puasa…"
            disabled={searching}
            className="flex-1 min-w-0 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={searching || !keyword.trim()}
            className="px-5 py-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-600/25 disabled:opacity-50 transition-all active:scale-95 font-bold text-sm flex items-center gap-2 cursor-pointer shrink-0"
          >
            {searching ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{searching ? "Mencari…" : "Cari"}</span>
          </button>
        </form>

        {hasSearched && (
          <div className="space-y-3 animate-in fade-in duration-300">
            {searchMeta && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ditemukan <span className="font-bold text-emerald-600 dark:text-emerald-400">{searchResults.length}</span> hadits
                {" "}• dipindai {searchMeta.scanned.toLocaleString("id-ID")} dari {searchMeta.total.toLocaleString("id-ID")}
                {searchMeta.partial && " (hasil parsial — saring per kitab kecil untuk cakupan penuh)"}
              </p>
            )}
            {searchResults.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                Tidak ditemukan di {searchMeta?.scanned.toLocaleString("id-ID")} hadits pertama. Coba kata kunci lain atau kitab lain.
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {searchResults.map((h) => (
                  <button
                    key={h.number}
                    onClick={() => openSearchResult(h.number)}
                    className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/50 transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedKitab.name} • Hadits #{h.number}
                    </span>
                    <p className="arabic-text text-right text-lg text-slate-800 dark:text-teal-100 line-clamp-2 mt-1">{h.arab}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{h.id}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form Controls */}
      <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Kitab Terpilih:
            </span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {selectedKitab.name}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
              Nomor Hadits:
            </label>
            <button
              type="button"
              onClick={() => setNomor((prev) => Math.max(1, prev - 1))}
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-base cursor-pointer"
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={selectedKitab.maxHadith}
              value={nomor}
              onChange={(e) => setNomor(Math.max(1, Number(e.target.value)))}
              className="w-24 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => setNomor((prev) => Math.min(selectedKitab.maxHadith, prev + 1))}
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-base cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => fetchHadith()}
          disabled={loading}
          className="w-full py-3.5 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-600/20 font-bold text-sm disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memuat Hadits...
            </span>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Cari Hadits #{nomor}</span>
            </>
          )}
        </button>
      </div>

      {/* Result Display Box */}
      {result && (
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 border-2 border-teal-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100">
          
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-teal-600 dark:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20">
                {result.kitab}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold text-xs border border-emerald-300/40 dark:border-emerald-700/50">
                Hadits #{result.nomor}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button onClick={() => setFontSize((prev) => Math.max(1.4, prev - 0.2))} className="px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 cursor-pointer">A-</button>
                <button onClick={() => setFontSize((prev) => Math.min(3.2, prev + 0.2))} className="px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 cursor-pointer">A+</button>
              </div>

              <button onClick={copyHadith} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer" title="Salin Teks Hadits">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>

              <button onClick={toggleBookmark} className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isBookmarked ? "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-amber-500"}`} title="Simpan Bookmark">
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Arabic Hadith Text */}
          <div className="py-6 px-4 bg-teal-50/50 dark:bg-teal-950/40 rounded-2xl border border-teal-500/20 text-right">
            <p className="arabic-text text-slate-900 dark:text-teal-100 font-bold leading-loose tracking-wide" style={{ fontSize: `${fontSize}rem`, lineHeight: `${fontSize * 1.7}rem` }}>
              {result.teks_arab}
            </p>
          </div>

          {/* Translation */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Terjemahan Bahasa Indonesia:
            </span>
            <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              {result.terjemahan}
            </p>
          </div>

          {/* Prev/Next Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <button
              onClick={goPrevHadith}
              disabled={nomor <= 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all text-sm font-medium cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </button>
            <span className="text-xs text-slate-500 font-medium">
              {nomor} / {selectedKitab.maxHadith.toLocaleString()}
            </span>
            <button
              onClick={goNextHadith}
              disabled={nomor >= selectedKitab.maxHadith}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all text-sm font-medium cursor-pointer"
            >
              Selanjutnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
