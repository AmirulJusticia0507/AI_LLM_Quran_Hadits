"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Info } from 'lucide-react';

export default function KalkulatorFidyah() {
  const [hari, setHari] = useState<string>('7');
  const [tahunTertunda, setTahunTertunda] = useState<string>('1');
  const [hargaBeras, setHargaBeras] = useState<string>('16000');
  const [takaran, setTakaran] = useState<'mud' | 'setengah_sha'>('mud');
  const [lipatGanda, setLipatGanda] = useState<boolean>(false);

  const jumlahHari = Math.max(0, parseInt(hari || '0', 10));
  const jumlahTahun = Math.max(1, parseInt(tahunTertunda || '1', 10));
  const hargaPerKg = Math.max(0, parseInt(hargaBeras || '0', 10));

  // 1 mud ≈ 0.75 kg (pendapat Syafi'iyah ~0.675–0.75 kg), 1/2 sha' ≈ 1.5 kg (pendapat Hanafiyah / BAZNAS)
  const kgPerHari = takaran === 'mud' ? 0.75 : 1.5;
  const pengaliTahun = lipatGanda ? jumlahTahun : 1;

  const totalBerasKg = jumlahHari * kgPerHari * pengaliTahun;
  const totalRupiah = Math.round(totalBerasKg * hargaPerKg);
  const jumlahPenerima = jumlahHari * pengaliTahun;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-rose-800 to-amber-900 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-rose-200">Al-Hikmah • Kalkulator Islami</p>
        <h1 className="text-3xl font-bold">Kalkulator Fidyah &amp; Qadha Puasa</h1>
        <p className="text-rose-100 text-sm">
          Hitung kewajiban fidyah (beras maupun nominal uang) sesuai ketentuan fikih dan standar BAZNAS.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Jumlah Hari Puasa yang Ditinggalkan</label>
          <input
            type="number"
            min={0}
            value={hari}
            onChange={(e) => setHari(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            placeholder="Contoh: 7"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Standar Takaran per Hari</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTakaran('mud')}
              className={`p-3 rounded-xl border text-left transition-all ${
                takaran === 'mud'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="block font-semibold text-sm">1 Mud (± 0,75 kg beras)</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Pendapat Mazhab Syafi&apos;i &amp; Maliki</span>
            </button>
            <button
              type="button"
              onClick={() => setTakaran('setengah_sha')}
              className={`p-3 rounded-xl border text-left transition-all ${
                takaran === 'setengah_sha'
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="block font-semibold text-sm">½ Sha&apos; (± 1,5 kg beras)</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Pendapat Mazhab Hanafi &amp; BAZNAS</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Harga Beras Setempat per Kg (Rp)</label>
          <input
            type="number"
            min={0}
            step={500}
            value={hargaBeras}
            onChange={(e) => setHargaBeras(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            placeholder="Contoh: 16000"
          />
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={lipatGanda}
              onChange={(e) => setLipatGanda(e.target.checked)}
              className="mt-1 w-4 h-4 accent-emerald-600"
            />
            <span className="text-sm">
              <strong className="block">Terlambat Qadha Melewati Ramadan Berikutnya</strong>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Menurut Mazhab Syafi&apos;i, menunda qadha tanpa uzur hingga lewat Ramadan berikutnya wajib qadha + fidyah berlipat sesuai jumlah tahun terlewat.
              </span>
            </span>
          </label>

          {lipatGanda && (
            <div>
              <label className="block text-sm font-semibold mb-1">Jumlah Tahun Tertunda</label>
              <input
                type="number"
                min={1}
                value={tahunTertunda}
                onChange={(e) => setTahunTertunda(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
              />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-lg">
          <Calculator className="w-5 h-5" />
          <span>Hasil Perhitungan Fidyah</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Beras</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {totalBerasKg.toLocaleString('id-ID')} kg
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Estimasi Rupiah</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              Rp {totalRupiah.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Porsi Fakir Miskin</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {jumlahPenerima} porsi
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            <strong>Catatan Fikih:</strong> Fidyah wajib bagi lansia renta atau penderita sakit menahun yang tidak mampu lagi berpuasa (QS. Al-Baqarah: 184). Bagi yang masih mampu, wajib mengqadha puasanya di luar Ramadan.
          </p>
        </div>
      </div>
    </div>
  );
}
