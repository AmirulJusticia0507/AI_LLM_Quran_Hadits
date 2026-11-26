import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { sharafDasar } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Ilmu Sharaf Dasar — Al-Hikmah AI',
  description: 'Pelajari morfologi bahasa Arab: wazan fi\'il, tasrif istilahi & lughawi, isim fa\'il, isim maf\'ul, dan masdar.',
};

export default function Page() {
  return <LearningCourse course={sharafDasar} />;
}
