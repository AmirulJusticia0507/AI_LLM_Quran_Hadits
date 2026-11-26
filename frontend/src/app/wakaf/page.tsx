import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { wakaf } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Wakaf & Wakaf Produktif — Al-Hikmah AI',
  description: 'Panduan lengkap wakaf tanah, wakaf uang, wakaf online, dan wakaf produktif sesuai UU No. 41/2004 dan BWI.',
};

export default function Page() {
  return <LearningCourse course={wakaf} />;
}
