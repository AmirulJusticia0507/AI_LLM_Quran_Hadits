"use client";

import Link from 'next/link';
import { courseLinks } from '@/data/learning';
import { useLanguage } from '@/context/LanguageContext';

export default function LearningPage() {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-8 sm:p-12 text-white space-y-4">
        <p className="text-sm text-emerald-200">{t("belajar.subtitle")}</p>
        <h1 className="text-3xl sm:text-4xl font-bold">{t("belajar.title")}</h1>
        <p className="text-emerald-100 leading-relaxed max-w-2xl">
          {t("belajar.description")}
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-5">
        {courseLinks.map((course, index) => (
          <Link
            key={course.href}
            href={course.href}
            className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 hover:border-emerald-500 focus-visible:outline-emerald-500 transition-colors"
          >
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 className="text-xl font-bold mt-4 mb-3">{course.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{course.description}</p>
            <p className="mt-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300">{t("belajar.start")}</p>
          </Link>
        ))}
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
