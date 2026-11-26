import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { kaligrafiIslam } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Sejarah & Jenis Kaligrafi Islam (Khat Arab) — Al-Hikmah AI',
  description: 'Mengenal 6 gaya khat utama (Naskhi, Tsuluts, Riq\'ah, Diwani, Kufi, Farisi) dan perannya dalam peradaban Islam.',
};

export default function Page() {
  return <LearningCourse course={kaligrafiIslam} />;
}
