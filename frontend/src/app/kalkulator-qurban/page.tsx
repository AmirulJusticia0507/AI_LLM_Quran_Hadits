import type { Metadata } from 'next';
import KalkulatorQurban from '@/components/KalkulatorQurban';

export const metadata: Metadata = {
  title: 'Kalkulator Pembagian Daging Qurban & Aqiqah — Al-Hikmah AI',
  description: 'Hitung porsi pembagian 1/3 shohibul qurban, 1/3 kerabat, dan 1/3 fakir miskin berdasarkan perkiraan berat daging bersih.',
};

export default function Page() {
  return <KalkulatorQurban />;
}
