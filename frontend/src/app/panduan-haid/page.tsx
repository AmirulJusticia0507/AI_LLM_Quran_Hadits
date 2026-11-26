import type { Metadata } from 'next';
import PanduanHaid from '@/components/PanduanHaid';

export const metadata: Metadata = {
  title: 'Panduan Praktis Hitung Haid & Istihadhah — Al-Hikmah AI',
  description: 'Bantu muslimah menentukan status darah haid atau istihadhah berdasarkan durasi hari dan ketentuan fikih.',
};

export default function Page() {
  return <PanduanHaid />;
}
