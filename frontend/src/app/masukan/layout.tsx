import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kirim Masukan — Al-Hikmah AI",
  description: "Sampaikan saran, kendala, dan ide pengembangan Al-Hikmah AI melalui WhatsApp.",
};

export default function MasukanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
