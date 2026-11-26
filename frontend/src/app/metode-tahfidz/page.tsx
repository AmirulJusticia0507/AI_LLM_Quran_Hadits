import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { metodeTahfidz } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Metode Tahfidz & Muraja\'ah Al-Qur\'an — Al-Hikmah AI',
  description: 'Strategi menghafal Al-Qur\'an di tengah kesibukan, metode tikrar & talaqqi, serta kiat menjaga hafalan.',
};

export default function Page() {
  return <LearningCourse course={metodeTahfidz} />;
}
