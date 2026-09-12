# Statistik kunjungan

Footer mencatat pembukaan halaman dan navigasi pathname melalui POST /api/visits same-origin. ID acak disimpan di localStorage; browser yang sama dihitung sekali per tanggal WIB. Refresh menambah total pembukaan, bukan pengunjung unik harian. Tidak mencatat nama, nomor WA, IP, query URL, atau isi pesan. Browser dengan penyimpanan diblokir tidak dicatat. Angka merupakan perkiraan, bukan analitik dengan penyaringan bot/anti-manipulasi.

Server Next.js meneruskan ke FastAPI. Atur BACKEND_URL pada server frontend ke alamat backend yang dapat dijangkau (fallback NEXT_PUBLIC_API_URL, lalu http://127.0.0.1:8000). Backend harus aktif. Bila gagal, footer menampilkan statistik belum tersedia, bukan angka buatan.

SQLite berada di data/visits.sqlite3 pada working directory backend; atur VISITS_DB_PATH ke volume persisten saat deployment. Gunakan satu backend dengan disk persisten; beberapa replika harus berbagi layanan database sebelum diskalakan. Total bertahan setelah restart, ID pengunjung dan event hari sebelumnya dibersihkan saat kunjungan hari baru. Tidak mereset localStorage pengunjung. Menghapus database mereset seluruh hitungan. Hitungan dimulai sejak fitur diaktifkan.
