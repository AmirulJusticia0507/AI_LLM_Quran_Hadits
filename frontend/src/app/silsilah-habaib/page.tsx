import type { Metadata } from "next";
import SilsilahHabaibChart from "@/components/SilsilahHabaibChart";

export const metadata: Metadata = {
  title: "Bagan Silsilah Nasab Habaib Ba 'Alawi — Dari Nabi Muhammad ﷺ",
  description: "Visualisasi interaktif animasi alur silsilah garis keturunan Rasulullah ﷺ, Sayyidah Fatimah, Sayyidina Husain, Imam Ahmad Al-Muhajir, hingga lahirnya marga-marga Habaib di Nusantara.",
};

export default function SilsilahHabaibPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <SilsilahHabaibChart />
    </div>
  );
}
