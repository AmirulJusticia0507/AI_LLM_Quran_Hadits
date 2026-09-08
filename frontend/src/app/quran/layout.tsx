import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Al-Qur'an & Terjemahan",
  description:
    "Baca dan cari ayat Al-Qur'an 114 surah dengan teks Arab, transliterasi Latin, terjemahan Indonesia, audio murottal, dan tafsir ringkas.",
};

export default function QuranLayout({ children }: { children: React.ReactNode }) {
  return children;
}
