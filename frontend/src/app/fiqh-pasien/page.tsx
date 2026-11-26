import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhPasien } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Pasien, Rumah Sakit, & Ibadah Saat Sakit — Al-Hikmah AI',
  description: 'Panduan bersuci dan shalat bagi pasien dengan infus, gips, atau kateter, shalat berbaring, serta hukum obat saat puasa.',
};

export default function Page() {
  return <LearningCourse course={fiqhPasien} />;
}
