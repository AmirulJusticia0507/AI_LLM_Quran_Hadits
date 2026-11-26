"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Info } from 'lucide-react';

export default function KalkulatorQurban() {
  const [jenisHewan, setJenisHewan] = useState<'kambing' | 'sapi'>('sapi');
  const [bobotHidup, setBobotHidup] = useState<string>('350');
  const [jumlahPeserta, setJumlahPeserta] = useState<string>('7');
  const [beratPerKantong, setBeratPerKantong] = useState<string>('1');

  const bobot = Math.max(0, parseFloat(bobotHidup || '0'));
  const peserta = jenisHewan === 'kambing' ? 1 : Math.min(7, Math.max(1, parseInt(jumlahPeserta || '1', 10)));
  const perKantong = Math.max(0.25, parseFloat(beratPerKantong || '1'));

  // Estimasi karkas / daging bersih ≈ 40–45% dari bobot hidup (ambil konservatif 42%)
  const estimasiDagingKg = Math.round(bobot * 0.42 * 10) / 10;
  const sepertigaKg = Math.round((estimasiDagingKg / 3) * 10) / 10;
  const hakPerPesertaKg = Math.round((sepertigaKg / peserta) * 10) / 10;
  const jumlahKantongFakir = Math.floor(sepertigaKg / perKantong);
  const jumlahKantongKerabat = Math.floor(sepertigaKg / perKantong);

  const handleJenisChange = (jenis: 'kambing' | 'sapi') => {
    setJenisHewan(jenis);
    if (jenis === 'kambing') {
      setBobotHidup('35');
      setJumlahPeserta('1');
    } else {
      setBobotHidup('350');
      setJumlahPeserta('7');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-amber-800 to-orange-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-amber-200">Al-Hikmah • Panduan Panitia Qurban</p>
        <h1 className="text-3xl font-bold">Kalkulator Pembagian Daging Qurban</h1>
        <p className="text-amber-100 text-sm">
          Perkirakan hasil daging bersih dan pembagian ⅓ shohibul qurban, ⅓ kerabat, dan ⅓ fakir miskin.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Jenis Hewan Qurban</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleJenisChange('kambing')}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                jenisHewan === 'kambing'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Kambing / Domba (1 Orang)
            </button>
            <button
              type="button"
              onClick={() => handleJenisChange('sapi')}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                jenisHewan === 'sapi'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Sapi / Kerbau (Maks 7 Orang)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Perkiraan Bobot Hidup (kg)</label>
            <input
              type="number"
              min={1}
              value={bobotHidup}
              onChange={(e) => setBobotHidup(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Berat per Kantong Distribusi (kg)</label>
            <input
              type="number"
              min={0.25}
              step={0.25}
              value={beratPerKantong}
              onChange={(e) => setBeratPerKantong(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
        </div>

        {jenisHewan === 'sapi' && (
          <div>
            <label className="block text-sm font-semibold mb-1">Jumlah Peserta Patungan (1–7 Orang)</label>
            <input
              type="number"
              min={1}
              max={7}
              value={jumlahPeserta}
              onChange={(e) => setJumlahPeserta(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-lg">
          <Scale className="w-5 h-5" />
          <span>Estimasi Pembagian Daging (± {estimasiDagingKg} kg Bersih)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">⅓ Shohibul Qurban</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{sepertigaKg} kg</p>
            <p className="text-xs text-slate-500 mt-1">± {hakPerPesertaKg} kg / peserta</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">⅓ Kerabat &amp; Tetangga</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{sepertigaKg} kg</p>
            <p className="text-xs text-slate-500 mt-1">± {jumlahKantongKerabat} kantong (@{perKantong} kg)</p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">⅓ Fakir Miskin</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">{sepertigaKg} kg</p>
            <p className="text-xs text-slate-500 mt-1">± {jumlahKantongFakir} kantong (@{perKantong} kg)</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            Pelajari aturan upah jagal dan syarat sah hewan di modul{' '}
            <Link href="/fiqh-qurban-aqiqah" className="font-semibold text-emerald-700 dark:text-emerald-400 underline">
              Fiqh Qurban &amp; Aqiqah
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
