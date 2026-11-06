import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Database, FileCheck2, Network, ScrollText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Jelajah Rujukan",
  description: "Kenali koleksi sumber Al-Qur’an, hadits, doa, dan materi belajar yang digunakan Al-Hikmah AI.",
};

const collections = [
  { title: "Al-Qur’an", count: "114 surah", description: "Teks Arab, transliterasi, terjemahan Indonesia, murottal, dan tafsir ringkas.", href: "/quran", icon: BookOpen, tags: ["Ayat", "Tafsir", "Murottal"] },
  { title: "Kitab Hadits", count: "13 koleksi", description: "Kutubut Tis’ah serta Riyadhus Shalihin, Arba’in Nawawi, Musnad Asy-Syafi’i, dan Bulughul Maram.", href: "/hadith", icon: ScrollText, tags: ["Riwayat", "Bab", "Terjemahan"] },
  { title: "Doa & Dzikir", count: "267 doa", description: "Koleksi Hisnul Muslim dengan bacaan Arab, arti, kategori, dan sumber yang tersedia pada data.", href: "/doa", icon: ShieldCheck, tags: ["Hisnul Muslim", "Ibadah harian"] },
  { title: "Matan Hadits", count: "2 kitab", description: "Pembacaan terstruktur Arba’in Nawawi dan Bulughul Maram untuk pembelajaran.", href: "/matan", icon: FileCheck2, tags: ["Matan", "Pembelajaran"] },
];

export default function ReferencesPage() {
  return <div className="space-y-8">
    <section className="rounded-3xl bg-linear-to-br from-emerald-700 via-teal-700 to-slate-900 p-7 text-white shadow-xl sm:p-10">
      <div className="flex items-center gap-2 text-emerald-200"><Network className="h-5 w-5" /><span className="text-sm font-semibold">Peta pengetahuan Al-Hikmah AI</span></div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Jelajahi rujukan, bukan hanya jawaban.</h1>
      <p className="mt-4 max-w-3xl leading-7 text-emerald-50">Setiap jawaban AI yang menyebut dalil kini dapat membuka panel rujukan. Halaman ini menjelaskan koleksi yang benar-benar tersedia agar pembaca dapat memeriksa teks sumbernya sendiri.</p>
    </section>

    <section aria-labelledby="koleksi" className="space-y-4">
      <div><h2 id="koleksi" className="text-2xl font-bold">Koleksi rujukan</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Pilih koleksi untuk membaca sumber asli dan menelusuri topik terkait.</p></div>
      <div className="grid gap-4 md:grid-cols-2">
        {collections.map(collection => { const Icon = collection.icon; return <Link key={collection.href} href={collection.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4"><div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><Icon className="h-6 w-6" /></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{collection.count}</span></div>
          <h3 className="mt-4 text-lg font-bold">{collection.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{collection.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{collection.tags.map(tag => <span key={tag} className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">{tag}</span>)}</div>
          <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">Buka koleksi <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
        </Link>; })}
      </div>
    </section>

    <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
      <div className="flex gap-3"><Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" /><div><h2 className="font-bold text-amber-950 dark:text-amber-100">Batas rujukan</h2><p className="mt-1 text-sm leading-6 text-amber-900 dark:text-amber-200">Al-Hikmah AI bukan lembaga fatwa dan halaman ini tidak menyatakan pendapat organisasi tertentu. Untuk persoalan hukum atau khilafiyah, periksa sumber lalu tabayyun kepada ulama atau lembaga yang kompeten.</p></div></div>
    </section>
  </div>;
}
