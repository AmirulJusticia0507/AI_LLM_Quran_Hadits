import type { Metadata } from 'next';
import KalenderHijriah from '@/components/KalenderHijriah';

export const metadata: Metadata = {
  title: 'Kalender Puasa Sunnah & Konverter Hijriah — Al-Hikmah AI',
  description: 'Konversi tanggal Masehi ke Hijriah serta pantau jadwal puasa sunnah Ayyamul Bidh, Senin-Kamis, dan hari besar Islam.',
};

export default function Page() {
  return <KalenderHijriah />;
}
