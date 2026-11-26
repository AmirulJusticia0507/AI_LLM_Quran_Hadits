import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { adabLisanMajelis } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Adab Lisan, Majelis, & Bertamu — Al-Hikmah AI',
  description: 'Menjaga lisan dari ghibah dan namimah, adab bertamu dan menerima tamu, serta etika musyawarah.',
};

export default function Page() {
  return <LearningCourse course={adabLisanMajelis} />;
}
