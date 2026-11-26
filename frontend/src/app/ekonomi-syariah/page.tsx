import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ekonomiSyariah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ekonomi Syariah Kontemporer — Al-Hikmah AI',
  description: 'Panduan perbankan syariah, asuransi takaful, saham syariah, reksa dana, dan fintech halal.',
};

export default function Page() {
  return <LearningCourse course={ekonomiSyariah} />;
}
