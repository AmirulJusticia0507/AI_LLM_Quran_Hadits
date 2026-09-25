import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { balaghoh } from '@/data/learning';
export const metadata: Metadata = { title: balaghoh.title, description: balaghoh.description };
export default function Page() { return <LearningCourse course={balaghoh} />; }
