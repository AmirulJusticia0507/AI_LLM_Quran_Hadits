import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { lingkungan } from '@/data/learning';

export const metadata: Metadata = {
  title: lingkungan.title,
  description: lingkungan.description,
};

export default function Page() {
  return <LearningCourse course={lingkungan} />;
}
