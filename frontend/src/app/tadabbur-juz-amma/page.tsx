import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { tadabburJuzAmma } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Tadabbur Juz \'Amma — Al-Hikmah AI',
  description: 'Intisari tema, asbabun nuzul ringkas, dan pelajaran hidup dari surat-surat Juz \'Amma (An-Naba\' hingga An-Nas).',
};

export default function Page() {
  return <LearningCourse course={tadabburJuzAmma} />;
}
