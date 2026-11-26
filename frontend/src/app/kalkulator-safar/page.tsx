import type { Metadata } from 'next';
import KalkulatorSafar from '@/components/KalkulatorSafar';

export const metadata: Metadata = {
  title: 'Panduan & Kalkulator Safar (Jama\'-Qashar) — Al-Hikmah AI',
  description: 'Cek syarat jarak safar untuk shalat jama\' dan qashar beserta panduan pelaksanaan di perjalanan.',
};

export default function Page() {
  return <KalkulatorSafar />;
}
