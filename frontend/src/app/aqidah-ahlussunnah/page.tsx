import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { aqidahAhlussunnah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Sejarah & Manhaj Aqidah Ahlussunnah Wal Jama\'ah — Al-Hikmah AI',
  description: 'Mengenal perkembangan akidah dari generasi Salaf hingga perumusan Imam Al-Asy\'ari dan Al-Maturidi yang menjaga persatuan umat.',
};

export default function Page() {
  return <LearningCourse course={aqidahAhlussunnah} />;
}
