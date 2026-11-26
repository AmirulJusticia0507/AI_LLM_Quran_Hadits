import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { harmoniRumahTangga } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Harmoni Suami-Istri & Komunikasi Rumah Tangga — Al-Hikmah AI',
  description: 'Seni komunikasi pasangan, pembagian peran, manajemen keuangan keluarga, dan penyelesaian konflik meneladani Nabi SAW.',
};

export default function Page() {
  return <LearningCourse course={harmoniRumahTangga} />;
}
