# Bazaarlink

Backend mendukung API chat completions kompatibel OpenAI melalui HTTPX yang sudah ada di requirements. Tidak perlu SDK tambahan.

Isi `.env` backend:

```dotenv
LLM_PROVIDER=bazaarlink
BAZAARLINK_BASE_URL=https://api.bazaarlink.ai/v1
BAZAARLINK_API_KEY=isi_key_anda
BAZAARLINK_MODEL=qwen/qwen3.7-flash:free
```

Restart backend setelah mengganti konfigurasi. Pilihan Bazaarlink juga tersedia pada pemilih provider di Chat AI. Penggantian provider melalui UI berlaku selama proses berjalan; `.env` menentukan provider saat restart.

Nama model harus cocok dengan ID pada endpoint `GET /v1/models`. Autentikasi menggunakan `Authorization: Bearer ...` hanya dari backend. Jangan menaruh key dalam `NEXT_PUBLIC_*`. `.env` dan virtual environment diabaikan Git.

Implementasi mendukung streaming SSE, chat biasa, riwayat sesi (20 pesan terakhir, TTL 30 menit), serta pemanggilan rujukan Qur'an/hadits. Argumen tool divalidasi sebelum API dipanggil; siklus dibatasi 5 putaran. Model yang dipilih harus mendukung tool calling. Kesalahan upstream disajikan tanpa body respons atau kredensial.

Uji regresi tanpa panggilan berbayar:

```powershell
.venv/Scripts/python.exe -m unittest discover -s tests -v
```

Materi Pusat Belajar bersifat statis dan tidak bergantung pada pemilihan model ini.
