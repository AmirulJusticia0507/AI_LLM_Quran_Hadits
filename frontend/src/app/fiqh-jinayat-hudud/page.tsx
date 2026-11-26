import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhJinayatHudud } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Jinayat, Diyat, & Keadilan Pidana Islam — Al-Hikmah AI',
  description: 'Memahami konsep Qishash, Diyat, Hudud, Ta\'zir, syarat pembuktian ketat, serta larangan main hakim sendiri dalam Islam.',
};

export default function Page() {
  return <LearningCourse course={fiqhJinayatHudud} />;
}
