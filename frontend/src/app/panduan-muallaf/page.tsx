import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { panduanMuallaf } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Panduan Muallaf & Langkah Awal Hijrah — Al-Hikmah AI',
  description: 'Panduan praktis bagi saudara baru atau pemula yang baru mulai belajar Islam: syahadat, shalat bertahap, dan adab keluarga.',
};

export default function Page() {
  return <LearningCourse course={panduanMuallaf} />;
}
