import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { munakahat } from '@/data/learning';

export const metadata: Metadata = {
  title: munakahat.title,
  description: munakahat.description,
};

export default function Page() {
  return <LearningCourse course={munakahat} />;
}
