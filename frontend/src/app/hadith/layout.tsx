import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kumpulan Kitab Hadits",
  description:
    "Telusuri 9 kitab hadits (Kutubut Tis'ah): Bukhari, Muslim, Tirmidzi, Abu Dawud, Nasa'i, Ibnu Majah, Ahmad, Malik, dan Darimi.",
};

export default function HadithLayout({ children }: { children: React.ReactNode }) {
  return children;
}
