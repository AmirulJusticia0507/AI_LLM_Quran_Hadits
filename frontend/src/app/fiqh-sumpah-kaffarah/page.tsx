import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhSumpahKaffarah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Sumpah, Nadzar, & Kaffarah — Al-Hikmah AI',
  description: 'Hukum sumpah, bahaya sumpah palsu, aturan nadzar yang sah, serta tata cara menunaikan berbagai jenis kaffarah.',
};

export default function Page() {
  return <LearningCourse course={fiqhSumpahKaffarah} />;
}
