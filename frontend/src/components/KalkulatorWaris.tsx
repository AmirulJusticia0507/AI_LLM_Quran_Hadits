"use client";

import { useState, useCallback } from 'react';

interface WarisResult {
  nama: string;
  bagian: string;
  nominal: number;
}

function hitungWaris(harta: number, ahliWaris: Record<string, boolean>): { results: WarisResult[]; radd: number } {
  const { suami, istri, anak_laki, anak_perempuan, ayah, ibu, nenek, saudara_laki, saudara_perempuan } = ahliWaris;

  const results: WarisResult[] = [];
  let sisaHarta = harta;
  const adaAnak = anak_laki || anak_perempuan;

  // Suami
  if (suami) {
    const bag = adaAnak ? 1 / 4 : 1 / 2;
    results.push({ nama: 'Suami', bagian: adaAnak ? '1/4' : '1/2', nominal: harta * bag });
    sisaHarta -= harta * bag;
  }

  // Istri
  if (istri) {
    const bag = adaAnak ? 1 / 8 : 1 / 4;
    results.push({ nama: 'Istri', bagian: adaAnak ? '1/8' : '1/4', nominal: harta * bag });
    sisaHarta -= harta * bag;
  }

  // Ibu
  if (ibu) {
    const bag = adaAnak || saudara_laki || saudara_perempuan ? 1 / 6 : 1 / 3;
    results.push({ nama: 'Ibu', bagian: adaAnak ? '1/6' : '1/3', nominal: harta * bag });
    sisaHarta -= harta * bag;
  }

  // Nenek (terhalang ibu & ayah)
  if (nenek && !ibu && !ayah) {
    results.push({ nama: 'Nenek', bagian: '1/6', nominal: harta * (1 / 6) });
    sisaHarta -= harta * (1 / 6);
  }

  // Ayah
  if (ayah) {
    if (adaAnak) {
      const bagAyah = harta * (1 / 6);
      results.push({ nama: 'Ayah', bagian: '1/6 + sisa (ashabah)', nominal: bagAyah });
      sisaHarta -= bagAyah;
      // Sisa akan dihitung sebagai ashabah setelah anak
    } else {
      results.push({ nama: 'Ayah', bagian: 'Ashabah (sisa)', nominal: 0 });
    }
  }

  // Anak-anak
  if (anak_laki && anak_perempuan) {
    // 2:1 ratio
    const bagLaki = (sisaHarta * 2) / 3;
    const bagPerempuan = sisaHarta / 3;
    results.push({ nama: 'Anak Laki-laki', bagian: '2 bagian dari sisa', nominal: bagLaki });
    results.push({ nama: 'Anak Perempuan', bagian: '1 bagian dari sisa', nominal: bagPerempuan });
    sisaHarta = 0;
  } else if (anak_laki) {
    results.push({ nama: 'Anak Laki-laki', bagian: 'Ashabah (sisa)', nominal: sisaHarta });
    sisaHarta = 0;
  } else if (anak_perempuan) {
    const bagAnakP = harta * (1 / 2);
    results.push({ nama: 'Anak Perempuan', bagian: '1/2', nominal: bagAnakP });
    sisaHarta -= bagAnakP;
  }

  // Ayah mengambil sisa jika ada anak
  if (ayah && adaAnak && sisaHarta > 0) {
    const idx = results.findIndex(r => r.nama === 'Ayah');
    if (idx >= 0) results[idx].nominal += sisaHarta;
    sisaHarta = 0;
  } else if (ayah && !adaAnak && sisaHarta > 0) {
    // Ayah ashabah ambil semua sisa
    const idx = results.findIndex(r => r.nama === 'Ayah');
    if (idx >= 0) results[idx].nominal = sisaHarta;
    sisaHarta = 0;
  }

  // Saudara (terhalang anak & ayah)
  if (!adaAnak && !ayah) {
    if (saudara_laki && sisaHarta > 0) {
      results.push({ nama: 'Saudara Laki-laki', bagian: 'Ashabah (sisa)', nominal: sisaHarta });
      sisaHarta = 0;
    } else if (saudara_perempuan && !saudara_laki) {
      const bagSP = harta * (1 / 2);
      results.push({ nama: 'Saudara Perempuan', bagian: '1/2', nominal: Math.min(bagSP, sisaHarta) });
      sisaHarta -= Math.min(bagSP, sisaHarta);
    }
  }

  return { results, radd: sisaHarta > 0 ? sisaHarta : 0 };
}

export default function KalkulatorWaris() {
  const [harta, setHarta] = useState('');
  const [ahliWaris, setAhliWaris] = useState<Record<string, boolean>>({
    suami: false, istri: false,
    anak_laki: false, anak_perempuan: false,
    ayah: false, ibu: false,
    kakek: false, nenek: false,
    saudara_laki: false, saudara_perempuan: false,
  });
  const [hasil, setHasil] = useState<{ results: WarisResult[]; radd: number } | null>(null);

  const toggle = (key: string) => {
    setAhliWaris(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === 'suami' && next.suami) next.istri = false;
      if (key === 'istri' && next.istri) next.suami = false;
      return next;
    });
    setHasil(null);
  };

  const hitung = useCallback(() => {
    const h = parseFloat(harta) || 0;
    if (h <= 0) return;
    setHasil(hitungWaris(h, ahliWaris));
  }, [harta, ahliWaris]);

  const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

  const ahliWarisOptions = [
    { key: 'suami', label: '👨 Suami' },
    { key: 'istri', label: '👩 Istri' },
    { key: 'anak_laki', label: '👦 Anak Laki-laki' },
    { key: 'anak_perempuan', label: '👧 Anak Perempuan' },
    { key: 'ayah', label: '👨‍🦳 Ayah' },
    { key: 'ibu', label: '👩‍🦳 Ibu' },
    { key: 'kakek', label: '👴 Kakek' },
    { key: 'nenek', label: '👵 Nenek' },
    { key: 'saudara_laki', label: '🧑 Saudara Laki-laki' },
    { key: 'saudara_perempuan', label: '👱‍♀️ Saudara Perempuan' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <header className="rounded-3xl bg-linear-to-br from-teal-800 to-emerald-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-teal-200">Al-Hikmah • Kalkulator Islami</p>
        <h1 className="text-3xl font-bold">Kalkulator Waris (Faraidh)</h1>
        <p className="text-teal-100 text-sm">Hitung pembagian harta waris Islam sesuai Al-Qur'an dan mazhab Syafi'i.</p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Total Harta Warisan Bersih (Rp)</label>
          <input
            type="number"
            value={harta}
            onChange={e => setHarta(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
            placeholder="Setelah dikurangi hutang & biaya jenazah"
          />
          <p className="text-xs text-slate-500 mt-1">
            Harta bersih = harta kotor − utang almarhum − biaya jenazah − wasiat (maks. 1/3)
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Ahli Waris yang Ada</label>
          <div className="grid grid-cols-2 gap-2">
            {ahliWarisOptions.map(opt => (
              <label
                key={opt.key}
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-emerald-500 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={ahliWaris[opt.key]}
                  onChange={() => toggle(opt.key)}
                  className="accent-emerald-600 h-4 w-4"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={hitung}
          className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold transition-colors"
        >
          Hitung Pembagian Waris
        </button>
      </div>

      {hasil && (
        <div className="rounded-2xl border border-teal-500 bg-teal-50 dark:bg-teal-950/40 p-6 space-y-4">
          <h2 className="font-bold text-lg">Hasil Pembagian Waris</h2>
          <div className="space-y-2">
            {hasil.results.map((r, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-900">
                <div>
                  <p className="font-semibold text-sm">{r.nama}</p>
                  <p className="text-xs text-slate-500">{r.bagian}</p>
                </div>
                <p className="font-bold text-teal-700 dark:text-teal-300 text-sm">{fmt(r.nominal)}</p>
              </div>
            ))}
            {hasil.radd > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  ⚠️ Sisa harta {fmt(hasil.radd)} — perlu perhitungan radd/aul bersama ahli faraidh.
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Ini adalah perhitungan dasar. Kasus kompleks memerlukan konsultasi dengan ahli faraidh atau Pengadilan Agama.
          </p>
          <a
            href="https://pa.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm font-semibold text-teal-700 dark:text-teal-300 underline"
          >
            Konsultasi ke Pengadilan Agama ↗
          </a>
        </div>
      )}
    </div>
  );
}
