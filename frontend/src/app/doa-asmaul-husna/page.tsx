import type { Metadata } from 'next';
import DoaAsmaulHusna from '@/components/DoaAsmaulHusna';

export const metadata: Metadata = {
  title: 'Pemilih Doa & Asmaul Husna Tematik — Al-Hikmah AI',
  description: 'Temukan nama Allah (Asmaul Husna) yang tepat dipanjatkan sesuai kondisi hati, kesembuhan, rezeki, atau hajat Anda.',
};

export default function Page() {
  return <DoaAsmaulHusna />;
}
