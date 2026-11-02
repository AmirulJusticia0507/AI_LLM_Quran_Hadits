"use client";

import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "@/hooks/use-online-status";

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-amber-900 shadow-sm dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-100"
    >
      <WifiOff aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <div className="min-w-0 text-sm leading-relaxed">
        <p className="font-semibold">Anda sedang offline</p>
        <p className="text-amber-800/90 dark:text-amber-200/80">
          Al-Qur&apos;an lengkap 114 surah tetap bisa dibaca dari penyimpanan perangkat.
          Tafsir, asbabun nuzul, murottal, dan fitur AI membutuhkan koneksi internet.
        </p>
      </div>
    </div>
  );
}
