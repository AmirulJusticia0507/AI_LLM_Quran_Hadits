import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhDakwah } from '@/data/learning';

export const metadata: Metadata = {
  title: fiqhDakwah.title,
  description: fiqhDakwah.description,
};

export default function Page() {
  return <LearningCourse course={fiqhDakwah} />;
}
