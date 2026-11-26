import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { zakatKontemporer } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Zakat Kontemporer — Al-Hikmah AI',
  description: 'Panduan zakat penghasilan, zakat saham, zakat kripto, dan zakat perusahaan sesuai fatwa MUI dan BAZNAS.',
};

export default function Page() {
  return <LearningCourse course={zakatKontemporer} />;
}
