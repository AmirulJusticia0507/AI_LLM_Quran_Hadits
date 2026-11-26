import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhPropertiGadai } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Properti, KPR Syariah, & Gadai (Rahn) — Al-Hikmah AI',
  description: 'Rincian akad Murabahah, Musyarakah Mutanaqisah, Rahn (gadai syariah), serta akad Salam & Istishna\' untuk pre-order.',
};

export default function Page() {
  return <LearningCourse course={fiqhPropertiGadai} />;
}
