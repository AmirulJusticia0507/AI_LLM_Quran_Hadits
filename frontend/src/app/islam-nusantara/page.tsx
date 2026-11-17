import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { islamNusantara } from '@/data/learning';

export const metadata: Metadata = {
  title: islamNusantara.title,
  description: islamNusantara.description,
};

export default function Page() {
  return <LearningCourse course={islamNusantara} />;
}
