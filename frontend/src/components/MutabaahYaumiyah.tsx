"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckSquare, RotateCcw, Check } from 'lucide-react';

interface IbadahItem {
  id: string;
  label: string;
  kategori: 'Wajib' | 'Sunnah' | 'Al-Qur\'an & Dzikir';
}

const IBADAH_LIST: IbadahItem[] = [
  { id: 'subuh', label: 'Shalat Subuh (Tepat Waktu / Berjamaah)', kategori: 'Wajib' },
  { id: 'dzuhur', label: 'Shalat Dzuhur (Tepat Waktu / Berjamaah)', kategori: 'Wajib' },
  { id: 'ashar', label: 'Shalat Ashar (Tepat Waktu / Berjamaah)', kategori: 'Wajib' },
  { id: 'maghrib', label: 'Shalat Maghrib (Tepat Waktu / Berjamaah)', kategori: 'Wajib' },
  { id: 'isya', label: 'Shalat Isya\' (Tepat Waktu / Berjamaah)', kategori: 'Wajib' },
  { id: 'rawatib', label: 'Shalat Sunnah Rawatib (Qabliyah/Ba\'diyah)', kategori: 'Sunnah' },
  { id: 'dhuha', label: 'Shalat Sunnah Dhuha', kategori: 'Sunnah' },
  { id: 'tahajud', label: 'Shalat Malam / Tahajud & Witir', kategori: 'Sunnah' },
  { id: 'sedekah', label: 'Sedekah Harian (Harta / Senyum / Tenaga)', kategori: 'Sunnah' },
  { id: 'tilawah', label: 'Tilawah & Tadabbur Al-Qur\'an', kategori: 'Al-Qur\'an & Dzikir' },
  { id: 'dzikir_pagi', label: 'Dzikir Pagi & Petang', kategori: 'Al-Qur\'an & Dzikir' },
  { id: 'istighfar', label: 'Istighfar & Shalawat (Minimal 100x)', kategori: 'Al-Qur\'an & Dzikir' },
];

const STORAGE_KEY = 'alhikmah_mutabaah_yaumiyah_v1';

export default function MutabaahYaumiyah() {
  const todayKey = new Date().toISOString().split('T')[0];
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.date === todayKey && Array.isArray(parsed.checked)) {
            setChecked(parsed.checked);
          }
        }
      } catch {
        // Abaikan error localStorage
      } finally {
        setLoaded(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [todayKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: todayKey, checked }));
    } catch {
      // Abaikan error localStorage
    }
  }, [checked, todayKey, loaded]);

  const toggleItem = (id: string) => {
    setChecked((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const progressPct = Math.round((checked.length / IBADAH_LIST.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-emerald-200">Al-Hikmah • Muhasabah Harian</p>
        <h1 className="text-3xl font-bold">Mutaba&apos;ah Yaumiyah</h1>
        <p className="text-emerald-100 text-sm">
          Checklist amalan harian untuk menjaga keistiqamahan ibadah. Progres otomatis di-reset setiap ganti hari.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {checked.length} / {IBADAH_LIST.length} Amalan ({progressPct}%)
            </p>
          </div>
          <button
            type="button"
            onClick={() => setChecked([])}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Hari Ini
          </button>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
          <CheckSquare className="w-5 h-5 text-emerald-600" />
          <h2>Daftar Amal Hari Ini</h2>
        </div>

        {IBADAH_LIST.map((item) => {
          const done = checked.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                done
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700'
                  : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    done
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                  }`}
                >
                  {done && <Check className="w-3.5 h-3.5" />}
                </span>
                <span className={`text-sm font-medium ${done ? 'line-through text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                  {item.label}
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                {item.kategori}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
