"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  X
} from "lucide-react";
import { HIJAIYAH_LETTERS, HijaiyahLetter } from "@/data/hijaiyah";

export default function HijaiyahPage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("Semua");
  const [activeMode, setActiveMode] = useState<"card" | "connected" | "harakat" | "quiz">("card");
  const [selectedLetter, setSelectedLetter] = useState<HijaiyahLetter | null>(null);

  // State untuk Kuis Interaktif
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<string | null>(null);

  const regions = ["Semua", "Al-Jauf", "Al-Halq", "Al-Lisan", "Asy-Syafatain"];

  // Filter huruf
  const filteredLetters = useMemo(() => {
    return HIJAIYAH_LETTERS.filter((letter) => {
      const matchRegion = selectedRegion === "Semua" || letter.region === selectedRegion;
      const matchSearch =
        letter.name.toLowerCase().includes(search.toLowerCase()) ||
        letter.latin.toLowerCase().includes(search.toLowerCase()) ||
        letter.arabic.includes(search);
      return matchRegion && matchSearch;
    });
  }, [search, selectedRegion]);

  // Opsi kuis deterministik murni tanpa impure Math.random
  const currentQuizLetter = HIJAIYAH_LETTERS[quizIndex % HIJAIYAH_LETTERS.length];
  const quizOptions = useMemo(() => {
    const wrong1 = HIJAIYAH_LETTERS[(quizIndex + 5) % HIJAIYAH_LETTERS.length].name;
    const wrong2 = HIJAIYAH_LETTERS[(quizIndex + 11) % HIJAIYAH_LETTERS.length].name;
    const wrong3 = HIJAIYAH_LETTERS[(quizIndex + 19) % HIJAIYAH_LETTERS.length].name;
    const list = [currentQuizLetter.name, wrong1, wrong2, wrong3];
    const shift = (quizIndex * 3) % 4;
    return [...list.slice(shift), ...list.slice(0, shift)];
  }, [quizIndex, currentQuizLetter.name]);

  const handleQuizAnswer = (option: string) => {
    if (quizAnswered) return;
    setQuizSelectedAnswer(option);
    setQuizAnswered(true);
    if (option === currentQuizLetter.name) {
      setQuizScore((prev) => prev + 10);
    }
  };

  const handleNextQuiz = () => {
    setQuizAnswered(false);
    setQuizSelectedAnswer(null);
    setQuizIndex((prev) => (prev + 1) % HIJAIYAH_LETTERS.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 via-teal-900 to-emerald-950 p-6 sm:p-10 text-white space-y-4 shadow-xl shadow-emerald-900/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 text-xs font-semibold tracking-wider text-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>Fonetika Dasar Al-Qur&apos;an</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Panduan Interaktif 29 Huruf Hijaiyah
        </h1>
        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-3xl">
          Kenali 29 huruf Al-Qur&apos;an dari Alif hingga Ya lengkap dengan bentuk penulisan sambung (awal, tengah, akhir), harakat fathah/kasrah/dhammah, titik makhraj artikulasi, dan sifat bunyi huruf.
        </p>
        <div className="flex flex-wrap gap-4 pt-2 text-xs text-emerald-200">
          <span>✓ 29 Huruf Lengkap</span>
          <span>•</span>
          <span>✓ 4 Bentuk Sambung</span>
          <span>•</span>
          <span>✓ Vokal Fathah, Kasrah &amp; Dhammah</span>
          <span>•</span>
          <span>✓ 100% Offline-Ready</span>
        </div>
      </header>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMode("card")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeMode === "card"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Kartu Huruf
          </button>
          <button
            onClick={() => setActiveMode("connected")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeMode === "connected"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Bentuk Sambung (Khat)
          </button>
          <button
            onClick={() => setActiveMode("harakat")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeMode === "harakat"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Harakat (A - I - U)
          </button>
          <button
            onClick={() => setActiveMode("quiz")}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === "quiz"
                ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                : "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 hover:bg-amber-200"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Kuis Tebak Huruf</span>
          </button>
        </div>

        {/* Search Bar */}
        {activeMode !== "quiz" && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari huruf / nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-emerald-500"
            />
          </div>
        )}
      </div>

      {/* Filter Wilayah Makhraj */}
      {activeMode !== "quiz" && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">Makhraj:</span>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedRegion === region
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      )}

      {/* TAMPILAN 1: KARTU HURUF UTAMA */}
      {activeMode === "card" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredLetters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => setSelectedLetter(letter)}
              className="group p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500/80 hover:shadow-lg hover:shadow-emerald-500/5 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3"
            >
              <div className="w-full flex items-center justify-between text-xs text-slate-400">
                <span>#{String(letter.id).padStart(2, "0")}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500">
                  {letter.region.replace("Asy-", "")}
                </span>
              </div>
              <div className="text-5xl font-arabic text-emerald-800 dark:text-emerald-300 py-2 group-hover:scale-110 transition-transform font-bold">
                {letter.arabic}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{letter.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">/{letter.latin}/</p>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold group-hover:underline">
                Lihat Detail →
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TAMPILAN 2: BENTUK SAMBUNG (KHAT) */}
      {activeMode === "connected" && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Nama Huruf</th>
                <th className="py-3 px-4 text-center">Tunggal</th>
                <th className="py-3 px-4 text-center">Awal Kata</th>
                <th className="py-3 px-4 text-center">Tengah Kata</th>
                <th className="py-3 px-4 text-center">Akhir Kata</th>
                <th className="py-3 px-4">Bisa Sambung Depan?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLetters.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-xs text-slate-400 font-mono">{l.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                    {l.name} <span className="text-xs text-slate-400 font-normal">({l.latin})</span>
                  </td>
                  <td className="py-3 px-4 text-center text-3xl font-arabic text-emerald-700 dark:text-emerald-400">
                    {l.isolated}
                  </td>
                  <td className="py-3 px-4 text-center text-3xl font-arabic text-teal-700 dark:text-teal-400">
                    {l.initial}
                  </td>
                  <td className="py-3 px-4 text-center text-3xl font-arabic text-cyan-700 dark:text-cyan-400">
                    {l.medial}
                  </td>
                  <td className="py-3 px-4 text-center text-3xl font-arabic text-blue-700 dark:text-blue-400">
                    {l.final}
                  </td>
                  <td className="py-3 px-4">
                    {l.canConnectForward ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                        ✓ Bisa disambung
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                        ✕ Tidak bisa
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAMPILAN 3: HARAKAT (A - I - U) */}
      {activeMode === "harakat" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLetters.map((l) => (
            <div
              key={l.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-800 dark:text-slate-200">{l.name}</span>
                <span className="text-xs font-mono text-slate-400">#{l.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-arabic text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                    {l.fathah.split(" ")[0]}
                  </div>
                  <span className="text-slate-500">Fathah: {l.fathah.split(" ")[1]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-arabic text-teal-700 dark:text-teal-400 font-bold mb-1">
                    {l.kasrah.split(" ")[0]}
                  </div>
                  <span className="text-slate-500">Kasrah: {l.kasrah.split(" ")[1]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-arabic text-blue-700 dark:text-blue-400 font-bold mb-1">
                    {l.dhammah.split(" ")[0]}
                  </div>
                  <span className="text-slate-500">Dhammah: {l.dhammah.split(" ")[1]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <div className="text-2xl font-arabic text-amber-700 dark:text-amber-400 font-bold mb-1">
                    {l.sukun.split(" ")[0]}
                  </div>
                  <span className="text-slate-500">Sukun: {l.sukun.split(" ")[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAMPILAN 4: KUIS TEBAK HURUF */}
      {activeMode === "quiz" && (
        <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6 text-center">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Skor: <strong className="text-emerald-600 text-sm font-bold">{quizScore}</strong> poin</span>
            <span>Huruf ke-{quizIndex + 1} dari {HIJAIYAH_LETTERS.length}</span>
          </div>

          <div className="py-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
            <span className="text-xs text-emerald-700 dark:text-emerald-300 uppercase tracking-widest font-semibold block mb-2">
              Tebak Nama Huruf Ini:
            </span>
            <div className="text-7xl font-arabic text-emerald-800 dark:text-emerald-200 font-bold">
              {currentQuizLetter.arabic}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quizOptions.map((option) => {
              const isSelected = quizSelectedAnswer === option;
              const isCorrect = option === currentQuizLetter.name;
              let btnClass = "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-emerald-500";
              if (quizAnswered) {
                if (isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 font-bold";
                } else if (isSelected) {
                  btnClass = "border-rose-500 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200";
                }
              }
              return (
                <button
                  key={option}
                  disabled={quizAnswered}
                  onClick={() => handleQuizAnswer(option)}
                  className={`p-4 rounded-xl border text-sm font-semibold transition-all ${btnClass}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div className="space-y-4 animate-in fade-in">
              <p className="text-sm">
                {quizSelectedAnswer === currentQuizLetter.name ? (
                  <span className="text-emerald-600 font-bold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Masya Allah, Jawaban Anda Benar! (+10)
                  </span>
                ) : (
                  <span className="text-rose-600 font-medium">
                    Kurang tepat. Jawaban yang benar adalah <strong>{currentQuizLetter.name}</strong> ({currentQuizLetter.latin}).
                  </span>
                )}
              </p>
              <button
                onClick={handleNextQuiz}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>Lanjut Huruf Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODAL DETAIL HURUF */}
      {selectedLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedLetter(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center text-5xl font-arabic text-emerald-800 dark:text-emerald-200 font-bold">
                {selectedLetter.arabic}
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  Huruf ke-{selectedLetter.id} • Wilayah {selectedLetter.region}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {selectedLetter.name}
                </h2>
                <p className="text-sm text-slate-500">Transliterasi: <code className="font-mono">{selectedLetter.latin}</code></p>
              </div>
            </div>

            {/* Posisi Penulisan Sambung */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Bentuk Penulisan Sambung (Khat):
              </h3>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] mb-1">Tunggal</span>
                  <span className="text-2xl font-arabic text-emerald-700 dark:text-emerald-400">{selectedLetter.isolated}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] mb-1">Awal</span>
                  <span className="text-2xl font-arabic text-teal-700 dark:text-teal-400">{selectedLetter.initial}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] mb-1">Tengah</span>
                  <span className="text-2xl font-arabic text-cyan-700 dark:text-cyan-400">{selectedLetter.medial}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px] mb-1">Akhir</span>
                  <span className="text-2xl font-arabic text-blue-700 dark:text-blue-400">{selectedLetter.final}</span>
                </div>
              </div>
            </div>

            {/* Contoh 4 Harakat */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Pelafalan Berharakat:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-xl font-arabic text-emerald-700 dark:text-emerald-300 font-bold block">{selectedLetter.fathah.split(" ")[0]}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">{selectedLetter.fathah.split(" ")[1]}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-xl font-arabic text-emerald-700 dark:text-emerald-300 font-bold block">{selectedLetter.kasrah.split(" ")[0]}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">{selectedLetter.kasrah.split(" ")[1]}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-xl font-arabic text-emerald-700 dark:text-emerald-300 font-bold block">{selectedLetter.dhammah.split(" ")[0]}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">{selectedLetter.dhammah.split(" ")[1]}</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-xl font-arabic text-emerald-700 dark:text-emerald-300 font-bold block">{selectedLetter.sukun.split(" ")[0]}</span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">{selectedLetter.sukun.split(" ")[1]}</span>
                </div>
              </div>
            </div>

            {/* Titik Makhraj & Sifat Huruf */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm">
              <div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                  Tempat Makhraj:
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm mt-0.5">{selectedLetter.makhraj}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider block">
                  Sifat Huruf:
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm mt-0.5 font-mono">{selectedLetter.sifat}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                  Catatan Artikulasi:
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-0.5 leading-relaxed">{selectedLetter.description}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedLetter(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-colors"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}

      {/* Navigasi Terkait */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        <Link
          href="/tajweed"
          className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-between group hover:border-emerald-500 transition-colors"
        >
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
              Pelajari Hukum Tajwid Lengkap →
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Ghunnah, Idgham, Ikhfa, Iqlab, Mad &amp; Waqaf
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/quran"
          className="p-5 rounded-2xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30 flex items-center justify-between group hover:border-teal-500 transition-colors"
        >
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
              Praktik Membaca Al-Qur&apos;an 30 Juz →
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              114 Surah lengkap offline dengan audio murottal
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
