import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { komparasi } from '@/data/learning';

export const metadata: Metadata = {
  title: komparasi.title,
  description: komparasi.description,
};

export default function Page() {
  return <LearningCourse course={komparasi} />;
}
