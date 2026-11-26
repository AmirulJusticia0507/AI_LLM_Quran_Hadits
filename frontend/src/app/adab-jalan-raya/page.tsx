import type { Metadata } from 'next';
import LearningCourse from '@/components/LearningCourse';
import { adabJalanRaya } from '@/data/learning';

export const metadata: Metadata = {
  title: 'Adab Berkendara, Lalu Lintas, & Keselamatan Jalan — Al-Hikmah AI',
  description: 'Hak jalan dalam hadits Nabi SAW, doa berkendara, larangan membahayakan pengguna jalan, dan etika bermobilitas yang amanah.',
};

export default function Page() {
  return <LearningCourse course={adabJalanRaya} />;
}
