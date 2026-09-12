import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqh } from '@/data/learning';
export const metadata: Metadata = { title: fiqh.title, description: fiqh.description };
export default function Page() { return <LearningCourse course={fiqh} />; }
