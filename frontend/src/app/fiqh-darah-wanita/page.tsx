import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhDarahWanita } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Darah Wanita: Haid, Nifas, & Istihadhah — Al-Hikmah AI',
  description: 'Panduan detail membedakan darah haid, nifas, dan istihadhah, batas harinya, serta hukum shalat, puasa, dan qadha.',
};

export default function Page() {
  return <LearningCourse course={fiqhDarahWanita} />;
}
