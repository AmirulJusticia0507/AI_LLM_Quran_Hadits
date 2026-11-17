"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
type Entry = { title: string; share_slug: string; updated_at: string };

export default function ExplorePage() {
  const { language } = useLanguage();
  const en = language === "en";
  const [items, setItems] = useState<Entry[]>([]); const [error, setError] = useState("");
  useEffect(() => { fetch(`${API_URL}/api/chat/explore`).then(res => res.ok ? res.json() : Promise.reject()).then(data => setItems(data.chats || [])).catch(() => setError(en ? "The public archive could not be loaded." : "Arsip publik belum dapat dimuat.")); }, [en]);
  return <section className="mx-auto max-w-3xl space-y-6"><header className="rounded-3xl bg-emerald-700 p-8 text-white"><p className="text-sm text-emerald-100">{en ? "Opt-in archive" : "Arsip opt-in"}</p><h1 className="mt-2 text-3xl font-bold">{en ? "Explore public Q&A" : "Jelajahi tanya-jawab publik"}</h1><p className="mt-3 text-sm leading-6 text-emerald-50">{en ? "Only conversations deliberately shared by their owners appear here. Do not use this archive instead of consulting a qualified expert." : "Hanya percakapan yang secara sadar dibagikan pemiliknya yang tampil di sini. Jangan gunakan arsip sebagai pengganti tabayyun kepada ahli."}</p></header>{error && <p className="rounded-xl bg-rose-50 p-4 text-rose-800">{error}</p>}{!error && !items.length && <p className="rounded-xl border p-5 text-slate-500">{en ? "No public chats yet." : "Belum ada chat publik."}</p>}<div className="space-y-3">{items.map(item => <Link key={item.share_slug} href={`/shared/${item.share_slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-bold">{item.title}</h2><p className="mt-2 text-xs text-slate-500">{en ? "Shared" : "Dibagikan"} {new Date(item.updated_at).toLocaleDateString(en ? "en-US" : "id-ID")}</p></Link>)}</div></section>;
}
