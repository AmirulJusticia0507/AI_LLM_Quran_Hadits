import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { psikologiIslam } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Psikologi Islam & Kesehatan Mental — Al-Hikmah AI',
  description: 'Mengenal struktur jiwa dalam Islam (nafs, qalb, ruh, aql) serta cara mengatasi cemas, stres, dan kesedihan.',
};

export default function Page() {
  return <LearningCourse course={psikologiIslam} />;
}
