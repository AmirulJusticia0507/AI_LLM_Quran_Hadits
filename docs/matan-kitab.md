# Matan kitab

`/matan` menyediakan pembaca Arba’in Nawawi dan Bulughul Maram, terhubung dari Hadits, Pusat Belajar, footer, dan sitemap. Pembaca menyediakan pencarian nomor/teks, pilihan bagian, navigasi 5 teks per halaman, ukuran font Arab, salin teks dan rujukan, serta retry saat sumber gagal.

## Sumber dan edisi

- **Arba’in Nawawi**: 42 hadits, Arab dan terjemahan Indonesia dari [API Noor](https://ournoor.com/muslim-api/hadits/). Diambil melalui `https://ournoor.com/api/v1/hadits`.
- **Bulughul Maram**: teks Arab dari [AhmedBaset/hadith-json v1.2.0](https://github.com/AhmedBaset/hadith-json/tree/v1.2.0), yang mencantumkan Sunnah.com sebagai asal data. Edisi dataset mempunyai 1.767 entri dalam 16 bagian. Nomor tampilan memakai `idInBook` dataset; ini bukan klaim bahwa seluruh cetakan atau indeks Sunnah.com memakai penomoran sama. Teks dapat mencakup takhrij dan catatan sumber. Terjemahan Indonesia tidak tersedia pada sumber ini dan tidak dibuat menggunakan AI.

Pembaca memakai endpoint same-origin Next.js melalui domain/port website yang sedang dibuka, termasuk dari HP dan deployment online. Tidak memakai localhost:8000 atau NEXT_PUBLIC_API_URL dan tidak memerlukan FastAPI aktif untuk membaca matan. Data diambil saat runtime oleh server Next.js, dengan cache memori satu jam dan satu permintaan serentak per kitab. Tidak memerlukan API key atau layanan LLM. Katalog Arab tidak dipotong atau dikonversi menjadi HTML. Pencarian Arab mengabaikan harakat; pencarian numerik cocok tepat pada nomor edisi sumber.

Endpoint: `GET /api/matan/{kitab}?q=&bab=&page=1`, dengan kitab `arbain-nawawi` atau `bulughul-maram`. Respons mencakup metadata sumber, seluruh daftar bagian, jumlah total/cocok, dan entri halaman terpilih. Slug, halaman, panjang query, serta nomor bagian divalidasi. Sumber yang gagal atau data tidak lengkap menghasilkan HTTP 502; UI menyediakan tombol mencoba kembali.

Verifikasi: `.venv/Scripts/python.exe -m unittest discover -s tests -v`, lint frontend, dan build produksi. Telaah isi mengikuti edisi sumber; pembaca tidak menyamakan semua riwayat sebagai sahih atau menjadikan penomoran lintas edisi saling menggantikan.

Endpoint FastAPI tetap tersedia untuk konsumen API terpisah. Deployment frontend harus menjalankan server Next.js (bukan static export) dan dapat mengakses kedua sumber melalui HTTPS. Cache hanya menyimpan data yang lolos validasi; kegagalan dapat dicoba kembali.

Kitab al-Jami' tersedia melalui tombol langsung di /matan, membuka bagian 16 Bulughul Maram (bab=16). Pencarian dan pagination tetap membatasi hasil ke bagian ini sampai pengguna mengganti bagian/kitab. Nomor mengikuti edisi Bulughul Maram, tidak dinomori ulang. Identitas bagian: https://sunnah.com/bulugh/16.
