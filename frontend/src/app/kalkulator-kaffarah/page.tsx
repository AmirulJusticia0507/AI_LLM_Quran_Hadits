import type { Metadata } from 'next';
import KalkulatorKaffarah from '@/components/KalkulatorKaffarah';

export const metadata: Metadata = {
  title: 'Kalkulator Kaffarah Sumpah & Puasa — Al-Hikmah AI',
  description: 'Hitung rincian kaffarah melanggar sumpah (10 orang miskin) dan kaffarah berat (60 orang miskin) beserta estimasi biayanya.',
};

export default function Page() {
  return <KalkulatorKaffarah />;
}
