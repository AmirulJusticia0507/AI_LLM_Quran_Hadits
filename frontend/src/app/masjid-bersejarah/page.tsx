import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { masjidBersejarah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Sejarah & Keutamaan Masjid Bersejarah — Al-Hikmah AI',
  description: 'Mengenal Masjidil Haram, Masjid Nabawi, Masjid Al-Aqsha, Masjid Quba, Qiblatain, Cordoba, hingga masjid Nusantara.',
};

export default function Page() {
  return <LearningCourse course={masjidBersejarah} />;
}
