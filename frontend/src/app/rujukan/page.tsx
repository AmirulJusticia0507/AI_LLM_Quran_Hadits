"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Database, FileCheck2, Network, ScrollText, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ReferencesPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const collections = [
    {
      title: "Al-Qur’an",
      count: isEn ? "114 surahs" : "114 surah",
      description: isEn
        ? "Arabic text, transliteration, Indonesian translation, audio recitation, and brief tafsir."
        : "Teks Arab, transliterasi, terjemahan Indonesia, murottal, dan tafsir ringkas.",
      href: "/quran",
      icon: BookOpen,
      tags: isEn ? ["Verses", "Tafsir", "Recitation"] : ["Ayat", "Tafsir", "Murottal"],
    },
    {
      title: isEn ? "Hadith Compilations" : "Kitab Hadits",
      count: isEn ? "13 collections" : "13 koleksi",
      description: isEn
        ? "The Nine Major Books (Kutubut Tis'ah) plus Riyadhus Shalihin, Arba'in An-Nawawi, Musnad Ash-Shafi'i, and Bulughul Maram."
        : "Kutubut Tis’ah serta Riyadhus Shalihin, Arba’in Nawawi, Musnad Asy-Syafi’i, dan Bulughul Maram.",
      href: "/hadith",
      icon: ScrollText,
      tags: isEn ? ["Narrations", "Chapters", "Translations"] : ["Riwayat", "Bab", "Terjemahan"],
    },
    {
      title: isEn ? "Dua & Dhikr" : "Doa & Dzikir",
      count: isEn ? "267 prayers" : "267 doa",
      description: isEn
        ? "Hisnul Muslim collection with Arabic text, meanings, categories, and references from authentic sources."
        : "Koleksi Hisnul Muslim dengan bacaan Arab, arti, kategori, dan sumber yang tersedia pada data.",
      href: "/doa",
      icon: ShieldCheck,
      tags: ["Hisnul Muslim", isEn ? "Daily Worship" : "Ibadah harian"],
    },
    {
      title: isEn ? "Matan Books" : "Matan Hadits",
      count: isEn ? "2 books" : "2 kitab",
      description: isEn
        ? "Structured reading of Arba'in An-Nawawi and Bulughul Maram for focused study."
        : "Pembacaan terstruktur Arba’in Nawawi dan Bulughul Maram untuk pembelajaran.",
      href: "/matan",
      icon: FileCheck2,
      tags: ["Matan", isEn ? "Learning" : "Pembelajaran"],
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-linear-to-br from-emerald-700 via-teal-700 to-slate-900 p-7 text-white shadow-xl sm:p-10">
        <div className="flex items-center gap-2 text-emerald-200">
          <Network className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {isEn ? "Al-Hikmah AI Knowledge Map" : "Peta pengetahuan Al-Hikmah AI"}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {isEn ? "Explore references, not just answers." : "Jelajahi rujukan, bukan hanya jawaban."}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-emerald-50">
          {isEn
            ? "Every AI answer citing dalil can now open a reference panel. This page details the collections available so readers can examine primary source texts directly."
            : "Setiap jawaban AI yang menyebut dalil kini dapat membuka panel rujukan. Halaman ini menjelaskan koleksi yang benar-benar tersedia agar pembaca dapat memeriksa teks sumbernya sendiri."}
        </p>
      </section>

      <section aria-labelledby="koleksi" className="space-y-4">
        <div>
          <h2 id="koleksi" className="text-2xl font-bold">
            {isEn ? "Reference Collections" : "Koleksi rujukan"}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {isEn
              ? "Select a collection to read authentic primary sources and explore related topics."
              : "Pilih koleksi untuk membaca sumber asli dan menelusuri topik terkait."}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {collections.map((collection) => {
            const Icon = collection.icon;
            return (
              <Link
                key={collection.href}
                href={collection.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {collection.count}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">{collection.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{collection.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collection.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {isEn ? "Open collection" : "Buka koleksi"}{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="flex gap-3">
          <Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />
          <div>
            <h2 className="font-bold text-amber-950 dark:text-amber-100">
              {isEn ? "Scope & Limitations" : "Batas rujukan"}
            </h2>
            <p className="mt-1 text-sm leading-6 text-amber-900 dark:text-amber-200">
              {isEn
                ? "Al-Hikmah AI is not a fatwa institution and does not represent any specific organization's stance. For legal or disputed religious questions, verify primary sources and consult qualified scholars."
                : "Al-Hikmah AI bukan lembaga fatwa dan halaman ini tidak menyatakan pendapat organisasi tertentu. Untuk persoalan hukum atau khilafiyah, periksa sumber lalu tabayyun kepada ulama atau lembaga yang kompeten."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
