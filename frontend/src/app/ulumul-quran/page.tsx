import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ulumulQuran } from '@/data/learning';

export const metadata: Metadata = {
  title: ulumulQuran.title,
  description: ulumulQuran.description,
};

export default function Page() {
  return <LearningCourse course={ulumulQuran} />;
}
