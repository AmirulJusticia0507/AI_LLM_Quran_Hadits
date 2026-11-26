import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { sejarahPendidikanIslam } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Sejarah Pendidikan Islam & Tradisi Pesantren — Al-Hikmah AI',
  description: 'Perjalanan lembaga pendidikan Islam dari Darul Arqam, Suffah Nabawi, Madrasah Nizhamiyah, hingga Pesantren Nusantara.',
};

export default function Page() {
  return <LearningCourse course={sejarahPendidikanIslam} />;
}
