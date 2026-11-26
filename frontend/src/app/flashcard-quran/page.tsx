import type { Metadata } from 'next';
import FlashcardQuran from '@/components/FlashcardQuran';

export const metadata: Metadata = {
  title: 'Flashcard Kosakata Al-Qur\'an — Al-Hikmah AI',
  description: 'Latih hafalan kosakata yang paling sering muncul dalam Al-Qur\'an beserta artinya secara interaktif.',
};

export default function Page() {
  return <FlashcardQuran />;
}
