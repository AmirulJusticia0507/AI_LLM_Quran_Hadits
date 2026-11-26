import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { lembagaIslamIndonesia } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Mengenal Organisasi & Lembaga Islam di Indonesia — Al-Hikmah AI',
  description: 'Peran historis dan kontribusi dakwah, pendidikan, serta sosial NU, Muhammadiyah, Persis, MUI, BAZNAS, dan BWI.',
};

export default function Page() {
  return <LearningCourse course={lembagaIslamIndonesia} />;
}
