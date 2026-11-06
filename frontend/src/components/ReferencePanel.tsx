"use client";

import Link from "next/link";
import { BookOpen, ChevronDown, ExternalLink, ScrollText, ShieldCheck } from "lucide-react";
import { useState } from "react";
import type { Reference } from "@/lib/chat-message";

export default function ReferencePanel({ references }: { readonly references?: Reference[] }) {
  const [open, setOpen] = useState(false);
  if (!references?.length) return null;

  return (
    <section className="mt-4 border-t border-emerald-100 pt-3 dark:border-emerald-900/70" aria-label="Rujukan jawaban">
      <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-200 dark:hover:bg-emerald-950">
        <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" />Rujukan yang disebut ({references.length})</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-2 space-y-2">
        {references.map(reference => {
          const Icon = reference.type === "quran" ? BookOpen : ScrollText;
          return <Link key={reference.id} href={reference.href} className="flex gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-950/40">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-slate-800 dark:text-slate-100">{reference.label}</span><span className="mt-0.5 block text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{reference.detail}</span></span>
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
          </Link>;
        })}
        <p className="px-1 text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">Panel ini merangkum rujukan yang tertulis pada jawaban. Periksa teks sumber sebelum menjadikannya pegangan hukum.</p>
      </div>}
    </section>
  );
}
