import type { Metadata } from 'next';
import KalkulatorWaris from '@/components/KalkulatorWaris';

export const metadata: Metadata = {
  title: 'Kalkulator Waris (Faraidh) — Al-Hikmah AI',
  description: 'Hitung pembagian harta waris Islam (faraidh) secara otomatis sesuai Al-Qur\'an dan mazhab Syafi\'i.',
};

export default function Page() {
  return <KalkulatorWaris />;
}
