import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhJamaahSujud } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Shalat Berjamaah, Masbuq, & Sujud Khusus — Al-Hikmah AI',
  description: 'Panduan lengkap shalat berjamaah, makmum masbuq, syarat imam, serta sujud sahwi, sujud tilawah, dan sujud syukur.',
};

export default function Page() {
  return <LearningCourse course={fiqhJamaahSujud} />;
}
