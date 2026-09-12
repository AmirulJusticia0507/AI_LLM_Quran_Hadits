import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ilmu Tajwid & Makhrajul Huruf",
  description:
    "Belajar 20 kaidah tajwid dan 17 makhraj huruf dalam 5 wilayah, dengan penjelasan, contoh, serta latihan pelafalan.",
};

export default function TajweedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
