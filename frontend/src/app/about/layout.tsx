import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Al-Hikmah AI",
  description:
    "Tentang platform Al-Hikmah AI: fitur, teknologi, model AI yang digunakan, dan profil pembuat.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
