"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Info } from 'lucide-react';

export default function SimulasiMurabahah() {
  const [hargaBarang, setHargaBarang] = useState<string>('300000000');
  const [uangMuka, setUangMuka] = useState<string>('60000000');
  const [marginTotalPersen, setMarginTotalPersen] = useState<string>('35');
  const [tenorTahun, setTenorTahun] = useState<string>('5');

  const harga = Math.max(0, parseInt(hargaBarang || '0', 10));
  const dp = Math.min(harga, Math.max(0, parseInt(uangMuka || '0', 10)));
  const marginPct = Math.max(0, parseFloat(marginTotalPersen || '0'));
  const tahun = Math.max(1, parseInt(tenorTahun || '1', 10));

  const pokokPembiayaan = harga - dp;
  const nominalMargin = Math.round(pokokPembiayaan * (marginPct / 100));
  const totalHargaJual = pokokPembiayaan + nominalMargin;
  const jumlahBulan = tahun * 12;
  const cicilanPerBulan = Math.round(totalHargaJual / jumlahBulan);

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
        <p className="text-xs uppercase tracking-widest text-emerald-200">Al-Hikmah • Ekonomi Syariah</p>
        <h1 className="text-3xl font-bold">Simulasi Pembiayaan Murabahah</h1>
        <p className="text-emerald-100 text-sm">
          Hitung simulasi jual beli kredit syariah dengan harga jual dan cicilan tetap hingga lunas tanpa bunga mengambang.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Harga Beli Aset / Rumah (Rp)</label>
            <input
              type="number"
              min={0}
              step={1000000}
              value={hargaBarang}
              onChange={(e) => setHargaBarang(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Uang Muka / DP (Rp)</label>
            <input
              type="number"
              min={0}
              step={1000000}
              value={uangMuka}
              onChange={(e) => setUangMuka(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Total Margin Disepakati (%)</label>
            <input
              type="number"
              min={0}
              step={1}
              value={marginTotalPersen}
              onChange={(e) => setMarginTotalPersen(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Jangka Waktu / Tenor (Tahun)</label>
            <input
              type="number"
              min={1}
              max={25}
              value={tenorTahun}
              onChange={(e) => setTenorTahun(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-lg">
          <Calculator className="w-5 h-5" />
          <span>Ringkasan Akad Jual Beli (Tetap Sampai Lunas)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Pokok Pembiayaan</p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Rp {pokokPembiayaan.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Total Harga Jual (Pokok + Margin)</p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Rp {totalHargaJual.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900">
            <p className="text-xs text-slate-500 dark:text-slate-400">Cicilan Tetap / Bulan ({jumlahBulan}x)</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
              Rp {cicilanPerBulan.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl">
          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            Dalam akad Murabahah yang sah, objek barang harus sudah dimiliki penjual sebelum dijual kembali ke pembeli, dan total harga jual tidak boleh bertambah meski terjadi keterlambatan. Pelajari di modul{' '}
            <Link href="/fiqh-properti-gadai" className="font-semibold text-emerald-700 dark:text-emerald-400 underline">
              Fiqh Properti, KPR Syariah, &amp; Gadai
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
