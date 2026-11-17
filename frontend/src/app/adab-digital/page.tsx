import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { adabDigital } from '@/data/learning';

export const metadata: Metadata = {
  title: adabDigital.title,
  description: adabDigital.description,
};

export default function Page() {
  return <LearningCourse course={adabDigital} />;
}
