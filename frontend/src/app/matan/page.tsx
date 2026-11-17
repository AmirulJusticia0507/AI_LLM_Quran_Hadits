"use client";

import MatanReader from "@/components/MatanReader";
import { useLanguage } from "@/context/LanguageContext";

export default function MatanPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-6 sm:p-10 text-white space-y-3">
        <p className="text-sm text-emerald-200">
          {isEn ? "Al-Hikmah Library" : "Perpustakaan Al-Hikmah"}
        </p>
        <h1 className="text-3xl font-bold">
          {isEn ? "Hadith Matan Texts" : "Matan Kitab Hadits"}
        </h1>
        <p className="text-emerald-100 leading-relaxed">
          {isEn
            ? "Study Arba'in An-Nawawi and Bulughul Maram through authentic texts and source citations."
            : "Pelajari Arba’in Nawawi dan Bulughul Maram melalui teks kitab dan rujukan sumbernya."}
        </p>
      </header>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {isEn
          ? "A hadith's matan is the text of the narration, while the sanad is the chain of narrators. The two classical collections here contain hadith texts; source references may include transmitters, takhrij, and explanatory notes."
          : "Matan hadits adalah isi riwayat, sedangkan sanad adalah rangkaian perawinya. Kitab matan juga dapat membahas fiqih atau tajwid. Dua koleksi di sini berisi hadits; teks sumber dapat menyertakan perawi, takhrij, serta catatan penjelasan."}
      </p>
      <MatanReader />
    </div>
  );
}
