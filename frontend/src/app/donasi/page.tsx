import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import DonationAccount from "@/components/DonationAccount";

export const metadata: Metadata = {
  title: "Donasi & Infaq Pengembangan",
  description: "Dukung pengembangan Al-Hikmah AI melalui donasi atau infaq sukarela via transfer BRI atas nama Amirul Putra Justicia.",
};

export default function DonationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-6 sm:p-10 text-white space-y-4">
        <HeartHandshake className="h-10 w-10 text-emerald-200" aria-hidden="true" />
        <p className="text-sm font-medium text-emerald-200">Bersama mengembangkan Al-Hikmah AI</p>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Donasi & Infaq Pengembangan</h1>
        <p className="max-w-2xl text-emerald-100 leading-relaxed">Dukunganmu membantu pengembangan fitur, pemeliharaan sistem, dan operasional layanan Al-Hikmah AI agar semakin bermanfaat untuk belajar Al-Qur’an dan Hadits.</p>
        <p className="text-sm text-emerald-200">Donasi bersifat sukarela, dengan nominal sesuai kemampuan.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <DonationAccount />
        <section aria-labelledby="transfer-title" className="space-y-5 p-2 sm:p-4">
          <h2 id="transfer-title" className="text-xl font-bold">Cara memberikan dukungan</h2>
          <ol className="list-decimal pl-5 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 marker:font-bold marker:text-emerald-600">
            <li>Salin nomor rekening dan buka aplikasi bank atau layanan transfer yang kamu gunakan.</li>
            <li>Pilih bank BRI, masukkan nomor rekening, lalu cocokkan nama penerima.</li>
            <li>Masukkan nominal pilihanmu dan selesaikan transfer melalui layanan tersebut.</li>
          </ol>
          <p className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">Transfer dilakukan langsung ke rekening pengembang. Halaman ini menyediakan informasi rekening dan tidak memeriksa status pembayaran secara otomatis.</p>
        </section>
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-slate-600 dark:text-slate-300">Terima kasih atas dukungan dan doa baikmu untuk pengembangan Al-Hikmah AI.</p>
        <Link href="/" className="inline-block text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:underline">Kembali ke Al-Hikmah AI →</Link>
      </div>
    </div>
  );
}
