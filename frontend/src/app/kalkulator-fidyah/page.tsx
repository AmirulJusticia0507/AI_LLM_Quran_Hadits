import type { Metadata } from 'next';
import KalkulatorFidyah from '@/components/KalkulatorFidyah';

export const metadata: Metadata = {
  title: 'Kalkulator Fidyah & Qadha Puasa — Al-Hikmah AI',
  description: 'Hitung jumlah hari utang puasa Ramadan dan total fidyah (kg beras maupun nominal rupiah) dengan mudah.',
};

export default function Page() {
  return <KalkulatorFidyah />;
}
