"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, Shuffle } from 'lucide-react';

interface VocabCard {
  arab: string;
  latin: string;
  arti: string;
  kategori: 'Kata Ganti & Sambung' | 'Kata Kerja' | 'Kata Benda' | 'Sifat Allah';
  contoh: string;
}

const VOCAB_CARDS: VocabCard[] = [
  { arab: 'هُوَ', latin: 'Huwa', arti: 'Dia (laki-laki)', kategori: 'Kata Ganti & Sambung', contoh: 'قُلْ هُوَ اللَّهُ أَحَدٌ (QS. Al-Ikhlas: 1)' },
  { arab: 'الَّذِينَ', latin: 'Alladzīna', arti: 'Orang-orang yang', kategori: 'Kata Ganti & Sambung', contoh: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ (QS. Al-Fatihah: 7)' },
  { arab: 'إِنَّ', latin: 'Inna', arti: 'Sesungguhnya', kategori: 'Kata Ganti & Sambung', contoh: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا (QS. Al-Insyirah: 6)' },
  { arab: 'عَلَىٰ', latin: '\'Alā', arti: 'Di atas / Atas', kategori: 'Kata Ganti & Sambung', contoh: 'عَلَىٰ صِرَاطٍ مُسْتَقِيمٍ (QS. Yasin: 4)' },
  { arab: 'فِي', latin: 'Fī', arti: 'Di dalam / Pada', kategori: 'Kata Ganti & Sambung', contoh: 'فِي قُلُوبِهِمْ مَرَضٌ (QS. Al-Baqarah: 10)' },
  { arab: 'مِنْ', latin: 'Min', arti: 'Dari / Sebagian', kategori: 'Kata Ganti & Sambung', contoh: 'مِنَ الْجِنَّةِ وَالنَّاسِ (QS. An-Nas: 6)' },
  { arab: 'قَالَ', latin: 'Qāla', arti: 'Dia telah berkata', kategori: 'Kata Kerja', contoh: 'قَالَ إِنِّي عَبْدُ اللَّهِ (QS. Maryam: 30)' },
  { arab: 'آمَنُوا', latin: 'Āmanū', arti: 'Mereka telah beriman', kategori: 'Kata Kerja', contoh: 'يَا أَيُّهَا الَّذِينَ آمَنُوا (QS. Al-Baqarah: 183)' },
  { arab: 'يَعْلَمُ', latin: 'Ya\'lamu', arti: 'Dia mengetahui', kategori: 'Kata Kerja', contoh: 'وَاللَّهُ يَعْلَمُ وَأَنْتُمْ لَا تَعْلَمُونَ (QS. Al-Baqarah: 216)' },
  { arab: 'خَلَقَ', latin: 'Khalaqa', arti: 'Dia telah menciptakan', kategori: 'Kata Kerja', contoh: 'خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ (QS. Al-Alaq: 2)' },
  { arab: 'أَنْزَلَ', latin: 'Anzala', arti: 'Dia telah menurunkan', kategori: 'Kata Kerja', contoh: 'إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ (QS. Al-Qadr: 1)' },
  { arab: 'يَغْفِرُ', latin: 'Yaghfiru', arti: 'Dia mengampuni', kategori: 'Kata Kerja', contoh: 'إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا (QS. Az-Zumar: 53)' },
  { arab: 'رَبّ', latin: 'Rabb', arti: 'Tuhan Pemelihara', kategori: 'Kata Benda', contoh: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (QS. Al-Fatihah: 2)' },
  { arab: 'سَمَاء', latin: 'Samā\'', arti: 'Langit', kategori: 'Kata Benda', contoh: 'وَالسَّمَاءِ وَالطَّارِقِ (QS. Ath-Thariq: 1)' },
  { arab: 'أَرْض', latin: 'Ardh', arti: 'Bumi', kategori: 'Kata Benda', contoh: 'فِي السَّمَاوَاتِ وَالْأَرْضِ (QS. Al-Baqarah: 255)' },
  { arab: 'قَلْب / قُلُوب', latin: 'Qalb / Qulūb', arti: 'Hati / Hati-hati', kategori: 'Kata Benda', contoh: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ (QS. Ar-Ra\'d: 28)' },
  { arab: 'نُور', latin: 'Nūr', arti: 'Cahaya', kategori: 'Kata Benda', contoh: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ (QS. An-Nur: 35)' },
  { arab: 'صِرَاط', latin: 'Shirāth', arti: 'Jalan', kategori: 'Kata Benda', contoh: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (QS. Al-Fatihah: 6)' },
  { arab: 'الرَّحْمَٰنُ', latin: 'Ar-Rahmān', arti: 'Maha Pengasih', kategori: 'Sifat Allah', contoh: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (QS. Al-Fatihah: 1)' },
  { arab: 'الْحَكِيمُ', latin: 'Al-Hakīm', arti: 'Maha Bijaksana', kategori: 'Sifat Allah', contoh: 'وَهُوَ الْعَزِيزُ الْحَكِيمُ (QS. Al-Hasyr: 1)' },
  { arab: 'الْعَلِيمُ', latin: 'Al-\'Alīm', arti: 'Maha Mengetahui', kategori: 'Sifat Allah', contoh: 'إِنَّهُ هُوَ السَّمِيعُ الْعَلِيمُ (QS. Al-Anfal: 61)' },
  { arab: 'الْغَفُورُ', latin: 'Al-Ghafūr', arti: 'Maha Pengampun', kategori: 'Sifat Allah', contoh: 'وَهُوَ الْغَفُورُ الرَّحِيمُ (QS. Yunus: 107)' },
];

export default function FlashcardQuran() {
  const [kategori, setKategori] = useState<string>('Semua');
  const [index, setIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [hafal, setHafal] = useState<Record<string, boolean>>({});

  const categories = ['Semua', 'Kata Ganti & Sambung', 'Kata Kerja', 'Kata Benda', 'Sifat Allah'];
  const filtered = kategori === 'Semua' ? VOCAB_CARDS : VOCAB_CARDS.filter((c) => c.kategori === kategori);
  const current = filtered[index] || filtered[0];

  const handleSelectCategory = (cat: string) => {
    setKategori(cat);
    setIndex(0);
    setFlipped(false);
  };

  const handleNext = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const handleRandom = () => {
    setFlipped(false);
    const nextIdx = Math.floor(Math.random() * filtered.length);
    setIndex(nextIdx);
  };

  const toggleHafal = () => {
    setHafal((prev) => ({ ...prev, [current.arab]: !prev[current.arab] }));
  };

  const totalHafal = Object.values(hafal).filter(Boolean).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-cyan-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-emerald-200">Al-Hikmah • Latihan Kosakata</p>
        <h1 className="text-3xl font-bold">Flashcard Kosakata Al-Qur&apos;an</h1>
        <p className="text-emerald-100 text-sm">
          Hafalkan kosakata kunci yang paling sering berulang dalam Al-Qur&apos;an agar lebih mudah memahami bacaan shalat.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleSelectCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              kategori === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Kartu {index + 1} dari {filtered.length}</span>
        <span>Sudah Hafal: <strong className="text-emerald-600 dark:text-emerald-400">{totalHafal}/{VOCAB_CARDS.length}</strong></span>
      </div>

      <button
        type="button"
        onClick={() => setFlipped(!flipped)}
        className="w-full min-h-[260px] rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900 p-8 flex flex-col items-center justify-center text-center shadow-sm hover:border-emerald-400 transition-all cursor-pointer"
      >
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mb-4">
          {current.kategori}
        </span>

        {!flipped ? (
          <div className="space-y-3">
            <p className="text-5xl font-bold text-slate-900 dark:text-white leading-relaxed" dir="rtl">
              {current.arab}
            </p>
            <p className="text-sm text-slate-400 flex items-center justify-center gap-1.5 pt-2">
              <RotateCw className="w-3.5 h-3.5" />
              Klik kartu untuk melihat arti &amp; contoh ayat
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{current.arti}</p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pelafalan: {current.latin}</p>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-400 mb-1">Contoh dalam Al-Qur&apos;an:</p>
              <p className="text-base font-medium text-slate-800 dark:text-slate-200">{current.contoh}</p>
            </div>
          </div>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium"
          >
            Berikutnya
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleRandom}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium"
            title="Acak kartu"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={toggleHafal}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            hafal[current.arab]
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {hafal[current.arab] ? 'Sudah Hafal' : 'Tandai Hafal'}
        </button>
      </div>
    </div>
  );
}
