# Dokumentasi Sistem AI LLM Integration: Al-Qur'an & Hadits API

**Al-Hikmah AI** — Asisten Keislaman berbasis AI yang mengintegrasikan Large Language Model (LLM) dengan **API Al-Qur'an Digital** dan **API Hadits Rasulullah SAW** menggunakan arsitektur Retrieval-Augmented Generation (RAG) / Tool Calling.

---

## 1. Arsitektur Sistem

Sistem menggunakan alur **LLM Function Calling / Tool Use** agar LLM dapat melakukan validasi rujukan ayat atau hadits secara akurat sebelum memberikan jawaban.

```
                    +-------------------+
                    |    User / Client  |
                    +-------------------+
                    |         |         |
          +---------+    +----+----+    +----------+
          | Browser  |   | Mobile  |    | Streamlit|
          |(Next.js) |   | (Kotlin)|    | (Python) |
          +----------+   +---------+    +----------+
               |              |              |
               +------+-------+------+-------+
                      |              |
                      v              v
              +-----------------------------+
              |    FastAPI Backend (:8000)  |
              |  POST /api/chat            |
              |  POST /api/quran/verse     |
              |  GET  /api/quran/search    |
              |  POST /api/hadith          |
              +-----------------------------+
                      |              |
               +------+              +------+
               v                             v
     +-------------------+      +---------------------+
     |   LLM Provider    |      |  External APIs      |
     |  - Gemini (cloud) |      |  - equran.id API    |
     |  - Ollama (local) |      |  - hadis-api-id     |
     +-------------------+      +---------------------+
```

**Stack:**

| Layer | Teknologi |
|-------|-----------|
| Backend | Python 3.x, FastAPI 0.115, uvicorn, httpx (async), Pydantic 2.9 |
| LLM | Google Gemini (`gemini-2.5-flash`) / Ollama (`deepseek-r1:8b`) |
| Web Frontend | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4 |
| Mobile | Kotlin 2.0, Jetpack Compose (Material3), Retrofit 2.11 |
| Streamlit | Python Streamlit (quick UI alternative) |

---

## 2. API Endpoint Rujukan

### A. Al-Qur'an Digital API

- **Provider:** EQuran.id API v2
- **Base URL:** `https://equran.id/api/v2`
- **Endpoint:**
  - `GET /surat/{surah}` — Ambil seluruh ayat dalam surah (termasuk teks Arab, Latin, terjemahan Indonesia)
  - `GET /surat/{surah}?ayat={ayat}` — Ambil ayat spesifik

### B. Hadits API

- **Provider:** Hadith API (hadis-api-id.vercel.app)
- **Base URL:** `https://hadis-api-id.vercel.app`
- **Endpoint:**
  - `GET /hadith/{kitab}/{nomor}` — Ambil hadits spesifik
- **Kitab yang didukung (11 kitab):**
  - `bukhari`, `muslim`, `tirmidzi`, `abu-dawud`, `nasai`, `ibnu-majah`
  - `ahmad`, `malik`, `darimi`, `nasai-4`, `nasai-5`

### C. Backend API (FastAPI)

| Endpoint | Method | Body / Query | Fungsi |
|----------|--------|--------------|--------|
| `/` | GET | — | Health check |
| `/api/health` | GET | — | Status LLM (configured/not) |
| `/api/chat` | POST | `{ "message": "...", "session_id": "..." }` | Chat dengan LLM (tool calling) |
| `/api/quran/verse` | POST | `{ "surah": 2, "ayat": 255 }` | Ambil ayat spesifik |
| `/api/quran/search` | GET | `?q=sabar` | Pencarian kata kunci ayat |
| `/api/hadith` | POST | `{ "kitab": "bukhari", "nomor": 1 }` | Ambil hadits spesifik |

### Chat Request Schema
```json
{
  "message": "Apa keutamaan Surah Al-Kahfi?",
  "session_id": "auto-generated-uuid"
}
```

### Chat Response Schema
```json
{
  "status": "success",
  "response": "Wa'alaikumussalam Wr. Wb. Berikut keutamaan...",
  "session_id": "same-uuid"
}
```

### Health Response Schema
```json
{
  "status": "ok",
  "llm_configured": true,
  "llm_provider": "gemini"
}
```

---

## 3. Skema Tool Calling (JSON Schema untuk LLM)

Berikut adalah definisi tool/fungsi yang dideklarasikan ke LLM:

```json
[
  {
    "name": "get_quran_verse",
    "description": "Mengambil teks Arab, Latin, dan terjemahan Bahasa Indonesia dari ayat Al-Qur'an berdasarkan nomor Surah dan Ayat.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "surah": {
          "type": "INTEGER",
          "description": "Nomor surah dalam Al-Qur'an (1 - 114)"
        },
        "ayat": {
          "type": "INTEGER",
          "description": "Nomor ayat dalam surah tersebut"
        }
      },
      "required": ["surah", "ayat"]
    }
  },
  {
    "name": "get_hadith",
    "description": "Mengambil matan Arab dan terjemahan hadits berdasarkan perawi dan nomor hadits.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "kitab": {
          "type": "STRING",
          "description": "Nama perawi/kitab hadits",
          "enum": ["bukhari", "muslim", "tirmidzi", "abu-dawud", "nasai", "ibnu-majah"]
        },
        "nomor": {
          "type": "INTEGER",
          "description": "Nomor urut hadits dalam kitab tersebut"
        }
      },
      "required": ["kitab", "nomor"]
    }
  }
]
```

---

## 4. System Prompt untuk LLM

```
Anda adalah Asisten Keislaman berbasis AI yang cerdas, santun, dan taat pada prinsip kebenaran ilmiah keislaman.

TUGAS UTAMA:
1. Memberikan jawaban berbasis Al-Qur'an dan Hadits Shahih.
2. Jika pengguna meminta rujukan ayat atau hadits tertentu, Anda WAJIB memanggil tool/fungsi get_quran_verse atau get_hadith untuk mengambil teks asli.
3. DILARANG keras memanipulasi, merubah, atau mengarang terjemahan dan lafaz Arab Al-Qur'an maupun Hadits.
4. Tampilkan teks Arab, teks Latin (opsional), terjemahan Bahasa Indonesia, serta cantumkan nomor Surah/Ayat atau Riwayat Hadits secara jelas.

GAYA BAHASA:
- Awali dengan salam islami (Assalamu'alaikum Wr. Wb.).
- Bahasa Indonesia yang formal, santun, dan murni.
```

---

## 5. Struktur Proyek

```
AI_LLM_Qur'an_Hadits/
├── .env                          # Konfigurasi environment (aktif: gemini)
├── .env.example                  # Template environment (default: ollama)
├── requirements.txt              # Dependensi Python backend
├── Sistem_AI_LLM_Quran_Hadits.md # Dokumentasi ini
│
├── app/                          # Backend FastAPI
│   ├── main.py                   # Entry point FastAPI (5 endpoints)
│   ├── models/
│   │   └── schemas.py            # Pydantic request models
│   ├── api/
│   │   ├── quran.py              # Integrasi EQuran.id API
│   │   └── hadith.py             # Integrasi Hadits API
│   ├── llm/
│   │   ├── factory.py            # Factory pattern LLM provider
│   │   ├── gemini.py             # Google Gemini + tool calling
│   │   ├── ollama.py             # Ollama local LLM
│   │   └── tools.py              # Tool definitions (JSON Schema)
│   └── frontend/
│       └── streamlit_app.py      # Streamlit UI (alternatif)
│
├── frontend/                     # Web App (Next.js 16)
│   ├── package.json
│   ├── .env.local                # NEXT_PUBLIC_API_URL=http://localhost:8000
│   └── src/
│       ├── app/
│       │   ├── layout.tsx        # Root layout + Navbar + Footer
│       │   ├── page.tsx          # Chat AI page (home)
│       │   ├── globals.css       # Global styles, dark mode, glassmorphism
│       │   ├── quran/page.tsx    # Quran search page
│       │   └── hadith/page.tsx   # Hadith search page
│       └── components/
│           ├── Navbar.tsx         # Navigasi + dark/light toggle
│           └── Footer.tsx         # Footer
│
└── mobile/                       # Android App (Kotlin + Jetpack Compose)
    ├── build.gradle.kts
    └── app/src/main/java/com/islamicai/app/
        ├── MainActivity.kt       # Entry point, 3-tab bottom nav
        ├── data/
        │   ├── Models.kt         # Data classes (mirrors backend API)
        │   ├── ApiClient.kt      # Retrofit API client
        │   └── IslamicData.kt    # Static data (114 surah, 6 kitab)
        └── ui/
            ├── screens/
            │   ├── ChatScreen.kt
            │   ├── QuranScreen.kt
            │   └── HadithScreen.kt
            └── theme/
                ├── Color.kt
                └── Theme.kt
```

---

## 6. Konfigurasi LLM Provider

Pilih provider LLM melalui variabel `LLM_PROVIDER` di file `.env`:

| Provider | `LLM_PROVIDER` | Model | Lokasi |
|----------|----------------|-------|--------|
| Google Gemini | `gemini` | `gemini-2.5-flash` | Cloud |
| Ollama (Local) | `ollama` | `deepseek-r1:8b` | `localhost:11434` |

**Cara beralih:** Edit `.env` → ubah `LLM_PROVIDER=gemini` menjadi `LLM_PROVIDER=ollama`.

---

## 7. Fitur Frontend (Next.js)

### Chat AI (`/`)
- Interface chat dengan bubble messages (user/assistant)
- Welcome screen dengan 4 suggested prompts:
  - Keutamaan Surah Al-Kahfi (Quran)
  - Hadits Menjaga Lisan (Hadits)
  - Tafsir Ringkas Ayat Kursi (Tafsir)
  - Adab Shalat Tahajud (Fiqih)
- Copy-to-clipboard, loading animation, clear chat dengan konfirmasi

### Al-Qur'an (`/quran`)
- Daftar lengkap **114 Surah** dengan jumlah ayat
- Quick-access bar surah populer (Al-Fatihah, Al-Kahfi, Ya Sin, dll)
- Pencarian surah dengan filter nama/nomor
- Tampilan: teks Arab (font size adjustable A-/A+), Latin, terjemahan Indonesia
- **Bookmark** (localStorage) untuk ayat favorit
- Copy ayat

### Hadits (`/hadith`)
- Grid selector **9 kitab hadits** (Kutubut Tis'ah) dengan tag kategori
- **Hadits Acak** (random hadith) button
- Input nomor hadits dengan stepper (+/-)
- Tampilan: teks Arab (font size adjustable), terjemahan Indonesia
- **Bookmark** (localStorage) untuk hadits favorit
- Copy hadits

### UI/UX
- **Dark/Light mode** dengan deteksi system preference + localStorage persistence
- **Glassmorphism** design dengan backdrop blur
- Color scheme: emerald/teal gradient
- Animasi: fade-in, slide-in, bounce
- Font: Plus Jakarta Sans (UI) + Amiri (Arabic calligraphy)
- Responsive (mobile-first)

---

## 8. Fitur Mobile (Kotlin + Jetpack Compose)

- **3-tab bottom navigation:** Chat AI, Al-Qur'an, Hadits
- Chat screen: message bubbles, loading indicator, auto-scroll
- Quran picker dialog: 114 surah dengan search
- Hadith picker dialog: 6 kitab utama
- Tampilan teks Arab: 24sp, right-aligned
- Retrofit API client (指向 `http://10.0.2.2:8000` untuk Android emulator)

---

## 9. Alur Kerja Integrasi LLM (Execution Flow)

1. **User Input:** *"Berikan saya ayat tentang keutamaan sabar di Surah Al-Baqarah ayat 153."*
2. **LLM Evaluation:** LLM mengenali kebutuhan data eksternal dan memicu tool calling:
   `get_quran_verse(surah=2, ayat=153)`
3. **Backend Action:** Backend Python mengeksekusi fungsi API (equran.id) dan mengembalikan JSON.
4. **Final Response Generation:** LLM menyusun balasan akhir yang rapi dan kontekstual kepada user berdasarkan payload JSON yang didapat.

---

## 10. Quick Start

### Backend
```bash
# Install dependensi
pip install -r requirements.txt

# Konfigurasi .env
# LLM_PROVIDER=gemini  (atau ollama)
# GEMINI_API_KEY=your_key_here

# Jalankan server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Buka http://localhost:3000
```

### Streamlit (Alternatif)
```bash
streamlit run app/frontend/streamlit_app.py
```

### Android
Buka project `mobile/` di Android Studio → Run on emulator/device.

---

## 11. Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `LLM_PROVIDER` | Pilihan LLM: `gemini` atau `ollama` | `ollama` |
| `GEMINI_API_KEY` | API key Google Gemini | — |
| `GEMINI_MODEL` | Model Gemini | `gemini-2.5-flash` |
| `OLLAMA_MODEL` | Model Ollama | `deepseek-r1:8b` |
| `OLLAMA_BASE_URL` | URL Ollama server | `http://localhost:11434` |
| `ALLOWED_ORIGINS` | Domain yang diizinkan CORS (comma-separated) | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | URL backend untuk frontend | `http://localhost:8000` |

---

## 12. Changelog

### v1.1.0 (2026-08-31)

**Backend:**
- [x] Fix `.env` — hapus duplicate `LLM_PROVIDER`, tambah `ALLOWED_ORIGINS`
- [x] **Session history per-user** — `SessionManager` dengan TTL 30 menit, history tidak tercampur antar user
- [x] **CORS restriction** — baca `ALLOWED_ORIGINS` dari `.env` (bukan wildcard `*`)
- [x] **Input validation** — `ChatRequest.message` max 2000 karakter, `QuranVerseRequest` ge/le validation
- [x] **Health check endpoint** — `GET /api/health` return status LLM
- [x] **API key validation** — `factory.py` cek `GEMINI_API_KEY` ada sebelum create LLM
- [x] **Gemini safety settings** — `BLOCK_NONE` untuk semua kategori agar tidak diblokir
- [x] **Model update** — `gemini-1.5-flash` → `gemini-2.5-flash`

**Frontend:**
- [x] **Session ID** — auto-generate UUID, disimpan di `localStorage`, dikirim ke backend
- [x] **LLM status indicator** — badge Online/Offline/Cekring berdasarkan `/api/health`
- [x] **Error handling 503** — pesan spesifik jika LLM belum dikonfigurasi
- [x] **Clear chat** — generate session ID baru setelah hapus riwayat
