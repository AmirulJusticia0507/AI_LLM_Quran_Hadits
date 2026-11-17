import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fitnahAkhirZaman } from '@/data/learning';

export const metadata: Metadata = {
  title: fitnahAkhirZaman.title,
  description: fitnahAkhirZaman.description,
};

export default function Page() {
  return <LearningCourse course={fitnahAkhirZaman} />;
}
