import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { medis } from '@/data/learning';

export const metadata: Metadata = {
  title: medis.title,
  description: medis.description,
};

export default function Page() {
  return <LearningCourse course={medis} />;
}
