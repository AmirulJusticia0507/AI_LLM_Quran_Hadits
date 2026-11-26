import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { adabProfesi } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Akhlak & Adab Profesi Muslim — Al-Hikmah AI',
  description: 'Panduan adab Islam dalam dunia kerja: dokter, guru, pedagang, ASN, dan programmer Muslim.',
};

export default function Page() {
  return <LearningCourse course={adabProfesi} />;
}
