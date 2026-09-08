import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doa Harian",
  description: "Kumpulan doa sehari-hari: sebelum makan, tidur, bepergian, untuk orang tua, dan lainnya — Arab, Latin, arti, dan sumber.",
};

export default function DoaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
