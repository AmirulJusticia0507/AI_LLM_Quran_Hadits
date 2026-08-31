# 📋 Al-Hikmah AI — Feature TODO & Roadmap

> Analisis fitur yang masih kurang berdasarkan kondisi codebase saat ini (Frontend Next.js + Backend FastAPI + Mobile Android).

---

## 🔴 KRITIS — Harus Diselesaikan Dulu

### 🤖 Backend / LLM

- [x] **Konfigurasi LLM aktif** — Chat AI saat ini selalu error *503: LLM belum dikonfigurasi*. Perlu setup `.env` dengan `LLM_PROVIDER=ollama` + pastikan Ollama berjalan, atau switch ke `gemini` dan isi `GEMINI_API_KEY`.
- [x] **History percakapan per-session** — `OllamaLLM.history` tersimpan di memory server (in-memory, per-instance). Jika server restart atau ada multi-user, history akan hilang/tercampur. Perlu session ID per user.
- [x] **CORS dibuka wildcard `*`** — `allow_origins=["*"]` berbahaya untuk produksi. Perlu dibatasi ke domain frontend saja.
- [x] **Validasi input** — Tidak ada sanitasi input `ChatRequest.message`. Perlu max length, filter karakter berbahaya, dan rate limiting.

---

## 🟠 PENTING — Fitur Inti yang Belum Ada

### 💬 Halaman Chat AI (`/`)

- [ ] **Streaming response** — Jawaban AI muncul sekaligus (bukan token-by-token). Perlu Server-Sent Events (SSE) atau WebSocket untuk efek *typing stream* yang natural.
- [ ] **Persistensi riwayat chat** — Riwayat percakapan hilang saat halaman di-refresh. Perlu simpan ke `localStorage` atau database.
- [x] **Indikator status LLM** — Tidak ada badge/notifikasi ketika backend offline atau LLM belum dikonfigurasi. User bingung kenapa tidak bisa chat.
- [ ] **Markdown rendering** — Jawaban AI mengandung `**bold**`, heading, list, kode — tapi di-render sebagai plain text. Perlu library seperti `react-markdown` + `remark-gfm`.
- [ ] **Salin pesan User** — Tombol salin hanya ada di bubble AI, tidak ada di bubble User.
- [ ] **Scroll to top button** — Tidak ada navigasi saat history chat panjang.

### 📖 Halaman Al-Qur'an (`/quran`)

- [ ] **Fitur baca per-surah** — Saat ini hanya bisa cari per-ayat satu per satu. Belum ada tampilan baca surah secara berurutan (scroll semua ayat dalam satu surah).
- [ ] **Pencarian teks terjemahan** — `GET /api/quran/search` sudah ada di backend tapi **tidak dipakai** di frontend sama sekali.
- [ ] **Audio murottal** — Tidak ada fitur putar tilawah audio ayat (tersedia di API seperti Quran.com).
- [ ] **Navigasi ayat sebelum/sesudah** — Setelah tampil, tidak ada tombol "Ayat Sebelumnya / Selanjutnya".
- [ ] **Halaman bookmark** — Bookmark disimpan ke `localStorage` tapi tidak ada halaman/tab untuk melihat semua bookmark yang tersimpan.
- [ ] **Mode baca malam** — Background khusus untuk mode baca malam (lebih redup dari dark mode biasa).
- [ ] **Tafsir ringkas** — Integrasi endpoint tafsir (tersedia di equran.id API).

### 📜 Halaman Hadits (`/hadith`)

- [ ] **Pencarian hadits by keyword** — Saat ini hanya bisa cari per-nomor. Tidak ada fitur pencarian berdasarkan kata kunci terjemahan/matan.
- [ ] **Navigasi hadits sebelum/sesudah** — Tidak ada tombol prev/next hadits.
- [ ] **Halaman bookmark hadits** — Sama seperti Al-Qur'an, bookmark tersimpan tapi tidak bisa dilihat semua.
- [ ] **Filter hadits shahih** — Tidak ada filter kualitas (shahih/hasan/dhaif).
- [ ] **Sanad / perawi chain** — Tidak ditampilkan rantai perawi hadits.

---

## 🟡 MENENGAH — UX & Pengalaman Pengguna

### 🎨 UI / UX Umum

- [ ] **Halaman Beranda / Landing Page** — Tidak ada halaman selamat datang yang menjelaskan fitur aplikasi. Langsung masuk ke chat.
- [ ] **Halaman 404 custom** — Belum ada tampilan `not-found.tsx` yang bertemakan Al-Hikmah AI.
- [ ] **Loading skeleton** — Saat fetch data, hanya ada spinner sederhana. Perlu skeleton card yang lebih halus (seperti Facebook loading).
- [ ] **Toast notification** — SweetAlert2 digunakan tapi berat. Beberapa notifikasi minor lebih cocok pakai toast ringan.
- [ ] **Responsive mobile** — Beberapa elemen (grid kitab hadits, ayat counter) perlu review ulang di layar < 380px.
- [ ] **Aksesibilitas (a11y)** — Kurang label `aria-*` pada beberapa elemen interaktif, kurang keyboard navigation.
- [ ] **PWA (Progressive Web App)** — Belum ada `manifest.json`, service worker, atau kemampuan install ke home screen.

### 🔍 SEO & Metadata

- [ ] **Metadata dinamis per halaman** — `quran/page.tsx` dan `hadith/page.tsx` tidak punya `export const metadata`. SEO tidak optimal.
- [ ] **Open Graph / Twitter Card** — Tidak ada meta tag OG untuk share ke sosmed.
- [ ] **sitemap.xml & robots.txt** — Belum ada untuk crawl mesin pencari.

---

## 🟢 TAMBAHAN — Fitur Lanjutan

### 🔐 Autentikasi & Personalisasi

- [ ] **Sistem login pengguna** — Tidak ada autentikasi sama sekali. Tanpa ini, bookmark, history, dan preferensi tidak bisa disinkron antar device.
- [ ] **Profil pengguna** — Tidak ada halaman profil/preferensi user.
- [ ] **Cloud bookmark sync** — Saat ini bookmark hanya di `localStorage`. Perlu backend storage (database) jika ingin persist & sync.

### 🔔 Fitur Islami Tambahan

- [ ] **Jadwal Shalat** — Integrasi API jadwal shalat berdasarkan lokasi GPS user.
- [ ] **Kalender Hijriah** — Widget konversi tanggal Masehi ↔ Hijriah.
- [ ] **Asmaul Husna** — Halaman 99 nama Allah dengan terjemahan dan audio bacaan.
- [ ] **Doa Harian** — Koleksi doa sehari-hari (doa makan, tidur, bepergian, dsb).
- [ ] **Dzikir Counter** — Tasbih digital dengan counter.
- [ ] **Qiblat Finder** — Kompas arah kiblat berbasis GPS.
- [ ] **Notifikasi waktu shalat** — Push notification pengingat adzan (khusus PWA/mobile).

### 🤖 AI / LLM Lanjutan

- [ ] **Multi-provider LLM** — Sudah ada `ollama.py` dan `gemini.py`, tapi belum ada UI untuk pilih model/provider.
- [ ] **RAG (Retrieval-Augmented Generation)** — Saat ini tool calling manual. Perlu vector database (ChromaDB/Pinecone) untuk pencarian semantik hadits & ayat yang lebih akurat.
- [ ] **Feedback jawaban AI** — Tidak ada tombol 👍/👎 untuk rating kualitas jawaban AI. Penting untuk fine-tuning.
- [ ] **Deteksi bahasa otomatis** — AI hanya menjawab Bahasa Indonesia. Perlu deteksi bahasa user (Arab, Inggris, Melayu).

### 📱 Mobile App (`/mobile`)

- [ ] **Integrasi API lengkap** — Direktori `mobile/` ada tapi belum diperiksa status integrasinya dengan backend terbaru.
- [ ] **Offline mode** — Tidak ada caching data untuk dipakai offline.
- [ ] **Push notification** — Pengingat jadwal shalat, notifikasi harian.

---

## 🔧 TEKNIS & DEVOPS

- [ ] **Rate limiting backend** — Endpoint `/api/chat` tidak ada rate limiting. Rentan abuse.
- [ ] **API key management** — Tidak ada sistem rotasi atau manajemen API key yang aman.
- [ ] **Logging & monitoring** — Tidak ada logging ke file/service (misal: Sentry, Loguru).
- [ ] **Unit test & integration test** — Tidak ada test file sama sekali (backend maupun frontend).
- [ ] **Docker Compose** — Perlu `docker-compose.yml` untuk orkestrasi frontend + backend + Ollama.
- [x] **Environment validation** — Tidak ada validasi `.env` saat startup (misal: pakai `pydantic-settings`).
- [ ] **API versioning** — Semua endpoint `/api/...` tanpa versioning. Perlu prefix `/api/v1/`.
- [ ] **Error boundary React** — Tidak ada `error.tsx` untuk tangkap runtime error di frontend.

---

## 📊 Ringkasan Progress

| Kategori | Selesai | Kurang |
|---|---|---|
| UI/Tampilan Modern | ✅ | Dark mode, animasi, responsive |
| Halaman Chat AI | ✅ Dasar | Streaming, markdown, persistensi |
| Halaman Al-Qur'an | ✅ Dasar | Baca per-surah, audio, search text |
| Halaman Hadits | ✅ Dasar | Cari keyword, nav prev/next |
| Backend LLM | ✅ Aktif | Session management selesai |
| Autentikasi | ❌ | Belum ada sama sekali |
| Fitur Islami Tambahan | ❌ | Jadwal shalat, dzikir, qiblat |
| Mobile App | ⚠️ Parsial | Cek integrasi backend terbaru |
| Testing & DevOps | ❌ | Belum ada test, Docker |

---

> 💡 **Saran prioritas pengerjaan:**
> 1. ~~Aktifkan LLM (Ollama/Gemini)~~ ✅
> 2. Tambahkan markdown rendering di chat → Jawaban AI terbaca rapi  
> 3. Baca per-surah di Al-Qur'an → Fitur paling dibutuhkan user
> 4. Pencarian keyword hadits → Navigasi lebih mudah
> 5. PWA manifest → Bisa diinstall di HP

---

## ✅ Changelog — Item yang Sudah Diselesaikan

### v1.1.0 (2026-08-31)

**Backend:**
- [x] Fix `.env` — hapus duplicate `LLM_PROVIDER`, tambah `ALLOWED_ORIGINS`
- [x] Session history per-user — `SessionManager` dengan TTL 30 menit
- [x] CORS restriction — baca `ALLOWED_ORIGINS` dari `.env`
- [x] Input validation — `ChatRequest.message` max 2000 karakter
- [x] Health check endpoint — `GET /api/health`
- [x] API key validation — `factory.py` cek `GEMINI_API_KEY`
- [x] Gemini safety settings — `BLOCK_NONE` agar tidak diblokir
- [x] Model update — `gemini-1.5-flash` → `gemini-2.5-flash`

**Frontend:**
- [x] Session ID — auto-generate UUID, disimpan di `localStorage`
- [x] LLM status indicator — badge Online/Offline
- [x] Error handling 503 — pesan spesifik jika LLM belum dikonfigurasi
- [x] Clear chat — generate session ID baru setelah hapus riwayat
