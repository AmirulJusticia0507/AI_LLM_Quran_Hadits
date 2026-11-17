"use client";

import Link from 'next/link';
import { GitBranch, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function IslamNusantaraBanner() {
  const { language } = useLanguage();
  const en = language === 'en';
  return (
    <div className="max-w-5xl mx-auto px-4 pt-4">
      <Link href="/silsilah-habaib" className="flex items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-slate-950 text-white border border-emerald-500/30 shadow-xl hover:shadow-emerald-950/40 transition-all hover:scale-[1.01] group">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="p-3 rounded-2xl bg-white/10 text-emerald-300 shrink-0"><GitBranch className="w-6 h-6" /></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base">{en ? 'Interactive Habaib Lineage Chart' : 'Bagan Interaktif Silsilah Nasab Habaib'}</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold"><Sparkles className="w-3 h-3" /> {en ? 'Animated lineage' : 'Animasi Alur'}</span>
            </div>
            <p className="text-xs text-emerald-100/80 mt-1 line-clamp-1">{en ? 'Follow the lineage from the Prophet ﷺ, Sayyidah Fatimah, and Sayyidina Husain to Ba ‘Alawi families in the Nusantara.' : 'Telusuri pohon silsilah bergerak dari Rasulullah ﷺ, Sayyidah Fatimah, Sayyidina Husain, hingga marga-marga Ba ‘Alawi di Nusantara.'}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 shrink-0 group-hover:bg-emerald-400 transition-colors">{en ? 'Open chart →' : 'Buka Bagan →'}</span>
      </Link>
    </div>
  );
}
