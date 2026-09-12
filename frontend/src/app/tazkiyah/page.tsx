import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { tazkiyah } from '@/data/learning';
export const metadata: Metadata = { title: tazkiyah.title, description: tazkiyah.description };
export default function Page() { return <LearningCourse course={tazkiyah} />; }
