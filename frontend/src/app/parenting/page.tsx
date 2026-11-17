import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { parenting } from '@/data/learning';

export const metadata: Metadata = {
  title: parenting.title,
  description: parenting.description,
};

export default function Page() {
  return <LearningCourse course={parenting} />;
}
