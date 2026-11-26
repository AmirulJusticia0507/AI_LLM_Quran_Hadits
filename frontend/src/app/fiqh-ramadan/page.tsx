import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhRamadan } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Ramadan Lengkap — Al-Hikmah AI',
  description: 'Panduan komprehensif ibadah Ramadan: puasa, tarawih, i\'tikaf, lailatul qadar, dan zakat fitrah.',
};

export default function Page() {
  return <LearningCourse course={fiqhRamadan} />;
}
