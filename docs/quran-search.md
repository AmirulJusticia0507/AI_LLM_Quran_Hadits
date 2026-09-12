# Pencarian surah

Pencarian sebelumnya hanya menyaring opsi `<select>`, tetapi state `surah` tetap bernilai 1. Browser dapat menampilkan opsi pertama hasil filter sementara tombol mengirim nomor Al-Fatihah. Sekarang pilihan state diperbarui bersama pencarian. Pencarian mendukung seluruh 114 nama/nomor dalam daftar, mengabaikan kapitalisasi, spasi, tanda baca, serta awalan Surat/Surah. Contoh: `Yasin`, `al baqarah`, `Surat Al Ikhlas`, `55`.

Jika beberapa surah cocok, pilihan saat ini dipertahankan bila masih cocok; jika tidak, pilihan pertama dipakai. Pengguna dapat memilih hasil lain melalui dropdown. Jika tidak ada hasil, tombol dinonaktifkan tanpa fallback ke Al-Fatihah. Hasil lama dibersihkan ketika pencarian berubah, dan respons permintaan lama diabaikan.

`GET /api/quran/surah/{surah}` menerima nomor 1–114 dan mengambil satu surah lengkap dalam satu permintaan upstream. Tombol Baca Surah menggunakan endpoint ini, sehingga tidak lagi mengunduh surah berulang kali untuk setiap ayat. Backend menolak identitas surah yang salah dan jumlah ayat yang tidak lengkap.

## Pengujian

```powershell
.venv/Scripts/python.exe -m unittest discover -s tests -v
node --test frontend/tests/surah-search.cjs
npm.cmd --prefix frontend run build
```

Tes browser opsional memakai Playwright dan Microsoft Edge, dengan API fixture agar tidak bergantung pada jaringan. Jalankan frontend pada port 3100 terlebih dahulu, kemudian:

```powershell
npm.cmd install --prefix "$env:TEMP/alhikmah-browser" playwright --no-save
$env:PLAYWRIGHT_MODULE = "$env:TEMP/alhikmah-browser/node_modules/playwright"
node frontend/tests/quran-browser.cjs
```

Gunakan `TEST_BASE_URL` jika server frontend berada di alamat lain. Tes memeriksa nomor yang benar pada payload, hasil kosong, pengambilan surah lengkap, dan respons lama yang datang setelah pilihan baru.
