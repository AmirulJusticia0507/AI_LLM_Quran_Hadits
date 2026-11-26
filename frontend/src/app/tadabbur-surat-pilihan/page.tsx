import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { tadabburSuratPilihan } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Tadabbur Surat-Surat Agung Pilihan — Al-Hikmah AI',
  description: 'Membedah intisari, keutamaan, dan pelajaran praktis dari Al-Fatihah, Ayat Kursi, Al-Kahfi, Yasin, Ar-Rahman, dan Al-Mulk.',
};

export default function Page() {
  return <LearningCourse course={tadabburSuratPilihan} />;
}
