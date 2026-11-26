import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhSosialKemanusiaan } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Sosial, Filantropi, & Hak Kaum Rentan — Al-Hikmah AI',
  description: 'Konsep keadilan sosial Islam, kewajiban sosial terhadap fakir miskin, hak penyandang disabilitas, dan ta\'awun kemanusiaan.',
};

export default function Page() {
  return <LearningCourse course={fiqhSosialKemanusiaan} />;
}
