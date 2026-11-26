import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ilmuFalak } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ilmu Falak & Astronomi Islam — Al-Hikmah AI',
  description: 'Memahami hisab dan rukyatul hilal, kriteria MABIMS, penentuan waktu shalat berdasarkan matahari, dan arah kiblat.',
};

export default function Page() {
  return <LearningCourse course={ilmuFalak} />;
}
