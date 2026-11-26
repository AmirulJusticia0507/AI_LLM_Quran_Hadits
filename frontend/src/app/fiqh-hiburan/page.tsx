import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhHiburan } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Seni, Hiburan, & Gaya Hidup Muslim — Al-Hikmah AI',
  description: 'Pandangan ulama tentang musik, fotografi, adab berpakaian, batas bercanda, dan olahraga dalam Islam.',
};

export default function Page() {
  return <LearningCourse course={fiqhHiburan} />;
}
