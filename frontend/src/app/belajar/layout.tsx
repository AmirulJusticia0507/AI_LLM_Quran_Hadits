import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pusat Belajar Islam - 30 Modul Interaktif',
  description: 'Pusat Belajar Islam 30 Modul Lengkap: Tazkiyatun Nafs, Aqidah & Eskatologi, Fiqh Ibadah, Ushul Fiqh, Munakahat, Muamalah, Integritas Anti-Korupsi, Komparasi Agama, Sains & Sunnatullah, Pangan Halal, Fiqh Medis, Siroh Nabawiyah, Musthalah Hadits, Peradaban Islam, Parenting Islami, Ulumul Quran, Faraidh & Hukum Waris, Adab & Etika Digital, Tokoh Muslimah Teladan & Fiqh Wanita, Maqashid Syariah & Siyasah Syari’ah, Fitnah Akhir Zaman & Al-Masih Ad-Dajjal, Kisah 25 Nabi & Rasul Allah, Sejarah Islam Nusantara & Walisongo, 10 Sahabat Dijamin Surga, Fiqh Lingkungan & Ekologi Islam, Fiqh Dakwah & Komunikasi Persuasif, Malaikat Jin & Dunia Ghaib, Adab Ikhtilaf & Moderasi Beragama (Islam Wasathiyyah), Ilmu Tajwid, dan Ilmu Balaghah.',
};

export default function BelajarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
