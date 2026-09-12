import type { Metadata } from "next";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "Kirim Masukan — Al-Hikmah AI",
  description: "Sampaikan saran, kendala, dan ide pengembangan Al-Hikmah AI melalui WhatsApp.",
};

export default function MasukanPage() {
  return <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
    <header className="space-y-3">
      <h1 className="text-3xl font-bold">Kirim Masukan</h1>
      <p className="leading-7 text-slate-600 dark:text-slate-300">Bantu pengembangan Al-Hikmah AI dengan saran, laporan kendala, atau ide fitur. Masukanmu ditujukan kepada pengembang melalui WhatsApp.</p>
    </header>
    <FeedbackForm />
  </div>;
}
