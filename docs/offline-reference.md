# Data rujukan offline (Al-Qur'an, tafsir, hadits)

Backend dapat melayani ayat, tafsir, dan hadits dari database **SQLite lokal**
(`data/reference.sqlite3`). Data online tetap dipakai sebagai fallback, sehingga
aplikasi bekerja pada dua kondisi:

- **Online** — data diambil dari `equran.id` / `hadis-api-id` seperti sebelumnya.
- **Offline** — data dibaca dari SQLite, tanpa koneksi internet.

## 1. Bangun database

```bash
python scripts/build_offline_db.py            # semua
python scripts/build_offline_db.py --only quran
python scripts/build_offline_db.py --only hadith
python scripts/build_offline_db.py --rebuild  # hapus lalu unduh ulang
python scripts/build_offline_db.py --vacuum   # rapikan ukuran file
```

Atau lewat npm: `npm run build:offline`, `npm run build:offline:quran`,
`npm run build:offline:hadith`.

Script mengunduh sekali, memvalidasi jumlah, lalu menyimpan:

| Dataset | Validasi |
|---|---|
| Al-Qur'an | 114 surah, 6.236 ayat |
| Tafsir Kemenag | 6.236 tafsir (1 per ayat) |
| Hadits API | 9 kitab; jumlah riwayat harus sama dengan `total` upstream dan nomor unik |
| Riyadhus Shalihin | 372 bab tervalidasi; riwayat dinomori ulang berurutan dan ditautkan ke bab; teks yang memang tidak tersedia di sumber dipertahankan sebagai kosong |

Impor bersifat **resumable**: jalankan ulang dan surah/kitab yang sudah lengkap
akan dilewati. Perkiraan ukuran file 60–150 MB (teks saja; audio tetap online).

## 2. Pilih mode

Atur di `.env`:

```env
REFERENCE_MODE=hybrid
REFERENCE_DB_PATH=data/reference.sqlite3
```

| Mode | Baca lokal | Fallback online | Cache hasil online |
|---|---|---|---|
| `hybrid` (default) | ya | ya | ya |
| `local` | ya | tidak | tidak |
| `online` | tidak | ya untuk Qur'an dan 9 kitab API | tidak |

- `hybrid` cocok untuk pengembangan: tanpa build manual pun, setiap ayat/hadits
  yang pernah dibuka akan otomatis tersimpan dan tersedia offline berikutnya.
- `local` cocok untuk perangkat tanpa internet. Jika data belum ada, API
  mengembalikan error yang menyebutkan cara membangun database.
- `online` berguna untuk membandingkan hasil dengan sumber asli atau menjalankan
  tes yang mem-*mock* HTTP.
- Riyadhus Shalihin hanya tersedia dari database lokal karena sumbernya berupa
  dump SQL, bukan bagian dari hadis-api-id. Gunakan mode `hybrid` atau `local`.

## 3. Cek status

```bash
curl http://localhost:8000/api/reference/status
```

Contoh respons:

```json
{
  "mode": "hybrid",
  "path": "data/reference.sqlite3",
  "exists": true,
  "quran_surahs": 114,
  "quran_verses": 6236,
  "quran_tafsirs": 6236,
  "hadith_books": 10,
  "hadiths": 51234,
  "imported_at": "2026-11-02T10:00:00+00:00"
}
```

`GET /api/health` juga memuat `reference_mode` dan `reference_db_present`.

## 4. Perilaku API

Semua endpoint rujukan tetap sama bentuk responsnya, dengan tambahan field
`source`:

| Endpoint | Sumber lokal |
|---|---|
| `POST /api/quran/verse` | tabel `quran_verses` |
| `GET /api/quran/surah/{n}` | `quran_surahs` + `quran_verses` |
| `POST /api/quran/tafsir` | `quran_tafsirs` |
| `POST /api/quran/asbabun-nuzul` | diturunkan dari tafsir lokal |
| `GET /api/quran/search?q=` | FTS5 `quran_search` |
| `POST /api/hadith` | tabel `hadiths` |
| `POST /api/hadith/search` | FTS5 `hadith_search` (cakupan penuh per kitab) |

Pencarian hadits lokal mencakup **seluruh** riwayat kitab, bukan hanya beberapa
halaman pertama seperti mode online. Respons menyertakan `match_total`,
`scanned`, `total`, dan `partial`.

Riwayat Riyadhus Shalihin juga menyertakan metadata `bab`, `nomor_bab`, dan
`nomor_dalam_bab`; `nomor` adalah urutan global hasil impor untuk navigasi.
Nomor sumber Arab dan terjemahan yang berbeda tersedia sebagai
`nomor_sumber_arab` dan `nomor_sumber_terjemahan`.

Sumber: [irsyadulibad/hadits-database](https://github.com/irsyadulibad/hadits-database),
yang menyebutkan CariHadis sebagai sumber teks dan MIT sebagai lisensi repositori.
Perubahan sumber/terjemahan tetap perlu ditinjau sebelum distribusi.

## 5. Catatan deployment

- Database **tidak** ikut ke Git (lihat `.gitignore`) dan tidak ada di image
  Docker. Untuk produksi, jalankan script build sekali di volume persisten,
  lalu set `REFERENCE_DB_PATH` ke lokasi volume tersebut.
- Di platform serverless dengan filesystem read-only, gunakan `REFERENCE_MODE=online`
  atau arahkan `REFERENCE_DB_PATH` ke penyimpanan yang writable.
- Audio murottal (`cdn.equran.id`) tetap membutuhkan internet. Untuk audio
  offline, unduh file mp3 ke storage sendiri dan ganti URL pada kolom `audio`.
- Data dapat diperbarui kapan saja dengan `--rebuild`; server tidak perlu
  dihentikan karena SQLite memakai WAL dan koneksi per request.
