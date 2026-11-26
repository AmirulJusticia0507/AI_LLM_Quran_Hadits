import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { manajemenWaktuIslami } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Manajemen Waktu & Produktivitas Muslim — Al-Hikmah AI',
  description: 'Mengatur waktu berbasis shalat lima waktu, mencari keberkahan pagi, dan menyeimbangkan hak Allah, keluarga, serta pekerjaan.',
};

export default function Page() {
  return <LearningCourse course={manajemenWaktuIslami} />;
}
