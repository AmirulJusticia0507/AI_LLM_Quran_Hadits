import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { jenazahPraktis } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Panduan Lengkap Pengurusan Jenazah — Al-Hikmah AI',
  description: 'Panduan praktis step-by-step memandikan, mengafani, menshalatkan, dan menguburkan jenazah Muslim.',
};

export default function Page() {
  return <LearningCourse course={jenazahPraktis} />;
}
