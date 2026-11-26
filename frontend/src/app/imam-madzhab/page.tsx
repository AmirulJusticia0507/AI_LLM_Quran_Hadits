import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { imamMadzhab } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Biografi 4 Imam Madzhab & Ulama Besar — Al-Hikmah AI',
  description: 'Perjalanan hidup, metode ijtihad, dan kitab utama Imam Abu Hanifah, Malik, Syafi\'i, Ahmad, serta ulama Nusantara.',
};

export default function Page() {
  return <LearningCourse course={imamMadzhab} />;
}
