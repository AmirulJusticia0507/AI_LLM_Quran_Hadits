import type { Metadata } from 'next';
import SimulasiMurabahah from '@/components/SimulasiMurabahah';

export const metadata: Metadata = {
  title: 'Simulasi Pembiayaan Syariah (Murabahah) — Al-Hikmah AI',
  description: 'Hitung estimasi cicilan tetap akad Murabahah dengan margin transparan tanpa bunga mengambang atau denda riba.',
};

export default function Page() {
  return <SimulasiMurabahah />;
}
