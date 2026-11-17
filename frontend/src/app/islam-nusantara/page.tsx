import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import IslamNusantaraBanner from '@/components/IslamNusantaraBanner';
import { islamNusantara } from '@/data/learning';

export const metadata: Metadata = {
  title: islamNusantara.title,
  description: islamNusantara.description,
};

export default function Page() {
  return (
    <div className="space-y-6">
      <IslamNusantaraBanner />
      <LearningCourse course={islamNusantara} />
    </div>
  );
}
