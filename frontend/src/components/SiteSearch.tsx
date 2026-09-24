"use client";

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, LoaderCircle, Search, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { normalizeSearch, searchSite, type SearchEntry } from '@/lib/site-search';

export default function SiteSearch() {
  const { language } = useLanguage();
  const en = language === 'en';
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [limit, setLimit] = useState(8);
  const wrapper = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const loading = useRef(false);
  const id = useId();
  const results = useMemo(() => searchSite(entries, query), [entries, query]);
  const hasQuery = normalizeSearch(query).length >= 2;

  async function loadIndex() {
    if (loading.current || status === 'ready') return;
    loading.current = true;
    setStatus('loading');
    try {
      const response = await fetch('/search-index.json');
      if (!response.ok) throw new Error('Search unavailable');
      const data: SearchEntry[] = await response.json();
      setEntries(data);
      setStatus('ready');
    } catch {
      setStatus('error');
    } finally {
      loading.current = false;
    }
  }

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);

  return (
    <div ref={wrapper} className="relative pt-3" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
    }} onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); input.current?.focus(); setOpen(false); }
    }}>
      <form role="search" aria-label={en ? 'Search Al-Hikmah' : 'Pencarian Al-Hikmah'} onSubmit={event => {
        event.preventDefault(); setOpen(true); void loadIndex();
      }} className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 dark:border-emerald-900 dark:bg-slate-900">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <label htmlFor={id} className="sr-only">{en ? 'Search materials and features' : 'Cari materi dan fitur Al-Hikmah'}</label>
        <input ref={input} id={id} type="search" autoComplete="off" maxLength={150} value={query}
          aria-controls={open ? `${id}-results` : undefined}
          placeholder={en ? 'Search topics, prayers, surahs, hadith…' : 'Cari materi, doa, surah, hadits…'}
          onFocus={() => { setOpen(true); void loadIndex(); }}
          onChange={event => { setQuery(event.target.value); setLimit(8); setOpen(true); }}
          className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 [&::-webkit-search-cancel-button]:appearance-none" />
        {query && <button type="button" aria-label={en ? 'Clear search' : 'Hapus pencarian'} onClick={() => { setQuery(''); input.current?.focus(); }} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="h-4 w-4" /></button>}
        <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">{en ? 'Search' : 'Cari'}</button>
      </form>
      {open && <section id={`${id}-results`} aria-label={en ? 'Search results' : 'Hasil pencarian'} className="absolute inset-x-0 top-full z-60 mt-2 max-h-[60dvh] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        {!hasQuery ? <div className="p-2">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{en ? 'What would you like to learn?' : 'Ingin belajar tentang apa?'}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{en ? 'Enter at least 2 characters to find materials and features.' : 'Ketik minimal 2 karakter untuk menemukan materi dan fitur.'}</p>
          <div className="mt-3 flex flex-wrap gap-2">{['Wudhu', 'Doa', 'Tajwid', 'Zakat', 'Haji'].map(topic => <button type="button" key={topic} onClick={() => { setQuery(topic); setLimit(8); }} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-200">{topic}</button>)}</div>
        </div> : status === 'loading' ? <p role="status" className="flex items-center gap-2 p-3 text-sm text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin" />{en ? 'Loading search…' : 'Memuat pencarian…'}</p>
          : status === 'error' ? <div role="alert" className="p-3 text-sm text-slate-600 dark:text-slate-300"><p>{en ? 'Search could not load. Please try again.' : 'Pencarian belum dapat dimuat. Silakan coba lagi.'}</p><button type="button" onClick={() => void loadIndex()} className="mt-2 font-semibold text-emerald-600 underline">{en ? 'Try again' : 'Coba lagi'}</button></div>
          : <>
            <p role="status" className="px-3 py-2 text-xs text-slate-500 dark:text-slate-400">{results.length} {en ? 'results' : 'hasil ditemukan'}</p>
            {results.length ? <ul>{results.slice(0, limit).map(entry => <li key={entry.href}>
              <Link href={entry.href} onClick={() => setOpen(false)} className="group flex items-start gap-3 rounded-xl p-3 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-500 dark:hover:bg-emerald-950/50">
                <div className="min-w-0 flex-1"><span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">{entry.category}</span><p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.title}</p><p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{entry.description}</p></div>
                <ArrowUpRight aria-hidden="true" className="mt-4 h-4 w-4 shrink-0 text-emerald-500" />
              </Link>
            </li>)}</ul> : <p className="p-3 text-sm text-slate-600 dark:text-slate-300">{en ? 'No matching material. Try another keyword, such as prayer, zakat, or tajwid.' : 'Belum ada materi yang cocok. Coba kata kunci lain, misalnya shalat, zakat, atau tajwid.'}</p>}
            {results.length > limit && <button type="button" onClick={() => setLimit(value => value + 8)} className="w-full rounded-xl p-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-950">{en ? 'Show more results' : 'Tampilkan hasil lainnya'}</button>}
            <p className="mt-2 border-t border-slate-100 px-3 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">{en ? 'For full verses and hadith, open the ' : 'Untuk ayat dan hadits lengkap, buka halaman '}<Link href="/quran" onClick={() => setOpen(false)} className="underline">Al-Qur’an</Link> {en ? 'or' : 'atau'} <Link href="/hadith" onClick={() => setOpen(false)} className="underline">Hadits</Link>.</p>
          </>}
      </section>}
    </div>
  );
}
