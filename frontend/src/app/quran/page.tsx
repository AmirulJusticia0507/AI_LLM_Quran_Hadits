"use client";

import { useState, useRef } from "react";
import Swal from "sweetalert2";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  List,
  Volume2,
  Pause,
  BookOpenText
} from "lucide-react";

interface QuranVerse {
  status: string;
  surah: string;
  nomor_surah: number;
  nomor_ayat: number;
  teks_arab: string;
  teks_latin: string;
  terjemahan: string;
  audio?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SURAH_LIST = [
  { num: 1, name: "Al-Fatihah", verses: 7 },
  { num: 2, name: "Al-Baqarah", verses: 286 },
  { num: 3, name: "Ali 'Imran", verses: 200 },
  { num: 4, name: "An-Nisa'", verses: 176 },
  { num: 5, name: "Al-Ma'idah", verses: 120 },
  { num: 6, name: "Al-An'am", verses: 165 },
  { num: 7, name: "Al-A'raf", verses: 206 },
  { num: 8, name: "Al-Anfal", verses: 75 },
  { num: 9, name: "At-Tawbah", verses: 129 },
  { num: 10, name: "Yunus", verses: 109 },
  { num: 11, name: "Hud", verses: 123 },
  { num: 12, name: "Yusuf", verses: 111 },
  { num: 13, name: "Ar-Ra'd", verses: 43 },
  { num: 14, name: "Ibrahim", verses: 52 },
  { num: 15, name: "Al-Hijr", verses: 99 },
  { num: 16, name: "An-Nahl", verses: 128 },
  { num: 17, name: "Al-Isra'", verses: 111 },
  { num: 18, name: "Al-Kahf", verses: 110 },
  { num: 19, name: "Maryam", verses: 98 },
  { num: 20, name: "Taha", verses: 135 },
  { num: 21, name: "Al-Anbiya", verses: 112 },
  { num: 22, name: "Al-Hajj", verses: 78 },
  { num: 23, name: "Al-Mu'minun", verses: 118 },
  { num: 24, name: "An-Nur", verses: 64 },
  { num: 25, name: "Al-Furqan", verses: 77 },
  { num: 26, name: "Ash-Shu'ara", verses: 227 },
  { num: 27, name: "An-Naml", verses: 93 },
  { num: 28, name: "Al-Qasas", verses: 88 },
  { num: 29, name: "Al-Ankabut", verses: 69 },
  { num: 30, name: "Ar-Rum", verses: 60 },
  { num: 31, name: "Luqman", verses: 34 },
  { num: 32, name: "As-Sajdah", verses: 30 },
  { num: 33, name: "Al-Ahzab", verses: 73 },
  { num: 34, name: "Saba'", verses: 54 },
  { num: 35, name: "Fatir", verses: 45 },
  { num: 36, name: "Ya Sin", verses: 83 },
  { num: 37, name: "As-Saffat", verses: 182 },
  { num: 38, name: "Sad", verses: 88 },
  { num: 39, name: "Az-Zumar", verses: 75 },
  { num: 40, name: "Ghafir", verses: 85 },
  { num: 41, name: "Fussilat", verses: 54 },
  { num: 42, name: "Ash-Shura", verses: 53 },
  { num: 43, name: "Az-Zukhruf", verses: 89 },
  { num: 44, name: "Ad-Dukhan", verses: 59 },
  { num: 45, name: "Al-Jathiyah", verses: 37 },
  { num: 46, name: "Al-Ahqaf", verses: 35 },
  { num: 47, name: "Muhammad", verses: 38 },
  { num: 48, name: "Al-Fath", verses: 29 },
  { num: 49, name: "Al-Hujurat", verses: 18 },
  { num: 50, name: "Qaf", verses: 45 },
  { num: 51, name: "Adh-Dhariyat", verses: 60 },
  { num: 52, name: "At-Tur", verses: 49 },
  { num: 53, name: "An-Najm", verses: 62 },
  { num: 54, name: "Al-Qamar", verses: 55 },
  { num: 55, name: "Ar-Rahman", verses: 78 },
  { num: 56, name: "Al-Waqi'ah", verses: 96 },
  { num: 57, name: "Al-Hadid", verses: 29 },
  { num: 58, name: "Al-Mujadilah", verses: 22 },
  { num: 59, name: "Al-Hashr", verses: 24 },
  { num: 60, name: "Al-Mumtahanah", verses: 13 },
  { num: 61, name: "As-Saff", verses: 14 },
  { num: 62, name: "Al-Jumu'ah", verses: 11 },
  { num: 63, name: "Al-Munafiqun", verses: 11 },
  { num: 64, name: "At-Taghabun", verses: 18 },
  { num: 65, name: "At-Talaq", verses: 12 },
  { num: 66, name: "At-Tahrim", verses: 12 },
  { num: 67, name: "Al-Mulk", verses: 30 },
  { num: 68, name: "Al-Qalam", verses: 52 },
  { num: 69, name: "Al-Haqqah", verses: 52 },
  { num: 70, name: "Al-Ma'arij", verses: 44 },
  { num: 71, name: "Nuh", verses: 28 },
  { num: 72, name: "Al-Jinn", verses: 28 },
  { num: 73, name: "Al-Muzzammil", verses: 20 },
  { num: 74, name: "Al-Muddaththir", verses: 56 },
  { num: 75, name: "Al-Qiyamah", verses: 40 },
  { num: 76, name: "Al-Insan", verses: 31 },
  { num: 77, name: "Al-Mursalat", verses: 50 },
  { num: 78, name: "An-Naba'", verses: 40 },
  { num: 79, name: "An-Nazi'at", verses: 46 },
  { num: 80, name: "Abasa", verses: 42 },
  { num: 81, name: "At-Takwir", verses: 29 },
  { num: 82, name: "Al-Infitar", verses: 19 },
  { num: 83, name: "Al-Mutaffifin", verses: 36 },
  { num: 84, name: "Al-Inshiqaq", verses: 25 },
  { num: 85, name: "Al-Buruj", verses: 22 },
  { num: 86, name: "At-Tariq", verses: 17 },
  { num: 87, name: "Al-A'la", verses: 19 },
  { num: 88, name: "Al-Ghashiyah", verses: 26 },
  { num: 89, name: "Al-Fajr", verses: 30 },
  { num: 90, name: "Al-Balad", verses: 20 },
  { num: 91, name: "Ash-Shams", verses: 15 },
  { num: 92, name: "Al-Layl", verses: 21 },
  { num: 93, name: "Ad-Duha", verses: 11 },
  { num: 94, name: "Ash-Sharh", verses: 8 },
  { num: 95, name: "At-Tin", verses: 8 },
  { num: 96, name: "Al-Alaq", verses: 19 },
  { num: 97, name: "Al-Qadr", verses: 5 },
  { num: 98, name: "Al-Bayyinah", verses: 8 },
  { num: 99, name: "Az-Zalzalah", verses: 8 },
  { num: 100, name: "Al-Adiyat", verses: 11 },
  { num: 101, name: "Al-Qari'ah", verses: 11 },
  { num: 102, name: "At-Takathur", verses: 8 },
  { num: 103, name: "Al-Asr", verses: 3 },
  { num: 104, name: "Al-Humazah", verses: 9 },
  { num: 105, name: "Al-Fil", verses: 5 },
  { num: 106, name: "Quraysh", verses: 4 },
  { num: 107, name: "Al-Ma'un", verses: 7 },
  { num: 108, name: "Al-Kawthar", verses: 3 },
  { num: 109, name: "Al-Kafirun", verses: 6 },
  { num: 110, name: "An-Nasr", verses: 3 },
  { num: 111, name: "Al-Masad", verses: 5 },
  { num: 112, name: "Al-Ikhlas", verses: 4 },
  { num: 113, name: "Al-Falaq", verses: 5 },
  { num: 114, name: "An-Nas", verses: 6 },
];

const POPULAR_SURAHS = [
  { num: 1, name: "Al-Fatihah" },
  { num: 18, name: "Al-Kahf" },
  { num: 36, name: "Ya Sin" },
  { num: 55, name: "Ar-Rahman" },
  { num: 56, name: "Al-Waqi'ah" },
  { num: 67, name: "Al-Mulk" },
  { num: 112, name: "Al-Ikhlas" }
];

export default function QuranPage() {
  const [surah, setSurah] = useState(1);
  const [ayat, setAyat] = useState(1);
  const [result, setResult] = useState<QuranVerse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState(2.2);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewMode, setViewMode] = useState<"single" | "surah">("single");
  const [surahVerses, setSurahVerses] = useState<QuranVerse[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedVerses, setBookmarkedVerses] = useState<QuranVerse[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tafsir, setTafsir] = useState<string | null>(null);
  const [tafsirLoading, setTafsirLoading] = useState(false);
  const [showTafsir, setShowTafsir] = useState(false);

  const selectedSurahInfo = SURAH_LIST.find((s) => s.num === surah);

  const filteredSurahs = SURAH_LIST.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.num.toString() === searchQuery.trim()
  );

  const resetMediaState = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setTafsir(null);
    setShowTafsir(false);
  };

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el || !result?.audio) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleTafsir = async () => {
    if (showTafsir) {
      setShowTafsir(false);
      return;
    }
    setShowTafsir(true);
    if (tafsir || !result) return;
    setTafsirLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/quran/tafsir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surah: result.nomor_surah, ayat: result.nomor_ayat }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Tafsir tidak ditemukan");
      setTafsir(data.tafsir);
    } catch {
      setTafsir("Gagal memuat tafsir. Coba lagi nanti.");
    } finally {
      setTafsirLoading(false);
    }
  };

  const fetchVerse = async (targetSurah = surah, targetAyat = ayat) => {
    setLoading(true);
    setResult(null);
    setCopied(false);
    resetMediaState();

    try {
      const res = await fetch(`${API_URL}/api/quran/verse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surah: targetSurah, ayat: targetAyat }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Ayat tidak ditemukan");
      }

      setResult(data);

      const savedBookmarks = JSON.parse(localStorage.getItem("quran_bookmarks") || "[]");
      const bookmarkKey = `${targetSurah}:${targetAyat}`;
      setIsBookmarked(savedBookmarks.includes(bookmarkKey));

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal mengambil data ayat";
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

  const fetchSurah = async (targetSurah = surah) => {
    setLoading(true);
    setSurahVerses([]);
    setViewMode("surah");

    try {
      const res = await fetch(`${API_URL}/api/quran/verse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surah: targetSurah, ayat: 1 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Gagal mengambil surah");

      // Fetch all verses for this surah
      const maxVerses = SURAH_LIST.find(s => s.num === targetSurah)?.verses || 1;
      const verses: QuranVerse[] = [];

      for (let i = 1; i <= maxVerses; i++) {
        try {
          const verseRes = await fetch(`${API_URL}/api/quran/verse`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ surah: targetSurah, ayat: i }),
          });
          if (verseRes.ok) {
            const verseData = await verseRes.json();
            if (verseData.status === "success") {
              verses.push(verseData);
            }
          }
        } catch {}
      }

      setSurahVerses(verses);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal mengambil data surah";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  const goPrevVerse = () => {
    if (ayat > 1) {
      setAyat(ayat - 1);
      fetchVerse(surah, ayat - 1);
    }
  };

  const goNextVerse = () => {
    const maxVerses = selectedSurahInfo?.verses || 1;
    if (ayat < maxVerses) {
      setAyat(ayat + 1);
      fetchVerse(surah, ayat + 1);
    }
  };

  const copyVerse = () => {
    if (!result) return;
    const textToCopy = `${result.surah} (${result.nomor_surah}:${result.nomor_ayat})\n\n${result.teks_arab}\n\nLatin: ${result.teks_latin}\n\nTerjemahan: "${result.terjemahan}"`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBookmark = () => {
    if (!result) return;
    const bookmarkKey = `${result.nomor_surah}:${result.nomor_ayat}`;
    const savedBookmarks: string[] = JSON.parse(localStorage.getItem("quran_bookmarks") || "[]");

    let updated: string[];
    if (savedBookmarks.includes(bookmarkKey)) {
      updated = savedBookmarks.filter((k) => k !== bookmarkKey);
      setIsBookmarked(false);
      Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Bookmark dihapus', showConfirmButton: false, timer: 1500 });
    } else {
      updated = [...savedBookmarks, bookmarkKey];
      setIsBookmarked(true);
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Bookmark disimpan!', showConfirmButton: false, timer: 1500 });
    }
    localStorage.setItem("quran_bookmarks", JSON.stringify(updated));
  };

  const loadBookmarks = async () => {
    const savedKeys: string[] = JSON.parse(localStorage.getItem("quran_bookmarks") || "[]");
    if (savedKeys.length === 0) {
      setBookmarkedVerses([]);
      setShowBookmarks(true);
      return;
    }

    const verses: QuranVerse[] = [];
    for (const key of savedKeys) {
      const [s, a] = key.split(":").map(Number);
      try {
        const res = await fetch(`${API_URL}/api/quran/verse`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ surah: s, ayat: a }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.status === "success") verses.push(data);
        }
      } catch {}
    }
    setBookmarkedVerses(verses);
    setShowBookmarks(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 md:p-8 shadow-xl shadow-emerald-900/10">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" /> Al-Qur&apos;an Al-Karim Digital
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Pencarian Ayat Al-Qur&apos;an
            </h1>
            <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
              Cari teks Arab, transliterasi Latin, dan terjemahan bahasa Indonesia yang otentik untuk 114 Surah.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={loadBookmarks}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-bold transition-all cursor-pointer"
            >
              <Bookmark className="w-4 h-4" /> Bookmark
            </button>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <span className="text-xs text-emerald-200 uppercase font-semibold block">Total Surah</span>
              <span className="text-2xl font-black text-white">114 Surah</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarks View */}
      {showBookmarks && (
        <div className="glass-card rounded-3xl p-6 shadow-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" /> Bookmark Saya
            </h2>
            <button onClick={() => setShowBookmarks(false)} className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">
              Tutup
            </button>
          </div>
          {bookmarkedVerses.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">Belum ada bookmark tersimpan.</p>
          ) : (
            <div className="space-y-3">
              {bookmarkedVerses.map((v, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSurah(v.nomor_surah);
                    setAyat(v.nomor_ayat);
                    setResult(v);
                    setShowBookmarks(false);
                    setViewMode("single");
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">{v.surah}</span>
                    <span className="text-[10px] text-slate-500">Ayat {v.nomor_ayat}</span>
                  </div>
                  <p className="arabic-text text-right text-lg text-slate-800 dark:text-emerald-100">{v.teks_arab}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{v.terjemahan}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Popular Surah Quick Bar */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          ⭐ Pintasan Surah Populer:
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SURAHS.map((s) => (
            <button
              key={s.num}
              onClick={() => {
                setSurah(s.num);
                setAyat(1);
                setViewMode("single");
                fetchVerse(s.num, 1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                surah === s.num
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500 dark:hover:border-emerald-500"
              }`}
            >
              {s.num}. {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Selector Card */}
      <div className="glass-card rounded-3xl p-6 shadow-xl space-y-6 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Surah Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Pilih Surah ({SURAH_LIST.length})
            </label>
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Cari nama/nomor surah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <select
                value={surah}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSurah(val);
                  setAyat(1);
                  setViewMode("single");
                }}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm cursor-pointer"
              >
                {filteredSurahs.map((s) => (
                  <option key={s.num} value={s.num} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                    {s.num}. {s.name} ({s.verses} Ayat)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ayat Counter */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Nomor Ayat (Maks: {selectedSurahInfo?.verses || 286})
            </label>
            
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => setAyat((prev) => Math.max(1, prev - 1))}
                className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-lg active:scale-95 cursor-pointer"
              >
                -
              </button>

              <input
                type="number"
                min={1}
                max={selectedSurahInfo?.verses || 286}
                value={ayat}
                onChange={(e) => setAyat(Math.max(1, Number(e.target.value)))}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-center text-lg"
              />

              <button
                type="button"
                onClick={() => setAyat((prev) => Math.min(selectedSurahInfo?.verses || 286, prev + 1))}
                className="w-12 h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-lg active:scale-95 cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => { setViewMode("single"); fetchVerse(); }}
            disabled={loading}
            className="flex-1 py-4 bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl shadow-lg shadow-emerald-600/25 disabled:opacity-50 transition-all active:scale-[0.99] font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memuat...
              </span>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Tampilkan Ayat</span>
              </>
            )}
          </button>
          <button
            onClick={() => fetchSurah()}
            disabled={loading}
            className="px-6 py-4 bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-2xl shadow-lg shadow-teal-600/25 disabled:opacity-50 transition-all font-bold text-base flex items-center gap-2 cursor-pointer"
          >
            <List className="w-5 h-5" />
            <span>Baca Surah</span>
          </button>
        </div>
      </div>

      {/* Single Verse Result */}
      {result && viewMode === "single" && (
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 relative border-2 border-emerald-500/30 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20">
                Surah {result.surah}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold text-xs border border-emerald-300/40 dark:border-emerald-700/50">
                Ayat Ke-{result.nomor_ayat}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button onClick={() => setFontSize((prev) => Math.max(1.5, prev - 0.2))} className="px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 cursor-pointer" title="Kecilkan Teks Arab">A-</button>
                <span className="text-[10px] text-slate-400 px-1">Ukuran</span>
                <button onClick={() => setFontSize((prev) => Math.min(3.5, prev + 0.2))} className="px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 cursor-pointer" title="Besarkan Teks Arab">A+</button>
              </div>

              {result.audio ? (
                <button onClick={toggleAudio} className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isPlaying ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border-slate-200 dark:border-slate-700"}`} title={isPlaying ? "Jeda Murottal" : "Putar Murottal"}>
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              ) : null}

              <button onClick={toggleTafsir} className={`p-2.5 rounded-xl border transition-all cursor-pointer ${showTafsir ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border-slate-200 dark:border-slate-700"}`} title="Lihat Tafsir">
                <BookOpenText className="w-4 h-4" />
              </button>

              <button onClick={copyVerse} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer" title="Salin Ayat">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>

              <button onClick={toggleBookmark} className={`p-2.5 rounded-xl border transition-all cursor-pointer ${isBookmarked ? "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-amber-500"}`} title="Simpan Bookmark">
                {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="py-6 px-4 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-500/20 text-right">
            <p className="arabic-text text-slate-900 dark:text-emerald-100 font-bold leading-loose tracking-wide" style={{ fontSize: `${fontSize}rem`, lineHeight: `${fontSize * 1.6}rem` }}>
              {result.teks_arab}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Transliterasi Latin:</span>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">&ldquo;{result.teks_latin}&rdquo;</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Terjemahan Bahasa Indonesia:</span>
            <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              {result.terjemahan}
            </p>
          </div>

          {result.audio ? (
            <audio
              ref={audioRef}
              src={result.audio}
              preload="none"
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              className="hidden"
            />
          ) : null}

          {showTafsir && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpenText className="w-3.5 h-3.5" /> Tafsir Ringkas:
              </span>
              <div className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-800/40 shadow-sm max-h-96 overflow-y-auto">
                {tafsirLoading ? (
                  <span className="flex items-center gap-2 text-slate-500">
                    <span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    Memuat tafsir…
                  </span>
                ) : (
                  <p className="whitespace-pre-wrap wrap-break-word">{tafsir}</p>
                )}
              </div>
            </div>
          )}

          {/* Prev/Next Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <button
              onClick={goPrevVerse}
              disabled={ayat <= 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all text-sm font-medium cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Ayat Sebelumnya
            </button>
            <span className="text-xs text-slate-500 font-medium">
              {ayat} / {selectedSurahInfo?.verses}
            </span>
            <button
              onClick={goNextVerse}
              disabled={ayat >= (selectedSurahInfo?.verses || 1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-30 transition-all text-sm font-medium cursor-pointer"
            >
              Ayat Selanjutnya <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Read-through Surah View */}
      {viewMode === "surah" && surahVerses.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Surah {surahVerses[0]?.surah} — {surahVerses.length} Ayat
            </h2>
            <button onClick={() => setViewMode("single")} className="text-xs text-emerald-600 hover:text-emerald-500 cursor-pointer">
              Kembali ke Pencarian
            </button>
          </div>
          {surahVerses.map((v, i) => (
            <div key={i} className="glass-card rounded-3xl p-6 shadow-lg space-y-4 bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold">Ayat {v.nomor_ayat}</span>
              </div>
              <div className="py-4 px-3 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-500/20 text-right">
                <p className="arabic-text text-slate-900 dark:text-emerald-100 font-bold leading-loose tracking-wide" style={{ fontSize: `${fontSize}rem`, lineHeight: `${fontSize * 1.6}rem` }}>
                  {v.teks_arab}
                </p>
              </div>
              <p className="text-xs text-slate-500 italic">&ldquo;{v.teks_latin}&rdquo;</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                {v.terjemahan}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
