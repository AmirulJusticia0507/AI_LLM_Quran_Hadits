# Modul pembelajaran Al-Hikmah

## Analisis dan implementasi

Web menggunakan Next.js App Router, React, dan Tailwind; FastAPI melayani percakapan AI dan pencarian Qur'an/hadits. Sebelumnya tajwid mempunyai 20 kaidah dengan pencarian dan filter, tetapi belum menyediakan makhraj. Tiga disiplin lainnya belum mempunyai halaman khusus.

Materi belajar dibuat sebagai data TypeScript terstruktur, tanpa ketergantungan layanan LLM. Halaman server menyediakan metadata; komponen klien menangani pencarian, kategori, detail, dan progres. Tidak ada perubahan API atau aplikasi Android.

| URL | Cakupan |
| --- | --- |
| `/belajar` | Pintu masuk empat modul |
| `/tazkiyah` | 10 materi: niat, taubat, muhasabah, akhlak hati, amal harian |
| `/fiqh` | 12 materi dasar bersuci, shalat, puasa, zakat, haji, jenazah |
| `/sirah` | 14 tahap kronologis, dari masa kecil hingga wafat |
| `/tajweed` | 20 kaidah lama + 17 makhraj dalam 5 wilayah, seluruh huruf hijaiyah |

Menu Belajar dan footer mengarah ke modul. Semua halaman masuk sitemap. Tampilan mengikuti dark mode dan susunan responsif aplikasi.

## Penyimpanan progres

Kunci `alhikmah-learning-v1-{course.id}` menyimpan array ID materi di localStorage. Status dapat dibatalkan melalui kotak centang. Perubahan disinkronkan antar-tab; nilai JSON rusak dan ID asing diabaikan. Kegagalan menulis penyimpanan ditampilkan kepada pengguna. Progres hanya menunjukkan selesai membaca, bukan penilaian ibadah atau kompetensi.

## Pemeliharaan materi

- `frontend/src/data/learning.ts`: tiga modul, materi, praktik, dan rujukan per topik. Gunakan ID stabil agar progres tetap berlaku.
- `frontend/src/data/makhraj.ts`: tempat artikulasi, huruf, nama Latin untuk pencarian, dan latihan.
- `LearningCourse.tsx`: pembaca materi bersama.
- `MakhrajGuide.tsx`: pencarian huruf dengan normalisasi harakat dan filter wilayah.

Materi merupakan pengantar, bukan ensiklopedia fiqih atau siroh yang menyeluruh. Rincian fiqih mengikuti Syafi'i sebagaimana keterangan pada halaman. Rujukan Qur'an dan hadits ditampilkan sebagai landasan; tidak semua tanggal sejarah maupun rincian mazhab terkandung pada satu dalil tersebut. Materi perlu penelaahan pengajar sebelum dikembangkan menjadi kurikulum tingkat lanjut. Pelafalan memerlukan talaqqi; audio diarahkan ke pelajaran guru eksternal, bukan suara sintetis atau penilaian otomatis.

Rujukan tambahan untuk menelaah materi:

- [Rukun wudhu — NU Online](https://islam.nu.or.id/syariah/mengenal-rukun-wudhu-joVg6)
- [Rukun shalat — NU Online](https://islam.nu.or.id/syariah/inilah-rukun-rukun-dalam-shalat-YVccy)
- [Tata cara tayamum — NU Online](https://islam.nu.or.id/amp/syariah/sebab-dan-tata-cara-bertayamum-iVi4h)
- [Rukun haji — NU Online](https://islam.nu.or.id/syariah/6-rukun-haji-yang-tidak-boleh-ditinggalkan-oxLJR)
- [Makhraj dan pelajaran audio — Imam Faisal](https://imamfaisal.com/articulation/)
- [17 titik artikulasi — Qiratul Quran](https://www.qiratulquran.com/17-places-of-articulation/)

## Verifikasi

Jalankan `npm run lint` dan `npm run build` dari `frontend`.

Pemeriksaan browser: buka `/belajar`, masuk setiap modul, cari kata yang ada/tidak ada, gabungkan filter kategori dan belum selesai, tandai materi, muat ulang dan buka tab kedua. Untuk makhraj, coba huruf berharakat (`ضَ`), nama Latin (`dhad`), semua wilayah, serta hasil kosong. Periksa navigasi pada layar kecil dan mode gelap. Jika penyimpanan diblokir, materi tetap dapat dibaca dan kegagalan menyimpan ditampilkan.
