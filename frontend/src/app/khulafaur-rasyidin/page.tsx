import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { khulafaurRasyidin } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Kepemimpinan Khulafaur Rasyidin — Al-Hikmah AI',
  description: 'Keteladanan keadilan dan kebijakan Abu Bakar, Umar, Utsman, Ali, serta Umar bin Abdul Aziz.',
};

export default function Page() {
  return <LearningCourse course={khulafaurRasyidin} />;
}
