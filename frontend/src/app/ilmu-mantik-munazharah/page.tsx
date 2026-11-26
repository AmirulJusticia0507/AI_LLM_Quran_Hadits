import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ilmuMantikMunazharah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ilmu Mantik & Etika Berdiskusi (Munazharah) — Al-Hikmah AI',
  description: 'Dasar logika berpikir lurus dalam tradisi ulama Islam, mengenali sesat pikir (fallacy), dan adab berdebat ilmiah.',
};

export default function Page() {
  return <LearningCourse course={ilmuMantikMunazharah} />;
}
