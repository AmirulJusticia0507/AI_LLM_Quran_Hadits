import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { kisahNabi } from '@/data/learning';

export const metadata: Metadata = {
  title: kisahNabi.title,
  description: kisahNabi.description,
};

export default function Page() {
  return <LearningCourse course={kisahNabi} />;
}
