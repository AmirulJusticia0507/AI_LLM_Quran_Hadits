"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";

type Stats = { visitors_today: number; total_views: number };
function randomId() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join("-");
}
function visitorId() {
  const key = "alhikmah_visitor_id";
  const saved = localStorage.getItem(key);
  if (saved && /^[0-9a-f-]{36}$/i.test(saved)) return saved;
  const id = randomId();
  localStorage.setItem(key, id);
  return id;
}

export default function VisitorStats() {
  const pathname = usePathname();
  const [stats, setStats] = useState<Stats | null>(null);
  const { language, t } = useLanguage();

  const locale = language === "en" ? "en-US" : "id-ID";

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/visits", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitor_id: visitorId(), event_id: randomId(), path: pathname }) });
        if (!response.ok) throw new Error("Counter unavailable");
        const result: Stats = await response.json();
        if (!cancelled) setStats(result);
      } catch { if (!cancelled) setStats(null); }
    }, 250);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [pathname]);

  return <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 space-y-1">
    {stats ? (
      <p>
        <Link href="/admin/pengunjung" className="underline underline-offset-4 hover:text-emerald-600">
          {t("stats.today")} <strong>{stats.visitors_today.toLocaleString(locale)}</strong>
        </Link> · {t("stats.total")} <strong>{stats.total_views.toLocaleString(locale)}</strong>
      </p>
    ) : (
      <p>
        {t("stats.unavailable")} <Link href="/admin/pengunjung" className="underline">{t("stats.admin")}</Link>
      </p>
    )}
    <p>{t("stats.note")}</p>
  </div>;
}
