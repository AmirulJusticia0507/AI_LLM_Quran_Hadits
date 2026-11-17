import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { muamalah } from '@/data/learning';

export const metadata: Metadata = {
  title: muamalah.title,
  description: muamalah.description,
};

export default function Page() {
  return <LearningCourse course={muamalah} />;
}
