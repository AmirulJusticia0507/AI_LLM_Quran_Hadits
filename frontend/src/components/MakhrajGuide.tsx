"use client";

import { useState } from "react";
import { makharij, makhrajRegions } from "@/data/makhraj";
import { useLanguage } from "@/context/LanguageContext";

const REGION_EN_MAP: Record<string, string> = {
  "Al-Jauf (Rongga Mulut & Tenggorokan)": "Al-Jawf (Oral & Throat Cavity)",
  "Al-Halq (Tenggorokan)": "Al-Halq (Throat)",
  "Al-Lisan (Lidah)": "Al-Lisan (Tongue)",
  "Asy-Syafatain (Dua Bibir)": "Ash-Shafatayn (Both Lips)",
  "Al-Khaisyum (Pangkal Hidung)": "Al-Khayshum (Nasal Cavity)",
};

export default function MakhrajGuide() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [region, setRegion] = useState("Semua");
  const [query, setQuery] = useState("");

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u064B-\u065F\u0670]/g, "")
      .trim();

  const visible = makharij.filter(
    (m) =>
      (region === "Semua" || m.region === region) &&
      normalize(`${m.title} ${m.letters} ${m.names} ${m.region}`).includes(normalize(query))
  );

  return (
    <section
      id="makhraj"
      aria-labelledby="makhraj-title"
      className="space-y-5 rounded-3xl border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900 p-5 sm:p-7"
    >
      <div>
        <h2 id="makhraj-title" className="text-2xl font-bold">
          {isEn ? "Makharijul Huruf (Articulation Points)" : "Makhrajul Huruf"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {isEn
            ? "Learn where Arabic letters originate: 17 specific articulation points across 5 major regions according to the renowned classical division. All hijaiyah letters are covered; elongated alif is distinguished from hamzah, while waw and ya have specific articulation points when elongated."
            : "Kenali tempat keluarnya huruf: 17 makhraj khusus dalam 5 wilayah menurut pembagian yang masyhur. Semua huruf hijaiyah tercakup; alif mad dibedakan dari hamzah, sedangkan wau dan ya memiliki tempat berbeda saat menjadi mad."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2" aria-label={isEn ? "Makhraj regions" : "Wilayah makhraj"}>
        {["Semua", ...makhrajRegions].map((item) => (
          <button
            key={item}
            aria-pressed={region === item}
            onClick={() => setRegion(item)}
            className={`rounded-xl px-3 py-2 text-sm cursor-pointer transition-all ${
              region === item
                ? "bg-emerald-700 text-white font-semibold shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {item === "Semua" ? (isEn ? "All" : "Semua") : isEn ? (REGION_EN_MAP[item] || item) : item}
          </button>
        ))}
      </div>

      <label className="block text-sm font-medium">
        {isEn ? "Search letter or articulation area" : "Cari huruf atau tempat keluarnya"}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isEn ? "e.g. ض, dhad, tongue, lips…" : "Contoh: ض, dhad, lidah, bibir…"}
          className="block w-full mt-2 rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-transparent focus:outline-emerald-500"
        />
      </label>

      <p aria-live="polite" className="text-sm text-slate-500 dark:text-slate-400">
        {isEn
          ? `${visible.length} of 17 articulation points`
          : `${visible.length} dari 17 makhraj`}
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {visible.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-5 space-y-3"
          >
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              {item.id.toString().padStart(2, "0")} • {isEn ? (REGION_EN_MAP[item.region] || item.region) : item.region}
            </p>
            <h3 className="font-bold">{item.title}</h3>
            <p lang="ar" dir="rtl" className="arabic-text text-emerald-800 dark:text-emerald-200 text-xl">
              {item.letters}
            </p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.detail}</p>
            <details>
              <summary className="cursor-pointer text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {isEn ? "Pronunciation practice" : "Latihan pelafalan"}
              </summary>
              <p lang="ar" dir="rtl" className="arabic-text mt-3 text-lg">
                {item.exercise}
              </p>
              <p className="text-sm leading-relaxed mt-2 text-slate-600 dark:text-slate-400">{item.tip}</p>
            </details>
          </article>
        ))}
      </div>

      {!visible.length && (
        <p className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {isEn
            ? "Letter or articulation area not found. Try another query or select All."
            : "Huruf atau tempat tidak ditemukan. Coba kata lain atau pilih Semua."}
        </p>
      )}

      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 p-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {isEn ? (
          <>
            The syllable exercises above are not Quranic verse quotes. Listen to authentic recitation and have a qualified teacher evaluate your reading; text alone cannot judge precise articulation.{" "}
            <a className="underline text-emerald-700 dark:text-emerald-400 font-medium" href="https://imamfaisal.com/articulation/" target="_blank" rel="noopener noreferrer">
              Open audio references & lessons ↗
            </a>
            .{" "}
            <a className="underline text-emerald-700 dark:text-emerald-400 font-medium" href="https://www.qiratulquran.com/17-places-of-articulation/" target="_blank" rel="noopener noreferrer">
              Explanation of 17 articulation points ↗
            </a>
            .
          </>
        ) : (
          <>
            Latihan suku kata di atas bukan kutipan ayat. Dengarkan contoh dan mintalah guru menyimak bacaan; tulisan saja tidak dapat menilai ketepatan makhraj.{" "}
            <a className="underline text-emerald-700 dark:text-emerald-400 font-medium" href="https://imamfaisal.com/articulation/" target="_blank" rel="noopener noreferrer">
              Buka rujukan dan pelajaran audio makhraj ↗
            </a>
            .{" "}
            <a className="underline text-emerald-700 dark:text-emerald-400 font-medium" href="https://www.qiratulquran.com/17-places-of-articulation/" target="_blank" rel="noopener noreferrer">
              Penjelasan 17 titik artikulasi ↗
            </a>
            .
          </>
        )}
      </div>
    </section>
  );
}
