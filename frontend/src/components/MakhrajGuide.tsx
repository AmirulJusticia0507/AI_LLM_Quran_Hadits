"use client";
import { useState } from 'react';
import { makharij, makhrajRegions } from '@/data/makhraj';

export default function MakhrajGuide() {
  const [region, setRegion] = useState('Semua');
  const [query, setQuery] = useState('');
  const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/[\u064B-\u065F\u0670]/g, '').trim();
  const visible = makharij.filter(m => (region === 'Semua' || m.region === region) && normalize(`${m.title} ${m.letters} ${m.names} ${m.region}`).includes(normalize(query)));
  return <section id="makhraj" aria-labelledby="makhraj-title" className="space-y-5 rounded-3xl border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900 p-5 sm:p-7">
    <div><h2 id="makhraj-title" className="text-2xl font-bold">Makhrajul Huruf</h2><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Kenali tempat keluarnya huruf: 17 makhraj khusus dalam 5 wilayah menurut pembagian yang masyhur. Semua huruf hijaiyah tercakup; alif mad dibedakan dari hamzah, sedangkan wau dan ya memiliki tempat berbeda saat menjadi mad.</p></div>
    <div className="flex flex-wrap gap-2" aria-label="Wilayah makhraj">{['Semua', ...makhrajRegions].map(item => <button key={item} aria-pressed={region === item} onClick={() => setRegion(item)} className={`rounded-xl px-3 py-2 text-sm ${region === item ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>{item}</button>)}</div>
    <label className="block text-sm font-medium">Cari huruf atau tempat keluarnya<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Contoh: ض, dhad, lidah, bibir…" className="block w-full mt-2 rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-transparent focus:outline-emerald-500" /></label>
    <p aria-live="polite" className="text-sm text-slate-500 dark:text-slate-400">{visible.length} dari 17 makhraj</p>
    <div className="grid md:grid-cols-2 gap-4">{visible.map(item => <article key={item.id} className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-5 space-y-3">
      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{item.id.toString().padStart(2, '0')} • {item.region}</p>
      <h3 className="font-bold">{item.title}</h3>
      <p lang="ar" dir="rtl" className="arabic-text text-emerald-800 dark:text-emerald-200">{item.letters}</p>
      <p className="text-sm leading-relaxed">{item.detail}</p>
      <details><summary className="cursor-pointer text-sm font-semibold text-emerald-700 dark:text-emerald-300">Latihan pelafalan</summary><p lang="ar" dir="rtl" className="arabic-text mt-3">{item.exercise}</p><p className="text-sm leading-relaxed mt-2">{item.tip}</p></details>
    </article>)}</div>
    {!visible.length && <p className="py-6 text-center text-sm">Huruf atau tempat tidak ditemukan. Coba kata lain atau pilih Semua.</p>}
    <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 p-4 text-sm leading-relaxed">Latihan suku kata di atas bukan kutipan ayat. Dengarkan contoh dan mintalah guru menyimak bacaan; tulisan saja tidak dapat menilai ketepatan makhraj. <a className="underline" href="https://imamfaisal.com/articulation/" target="_blank" rel="noopener noreferrer">Buka rujukan dan pelajaran audio makhraj ↗</a>. <a className="underline" href="https://www.qiratulquran.com/17-places-of-articulation/" target="_blank" rel="noopener noreferrer">Penjelasan 17 titik artikulasi ↗</a>.</div>
  </section>;
}
