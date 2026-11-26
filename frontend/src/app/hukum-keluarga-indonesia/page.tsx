import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { hukumKeluargaIndonesia } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Hukum Keluarga Islam di Indonesia — Al-Hikmah AI',
  description: 'Panduan KHI, pernikahan di KUA, itsbat nikah, cerai di Pengadilan Agama, dan perlindungan anak.',
};

export default function Page() {
  return <LearningCourse course={hukumKeluargaIndonesia} />;
}
