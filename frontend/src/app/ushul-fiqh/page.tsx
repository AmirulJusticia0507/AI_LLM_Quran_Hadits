import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ushulFiqh } from '@/data/learning';

export const metadata: Metadata = {
  title: ushulFiqh.title,
  description: ushulFiqh.description,
};

export default function Page() {
  return <LearningCourse course={ushulFiqh} />;
}
