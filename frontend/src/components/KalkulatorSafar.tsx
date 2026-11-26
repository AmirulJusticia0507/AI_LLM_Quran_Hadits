"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KalkulatorSafar() {
  const [jarakKm, setJarakKm] = useState<string>('120');
  const [lamaHari, setLamaHari] = useState<string>('2');
  const [jenisPerjalanan, setJenisPerjalanan] = useState<'halal' | 'maksiat'>('halal');

  const jarak = Math.max(0, parseFloat(jarakKm || '0'));
  const hari = Math.max(0, parseInt(lamaHari || '0', 10));

  // Mayoritas ulama (Syafi'iyah, Malikiyah, Hanabilah): 4 burud = 16 farsakh ≈ 81–89 km (diambil batas aman 85 km)
  const memenuhiJarak = jarak >= 85;
  const bukanMenetap = hari <= 3; // Mayoritas: 3 hari penuh tidak termasuk hari datang & pulang (atau ≤ 4 hari)
  const bolehQashar = memenuhiJarak && bukanMenetap && jenisPerjalanan === 'halal';
  const bolehJama = memenuhiJarak && jenisPerjalanan === 'halal';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-teal-800 to-cyan-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-teal-200">Al-Hikmah • Panduan Musafir</p>
        <h1 className="text-3xl font-bold">Kalkulator Safar (Jama&apos; &amp; Qashar)</h1>
        <p className="text-teal-100 text-sm">
          Periksa apakah perjalanan Anda memenuhi syarat keringanan shalat jama&apos;, qashar, dan berbuka puasa.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Jarak Tempuh Sekali Jalan (km)</label>
          <input
            type="number"
            min={0}
            value={jarakKm}
            onChange={(e) => setJarakKm(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            placeholder="Contoh: 120"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Batas jarak safar mayoritas ulama (16 farsakh / 4 burud): ± 81–89 km (patokan aman: ≥ 85 km).
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Rencana Lama Tinggal di Tujuan (Hari)</label>
          <input
            type="number"
            min={0}
            value={lamaHari}
            onChange={(e) => setLamaHari(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            placeholder="Contoh: 2"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Menurut Mazhab Syafi&apos;i, jika berniat mukim ≥ 4 hari penuh (di luar hari tiba &amp; pulang), status musafir berakhir di lokasi tujuan.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Tujuan Perjalanan</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setJenisPerjalanan('halal')}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                jenisPerjalanan === 'halal'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Mubah / Ketaatan (Kerja, Silaturahim, Ibadah)
            </button>
            <button
              type="button"
              onClick={() => setJenisPerjalanan('maksiat')}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                jenisPerjalanan === 'maksiat'
                  ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Perjalanan Maksiat
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl border p-6 space-y-4 ${
        bolehQashar
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
          : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
      }`}>
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white">
          {bolehQashar ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600" />
          )}
          <span>
            {bolehQashar
              ? 'Memenuhi Syarat Safar: Boleh Jama\' & Qashar'
              : bolehJama
              ? 'Selama di Perjalanan Boleh Jama\'/Qashar, Namun di Tujuan Sudah Berstatus Mukim'
              : 'Belum Memenuhi Syarat Rukhsah Safar'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <p className="font-bold text-emerald-700 dark:text-emerald-400">Shalat yang Bisa Di-Qashar (Jadi 2 Rakaat)</p>
            <p className="text-slate-600 dark:text-slate-300">Dzuhur, Ashar, dan Isya&apos; (Subuh tetap 2, Maghrib tetap 3).</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-slate-200/70 dark:border-slate-800 space-y-1">
            <p className="font-bold text-emerald-700 dark:text-emerald-400">Pasangan Shalat Jama&apos;</p>
            <p className="text-slate-600 dark:text-slate-300">Dzuhur + Ashar (Taqdim/Ta&apos;khir) dan Maghrib + Isya&apos; (Taqdim/Ta&apos;khir).</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl">
          <Compass className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            Pelajari detail niat, adab shalat di pesawat/kereta, dan jama&apos; karena hujan di modul{' '}
            <Link href="/fiqh-safar" className="font-semibold text-emerald-700 dark:text-emerald-400 underline">
              Fiqh Safar, Jama&apos;-Qashar, &amp; Shalat Sunnah
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
