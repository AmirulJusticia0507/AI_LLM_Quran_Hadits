"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CalendarCheck, Info } from 'lucide-react';

export default function PanduanHaid() {
  const [lamaHari, setLamaHari] = useState<string>('7');
  const [kondisi, setKondisi] = useState<'normal' | 'melahirkan'>('normal');

  const hari = Math.max(1, parseInt(lamaHari || '1', 10));

  let statusJudul = '';
  let statusDetail = '';
  let kewajiban = '';

  if (kondisi === 'melahirkan') {
    if (hari <= 40) {
      statusJudul = 'Darah Nifas (Masih Dalam Batas Umum 40 Hari)';
      statusDetail = 'Mayoritas ulama menetapkan batas umum nifas adalah 40 hari (maksimal 60 hari menurut Mazhab Syafi\'i).';
      kewajiban = 'Tidak wajib shalat & puasa; puasa wajib yang tertinggal diqadha di luar Ramadan, sedangkan shalat tidak perlu diqadha.';
    } else if (hari <= 60) {
      statusJudul = 'Nifas (Antara 40–60 Hari — Perhatikan Perbedaan Madzhab)';
      statusDetail = 'Menurut Mazhab Syafi\'i masih terhitung nifas hingga hari ke-60; menurut Hanbali & Hanafi di atas 40 hari sudah suci/istihadhah.';
      kewajiban = 'Jika darah sudah berhenti total, segera mandi wajib (ghusl) dan mulai shalat kembali.';
    } else {
      statusJudul = 'Melewati Batas Maksimal Nifas (Istihadhah)';
      statusDetail = 'Darah yang terus keluar melewati 60 hari terhitung darah penyakit (istihadhah), bukan lagi nifas.';
      kewajiban = 'Wajib mandi besar setelah batas nifas berakhir, lalu shalat 5 waktu dan puasa seperti biasa dengan berwudhu setiap masuk waktu shalat.';
    }
  } else {
    if (hari <= 15) {
      statusJudul = 'Darah Haid (Dalam Rentang 1–15 Hari)';
      statusDetail = 'Dalam Mazhab Syafi\'i, minimal haid adalah sehari semalam (24 jam), umumnya 6–7 hari, dan maksimalnya 15 hari 15 malam.';
      kewajiban = 'Tidak boleh shalat, puasa, menyentuh mushaf langsung, thawaf, dan berhubungan suami istri hingga darah berhenti lalu mandi wajib.';
    } else {
      statusJudul = 'Melewati 15 Hari — Mengandung Istihadhah';
      statusDetail = 'Jika darah keluar terus menerus melebihi 15 hari, maka selebihnya adalah darah istihadhah (penyakit), bukan haid.';
      kewajiban = 'Jika mampu membedakan ciri darah kuat vs lemah (tamyiz) atau memiliki kebiasaan siklus tetap (misal 7 hari), hari selebihnya wajib mandi besar dan shalat dengan wudhu setiap waktu shalat.';
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-rose-800 to-purple-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-rose-200">Al-Hikmah • Fiqh Muslimah</p>
        <h1 className="text-3xl font-bold">Panduan Hitung Haid, Nifas, &amp; Istihadhah</h1>
        <p className="text-rose-100 text-sm">
          Alat bantu praktis mengenali batas hari haid, nifas, dan istihadhah serta kewajiban ibadahnya.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Kondisi Keluarnya Darah</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setKondisi('normal')}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                kondisi === 'normal'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Siklus Bulanan (Haid)
            </button>
            <button
              type="button"
              onClick={() => setKondisi('melahirkan')}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                kondisi === 'melahirkan'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Pasca Melahirkan (Nifas)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Sudah Berapa Hari Darah Keluar Berturut-turut?</label>
          <input
            type="number"
            min={1}
            max={90}
            value={lamaHari}
            onChange={(e) => setLamaHari(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-lg">
          <CalendarCheck className="w-5 h-5" />
          <span>{statusJudul}</span>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{statusDetail}</p>

        <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Kewajiban Ibadah
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">{kewajiban}</p>
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            Untuk kasus khusus (darah terputus-putus atau flek berkepanjangan), pelajari rincian tamyiz dan kebiasaan siklus di modul{' '}
            <Link href="/fiqh-darah-wanita" className="font-semibold text-emerald-700 dark:text-emerald-400 underline">
              Fiqh Darah Wanita: Haid, Nifas, &amp; Istihadhah
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
