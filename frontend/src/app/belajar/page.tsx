import type { Metadata } from 'next';
import Link from 'next/link';
import { courseLinks } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Pusat Belajar Islam - 17 Modul Interaktif',
  description: 'Pusat Belajar Islam 17 Modul Lengkap: Tazkiyatun Nafs, Aqidah & Eskatologi, Fiqh Ibadah, Ushul Fiqh, Munakahat, Muamalah, Integritas Anti-Korupsi, Komparasi Agama, Sains & Sunnatullah, Pangan Halal, Fiqh Medis, Siroh Nabawiyah, Musthalah Hadits, Peradaban Islam, Parenting Islami, Ilmu Tajwid, dan Ilmu Balaghah.',
};

export default function LearningPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-8 sm:p-12 text-white space-y-4">
        <p className="text-sm text-emerald-200">Ilmu • Amal • Akhlak</p>
        <h1 className="text-3xl sm:text-4xl font-bold">Pusat Belajar Islam</h1>
        <p className="text-emerald-100 leading-relaxed max-w-2xl">
          Perdalam aqidah & eskatologi, rawat hati, pelajari fiqih ibadah, ushul fiqh, pernikahan, muamalah bisnis, etika integritas anti-korupsi, komparasi agama, sains Al-Qur’an, pangan halal, fiqih medis, kritik hadits, sejarah peradaban emas, parenting Islami, teladani Rasulullah ﷺ, perbaiki tajwid, dan balaghah. 17 modul interaktif komprehensif siap diakses offline & online.
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
            <p className="mt-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300">Mulai belajar →</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/praktik-ibadah" className="block rounded-2xl bg-emerald-700 p-6 text-white font-semibold">
          Panduan Bergambar Wudhu dan Shalat Nabi
        </Link>
        <Link href="/panduan-ibadah" className="block rounded-2xl bg-teal-800 p-6 text-white font-semibold">
          Panduan Jenazah, Yasinan, Haji dan Umrah
        </Link>
      </div>

      <Link
        href="/matan"
        className="block rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 p-6 text-emerald-800 dark:text-emerald-200 hover:underline"
      >
        <span className="block font-bold">Perpustakaan Matan Kitab →</span>
        <span className="block text-sm mt-2">Baca Arba’in Nawawi dan Bulughul Maram beserta rujukan sumbernya.</span>
      </Link>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Materi dasar disertai rujukan untuk dipelajari lebih lanjut. Latihan bacaan Al-Qur’an sebaiknya disimak langsung oleh guru.
      </p>
    </div>
  );
}
