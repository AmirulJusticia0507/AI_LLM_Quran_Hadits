import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { birrulWalidain } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Birrul Walidain, Hak Tetangga, & Silaturahim — Al-Hikmah AI',
  description: 'Cara berbakti kepada orang tua saat hidup maupun wafat, menyikapi perbedaan pendapat, dan adab bertetangga.',
};

export default function Page() {
  return <LearningCourse course={birrulWalidain} />;
}
