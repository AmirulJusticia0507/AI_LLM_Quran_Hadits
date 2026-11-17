import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { makananHalal } from '@/data/learning';

export const metadata: Metadata = {
  title: makananHalal.title,
  description: makananHalal.description,
};

export default function Page() {
  return <LearningCourse course={makananHalal} />;
}
