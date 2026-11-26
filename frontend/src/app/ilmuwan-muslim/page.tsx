import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { ilmuwanMuslim } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Biografi Ilmuwan Muslim Perintis Sains Modern — Al-Hikmah AI',
  description: 'Mengenal karya dan metode ilmiah Ibnu al-Haytham, Al-Khawarizmi, Ibnu Sina, Al-Jazari, dan Al-Biruni.',
};

export default function Page() {
  return <LearningCourse course={ilmuwanMuslim} />;
}
