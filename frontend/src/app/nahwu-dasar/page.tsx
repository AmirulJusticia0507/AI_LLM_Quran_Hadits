import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { nahwuDasar } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ilmu Nahwu Dasar — Al-Hikmah AI',
  description: 'Pelajari tata bahasa Arab (nahwu) untuk pemula: isim, fi\'il, harf, i\'rab, dan struktur kalimat Arab.',
};

export default function Page() {
  return <LearningCourse course={nahwuDasar} />;
}
