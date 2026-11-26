import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ilmuQiraat } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ilmu Qira\'at & Sejarah Mushaf — Al-Hikmah AI',
  description: 'Mengenal 7 & 10 Qira\'at mutawatir, sejarah penulisan Mushaf Utsmani, serta rasm dan tanda waqaf.',
};

export default function Page() {
  return <LearningCourse course={ilmuQiraat} />;
}
