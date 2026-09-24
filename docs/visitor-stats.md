# Statistik dan riwayat pengunjung

Footer mencatat pembukaan halaman dan navigasi pathname melalui `POST /api/visits` same-origin. ID acak disimpan di localStorage; browser yang sama dihitung sekali per tanggal WIB. Refresh menambah total pembukaan, bukan pengunjung unik harian. Browser dengan penyimpanan diblokir tidak dicatat. Angka merupakan perkiraan dan dapat dipengaruhi bot atau manipulasi. Halaman `/admin` tidak dicatat.

Klik **Pengunjung hari ini** untuk membuka `/admin/pengunjung`. Halaman ini meminta password admin sebelum memuat detail. Tersedia filter tanggal (maksimal 30 hari), perangkat, serta pagination 25 kunjungan per halaman. ID browser anonim bukan identitas orang. Browser yang sama di perangkat berbeda atau setelah menghapus localStorage mendapatkan ID berbeda.

Riwayat menyimpan ID browser, waktu, pathname tanpa query/hash, perkiraan kategori perangkat, browser dan sistem operasi. IP, user-agent mentah, nama, nomor WA, dan isi chat tidak disimpan. Deteksi perangkat berdasarkan User-Agent dapat keliru, misalnya iPad dalam mode desktop. Detail lebih dari 30 hari dibersihkan saat pencatatan atau pembacaan admin berikutnya. Total pembukaan tetap disimpan. Detail sebelum fitur ini diaktifkan tidak dapat dipulihkan.

## Konfigurasi

Frontend Vercel (variabel server, jangan gunakan awalan `NEXT_PUBLIC`):

- `BACKEND_URL`: URL backend FastAPI (fallback `NEXT_PUBLIC_API_URL`, kemudian `http://127.0.0.1:8000`).
- `ADMIN_API_TOKEN`: token acak minimal 32 karakter, sama dengan backend.
- `ADMIN_SESSION_SECRET`: secret acak minimal 32 karakter untuk tanda tangan cookie sesi.

Backend:

- `ADMIN_API_TOKEN`: token yang sama dengan frontend.
- `ADMIN_PASSWORD`: password admin unik minimal 16 karakter.
- `VISITS_DB_PATH`: path SQLite di volume persisten, misalnya `/data/visits.sqlite3` jika volume memang dipasang pada `/data`.

Simpan secret di environment hosting, bukan Git. Backend memeriksa password dengan perbandingan konstan dan membatasi kegagalan login menjadi 10 per 15 menit, menggunakan SQLite agar berlaku lintas worker. API admin backend memerlukan bearer token server; browser tidak menerima token ini. Frontend memakai cookie bertanda tangan, HttpOnly, Secure pada production, SameSite Strict, kedaluwarsa 8 jam. Login/logout memeriksa Origin. Respons admin tidak boleh di-cache. Mengganti `ADMIN_SESSION_SECRET` membatalkan seluruh sesi. Mengganti password saja tidak membatalkan cookie yang sudah terbit.

Deployment tanpa secret menolak login/detail admin; penghitung publik tetap berfungsi. Deploy backend dan set secret kedua sisi sebelum mengaktifkan frontend. Gunakan satu replika backend dengan disk persisten. Beberapa replika harus memakai database bersama sebelum diskalakan. Tabel riwayat dibuat otomatis tanpa mereset total yang sudah ada. Menghapus database mereset seluruh hitungan.

## Verifikasi

```text
python -m unittest tests.test_visits tests.test_visitor_admin
cd frontend
node --test tests/visitor-admin.cjs
npm run build
```

Browser test: sesudah build, jalankan `node tests/run-visitor-admin-e2e.cjs` (memerlukan Playwright, atau `PLAYWRIGHT_MODULE` untuk path paketnya). Runner membuat secret acak dan database sementara, menjalankan backend pada port 8029 dan frontend pada port 3129, lalu membersihkan proses dan database uji. Python default berasal dari `.venv`; set `TEST_PYTHON` bila perlu. Jangan gunakan database/secret production untuk test.
