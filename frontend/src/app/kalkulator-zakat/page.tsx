import type { Metadata } from 'next';
import KalkulatorZakat from '@/components/KalkulatorZakat';

export const metadata: Metadata = {
  title: 'Kalkulator Zakat — Al-Hikmah AI',
  description: 'Hitung zakat mal, zakat penghasilan, dan zakat fitrah dengan mudah. Kalkulasi otomatis berdasarkan nisab emas terkini.',
};

export default function Page() {
  return <KalkulatorZakat />;
}
