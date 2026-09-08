"use client";

import { useState, useEffect, useCallback } from "react";
import { Compass, MapPin, Navigation, LocateFixed, TriangleAlert } from "lucide-react";

const KAABA = { lat: 21.4225, lng: 39.8262 };
const DEFAULT_COORDS = { lat: -6.2088, lng: 106.8456, label: "Jakarta (default)" };

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

// Bearing dari (lat,lng) ke Ka'bah, dalam derajat dari utara
function qiblaBearing(lat: number, lng: number): number {
  const phi = toRad(lat);
  const lambda = toRad(lng);
  const phiK = toRad(KAABA.lat);
  const lambdaK = toRad(KAABA.lng);
  const y = Math.sin(lambdaK - lambda);
  const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function distanceKm(lat: number, lng: number): number {
  const R = 6371;
  const dLat = toRad(KAABA.lat - lat);
  const dLng = toRad(KAABA.lng - lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat)) * Math.cos(toRad(KAABA.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export default function KiblatPage() {
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [heading, setHeading] = useState<number | null>(null);
  // Deteksi iOS (butuh izin kompas) saat init — bukan di effect body
  const [needPermission, setNeedPermission] = useState(() => {
    if (typeof window === "undefined") return false;
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    return typeof DOE?.requestPermission === "function";
  });
  const [compassOn, setCompassOn] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  const fetchGps = useCallback((onDone?: () => void) => {
    if (!("geolocation" in navigator)) {
      onDone?.();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "Lokasi GPS Anda",
        });
        onDone?.();
      },
      () => onDone?.(),
      { timeout: 8000 }
    );
  }, []);

  // GPS awal via microtask (lint-safe, tidak setState sinkron di effect)
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) fetchGps();
    });
    return () => {
      cancelled = true;
    };
  }, [fetchGps]);

  const attachCompass = useCallback(() => {
    const handler = (e: DeviceOrientationEvent) => {
      const withCompass = e as DeviceOrientationEvent & { webkitCompassHeading?: number };
      if (typeof withCompass.webkitCompassHeading === "number") {
        setHeading(withCompass.webkitCompassHeading);
      } else if (typeof e.alpha === "number") {
        setHeading((360 - e.alpha) % 360);
      }
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  // Non-iOS: langsung pasang listener kompas saat mount
  useEffect(() => {
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof DOE?.requestPermission === "function") return;
    const detach = attachCompass();
    return detach;
  }, [attachCompass]);

  const requestCompass = async () => {
    try {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      const res = await DOE.requestPermission?.();
      if (res === "granted") {
        setNeedPermission(false);
        setCompassOn(true);
        attachCompass();
      }
    } catch {}
  };

  const useGps = () => {
    setGpsLoading(true);
    fetchGps(() => setGpsLoading(false));
  };

  const bearing = qiblaBearing(coords.lat, coords.lng);
  const dist = distanceKm(coords.lat, coords.lng);
  // Jarum menunjuk kiblat relatif terhadap arah hadap perangkat
  const needleRotation = heading != null ? bearing - heading : 0;
  const aligned = heading != null && Math.abs(((needleRotation + 540) % 360) - 180) < 5;

  return (
    <div className="max-w-3xl mx-auto w-full px-2 sm:px-4">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">Arah Kiblat</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" /> {coords.label} • {coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}
          </p>
        </div>
        <button
          onClick={useGps}
          disabled={gpsLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-900/50 transition-all active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
        >
          <LocateFixed className={`w-3.5 h-3.5 ${gpsLoading ? "animate-pulse" : ""}`} />
          {gpsLoading ? "…" : "GPS"}
        </button>
      </div>

      {/* Kompas */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 flex flex-col items-center gap-4">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72">
          {/* Dial */}
          <div className="absolute inset-0 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-inner" />
          {(["U", "T", "S", "B"] as const).map((d, i) => (
            <span
              key={d}
              className={`absolute font-extrabold ${d === "U" ? "text-red-500" : "text-slate-400 dark:text-slate-500"}`}
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%,-50%) rotate(${i * 90}deg) translateY(-7.2rem)`,
              }}
            >
              {d}
            </span>
          ))}
          {/* Jarum kiblat */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${aligned ? "bg-emerald-600 text-white" : "bg-slate-800 dark:bg-slate-700 text-white"}`}>
                🕋
              </div>
              <div className={`w-1.5 h-24 rounded-full ${aligned ? "bg-emerald-500" : "bg-slate-800 dark:bg-slate-200"}`} />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 dark:bg-slate-200 border-2 border-white dark:border-slate-900 z-10" />
          </div>
        </div>

        {aligned ? (
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-full">
            ✅ Tepat menghadap kiblat!
          </p>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            Putar perangkat hingga penanda 🕋 lurus ke atas
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 p-3 text-center">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Arah Kiblat</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
              {bearing.toFixed(1)}°
            </p>
            <p className="text-[11px] text-slate-500">dari utara</p>
          </div>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 p-3 text-center">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Jarak ke Ka&apos;bah</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
              {dist.toLocaleString("id-ID", { maximumFractionDigits: 0 })} km
            </p>
            <p className="text-[11px] text-slate-500">Makkah, Arab Saudi</p>
          </div>
        </div>

        {needPermission && !compassOn && (
          <button
            onClick={requestCompass}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
          >
            <Navigation className="w-4 h-4" /> Aktifkan Kompas
          </button>
        )}
        {!needPermission && heading == null && (
          <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 px-4 py-2 rounded-xl flex items-center gap-1.5">
            <TriangleAlert className="w-3.5 h-3.5 shrink-0" />
            Sensor kompas tidak terdeteksi — gunakan angka derajat di atas dengan aplikasi kompas.
          </p>
        )}
      </div>

      <p className="text-[10px] sm:text-[11px] text-center text-slate-400 dark:text-slate-500 mt-4">
        Kalibrasi dengan mengayun perangkat membentuk angka 8 bila arah tidak stabil.
      </p>
    </div>
  );
}
