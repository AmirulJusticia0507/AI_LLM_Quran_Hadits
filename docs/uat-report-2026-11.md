# Laporan QA — UAT Production (alhikmah-ai.vercel.app)

Pengujian black-box terhadap deployment production <https://alhikmah-ai.vercel.app/> menggunakan Playwright (Chromium 145). Fokus awal adalah fitur chatbot AI, namun karena backend tidak aktif, pengujian dilanjutkan ke seluruh fitur yang berjalan mandiri di sisi klien.

**Tanggal pengujian:** 2 November 2026
**Metode:** browser automation, 1 sesi headless per skenario, tanpa akun khusus

## Ringkasan hasil

| Area | Hasil |
| --- | --- |
| Homepage, navigasi, layout | Lulus |
| Al-Qur'an (cari surah, buka ayat, tafsir) | Lulus |
| Hadits | Lulus |
| Asmaul Husna, Doa Harian, Dzikir | Lulus |
| Jadwal Shalat, Arah Kiblat | Lulus |
| Pusat Belajar, halaman statis | Lulus |
| **Chatbot AI** | **Tidak dapat diuji — backend tidak terjangkau** |

Seluruh fitur konten dan navigasi berfungsi. Satu-satunya kegagalan fungsional berasal dari konfigurasi URL backend pada frontend, bukan dari data atau tampilan.

## Temuan

### K-01 (Tinggi) — URL backend di-hardcode ke `localhost:8000` pada dua halaman client

**Lokasi:**

- `frontend/src/app/page.tsx:33`
- `frontend/src/app/quran/page.tsx:41`

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
```

Kedua file memakai direktif `"use client"`, sehingga nilai `API_URL` ikut masuk ke bundle JavaScript dan dieksekusi **di browser pengunjung**, bukan di server. Bila `NEXT_PUBLIC_API_URL` tidak didefinisikan, seluruh request diarahkan ke `http://localhost:8000`, yaitu komputer pengunjung sendiri.

**Request yang gagal saat UAT:**

| Metode | URL | Hasil |
| --- | --- | --- |
| GET | `http://localhost:8000/api/health` | `ERR_CONNECTION_REFUSED` |
| GET | `http://localhost:8000/api/llm/providers` | `ERR_CONNECTION_REFUSED` |
| POST | `http://localhost:8000/api/chat/stream` | `ERR_CONNECTION_REFUSED` |
| POST | `http://localhost:8000/api/quran/asbabun-nuzul` | `ERR_CONNECTION_REFUSED` |
| POST | `http://localhost:8000/api/quran/tafsir` | `ERR_CONNECTION_REFUSED` |

**Dampak pada pengguna:**

1. Klik **Kirim** pada chat memunculkan dialog **"Gagal Mengirim — Failed to fetch"** dalam ±3 detik. Tidak ada jawaban AI.
2. Halaman menampilkan badge **Offline** secara permanen.
3. Asbabun Nuzul menampilkan "Asbabun nuzul belum dapat dimuat".
4. Tombol **Kirim** sempat berstatus `disabled`; kontrol ini perlu dipastikan memberi alasan yang jelas (backend tidak tersedia versus input kosong), agar pengguna tidak mengira aplikasi membeku.

**Catatan penting:** kegagalan ini **tidak hanya terjadi ketika langganan backend berhenti**. Selama `NEXT_PUBLIC_API_URL` belum diatur di environment Vercel, situs akan selalu memanggil `localhost:8000` di setiap browser pengunjung — termasuk bila backend di Railway dalam keadaan hidup. Ini adalah bug konfigurasi yang berdiri sendiri.

**Penyebab:** beberapa route sudah benar memakai variabel **server-side** `BACKEND_URL` lewat proxy (`app/api/**/route.ts` dengan `.replace(/\/$/, "")`), tetapi dua halaman di atas melewati proxy dan memakai variabel publik secara langsung. Konfigurasi menjadi tidak seragam.

**Perbaikan yang disarankan:**

1. **Prioritas:** hilangkan fallback `localhost` di kode client, dan jangan memanggil backend langsung dari browser. Arahkan ke route proxy same-origin yang sudah ada, misalnya `/api/chat/stream`, dengan `BACKEND_URL` dibaca di server. Konsisten dengan pola `app/api/**/route.ts` yang sudah berjalan.
2. Jika memang perlu akses langsung dari client, wajib mengisi `NEXT_PUBLIC_API_URL` di environment Vercel (Production **dan** Preview), misalnya `https://<backend-railway>.up.railway.app`. Fallback `localhost` tidak boleh ada di build production.
3. Tambahkan pengecekan saat build atau startup yang gagal bila `BACKEND_URL` kosong pada `NODE_ENV=production`.
4. Dokumentasikan variabel ini pada README/deployment, karena `docs/vps-deployment.md` belum menyebut `NEXT_PUBLIC_API_URL` untuk Vercel.

### K-02 (Sedang) — Halaman bergantung pada polling ke backend, UI membeku saat backend mati

Karena `api/health` dipanggil berulang ke host yang menolak koneksi, status navigasi dokumen tidak pernah selesai. Pada automation ini muncul sebagai `waiting for navigation to finish`, dengan durasi halaman bervariasi **7–86 detik**. Pengguna browser sungguhan akan merasakan jeda serupa pada pemuatan awal.

**Perbaikan yang disarankan:** beri batas waktu (misalnya 3–5 detik) pada health-check, hentikan polling setelah beberapa kegagalan berurutan, dan tampilkan status offline yang tenang tanpa mengulang request terus-menerus.

### K-03 (Rendah) — `POST /api/visits` mengembalikan 503

Statistik kunjungan gagal dimuat di footer ("Statistik kunjungan belum tersedia"). Perlu diperiksa koneksi `DATABASE_URL` (Neon) atau penanganan error pada route tersebut. Bila database tidak tersedia, sebaiknya endpoint mengembalikan respons kosong yang valid agar tidak memicu error konsol.

### K-04 (Rendah) — Hydration error React #418 pada homepage

Muncul `Minified React error #418` (text content mismatch antara hasil render server dan klien) pada pemuatan homepage. Paling sering disebabkan perbedaan waktu/zona waktu atau konten acak saat render awal. Disarankan memindahkan nilai dinamis tersebut ke `useEffect`, atau memakai `suppressHydrationWarning` secara terarah.

### K-05 (Rendah) — Request data Al-Qur'an ter-`ABORTED` di `/hadith`

Beberapa permintaan `/quran-data/surah/069.json` berakhir `net::ERR_ABORTED`. Kemungkinan besar efek samping K-02 (navigasi yang tidak selesai membatalkan request lain). Perlu diverifikasi ulang setelah K-01 dan K-02 diperbaiki; bila masih terjadi, periksa mekanisme prefetch/pembatalan surah.

## Catatan pengujian

- Chatbot tidak dievaluasi lebih jauh karena backend tidak tersedia. Setelah `BACKEND_URL`/`NEXT_PUBLIC_API_URL` benar, perlu dilakukan pengujian ulang untuk skenario normal, riwayat chat, pemilihan provider, dan fallback ketika provider gagal.
- Assertion tekstual pada automation sebaiknya tidak memakai elemen `body`, karena isi `<script>` Next.js ikut terbaca dan membuat log tidak terpakai. Gunakan selektor spesifik (`h1`, `main`, `[data-testid]`).
- Beberapa halaman memerlukan waktu render > 10 detik saat backend mati. Batas waktu 20–60 detik layak dipakai untuk UAT pada kondisi ini, dan diturunkan kembali setelah K-01/K-02 selesai.

## Urutan prioritas perbaikan

1. **K-01** — hapus fallback `localhost:8000` pada build production, arahkan lewat proxy server-side.
2. **K-02** — batasi health-check agar UI tidak menggantung.
3. **K-03**, **K-04**, **K-05** — perbaikan kecil kualitas.
