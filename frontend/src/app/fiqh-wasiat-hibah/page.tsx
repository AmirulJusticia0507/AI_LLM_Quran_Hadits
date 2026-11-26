import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhWasiatHibah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Wasiat, Hibah, & Harta Anak Yatim — Al-Hikmah AI',
  description: 'Membedakan waris, wasiat maksimal 1/3, dan hibah agar bebas sengketa, serta amanah menjaga harta anak yatim.',
};

export default function Page() {
  return <LearningCourse course={fiqhWasiatHibah} />;
}
