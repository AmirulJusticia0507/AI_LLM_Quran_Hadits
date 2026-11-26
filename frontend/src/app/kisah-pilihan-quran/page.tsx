import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { kisahPilihanQuran } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Kisah Pilihan Al-Qur\'an (Selain Nabi) — Al-Hikmah AI',
  description: 'Pelajaran hidup dari kisah Ashabul Kahfi, Dzulqarnain, Luqmanul Hakim, Maryam binti Imran, dan Ashabul Ukhdud.',
};

export default function Page() {
  return <LearningCourse course={kisahPilihanQuran} />;
}
