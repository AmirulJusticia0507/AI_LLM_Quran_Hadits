import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhSafar } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Safar, Jama\'-Qashar, & Shalat Sunnah — Al-Hikmah AI',
  description: 'Panduan lengkap shalat di perjalanan, syarat jarak qashar, tata cara jama\' taqdim/ta\'khir, dan shalat sunnah.',
};

export default function Page() {
  return <LearningCourse course={fiqhSafar} />;
}
