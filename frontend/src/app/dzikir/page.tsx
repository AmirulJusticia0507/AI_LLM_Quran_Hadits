"use client";

import { useState } from "react";
import { Fingerprint, RotateCcw, CircleCheck } from "lucide-react";
import WiridHarian from "@/components/WiridHarian";

interface DzikirItem {
  arab: string;
  latin: string;
  arti: string;
  target: number;
}

const DZIKIR_LIST: DzikirItem[] = [
  { arab: "سُبْحَانَ اللَّهِ", latin: "Subhanallah", arti: "Maha Suci Allah", target: 33 },
  { arab: "الْحَمْدُ لِلَّهِ", latin: "Alhamdulillah", arti: "Segala puji bagi Allah", target: 33 },
  { arab: "اللَّهُ أَكْبَرُ", latin: "Allahu Akbar", arti: "Allah Maha Besar", target: 33 },
  { arab: "لَا إِلَٰهَ إِلَّا اللَّهُ", latin: "La ilaha illallah", arti: "Tiada tuhan selain Allah", target: 100 },
  { arab: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", latin: "Subhanallahi wabihamdih", arti: "Maha Suci Allah dan segala puji bagi-Nya", target: 100 },
  { arab: "أَسْتَغْفِرُ اللَّهَ", latin: "Astaghfirullah", arti: "Aku memohon ampun kepada Allah", target: 100 },
  { arab: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", latin: "La hawla wa la quwwata illa billah", arti: "Tiada daya dan upaya kecuali dengan Allah", target: 100 },
  { arab: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", latin: "Allahumma shalli 'ala Muhammad", arti: "Ya Allah, limpahkan shalawat kepada Nabi Muhammad", target: 100 },
];

const STORAGE_KEY = "alhikmah_dzikir_counts";

function loadCounts(): number[] {
  if (typeof window === "undefined") return DZIKIR_LIST.map(() => 0);
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return DZIKIR_LIST.map((_, i) => (typeof parsed[i] === "number" ? parsed[i] : 0));
      }
    }
  } catch {}
  return DZIKIR_LIST.map(() => 0);
}

export default function DzikirPage() {
  const [counts, setCounts] = useState<number[]>(loadCounts);
  const [active, setActive] = useState(0);

  const save = (next: number[]) => {
    setCounts(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const tap = () => {
    const next = [...counts];
    next[active] = Math.min((next[active] ?? 0) + 1, DZIKIR_LIST[active].target * 10);
    save(next);
  };

  const resetOne = (i: number) => {
    const next = [...counts];
    next[i] = 0;
    save(next);
  };

  const resetAll = () => save(DZIKIR_LIST.map(() => 0));

  const item = DZIKIR_LIST[active];
  const count = counts[active] ?? 0;
  const done = count >= item.target;
  const progress = Math.min(100, (count / item.target) * 100);
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-3xl mx-auto w-full px-2 sm:px-4">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
          <Fingerprint className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Dzikir & Wirid Harian</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            Tasbih digital • total tersimpan: <span className="font-bold text-emerald-600 dark:text-emerald-400">{total}</span>
          </p>
        </div>
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95 cursor-pointer shrink-0"
          title="Ulangi semua"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Counter utama */}
      <WiridHarian />
      <h2 className="text-lg font-bold mb-2">Tasbih digital</h2>
      <p className="text-sm text-slate-500 mb-4">Angka target di penghitung ini adalah alat bantu, bukan ketentuan jumlah untuk setiap waktu. Ikuti jumlah pada panduan wirid yang sedang dibaca. Hitungan tersimpan sampai direset.</p>
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 text-center space-y-4">
        <p className="arabic-text text-4xl sm:text-5xl font-bold text-slate-900 dark:text-emerald-100 leading-loose">
          {item.arab}
        </p>
        <div>
          <p className="font-bold text-emerald-600 dark:text-emerald-400">{item.latin}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.arti}</p>
        </div>

        <button
          onClick={tap}
          aria-label="Tambah hitungan dzikir"
          className={`mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer touch-manipulation select-none shadow-xl ${
            done
              ? "bg-linear-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/30"
              : "bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 hover:from-emerald-400 hover:to-teal-500"
          }`}
        >
          {done ? <CircleCheck className="w-8 h-8 mb-1" /> : null}
          <span className="text-5xl sm:text-6xl font-extrabold tabular-nums">{count}</span>
          <span className="text-xs font-medium opacity-80">/ {item.target} • ketuk</span>
        </button>

        <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-200 ${done ? "bg-amber-500" : "bg-emerald-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {done && (
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
            MasyaAllah, target {item.target}x tercapai! 🎉
          </p>
        )}
      </div>

      {/* Daftar dzikir */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
        {DZIKIR_LIST.map((d, i) => {
          const c = counts[i] ?? 0;
          const isActive = i === active;
          const isDone = c >= d.target;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                isActive
                  ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800"
                  : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <button
                onClick={() => setActive(i)}
                className="flex-1 min-w-0 text-left cursor-pointer"
              >
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{d.latin}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  <span className={`font-bold tabular-nums ${isDone ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {c}
                  </span>
                  /{d.target}
                </p>
              </button>
              <button
                onClick={() => resetOne(i)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
                title={`Ulangi ${d.latin}`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
