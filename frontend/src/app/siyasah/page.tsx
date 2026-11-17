import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { siyasah } from '@/data/learning';

export const metadata: Metadata = {
  title: siyasah.title,
  description: siyasah.description,
};

export default function Page() {
  return <LearningCourse course={siyasah} />;
}
