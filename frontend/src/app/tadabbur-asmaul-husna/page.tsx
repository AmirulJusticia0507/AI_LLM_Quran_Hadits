import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { tadabburAsmaulHusna } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Tadabbur Asmaul Husna dalam Doa & Kehidupan — Al-Hikmah AI',
  description: 'Memahami makna nama-nama indah Allah, adab berdoa dengannya, dan meneladani sifat kasih sayang serta keadilan.',
};

export default function Page() {
  return <LearningCourse course={tadabburAsmaulHusna} />;
}
