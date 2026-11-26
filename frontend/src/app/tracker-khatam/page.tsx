import type { Metadata } from 'next';
import TrackerKhatam from '@/components/TrackerKhatam';

export const metadata: Metadata = {
  title: 'Tracker Khatam & Tahfidz Al-Qur\'an — Al-Hikmah AI',
  description: 'Catat progres khatam 30 juz dan muraja\'ah harian Anda dengan penyimpanan otomatis di browser.',
};

export default function Page() {
  return <TrackerKhatam />;
}
