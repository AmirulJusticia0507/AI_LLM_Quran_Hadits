import Link from "next/link";
import { Compass, House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 px-4 max-w-xl mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/25 mb-6">
        <Compass className="w-10 h-10" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
        404 — Halaman Tidak Ditemukan
      </p>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
        Sepertinya Anda tersesat jalan
      </h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
        Halaman yang Anda cari tidak ada atau sudah dipindahkan. Mari kembali ke jalan yang benar
        — Chat AI, Al-Qur&apos;an, atau Hadits.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95"
        >
          <House className="w-4 h-4" /> Kembali ke Beranda
        </Link>
        <Link
          href="/quran"
          className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all active:scale-95"
        >
          Buka Al-Qur&apos;an
        </Link>
      </div>
    </div>
  );
}
