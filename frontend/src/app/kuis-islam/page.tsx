import type { Metadata } from 'next';
import KuisIslam from '@/components/KuisIslam';

export const metadata: Metadata = {
  title: 'Kuis Harian Islam — Al-Hikmah AI',
  description: '5 soal pilihan ganda harian seputar Al-Qur\'an, Hadits, Fiqh, Sirah, dan Aqidah. Uji pengetahuan Islam Anda!',
};

export default function Page() {
  return <KuisIslam />;
}
