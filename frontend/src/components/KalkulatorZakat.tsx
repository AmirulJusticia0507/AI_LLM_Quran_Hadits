"use client";

import { useState, useCallback } from 'react';

const NISAB_EMAS_GRAM = 85;
const KADAR_ZAKAT = 0.025;

type ZakatType = 'penghasilan' | 'tabungan' | 'fitrah';

interface Result {
  nisab: number;
  harta: number;
  wajibZakat: boolean;
  zakatAmount: number;
}

export default function KalkulatorZakat() {
  const [type, setType] = useState<ZakatType>('penghasilan');
  const [hargaEmas, setHargaEmas] = useState<string>('1500000');
  const [penghasilanBulanan, setPenghasilanBulanan] = useState<string>('');
  const [pengeluaranPokok, setPengeluaranPokok] = useState<string>('');
  const [tabungan, setTabungan] = useState<string>('');
  const [jumlahJiwa, setJumlahJiwa] = useState<string>('1');
  const [hargaBeras, setHargaBeras] = useState<string>('15000');
  const [result, setResult] = useState<Result | null>(null);

  const hitung = useCallback(() => {
    const emas = parseFloat(hargaEmas) || 0;
    const nisab = emas * NISAB_EMAS_GRAM;

    if (type === 'penghasilan') {
      const penghasilan = (parseFloat(penghasilanBulanan) || 0) * 12;
      const pengeluaran = (parseFloat(pengeluaranPokok) || 0) * 12;
      const hartaBersih = Math.max(0, penghasilan - pengeluaran);
      const wajib = hartaBersih >= nisab;
      setResult({
        nisab,
        harta: hartaBersih,
        wajibZakat: wajib,
        zakatAmount: wajib ? hartaBersih * KADAR_ZAKAT : 0,
      });
    } else if (type === 'tabungan') {
      const totalTabungan = parseFloat(tabungan) || 0;
      const wajib = totalTabungan >= nisab;
      setResult({
        nisab,
        harta: totalTabungan,
        wajibZakat: wajib,
        zakatAmount: wajib ? totalTabungan * KADAR_ZAKAT : 0,
      });
    } else {
      const jiwa = parseInt(jumlahJiwa) || 1;
      const berasPerkilo = parseFloat(hargaBeras) || 0;
      const zakatPerJiwa = 2.5 * berasPerkilo;
      const total = jiwa * zakatPerJiwa;
      setResult({
        nisab: 0,
        harta: 0,
        wajibZakat: true,
        zakatAmount: total,
      });
    }
  }, [type, hargaEmas, penghasilanBulanan, pengeluaranPokok, tabungan, jumlahJiwa, hargaBeras]);

  const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-emerald-200">Al-Hikmah • Kalkulator Islami</p>
        <h1 className="text-3xl font-bold">Kalkulator Zakat</h1>
        <p className="text-emerald-100 text-sm">Hitung zakat mal, penghasilan, dan fitrah sesuai ketentuan syariat.</p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        {/* Jenis Zakat */}
        <div>
          <label className="block text-sm font-semibold mb-2">Jenis Zakat</label>
          <div className="flex flex-wrap gap-2">
            {([
              ['penghasilan', 'Penghasilan/Profesi'],
              ['tabungan', 'Tabungan/Investasi'],
              ['fitrah', 'Zakat Fitrah'],
            ] as [ZakatType, string][]).map(([v, l]) => (
              <button
                key={v}
                type="button"
                onClick={() => { setType(v); setResult(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  type === v
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >{l}</button>
            ))}
          </div>
        </div>

        {type !== 'fitrah' && (
          <div>
            <label className="block text-sm font-medium mb-1">Harga Emas per Gram (Rp)</label>
            <input
              type="number"
              value={hargaEmas}
              onChange={e => setHargaEmas(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
              placeholder="Contoh: 1500000"
            />
            <p className="text-xs text-slate-500 mt-1">
              Nisab = 85 gram × harga emas = {fmt((parseFloat(hargaEmas) || 0) * NISAB_EMAS_GRAM)}
            </p>
          </div>
        )}

        {type === 'penghasilan' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Penghasilan Bulanan Bersih (Rp)</label>
              <input
                type="number"
                value={penghasilanBulanan}
                onChange={e => setPenghasilanBulanan(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
                placeholder="Gaji + tunjangan + bonus rata-rata"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pengeluaran Pokok Bulanan (Rp)</label>
              <input
                type="number"
                value={pengeluaranPokok}
                onChange={e => setPengeluaranPokok(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
                placeholder="Kebutuhan dasar bulanan"
              />
            </div>
          </>
        )}

        {type === 'tabungan' && (
          <div>
            <label className="block text-sm font-medium mb-1">Total Tabungan/Investasi (Rp)</label>
            <input
              type="number"
              value={tabungan}
              onChange={e => setTabungan(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
              placeholder="Kas + tabungan + nilai investasi"
            />
          </div>
        )}

        {type === 'fitrah' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Jumlah Jiwa (Tanggungan)</label>
              <input
                type="number"
                min="1"
                value={jumlahJiwa}
                onChange={e => setJumlahJiwa(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Harga Beras per Kg (Rp)</label>
              <input
                type="number"
                value={hargaBeras}
                onChange={e => setHargaBeras(e.target.value)}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
                placeholder="Contoh: 15000"
              />
              <p className="text-xs text-slate-500 mt-1">Zakat fitrah = 2,5 kg beras × harga per kg × jumlah jiwa</p>
            </div>
          </>
        )}

        <button
          type="button"
          onClick={hitung}
          className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold transition-colors"
        >
          Hitung Zakat
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl border p-6 space-y-4 ${
          result.wajibZakat
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
            : 'border-amber-300 bg-amber-50 dark:bg-amber-950/30'
        }`}>
          <h2 className="font-bold text-lg">Hasil Perhitungan</h2>
          {type !== 'fitrah' && (
            <>
              <div className="flex justify-between text-sm">
                <span>Nisab (85 gram emas)</span>
                <span className="font-medium">{fmt(result.nisab)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Harta Bersih</span>
                <span className="font-medium">{fmt(result.harta)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className={`font-bold ${result.wajibZakat ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>
                  {result.wajibZakat ? '✅ Wajib Zakat' : '⚠️ Belum Mencapai Nisab'}
                </span>
              </div>
            </>
          )}
          {result.wajibZakat && (
            <div className="rounded-xl bg-white dark:bg-slate-900 p-4 text-center">
              <p className="text-sm text-slate-500">Total Zakat yang Harus Dibayar</p>
              <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">{fmt(result.zakatAmount)}</p>
              {type === 'penghasilan' && (
                <p className="text-xs text-slate-500 mt-1">= {fmt(result.zakatAmount / 12)} per bulan</p>
              )}
            </div>
          )}
          <p className="text-xs text-slate-500">
            Hasil ini bersifat estimasi. Konfirmasi ke BAZNAS atau lembaga zakat tepercaya untuk perhitungan final.
          </p>
          <a
            href="https://baznas.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm font-semibold text-emerald-700 dark:text-emerald-300 underline"
          >
            Bayar Zakat via BAZNAS ↗
          </a>
        </div>
      )}
    </div>
  );
}
