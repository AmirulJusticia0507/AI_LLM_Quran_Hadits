import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhHariRaya } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Hari Raya & Bulan-Bulan Mulia — Al-Hikmah AI',
  description: 'Sunnah Shalat Ied, adab takbiran, silaturahim hari raya, serta amalan shahih di bulan Muharram, Rajab, Sya\'ban, dan Dzulhijjah.',
};

export default function Page() {
  return <LearningCourse course={fiqhHariRaya} />;
}
