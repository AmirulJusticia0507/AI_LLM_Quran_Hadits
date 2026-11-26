import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhQurbanAqiqah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Qurban & Aqiqah — Al-Hikmah AI',
  description: 'Syarat sah hewan qurban & aqiqah, waktu penyembelihan, aturan pembagian daging, dan hukum qurban patungan.',
};

export default function Page() {
  return <LearningCourse course={fiqhQurbanAqiqah} />;
}
