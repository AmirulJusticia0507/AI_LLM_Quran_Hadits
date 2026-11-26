import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ilmuTafsir } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ilmu Tafsir Al-Qur\'an — Al-Hikmah AI',
  description: 'Pelajari metode tafsir bil ma\'tsur, bir ra\'yi, maudhui, dan tokoh mufassir besar dari era klasik hingga kontemporer.',
};

export default function Page() {
  return <LearningCourse course={ilmuTafsir} />;
}
