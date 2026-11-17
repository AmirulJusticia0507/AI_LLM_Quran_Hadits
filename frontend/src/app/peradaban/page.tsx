import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { peradaban } from '@/data/learning';

export const metadata: Metadata = {
  title: peradaban.title,
  description: peradaban.description,
};

export default function Page() {
  return <LearningCourse course={peradaban} />;
}
