"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { courseLinks } from '@/data/learning';
import { useLanguage } from '@/context/LanguageContext';

type CategoryKey =
  | 'Semua'
  | 'Aqidah & Hati'
  | 'Al-Qur\'an & Bahasa'
  | 'Fiqh & Ibadah'
  | 'Muamalah & Sosial'
  | 'Sejarah & Tokoh'
  | 'Keluarga & Adab';

const CATEGORIES: CategoryKey[] = [
  'Semua',
  'Aqidah & Hati',
  'Al-Qur\'an & Bahasa',
  'Fiqh & Ibadah',
  'Muamalah & Sosial',
  'Sejarah & Tokoh',
  'Keluarga & Adab',
];

function getCourseCategory(href: string): CategoryKey {
  if (['/aqidah', '/aqidah-ahlussunnah', '/tazkiyah', '/tadabbur-asmaul-husna', '/alam-ghaib', '/fitnah-akhir-zaman', '/komparasi', '/psikologi-islam'].includes(href)) {
    return 'Aqidah & Hati';
  }
  if (['/ulumul-quran', '/ilmu-tafsir', '/ilmu-qiraat', '/tajweed', '/metode-tahfidz', '/tadabbur-juz-amma', '/tadabbur-surat-pilihan', '/kisah-pilihan-quran', '/nahwu-dasar', '/sharaf-dasar', '/balaghoh', '/kaligrafi-islam', '/sains'].includes(href)) {
    return 'Al-Qur\'an & Bahasa';
  }
  if (['/fiqh', '/ushul-fiqh', '/fiqh-jamaah-sujud', '/fiqh-safar', '/fiqh-ramadan', '/fiqh-hari-raya', '/zakat-kontemporer', '/fiqh-haji-umrah', '/fiqh-qurban-aqiqah', '/jenazah-praktis', '/fiqh-pasien', '/fiqh-darah-wanita', '/fiqh-sumpah-kaffarah', '/fiqh-sembelihan-halal', '/makanan-halal', '/medis', '/ilmu-falak'].includes(href)) {
    return 'Fiqh & Ibadah';
  }
  if (['/muamalah', '/ekonomi-syariah', '/wakaf', '/fiqh-properti-gadai', '/fiqh-ketenagakerjaan', '/fiqh-kontemporer', '/fiqh-jinayat-hudud', '/fiqh-sosial-kemanusiaan', '/siyasah', '/integritas', '/lingkungan', '/kepemimpinan-islami', '/lembaga-islam-indonesia'].includes(href)) {
    return 'Muamalah & Sosial';
  }
  if (['/sirah', '/kisah-nabi', '/sahabat-surga', '/khulafaur-rasyidin', '/sejarah-dinasti-islam', '/peradaban', '/imam-madzhab', '/ilmuwan-muslim', '/sejarah-pendidikan-islam', '/baitul-maqdis', '/masjid-bersejarah', '/islam-nusantara', '/musthalah-hadits', '/takhrij-hadits', '/ilmu-mantik-munazharah'].includes(href)) {
    return 'Sejarah & Tokoh';
  }
  return 'Keluarga & Adab';
}

export default function LearningPage() {
  const { t, language } = useLanguage();
  const [descExpanded, setDescExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('Semua');

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return courseLinks
      .map((course, idx) => ({ ...course, originalIndex: idx + 1, category: getCourseCategory(course.href) }))
      .filter((course) => {
        const matchCat = selectedCategory === 'Semua' || course.category === selectedCategory;
        if (!matchCat) return false;
        if (!q) return true;
        return (
          course.title.toLowerCase().includes(q) ||
          course.description.toLowerCase().includes(q) ||
          course.category.toLowerCase().includes(q)
        );
      });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-8 sm:p-12 text-white space-y-4">
        <p className="text-sm text-emerald-200">{t("belajar.subtitle")}</p>
        <h1 className="text-3xl sm:text-4xl font-bold">{t("belajar.title")}</h1>
        <div className="max-w-2xl space-y-2">
          <p
            onClick={() => setDescExpanded((prev) => !prev)}
            className={`text-emerald-100 leading-relaxed cursor-pointer transition-all ${
              descExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {t("belajar.description")}
          </p>
          <button
            type="button"
            onClick={() => setDescExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-200 hover:text-white underline underline-offset-4 cursor-pointer"
          >
            {descExpanded
              ? language === 'en'
                ? 'Show less ▲'
                : 'Tampilkan lebih sedikit ▲'
              : language === 'en'
                ? 'Read more ▼'
                : 'Selengkapnya ▼'}
          </button>
        </div>
      </header>

      {/* Search & Category Filter */}
      <section className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' ? `Search ${courseLinks.length} learning modules...` : `Cari dari ${courseLinks.length} modul pembelajaran...`}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pl-11 pr-10 py-3 text-sm focus:outline-emerald-500 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Menampilkan <strong className="text-emerald-700 dark:text-emerald-400">{filteredCourses.length}</strong> dari {courseLinks.length} modul pembelajaran
        </p>
      </section>

      {filteredCourses.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-5">
          {filteredCourses.map((course) => (
            <Link
              key={course.href}
              href={course.href}
              className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 hover:border-emerald-500 focus-visible:outline-emerald-500 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {String(course.originalIndex).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  {course.category}
                </span>
              </div>
              <h2 className="text-xl font-bold mt-4 mb-3">{course.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{course.description}</p>
              <p className="mt-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300">{t("belajar.start")}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center space-y-3">
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Tidak ada modul yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 cursor-pointer"
          >
            Tampilkan Semua Modul
          </button>
        </div>
      )}

      <div className="pt-4 space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === 'en' ? 'Interactive Islamic Tools & Visual Guides' : 'Alat Bantu Islami & Panduan Interaktif'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'en'
              ? 'Practical calculators, trackers, flashcards, and illustrated worship guides.'
              : 'Kalkulator fikih, tracker ibadah, flashcard Al-Qur\'an, dan panduan praktik bergambar.'}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/hijaiyah" className="block rounded-2xl bg-linear-to-br from-emerald-600 to-teal-700 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">{t("belajar.hijaiyah.badge")}</span>
          {t("belajar.hijaiyah.cta")}
        </Link>
        <Link href="/praktik-ibadah" className="block rounded-2xl bg-emerald-700 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">{t("belajar.praktik.badge")}</span>
          {t("belajar.praktik.cta")}
        </Link>
        <Link href="/panduan-ibadah" className="block rounded-2xl bg-teal-800 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-teal-200 mb-1">{t("belajar.panduan.badge")}</span>
          {t("belajar.panduan.cta")}
        </Link>
        <Link href="/silsilah-habaib" className="block rounded-2xl bg-linear-to-br from-teal-900 to-slate-950 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform border border-emerald-400/20">
          <span className="block text-xs uppercase tracking-wider text-amber-300 mb-1">Bagan Interaktif</span>
          Silsilah Habaib Ba &apos;Alawi
        </Link>
        <Link href="/kalkulator-zakat" className="block rounded-2xl bg-linear-to-br from-amber-600 to-orange-700 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-amber-200 mb-1">Alat Hitung</span>
          Kalkulator Zakat Lengkap
        </Link>
        <Link href="/kalkulator-waris" className="block rounded-2xl bg-linear-to-br from-cyan-700 to-blue-800 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-cyan-200 mb-1">Alat Hitung Faraidh</span>
          Kalkulator Waris Islam
        </Link>
        <Link href="/kuis-islam" className="block rounded-2xl bg-linear-to-br from-purple-700 to-indigo-800 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-purple-200 mb-1">Uji Pemahaman</span>
          Kuis Islam Harian
        </Link>
        <Link href="/kalkulator-fidyah" className="block rounded-2xl bg-linear-to-br from-rose-700 to-amber-800 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-rose-200 mb-1">Alat Hitung Puasa</span>
          Kalkulator Fidyah &amp; Qadha
        </Link>
        <Link href="/flashcard-quran" className="block rounded-2xl bg-linear-to-br from-emerald-700 to-cyan-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">Latihan Mufrodat</span>
          Flashcard Kosakata Al-Qur&apos;an
        </Link>
        <Link href="/kalender-hijriah" className="block rounded-2xl bg-linear-to-br from-sky-700 to-indigo-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-sky-200 mb-1">Kalender &amp; Puasa Sunnah</span>
          Konverter Tanggal Hijriah
        </Link>
        <Link href="/tracker-khatam" className="block rounded-2xl bg-linear-to-br from-emerald-700 to-teal-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">Tilawah &amp; Tahfidz</span>
          Tracker Khatam 30 Juz
        </Link>
        <Link href="/kalkulator-safar" className="block rounded-2xl bg-linear-to-br from-teal-700 to-cyan-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-teal-200 mb-1">Panduan Musafir</span>
          Kalkulator Safar Jama&apos;-Qashar
        </Link>
        <Link href="/mutabaah-yaumiyah" className="block rounded-2xl bg-linear-to-br from-emerald-700 to-green-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">Muhasabah Harian</span>
          Mutaba&apos;ah Yaumiyah
        </Link>
        <Link href="/kalkulator-qurban" className="block rounded-2xl bg-linear-to-br from-amber-700 to-orange-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-amber-200 mb-1">Panduan Panitia</span>
          Kalkulator Daging Qurban
        </Link>
        <Link href="/kalkulator-kaffarah" className="block rounded-2xl bg-linear-to-br from-slate-700 to-emerald-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">Alat Hitung Fikih</span>
          Kalkulator Kaffarah
        </Link>
        <Link href="/doa-asmaul-husna" className="block rounded-2xl bg-linear-to-br from-teal-700 to-emerald-950 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-teal-200 mb-1">Panduan Berdoa</span>
          Pemilih Doa &amp; Asmaul Husna
        </Link>
        <Link href="/simulasi-murabahah" className="block rounded-2xl bg-linear-to-br from-emerald-700 to-cyan-900 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">Ekonomi Syariah</span>
          Simulasi KPR Murabahah
        </Link>
        <Link href="/panduan-haid" className="block rounded-2xl bg-linear-to-br from-rose-700 to-purple-950 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-rose-200 mb-1">Fiqh Muslimah</span>
          Panduan Haid &amp; Istihadhah
        </Link>
        <Link href="/kamus-arab" className="block rounded-2xl bg-linear-to-br from-emerald-700 to-teal-950 p-6 text-white font-semibold shadow-sm hover:scale-[1.01] transition-transform">
          <span className="block text-xs uppercase tracking-wider text-emerald-200 mb-1">Bahasa Arab</span>
          Kamus Bahasa Arab
        </Link>
      </div>

      <Link
        href="/matan"
        className="block rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-6 text-emerald-800 dark:text-emerald-200 hover:underline"
      >
        <span className="block font-bold">{t("belajar.matan.title")}</span>
        <span className="block text-sm mt-2">{t("belajar.matan.desc")}</span>
      </Link>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        {t("belajar.disclaimer")}
      </p>
    </div>
  );
}
