# 🕌 Al-Hikmah AI — Platform Qur'an & Hadits Berbasis AI

Asisten keislaman cerdas berbasis LLM dengan rujukan otentik Al-Qur'an dan kitab hadits sahih.
Mendukung dua provider AI — **Google Gemini** (cloud) dan **Ollama** (lokal/offline) — yang bisa diganti
langsung dari UI tanpa restart server.

![Status](https://img.shields.io/badge/status-aktif-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-Next.js_16-black)
![Backend](https://img.shields.io/badge/backend-FastAPI-009688)

---

## ✨ Fitur

### 💬 Chat AI Keislaman (`/`)
- Streaming jawaban token-by-token (SSE) dengan render Markdown + GFM
- **Multi-session**: banyak riwayat percakapan, judul otomatis, hapus per sesi
- **Export**: salin seluruh percakapan / unduh sebagai `.md`
- **Input suara** (Web Speech API, Bahasa Indonesia) + textarea auto-resize
- **Pilih model AI** (Ollama ↔ Gemini) langsung dari badge status
- Feedback 👍/👎 per jawaban + tombol jawab ulang
- Indikator status LLM Online/Offline + localStorage persistence

### 📖 E-Al-Qur'an (`/quran`)
- Pencarian per ayat & baca satu surah penuh, navigasi ayat sebelum/sesudah
- Teks Arab (font Amiri, ukuran A+/A-), transliterasi Latin, terjemahan Indonesia
- 🔊 **Audio murottal** per ayat (Misyari Rasyid) + **tafsir ringkas** on-demand
- Bookmark ayat + halaman daftar bookmark, salin ayat

### 📜 Kitab Hadits (`/hadith`)
- 9 kitab (Bukhari, Muslim, Tirmidzi, Abu Dawud, Nasa'i, Ibnu Majah, Ahmad, Malik, Darimi)
- **Pencarian kata kunci** terjemahan per kitab (dengan info cakupan pindai)
- Navigasi prev/next, Hadits Acak, font Arab A+/A-, bookmark + salin

### 🕌 Ibadah Harian
| Halaman | Keterangan |
|---|---|
| `/jadwal` | Jadwal shalat via GPS (metode **Kemenag RI**), tanggal Hijriah, hitung mundur live |
| `/dzikir` | Tasbih digital 8 dzikir + target + tersimpan lokal |
| `/asmaul` | 99 Asmaul Husna (Arab, Latin, arti) + pencarian |
| `/doa` | 14 doa harian (Arab, Latin, arti, sumber) + salin |
| `/kiblat` | Kompas kiblat live (sensor HP + GPS), derajat & jarak ke Ka'bah |
| `/tajweed` | Panduan tajwid: Ghunnah, Idgham, Mad, Qalqalah, Waqaf |

### ℹ️ Lainnya
Halaman Tentang (profil pembuat + WhatsApp), Bantuan, Privasi, Syarat & Ketentuan,
404 kustom, PWA installable (`manifest.json`), `sitemap.xml` + `robots.txt`, SEO per halaman,
dark mode, responsif penuh (hamburger hingga breakpoint `lg`).

---

## 🏗️ Arsitektur

```
.
├── app/                  # Backend FastAPI
│   ├── main.py           # Endpoint + session manager + rate limiting
│   ├── api/              # Integrasi equran.id & hadis-api-id
│   ├── llm/              # Factory + provider Ollama/Gemini + tools RAG
│   └── models/           # Skema Pydantic (validasi + rate limit request)
├── frontend/             # Next.js 16 (App Router) + Tailwind CSS v4
│   └── src/app/          # 13 halaman: chat, quran, hadith, ibadah (6), info…
├── mobile/               # Aplikasi Android (Kotlin + Jetpack Compose)
├── requirements.txt
└── railway.toml / render.yaml / Dockerfile   # Deploy backend
```

---

## 🚀 Cara Menjalankan

### Sekali perintah (disarankan)

```bash
npm run install:all   # sekali saja: install root + frontend + backend deps
cp .env.example .env  # lalu isi sesuai kebutuhan
# buat frontend/.env.local berisi: NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev           # backend :8000 + frontend :3000 jalan bersamaan
```

- Backend: http://localhost:8000 (docs interaktif: `/docs`)
- Frontend: http://localhost:3000

### Manual (dua terminal, bila perlu)

```bash
# Terminal 1 — backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2 — frontend
cd frontend && npm install && npm run dev
```

Perintah root lain: `npm run dev:backend`, `npm run dev:frontend`, `npm run build`.

### 3. Pilih Otak AI

| Opsi | Cara |
|---|---|
| **Ollama (lokal, gratis)** | Install Ollama → `ollama pull deepseek-r1:8b` → `LLM_PROVIDER=ollama` |
| **Gemini (cloud)** | Isi `GEMINI_API_KEY` di `.env` → `LLM_PROVIDER=gemini`, atau ganti via UI (badge status di halaman chat) |

---

## ⚙️ Environment Variables

**Backend (`.env`)**

| Key | Default | Keterangan |
|---|---|---|
| `LLM_PROVIDER` | `ollama` | `ollama` atau `gemini` |
| `GEMINI_API_KEY` | – | Wajib jika provider `gemini` |
| `GEMINI_MODEL` | `gemini-2.5-flash` | Model Gemini |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Server Ollama |
| `OLLAMA_MODEL` | `deepseek-r1:8b` | Model Ollama |
| `ALLOWED_ORIGINS` | `http://localhost:3000` | CORS (pisahkan koma) |
| `CHAT_RATE_LIMIT` | `30` | Maks request/menit per IP (chat & search) |
| `API_HOST` / `API_PORT` | `0.0.0.0` / `8000` | Bind server |

**Frontend (`frontend/.env.local`)**

| Key | Contoh | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | URL backend FastAPI |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Dipakai sitemap/robots & metadata |

---

## 🔌 Daftar Endpoint Backend

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/health` | Status server + LLM |
| POST | `/api/chat` | Chat non-streaming |
| POST | `/api/chat/stream` | Chat streaming (SSE) |
| GET | `/api/llm/providers` | Daftar provider + yang aktif |
| POST | `/api/llm/provider` | Ganti provider runtime |
| POST | `/api/quran/verse` | Ayat (Arab, Latin, arti, audio) |
| POST | `/api/quran/tafsir` | Tafsir ringkas per ayat |
| GET | `/api/quran/search?q=` | Cari teks terjemahan |
| POST | `/api/hadith` | Hadits per nomor |
| POST | `/api/hadith/search` | Cari keyword per kitab |

Rate limiting (30/menit/IP) berlaku untuk `/api/chat`, `/api/chat/stream`, `/api/hadith/search`.
Session chat disimpan in-memory dengan TTL 30 menit per `session_id`.

**Sumber data eksternal (gratis, tanpa key):** `equran.id` (Qur'an, audio, tafsir),
`hadis-api-id.vercel.app` (9 kitab), `api.aladhan.com` (jadwal shalat metode Kemenag + Hijriah).

---

## 📱 Mobile (Android)

Direktori `mobile/` berisi proyek native Kotlin + Jetpack Compose (Chat, Qur'an, Hadits,
Theme + API service). Status: parsial — integrasi dengan endpoint backend terbaru
(`/api/hadith/search`, `/api/llm/*`) belum disambungkan.

---

## 👨‍💻 Pembuat

**Amirul Justicia** — Full-Stack Developer & AI Enthusiast

- GitHub: https://github.com/AmirulJusticia0507
- WhatsApp: https://wa.me/6282134402383

> AI dapat membuat kekeliruan — selalu tabayyun (verifikasi) dengan ulama terpercaya.
