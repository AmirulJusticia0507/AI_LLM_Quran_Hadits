import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { sahabatSurga } from '@/data/learning';

export const metadata: Metadata = {
  title: sahabatSurga.title,
  description: sahabatSurga.description,
};

export default function Page() {
  return <LearningCourse course={sahabatSurga} />;
}
