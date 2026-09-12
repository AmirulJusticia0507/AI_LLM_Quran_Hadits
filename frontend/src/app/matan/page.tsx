import type { Metadata } from "next";
import MatanReader from "@/components/MatanReader";

export const metadata: Metadata = {
  title: "Matan Kitab — Arba’in Nawawi & Bulughul Maram",
  description: "Baca teks Arba’in Nawawi dan Bulughul Maram dengan pilihan bab, pencarian, serta rujukan sumber.",
};

export default function MatanPage() {
  return <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
    <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-6 sm:p-10 text-white space-y-3">
      <p className="text-sm text-emerald-200">Perpustakaan Al-Hikmah</p>
      <h1 className="text-3xl font-bold">Matan Kitab Hadits</h1>
      <p className="text-emerald-100 leading-relaxed">Pelajari Arba’in Nawawi dan Bulughul Maram melalui teks kitab dan rujukan sumbernya.</p>
    </header>
    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">Matan hadits adalah isi riwayat, sedangkan sanad adalah rangkaian perawinya. Kitab matan juga dapat membahas fiqih atau tajwid. Dua koleksi di sini berisi hadits; teks sumber dapat menyertakan perawi, takhrij, serta catatan penjelasan.</p>
    <MatanReader />
  </div>;
}
