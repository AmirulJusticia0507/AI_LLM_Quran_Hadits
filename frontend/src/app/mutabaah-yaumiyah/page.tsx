import type { Metadata } from 'next';
import MutabaahYaumiyah from '@/components/MutabaahYaumiyah';

export const metadata: Metadata = {
  title: 'Mutaba\'ah Yaumiyah (Checklist Ibadah Harian) — Al-Hikmah AI',
  description: 'Catat dan pantau amalan harian Anda (shalat wajib, rawatib, dhuha, tilawah, dzikir, sedekah) secara praktis.',
};

export default function Page() {
  return <MutabaahYaumiyah />;
}
