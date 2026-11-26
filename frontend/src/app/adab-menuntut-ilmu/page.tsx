import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { adabMenuntutIlmu } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Adab Menuntut Ilmu (Ta\'limul Muta\'allim) — Al-Hikmah AI',
  description: 'Etika murid kepada guru, adab terhadap kitab, manajemen waktu belajar, dan cara mengatasi futur.',
};

export default function Page() {
  return <LearningCourse course={adabMenuntutIlmu} />;
}
