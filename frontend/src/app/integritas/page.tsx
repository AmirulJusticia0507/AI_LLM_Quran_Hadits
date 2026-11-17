import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { integritas } from '@/data/learning';

export const metadata: Metadata = {
  title: integritas.title,
  description: integritas.description,
};

export default function Page() {
  return <LearningCourse course={integritas} />;
}
