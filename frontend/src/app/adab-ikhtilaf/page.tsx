import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { adabIkhtilaf } from '@/data/learning';

export const metadata: Metadata = {
  title: adabIkhtilaf.title,
  description: adabIkhtilaf.description,
};

export default function Page() {
  return <LearningCourse course={adabIkhtilaf} />;
}
