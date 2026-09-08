import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dzikir Counter",
  description: "Tasbih digital: hitung dzikir harian Subhanallah, Alhamdulillah, Allahu Akbar, dan lainnya dengan target.",
};

export default function DzikirLayout({ children }: { children: React.ReactNode }) {
  return children;
}
