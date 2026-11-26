"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Info } from 'lucide-react';

export default function KalkulatorKaffarah() {
  const [jenis, setJenis] = useState<'sumpah' | 'jima_ramadan' | 'zhihar'>('sumpah');
  const [hargaMakan, setHargaMakan] = useState<string>('20000');
  const [hargaBeras, setHargaBeras] = useState<string>('16000');

  const biayaMakan = Math.max(0, parseInt(hargaMakan || '0', 10));
  const perKgBeras = Math.max(0, parseInt(hargaBeras || '0', 10));

  const jumlahOrang = jenis === 'sumpah' ? 10 : 60;
  // 1 mud ≈ 0.75 kg (atau 1.5 kg / ½ sha' menurut Hanafiyah); beri kedua patokan makan siap saji dan beras
  const totalBerasKg = jumlahOrang * 0.75;
  const totalRupiahMakan = jumlahOrang * biayaMakan;
  const totalRupiahBeras = Math.round(totalBerasKg * perKgBeras);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-slate-800 to-emerald-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-emerald-300">Al-Hikmah • Kalkulator Fikih</p>
        <h1 className="text-3xl font-bold">Kalkulator Kaffarah</h1>
        <p className="text-slate-200 text-sm">
          Cek urutan kewajiban dan estimasi biaya kaffarah sumpah, nadzar, maupun pelanggaran berat Ramadan.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2">Jenis Kaffarah</label>
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => setJenis('sumpah')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                jenis === 'sumpah'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="block font-semibold text-sm">Kaffarah Sumpah / Nadzar (QS. Al-Ma&apos;idah: 89)</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Memilih memberi makan/pakaian 10 orang miskin (atau memerdekakan budak); jika tak mampu, puasa 3 hari.
              </span>
            </button>
            <button
              type="button"
              onClick={() => setJenis('jima_ramadan')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                jenis === 'jima_ramadan'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="block font-semibold text-sm">Kaffarah Jima&apos; di Siang Ramadan (HR. Bukhari-Muslim)</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Berurutan: merdekakan budak → puasa 2 bulan berturut-turut → jika tak mampu, beri makan 60 orang miskin.
              </span>
            </button>
            <button
              type="button"
              onClick={() => setJenis('zhihar')}
              className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                jenis === 'zhihar'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="block font-semibold text-sm">Kaffarah Zhihar (QS. Al-Mujadilah: 3–4)</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Berurutan: merdekakan budak → puasa 2 bulan berturut-turut → jika tak mampu, beri makan 60 orang miskin.
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Harga 1 Porsi Makanan Layak (Rp)</label>
            <input
              type="number"
              min={0}
              step={1000}
              value={hargaMakan}
              onChange={(e) => setHargaMakan(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Harga Beras per Kg (Rp)</label>
            <input
              type="number"
              min={0}
              step={500}
              value={hargaBeras}
              onChange={(e) => setHargaBeras(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-lg">
          <Calculator className="w-5 h-5" />
          <span>Rincian Kaffarah ({jumlahOrang} Orang Miskin)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Opsi Makanan Siap Saji ({jumlahOrang} Porsi)</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              Rp {totalRupiahMakan.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Opsi Beras 1 Mud/Orang ({totalBerasKg} kg)</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              Rp {totalRupiahBeras.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            {jenis === 'sumpah'
              ? 'Untuk kaffarah sumpah, Anda boleh langsung memilih memberi makan 10 orang miskin; puasa 3 hari hanya dilakukan jika benar-benar tidak mampu memberi makan/pakaian.'
              : 'Untuk kaffarah jima\' Ramadan / zhihar, wajib berurutan (tartib): puasa 2 bulan berturut-turut harus didahulukan; memberi makan 60 orang miskin hanya jika tidak mampu berpuasa.'}{' '}
            Pelajari detailnya di modul{' '}
            <Link href="/fiqh-sumpah-kaffarah" className="font-semibold text-emerald-700 dark:text-emerald-400 underline">
              Fiqh Sumpah, Nadzar, &amp; Kaffarah
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
