"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Shared = { title: string; messages: Array<{ role: "user" | "assistant"; content: string; created_at: string }> };

export default function SharedChat({ params }: { params: Promise<{ slug: string }> }) {
  const [shared, setShared] = useState<Shared | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { void params.then(async ({ slug }) => {
    try { const res = await fetch(`${API_URL}/api/chat/shared/${slug}`); const data = await res.json(); if (!res.ok) throw new Error(data.detail || "Chat tidak ditemukan."); setShared(data); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Chat tidak dapat dimuat."); }
  }); }, [params]);
  useEffect(() => {
    const meta = document.createElement("meta"); meta.name = "robots"; meta.content = "noindex, nofollow";
    document.head.appendChild(meta); return () => meta.remove();
  }, []);
  if (error) return <p className="rounded-2xl bg-rose-50 p-5 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{error}</p>;
  if (!shared) return <p className="p-6 text-center text-slate-500">Memuat percakapan…</p>;
  return <article className="mx-auto max-w-3xl space-y-5"><header className="rounded-3xl bg-emerald-700 p-7 text-white"><p className="text-sm text-emerald-100">Percakapan yang dibagikan</p><h1 className="mt-2 text-2xl font-bold">{shared.title}</h1></header>{shared.messages.map((message, index) => <section key={index} className={`rounded-2xl p-5 ${message.role === "user" ? "ml-8 bg-emerald-600 text-white" : "mr-8 border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"}`}><p className="mb-3 text-xs font-bold uppercase opacity-70">{message.role === "user" ? "Pertanyaan" : "Jawaban Al-Hikmah AI"}</p><div className="prose prose-sm max-w-none dark:prose-invert"><Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown></div></section>)}</article>;
}
