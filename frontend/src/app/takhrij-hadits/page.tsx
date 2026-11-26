import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { takhrijHadits } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ilmu Takhrij Hadits & Kitab Kutubus Sittah — Al-Hikmah AI',
  description: 'Cara melacak sumber hadits, mengenal karakter kitab Bukhari hingga Ibnu Majah, serta mewaspadai hadits palsu di internet.',
};

export default function Page() {
  return <LearningCourse course={takhrijHadits} />;
}
