"use client";

import { useLanguage } from "@/context/LanguageContext";
import FeedbackForm from "@/components/FeedbackForm";

export default function MasukanPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">
          {isEn ? "Send Feedback" : "Kirim Masukan"}
        </h1>
        <p className="leading-7 text-slate-600 dark:text-slate-300">
          {isEn
            ? "Help develop Al-Hikmah AI by sharing suggestions, reporting issues, or proposing new features. Your feedback is sent directly to the developer via WhatsApp."
            : "Bantu pengembangan Al-Hikmah AI dengan saran, laporan kendala, atau ide fitur. Masukanmu ditujukan kepada pengembang melalui WhatsApp."}
        </p>
      </header>
      <FeedbackForm />
    </div>
  );
}
