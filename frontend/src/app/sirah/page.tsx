import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { sirah } from '@/data/learning';
export const metadata: Metadata = { title: sirah.title, description: sirah.description };
export default function Page() { return <LearningCourse course={sirah} />; }
