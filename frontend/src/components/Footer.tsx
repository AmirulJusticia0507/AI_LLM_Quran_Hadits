"use client";

import Link from "next/link";
import { BookOpen, Sparkles, ScrollText, Heart, ShieldCheck, Clock, Fingerprint, HeartHandshake, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-xl">
                🕌
              </div>
              <span className="font-bold text-xl bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
                Al-Hikmah AI
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Platform Asisten Keislaman berbasis Kecerdasan Buatan (AI) yang mengintegrasikan pencarian kontekstual Al-Qur&apos;an dan Hadits dengan rujukan sahih dan terpercaya.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Rujukan Sahih Al-Qur&apos;an & Kutubut Tis&apos;ah</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Navigasi Fitur
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Chatbot AI Keislaman</span>
                </Link>
              </li>
              <li>
                <Link href="/quran" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>E-Al-Qur&apos;an & Terjemahan</span>
                </Link>
              </li>
              <li>
                <Link href="/hadith" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-emerald-500" />
                  <span>Kumpulan Kitab Hadits</span>
                </Link>
              </li>
              <li>
                <Link href="/jadwal" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Jadwal Shalat & Hijriah</span>
                </Link>
              </li>
              <li>
                <Link href="/dzikir" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-emerald-500" />
                  <span>Dzikir Counter</span>
                </Link>
              </li>
              <li>
                <Link href="/asmaul" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>Asmaul Husna</span>
                </Link>
              </li>
              <li>
                <Link href="/doa" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-500" />
                  <span>Doa Harian</span>
                </Link>
              </li>
              <li>
                <Link href="/kiblat" className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  <span>Arah Kiblat</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">
              Informasi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Dikembangkan untuk memberikan kemudahan dalam mempelajari ajaran Islam. Selalu konfirmasikan hukum dan fatwa mendalam kepada ulama terpercaya.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} AI Qur&apos;an & Hadits System. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>untuk Ummat Islam</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privasi</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-emerald-500 transition-colors">Syarat & Ketentuan</Link>
            <span>•</span>
            <Link href="/help" className="hover:text-emerald-500 transition-colors">Bantuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
