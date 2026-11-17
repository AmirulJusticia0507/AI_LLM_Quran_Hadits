import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { muslimah } from '@/data/learning';

export const metadata: Metadata = {
  title: muslimah.title,
  description: muslimah.description,
};

export default function Page() {
  return <LearningCourse course={muslimah} />;
}
