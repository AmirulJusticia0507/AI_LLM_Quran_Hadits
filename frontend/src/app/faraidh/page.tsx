import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { faraidh } from '@/data/learning';

export const metadata: Metadata = {
  title: faraidh.title,
  description: faraidh.description,
};

export default function Page() {
  return <LearningCourse course={faraidh} />;
}
