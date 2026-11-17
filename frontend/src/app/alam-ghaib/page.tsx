import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { alamGhaib } from '@/data/learning';

export const metadata: Metadata = {
  title: alamGhaib.title,
  description: alamGhaib.description,
};

export default function Page() {
  return <LearningCourse course={alamGhaib} />;
}
