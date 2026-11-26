import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { adabTidurMimpi } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Adab Tidur, Bangun Malam, & Memahami Mimpi — Al-Hikmah AI',
  description: 'Sunnah sebelum tidur, adab bangun malam, serta membedakan 3 jenis mimpi menurut hadits Rasulullah SAW.',
};

export default function Page() {
  return <LearningCourse course={adabTidurMimpi} />;
}
