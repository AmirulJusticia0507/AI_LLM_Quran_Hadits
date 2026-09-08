import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal Shalat & Kalender Hijriah | Al-Hikmah AI",
  description:
    "Jadwal shalat harian berdasarkan lokasi GPS dengan metode Kemenag RI, lengkap dengan tanggal Hijriah dan hitung mundur shalat berikutnya.",
};

export default function JadwalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
