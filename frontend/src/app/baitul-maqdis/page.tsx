import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { baitulMaqdis } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Baitul Maqdis & Masjid Al-Aqsha dalam Sejarah — Al-Hikmah AI',
  description: 'Kedudukan Masjid Al-Aqsha dalam Islam, Isra\' Mi\'raj, sejarah pembebasan, dan keutamaan bumi Syam.',
};

export default function Page() {
  return <LearningCourse course={baitulMaqdis} />;
}
