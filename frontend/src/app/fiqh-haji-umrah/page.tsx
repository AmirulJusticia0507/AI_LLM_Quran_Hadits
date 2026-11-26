import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { fiqhHajiUmrah } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Fiqh Haji & Umrah (Manasik Lengkap) — Al-Hikmah AI',
  description: 'Panduan lengkap syarat, rukun, wajib haji & umrah, miqat, larangan ihram, dam, dan badal haji sesuai sunnah.',
};

export default function Page() {
  return <LearningCourse course={fiqhHajiUmrah} />;
}
