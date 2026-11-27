import type { Metadata } from 'next';
import KamusArab from '@/components/KamusArab';

export const metadata: Metadata = {
  title: 'Kamus Bahasa Arab — Al-Hikmah AI',
  description:
    'Kamus kosakata bahasa Arab Al-Qur’an, Hadits, dan istilah keislaman lengkap dengan harakat, transliterasi, akar kata, jenis kata, dan contoh ayat.',
};

export default function Page() {
  return <KamusArab />;
}
