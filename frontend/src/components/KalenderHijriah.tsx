"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MoonStar } from 'lucide-react';

function getHijriParts(date: Date) {
  try {
    const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    const day = parseInt(parts.find((p) => p.type === 'day')?.value || '1', 10);
    const month = parts.find((p) => p.type === 'month')?.value || '';
    const year = parts.find((p) => p.type === 'year')?.value || '';
    const formatted = formatter.format(date);

    const numFormatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      month: 'numeric',
    });
    const monthNum = parseInt(numFormatter.format(date), 10);

    return { day, month, year, monthNum, formatted };
  } catch {
    return { day: 1, month: '-', year: '-', monthNum: 1, formatted: '-' };
  }
}

function getSunnahBadges(date: Date, hijriDay: number, hijriMonth: number) {
  const badges: string[] = [];
  const weekday = date.getDay(); // 0=Sun, 1=Mon, 4=Thu

  if (weekday === 1) badges.push('Puasa Sunnah Senin');
  if (weekday === 4) badges.push('Puasa Sunnah Kamis');
  if ([13, 14, 15].includes(hijriDay)) badges.push('Puasa Ayyamul Bidh');

  if (hijriMonth === 1 && hijriDay === 9) badges.push('Puasa Tasu\'a (9 Muharram)');
  if (hijriMonth === 1 && hijriDay === 10) badges.push('Puasa Asyura (10 Muharram)');
  if (hijriMonth === 10 && hijriDay >= 2 && hijriDay <= 7) badges.push('Puasa Syawal (6 Hari)');
  if (hijriMonth === 12 && hijriDay >= 1 && hijriDay <= 8) badges.push('Puasa Awal Dzulhijjah');
  if (hijriMonth === 12 && hijriDay === 9) badges.push('Puasa Arafah (9 Dzulhijjah)');

  return badges;
}

export default function KalenderHijriah() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const parsedDate = useMemo(() => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    return new Date(y, (m || 1) - 1, d || 1, 12, 0, 0);
  }, [selectedDate]);

  const hijri = useMemo(() => getHijriParts(parsedDate), [parsedDate]);
  const sunnahBadges = useMemo(
    () => getSunnahBadges(parsedDate, hijri.day, hijri.monthNum),
    [parsedDate, hijri]
  );

  // Cari 10 jadwal puasa sunnah terdekat dari tanggal terpilih
  const upcomingFasts = useMemo(() => {
    const list: { masehi: string; hijri: string; labels: string[] }[] = [];
    for (let i = 0; i < 35 && list.length < 8; i++) {
      const d = new Date(parsedDate);
      d.setDate(d.getDate() + i);
      const h = getHijriParts(d);
      const badges = getSunnahBadges(d, h.day, h.monthNum);
      if (badges.length > 0) {
        list.push({
          masehi: d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          hijri: h.formatted,
          labels: badges,
        });
      }
    }
    return list;
  }, [parsedDate]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/belajar"
        className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Pusat Belajar
      </Link>

      <header className="rounded-3xl bg-linear-to-br from-sky-800 to-indigo-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-sky-200">Al-Hikmah • Kalender Islami</p>
        <h1 className="text-3xl font-bold">Konverter Hijriah &amp; Puasa Sunnah</h1>
        <p className="text-sky-100 text-sm">
          Konversi tanggal Masehi ke kalender Hijriah (Ummul Qura) sekaligus cek jadwal puasa sunnah terdekat.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1">Pilih Tanggal Masehi</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
          />
        </div>

        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300 font-semibold">
            <MoonStar className="w-4 h-4" />
            <span>Tanggal Hijriah</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{hijri.formatted}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Masehi:{' '}
            {parsedDate.toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          {sunnahBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {sunnahBadges.map((b) => (
                <span
                  key={b}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-600 text-white"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h2>Jadwal Puasa Sunnah Terdekat</h2>
        </div>

        <div className="space-y-3">
          {upcomingFasts.map((item) => (
            <div
              key={item.masehi}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.masehi}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.hijri}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.labels.map((lbl) => (
                  <span
                    key={lbl}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                  >
                    {lbl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
