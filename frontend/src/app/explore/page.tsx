"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
type Entry = { title: string; share_slug: string; updated_at: string };

export default function ExplorePage() {
  const [items, setItems] = useState<Entry[]>([]); const [error, setError] = useState("");
  useEffect(() => { fetch(`${API_URL}/api/chat/explore`).then(res => res.ok ? res.json() : Promise.reject()).then(data => setItems(data.chats || [])).catch(() => setError("Arsip publik belum dapat dimuat.")); }, []);
  return <section className="mx-auto max-w-3xl space-y-6"><header className="rounded-3xl bg-emerald-700 p-8 text-white"><p className="text-sm text-emerald-100">Arsip opt-in</p><h1 className="mt-2 text-3xl font-bold">Jelajahi tanya-jawab publik</h1><p className="mt-3 text-sm leading-6 text-emerald-50">Hanya percakapan yang secara sadar dibagikan pemiliknya yang tampil di sini. Jangan gunakan arsip sebagai pengganti tabayyun kepada ahli.</p></header>{error && <p className="rounded-xl bg-rose-50 p-4 text-rose-800">{error}</p>}{!error && !items.length && <p className="rounded-xl border p-5 text-slate-500">Belum ada chat publik.</p>}<div className="space-y-3">{items.map(item => <Link key={item.share_slug} href={`/shared/${item.share_slug}`} className="block rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900"><h2 className="font-bold">{item.title}</h2><p className="mt-2 text-xs text-slate-500">Dibagikan {new Date(item.updated_at).toLocaleDateString("id-ID")}</p></Link>)}</div></section>;
}
