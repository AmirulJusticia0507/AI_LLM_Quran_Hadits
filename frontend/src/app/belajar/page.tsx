import type { Metadata } from 'next';
import Link from 'next/link';
import { courseLinks } from '@/data/learning';

export const metadata: Metadata = { title: 'Pusat Belajar Islam', description: 'Belajar Tazkiyatun Nafs, Fiqh Ibadah, Siroh Nabawiyah, dan Ilmu Tajwid beserta makhraj huruf.' };

export default function LearningPage() {
  return <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
    <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-8 sm:p-12 text-white space-y-4">
      <p className="text-sm text-emerald-200">Ilmu • Amal • Akhlak</p>
      <h1 className="text-3xl sm:text-4xl font-bold">Pusat Belajar Islam</h1>
      <p className="text-emerald-100 leading-relaxed max-w-2xl">Rawat hati, pelajari ibadah, teladani Rasulullah ﷺ, dan perbaiki bacaan Al-Qur’an. Pilih materi dan belajar sesuai ritmemu.</p>
    </header>
    <div className="grid sm:grid-cols-2 gap-5">{courseLinks.map((course, index) => <Link key={course.href} href={course.href} className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 hover:border-emerald-500 focus-visible:outline-emerald-500 transition-colors">
      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">0{index + 1}</span>
      <h2 className="text-xl font-bold mt-4 mb-3">{course.title}</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{course.description}</p>
      <p className="mt-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300">Mulai belajar →</p>
    </Link>)}</div>
    <p className="text-sm text-slate-500 dark:text-slate-400">Materi dasar disertai rujukan untuk dipelajari lebih lanjut. Latihan bacaan Al-Qur’an sebaiknya disimak langsung oleh guru.</p>
  </div>;
}
