import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhKetenagakerjaan } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Ketenagakerjaan: Hak Pekerja & Kontrak Kerja — Al-Hikmah AI',
  description: 'Kewajiban membayar upah tepat waktu, kejelasan kontrak ijarah, keadilan bagi karyawan & ART, serta etika kerja amanah.',
};

export default function Page() {
  return <LearningCourse course={fiqhKetenagakerjaan} />;
}
