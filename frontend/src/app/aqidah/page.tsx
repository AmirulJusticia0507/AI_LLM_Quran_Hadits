import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { aqidah } from '@/data/learning';

export const metadata: Metadata = {
  title: aqidah.title,
  description: aqidah.description,
};

export default function Page() {
  return <LearningCourse course={aqidah} />;
}
