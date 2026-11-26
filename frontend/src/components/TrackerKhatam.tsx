"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpenCheck, RotateCcw, Check } from 'lucide-react';

const STORAGE_KEY = 'alhikmah_tracker_khatam_v1';

export default function TrackerKhatam() {
  const [completedJuz, setCompletedJuz] = useState<number[]>([]);
  const [halamanHarian, setHalamanHarian] = useState<number>(20);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.completedJuz)) setCompletedJuz(parsed.completedJuz);
        if (typeof parsed.halamanHarian === 'number') setHalamanHarian(parsed.halamanHarian);
      }
    } catch {
      // Abaikan error localStorage
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedJuz, halamanHarian }));
    } catch {
      // Abaikan error localStorage
    }
  }, [completedJuz, halamanHarian, loaded]);

  const toggleJuz = (juz: number) => {
    setCompletedJuz((prev) =>
      prev.includes(juz) ? prev.filter((item) => item !== juz) : [...prev, juz].sort((a, b) => a - b)
    );
  };

  const resetProgress = () => {
    setCompletedJuz([]);
  };

  const progressPct = Math.round((completedJuz.length / 30) * 100);
  const sisaJuz = 30 - completedJuz.length;
  const sisaHalaman = sisaJuz * 20;
  const estimasiHari = halamanHarian > 0 ? Math.ceil(sisaHalaman / halamanHarian) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-emerald-200">Al-Hikmah • Tilawah &amp; Tahfidz</p>
        <h1 className="text-3xl font-bold">Tracker Khatam 30 Juz Al-Qur&apos;an</h1>
        <p className="text-emerald-100 text-sm">
          Tandai juz yang sudah Anda selesaikan dan hitung estimasi hari khatam sesuai target halaman harian.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Progres Khatam Anda</p>
            <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
              {completedJuz.length} / 30 Juz <span className="text-base font-medium">({progressPct}%)</span>
            </p>
          </div>
          <button
            type="button"
            onClick={resetProgress}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset 30 Juz
          </button>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-sm font-semibold mb-1">Target Bacaan per Hari (Halaman)</label>
            <select
              value={halamanHarian}
              onChange={(e) => setHalamanHarian(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm focus:outline-emerald-500"
            >
              <option value={4}>4 halaman/hari (1 halaman tiap ba&apos;da shalat)</option>
              <option value={10}>10 halaman/hari (½ Juz / hari — Khatam 60 hari)</option>
              <option value={20}>20 halaman/hari (1 Juz / hari — Khatam 30 hari)</option>
              <option value={40}>40 halaman/hari (2 Juz / hari — Khatam 15 hari)</option>
            </select>
          </div>
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 flex flex-col justify-center">
            <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Estimasi Sisa Waktu Khatam</span>
            <span className="text-xl font-bold text-emerald-900 dark:text-white">
              {sisaJuz === 0 ? 'Alhamdulillah, Khatam!' : `${estimasiHari} hari lagi (${sisaHalaman} halaman)`}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <BookOpenCheck className="w-5 h-5 text-emerald-600" />
          <h2>Checklist 30 Juz</h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => {
            const done = completedJuz.includes(juz);
            return (
              <button
                key={juz}
                type="button"
                onClick={() => toggleJuz(juz)}
                className={`p-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  done
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-400'
                }`}
              >
                {done && <Check className="w-3.5 h-3.5" />}
                <span>Juz {juz}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
