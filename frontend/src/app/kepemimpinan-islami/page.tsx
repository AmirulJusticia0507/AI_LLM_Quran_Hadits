import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { kepemimpinanIslami } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Kepemimpinan, Organisasi, & Manajemen Konflik Islami — Al-Hikmah AI',
  description: 'Prinsip syura, memilih rekan kerja berintegritas, delegasi tugas, dan penyelesaian sengketa (ishlah) dalam organisasi.',
};

export default function Page() {
  return <LearningCourse course={kepemimpinanIslami} />;
}
