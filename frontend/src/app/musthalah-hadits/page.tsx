import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { musthalahHadits } from '@/data/learning';

export const metadata: Metadata = {
  title: musthalahHadits.title,
  description: musthalahHadits.description,
};

export default function Page() {
  return <LearningCourse course={musthalahHadits} />;
}
