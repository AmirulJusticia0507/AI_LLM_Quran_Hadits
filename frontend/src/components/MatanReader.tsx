"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BookId = "arbain-nawawi" | "bulughul-maram";
type Entry = { number: number; title: string; arabic: string; translation: string | null; chapter: number };
type Book = { id: BookId; title: string; author: string; note: string; source_name: string; source_url: string;
  chapters: { id: number; title: string; arabic?: string }[]; total: number; matched: number; page: number; pages: number; items: Entry[] };
const BOOKS: { id: BookId; title: string }[] = [{ id: "arbain-nawawi", title: "Arba’in Nawawi" }, { id: "bulughul-maram", title: "Bulughul Maram" }];

function MatanEntry({ entry, book, fontSize }: { entry: Entry; book: Book; fontSize: number }) {
  const [copyStatus, setCopyStatus] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText([book.title, `Nomor ${entry.number} (penomoran sumber)`, entry.arabic, entry.translation, book.source_url].filter(Boolean).join("\n\n"));
      setCopyStatus("Teks tersalin.");
    } catch { setCopyStatus("Tidak dapat menyalin otomatis. Pilih teks untuk menyalin manual."); }
  };
  const chapter = book.chapters.find(c => c.id === entry.chapter);
  return <article className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 space-y-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="text-xs text-emerald-700 dark:text-emerald-300 mb-2">Nomor {entry.number} • {chapter?.title}</p><h3 className="text-lg font-bold">{entry.title}</h3></div>
      <button onClick={copy} className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:border-emerald-500">Salin teks</button>
    </div>
    <div><h4 className="text-xs font-semibold text-slate-500 mb-3">Teks Arab dari sumber</h4><p lang="ar" dir="rtl" className="arabic-text whitespace-pre-wrap break-words" style={{ fontSize: `${fontSize}rem`, lineHeight: 2.1 }}>{entry.arabic}</p></div>
    {entry.translation && <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 space-y-2"><h4 className="text-sm font-semibold">Terjemahan Indonesia</h4><p className="text-sm leading-7 whitespace-pre-wrap">{entry.translation}</p></div>}
    <p role="status" className="text-sm text-emerald-700 dark:text-emerald-300">{copyStatus}</p>
  </article>;
}

export default function MatanReader() {
  const [bookId, setBookId] = useState<BookId>("arbain-nawawi");
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState("");
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [fontSize, setFontSize] = useState(2);
  const [result, setResult] = useState<{ key: string; data?: Book; error?: string } | null>(null);
  const params = new URLSearchParams({ q: query, page: String(page) });
  if (chapter) params.set("bab", chapter);
  const url = `/api/matan/${bookId}?${params}`;
  const requestKey = `${url}|${retry}`;
  const loading = result?.key !== requestKey;
  const data = loading ? undefined : result?.data;
  const chapters = result?.data?.id === bookId ? result.data.chapters : [];

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(url, { signal: controller.signal }).then(async response => {
        if (!response.ok) throw new Error("Kitab belum dapat dimuat. Periksa koneksi dan coba lagi.");
        return response.json() as Promise<Book>;
      }).then(book => {
        if (!controller.signal.aborted) setResult({ key: requestKey, data: book });
      }).catch(() => {
        if (!controller.signal.aborted) setResult({ key: requestKey, error: "Kitab belum dapat dimuat. Periksa koneksi internet dan coba lagi dalam beberapa saat." });
      });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [url, requestKey]);

  return <div className="space-y-6">
    <div className="flex flex-wrap gap-3" aria-label="Pilihan kitab">{BOOKS.map(book => <button key={book.id} aria-pressed={bookId === book.id} onClick={() => { setBookId(book.id); setQuery(""); setChapter(""); setPage(1); }} className={`rounded-xl px-5 py-3 font-semibold text-sm ${bookId === book.id ? "bg-emerald-700 text-white" : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"}`}>{book.title}</button>)}</div>
    <section aria-label="Pencarian kitab" className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-sm font-medium">Cari nomor atau teks<input type="search" maxLength={150} value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} placeholder="Nomor, judul, teks Arab, atau terjemahan…" className="block mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3" /></label>
        <label className="text-sm font-medium">Bagian kitab<select value={chapter} onChange={e => { setChapter(e.target.value); setPage(1); }} className="block mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3"><option value="">Semua bagian</option>{chapters.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></label>
      </div>
      <div className="flex items-center gap-3 text-sm"><span>Ukuran teks Arab</span><button aria-label="Perkecil teks Arab" disabled={fontSize <= 1.5} onClick={() => setFontSize(s => Math.max(1.5, s - 0.25))} className="border rounded-lg px-3 py-2 disabled:opacity-40">A−</button><button aria-label="Perbesar teks Arab" disabled={fontSize >= 3} onClick={() => setFontSize(s => Math.min(3, s + 0.25))} className="border rounded-lg px-3 py-2 disabled:opacity-40">A+</button></div>
    </section>
    {loading && <p role="status" className="py-8 text-center text-slate-500">Memuat teks kitab…</p>}
    {!loading && result?.error && <div role="alert" className="rounded-2xl border border-amber-300 p-5 space-y-3"><p>{result.error}</p><button onClick={() => setRetry(r => r + 1)} className="underline text-emerald-700 dark:text-emerald-300">Coba lagi</button></div>}
    {data && <>
      <section className="space-y-3"><h2 className="text-xl font-bold">{data.title} — {data.author}</h2><p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{data.note}</p><a href={data.source_url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm underline text-emerald-700 dark:text-emerald-300">Sumber: {data.source_name} ↗</a><p className="text-sm" role="status">{data.matched} dari {data.total} teks • Halaman {data.page} / {data.pages}</p></section>
      {data.items.map(entry => <MatanEntry key={`${bookId}-${entry.number}`} entry={entry} book={data} fontSize={fontSize} />)}
      {!data.items.length && <div className="text-center py-8 space-y-3"><p>Tidak ada teks yang sesuai pencarian.</p><button onClick={() => { setQuery(""); setChapter(""); setPage(1); }} className="underline">Tampilkan semua teks</button></div>}
      <nav aria-label="Halaman kitab" className="flex items-center justify-between gap-3"><button disabled={data.page <= 1} onClick={() => setPage(data.page - 1)} className="rounded-xl border px-4 py-3 text-sm disabled:opacity-40">← Sebelumnya</button><span className="text-sm">{data.page} / {data.pages}</span><button disabled={data.page >= data.pages} onClick={() => setPage(data.page + 1)} className="rounded-xl border px-4 py-3 text-sm disabled:opacity-40">Berikutnya →</button></nav>
    </>}
    <p className="text-sm text-slate-600 dark:text-slate-300">Pelajari syarah dan penilaian riwayat bersama guru. Untuk menelusuri kitab periwayatan, buka <Link href="/hadith" className="underline text-emerald-700 dark:text-emerald-300">pencarian Hadits</Link>.</p>
  </div>;
}
