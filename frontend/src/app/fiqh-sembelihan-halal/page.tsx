import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhSembelihanHalal } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Sembelihan Halal (JULEHA) & Bahan Pangan — Al-Hikmah AI',
  description: 'Syarat penyembelihan syar\'i, hukum pemingsanan (stunning), dan titik kritis bahan pangan modern seperti gelatin dan emulsifier.',
};

export default function Page() {
  return <LearningCourse course={fiqhSembelihanHalal} />;
}
