"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Sunrise,
  Sunset,
  Sun,
  Moon,
  Clock,
  MapPin,
  RefreshCw,
  CalendarDays,
  Navigation,
  BellRing,
} from "lucide-react";

interface PrayerTimings {
  Imsak: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Fajr: string;
  Dhuha?: string;
}

interface HijriDate {
  day: string;
  month: { en: string; ar: string };
  year: string;
}

// Fallback: Jakarta
const DEFAULT_COORDS = { lat: -6.2088, lng: 106.8456, label: "Jakarta (default)" };

const PRAYER_META: {
  key: keyof PrayerTimings;
  label: string;
  icon: typeof Sunrise;
}[] = [
  { key: "Imsak", label: "Imsak", icon: Moon },
  { key: "Fajr", label: "Subuh", icon: Sunrise },
  { key: "Sunrise", label: "Terbit", icon: Sun },
  { key: "Dhuhr", label: "Dzuhur", icon: Sun },
  { key: "Asr", label: "Ashar", icon: Clock },
  { key: "Maghrib", label: "Maghrib", icon: Sunset },
  { key: "Isha", label: "Isya", icon: Moon },
];

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function formatCountdown(ms: number): string {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function JadwalPage() {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [hijri, setHijri] = useState<HijriDate | null>(null);
  const [gregorian, setGregorian] = useState("");
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [now, setNow] = useState(() => new Date());

  const fetchTimings = useCallback(async (lat: number, lng: number) => {
    setLoading(true);
    setError("");
    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      // method=20 → Kementerian Agama RI
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lng}&method=20`
      );
      if (!res.ok) throw new Error("Gagal memuat jadwal");
      const json = await res.json();
      const t = json.data.timings as Record<string, string>;
      const clean = (v: string) => v.split(" ")[0];
      setTimings({
        Imsak: clean(t.Imsak),
        Fajr: clean(t.Fajr),
        Sunrise: clean(t.Sunrise),
        Dhuhr: clean(t.Dhuhr),
        Asr: clean(t.Asr),
        Maghrib: clean(t.Maghrib),
        Isha: clean(t.Isha),
      });
      setHijri(json.data.date.hijri as HijriDate);
      setGregorian(
        today.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    } catch {
      setError("Gagal memuat jadwal shalat. Periksa koneksi internet lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Muat awal: coba GPS, fallback ke Jakarta.
  // Dijalankan via queueMicrotask agar setState tidak sinkron di body effect.
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      if (!("geolocation" in navigator)) {
        fetchTimings(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (cancelled) return;
          const c = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            label: "Lokasi GPS Anda",
          };
          setCoords(c);
          fetchTimings(c.lat, c.lng);
        },
        () => {
          if (!cancelled) fetchTimings(DEFAULT_COORDS.lat, DEFAULT_COORDS.lng);
        },
        { timeout: 8000 }
      );
    });
    return () => {
      cancelled = true;
    };
  }, [fetchTimings]);

  // Tick tiap detik untuk countdown
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const useGps = () => {
    if (!("geolocation" in navigator)) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Lokasi GPS Anda",
        };
        setCoords(c);
        setLocating(false);
        fetchTimings(c.lat, c.lng);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  // Tentukan shalat berikutnya
  let nextKey: keyof PrayerTimings | null = null;
  let nextDate: Date | null = null;
  if (timings) {
    const nowMin = now.getHours() * 60 + now.getMinutes();
    for (const p of PRAYER_META) {
      if (p.key === "Sunrise") continue; // Terbit bukan waktu shalat wajib
      if (toMinutes(timings[p.key] ?? "00:00") > nowMin) {
        nextKey = p.key;
        break;
      }
    }
    if (!nextKey) nextKey = "Imsak"; // lewat Isya → Imsak besok
    const label = nextKey as string;
    const [h, m] = (timings[label as keyof PrayerTimings] ?? "00:00").split(":").map(Number);
    nextDate = new Date(now);
    nextDate.setHours(h, m, 0, 0);
    if (nextDate.getTime() <= now.getTime()) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
  }
  const nextLabel = PRAYER_META.find((p) => p.key === nextKey)?.label ?? "";

  return (
    <div className="max-w-5xl mx-auto w-full px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
              Jadwal Shalat
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" /> {coords.label} • Metode Kemenag RI
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={useGps}
            disabled={locating || loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-900/50 transition-all active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 ${locating ? "animate-pulse" : ""}`} />
            {locating ? "Mencari..." : "Pakai GPS"}
          </button>
          <button
            onClick={() => fetchTimings(coords.lat, coords.lng)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Muat Ulang
          </button>
        </div>
      </div>

      {/* Tanggal + countdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-md">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mb-1">
            <CalendarDays className="w-3.5 h-3.5" /> Tanggal Hari Ini
          </p>
          <p className="font-bold text-slate-900 dark:text-slate-100">{gregorian || "…"}</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
            {hijri ? `${hijri.day} ${hijri.month.en} ${hijri.year} H` : "…"}
          </p>
        </div>
        <div className="rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg shadow-emerald-600/20">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-100/80 flex items-center gap-1.5 mb-1">
            <BellRing className="w-3.5 h-3.5" /> Shalat Berikutnya
          </p>
          {nextKey && nextDate ? (
            <div className="flex items-end justify-between gap-2">
              <p className="text-2xl font-extrabold">{nextLabel}</p>
              <p className="font-mono text-lg font-bold tabular-nums">
                {formatCountdown(nextDate.getTime() - now.getTime())}
              </p>
            </div>
          ) : (
            <p className="text-sm text-emerald-100">Memuat…</p>
          )}
        </div>
      </div>

      {/* Grid jadwal */}
      {error ? (
        <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm p-4 text-center">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {PRAYER_META.map((p) => {
            const Icon = p.icon;
            const isNext = p.key === nextKey;
            const time = timings ? timings[p.key] ?? "--:--" : "--:--";
            return (
              <div
                key={p.key}
                className={`rounded-2xl p-4 border transition-all ${
                  isNext
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400/50"
                    : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-md"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`p-2 rounded-xl ${
                      isNext
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  {isNext && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                      Berikutnya
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.label}</p>
                <p
                  className={`text-2xl font-extrabold tabular-nums ${
                    loading ? "animate-pulse text-slate-300 dark:text-slate-600" : "text-slate-900 dark:text-slate-100"
                  }`}
                >
                  {time}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[10px] sm:text-[11px] text-center text-slate-400 dark:text-slate-500 mt-4">
        Sumber: Aladhan API • Metode perhitungan Kemenag RI (no. 20) • Waktu setempat perangkat Anda.
      </p>
    </div>
  );
}
