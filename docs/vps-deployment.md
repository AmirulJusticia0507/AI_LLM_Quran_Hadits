# Catatan VPS Al-Hikmah dan Lex Integrity

## Keputusan awal

Gunakan development lokal sampai kedua backend stabil. Saat perlu online 24 jam, mulai dengan Biznet Gio NEO Lite 2 GB. Upgrade ke 4 GB hanya berdasarkan penggunaan RAM nyata.

Perkiraan harga per Oktober 2026:

| Paket | Spesifikasi | Bulanan | Tahunan sebelum pajak |
|---|---|---:|---:|
| NEO Lite 2 GB | 1 vCPU, 2 GB RAM, 60 GB SSD | Rp80.000 | Rp960.000 |
| NEO Lite 4 GB | 2 vCPU, 4 GB RAM, 60 GB SSD | Rp139.000 | Rp1.668.000 |

Harga dapat berubah. Periksa harga final, PPN, dan ketentuan perpanjangan sebelum membeli.

## Arsitektur hemat

```text
Vercel
├── Frontend Al-Hikmah
└── Frontend Lex Integrity

VPS
├── Nginx
├── Backend FastAPI Al-Hikmah (1 worker)
└── Backend Node.js Lex Integrity (1 instance)

Neon
└── PostgreSQL kedua proyek
```

- Frontend tetap di Vercel agar build Next.js tidak memakai RAM VPS.
- Setiap proyek memakai database Neon terpisah melalui `DATABASE_URL` pooled.
- Jangan menjalankan container PostgreSQL dari `lex-integrity/docker-compose.yml` di VPS.
- Jangan menjalankan Ollama di VPS 2–4 GB; gunakan GripHub atau Gemini API.
- Rahasia hanya berada di environment backend, bukan variabel `NEXT_PUBLIC_*`.

## Konfigurasi VPS 2 GB

1. Gunakan Ubuntu LTS minimal tanpa desktop dan Nginx sebagai reverse proxy.
2. Buat swap 2 GB untuk menahan lonjakan memori. Swap bukan pengganti RAM.
3. Jalankan FastAPI dengan satu worker dan Lex Integrity dengan satu proses Node.js.
4. Build frontend di Vercel, bukan di VPS.
5. Arahkan subdomain backend, misalnya `api-alhikmah.example.com` dan `api-lex.example.com`.
6. Batasi firewall ke SSH, HTTP, dan HTTPS; gunakan autentikasi SSH key.
7. Aktifkan restart otomatis dan rotasi log agar disk tidak penuh.

## Kapan harus upgrade ke 4 GB

Upgrade jika salah satu kondisi berikut terjadi berulang:

- RAM berada di atas 80% saat trafik normal.
- Proses mati dengan pesan `Out of memory` atau OOM kill.
- Swap terus terpakai dan respons aplikasi melambat.
- Perlu menambah worker, background job, atau service lain.
- Kedua frontend ikut dipindahkan dari Vercel ke VPS.

## Pemeriksaan dan solusi

| Masalah | Periksa | Solusi awal |
|---|---|---|
| Backend tidak dapat terhubung ke Neon | `DATABASE_URL`, SSL, dan log aplikasi | Gunakan URL pooled Neon dengan `sslmode=require`; rotate kredensial yang bocor |
| RAM hampir habis | `free -h` dan `ps aux --sort=-%mem` | Pastikan hanya satu worker/instance, hentikan PostgreSQL lokal, lalu upgrade bila tetap tinggi |
| Proses sering restart | Log service dan `journalctl -k` | Cari OOM/error aplikasi; jangan hanya menaikkan batas restart |
| Disk penuh | `df -h` dan ukuran log | Aktifkan log rotation, bersihkan image/build lama secara terkontrol |
| Streaming chat tersendat | Konfigurasi Nginx | Nonaktifkan proxy buffering untuk endpoint SSE dan naikkan timeout |
| Frontend gagal memanggil API | URL backend, HTTPS, dan CORS | Gunakan domain backend publik dan tambahkan domain Vercel ke `ALLOWED_ORIGINS` |

## Strategi biaya

Mulai dari 2 GB untuk trafik rendah, pantau selama beberapa minggu, lalu upgrade jika metrik menunjukkan kebutuhan. Paket 4 GB lebih nyaman untuk dua backend, tetapi tidak perlu dibayar sebelum kapasitasnya benar-benar dibutuhkan.
