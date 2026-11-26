"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, HeartHandshake } from 'lucide-react';

interface HajatItem {
  id: string;
  hajat: string;
  namaArab: string;
  namaLatin: string;
  arti: string;
  doa: string;
  penjelasan: string;
}

const HAJAT_LIST: HajatItem[] = [
  {
    id: 'rezeki',
    hajat: 'Kelapangan Rezeki & Pekerjaan Halal',
    namaArab: 'يَا رَزَّاقُ • يَا فَتَّاحُ • يَا غَنِيُّ',
    namaLatin: 'Ya Razzaq, Ya Fattah, Ya Ghaniyy',
    arti: 'Wahai Maha Pemberi Rezeki, Maha Pembuka Pintu Rahmat, Maha Kaya',
    doa: 'Ya Fattah Ya Razzaq, bukakanlah untukku pintu rezeki yang halal, berkah, dan mencukupkan.',
    penjelasan: 'Dipanjatkan saat memulai usaha, mencari pekerjaan, atau menghadapi kesempitan ekonomi disertai ikhtiar maksimal.'
  },
  {
    id: 'kesembuhan',
    hajat: 'Kesembuhan Penyakit & Kesehatan',
    namaArab: 'يَا شَافِي • يَا لَطِيفُ • يَا رَحِيمُ',
    namaLatin: 'Ya Syafi, Ya Lathif, Ya Rahim',
    arti: 'Wahai Maha Penyembuh, Maha Lembut, Maha Penyayang',
    doa: 'Allahumma Rabban-nas, adzhibil ba\'sa isyfi Antasy-Syafi, la syifa\'a illa syifa\'uka.',
    penjelasan: 'Menyerahkan kesembuhan sepenuhnya kepada Allah Asy-Syafi sambil tetap menjalani pengobatan medis terbaik.'
  },
  {
    id: 'ketenangan',
    hajat: 'Ketenangan Hati & Mengatasi Cemas',
    namaArab: 'يَا سَلَامُ • يَا مُؤْمِنُ • يَا وَكِيلُ',
    namaLatin: 'Ya Salam, Ya Mu\'min, Ya Wakil',
    arti: 'Wahai Sumber Kedamaian, Pemberi Keamanan, Maha Pemelihara Urusan',
    doa: 'Hasbunallahu wa ni\'mal Wakil. Ya Salam, tenangkanlah hatiku dengan ridha dan tawakal kepada-Mu.',
    penjelasan: 'Cocok dibaca saat pikiran gelisah, takut menghadapi masa depan, atau diterpa tekanan berat.'
  },
  {
    id: 'ilmu',
    hajat: 'Kecerdasan, Ilmu, & Kemudahan Ujian',
    namaArab: 'يَا عَلِيمُ • يَا حَكِيمُ • يَا هَادِي',
    namaLatin: 'Ya \'Alim, Ya Hakim, Ya Hadi',
    arti: 'Wahai Maha Mengetahui, Maha Bijaksana, Maha Pemberi Petunjuk',
    doa: 'Rabbi zidni \'ilman warzuqni fahman. Ya \'Alim Ya Hakim, karuniakanlah kepadaku ilmu yang bermanfaat dan kebijaksanaan.',
    penjelasan: 'Dibaca sebelum belajar, meneliti, menghadapi ujian, atau mengambil keputusan penting.'
  },
  {
    id: 'ampunan',
    hajat: 'Taubat & Memohon Ampunan Dosa',
    namaArab: 'يَا غَفَّارُ • يَا تَوَّابُ • يَا عَفُوُّ',
    namaLatin: 'Ya Ghaffar, Ya Tawwab, Ya \'Afuww',
    arti: 'Wahai Maha Pengampun, Maha Penerima Taubat, Maha Pemaaf',
    doa: 'Allahumma innaka \'Afuwwun tuhibbul \'afwa fa\'fu \'anni. Ya Tawwab, terimalah taubatku.',
    penjelasan: 'Sangat utama dibaca di sepertiga malam terakhir dan 10 malam terakhir Ramadan.'
  },
  {
    id: 'perlindungan',
    hajat: 'Perlindungan Diri, Keluarga, & Keamanan',
    namaArab: 'يَا حَفِيظُ • يَا قَوِيُّ • يَا وَلِيُّ',
    namaLatin: 'Ya Hafizh, Ya Qawiyy, Ya Waliyy',
    arti: 'Wahai Maha Penjaga, Maha Kuat, Maha Pelindung',
    doa: 'Ya Hafizh, jagalah diriku, keluargaku, dan agamaku dari segala keburukan lahir maupun batin.',
    penjelasan: 'Dipanjatkan saat hendak safar, melepas keluarga bepergian, atau memohon penjagaan dari fitnah.'
  }
];

export default function DoaAsmaulHusna() {
  const [selectedId, setSelectedId] = useState<string>('rezeki');
  const active = HAJAT_LIST.find((h) => h.id === selectedId) || HAJAT_LIST[0];

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
        <p className="text-xs uppercase tracking-widest text-emerald-200">Al-Hikmah • Panduan Berdoa</p>
        <h1 className="text-3xl font-bold">Pemilih Doa &amp; Asmaul Husna</h1>
        <p className="text-emerald-100 text-sm">
          Pilih kondisi hati atau hajat Anda untuk menemukan Asmaul Husna yang paling sesuai dipanjatkan (QS. Al-A&apos;raf: 180).
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {HAJAT_LIST.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedId(item.id)}
            className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all cursor-pointer ${
              selectedId === item.id
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-400'
            }`}
          >
            {item.hajat}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 p-7 space-y-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span>{active.hajat}</span>
        </div>

        <div className="text-center py-4 px-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 space-y-2">
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-relaxed" dir="rtl">
            {active.namaArab}
          </p>
          <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">{active.namaLatin}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">{active.arti}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
            Contoh Untaian Doa
          </p>
          <p className="text-sm font-medium italic text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
            &ldquo;{active.doa}&rdquo;
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{active.penjelasan}</p>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs">
          <Link href="/tadabbur-asmaul-husna" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
            Pelajari Modul Tadabbur Asmaul Husna →
          </Link>
          <Link href="/asmaul" className="font-semibold text-slate-600 dark:text-slate-300 hover:underline">
            Lihat Daftar Lengkap 99 Nama →
          </Link>
        </div>
      </div>
    </div>
  );
}
