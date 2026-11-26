import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { sejarahDinastiIslam } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Sejarah Dinasti Islam: Umayyah, Abbasiyah, & Utsmani — Al-Hikmah AI',
  description: 'Jejak peradaban kekhalifahan Umayyah di Damaskus & Andalusia, Abbasiyah di Baghdad, hingga Utsmani di Konstantinopel.',
};

export default function Page() {
  return <LearningCourse course={sejarahDinastiIslam} />;
}
