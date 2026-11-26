import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhKontemporer } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Kontemporer & Fatwa Modern — Al-Hikmah AI',
  description: 'Hukum paylater, dropship & affiliate, donor organ, hak cipta digital, hingga etika penggunaan AI dalam Islam.',
};

export default function Page() {
  return <LearningCourse course={fiqhKontemporer} />;
}
