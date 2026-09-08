import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan Tajwid",
  description:
    "Belajar hukum tajwid: Ghunnah, Idgham, Mad, Qalqalah, dan Waqaf dengan penjelasan dan contoh.",
};

export default function TajweedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
