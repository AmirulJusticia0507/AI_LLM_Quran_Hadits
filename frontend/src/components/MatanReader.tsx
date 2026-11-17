"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type BookId = "arbain-nawawi" | "bulughul-maram";
type Entry = { number: number; title: string; arabic: string; translation: string | null; chapter: number };
type Book = {
  id: BookId;
  title: string;
  author: string;
  note: string;
  source_name: string;
  source_url: string;
  chapters: { id: number; title: string; arabic?: string }[];
  total: number;
  matched: number;
  page: number;
  pages: number;
  items: Entry[];
};

const BOOKS: { id: BookId; title: string }[] = [
  { id: "arbain-nawawi", title: "Arba’in Nawawi" },
  { id: "bulughul-maram", title: "Bulughul Maram" },
];

const FONT_CLASSES: Record<number, string> = {
  1.5: "text-[1.5rem]!",
  1.75: "text-[1.75rem]!",
  2: "text-[2rem]!",
  2.25: "text-[2.25rem]!",
  2.5: "text-[2.5rem]!",
  2.75: "text-[2.75rem]!",
  3: "text-[3rem]!",
};

function MatanEntry({
  entry,
  book,
  fontSize,
  isEn,
}: Readonly<{ entry: Entry; book: Book; fontSize: number; isEn: boolean }>) {
  const [copyStatus, setCopyStatus] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        [
          book.title,
          `${isEn ? "Number" : "Nomor"} ${entry.number}`,
          entry.arabic,
          entry.translation,
          book.source_url,
        ]
          .filter(Boolean)
          .join("\n\n")
      );
      setCopyStatus(isEn ? "Text copied." : "Teks tersalin.");
    } catch {
      setCopyStatus(
        isEn
          ? "Unable to copy automatically. Select text to copy manually."
          : "Tidak dapat menyalin otomatis. Pilih teks untuk menyalin manual."
      );
    }
  };
  const chapter = book.chapters.find((c) => c.id === entry.chapter);
  return (
    <article className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-8 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mb-2">
            {isEn ? "Number" : "Nomor"} {entry.number} • {chapter?.title}
          </p>
          <h3 className="text-lg font-bold">{entry.title}</h3>
        </div>
        <button
          onClick={copy}
          className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-sm hover:border-emerald-500 cursor-pointer"
        >
          {isEn ? "Copy text" : "Salin teks"}
        </button>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-500 mb-3">
          {isEn ? "Arabic text from source" : "Teks Arab dari sumber"}
        </h4>
        <p
          lang="ar"
          dir="rtl"
          className={`arabic-text whitespace-pre-wrap wrap-break-word leading-[2.1]! ${FONT_CLASSES[fontSize]}`}
        >
          {entry.arabic}
        </p>
      </div>
      {entry.translation && (
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 space-y-2">
          <h4 className="text-sm font-semibold">
            {isEn ? "Indonesian Translation" : "Terjemahan Indonesia"}
          </h4>
          <p className="text-sm leading-7 whitespace-pre-wrap">{entry.translation}</p>
        </div>
      )}
      <output className="block text-sm text-emerald-700 dark:text-emerald-300">{copyStatus}</output>
    </article>
  );
}

export default function MatanReader() {
  const { language } = useLanguage();
  const isEn = language === "en";

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
      fetch(url, { signal: controller.signal })
        .then(async (response) => {
          if (!response.ok)
            throw new Error(
              isEn
                ? "Unable to load book. Check your connection and retry."
                : "Kitab belum dapat dimuat. Periksa koneksi dan coba lagi."
            );
          return response.json() as Promise<Book>;
        })
        .then((book) => {
          if (!controller.signal.aborted) setResult({ key: requestKey, data: book });
        })
        .catch(() => {
          if (!controller.signal.aborted)
            setResult({
              key: requestKey,
              error: isEn
                ? "Unable to load book. Check your internet connection and try again."
                : "Kitab belum dapat dimuat. Periksa koneksi internet dan coba lagi dalam beberapa saat.",
            });
        });
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [url, requestKey, isEn]);

  return (
    <div className="space-y-6">
      <fieldset className="flex flex-wrap gap-3">
        <legend className="sr-only">{isEn ? "Book selection" : "Pilihan kitab"}</legend>
        {BOOKS.map((book) => (
          <label key={book.id} className="cursor-pointer">
            <input
              type="radio"
              name="matan-book"
              value={book.id}
              checked={bookId === book.id}
              onChange={() => {
                setBookId(book.id);
                setQuery("");
                setChapter("");
                setPage(1);
              }}
              className="peer sr-only"
            />
            <span className="block rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold peer-checked:border-emerald-700 peer-checked:bg-emerald-700 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:peer-checked:bg-emerald-700">
              {book.title}
            </span>
          </label>
        ))}
      </fieldset>

      <section
        aria-label="Kitab al-Jami'"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950 space-y-3"
      >
        <h2 className="font-bold">
          Kitab al-Jami&apos; <span lang="ar" dir="rtl">كتاب الجامع</span>
        </h2>
        <p className="text-sm leading-7">
          {isEn
            ? "Chapter 16 of Bulughul Maram by Ibn Hajar al-Asqalani on manners and character. Arabic text follows the Bulughul Maram compilation; translation in progress."
            : "Bagian ke-16 dari Bulughul Maram karya Ibnu Hajar al-Asqalani tentang adab dan akhlak. Teks Arab mengikuti sumber Bulughul Maram; terjemahan Indonesia belum tersedia."}
        </p>
        <button
          type="button"
          onClick={() => {
            setBookId("bulughul-maram");
            setChapter("16");
            setQuery("");
            setPage(1);
          }}
          className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 cursor-pointer"
        >
          {isEn ? "Read Kitab al-Jami'" : "Baca Kitab al-Jami'"}
        </button>
      </section>

      <section
        aria-label={isEn ? "Book search" : "Pencarian kitab"}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-medium">
            {isEn ? "Search number or text" : "Cari nomor atau teks"}
            <input
              type="search"
              maxLength={150}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={isEn ? "Number, title, Arabic text, or translation…" : "Nomor, judul, teks Arab, atau terjemahan…"}
              className="block mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3"
            />
          </label>
          <label className="text-sm font-medium">
            {isEn ? "Book section" : "Bagian kitab"}
            <select
              value={chapter}
              onChange={(e) => {
                setChapter(e.target.value);
                setPage(1);
              }}
              className="block mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 cursor-pointer"
            >
              <option value="">{isEn ? "All sections" : "Semua bagian"}</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span>{isEn ? "Arabic text size" : "Ukuran teks Arab"}</span>
          <button
            aria-label={isEn ? "Decrease text size" : "Perkecil teks Arab"}
            disabled={fontSize <= 1.5}
            onClick={() => setFontSize((s) => Math.max(1.5, s - 0.25))}
            className="border rounded-lg px-3 py-2 disabled:opacity-40 cursor-pointer"
          >
            A−
          </button>
          <button
            aria-label={isEn ? "Increase text size" : "Perbesar teks Arab"}
            disabled={fontSize >= 3}
            onClick={() => setFontSize((s) => Math.min(3, s + 0.25))}
            className="border rounded-lg px-3 py-2 disabled:opacity-40 cursor-pointer"
          >
            A+
          </button>
        </div>
      </section>

      {loading && (
        <output className="block py-8 text-center text-slate-500">
          {isEn ? "Loading book text…" : "Memuat teks kitab…"}
        </output>
      )}

      {!loading && result?.error && (
        <div role="alert" className="rounded-2xl border border-amber-300 p-5 space-y-3">
          <p>{result.error}</p>
          <button onClick={() => setRetry((r) => r + 1)} className="underline text-emerald-700 dark:text-emerald-300 cursor-pointer">
            {isEn ? "Try again" : "Coba lagi"}
          </button>
        </div>
      )}

      {data && (
        <>
          <section className="space-y-3">
            <h2 className="text-xl font-bold">
              {data.title} — {data.author}
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{data.note}</p>
            <a
              href={data.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm underline text-emerald-700 dark:text-emerald-300"
            >
              {isEn ? "Source: " : "Sumber: "}{data.source_name} ↗
            </a>
            <output className="block text-sm">
              {data.matched} {isEn ? "of" : "dari"} {data.total} {isEn ? "texts" : "teks"} • {isEn ? "Page" : "Halaman"} {data.page} / {data.pages}
            </output>
          </section>

          {data.items.map((entry) => (
            <MatanEntry
              key={`${bookId}-${entry.number}`}
              entry={entry}
              book={data}
              fontSize={fontSize}
              isEn={isEn}
            />
          ))}

          {!data.items.length && (
            <div className="text-center py-8 space-y-3">
              <p>{isEn ? "No texts match your search." : "Tidak ada teks yang sesuai pencarian."}</p>
              <button
                onClick={() => {
                  setQuery("");
                  setChapter("");
                  setPage(1);
                }}
                className="underline cursor-pointer"
              >
                {isEn ? "Show all texts" : "Tampilkan semua teks"}
              </button>
            </div>
          )}

          <nav aria-label={isEn ? "Book pagination" : "Halaman kitab"} className="flex items-center justify-between gap-3">
            <button
              disabled={data.page <= 1}
              onClick={() => setPage(data.page - 1)}
              className="rounded-xl border px-4 py-3 text-sm disabled:opacity-40 cursor-pointer"
            >
              {isEn ? "← Previous" : "← Sebelumnya"}
            </button>
            <span className="text-sm">
              {data.page} / {data.pages}
            </span>
            <button
              disabled={data.page >= data.pages}
              onClick={() => setPage(data.page + 1)}
              className="rounded-xl border px-4 py-3 text-sm disabled:opacity-40 cursor-pointer"
            >
              {isEn ? "Next →" : "Berikutnya →"}
            </button>
          </nav>
        </>
      )}

      <p className="text-sm text-slate-600 dark:text-slate-300">
        {isEn ? (
          <>
            Study commentary and narration authentication with a qualified scholar. To search transmission compilations, explore{" "}
            <Link href="/hadith" className="underline text-emerald-700 dark:text-emerald-300">
              Hadith Search
            </Link>
            .
          </>
        ) : (
          <>
            Pelajari syarah dan penilaian riwayat bersama guru. Untuk menelusuri kitab periwayatan, buka{" "}
            <Link href="/hadith" className="underline text-emerald-700 dark:text-emerald-300">
              pencarian Hadits
            </Link>
            .
          </>
        )}
      </p>
    </div>
  );
}
