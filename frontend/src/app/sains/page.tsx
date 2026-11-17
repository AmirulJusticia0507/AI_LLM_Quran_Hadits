import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { sains } from '@/data/learning';

export const metadata: Metadata = {
  title: sains.title,
  description: sains.description,
};

export default function Page() {
  return <LearningCourse course={sains} />;
}
