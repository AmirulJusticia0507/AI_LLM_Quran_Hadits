export type Lesson = {
  id: string;
  title: string;
  category: string;
  summary: string;
  points: string[];
  practice: string;
  source: { label: string; labelEn?: string; href: string };
  extraReferences?: { label: string; labelEn?: string; href: string }[];
};
export type Course = { id: string; title: string; description: string; note: string; lessons: Lesson[] };
const quran = (verse: string) => ({ label: `QS. ${verse.replace('/', ':')}`, href: `https://quran.com/${verse}` });
const hadith = (number: number) => ({ label: `Sahih al-Bukhari no. ${number}`, href: `https://sunnah.com/bukhari:${number}` });

export const tazkiyah: Course = {
  id: 'tazkiyah', title: 'Tazkiyatun Nafs',
  description: 'Belajar membersihkan hati, memperbaiki niat, dan membangun kebiasaan baik dalam kehidupan sehari-hari.',
  note: 'Latihan di sini adalah sarana refleksi, bukan ukuran kesucian hati atau penetapan amalan dengan jumlah khusus. Ringkasan rujukan disajikan sebagai parafrasa.',
  lessons: [
    { id: 'dasar', title: 'Mengenal penyucian jiwa', category: 'Landasan', summary: 'Tazkiyah mencakup meninggalkan keburukan dan menumbuhkan ketaatan.', points: ['Kenali kebiasaan yang menjauhkan diri dari Allah dan merugikan orang lain.', 'Perbaikan hati berjalan bersama ibadah wajib dan akhlak, bukan hanya pengalaman batin.'], practice: 'Pilih satu kebiasaan yang ingin diperbaiki dan satu tindakan kecil penggantinya.', source: quran('91/9') },
    { id: 'ikhlas', title: 'Ikhlas dan menjaga niat', category: 'Landasan', summary: 'Amal dinilai sesuai niatnya; arahkan ibadah kepada Allah.', points: ['Periksa tujuan sebelum beramal, saat beramal, dan sesudahnya.', 'Pujian orang tidak perlu menjadi tujuan atau alasan menghentikan kebaikan.'], practice: 'Lakukan satu kebaikan tanpa menceritakannya demi pujian.', source: hadith(1) },
    { id: 'taubat', title: 'Taubat dan harapan', category: 'Perbaikan diri', summary: 'Kembali kepada Allah dengan penyesalan dan perubahan nyata.', points: ['Tinggalkan dosa, sesali perbuatan, dan bertekad tidak mengulanginya.', 'Jika menyangkut hak manusia, kembalikan hak atau selesaikan tanggung jawab dengan cara yang benar.', 'Jangan berputus asa dari rahmat Allah.'], practice: 'Tentukan satu tanggung jawab yang bisa mulai dibereskan hari ini.', source: quran('39/53') },
    { id: 'muhasabah', title: 'Muhasabah dan muraqabah', category: 'Perbaikan diri', summary: 'Evaluasi diri dan sadari bahwa Allah mengetahui perbuatan kita.', points: ['Tinjau ibadah, ucapan, dan hubungan dengan sesama secara jujur.', 'Akhiri evaluasi dengan langkah perbaikan, bukan menyalahkan diri tanpa arah.'], practice: 'Renungkan satu nikmat, satu kekeliruan, dan satu rencana perbaikan sebelum tidur.', source: quran('59/18') },
    { id: 'sabar', title: 'Sabar dan shalat', category: 'Akhlak hati', summary: 'Kesabaran membantu bertahan dalam ketaatan dan menghadapi ujian.', points: ['Sabar meliputi keteguhan berbuat baik, menahan diri dari dosa, dan menghadapi musibah.', 'Mencari pertolongan dan menyelesaikan masalah tetap merupakan bentuk ikhtiar.'], practice: 'Saat emosi muncul, beri jeda sebelum menjawab dan pilih ucapan yang baik.', source: quran('2/153') },
    { id: 'syukur', title: 'Syukur dan qanaah', category: 'Akhlak hati', summary: 'Kenali nikmat dan gunakan untuk kebaikan.', points: ['Syukur tampak dalam pengakuan hati, ucapan, dan penggunaan nikmat.', 'Qanaah membantu merasa cukup tanpa menghentikan usaha yang halal.'], practice: 'Sebutkan nikmat yang sering terlupakan lalu gunakan untuk membantu seseorang.', source: quran('14/7') },
    { id: 'tawakal', title: 'Ikhtiar dan tawakal', category: 'Akhlak hati', summary: 'Berusaha dengan sungguh-sungguh lalu menyerahkan hasil kepada Allah.', points: ['Musyawarah dan keputusan yang matang berjalan bersama tawakal.', 'Hasil di luar kendali tidak menghapus nilai usaha yang benar.'], practice: 'Pisahkan hal yang dapat diusahakan hari ini dari hasil yang tidak dapat dikendalikan.', source: quran('3/159') },
    { id: 'penyakit-hati', title: 'Riya, ujub, hasad, dan sombong', category: 'Perbaikan diri', summary: 'Kenali dorongan mencari pujian, membanggakan diri, dan merendahkan orang.', points: ['Jangan menjadikan penampilan ibadah sebagai sarana merendahkan sesama.', 'Saat iri muncul, doakan kebaikan dan fokus memperbaiki usaha sendiri.', 'Terima nasihat dan akui jasa orang lain.'], practice: 'Berikan apresiasi yang tulus kepada seseorang tanpa membandingkan diri.', source: quran('31/18') },
    { id: 'lisan', title: 'Menjaga lisan dan persaudaraan', category: 'Amal harian', summary: 'Hati yang dibina tercermin pada cara berbicara dan memperlakukan sesama.', points: ['Hindari prasangka buruk, mencari-cari aib, dan ghibah.', 'Periksa kebenaran dan manfaat berita sebelum menyebarkannya.'], practice: 'Tahan satu komentar yang tidak bermanfaat dan ganti dengan ucapan yang baik.', source: quran('49/12') },
    { id: 'dzikir', title: 'Dzikir dan istiqamah', category: 'Amal harian', summary: 'Bangun kedekatan kepada Allah dengan dzikir dan amal yang berkelanjutan.', points: ['Utamakan kewajiban, kemudian tambah amalan sunnah sesuai kemampuan.', 'Baca Al-Qur’an dengan memperhatikan makna dan penerapannya.'], practice: 'Sisihkan waktu yang realistis untuk membaca dan merenungkan satu ayat.', source: quran('13/28') },
  ],
};

export const fiqh: Course = {
  id: 'fiqh', title: 'Fiqh Ibadah',
  description: 'Panduan dasar bersuci, shalat, puasa, zakat, haji, dan ibadah sehari-hari.',
  note: 'Ringkasan praktik mengikuti mazhab Syafi’i pada rincian yang disebutkan. Dalil adalah landasan umum, bukan uraian seluruh rincian hukum. Kasus khusus dan perbedaan mazhab perlu dipelajari bersama guru fiqih.',
  lessons: [
    { id: 'thaharah', title: 'Thaharah: hadas dan najis', category: 'Bersuci', summary: 'Bedakan keadaan hadas dengan najis pada badan, pakaian, atau tempat.', points: ['Hadas kecil diangkat dengan wudhu; hadas besar dengan mandi wajib.', 'Najis dibersihkan sesuai jenisnya hingga hilang sifat najis yang dapat dihilangkan.', 'Gunakan air suci yang menyucikan dan pastikan tidak ada penghalang air pada anggota bersuci.'], practice: 'Periksa kebersihan pakaian dan tempat sebelum shalat.', source: quran('5/6') },
    { id: 'wudhu', title: 'Enam rukun wudhu', category: 'Bersuci', summary: 'Pelajari bagian wajib wudhu menurut mazhab Syafi’i.', points: ['Niat ketika mulai membasuh wajah; basuh seluruh batas wajah.', 'Basuh kedua tangan termasuk siku, lalu usap sebagian kepala.', 'Basuh kedua kaki termasuk mata kaki, dan lakukan berurutan (tertib).', 'Basmalah, berkumur, dan mengulang basuhan tiga kali termasuk sunnah, bukan pengganti rukun.'], practice: 'Praktikkan berurutan dan periksa siku, tumit, serta sela jari.', source: { label: 'NU Online — Mengenal Rukun Wudhu (Syafi’i)', href: 'https://islam.nu.or.id/syariah/mengenal-rukun-wudhu-joVg6' } },
    { id: 'batal-wudhu', title: 'Pembatal wudhu', category: 'Bersuci', summary: 'Kenali keadaan yang mengharuskan berwudhu kembali.', points: ['Keluar sesuatu dari qubul atau dubur dan hilang kesadaran termasuk pembatal.', 'Dalam Syafi’i, tidur dengan pantat tidak tetap pada tempat duduk membatalkan wudhu.', 'Sentuhan kulit lawan jenis bukan mahram tanpa penghalang pada usia yang memenuhi ketentuan, serta menyentuh kemaluan manusia dengan bagian dalam telapak/jari, memiliki rincian pembatal dalam Syafi’i.', 'Ragu semata tidak membatalkan keyakinan sudah suci.'], practice: 'Bedakan kejadian pasti yang membatalkan dengan keraguan.', source: hadith(137) },
    { id: 'mandi', title: 'Mandi wajib', category: 'Bersuci', summary: 'Mandi wajib mengangkat hadas besar.', points: ['Janabah serta berakhirnya haid atau nifas merupakan sebab mandi wajib.', 'Niat saat mulai membasuh tubuh dan ratakan air ke seluruh kulit serta rambut.', 'Bersihkan najis dan penghalang air; perhatikan lipatan tubuh serta pangkal rambut.'], practice: 'Susun urutan mandi yang memastikan seluruh tubuh terkena air.', source: quran('5/6') },
    { id: 'tayamum', title: 'Tayamum dan keringanan bersuci', category: 'Bersuci', summary: 'Tayamum disyariatkan ketika air tidak tersedia atau tidak dapat digunakan dengan alasan yang sah.', points: ['Dalam Syafi’i, gunakan debu suci, berniat, usap wajah dan kedua tangan sampai siku secara tertib.', 'Tayamum untuk shalat fardhu dilakukan setelah masuk waktunya dan memenuhi ketentuan pencarian air.', 'Satu tayamum digunakan untuk satu shalat fardhu; rincian sakit dan perban perlu bimbingan.'], practice: 'Pelajari kondisi yang membolehkan tayamum sebelum mempraktikkannya.', source: quran('4/43') },
    { id: 'shalat', title: 'Persiapan dan rangkaian shalat', category: 'Shalat', summary: 'Pastikan syarat sah terpenuhi dan rukun dilakukan dengan tenang.', points: ['Masuk waktu, suci dari hadas dan najis, menutup aurat, serta menghadap kiblat sesuai kemampuan.', 'Niat bersama takbiratul ihram, berdiri bagi yang mampu dalam shalat wajib, membaca Al-Fatihah.', 'Rukuk, iktidal, dua sujud dan duduk di antaranya disertai tumakninah.', 'Akhiri dengan tasyahud akhir, duduknya, shalawat kepada Nabi, salam pertama, serta tertib.'], practice: 'Periksa tumakninah pada setiap perpindahan dengan pendampingan guru.', source: hadith(757) },
    { id: 'jamaah', title: 'Jamaah, Jumat, dan makmum masbuk', category: 'Shalat', summary: 'Ikuti imam dan pahami kewajiban berjamaah dalam konteksnya.', points: ['Makmum mengikuti imam, tidak mendahului gerakannya.', 'Masbuk menyempurnakan rakaat yang tertinggal setelah imam selesai salam.', 'Shalat Jumat memiliki syarat kewajiban dan pelaksanaan khusus; pelajari sesuai keadaan tempat tinggal.'], practice: 'Pelajari cara bergabung ketika imam sedang rukuk bersama guru setempat.', source: hadith(722) },
    { id: 'rukhsah', title: 'Shalat ketika sakit dan bepergian', category: 'Shalat', summary: 'Keringanan menjaga ibadah tetap dapat dilaksanakan sesuai kemampuan.', points: ['Orang sakit shalat berdiri; jika tidak mampu, duduk; jika tidak mampu, berbaring sesuai ketentuan.', 'Qashar berlaku pada shalat empat rakaat menjadi dua dengan syarat perjalanan yang memenuhi ketentuan.', 'Jamak menggabungkan Zuhur–Asar atau Maghrib–Isya; Subuh tidak dijamak.'], practice: 'Pelajari syarat perjalanan, niat, dan waktu sebelum memakai jamak atau qashar.', source: hadith(1117) },
    { id: 'puasa', title: 'Puasa Ramadan', category: 'Puasa', summary: 'Puasa menahan diri dari pembatal sejak fajar hingga matahari terbenam dengan niat.', points: ['Dalam Syafi’i, niat puasa wajib dilakukan setiap malam sebelum fajar.', 'Makan atau minum sengaja dan hubungan suami istri saat berpuasa termasuk pembatal; makan karena lupa berbeda hukumnya.', 'Haid dan nifas menghalangi sahnya puasa; puasa yang ditinggalkan diganti setelahnya.', 'Sakit, perjalanan, kehamilan, dan ketidakmampuan menetap memiliki rincian qadha atau fidyah yang berbeda.'], practice: 'Siapkan niat malam hari dan gunakan jadwal fajar serta maghrib setempat.', source: quran('2/185') },
    { id: 'zakat', title: 'Zakat fitrah dan zakat mal', category: 'Zakat', summary: 'Zakat adalah kewajiban harta dengan syarat dan penerima tertentu.', points: ['Zakat fitrah berkaitan dengan akhir Ramadan dan kebutuhan pokok; pelaksanaannya memiliki waktu serta ukuran yang ditentukan.', 'Zakat mal bergantung pada jenis harta, kepemilikan, nisab, dan haul jika disyaratkan.', 'Delapan golongan penerima disebut dalam QS. At-Taubah:60; tidak setiap sumbangan menggantikan zakat.'], practice: 'Catat jenis harta lalu konsultasikan perhitungannya kepada amil tepercaya.', source: quran('9/60') },
    { id: 'haji', title: 'Haji dan umrah', category: 'Haji & lainnya', summary: 'Haji wajib sekali seumur hidup bagi Muslim yang memenuhi kemampuan dan syaratnya.', points: ['Rukun haji dalam Syafi’i: ihram dengan niat, wukuf di Arafah, tawaf ifadhah, sai, mencukur atau memendekkan rambut, dan tertib sesuai ketentuannya.', 'Umrah tidak memiliki wukuf di Arafah.', 'Bedakan rukun dengan wajib haji: meninggalkan rukun tidak cukup diganti dam. Pelajari miqat dan larangan ihram sebelum berangkat.'], practice: 'Ikuti manasik dan susun urutan ibadah sesuai jenis haji yang dipilih.', source: quran('3/97') },
    { id: 'jenazah', title: 'Pengurusan jenazah', category: 'Haji & lainnya', summary: 'Pengurusan jenazah Muslim pada umumnya merupakan fardhu kifayah.', points: ['Memandikan, mengafani, menshalatkan, dan menguburkan dilakukan dengan menjaga kehormatan jenazah.', 'Shalat jenazah dilakukan berdiri bagi yang mampu, dengan empat takbir, tanpa rukuk dan sujud.', 'Pelajari Al-Fatihah, shalawat, doa untuk jenazah, dan salam sesuai urutannya.'], practice: 'Ikuti pelatihan pengurusan jenazah bersama pengurus masjid.', source: hadith(1333) },
  ],
};

export const sirah: Course = {
  id: 'sirah', title: 'Siroh Nabawiyah',
  description: 'Menelusuri perjalanan Rasulullah ﷺ dari masa Makkah hingga akhir kehidupan beliau, beserta pelajaran akhlaknya.',
  note: 'Urutan disusun secara kronologis. Tahun Masehi merupakan perkiraan; beberapa tanggal peristiwa diperselisihkan. Rujukan ayat dan hadits mendukung peristiwa atau ibrahnya, bukan selalu penanggalannya.',
  lessons: [
    { id: 'kelahiran', title: 'Sekitar 570 M • Kelahiran dan masa kecil', category: 'Makkah', summary: 'Muhammad ﷺ lahir di Makkah dan tumbuh sebagai anak yatim.', points: ['Beliau berasal dari Bani Hasyim, bagian dari Quraisy.', 'Setelah kehilangan ibu, beliau diasuh kakeknya, lalu pamannya Abu Thalib.', 'Tanggal kelahiran secara rinci diperselisihkan; Al-Qur’an mengingatkan pemeliharaan Allah terhadap beliau ketika yatim.'], practice: 'Ibrah: berikan perhatian nyata kepada anak yatim dan keluarga yang membutuhkan.', source: quran('93/6') },
    { id: 'khadijah', title: 'Sebelum kenabian • Keluarga dan amanah', category: 'Makkah', summary: 'Khadijah menjadi istri dan pendukung penting Rasulullah ﷺ.', points: ['Kehidupan beliau memperlihatkan kepedulian kepada keluarga dan orang lemah.', 'Saat wahyu pertama datang, Khadijah menenangkan beliau dengan mengingatkan akhlak baiknya.'], practice: 'Ibrah: bangun kepercayaan melalui kejujuran dan dukungan kepada keluarga.', source: hadith(3) },
    { id: 'wahyu', title: 'Sekitar 610 M • Wahyu pertama', category: 'Makkah', summary: 'Wahyu pertama turun melalui Jibril ketika beliau berada di Gua Hira.', points: ['Awal Surah Al-Alaq berisi perintah membaca dengan nama Tuhan.', 'Khadijah membawa beliau menemui Waraqah bin Naufal setelah pengalaman tersebut.'], practice: 'Ibrah: jadikan belajar sebagai ibadah yang disertai kerendahan hati.', source: hadith(3) },
    { id: 'dakwah', title: 'Masa Makkah • Dakwah dan keteguhan', category: 'Makkah', summary: 'Seruan tauhid menghadapi penolakan dan tekanan dari sebagian Quraisy.', points: ['Rasulullah diperintahkan memperingatkan kerabat terdekat.', 'Para sahabat mempertahankan iman di tengah ujian; sebagian mencari perlindungan di Habasyah.'], practice: 'Ibrah: sampaikan kebenaran dengan sabar dan pertimbangkan keselamatan orang lain.', source: quran('26/214') },
    { id: 'thaif', title: 'Masa Makkah • Ujian di Thaif', category: 'Makkah', summary: 'Penolakan yang berat tidak menghapus kasih sayang beliau.', points: ['Dalam riwayat Aisyah, beliau menceritakan penolakan yang dialami dan kedatangan malaikat gunung.', 'Beliau berharap keturunan mereka kelak menyembah Allah.'], practice: 'Ibrah: tahan dorongan membalas dan buka peluang perubahan.', source: hadith(3231) },
    { id: 'isra', title: 'Sebelum hijrah • Isra dan Mi’raj', category: 'Makkah', summary: 'Isra adalah perjalanan malam dari Masjidil Haram ke Masjidil Aqsa.', points: ['Peristiwa Isra disebut dalam awal Surah Al-Isra.', 'Riwayat Mi’raj menjelaskan pensyariatan shalat lima waktu; tanggal peristiwanya diperselisihkan.'], practice: 'Ibrah: rawat shalat sebagai bagian penting kehidupan seorang Muslim.', source: quran('17/1') },
    { id: 'hijrah', title: '622 M / 1 H • Hijrah ke Madinah', category: 'Madinah', summary: 'Hijrah membuka babak pembentukan masyarakat Muslim di Madinah.', points: ['Rasulullah berhijrah bersama Abu Bakar dengan persiapan dan pertolongan Allah.', 'Persaudaraan Muhajirin dan Ansar menguatkan kehidupan masyarakat baru.'], practice: 'Ibrah: gabungkan tawakal, perencanaan, dan dukungan kepada pendatang.', source: quran('9/40') },
    { id: 'badar', title: '2 H • Perang Badar', category: 'Madinah', summary: 'Badar menjadi peristiwa penting pada awal masa Madinah.', points: ['Al-Qur’an mengingatkan pertolongan Allah pada Badar saat kaum Muslim dalam keadaan lemah.', 'Pelajari konteks sejarah konflik bersama adab dan tanggung jawab, bukan sebagai pembenaran kekerasan pribadi.'], practice: 'Ibrah: tetap rendah hati ketika berhasil dan jangan melupakan pertolongan Allah.', source: quran('3/123') },
    { id: 'uhud', title: '3 H • Perang Uhud', category: 'Madinah', summary: 'Uhud mengandung pelajaran tentang ketaatan, ujian, dan pemulihan.', points: ['Al-Qur’an membahas perselisihan dan ketidaktaatan yang terjadi dalam peristiwa ini.', 'Musibah menjadi kesempatan evaluasi bersama tanpa meninggalkan tanggung jawab.'], practice: 'Ibrah: patuhi kesepakatan yang baik dan evaluasi kekeliruan secara jujur.', source: quran('3/152') },
    { id: 'khandaq', title: '5 H • Perang Khandaq / Ahzab', category: 'Madinah', summary: 'Madinah menghadapi pengepungan pasukan sekutu.', points: ['Kaum Muslim menghadapi ketakutan dan ujian berat.', 'Surah Al-Ahzab mengingatkan pertolongan Allah dalam menghadapi pasukan sekutu.'], practice: 'Ibrah: kuatkan kerja sama dan ketabahan ketika menghadapi krisis.', source: quran('33/9') },
    { id: 'hudaibiyah', title: '6 H • Perjanjian Hudaibiyah', category: 'Madinah', summary: 'Kesepakatan damai membuka jalan bagi perkembangan dakwah.', points: ['Rasulullah dan para sahabat berangkat dengan tujuan umrah, kemudian berunding dengan Quraisy.', 'Kesediaan memenuhi perjanjian menunjukkan kesabaran dan pandangan jangka panjang.'], practice: 'Ibrah: pertimbangkan manfaat jangka panjang dalam menyelesaikan perselisihan.', source: hadith(2731) },
    { id: 'fathu', title: '8 H • Fathu Makkah', category: 'Madinah', summary: 'Rasulullah kembali ke Makkah dalam peristiwa pembebasan kota.', points: ['Berhala di sekitar Ka’bah disingkirkan dan tauhid ditegakkan.', 'Kemenangan perlu disertai penghambaan kepada Allah, bukan kesombongan.'], practice: 'Ibrah: gunakan kemampuan untuk memperbaiki keadaan dan menjaga kehormatan sesama.', source: hadith(4287) },
    { id: 'wada', title: '10 H • Haji Wada', category: 'Akhir hayat', summary: 'Rasulullah menunaikan haji dan menyampaikan pesan kepada umat.', points: ['Beliau menegaskan kehormatan jiwa dan harta manusia.', 'Manasik beliau menjadi rujukan pelaksanaan haji.'], practice: 'Ibrah: jaga hak orang lain dalam ucapan, tindakan, dan urusan harta.', source: hadith(1739) },
    { id: 'wafat', title: '11 H / 632 M • Wafat di Madinah', category: 'Akhir hayat', summary: 'Rasulullah ﷺ wafat; para sahabat menghadapi kehilangan yang besar.', points: ['Abu Bakar mengingatkan bahwa Allah tetap hidup dan tidak mati.', 'Risalah dilanjutkan melalui pengamalan Al-Qur’an dan Sunnah serta penyampaian ilmu dengan amanah.'], practice: 'Ibrah: pilih satu teladan akhlak Nabi untuk diterapkan secara konsisten.', source: hadith(4452) },
  ],
};

export const balaghoh: Course = {
  id: 'balaghoh', title: 'Ilmu Balaghoh',
  description: 'Belajar kesesuaian ungkapan dan makna: maqolat, i\'rob, tashrif, ilmu maani, bayan, dan badi\' dengan contoh dari Al-Qur\'an.',
  note: 'Materi adalah pengantar yang disusun dari pembahasan umum ilmu balaghah (maani, bayan, badi\') dan terjemah Al-Balaghah al-Wadihah. Penentuan makna gaya bahasa Al-Qur\'an dan rincian hukumnya perlu diajarkan serta diverifikasi oleh guru; ringkasan ini bukan pengganti kitab atau kelas balaghah.',
  lessons: [
    { id: 'pengantar', title: 'Mengenal ilmu balagho', category: 'Pengantar', summary: 'Balaghoh menelaah kesesuaian lafadz dengan maksud, dari kejelasan sampai keindahan.', points: ['Secara bahasa balaghah berarti sampai kepada sasaran; secara istilah, ucapan yang tepat menyampaikan maksudnya kepada pendengar.', 'Tingkatannya dikenal tiga: fashohah (lafadz jelas dan benar), i\'jaz (keindahan yang menandingi), dan ma\'rifah (dikenal baik penuturnya).', 'Kajiannya dibagi tiga: maani tentang kesesuaian kalimat dengan situasi, bayan tentang cara menyampaikan makna, dan badi\' tentang penghias kata.', 'Nahwu dan sorof menjadi landasannya: nahwu menyusun kalimat, sorof mengubah bentuk kata, lalu balaghoh menilai kesesuaian maknanya.'], practice: 'Ambil satu ayat, tulis maknanya dengan bahasa sendiri, lalu bandingkan dengan terjemahan resmi.', source: { label: 'Ilmu Balaghah — Terjemah Kitab Kuning', href: 'https://www.alkhoirot.org/2023/11/ilmu-balaghah.html' } },
    { id: 'maqolat', title: 'Tiga maqolat: isim, fi\'il, dan harf', category: 'Maqolat', summary: 'Setiap kalam Arab tersusun dari tiga bentuk dasar yang masing-masing punya fungsi sendiri.', points: ['Isim menunjukkan makna tanpa terikat waktu, misalnya زَيْدٌ dan كِتَابٌ.', 'Fi\'il menunjukkan makna bersama waktu: lampau (كَتَبَ), sekarang (يَكْتُبُ), dan akan datang (سَيَكْتُبُ).', 'Harf bermakna bersama kata lain, seperti وَ dan لَمْ, sehingga tidak dapat berdiri sendiri.', 'QS. Al-Asr:3 memuat ketiganya: إِلَّا (harf), الَّذِينَ (isim), serta آمَنُوا dan عَمِلُوا (fi\'il).'], practice: 'Ambil satu surah pendek, lalu tandai isim, fi\'il, dan harf pada tiap ayatnya.', source: quran('103/3') },
    { id: 'irob', title: 'I\'rob: tanda kedudukan isim', category: 'Maqolat', summary: 'I\'rob menentukan fungsi isim dalam kalimat melalui perubahan harakat akhirnya.', points: ['Isim dapat berkedudukan raf\', shob (manshub), atau majrur; tiap kedudukan ditandai harakat akhir yang berbeda.', 'Karena itu dhammah menandai raf\', fathah menandai shob, dan kasrah menandai majrur.', 'Dalam QS. Al-Fatihah:5, kata إِيَّاكَ berkedudukan shob sebagai maf\'ul bihi karena didahulukan atas fi\'ilnya.', 'Kalimat yang seluruh anggotanya isim disebut jumlah ismiyah, sedangkan kalimat yang memuat fi\'il disebut jumlah fi\'iliyah.'], practice: 'Tentukan kedudukan (raf\'/shob/majrur) setiap isim pada satu ayat pilihan beserta tanda akhirnya.', source: { label: 'Wikipedia Bahasa Indonesia — Nahwu', href: 'https://id.wikipedia.org/wiki/Nahwu' } },
    { id: 'tashrif', title: 'Tashrif: perubahan bentuk kata', category: 'Maqolat', summary: 'Tashrif mengkaji perubahan kata dari akar yang sama untuk waktu dan fungsi yang berbeda.', points: ['Kata kerja berpindah dari lampau (كَتَبَ) ke sekarang (يَكْتُبُ) dan bentuk perintah (اِكْتُبْ).', 'Turunan seperti kātib (pelaku), maktūb (yang dikerjakan), dan kitābah (pekerjaan) lahir dari akar yang sama: k-t-b.', 'Perubahan inilah yang membuat satu akar dapat melahirkan banyak kata dengan makna yang saling terkait.', 'Dalam Al-Qur\'an, bentuk kata dipakai untuk menekankan pelaku, penderita, atau waktu sebuah peristiwa.'], practice: 'Pilih tiga ayat berisi kata dari satu akar, lalu tuliskan bentuk beserta fungsinya masing-masing.', source: { label: 'Wikipedia — Arabic verb (pola kata kerja Arab)', href: 'https://en.wikipedia.org/wiki/Arabic_verb' } },
    { id: 'khabar-insya', title: 'Kalam khabar dan kalam insha\'', category: 'Maani', summary: 'Ilmu maani membedakan kalimat yang menyampaikan berita dengan kalimat yang membentuk maksud.', points: ['Khabar adalah kalimat yang menceritakan sesuatu yang telah, sedang, atau akan terjadi, misalnya "مُّحَمَّدٌ رَّسُولُ اللَّهِ".', 'Insha\' adalah kalimat yang dibentuk oleh pembicara, seperti perintah, larangan, pertanyaan, dan doa.', 'Contoh insha\': "إِيَّاكَ نَعْبُدُ" sebagai perintah ibadah, dan "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ" sebagai pertanyaan peneguhan.', 'Menempatkan khabar pada tempatnya membuat kalimat diterima sebagai berita; menempatkan insha\' membuat kalimat menggerakkan pendengar.'], practice: 'Kumpulkan lima ayat pendek, lalu kelompokkan mana khabar dan mana insha\' beserta alasannya.', source: { label: 'Ma\'ani dalam Ilmu Balaghah — Terjemah Kitab Kuning', href: 'https://www.alkhoirot.org/2023/11/ilmu-maani.html' } },
    { id: 'ijaz-ithnab', title: 'Ijaz dan ithnab: ringkas dan bertele-tele', category: 'Maani', summary: 'Menyusun kalimat ringkas yang padat makna, atau mengulang untuk menegaskan dan menghapus sangkaan.', points: ['Ijaz adalah penyampaian banyak makna dengan kata yang sedikit, misalnya "لَيْسَ كَمِثْلِهِ شَيْءٌ" yang merangkum keesaan Allah.', 'Ithnab adalah pengulangan atau penambahan kalimat untuk menegaskan makna dan menutup celah salah tafsir.', 'Contoh ithnab: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ" yang menegas-negasikan dua bentuk keselamatan.', 'Ringkas belum tentu lebih baik bila menimbulkan kekaburan; panjang juga bila berguna untuk penegasan.'], practice: 'Ringkas satu ayat menjadi sepuluh kata tanpa mengubah maksudnya, lalu bandingkan dengan ayat aslinya.', source: quran('10/62') },
    { id: 'washal-fashal', title: 'Washal dan fashal: sambung dan putus kalimat', category: 'Maani', summary: 'Keputusan menyambung atau memutus kalimat memengaruhi hubungan makna dan penekanannya.', points: ['Washal menyambung dua kalimat agar maknanya saling melengkapi, misalnya "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ".', 'Fashal memutus kalimat agar tiap bagian berdiri sendiri, sering untuk menimbulkan heran, penegasan, atau menghindari makna ganda.', 'Menyambung kalimat yang seharusnya diputus dapat menimbulkan tafsiran yang tidak dikehendaki.', 'Latihannya membaca dengan wahwah (seni membaca): menyambung yang nyambung dan berhenti yang wajib berhenti.'], practice: 'Baca satu paragraf terjemahan sambil menandai titik sambung dan putus yang tepat, lalu rasakan beda maknanya.', source: quran('1/5') },
    { id: 'tasybih', title: 'Tasybih: penyerupaan', category: 'Bayan', summary: 'Ilmu bayan mengkaji cara menyampaikan makna, dimulai dari penyerupaan antara dua hal.', points: ['Rukun tasybih: musyabbah (yang diserupakan), mutsobbih (yang menyerupakan), adhof (kata penyambung), dan kholaf (perbedaannya).', 'Contoh dari Al-Qur\'an: "مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ" yang menyamakan cahaya Allah dengan cahaya dalam kandil.', 'Tasybih dapat dinyatakan terang dengan kata "seperti", atau tersirat tanpa penyama eksplisit.', 'Tujuannya menegaskan makna dengan gambaran yang dapat dibayangkan pendengar.'], practice: 'Cari satu perumpamaan dalam Al-Qur\'an, lalu identifikasi musyabbah, mutsobbih, dan perbedaannya.', source: quran('24/35') },
    { id: 'haqiqi-majazi', title: 'Hakikat dan majaz', category: 'Bayan', summary: 'Menilai apakah lafadz dipakai pada makna aslinya atau dipinjam untuk makna lain karena ada petunjuknya.', points: ['Hakikat adalah pemakaian kata pada makna yang lazim untuknya, misalnya "singa" pada hewan singa.', 'Majaz adalah pemakaian kata di luar makna aslinya karena ada hubungan (alaqoh) dan petunjuk (qarinah) yang mencegah makna asli.', 'Majaz dikelompokkan menjadi majaz lughawi (pada kata) dan majaz aqli (penyandaran fi\'il kepada yang bukan haknya).', 'Dalam majaz ada pula isti\'arah, majaz mursal, dan majaz murakkab; tiap bentuk punya syarat dan qarinah sendiri.'], practice: 'Ambil dua ayat yang mengandung kiasan, lalu jelaskan hubungan dan petunjuk yang membuatnya menjadi majaz.', source: { label: 'Hakikat dan Majaz dalam Ilmu Balaghah — Terjemah Kitab Kuning', href: 'https://www.alkhoirot.org/2023/11/hakikat-dan-majaz.html' } },
    { id: 'kinayah', title: 'Kinayah: sindiran bermakna', category: 'Bayan', summary: 'Kinayah memakai lafadz untuk kelaziman maknanya, dengan tetap bolehnya makna asli.', points: ['Kinayah didefinisikan sebagai lafadz yang diucapkan untuk kelaziman maknanya, sementara makna aslinya tetap boleh dikehendaki.', 'Ditinjau dari yang disindirkan, kinayah terbagi menjadi kinayah \'an shifat (sifat), \'an mauzu\' (yang disifati), dan \'an nisbat (hubungan).', 'Contoh klasik: "طَوِيْلُ النَّجَادِ" (panjang sarung pedangnya) yang menunjukkan orang berperawakan tinggi dan pemberani.', 'Kinayah memungkinkan penyampaian hal yang tidak enak disebut secara langsung dengan tetap sopan.'], practice: 'Temukan satu ungkapan sehari-hari yang berupa kinayah, lalu sebutkan kelaziman maknanya.', source: { label: 'Kinayah dalam Ilmu Balaghah — Terjemah Kitab Kuning', href: 'https://www.alkhoirot.org/2023/12/kinayah-dalam-ilmu-balaghah.html' } },
    { id: 'badi-lafzhi', title: 'Keindahan lafzhi: saj\', jinas, dan iqtibas', category: 'Badi', summary: 'Ilmu badi\' menghias kata; keindahan lafzhi bekerja pada bunyi dan susunan huruf.', points: ['Saj\' adalah persajakan pada bunyi akhir kata, misalnya pengulangan bunyi -ān pada "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ".', 'Jinas adalah kesamaan bunyi kata dengan makna yang berbeda, sehingga tercipta permainan makna yang halus.', 'Iqtibas adalah mengambil ungkapan langsung dari ayat Al-Qur\'an agar pesannya terangkat oleh keagungan sumbernya.', 'Keindahan lafzhi harus diimbangi makna yang benar; permainan bunyi tanpa isi hanya sekadar hiasan.'], practice: 'Baca Surah Ar-Rahman, dengarkan bunyi akhir tiap ayat, dan tandai pola saj\'nya.', source: { label: 'Badi\' dalam Ilmu Balaghah — Terjemah Kitab Kuning', href: 'https://www.alkhoirot.org/2023/11/ilmu-badi.html' } },
    { id: 'badi-maknawi', title: 'Keindahan maknawi: tauriyah, thibaq, dan muqobalah', category: 'Badi', summary: 'Keindahan maknawi bekerja pada isi: makna ganda, lawan kata, dan perbandingan yang sepadan.', points: ['Tauriyah memakai satu lafadz yang bermakna dua atau lebih, dengan salah satunya yang dikehendaki.', 'Thibaq memasangkan dua kata yang saling berlawanan, misalnya "إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ" (kebaikan menghapus keburukan).', 'Muqobalah menyejajarkan dua hal agar perbandingannya jelas dan seimbang.', 'Ketiganya membuat pesan lebih tegas karena pendengar melihat hubungan antara lawan atau bandingan.'], practice: 'Cari tiga pasang lawan kata dalam satu surah, lalu tulis efeknya terhadap penekanan pesan.', source: quran('11/114') },
    { id: 'iltifat', title: 'Iltifat dan husnu at-ta\'lil', category: 'Badi', summary: 'Dua penghias makna: perpindahan sudut pandang bicara dan penyebutan sebab yang baik.', points: ['Iltifat adalah perpindahan dari orang ketiga ke pertama atau kedua (atau sebaliknya) dalam satu wacana untuk menarik perhatian.', 'Contoh QS. Al-Qamar:17 berpindah dari "Kami mudahkan Al-Qur\'an" kepada pertanyaan "فَهَلْ مِن مُّدَّكِرٍ".', 'Husnu at-ta\'lil adalah menyebut sebab yang wajar dan menyenangkan, bukan sebab yang cacat atau merendahkan.', 'Al-Qur\'an banyak memakai ta\'lil seperti "لَعَلَّهُمْ يَتَذَكَّرُونَ" yang menempatkan manfaat sebagai alasan.'], practice: 'Pilih satu surah pendek, tandai perubahan orang bicara dan sebab yang disebutkan di dalamnya.', source: quran('54/17') },
  ],
};


export const munakahat: Course = {
  id: 'munakahat',
  title: 'Fiqh Munakahat (Pernikahan & Keluarga)',
  description: 'Panduan syariat khitbah, rukun nikah, mahar, hak-kewajiban suami istri, hingga penyelesaian konflik dan hak asuh anak.',
  note: 'Disusun berdasarkan ringkasan fikih pernikahan mazhab Syafi’i dan jumhur ulama. Dalil Al-Qur’an dan hadits shahih disertakan sebagai rujukan hukum dan moral.',
  lessons: [
    {
      id: 'khitbah',
      title: 'Khitbah dan Memilih Pasangan',
      category: 'Persiapan',
      summary: 'Khitbah (meminang) adalah langkah awal sebelum pernikahan dengan menjaga batasan syariat.',
      points: [
        'Anjuran memilih pasangan atas dasar agama dan akhlak yang baik (HR. Bukhari no. 5090).',
        'Disyariatkannya an-nazhar (melihat calon pasangan pada wajah dan telapak tangan) sebelum melangkah.',
        'Haram meminang wanita yang sedang dalam pinangan laki-laki lain yang belum dibatalkan.',
        'Khitbah bukan akad nikah; calon mempelai tetaplah bukan mahram sampai akad sah terlaksana.',
      ],
      practice: 'Lakukan shalat istikharah dan musyawarah dengan keluarga serta orang berilmu sebelum meminang.',
      source: hadith(5090),
    },
    {
      id: 'rukun-nikah',
      title: 'Lima Rukun Akad Nikah',
      category: 'Akad Nikah',
      summary: 'Pernikahan sah hanya jika memenuhi lima rukun utama menurut mazhab Syafi’i.',
      points: [
        'Calon mempelai pria (Muslim, baligh, berakal, tidak terpaksa, bukan mahram calon istri).',
        'Calon mempelai wanita (Muslimah/kitabiyyah, tidak dalam masa iddah, bukan mahram calon suami).',
        'Wali nikah bagi mempelai wanita (harus laki-laki, Muslim, adil, dan berakal).',
        'Dua orang saksi laki-laki yang adil dan mendengar langsung ijab qabul.',
        'Shighat akad (Ijab dari wali atau wakilnya, dan Qabul dari mempelai pria secara bersambung).',
      ],
      practice: 'Pastikan seluruh syarat rukun terpenuhi sebelum tanggal pelaksanaan akad nikah.',
      source: quran('4/21'),
    },
    {
      id: 'wali-nikah',
      title: 'Urutan Wali Nasab & Wali Hakim',
      category: 'Akad Nikah',
      summary: 'Wali adalah syarat mutlak keabsahan nikah wanita, berurutan dari garis nasab terdekat.',
      points: [
        'Urutan wali nasab: ayah kandung, kakek (ayah dari ayah), saudara laki-laki kandung, saudara laki-laki seayah, paman kandung, hingga sepupu laki-laki.',
        'Wali yang lebih jauh tidak sah menikahkan selama wali yang lebih dekat masih ada dan memenuhi syarat.',
        'Jika wali nasab adhal (menolak menikahkan tanpa alasan syar’i), hak perwalian berpindah ke Wali Hakim setelah penetapan Pengadilan Agama.',
        'Pernikahan tanpa wali yang sah dinyatakan batal oleh sabda Rasulullah ﷺ (HR. Abu Dawud no. 2083).',
      ],
      practice: 'Periksa silsilah dan kesiapan wali nasab sedini mungkin untuk menghindari sengketa perwalian.',
      source: { label: 'HR. Abu Dawud no. 2083 (Tidak Sah Nikah Tanpa Wali)', href: 'https://sunnah.com/abudawud:2083' },
    },
    {
      id: 'mahar',
      title: 'Mahar (Maskawin) dan Ketentuannya',
      category: 'Akad Nikah',
      summary: 'Mahar adalah hak murni istri yang wajib diberikan suami secara sukarela dan penuh penghargaan.',
      points: [
        'Mahar wajib disebutkan atau diserahkan, namun bukan rukun yang membatalkan akad jika belum ditentukan jumlahnya.',
        'Mahar adalah milik mutlak istri; orang tua atau suami tidak boleh mengambilnya tanpa izin kerelaan istri.',
        'Syariat menganjurkan memudahkan mahar dan tidak memberatkan calon suami (HR. Ahmad).',
        'Mahar dapat berupa harta tunai, perhiasan, hafalan Al-Qur’an, atau manfaat yang bernilai syar’i.',
      ],
      practice: 'Musyawarahkan mahar yang terjangkau bagi calon suami dan membawa keberkahan bagi calon istri.',
      source: quran('4/4'),
    },
    {
      id: 'hak-kewajiban',
      title: 'Hak dan Kewajiban Suami Istri',
      category: 'Kehidupan Keluarga',
      summary: 'Keluarga sakinah mawaddah wa rahmah dibangun atas pemenuhan hak dan kewajiban timbal balik.',
      points: [
        'Kewajiban suami: memberikan nafkah lahir (pangan, sandang, tempat tinggal layak) dan nafkah batin, serta mendidik agama.',
        'Kewajiban istri: taat kepada suami dalam hal yang ma’ruf (bukan maksiat), menjaga kehormatan diri dan harta keluarga saat suami tidak di rumah.',
        'Kewajiban bersama: mu’asyarah bil ma’ruf (bergaul dengan santun, saling memaafkan kekhilafan, dan menjaga aib pasangan).',
        'Rasulullah ﷺ bersabda: "Sebaik-baik kalian adalah yang paling baik terhadap keluarganya" (HR. Tirmidzi no. 3895).',
      ],
      practice: 'Luangkan waktu harian untuk komunikasi terbuka dan saling mengapresiasi peran pasangan.',
      source: quran('4/19'),
    },
    {
      id: 'walimah',
      title: 'Walimatul ‘Urs dan Adabnya',
      category: 'Kehidupan Keluarga',
      summary: 'Mengadakan walimah disunnahkan sebagai wujud syukur dan mengumumkan ikatan pernikahan.',
      points: [
        'Hukum menyelenggarakan walimah adalah sunnah muakkadah, sesuai kemampuan tanpa berutang atau riba.',
        'Hukum menghadiri undangan walimah adalah fardhu ‘ain (wajib) bagi yang diundang langsung, kecuali ada uzur syar’i.',
        'Hindari membeda-bedakan undangan hanya untuk orang kaya dan menelantarkan orang miskin (HR. Muslim no. 1432).',
        'Adab walimah: memisahkan pergaulan yang tidak pantas, menjaga aurat, dan mendoakan barakah untuk kedua mempelai.',
      ],
      practice: 'Doakan kedua mempelai: "Baarakallahu laka wa baaraka ‘alaika wa jama’a bainakuma fii khair."',
      source: hadith(5155),
    },
    {
      id: 'konflik-keluarga',
      title: 'Menyikapi Masalah Rumah Tangga & Hakam',
      category: 'Penyelesaian Masalah',
      summary: 'Islam memberikan tahapan bijak dalam menyelesaikan perselisihan agar ikatan tidak mudah putus.',
      points: [
        'Tahap pertama: nasihat yang lemah lembut dan dialog berdua dengan hati yang dingin.',
        'Tahap kedua: hajru fi al-madhaji’ (pisah tempat tidur sementara untuk introspeksi, bukan meninggalkan rumah).',
        'Jika perselisihan memuncak (syiqaq), utuslah dua hakam (mediator adil) dari pihak suami dan pihak istri (QS. An-Nisa: 35).',
        'Haram menyebarkan aib rumah tangga ke media sosial atau pihak yang tidak berkapasitas membantu.',
      ],
      practice: 'Fokus pada penyelesaian masalah (problem-oriented) bukan menyerang pribadi pasangan.',
      source: quran('4/35'),
    },
    {
      id: 'talak',
      title: 'Hukum dan Adab Talak (Perceraian)',
      category: 'Penyelesaian Masalah',
      summary: 'Talak adalah pintu darurat terakhir ketika kebaikan dan keutuhan keluarga tidak lagi dapat dipertahankan.',
      points: [
        'Talak adalah perbuatan halal yang paling dibenci Allah jika dilakukan tanpa alasan syar’i.',
        'Talak Sunni: menjatuhkan satu talak ketika istri dalam keadaan suci dan belum digauli pada masa suci tersebut.',
        'Talak Bid’i: mentalak istri saat sedang haid atau saat nifas (hukumnya berdosa meski talak tetap jatuh menurut mayoritas ulama).',
        'Talak Raj’i (talak 1 dan 2): suami berhak merujuk istri selama masih dalam masa iddah tanpa perlu akad nikah baru.',
        'Talak Bain Kubra (talak 3): ikatan putus total dan tidak boleh rujuk kembali kecuali mantan istri telah menikah sah dengan pria lain dan berpisah wajar.',
      ],
      practice: 'Hindari mengucapkan kata talak/cerai dalam keadaan marah atau sekadar bercanda.',
      source: quran('2/229'),
    },
    {
      id: 'khulu',
      title: 'Khulu’ (Gugat Cerai Istri)',
      category: 'Penyelesaian Masalah',
      summary: 'Hak wanita mengajukan perceraian kepada suami dengan kompensasi tebusan (‘iwadh).',
      points: [
        'Khulu’ disyariatkan bagi istri yang khawatir tidak dapat menegakkan batasan Allah dan hak suami karena kebencian yang mendalam.',
        'Contoh kasus pertama: istri Tsabit bin Qais yang meminta pisah dan Rasulullah ﷺ memerintahkannya mengembalikan kebun mahar (HR. Bukhari no. 5273).',
        'Status khulu’ menurut jumhur ulama berakibat talak ba’in shughra (tidak ada hak rujuk kecuali dengan akad nikah baru).',
        'Suami dilarang menzalimi atau menekan istri agar istri membayar tebusan khulu’.',
      ],
      practice: 'Gunakan jalur mediasi resmi di Pengadilan Agama jika hak-hak istri tidak dipenuhi.',
      source: hadith(5273),
    },
    {
      id: 'iddah-hadhanah',
      title: 'Masa Iddah dan Hak Asuh Anak (Hadhanah)',
      category: 'Pasca Perceraian',
      summary: 'Ketentuan masa tunggu bagi wanita dan perlindungan hak pengasuhan serta nafkah anak.',
      points: [
        'Iddah wanita haid: 3 kali quru’ (suci/haid); wanita tidak haid/menopause: 3 bulan; wanita hamil: sampai melahirkan.',
        'Iddah wanita yang ditinggal wafat suami: 4 bulan 10 hari (QS. Al-Baqarah: 234).',
        'Hadhanah (hak asuh anak kecil belum mumayyiz) diutamakan kepada ibu selama ibu belum menikah lagi dan mampu merawat.',
        'Nafkah anak (sandang, pangan, pendidikan, kesehatan) tetap menjadi kewajiban mutlak sang ayah, bukan mantan istri.',
      ],
      practice: 'Posisikan kepentingan dan kesejahteraan mental anak di atas konflik kedua orang tua.',
      source: quran('2/233'),
    },
  ],
};

export const integritas: Course = {
  id: 'integritas',
  title: 'Fiqh Integritas & Anti-Korupsi',
  description: 'Hukum syariat tentang amanah jabatan, bahaya suap (risywah), gratifikasi, korupsi (ghulul), dan perlindungan harta publik.',
  note: 'Korupsi dalam Islam dikategorikan sebagai dosa besar (al-kaba’ir) yang merusak tatanan keadilan sosial. Materi ini merangkum dalil Al-Qur’an dan hadits shahih tentang larangan memakan harta publik secara batil.',
  lessons: [
    {
      id: 'amanah-jabatan',
      title: 'Amanah Kepemimpinan dan Tanggung Jawab',
      category: 'Prinsip Integritas',
      summary: 'Jabatan dan wewenang publik adalah amanah berat yang akan dipertanggungjawabkan di akhirat.',
      points: [
        'Amanah adalah beban yang pernah ditawarkan kepada langit, bumi, dan gunung namun mereka enggan memikulnya (QS. Al-Ahzab: 72).',
        'Rasulullah ﷺ mengingatkan: "Setiap kalian adalah pemimpin dan setiap kalian akan dimintai pertanggungjawaban atas kepemimpinannya" (HR. Bukhari no. 7138).',
        'Jabatan publik bukan sarana memperkaya diri atau kelompok, melainkan sarana melayani umat dan menegakkan keadilan.',
        'Menyerahkan jabatan atau urusan publik kepada orang yang tidak kompeten adalah tanda kehancuran amanah (HR. Bukhari no. 59).',
      ],
      practice: 'Laksanakan tugas kedinasan atau pekerjaan dengan profesional dan sadar akan pengawasan Allah (Muraqabah).',
      source: quran('33/72'),
    },
    {
      id: 'harta-batil',
      title: 'Larangan Memakan Harta Batil',
      category: 'Prinsip Integritas',
      summary: 'Islam mengharamkan segala bentuk perolehan harta yang merugikan pihak lain dan melanggar hukum.',
      points: [
        'Allah berfirman: "Dan janganlah kamu memakan harta sebagian yang lain di antara kamu dengan jalan yang batil..." (QS. Al-Baqarah: 188).',
        'Termasuk harta batil: penipuan, pemerasan, manipulasi laporan keuangan, dan penggelembungan anggaran (mark-up).',
        'Daging yang tumbuh dari harta haram lebih berhak disucikan oleh api neraka (HR. Tirmidzi no. 614).',
        'Harta haram menjadi penghalang terkabulnya doa seseorang meskipun ia berdoa sambil menangis mengangkat tangan (HR. Muslim no. 1015).',
      ],
      practice: 'Teliti sumber setiap rupiah yang masuk ke rekening pribadi dan keluarga; pastikan diperoleh dengan cara halal.',
      source: quran('2/188'),
    },
    {
      id: 'ghulul',
      title: 'Ghulul: Penggelapan Aset & Kas Negara',
      category: 'Kejahatan Finansial',
      summary: 'Ghulul adalah tindakan menggelapkan atau mencuri harta publik/kas negara sebelum dibagikan secara sah.',
      points: [
        'Dalam Al-Qur’an: "Barangsiapa berbuat ghulul (khianat/korupsi), niscaya pada hari kiamat ia akan datang membawa apa yang dikorupsikannya itu" (QS. Ali ‘Imran: 161).',
        'Rasulullah ﷺ menolak menshalatkan jenazah seorang sahabat yang gugur dalam perang karena terbukti menyembunyikan selendang rampasan perang bernilai dua dirham (HR. Abu Dawud no. 2710).',
        'Korupsi uang rakyat dosanya lebih berat daripada mencuri milik satu individu, karena pertanggungjawabannya menyangkut jutaan rakyat pemilik hak.',
        'Korupsi menyebabkan hilangnya keberkahan suatu negeri dan menyuburkan kemiskinan serta ketidakadilan.',
      ],
      practice: 'Jaga fasilitas kantor, inventaris dinas, dan kas bersama; jangan pernah dialihkan untuk kepentingan pribadi.',
      source: quran('3/161'),
    },
    {
      id: 'risywah',
      title: 'Risywah: Bahaya Suap-Menyuap',
      category: 'Kejahatan Finansial',
      summary: 'Suap adalah transaksi haram untuk membenarkan yang batil atau membatalkan yang hak.',
      points: [
        'Rasulullah ﷺ bersabda: "Laknat Allah atas orang yang memberi suap dan yang menerima suap" (HR. Abu Dawud no. 3580, Tirmidzi no. 1337).',
        'Suap merusak sistem hukum, memenangkan pihak yang salah, dan menzalimi pihak yang benar namun tidak mampu menyuap.',
        'Perbedaan Suap dan Hadiah: Suap diberikan karena adanya wewenang/tuntutan terselubung untuk mengubah keputusan, sedangkan hadiah diberikan murni atas dasar kasih sayang tanpa kepentingan jabatan.',
        'Uang pelicin, pelancar birokrasi, atau suap rekrutmen CPNS/pekerjaan semuanya termasuk dalam kategori risywah yang dilaknat.',
      ],
      practice: 'Tolak mentah-mentah tawaran atau permintaan suap; tempuh jalur legal dan bersabar atas ketetapan Allah.',
      source: { label: 'HR. Abu Dawud no. 3580 (Laknat Penyuap & Penerima Suap)', href: 'https://sunnah.com/abudawud:3580' },
    },
    {
      id: 'gratifikasi',
      title: 'Gratifikasi & Hadiah Pejabat',
      category: 'Kejahatan Finansial',
      summary: 'Hadiah yang diterima seseorang karena jabatannya adalah bentuk korupsi terselubung.',
      points: [
        'Nabi ﷺ mengutus Ibnu al-Lutbiyyah menarik zakat. Saat pulang ia berkata: "Ini untuk kalian, dan ini dihadiahkan untukku." Nabi ﷺ naik mimbar dan menegur keras: "Mengapa ia tidak duduk saja di rumah bapak atau ibunya, lalu melihat apakah akan ada yang memberinya hadiah?!" (HR. Bukhari no. 7174).',
        'Kaidah fiqih: "Hadiah untuk para pejabat/pekerja adalah bentuk ghulul (penggelapan)."',
        'Pemberian hadiah oleh vendor, bawahan, atau pihak yang berurusan dengan jabatan rentan memengaruhi objektivitas keputusan.',
        'Wajib bagi pejabat publik atau penegak hukum menolak gratifikasi atau menyerahkannya ke kas umum.',
      ],
      practice: 'Terapkan prinsip "No Gift Policy" dalam urusan bisnis dan kedinasan.',
      source: hadith(7174),
    },
    {
      id: 'nepotisme-timbangan',
      title: 'Kecurangan Tender & Nepotisme',
      category: 'Keadilan Publik',
      summary: 'Memanipulasi timbangan, memenangkan proyek secara curang, dan kolusi melanggar syariat keadilan.',
      points: [
        'Ancaman kehancuran bagi pelaku curang dalam timbangan dan takaran (QS. Al-Muthaffifin: 1-3); prinsip ini mencakup kecurangan spesifikasi proyek dan manipulasi kontrak.',
        'Kolusi dan pengaturan tender merampas hak peserta lain yang lebih berhak dan menghasilkan mutu bangunan/layanan publik yang rentan runtuh.',
        'Nepotisme (mengangkat pejabat/pegawai hanya karena hubungan kerabat dengan menyingkirkan orang yang lebih cakap) adalah bentuk pengkhianatan kepada Allah dan Rasul-Nya (HR. Al-Hakim).',
        'Keadilan dan meritokrasi adalah pilar tegaknya masyarakat yang amanah.',
      ],
      practice: 'Tegakkan transparansi, objektivitas, dan kejujuran dalam setiap seleksi serta pengadaan barang dan jasa.',
      source: quran('83/1'),
    },
    {
      id: 'taubat-koruptor',
      title: 'Syarat Sah Taubat dari Dosa Korupsi',
      category: 'Pertanggungjawaban',
      summary: 'Dosa korupsi menyangkut hak sesama manusia (haqqul adami) yang tidak terhapus hanya dengan istighfar.',
      points: [
        'Syarat taubat nasuha umum: berhenti dari dosa, menyesali perbuatan, dan bertekad kuat tidak mengulanginya.',
        'Syarat mutlak untuk harta korupsi: seluruh uang/aset hasil korupsi wajib dikembalikan kepada kas negara / pemilik haknya.',
        'Ibadah haji, umrah, atau sedekah yang dibiayai dari uang korupsi tidak akan diterima Allah karena Allah itu Maha Baik dan hanya menerima yang baik (HR. Muslim no. 1015).',
        'Bila pelaku meninggal sebelum mengembalikan hak manusia, kebaikannya akan diambil untuk korban, atau dosa korban ditimpakan kepadanya di Padang Mahsyar (Hadits Muflis, HR. Muslim no. 2581).',
      ],
      practice: 'Segera bebaskan diri dari hak orang lain di dunia sebelum datang hari penghisaban di akhirat.',
      source: hadith(2449),
    },
  ],
};


export const muamalah: Course = {
  id: 'muamalah',
  title: 'Fiqh Muamalah (Ekonomi, Bisnis, & Finansial Digital)',
  description: 'Panduan mencari rezeki halal: prinsip anti-riba, gharar, utang-piutang, akad bisnis syariah, serta hukum paylater, pinjol, dan e-commerce.',
  note: 'Kaidah dasar muamalah: "Al-ashlu fil mu’amalati al-ibahah hatta yadulla ad-dalilu ‘ala tahrimiha" (Hukum asal transaksi adalah boleh sampai ada dalil yang mengharamkannya). Disusun sesuai panduan DSN-MUI dan fikih muamalah kontemporer.',
  lessons: [
    {
      id: 'prinsip-muamalah',
      title: 'Kaidah Asal Transaksi & Kerelaan (Taradhin)',
      category: 'Prinsip Dasar',
      summary: 'Setiap transaksi bisnis wajib dilandasi asas kerelaan kedua pihak dan bebas dari penipuan.',
      points: [
        'Allah berfirman: "Janganlah kamu saling memakan harta sesamamu dengan jalan yang batil, kecuali dalam perdagangan yang berlaku atas dasar suka sama suka di antara kamu" (QS. An-Nisa: 29).',
        'Hukum asal perniagaan adalah halal dan mubah, kecuali jika mengandung unsur kezaliman atau barang yang diharamkan.',
        'Syarat sah jual beli: kedua pihak cakap bertindak hukum (baligh, berakal), barang bernilai syar’i, barang milik penuh penjual, dan kejelasan harga serta spesifikasi.',
        'Ketiadaan paksaan (ikrah) dan hak khiyar (hak memilih melanjutkan atau membatalkan akad saat menemukan cacat barang).',
      ],
      practice: 'Pastikan akad jual beli atau kontrak kerja disepakati tanpa tekanan dan poin kesepakatan tertulis jelas.',
      source: quran('4/29'),
    },
    {
      id: 'riba',
      title: 'Bahaya & Bentuk-Bentuk Riba',
      category: 'Larangan Utama',
      summary: 'Riba adalah tambahan tanpa imbalan pengganti yang diharamkan secara tegas dalam syariat.',
      points: [
        'Ancaman keras pelaku riba: dinyatakan diperangi oleh Allah dan Rasul-Nya (QS. Al-Baqarah: 278-279).',
        'Riba Nasi’ah: tambahan bunga atas penundaan pembayaran utang (seperti bunga pinjaman bank konvensional, kartu kredit, rentenir).',
        'Riba Fadhl: kelebihan dalam pertukaran barang ribawi sejenis (emas dengan emas, perak dengan perak, kurma, gandum, garam).',
        'Riba Qardh: setiap pinjaman yang mensyaratkan adanya manfaat atau bunga tambahan bagi pemberi pinjaman ("Kullu qardin jarra manfa’atan fahuwa riba").',
      ],
      practice: 'Hindari mengambil fasilitas pinjaman berbunga; pilih skema pembiayaan syariah tanpa denda bunga bergulir.',
      source: quran('2/275'),
    },
    {
      id: 'gharar-maysir',
      title: 'Larangan Gharar (Ketidakjelasan) & Maysir (Spekulasi/Judi)',
      category: 'Larangan Utama',
      summary: 'Islam melarang transaksi yang mengandung spekulasi untung-untungan atau ketidakpastian tinggi.',
      points: [
        'Rasulullah ﷺ melarang jual beli gharar (HR. Muslim no. 1513), seperti menjual ikan yang masih di laut lepas atau buah sebelum tampak matang.',
        'Maysir (judi): transaksi di mana salah satu pihak pasti untung di atas kerugian pihak lain semata karena faktor untung-untungan.',
        'Penerapan modern: judi online, slot gacor, skema piramida/ponzi, dan trading binary option yang murni menebak harga tanpa kepemilikan aset.',
        'Asuransi konvensional mengandung unsur gharar dan maysir; sebagai gantinya syariat menganjurkan Asuransi Syariah berbasis akad Tabarru’ (tolong-menolong).',
      ],
      practice: 'Tolak tawaran investasi yang menjanjikan keuntungan tetap yang tidak masuk akal tanpa kejelasan usaha riil.',
      source: { label: 'HR. Muslim no. 1513 (Larangan Jual Beli Gharar)', href: 'https://sunnah.com/muslim:1513' },
    },
    {
      id: 'utang-piutang',
      title: 'Adab Utang Piutang & Gadai (Rahn)',
      category: 'Transaksi Harta',
      summary: 'Panduan syar’i mencatat utang, komitmen membayar, dan etika menagih utang.',
      points: [
        'Perintah mencatat transaksi utang dan menghadirkan saksi dalam ayat terpanjang Al-Qur’an (QS. Al-Baqarah: 282).',
        'Menunda pembayaran utang bagi orang yang mampu membayarnya adalah perbuatan zalim (HR. Bukhari no. 2287).',
        'Bila debitur benar-benar jatuh miskin/pailit, syariat memerintahkan memberi tenggang waktu atau menyedekahkan utang tersebut (QS. Al-Baqarah: 280).',
        'Akad Rahn (Gadai Syariah): jaminan barang atas utang yang sah, di mana barang gadai tidak boleh dimanfaatkan oleh pemberi pinjaman.',
      ],
      practice: 'Catat setiap utang piutang secara rinci (nominal, tanggal jatuh tempo) dan dahulukan melunasinya sebelum berbelanja non-primer.',
      source: quran('2/282'),
    },
    {
      id: 'akad-bisnis',
      title: 'Akad Kerjasama: Mudharabah, Musyarakah, & Ijarah',
      category: 'Kemitraan Bisnis',
      summary: 'Tiga pilar akad syariah untuk investasi, kongsi usaha, dan ketenagakerjaan.',
      points: [
        'Mudharabah: kemitraan antara pemilik modal (shahibul mal) dan pengelola keahlian (mudharib); keuntungan dibagi sesuai nisbah yang disepakati, kerugian finansial ditanggung pemilik modal selama bukan kelalaian pengelola.',
        'Musyarakah: kongsi modal di mana kedua pihak sama-sama menyetor modal dan kerja; keuntungan dibagi sesuai kesepakatan dan risiko kerugian sesuai porsi modal.',
        'Ijarah (Sewa & Upah Kerja): akad pemanfaatan jasa atau barang dengan kompensasi jelas.',
        'Kewajiban menunaikan upah pekerja tepat waktu: "Berikanlah pekerja upahnya sebelum keringatnya kering" (HR. Ibnu Majah no. 2443).',
      ],
      practice: 'Susun perjanjian bagi hasil dengan persentase proporsional (misal: 60:40) bukan nominal rupiah tetap per bulan.',
      source: hadith(2268),
    },
    {
      id: 'finansial-digital',
      title: 'Finansial Digital: Paylater, Pinjol, Cashback, & Kripto',
      category: 'Fikih Kontemporer',
      summary: 'Status hukum syariat pada produk teknologi finansial (Fintech) modern.',
      points: [
        'Paylater & Pinjol Konvensional: skema pinjaman berbunga (riba qardh) ditambah denda keterlambatan berlipat yang haram menurut fatwa ulama.',
        'Paylater Syariah: dibolehkan bila menggunakan akad murabahah (jual beli dengan margin jelas) atau ijarah, tanpa denda bunga berbunga.',
        'Cashback e-Wallet: jika saldo berasal dari titipan (wadi’ah), diskon atau cashback dianggap hadiah yang halal selama tidak dipersyaratkan mengendapkan dana berbunga.',
        'Mata Uang Kripto: Fatwa MUI dan NU menetapkan kripto haram sebagai mata uang legal (karena spekulasi tinggi & tanpa underlying asset), namun sebagian aset kripto bernilai komoditas utilitas masih dalam kajian perbedaan ijtihad.',
      ],
      practice: 'Gunakan pembayaran tunai atau debit langsung; hindari paylater berbunga yang menjebak konsumerisme.',
      source: { label: 'Fatwa DSN-MUI tentang Fintech Syariah', href: 'https://mui.or.id' },
    },
    {
      id: 'jual-beli-modern',
      title: 'Jual Beli Online: Dropshipping & Reseller',
      category: 'Fikih Kontemporer',
      summary: 'Batasan kepemilikan barang dan kejelasan akad dalam perniagaan e-commerce.',
      points: [
        'Larangan dasar: Rasulullah ﷺ melarang seseorang menjual barang yang belum dimilikinya (HR. Tirmidzi no. 1232).',
        'Skema Dropshipping yang Halal: dapat dilakukan melalui akad Wakalah bil Ujrah (menjadi agen perantara resmi penjual dengan komisi jelas), atau akad Salam (jual beli pesanan dengan spesifikasi jelas dan pembayaran tunai di muka).',
        'Reseller yang membeli putus barang lalu menyimpannya (qabdh) memiliki hak mutlak untuk menjual kembali dengan harga yang dikehendaki.',
        'Larangan memanipulasi ulasan palsu (fake review) dan fake order untuk menaikkan reputasi toko online.',
      ],
      practice: 'Jelaskan kondisi riil barang kepada pembeli secara jujur dan sediakan garansi retur jika barang tidak sesuai deskripsi.',
      source: { label: 'HR. Tirmidzi no. 1232 (Larangan Menjual Barang Sebelum Dimiliki)', href: 'https://sunnah.com/tirmidhi:1232' },
    },
  ],
};

export const makananHalal: Course = {
  id: 'makanan-halal',
  title: 'Fiqh Makanan, Minuman, & Thayyib',
  description: 'Panduan gaya hidup halal: kriteria hewan darat dan laut, sembelihan syar’i, bahaya khamr/narkoba, dan titik kritis produk pangan olahan.',
  note: 'Kaidah dasar makanan: "Al-ashlu fil ath’imah al-hillu illa ma dalla ad-dalilu ‘ala tahrimihi" (Hukum asal makanan adalah halal kecuali apa yang diharamkan oleh dalil). Disusun mengacu pada standar halal LPPOM MUI dan fikih mazhab Syafi’i.',
  lessons: [
    {
      id: 'halalan-thayyiban',
      title: 'Konsep Halalan Thayyiban',
      category: 'Prinsip Dasar',
      summary: 'Makanan seorang Muslim harus memenuhi dua kriteria: halal secara hukum syariat dan thayyib (sehat/bergizi).',
      points: [
        'Perintah Allah kepada seluruh manusia: "Wahai manusia! Makanlah dari (makanan) yang halal dan baik yang terdapat di bumi..." (QS. Al-Baqarah: 168).',
        'Halal zatnya: bukan barang najis, babi, bangkai, darah mengalir, atau racun berbahaya.',
        'Halal cara perolehannya: bukan hasil curian, korupsi, riba, atau pemerasan.',
        'Thayyib: bersih, higienis, bergizi, tidak basi, dan tidak menimbulkan alergi/bahaya bagi tubuh seseorang.',
      ],
      practice: 'Periksa label komposisi dan tanggal kedaluwarsa produk sebelum membeli untuk memastikan unsur thayyib.',
      source: quran('2/168'),
    },
    {
      id: 'hewan-darat',
      title: 'Kriteria Hewan Darat Halal & Haram',
      category: 'Kategori Makanan',
      summary: 'Membedakan hewan darat yang dihalalkan dan diharamkan untuk dikonsumsi.',
      points: [
        'Diharamkan dengan tegas dalam nash Al-Qur’an (QS. Al-Maidah: 3): bangkai, darah yang mengalir, daging babi, dan hewan yang disembelih atas nama selain Allah.',
        'Hewan buas bertaring yang memangsa dengan taringnya (singa, harimau, serigala, anjing) hukumnya haram (HR. Muslim no. 1932).',
        'Burung yang memiliki cakar tajam untuk mencengkeram mangsa (elang, rajawali) hukumnya haram.',
        'Hewan yang diperintahkan untuk dibunuh (ular, kalajengking, tikus) dan hewan yang dilarang dibunuh (semut, lebah, burung hud-hud) hukumnya haram dikonsumsi.',
        'Hewan Jallalah: hewan halal yang memakan kotoran; makruh/haram dikonsumsi sampai dikarantina dan diberi pakan bersih beberapa hari.',
      ],
      practice: 'Pastikan mengonsumsi daging ternak (sapi, kambing, ayam, unta) yang disembelih sesuai syariat.',
      source: quran('5/3'),
    },
    {
      id: 'hewan-air',
      title: 'Hewan Air & Bangkai Laut',
      category: 'Kategori Makanan',
      summary: 'Seluruh hewan air halal dikonsumsi tanpa kewajiban penyembelihan.',
      points: [
        'Rasulullah ﷺ bersabda tentang laut: "Airnya suci menyucikan dan bangkainya halal" (HR. Abu Dawud no. 83, Tirmidzi no. 69).',
        'Ikan, udang, kepiting, cumi-cumi, dan hasil laut pada umumnya halal dimakan tanpa perlu disembelih.',
        'Pengecualian: hewan air yang beracun, membahayakan kesehatan, atau hidup di dua alam yang diperselisihkan kehalalannya bila mengandung racun.',
        'Dua bangkai yang dihalalkan dalam Islam: bangkai ikan dan bangkai belalang (HR. Ibnu Majah no. 3314).',
      ],
      practice: 'Manfaatkan keanekaragaman hasil laut yang kaya gizi sebagai alternatif sumber protein halal.',
      source: { label: 'HR. Abu Dawud no. 83 (Air Laut Suci & Bangkainya Halal)', href: 'https://sunnah.com/abudawud:83' },
    },
    {
      id: 'sembelihan-syari',
      title: 'Tata Cara Penyembelihan Syar’i',
      category: 'Proses Halal',
      summary: 'Syarat sah penyembelihan hewan halal agar dagingnya tidak menjadi bangkai yang haram.',
      points: [
        'Penyembelih harus seorang Muslim atau Ahli Kitab yang berakal.',
        'Wajib menyebut nama Allah (Basmalah) saat menyembelih hewan.',
        'Menggunakan alat pemotong yang tajam (pisau/golok); dilarang menyembelih dengan gigi, kuku, atau tulang (HR. Bukhari no. 5498).',
        'Memotong tiga saluran sekaligus pada leher hewan: Hulqum (saluran napas), Mari’ (saluran makanan), dan Wadajain (dua urat nadi leher).',
        'Ihshan dalam menyembelih: menajamkan pisau, tidak mengasah pisau di depan hewan, dan tidak menyiksa hewan sebelum mati sempurna (HR. Muslim no. 1955).',
      ],
      practice: 'Periksa sertifikat Rumah Potong Hewan (RPH) bersertifikasi halal resmi BPJPH/MUI saat membeli daging segar.',
      source: hadith(5498),
    },
    {
      id: 'khamr-narkoba',
      title: 'Pengharaman Khamr, Alkohol, & Narkotika',
      category: 'Zat Berbahaya',
      summary: 'Larangan mutlak terhadap segala zat yang merusak akal pikiran dan kesadaran manusia.',
      points: [
        'Allah menegaskan bahwa khamr adalah perbuatan keji termasuk perbuatan setan yang wajib dijauhi (QS. Al-Maidah: 90).',
        'Kaidah Rasulullah ﷺ: "Kullu muskirin khamrun, wa kullu muskirin haraam" (Setiap yang memabukkan adalah khamr, dan setiap khamr adalah haram) (HR. Muslim no. 2003).',
        'Kadar sedikit maupun banyak: "Apa yang banyaknya memabukkan, maka sedikitnya pun haram" (HR. Abu Dawud no. 3681).',
        'Narkoba, ganja, sabu, ekstasi, dan zat adiktif perusak saraf dihukumi haram berdasarkan qiyas terhadap khamr dan larangan membinasakan diri sendiri (QS. Al-Baqarah: 195).',
      ],
      practice: 'Jauhi segala bentuk minuman beralkohol dan obat-obatan terlarang; jaga kejernihan akal untuk beribadah.',
      source: quran('5/90'),
    },
    {
      id: 'titik-kritis',
      title: 'Titik Kritis Produk Olahan & Sertifikasi Halal',
      category: 'Industri Pangan',
      summary: 'Mengenali bahan penolong dan bahan tambahan pangan yang rentan bersumber haram.',
      points: [
        'Gelatin: bahan pengenyal yang sering bersumber dari tulang/kulit babi atau sapi yang tidak disembelih syar’i.',
        'Emulsifier & Enzim (seperti Rennet pada keju): wajib dipastikan berasal dari tanaman atau hewan halal yang disembelih syar’i.',
        'Perisa (Flavor) & Pewarna Makanan: sebagian menggunakan pelarut turunan alkohol industri khamr.',
        'Pentingnya Sertifikasi Halal resmi (BPJPH/MUI): memastikan pengawasan hulu ke hilir (rantai pasok) bebas dari kontaminasi najis.',
      ],
      practice: 'Biasakan memeriksa logo Halal Indonesia resmi pada kemasan makanan olahan dan kosmetik.',
      source: { label: 'Panduan Titik Kritis Halal LPPOM MUI', href: 'https://halalmui.org' },
    },
  ],
};

export const medis: Course = {
  id: 'medis',
  title: 'Fiqh Medis & Kedokteran Kontemporer',
  description: 'Fatwa syariat kedokteran: ikhtiar pengobatan, kondisi darurat, donor darah & organ, hukum eutanasia, bayi tabung, dan otopsi jenazah.',
  note: 'Disusun sebagai pengantar berdasarkan fatwa Majelis Ulama Indonesia (MUI), International Islamic Fiqh Academy (IIFA), dan kaidah perlindungan jiwa (Hifzhun Nafs). Ringkasan ini bersifat edukatif, bukan diagnosis atau pengganti konsultasi dokter, apoteker, maupun ahli fikih untuk kasus tertentu.',
  lessons: [
    {
      id: 'ikhtiar-sehat',
      title: 'Kewajiban Berobat & Menjaga Jiwa (Hifzhun Nafs)',
      category: 'Prinsip Kedokteran',
      summary: 'Menjaga kesehatan dan berobat ketika sakit merupakan bagian dari ketaatan dan tawakal kepada Allah.',
      points: [
        'Rasulullah ﷺ bersabda: "Berobatlah wahai hamba-hamba Allah, karena sesungguhnya Allah tidak menurunkan suatu penyakit melainkan menurunkan pula obatnya..." (HR. Abu Dawud no. 3855).',
        'Menjaga kelestarian jiwa (Hifzhun Nafs) adalah salah satu dari lima tujuan utama syariat Islam (Maqashid asy-Syari’ah).',
        'Berobat tidak menafikan tawakal. Ikhtiar mencakup mencari pertolongan tenaga kesehatan yang kompeten, memahami pilihan yang tersedia, dan menjalankan terapi sesuai arahan klinis.',
        'Resolusi International Islamic Fiqh Academy membedakan hukum berobat menurut keadaan: dapat menjadi wajib bila meninggalkannya berisiko menyebabkan kematian, kehilangan fungsi organ, disabilitas, atau penularan penyakit; dianjurkan bila manfaatnya nyata tanpa risiko tersebut; boleh pada keadaan lain; dan dapat makruh bila risikonya lebih besar daripada penyakit yang hendak ditangani.',
        'Penilaian kebutuhan dan risiko adalah persoalan klinis. Diagnosis, prognosis, kemungkinan manfaat, efek samping, serta alternatif perlu dijelaskan oleh tenaga kesehatan kepada pasien.',
        'Pasien yang mampu mengambil keputusan berhak memberi persetujuan setelah memperoleh informasi. Pada keadaan gawat darurat, tindakan dapat mengikuti ketentuan darurat dan aturan medis yang berlaku.',
        'Ringkasan ini tidak menetapkan diagnosis atau menyuruh seseorang memulai, menghentikan, maupun mengubah obat. Keputusan perawatan dibahas dengan dokter atau tenaga kesehatan yang merawat.',
      ],
      practice: 'Jika sakit, cari evaluasi dari tenaga kesehatan yang kompeten. Tanyakan manfaat, risiko, alternatif, dan tanda bahaya; jangan menunda pertolongan darurat atau mengubah terapi sendiri.',
      source: { label: 'HR. Abu Dawud no. 3855 (Anjuran Berobat)', href: 'https://sunnah.com/abudawud:3855' },
      extraReferences: [
        { label: 'International Islamic Fiqh Academy — Resolution No. 67 (5/7), Medical Treatments', href: 'https://iifa-aifi.org/en/32451.html' },
      ],
    },
    {
      id: 'kaidah-darurat',
      title: 'Kaidah Darurat dalam Terapi & Obat-Obatan',
      category: 'Prinsip Kedokteran',
      summary: 'Keringanan syariat dalam penggunaan bahan medis ketika tidak ditemukan alternatif yang suci.',
      points: [
        'Kaidah Fiqhiyyah: "Adh-Dharuratu tubihu al-mahzhurat" (Keadaan darurat membolehkan hal-hal yang dilarang) (QS. Al-Baqarah: 173).',
        'Kaidah pembatas: "Adh-dharuratu tuqaddaru bi qadariha"—keringanan mengikuti kadar kebutuhan, bukan izin umum untuk memakai semua bahan atau produk yang statusnya belum jelas.',
        'Fatwa MUI No. 30 Tahun 2013 tentang Obat dan Pengobatan menetapkan bahan obat pada dasarnya harus suci dan halal. Penggunaan bahan haram/najis dapat dikecualikan pada darurat atau kebutuhan mendesak setara darurat yang mengancam jiwa, ketika belum ada bahan halal dan suci, serta ada rekomendasi tenaga medis kompeten dan tepercaya bahwa tidak tersedia obat halal.',
        'Karena itu, label "darurat" tidak ditetapkan sendiri hanya dari kandungan atau kabar di media sosial. Tenaga kesehatan menilai kebutuhan klinis dan alternatif; otoritas fatwa menjelaskan ketentuan syariat yang relevan.',
        'Jika alternatif halal dan suci yang sesuai tersedia, alasan keringanan perlu dinilai kembali. Bila keadaan berubah, keputusan terapi dibicarakan dengan dokter/apoteker; jangan menghentikan obat mendadak tanpa arahan klinis.',
        'Fatwa MUI juga membedakan penggunaan obat untuk pemakaian luar dan memberi ketentuan tersendiri. Rincian hukum bergantung pada bahan, cara penggunaan, kebutuhan medis, dan fatwa yang berlaku.',
      ],
      practice: 'Tanyakan kepada dokter atau apoteker apakah bahan dan status obat diketahui, apakah ada alternatif yang sesuai, serta risiko mengganti atau menunda terapi. Untuk penetapan hukum, rujuk fatwa MUI atau ahli fikih yang memahami masalah medis.',
      source: quran('2/173'),
      extraReferences: [
        { label: 'Fatwa MUI No. 30 Tahun 2013 tentang Obat dan Pengobatan', href: 'https://www.mui.or.id/public/storage/fatwa/3f2314eb32ba3e70fd431bc7a2b6101c-lampiran.pdf' },
      ],
    },
    {
      id: 'donor-darah-organ',
      title: 'Hukum Donor Darah dan Transplantasi Organ',
      category: 'Tindakan Medis',
      summary: 'Menyelamatkan nyawa pasien melalui transfusi darah dan transplantasi organ tubuh.',
      points: [
        'Donor Darah: hukumnya sunnah dan sangat dianjurkan, termasuk wujud nyata tolong-menolong dalam kebaikan dan menyelamatkan nyawa sesama manusia (QS. Al-Maidah: 32).',
        'Transplantasi Organ dari Donor Hidup: dibolehkan dengan syarat tidak menimbulkan kecacatan fatal bagi pendonor (misal: satu ginjal) dan dilakukan sukarela tanpa jual beli.',
        'Transplantasi dari Donor Jenazah: dibolehkan dengan wasiat sah pendonor semasa hidup atau izin ahli waris, setelah kematian dipastikan secara medis dan syar’i.',
        'Penjualan organ tubuh (komersialisasi organ) hukumnya haram mutlak, karena tubuh manusia adalah titipan Allah yang mulia dan bukan komoditas perniagaan.',
      ],
      practice: 'Daftarkan diri menjadi pendonor darah rutin di PMI sebagai sedekah jariyah penyelamat nyawa.',
      source: quran('5/32'),
    },
    {
      id: 'eutanasia',
      title: 'Pandangan Syariat tentang Eutanasia (Suntik Mati)',
      category: 'Tindakan Medis',
      summary: 'Hukum mengakhiri penderitaan pasien kritis dari sudut pandang hak hidup.',
      points: [
        'Eutanasia Aktif (sengaja menyuntikkan zat mematikan untuk mempercepat kematian pasien): hukumnya haram mutlak dan dikategorikan sebagai pembunuhan disengaja.',
        'Hanya Allah yang berhak menentukan batas ajal seseorang; penderitaan sakit merupakan sarana penggugur dosa bagi seorang mukmin (HR. Bukhari no. 5641).',
        'Eutanasia Pasif (menghentikan alat penopang kehidupan buatan / DNR): dibolehkan menurut fatwa ulama bila tim dokter ahli telah memastikan terjadinya Mati Batang Otak (brain death) yang ireversibel.',
        'Tindakan paliatif (meredakan nyeri dengan obat penahan sakit) dianjurkan agar pasien dapat menghembuskan napas terakhir dengan tenang.',
      ],
      practice: 'Dampingi keluarga yang sedang sakit kritis dengan talqin kalimat tauhid: "Laa ilaaha illallah."',
      source: hadith(5641),
    },
    {
      id: 'reproduksi-buatan',
      title: 'Bayi Tabung & Teknologi Reproduksi Buatan',
      category: 'Teknologi Medis',
      summary: 'Batas-batas syariat dalam ikhtiar memiliki keturunan melalui inseminasi dan IVF.',
      points: [
        'Bayi Tabung (IVF) Halal: apabila sperma berasal dari suami sah, sel telur dari istri sah, dan embrio ditanamkan ke dalam rahim istri pemilik sel telur tersebut selama ikatan perkawinan masih sah.',
        'Haram: menggunakan sperma donor laki-laki lain atau sel telur wanita lain (dihukumi syubhat zina dan merusak garis nasab).',
        'Sewa Rahim (Surrogate Mother): haram mutlak menurut fatwa DSN-MUI dan para ulama, karena menimbulkan kerancuan status keibuan dan sengketa nasab.',
        'Proses inseminasi setelah suami wafat atau bercerai hukumnya tidak boleh dilaksanakan.',
      ],
      practice: 'Pastikan memilih klinik fertilitas yang memiliki komitmen menjaga integritas syariat dan kemurnian nasab.',
      source: quran('23/5'),
    },
    {
      id: 'otopsi-bedah',
      title: 'Otopsi Jenazah & Pembedahan Medis',
      category: 'Tindakan Medis',
      summary: 'Menghormati kehormatan jenazah dan pengecualian untuk kepentingan peradilan dan ilmu.',
      points: [
        'Kaidah asal: Jenazah seorang mukmin wajib dihormati sebagaimana ketika ia masih hidup; merusak tulangnya sama dosanya dengan merusaknya saat hidup (HR. Abu Dawud no. 3207).',
        'Otopsi Forensik / Kehakiman: dibolehkan dalam kondisi darurat untuk mengungkap penyebab kematian tindak pidana kejahatan dan menegakkan keadilan.',
        'Otopsi Klinis / Pendidikan: dibolehkan dengan batasan ketat demi pengembangan ilmu kedokteran untuk menyelamatkan pasien hidup di masa depan, dengan meminimalkan sayatan.',
        'Kewajiban mengembalikan organ jenazah dan menjahitnya kembali secara rapi sebelum dimandikan dan dikuburkan dengan layak.',
      ],
      practice: 'Perlakukan jenazah dengan penuh takzim, kehati-hatian, dan doa ampunan.',
      source: { label: 'HR. Abu Dawud no. 3207 (Kehormatan Jenazah)', href: 'https://sunnah.com/abudawud:3207' },
    },
  ],
};


export const komparasi: Course = {
  id: 'komparasi',
  title: 'Studi Perbandingan Agama (Tauhid & Kenabian Isa AS)',
  description: 'Kajian ilmiah bukti keesaan Allah, kedudukan mulia Nabi Isa AS, komparasi teks Al-Qur’an dan Alkitab (Bibel Perjanjian Lama & Baru), sejarah Trinitas, serta nubuat Nabi Muhammad ﷺ.',
  note: 'Disusun secara objektif dan ilmiah berdasarkan teks Al-Qur’an, hadits shahih, kutipan ayat Alkitab (Bibel Terjemahan Baru LAI & naskah kuno), serta riset sarjana kristologi. Bertujuan memperkokoh aqidah tauhid sekaligus sarana dialog ilmiah lintas iman yang santun.',
  lessons: [
    {
      id: 'logika-tauhid',
      title: 'Logika Akal & Bukti Filosofis Keberadaan Allah',
      category: 'Tauhid & Logika',
      summary: 'Argumen kosmologis, keteraturan alam semesta, dan kemurnian konsep Tauhid (QS. Al-Ikhlas).',
      points: [
        'Burhan at-Tamanu’ (Argumen Keteraturan Alam): QS. Al-Anbiya: 22 menegaskan jika di langit dan bumi ada banyak tuhan, alam semesta pasti hancur berantakan karena konflik kehendak mutlak.',
        'Kalam Cosmological Argument: Alam semesta memiliki permulaan (Big Bang); segala yang bermula pasti memiliki Sang Khaliq yang Maha Awal (tanpa permulaan) dan Maha Kekal.',
        'QS. Al-Ikhlas sebagai Standar Uji Ketuhanan: Satu (Ahad), tempat bergantung segala makhluk (Ash-Shamad), tidak beranak dan tidak diperanakkan, serta tidak ada yang setara dengan-Nya.',
        'Tuhan sejati mustahil dibatasi dimensi ruang dan waktu, mustahil membutuhkan makan/tidur, dan tidak berhajat kepada bantuan makhluk-Nya.',
      ],
      practice: 'Tadabburi keteraturan orbit tata surya dan renungkan kesempurnaan makna QS. Al-Ikhlas.',
      source: quran('112/1'),
    },
    {
      id: 'kemuliaan-isa',
      title: 'Nabi Isa AS dalam Al-Qur’an: Mukjizat & Kerasulan',
      category: 'Kenabian Isa AS',
      summary: 'Islam memuliakan Nabi Isa AS sebagai Nabi Ulul Azmi dan menolak doktrin penuhanan beliau.',
      points: [
        'Kelahiran Mukjizat: Maryam adalah wanita suci pilihan yang melahirkan Nabi Isa tanpa campur tangan laki-laki atas kuasa kalimat "Kun fayakuun" (QS. Maryam: 16-35).',
        'Perumpamaan dengan Nabi Adam (QS. Ali ‘Imran: 59): Penciptaan Isa tanpa ayah sama seperti penciptaan Adam tanpa ayah dan tanpa ibu dari tanah; jika tanpa ayah menjadi tuhan, maka Adam lebih pantas.',
        'Mukjizat dengan Izin Allah (Bi-idznillah): Menyembuhkan orang buta, penyakit kusta, dan menghidupkan orang mati selalu ditegaskan terjadi "dengan izin Allah" (QS. Al-Ma’idah: 110).',
        'Penegasan Nabi Isa Sendiri dalam Al-Qur’an: "Sesungguhnya Allah adalah Tuhanku dan Tuhanmu, maka sembahlah Dia. Ini adalah jalan yang lurus" (QS. Ali ‘Imran: 51).',
      ],
      practice: 'Pahami bahwa mukjizat para nabi adalah bukti legalitas kenabian dari Allah, bukan bukti ketuhanan sang nabi.',
      source: quran('3/59'),
    },
    {
      id: 'tauhid-perjanjian-lama',
      title: 'Monoteisme Murni dalam Perjanjian Lama (Taurat/Tanakh)',
      category: 'Komparasi Alkitab',
      summary: 'Ayat-ayat Perjanjian Lama secara mutlak menegaskan bahwa Allah itu Esa dan tidak ada sekutu bagi-Nya.',
      points: [
        'Shema Yisrael (Ulangan 6:4): "Dengarlah, hai orang Israel: TUHAN itu Allah kita, TUHAN itu esa!" (Perintah teragung monoteisme para nabi Bani Israel).',
        'Allah Bukan Manusia (Bilangan 23:19): "Allah bukanlah manusia, sehingga Ia berdusta, bukan anak manusia, sehingga Ia menyesal."',
        'Penolakan Sekutu (Yesaya 45:5): "Akulah TUHAN dan tidak ada yang lain; kecuali Aku tidak ada Allah."',
        'Sepuluh Perintah Allah (Keluaran 20:3-5): Hukum pertama melarang keras menyembah tuhan lain dan larangan membuat patung/serupa apa pun untuk disembah.',
      ],
      practice: 'Catat keselarasan mutlak antara ajaran tauhid para nabi Perjanjian Lama dengan ajaran Islam.',
      source: { label: 'Alkitab — Ulangan 6:4 (Shema: Tuhan itu Esa)', href: 'https://alkitab.sabda.org/verse.php?book=Ul&chapter=6&verse=4' },
    },
    {
      id: 'yesus-bukan-tuhan-injil',
      title: 'Pengakuan Terbuka Yesus dalam Perjanjian Baru (Injil)',
      category: 'Komparasi Alkitab',
      summary: 'Yesus sendiri di dalam Injil menyatakan bahwa ia adalah utusan Allah, dan Allah adalah satu-satunya Tuhan.',
      points: [
        'Yohanes 17:3 (Doa Yesus): "Inilah hidup yang kekal itu, yaitu bahwa mereka mengenal Engkau, satu-satunya Allah yang benar, dan mengenal Yesus Kristus yang telah Engkau utus."',
        'Markus 12:29: Saat ditanya hukum yang paling terutama, Yesus mengulang Shema: "Dengarlah, hai orang Israel, Tuhan Allah kita, Tuhan itu esa."',
        'Yohanes 20:17: Yesus berkata: "Aku akan pergi kepada Bapa-Ku dan Bapamu, kepada Allah-Ku dan Allahmu." (Yesus mengakui Allah sebagai Tuhannya).`',
        'Yohanes 5:30: Yesus menegaskan: "Aku tidak dapat berbuat apa-apa dari diri-Ku sendiri; Aku menghakimi sesuai dengan apa yang Aku dengar..."',
      ],
      practice: 'Gunakan dalil teks biblika ini secara santun dan ilmiah saat berdialog dengan rekan non-Muslim.',
      source: { label: 'Alkitab — Yohanes 17:3 (Yesus Mengakui Satu-Satunya Allah)', href: 'https://alkitab.sabda.org/verse.php?book=Yoh&chapter=17&verse=3' },
    },
    {
      id: 'kemanusiaan-yesus',
      title: 'Sifat Kemanusiaan Yesus yang Mustahil bagi Tuhan',
      category: 'Komparasi Alkitab',
      summary: 'Keterbatasan fisik, kebutuhan biologis, dan keterbatasan pengetahuan Yesus membuktikan kodratnya sebagai nabi/manusia.',
      points: [
        'Yesus Bersujud dan Berdoa: Matius 26:39 mencatat Yesus merebahkan diri ke tanah (bersujud) dan berdoa memohon pertolongan kepada Allah.',
        'Yesus Merasa Lapar dan Haus: Matius 21:18 dan Yohanes 19:28 mencatat kebutuhan biologis manusiawi yang mustahil ada pada Tuhan Yang Maha Kuasa dan Maha Mandiri.',
        'Keterbatasan Pengetahuan Hari Kiamat: Markus 13:32 menegaskan Yesus tidak tahu kapan kiamat tiba: "Tentang hari atau saat itu tidak seorang pun yang tahu, malaikat di sorga tidak, Anak pun tidak, hanya Bapa saja."',
        'Yesus Bertambah Hikmat: Lukas 2:52 menyatakan Yesus bertambah besar dan bertambah hikmatnya (Tuhan mustahil berkembang dari tidak tahu menjadi tahu).',
      ],
      practice: 'Jelaskan dengan akal sehat bahwa sifat butuh makan, letih, dan tidak tahu adalah sifat makhluk, bukan sifat Sang Khaliq.',
      source: { label: 'Alkitab — Markus 13:32 (Yesus Tidak Tahu Hari Kiamat)', href: 'https://alkitab.sabda.org/verse.php?book=Mrk&chapter=13&verse=32' },
    },
    {
      id: 'sejarah-trinitas',
      title: 'Sejarah Doktrin Trinitas & Konsili Nicea 325 M',
      category: 'Sejarah Dogma',
      summary: 'Penetapan ketuhanan Yesus merupakan hasil kompromi politik gereja berabad-abad setelah Nabi Isa tiada.',
      points: [
        'Konsili Nicea (325 M): Doktrin ketuhanan Yesus diputuskan melalui pemungutan suara atas desakan Kaisar Romawi pagan Konstantinus untuk menyatukan imperiumnya.',
        'Debat Teologi Arianisme: Uskup Arius mempertahankan tauhid asli bahwa Yesus adalah makhluk ciptaan Allah, berhadapan dengan Athanasius.',
        'Konsili Konstantinopel (381 M): Doktrin ketuhanan Roh Kudus baru ditetapkan 56 tahun kemudian untuk menyempurnakan konsep Tritunggal.',
        'Pemalsuan Teks Comma Johanneum (1 Yohanes 5:7-8): Kalimat "Bapa, Firman, dan Roh Kudus ketiganya adalah satu" terbukti merupakan sisipan palsu abad pertengahan dan telah dihapus oleh para sarjana di versi Alkitab modern (NIV, RSV, Alkitab TB2).',
      ],
      practice: 'Pelajari sejarah pembentukan dogma gereja secara kritis melalui literatur sejarah netral.',
      source: quran('5/73'),
    },
    {
      id: 'nubuat-muhammad',
      title: 'Nubuat Nabi Terakhir (Muhammad ﷺ) dalam Alkitab',
      category: 'Nubuat Kenabian',
      summary: 'Isyarat kedatangan Nabi Terakhir yang tertulis dalam lembaran Taurat dan Injil.',
      points: [
        'Al-Qur’an menegaskan: Nabi Muhammad ﷺ tertulis di dalam kitab Taurat dan Injil yang ada pada kaum Ahli Kitab (QS. Al-A’raf: 157 & QS. Ash-Shaff: 6).',
        'Ulangan 18:18 (Taurat Musa): Allah berfirman: "Seorang nabi akan Kubangkitkan bagi mereka dari antara saudara mereka, seperti engkau; Aku akan menaruh firman-Ku dalam mulutnya..." (Bani Ismail adalah saudara sepupu Bani Israel; Nabi Muhammad seperti Musa membawa syariat lengkap, beristri, dan memimpin negara).',
        'Yesaya 21:13-17: Nubuat tentang "Ucapan ilahi terhadap Arabia" dan lolos dari pedang terhunus (merujuk pada hijrah ke Madinah/Kedar).',
        'Yohanes 14:16 & 16:7-13: Yesus mengabarkan Parakletos (Penolong/Roh Kebenaran) yang "tidak akan berkata-kata dari diri-Nya sendiri, tetapi segala sesuatu yang didengar-Nya itulah yang akan dikatakan-Nya" (sesuai cara turunnya wahyu Al-Qur’an).',
      ],
      practice: 'Jadikan kajian nubuat ini sarana menguatkan keyakinan iman atas kebenaran risalah Islam.',
      source: quran('7/157'),
    },
    {
      id: 'adab-dialog',
      title: 'Adab & Metode Ilmiah Berdialog dengan Ahli Kitab',
      category: 'Metode Dialog',
      summary: 'Panduan Al-Qur’an dalam menyampaikan dakwah tauhid dengan hikmah, data, dan cara yang terbaik.',
      points: [
        'Berdialog dengan Cara Terbaik: "Dan janganlah kamu berdebat dengan Ahli Kitab, melainkan dengan cara yang paling baik..." (QS. Al-Ankabut: 46).',
        'Mengajak ke Titik Temu (Kalimatun Sawa’): "Katakanlah: ‘Wahai Ahli Kitab! Marilah kepada satu kalimat yang sama antara kami dan kamu, bahwa kita tidak menyembah selain Allah...’" (QS. Ali ‘Imran: 64).',
        'Hormati Kebebasan Beragama: "Tidak ada paksaan dalam menganut agama Islam" (QS. Al-Baqarah: 256) dan larangan mencela sesembahan orang lain (QS. Al-An’am: 108).',
        'Fokus pada Pembuktian Teks & Akal Sehat: Berdialog tanpa kebencian emosional, melainkan dengan data kitab suci dan niat tulus menyebarkan kebenaran.',
      ],
      practice: 'Saat berdiskusi dengan non-Muslim, kedepankan akhlak mulia dan dengarkan argumen mereka sebelum menyajikan dalil.',
      source: quran('3/64'),
    },
  ],
};


export const sains: Course = {
  id: 'sains',
  title: 'Mukjizat Al-Qur’an, Sains Modern, & Hukum Alam (Sunnatullah)',
  description: 'Kajian ayat kauniyah: hukum alam (Sunnatullah), teori relativitas waktu, kosmologi Big Bang, pemuaian alam semesta, embriologi, siklus air, dan keseimbangan ekosistem.',
  note: 'Disusun berdasarkan ayat-ayat kauniyah Al-Qur’an dan temuan sains fisika, astronomi, dan biologi modern yang telah mapan. Bertujuan mempertebal keimanan rasional bahwa Al-Qur’an adalah wahyu otentik dari Sang Pencipta alam semesta.',
  lessons: [
    {
      id: 'sunnatullah-hukum-alam',
      title: 'Konsep Sunnatullah: Kepastian & Konsistensi Hukum Alam',
      category: 'Hukum Alam (Sunnatullah)',
      summary: 'Alam semesta bekerja berdasarkan hukum sebab-akibat (Sunnatullah) yang teratur, terukur, dan tidak berubah-ubah secara acak.',
      points: [
        'Konsistensi Hukum Alam: "Maka kamu sekali-kali tidak akan menemui perubahan pada sunnah (hukum) Allah, dan tidak pula akan menemui penyimpangan pada sunnah Allah itu" (QS. Fathir: 43).',
        'Ukuran dan Presisi Matematis: "Sesungguhnya Kami menciptakan segala sesuatu menurut ukuran yang pasti" (QS. Al-Qamar: 49) — selaras dengan prinsip Fine-Tuned Universe dalam fisika modern.',
        'Prinsip Kausalitas (Sebab-Akibat): Alam semesta dapat dipelajari, dihitung, dan dimanfaatkan teknologi karena keteraturannya yang objektif.',
        'Mukjizat (Khariqul ‘Adah): Peristiwa luar biasa yang melampaui kebiasaan alam atas kehendak langsung Sang Pencipta hukum alam itu sendiri.',
      ],
      practice: 'Renungkan bagaimana keteraturan hukum gravitasi, rotasi bumi, dan reaksi kimia memungkinkan kehidupan manusia berlangsung aman.',
      source: quran('35/43'),
    },
    {
      id: 'relativitas-waktu',
      title: 'Teori Relativitas Waktu dalam Al-Qur’an',
      category: 'Fisika & Kosmologi',
      summary: 'Konsep pemuaian waktu (time dilation) yang diungkap Al-Qur’an 14 abad sebelum Albert Einstein.',
      points: [
        'Relativitas Kerangka Acuan Waktu: "Dan sesungguhnya sehari di sisi Tuhanmu adalah seperti seribu tahun menurut perhitunganmu" (QS. Al-Hajj: 47 & QS. As-Sajdah: 5).',
        'Kecepatan Cahaya & Dilasi Waktu Malaikat: "Malaikat-malaikat dan Jibril naik (menghadap) kepada Tuhan dalam sehari yang kadarnya lima puluh ribu tahun" (QS. Al-Ma’arij: 4). Malaikat diciptakan dari cahaya (nur); semakin mendekati kecepatan cahaya, waktu melambat drastis.',
        'Relativitas Persepsi Waktu Ashabul Kahfi: Pemuda gua tertidur selama 309 tahun di bumi, namun persepsi biologis mereka merasa hanya tidur sehari atau setengah hari (QS. Al-Kahf: 19).',
        'Waktu bukanlah entitas mutlak, melainkan dimensi relatif yang terikat oleh ruang, massa, dan kecepatan.',
      ],
      practice: 'Tadabburi bahwa waktu dunia yang fana ini sangat singkat bila dibandingkan dengan dimensi akhirat.',
      source: quran('70/4'),
    },
    {
      id: 'bigbang-ekspansi',
      title: 'Dentuman Besar (Big Bang) & Alam Semesta Mengembang',
      category: 'Fisika & Kosmologi',
      summary: 'Awal mula penciptaan alam semesta dari titik singularitas yang padu dan ekspansi ruang kosmis.',
      points: [
        'Pemisahan Langit dan Bumi: "Dan apakah orang-orang kafir tidak mengetahui bahwa langit dan bumi dahulunya adalah suatu yang padu (ratqan), kemudian Kami pisahkan antara keduanya (fataqnahuma)..." (QS. Al-Anbiya: 30) — selaras dengan teori singularitas Big Bang.',
        'Alam Semesta yang Terus Meluas (Expanding Universe): "Dan langit itu Kami bangun dengan kekuasaan Kami dan sesungguhnya Kami benar-benar meluaskannya (lamuusi’uun)" (QS. Adz-Dzariyat: 47).',
        'Fakta Astronomi: Edwin Hubble (1929) dan teleskop antariksa James Webb membuktikan galaksi-galaksi saling menjauh dan alam semesta terus mengembang.',
        'Asap Awal Kosmis (Nebula/Cosmic Dust): "Kemudian Dia menuju kepada penciptaan langit dan langit itu masih merupakan asap (dukhan)..." (QS. Fushshilat: 11).',
      ],
      practice: 'Sadari betapa kerdilnya ukuran manusia di hadapan luasnya alam semesta ciptaan Allah yang terus meluas.',
      source: quran('51/47'),
    },
    {
      id: 'orbit-gravitasi',
      title: 'Garis Edar, Gravitasi, & Keseimbangan Benda Langit',
      category: 'Fisika & Kosmologi',
      summary: 'Keteraturan orbit planet, matahari, dan bulan di dalam ruang lengkung gravitasi.',
      points: [
        'Garis Edar Tertentu (Falak): "Dan Dialah yang telah menciptakan malam dan siang, matahari dan bulan. Masing-masing beredar pada garis edarnya (yasbahuun)" (QS. Al-Anbiya: 33).',
        'Matahari Tidak Diam: "Dan matahari berjalan di tempat peredarannya. Demikianlah ketetapan Yang Maha Perkasa lagi Maha Mengetahui" (QS. Yasin: 38) — astronomi membuktikan matahari bergerak mengelilingi pusat galaksi Bima Sakti dengan kecepatan ~220 km/detik.',
        'Pilar Gravitasi yang Tak Kasatmata: "Allah yang meninggikan langit tanpa tiang (sebagaimana) yang kamu lihat..." (QS. Ar-Ra’d: 2 & QS. Luqman: 10) — merujuk pada gaya gravitasi yang menjaga stabilitas orbit benda langit.',
        'Atmosfer Sebagai Pelindung: "Dan Kami menjadikan langit sebagai atap yang terpelihara (mahfuzha)..." (QS. Al-Anbiya: 32) — melindungi bumi dari meteor, radiasi sinar kosmis, dan sinar ultraviolet berbahaya.',
      ],
      practice: 'Perhatikan keteraturan pergantian siang dan malam serta pergerakan bulan sebagai penentu kalender Hijriah.',
      source: quran('21/33'),
    },
    {
      id: 'besi-supernova',
      title: 'Besi dari Luar Angkasa (Supernova Extraterrestrial Iron)',
      category: 'Geologi & Kimia',
      summary: 'Asal-usul logam besi yang diturunkan ke bumi melalui ledakan bintang raksasa (supernova).',
      points: [
        'Lafaz "Kami Turunkan": "Dan Kami turunkan besi (wa anzalnal hadiida) yang padanya terdapat kekuatan yang hebat dan berbagai manfaat bagi manusia..." (QS. Al-Hadid: 25).',
        'Fakta Astrofisika: Energi di tata surya/bumi tidak cukup untuk membentuk inti atom besi (Fe); besi hanya dapat terbentuk di inti bintang raksasa dengan temperatur ratusan juta derajat yang meledak (supernova) lalu menghujani bumi purba.',
        'Manfaat Inti Besi Bumi: Inti besi cair bumi menghasilkan medan magnet (magnetosfer) yang melindungi atmosfer bumi dari badai angin matahari (solar wind).',
        'Korelasi Nomor Surah: Surah Al-Hadid adalah surah ke-57. Isotop besi yang stabil di alam memiliki massa atom 57 (Fe-57), dan nomor atom besi adalah 26 (sama dengan nilai numerik kata "Hadid" tanpa alif-lam).',
      ],
      practice: 'Syukuri nikmat logam besi yang menjadi tulang punggung infrastruktur, transportasi, dan peradaban manusia.',
      source: quran('57/25'),
    },
    {
      id: 'siklus-air',
      title: 'Siklus Hidrologi & Pembentukan Awan Hujan',
      category: 'Meteorologi & Bumi',
      summary: 'Tahapan ilmiah siklus penguapan air, pembentukan awan kumulonimbus, dan presipitasi hujan.',
      points: [
        'Tahapan Lengkap Hujan: QS. Ar-Rum: 48 dan QS. An-Nur: 43 merinci urutan angin penggerak, penggumpalan awan, tumpukan awan tinggi (kumulonimbus), hingga turunnya butiran hujan dari sela-selanya.',
        'Angin yang Mengawinkan (Penyerbukan & Kondensasi): "Dan Kami telah meniupkan angin untuk mengawinkan (lawāqih) dan Kami turunkan hujan dari langit..." (QS. Al-Hijr: 22) — angin mengawinkan serbuk sari tanaman sekaligus membawa inti kondensasi (garam/debu) pembentuk tetes awan.',
        'Siklus Air Bawah Tanah: "Apakah kamu tidak memperhatikan bahwa sesungguhnya Allah menurunkan air dari langit, lalu diaturnya menjadi sumber-sumber air di bumi..." (QS. Az-Zumar: 21) — membantah teori kuno Aristoteles yang mengira air tanah berasal dari uap laut bawah tanah.',
      ],
      practice: 'Hemat penggunaan air bersih sebagai bentuk rasa syukur atas siklus hidrologi yang menjaga kelangsungan hidup.',
      source: quran('39/21'),
    },
    {
      id: 'embriologi-janin',
      title: 'Embriologi & Tahapan Pertumbuhan Janin Manusia',
      category: 'Biologi Kedokteran',
      summary: 'Rincian fase perkembangan embrio manusia di dalam rahim ibu yang diakui pakar anatomi dunia.',
      points: [
        'Tahapan Perkembangan Janin (QS. Al-Mu’minun: 12-14): Dimulai dari Nuthfah (sari pati mani), ‘Alaqah (segumpal darah yang menempel seperti lintah), Mudghah (segumpal daging bertanda kunyahan), pembentukan tulang (‘Izham), lalu tulang dibungkus daging (Lahm).',
        'Tiga Lapisan Kegelapan: "Dia menjadikan kamu dalam perut ibumu kejadian demi kejadian dalam tiga kegelapan..." (QS. Az-Zumar: 6) — merujuk pada dinding perut ibu, dinding rahim, dan selaput ketuban (amniotik).',
        'Kesaksian Prof. Keith L. Moore (Pakar Anatomi & Embriologi Universitas Toronto): Menyatakan istilah ‘Alaqah (menempel seperti lintah dan menyerap nutrisi) sangat akurat mendeskripsikan wujud embrio usia 24 hari yang mustahil diketahui manusia abad ke-7 tanpa mikroskop canggih.',
      ],
      practice: 'Renungkan keajaiban penciptaan tubuh manusia sejak setetes cairan hingga menjadi makhluk sempurna yang berakal.',
      source: quran('23/12'),
    },
    {
      id: 'lautan-halocline',
      title: 'Pertemuan Dua Lautan Tanpa Bercampur (Halocline/Barzakh)',
      category: 'Oseanografi',
      summary: 'Fenomena batas pemisah alami antara dua massa air laut yang berbeda salinitas dan massa jenis.',
      points: [
        'Dua Lautan Berdampingan: "Dia membiarkan dua lautan mengalir yang keduanya kemudian bertemu. Antara keduanya ada batas (barzakh) yang tidak dilampaui oleh masing-masing" (QS. Ar-Rahman: 19-20).',
        'Pertemuan Air Asin dan Tawar: "Dan Dialah yang membiarkan dua laut mengalir berdampingan; yang ini tawar lagi segar dan yang lain asin lagi pahit; dan Dia jadikan antara keduanya dinding dan batas yang menghalangi" (QS. Al-Furqan: 53).',
        'Fakta Oseanografi: Terlihat nyata pada pertemuan Selat Gibraltar (Samudra Atlantik & Laut Mediterania) serta muara sungai besar; perbedaan salinitas, densitas (massa jenis), dan tegangan permukaan menciptakan lapisan batas (halocline/pycnocline) sehingga air tidak langsung bercampur homogen.',
      ],
      practice: 'Tadabburi bagaimana hukum fisika fluida menjaga keanekaragaman ekosistem biota laut di perairan yang berbeda.',
      source: quran('55/19'),
    },
    {
      id: 'ekologi-lingkungan',
      title: 'Keseimbangan Ekologi & Larangan Kerusakan Bumi',
      category: 'Ekologi & Lingkungan',
      summary: 'Peran manusia sebagai khalifah penjaga keseimbangan alam dan peringatan krisis iklim.',
      points: [
        'Peringatan Kerusakan Ekosistem: "Telah tampak kerusakan di darat dan di laut disebabkan karena perbuatan tangan manusia, supaya Allah merasakan kepada mereka sebahagian dari (akibat) perbuatan mereka..." (QS. Ar-Rum: 41) — penjelasan ilmiah tentang deforestasi, pencemaran laut, dan pemanasan global.',
        'Larangan Merusak Bumi: "Dan janganlah kamu berbuat kerusakan di bumi setelah (diciptakan) dengan baik..." (QS. Al-A’raf: 56).',
        'Keseimbangan Alam (Al-Mizan): "Dan langit telah ditinggikan-Nya dan Dia ciptakan keseimbangan (neraca). Agar kamu jangan merusak keseimbangan itu" (QS. Ar-Rahman: 7-9).',
        'Adab Konservasi Alam Rasulullah ﷺ: Melarang menebang pohon tanpa hak, melarang mengotori sumber air, dan menganjurkan menanam pohon meskipun esok kiamat (HR. Ahmad no. 12902).',
      ],
      practice: 'Amalkan gaya hidup ramah lingkungan: kurangi sampah plastik, hemat energi, dan rawat tanaman di sekitar rumah.',
      source: quran('30/41'),
    },
  ],
};


export const aqidah: Course = {
  id: 'aqidah',
  title: 'Aqidah Islam & Eskatologi Hari Akhir',
  description: 'Fondasi rukun iman: Tauhid Rububiyah, Uluhiyah, Asma’ wa Sifat, alam malaikat & ghaib, takdir, tanda-tanda kiamat kubra, alam barzakh, hisab, mizan, sirath, hingga surga dan neraka.',
  note: 'Disusun mengacu pada pokok aqidah Ahlus Sunnah wal Jama’ah berdasarkan dalil Al-Qur’an dan hadits shahih. Bertujuan memantapkan keyakinan hati (iman) dan kesiapan spiritual menghadapi kehidupan abadi di akhirat.',
  lessons: [
    {
      id: 'hakikat-iman-tauhid',
      title: 'Hakikat Iman & Tiga Dimensi Tauhid',
      category: 'Pilar Tauhid',
      summary: 'Fondasi keimanan yang mencakup keyakinan hati, ikrar lisan, dan pembuktian amal, serta pemurnian ibadah hanya kepada Allah.',
      points: [
        'Definisi Iman: keyakinan dalam hati (tashdiiq bil qalb), diucapkan dengan lisan (iqraar bil lisaan), dan dibuktikan dengan anggota badan (‘amal bil arkaan).',
        'Tauhid Rububiyah: meyakini secara mutlak bahwa Allah adalah satu-satunya Pencipta, Pemelihara, Pengatur, dan Pemilik alam semesta (QS. Al-Fatihah: 2).',
        'Tauhid Uluhiyah: mengesakan Allah dalam segala bentuk peribadahan (doa, shalat, sembelihan, nazar, tawakal); tidak menyembah selain-Nya (QS. An-Nahl: 36).',
        'Tauhid Asma’ wa Sifat: mengimani nama-nama dan sifat-sifat Allah yang mulia sebagaimana termaktub dalam Al-Qur’an dan Sunnah tanpa tahrif (mengubah), ta’thil (mengingkari), takyif (menanyakan bagaimana hakikatnya), atau tamtsil (menyerupakan dengan makhluk) (QS. Asy-Syura: 11).',
      ],
      practice: 'Perbarui kalimat tauhid setiap hari: "Laa ilaaha illallah wahdahu laa syariika lah, lahul mulku wa lahul hamdu wa huwa ‘ala kulli syai’in qadiir."',
      source: quran('16/36'),
    },
    {
      id: 'syirik-pembatal-iman',
      title: 'Bahaya Syirik & Perusak Keimanan',
      category: 'Pilar Tauhid',
      summary: 'Mengenal dosa syirik yang menghapuskan seluruh amal kebaikan dan menjerumuskan ke neraka.',
      points: [
        'Dosa Terbesar yang Tidak Diampuni: Allah tidak mengampuni dosa syirik jika pelakunya mati sebelum bertaubat (QS. An-Nisa: 48).',
        'Syirik Akbar (Besar): memalingkan ibadah kepada selain Allah (menyembah patung/kuburan, meminta berkah gaib kepada jin/arwah, sihir, perdukunan).',
        'Syirik Ashghar (Kecil): perbuatan yang dapat mengantarkan pada syirik besar, seperti Riya’ (beramal demi pujian manusia) dan sum’ah (HR. Ahmad no. 23630).',
        'Takhayul & Jimat (Tamimah): mempercayai ramalan bintang/zodiak, kesialan hari/angka (thiyarah), atau menggantungkan jimat penolak bala yang dilarang keras oleh Nabi ﷺ.',
      ],
      practice: 'Ikhlaskan niat semata-mata karena Allah dalam setiap sujud, sedekah, dan kebaikan harian.',
      source: quran('4/48'),
    },
    {
      id: 'malaikat-alam-ghaib',
      title: 'Iman kepada Malaikat & Hakikat Alam Ghaib',
      category: 'Rukun Iman',
      summary: 'Mengenal makhluk mulia yang senantiasa taat beribadah dan batas syariat seputar dunia gaib.',
      points: [
        'Karakteristik Malaikat: diciptakan dari cahaya (nur), tidak makan, tidak minum, tidak berjenis kelamin, dan tidak pernah bermaksiat kepada Allah (QS. At-Tahrim: 6).',
        'Tugas Malaikat Utama: Jibril (menyampaikan wahyu), Mikail (mengatur hujan & rezeki), Israfil (meniup sangkakala), Izrail/Malakul Maut (mencabut nyawa), Munkar & Nakir (menanyai di kubur), Raqib & ‘Atid (mencatat amal), Malik (penjaga neraka), dan Ridwan (penjaga surga).',
        'Alam Jin dan Iblis: makhluk berakal yang diciptakan dari nyala api (nar), memiliki taklif syariat (ada yang mukmin dan ada yang kafir/setan).',
        'Ruqyah Syar’iyyah vs Sihir: perlindungan diri dengan ayat Al-Qur’an (Al-Fatihah, Ayat Kursi, Al-Mu’awwidzatain) dibolehkan; bersekutu dengan jin atau dukun hukumnya kufur.',
      ],
      practice: 'Baca dzikir pagi dan petang serta Ayat Kursi sebelum tidur sebagai benteng perlindungan malaikat dari gangguan setan.',
      source: quran('66/6'),
    },
    {
      id: 'kitab-rasul',
      title: 'Iman kepada Kitab-Kitab Allah & Para Rasul',
      category: 'Rukun Iman',
      summary: 'Mata rantai wahyu ilahi dan teladan manusia pilihan sepanjang sejarah peradaban.',
      points: [
        'Kitab-Kitab Suci Samawi: Taurat (diturunkan kepada Nabi Musa), Zabur (Nabi Dawud), Injil (Nabi Isa), dan Al-Qur’an (Nabi Muhammad ﷺ).',
        'Al-Qur’an Sebagai Muhaimin (Penyempurna & Penjaga): membenarkan intisari kitab terdahulu sekaligus menjadi pedoman abadi yang terjaga dari pemalsuan hingga akhir zaman (QS. Al-Hijr: 9).',
        'Para Rasul Utusan Allah: manusia laki-laki terbaik yang ma’shum (terpelihara dari dosa besar) yang diutus mengajak umatnya mentauhidkan Allah.',
        'Ulul Azmi: lima nabi yang memiliki keteguhan luar biasa menghadapi ujian berat (Nabi Nuh, Ibrahim, Musa, Isa, dan Muhammad ﷺ).',
      ],
      practice: 'Jadikan Al-Qur’an sebagai kompas moral utama dan ikuti sunnah Rasulullah ﷺ dalam kehidupan sehari-hari.',
      source: quran('5/48'),
    },
    {
      id: 'qadha-qadar',
      title: 'Memahami Takdir (Qadha & Qadar) dengan Benar',
      category: 'Rukun Iman',
      summary: 'Keseimbangan antara kehendak mutlak Allah, hukum sebab-akibat, dan tanggung jawab ikhtiar manusia.',
      points: [
        'Empat Tingkatan Takdir (Maratib al-Qadar): Al-‘Ilm (pengetahuan Allah yang mendahului segala sesuatu), Al-Kitabah (pencatatan di Lauhul Mahfuzh), Al-Masyi’ah (kehendak Allah yang pasti terjadi), dan Al-Khalq (Allah menciptakan perbuatan tersebut).',
        'Ketiadaan Kontradiksi antara Ikhtiar dan Takdir: manusia diberi akal dan kehendak bebas untuk memilih taat atau maksiat, sehingga manusia bertanggung jawab penuh atas amalnya.',
        'Takdir Bukan Alasan Bermalas-malasan: "Beramallah kalian, sebab masing-masing akan dimudahkan menuju apa yang diciptakan untuknya" (HR. Bukhari no. 4949).',
        'Buah Iman kepada Takdir: melahirkan ketenangan jiwa (tidak sombong saat sukses, tidak putus asa saat tertimpa musibah) (QS. Al-Hadid: 22-23).',
      ],
      practice: 'Ucapkan "Qaddarallahu wa maa sya’a fa’ala" (Allah telah mentakdirkan dan apa yang Dia kehendaki pasti terjadi) saat menghadapi kegagalan di luar kendali.',
      source: quran('57/22'),
    },
    {
      id: 'sakaratul-alam-kubur',
      title: 'Sakaratul Maut & Alam Barzakh',
      category: 'Eskatologi',
      summary: 'Fase perpindahan ruh dari alam fana menuju alam penantian panjang sebelum kiamat.',
      points: [
        'Sakaratul Maut: detik-detik terpisahnya ruh dari raga yang dialami setiap makhluk (QS. Qaf: 19); doa memohon husnul khatimah.',
        'Alam Barzakh (Dinding Pemisah): alam penantian antara kematian dunia dan hari kebangkitan kiamat (QS. Al-Mu’minun: 100).',
        'Fitnah Kubur: pertanyaan tiga perkara oleh malaikat Munkar dan Nakir: "Man Rabbuka? (Siapa Tuhanmu?), Maa Diinuka? (Apa agamamu?), dan Man Nabiyyuka? (Siapa Nabimu?)."',
        'Nikmat dan Siksa Kubur: kenikmatan taman surga bagi orang beriman dan siksaan bagi orang kafir serta pelaku dosa besar (seperti namimah/adu domba dan tidak menjaga kesucian buang air kecil) (HR. Bukhari no. 216).',
      ],
      practice: 'Rutin membaca doa tasyahud akhir memohon perlindungan dari empat perkara: azab jahanam, azab kubur, fitnah kehidupan & kematian, serta fitnah Dajjal.',
      source: hadith(1377),
    },
    {
      id: 'tanda-kiamat',
      title: 'Tanda-Tanda Kiamat Kecil & Besar',
      category: 'Eskatologi',
      summary: 'Isyarat kenabian tentang dekatnya akhir zaman dan huru-hara menjelang kehancuran jagat raya.',
      points: [
        'Tanda Kiamat Kecil (Shughra): diutus dan wafatnya Nabi Muhammad ﷺ, merebaknya perzinahan dan riba, perlombaan mendirikan gedung-gedung pencakar langit, serta dicabutnya ilmu dengan wafatnya para ulama.',
        'Sepuluh Tanda Kiamat Besar (Kubra) (HR. Muslim no. 2901): kemunculan Dajjal (fitnah terbesar sepanjang sejarah), turunnya Nabi Isa AS untuk menegakkan keadilan dan membunuh Dajjal, keluarnya Ya’juj dan Ma’juj.',
        'Tanda Pemungkas: tiga kali peristiwa amblasnya bumi (di timur, barat, dan jazirah Arab), munculnya kabut tebal (Dukhan), terbitnya matahari dari arah barat (pintu taubat tertutup), keluarnya Dabbatul Ardh (binatang melata bicara), dan api dari Yaman yang menggiring manusia ke Mahsyar.',
      ],
      practice: 'Hafalkan 10 ayat pertama Surah Al-Kahfi sebagai benteng perlindungan dari fitnah Dajjal.',
      source: { label: 'HR. Muslim no. 2901 (Sepuluh Tanda Kiamat Kubra)', href: 'https://sunnah.com/muslim:2901' },
    },
    {
      id: 'mahsyar-hisab-mizan',
      title: 'Tiupan Sangkakala, Mahsyar, & Hisab',
      category: 'Eskatologi',
      summary: 'Kebangkitan seluruh umat manusia dari kubur untuk diadili secara adil di hadapan Pengadilan Ilahi.',
      points: [
        'Dua Tiupan Sangkakala Malaikat Israfil: tiupan kehancuran (Sha’iqah) yang mematikan seluruh makhluk di langit dan bumi, disusul tiupan kebangkitan (Ba’ats) yang menghidupkan kembali seluruh jasad (QS. Az-Zumar: 68).',
        'Padang Mahsyar: tanah putih datar tempat berkumpulnya miliaran manusia sejak Nabi Adam hingga kiamat dalam keadaan tanpa alas kaki dan tanpa busana, di mana matahari didekatkan satu mil.',
        'Naungan Arsy bagi Tujuh Golongan (HR. Bukhari no. 660): pemimpin adil, pemuda yang tumbuh dalam ibadah, orang yang hatinya terpaut masjid, dua orang yang saling mencintai karena Allah, orang yang menolak diajak zina karena takut Allah, orang yang bersedekah secara sembunyi-sembunyi, dan orang yang berdzikir mengingat Allah hingga meneteskan air mata.',
        'Hisab & Mizan: buku catatan amal dibagikan (menerima dengan tangan kanan bertanda bahagia, dengan tangan kiri bertanda celaka), serta penimbangan amal kebaikan dan keburukan seberat biji zarrah di atas timbangan Mizan yang adil (QS. Al-Anbiya: 47).',
      ],
      practice: 'Perbanyak amal ringan berpahala berat di Mizan: "Subhanallahi wa bihamdihi, Subhanallahil ‘Azhiim."',
      source: quran('39/68'),
    },
    {
      id: 'kautsar-sirath-surga',
      title: 'Telaga Al-Kautsar, Sirath, Surga & Neraka',
      category: 'Eskatologi',
      summary: 'Perjalanan akhir melintasi titian di atas neraka menuju keabadian tempat tinggal hakiki.',
      points: [
        'Telaga Al-Kautsar: telaga milik Rasulullah ﷺ yang airnya lebih putih dari susu dan lebih manis dari madu; barangsiapa meminumnya sekali takkan pernah haus selamanya (QS. Al-Kautsar: 1).',
        'Syafa’at Al-‘Uzhma (Syafa’at Teragung): pertolongan Rasulullah ﷺ kepada umatnya dengan izin Allah di saat para nabi lain tidak berani memintanya.',
        'Jembatan Ash-Shirath: titian halus yang dibentangkan di atas Neraka Jahannam menuju Surga; kecepatan manusia melintasinya sesuai kadar amal ibadah mereka di dunia (ada yang secepat kilat, angin kencang, kuda cepat, hingga merangkak).',
        'Pembalasan Neraka Jahannam: tempat siksaan abadi yang sangat mengerikan bagi orang kafir dan munafik, serta tempat pembersihan sementara bagi kaum beriman yang berdosa.',
        'Keindahan Abadi Surga (Jannah): kenikmatan yang belum pernah dilihat mata, belum pernah didengar telinga, dan belum pernah terlintas di hati manusia (HR. Bukhari no. 3244); puncak kenikmatan tertinggi surga adalah Ru’yatullah (melihat Wajah Allah Yang Maha Indah) (QS. Al-Qiyamah: 22-23).',
      ],
      practice: 'Rutin memohon doa: "Allahumma inni as-alukal jannah, wa a’uudzu bika minan naar" (tiga kali sehari).',
      source: quran('75/22'),
    },
  ],
};


export const ushulFiqh: Course = {
  id: 'ushul-fiqh',
  title: 'Ushul Fiqh & Kaidah Fiqhiyyah (Logika Hukum Islam)',
  description: 'Metodologi perumusan hukum syariat: sumber dalil (Al-Qur’an, Sunnah, Ijma’, Qiyas), sebab perbedaan 4 mazhab, dan 5 Kaidah Fiqih Induk (Al-Qawa’id al-Fiqhiyyah al-Kubra).',
  note: 'Disusun berdasarkan intisari kitab-kitab ushul fikih klasik (seperti Al-Waraqat karya Imam Al-Haramain Al-Juwaini) serta kaidah fikih mazhab Syafi’i. Bertujuan memberikan pemahaman metodologis agar umat bersikap bijak dan toleran terhadap perbedaan ijtihad.',
  lessons: [
    {
      id: 'mengenal-ushul-fiqh',
      title: 'Mengenal Ushul Fiqh & Perbedaannya dengan Fiqh',
      category: 'Pengantar Metodologi',
      summary: 'Fiqh adalah hukum praktis (cabang), sedangkan Ushul Fiqh adalah kaidah dan metodologi penggalian dalil (akar fondasi).',
      points: [
        'Analogi Pohon: Dalil syariat adalah tanah dan air, Ushul Fiqh adalah akar dan batangnya, sedangkan Fiqh adalah daun dan buah-buah hukum praktisnya.',
        'Definisi Fiqh: ilmu tentang hukum-hukum syariat praktis yang diperoleh dari dalil-dalil terperinci (seperti hukum wudhu, shalat, jual beli).',
        'Definisi Ushul Fiqh: kaidah-kaidah umum yang digunakan seorang mujtahid untuk mengistimbathkan (menyimpulkan) hukum fiqh dari dalil-dalil syariat.',
        'Tujuan Mempelajari: memahami bagaimana hukum dirumuskan, tidak mudah menyalahkan pandangan ulama lain, dan terhindar dari pemahaman tekstual yang kaku tanpa kaidah.',
      ],
      practice: 'Pahami bahwa setiap fatwa ulama memiliki bangunan kaidah metodologis di balik kesimpulannya.',
      source: { label: 'Kitab Al-Waraqat — Pengantar Ushul Fiqh', href: 'https://islam.nu.or.id/syariah/kitab-al-waraqat-buku-saku-ushul-fikih-karya-imam-al-haramain-0h10Y' },
    },
    {
      id: 'hukum-syara',
      title: 'Lima Hukum Taklifi & Hukum Wadh’i',
      category: 'Kategori Hukum',
      summary: 'Klasifikasi hukum syariat terhadap perbuatan mukallaf serta sebab, syarat, dan penghalangnya.',
      points: [
        'Hukum Taklifi (Tuntutan & Pilihan): Wajib/Fardhu (dikerjakan berpahala, ditinggalkan berdosa), Sunnah/Mandub (dikerjakan berpahala, ditinggalkan tidak berdosa), Haram (ditinggalkan berpahala, dikerjakan berdosa), Makruh (ditinggalkan berpahala, dikerjakan tidak berdosa), dan Mubah (dikerjakan atau ditinggalkan bernilai netral).',
        'Hukum Wadh’i (Ketentuan Keterkaitan): hukum yang menetapkan sesuatu sebagai Sebab (seperti tergelincir matahari menjadi sebab wajib shalat Zuhur), Syarat (suci dari hadas adalah syarat sah shalat), atau Mani’/Penghalang (haid menjadi penghalang kewajiban shalat).',
        'Cakap Hukum (Mukallaf): seorang Muslim yang telah baligh dan berakal sehat; orang gila dan anak kecil belum dibebani dosa taklifi.',
      ],
      practice: 'Identifikasi setiap aktivitas ibadah harian: mana yang rukun/wajib, mana yang sunnah pelengkap, dan mana yang makruh dijauhi.',
      source: quran('4/59'),
    },
    {
      id: 'sumber-dalil-utama',
      title: 'Sumber Dalil Utama yang Disepakati (Muttafaq)',
      category: 'Sumber Dalil',
      summary: 'Empat sumber hukum pokok yang disepakati oleh jumhur ulama empat mazhab.',
      points: [
        '1. Al-Qur’an: kalamullah yang diturunkan secara mutawatir; menjadi sumber primer segala hukum syariat.',
        '2. As-Sunnah: perkataan, perbuatan, dan taqrir (ketetapan diam) Rasulullah ﷺ yang berfungsi merinci dan menjelaskan keumuman Al-Qur’an.',
        '3. Ijma’: konsensus seluruh mujtahid dari umat Islam pada suatu masa setelah wafatnya Rasulullah ﷺ atas suatu hukum syariat.',
        '4. Qiyas (Analogi Logis): mempersamakan hukum suatu kasus baru yang tidak ada nashnya dengan kasus lama yang ada nashnya karena kesamaan ‘Illat (motif sebab hukum).',
        'Empat Rukun Qiyas: Ashal (kasus pokok/asal, misal: khamr), Far’u (kasus cabang/baru, misal: narkoba/wiski sintetis), Hukum Ashal (haram), dan ‘Illat (memabukkan/merusak akal).',
      ],
      practice: 'Pahami analogi qiyas: narkoba diharamkan karena memiliki kesamaan ‘illat memabukkan dengan khamr.',
      source: hadith(7352),
    },
    {
      id: 'dalil-ijtihad-lain',
      title: 'Sumber Dalil Sekunder (Mukhtalaf): Maslahah & ‘Urf',
      category: 'Sumber Dalil',
      summary: 'Metode ijtihad untuk menjawab perkembangan zaman yang belum ada ketetapan nash khususnya.',
      points: [
        'Maslahah Mursalah (Kemaslahatan Umum): menarik kemaslahatan dan menolak kemudaratan yang tidak didukung atau dibatalkan oleh nash khusus (contoh: pembukuan Al-Qur’an menjadi mushaf, undang-undang lalu lintas, surat nikah resmi KUA).',
        '‘Urf (Adat Kebiasaan): tradisi sosial masyarakat yang baik dan berulang; diakui syariat selama tidak menghalalkan yang haram atau mengharamkan yang halal (contoh: kebiasaan jual beli tanpa ucapan ijab qabul lisan / mu’athah pada minimarket).',
        'Istihsan: berpindah dari suatu qiyas nyata ke qiyas terselubung atau pengecualian dalil umum demi kemaslahatan yang lebih kuat.',
        'Istishhab: menetapkan keberlakuan hukum yang telah ada di masa lalu hingga ada dalil pasti yang mengubahnya (contoh: status tetap suci sampai ada bukti batal).',
      ],
      practice: 'Hormati aturan hukum positif (seperti tertib rambu lalu lintas) karena mengandung maslahah mursalah demi keselamatan jiwa.',
      source: quran('7/199'),
    },
    {
      id: 'sebab-beda-mazhab',
      title: 'Mengapa Empat Mazhab Berbeda Pendapat?',
      category: 'Fikih Ikhtilaf',
      summary: 'Latar belakang ilmiah di balik perbedaan fikih antara Imam Abu Hanifah, Malik, Syafi’i, dan Ahmad bin Hanbal.',
      points: [
        'Bukan karena Hawa Nafsu: seluruh imam mazhab mencintai Rasulullah ﷺ dan berpegang teguh pada Al-Qur’an dan Sunnah, namun berbeda dalam metodologi ijtihad.',
        'Faktor Perbedaan: (1) Suatu hadits sampai kepada satu imam namun belum sampai kepada imam lain dengan sanad yang shahih menurut kriterianya; (2) Perbedaan memahami lafaz musytarak (bermakna ganda) seperti kata "quru’" (suci atau haid); (3) Perbedaan kaidah ushul (misal: Mazhab Maliki mengutamakan amalan penduduk Madinah di atas hadits ahad).',
        'Prinsip Imam Asy-Syafi’i yang Bijak: "Pendapatku benar menurutku namun mengandung kemungkinan salah; dan pendapat selainku salah menurutku namun mengandung kemungkinan benar."',
        'Larangan Fanatisme Mazhab (Ta’ashshub): menghargai khilafiyah cabang dan melarang saling mengafirkan atau membid’ahkan sesama Muslim.',
      ],
      practice: 'Sikapi perbedaan bacaan qunut Subuh atau gerak jari tasyahud dengan lapang dada dan ukhuwah islamiyah.',
      source: { label: 'Buku Adab Ikhtilaf — Dr. Yusuf Al-Qaradhawi', href: 'https://islam.nu.or.id' },
    },
    {
      id: 'kaidah-1-niat',
      title: 'Kaidah 1: Segala Perkara Tergantung Niatnya',
      category: 'Kaidah Fiqih Induk',
      summary: 'Kaidah "Al-Umuru bi Maqashidiha": nilai hukum dan pahala suatu perbuatan ditentukan oleh maksud pelakunya.',
      points: [
        'Landasan Hadits: Sabda Rasulullah ﷺ: "Sesungguhnya setiap amal perbuatan tergantung pada niatnya..." (HR. Bukhari no. 1 & Muslim no. 1907).',
        'Fungsi Niat dalam Fiqh: membedakan antara rutinitas kebiasaan biasa (seperti mandi menyegarkan badan) dengan ibadah (mandi wajib mengangkat hadas besar).',
        'Membedakan Tingkatan Ibadah: membedakan antara shalat wajib Zuhur dengan shalat sunnah rawatib empat rakaat.',
        'Kaidah Turunan: "Al-‘Ibratu fil ‘uquudi lil maqaashidi wal ma’aani laa lil alfaazhi wal mabani" (Yang menjadi patokan dalam akad adalah maksud dan maknanya, bukan semata-mata bunyi lafaz lahiriahnya).',
      ],
      practice: 'Berniatlah ikhlas lillahi ta’ala dalam bekerja dan belajar agar aktivitas duniawi bernilai pahala ibadah.',
      source: hadith(1),
    },
    {
      id: 'kaidah-2-yakin',
      title: 'Kaidah 2: Keyakinan Tidak Hilang oleh Keraguan',
      category: 'Kaidah Fiqih Induk',
      summary: 'Kaidah "Al-Yaqinu la Yuzalu bisy-Syakk": kepastian hukum tidak boleh digugurkan oleh keraguan spekulatif.',
      points: [
        'Landasan Hadits: jika seseorang ragu apakah telah buang angin saat shalat, jangan batalkan shalatnya sampai ia mendengar suara atau mencium bau (HR. Muslim no. 362).',
        'Penerapan Bersuci: orang yang yakin telah berwudhu lalu ragu apakah sudah batal, maka hukumnya tetap suci. Sebaliknya, orang yang yakin sudah hadas lalu ragu apakah sudah wudhu, maka hukumnya berhadas.',
        'Hukum Asal Bebas dari Tanggungan (Bara’atudz Dzimmah): seseorang dianggap bebas dari utang atau tuduhan kriminal sampai pihak penuduh membuktikan sebaliknya (praduga tak bersalah).',
        'Kaidah ini membebaskan manusia dari penyakit waswas dan overthinking dalam beribadah.',
      ],
      practice: 'Buang keraguan dalam shalat atau wudhu; tetapkan pilihan pada bilangan rakaat yang paling diyakini (yang lebih sedikit).',
      source: { label: 'HR. Muslim no. 362 (Menolak Keraguan dalam Shalat)', href: 'https://sunnah.com/muslim:362' },
    },
    {
      id: 'kaidah-3-masyaqqah',
      title: 'Kaidah 3: Kesulitan Mendatangkan Kemudahan',
      category: 'Kaidah Fiqih Induk',
      summary: 'Kaidah "Al-Masyaqqatu Tajlibut Taisir": syariat Islam memberikan keringanan (rukhsah) saat mukallaf menghadapi kesulitan nyata.',
      points: [
        'Landasan Al-Qur’an: "Allah menghendaki kemudahan bagimu, dan tidak menghendaki kesukaran bagimu" (QS. Al-Baqarah: 185) dan QS. Al-Hajj: 78.',
        'Tujuh Sebab Keringanan Syariat (Asbaabur Rukhash): Safar (perjalanan jauh), Maradh (sakit), Ikrah (paksaan), Nisyan (lupa), Jahl (ketidaktahuan yang dimaafkan), ‘Usr wa ‘Umumul Balwa (kesulitan yang merata), dan Naqsh (keterbatasan kodrati seperti anak kecil/wanita haid).',
        'Contoh Penerapan: jamak dan qashar shalat musafir, tayamum saat tidak ada air atau sakit, shalat sambil duduk/berbaring bagi yang tidak mampu berdiri, serta berbuka puasa bagi orang sakit dan lansia.',
        'Kaidah Pembatas: kemudahan syariat tidak boleh dijadikan sarana mencari-cari alasan untuk melalaikan kewajiban tanpa uzur yang sah.',
      ],
      practice: 'Manfaatkan rukhsah (keringanan) dari Allah saat bepergian atau sakit tanpa merasa bersalah.',
      source: quran('2/185'),
    },
    {
      id: 'kaidah-4-dharar',
      title: 'Kaidah 4: Kemudaratan Wajib Dihilangkan',
      category: 'Kaidah Fiqih Induk',
      summary: 'Kaidah "Adh-Dhararu Yuzal": segala bentuk bahaya, kerugian, dan kezaliman wajib dihilangkan dari masyarakat.',
      points: [
        'Landasan Hadits: Sabda Rasulullah ﷺ: "Laa dharara wa laa dhiraar" (Tidak boleh membahayakan diri sendiri dan tidak boleh membahayakan orang lain) (HR. Ibnu Majah no. 2340).',
        'Menolak Mafsadat Didahulukan: "Dar’ul mafaasidi muqaddamun ‘ala jalbil mashaalih" (Mencegah keburukan/bahaya harus didahulukan daripada mengambil keuntungan/kebaikan).',
        'Memilih Bahaya Lebih Ringan: jika terpaksa di antara dua mudarat yang tak terhindarkan, pilihlah kemudaratan yang dampaknya paling ringan (Irtikaabu akhaffidh dhararain).',
        'Penerapan Modern: karantina wilayah saat wabah menular, penertiban bangunan yang membahayakan jalan umum, serta larangan merokok dan polusi beracun.',
      ],
      practice: 'Hindari segala tindakan yang menimbulkan ketidaknyamanan, kebisingan, atau bahaya bagi tetangga dan lingkungan.',
      source: { label: 'HR. Ibnu Majah no. 2340 (Kaidah La Dharara wa La Dhirar)', href: 'https://sunnah.com/ibnmajah:2340' },
    },
    {
      id: 'kaidah-5-adat',
      title: 'Kaidah 5: Adat Kebiasaan Menjadi Pertimbangan Hukum',
      category: 'Kaidah Fiqih Induk',
      summary: 'Kaidah "Al-‘Aadatu Muhakkamah": tradisi dan kearifan lokal yang baik dapat dijadikan pijakan penetapan hukum.',
      points: [
        'Landasan Al-Qur’an: "Jadilah pemaaf dan suruhlah orang mengerjakan yang ma’ruf (kebiasaan yang baik), serta jangan pedulikan orang-orang yang bodoh" (QS. Al-A’raf: 199).',
        'Syarat Adat Diterima Syariat: tidak bertentangan dengan nash Al-Qur’an dan Sunnah, berlaku umum atau mayoritas di masyarakat, dan sudah berlangsung lama.',
        'Penerapan dalam Transaksi: standar ukuran takaran lokal, besaran mahar yang wajar di suatu daerah, batasan nafkah layak keluarga, dan pembagian tugas rumah tangga.',
        'Islam dan Budaya Nusantara: penerimaan tradisi halal-bihalal, walimatul tasmiyah, dan busana sopan lokal yang selaras dengan syariat menutup aurat.',
      ],
      practice: 'Lestarikan kearifan lokal masyarakat yang positif dan bernilai sedekah serta kerukunan sosial.',
      source: quran('7/199'),
    },
  ],
};

export const musthalahHadits: Course = {
  id: 'musthalah-hadits',
  title: "Musthalah Hadits & Metodologi Validasi Hadits",
  description: "Panduan komprehensif memahami ilmu kritik hadits, struktur sanad-matan, kriteria hadits shahih vs palsu (maudhu'), serta metodologi tabayyun riwayat.",
  note: "Ilmu Musthalah Hadits adalah sistem metodologi verifikasi sejarah paling teliti dan canggih dalam peradaban manusia yang menjaga orisinalitas risalah kenabian.",
  lessons: [
    {
      id: 'urgensi-musthalah',
      title: 'Urgensi & Sejarah Kodifikasi Ilmu Musthalah Hadits',
      category: 'Pengantar & Sejarah',
      summary: 'Memahami latar belakang lahirnya ilmu kritik hadits sebagai benteng pelindung kemurnian ajaran Islam dari pemalsuan dan penyimpangan riwayat.',
      points: [
        'Latar Belakang: Pasca wafatnya Rasulullah SAW dan terjadinya fitnah kubra di masa Khalifah Utsman dan Ali, sebagian kelompok politik atau sekte mulai membuat riwayat palsu untuk membela kepentingannya.',
        'Pernyataan Terkenal Ibnu Sirin (w. 110 H): "Dulu di masa awal para sahabat tidak pernah bertanya tentang sanad. Ketika fitnah terjadi, mereka berkata: Sebutkan kepada kami nama-nama orang yang meriwayatkan kepadamu (sanad)."',
        'Fungsi Sanad: Abdullah ibnul Mubarak menyatakan: "Sanad adalah bagian dari agama. Seandainya bukan karena sanad, niscaya siapa saja bisa berkata apa saja semaunya."',
        'Puncak Kodifikasi: Perkembangan metodologi dari perkataan lisan para perawi hingga penulisan kitab musthalah hadits pertama yang terstruktur oleh Al-Qadhi Abu Muhammad ar-Ramahurmuzi (w. 360 H).',
      ],
      practice: 'Tanamkan sikap kehati-hatian intelektual dan tidak mudah percaya pada kutipan riwayat sebelum memeriksa sumber rujukan dan derajat keshahihannya.',
      source: hadith(1),
    },
    {
      id: 'struktur-hadits',
      title: 'Anatomi Struktur Hadits: Sanad, Matan, dan Mukharrij',
      category: 'Konsep Dasar',
      summary: 'Mengenal tiga komponen utama penyusun sebuah hadits: rangkaian pembawa kabar (Sanad), redaksi teks (Matan), dan pencatat kitab (Mukharrij).',
      points: [
        'Sanad (Mata Rantai Perawi): Rangkaian susunan orang-orang yang menyampaikan hadits dari satu generasi ke generasi berikutnya secara bertingkat hingga bersambung ke Rasulullah SAW.',
        'Thabaqat Sanad (Tingkatan Generasi): Sahabat Nabi, Tabi\'in, Tabi\'ut Tabi\'in, hingga Imam pengumpul hadits (Bukhari, Muslim, dsb.).',
        'Matan (Redaksi Teks Hadits): Lafaz ucapan, tindakan, ketetapan (taqrir), atau sifat Nabi SAW yang terletak di ujung sanad.',
        'Mukharrij / Rawi Akhir: Ulama pakar yang menghimpun, meneliti sanad, dan membukukan hadits dalam karya kitab induk (contoh: Imam al-Bukhari mentakhrij dalam kitab Shahihnya).',
      ],
      practice: 'Ketika membaca buku hadits, latih mata untuk membedakan nama-nama perawi dalam sanad dan redaksi inti kalam Rasulullah SAW dalam matan.',
      source: hadith(2),
    },
    {
      id: 'syarat-hadits-shahih',
      title: '5 Syarat Mutlak Hadits Shahih',
      category: 'Kriteria Keshahihan',
      summary: 'Kriteria ketat yang wajib dipenuhi sebuah riwayat agar dapat diterima (maqbul) sebagai hadits shahih dan menjadi hujjah hukum Islam.',
      points: [
        '1. Ittishal as-Sanad (Sanad Bersambung): Setiap perawi mendengar/menerima langsung dari gurunya secara berkesinambungan tanpa terputus sama sekali dari awal hingga akhir sanad.',
        '2. \'Adalah ar-Rawi (Keadilan Perawi): Seluruh perawi beragama Islam, baligh, berakal, taat beragama, bebas dari kefasikan (tidak berbuat dosa besar), dan menjaga muru\'ah (kehormatan moral).',
        '3. Dhabth ar-Rawi (Ketelitian & Kekuatan Hafalan): Perawi memiliki daya ingat luar biasa (dhabth shadr) atau menjaga ketat catatan kitabnya dari kekeliruan (dhabth kitab).',
        '4. \'Adam asy-Syudzudz (Tidak Syadz/Janggal): Riwayat perawi tsiqah tersebut tidak bertentangan dengan riwayat perawi lain yang lebih banyak atau lebih kuat (rajih).',
        '5. \'Adam al-\'Illah (Bebas dari Cacat Tersembunyi): Tidak ada cacat samar tersembunyi (\'illah qadihah) yang merusak keshahihan, meski secara lahiriah sanad terlihat mulus.',
      ],
      practice: 'Pahami bahwa hukum Islam dibangun di atas standar pembuktian riwayat yang paling ketat dan rasional dalam sejarah manusia.',
      source: quran('49/6'),
    },
    {
      id: 'hadits-hasan',
      title: 'Hadits Hasan: Karakteristik & Kehujjahannya',
      category: 'Kriteria Keshahihan',
      summary: 'Definisi hadits hasan yang kedudukannya tepat berada di bawah hadits shahih namun tetap diakui sah sebagai dalil hukum syariat.',
      points: [
        'Definisi Al-Hafizh Ibnu Hajar: Hadits hasan adalah riwayat yang sanadnya bersambung, diriwayatkan oleh perawi adil, tidak syadz, tidak berillat, namun hafalan perawinya sedikit di bawah derajat hadits shahih (khaffad-dhabth).',
        'Hasan Li Dzatihi: Hadits yang memenuhi syarat hasan dengan sendirinya tanpa memerlukan bantuan jalur riwayat penguat lainnya.',
        'Hasan Li Ghairihi: Hadits yang asalnya memiliki kelemahan ringan, namun derajatnya terangkat menjadi hasan karena didukung oleh banyak jalur sanad lain yang setara atau lebih kuat.',
        'Kedudukan Hukum: Hadits hasan (baik li dzatihi maupun li ghairihi) berstatus Maqbul (diterima) dan sah dijadikan landasan aqidah dan hukum fiqih sebagaimana hadits shahih.',
      ],
      practice: 'Gunakan hadits hasan dengan tenang dalam ibadah karena para ulama sepakat kehujjahannya setara shahih dalam penetapan hukum.',
      source: hadith(5),
    },
    {
      id: 'hadits-dhaif',
      title: 'Hadits Dha\'if: Sebab Kelemahan & Macam-Macamnya',
      category: 'Klasifikasi Riwayat',
      summary: 'Mengenal faktor-faktor penyebab suatu hadits dikategorikan dha\'if (lemah), baik akibat gugurnya perawi dari sanad maupun cacat pada kredibilitas perawi.',
      points: [
        'Definisi Dha\'if: Riwayat yang tidak memenuhi salah satu atau lebih syarat hadits shahih maupun hadits hasan.',
        'Sebab 1: Inqitha\' as-Sanad (Keterputusan Sanad): Mu\'allaq (gugur perawi di awal sanad), Mursal (Tabi\'in langsung menyebut Nabi tanpa menyebut sahabat), Mu\'dhal (gugur dua perawi berturut-turut), atau Munqathi\' (gugur perawi di tengah sanad).',
        'Sebab 2: Tha\'n fir-Rawi (Cacat Kredibilitas Perawi): Berdusta (kadzib), tertuduh berdusta (muttaham bil kadzib), fasik, sering salah (fuhsyul ghalath), lalai (ghaflah), atau perawi tidak dikenal identitasnya (majhul).',
        'Konsekuensi: Hadits dha\'if pada dasarnya tidak boleh dijadikan landasan dalam penetapan pokok aqidah dan hukum halal-haram.',
      ],
      practice: 'Selalu teliti ketika membaca hadits; pastikan apakah riwayat tersebut memiliki sanad yang shahih atau berstatus dha\'if.',
      source: quran('17/36'),
    },
    {
      id: 'kaidah-fadhail-amal',
      title: 'Kaidah Pengamalan Hadits Dha\'if dalam Fadhailul A\'mal',
      category: 'Aplikasi Hukum',
      summary: 'Ketetapan para fuqaha dan ahli hadits mengenai batasan ketat pengamalan hadits dha\'if khusus pada amalan keutamaan (fadhailul a\'mal).',
      points: [
        'Syarat 1 (Ibnu Hajar): Kelemahan hadits tidak boleh terlalu parah (bukan riwayat perawi pendusta, tertuduh dusta, atau sering salah fatal).',
        'Syarat 2: Amalan yang dianjurkan harus bernaung di bawah prinsip umum syariat yang sudah shahih (ada dalil pokok di Al-Qur\'an atau Sunnah shahihah).',
        'Syarat 3: Tidak meyakini secara pasti bahwa sabda tersebut benar-benar dari Rasulullah SAW, melainkan semata-mata sebagai bentuk kehati-hatian dalam meraih kebaikan (ihtiyath).',
        'Larangan Mutlak: Hadits dha\'if sama sekali dilarang digunakan untuk menciptakan ibadah ritual baru (kaifiat baru yang tidak ada asalnya) atau menetapkan status halal-haram.',
      ],
      practice: 'Prioritaskan selalu dalil-dalil shahih dan hasan dalam amalan sehari-hari sebelum melirik riwayat yang diperdebatkan.',
      source: hadith(7),
    },
    {
      id: 'hadits-palsu-maudhu',
      title: 'Bahaya & Ancaman Hadits Palsu (Maudhu\')',
      category: 'Kritik Hadits',
      summary: 'Peringatan keras syariat Islam terhadap perbuatan memalsukan riwayat atas nama Nabi SAW dan motif-motif di balik fenomena hadits maudhu\'.',
      points: [
        'Sabda Rasulullah SAW: "Barangsiapa sengaja berdusta atas namaku, maka hendaklah ia bersiap-siap mengambil tempat duduknya di neraka" (Muttafaqun \'alaih).',
        'Status Hadits Maudhu\': Bukan merupakan hadits sama sekali, melainkan kedustaan yang dibuat-buat dan dinisbatkan secara batil kepada Nabi SAW.',
        'Motif Pemalsu Hadits: Propaganda politik sekte, kebencian zindiq untuk merusak Islam dari dalam, fanatisme suku/bangsa/mazhab, hingga niat "saleh yang bodoh" (membuat riwayat palsu demi memotivasi orang ibadah).',
        'Hukum Meriwayatkan: Haram hukumnya menyebarkan hadits palsu kepada masyarakat kecuali disertai dengan penjelasan tegas bahwa hadits tersebut maudhu\'.',
      ],
      practice: 'Jangan pernah menyebarkan pesan berantai yang mencatut nama Nabi SAW tanpa kepastian validitas dari ulama mu\'tabar.',
      source: hadith(34),
    },
    {
      id: 'ciri-hadits-palsu',
      title: 'Ciri-Ciri Khas & Tanda Tekstual Hadits Palsu',
      category: 'Kritik Hadits',
      summary: 'Indikator logis dan tekstual yang dirumuskan para ulama untuk mengenali aroma kepalsuan suatu riwayat secara cepat.',
      points: [
        'Kerancuan Bahasa (Rakakatul Lafzh): Susunan kalimat kaku, kasar, atau tidak mencerminkan balaghah (keindahan sastra tinggi) sabda kenabian (jawami\'ul kalim).',
        'Pertentangan Nyata: Makna bertentangan secara frontal dengan ayat Al-Qur\'an yang sharih (jelas), hadits mutawatir, kaidah ijma\', fakta sejarah yang pasti, atau logika sehat.',
        'Pahala Ekstrem untuk Amalan Remeh: Menjanjikan istana megah di surga atau ampunan semua dosa masa lalu dan depan hanya karena membaca 2 kalimat pada malam tertentu.',
        'Ancaman Azab Berlebihan: Mengancam siksa neraka jahanam kekal bagi perbuatan khilaf kecil yang sama sekali tidak sebanding.',
      ],
      practice: 'Waspadai riwayat-riwayat di media sosial yang mengobral janji pahala fantastis tak masuk akal untuk amalan instan.',
      source: quran('6/115'),
    },
    {
      id: 'kutubut-tisah',
      title: 'Mengenal Kitab-Kitab Hadits Induk (Kutubut Tis\'ah)',
      category: 'Pustaka Hadits',
      summary: 'Peta sembilan kitab rujukan hadits terbesar umat Islam beserta tingkatan otoritas dan karakteristik metodologinya.',
      points: [
        '1. Shahih al-Bukhari & Shahih Muslim (Ash-Shahihain): Dua kitab paling shahih di muka bumi setelah Al-Qur\'an. Semua riwayat di dalamnya telah melewati seleksi sanad paling ketat.',
        '2. Sunan Arba\'ah: Sunan Abu Dawud (fokus fiqih), Jami\' at-Tirmidzi (fokus derajat sanad & ikhtilaf mazhab), Sunan an-Nasa\'i (ketelitian illat sanad), dan Sunan Ibnu Majah.',
        '3. Tiga Kitab Pelengkap: Musnad Ahmad bin Hanbal (ensiklopedia hadits terbesar ~27.000 hadits), Muwaththa\' Imam Malik (kitab fiqih-hadits tertua penduduk Madinah), dan Sunan ad-Darimi.',
        'Tingkatan Tertinggi Riwayat: "Muttafaqun \'Alaih" — hadits yang disepakati keshahihannya bersama oleh Imam Bukhari dan Imam Muslim.',
      ],
      practice: 'Jadikan kitab-kitab hadits induk muktamad sebagai rujukan utama saat mendalami hukum dan ketetapan syariat Islam.',
      source: hadith(8),
    },
    {
      id: 'jarh-wa-tadil-digital',
      title: 'Ilmu Jarh wa Ta\'dil & Adab Tabayyun di Era Digital',
      category: 'Aplikasi Kontemporer',
      summary: 'Mengenal ilmu evaluasi integritas rawi dan tips praktis masyarakat modern menyaring riwayat hadits di media sosial & WhatsApp.',
      points: [
        'Ilmu Jarh wa Ta\'dil: Disiplin ilmu yang meneliti celaan (jarh) dan pujian kredibilitas (ta\'dil) setiap perawi hadits sepanjang sejarah oleh para ulama kritikus (seperti Yahya bin Ma\'in, Adz-Dzahabi, Ibnu Hajar).',
        'Bukan Ghibah: Para ulama sepakat mengkritik perawi hadits yang lemah bukan perbuatan ghibah yang haram, melainkan kewajiban agung untuk menjaga kemurnian wahyu Allah.',
        'Fenomena Hoaks Hadits di Medsos: Beredarnya riwayat palsu musiman seperti hadits amalan khusus Nisfu Sya\'ban, doa awal/akhir tahun tertentu, dan khasiat makanan ajaib.',
        'Langkah Verifikasi Modern: Gunakan platform takhrij digital terpercaya (seperti Dorar.net, Maktabah Syamilah, atau fitur pencarian Hadits Al-Hikmah) sebelum menyebarkan riwayat.',
      ],
      practice: 'Terapkan prinsip "Tabayyun sebelum Share": jika belum terbukti shahih atau hasan dari sumber terpercaya, tahan diri untuk tidak menyebarkannya.',
      source: quran('49/6'),
    },
  ],
};

export const peradaban: Course = {
  id: 'peradaban',
  title: "Sejarah Keemasan Peradaban Islam (The Golden Age)",
  description: "Menelusuri masa kejayaan sains, peradaban, dan intelektual Islam dunia: dari Baitul Hikmah Baghdad, Andalusia, hingga tokoh ilmuwan Muslim peletak fondasi sains modern.",
  note: "Zaman Keemasan Islam (abad ke-8 hingga ke-14 M) membuktikan bahwa wahyu Al-Qur'an dan kemajuan sains-teknologi berjalan beriringan menerangi dunia.",
  lessons: [
    {
      id: 'khulafaur-rasyidin',
      title: 'Pondasi Peradaban: Era Khulafaur Rasyidin',
      category: 'Fondasi Sejarah',
      summary: 'Karakteristik kepemimpinan empat khalifah pertama dalam menegakkan keadilan hukum, perlindungan minoritas, dan tata kelola administrasi publik.',
      points: [
        'Abu Bakar Ash-Shiddiq: Menjaga stabilitas negara pasca wafatnya Rasulullah, memerangi kemurtadan politik, dan menginisiasi kodifikasi mushaf Al-Qur\'an pertama kali.',
        'Umar bin Khattab: Peletak sistem birokrasi modern Islam (Diwan), penetapan kalender Hijriyah, pembangunan pos militer, bendungan air, baitul mal, dan jaminan sosial bagi lansia non-Muslim di Yerusalem.',
        'Utsman bin Affan: Standarisasi mushaf resmi Al-Qur\'an (Mushaf Utsmani) untuk mencegah perpecahan umat, serta pembangunan armada laut Islam pertama.',
        'Ali bin Abi Thalib: Keteladanan integritas supremasi hukum tanpa pandang bulu (kasus baju besi yang hilang melawan warga Yahudi di hadapan hakim Syuraih).',
      ],
      practice: 'Ambil teladan kepemimpinan Khulafaur Rasyidin yang mendahulukan kepentingan rakyat dan keadilan di atas kepentingan pribadi.',
      source: hadith(25),
    },
    {
      id: 'baitul-hikmah-baghdad',
      title: 'Revolusi Literasi & Baitul Hikmah Baghdad',
      category: 'Zaman Keemasan',
      summary: 'Lembaga riset, perpustakaan akbar, dan pusat penerjemahan peradaban dunia di Baghdad pada masa Khalifah Harun ar-Rasyid dan Al-Ma\'mun.',
      points: [
        'Didirikan oleh Khalifah Abbasiyah: Harun ar-Rasyid dan mencapai puncak kejayaan pada masa Khalifah Al-Ma\'mun (abad ke-9 M).',
        'Gerakan Penerjemahan Akbar: Menerjemahkan ribuan manuskrip ilmiah dari bahasa Yunani Kuno, Persia, India, dan Suriah ke dalam bahasa Arab.',
        'Apresiasi Sains yang Tinggi: Khalifah Al-Ma\'mun dikenal menimbang karya terjemahan ilmuwan dan menghadiahkan emas seberat buku yang diterjemahkan.',
        'Ekosistem Intelektual Terbuka: Ilmuwan Muslim, Kristen, Yahudi, dan Persia bekerja berdampingan meneliti astronomi, matematika, kedokteran, dan filsafat.',
      ],
      practice: 'Tumbuhkan kecintaan membaca, riset ilmiah, dan keterbukaan terhadap ilmu pengetahuan yang bermanfaat bagi kemanusiaan.',
      source: quran('39/9'),
    },
    {
      id: 'ibnu-sina-kedokteran',
      title: 'Ibnu Sina (Avicenna) & Revolusi Kedokteran Dunia',
      category: 'Tokoh Ilmuwan',
      summary: 'Profil Bapak Kedokteran Modern dan mahakaryanya "Al-Qanun fi at-Tibb" yang menjadi buku teks standar di universitas Eropa selama lebih dari 600 tahun.',
      points: [
        'Kitab Al-Qanun fi at-Tibb (The Canon of Medicine): Ensiklopedia medis 5 volume yang memadukan kedokteran klinis, farmakologi, dan anatomi tubuh manusia.',
        'Penemuan Klinis: Pertama kali mendeskripsikan sifat menular dari penyakit TBC, penyebaran penyakit melalui air dan tanah, serta korelasi psikologis dengan kesehatan fisik.',
        'Metode Karantina: Menggagas konsep isolasi pasien (karantina) selama 40 hari (al-arba\'iniyya) untuk memutus rantai wabah menular.',
        'Karya Filsafat: Menulis Kitab Asy-Syifa (The Book of Healing), ensiklopedia ilmiah komprehensif tentang logika, sains alam, dan metafisika.',
      ],
      practice: 'Pelajari ilmu kesehatan dan kedokteran dengan niat tulus sebagai ibadah dan bentuk kepedulian terhadap keselamatan sesama.',
      source: hadith(69),
    },
    {
      id: 'al-khawarizmi-aljabar',
      title: 'Al-Khawarizmi: Penemu Aljabar & Peletak Algoritma',
      category: 'Tokoh Ilmuwan',
      summary: 'Kontribusi brilian Muhammad bin Musa al-Khawarizmi dalam melahirkan cabang ilmu Aljabar, pengenalan angka nol, dan dasar pemrograman modern.',
      points: [
        'Kitab Al-Jabr wal-Muqabala: Buku pertama di dunia yang secara sistematis memecahkan persamaan linear dan kuadrat (kata "Algebra" diserap dari judul kitab ini).',
        'Penemu Algoritma: Nama "Al-Khawarizmi" diabadikan dunia barat menjadi istilah "Algoritma" (dasar logika komputasi dan kecerdasan buatan masa kini).',
        'Adopsi Angka Nol (Sifr) & Sistem Desimal: Mengembangkan sistem desimal Hindu-Arab yang menggantikan angka Romawi yang rumit, memungkinkan perhitungan matematis akurat.',
        'Tujuan Syariat: Al-Khawarizmi menulis bahwa motivasinya menyusun aljabar adalah mempermudah masyarakat menghitung warisan (faraidh), wasiat, zakat, dan ukuran tanah.',
      ],
      practice: 'Gunakan kemampuan logika, matematika, dan teknologi informasi untuk mempermudah urusan umat dan memajukan peradaban.',
      source: quran('4/11'),
    },
    {
      id: 'ibnu-al-haitsam-optik',
      title: 'Ibnu al-Haitsam (Alhazen): Bapak Optik & Metode Ilmiah',
      category: 'Tokoh Ilmuwan',
      summary: 'Perintis revolusi metode ilmiah eksperimental (empiris) dan pencetus teori optik modern yang meruntuhkan teori penglihatan Ptolemeus.',
      points: [
        'Kitab Al-Manazir (Book of Optics): Meruntuhkan teori Yunani kuno yang mengklaim mata memancarkan sinar; ia membuktikan bahwa mata melihat karena cahaya memantul dari objek ke mata.',
        'Penemu Kamera Obscura (Al-Bait Al-Mudhlim): Eksperimen lubang jarum dalam kamar gelap yang menjadi cikal bakal teknologi kamera dan sinematografi modern.',
        'Pelopor Metode Ilmiah Modern: Menolak klaim otoritas dogmatis tanpa pengujian empiris; ia menegaskan bahwa kebenaran ilmiah harus diuji dengan eksperimen berulang dan observasi ketat.',
        'Kontribusi Astronomi: Menganalisis pembiasan atmosfer cahaya bintang dan merumuskan bahwa atmosfer bumi memiliki batas ketebalan tertentu.',
      ],
      practice: 'Terapkan metode berpikir kritis, berbasis bukti (evidence-based), dan tidak menelan mentah-mentah informasi tanpa verifikasi.',
      source: quran('10/101'),
    },
    {
      id: 'al-biruni-astronomi',
      title: 'Al-Biruni: Mengukur Keliling Bumi & Astronomi Presisi',
      category: 'Tokoh Ilmuwan',
      summary: 'Kegeniusan polimatik Al-Biruni yang berhasil menghitung jari-jari dan keliling bumi dengan rumus trigonometri canggih pada abad ke-11 M.',
      points: [
        'Pengukuran Keliling Bumi: Menggunakan puncak gunung di Nandana (sekarang Pakistan) dan sudut depresi ufuk; ia menghitung keliling bumi 40.075 km (hanya selisih ~1% dari pengukuran satelit modern NASA).',
        'Kitab Tahqiq ma lil-Hind: Karya antropologi dan perbandingan budaya-agama pertama yang objektif mengenai masyarakat India.',
        'Kitab Al-Qanun al-Mas\'udi: Risalah ensiklopedis astronomi yang memuat tabel posisi ribuan bintang, orbit planet, dan perhitungan gerhana matahari presisi.',
        'Inovasi Geodesi: Menentukan arah kiblat dengan rumus trigonometri bola (spherical trigonometry) dari berbagai belahan penjuru bumi.',
      ],
      practice: 'Manfaatkan sains bumi dan astronomi untuk meningkatkan rasa takjub dan ketundukan kepada Sang Maha Pencipta semesta.',
      source: quran('3/190'),
    },
    {
      id: 'ibnu-khaldun-sosiologi',
      title: 'Ibnu Khaldun: Peletak Dasar Sosiologi & Ekonomi Politik',
      category: 'Tokoh Ilmuwan',
      summary: 'Karya monumental "Muqaddimah" yang menganalisis hukum sebab-akibat kebangkitan dan keruntuhan peradaban masyarakat manusia.',
      points: [
        'Kitab Al-Muqaddimah: Diakui oleh sejarawan barat (seperti Arnold Toynbee) sebagai filsafat sejarah teragung yang pernah diciptakan oleh akal manusia di setiap zaman.',
        'Konsep Ashabiyyah (Solidaritas Sosial): Menguraikan bagaimana solidaritas kelompok menjadi motor penggerak berdirinya peradaban dan bagaimana kemewahan yang merusak memicu kehancuran dinasti.',
        'Teori Ekonomi Pra-Modern: Mendahului Adam Smith dalam menguraikan pembagian kerja (division of labor), mekanisme pasar penawaran-permintaan, dan teori perpajakan (Laffer Curve).',
        'Pola Siklikal Peradaban: Peradaban manusia tumbuh dari kesederhanaan, mencapai puncak kejayaan, lalu mengalami dekadensi moral dan kepunahan jika keadilan ditinggalkan.',
      ],
      practice: 'Pelajari sejarah sosial dan ekonomi untuk memahami dinamika bangsa serta menjaga nilai solidaritas dan keadilan.',
      source: quran('59/7'),
    },
    {
      id: 'ilmuwan-muslim-lintas-bidang',
      title: 'Lebih Banyak Ilmuwan Muslim: Kedokteran, Matematika, Rekayasa, dan Peta',
      category: 'Tokoh Ilmuwan',
      summary: 'Pilihan tokoh dari berbagai masa dan wilayah yang berkarya dalam kedokteran, farmasi, filsafat, matematika, astronomi, rekayasa mekanik, dan geografi.',
      points: [
        'Kedokteran dan bedah: Al-Razi menulis karya klinis dan medis; Al-Zahrawi menyusun ensiklopedia kedokteran al-Tasrif dengan bagian penting tentang bedah; Ibn al-Nafis menguraikan aliran darah melalui paru-paru dan menolak gagasan bahwa darah melewati sekat antarbilik jantung; Ibn al-Baytar menyusun karya besar tentang bahan obat dan tumbuhan.',
        'Matematika, astronomi, dan ilmu alam: Al-Kindi menulis tentang matematika dan berbagai ilmu; Nasir al-Din al-Tusi mengembangkan karya astronomi dan matematika serta berkarya di observatorium Maragha. Karya mereka tumbuh dalam tradisi penerjemahan, perdebatan, dan pengembangan ilmu lintas generasi.',
        'Filsafat dan musik: Al-Farabi dikenal lewat karya logika, filsafat, dan musik; Ibn Rushd menulis komentar filsafat dan juga berkarya dalam kedokteran, hukum, serta ilmu agama di Al-Andalus.',
        'Rekayasa mekanik: Al-Jazari mendeskripsikan perangkat mekanik, jam air, dan automata dalam Kitab fi ma‘rifat al-hiyal al-handasiyya. Karyanya menunjukkan perpaduan rancangan, pengetahuan praktis, dan keterampilan bengkel pada zamannya.',
        'Geografi dan kartografi: Al-Idrisi menyusun karya geografi dan peta dunia untuk istana Sisilia pada abad ke-12. Karyanya menghimpun pengetahuan geografis dari sumber dan laporan perjalanan yang tersedia pada masanya.',
        'Daftar ini adalah contoh, bukan peringkat atau daftar lengkap. Istilah seperti “penemu pertama” atau “bapak ilmu modern” perlu dipakai hati-hati: banyak capaian ilmiah dibangun bertahap, memakai warisan generasi sebelumnya, dan melibatkan jaringan lintas bahasa serta agama.',
      ],
      practice: 'Pilih satu tokoh dan telusuri karya aslinya atau kajian sejarah ilmu yang tepercaya. Catat bidang, karya, konteks zaman, dan apa yang benar-benar didukung sumber tanpa membesar-besarkan klaim.',
      source: { label: 'Stanford Encyclopedia of Philosophy — Al-Kindi', labelEn: 'Stanford Encyclopedia of Philosophy — Al-Kindi', href: 'https://plato.stanford.edu/entries/al-kindi/' },
      extraReferences: [
        { label: 'Cambridge University Press — Al-Razi', labelEn: 'Cambridge University Press — Al-Razi', href: 'https://www.cambridge.org/core/books/abs/religion-learning-and-science-in-the-abbasid-period/alrazi/762B6225FF0F3508D6B7CD7CB494218C' },
        { label: 'PubMed — Al-Zahrawi dan sejarah bedah', labelEn: 'PubMed — Al-Zahrawi and the history of surgery', href: 'https://pubmed.ncbi.nlm.nih.gov/32736026/' },
        { label: 'Journal of Applied Physiology — Ibn al-Nafis dan sirkulasi paru', labelEn: 'Journal of Applied Physiology — Ibn al-Nafis and pulmonary circulation', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2612469/' },
        { label: 'Encyclopaedia Iranica — Ibn al-Baytar', labelEn: 'Encyclopaedia Iranica — Ibn al-Baytar', href: 'https://www.iranicaonline.org/articles/ebn-al-baytar/' },
        { label: 'Stanford Encyclopedia of Philosophy — Al-Farabi', labelEn: 'Stanford Encyclopedia of Philosophy — Al-Farabi', href: 'https://plato.stanford.edu/entries/al-farabi/' },
        { label: 'Institute of Ismaili Studies — Nasir al-Din al-Tusi', labelEn: 'Institute of Ismaili Studies — Nasir al-Din al-Tusi', href: 'https://ismi.mpiwg-berlin.mpg.de/biography/Tusi_BEA.htm' },
        { label: 'Islam Museum — Al-Jazari dan perangkat mekanik', labelEn: 'Islam Museum — Al-Jazari and mechanical devices', href: 'https://www.islam.museum/en/person/al-jazari-engineer/' },
        { label: 'National Geographic Education — Al-Idrisi', labelEn: 'National Geographic Education — Al-Idrisi', href: 'https://education.nationalgeographic.org/resource/al-idrisi/' },
        { label: 'Stanford Encyclopedia of Philosophy — Ibn Rushd', labelEn: 'Stanford Encyclopedia of Philosophy — Ibn Rushd', href: 'https://plato.stanford.edu/entries/ibn-rushd/' },
      ],
    },
    {
      id: 'andalusia-cordoba',
      title: 'Keemasan Andalusia: Mercusuar Eropa di Abad Pertengahan',
      category: 'Pusat Peradaban',
      summary: 'Peradaban Islam di Spanyol (Cordoba dan Granada) yang menjadi pusat pencerahan sains, arsitektur, dan toleransi lintas agama di tanah Eropa.',
      points: [
        'Kota Termaju di Eropa: Saat kota-kota Eropa masih dalam kegelapan (Dark Ages), Cordoba telah memiliki jalan-jalan beraspal berlampu, 70 perpustakaan umum, dan ratusan pemandian umum.',
        'Universitas Cordoba: Pusat akademik internasional yang didatangi mahasiswa dan sarjana dari berbagai penjuru Eropa untuk mempelajari kedokteran, matematika, dan filsafat.',
        'La Convivencia (Harmoni Lintas Iman): Kehidupan berdampingan yang harmonis antara Muslim, Kristen (Mozarab), dan Yahudi di bawah perlindungan hukum syariat Islam.',
        'Penyambung Renaisans: Karya terjemahan ilmuwan Muslim Andalusia (seperti Ibnu Rusyd/Averroes dan Az-Zahrawi) menjadi katalis utama yang memicu Renaisans di Eropa.',
      ],
      practice: 'Buktikan bahwa Islam adalah rahmatan lil \'alamin yang mampu membangun peradaban maju, toleran, dan bermartabat.',
      source: quran('21/107'),
    },
    {
      id: 'sanitasi-dan-bimaristan',
      title: 'Rumah Sakit Islam (Bimaristan) & Sanitasi Perkotaan',
      category: 'Institusi Publik',
      summary: 'Sistem pelayanan kesehatan gratis, rumah sakit modern pertama, dan arsitektur sanitasi air bersih perkotaan dalam sejarah Islam.',
      points: [
        'Konsep Bimaristan: Rumah sakit umum Islam yang melayani seluruh masyarakat (kaya maupun miskin, Muslim maupun non-Muslim) secara cuma-cuma yang didanai lembaga wakaf.',
        'Pemisahan Bangsal Spesialis: Bimaristan memiliki bangsal terpisah untuk penyakit dalam, bedah, mata, penyakit menular, hingga bangsal kejiwaan dengan terapi musik dan gemericik air.',
        'Pendidikan Klinis Dokter: Berfungsi ganda sebagai rumah sakit dan fakultas kedokteran tempat dokter magang dibimbing langsung oleh dokter senior (seperti Rumah Sakit Al-Adudi di Baghdad).',
        'Teknologi Air Al-Jazari: Pencipta mesin-mesin hidrolik, jam gajah mekanik, dan sistem pompa air bersih yang mengalirkan air ke rumah-rumah dan masjid.',
      ],
      practice: 'Dukung penguatan wakaf produktif untuk fasilitas kesehatan masyarakat dan sarana kesejahteraan umum umat.',
      source: hadith(13),
    },
    {
      id: 'ibrah-kebangkitan',
      title: 'Ibrah Keruntuhan & Strategi Kebangkitan Peradaban Masa Depan',
      category: 'Refleksi & Masa Depan',
      summary: 'Menganalisis faktor kemunduran masa lalu (kebekuan berpikir, disintegrasi, kemewahan) dan cetak biru kebangkitan umat di era modern.',
      points: [
        'Faktor Kemunduran: Perpecahan internal umat, fanatisme mazhab yang sempit, pintu ijtihad yang ditinggalkan, kemewahan moral penguasa, serta invasi brutal Mongol (penghancuran Baghdad 1258 M).',
        'Pemisahan Fatal Ilmu Agama & Sains: Kemunduran terjadi ketika sains dianggap "ilmu sekuler non-agama", padahal generasi awal memandangnya sebagai sarana tadabbur ayat kauniyah Allah.',
        'Kunci Kebangkitan: Mengintegrasikan kembali iman, akhlak mulia, dan penguasaan sains-teknologi (AI, bioteknologi, energi baru terbarukan).',
        'Peran Generasi Muda Muslim: Menjadi produsen inovasi peradaban (bukan sekadar konsumen), berintegritas tinggi, dan berkontribusi nyata bagi kemakmuran dunia.',
      ],
      practice: 'Kikis rasa rendah diri peradaban (inferiority complex); kuasai teknologi canggih masa kini dengan ruh tauhid yang kokoh.',
      source: quran('13/11'),
    },
  ],
};

export const parenting: Course = {
  id: 'parenting',
  title: "Parenting & Psikologi Keluarga Islami",
  description: "Panduan praktis pengasuhan anak berbasis Sunnah dan Al-Qur'an: metode Luqman Al-Hakim, tahapan usia anak, komunikasi empati, perlindungan era digital, dan kesehatan mental keluarga.",
  note: "Anak adalah amanah dan fitrah suci. Mendidik anak dalam Islam bukan sekadar menuntut ketaatan, melainkan menumbuhkan jiwa dengan teladan cinta, doa, dan kelembutan.",
  lessons: [
    {
      id: 'metode-luqman',
      title: 'Kurikulum Karakter Luqman Al-Hakim (QS. Luqman: 13-19)',
      category: 'Metodologi Qur\'ani',
      summary: 'Urutan prioritas penanaman nilai pendidikan anak terbaik yang diabadikan Allah langsung dalam Al-Qur\'an.',
      points: [
        'Fondasi Tauhid: Memulai dengan larangan menyekutukan Allah (syirik) sebagai kezaliman terbesar, dipanggil dengan sebutan penuh kasih: "Wahai anakku tercinta" (Ya Bunayya).',
        'Birrul Walidain: Menanamkan empati dan rasa syukur kepada orang tua, terutama ibu yang telah mengandung dalam susah payah dan menyapih selama dua tahun.',
        'Muraqabatullah: Menanamkan kesadaran bahwa perbuatan sekecil biji sawi di dalam batu atau langit pasti diketahui dan dibalas oleh Allah yang Maha Halus.',
        'Karakter Sosial: Perintah mendirikan shalat, amar ma\'ruf nahi munkar, bersabar menghadapi ujian, dan larangan memalingkan muka (sombong) atau melangkah angkuh.',
      ],
      practice: 'Panggil anak dengan panggilan kasih sayang dan tanamkan keimanan sejak dini sebelum mengenalkan aturan hukum.',
      source: quran('31/13'),
    },
    {
      id: 'tahapan-usia-sunnah',
      title: 'Tahapan Usia Tumbuh Kembang Anak Menurut Sunnah',
      category: 'Psikologi Perkembangan',
      summary: 'Pembagian fase pengasuhan Rasulullah SAW dan para sahabat yang selaras dengan psikologi perkembangan modern.',
      points: [
        'Fase 1 (0 - 7 Tahun): Masa Bermain & Kasih Sayang. Penuhi kebutuhan rasa aman (bonding), pelukan fisik, dan keteladanan visual tanpa pemaksaan beban disiplin berat.',
        'Fase 2 (7 - 14 Tahun): Masa Penanaman Disiplin & Tanggung Jawab. Rasulullah bersabda: "Perintahkan anak-anakmu shalat ketika berusia 7 tahun dan tegaskan ketika 10 tahun."',
        'Fase 3 (14 - 21 Tahun): Masa Menjadi Sahabat & Diskusi. Anak memasuki usia baligh/remaja; dekati dengan diskusi logika, dengarkan keluh kesah, dan bimbing identitas dirinya.',
        'Fase 4 (> 21 Tahun): Masa Mandiri & Kemitraan. Orang tua bertindak sebagai penasihat bijak saat anak mulai mengarungi kehidupan rumah tangga dan karier mandiri.',
      ],
      practice: 'Sesuaikan gaya mendidik Anda dengan fase umur anak; jangan memperlakukan remaja seperti anak balita atau sebaliknya.',
      source: hadith(24),
    },
    {
      id: 'adab-dan-hak-anak',
      title: 'Hak Anak & Keadilan Pengasuhan Orang Tua',
      category: 'Hak & Kewajiban',
      summary: 'Hak-hak fundamental anak yang wajib dipenuhi orang tua sejak lahir dan larangan berlaku diskriminatif (pilih kasih).',
      points: [
        'Hak Sejak Lahir: Tasmiyah (pemberian nama yang bermakna baik), Tahnik dengan kurma, \'Aqiqah pada hari ke-7, dan khitan.',
        'Nafkah dari Sumber Halal: Memberi makan dan membiayai pendidikan dari harta yang 100% halal karena makanan syubhat/haram merusak akhlak dan kepekaan nurani anak.',
        'Keadilan Kasih Sayang: Larangan membeda-bedakan kasih sayang, hadiah, atau perlakuan antara anak laki-laki dan perempuan (Kisah Nu\'man bin Basyir yang ditegur Nabi SAW).',
        'Pemberian Hak Bermain: Mengizinkan anak menikmati masa kecilnya; Rasulullah membiarkan cucu beliau Hasan dan Husain naik ke punggungnya saat sujud.',
      ],
      practice: 'Bersikaplah adil secara transparan kepada semua anak dalam pemberian hadiah, pujian, dan perhatian sehari-hari.',
      source: hadith(41),
    },
    {
      id: 'komunikasi-positif-tanpa-bentakan',
      title: 'Seni Komunikasi Positif & Kelembutan Mendidik',
      category: 'Teknik Pengasuhan',
      summary: 'Meneladani komunikasi santun Rasulullah SAW yang mendidik tanpa kekerasan verbal, bentakan, atau celaan yang melukai jiwa anak.',
      points: [
        'Kesaksian Anas bin Malik RA: "Aku melayani Rasulullah SAW selama 10 tahun, demi Allah beliau tidak pernah sekalipun berkata \'Ah\' kepadaku, dan tidak pernah mencela perbuatanku."',
        'Dampak Buruk Bentakan: Riset neurosains membuktikan teriakan dan kemarahan destruktif memicu pelepasan hormon kortisol berlebih yang merusak sel otak memori anak.',
        'Validasi Emosi Anak: Dengarkan perasaan anak terlebih dahulu sebelum memberi koreksi; anak yang merasa didengar akan lebih mudah diajak bekerja sama.',
        'Memberi Pujian pada Usaha (Process Praise): Apresiasi kerja keras dan akhlak terpuji anak daripada hanya memuji hasil akhir atau nilai akademis semata.',
      ],
      practice: 'Tarik napas dalam-dalam saat marah; tahan diri dari ucapan kasar atau label negatif kepada anak ("kamu nakal/bodoh").',
      source: hadith(73),
    },
    {
      id: 'privasi-edukasi-seksualitas',
      title: 'Adab Privasi (Isti\'dzan) & Edukasi Seksualitas Qur\'ani',
      category: 'Pendidikan Akhlak',
      summary: 'Panduan Al-Qur\'an dalam membangun batasan aurat, adab meminta izin masuk kamar, dan proteksi anak dari pelecehan.',
      points: [
        'Adab Meminta Izin (QS. An-Nur: 58): Melatih anak meminta izin sebelum masuk kamar orang tua pada 3 waktu privasi: sebelum Subuh, tengah hari (qailulah), dan setelah Isya.',
        'Pemisahan Tempat Tidur: Sabda Nabi SAW: "Pisahkanlah tempat tidur mereka (antara anak laki-laki dan perempuan) saat berusia 10 tahun."',
        'Proteksi Sentuhan: Mengajarkan anak mengenali anggota tubuh privasi (aurat) yang tidak boleh dilihat atau disentuh oleh siapa pun (underwear rule).',
        'Edukasi Baligh yang Positif: Membekali anak menjelang aqil baligh tentang mimpi basah, haid, mandi janabah, dan konsekuensi tanggung jawab hukum syariat (mukallaf).',
      ],
      practice: 'Ajarkan anak mengetuk pintu dan menunggu izin sejak usia dini serta berani berkata "TIDAK" jika merasa tidak aman.',
      source: quran('24/58'),
    },
    {
      id: 'tantangan-era-digital',
      title: 'Menjaga Anak di Era Digital & Kecanduan Gadget',
      category: 'Tantangan Modern',
      summary: 'Strategi bijak orang tua menghadapi gempuran layar gawai, algoritma media sosial, pornografi digital, dan game online.',
      points: [
        'Batas Waktu Layar (Screen Time): Menetapkan aturan tegas zona bebas gadget (saat makan bersama, ruang tidur, dan waktu shalat/maghrib).',
        'Filtering & Pendampingan: Memasang filter proteksi keluarga dan tidak membiarkan anak mengakses internet sendirian di ruang tertutup tanpa pengawasan.',
        'Menyediakan Alternatif Bermakna: Melibatkan anak dalam aktivitas fisik luar ruang, olahraga sunnah (berenang, memanah), seni bela diri, dan interaksi sosial nyata.',
        'Digital Literacy & Akhlak Medsos: Membekali anak pemahaman tentang jejak digital, bahaya cyberbullying, serta larangan menyebarkan fitnah dan pamer (riya).',
      ],
      practice: 'Jadilah teladan digital di rumah: letakkan smartphone Anda saat berbicara langsung dengan anak.',
      source: quran('66/6'),
    },
    {
      id: 'kesehatan-mental-keluarga',
      title: 'Kesehatan Mental Anak & Penanganan Emosi Remaja',
      category: 'Kesehatan Mental',
      summary: 'Memahami gejolak mental generasi muda Islami, depresi, kecemasan (anxiety), dan membangun ketahanan spiritual (resilience).',
      points: [
        'Dekonstruksi Stigma: Gangguan kecemasan dan stres pada anak bukan semata-mata karena "kurang iman", melainkan memerlukan dukungan psikologis, medis, dan empati keluarga.',
        'Ruang Aman di Rumah: Rumah harus menjadi tempat paling aman dan nyaman bagi anak untuk pulang, bukan tempat penghakiman yang menakutkan.',
        'Coping Mechanism Islami: Mengajarkan dzikir penenang jiwa, shalat khusyuk, dan tilawah Al-Qur\'an sebagai terapi ketenangan batin terbukti secara ilmiah.',
        'Membangun Grit & Husnuzhan: Melatih anak menerima kegagalan sebagai sarana belajar dan menumbuhkan prasangka baik kepada takdir Allah SWT.',
      ],
      practice: 'Sediakan waktu khusus 15 menit setiap hari untuk berbincang santai dari hati ke hati tanpa gadget bersama anak.',
      source: quran('13/28'),
    },
    {
      id: 'peran-ayah-fatherhood',
      title: 'Peran Strategis Ayah (Fatherhood in Islam)',
      category: 'Struktur Keluarga',
      summary: 'Menghidupkan kembali sosok ayah yang hadir utuh (bukan fatherless) dalam pendidikan tauhid dan kepemimpinan moral anak.',
      points: [
        'Fenomena Fatherless: 14 dialog pendidikan dalam Al-Qur\'an didominasi oleh figur ayah (Nabi Ibrahim, Ya\'qub, Luqman), menegaskan peran ayah bukan hanya pencari nafkah material.',
        'Ayah sebagai Pelindung Nilai (Qawwam): Mengarahkan visi masa depan keluarga dan menjadi benteng moral dari pengaruh negatif lingkungan.',
        'Kehangatan Figur Ayah: Rasulullah SAW selalu mencium kening putrinya Fathimah RA dan berdiri menyambut kedatangannya dengan penuh hormat dan kasih sayang.',
        'Dampak Ayah yang Terlibat: Riset membuktikan kehadiran ayah aktif meningkatkan rasa percaya diri anak, kecerdasan emosional, dan kestabilan mental di masa depan.',
      ],
      practice: 'Para ayah, luangkan waktu bermain dan mengobrol dengan anak; kehadiran Anda tidak bisa digantikan oleh materi apa pun.',
      source: hadith(52),
    },
    {
      id: 'manajemen-emosi-orangtua',
      title: 'Manajemen Emosi Orang Tua & Memutus Rantai Luka Masa Lalu',
      category: 'Psikologi Dewasa',
      summary: 'Mengenali luka batin masa kecil (inner child) orang tua agar tidak terlampiaskan secara beracun kepada generasi penerus.',
      points: [
        'Koreksi Diri Sebelum Mendidik: Anak meniru perilaku orang tua (mirroring), bukan sekadar mendengarkan nasihat verbal.',
        'Berdamai dengan Luka Asuh: Menyadari bahwa pola asuh kasar di masa lalu tidak boleh diwariskan kembali kepada anak-anak kita saat ini.',
        'Larangan Mendidik Saat Emosi Puncak: Jangan pernah menghukum anak dalam keadaan marah menyala; tunda hukuman hingga emosi Anda stabil dan rasional.',
        'Keberanian Meminta Maaf: Orang tua yang berani meminta maaf secara tulus saat berbuat salah akan mengajarkan nilai integritas dan kerendahan hati kepada anak.',
      ],
      practice: 'Ucapkan maaf kepada anak jika Anda sempat meninggikan suara secara keliru; ini menumbuhkan rasa hormat timbal balik.',
      source: hadith(76),
    },
    {
      id: 'doa-kesalehan-keturunan',
      title: 'Kekuatan Doa Orang Tua untuk Kesalehan Keturunan',
      category: 'Spiritualitas',
      summary: 'Himpunan doa-doa mustajab para nabi dalam Al-Qur\'an untuk memohon anak keturunan yang shalih, penyejuk mata, dan pemimpin orang bertakwa.',
      points: [
        'Doa Nabi Ibrahim AS: "Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan shalat" (QS. Ibrahim: 40).',
        'Doa \'Ibadurrahman (QS. Al-Furqan: 74): "Rabbana hab lana min azwajina wa dzurriyyatina qurrata a\'yun waj\'alna lil muttaqina imama" (Penyejuk pandangan mata dan pemimpin ketakwaan).',
        'Doa Usia 40 Tahun (QS. Al-Ahqaf: 15): Memohon taufiq untuk mensyukuri nikmat dan memohon agar Allah memberi kebaikan kepada anak cucu keturunan.',
        'Kemustajaban Doa Orang Tua: Sabda Nabi SAW: "Tiga doa yang tidak tertolak: doa orang tua kepada anaknya, doa orang berpuasa, dan doa orang yang terzalimi."',
      ],
      practice: 'Jadikan doa-doa mustajab Al-Qur\'an sebagai wirid rutin selepas shalat fardhu demi perlindungan anak cucu di dunia dan akhirat.',
      source: quran('25/74'),
    },
  ],
};

export const ulumulQuran: Course = {
  id: 'ulumul-quran',
  title: "Ulumul Qur'an & Metodologi Tafsir",
  description: "Memahami ilmu-ilmu Al-Qur'an: sejarah kodifikasi mushaf, karakteristik Makkiyah-Madaniyah, asbabun nuzul, nasikh-mansukh, dan metodologi penafsiran yang benar.",
  note: "Ulumul Qur'an adalah kunci gerbang memahami kalam Ilahi secara proporsional dan melindungi pemikiran dari penafsiran subjektif atau pemaksaan konteks.",
  lessons: [
    {
      id: 'urgensi-ulumul-quran',
      title: 'Urgensi & Ruang Lingkup Ulumul Qur\'an',
      category: 'Pengantar Ilmu',
      summary: 'Mengenal cabang-cabang ilmu Al-Qur\'an sebagai sarana wajib untuk mentadabburi ayat-ayat Allah secara shahih dan mendalam.',
      points: [
        'Definisi Ulumul Qur\'an: Disiplin ilmu yang membahas berbagai aspek seputar Al-Qur\'an, mulai dari proses pewahyuan, penulisan, pengumpulan, pembacaan (qira\'at), tafsir, hingga kemukjizatannya.',
        'Tujuan Mempelajari: Menjaga kemurnian pemahaman risalah Al-Qur\'an, membekali penuntut ilmu dengan kaidah penafsiran yang lurus, dan menangkal keraguan (syubhat).',
        'Pilar Tadabbur: Allah berfirman: "Maka apakah mereka tidak mentadabburi Al-Qur\'an ataukah hati mereka terkunci?" (QS. Muhammad: 24).',
        'Tahapan Belajar: Menguasai bahasa Arab dasar, mempelajari asbabun nuzul, merujuk pada tafsir mu\'tamad, dan mengamalkannya dalam kehidupan nyata.',
      ],
      practice: 'Jadikan tilawah harian diiringi dengan membaca terjemahan dan makna ringkas tafsir ayat yang dibaca.',
      source: quran('47/24'),
    },
    {
      id: 'kodifikasi-al-quran',
      title: 'Sejarah Kodifikasi & Pengumpulan Mushaf Al-Qur\'an',
      category: 'Sejarah Mushaf',
      summary: 'Perjalanan pemeliharaan wahyu dari hafalan para sahabat hingga standarisasi Mushaf Utsmani yang kita baca hari ini.',
      points: [
        'Zaman Rasulullah SAW: Al-Qur\'an dihafal di luar kepala oleh ratusan sahabat dan dicatat pada media sederhana (pelepah kurma, lempengan batu, kulit unta) di bawah bimbingan langsung Nabi.',
        'Zaman Abu Bakar Ash-Shiddiq: Usulan Umar bin Khattab pasca Perang Yamamah (gugurnya banyak penghafal Al-Qur\'an); Zaid bin Tsabit ditunjuk memimpin penghimpunan lembaran naskah ke dalam satu shuhuf.',
        'Zaman Utsman bin Affan: Penyatuan mushaf induk (Mushaf Utsmani) akibat meluasnya wilayah Islam dan perselisihan dialek bacaan; 5-6 mushaf induk dikirim ke kota-kota besar Islam.',
        'Penyempurnaan Tanda Baca (Rasm & Harakat): Abu al-Aswad ad-Du\'ali dan Nashr bin Ashim menambahkan titik dan harakat untuk memudahkan pembaca non-Arab.',
      ],
      practice: 'Syukuri nikmat terjaganya Al-Qur\'an yang otentik tanpa perubahan satu huruf pun selama 14 abad lamanya.',
      source: quran('15/9'),
    },
    {
      id: 'makkiyah-madaniyah',
      title: 'Karakteristik Ayat Makkiyah vs Madaniyah',
      category: 'Karakteristik Teks',
      summary: 'Memahami perbedaan konteks turunnya wahyu sebelum hijrah (Makkiyah) dan setelah hijrah ke Madinah (Madaniyah).',
      points: [
        'Klasifikasi Periode: Mayoritas ulama sepakat patokan Makkiyah adalah wahyu yang turun sebelum peristiwa Hijrah ke Madinah, sedangkan Madaniyah turun setelah Hijrah.',
        'Karakteristik Makkiyah: Ayat-ayat relatif pendek, bernada ritmis tegas, fokus membedah kemurnian Tauhid, pembuktian Hari Kiamat, kisah para nabi masa lalu, dan bantahan atas paganisme.',
        'Karakteristik Madaniyah: Ayat-ayat lebih panjang dan terperinci, membahas hukum syariat formal (muamalah, hudud, waris, keluarga), tata kelola negara, dan dialog dengan Ahli Kitab.',
        'Hikmah Dakwah: Mengajarkan tahapan dakwah (tadrij): tanamkan akidah dan tauhid terlebih dahulu secara kokoh sebelum membebankan syariat kewajiban hukum.',
      ],
      practice: 'Terapkan metode tadrij dalam menasihati orang lain: kuatkan keimanan dan cintanya kepada Allah sebelum menuntut ketaatan syariat.',
      source: quran('17/106'),
    },
    {
      id: 'asbabun-nuzul',
      title: 'Asbabun Nuzul: Sebab & Konteks Turunnya Ayat',
      category: 'Konteks Historis',
      summary: 'Peran vital riwayat latar belakang suatu ayat dalam mengungkap maksud firman Allah dan mencegah generalisasi keliru.',
      points: [
        'Definisi Asbabun Nuzul: Peristiwa nyata atau pertanyaan para sahabat yang terjadi pada masa Rasulullah SAW yang menjadi latar belakang turunnya satu atau beberapa ayat Al-Qur\'an.',
        'Manfaat Mengetahui: Mengetahui hikmah pensyariatan hukum, menghilangkan kemusykilan pemahaman teks, dan memperjelas siapa objek yang dimaksud dalam ayat.',
        'Kaidah Ushul Terkenal: "Al-\'Ibratu bi \'Umumil Lafzhi la bi Khushushis Sabab" (Patokan hukum adalah pada keumuman lafaz ayat, bukan pada kekhususan sebab peristiwa turunnya).',
        'Contoh Penerapan: Memahami ayat-ayat perang (Qital) yang turun dalam konteks mempertahankan diri dari agresi kafir Quraisy, sehingga tidak dipelintir untuk aksi radikalisme serampangan.',
      ],
      practice: 'Jangan memotong-motong kutipan ayat Al-Qur\'an tanpa memeriksa asbabun nuzul dan konteks kalimat utuhnya.',
      source: quran('16/44'),
    },
    {
      id: 'nasikh-mansukh',
      title: 'Konsep Nasikh & Mansukh: Tahapan Penetapan Hukum',
      category: 'Kaidah Hukum',
      summary: 'Memahami penggantian hukum syariat terdahulu dengan hukum baru yang lebih sesuai dengan kemaslahatan umat.',
      points: [
        'Pengertian: Naskh secara bahasa berarti menghapus atau memindahkan; secara istilah syariat adalah pembatalan atau penggantian hukum syara\' yang telah lalu dengan hukum syara\' yang datang kemudian.',
        'Hikmah Naskh: Menunjukkan kasih sayang Allah dan kelemahlembutan-Nya dalam mendidik umat secara bertahap menuju kesempurnaan moral.',
        'Contoh Klasik Pentahapan Khamr: Dimulai dari penjelasan mudharat lebih besar dari manfaat (QS. Al-Baqarah: 219), larangan shalat saat mabuk (QS. An-Nisa: 43), hingga pengharaman mutlak (QS. Al-Ma\'idah: 90).',
        'Perubahan Arah Kiblat: Peralihan kiblat shalat dari Baitul Maqdis (Yerusalem) ke Ka\'bah di Masjidil Haram Makkah (QS. Al-Baqarah: 144).',
      ],
      practice: 'Pahami bahwa syariat Islam selalu membawa kemudahan, hikmah, dan kemaslahatan bagi manusia di setiap zaman.',
      source: quran('2/106'),
    },
    {
      id: 'muhkam-mutasyabih',
      title: 'Ayat Muhkam & Mutasyabih: Menyikapi Teks Samar',
      category: 'Kaidah Penafsiran',
      summary: 'Panduan Al-Qur\'an dalam menyikapi ayat-ayat yang maknanya jelas (Muhkam) dan ayat-ayat yang membutuhkan ketelitian takwil (Mutasyabih).',
      points: [
        'Penjelasan Al-Qur\'an (QS. Ali Imran: 7): Al-Qur\'an terdiri dari ayat Muhkamat (pokok-pokok isi kitab yang jelas) dan Mutasyabihat (ayat-ayat yang maknanya samar/memiliki banyak kemungkinan).',
        'Ayat Muhkam: Pokok-pokok akidah, hukum halal-haram yang sharih, perintah shalat, larangan membunuh dan mencuri.',
        'Ayat Mutasyabih: Huruf-huruf muqaththa\'ah di awal surah (Alif Lam Mim), hakikat sifat-sifat Allah yang tidak serupa dengan makhluk (Istiwa, Tangan, Wajah Allah), dan detail alam ghaib.',
        'Sikap Orang Berilmu (Ar-Rasikhuna fil \'Ilmi): Menyerahkan hakikat ilmunya kepada Allah (tafwidh) atau menakwilkannya secara terhormat selaras dengan kaidah "Laisa kamitslihi syai\'un" (Tidak ada sesuatu pun yang serupa dengan-Nya).',
      ],
      practice: 'Pusatkan amalan pada ayat-ayat muhkam yang jelas dan jangan terseret dalam perdebatan tak bermakna seputar ayat mutasyabih.',
      source: quran('3/7'),
    },
    {
      id: 'dimensi-ijaz-alquran',
      title: 'Dimensi I\'jaz: Berbagai Sisi Kemukjizatan Al-Qur\'an',
      category: 'Kemukjizatan',
      summary: 'Mengapa Al-Qur\'an disebut mukjizat abadi sepanjang masa yang tidak pernah dapat ditandingi oleh manusia dan jin.',
      points: [
        '1. I\'jaz Lughawi (Kebahasaan): Keindahan sastra, harmoni rima, ketepatan diksi, dan kekuatan balaghah yang membungkam para penyair ulung Arab Jahiliyah.',
        '2. I\'jaz Ilmi (Sains): Isyarat fenomena alam yang presisi mendahului sains modern (embriologi, ekspansi alam semesta, siklus air, lapisan atmosfer).',
        '3. I\'jaz Tasyri\'i (Keadilan Hukum): Keseimbangan sistem hukum Islam yang mengatur seluruh sendi kehidupan (keluarga, ekonomi, sosial) dengan keadilan paripurna.',
        '4. I\'jaz Ghaibi: Ramalan peristiwa masa depan yang terbukti akurat (kemenangan Romawi atas Persia di QS. Ar-Rum: 2-4) dan kabar sejarah umat masa lalu yang belum diketahui sejarawan saat itu.',
      ],
      practice: 'Tingkatkan keyakinan intelektual bahwa Al-Qur\'an mustahil merupakan karangan manusia (Nabi Muhammad SAW yang ummi).',
      source: quran('17/88'),
    },
    {
      id: 'metodologi-tafsir',
      title: 'Metodologi Tafsir: Bil Ma\'tsur vs Bir Ra\'yi',
      category: 'Metode Penafsiran',
      summary: 'Tingkatan hierarki rujukan penafsiran Al-Qur\'an yang muktamad dan syarat-syarat ketat seorang mufassir.',
      points: [
        'Tingkatan Tertinggi: Tafsir Al-Qur\'an dengan Al-Qur\'an (ayat ditafsirkan oleh ayat lain di surah berbeda).',
        'Tingkatan Kedua: Tafsir Al-Qur\'an dengan Sunnah Shahihah (penjelasan lisan atau praktik Rasulullah SAW).',
        'Tingkatan Ketiga: Tafsir dengan Atsar Sahabat (seperti Ibnu Abbas radhiyallahu \'anhuma, Sang Tarjumanul Qur\'an) dan Tabi\'in.',
        'Tafsir Bir Ra\'yi: Penafsiran berbasis ijtihad nalar akal dan kaidah tata bahasa Arab; terpuji (mahmud) bila memenuhi syarat kaidah syar\'i, dan tercela (madzmum) bila hanya berdasarkan hawa nafsu subjektif semata.',
      ],
      practice: 'Ketika ragu akan arti suatu ayat, rujuklah kitab tafsir karya ulama muktamad, jangan mereka-reka penafsiran sendiri.',
      source: hadith(26),
    },
    {
      id: 'mengenal-kitab-tafsir',
      title: 'Mengenal Kitab-Kitab Tafsir Terbesar Sepanjang Sejarah',
      category: 'Pustaka Islam',
      summary: 'Panduan mengenal corak, metode, dan rujukan kitab-kitab tafsir utama umat Islam dari era klasik hingga modern.',
      points: [
        'Jami\' al-Bayan karya Imam At-Thabari (w. 310 H): Induk dari seluruh kitab tafsir bil ma\'tsur dengan jalur sanad riwayat yang sangat lengkap.',
        'Tafsir Al-Qur\'an Al-\'Azhim karya Ibnu Katsir (w. 774 H): Tafsir paling populer di dunia Islam yang mengaitkan ayat dengan hadits-hadits shahih dan atsar.',
        'Al-Jami\' li Ahkam Al-Qur\'an karya Imam Al-Qurthubi (w. 671 H): Ensiklopedia tafsir yang mengupas tuntas hukum-hukum fiqih dari setiap ayat syariat.',
        'Taisir Al-Karim Ar-Rahman karya Syaikh As-Sa\'di (w. 1376 H): Tafsir kontemporer yang ringkas, bahasa yang sangat mudah dipahami, berfokus pada makna praktis dan tazkiyah.',
      ],
      practice: 'Milikilah minimal satu kitab tafsir ringkas (seperti Tafsir As-Sa\'di atau Tafsir Ibnu Katsir Ringkas) sebagai bacaan keluarga di rumah.',
      source: quran('2/185'),
    },
    {
      id: 'adab-tadabbur-modern',
      title: 'Adab Tadabbur Al-Qur\'an di Era Modern & Hindari Cocoklogi',
      category: 'Aplikasi Kontemporer',
      summary: 'Panduan berinteraksi dengan firman Allah secara jujur, objektif, dan terhindar dari pemaksaan penafsiran liar.',
      points: [
        'Fenomena Cocoklogi: Pemaksaan ayat Al-Qur\'an untuk membenarkan teori ilmiah yang masih tentatif atau ramalan-ramalan politik musiman.',
        'Keadilan Intelektual: Al-Qur\'an adalah kitab petunjuk hidup (Hudan), bukan ensiklopedia teknis sains; sains tunduk pada evaluasi, sedangkan Al-Qur\'an adalah kebenaran mutlak.',
        'Adab Hati saat Membaca: Berwudhu, menghadap kiblat, membaca dengan tartil, meresapi ancaman dan janji rahmat Allah, serta berhenti sejenak untuk berdoa.',
        'Puncak Tadabbur adalah Pengamalan: Sayyidah Aisyah menyifati akhlak Rasulullah SAW: "Akhlak beliau adalah Al-Qur\'an" (HR. Muslim).',
      ],
      practice: 'Ubah cara berinteraksi dengan Al-Qur\'an: tidak hanya mengejar target khatam bacaan, tapi luangkan waktu merenungi dan mengamalkan maknanya.',
      source: quran('38/29'),
    },
  ],
};

export const faraidh: Course = {
  id: 'faraidh',
  title: "Faraidh & Hukum Waris Islam",
  description: "Panduan komprehensif hukum waris Islam: rukun, syarat, penghalang waris, pembagian Ashabul Furudh dan Ashabah, filosofi rasio 2:1, wasiat, hibah, serta solusi sengketa.",
  note: "Ilmu Faraidh adalah instrumen syariat untuk menegakkan keadilan distribusi harta keluarga dan mencegah permusuhan persaudaraan.",
  lessons: [
    {
      id: 'urgensi-ilmu-faraidh',
      title: 'Urgensi Mempelajari Faraidh & Perintah Rasulullah',
      category: 'Konsep Dasar',
      summary: 'Kedudukan istimewa ilmu waris dalam Islam sebagai benteng keadilan harta dan salah satu ilmu yang pertama kali dilupakan manusia.',
      points: [
        'Sabda Rasulullah SAW: "Pelajarilah ilmu faraidh dan ajarkanlah kepada manusia, karena sesungguhnya ia adalah separuh dari ilmu, dan ia adalah ilmu yang pertama kali akan dicabut dari umatku" (HR. Ibnu Majah).',
        'Ketetapan Langsung dari Allah: Rincian pembagian waris tidak diserahkan kepada nalar manusia atau ijtihad nabi, melainkan dirinci detail langsung oleh Allah dalam QS. An-Nisa: 11-12 dan 176.',
        'Ancaman Memakan Harta Waris secara Batil: Allah mengancam neraka jahanam bagi siapa saja yang melanggar batas-batas hukum waris-Nya (QS. An-Nisa: 14).',
        'Mencegah Konflik Keluarga: Hukum waris yang pasti dan transparan menutup pintu perselisihan, perebutan harta, dan permusuhan antar saudara kandung.',
      ],
      practice: 'Berniat mempelajari ilmu waris agar kelak pembagian harta peninggalan keluarga sesuai dengan tuntunan syariat Allah.',
      source: quran('4/11'),
    },
    {
      id: 'tahapan-sebelum-bagi-waris',
      title: '4 Hak Harta Peninggalan Sebelum Dibagikan',
      category: 'Prosedur Syar\'i',
      summary: 'Urutan prioritas pengeluaran harta peninggalan jenazah (tirkah) yang wajib diselesaikan terlebih dahulu sebelum waris dibagikan.',
      points: [
        '1. Biaya Tajhiz (Pengurusan Jenazah): Biaya memandikan, kain kafan, pemakaman, dan kubur secara wajar (tidak berlebihan dan tidak pelit).',
        '2. Pelunasan Utang Piutang (Duyun): Melunasi utang jenazah kepada Allah (zakat tertunggak, nazar, kaffarah) dan utang kepada sesama manusia.',
        '3. Penunaian Wasiat (Washiyyah): Maksimal sepertiga (1/3) dari sisa harta bersih, dan hanya diperuntukkan bagi selain ahli waris (misal untuk anak angkat, lembaga sosial, atau sahabat karib).',
        '4. Pembagian Harta Waris (Irts): Harta bersih yang tersisa setelah ketiga hak di atas selesai barulah sah dibagikan kepada para ahli waris yang berhak.',
      ],
      practice: 'Segera catat dan selesaikan utang serta wasiat jenazah sebelum membagi harta waris agar almarhum tenang di alam kubur.',
      source: quran('4/12'),
    },
    {
      id: 'rukun-syarat-penghalang',
      title: 'Rukun, Syarat, & 3 Faktor Penghalang Waris',
      category: 'Ketentuan Hukum',
      summary: 'Memahami rukun keabsahan waris dan sebab-sebab yang menggugurkan hak seseorang untuk menerima harta peninggalan.',
      points: [
        'Tiga Rukun Waris: Al-Muwarrits (pewaris yang telah wafat), Al-Warits (ahli waris yang hidup saat pewaris wafat), dan Al-Mauruts (harta waris yang ditinggalkan).',
        'Tiga Syarat Sah: Matinya pewaris secara hakiki atau hukum (vonis pengadilan), hidupnya ahli waris saat kematian pewaris, dan tidak adanya penghalang waris.',
        'Penghalang 1: Perbedaan Agama (Ikhtilaf ad-Din). Muslim tidak mewarisi non-Muslim, dan non-Muslim tidak mewarisi Muslim (namun boleh diberikan lewat wasiat atau hibah).',
        'Penghalang 2: Pembunuhan (Al-Qatl). Sabda Nabi SAW: "Pembunuh tidak berhak mendapatkan bagian warisan sedikit pun dari orang yang dibunuhnya."',
      ],
      practice: 'Pahami batas syariat bahwa wasiat dan hibah dapat menjadi solusi saling tolong bagi anggota keluarga yang terhalang hak waris formal.',
      source: hadith(41),
    },
    {
      id: 'ashabul-furudh',
      title: 'Ashabul Furudh: Ahli Waris Berporsi Pasti',
      category: 'Klasifikasi Waris',
      summary: 'Daftar ahli waris yang bagiannya telah dipatok secara eksplisit dalam Al-Qur\'an (1/2, 1/4, 1/8, 2/3, 1/3, 1/6).',
      points: [
        'Porsi 1/2: Suami (jika tidak ada anak/cucu), anak perempuan tunggal, cucu perempuan tunggal dari anak laki-laki, saudara perempuan kandung tunggal.',
        'Porsi 1/4: Suami (jika ada anak/cucu) atau Istri (jika suami wafat tanpa anak/cucu).',
        'Porsi 1/8: Istri (atau dibagi rata para istri) jika pewaris memiliki anak atau cucu keturunan.',
        'Porsi 2/3: Dua anak perempuan atau lebih (jika tidak ada anak laki-laki), dua saudara perempuan kandung atau lebih.',
        'Porsi 1/3: Ibu (jika tidak ada anak dan tidak ada dua saudara/lebih), atau dua saudara seibu/lebih.',
        'Porsi 1/6: Ayah (jika ada anak), Ibu (jika ada anak atau ada dua saudara), dan Kakek/Nenek.',
      ],
      practice: 'Identifikasi silsilah keluarga dengan jelas untuk memetakan siapa saja yang masuk kategori ashabul furudh.',
      source: quran('4/11'),
    },
    {
      id: 'ashabah-penerima-sisa',
      title: 'Golongan Ashabah: Ahli Waris Penerima Sisa Harta',
      category: 'Klasifikasi Waris',
      summary: 'Ahli waris yang mengambil seluruh sisa harta setelah dibagikan kepada Ashabul Furudh, atau mengambil seluruh harta jika tidak ada Ashabul Furudh.',
      points: [
        'Ashabah bi Nafsihi (Dengan Dirinya Sendiri): Jalur laki-laki nasab tanpa perantara wanita (Anak laki-laki, cucu laki-laki, ayah, kakek, saudara laki-laki kandung, paman).',
        'Ashabah bi Ghairihi (Karena Keberadaan Laki-Laki yang Menariknya): Anak perempuan yang tertarik oleh saudara laki-lakinya (rasio 2:1), saudara perempuan kandung yang tertarik oleh saudara laki-laki kandung.',
        'Ashabah ma\'a Ghairihi (Bersama Wanita Lain): Saudara perempuan kandung atau seayah yang menjadi ashabah bersama dengan anak perempuan atau cucu perempuan.',
        'Kaidah Pembagian: Berikan hak Ashabul Furudh terlebih dahulu, kemudian sisa harta diberikan kepada kerabat laki-laki terdekat yang berstatus ashabah.',
      ],
      practice: 'Dahulukan perhitungan hak Ashabul Furudh sebelum mendistribusikan sisa harta kepada kerabat ashabah.',
      source: hadith(26),
    },
    {
      id: 'filosofi-dua-banding-satu',
      title: 'Keadilan Syariat di Balik Rasio Waris 2:1 Pria & Wanita',
      category: 'Hikmah Tasyri\'',
      summary: 'Membedah hikmah dan keadilan finansial pembagian 2 bagian anak laki-laki dan 1 bagian anak perempuan dalam Islam.',
      points: [
        'Beban Finansial Pria: Laki-laki dalam Islam diwajibkan menanggung mahar, nafkah tempat tinggal, makan, pakaian untuk istri, anak-anak, dan orang tua renta yang tidak mampu.',
        'Hak Istimewa Finansial Wanita: Wanita dalam Islam sama sekali tidak memiliki kewajiban menafkahi siapa pun; seluruh harta yang ia warisi atau miliki adalah 100% hak milik pribadinya.',
        'Netto Riil Finansial: Saat laki-laki mendapat 2 bagian, ia mengeluarkannya kembali untuk menafkahi keluarga; sedangkan wanita yang mendapat 1 bagian menyimpannya utuh secara bersih.',
        'Bantahan Tuduhan Diskriminasi: Ada lebih dari 30 kondisi dalam hukum faraidh di mana wanita mendapat bagian sama besar dengan pria, bahkan lebih besar, atau wanita mendapat warisan sedangkan pria terhalang.',
      ],
      practice: 'Jelaskan hikmah ini kepada keluarga dan masyarakat agar tidak ada kesalahpahaman terhadap keadilan hukum Islam.',
      source: quran('4/34'),
    },
    {
      id: 'konsep-hijab-terhalang',
      title: 'Konsep Hijab (Penghalangan): Siapa yang Terhalang?',
      category: 'Kaidah Faraidh',
      summary: 'Kaidah pengguguran atau pengurangan hak waris seseorang karena adanya kerabat yang lebih dekat hubungannya dengan pewaris.',
      points: [
        'Hijab Nuqshan: Pengurangan porsi (misalnya porsi istri berkurang dari 1/4 menjadi 1/8 karena adanya anak).',
        'Hijab Hirman: Terhalang sepenuhnya dari mendapatkan warisan (misalnya cucu terhalang sepenuhnya karena adanya anak laki-laki kandung; kakek terhalang karena adanya ayah).',
        '6 Ahli Waris yang Tidak Pernah Terhalang Penuh: Ayah, Ibu, Suami, Istri, Anak Laki-Laki, dan Anak Perempuan.',
        'Prinsip Kedekatan Hubungan: Siapa yang hubungannya lebih dekat kepada mayit, ia menghalangi kerabat yang hubungannya melalui dirinya atau lebih jauh derajatnya.',
      ],
      practice: 'Pastikan status keberadaan 6 ahli waris utama terlebih dahulu sebelum meneliti kerabat yang lebih jauh.',
      source: quran('4/12'),
    },
    {
      id: 'perbedaan-waris-wasiat-hibah',
      title: 'Membedakan Warisan, Wasiat, & Hibah Semasa Hidup',
      category: 'Manajemen Aset',
      summary: 'Perbedaan fundamental antara tiga instrumen perpindahan harta keluarga agar tidak terjadi pelanggaran syariat.',
      points: [
        'Waris: Berpindah kepemilikannya secara otomatis setelah pewaris wafat berdasarkan ketetapan porsi yang sudah ditentukan syariat.',
        'Hibah: Pemberian sukarela yang diserahkan dan dipindahtangankan saat pemilik harta masih hidup dan sehat wal afiat; disunnahkan adil di antara anak-anak.',
        'Wasiat: Pesan penyerahan harta setelah wafat; dibatasi maksimal sepertiga (1/3) harta dan secara hukum syariat TIDAK BOLEH ditujukan kepada ahli waris ("La washiyyata li warits").',
        'Hibah sebagai Solusi Anak Angkat: Menggunakan instrumen hibah semasa hidup untuk memberikan aset kepada anak angkat demi melindungi masa depannya.',
      ],
      practice: 'Gunakan hibah semasa hidup dengan bijak dan adil jika ingin memberikan apresiasi khusus tanpa melanggar ketentuan faraidh.',
      source: hadith(41),
    },
    {
      id: 'kasus-khusus-aul-dan-radd',
      title: 'Kasus Khusus Faraidh: Konsep \'Aul dan Radd',
      category: 'Kaidah Perhitungan',
      summary: 'Metode penyesuaian matematis saat jumlah total saham Ashabul Furudh melebihi angka satu (\'Aul) atau bersisa tanpa ashabah (Radd).',
      points: [
        'Masalah \'Aul (Kekurangan Harta): Terjadi ketika total bagian pecahan melebihi angka 1 (misal: Suami 1/2 + 2 Saudari 2/3 = 7/6). Asal masalah dinaikkan sehingga semua pihak menanggung pengurangan secara proporsional.',
        'Sejarah \'Aul: Pertama kali diputuskan secara musyawarah oleh Khalifah Umar bin Khattab bersama para sahabat radhiyallahu \'anhum.',
        'Masalah Radd (Kelebihan Harta): Terjadi ketika masih ada sisa harta tetapi tidak ada kerabat ashabah yang berhak menerima sisa tersebut.',
        'Penyelesaian Radd: Sisa harta dikembalikan secara proporsional kepada para Ashabul Furudh nasab (selain suami atau istri menurut jumhur ulama).',
      ],
      practice: 'Serahkan kasus perhitungan rumit kepada pakar faraidh atau gunakan kalkulator waris syar\'i resmi yang terverifikasi.',
      source: quran('4/176'),
    },
    {
      id: 'ishlah-dan-takharuj',
      title: 'Solusi Damai Sengketa Waris: Ishlah & Takharuj',
      category: 'Resolusi Konflik',
      summary: 'Adab menyelesaikan perselisihan waris keluarga melalui rekonsiliasi damai, kerelaan melepas hak (Takharuj), dan menjaga silaturahmi.',
      points: [
        'Ketahuilah Hak Dahulu Baru Berdamai: Sebelum bersepakat damai, semua pihak wajib mengetahui bagian pastinya masing-masing menurut syariat faraidh.',
        'Konsep Takharuj: Kesepakatan seorang atau sebagian ahli waris untuk mengundurkan diri (melepas hak warisnya) secara sukarela demi saudaranya yang lebih membutuhkan, atau ditukar dengan kompensasi tertentu.',
        'Keutamaan Silaturahmi: Mempertahankan hubungan persaudaraan kandung jauh lebih berharga di sisi Allah daripada sebidang tanah atau sejumlah materi fana.',
        'Keadilan Musyawarah: Menghindari pemaksaan pembagian "sama rata" tanpa keridhaan tulus dari ahli waris yang hak syariatnya lebih besar.',
      ],
      practice: 'Utamakan musyawarah keluarga yang dilandasi kerelaan hati dan saling menyayangi daripada bersengketa di pengadilan.',
      source: quran('49/10'),
    },
  ],
};

export const adabDigital: Course = {
  id: 'adab-digital',
  title: "Adab, Etika Digital, & Akhlak Media Sosial",
  description: "Panduan adab penuntut ilmu, etika bermedia sosial, menjaga lisan & jempol, fiqh privasi, bahaya ghibah online, flexing, serta perlindungan hak cipta digital.",
  note: "Di era arus informasi digital, adab dan integritas moral adalah pembeda hakiki antara manusia bertakwa dan budak algoritma.",
  lessons: [
    {
      id: 'adabul-alim-wal-mutaallim',
      title: 'Adab Penuntut Ilmu: Keikhlasan Niat & Memuliakan Guru',
      category: 'Fondasi Adab',
      summary: 'Kaidah klasik adab thalabul ilmi (merujuk kitab Tadzkiratus Sami\' wal Mutakallim karya Imam Ibnu Jama\'ah) yang wajib dihidupkan kembali.',
      points: [
        'Urgensi Adab Sebelum Ilmu: Imam Malik menasihati: "Pelajarilah adab sebelum engkau mempelajari ilmu." Ilmu tanpa adab melahirkan kesombongan intelektual.',
        'Memurnikan Niat: Menuntut ilmu semata-mata mengharap ridha Allah, bukan untuk mendebat orang bodoh, mencari popularitas, atau mengejar pujian manusia.',
        'Menghormati Guru & Ulama: Bertutur kata santun kepada guru, mendoakan kebaikan bagi mereka, dan tidak mencela kekhilafan manusiawi para ulama.',
        'Sabar Meniti Proses: Ilmu tidak didapat dengan jalan pintas instan; dibutuhkan ketekunan, konsistensi, dan kerendahan hati untuk terus belajar.',
      ],
      practice: 'Luruskan niat sebelum mulai belajar atau membuka buku: niatkan untuk mengangkat kebodohan dari diri sendiri dan keluarga.',
      source: hadith(3),
    },
    {
      id: 'fiqh-lisan-dan-jempol',
      title: 'Fiqh Lisan & Jempol: Menghindari Dosa Jariyah Online',
      category: 'Etika Digital',
      summary: 'Menyadari bahwa setiap ketikan status, komentar, dan cuitan di media sosial dicatat malaikat Raqib dan Atid serta dipertanggungjawabkan di akhirat.',
      points: [
        'Definisi Muslim Sejati: Sabda Nabi SAW: "Seorang muslim sejati adalah orang yang muslim lainnya selamat dari gangguan lisan dan tangannya" (HR. Bukhari). Di era modern, jempol adalah kepanjangan dari lisan.',
        'Konsep Dosa Jariyah: Konten maksiat, fitnah, atau pornografi yang diunggah dan terus dibagikan ribuan orang akan mengalirkan dosa berulang kepada pengunggah aslinya meski ia telah wafat.',
        'Pengawasan Malaikat (QS. Qaf: 18): "Tidak ada suatu kata yang diucapkannya melainkan ada di sisinya malaikat pengawas yang selalu siap (mencatat)."',
        'Saring Sebelum Sharing: Tanyakan 3 hal sebelum mengetik: Apakah ini benar? Apakah ini bermanfaat? Apakah ini menyinggung/menzalimi orang lain?',
      ],
      practice: 'Biasakan jeda 10 detik sebelum memposting atau menekan tombol kirim di kolom komentar media sosial.',
      source: quran('50/18'),
    },
    {
      id: 'ghibah-fitnah-namimah-online',
      title: 'Bahaya Ghibah Online, Fitnah, & Namimah di Ruang Siber',
      category: 'Penyakit Lisan',
      summary: 'Mengenali bentuk-bentuk modern membicarakan aib orang lain di grup WhatsApp, akun gosip, dan ruang obrolan virtual.',
      points: [
        'Definisi Ghibah: Menceritakan sesuatu tentang saudaramu yang tidak disukainya, meskipun hal itu memang benar adanya. Jika tidak benar, maka itu adalah Fitnah (kedustaan besar).',
        'Analogi Menjijikkan Al-Qur\'an (QS. Al-Hujurat: 12): Allah menyamakan orang yang menggunjing seperti orang yang memakan bangkai daging saudaranya yang telah mati.',
        'Namimah (Adu Domba Digital): Mengambil screenshot chat pribadi untuk disebarkan demi memprovokasi permusuhan. Sabda Nabi SAW: "Tidak akan masuk surga orang yang suka mengadu domba."',
        'Kewajiban Menutup Tab Gosip: Menonton dan menyukai akun gosip/sensasi yang membeberkan aib orang lain termasuk bersekutu dalam perbuatan dosa ghibah.',
      ],
      practice: 'Tinggalkan grup obrolan atau forum diskusi yang isinya hanya membicarakan aib dan keburukan orang lain.',
      source: quran('49/12'),
    },
    {
      id: 'bahaya-flexing-dan-riya',
      title: 'Bahaya Flexing (Pamer Kemewahan) & Penyakit \'Ain Digital',
      category: 'Kesehatan Jiwa',
      summary: 'Tinjauan syariat seputar tren pamer kekayaan, konsumerisme ekstrem, bahaya riya, dan dampak racun pandangan hasad (\'Ain).',
      points: [
        'Hakikat Flexing: Pamer saldo, barang mewah, atau gaya hidup hedonistik demi validasi manusia merusak keikhlasan dan memicu kecemburuan sosial masyarakat.',
        'Bahaya Riya & Sum\'ah: Syirik kecil yang menghanguskan seluruh pahala amal kebaikan (QS. Al-Baqarah: 264).',
        'Realitas Penyakit \'Ain: Sabda Nabi SAW: "Penyakit \'ain itu nyata adanya." Pandangan kagum bercampur dengki/hasad dari orang lain yang melihat foto/video pamer dapat membahayakan keselamatan orang yang dipandang.',
        'Adab Berbagi Nikmat (Tahadduts bin Ni\'mah): Mensyukuri nikmat dilakukan dengan berbagi kepada yang membutuhkan dan bersikap rendah hati, bukan dengan memamerkannya di ruang publik.',
      ],
      practice: 'Jaga kerendahan hati: tidak semua nikmat dan momen keluarga harus diabadikan dan dipublikasikan ke media sosial.',
      source: hadith(2),
    },
    {
      id: 'adab-tabayyun-anti-hoaks',
      title: 'Kewajiban Tabayyun & Menangkal Badai Hoaks',
      category: 'Literasi Informasi',
      summary: 'Perintah Al-Qur\'an untuk memverifikasi kebenaran informasi sebelum mempercayai atau meneruskannya ke publik.',
      points: [
        'Perintah Tegas Al-Qur\'an (QS. Al-Hujurat: 6): "Wahai orang-orang yang beriman, jika datang kepadamu orang fasik membawa suatu berita, maka bertabayyunlah (telitilah kebenarannya)...."',
        'Cukup Seseorang Disebut Pendusta: Sabda Nabi SAW: "Cukuplah seseorang dianggap berdusta apabila ia menceritakan setiap apa yang ia dengar (tanpa menyaringnya)" (HR. Muslim).',
        'Anatomi Berita Palsu (Hoaks): Judul provokatif (clickbait), mencatut nama tokoh/ulama tanpa rujukan shahih, dan mendesak pembaca menyebarkannya dengan ancaman terkutuk.',
        'Langkah Verifikasi: Periksa sumber resmi, cross-check dengan media kredibel, dan jangan pernah menjadi corong penyebar kepanikan publik.',
      ],
      practice: 'Jika menerima berita sensasional di WhatsApp keluarga, carilah sumber aslinya terlebih dahulu sebelum menekan tombol "Forward".',
      source: quran('49/6'),
    },
    {
      id: 'etika-berpendapat-dan-debat',
      title: 'Etika Berpendapat, Hindari Debat Kusir & Komentar Toksik',
      category: 'Komunikasi Santun',
      summary: 'Membangun budaya diskusi ilmiah yang bermartabat dan menjauhi perang komentar (flame war) yang merusak persaudaraan.',
      points: [
        'Jaminan Istana di Surga: Sabda Nabi SAW: "Aku menjamin sebuah istana di pinggiran surga bagi siapa saja yang meninggalkan perdebatan meskipun ia berada di pihak yang benar" (HR. Abu Dawud).',
        'Larangan Menyerang Pribadi (Ad Hominem): Menolak argumen dengan menghina fisik, status sosial, atau latar belakang seseorang adalah tanda kebangkrutan moral.',
        'Adab Mengkritik: Kritiklah gagasan atau idenya dengan dalil dan data yang santun, jangan pernah mencaci maki sosok individunya.',
        'Menahan Diri dari Trolling: Tidak memprovokasi amarah warganet dengan ujaran kebencian, sarkasme merendahkan, atau meme pelecehan.',
      ],
      practice: 'Tinggalkan perdebatan di kolom komentar jika lawan bicara mulai menggunakan kata-kata kasar dan tidak mencari kebenaran.',
      source: hadith(73),
    },
    {
      id: 'privasi-dan-rahasia-tajassus',
      title: 'Menjaga Privasi (Sitrun) & Larangan Doxxing/Tajassus',
      category: 'Hukum Privasi',
      summary: 'Prinsip perlindungan data pribadi dalam syariat Islam, larangan memata-matai, dan etika dokumentasi publik.',
      points: [
        'Larangan Tajassus: Allah berfirman: "Dan janganlah kamu mencari-cari kesalahan orang lain" (QS. Al-Hujurat: 12). Mencari data pribadi untuk disebarkan demi mempermalukan (Doxxing) adalah haram mutlak.',
        'Menutup Aib Saudara (Sitrun): Sabda Nabi SAW: "Barangsiapa menutupi aib seorang muslim, Allah akan menutupi aibnya di dunia dan di akhirat" (HR. Muslim).',
        'Etika Merekam & Memotret: Dilarang merekam orang lain secara diam-diam di ruang publik untuk dijadikan bahan tertawaan atau konten viral tanpa izin bersangkutan.',
        'Kerahasiaan Chat Pribadi: Menyebarkan tangkapan layar (screenshot) obrolan rahasia dua orang tanpa izin pihak terkait adalah bentuk pengkhianatan amanah.',
      ],
      practice: 'Hormati privasi orang lain dan jangan pernah ikut andil dalam menyebarkan video rekaman aib seseorang.',
      source: hadith(13),
    },
    {
      id: 'hak-cipta-dan-pembajakan',
      title: 'Fiqh Hak Cipta, Plagiarisme, & Pembajakan Digital',
      category: 'Muamalah Digital',
      summary: 'Status hukum kekayaan intelektual (Haqqul Ibtikar), fatwa ulama dunia, dan keharaman mencuri karya orang lain.',
      points: [
        'Pengakuan Hak Cipta dalam Syariat: Majma\' Al-Fiqh Al-Islami (OKI) dan MUI menegaskan bahwa karya cipta intelektual (buku, software, desain, konten edukasi) dilindungi syariat sebagai harta yang sah (Mal Mutaqawwam).',
        'Hukum Pembajakan Software & Buku: Mengunduh software crack, buku bajakan, atau kursus berbayar secara ilegal adalah bentuk pelanggaran hak milik orang lain (Ghashab/Pencurian).',
        'Bahaya Plagiarisme Konten: Mengambil tulisan atau karya ilmiah orang lain lalu mengklaimnya sebagai karya sendiri adalah perbuatan dusta (kadzib) dan penipuan (tadlis).',
        'Etika Menghargai Kreator: Selalu cantumkan sumber rujukan dan belilah karya digital original sebagai bentuk dukungan nafkah halal bagi para kreator.',
      ],
      practice: 'Gunakan software open source (gratis & legal) jika belum mampu membeli lisensi resmi; hindari software bajakan.',
      source: quran('4/29'),
    },
    {
      id: 'kecanduan-algoritma-dopamin',
      title: 'Menundukkan Algoritma: Mengatasi Doomscrolling & Waktu',
      category: 'Manajemen Diri',
      summary: 'Strategi membebaskan diri dari jeratan kecanduan media sosial, mengembalikan fokus ibadah, dan menghargai umur kehidupan.',
      points: [
        'Desain Adiktif Media Sosial: Fitur endless scroll dan notifikasi dirancang insinyur teknologi untuk memicu pelepasan dopamin instan yang membuat manusia lupa waktu.',
        'Sumpah Allah atas Waktu (QS. Al-\'Ashr: 1-2): "Demi masa, sesungguhnya manusia benar-benar berada dalam kerugian." Umur adalah modal utama manusia di dunia.',
        'Dampak Doomscrolling: Menghabiskan waktu berjam-jam menyaksikan konten sia-sia memicu kelelahan mental, kecemasan, dan hilangnya kekhusyukan shalat.',
        'Solusi Digital Detox Islami: Tentukan jam bebas layar (screen-free hours), matikan notifikasi non-esensial, dan gantikan waktu kosong dengan tilawah atau silaturahmi nyata.',
      ],
      practice: 'Audit screen time smartphone Anda hari ini; alokasikan sebagian waktu scroll medsos untuk membaca terjemahan Al-Qur\'an.',
      source: quran('103/1'),
    },
    {
      id: 'dakwah-kreatif-medsos',
      title: 'Menjadikan Media Sosial Ladang Amal Jariyah',
      category: 'Dakwah Kontemporer',
      summary: 'Transformasi dari konsumen pasif menjadi produsen konten kebaikan yang mencerahkan peradaban umat.',
      points: [
        'Menjadi Kunci Kebaikan: Sabda Nabi SAW: "Sesungguhnya di antara manusia ada yang menjadi kunci-kunci pembuka kebaikan dan penutup pintu keburukan" (HR. Ibnu Majah).',
        'Dakwah dengan Konten Visual Berkualitas: Menghadirkan kutipan hadits shahih, infografis fiqih praktis, video tadabbur ayat, dan narasi inspiratif yang menyejukkan.',
        'Prinsip Dakwah Bil Hikmah (QS. An-Nahl: 125): Ajaklah manusia kepada jalan Tuhanmu dengan hikmah, nasihat yang baik, dan bantahlah mereka dengan cara yang paling santun.',
        'Niatkan sebagai Amal Jariyah: Konten ilmu bermanfaat yang Anda bagikan akan terus mengalirkan pahala kebaikan di alam kubur selama terus diamalkan oleh sesama.',
      ],
      practice: 'Gunakan akun media sosial Anda minimal sekali seminggu untuk membagikan satu faedah ilmu atau nasihat kebaikan yang tulus.',
      source: quran('16/125'),
    },
  ],
};

export const muslimah: Course = {
  id: 'muslimah',
  title: "Tokoh Muslimah Teladan & Fiqh Wanita",
  description: "Meneladani kepemimpinan, keilmuan, dan perjuangan para shahabiyat agung, serta panduan komprehensif fiqh ibadah, darah wanita, dan hak independen muslimah.",
  note: "Islam mengangkat martabat wanita dengan hak kepemilikan harta mandiri, akses ilmu pengetahuan, dan peran peradaban bermartabat jauh sebelum dunia modern mengenalnya.",
  lessons: [
    {
      id: 'kemuliaan-wanita-islam',
      title: 'Kemuliaan & Martabat Wanita dalam Islam',
      category: 'Pondasi Syariat',
      summary: 'Dekonstruksi peradaban jahiliyah dan revolusi Islam dalam mengangkat martabat wanita sebagai manusia seutuhnya yang mulia.',
      points: [
        'Mengakhiri Tradisi Jahiliyah: Islam menghapus tradisi biadab penguburan bayi perempuan hidup-hidup (Wa\'dul Banat) dan menjadikan kelahiran anak perempuan sebagai jalan menuju surga.',
        'Kedudukan Ibu Tiga Kali Lipat: Sabda Nabi SAW saat ditanya siapa orang yang paling berhak diperlakukan baik: "Ibumu, lalu ibumu, lalu ibumu, kemudian ayahmu" (HR. Bukhari & Muslim).',
        'Wanita Belahan Jiwa Pria: Sabda Nabi SAW: "Sesungguhnya wanita adalah belahan saudara kandung kaum pria" (Innaman-nisa\' syaqa\'iqur-rijal).',
        'Pahala Spiritual yang Sama: Laki-laki dan perempuan memiliki akses pahala dan derajat surga yang setara di sisi Allah atas setiap amal kebajikan (QS. An-Nahl: 97).',
      ],
      practice: 'Muliakan ibu, istri, anak perempuan, dan saudari muslimah sebagai bentuk ketakwaan sejati kepada Allah.',
      source: quran('16/97'),
    },
    {
      id: 'khadijah-teladan-bisnis',
      title: 'Khadijah binti Khuwailid: Integritas Bisnis & Pilar Dakwah',
      category: 'Tokoh Teladan',
      summary: 'Profil Ummul Mukminin Khadijah RA: pengusaha sukses yang visioner, dermawan, pendukung pertama risalah kenabian.',
      points: [
        'Pengusaha Mandiri & Profesional: Mengelola kafilah dagang internasional dengan sistem bagi hasil (Mudharabah) yang berbasis pada kejujuran dan etika tinggi.',
        'Penenang Jiwa Rasulullah SAW: Saat wahyu pertama turun di Gua Hira, Khadijah menenangkan Nabi dengan kata-kata penuh keyakinan: "Demi Allah, Allah tidak akan pernah menghinakanmu, karena engkau menyambung silaturahmi dan menolong yang lemah."',
        'Pengorbanan Harta Sepenuh Jiwa: Menginfakkan seluruh kekayaannya untuk membiayai dakwah Islam di masa-masa boikot Makkah yang paling berat.',
        'Salam Khusus dari Allah: Malaikat Jibril mendatangi Nabi SAW untuk menyampaikan salam langsung dari Allah SWT kepada Khadijah dan kabar gembira istana di surga dari mutiara.',
      ],
      practice: 'Teladani keteguhan Khadijah dalam menggunakan kesuksesan finansial untuk membela kebenaran dan menolong sesama.',
      source: hadith(39),
    },
    {
      id: 'aisyah-intelektual-besar',
      title: 'Aisyah binti Abu Bakar: Guru Besar Fiqih & Medis',
      category: 'Tokoh Teladan',
      summary: 'Kecerdasan brilian Ummul Mukminin Aisyah RA yang menjadi rujukan fatwa hukum para sahabat senior.',
      points: [
        'Perawi Hadits Terbesar: Meriwayatkan lebih dari 2.210 hadits yang mencakup detail ibadah privat rumah tangga Rasulullah SAW yang tidak diketahui sahabat lain.',
        'Pakar Fiqih & Tafsir: Urwah bin Zubair berkata: "Aku tidak pernah melihat orang yang lebih paham tentang fiqih, ilmu kedokteran, dan syair Arab melebihi Aisyah."',
        'Koreksi Ilmiah Sahabat: Mengoreksi kekeliruan pemahaman riwayat sahabat lain secara objektif (didokumentasikan Imam Az-Zarkasyi dalam kitab Al-Ijabah).',
        'Pendidik Generasi Emas: Menjadi guru bagi ratusan tabi\'in terkemuka di Madinah pasca wafatnya Rasulullah SAW.',
      ],
      practice: 'Dukung muslimah untuk menuntut ilmu setinggi mungkin dalam bidang agama maupun sains demi kemajuan peradaban.',
      source: hadith(26),
    },
    {
      id: 'shahabiyat-pejuang-medis',
      title: 'Shahabiyat Pejuang: Nusaibah & Rufaidah Al-Aslamiyah',
      category: 'Tokoh Teladan',
      summary: 'Keberanian fisik dan peran medis luar biasa shahabiyat di medan perjuangan membela kehormatan Islam.',
      points: [
        'Nusaibah binti Ka\'ab (Ummu \'Imarah): Benteng perisai pelindung Rasulullah SAW di Perang Uhud dengan pedang dan panah saat barisan kaum muslimin goyah; menderita belasan luka sayatan pedang.',
        'Rufaidah Al-Aslamiyah: Perintis klinik tenda medis militer pertama dalam sejarah Islam (Khaimah Rufaidah) di Masjid Nabawi saat Perang Khandaq.',
        'Penanganan Medis Kritis: Nabi memerintahkan sahabat Sa\'ad bin Mu\'adz yang terluka parah untuk dirawat di tenda Rufaidah agar beliau bisa memantau kesehatannya dari dekat.',
        'Inspirasi Keperawatan Modern: Nama Rufaidah Al-Aslamiyah diakui dunia Islam sebagai pelopor keperawatan berabad-abad sebelum Florence Nightingale.',
      ],
      practice: 'Hargai dan dukung kontribusi tenaga medis wanita yang berjuang menyelamatkan nyawa masyarakat di garis depan.',
      source: hadith(69),
    },
    {
      id: 'fathimah-al-fihri-pendidik',
      title: 'Fathimah Al-Fihri: Pendiri Universitas Pertama di Dunia',
      category: 'Tokoh Teladan',
      summary: 'Kisah visioner muslimah Maroko yang mendirikan Universitas Al-Qarawiyyin pada tahun 859 M.',
      points: [
        'Lembaga Pendidikan Tinggi Tertua: Guinness World Records dan UNESCO mengakui Universitas Al-Qarawiyyin di Fez, Maroko sebagai universitas pertama di dunia yang beroperasi tanpa putus.',
        'Wakaf Pendidikan: Fathimah mewakafkan seluruh harta warisan ayahnya untuk membangun masjid dan universitas yang menyediakan perpustakaan ribuan manuskrip ilmiah.',
        'Puasa Pembangunan: Berpuasa sunnah setiap hari selama bertahun-tahun selama proses pembangunan universitas berlangsung demi mengharap keberkahan Allah.',
        'Alumni Lintas Agama: Melahirkan tokoh-tokoh besar seperti Ibnu Khaldun, Al-Idrisi (kartografer), hingga Paus Silvester II (Gerbert of Aurillac) yang belajar matematika di sana.',
      ],
      practice: 'Gerakkan wakaf produktif untuk sarana pendidikan dan pengembangan riset ilmiah generasi muda.',
      source: quran('39/9'),
    },
    {
      id: 'hak-finansial-independen',
      title: 'Hak Finansial Mandiri Wanita dalam Syariat',
      category: 'Keadilan Ekonomi',
      summary: 'Ketetapan syariat bahwa wanita memiliki kemandirian hukum finansial penuh tanpa bergantung izin atau campur tangan laki-laki.',
      points: [
        'Kepemilikan Aset Pribadi 100%: Wanita berhak membeli, menjual, menyewakan, menginvestasikan, atau menghibahkan hartanya secara mandiri tanpa memerlukan izin suami atau ayah.',
        'Hak Mahar Milik Mutlak Istri: Mahar pernikahan adalah hak murni milik mempelai wanita, bukan hak milik orang tua dan tidak boleh diambil kembali oleh suami tanpa keridhaannya (QS. An-Nisa: 4).',
        'Gaji dan Penghasilan Pribadi: Jika istri bekerja atas izin suami, seluruh gajinya adalah milik pribadinya; jika ia membantu kebutuhan rumah tangga, itu bernilai sedekah sunnah baginya.',
        'Hak Waris dan Perlindungan Nafkah: Tetap berhak mendapat warisan dan sekaligus tetap berhak dinafkahi lahir-batin oleh suami secara penuh.',
      ],
      practice: 'Hormati kepemilikan aset dan keuangan pribadi istri/wanita; jangan mengambil hartanya secara paksa atau zalim.',
      source: quran('4/4'),
    },
    {
      id: 'fiqh-darah-wanita',
      title: 'Fiqh Darah Wanita: Membedakan Haid, Nifas, & Istihadhah',
      category: 'Fiqh Ibadah',
      summary: 'Panduan medis dan syar\'i membedakan tiga jenis darah wanita serta konsekuensinya terhadap shalat, puasa, dan hubungan suami istri.',
      points: [
        'Darah Haid: Darah alami yang keluar dari rahim wanita sehat pada siklus bulanan. Menggugurkan kewajiban shalat (tanpa perlu diqadha) dan puasa (wajib diqadha di bulan lain).',
        'Darah Nifas: Darah yang keluar mengiringi persalinan/melahirkan; batas maksimal menurut jumhur ulama (Mazhab Syafi\'i & Hanbali) adalah 40 hingga 60 hari.',
        'Darah Istihadhah: Darah penyakit yang keluar di luar kebiasaan haid atau melebihi batas maksimal haid (15 hari menurut Syafi\'i).',
        'Hukum Wanita Istihadhah: Dihukumi seperti orang suci; tetap wajib shalat dan puasa, berwudhu setiap kali masuk waktu shalat fardhu setelah membersihkan diri.',
      ],
      practice: 'Catat siklus haid secara disiplin setiap bulan menggunakan aplikasi atau kalender agar tidak rancu saat terjadi istihadhah.',
      source: hadith(6),
    },
    {
      id: 'filosofi-hijab-kehormatan',
      title: 'Filosofi Hijab, Tabarruj, & Adab Busana Syar\'i',
      category: 'Etika Penampilan',
      summary: 'Makna hakiki hijab sebagai syiar kehormatan diri, perlindungan martabat, dan ketaatan kepada Allah SWT.',
      points: [
        'Landasan Al-Qur\'an: QS. An-Nur: 31 (mengulurkan kerudung menutupi dada) dan QS. Al-Ahzab: 59 (mengulurkan jilbab ke seluruh tubuh agar mudah dikenali dan tidak diganggu).',
        'Kriteria Busana Syar\'i: Menutup aurat, longgar (tidak ketat memperlihatkan lekuk tubuh), tidak tipis transparan, tidak menyerupai pakaian laki-laki, dan tidak berniat pamer popularitas (syuhrah).',
        'Menghindari Tabarruj: Larangan memperlihatkan perhiasan dan kecantikan berlebihan di hadapan non-mahram yang memicu syahwat fitnah.',
        'Hijab Hati & Perilaku: Pakaian lahiriah harus selaras dengan hijab batiniah (menjaga pandangan, tutur kata santun, dan tidak centil/merayu).',
      ],
      practice: 'Kenakan hijab dengan niat tulus beribadah kepada Allah, bukan sekadar mengikuti tren mode atau keterpaksaan sosial.',
      source: quran('33/59'),
    },
    {
      id: 'peran-domestik-dan-publik',
      title: 'Menyeimbangkan Peran Keluarga & Kontribusi Publik',
      category: 'Peran Sosial',
      summary: 'Sinergi antara membangun fondasi peradaban di rumah (madrasatul ula) dan berkiprah positif di masyarakat luas.',
      points: [
        'Ibu sebagai Madrasah Pertama (Al-Ummu Madrasah): Mendidik generasi penerus bangsa adalah profesi peradaban paling strategis yang tidak bisa digantikan oleh institusi mana pun.',
        'Keabsahan Bekerja di Luar Rumah: Wanita diperbolehkan bekerja dalam bidang pendidikan, medis, sains, bisnis, maupun sosial kemasyarakatan dengan izin keluarga dan menjaga adab syariat.',
        'Saling Berbagi Peran: Suami-istri adalah mitra kerja sama; Rasulullah SAW biasa membantu pekerjaan rumah tangga seperti menjahit baju dan membersihkan rumah.',
        'Menghindari Burnout: Tidak membebankan standar ganda yang mustahil; prioritaskan ketenangan mental keluarga dan keridhaan Allah.',
      ],
      practice: 'Para suami, ringankan beban istri di rumah sebagaimana teladan Rasulullah SAW yang selalu membantu urusan domestik.',
      source: hadith(25),
    },
    {
      id: 'kesetaraan-spiritual-surga',
      title: 'Kesetaraan Spiritual & Kemuliaan Akhirat',
      category: 'Eskatologi & Balasan',
      summary: 'Keadilan mutlak Allah dalam membalas amal shalih laki-laki dan perempuan tanpa diskriminasi sedikit pun.',
      points: [
        'Penegasan QS. Al-Ahzab: 35: Menyebutkan secara berpasangan sepuluh sifat mulia (muslimin-muslimat, mukminin-mukminat, dst.) yang disediakan ampunan dan pahala yang sangat besar.',
        'Bantahan Diskriminasi Gender Spiritual: Di mata Allah, kemuliaan seseorang semata-mata ditentukan oleh ketakwaan hatinya (QS. Al-Hujurat: 13), bukan jenis kelamin.',
        'Kisah Ummu Salamah RA: Bertanya kepada Nabi mengapa Al-Qur\'an banyak menyebut laki-laki, lalu turunlah firman Allah QS. Ali Imran: 195 yang menegaskan tidak ada amal yang disia-siakan.',
        'Derajat Syahidah: Wanita yang meninggal saat melahirkan, wafat karena sakit perut, atau menjaga kehormatannya dihukumi mendapatkan pahala mati syahid.',
      ],
      practice: 'Tanamkan rasa percaya diri tinggi sebagai muslimah: Anda adalah pilar kokoh kebangkitan peradaban umat Islam.',
      source: quran('33/35'),
    },
  ],
};

export const siyasah: Course = {
  id: 'siyasah',
  title: "Maqashid Syari'ah & Siyasah Syar'iyyah",
  description: "Memahami 5 tujuan luhur syariat (Al-Kulliyatul Khams), Piagam Madinah, filosofi hukum pidana Islam, prinsip musyawarah (syura), dan tata kelola kepemimpinan publik.",
  note: "Syariat Islam diturunkan untuk menjaga kemaslahatan hakiki (jalbul mashalih) dan menolak segala bentuk kezaliman serta kerusakan (dar'ul mafasid) bagi seluruh umat manusia.",
  lessons: [
    {
      id: 'filosofi-maqashid-syariah',
      title: 'Hakikat & Filosofi Maqashid Syari\'ah',
      category: 'Filsafat Hukum Islam',
      summary: 'Konsep dasar tujuan pensyariatan hukum Islam yang dirumuskan Imam Asy-Syathibi dalam mahakaryanya Al-Muwafaqat.',
      points: [
        'Kaidah Pokok Syariat: Hukum-hukum Islam tidak diturunkan secara kaku tanpa makna, melainkan berorientasi mendatangkan kemaslahatan (jalbul mashalih) dan menolak keburukan (dar\'ul mafasid).',
        'Tiga Tingkatan Kebutuhan: Dharuriyyat (kebutuhan primer mutlak demi keberlangsungan hidup), Hajiyyat (kebutuhan sekunder demi kemudahan dan menghilangkan kesukaran), dan Tahsiniyyat (kebutuhan tersier demi etika, estetika, dan keluhuran moral).',
        'Pencegahan Bahaya Lebih Didahulukan: Kaidah fiqih universal: "Menolak kerusakan harus didahulukan daripada meraih kebaikan semata."',
        'Relevansi Modern: Menjadi kompas bagi para ulama dan pemimpin dalam merespons isu-isu kontemporer (bioetika medis, kecerdasan buatan, kebijakan moneter) yang belum ada nash eksplisitnya.',
      ],
      practice: 'Nilai setiap kebijakan dan tindakan dari dampak kemaslahatan riilnya bagi masyarakat luas, bukan sekadar simbolis formalitas.',
      source: quran('21/107'),
    },
    {
      id: 'hifzh-din-perlindungan-agama',
      title: 'Hifzh ad-Din: Perlindungan Agama & Hak Keyakinan',
      category: 'Pilar Maqashid',
      summary: 'Kewajiban menjaga kemurnian aqidah pribadi dan larangan syariat memaksakan agama kepada orang lain.',
      points: [
        'Larangan Pemaksaan Agama (QS. Al-Baqarah: 256): "Tidak ada paksaan dalam (menganut) agama (Islam); sesungguhnya telah jelas jalan yang benar daripada jalan yang sesat."',
        'Menjaga Kemurnian Iman: Membentengi diri dari perbuatan syirik, takhayul, bid\'ah destruktif, dan pemurtadan iman pribadi dengan ilmu yang mendalam.',
        'Perlindungan Rumah Ibadah Non-Muslim: Khalifah Abu Bakar dan Umar memerintahkan pasukan Islam untuk tidak merusak gereja, sinagoge, atau mengganggu para biarawan yang sedang beribadah.',
        'Menjamin Hak Beribadah: Negara wajib memberikan rasa aman bagi seluruh warga negara untuk menjalankan peribadatan agamanya secara damai.',
      ],
      practice: 'Jalani ibadah Islam dengan teguh tanpa mengganggu atau mencela keyakinan dan sarana peribadatan pemeluk agama lain.',
      source: quran('2/256'),
    },
    {
      id: 'hifzh-nafs-perlindungan-jiwa',
      title: 'Hifzh an-Nafs: Kesucian & Perlindungan Nyawa Manusia',
      category: 'Pilar Maqashid',
      summary: 'Prinsip mutlak Islam bahwa nyawa setiap manusia adalah suci dan tidak boleh dilanggar tanpa hak syar\'i yang sah.',
      points: [
        'Prinsip Universal Al-Qur\'an (QS. Al-Ma\'idah: 32): "Barangsiapa membunuh seorang manusia bukan karena orang itu membunuh orang lain atau berbuat kerusakan di bumi, maka seakan-akan dia telah membunuh manusia seluruhnya."',
        'Keutamaan Menyelamatkan Jiwa: Melanjutkan ayat yang sama: "Dan barangsiapa memelihara kehidupan seorang manusia, maka seakan-akan dia telah memelihara kehidupan semua manusia."',
        'Larangan Bunuh Diri (QS. An-Nisa: 29): Mengharamkan segala bentuk keputusasaan yang berujung pada mengakhiri hidup sendiri atau mencelakakan tubuh.',
        'Kewajiban Mitigasi Bencana & Kesehatan: Membangun rumah sakit, tanggul banjir, keselamatan transportasi, dan evakuasi medis adalah kewajiban agama yang bernaung di bawah Hifzh an-Nafs.',
      ],
      practice: 'Patuhi rambu-rambu keselamatan kerja dan lalu lintas sebagai bentuk ketaatan menjalankan prinsip perlindungan nyawa.',
      source: quran('5/32'),
    },
    {
      id: 'hifzh-aql-perlindungan-akal',
      title: 'Hifzh al-\'Aql: Menjaga Akal Sehat & Kebebasan Berpikir',
      category: 'Pilar Maqashid',
      summary: 'Syariat Islam melindungi kejernihan akal pikiran dari zat-zat memabukkan dan membebaskan nalar dari kebodohan.',
      points: [
        'Akal sebagai Syarat Taklif: Akal adalah anugerah terbesar yang membedakan manusia dari hewan; hanya orang yang berakal sehat yang dibebani kewajiban syariat (Mukallaf).',
        'Pengharaman Mutlak Khamr & Narkoba: Islam melarang segala bentuk zat adiktif yang menghilangkan kesadaran akal dan memicu tindak kriminal.',
        'Mendorong Riset & Kebebasan Berpikir Positif: Al-Qur\'an berulang kali memanggil "Afala ta\'qilun" (Apakah kamu tidak menggunakan akalmu?) untuk meneliti alam semesta.',
        'Memerangi Pembodohan & Doktrin Buta: Melarang taklid buta tanpa dalil dan memerangi penyebaran narasi bohong yang merusak logika nalar masyarakat.',
      ],
      practice: 'Jaga kejernihan pikiran dengan nutrisi halal, membaca buku berbobot, dan menjauhi pornografi serta narkotika.',
      source: quran('5/90'),
    },
    {
      id: 'hifzh-nasl-perlindungan-keluarga',
      title: 'Hifzh an-Nasl: Perlindungan Nasab, Keluarga, & Keturunan',
      category: 'Pilar Maqashid',
      summary: 'Menjaga kejelasan silsilah darah, kehormatan moral, dan kesehatan generasi penerus bangsa.',
      points: [
        'Pensyariatan Akad Nikah: Melegalkan hubungan biologis dan emosional melalui akad pernikahan yang suci (Mitsaqan Ghalizha) demi menjaga kejelasan nasab keturunan.',
        'Pengharaman Zina & Pornografi (QS. Al-Isra: 32): Menutup seluruh pintu yang mendekati perzinaan karena menghancurkan tatanan sosial keluarga dan menyebarkan penyakit menular.',
        'Hukum Qadzaf (Menuduh Zina tanpa Bukti): Islam mengancam hukuman berat bagi siapa saja yang menuduh wanita baik-baik berzina tanpa menghadirkan 4 saksi mata yang adil demi melindungi kehormatan.',
        'Pengasuhan & Pendidikan Anak: Memastikan anak mendapatkan hak nafkah, kasih sayang, identitas nasab ayah yang jelas, dan pendidikan moral yang layak.',
      ],
      practice: 'Jaga keharmonisan rumah tangga dan lindungi anak-anak dari paparan konten seksual bebas di lingkungan digital.',
      source: quran('17/32'),
    },
    {
      id: 'hifzh-mal-perlindungan-harta',
      title: 'Hifzh al-Mal: Perlindungan Harta & Keadilan Ekonomi',
      category: 'Pilar Maqashid',
      summary: 'Menjamin hak kepemilikan aset privat dan melarang segala bentuk eksploitasi, pencurian, dan monopoli ekonomi.',
      points: [
        'Larangan Memakan Harta secara Batil (QS. Al-Baqarah: 188): Mengharamkan suap-menyuap, korupsi, judi, penipuan timbangan, dan riba.',
        'Perlindungan Hak Milik Pribadi: Pembelaan terhadap harta milik pribadi yang dirampas secara zalim dinilai sebagai perjuangan mulia; orang yang wafat mempertahankan hartanya dihukumi syahid.',
        'Larangan Penimbunan (Ihtikar) & Monopoli: Menjamin keadilan pasar agar barang kebutuhan pokok tidak ditimbun spekulan yang merugikan rakyat kecil.',
        'Distribusi Kekayaan Berkeadilan (QS. Al-Hasyr: 7): Syariat zakat, infak, wakaf, dan waris bertujuan agar kekayaan tidak hanya beredar di kalangan orang-orang kaya saja.',
      ],
      practice: 'Pastikan setiap rupiah rezeki yang masuk ke kantong keluarga berasal dari jalan yang halal, bersih, dan bebas dari hak orang lain.',
      source: quran('2/188'),
    },
    {
      id: 'piagam-madinah-konstitusi',
      title: 'Piagam Madinah: Konstitusi Pluralisme Pertama di Dunia',
      category: 'Siyasah Syar\'iyyah',
      summary: 'Perjanjian 47 pasal yang digagas Rasulullah SAW di Madinah pada tahun 622 M sebagai dasar negara madani yang modern.',
      points: [
        'Konsep Ummah yang Majemuk: Kaum Muslimin (Muhajirin dan Anshar) serta suku-suku Yahudi Madinah dinyatakan sebagai satu kesatuan warga negara (Ummatan Wahidah).',
        'Jaminan Kebebasan Beragama: Piagam menegaskan: "Bagi kaum Yahudi agama mereka, dan bagi kaum Muslimin agama mereka; masing-masing bebas menjalankan agamanya."',
        'Kewajiban Bela Negara Bersama: Seluruh elemen suku dan agama di Madinah wajib saling tolong-menolong mempertahankan kota dari serangan musuh luar.',
        'Supremasi Hukum & Keadilan: Tidak ada diskriminasi hukum bagi pelaku kejahatan; pelaku kriminalitas ditindak tegas tanpa memandang suku atau agamanya.',
      ],
      practice: 'Teladani semangat Piagam Madinah dalam merawat persatuan bangsa, toleransi antar-iman, dan kesetaraan hak warga negara.',
      source: hadith(25),
    },
    {
      id: 'filosofi-pidana-jinayat',
      title: 'Filosofi Hukum Pidana Islam: Pencegahan & Keadilan Korban',
      category: 'Hukum Pidana',
      summary: 'Membedah hikmah di balik sanksi Hudud, Qishash, dan Ta\'zir yang menitikberatkan pada keadilan dan perlindungan masyarakat.',
      points: [
        'Tiga Kategori Pidana: Hudud (sanksi yang kadarnya dipatok langsung oleh nash Allah), Qishash-Diyat (keadilan pembalasan setara atau ganti rugi finansial bagi korban/keluarga), dan Ta\'zir (sanksi edukatif yang ditetapkan hakim/pemerintah).',
        'Fungsi Zawajir (Efek Jera): Hukum pidana Islam dirancang untuk mencegah terjadinya kejahatan (deterrence effect), bukan semata-mata menghukum pelaku.',
        'Keadilan bagi Korban: Qishash memberikan hak pemaafan kepada keluarga korban; jika keluarga memaafkan, hukuman mati gugur dan diganti pembayaran ganti rugi (Diyat).',
        'Prinsip Pembuktian Paling Ketat: Kaidah Rasulullah SAW: "Tolaklah pelaksanaan hukuman hudud jika masih ada keraguan (Idra\'ul hududa bisy-syubuhat)." Lebih baik hakim salah membebaskan daripada salah menghukum orang tak bersalah.',
      ],
      practice: 'Pahami hukum pidana syariat secara utuh bersama prinsip keadilan pembuktian ketatnya, bukan dari stigma media sepihak.',
      source: quran('2/178'),
    },
    {
      id: 'prinsip-syura-musyawarah',
      title: 'Prinsip Syura (Musyawarah) & Akuntabilitas Pemimpin',
      category: 'Tata Kelola Pemerintahan',
      summary: 'Kewajiban penguasa melibatkan partisipasi publik dalam pengambilan keputusan dan keterbukaan terhadap kritik rakyat.',
      points: [
        'Perintah Musyawarah Al-Qur\'an (QS. Asy-Syura: 38): Menyifati orang-orang beriman sebagai mereka yang "urusan mereka diputuskan dengan musyawarah di antara mereka."',
        'Teladan Rasulullah SAW: Meski dibimbing wahyu langit, Nabi selalu bermusyawarah dengan sahabat dalam urusan publik dan strategi perang (seperti usulan Salman Al-Farisi menggali parit di Perang Khandaq).',
        'Keterbukaan terhadap Koreksi: Pidato inaugurasi Khalifah Abu Bakar: "Jika aku berbuat benar maka bantulah aku, tetapi jika aku menyimpang maka luruskanlah aku."',
        'Transparansi Administrasi Publik: Menghindari tirani kekuasaan otoriter yang menindas aspirasi rakyat; pemimpin adalah pelayan umat (Sayyidul qaumi khadimuhum).',
      ],
      practice: 'Budayakan musyawarah dalam keluarga, organisasi, dan lingkungan kerja sebelum mengambil keputusan penting bersama.',
      source: quran('42/38'),
    },
    {
      id: 'integritas-pemimpin-publik',
      title: 'Kriteria Pemimpin Berintegritas & Persatuan Bangsa',
      category: 'Kepemimpinan Islami',
      summary: 'Kepemimpinan dalam Islam adalah amanah berat yang dipertanggungjawabkan di hadapan Allah, bukan fasilitas untuk memperkaya diri.',
      points: [
        'Empat Sifat Pokok Kepemimpinan: Shiddiq (integritas kejujuran), Amanah (dapat dipercaya dan tidak khianat), Tabligh (transparansi komunikasi), dan Fathanah (kecerdasan profesional dan solutif).',
        'Peringatan Nabi kepada Abu Dzar: "Wahai Abu Dzar, sesungguhnya engkau lemah, dan kepemimpinan itu adalah amanah; pada hari kiamat ia akan menjadi kehinaan dan penyesalan, kecuali bagi yang mengambilnya dengan benar dan menunaikan kewajibannya."',
        'Tanggung Jawab Pemimpin (HR. Bukhari): "Setiap kalian adalah pemimpin, dan setiap kalian akan dimintai pertanggungjawaban atas apa yang dipimpinnya."',
        'Menjaga Persatuan & Menolak Perpecahan: Larangan fanatisme golongan (\'Ashabiyyah) yang memecah belah keutuhan bangsa demi kepentingan kekuasaan sesaat.',
      ],
      practice: 'Jadilah pemimpin yang adil dan amanah di lingkungan masing-masing, sekecil apa pun lingkup tanggung jawab yang diemban.',
      source: hadith(25),
    },
  ],
};

export const fitnahAkhirZaman: Course = {
  id: 'fitnah-akhir-zaman',
  title: "Eskatologi Akhir Zaman: Fitnah Dajjal & Turunnya Nabi Isa AS",
  description: "Kajian komprehensif hadits-hadits shahih seputar fitnah akhir zaman, ciri fisik & tipu daya Al-Masih Ad-Dajjal, kemunculan Imam Mahdi, terbunuhnya Dajjal di Babul Ludd, serta benteng perlindungan mukmin.",
  note: "Mempelajari fitnah akhir zaman bukan untuk memicu histeria atau ramalan cocoklogi, melainkan untuk memperkokoh tauhid, membentengi jiwa dari syubhat, dan memperbanyak amal shalih.",
  lessons: [
    {
      id: 'peringatan-seluruh-nabi',
      title: 'Peringatan Seluruh Nabi & Hakikat Fitnah Terbesar',
      category: 'Tanda Kiamat Besar',
      summary: 'Mengapa seluruh nabi sejak Nabi Nuh AS hingga Nabi Muhammad SAW selalu memperingatkan umatnya tentang bahaya Al-Masih Ad-Dajjal.',
      points: [
        'Sabda Rasulullah SAW: "Tidak ada seorang nabi pun yang diutus kecuali ia pasti memperingatkan umatnya tentang si buta sebelah pendusta (Dajjal). Ketahuilah bahwa ia buta sebelah, sedangkan Tuhan kalian tidak buta sebelah" (HR. Bukhari & Muslim).',
        'Fitnah Terbesar Sepanjang Sejarah: Sabda Nabi SAW: "Sejak penciptaan Adam hingga hari kiamat kelak, tidak ada fitnah perkara yang lebih besar melebihi fitnah Dajjal" (HR. Muslim).',
        'Makna Al-Masih Ad-Dajjal: Kata "Al-Masih" karena salah satu matanya terhapus/cacat, dan "Ad-Dajjal" dari kata daja-la yang berarti pembohong besar yang menyamarkan kebatilan dengan kebenaran.',
        'Hikmah Ujian Akhir Zaman: Allah mengizinkan fitnah dahsyat ini terjadi sebagai ujian pemungkas untuk menyaring keimanan sejati dari kemunafikan yang tersamar.',
      ],
      practice: 'Rutin memohon perlindungan dari fitnah Dajjal dalam doa tasyahud akhir sebelum salam setiap shalat fardhu dan sunnah.',
      source: hadith(34),
    },
    {
      id: 'ciri-fisik-dajjal',
      title: 'Ciri-Ciri Fisik Spesifik Al-Masih Ad-Dajjal',
      category: 'Deskripsi Hadits',
      summary: 'Penjelasan detail Rasulullah SAW mengenai perawakan, mata, dan tanda tekstual pada fisik Dajjal agar umat mengenalinya.',
      points: [
        'Mata Kanan Cacat: Mata kanannya buta menonjol laksana buah anggur yang terapung (a\'warul \'ainil yumna ka\'anna \'ainahu \'inabatun thaafiyah).',
        'Perawakan Fisik: Bertubuh pendek kekar, berkaki agak bengkok (fajja\'), berkulit putih kemerahan, dan berambut keriting lebat kaku.',
        'Tulisan K-F-R di Kening: Tertulis di antara kedua matanya huruf "Ka-Fa-Ra" (Kafir) yang tertera jelas. Sabda Nabi: "Dapat dibaca oleh setiap orang mukmin, baik ia bisa membaca tulisan maupun buta huruf" (HR. Muslim).',
        'Ketiadaan Keturunan (Mandul): Dajjal tidak memiliki keturunan (aqim) sebagaimana dijelaskan Nabi SAW dalam dialog dengan Ibnu Shayyad.',
      ],
      practice: 'Pahami ciri fisik ini sebagai bukti konkret kebenaran sabda kenabian yang menyelamatkan akal dari kultus pemujaan individu.',
      source: hadith(30),
    },
    {
      id: 'kisah-tamim-aljassasah',
      title: 'Kisah Sahabat Tamim Ad-Dari & Makhluk Al-Jassasah',
      category: 'Riwayat Shahih',
      summary: 'Peristiwa fenomenal pelayaran sahabat Tamim Ad-Dari yang terdampar di pulau terpencil dan bertemu Dajjal yang terbelenggu (HR. Muslim no. 2942).',
      points: [
        'Latar Belakang: Tamim Ad-Dari (sebelum masuk Islam) berlayar bersama 30 orang kabilah Lakhm dan Judzam, terombang-ambing badai selama sebulan hingga mendarat di pulau barat.',
        'Pertemuan dengan Al-Jassasah: Makhluk berambut sangat lebat dari kepala hingga kaki yang bertugas sebagai mata-mata dan menuntun mereka menuju biara di tengah pulau.',
        'Sosok Terbelenggu Rantai: Mereka menemukan seorang pria bertubuh sangat besar yang terbelenggu rantai besi kokoh dari tangan hingga lehernya.',
        'Pertanyaan Dajjal: Menanyakan kondisi kurma Baisan, danau Thabariyyah (Tiberias), mata air Zughar, dan apakah Nabi kaum ummi (Muhammad) telah diutus dan ditaati.',
        'Konfirmasi Kenabian: Rasulullah SAW mengumpulkan seluruh kaum muslimin di Masjid Nabawi untuk membenarkan penuturan Tamim yang selaras dengan apa yang pernah beliau sabdakan.',
      ],
      practice: 'Tadabburi hadits Tamim Ad-Dari dalam Shahih Muslim untuk menginsyafi betapa dekatnya fase-fase tanda zaman yang dikabarkan Rasulullah.',
      source: hadith(25),
    },
    {
      id: 'fitnah-dan-tipu-daya-dajjal',
      title: 'Bentuk Tipu Daya & Kemampuan Kuasi Dajjal',
      category: 'Ujian Keimanan',
      summary: 'Kemampuan luar biasa yang Allah izinkan terjadi melalui tangan Dajjal sebagai istidraj (jebakan ujian) bagi manusia.',
      points: [
        'Sungai Surga & Neraka Semu: Dajjal membawa dua sungai mengalir; yang tampak seperti air jernih hakikatnya api yang membakar, dan yang tampak api hakikatnya air sejuk yang menyelamatkan (HR. Muslim).',
        'Memerintahkan Hujan & Kesuburan: Dajjal berseru ke langit lalu turun hujan lebat, dan bumi menumbuhkan tanaman subur bagi kabilah yang mau menyembahnya sebagai tuhan.',
        'Bencana Kelaparan bagi Penentang: Kabilah yang menolak ketuhanan Dajjal seketika mengalami paceklik kekeringan dan hewan ternak mereka binasa.',
        'Bantuan Syaitan/Jin: Dajjal membujuk seorang badui: "Jika aku hidupkan ayah dan ibumu, apakah engkau bersaksi aku tuhanmu?" Lalu dua setan berwujud mirip orang tuanya muncul membujuk sang anak.',
      ],
      practice: 'Kuatkan tauhid: ketahuilah bahwa Allah SWT tidak pernah terlihat oleh mata di dunia dan mustahil memiliki cacat fisik seperti Dajjal.',
      source: hadith(24),
    },
    {
      id: 'jalur-dan-pengikut-dajjal',
      title: 'Geografi Kemunculan & Golongan Pengikut Dajjal',
      category: 'Peta Eskatologi',
      summary: 'Titik awal kemunculan Dajjal, kecepatan gerakannya menjelajahi bumi, serta kelompok masyarakat yang paling rentan terpedaya.',
      points: [
        'Titik Kemunculan Awal: Muncul dari arah Timur, di sebuah kawasan antara Syam dan Irak, keluar dari kota Isfahan (Khurasan).',
        'Kecepatan Bergerak: Sahabat bertanya seberapa cepat gerakannya; Nabi bersabda: "Laksana awan yang ditiup angin kencang." Dajjal tinggal di bumi selama 40 hari (1 hari laksana setahun, 1 hari laksana sebulan, 1 hari laksana sepekan, dan hari-hari lainnya seperti hari biasa).',
        '70.000 Pengikut Isfahan: Rasulullah bersabda: "Dajjal akan diikuti oleh 70.000 orang Yahudi Isfahan yang mengenakan pakaian tebal bergaris (Thayalisah)" (HR. Muslim).',
        'Wanita & Orang Awam Rentan Terfitnah: Dajjal memperdaya banyak wanita dan orang berilmu dangkal; seorang pria sampai mengikat ibu, istri, dan putrinya di rumah agar tidak keluar terpesona tipu daya Dajjal.',
      ],
      practice: 'Bentengi keluarga dengan ilmu syariat yang shahih; jangan biarkan anggota keluarga mudah terpukau oleh fenomena keajaiban semu.',
      source: hadith(26),
    },
    {
      id: 'benteng-makkah-madinah',
      title: 'Makkah & Madinah: Dua Kota Perlindungan yang Dijaga Malaikat',
      category: 'Kota Suci',
      summary: 'Mukjizat perlindungan Allah atas dua tanah suci yang tidak dapat dimasuki oleh Dajjal sepanjang perjalanannya di muka bumi.',
      points: [
        'Dua Kota Terlarang: Sabda Nabi SAW: "Tidak ada satu negeri pun melainkan akan diinjak oleh Dajjal kecuali Makkah dan Madinah" (Muttafaqun \'alaih).',
        'Penjagaan Barisan Malaikat: Di setiap jalan masuk dan celah perbukitan Makkah dan Madinah terdapat malaikat-malaikat yang berbaris dengan pedang terhunus menghadang Dajjal.',
        'Tiga Goncangan Gempa Madinah: Dajjal singgah di tanah berbatu di luar Madinah (Sabkhah); lalu Madinah bergoncang gempa 3 kali sehingga seluruh orang munafik dan fasik ketakutan lari keluar bergabung ke barisan Dajjal.',
        'Pembersihan Madinah: Madinah menjadi suci murni membersihkan kotoran manusia munafik laksana pandai besi membersihkan karat besi.',
      ],
      practice: 'Cintai kota suci Makkah dan Madinah, dan bersihkan hati dari sifat kemunafikan agar tidak terlempar dari barisan orang beriman.',
      source: hadith(1),
    },
    {
      id: 'al-imam-al-mahdi',
      title: 'Al-Imam Al-Mahdi: Pemimpin Keadilan Akhir Zaman',
      category: 'Tokoh Penyelamat',
      summary: 'Karakteristik sosok khalifah adil Muhammad bin Abdullah yang dibaiat di hadapan Ka\'bah untuk menyatukan umat Islam.',
      points: [
        'Nama & Nasab Ahlul Bait: Namanya serupa dengan nama Nabi (Muhammad) dan nama ayahnya seperti nama ayah Nabi (Abdullah), dari keturunan Hasan bin Ali radhiyallahu \'anhu.',
        'Ciri Fisik: Berkening lebar (ajlal jabhah) dan berhidung mancung dengan sedikit lekukan (aqnal anfi).',
        'Perbaikan Kilat oleh Allah: Sabda Nabi SAW: "Al-Mahdi berasal dari kami kalangan Ahlul Bait; Allah memperbaikinya (kelayakan kepemimpinannya) hanya dalam satu malam" (HR. Ibnu Majah & Ahmad).',
        'Misi Keadilan Paripurna: Memimpin umat selama 7 hingga 8 tahun, memenuhi bumi dengan keadilan dan kemakmuran merata setelah sebelumnya bumi dipenuhi kezaliman.',
      ],
      practice: 'Fokus beramal shalih hari ini dan jangan terseret klaim-klaim palsu figur yang mengaku sebagai Imam Mahdi.',
      source: hadith(25),
    },
    {
      id: 'turunnya-nabi-isa-dan-babul-ludd',
      title: 'Turunnya Nabi Isa AS & Terbunuhnya Dajjal di Babul Ludd',
      category: 'Klimaks Pertempuran',
      summary: 'Peristiwa agung turunnya kembali Nabi Isa Al-Masih putra Maryam untuk mengakhiri teror Dajjal di muka bumi.',
      points: [
        'Lokasi Turun: Turun di menara putih di sebelah timur kota Damaskus (Syam) saat fajar menyingsing, mengenakan dua pakaian celupan kuning, bersandar pada sayap dua malaikat.',
        'Shalat di Belakang Imam Mahdi: Imam Mahdi mempersilakan Nabi Isa menjadi imam shalat Shubuh, namun Nabi Isa menolak dengan hormat: "Sesungguhnya sebagian kalian adalah pemimpin bagi sebagian yang lain sebagai kemuliaan Allah bagi umat ini."',
        'Dajjal Meleleh: Ketika Dajjal melihat Nabi Isa AS, ia seketika mencair dan meleleh laksana garam yang larut dalam air.',
        'Pengejaran ke Babul Ludd: Nabi Isa mengejar Dajjal hingga menemukannya di gerbang kota Ludd (sekarang Lod dekat Tel Aviv, Palestina) lalu membunuhnya dengan tombak pendeknya, mengakhiri fitnah terbesar di bumi.',
      ],
      practice: 'Imani dengan teguh bahwa kemenangan akhir hakiki di muka bumi pasti menjadi milik kebenaran tauhid dan para pembela keadilan.',
      source: quran('4/159'),
    },
    {
      id: 'benteng-syari-dari-dajjal',
      title: 'Benteng Perlindungan Syar\'i Menghadapi Fitnah Dajjal',
      category: 'Amalan Praktis',
      summary: 'Tiga perisai utama yang diajarkan Rasulullah SAW agar jiwa dan akal seorang mukmin terlindungi dari tipu daya Dajjal.',
      points: [
        'Perisai 1: Menghafal 10 Ayat Surah Al-Kahfi. Sabda Nabi SAW: "Barangsiapa menghafal 10 ayat pertama (atau dalam riwayat lain 10 ayat terakhir) dari Surah Al-Kahfi, ia akan terlindungi dari fitnah Dajjal" (HR. Muslim).',
        'Perisai 2: Doa Isti\'adzah di Tasyahud Akhir: "Allahumma inni a\'udzubika min \'adzabi jahannam, wa min \'adzabil qabr, wa min fitnatil mahya wal mamati, wa min syarri fitnatil masihid dajjal."',
        'Perisai 3: Menjauhi Lokasi Dajjal. Sabda Nabi: "Barangsiapa mendengar kemunculan Dajjal, hendaklah ia menjauh darinya; demi Allah, seseorang mendatanginya merasa dirinya mukmin namun akhirnya mengikutinya karena syubhat yang ditebarkannya."',
        'Kekuatan Dzikir: Makanan orang beriman di masa paceklik Dajjal adalah tasbih, tahmid, tahlil, dan takbir yang mengenyangkan tubuh mereka dengan izin Allah.',
      ],
      practice: 'Jadikan tilawah Surah Al-Kahfi setiap hari Jumat sebagai tradisi rutin keluarga di rumah.',
      source: hadith(2),
    },
    {
      id: 'relevansi-zaman-modern',
      title: 'Relevansi Modern: Mewaspadai "Sistem & Karakteristik Dajjal"',
      category: 'Tadabbur Kontemporer',
      summary: 'Mendeteksi aroma kebohongan, penipuan persepsi realitas (deepfake/AI), dan materialisme buta yang mendahului Dajjal personal.',
      points: [
        'Sistem Dajjal (Dajjaliyyah): Iklim global di mana kebohongan dipoles menjadi kebenaran, keadilan diputarbalikkan menjadi kejahatan, dan perzinaan dianggap kebebasan hak asasi.',
        'Mata Satu Metaforis (Buta Spiritual): Manusia modern yang hanya melihat dunia dengan kacamata materialistis/teknologi semata, namun buta total terhadap nilai-nilai ruhani dan akhirat.',
        'Era Manipulasi Realitas (Deepfake & AI): Munculnya teknologi rekayasa video dan audio yang memalsukan kebenaran sejalan dengan nubuat akhir zaman bahwa fitnah tampak begitu nyata.',
        'Sikap Mukmin Sejati: Tidak paranoid terhadap masa depan, melainkan memperkuat integritas moral, memperkokoh fondasi keluarga, dan terus menebar kemanfaatan hingga ajal tiba.',
      ],
      practice: 'Gunakan teknologi kecerdasan buatan dan media digital untuk menyebarkan kebenaran, bukan menjadi konsumen pasif ilusi duniawi.',
      source: quran('18/1'),
    },
  ],
};

export const kisahNabi: Course = {
  id: 'kisah-nabi',
  title: "Kisah 25 Nabi & Rasul serta Nabi Khidir AS: Silsilah, Mukjizat, & Ulul Azmi",
  description: "Menelusuri jejak sejarah kronologis 25 Nabi dan Rasul Allah serta pertemuan hikmah Nabi Khidir AS: silsilah garis kenabian, mukjizat agung, ketabahan 5 Rasul Ulul Azmi, dan ibrah dakwah sepanjang zaman.",
  note: "Kisah para Nabi bukanlah sekadar dongeng masa lalu, melainkan lentera keteladanan akhlak, keteguhan tauhid, dan bukti pemeliharaan wahyu Allah di setiap peradaban manusia.",
  lessons: [
    {
      id: 'adam-dan-idris',
      title: 'Nabi Adam AS & Nabi Idris AS: Permulaan Manusia & Literasi',
      category: 'Generasi Pertama',
      summary: 'Kisah penciptaan manusia pertama di surga, ujian iblis, taubat nasuha, dan Nabi Idris sebagai pelopor tulisan pena dan ilmu perbintangan.',
      points: [
        'Penciptaan Nabi Adam AS: Diciptakan langsung oleh Allah dari tanah, diajarkan nama-nama seluruh benda (asma\'a kullaha), dan sujud penghormatan para malaikat (QS. Al-Baqarah: 31-34).',
        'Pelajaran Taubat: Melanggar larangan mendekati pohon terlarang akibat tipu daya Iblis, lalu bertaubat dengan doa legendaris: "Rabbana zhalamna anfusana wa illam taghfir lana watarhamna lanakunanna minal khasirin" (QS. Al-A\'raf: 23).',
        'Nabi Idris AS (Enoch): Keturunan keenam dari Adam; manusia pertama yang menulis dengan pena (khat bil-qalam), menjahit pakaian dari kain (sebelumnya memakai kulit binatang), dan meneliti astronomi dasar.',
        'Derajat yang Tinggi: Allah mengangkat martabat Nabi Idris ke tempat yang tinggi (QS. Maryam: 56-57) sebagai teladan ketekunan ilmu dan ibadah.',
      ],
      practice: 'Biasakan berdoa memohon ampunan dengan doa Nabi Adam setiap kali menyadari kekhilafan diri.',
      source: quran('7/23'),
    },
    {
      id: 'nuh-ulul-azmi',
      title: 'Nabi Nuh AS (Ulul Azmi): Kesabaran 950 Tahun & Bahtera Akbar',
      category: 'Rasul Ulul Azmi',
      summary: 'Perjuangan dakwah terpanjang menghadapi kaum penyembah berhala Wadd, Suwa\', Yaghuts, Ya\'uq, dan Nasr hingga mukjizat bahtera penyelamat.',
      points: [
        'Dakwah Siang & Malam: Berdakwah tanpa henti selama 950 tahun (QS. Al-\'Ankabut: 14) dengan penuh kelembutan, namun kaumnya menutup telinga dan menyombongkan diri.',
        'Pembuatan Bahtera Raksasa: Diperintahkan membangun kapal besar di atas daratan/bukit gersang atas petunjuk wahyu Allah; diejek habis-habisan oleh para pembesar kafir.',
        'Banjir Bah Global: Air memancar deras dari langit dan bumi menenggelamkan seluruh peradaban durhaka; hanya orang-orang beriman dan sepasang hewan yang selamat di bahtera.',
        'Tragedi Kan\'an (Putra Nuh): Nuh memohon keselamatan putranya, namun Allah menegaskan bahwa ikatan keimanan lebih tinggi daripada ikatan biologis (QS. Hud: 42-46).',
      ],
      practice: 'Tanamkan kesabaran tanpa batas dalam menasihati kebaikan, dan jangan pernah putus asa dari rahmat Allah.',
      source: quran('11/40'),
    },
    {
      id: 'hud-dan-shalih',
      title: 'Nabi Hud AS & Nabi Shalih AS: Kaum \'Ad & Mukjizat Unta Tsamud',
      category: 'Bangsa Arab Terdahulu',
      summary: 'Peringatan keras bagi bangsa yang sombong dengan kemajuan arsitektur dan teknologi namun kufur kepada Allah.',
      points: [
        'Nabi Hud AS & Kaum \'Ad: Diutus ke negeri Al-Ahqaf (Yaman/Oman); kaum \'Ad memiliki fisik raksasa dan membangun istana pilar megah (Iram dzatil \'imad). Mereka sombong: "Siapakah yang lebih kuat kekuatannya dari kami?"',
        'Azab Angin Topan: Dihancurkan oleh angin topan dingin yang sangat dahsyat selama 7 malam dan 8 hari tanpa henti hingga mereka mati bergelimpangan laksana pohon kurma tumbang (QS. Al-Haqqah: 6-7).',
        'Nabi Shalih AS & Kaum Tsamud: Kaum pemahat bukit cadas menjadi rumah-rumah mewah di Mada\'in Saleh (Hijr).',
        'Mukjizat Unta Betina (Naqatullah): Keluar seekor unta betina bunting dari batu karang padat sebagai bukti mukjizat. Kaum Tsamud melanggar perjanjian dan menyembelih unta tersebut, lalu diazab gempa dan suara halilintar mengguncang.',
      ],
      practice: 'Hindari kesombongan atas kemajuan teknologi, kekayaan fisik, atau pencapaian infrastruktur duniawi.',
      source: quran('89/6'),
    },
    {
      id: 'ibrahim-bapak-para-nabi',
      title: 'Nabi Ibrahim AS (Khalilullah & Ulul Azmi): Bapak Para Nabi',
      category: 'Rasul Ulul Azmi',
      summary: 'Perjalanan nalar tauhid mencari Tuhan, selamat dari kobaran api Namrud, ujian kurban Ismail, dan peletak pondasi Ka\'bah.',
      points: [
        'Nalar Kritis Menemukan Tauhid: Menolak penyembahan bintang, bulan, dan matahari; menyimpulkan bahwa Tuhan sejati tidak pernah terbenam dan merupakan Pencipta seluruh alam (QS. Al-An\'am: 76-79).',
        'Menghancurkan Berhala Raja Namrud: Ibrahim menghancurkan seluruh patung sesembahan dan menggantungkan kapak di leher patung terbesar untuk mematahkan logika kaumnya.',
        'Mukjizat Api Menjadi Dingin: Dilemparkan ke dalam kobaran api raksasa Namrud, Allah berfirman: "Wahai api, jadilah dingin dan penyelamat bagi Ibrahim" (QS. Al-Anbiya: 69).',
        'Ujian Kurban & Pembangunan Ka\'bah: Ikhlas mengorbankan putranya Ismail yang kemudian diganti kibas sembelihan besar (asal mula Idul Adha), serta meninggikan pondasi Ka\'bah di Makkah bersama Ismail.',
      ],
      practice: 'Jadikan Nabi Ibrahim sebagai teladan ketauhidan murni yang berani melawan arus kemusyrikan zaman.',
      source: quran('21/69'),
    },
    {
      id: 'luth-ismail-ishaq-yaqub',
      title: 'Nabi Luth AS, Ismail AS, Ishaq AS, & Ya\'qub AS',
      category: 'Keluarga Kenabian',
      summary: 'Perjuangan moral Nabi Luth di Sodom, ketabahan Ismail di padang pasir, serta keturunan Ishaq dan Ya\'qub (Israel).',
      points: [
        'Nabi Luth AS (Keponakan Ibrahim): Berdakwah di kota Sodom dan Gomora menghadapi perilaku seks menyimpang (homoseksualitas). Kaumnya diazab dengan hujan batu belerang dan buminya dijungkirbalikkan.',
        'Nabi Ismail AS: Putra Ibrahim dari Hajar; mukjizat terpancarnya mata air Zamzam di lembah gersang Makkah; teladan kepatuhan mutlak seorang anak saat diperintah untuk disembelih.',
        'Nenek Moyang Bangsa Arab: Ismail menikah dengan wanita suku Jurhum dan dari garis keturunannya lahir Nabi Muhammad SAW.',
        'Nabi Ishaq AS & Nabi Ya\'qub AS: Ishaq putra Ibrahim dari Sarah, melahirkan Nabi Ya\'qub yang bergelar "Israel" (Hamba Allah). Ya\'qub memiliki 12 putra yang menjadi cikal bakal 12 suku Bani Israil.',
      ],
      practice: 'Jaga kesucian moral keluarga dan jadikan rumah tangga sebagai madrasah ketakwaan kepada Allah.',
      source: quran('37/102'),
    },
    {
      id: 'yusuf-ahsanul-qashash',
      title: 'Nabi Yusuf AS: Mahakarya Kisah Terindah Al-Qur\'an',
      category: 'Ahsanul Qashash',
      summary: 'Perjalanan hidup Nabi Yusuf dari sumur pembuangan, keteguhan menolak zina di istana Mesir, hingga menjadi bendahara negara yang pemaaf.',
      points: [
        'Kedengkian Saudara: Dibuang ke sumur tua oleh saudara-saudaranya karena iri hati terhadap kasih sayang sang ayah (Nabi Ya\'qub), lalu ditemukan kafilah dagang dan dijual sebagai budak di Mesir.',
        'Ujian Syahwat & Keteguhan Integritas: Digoda oleh istri pembesar Mesir (Zulaikha), Yusuf memilih mendekam di penjara bertahun-tahun daripada mengkhianati amanah Allah (QS. Yusuf: 33).',
        'Mukjizat Menafsirkan Mimpi: Menafsirkan mimpi Raja Mesir tentang 7 sapi gemuk dimakan 7 sapi kurus; merancang manajemen ketahanan pangan krisis 7 tahun kelaparan.',
        'Puncak Kebesaran Hati: Memaafkan seluruh saudaranya yang dulu menzaliminya tanpa rasa dendam: "Pada hari ini tidak ada cercaan terhadap kamu, mudah-mudahan Allah mengampunimu" (QS. Yusuf: 92).',
      ],
      practice: 'Balaslah perlakuan buruk orang lain dengan maaf yang mulia, dan pertahankan integritas moral di mana pun berada.',
      source: quran('12/92'),
    },
    {
      id: 'ayyub-dzulkifli-syuaib-yunus',
      title: 'Nabi Ayyub, Dzulkifli, Syu\'aib, & Nabi Yunus AS',
      category: 'Teladan Sabar & Integritas',
      summary: 'Puncak kesabaran menghadapi penyakit, integritas menakar timbangan perdagangan, dan doa taubat dalam perut ikan paus.',
      points: [
        'Nabi Ayyub AS: Diuji kehilangan seluruh kekayaan, wafatnya seluruh anak, dan sakit kulit parah selama belasan tahun; lisannya tidak pernah berhenti berdzikir dan bersabar (QS. Al-Anbiya: 83).',
        'Nabi Dzulkifli AS: Putra Ayyub yang sanggup memenuhi janji menjadi raja yang berpuasa di siang hari, shalat di malam hari, dan adil memutuskan perkara tanpa pernah marah.',
        'Nabi Syu\'aib AS (Khatibul Anbiya): Diutus kepada kaum Madyan dan Ashabul Aikah; berdakwah menegakkan etika bisnis, kejujuran takaran dan timbangan, serta melarang memalak di jalanan.',
        'Nabi Yunus AS (Dzan-Nun): Meninggalkan kaumnya di Ninawa dalam keadaan marah, lalu ditelan ikan Nun (paus raksasa). Berdzikir di 3 kegelapan (malam, laut, perut ikan): "La ilaha illa Anta subhanaka inni kuntu minazh-zhalimin" hingga diselamatkan Allah.',
      ],
      practice: 'Amalkan zikir Nabi Yunus saat menghadapi jalan buntu, kesempitan rezeki, atau kecemasan hidup.',
      source: quran('21/87'),
    },
    {
      id: 'musa-dan-harun-ulul-azmi',
      title: 'Nabi Musa AS (Kalimullah & Ulul Azmi) & Nabi Harun AS',
      category: 'Rasul Ulul Azmi',
      summary: 'Perjuangan Musa berbicara langsung dengan Allah di Bukit Sinai, melawan kezaliman tiran Fir\'aun, dan membelah Laut Merah.',
      points: [
        'Masa Bayi yang Ajaib: Dihanyutkan ibunya di Sungai Nil atas ilham Allah, justru dipungut dan dibesarkan di istana Fir\'aun oleh Asiyah binti Muzahim.',
        'Gelar Kalimullah (Diajak Bicara Langsung): Menerima wahyu langsung dari Allah di Lembah Suci Thuwa dan Bukit Thur Sinai tanpa perantara malaikat.',
        'Sembilan Mukjizat Agung: Tongkat berubah menjadi ular raksasa pemakan sihir, tangan mengeluarkan cahaya putih menyilaukan, badai belalang, kutu, katak, dan air berubah menjadi darah.',
        'Membelah Laut Merah: Saat terdesak antara laut dan pasukan Fir\'aun, Musa memukulkan tongkatnya hingga laut terbelah 12 jalur; menyelamatkan Bani Israil dan menenggelamkan Fir\'aun.',
      ],
      practice: 'Jangan pernah takut menghadapi kezaliman sebesar apa pun, karena pertolongan Allah selalu bersama hamba-Nya yang bertakwa.',
      source: quran('26/63'),
    },
    {
      id: 'musa-dan-khidir',
      title: 'Nabi Khidir AS & Nabi Musa AS: Hikmah Takdir & Hakikat Ilmu Ladunni',
      category: 'Kisah Al-Kahfi & Hakikat Takdir',
      summary: 'Perjalanan agung Nabi Musa menuntut ilmu rahasia ketetapan Allah bersama Hamba Saleh (Nabi Khidir AS) di pertemuan dua lautan.',
      points: [
        'Latar Belakang Pencarian: Ketika Nabi Musa ditanya kaumnya tentang siapa manusia berilmu paling luas, Allah mewahyukan ada seorang hamba-Nya di pertemuan dua lautan (Majma\'al Bahrayn) yang memiliki ilmu khusus (QS. Al-Kahfi: 60-65).',
        'Syarat Menuntut Ilmu & Kesabaran: Khidir mengajukan syarat tegas: "Jika engkau mengikutiku, janganlah engkau menanyakan kepadaku tentang sesuatu apa pun, sampai aku sendiri menerangkannya kepadamu" (QS. Al-Kahfi: 70).',
        'Tiga Peristiwa Penuh Misteri: Melubangi perahu orang miskin, mengambil nyawa seorang pemuda, dan menegakkan kembali dinding rumah runtuh di perkampungan yang menolak memberi makan.',
        'Penyingkapan Rahasia Hikmah: Perahu dilubangi agar luput dari rampasan raja zalim; pemuda dicegah agar tidak menjerumuskan orang tuanya yang saleh ke dalam kekafiran; dan dinding ditegakkan karena di bawahnya tersimpan harta pusaka milik dua anak yatim warisan ayah mereka yang saleh (QS. Al-Kahfi: 79-82).',
        'Hikmah Tertinggi & Kenabian: Penegasan Nabi Khidir bahwa segala tindakannya bukanlah kemauan hawa nafsunya sendiri ("wa ma fa\'altuhu \'an amri"), melainkan wahyu langsung dan rahmat dari Allah Ta\'ala.',
      ],
      practice: 'Jaga adab tawadhu\' dalam menuntut ilmu dan berbaik sangkalah kepada ketetapan takdir Allah walau tampak pahit secara kasat mata.',
      source: quran('18/65'),
    },
    {
      id: 'dawud-sulaiman-zakariya',
      title: 'Nabi Dawud, Sulaiman, Ilyas, Ilyasa\', & Zakariya AS',
      category: 'Mukjizat & Kebijaksanaan',
      summary: 'Kemuliaan suara Zabur Dawud, kerajaan megah Sulaiman penakluk angin dan jin, serta doa keajaiban keturunan Zakariya.',
      points: [
        'Nabi Dawud AS: Mengalahkan raksasa Jalut dengan ketapel; menerima Kitab Zabur; gunung dan burung ikut bertasbih saat ia melantunkan dzikir; mukjizat melunakkan besi baja dengan tangan kosong untuk baju zirah.',
        'Nabi Sulaiman AS: Diberikan kerajaan teragung yang tidak akan pernah dimiliki manusia setelahnya; memahami bahasa hewan (semut, burung hud-hud), menundukkan angin kencang, dan mempekerjakan jin untuk arsitektur megah.',
        'Nabi Ilyas & Ilyasa\' AS: Menyerukan tauhid di Ba\'labak (Lebanon) menentang pemujaan berhala Ba\'al.',
        'Nabi Zakariya AS: Menjaga Sayyidah Maryam di Mihrab; berdoa dengan lirih dan penuh harap di usia sangat renta hingga dikaruniai putra shalih bernama Yahya.',
      ],
      practice: 'Teladani kerendahan hati Nabi Sulaiman: meskipun memiliki kekuasaan dan kekayaan tiada tara, ia selalu bersyukur dan tunduk kepada Allah.',
      source: quran('27/19'),
    },
    {
      id: 'yahya-isa-muhammad',
      title: 'Nabi Yahya, Nabi Isa (Ulul Azmi), & Nabi Muhammad ﷺ',
      category: 'Puncak Risalah',
      summary: 'Kesucian hidup Nabi Yahya, mukjizat kelahiran dan pengangkatan Nabi Isa AS, serta Nabi Muhammad ﷺ sebagai penutup seluruh nabi.',
      points: [
        'Nabi Yahya AS: Dikaruniai hikmah sejak kanak-kanak, berakhlak sangat lembut, zuhud, dan syahid mempertahankan hukum syariat Allah.',
        'Nabi Isa Al-Masih AS (Ulul Azmi): Lahir dari perawan Maryam tanpa ayah melalui tiupan ruh ciptaan Allah; berbicara saat masih bayi membela kesucian ibunya; menyembuhkan orang buta sejak lahir, penderita kusta, dan menghidupkan orang mati dengan izin Allah.',
        'Penyelamatan Nabi Isa: Diselamatkan Allah dari rencana pembunuhan dan diangkat jasad dan ruhnya ke langit; akan turun kembali di akhir zaman membunuh Dajjal.',
        'Nabi Muhammad ﷺ (Khatamun Nabiyyin): Rasul pamungkas yang menyempurnakan seluruh syariat terdahulu; mukjizat abadi Al-Qur\'an Al-Karim; pembawa risalah rahmat bagi seluruh alam semesta (Rahmatan lil \'Alamin).',
      ],
      practice: 'Perbanyak shalawat dan salam kepada Nabi Muhammad ﷺ serta cintai seluruh nabi dan rasul Allah tanpa membeda-bedakan.',
      source: quran('33/40'),
    },
  ],
};

export const islamNusantara: Course = {
  id: 'islam-nusantara',
  title: "Sejarah Islam Nusantara, Walisongo, & Nasab Habaib",
  description: "Menelusuri sejarah masuknya Islam secara damai di Nusantara: jalur rempah Samudera Pasai, metode akulturasi Walisongo, silsilah nasab Habaib Ba 'Alawi dari Rasulullah SAW, kerajaan maritim, dan tradisi pesantren.",
  note: "Islam di Nusantara berkembang pesat bukan melalui invasi pedang, melainkan lewat pesona akhlak mulia para pedagang, diplomasi damai, dan kearifan dakwah kultural para wali dan habaib.",
  lessons: [
    {
      id: 'jalur-masuk-islam-nusantara',
      title: 'Jalur Masuknya Islam ke Nusantara: Perdagangan Damai Jalur Rempah',
      category: 'Pintu Masuk Islam',
      summary: 'Bukti sejarah masuknya Islam ke kepulauan Nusantara melalui jalur maritim niaga tanpa kontak senjata sejak abad ke-7 hingga ke-13 M.',
      points: [
        'Teori Masuknya Islam: Perpaduan Teori Arab/Makkah (hubungan dagang langsung awal abad Hijriyah di Barus, Sumatera), Teori Gujarat (India), Teori Persia, dan Teori Tiongkok.',
        'Prasasti & Bukti Arkeologis: Penemuan nisan makam Fatimah binti Maimun di Leran, Gresik (bertarikh 1082 M) dan berdirinya Kesultanan Samudera Pasai (abad ke-13 M) di Aceh.',
        'Jalur Sutra Maritim (Jalur Rempah): Pelabuhan-pelabuhan strategis seperti Malaka, Barus, Banten, Tuban, dan Makassar menjadi melting pot pertemuan budaya dan dakwah santun para saudagar muslim.',
        'Kekuatan Karakter Akhlak: Kejujuran dalam takaran dagang, kesederhanaan hidup, dan keramahan para dai pedagang membuat penduduk pribumi dan raja-raja lokal tertarik memeluk Islam secara sukarela.',
      ],
      practice: 'Jadikan etika kejujuran dan keramahan sebagai media dakwah terbaik dalam kehidupan profesional Anda.',
      source: quran('16/125'),
    },
    {
      id: 'metodologi-akulturasi-dakwah',
      title: 'Filosofi Dakwah Walisongo: Merangkul Budaya Tanpa Merusak Akidah',
      category: 'Strategi Dakwah',
      summary: 'Prinsip akulturasi budaya para wali tanah Jawa yang memasukkan nilai-nilai tauhid ke dalam tradisi lokal tanpa konfrontasi keras.',
      points: [
        'Prinsip Tut Wuri Hangiseni: Mengikuti alur tradisi masyarakat yang sudah ada, lalu perlahan-lahan mengisi ruh dan maknanya dengan nilai tauhid dan syariat Islam.',
        'Menghindari Benturan Frontal: Tidak serta-merta mengharamkan atau menghancurkan adat lokal, melainkan membersihkannya dari unsur kemusyrikan (tahalluq & tashfiyah).',
        'Metode Tadrij (Bertahap): Mengajarkan Islam secara bertahap dan mempermudah (yassiru wa la tu\'assiru), bukan dengan doktrin kaku yang membebani masyarakat awam.',
        'Keteladanan Sosial (Dakwah bil Hal): Para wali menjadi tokoh pelindung masyarakat, mengajarkan teknik irigasi sawah, pengobatan herbal gratis, dan pembelaan hak rakyat kecil.',
      ],
      practice: 'Hargai kearifan lokal masyarakat dan gunakan pendekatan bijak serta santun saat mengajak kepada kebaikan.',
      source: hadith(25),
    },
    {
      id: 'sunan-gresik-dan-ampel',
      title: 'Sunan Gresik & Sunan Ampel: Peletak Fondasi & Falsafah Moh Limo',
      category: 'Era Walisongo Awal',
      summary: 'Kiprah Maulana Malik Ibrahim dan Raden Rahmat dalam merintis kaderisasi ulama dan fondasi moral masyarakat Jawa.',
      points: [
        'Maulana Malik Ibrahim (Sunan Gresik, w. 1419 M): Pelopor Walisongo; mendekati rakyat jelata melalui keterampilan bercocok tanam unggul, pengobatan herbal cuma-cuma, dan perniagaan pasar.',
        'Raden Rahmat (Sunan Ampel): Pendiri Pesantren Ampeldenta di Surabaya; pusat kaderisasi dai dan ulama yang melahirkan generasi penerus Walisongo dan raja-raja Demak.',
        'Ajaran Falsafah Moh Limo (Menolak 5 Perkara Maksiat): Moh Main (tidak berjudi), Moh Ngombe (tidak mabuk minuman keras), Moh Madat (tidak mengonsumsi narkotika/candu), Moh Maling (tidak mencuri/korupsi), dan Moh Madon (tidak berzina).',
        'Inspirasi Pembinaan Moral: Falsafah Moh Limo menjadi benteng etika sosial yang sangat relevan menghadapi dekadensi moral bangsa.',
      ],
      practice: 'Pegang teguh prinsip integritas Moh Limo dalam kehidupan sehari-hari agar terhindar dari penyakit sosial.',
      source: hadith(41),
    },
    {
      id: 'sunan-bonang-dan-drajat',
      title: 'Sunan Bonang & Sunan Drajat: Seni Gamelan & Filantropi Sosial',
      category: 'Seni & Kedermawanan',
      summary: 'Kegeniusan Raden Makhdum Ibrahim mengubah musik gamelan menjadi pengingat akhirat, serta keteladanan sosial Raden Qasim.',
      points: [
        'Sunan Bonang: Menyesuaikan instrumen gamelan Jawa dengan menambahkan nada instrumen "Bonang" yang bernuansa meditatif; menciptakan tembang legendaris "Tombo Ati" (Obat Hati).',
        'Kitab Suluk Bonang: Karya sastra mistik-intelektual tingkat tinggi yang mengupas relasi tauhid, cinta sejati kepada Allah, dan pengendalian hawa nafsu.',
        'Sunan Drajat (Raden Qasim): Dikenal sebagai wali berjiwa filantropis tinggi, pelindung anak yatim piatu, kaum fakir miskin, dan penderita sakit di Lamongan.',
        'Pepali Pitu Sunan Drajat: Nasihat emas: "Menehono teken marang wong kang wuto (Beri tongkat pada orang buta), Menehono mangan marang wong kang luwe (Beri makan orang lapar), Menehono busana marang wong kang wudo (Beri pakaian orang telanjang), Menehono ngiyup marang wong kang kodanan (Beri tempat berteduh orang kehujanan)."',
      ],
      practice: 'Jadikan kepedulian sosial dan kedermawanan nyata sebagai wujud paling konkret dari pengamalan iman.',
      source: hadith(13),
    },
    {
      id: 'sunan-kalijaga-kearifan-wayang',
      title: 'Sunan Kalijaga: Seni Wayang Kulit, Ilir-Ilir, & Baju Takwa',
      category: 'Inovasi Budaya',
      summary: 'Kegeniusan Raden Mas Syahid (Sunan Kalijaga) mentransformasikan seni wayang kulit dan busana tradisional menjadi sarana dakwah tauhid.',
      points: [
        'Reformasi Wayang Kulit: Mengubah wujud wayang kulit purwa dari bentuk mirip manusia menjadi bentuk stilasi dua dimensi yang unik demi menjaga adab syariat tidak melukis makhluk hidup secara utuh.',
        'Tiket Masuk Dua Kalimat Syahadat: Menampilkan pertunjukan wayang di alun-alun secara gratis; masyarakat yang ingin menonton hanya diminta "membayar" dengan mengucapkan dua kalimat syahadat.',
        'Filosofi Jamus Kalimasada: Menjadikan pusaka terkuat dalam pewayangan sebagai metafora dari "Kalimat Syahadat" yang menjadi pelindung hidup manusia.',
        'Tembang Lir-Ilir & Baju Takwa: Syair Lir-Ilir yang sarat pesan membangunkan kesadaran spiritual; serta merancang Baju Takwa (baju kurung) yang kini menjadi pakaian adat nasional.',
      ],
      practice: 'Gunakan kreativitas seni, media digital, dan budaya kontemporer untuk menyampaikan pesan-pesan kebaikan.',
      source: quran('14/4'),
    },
    {
      id: 'sunan-kudus-dan-muria',
      title: 'Sunan Kudus & Sunan Muria: Menara Kudus & Toleransi Budaya',
      category: 'Harmoni Sosial',
      summary: 'Keteladanan toleransi Ja\'far Shadiq (Sunan Kudus) menghormati tradisi masyarakat Hindu, serta metode dakwah Sunan Muria bagi kaum marjinal.',
      points: [
        'Arsitektur Menara Kudus: Membangun menara masjid yang memadukan corak candi Hindu-Majapahit dengan arsitektur Islam, menjadi simbol harmoni abadi lintas budaya.',
        'Larangan Menyembelih Sapi: Demi menghormati perasaan umat Hindu di Kudus yang memuliakan sapi, Sunan Kudus menganjurkan masyarakat menyembelih kerbau saat Idul Adha.',
        'Gelar Panglima Perang Demak: Sunan Kudus adalah seorang pakar fiqih (Waliyyul \'Ilmi) sekaligus komandan militer Kesultanan Demak yang tangguh.',
        'Sunan Muria (Raden Umar Said): Berdakwah di lereng Gunung Muria dan wilayah pesisir; membina para nelayan, pedagang kecil, dan petani pedalaman dengan tembang Sinom dan Kinanti.',
      ],
      practice: 'Kembangkan sikap toleransi dan tenggang rasa antarumat beragama tanpa mengorbankan akidah tauhid kita.',
      source: quran('60/8'),
    },
    {
      id: 'sunan-gunung-jati',
      title: 'Sunan Gunung Jati: Integrasi Dakwah & Kasultanan Maritim',
      category: 'Kepemimpinan & Diplomasi',
      summary: 'Kepemimpinan Syarif Hidayatullah dalam menyebarkan Islam di Jawa Barat dan membangun jaringan internasional Kasultanan Cirebon dan Banten.',
      points: [
        'Jaringan Nasab Internasional: Berdarah bangsawan dari Makkah dan Pajajaran; menuntut ilmu di Madinah, Baghdad, dan Mesir sebelum pulang berdakwah di tanah Sunda.',
        'Pendiri Kasultanan Cirebon & Banten: Memadukan peran sebagai ulama (mursyid tarekat) dan umara (kepala negara) yang adil dan berwibawa.',
        'Diplomasi Internasional: Menjalin persahabatan diplomatik dan hubungan dagang yang harmonis dengan Tiongkok (menikahi Putri Ong Tien Nio) dan bangsa-bangsa maritim dunia.',
        'Pesan Abadi: Nasihat terkenal Sunan Gunung Jati: "Ingsun titip tajug lan fakir miskin" (Aku titipkan masjid/mushalla dan santunilah orang-orang fakir miskin).',
      ],
      practice: 'Makmurkan masjid di lingkungan sekitar dan pastikan masyarakat miskin di sekitar tempat ibadah terpenuhi kebutuhannya.',
      source: hadith(25),
    },
    {
      id: 'nasab-habaib-ba-alawi',
      title: 'Nasab Habaib Ba \'Alawi: Silsilah Keturunan Nabi ﷺ & Dakwah Nusantara',
      category: 'Nasab & Jaringan Ulama',
      summary: 'Silsilah keturunan Rasulullah ﷺ melalui Sayyidah Fatimah dan Sayyidina Husain, hijrah Imam Ahmad Al-Muhajir ke Hadramaut, lahirnya marga-marga Habaib, serta perannya di Nusantara.',
      points: [
        'Pangkal Nasab Suci Melalui Sayyidah Fatimah: Seluruh putra Nabi wafat saat belia; garis keturunan Rasulullah ﷺ berlanjut melalui pernikahan Sayyidah Fatimah Az-Zahra RA dan Sayyidina Ali bin Abi Thalib RA, melahirkan dua cabang utama: Sayyidina Hasan (gelar Syarif) dan Sayyidina Husain (gelar Sayyid/Habib).',
        'Jalur Emas dari Karbala ke Hadramaut: Dari Sayyidina Husain, nasab diteruskan oleh Ali Zainal Abidin (As-Sajjad) yang selamat dari Karbala, Muhammad Al-Baqir, Ja\'far Ash-Shadiq, Ali Al-Uraidhi, hingga Imam Ahmad Al-Muhajir yang berhijrah dari Basrah (Irak) ke Hadramaut (Yaman) pada tahun 317 H demi menyelamatkan akidah dari fitnah politik.',
        'Klan Ba \'Alawi & Tarekat Damai: Dinisbatkan kepada Alawi bin Ubaidillah bin Ahmad Al-Muhajir. Pada era Al-Imam Muhammad Al-Faqih Al-Muqaddam (w. 653 H), beliau mematahkan pedang sebagai simbol meninggalkan senjata perang dan memilih jalur dakwah tasawuf, akhlak, dan ilmu syariat.',
        'Terbentuknya Marga-Marga Habaib: Keturunan Ba \'Alawi menyebar dan melahirkan marga-marga terkenal di Nusantara seperti Assegaf (Al-Saqqaf), Al-Attas, Al-Habsyi, Al-Haddad, Alaydrus, Shihab, Al-Jufri, Bin Yahya, Al-Kaff, dan lainnya.',
        'Pencatatan Ketat & Makna Gelar: Nasab Alawiyyin diverifikasi dengan buku induk silsilah turun-temurun (di Indonesia dicatat resmi oleh Maktab Daimi - Rabithah Alawiyah). "Sayyid" adalah status nasab biologis, sedangkan "Habib" adalah sebutan kehormatan bagi Sayyid yang berilmu, bertakwa, dan mengamalkan ajaran datuknya.',
      ],
      practice: 'Cintai dan muliakan keluarga Nabi (Ahlul Bait) dengan adab yang benar tanpa ghuluw (kultus berlebihan), serta teladani keluasan ilmu dan kelembutan akhlak dakwah mereka.',
      source: quran('42/23'),
    },
    {
      id: 'contoh-habaib-indonesia',
      title: 'Contoh Habaib di Indonesia: Tokoh, Marga, dan Verifikasi',
      category: 'Nasab & Jaringan Ulama',
      summary: 'Beberapa ulama dan pendakwah Indonesia yang dikenal publik dengan gelar Habib. Contoh ini bukan daftar lengkap dan bukan pengganti verifikasi nasab perorangan.',
      points: [
        'Tokoh sejarah: Habib Ali bin Abdurrahman Al-Habsyi (Habib Ali Kwitang) dan Habib Salim bin Ahmad Jindan dikenal dalam sejarah dakwah di Indonesia.',
        'Ulama dan pendakwah masa kini: Habib Muhammad Luthfi bin Ali bin Yahya, Habib Syech bin Abdul Qodir Assegaf, dan Habib Jindan bin Novel bin Salim Jindan.',
        'Tokoh lain yang dikenal dengan gelar tersebut: Habib Munzir bin Fuad Al-Musawa (pendiri Majelis Rasulullah), Habib Muhammad Rizieq Shihab, dan Habib Bahar bin Ali bin Smith (juga ditulis Sumayt/Sumait).',
        'Sebutan publik dan nama marga tidak dengan sendirinya membuktikan silsilah seseorang. Untuk kepastian nasab keluarga tertentu, rujuk pencatatan dan prosedur verifikasi Maktab Daimi Rabithah Alawiyah.',
        'Jangan menyimpulkan bahwa semua orang bermarga Shihab atau Smith menggunakan gelar Habib. Perempuan dari keluarga yang tercatat sebagai keturunan Alawiyyin lazim disebut Syarifah; pemakaian sebutan tetap mengikuti tradisi keluarga masing-masing.',
      ],
      practice: 'Saat menyebut tokoh, bedakan gelar yang dikenal publik, marga keluarga, dan status nasab yang telah diverifikasi. Gunakan sumber tepercaya dan hindari menggeneralisasi satu keluarga dari nama marganya.',
      source: { label: 'Maktab Daimi Rabithah Alawiyah — Sejarah dan fungsi pencatatan nasab', labelEn: 'Maktab Daimi Rabithah Alawiyah — History and role in lineage records', href: 'https://maktabdaimi.org/sejarah' },
      extraReferences: [
        { label: 'NU Online Jakarta — Habib Ali Kwitang', labelEn: 'NU Online Jakarta — Habib Ali Kwitang', href: 'https://jakarta.nu.or.id/literatur/habib-ali-bin-abdurrahman-al-habsyi-sang-ulama-penuntut-ilmu-UwMwu' },
        { label: 'NU Online — Habib Salim bin Jindan', labelEn: 'NU Online — Habib Salim bin Jindan', href: 'https://islam.nu.or.id/fragmen/al-habib-salim-bin-jindan-ulama-nasionalis-dan-pejuang-kemerdekaan-A9ZoK' },
        { label: 'NU Online — Habib Luthfi bin Yahya', labelEn: 'NU Online — Habib Luthfi bin Yahya', href: 'https://nu.or.id/tokoh/habib-muhammad-luthfi-bin-yahya-sosok-pelayan-umat-3ucSw' },
        { label: 'Kompas — Profil Habib Syech bin Abdul Qodir Assegaf', labelEn: 'Kompas — Profile of Habib Syech bin Abdul Qodir Assegaf', href: 'https://cahaya.kompas.com/aktual/26H01212337590/profil-habib-syech-bin-abdul-qodir-assegaf-pengisi-shalawat-kebangsaan-hut-ke-81?source=melewatkan_artikel' },
        { label: 'Yayasan Al-Fachriyah — Habib Jindan bin Novel', labelEn: 'Al-Fachriyah Foundation — Habib Jindan bin Novel', href: 'https://www.alfachriyah.org/tokoh-dan-pengajar-al-fachriyah/habib-jindan-bin-novel-bin-jindan/' },
        { label: 'Majelis Rasulullah — Profil majelis yang didirikan Habib Munzir Al-Musawa', labelEn: 'Majelis Rasulullah — Profile of the assembly founded by Habib Munzir Al-Musawa', href: 'https://www.majelisrasulullah.org/' },
        { label: 'Okezone — Laporan yang mengutip keterangan Ketua Maktab Daimi tentang Habib Rizieq', labelEn: 'Okezone — Report quoting the Maktab Daimi chair on Habib Rizieq', href: 'https://news.okezone.com/read/2020/11/19/337/2312575/rabithah-alawiyah-pastikan-habib-rizieq-keturunan-rasulullah-berikut-silsilahnya' },
        { label: 'Sindonews — Laporan yang mengutip Ketua Maktab Daimi tentang Habib Bahar', labelEn: 'Sindonews — Report quoting the Maktab Daimi chair on Habib Bahar', href: 'https://kalam.sindonews.com/read/432546/786/habib-bahar-keturunan-nabi-muhammad-saw-ke-37-berikut-silsilahnya-1621497936' },
      ],
    },
    {
      id: 'kesultanan-maritim-nusantara',
      title: 'Kesultanan Maritim Nusantara: Demak, Aceh, Mataram, & Tidore',
      category: 'Peradaban Kerajaan',
      summary: 'Kejayaan imperium maritim Islam di Nusantara yang menjaga kedaulatan kepulauan dari penjajahan bangsa Eropa.',
      points: [
        'Kesultanan Demak Bintoro: Kerajaan Islam pertama di Jawa; memobilisasi armada laut di bawah pimpinan Pati Unus (Pangeran Sabrang Lor) menyerang Portugis di Malaka (1513 M).',
        'Kesultanan Aceh Darussalam: Menjadi pangkalan militer dan diplomatik Islam internasional; menjalin koalisi pertahanan maritim dengan Khilafah Utsmaniyah di Istanbul.',
        'Kesultanan Gowa-Tallo & Hukum Laut: Memiliki hukum navigasi maritim internasional Amanna Gappa; Sultan Hasanuddin dijuluki "Ayam Jantan dari Timur" melawan VOC.',
        'Ternate, Tidore, & Banjar: Pusat rempah cengkeh dan pala dunia di Maluku yang berdaulat di bawah syariat Islam dan mengusir penjajahan Spanyol dan Portugis.',
      ],
      practice: 'Rawat jiwa patriotisme dan kesadaran maritim untuk menjaga kedaulatan tanah air Indonesia.',
      source: quran('4/59'),
    },
    {
      id: 'tradisi-pesantren-dan-sanad',
      title: 'Tradisi Pesantren & Sanad Keilmuan Ulama Nusantara',
      category: 'Pendidikan Islam',
      summary: 'Institusi pendidikan tertua di Indonesia yang menjaga transmisi keilmuan Islam bersambung hingga Rasulullah SAW.',
      points: [
        'Pesantren sebagai Episentrum Literasi: Mengajarkan kitab-kitab kuning klasik (turats) dalam bidang nahwu, sharaf, fiqih, tafsir, hadits, dan tasawuf.',
        'Hubungan Santri-Kyai: Membangun adab penghormatan kepada guru, budaya tawadhu, kesederhanaan hidup (zuhud), dan kemandirian karakter santri.',
        'Jaringan Ulama Nusantara di Haramain: Kiprah ulama besar Nusantara yang menjadi imam dan guru besar di Masjidil Haram Makkah, seperti Syekh Nawawi Al-Bantani, Syekh Khatib Al-Minangkabawi, dan Syekh Mahfuzh At-Tarmasi.',
        'Karya Mendunia: Kitab tafsir Marah Labid karya Imam Nawawi Banten dicetak dan dipelajari di universitas-universitas terkemuka dunia Islam di Timur Tengah dan Afrika Utara.',
      ],
      practice: 'Dukung penguatan lembaga pesantren sebagai benteng moral dan produsen kader intelektual bangsa.',
      source: hadith(26),
    },
    {
      id: 'hubbul-wathan-minal-iman',
      title: 'Hubbul Wathan Minal Iman: Santri & Ulama Penjaga Bangsa',
      category: 'Nasionalisme & Kemerdekaan',
      summary: 'Peran heroik ulama dan santri dalam melahirkan Republik Indonesia dan resolusi jihad mempertahankan kedaulatan.',
      points: [
        'Resolusi Jihad 22 Oktober 1945: Fatwa fardhu \'ain yang difatwakan Hadratusy Syekh KH Hasyim Asy\'ari untuk mempertahankan kemerdekaan RI yang memicu pertempuran heroik 10 November di Surabaya.',
        'Peran Tokoh Perumus Bangsa: Kontribusi KH Wahid Hasyim, Ki Bagus Hadikusumo, Kasman Singodimedjo, Agus Salim, dan M. Natsir dalam merumuskan dasar negara Pancasila.',
        'Piagam Jakarta & Pancasila sebagai Kalimatun Sawa\': Para ulama rela menghapus 7 kata demi keutuhan NKRI; membuktikan umat Islam adalah garda terdepan penjaga persatuan bangsa.',
        'Prinsip Hubbul Wathan Minal Iman: Mencintai tanah air adalah bagian dari manifestasi keimanan sejati yang diwujudkan dengan menjaga kedamaian dan membangun negeri.',
      ],
      practice: 'Jadikan nilai keislaman dan kebangsaan berjalan seiring tanpa dipertentangkan dalam menjaga keutuhan NKRI.',
      source: quran('49/13'),
    },
  ],
};

export const sahabatSurga: Course = {
  id: 'sahabat-surga',
  title: "10 Sahabat Dijamin Masuk Surga (Al-'Asyarah Al-Mubasysyarun)",
  description: "Meneladani karakter luhur, pengorbanan harta & jiwa, serta kepemimpinan 10 sahabat utama yang mendapat kabar gembira jaminan surga dari Rasulullah ﷺ.",
  note: "Generasi sahabat Nabi adalah generasi terbaik umat ini. Meneladani integritas dan ketulusan mereka adalah kompas menjaga kemurnian iman di tengah fitnah zaman.",
  lessons: [
    {
      id: 'hadits-al-asyarah',
      title: 'Ketetapan Hadits 10 Sahabat Dijamin Surga',
      category: 'Pondasi Sunnah',
      summary: 'Takhrij riwayat shahih yang menyebutkan secara spesifik sepuluh nama sahabat agung penerima kabar gembira istana surga.',
      points: [
        'Nash Hadits Shahih (HR. At-Tirmidzi no. 3747 & Ahmad): Rasulullah SAW bersabda: "Abu Bakar di surga, Umar di surga, Utsman di surga, Ali di surga, Thalhah di surga, Az-Zubair di surga, Abdurrahman bin Auf di surga, Sa\'ad (bin Abi Waqqash) di surga, Sa\'id (bin Zaid) di surga, dan Abu Ubaidah ibnul Jarrah di surga."',
        'Generasi Terbaik: Sabda Nabi SAW: "Sebaik-baik manusia adalah generasiku (sahabat), kemudian orang-orang setelah mereka (tabi\'in), kemudian orang-orang setelah mereka (tabi\'ut tabi\'in)" (HR. Bukhari).',
        'Karakteristik Bersama: Keikhlasan total tanpa pamrih duniawi, loyalitas mutlak kepada wahyu, dan pengorbanan jiwa serta harta saat Islam dalam kondisi terasing.',
        'Bukan Berarti Bebas Tanggung Jawab: Meskipun telah dijamin surga saat masih hidup di dunia, para sahabat ini justru semakin memperbanyak ibadah, menangis karena takut kepada Allah, dan tawadhu.',
      ],
      practice: 'Cintai para sahabat Nabi dengan mempelajari kisah hidup mereka dan menolak celaan orang-orang yang membenci mereka.',
      source: hadith(25),
    },
    {
      id: 'abu-bakar-ash-shiddiq',
      title: 'Abu Bakar Ash-Shiddiq: Teladan Kejujuran & Pengorbanan Total',
      category: 'Khulafaur Rasyidin',
      summary: 'Manusia terbaik di muka bumi setelah para Nabi: sahabat setia di Gua Tsur dan khalifah pertama pemersatu umat.',
      points: [
        'Gelar Ash-Shiddiq: Langsung membenarkan peristiwa Isra\' Mi\'raj tanpa ragu sedikit pun saat penduduk Makkah menganggapnya mustahil.',
        'Penyelamat Kaum Tertindas: Menginfakkan hartanya untuk membebaskan budak-budak muslim yang disiksa kafir Quraisy, termasuk muadzin Bilal bin Rabah.',
        'Menginfakkan 100% Hartanya: Saat Perang Tabuk, Nabi bertanya: "Apa yang engkau tinggalkan untuk keluargamu?" Abu Bakar menjawab: "Aku tinggalkan untuk mereka Allah dan Rasul-Nya."',
        'Keteguhan Masa Kritis: Memerangi gerakan murtad politik dan pembangkang zakat pasca wafatnya Nabi; mencetuskan pengumpulan mushaf Al-Qur\'an pertama.',
      ],
      practice: 'Dahulukan keridhaan Allah dan Rasul-Nya di atas segala kepentingan materi dan popularitas dunia.',
      source: hadith(39),
    },
    {
      id: 'umar-bin-khattab',
      title: 'Umar bin Khattab: Al-Faruq, Singa Keadilan yang Ditakuti Setan',
      category: 'Khulafaur Rasyidin',
      summary: 'Sosok pemberani pembeda kebenaran dan kebatilan, peletak sistem administrasi publik, dan teladan kesederhanaan pemimpin.',
      points: [
        'Gelar Al-Faruq: Diberikan langsung oleh Rasulullah SAW karena keberaniannya menampakkan keislaman secara terang-terangan dan memisahkan hak dari batil.',
        'Ditakuti Setan: Sabda Nabi: "Demi Dzat yang jiwaku berada di tangan-Nya, tidaklah setan berpapasan denganmu di suatu jalan melainkan ia akan mengambil jalan lain" (HR. Bukhari).',
        'Keadilan Sosial Ekstrem: Berpatroli malam hari memanggul sendiri karung gandum untuk keluarga janda miskin yang kelaparan; bajunya memiliki belasan tambalan kain.',
        'Penetapan Kalender Hijriyah: Menggagas penanggalan Islam berbasis peristiwa Hijrah, mendirikan pos keamanan, pengadilan independen, dan perlindungan warga non-Muslim di Yerusalem.',
      ],
      practice: 'Tegakkan keadilan hukum tanpa pandang bulu dan miliki rasa takut yang mendalam terhadap hisab tanggung jawab kepemimpinan.',
      source: hadith(24),
    },
    {
      id: 'utsman-bin-affan',
      title: 'Utsman bin Affan: Dzun Nurain, Sang Dermawan Berakhlak Lembut',
      category: 'Khulafaur Rasyidin',
      summary: 'Sahabat bergelar pemilik dua cahaya yang membiayai dakwah Islam dengan kekayaan melimpah dan rasa malu yang tinggi.',
      points: [
        'Gelar Dzun Nurain: Menikahi dua putri Rasulullah SAW secara berurutan (Ruqayyah dan Ummu Kultsum); para malaikat pun merasa malu kepada kelembutan akhlak Utsman.',
        'Membeli Sumur Ruma: Membeli sumur air tawar milik warga Yahudi di Madinah dengan harga mahal lalu mewakafkannya secara gratis untuk seluruh warga muslim dan penduduk kota.',
        'Menyokong Pasukan Perang Tabuk (Jaisyul \'Usrah): Mendonasikan 950 ekor unta, 50 ekor kuda, dan 1.000 dinar emas hingga Nabi bersabda: "Tidak ada yang membahayakan Utsman setelah perbuatannya hari ini."',
        'Standarisasi Mushaf Utsmani: Membukukan Al-Qur\'an ke dalam satu rasm resmi (Mushaf Utsmani) untuk menyelamatkan umat dari perpecahan bacaan dialek.',
      ],
      practice: 'Gunakan kekayaan yang Allah titipkan untuk program-program wakaf abadi yang mengalirkan pahala tanpa henti.',
      source: hadith(26),
    },
    {
      id: 'ali-bin-abi-thalib',
      title: 'Ali bin Abi Thalib: Pintu Gerbang Ilmu & Singa Pertempuran',
      category: 'Khulafaur Rasyidin',
      summary: 'Sepupu dan menantu Rasulullah SAW: ksatria pemberani di medan laga dan rujukan kebijaksanaan hukum para sahabat.',
      points: [
        'Pintu Gerbang Ilmu: Sabda Nabi SAW: "Aku adalah kotanya ilmu dan Ali adalah pintu gerbangnya; barangsiapa menghendaki ilmu hendaklah ia mendatangi pintunya."',
        'Keberanian di Tempat Tidur Nabi: Menggantikan posisi tidur Rasulullah SAW di malam Hijrah berselimut kain hijau meski dikepung para algojo Quraisy bersenjata tajam.',
        'Pahlawan Penakluk Benteng Khaibar: Membawa panji kemenangan Islam di Benteng Khaibar yang kokoh setelah para panglima sebelumnya menemui jalan buntu.',
        'Integritas Peradilan Tinggi: Menolak memperlakukan dirinya istimewa di depan hakim Syuraih dalam sidang sengketa baju besi melawan warga Yahudi.',
      ],
      practice: 'Padukan kecerdasan intelektual yang tajam dengan keberanian moral membela kebenaran.',
      source: hadith(25),
    },
    {
      id: 'abdurrahman-bin-auf',
      title: 'Abdurrahman bin \'Auf: Konglomerat Dermawan Bertangan Emas',
      category: 'Sahabat Pilihan',
      summary: 'Teladan pebisnis muslim yang memulai usaha dari nol di pasar Madinah dan menjadi donatur terbesar perjuangan Islam.',
      points: [
        'Memulai dari Nol: Saat hijrah ke Madinah tanpa sepeser pun harta, ia menolak santunan cuma-cuma dari Sa\'ad bin Ar-Rabi\' dan hanya berkata: "Tunjukkan kepadaku di mana pasar."',
        'Keberkahan Perniagaan: Terkenal bertangan dingin karena jujur dan transparan; ia berkata: "Seandainya aku mengangkat sebuah batu, niscaya aku menemukan emas atau perak di bawahnya."',
        'Kafilah 700 Unta untuk Madinah: Menginfakkan seluruh kafilah dagang berisi 700 unta sarat gandum, minyak, dan makanan pokok untuk dibagikan cuma-cuma kepada penduduk Madinah.',
        'Mewasiatkan Harta bagi Veteran Badr: Memberi santunan emas bernilai jutaan dirham bagi setiap veteran Perang Badr yang masih hidup dan bagi janda-janda Ummul Mukminin.',
      ],
      practice: 'Jadilah pengusaha muslim yang kaya raya dengan niat mulia menopang ekonomi umat dan membebaskan fakir miskin.',
      source: hadith(41),
    },
    {
      id: 'abu-ubaidah-ibnul-jarrah',
      title: 'Abu \'Ubaidah ibnul Jarrah: Aminul Ummah (Orang Paling Amanah)',
      category: 'Sahabat Pilihan',
      summary: 'Panglima agung yang menaklukkan Syam namun hidup sangat zuhud di dalam kemah sederhana tanpa perabotan mewah.',
      points: [
        'Gelar Aminul Ummah: Rasulullah SAW bersabda: "Setiap umat memiliki orang yang sangat terpercaya, dan orang paling terpercaya dari umat ini adalah Abu \'Ubaidah ibnul Jarrah" (HR. Bukhari).',
        'Pencabut Besi di Pipi Nabi: Di Perang Uhud, lingkaran besi baju perang Nabi menancap di pipi beliau; Abu Ubaidah mencabutnya dengan gigi depannya hingga dua gigi serinya tanggal demi tidak menyakiti Nabi.',
        'Panglima Tertinggi Pembebas Syam: Memimpin penaklukan wilayah Syam dan Yerusalem; Khalifah Umar menangis saat mengunjungi kemah Abu Ubaidah yang hanya beralaskan pelana kuda dan sepotong roti kering.',
        'Wafat dalam Wabah Tha\'un Amwas: Menolak dievakuasi ke Madinah karena ingin mendampingi dan berbagi derita bersama pasukannya yang terkena wabah pes di Syam.',
      ],
      practice: 'Jadilah orang yang dapat dipercaya 100% dalam memegang amanah pekerjaan, uang, dan rahasia sesama.',
      source: hadith(34),
    },
    {
      id: 'saad-bin-abi-waqqash',
      title: 'Sa\'ad bin Abi Waqqash: Pemanah Pertama & Doa yang Mustajab',
      category: 'Sahabat Pilihan',
      summary: 'Paman Rasulullah SAW dari jalur ibu, pelopor pemanah Islam, dan panglima penakluk imperium adidaya Persia.',
      points: [
        'Pemanah Pertama dalam Islam: Orang pertama yang melepaskan anak panah di jalan Allah dalam ekspedisi pertahanan Islam awal.',
        'Doa Mustajab yang Ditakuti: Rasulullah SAW berdoa khusus untuknya: "Ya Allah, tepatkanlah bidikan panahnya dan kabulkanlah doanya." Tidak ada orang yang berani menzaliminya karena takut doanya.',
        'Panglima Perang Al-Qadisiyyah: Memimpin pasukan kaum muslimin meruntuhkan kedigdayaan militer Imperium Sassania Persia hingga ibukota Al-Mada\'in jatuh ke tangan Islam.',
        'Teladan Birrul Walidain: Menolak tunduk pada mogok makan ibunya yang memaksanya murtad, namun tetap memperlakukan sang ibu dengan santun dan penuh kasih.',
      ],
      practice: 'Jaga kehalalan makanan dan minuman Anda, karena makanan halal adalah kunci utama dikabulkannya doa.',
      source: hadith(7),
    },
    {
      id: 'thalhah-bin-ubaidillah',
      title: 'Thalhah bin \'Ubaidillah: Syahid yang Berjalan di Muka Bumi',
      category: 'Sahabat Pilihan',
      summary: 'Pahlawan penyelamat Rasulullah di Perang Uhud yang merelakan tangannya lumpuh demi menangkis sabetan pedang musuh.',
      points: [
        'Gelar Syahid Berjalan: Sabda Nabi SAW: "Barangsiapa yang senang melihat seorang syahid yang masih berjalan di muka bumi, hendaklah ia melihat Thalhah bin \'Ubaidillah."',
        'Perisai Hidup di Perang Uhud: Saat pasukan muslimin terdesak, Thalhah memeluk tubuh Nabi dan menangkis panah serta tebasan pedang musuh dengan tangannya hingga jari-jarinya lumpuh permanen.',
        'Menderita 35 Luka Tusukan: Tubuhnya dipenuhi lebih dari tiga puluh luka tusukan pedang, tombak, dan panah demi memastikan Rasulullah SAW tidak tersentuh bahaya.',
        'Gelar Thalhatul Jud (Thalhah Sang Dermawan): Terkenal membagikan keuntungan dagang puluhan ribu dirham setiap hari kepada fakir miskin suku Taim.',
      ],
      practice: 'Bela kehormatan ajaran Islam dan junjung tinggi keselamatan sesama dengan penuh pengorbanan.',
      source: hadith(2),
    },
    {
      id: 'az-zubair-dan-said-bin-zaid',
      title: 'Az-Zubair bin Al-\'Awwam & Sa\'id bin Zaid: Pembela & Pejuang Tauhid',
      category: 'Sahabat Pilihan',
      summary: 'Kiprah Hawari (pembela setia) Rasulullah SAW dan Sa\'id bin Zaid, putra pencari tauhid hanif yang membebaskan Damaskus.',
      points: [
        'Az-Zubair bin Al-\'Awwam (Hawari Nabi): Sabda Nabi SAW: "Sesungguhnya setiap nabi memiliki hawari (pembela setia), dan hawariku adalah Az-Zubair bin Al-\'Awwam" (Muttafaqun \'alaih).',
        'Pedang Pertama yang Terhunus: Zubair adalah orang pertama dalam Islam yang menghunuskan pedang di kota Makkah demi melindungi kabar keselamatan Rasulullah.',
        'Sa\'id bin Zaid: Putra Zaid bin \'Amr bin Nufail (tokoh hanif yang menolak berhala sebelum Islam datang); Sa\'id dan istrinya Fathimah binti Khattab menjadi asbab masuk Islamnya Umar bin Khattab.',
        'Pahlawan Perang Yarmuk & Damaskus: Bertempur gagah berani di barisan depan penaklukan Syam, lalu mengundurkan diri dari jabatan gubernur Damaskus demi menjadi prajurit biasa.',
      ],
      practice: 'Jadilah pembela kebenaran yang setia tanpa mengharapkan jabatan kekuasaan atau pujian duniawi.',
      source: hadith(30),
    },
  ],
};

export const lingkungan: Course = {
  id: 'lingkungan',
  title: "Fiqh Lingkungan & Ekologi Islam (Fiqh al-Bi'ah)",
  description: "Menjaga bumi sebagai amanah khalifah: fiqh konservasi air, hak asasi satwa, sedekah hijau menanam pohon, larangan merusak alam, dan tata kelola lingkungan lestari.",
  note: "Krisis ekologi modern bukan hanya problem sains dan teknologi, melainkan krisis moral spiritual. Islam menempatkan pelestarian alam sebagai bagian integral dari ketakwaan tauhid.",
  lessons: [
    {
      id: 'mandat-khalifah-dan-bumi',
      title: 'Mandat Khalifah & Larangan Fasad di Muka Bumi',
      category: 'Pilar Ekologi Tauhid',
      summary: 'Kedudukan manusia sebagai pengelola bumi yang bertugas merawat alam, bukan mengeksploitasinya secara serakah.',
      points: [
        'Amanah Khalifah (QS. Al-Baqarah: 30): Manusia ditunjuk sebagai khalifah di bumi untuk membangun peradaban yang selaras dengan hukum alam (Sunnatullah), bukan perusak ekosistem.',
        'Peringatan Kerusakan Alam (QS. Ar-Rum: 41): "Telah tampak kerusakan di darat dan di laut disebabkan perbuatan tangan manusia, agar Allah merasakan kepada mereka sebagian dari (akibat) perbuatan mereka."',
        'Larangan Israf & Tabdzir: Islam melarang pemborosan sumber daya alam dan konsumerisme berlebih yang mengorbankan kelestarian generasi masa depan.',
        'Alam Semesta Ikut Bertasbih: Seluruh pepohonan, bebatuan, gunung, dan hewan senantiasa bertasbih menyucikan Allah (QS. Al-Isra: 44); merusaknya secara zalim berarti mengganggu tasbih semesta.',
      ],
      practice: 'Sadari bahwa setiap sampah plastik yang kita buang dan pohon yang kita jaga adalah bagian dari pertanggungjawaban ibadah.',
      source: quran('30/41'),
    },
    {
      id: 'fiqh-konservasi-air',
      title: 'Fiqh Konservasi Air & Larangan Boros Wudhu',
      category: 'Konservasi Sumber Daya',
      summary: 'Keteladanan Rasulullah SAW dalam menghemat air wudhu dan mandi bahkan saat berada di tepi sungai yang mengalir deras.',
      points: [
        'Teguran Nabi kepada Sa\'ad bin Abi Waqqash: Nabi melihat Sa\'ad berwudhu dengan air berlebih lalu menegur: "Mengapa boros seperti ini?" Sa\'ad bertanya: "Apakah dalam wudhu ada pemborosan?" Nabi menjawab: "Ya, meskipun engkau berada di tepi sungai yang mengalir deras" (HR. Ibnu Majah).',
        'Ukuran Wudhu Rasulullah: Rasulullah SAW biasa berwudhu hanya dengan satu mud air (kurang lebih 0,6 liter atau satu gayung kecil) dan mandi dengan satu sha\' air (sekitar 2,5 liter).',
        'Air Sumber Kehidupan (QS. Al-Anbiya: 30): "Dan Kami jadikan dari air segala sesuatu yang hidup. Maka mengapakah mereka tidak juga beriman?"',
        'Hukum Menahan Kelebihan Air: Nabi mengharamkan seseorang memonopoli sumber air dan melarang orang lain atau hewan ternak meminumnya.',
      ],
      practice: 'Kecilkan kran air saat berwudhu dan matikan saat menggosok gigi; jangan biarkan air bersih terbuang sia-sia.',
      source: hadith(1),
    },
    {
      id: 'hak-asasi-hewan-ihsan',
      title: 'Hak Asasi Hewan & Perintah Bersikap Ihsan',
      category: 'Etika Terhadap Fauna',
      summary: 'Perlindungan hak satwa dalam Islam: larangan menyiksa binatang, adab menyembelih, dan kasih sayang pada makhluk hidup.',
      points: [
        'Wanita Masuk Neraka karena Kucing: Hadits shahih Muttafaqun \'alaih mengisahkan wanita yang disiksa di neraka karena mengurung seekor kucing hingga mati kelaparan tanpa diberi makan atau dibiarkan mencari makan.',
        'Pria Masuk Surga karena Anjing Haus: Seorang pria diampuni seluruh dosanya dan dimasukkan ke surga hanya karena bersusah payah turun ke sumur mengambil air dengan sepatunya demi memberi minum anjing yang sekarat kehausan.',
        'Kaidah Ihsan dalam Menyembelih: Sabda Nabi SAW: "Sesungguhnya Allah mewajibkan berlaku ihsan dalam segala hal; jika kalian menyembelih maka sembelihlah dengan cara terbaik, pertajamlah pisau dan tenangkanlah hewan sembelihan" (HR. Muslim).',
        'Larangan Menjadikan Hewan Sasaran Tembak: Mengutuk siapa saja yang menjadikan hewan bernyawa sebagai target latihan menembak atau mengadu hewan demi hiburan.',
      ],
      practice: 'Beri makan kucing liar di sekitar lingkungan Anda dan perlakukan seluruh hewan dengan kasih sayang.',
      source: hadith(13),
    },
    {
      id: 'sedekah-hijau-menanam-pohon',
      title: 'Sedekah Hijau: Pahala Jariyah Menanam Pohon',
      category: 'Investasi Akhirat',
      summary: 'Ganjaran pahala sedekah yang terus mengalir dari setiap daun, oksigen, dan buah yang dihasilkan dari tanaman seorang muslim.',
      points: [
        'Hadits Pohon sebagai Sedekah: Sabda Nabi SAW: "Tidaklah seorang muslim menanam pohon atau menabur benih tanaman, lalu buahnya dimakan oleh manusia, burung, atau binatang ternak, melainkan hal itu bernilai sedekah baginya" (HR. Bukhari & Muslim).',
        'Amal Jariyah Tanpa Akhir: Pohon yang ditanam akan terus memproduksi oksigen, menyerap karbon dioksida, dan menahan erosi tanah; pahalanya terus mengalir kepada penanamnya meski ia telah wafat.',
        'Larangan Menebang Pohon saat Perang: Khalifah Abu Bakar Ash-Shiddiq menginstruksikan pasukan militernya: "Jangan menebang pohon yang berbuah, jangan merusak tanaman, dan jangan membakar pohon kurma."',
        'Reboisasi Hutan Gundul: Gerakan menanam pohon adalah implementasi nyata dari fiqh sedekah yang berdimensi sosial dan ekologis.',
      ],
      practice: 'Tanamlah minimal satu pohon atau tanaman hijau di pekarangan rumah Anda dengan niat sedekah jariyah.',
      source: hadith(25),
    },
    {
      id: 'anjuran-menanam-saat-kiamat',
      title: 'Menanam Bibit Kurma Saat Kiamat Tiba: Etos Kerja Ekologis',
      category: 'Filosofi Harapan',
      summary: 'Hadits fenomenal Rasulullah SAW tentang kewajiban terus berbuat baik merawat bumi tanpa terjebak keputusasaan masa depan.',
      points: [
        'Sabda Nabi yang Menggetarkan Jiwa (HR. Ahmad): "Jika hari kiamat telah tegak berdiri dan di tangan salah seorang di antara kalian ada sebuah bibit kurma, maka jika ia mampu menanamnya sebelum kiamat terjadi, hendaklah ia menanamnya!"',
        'Bantahan Nihilisme: Mengajarkan bahwa nilai sebuah kebaikan terletak pada proses ketaatan dan ikhtiar nyata, bukan pada apakah kita akan menikmati hasilnya atau tidak.',
        'Anti Keputusasaan: Meskipun dunia berada di ambang kehancuran atau krisis global, seorang mukmin tidak boleh menyerah bersikap apatis.',
        'Simbol Kehidupan: Bibit tanaman adalah lambang kehidupan, keberlanjutan, dan optimisme tauhid.',
      ],
      practice: 'Teruslah menebar kebaikan dan menanam harapan di lingkungan sekitar tanpa terpengaruh pesimisme berita buruk.',
      source: hadith(39),
    },
    {
      id: 'hima-dan-harim-konservasi',
      title: 'Konsep Hima & Harim: Kawasan Konservasi Terproteksi Sunnah',
      category: 'Tata Kelola Hutan',
      summary: 'Sistem hukum Islam dalam memetakan zona hutan lindung, cagar alam, dan daerah tangkapan air terproteksi.',
      points: [
        'Definisi Hima: Kawasan hutan atau padang rumput lindung yang ditetapkan pemerintah demi kemaslahatan umum; terlarang bagi perambahan liar, perburuan, atau penebangan pohon komersial.',
        'Hima Rasulullah di An-Naqi\': Nabi SAW menetapkan kawasan lindung An-Naqi\' di dekat Madinah untuk menjaga pakan kuda-kuda perjuangan dan pelestarian satwa liar.',
        'Konsep Harim: Zona penyangga (buffer zone) di sekitar mata air, tepi sungai, sumur, dan pepohonan yang dilarang didirikan bangunan demi mencegah pencemaran dan kekeringan.',
        'Relevansi Modern: Konsep Hima dan Harim adalah rujukan fiqih otentik untuk penetapan Taman Nasional, Hutan Lindung, dan sempadan sungai.',
      ],
      practice: 'Dukung perlindungan hutan adat dan kawasan konservasi cagar alam dari ancaman pembalakan liar.',
      source: hadith(24),
    },
    {
      id: 'kebersihan-dan-polusi-lingkungan',
      title: 'Larangan Mengotori Fasilitas Publik & Tiga Hal Terlaknat',
      category: 'Sanitasi & Kebersihan',
      summary: 'Peringatan keras Rasulullah SAW terhadap orang-orang yang mencemari lingkungan tempat umum dan sumber air masyarakat.',
      points: [
        'Tiga Perbuatan Terlaknat (Mawaqi\'ul La\'an): Sabda Nabi SAW: "Takutlah kalian terhadap tiga perkara yang mengundang kutukan: buang air besar di sumber-sumber air, di tengah jalan umum, dan di bawah pohon tempat orang berteduh" (HR. Abu Dawud).',
        'Menyingkirkan Duri adalah Bagian Iman: Sabda Nabi: "Iman itu memiliki 70 lebih cabang... dan cabang yang paling rendah adalah menyingkirkan gangguan (sampah, duri, kotoran) dari jalan" (HR. Muslim).',
        'Pencemaran Udara dan Sungai: Membuang limbah beracun ke sungai atau membakar sampah sembarangan yang mengganggu tetangga termasuk perbuatan zalim yang diharamkan.',
        'Kebersihan Bagian dari Iman (Ath-Thahuru Syathrul Iman): Menjaga kebersihan lingkungan rumah dan fasilitas ibadah adalah bukti keimanan sejati.',
      ],
      practice: 'Simpan sampah Anda di saku atau tas jika belum menemukan tempat sampah; jangan pernah membuang sampah sembarangan di jalan.',
      source: hadith(2),
    },
    {
      id: 'pengelolaan-sampah-dan-plastik',
      title: 'Mengurangi Sampah Plastik: Prinsip Anti-Israf & Zero Waste',
      category: 'Gaya Hidup Hijau',
      summary: 'Solusi syariat Islam menghadapi darurat sampah plastik melalui pembatasan konsumsi, daur ulang, dan pola hidup bersahaja.',
      points: [
        'Darurat Sampah Plastik: Jutaan ton plastik mikro mencemari laut dan membunuh biota laut; plastik membutuhkan ratusan tahun untuk terurai di tanah.',
        'Kaidah Al-Qur\'an (QS. Al-A\'raf: 31): "Makan dan minumlah kalian, tetapi janganlah berlebih-lebihan (israf). Sesungguhnya Allah tidak menyukai orang-orang yang berlebih-lebihan."',
        'Pola Hidup Minim Sampah (Zero Waste): Membiasakan membawa botol minum (tumbler) sendiri, tas belanja ramah lingkungan, dan menolak kantong plastik sekali pakai.',
        'Fatwa Majelis Ulama: Fatwa MUI No. 47 Tahun 2014 tentang Pengelolaan Sampah untuk Mencegah Kerusakan Lingkungan menegaskan bahwa membuang sampah sembarangan adalah haram hukumnya.',
      ],
      practice: 'Gunakan wadah guna ulang dan hindari penggunaan wadah plastik sekali pakai saat membeli makanan atau minuman.',
      source: quran('7/31'),
    },
    {
      id: 'energi-terbarukan-dan-sunnatullah',
      title: 'Energi Terbarukan: Memanfaatkan Ayat Kauniyah Allah',
      category: 'Transisi Energi',
      summary: 'Tadabbur potensi sinar matahari, angin, dan aliran air sebagai energi masa depan yang bersih dan bersahabat dengan bumi.',
      points: [
        'Matahari Sumber Energi Tak Terbatas (QS. Nuh: 16): "Dan Allah menjadikan matahari sebagai pelita yang terang benderang." Panel surya adalah teknologi memanen rahmat cahaya Ilahi.',
        'Angin Penggerak Turbin (QS. Al-Hijr: 22): "Dan Kami telah meniupkan angin untuk mengawinkan (tumbuh-tumbuhan)...." Energi angin adalah sumber daya kinetik alami yang melimpah.',
        'Mengurangi Ketergantungan Energi Fosil: Pembakaran batu bara dan minyak bumi berlebihan memicu gas rumah kaca, hujan asam, dan pemanasan global yang merusak atmosfer bumi.',
        'Etika Teknologi Islam: Inovasi teknologi energi terbarukan harus berorientasi pada kemaslahatan umum (Maslahah Mursalah) dan pelestarian iklim dunia.',
      ],
      practice: 'Hemat listrik di rumah: matikan lampu dan pendingin ruangan saat tidak digunakan.',
      source: quran('71/16'),
    },
    {
      id: 'advokasi-keadilan-iklim',
      title: 'Advokasi Keadilan Iklim & Tanggung Jawab Antargenerasi',
      category: 'Keadilan Ekologis',
      summary: 'Menegakkan keadilan bagi kaum miskin yang paling terdampak krisis iklim dan menjaga warisan bumi sehat untuk anak cucu.',
      points: [
        'Keadilan Iklim (Climate Justice): Negara-negara miskin dan masyarakat pesisir sering menjadi korban terparah bencana iklim (banjir rob, kekeringan), padahal jejak karbon mereka paling kecil.',
        'Amanah Antargenerasi: Bumi ini bukanlah warisan mutlak dari nenek moyang, melainkan pinjaman titipan suci dari anak cucu kita di masa depan.',
        'Peran Pesantren & Komunitas Masjid: Mengembangkan program "Eco-Masjid" dan "Eco-Pesantren" (pemanenan air hujan, panel surya atap, dan bank sampah mandiri).',
        'Pahala Membela Lingkungan: Aktivisme lingkungan yang dilandasi niat ikhlas menolak kerusakan bumi (Dar\'ul Mafasid) tergolong jihad peradaban yang mulia di sisi Allah.',
      ],
      practice: 'Dukung inisiatif masjid ramah lingkungan (Eco-Masjid) di lingkungan tempat tinggal Anda.',
      source: quran('28/77'),
    },
  ],
};

export const fiqhDakwah: Course = {
  id: 'fiqh-dakwah',
  title: "Fiqh Dakwah & Seni Komunikasi Lintas Iman",
  description: "Metodologi komunikasi persuasif Al-Qur'an (Hikmah, Mau'izhah Hasanah, Jidal bil Ahsan), psikologi audiens, etika dialog lintas iman, dan kekuatan dakwah bil hal.",
  note: "Dakwah dalam Islam bukanlah pemaksaan atau penghakiman, melainkan seni menyampaikan risalah kebenaran dengan hikmah logika, kelembutan akhlak, dan argumentasi santun.",
  lessons: [
    {
      id: 'tiga-metode-qurani',
      title: 'Tiga Metode Utama Dakwah Qur\'ani (QS. An-Nahl: 125)',
      category: 'Metodologi Pokok',
      summary: 'Fondasi komunikasi ilahi dalam mengajak manusia menuju kebenaran: Hikmah, Mau\'izhah Hasanah, dan Jidal bil Ahsan.',
      points: [
        'Ayat Fondasi (QS. An-Nahl: 125): "Serulah (manusia) kepada jalan Tuhanmu dengan hikmah dan pengajaran yang baik, dan berdebatlah dengan mereka dengan cara yang paling baik."',
        'Bil Hikmah (Kebijaksanaan & Logika): Ditujukan bagi kaum pemikir, intelektual, dan cendekiawan; menggunakan dalil rasional, argumentasi filosofis yang kokoh, dan menempatkan sesuatu pada tempatnya.',
        'Al-Mau\'izhah Al-Hasanah (Nasihat yang Menyentuh): Ditujukan bagi masyarakat awam; menggunakan bahasa kelembutan kasih sayang, kisah-kisah penuh hikmah, dan peringatan yang mengetuk pintu hati.',
        'Jidal bil Ahsan (Debat Dialogis Santun): Ditujukan bagi penentang dan pengkritik; bertukar argumen secara objektif tanpa emosi, tanpa mencaci maki lawan, dan fokus mencari kebenaran bersama.',
      ],
      practice: 'Identifikasi siapa lawan bicara Anda agar dapat memilih pendekatan komunikasi dakwah yang tepat sasaran.',
      source: quran('16/125'),
    },
    {
      id: 'kekuatan-dakwah-bil-hal',
      title: 'Kekuatan Dakwah bil Hal: Keteladanan Sebelum Kata-Kata',
      category: 'Integritas Akhlak',
      summary: 'Menjadikan perbuatan nyata, kejujuran profesi, dan kemuliaan budi pekerti sebagai media komunikasi dakwah paling ampuh.',
      points: [
        'Lisanul Hal Afshahu min Lisanil Maqal: Bahasa perbuatan nyata jauh lebih fasih dan meyakinkan daripada seribu kata-kata nasihat verbal.',
        'Sabda Nabi SAW: "Kalian tidak akan mampu merangkul manusia dengan harta kalian, tetapi kalian dapat merangkul mereka dengan senyuman wajah berseri dan akhlak yang mulia" (HR. Al-Bazzar).',
        'Bahaya Inkonsistensi (QS. Ash-Shaff: 2-3): "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan? Sangat besar kemurkaan di sisi Allah bahwa kamu mengatakan apa yang tidak kamu kerjakan."',
        'Islam Tersebar via Akhlak: Mayoritas penduduk Asia Tenggara dan pesisir Afrika memeluk Islam karena menyaksikan integritas para pedagang muslim yang jujur dan dapat dipercaya.',
      ],
      practice: 'Jadilah teladan kebaikan di tempat kerja dan lingkungan tetangga sebelum Anda memberi nasihat kepada orang lain.',
      source: quran('61/2'),
    },
    {
      id: 'etika-dialog-lintas-iman',
      title: 'Etika Dialog Lintas Iman & Mencari Kalimatun Sawa\'',
      category: 'Toleransi & Dialog',
      summary: 'Panduan Al-Qur\'an dalam berdialog secara damai dengan Ahli Kitab dan penganut agama lain tanpa menghina sesembahan mereka.',
      points: [
        'Larangan Mencela Sesembahan Agama Lain (QS. Al-An\'am: 108): "Dan janganlah kamu memaki sesembahan yang mereka sembah selain Allah, karena mereka nanti akan memaki Allah dengan melampaui batas tanpa dasar pengetahuan."',
        'Mencari Titik Temu (Kalimatun Sawa\') (QS. Ali Imran: 64): Memulai dialog dari kesepakatan nilai-nilai universal kemanusiaan, keadilan, dan kejujuran.',
        'Dialog Menggunakan Bahasa Santun (QS. Al-Baqarah: 83): "Wa qulu lin-nasi husna" (Dan bertuturkatalah yang baik kepada segenap manusia tanpa memandang agamanya).',
        'Menghormati Pilihan Keyakinan (QS. Al-Kafirun: 6): "Lakum dinukum waliyadin" (Untukmu agamamu, dan untukku agamaku); tidak ada paksaan dalam beragama.',
      ],
      practice: 'Jangan pernah membalas provokasi agama dengan menghina simbol atau tuhan agama lain; sampaikan kebenaran dengan kepala dingin.',
      source: quran('6/108'),
    },
    {
      id: 'menghindari-sikap-takfiri',
      title: 'Bahaya Sikap Takfiri (Gampang Mengkafirkan) & Ekstremisme',
      category: 'Moderasi Beragama (Wasathiyyah)',
      summary: 'Peringatan keras Rasulullah SAW terhadap fenomena mudah menuduh sesama muslim kafir atau sesat hanya karena perbedaan ijtihad.',
      points: [
        'Sabda Nabi yang Menggetarkan (Muttafaqun \'alaih): "Barangsiapa berkata kepada saudaranya: \'Wahai Kafir\', maka tuduhan itu pasti akan kembali kepada salah satu dari keduanya."',
        'Larangan Mengeluarkan dari Islam: Ahli Sunnah wal Jama\'ah bersepakat: tidak boleh mengkafirkan seorang muslim yang shalat menghadap kiblat dan mengucapkan syahadat hanya karena perbuatan dosa besar selama tidak menghalalkannya.',
        'Bahaya Ideologi Khawarij: Kaum ekstremis di masa sahabat yang merasa ibadahnya paling suci hingga berani mengkafirkan dan membunuh sahabat Nabi (Utsman dan Ali).',
        'Prinsip Kehati-hatian: Kaidah para ulama fiqih: "Kesalahan dalam memaafkan seribu orang fasik jauh lebih ringan daripada kesalahan menghukum satu orang yang tidak bersalah."',
      ],
      practice: 'Jauhi kebiasaan melabeli sesama muslim dengan sebutan munafik, kafir, atau sesat hanya karena berbeda pilihan fiqih atau pandangan politik.',
      source: hadith(25),
    },
    {
      id: 'psikologi-madu-audiens',
      title: 'Psikologi Mad\'u: Menyesuaikan Dosis Pesan Dakwah',
      category: 'Kecakapan Komunikasi',
      summary: 'Kaidah komunikasi Nabi SAW yang selalu berbicara sesuai kadar pemikiran dan latar belakang emosional lawan bicara.',
      points: [
        'Kaidah Komunikasi Ali bin Abi Thalib: "Khatibun-nasa bima ya\'rifun (Berbicaralah kepada manusia dengan apa yang mereka pahami); apakah kalian ingin Allah dan Rasul-Nya didustakan?"',
        'Menyesuaikan Jawaban dengan Kondisi Penanya: Saat ditanya amalan apa yang paling utama, Nabi memberi jawaban berbeda: kepada anak berbakti beliau menjawab "Shalat tepat waktu", kepada perantau "Jihad", kepada pemarah "Jangan marah."',
        'Menghindari Beban Berlebih: Rasulullah SAW bersabda: "Permudahlah dan jangan mempersulit, berikanlah kabar gembira dan jangan membuat orang lari menjauh" (HR. Bukhari).',
        'Membaca Situasi Batin (Empathy): Tidak memberikan nasihat hukum yang kaku saat seseorang sedang berduka atau tertekan secara psikologis.',
      ],
      practice: 'Dengarkan baik-baik curahan hati orang lain sebelum memberikan nasihat atau dalil agama.',
      source: hadith(1),
    },
    {
      id: 'merangkul-generasi-muda',
      title: 'Merangkul Generasi Muda, Skeptis, & Agnostik',
      category: 'Tantangan Kontemporer',
      summary: 'Seni menjawab keraguan generasi Z dan pemikiran agnostik dengan nalar logis ilmiah yang ramah dan terbuka.',
      points: [
        'Pertanyaan Kritis Bukan Kejahatan: Rasa ingin tahu dan keraguan intelektual harus disambut dengan ruang dialog terbuka yang aman, bukan dengan bentakan kemarahan atau ancaman neraka.',
        'Kisah Pemuda yang Minta Izin Berzina: Seorang pemuda mendatangi Nabi meminta izin berzina; para sahabat marah, namun Nabi mendekatkannya dan berdialog logis: "Apakah engkau rela jika hal itu terjadi pada ibumu, putrimu, atau saudari perempuanmu?" Pemuda itu pun tersadar.',
        'Menghadirkan Keindahan Rasional Islam: Mengupas bukti-bukti kebenaran Al-Qur\'an melalui pendekatan sains modern, filsafat ketuhanan, dan keadilan hukum sosial.',
        'Mendampingi dengan Cinta: Generasi muda membutuhkan figur pembimbing yang bersedia mendengar, memvalidasi keresahan, dan menuntun dengan penuh kesabaran.',
      ],
      practice: 'Jika anak muda bertanya hal sensitif tentang agama, sambutlah dengan senyuman dan diskusikan jawabannya secara rasional.',
      source: hadith(34),
    },
    {
      id: 'adab-amar-maruf-nahi-munkar',
      title: 'Kaidah Amar Ma\'ruf Nahi Munkar Tanpa Memicu Kerusakan',
      category: 'Tata Kelola Amar Ma\'ruf',
      summary: 'Kaidah fiqih ketat dalam mencegah keburukan agar tidak menimbulkan mafsadat yang jauh lebih dahsyat.',
      points: [
        'Tahapan Mencegah Kemungkaran (HR. Muslim): Dengan tangan/kekuasaan bagi pemimpin berwenang, dengan lisan bagi orang berilmu, atau dengan hati bagi masyarakat umum sebagai selemah-lemah iman.',
        'Syarat Utama Nahi Munkar: Mencegah suatu kemungkaran TIDAK BOLEH memicu lahirnya kemungkaran baru yang lebih besar atau fitnah kerusuhan massal.',
        'Kisah Orang Badui Kencing di Masjid: Saat seorang badui buang air kecil di sudut Masjid Nabawi, para sahabat hendak memukulinya; Nabi melarang sahabat dan memerintahkan membiarkannya tuntas, lalu menyiramnya dengan seember air dan menasihati si badui dengan lemah lembut.',
        'Menasihati Secara Rahasia: Nasihat di depan umum adalah bentuk mempermalukan (tashhir), sedangkan nasihat empat mata adalah wujud cinta ketulusan.',
      ],
      practice: 'Nasihatilah saudaramu secara privat empat mata, jangan pernah membongkar kesalahannya di ruang publik atau media sosial.',
      source: hadith(39),
    },
    {
      id: 'diplomasi-surat-dakwah-nabi',
      title: 'Diplomasi Surat-Menyurat Kenabian kepada Para Raja Dunia',
      category: 'Diplomasi Internasional',
      summary: 'Kecakapan geopolitik dan etika diplomatik Rasulullah SAW mengirimkan surat ajakan damai kepada para kaisar dan raja adidaya dunia.',
      points: [
        'Mengirim Utusan Resmi: Pasca Perjanjian Hudaibiyah (628 M), Nabi SAW mengirim surat bertanda cap cincin perak bertuliskan "Muhammad Rasulullah" kepada para pemimpin kekaisaran dunia.',
        'Surat kepada Kaisar Romawi Heraklius: Dimulai dengan basmalah, pengakuan gelar kehormatan ("Ila Hiraqla \'Azhimir-Rum"), dan ajakan memeluk Islam demi keselamatan rakyatnya (Aslim Taslam).',
        'Respons Raja Najasyi Habasyah: Menerima surat dengan menciumnya, meletakkannya di matanya, dan menyatakan keimanannya pada risalah tauhid Nabi Isa dan Muhammad.',
        'Etika Diplomat Islam: Duta-duta utusan Nabi berpenampilan rapi, berwawasan luas, memahami bahasa asing, dan memegang teguh kehormatan peradaban Islam.',
      ],
      practice: 'Pelajari seni diplomasi, kesantunan bertutur kata, dan etika protokoler dalam menjalin komunikasi formal lintas budaya.',
      source: hadith(7),
    },
    {
      id: 'dakwah-kreatif-era-multimedia',
      title: 'Inovasi Dakwah Multimedia & Retorika Narasi Positif',
      category: 'Teknologi Dakwah',
      summary: 'Memanfaatkan kemajuan teknologi digital, video edukasi, podcast, dan infografis untuk membumikan nilai-nilai Islam.',
      points: [
        'Konversi Bahasa Visual: Menyajikan kajian hukum fiqih rumit atau kisah sejarah menjadi infografis menarik, animasi video pendek, dan thread edukatif yang mudah dicerna.',
        'Menghindari Konten Clickbait Toksik: Tidak menggunakan judul sensasional bernada permusuhan, adu domba, atau ramalan kiamat liar demi mengejar views dan algoritma.',
        'Narasi Menyejukkan (Tabsyir): Menghadirkan Islam sebagai solusi problem nyata masyarakat (kesehatan mental, keluarga sakinah, etika bisnis), bukan sekadar ancaman azab.',
        'Kolaborasi Kreatif: Menghubungkan para ulama berilmu mendalam dengan kreator konten, animator, dan programmer untuk melahirkan karya digital berkualitas tinggi.',
      ],
      practice: 'Dukung akun-akun kreator muslim yang konsisten memproduksi konten edukatif, mencerahkan, dan menyejukkan.',
      source: quran('14/4'),
    },
    {
      id: 'sabar-dan-husnul-khatimah-dakwah',
      title: 'Kesabaran Menghadapi Penolakan & Hasil di Tangan Allah',
      category: 'Keteguhan Jiwa Dai',
      summary: 'Menyadari bahwa tugas manusia hanyalah menyampaikan dengan cara terbaik (balagh), sedangkan hidayah taufiq adalah hak prerogatif Allah semata.',
      points: [
        'Tugas Pokok Hanyalah Menyampaikan (QS. Al-Ma\'idah: 99): "Kewajiban Rasul tidak lain hanyalah menyampaikan (risalah Allah). Dan Allah mengetahui apa yang kamu lahirkan dan apa yang kamu sembunyikan."',
        'Hidayah Milik Allah (QS. Al-Qashash: 56): "Sesungguhnya engkau (Muhammad) tidak akan dapat memberi hidayah kepada orang yang engkau cintai, tetapi Allah memberi hidayah kepada siapa yang Dia kehendaki."',
        'Pelajaran dari Ujian Thaif: Saat Nabi dilempari batu hingga berdarah di Thaif dan malaikat penjaga gunung menawarkan untuk menimpakan bukit kepada penduduknya, Nabi menolak dan justru berdoa: "Ya Allah, berilah petunjuk kepada kaumku, karena sesungguhnya mereka tidak mengetahui."',
        'Ketenangan Batin Dai: Tidak merasa gagal atau putus asa saat ajakannya ditolak; seorang nabi kelak di hari kiamat ada yang datang hanya bersama beberapa pengikut atau bahkan tanpa seorang pengikut pun, namun tetap mulia di sisi Allah.',
      ],
      practice: 'Sampaikan nasihat kebaikan dengan ikhlas, lalu serahkan hasilnya kepada Allah; jangan paksakan kehendak pada orang lain.',
      source: quran('28/56'),
    },
  ],
};

export const alamGhaib: Course = {
  id: 'alam-ghaib',
  title: "Malaikat, Jin & Dunia Ghaib (Iman bil-Ghaib & Ruqyah Syar'iyyah)",
  description: "Pahami hakikat penciptaan Malaikat, bangsa Jin, tipu daya setan, alam barzakh, dan benteng ruqyah syar'iyyah otentik.",
  note: "Membentengi akidah tauhid umat dari syirik, takhayul, perdukunan, dan ramalan klenik berlandaskan nash Al-Qur'an dan As-Sunnah.",
  lessons: [
    {
      id: 'asal-usul-malaikat',
      title: 'Hakikat Penciptaan Malaikat dari Cahaya (Nur)',
      category: 'Karakteristik Malaikat',
      summary: 'Malaikat diciptakan dari cahaya, makhluk mulia tanpa hawa nafsu yang senantiasa patuh mutlak kepada perintah Allah.',
      points: [
        "Hadits shahih riwayat Aisyah radhiyallahu 'anha: Malaikat diciptakan dari cahaya, jin diciptakan dari nyala api murni, dan Adam dari tanah liat.",
        'Tidak berjenis kelamin (bukan laki-laki dan bukan perempuan), tidak makan, tidak minum, dan tidak pernah berbuat maksiat sedikit pun (QS. At-Tahrim: 6).',
        'Memiliki sayap yang berlipat-lipat (dua, tiga, empat, hingga ratusan seperti Malaikat Jibril yang memiliki 600 sayap).',
        'Bisa menjelma dalam wujud laki-laki yang sangat tampan dan berwibawa atas izin Allah, seperti saat mengajarkan Islam, Iman, dan Ihsan kepada para Sahabat.'
      ],
      practice: 'Perkuat keimanan kepada hal ghaib dan tanamkan rasa malu berbuat maksiat karena para malaikat selalu hadir mencatat perbuatan kita.',
      source: quran('66/6')
    },
    {
      id: 'sepuluh-malaikat-utama',
      title: '10 Malaikat Utama dan Tugas-Tugas Kosmisnya',
      category: 'Tugas Malaikat',
      summary: 'Mengenal nama dan amanah spesifik para pemimpin malaikat dalam mengatur urusan wahyu, rezeki, nyawa, dan hari akhir.',
      points: [
        'Jibril (Ruhul Qudus): Penyampai wahyu Ilahi kepada para Nabi dan Rasul serta pemimpin para malaikat.',
        'Mikail: Penanggung jawab pembagian rezeki, tetesan air hujan, dan pertumbuhan tanaman di seluruh alam.',
        'Israfil: Peniup terompet sangkakala pada hari kiamat dan hari kebangkitan kembali.',
        "'Izrail (Malakul Maut): Pencabut nyawa seluruh makhluk bernyawa sesuai ajal yang telah ditetapkan tanpa terlambat sedetik pun.",
        'Munkar dan Nakir: Penanya ruh manusia di alam barzakh (kubur) mengenai Rabb, Nabi, dan pedoman agamanya.',
        'Raqib dan Atid: Pengawas dan pencatat seluruh amal baik dan buruk manusia tanpa ada yang terlewat sekecil zarrah pun.',
        'Malik: Pemimpin malaikat Zabaniyah penjaga neraka yang tegas, berwibawa, dan tidak pernah tersenyum.',
        'Ridwan: Malaikat penjaga surga yang penuh kelembutan menyambut hamba-hamba beriman yang bertakwa.'
      ],
      practice: 'Renungkan tugas Malaikat Maut dan Munkar-Nakir agar hati senantiasa ingat kematian dan mempersiapkan bekal terbaik setiap hari.',
      source: quran('32/11')
    },
    {
      id: 'hafazhah-dan-katibin',
      title: 'Malaikat Penjaga (Hafazhah) & Pendamping Manusia',
      category: 'Interaksi Gaib',
      summary: 'Allah menugaskan malaikat untuk menjaga manusia dari marabahaya serta mendoakan kebaikan bagi orang yang beribadah.',
      points: [
        "Malaikat Mu'aqqibat (QS. Ar-Ra'd: 11): Malaikat yang bertugas bergiliran menjaga manusia dari arah depan dan belakang atas perintah Allah.",
        'Bergantian Tugas di Waktu Shalat Fajar (Subuh) dan Ashar: Malaikat malam dan siang berkumpul lalu melapor kepada Allah mengenai kondisi shalat hamba-Nya.',
        'Malaikat Pencari Majelis Ilmu (Halaqah): Malaikat yang berkeliling di bumi, membentangkan sayapnya dan menaungi majelis dzikir serta majelis ilmu.',
        "Malaikat Mendoakan Orang yang Berinfaq: Setiap pagi dua malaikat berdoa, 'Ya Allah, berikanlah ganti bagi orang yang berinfaq, dan berikanlah kehancuran bagi orang yang bakhil.'"
      ],
      practice: 'Rutinkan shalat Subuh dan Ashar berjamaah tepat waktu serta sempatkan bersedekah di pagi hari agar didoakan para malaikat.',
      source: hadith(555)
    },
    {
      id: 'hakikat-bangsa-jin',
      title: 'Hakikat Bangsa Jin, Iblis, & Sebab Pembangkangannya',
      category: 'Dunia Jin',
      summary: 'Jin adalah makhluk mukallaf yang diciptakan dari nyala api tanpa asap, memiliki kehendak bebas, ada yang muslim dan ada yang kafir.',
      points: [
        'Diciptakan sebelum manusia dari api yang sangat panas (marij min nar - QS. Ar-Rahman: 15).',
        'Bangsa Jin memiliki kewajiban syariat untuk beribadah kepada Allah sama seperti manusia (QS. Adz-Dzariyat: 56).',
        'Iblis berasal dari golongan jin (QS. Al-Kahfi: 50), membangkang karena kesombongan (takabbur) merasa lebih mulia dari Adam AS.',
        'Jin hidup berketurunan, makan, minum, berkelompok, dan memiliki tingkatan pengetahuan serta keimanan layaknya manusia.'
      ],
      practice: 'Jauhi sifat sombong dan merasa lebih suci daripada orang lain, karena takabbur adalah awal mula laknat Iblis.',
      source: quran('18/50')
    },
    {
      id: 'perangkap-dan-waswas-setan',
      title: 'Tipu Daya, Bisikan Waswas, & Strategi Menangkalnya',
      category: 'Benteng Batin',
      summary: 'Setan tidak memiliki kekuasaan memaksa fisik manusia, senjatanya hanyalah bisikan ragu, godaan hawa nafsu, dan kepalsuan angan-angan.',
      points: [
        "Kelemahan Tipu Daya Setan: QS. An-Nisa': 76 menegaskan bahwa sesungguhnya tipu daya setan itu sangatlah lemah bagi orang yang bertawakal.",
        "Pintu Masuk Setan: Kemarahan yang tak terkendali, rasa kenyang berlebih, syahwat liar, keputusasaan, dan keragu-raguan dalam niat/wudhu (waswas).",
        "Doa Perlindungan (Isti'adzah): Mengucapkan 'A'udzubillahi minasy-syaithanir-rajim' saat mulai marah atau terlintas bisikan maksiat.",
        'Khutbah Iblis di Hari Kiamat: Iblis mengakui di depan para pengikutnya di neraka bahwa ia hanya mengajak dan manusia sendirilah yang menuruti ajakannya.'
      ],
      practice: 'Bila terlintas keraguan waswas dalam wudhu atau shalat, jangan ulangi secara berlebihan; abaikan bisikan itu dan berlindunglah kepada Allah.',
      source: quran('14/22')
    },
    {
      id: 'batasan-jin-dan-larangan-istianah',
      title: 'Batasan Kemampuan Jin & Dosa Meminta Tolong kepada Jin',
      category: 'Pemurnian Tauhid',
      summary: 'Jin tidak mengetahui hal ghaib masa depan dan haram hukumnya menjadikan jin sebagai khodam atau pelindung.',
      points: [
        "Jin Tidak Tahu Hal Ghaib: Terbukti saat Nabi Sulaiman AS wafat bersandar pada tongkatnya, jin tetap bekerja keras karena tidak menyadari kewafatan beliau (QS. Saba': 14).",
        "Larangan Al-Isti'anah bil Jin: Meminta bantuan atau perlindungan kepada jin justru hanya akan menambah dosa dan kesesatan (QS. Al-Jinn: 6).",
        'Mitos Jin Khodam Penjaga: Menjadikan jin sebagai penjaga diri, benda pusaka, atau penglaris dagangan adalah pintu menuju kemusyrikan (syirik akbar).',
        'Kemandirian Mukmin: Bergantung hanya kepada Allah dengan doa, shalat, dan tawakal tanpa perantara makhluk gaib.'
      ],
      practice: 'Bersihkan rumah dan diri dari jimat, rajah, keris yang dikeramatkan, atau perjanjian ghaib dengan jin demi menjaga kesucian tauhid.',
      source: quran('72/6')
    },
    {
      id: 'bahaya-perdukunan-dan-ramalan',
      title: 'Hukum Perdukunan, Dukun Berkedok Spiritual, & Ramalan Zodiak',
      category: 'Bahaya Syirik',
      summary: 'Mendatangi dan mempercayai dukun atau peramal nasib dapat menghanguskan pahala shalat 40 hari hingga membatalkan keislaman.',
      points: [
        "Ancaman Shalat Tidak Diterima: 'Barangsiapa mendatangi peramal lalu menanyakan sesuatu kepadanya, maka tidak diterima shalatnya selama 40 hari' (HR. Muslim).",
        "Kufur terhadap Al-Qur'an: 'Barangsiapa mendatangi dukun lalu membenarkan ucapannya, sungguh ia telah kufur terhadap apa yang diturunkan kepada Muhammad SAW' (HR. Abu Dawud).",
        "Dukun Berkedok 'Orang Pintar': Mengaku tahu barang hilang, membaca masa depan, atau mengklaim bisa mengusir penyakit dengan syarat sesajen dan darah hewan sembelihan.",
        'Ramalan Bintang & Horoskop Digital: Membaca dan mempercayai zodiak, kartu tarot, atau tes nasib online termasuk cabang dari peramalan yang dilarang syariat.'
      ],
      practice: 'Tolak segala bentuk konten ramalan nasib di media sosial dan yakini sepenuhnya bahwa rezeki, jodoh, dan maut mutlak rahasia Allah.',
      source: hadith(5762)
    },
    {
      id: 'ruqyah-syar-iyyah',
      title: "Ruqyah Syar'iyyah: Doa & Bacaan Pelindung Mandiri",
      category: 'Pengobatan Nabawi',
      summary: "Terapi penyembuhan dan perlindungan ruhani dengan membaca ayat-ayat Al-Qur'an dan doa ma'tsur tanpa jimat atau mantra syirik.",
      points: [
        "Syarat Sah Ruqyah Syar'iyyah: Menggunakan kalamullah (Al-Qur'an), nama/sifat Allah, bahasa Arab/bahasa yang dipahami maknanya, serta meyakini kesembuhan murni dari Allah.",
        'Surah dan Ayat Utama: Membaca Al-Fatihah, Ayat Kursi (QS. Al-Baqarah: 255), 2 ayat terakhir Al-Baqarah (284-286), serta Al-Ikhlas, Al-Falaq, dan An-Nas.',
        "Doa Kesembuhan Nabawi: 'Allahumma Rabban-nas, adzhibil-ba'sa, isyfi antasy-syafi, la syifa-a illa syifa-uk, syifa-an la yughadiru saqama.'",
        'Ruqyah Mandiri Setiap Hendak Tidur: Meniupkan ke kedua telapak tangan setelah membaca 3 Qul, lalu mengusap ke seluruh tubuh yang dapat dijangkau sebanyak 3 kali.'
      ],
      practice: 'Praktikkan ruqyah mandiri sebelum tidur malam ini dan bacakan doa perlindungan untuk anak-anak serta keluarga.',
      source: hadith(5748)
    },
    {
      id: 'hakikat-sihir-dan-penyakit-ain',
      title: "Hakikat Sihir, Penyakit 'Ain (Pandangan Dengki), & Penangkalnya",
      category: 'Perlindungan Ruhani',
      summary: "Mengenal realitas penyakit 'ain dan sihir serta membiasakan doa berkah (tabrik) saat melihat sesuatu yang mengagumkan.",
      points: [
        "Penyakit 'Ain Itu Nyata: Sabda Nabi SAW, 'Ain itu benar adanya. Andaikan ada sesuatu yang mendahului takdir, sungguh 'ain itulah yang mendahuluinya' (HR. Muslim).",
        "Penyebab 'Ain: Pandangan kagum bercampur dengki (hasad) atau takjub tanpa mendoakan keberkahan (tabrik).",
        "Mengucapkan 'Barakallahu Fik' / 'Maa Syaa Allah': Wajib bagi setiap muslim saat melihat keindahan pada anak, harta, atau tubuh orang lain.",
        'Sihir adalah Perbuatan Kufur: Termasuk dalam 7 dosa besar yang membinasakan (al-mubiqaat); pelakunya bersekutu dengan setan dan haram membalas sihir dengan sihir.'
      ],
      practice: "Biasakan mengucap 'Maa Syaa Allah Tabaarakallah' saat memposting atau memuji foto anak, kesuksesan, atau harta di media sosial.",
      source: hadith(5740)
    },
    {
      id: 'alam-barzakh-dan-pertanyaan-kubur',
      title: 'Alam Barzakh: Pertanyaan Munkar-Nakir, Siksa & Nikmat Kubur',
      category: 'Fase Akhirat',
      summary: 'Kubur adalah persinggahan pertama menuju akhirat; menjadi taman surga bagi orang shalih atau jurang neraka bagi pendosa.',
      points: [
        "Tiga Pertanyaan Utama: 'Man Rabbuka?' (Siapa Tuhanmu?), 'Maa Dinuka?' (Apa Agamamu?), dan 'Man Nabiyyuka?' (Siapa Nabimu?).",
        'Yang Menjawab Adalah Amal, Bukan Hafalan: Lisan orang beriman dikokohkan oleh Allah dengan perkataan yang teguh (QS. Ibrahim: 27).',
        "Penyebab Utama Siksa Kubur: Hadits Nabi SAW menyebutkan dua dosa yang sering dianggap sepele: tidak menjaga kebersihan dari percikan air kencing (istinja') dan menyebarkan adu domba (namimah).",
        'Penyelamat dari Siksa Kubur: Rutin membaca Surah Al-Mulk setiap malam, menjaga shalat 5 waktu, dan istiqamah dalam tauhid.'
      ],
      practice: "Rutin membaca Surah Al-Mulk sebelum tidur dan jaga kesucian diri dari najis kencing dengan istinja' yang sempurna.",
      source: hadith(1374)
    }
  ]
};

export const adabIkhtilaf: Course = {
  id: 'adab-ikhtilaf',
  title: 'Adab Ikhtilaf & Moderasi Beragama (Islam Wasathiyyah)',
  description: 'Memahami akar perbedaan fiqih ulama madzhab, adab berbeda pendapat, prinsip Islam wasathiyyah, dan merawat persatuan umat.',
  note: 'Membimbing penuntut ilmu agar berwawasan luas, lapang dada dalam perkara furu\', serta menjauhi fanatisme buta dan sikap mudah mengkafirkan.',
  lessons: [
    {
      id: 'konsep-wasathiyyah',
      title: 'Hakikat Ummatan Wasathan: Islam yang Adil & Proporsional',
      category: 'Landasan Moderasi',
      summary: 'Islam adalah agama jalan tengah (wasathiyyah) yang menjauhi sikap ekstrem berlebihan (ghuluw) dan peremehan syariat (tafrith).',
      points: [
        "QS. Al-Baqarah: 143 menegaskan status kaum muslimin sebagai 'Ummatan Wasathan' (umat pertengahan/pilihan) agar menjadi saksi atas manusia.",
        "Menjauhi Sikap Ghuluw (Melampaui Batas): Sabda Nabi SAW, 'Binasalah orang-orang yang berlebih-lebihan (dalam beragama)' (HR. Muslim).",
        'Keseimbangan (Tawazun) Tiga Dimensi: Seimbang antara akal dan wahyu, ruhani dan jasmani, serta urusan dunia dan akhirat.',
        "Kemudahan dalam Beragama: Islam datang membawa kemudahan (yusr), bukan kesulitan ('usr); syariat memiliki rukhshah saat kondisi darurat."
      ],
      practice: 'Terapkan prinsip tawazun hari ini dengan menyeimbangkan kewajiban ibadah, pekerjaan profesional, dan waktu istirahat bersama keluarga.',
      source: quran('2/143')
    },
    {
      id: 'sebab-ikhtilaf-fuqaha',
      title: 'Akar Penyebab Perbedaan Pendapat Para Ulama Fiqih',
      category: 'Metodologi Fiqih',
      summary: 'Memahami mengapa para imam madzhab berbeda kesimpulan hukum adalah kunci lahirnya sikap lapang dada dan kedewasaan berfikir.',
      points: [
        'Perbedaan Sampainya Riwayat Hadits: Suatu hadits sampai kepada satu imam dengan sanad shahih, namun belum sampai atau sanadnya berbeda bagi imam lain.',
        "Perbedaan Penilaian Keshahihan Perawi: Kriteria jarh wa ta'dil yang berbeda dalam menilai tingkat kekuatan ingatan seorang perawi.",
        "Kaidah Bahasa Arab (Dilalah Lafadz): Perbedaan dalam memahami lafadz musytarak (bermakna ganda), seperti kata 'qur' ' yang bermakna masa suci atau haid.",
        'Metode Ijtihad & Qiyas: Ada ulama yang mendahulukan maslahat mursalah, ada yang mengutamakan amalan penduduk Madinah, atau istihsan.'
      ],
      practice: 'Ketika mendapati perbedaan hukum fiqih, pelajari dalil masing-masing pihak sebelum terburu-buru menghakimi salah satu pendapat.',
      source: quran('4/59')
    },
    {
      id: 'mengenal-empat-madzhab',
      title: 'Mengenal 4 Madzhab Fiqih Utama & Keharmonisan Para Imam',
      category: 'Sejarah Madzhab',
      summary: 'Empat madzhab mu\'tabar (Hanafi, Maliki, Syafi\'i, Hanbali) bersumber dari mata air Al-Qur\'an dan Sunnah yang sama dan saling menghormati.',
      points: [
        "Imam Abu Hanifah (80-150 H): Pelopor fiqih ahlur ra'yi di Kufah, sangat teliti dalam logika hukum dan analogi (qiyas).",
        "Imam Malik bin Anas (93-179 H): Guru besar Madinah, penulis kitab Al-Muwaththa', mengutamakan atsar dan amalan ahli Madinah.",
        "Imam Asy-Syafi'i (150-204 H): Perumus Ushul Fiqh pertama (kitab Ar-Risalah), memadukan keluasan hadits Madinah dan nalar Kufah.",
        'Imam Ahmad bin Hanbal (164-241 H): Ahli hadits terkemuka, penyusun Musnad Ahmad dengan puluhan ribu riwayat, pejuang keteguhan sunnah.',
        "Adab Saling Menghargai: Imam Syafi'i adalah murid Imam Malik; Imam Ahmad adalah murid Imam Syafi'i. Mereka saling memuji dan tidak pernah merendahkan madzhab sesama ulama."
      ],
      practice: 'Hormati ulama dan madzhab fiqih yang dianut masyarakat setempat tanpa merasa madzhab yang kita pelajari paling unggul sendiri.',
      source: hadith(3674)
    },
    {
      id: 'ushul-vs-furu',
      title: "Membedakan Wilayah Pokok (Ushul) vs Cabang (Furu')",
      category: 'Kaidah Toleransi',
      summary: 'Tidak boleh ada kompromi dalam aqidah pokok, namun sangat lapang dalam perkara cabang fiqih yang berstatus zhanni.',
      points: [
        "Wilayah Ushul (Qath'i): Rukun iman, kewajiban shalat 5 waktu, keharaman zina dan riba; wilayah ini mutlak dan tidak boleh ada perselisihan.",
        "Wilayah Furu' (Zhanni): Rincian teknis shalat (qunut, sedekap, bacaan jahr/sirr), rincian batas zakat, dan hal kontemporer; di sinilah ijtihad berlaku.",
        "Kaidah Emas: 'Laa inkaara fii masa-ilil ijtihad' (Tidak boleh ada pengingkaran keras terhadap masalah-masalah yang masih terbuka ruang ijtihad di dalamnya).",
        'Pahala Berijtihad: Mujtahid yang benar mendapat dua pahala, dan jika keliru tetap mendapat satu pahala dari niat tulus ikhtiarnya (HR. Bukhari).'
      ],
      practice: "Bedakan antara menolak penyimpangan aqidah dengan menghargai variasi fiqih ibadah furu'iyyah di masjid lingkungan kita.",
      source: hadith(7352)
    },
    {
      id: 'bahaya-takfiri-dan-tabdi',
      title: "Bahaya Takfiri (Mengkafirkan) & Tabdi' (Membid'ahkan Liar)",
      category: 'Ukhuwah Islamiyyah',
      summary: 'Menuduh sesama muslim keluar dari Islam atau sesat adalah dosa besar yang ancamannya berbalik kepada si penuduh.',
      points: [
        "Peringatan Keras Rasulullah SAW: 'Barangsiapa memanggil saudaranya wahai kafir, maka vonis itu akan kembali kepada salah satu dari keduanya' (HR. Bukhari).",
        "Prinsip Ahlussunnah wal Jama'ah: Tidak mengkafirkan seorang muslim yang shalat menghadap kiblat hanya karena dosa besar selama tidak menghalalkannya.",
        "Pembedaan Antara Perbuatan dan Pelaku: Suatu ucapan/perbuatan bisa dinilai bid'ah/syirik, namun pelakunya tidak serta merta dihukumi kafir tanpa terpenuhi syarat dan hilang penghalang (mawani').",
        "Wewenang Hukum: Vonis murtad atau kafir adalah wewenang mahkamah syar'i dan ulama mu'tabar, bukan hak individu di media sosial."
      ],
      practice: "Jaga lisan dan jari dari melabeli sesama muslim dengan sebutan 'sesat', 'ahli neraka', atau 'kafir' hanya karena berbeda pandangan fiqih.",
      source: hadith(6103)
    },
    {
      id: 'adab-dialog-dan-debat-ilmiah',
      title: 'Adab Berdialog Ilmiah & Menjauhi Debat Kusir (Mirak)',
      category: 'Etika Komunikasi',
      summary: 'Tujuan diskusi ilmiah adalah mencari kebenaran bersama, bukan mencari kemenangan ego atau mempermalukan lawan bicara.',
      points: [
        "QS. An-Nahl: 125: Berdakwah dan berdiskusi dengan cara yang terbaik ('Wa jaadilhum billatii hiya ahsan').",
        'Menjauhi Perdebatan Demi Menang: Sabda Nabi SAW, Aku menjamin sebuah istana di tepi surga bagi orang yang meninggalkan perdebatan meski ia berada di pihak yang benar (HR. Abu Dawud).',
        'Mendengarkan dengan Objektif: Mengapresiasi argumen lawan bicara yang benar dan tidak memotong pembicaraan dengan emosi.',
        "Kesiapan Menerima Koreksi: Perkataan Imam Syafi'i, 'Aku tidak pernah berdebat dengan seseorang kecuali aku berharap kebenaran tampak dari lisannya.'"
      ],
      practice: 'Jika sebuah diskusi di grup WhatsApp atau media sosial mulai mengarah ke adu gengsi dan saling sindir, segera undurkan diri dengan santun.',
      source: quran('16/125')
    },
    {
      id: 'tiga-lingkar-persaudaraan',
      title: 'Ukhuwah Islamiyyah, Wathaniyyah, & Basyariyyah',
      category: 'Kemanusiaan Universal',
      summary: 'Harmoni persaudaraan kaum mukmin dibangun dalam tiga pilar: ikatan aqidah, ikatan sebangsa, dan ikatan kemanusiaan sedunia.',
      points: [
        'Ukhuwah Islamiyyah: Persaudaraan sesama mukmin di seluruh penjuru bumi laksana satu tubuh; sakit satu bagian, sakit seluruhnya (QS. Al-Hujurat: 10).',
        'Ukhuwah Wathaniyyah: Persaudaraan sebangsa dan setanah air, sebagaimana Piagam Madinah menyatukan muslim dan non-muslim dalam kewajiban membela negeri.',
        'Ukhuwah Basyariyyah: Persaudaraan sesama anak cucu Adam AS; semua manusia berasal dari tanah dan memiliki hak hidup, keadilan, dan kehormatan.',
        'Berbuat Adil kepada Non-Muslim: QS. Al-Mumtahanah: 8 memerintahkan berbuat baik dan berlaku adil kepada orang yang tidak memerangi dalam agama.'
      ],
      practice: 'Bantu tetangga atau rekan yang membutuhkan pertolongan tanpa membedakan latar belakang suku, madzhab, maupun agamanya.',
      source: quran('60/8')
    },
    {
      id: 'menghargai-kearifan-lokal',
      title: "Fiqh Budaya: Menghargai Kearifan Lokal (Al-'Adah Muhakkamah)",
      category: 'Kaidah Fiqhiyyah',
      summary: 'Adat istiadat dan tradisi nusantara yang baik dapat dijadikan pertimbangan hukum selama tidak bertentangan dengan Al-Qur\'an dan Sunnah.',
      points: [
        "Kaidah Ushuliyyah: 'Al-'Adatu Muhakkamah' (Adat kebiasaan yang baik dapat menjadi rujukan dalam penetapan hukum fiqih).",
        'Metode Dakwah Walisongo: Mengisi wadah budaya lokal (tembang, gamelan, wayang, kenduri) dengan ruh tauhid dan sholawat tanpa menghancurkan tatanan sosial.',
        'Membedakan Budaya Mubah vs Syirik: Budaya gotong royong, pakaian santun, dan silaturahmi halal; yang diubah hanyalah unsur pemujaan berhala dan kemusyrikan.',
        'Dakwah Merangkul, Bukan Memukul: Menjadikan masyarakat mencintai syariat melalui akhlak mulia dan keteladanan nyata.'
      ],
      practice: 'Lestarikan tradisi silaturahmi lokal yang positif di lingkungan tempat tinggal Anda dan warnai dengan nilai-nilai sedekah serta doa.',
      source: quran('7/199')
    },
    {
      id: 'teladan-sahabat-dalam-ijtihad',
      title: 'Kisah Sahabat di Bani Quraizhah: Pelajaran Toleransi dari Nabi SAW',
      category: 'Sunnah Nabawiyah',
      summary: 'Rasulullah SAW tidak menyalahkan sahabat yang shalat Ashar di jalan maupun yang shalat di Bani Quraizhah karena keduanya berijtihad jujur.',
      points: [
        "Perintah Nabi SAW: 'Jangan sekali-kali ada yang shalat Ashar kecuali di perkampungan Bani Quraizhah' (HR. Bukhari).",
        'Perbedaan Pemahaman: Sebagian sahabat shalat di jalan karena waktu Ashar hampir habis (memahami maksud kecepatan), sebagian lagi shalat di lokasi tujuan (memegang tekstual sabda).',
        'Sikap Mulia Rasulullah SAW: Ketika dilaporkan kepada Nabi SAW, beliau tidak mencela dan tidak memarahi salah satu pun dari kedua kelompok tersebut.',
        'Pelajaran Berharga: Teks wahyu yang sama bisa melahirkan pemahaman tekstual dan kontekstual; kedua-duanya diakui dalam koridor niat taat.'
      ],
      practice: 'Belajarlah berlapang dada saat rekan Anda mengambil kesimpulan hukum yang berbeda namun tetap berlandaskan ijtihad yang dapat dipertanggungjawabkan.',
      source: hadith(946)
    },
    {
      id: 'panduan-menjaga-ukhuwah-digital',
      title: 'Resolusi Damai: Menjaga Persatuan Umat di Era Digital',
      category: 'Komitmen Harian',
      summary: 'Menjadi duta perdamaian yang merajut ukhuwah, menyebarkan narasi penyejuk, dan menyaring konten adu domba.',
      points: [
        'Filter Tabayyun (QS. Al-Hujurat: 6): Wajib memverifikasi potongan video ceramah atau kutipan kontroversial sebelum ikut berkomentar.',
        'Menolak Algoritma Adu Domba: Tidak membagikan konten clickbait yang membenturkan ormas Islam (NU, Muhammadiyah, Persis, dll) demi popularitas.',
        "Fokus pada Titik Temu (Kalimatun Sawa'): Mengedepankan 95% kesamaan aqidah dan ibadah daripada membesar-besarkan 5% perbedaan teknis furu'iyyah.",
        "Doa untuk Keutuhan Hati: 'Rabbanaghfir lana wa li-ikhwaninalladzina sabaquna bil-iman, wa la taj'al fi qulubina ghillan lilladzina amanu' (QS. Al-Hasyr: 10)."
      ],
      practice: 'Doakan kebaikan bagi ulama, da\'i, dan seluruh saudara seiman yang berbeda madzhab dengan Anda dalam shalat malam.',
      source: quran('59/10')
    }
  ]
};

export const zakatKontemporer: Course = {
  id: 'zakat-kontemporer',
  title: 'Fiqh Zakat Kontemporer',
  description: 'Panduan zakat era modern: gaji, saham, kripto, perusahaan, dan penyaluran digital sesuai fatwa MUI.',
  note: 'Zakat bukan sekadar kewajiban, melainkan instrumen keadilan sosial Islam.',
  lessons: [
    {
      id: 'zakat-penghasilan',
      title: 'Zakat Penghasilan & Profesi',
      category: 'Zakat Modern',
      summary: 'Zakat gaji dan profesi diqiyaskan pada zakat perdagangan dengan nisab 85 gram emas dan kadar 2,5%.',
      points: [
        'Dasar hukum: QS. Al-Baqarah: 267 — "Nafkahkanlah (di jalan Allah) sebagian dari hasil usahamu yang baik-baik."',
        'Nisab: Setara 85 gram emas (~Rp 85 juta/tahun atau ~Rp 7 juta/bulan tergantung harga emas).',
        'Kadar: 2,5% dari penghasilan bersih (neto setelah kebutuhan pokok) atau bruto (fatwa MUI 2003).',
        'Waktu: Boleh dibayar per bulan saat menerima gaji (haul dihitung akumulasi 1 tahun).',
        'Platform digital: Baznas, Dompet Dhuafa, LAZ resmi terpercaya untuk penyaluran online.'
      ],
      practice: 'Hitung penghasilan bersih Anda bulan ini dan sisihkan 2,5% untuk zakat profesi sebelum pengeluaran lain.',
      source: quran('2/267')
    },
    {
      id: 'zakat-saham',
      title: 'Zakat Saham & Investasi',
      category: 'Zakat Modern',
      summary: 'Saham diperlakukan sebagai aset dagang; zakat dikenakan atas nilai pasar saham + dividen yang telah haul.',
      points: [
        'Objek zakat: nilai saham (harga pasar × jumlah lembar) + dividen yang diterima selama setahun.',
        'Nisab & kadar: Sama dengan zakat perdagangan — 85 gram emas, 2,5%.',
        'Metode: Nilai saham dihitung pada akhir haul (1 tahun hijriyah), bukan saat beli.',
        'Saham syariah: Pastikan saham di DES (Daftar Efek Syariah) OJK agar investasi bersih dari riba.',
        'Reksa dana: Dihitung dari NAB (Nilai Aktiva Bersih) dikurangi biaya, dikalikan 2,5%.'
      ],
      practice: 'Catat total nilai portofolio saham Anda hari ini dan hitung zakat 2,5% jika sudah mencapai nisab dan haul.',
      source: quran('2/267')
    },
    {
      id: 'zakat-kripto',
      title: 'Zakat Aset Kripto',
      category: 'Zakat Modern',
      summary: 'Kripto diqiyaskan pada emas/perak sebagai alat tukar; wajib zakat jika nilainya mencapai nisab selama setahun.',
      points: [
        'Status: Fatwa DSN-MUI membolehkan kripto sebagai aset (bukan alat tukar resmi), sehingga termasuk zakat mal.',
        'Objek zakat: Total nilai market kripto yang dimiliki (BTC, ETH, dll) dihitung dalam rupiah.',
        'Nisab: 85 gram emas; Kadar: 2,5% dari nilai total pada akhir haul.',
        'Volatilitas: Dihitung pada satu titik waktu tertentu (misalnya, awal Ramadan atau tanggal zakat ditetapkan).',
        'Kehati-hatian: Jika ragu kehalalannya, bayar zakat sebagai bentuk tawakkal dan bersihkan harta.'
      ],
      practice: 'Konversi nilai aset kripto Anda ke rupiah hari ini, bandingkan dengan nisab, dan bayar 2,5% jika sudah haul.',
      source: hadith(1455)
    },
    {
      id: 'zakat-perusahaan',
      title: 'Zakat Perusahaan & UMKM',
      category: 'Zakat Modern',
      summary: 'Perusahaan wajib zakat atas aset lancar dikurangi kewajiban jangka pendek jika mencapai nisab.',
      points: [
        'Dasar: Perusahaan diqiyaskan pada pedagang; pemilik/pemegang saham memiliki kewajiban zakat.',
        'Formula: (Aset Lancar - Kewajiban Jangka Pendek) × 2,5% jika ≥ nisab 85 gram emas.',
        'UMKM: Laba bersih tahunan dihitung; jika ≥ nisab, bayar 2,5% atau 10% (dari hasil pertanian jika ladang).',
        'CSR vs Zakat: Zakat perusahaan wajib secara agama dan bisa dikreditkan sebagai pengurang pajak (UU Zakat No.23/2011).',
        'Lembaga: Bisa disalurkan melalui UPZ (Unit Pengumpul Zakat) atau LAZ mitra perusahaan.'
      ],
      practice: 'Jika Anda pemilik usaha, hitung aset lancar dikurangi utang jangka pendek; bayar 2,5% sebagai zakat perdagangan.',
      source: hadith(1455)
    },
    {
      id: 'nisab-haul',
      title: 'Memahami Nisab & Haul',
      category: 'Prinsip Zakat',
      summary: 'Nisab adalah batas minimum harta yang wajib dizakati; haul adalah syarat berlalunya waktu satu tahun hijriyah.',
      points: [
        'Nisab emas: 85 gram emas murni (24 karat) — acuan paling umum untuk zakat mal.',
        'Nisab perak: 595 gram perak — lebih rendah, digunakan untuk memudahkan muzakki berpenghasilan menengah.',
        'Haul: 354 hari (kalender hijriyah) atau 365 hari (kalender masehi, pendapat sebagian ulama).',
        'Pengecualian haul: Zakat pertanian/panen dan zakat fitrah tidak memerlukan haul.',
        'Harta campuran: Jika nisab tercapai di pertengahan tahun, haul dihitung mulai saat itu.'
      ],
      practice: 'Catat tanggal pertama kali harta Anda mencapai nisab; tandai sebagai awal haul untuk pengingat zakat tahun depan.',
      source: hadith(1455)
    },
    {
      id: 'penyaluran-zakat',
      title: 'Mustahiq & Penyaluran Zakat',
      category: 'Prinsip Zakat',
      summary: 'Delapan asnaf mustahiq zakat sesuai QS. At-Taubah: 60 dan model penyaluran produktif modern.',
      points: [
        '8 Asnaf (QS. 9:60): Fakir, miskin, amil, muallaf, riqab (budak/terlilit utang), gharim (berutang), fisabilillah, ibnu sabil.',
        'Prioritas: Fakir dan miskin di sekitar muzakki diprioritaskan sebelum disalurkan ke tempat lain.',
        'Zakat Produktif: Zakat diberikan sebagai modal usaha (bukan konsumtif) agar mustahiq naik ke kelas muzakki.',
        'LAZ Terpercaya: Baznas, DD, YBM PLN, Lazismu, Lazisnu — pastikan terdaftar dan diaudit Kemenag RI.',
        'Zakat Online: Sah secara syariah; niat di hati tetap wajib meski penyalurannya digital.'
      ],
      practice: 'Identifikasi satu mustahiq di sekitar Anda (tetangga kurang mampu, siswa yatim) dan salurkan zakat secara langsung.',
      source: quran('9/60')
    },
    {
      id: 'zakat-fitrah',
      title: 'Zakat Fitrah: Hukum & Tata Cara',
      category: 'Zakat Ibadah',
      summary: 'Zakat fitrah wajib bagi setiap Muslim yang mampu, dibayar sebelum shalat Idul Fitri sebesar 2,5 kg makanan pokok.',
      points: [
        'Dasar: HR. Bukhari-Muslim — Rasulullah SAW mewajibkan zakat fitrah sebesar 1 sha\' kurma atau 1 sha\' gandum.',
        'Kadar: 1 sha\' ≈ 2,5–3 kg makanan pokok daerah setempat (beras, gandum, jagung).',
        'Boleh uang: Fatwa MUI membolehkan membayar dengan uang senilai harga beras untuk kemudahan distribusi.',
        'Waktu terbaik: 1–2 hari sebelum Idul Fitri agar amil bisa mendistribusikan sebelum shalat Ied.',
        'Tujuan: Menyucikan jiwa orang yang berpuasa dan menyenangkan kaum fakir miskin di hari raya.'
      ],
      practice: 'Hitung jumlah jiwa dalam keluarga Anda dan persiapkan zakat fitrah minimal 3 hari sebelum Idul Fitri.',
      source: hadith(1503)
    }
  ]
};

export const wakaf: Course = {
  id: 'wakaf',
  title: 'Fiqh Wakaf & Wakaf Produktif',
  description: 'Pahami rukun wakaf, wakaf uang, wakaf produktif, dan peran wakaf dalam pemberdayaan ekonomi umat.',
  note: 'Wakaf adalah sedekah jariyah yang pahalanya mengalir hingga hari kiamat.',
  lessons: [
    {
      id: 'rukun-wakaf',
      title: 'Rukun & Syarat Wakaf',
      category: 'Dasar Wakaf',
      summary: 'Wakaf sah dengan empat rukun: wakif (pemberi), mauquf (harta), mauquf alaih (penerima manfaat), dan sighat (ikrar).',
      points: [
        'Wakif: Muslim, berakal, baligh, merdeka, dan pemilik sah harta yang diwakafkan.',
        'Mauquf (harta wakaf): Harta yang bermanfaat, tahan lama, dan tidak habis saat digunakan (aset produktif).',
        'Mauquf Alaih: Pihak penerima manfaat — masjid, sekolah, rumah sakit, fakir miskin, atau umat Islam umumnya.',
        'Sighat: Ikrar wakaf secara lisan atau tertulis di hadapan Pejabat Pembuat Akta Ikrar Wakaf (PPAIW/KUA).',
        'Irrevocable: Harta wakaf tidak boleh ditarik kembali, dijual, diwariskan, atau dihibahkan.'
      ],
      practice: 'Kunjungi KUA terdekat untuk mengetahui prosedur ikrar wakaf jika Anda berniat mewakafkan tanah atau bangunan.',
      source: hadith(1631)
    },
    {
      id: 'wakaf-uang',
      title: 'Wakaf Uang (Cash Waqf)',
      category: 'Wakaf Modern',
      summary: 'Wakaf uang memungkinkan setiap Muslim berwakaf mulai dari Rp 10.000 melalui rekening BWI atau platform digital.',
      points: [
        'Fatwa MUI 2002: Wakaf uang hukumnya jawaz (boleh); uang pokok dijaga, hanya hasilnya yang dimanfaatkan.',
        'Mekanisme: Uang diinvestasikan ke instrumen syariah (sukuk, deposito syariah); keuntungannya disalurkan ke mauquf alaih.',
        'CWLS (Cash Waqf Linked Sukuk): Instrumen negara untuk wakaf uang yang diinvestasikan dalam Sukuk Negara, diterbitkan Kemenkeu.',
        'Platform: BWI (Badan Wakaf Indonesia), wakaf.id, Kitabisa Wakaf, Tokopedia Wakaf — minimal Rp 10.000.',
        'Keunggulan: Menjangkau muzakki dengan modal kecil; uang pokok terlindungi secara hukum wakaf.'
      ],
      practice: 'Wakafkan Rp 50.000–100.000 melalui platform wakaf digital terpercaya sebagai jariyah pertama Anda.',
      source: hadith(1631)
    },
    {
      id: 'wakaf-produktif',
      title: 'Wakaf Produktif & Pemberdayaan Ekonomi',
      category: 'Wakaf Modern',
      summary: 'Harta wakaf dikelola secara produktif (kos, pertokoan, pertanian) agar menghasilkan keuntungan yang dialirkan ke sosial.',
      points: [
        'Definisi: Wakaf produktif adalah pengelolaan aset wakaf secara bisnis untuk menghasilkan surplus ekonomi.',
        'Contoh: Rumah kos wakaf, pertokoan wakaf, kebun sawit wakaf, hotel wakaf (seperti Grand Wakaf Hotel Solo).',
        'Nadzir Profesional: UU No.41/2004 mensyaratkan nadzir bersertifikat yang diawasi BWI untuk wakaf produktif.',
        'Surplus: Keuntungan bersih dialirkan ke mauquf alaih — beasiswa, klinik gratis, pengembangan pesantren.',
        'Replikasi Global: Wakaf produktif ala Turki Utsmani (imaroh) dan Wakaf Azhar Mesir adalah contoh sukses berabad-abad.'
      ],
      practice: 'Pelajari laporan tahunan BWI untuk melihat portofolio wakaf produktif Indonesia dan dampak sosialnya.',
      source: hadith(1631)
    },
    {
      id: 'wakaf-online',
      title: 'Wakaf Online & Regulasi Indonesia',
      category: 'Wakaf Modern',
      summary: 'Regulasi wakaf di Indonesia: UU No.41/2004, PP No.42/2006, dan peran BWI sebagai regulator nasional.',
      points: [
        'UU Wakaf No.41/2004: Landasan hukum nasional; memperkuat posisi wakaf sebagai instrumen ekonomi Islam.',
        'Sertifikasi Tanah Wakaf: KUA menerbitkan AIW (Akta Ikrar Wakaf); BPN menerbitkan sertifikat tanah wakaf.',
        'BWI: Badan Wakaf Indonesia — lembaga negara yang membina nadzir dan mengembangkan wakaf nasional.',
        'Wakaf Online Sah: OJK dan MUI mengizinkan wakaf via platform digital dengan akad yang tercatat.',
        'Tantangan: Banyak tanah wakaf belum bersertifikat; program sertifikasi massal terus dijalankan Kemenag.'
      ],
      practice: 'Cek status sertifikasi tanah masjid atau mushola di lingkungan Anda; bantu proses jika belum bersertifikat.',
      source: hadith(1631)
    },
    {
      id: 'wakaf-jariyah',
      title: 'Sedekah Jariyah & Keutamaan Wakaf',
      category: 'Keutamaan Wakaf',
      summary: 'Rasulullah SAW menyebut tiga amalan yang pahalanya terus mengalir setelah wafat; wakaf adalah yang paling nyata.',
      points: [
        'HR. Muslim: "Jika seseorang wafat, terputuslah amalnya kecuali tiga: sedekah jariyah, ilmu yang bermanfaat, anak shaleh yang mendoakan."',
        'Wakaf sebagai Jariyah: Sumur, masjid, sekolah yang diwakafkan terus memberikan pahala selama manfaatnya ada.',
        'Contoh Sahabat: Utsman bin Affan mewakafkan Sumur Ruma untuk seluruh penduduk Madinah (HR. Nasai).',
        'Wakaf Umar: Tanah Khaibar diwakafkan atas saran Nabi SAW; hasilnya disalurkan ke fakir dan ibnu sabil (HR. Bukhari).',
        'Motivasi: Setiap rupiah yang Anda wakafkan terus bekerja menghasilkan pahala bahkan saat Anda tidur.'
      ],
      practice: 'Niatkan satu aset (meski kecil — buku, Al-Qur\'an, peralatan masjid) sebagai wakaf jariyah dalam hidup Anda.',
      source: hadith(1631)
    }
  ]
};

export const jenazahPraktis: Course = {
  id: 'jenazah-praktis',
  title: 'Panduan Lengkap Pengurusan Jenazah',
  description: 'Tata cara memandikan, mengkafani, menshalatkan, dan menguburkan jenazah sesuai sunnah Nabi SAW.',
  note: 'Mengurus jenazah adalah fardhu kifayah — kewajiban kolektif yang gugur jika sudah ada yang mengerjakannya.',
  lessons: [
    {
      id: 'hukum-jenazah',
      title: 'Hukum & Adab Menghadapi Kematian',
      category: 'Dasar Jenazah',
      summary: 'Kematian adalah kepastian; Islam mengajarkan talqin, menutup mata, dan segera mengurus jenazah.',
      points: [
        'Fardhu Kifayah: Memandikan, mengkafani, menshalatkan, dan menguburkan jenazah Muslim.',
        'Talqin: Anjurkan yang sekarat mengucap "Laa ilaaha illallaah" (HR. Muslim — "Labikkan orang yang hampir mati dengan laa ilaaha illallaah").',
        'Menutup Mata: Sunnah menutup mata mayit dan mendoakan: "Allahummaghfir li-fulan warfa\' darajatah" (HR. Muslim).',
        'Segera Dikuburkan: "Bersegeralah dalam mengurus jenazah; jika ia shaleh, maka kebaikan yang kalian dahulukan; jika tidak, maka keburukan yang kalian singkirkan." (HR. Bukhari-Muslim).',
        'Larangan: Tidak boleh meratap berlebihan, merobek baju, atau mencakar wajah — termasuk dosa besar.'
      ],
      practice: 'Hafalkanlah doa ta\'ziyah: "Inna lillahi wa inna ilaihi raji\'un, Allahumma\'jur fi mushibatihi wa akhlif lahu khairan minha."',
      source: hadith(2141)
    },
    {
      id: 'memandikan-jenazah',
      title: 'Tata Cara Memandikan Jenazah',
      category: 'Praktik Jenazah',
      summary: 'Jenazah dimandikan minimal sekali dengan air suci; dianjurkan ganjil (3, 5, atau 7 kali) dengan campuran daun bidara dan kapur barus.',
      points: [
        'Yang memandikan: Sesama jenis; suami boleh memandikan istri dan sebaliknya (HR. Abu Dawud).',
        'Alat: Air suci, daun bidara/sabun, kapur barus untuk mandi terakhir, kain penutup aurat.',
        'Urutan: Niatkan, basuh anggota wudhu, miringkan ke kiri (basuh sisi kanan), miringkan ke kanan (basuh sisi kiri), siramkan air dari kepala hingga kaki.',
        'Mandi Ganjil: Minimal 1x, disunahkan 3x, 5x, atau 7x; mandi terakhir dicampur kapur barus.',
        'Merahasiakan Aib: Jika memandikan melihat aib, wajib dirahasiakan — ini amanah sakral.'
      ],
      practice: 'Daftarkan diri ke pelatihan jenazah di masjid atau Baznas terdekat; ini keterampilan wajib setiap Muslim.',
      source: hadith(1253)
    },
    {
      id: 'mengkafani',
      title: 'Mengkafani Jenazah',
      category: 'Praktik Jenazah',
      summary: 'Laki-laki dikafani 3 helai kain; perempuan 5 helai; kain putih polos yang bersih dan menutup seluruh tubuh.',
      points: [
        'Laki-laki: 3 helai kain putih (izar, gamis, lifafah/pembungkus luar) — tidak ada baju dan sorban khusus.',
        'Perempuan: 5 helai (sarung, baju, tutup kepala, selendang, pembungkus luar).',
        'Kain: Putih, bersih, sederhana — tidak mewah. Rasulullah SAW dikafani 3 helai kain Yaman (HR. Bukhari).',
        'Wewangian: Kain boleh diberi wewangian (kapur barus, cendana); tidak boleh menggunakan kain batik motif.',
        'Ikat: Diikat di kepala dan kaki; dibuka setelah dimasukkan ke liang lahat.'
      ],
      practice: 'Latihan mengkafani dengan boneka atau kain latihan di pelatihan jenazah — praktikkan bersama keluarga.',
      source: hadith(1253)
    },
    {
      id: 'shalat-jenazah',
      title: 'Shalat Jenazah: Rukun & Tata Cara',
      category: 'Praktik Jenazah',
      summary: 'Shalat jenazah: 4 takbir, tanpa rukuk dan sujud, diakhiri salam; membaca Al-Fatihah, shalawat, dan doa jenazah.',
      points: [
        'Rukun: Niat, berdiri (jika mampu), 4 takbir, membaca Al-Fatihah setelah takbir pertama, shalawat setelah takbir kedua, doa jenazah setelah takbir ketiga, salam.',
        'Doa Jenazah: "Allahummaghfir lahu warhamhu wa \'afihi wa\'fu \'anhu..." (HR. Muslim).',
        'Posisi Imam: Sejajar kepala jenazah laki-laki; sejajar pinggang jenazah perempuan.',
        'Shalat Ghaib: Boleh dishalatkan meski jenazah tidak ada di tempat (seperti Nabi SAW menshalatkan Najasyi).',
        'Minimal: Tiga orang sudah cukup untuk menggugurkan fardhu kifayah shalat jenazah.'
      ],
      practice: 'Hafalkanlah doa setelah takbir ketiga: "Allahummaghfir lihayyina wa mayyitina..." untuk kesiapan sewaktu-waktu.',
      source: hadith(1980)
    },
    {
      id: 'menguburkan',
      title: 'Menguburkan Jenazah',
      category: 'Praktik Jenazah',
      summary: 'Jenazah dikuburkan dalam liang lahat sedalam dada orang, menghadap kiblat, tanpa peti (menurut mayoritas ulama).',
      points: [
        'Liang Lahat: Jenis syaq (parit di tengah) atau lahd (ceruk di dinding); lahd lebih dianjurkan.',
        'Kedalaman: Setidaknya sampai dada; cukup untuk mencegah bau dan galian binatang.',
        'Tanpa Peti (Mayoritas): Tubuh langsung menyentuh tanah; peti boleh jika tanah berpasir atau kondisi darurat.',
        'Menghadap Kiblat: Miring ke kanan menghadap kiblat; tali kafan dilepas saat di liang lahat.',
        'Talqin: Disunahkan membacakan talqin setelah penguburan; ulama berbeda pendapat tentang hukumnya.',
        'Berdoa: Setelah penguburan, berdiri sebentar mendoakan jenazah; Rasulullah SAW menyuruh para sahabat berdoa untuk keteguhan jenazah.'
      ],
      practice: 'Ikut menyaksikan atau membantu proses pemakaman di lingkungan Anda sebagai ibrah dan pembelajaran.',
      source: hadith(2041)
    },
    {
      id: 'ta-ziyah-do-a',
      title: 'Ta\'ziyah, Ziarah, & Doa untuk Jenazah',
      category: 'Adab Jenazah',
      summary: 'Ta\'ziyah adalah menghibur keluarga jenazah; ziarah kubur dianjurkan untuk mengingatkan kematian dan mendoakan.',
      points: [
        'Ta\'ziyah: Hukum sunnah; dilakukan 3 hari setelah wafat; bawa makanan untuk meringankan beban keluarga.',
        'Doa ta\'ziyah: "Innaa lillahi wa inna ilaihi raji\'un, Allahumma\'jur fi mushibatihi wa akhlif lahu khairan minha."',
        'Ziarah Kubur: Dianjurkan bagi laki-laki (HR. Muslim); perempuan boleh menurut mayoritas ulama.',
        'Doa di Kubur: "Assalamu \'alaikum ahlad-diyar minal mu\'minina wal muslimin... nas\'alullaaha lana wa lakumul \'afiyah."',
        'Larangan: Tidak boleh meminta doa kepada ahli kubur, mengusap-usap kuburan untuk berkah, atau bernadzar kepada kubur.'
      ],
      practice: 'Ziarah kubur orang tua atau kerabat minggu ini; bacakan Al-Fatihah dan doa sunnah ziarah kubur.',
      source: hadith(2041)
    }
  ]
};

export const ilmuTafsir: Course = {
  id: 'ilmu-tafsir',
  title: 'Ilmu Tafsir Al-Qur\'an: Metode & Tokoh',
  description: 'Pelajari metode-metode penafsiran Al-Qur\'an dan para mufassir berpengaruh dari era klasik hingga kontemporer.',
  note: 'Tafsir adalah upaya manusia memahami firman Allah — kerendahan hati ilmiah adalah syarat utamanya.',
  lessons: [
    {
      id: 'pengantar-tafsir',
      title: 'Pengantar Ilmu Tafsir',
      category: 'Dasar Tafsir',
      summary: 'Ilmu tafsir mempelajari cara memahami Al-Qur\'an dari aspek bahasa, asbabun nuzul, nasikh-mansukh, dan qira\'at.',
      points: [
        'Definisi: Tafsir = keterangan/penjelasan makna ayat Al-Qur\'an dari aspek bahasa, konteks turun, dan kandungan hukum.',
        'Syarat Mufassir: Menguasai bahasa Arab (nahwu, sharaf, balaghah), ushul tafsir, ilmu hadits, aqidah yang lurus.',
        'Asbabun Nuzul: Mengetahui sebab turunnya ayat sangat krusial untuk memahami konteks dan penerapan hukum.',
        'Nasikh-Mansukh: Ilmu tentang ayat yang menghapus (nasikh) dan ayat yang dihapus hukumnya (mansukh).',
        'Muhkam-Mutasyabih: Ayat muhkam (jelas maknanya) dan mutasyabih (maknanya hanya Allah yang tahu) — keduanya ada dalam Al-Qur\'an (QS. 3:7).'
      ],
      practice: 'Mulailah membaca kitab tafsir ringkas seperti Tafsir Ibnu Katsir edisi terjemah atau Tafsir Al-Muyassar untuk satu juz per minggu.',
      source: quran('3/7')
    },
    {
      id: 'tafsir-bil-matsur',
      title: 'Tafsir bil-Ma\'tsur (Riwayat)',
      category: 'Metode Tafsir',
      summary: 'Al-Qur\'an ditafsirkan dengan Al-Qur\'an, lalu sunnah Nabi, lalu pendapat sahabat — metode paling otoritatif.',
      points: [
        'Prinsip: Al-Qur\'an yufassiru ba\'dhuhu ba\'dhan (sebagian Al-Qur\'an menafsirkan sebagian yang lain).',
        'Hierarki: Al-Qur\'an → Sunnah → Atsar Sahabat → Atsar Tabi\'in.',
        'Contoh: QS. Al-Fatihah: 7 — "orang yang dinikmatkan" → ditafsirkan QS. An-Nisa: 69 (nabi, shiddiq, syuhada, shalih).',
        'Kitab Referensi: Tafsir Ibnu Katsir, Tafsir Ath-Thabari (Jami\' al-Bayan), Tafsir Ad-Durrul Mantsur (As-Suyuthi).',
        'Keunggulan: Paling aman dari penafsiran hawa nafsu karena bersandar pada dalil naqli.'
      ],
      practice: 'Ambil satu ayat yang sering dibaca (misal: Al-Baqarah: 2) dan lacak penjelasannya di Tafsir Ibnu Katsir.',
      source: quran('3/7')
    },
    {
      id: 'tafsir-bir-rayi',
      title: 'Tafsir bir-Ra\'yi (Akal)',
      category: 'Metode Tafsir',
      summary: 'Penafsiran menggunakan ijtihad dan analisis rasional; sah jika berlandaskan kaidah bahasa Arab dan ushul tafsir.',
      points: [
        'Definisi: Penafsiran menggunakan ijtihad dengan mengandalkan pemahaman bahasa Arab dan kaidah ushul.',
        'Ra\'yi Mahmudah (Terpuji): Jika sesuai kaidah bahasa Arab, tidak bertentangan riwayat shahih, dan mufassir alim.',
        'Ra\'yi Madzmumah (Tercela): Penafsiran tanpa ilmu, mengikuti hawa nafsu, atau memaksakan makna ideologis.',
        'Kitab Referensi: Tafsir Al-Kasysyaf (Zamakhsyari — mu\'tazilah), Mafatih al-Ghaib (Ar-Razi), Al-Jalalain.',
        'Prinsip Kehati-hatian: Imam Syafi\'i berkata, "Aku takut berbicara tentang Al-Qur\'an tanpa ilmu."'
      ],
      practice: 'Bandingkan tafsir Al-Jalalain dan Ibnu Katsir untuk satu ayat — perhatikan perbedaan pendekatan dan kesimpulannya.',
      source: quran('3/7')
    },
    {
      id: 'tafsir-maudhui',
      title: 'Tafsir Maudhui (Tematik)',
      category: 'Metode Tafsir',
      summary: 'Mengumpulkan semua ayat bertema sama, mengurutkannya secara kronologis, lalu merumuskan kesimpulan komprehensif.',
      points: [
        'Definisi: Metode tematik — mengambil satu tema (misalnya "keadilan", "perempuan", "jihad") lalu mengumpulkan semua ayatnya.',
        'Langkah: Tentukan tema → kumpulkan semua ayat → susun kronologis → pahami asbabun nuzul → rumuskan pandangan Al-Qur\'an.',
        'Keunggulan: Menghasilkan pandangan Al-Qur\'an yang holistik; cocok menjawab isu kontemporer.',
        'Tokoh: Syaikh Ahmad Sayyid Al-Kumi (pencetus), Dr. Mustafa Muslim (Mabahits fit-Tafsir al-Maudhui).',
        'Contoh: Tema "syura/musyawarah" — mengumpulkan QS. 2:233, 3:159, 42:38 dan merumuskan sistem musyawarah Islam.'
      ],
      practice: 'Pilih satu tema (contoh: "sabar") dan kumpulkan minimal 10 ayat tentangnya; buat mind map hubungan antar ayat.',
      source: quran('3/7')
    },
    {
      id: 'mufassir-klasik',
      title: 'Para Mufassir Klasik Berpengaruh',
      category: 'Tokoh Tafsir',
      summary: 'Ibnu Katsir, Ath-Thabari, Al-Qurthubi, As-Suyuthi — raksasa ilmu tafsir yang karyanya masih menjadi rujukan utama.',
      points: [
        'Ibnu Jarir Ath-Thabari (w.310H): Jami\' al-Bayan — ensiklopedi tafsir bil-ma\'tsur terlengkap; 30 jilid.',
        'Ibnu Katsir (w.774H): Tafsir Al-Qur\'an Al-\'Adzim — paling populer di kalangan ahlus sunnah; komprehensif dan autentik.',
        'Al-Qurthubi (w.671H): Al-Jami\' li Ahkam Al-Qur\'an — spesialis hukum fiqh dalam Al-Qur\'an; 20 jilid.',
        'As-Suyuthi (w.911H): Ad-Durrul Mantsur — tafsir bil-ma\'tsur; juga menulis Al-Itqan (ilmu Al-Qur\'an).',
        'Fakhrur Razi (w.606H): Mafatih al-Ghaib — tafsir filosofis dan teologi; 32 jilid; pendekatan kalam Asy\'ari.'
      ],
      practice: 'Download PDF Tafsir Ibnu Katsir edisi ringkasan; mulai dari Juz Amma untuk membangun kebiasaan membaca tafsir.',
      source: quran('3/7')
    },
    {
      id: 'mufassir-kontemporer',
      title: 'Mufassir Kontemporer & Tafsir Nusantara',
      category: 'Tokoh Tafsir',
      summary: 'Sayyid Quthb, Ibnu \'Asyur, Hamka, Quraish Shihab — mufassir modern yang menghadirkan Al-Qur\'an untuk tantangan zaman.',
      points: [
        'Sayyid Quthb (w.1966): Fi Zhilalil Qur\'an — tafsir harakah dengan bahasa sastra yang menggugah jiwa.',
        'Ibnu \'Asyur (w.1973): At-Tahrir wat-Tanwir — tafsir linguistik-fiqh terlengkap abad 20; 30 jilid.',
        'Hamka (w.1981): Tafsir Al-Azhar — tafsir pertama lengkap 30 juz berbahasa Indonesia; perspektif Nusantara.',
        'Quraish Shihab (kontemporer): Tafsir Al-Misbah — tafsir 30 juz Indonesia modern; bahasa lugas; perspektif sosial.',
        'Muhammad Abduh & Rashid Ridha: Tafsir Al-Manar — tafsir reformis-modern; pengaruh besar pemikiran Islam kontemporer.'
      ],
      practice: 'Baca satu halaman Tafsir Al-Misbah atau Al-Azhar setiap hari; bandingkan pendekatan keduanya pada ayat yang sama.',
      source: quran('3/7')
    }
  ]
};

export const nahwuDasar: Course = {
  id: 'nahwu-dasar',
  title: 'Ilmu Nahwu Dasar',
  description: 'Pelajari kaidah bahasa Arab dasar: pembagian kata, i\'rob, jumlah ismiyah dan fi\'liyah untuk memahami Al-Qur\'an.',
  note: 'Nahwu adalah kunci membaca Al-Qur\'an dan kitab kuning dengan pemahaman yang benar.',
  lessons: [
    {
      id: 'pembagian-kata',
      title: 'Tiga Pembagian Kata (Isim, Fi\'il, Harf)',
      category: 'Dasar Nahwu',
      summary: 'Semua kata Arab terbagi tiga: isim (nomina), fi\'il (verba), harf (partikel); masing-masing punya ciri khas.',
      points: [
        'Isim (اِسْم): Kata benda/sifat; bisa didahului "al" (ال), berharakat tanwin, boleh didahului huruf jar. Contoh: كِتَابٌ (kitabun = buku).',
        'Fi\'il (فِعْل): Kata kerja; terbagi fi\'il madhi (lampau), mudhari\' (sekarang/akan), amar (perintah). Contoh: كَتَبَ (kataba = menulis).',
        'Harf (حَرْف): Partikel; tidak bisa berdiri sendiri, maknanya jelas saat bersanding isim/fi\'il. Contoh: فِي (fi = di dalam), وَ (wa = dan).',
        'Ciri Isim: Tanwin (ـٌـٍـً), "al" (الـ), didahului huruf jar, bisa disandarkan (idhafah).',
        'Ciri Fi\'il: Ta\' ta\'nits sakinah (ـتْ), ya\' mukhatabah (يَـ), nun taukid (ـنَّ).'
      ],
      practice: 'Buka Al-Qur\'an Surat Al-Fatihah; tandai setiap kata dan kategorikan apakah isim, fi\'il, atau harf.',
      source: quran('1/1')
    },
    {
      id: 'irob-dasar',
      title: 'I\'rob: Perubahan Harakat Ujung Kata',
      category: 'Dasar Nahwu',
      summary: 'I\'rob adalah perubahan baris akhir kata Arab sesuai fungsinya dalam kalimat: rafa\', nashab, jar, jazm.',
      points: [
        'Rafa\' (ضَمَّة): Fungsi mubtada\', khabar, fa\'il, naibul fa\'il — tanda: dhammah (ُـ), wawu, alif.',
        'Nashab (فَتْحَة): Fungsi maf\'ul bih, khabar kana, isim inna — tanda: fathah (َـ), ya\', alif.',
        'Jar (كَسْرَة): Setelah huruf jar atau dalam idhafah — tanda: kasrah (ِـ), ya\'.',
        'Jazm (سُكُون): Hanya untuk fi\'il mudhari\' — tanda: sukun (ْـ), membuang huruf illat.',
        'Bina\' vs I\'rob: Kata mabni tidak berubah harakatnya (seperti dhamir); kata mu\'rab berubah sesuai fungsi.'
      ],
      practice: 'Ambil QS. Al-Baqarah: 1–5; tandai harakat akhir setiap isim dan tentukan apakah rafa\', nashab, atau jar.',
      source: quran('2/1')
    },
    {
      id: 'jumlah-ismiyah',
      title: 'Jumlah Ismiyah (Kalimat Nominal)',
      category: 'Struktur Kalimat',
      summary: 'Kalimat nominal dimulai isim; terdiri dari mubtada\' (subjek, rafa\') dan khabar (predikat, rafa\').',
      points: [
        'Pola dasar: مُبْتَدَأٌ + خَبَرٌ — keduanya rafa\'. Contoh: اللهُ كَبِيرٌ (Allah Maha Besar).',
        'Mubtada\': Harus ma\'rifah (definit) atau nakirah dengan konteks khusus; selalu rafa\'.',
        'Khabar: Menerangkan mubtada\'; bisa berupa isim, jumlah fi\'liyah, jumlah ismiyah, atau syibhul jumlah (zharaf/huruf jar).',
        'Khabar Jar Majrur: اللهُ فِي السَّمَاءِ — "di langit" adalah khabar berupa syibhul jumlah.',
        'Mubtada\' Tanpa Khabar (Khusus): Jika dimasuki kana, inna, dll — terjadi perubahan nama dan harakat.'
      ],
      practice: 'Buat 5 kalimat ismiyah sederhana tentang sifat Allah; gunakan kamus Arab-Indonesia jika perlu.',
      source: quran('2/255')
    },
    {
      id: 'jumlah-fi-liyah',
      title: 'Jumlah Fi\'liyah (Kalimat Verbal)',
      category: 'Struktur Kalimat',
      summary: 'Kalimat verbal dimulai fi\'il; terdiri dari fi\'il + fa\'il (subjek rafa\') + maf\'ul bih (objek nashab) jika ada.',
      points: [
        'Pola dasar: فِعْلٌ + فَاعِلٌ — fi\'il madhi + fa\'il rafa\'. Contoh: كَتَبَ الطَّالِبُ (Sang pelajar menulis).',
        'Fa\'il: Selalu rafa\'; bisa isim zhahir (nyata) atau dhamir (tersembunyi/muttashil).',
        'Maf\'ul Bih: Objek yang dikenai pekerjaan; selalu nashab. Contoh: كَتَبَ الطَّالِبُ الدَّرْسَ (menulis pelajaran).',
        'Kesesuaian Gender: Fi\'il madhi + fa\'il muannats → tambah ta\' ta\'nits. Contoh: كَتَبَتِ الطَّالِبَةُ.',
        'Fi\'il Majhul: Jika fa\'il tidak disebutkan, fi\'il diubah ke bentuk majhul (pasif) dan fa\'il → naibul fa\'il (rafa\').'
      ],
      practice: 'Ambil 5 ayat Al-Qur\'an berisi fi\'il; identifikasi fi\'il, fa\'il, dan maf\'ul bih-nya; tentukan harakat masing-masing.',
      source: quran('2/30')
    },
    {
      id: 'huruf-jar',
      title: 'Huruf Jar & Maknanya',
      category: 'Alat Nahwu',
      summary: 'Huruf jar menjadikan isim sesudahnya berharakat kasrah; masing-masing punya makna spesifik.',
      points: [
        'مِنْ (min): Dari, sebagian. Contoh: مِنَ الْمَسْجِدِ (dari masjid). QS. 17:1.',
        'إِلَى (ila): Ke, menuju. Contoh: إِلَى الْمَسْجِدِ الْأَقْصَى. QS. 17:1.',
        'عَنْ (\'an): Dari (sumber/asal), tentang. Contoh: عَنِ الصَّلَاةِ (tentang shalat).',
        'عَلَى (\'ala): Di atas, atas. Contoh: عَلَى الْعَرْشِ اسْتَوَى (QS. 20:5).',
        'فِي (fi): Di dalam. Contoh: فِي السَّمَاوَاتِ (di langit-langit). QS. 2:255.',
        'بِ (bi): Dengan, menggunakan. Contoh: بِسْمِ اللهِ (dengan nama Allah).',
        'لِ (li): Untuk, milik. Contoh: لِلَّهِ مَا فِي السَّمَاوَاتِ (QS. 2:284).'
      ],
      practice: 'Buka Al-Qur\'an halaman mana saja; temukan 7 huruf jar berbeda dan terjemahkan frasa yang mengikutinya.',
      source: quran('17/1')
    },
    {
      id: 'mufrad-mutsanna-jamak',
      title: 'Mufrad, Mutsanna & Jamak',
      category: 'Morfologi',
      summary: 'Isim Arab berubah bentuk sesuai jumlah: tunggal (mufrad), ganda (mutsanna), jamak (jamak).',
      points: [
        'Mufrad (tunggal): Bentuk dasar. Contoh: مُسْلِمٌ (satu Muslim laki-laki).',
        'Mutsanna (ganda): Tambah ـَانِ (rafa\') atau ـَيْنِ (nashab/jar). Contoh: مُسْلِمَانِ (dua Muslim — rafa\').',
        'Jamak Muzakkar Salim: Tambah ـُونَ (rafa\') atau ـِينَ (nashab/jar). Contoh: مُسْلِمُونَ (para Muslim).',
        'Jamak Muannats Salim: Tambah ـَاتٌ (rafa\'), ـَاتٍ (jar), ـَاتٍ (nashab). Contoh: مُسْلِمَاتٌ.',
        'Jamak Taksir: Perubahan tidak beraturan (broken plural); harus dihafal. Contoh: كِتَابٌ → كُتُبٌ, رَجُلٌ → رِجَالٌ.'
      ],
      practice: 'Buat tabel perubahan 10 isim dari mufrad ke mutsanna ke jamak; bandingkan perubahan harakatnya.',
      source: quran('2/1')
    }
  ]
};

export const adabProfesi: Course = {
  id: 'adab-profesi',
  title: 'Akhlak & Adab Profesi Muslim',
  description: 'Panduan etika Islam untuk berbagai profesi: dokter, guru, pedagang, PNS, dan profesional teknologi.',
  note: 'Setiap pekerjaan halal adalah ibadah jika dilakukan dengan niat ikhlas dan akhlak mulia.',
  lessons: [
    {
      id: 'etika-kerja-islam',
      title: 'Etos Kerja & Etika Profesi dalam Islam',
      category: 'Dasar Adab Profesi',
      summary: 'Islam mendorong kerja keras, profesionalisme, dan amanah sebagai bentuk ibadah dan kontribusi sosial.',
      points: [
        'Kerja sebagai Ibadah: "Tidaklah seseorang memakan makanan yang lebih baik dari hasil tangannya sendiri." (HR. Bukhari — Nabi Dawud AS menafkahi diri dari kerajinan tangan).',
        'Itqan (Profesional): "Sesungguhnya Allah mencintai jika seseorang mengerjakan suatu pekerjaan, ia melakukannya dengan itqan (sungguh-sungguh dan sempurna)." (HR. Baihaqi).',
        'Amanah: Pegawai yang melaksanakan tugas dengan jujur dan transparan memenuhi salah satu sifat mukmin sejati (QS. 23:8).',
        'Niat: "Sesungguhnya amal itu tergantung niatnya" (HR. Bukhari-Muslim) — bekerja diniatkan untuk ibadah dan maslahah.',
        'Larangan: Korupsi, manipulasi data, plagiarisme, dan penipuan dalam pekerjaan adalah haram dan merusak keberkahan rezeki.'
      ],
      practice: 'Tuliskan niat kerja Anda hari ini: "Saya bekerja untuk menafkahi keluarga, memberi manfaat, dan beribadah kepada Allah." Tempelkan di meja kerja.',
      source: hadith(2072)
    },
    {
      id: 'adab-dokter-nakes',
      title: 'Adab Dokter & Tenaga Kesehatan Muslim',
      category: 'Profesi Kesehatan',
      summary: 'Dokter Muslim adalah waris para nabi dalam membantu penyembuhan; wajib menggabungkan kompetensi medis dan akhlak Islami.',
      points: [
        'Niat Mulia: Profesi medis adalah fardhu kifayah — kewajiban kolektif umat; dokter Muslim menanggung tanggung jawab spiritual.',
        'Informed Consent: Islam mewajibkan kejujuran (shidq) kepada pasien tentang diagnosis dan risiko pengobatan.',
        'Ikhtiar & Tawakal: "Berobatlah, karena Allah tidak menciptakan penyakit kecuali ada obatnya, selain penyakit tua." (HR. Abu Dawud).',
        'Rahasia Medis: Menjaga rahasia pasien adalah amanah (wajib); melanggarnya haram kecuali darurat hukum.',
        'Obat Haram: Wajib mencari alternatif halal; boleh menggunakan bahan haram hanya dalam kondisi darurat medis yang nyata.'
      ],
      practice: 'Bagi tenaga kesehatan: bacalah Basmallah sebelum memeriksa pasien dan doakan kesembuhan mereka dalam hati.',
      source: hadith(2041)
    },
    {
      id: 'adab-guru-pengajar',
      title: 'Adab Guru & Pengajar Muslim',
      category: 'Profesi Pendidikan',
      summary: 'Guru adalah pewaris nabi dalam menyebarkan ilmu; tanggung jawabnya sangat besar di hadapan Allah.',
      points: [
        'Keutamaan: "Barangsiapa yang menempuh jalan untuk mencari ilmu, Allah akan memudahkan baginya jalan ke surga." (HR. Muslim).',
        'Niat Ikhlas: Mengajar hanya karena Allah — bukan untuk pujian, viral, atau materi semata (QS. 36:21).',
        'Sabar: Imam Ibnu Qayyim: "Guru yang baik adalah yang bisa bersabar atas kebodohan murid."',
        'Keteladanan: "Ilmu tanpa amal seperti pohon tanpa buah" — guru harus menjadi contoh nyata dari ilmu yang diajarkan.',
        'Keadilan: Tidak pilih kasih antara murid; memberi perhatian lebih pada yang kesulitan adalah sunnah Rasulullah SAW.'
      ],
      practice: 'Jika Anda mengajar, tutup sesi dengan doa: "Allahumma infa\'na bima \'allamtana wa \'allimna ma yanfa\'una."',
      source: hadith(1631)
    },
    {
      id: 'adab-pedagang',
      title: 'Adab Pedagang & Pengusaha Muslim',
      category: 'Profesi Bisnis',
      summary: 'Pedagang jujur di surga bersama para nabi dan syuhada; kejujuran dan menghindari sumpah palsu adalah kunci.',
      points: [
        'Keutamaan: "Pedagang yang jujur dan amanah akan bersama para nabi, shiddiqin, dan syuhada." (HR. Tirmidzi).',
        'Larangan Penipuan: "Barangsiapa yang menipu, bukan golongan kami." (HR. Muslim) — cacat produk wajib diinformasikan.',
        'Jual Beli Halal: Hindari riba, gharar (ketidakjelasan), maisir (spekulasi) dalam transaksi bisnis.',
        'Sumpah Palsu: Dilarang keras bersumpah palsu untuk mendongkrak penjualan — menghapus keberkahan (HR. Bukhari).',
        'Pasar yang Berkah: Memberi takaran penuh (QS. 11:85); menolak monopoli harga; mendoakan pembeli.'
      ],
      practice: 'Pastikan setiap produk yang Anda jual dijelaskan kondisinya secara jujur; hapus deskripsi yang menyesatkan.',
      source: hadith(2072)
    },
    {
      id: 'adab-pns-asn',
      title: 'Adab PNS/ASN Muslim',
      category: 'Profesi Pemerintahan',
      summary: 'PNS Muslim adalah pelayan rakyat; amanah jabatan, menolak suap, dan pelayanan prima adalah kewajiban agama.',
      points: [
        'Amanah Jabatan: "Sesungguhnya amanah itu kelak di hari kiamat akan menjadi kehinaan dan penyesalan, kecuali bagi orang yang mengambilnya dengan benar dan menunaikan kewajibannya." (HR. Muslim).',
        'Larangan Suap: "Allah melaknat penyuap dan yang disuap." (HR. Tirmidzi) — gratifikasi termasuk suap.',
        'Disiplin Waktu: Masuk kerja tepat waktu adalah bentuk amanah; pulang sebelum jam adalah khianat pada rakyat.',
        'Pelayanan Prima: Memudahkan urusan masyarakat adalah ibadah; mempersulit adalah dosa.',
        'Netralitas Politik: ASN wajib netral dalam pilkada/pemilu; berpihak menggunakan jabatan adalah penyalahgunaan amanah.'
      ],
      practice: 'Evaluasi: apakah ada "gratifikasi kecil" yang Anda terima di pekerjaan? Kembalikan atau laporkan sebagai bentuk amanah.',
      source: hadith(3681)
    },
    {
      id: 'adab-programmer-teknologi',
      title: 'Adab Profesional Teknologi & Programmer Muslim',
      category: 'Profesi Teknologi',
      summary: 'Programmer dan profesional teknologi Muslim bertanggung jawab atas dampak sosial produk digitalnya.',
      points: [
        'Amanah Data: Menjaga keamanan data pengguna adalah amanah — kebocoran data karena kelalaian adalah dosa profesional.',
        'Produk Halal: Hindari membangun sistem untuk judi online, pornografi, riba digital, atau penipuan — haram meski dibayar mahal.',
        'Open Source & Ilmu: Berbagi kode bermanfaat adalah sedekah ilmu — pahala jariyah bagi programmer.',
        'AI & Etika Islam: Membangun AI yang adil, tidak bias, dan menghormati privasi sesuai prinsip maslahah dan menghindari mafsadah.',
        'Digital Fatigue: Produktivitas kerja bukan mengorbankan shalat — atur notifikasi agar tidak terganggu waktu ibadah.'
      ],
      practice: 'Audit satu proyek yang sedang Anda kerjakan: apakah ada fitur yang berdampak negatif? Ajukan perbaikan ke tim.',
      source: hadith(2072)
    }
  ]
};

export const hukumKeluargaIndonesia: Course = {
  id: 'hukum-keluarga-indonesia',
  title: 'Hukum Keluarga Islam di Indonesia',
  description: 'Kompilasi Hukum Islam (KHI), pernikahan di KUA, itsbat nikah, perceraian di PA, dan perlindungan anak.',
  note: 'Hukum keluarga Islam Indonesia memadukan fikih klasik dan regulasi negara untuk kemaslahatan umat.',
  lessons: [
    {
      id: 'khi-uu-perkawinan',
      title: 'KHI & UU Perkawinan No.1/1974',
      category: 'Dasar Hukum',
      summary: 'KHI (Kompilasi Hukum Islam) adalah kodifikasi fiqh pernikahan, warisan, dan wakaf untuk pengadilan agama Indonesia.',
      points: [
        'UU No.1/1974: Undang-Undang Perkawinan — mengatur pernikahan sah, hak-kewajiban suami-istri, perceraian secara nasional.',
        'KHI (Inpres No.1/1991): Panduan teknis hakim Pengadilan Agama; mencakup 229 pasal tentang perkawinan, kewarisan, dan wakaf.',
        'Batas Usia: UU No.16/2019 mengubah batas usia menikah menjadi minimal 19 tahun untuk laki-laki dan perempuan.',
        'Perkawinan Campuran: Beda agama tidak diakui negara; perlu prosedur khusus di luar negeri (menurut hukum positif).',
        'Walimah Wajib: KHI Pasal 63 — pencatatan nikah di KUA adalah kewajiban administrasi (nikah siri tidak diakui negara).'
      ],
      practice: 'Unduh buku KHI (tersedia gratis di Badilag.net) dan baca bab I tentang ketentuan umum perkawinan Islam.',
      source: quran('4/1')
    },
    {
      id: 'pernikahan-kua',
      title: 'Proses Pernikahan Resmi di KUA',
      category: 'Administrasi Nikah',
      summary: 'Langkah-langkah mengurus pernikahan di KUA: pendaftaran, pemeriksaan, kursus pra-nikah, akad, dan pencatatan.',
      points: [
        'Pendaftaran: H-10 hari sebelum akad ke KUA domisili calon pengantin perempuan.',
        'Dokumen: N1 (surat pengantar RT/RW), N2 (keterangan untuk nikah), N4 (iman orang tua), akte kelahiran, KTP, foto.',
        'Kursus Pra-Nikah: Wajib mengikuti bimbingan perkawinan 16 jam di KUA atau lembaga resmi (Permenag No.34/2016).',
        'Wali Nikah: Harus hadir secara fisik; jika berhalangan, bisa menggunakan wali hakim (taukil wali) dengan prosedur.',
        'Mahar: Harus disebutkan dalam akad; bisa dibayar tunai atau ditangguhkan; mahar sederhana lebih dianjurkan sunnah.'
      ],
      practice: 'Kunjungi situs SIMKAH (Sistem Informasi Manajemen Nikah) di simkah.kemenag.go.id untuk memulai pendaftaran online.',
      source: quran('4/4')
    },
    {
      id: 'itsbat-nikah',
      title: 'Itsbat Nikah: Legalisasi Nikah Siri',
      category: 'Administrasi Nikah',
      summary: 'Itsbat nikah adalah penetapan Pengadilan Agama untuk mengesahkan pernikahan yang belum tercatat secara resmi.',
      points: [
        'Definisi: Penetapan pengadilan agama bahwa suatu pernikahan siri atau adat telah memenuhi syarat sah nikah Islam.',
        'Syarat: Pernikahan harus sudah terjadi sebelum UU No.1/1974 berlaku, atau ada alasan khusus (anak, warisan).',
        'Manfaat: Untuk pengurusan akte kelahiran anak, akses layanan BPJS, hak waris, dan dokumen negara lainnya.',
        'Prosedur: Ajukan permohonan ke PA setempat → sidang → penetapan → terbitkan buku nikah dari KUA.',
        'Biaya: Relatif terjangkau; ada layanan pos bantuan hukum gratis (Posbakum) di setiap PA untuk yang tidak mampu.'
      ],
      practice: 'Jika ada keluarga yang menikah siri, bantu fasilitasi itsbat nikah di PA setempat untuk melindungi hak anak.',
      source: quran('4/21')
    },
    {
      id: 'cerai-pa',
      title: 'Perceraian di Pengadilan Agama',
      category: 'Perceraian',
      summary: 'Talak dan khuluk harus diucapkan di hadapan sidang PA; perceraian di luar PA tidak memiliki kekuatan hukum.',
      points: [
        'Prinsip: Talak di luar pengadilan agama (nikah siri) tidak diakui negara — anak dan istri tidak punya perlindungan hukum.',
        'Cerai Talak: Suami mengajukan permohonan ikrar talak ke PA; sidang mediasi dulu sebelum diizinkan bericara.',
        'Cerai Gugat: Istri mengajukan gugatan cerai jika suami melalaikan kewajiban, berbuat zhalim, atau tidak diketahui keberadaannya.',
        'Khuluk: Istri meminta cerai dengan mengembalikan mahar — boleh jika memang tidak sanggup hidup bersama.',
        'Hak Pasca Cerai: Mut\'ah (pemberian layak), iddah (nafkah selama masa tunggu), hak asuh anak.'
      ],
      practice: 'Jika ada konflik rumah tangga, manfaatkan mediasi PA atau BP4 (Badan Penasihat Perkawinan) sebelum ke jalur cerai.',
      source: quran('65/1')
    },
    {
      id: 'perlindungan-anak',
      title: 'Perlindungan Anak dalam Hukum Islam & Indonesia',
      category: 'Hak Anak',
      summary: 'Islam dan UU No.35/2014 sama-sama menekankan hak anak atas nasab, nafkah, pendidikan, dan perlindungan.',
      points: [
        'Nasab: Anak berhak atas nasab (keturunan) yang jelas; anak di luar nikah hanya dinasabkan ke ibu secara Islam.',
        'Nafkah Anak: Kewajiban ayah memberi nafkah anak berlangsung hingga anak mampu mandiri (atau menikah bagi perempuan).',
        'Hak Asuh (Hadhanah): Ibu lebih berhak mengasuh anak kecil (usia 7 tahun ke bawah); ayah berkewajiban membiayai.',
        'UU Perlindungan Anak: Larangan kekerasan, eksploitasi, dan perkawinan anak di bawah 19 tahun.',
        'Warisan Anak: Anak laki-laki mendapat dua bagian, perempuan satu bagian dari harta orang tua (QS. 4:11); anak luar nikah tidak waris dari ayah biologis.'
      ],
      practice: 'Buat dokumen sederhana (wasiat/testament) tentang rencana pengasuhan anak jika Anda berhalangan; konsultasikan ke notaris syariah.',
      source: quran('4/11')
    }
  ]
};

export const ekonomiSyariah: Course = {
  id: 'ekonomi-syariah',
  title: 'Ekonomi Syariah Kontemporer',
  description: 'Prinsip ekonomi Islam, perbankan syariah, asuransi takaful, pasar modal syariah, dan fintech halal.',
  note: 'Ekonomi syariah bukan sekadar menghindari riba, tetapi membangun sistem ekonomi yang adil dan bermaslahat.',
  lessons: [
    {
      id: 'prinsip-ekonomi-islam',
      title: 'Prinsip Dasar Ekonomi Islam',
      category: 'Dasar Ekonomi Syariah',
      summary: 'Ekonomi Islam berdiri di atas tauhid, keadilan, kebebasan bertanggung jawab, dan larangan riba-gharar-maisir.',
      points: [
        'Tauhid: Semua harta adalah milik Allah (QS. 24:33); manusia hanya khalifah/pemegang amanah — mendorong keadilan distribusi.',
        'Larangan Riba: "Allah menghalalkan jual beli dan mengharamkan riba" (QS. 2:275) — bunga bank konvensional termasuk riba.',
        'Larangan Gharar: Ketidakjelasan akad, objek, harga, atau waktu — seperti jual beli burung di udara atau ikan di air.',
        'Larangan Maisir: Judi dan spekulasi murni — kripto tanpa underlying asset nyata bisa masuk kategori ini.',
        'Zakat sebagai Redistribusi: Zakat adalah instrumen resmi redistributif; mencegah penumpukan modal pada segelintir orang.'
      ],
      practice: 'Audit rekening bank Anda: apakah konvensional atau syariah? Pelajari perbedaan akad wadiah, mudharabah, dan murabahah.',
      source: quran('2/275')
    },
    {
      id: 'perbankan-syariah',
      title: 'Perbankan Syariah di Indonesia',
      category: 'Lembaga Keuangan Syariah',
      summary: 'Bank syariah menggunakan akad mudharabah, murabahah, musyarakah, ijarah — tanpa bunga, tapi bagi hasil/margin.',
      points: [
        'BSI (Bank Syariah Indonesia): Merger BRI Syariah, BNI Syariah, Mandiri Syariah — bank syariah terbesar Asia Tenggara.',
        'Mudharabah: Bagi hasil — bank sebagai shahibul mal, nasabah/debitur sebagai mudharib; keuntungan dibagi sesuai nisbah.',
        'Murabahah: Jual beli dengan margin transparan — bank beli aset, jual ke nasabah dengan keuntungan yang disepakati.',
        'Musyarakah: Kemitraan modal — bank dan nasabah sama-sama menyetorkan modal; keuntungan dan kerugian dibagi.',
        'Pengawasan: Setiap bank syariah wajib memiliki DPS (Dewan Pengawas Syariah) yang diisi ulama bersertifikat DSN-MUI.'
      ],
      practice: 'Buka rekening di BSI atau bank syariah lain dengan akad wadiah (titipan) atau mudharabah (investasi) untuk mulai hijrah finansial.',
      source: quran('2/275')
    },
    {
      id: 'asuransi-takaful',
      title: 'Asuransi Syariah (Takaful)',
      category: 'Lembaga Keuangan Syariah',
      summary: 'Takaful berbasis saling menanggung (ta\'awun) dan dana hibah — berbeda dari asuransi konvensional yang mengandung unsur riba dan gharar.',
      points: [
        'Prinsip Ta\'awun: "Dan tolong-menolonglah kamu dalam kebajikan dan takwa" (QS. 5:2) — dasar filosofis takaful.',
        'Mekanisme: Peserta menghibahkan premi ke Dana Tabarru\'; jika ada klaim, dibayar dari dana kolektif ini.',
        'Perbedaan: Konvensional = kontrak jual beli risiko (gharar); Takaful = kontrak tolong-menolong dengan bagi hasil surplus.',
        'Produk: Takaful jiwa, takaful kesehatan, takaful kendaraan, takaful pembiayaan (MRTA syariah).',
        'Pemain: Allianz Syariah, Prudential Syariah, AIA Syariah, Bumiputera Syariah, Takaful Indonesia — cek DPS-nya.'
      ],
      practice: 'Jika punya asuransi konvensional, hubungi agen Anda untuk migrasi ke unit syariah — biasanya produk dan manfaat setara.',
      source: quran('5/2')
    },
    {
      id: 'pasar-modal-syariah',
      title: 'Pasar Modal Syariah & Saham Halal',
      category: 'Investasi Syariah',
      summary: 'Daftar Efek Syariah (DES) OJK memuat emiten yang sahamnya halal untuk diperjualbelikan oleh investor Muslim.',
      points: [
        'DES (Daftar Efek Syariah): Diterbitkan OJK setiap Mei dan November; memuat saham, sukuk, dan reksa dana syariah.',
        'Kriteria Halal Saham: Bidang usaha halal + rasio hutang berbasis bunga < 45% total aset + pendapatan non-halal < 10%.',
        'Sukuk Negara: Obligasi syariah pemerintah — instrumen investasi fixed income yang halal; diterbitkan Kemenkeu reguler.',
        'Reksa Dana Syariah: Dikelola manajer investasi dengan pengawasan DPS; portofolio hanya efek syariah.',
        'Fatwa DSN-MUI No.40: Membolehkan perdagangan efek yang memenuhi prinsip syariah di pasar modal.'
      ],
      practice: 'Buka akun di broker syariah (Mandiri Sekuritas Syariah, BNI Sekuritas Syariah) dan mulai investasi di saham-saham DES OJK.',
      source: quran('2/275')
    },
    {
      id: 'fintech-syariah',
      title: 'Fintech Syariah & Ekonomi Digital Islam',
      category: 'Ekonomi Digital',
      summary: 'Platform fintech syariah menawarkan P2P lending halal, crowdfunding syariah, dan dompet digital berbasis akad Islam.',
      points: [
        'P2P Lending Syariah: Platform pembiayaan berbasis akad mudharabah/musyarakah — terdaftar OJK & memiliki DPS (contoh: Ammana, Alami).',
        'Crowdfunding Syariah: Urun dana berbasis musyarakah atau qardh — cocok untuk UMKM dan startup halal.',
        'GoPay/OVO Syariah: Unit usaha syariah dompet digital — akad wadiah untuk saldo yang tersimpan.',
        'QRIS & Ekonomi Halal: Memudahkan transaksi halal; OJK mendorong merchant halal menggunakan sistem pembayaran syariah.',
        'Regtech Syariah: Teknologi kepatuhan syariah yang memantau portofolio investasi secara real-time terhadap kriteria DES.'
      ],
      practice: 'Coba investasi di fintech syariah terdaftar OJK dengan modal awal Rp 100.000; pelajari akad dan mekanisme bagi hasilnya.',
      source: quran('2/275')
    }
  ]
};

export const fiqhRamadan: Course = {
  id: 'fiqh-ramadan',
  title: 'Fiqh Ramadan Lengkap',
  description: 'Panduan lengkap ibadah Ramadan: puasa, tarawih, i\'tikaf, lailatul qadar, dan optimalisasi spiritual bulan mulia.',
  note: 'Ramadan adalah madrasah tahunan jiwa; setiap amalnya dilipatgandakan oleh Allah SWT.',
  lessons: [
    {
      id: 'keutamaan-ramadan',
      title: 'Keutamaan & Keistimewaan Ramadan',
      category: 'Ruh Ramadan',
      summary: 'Ramadan adalah bulan Al-Qur\'an, bulan ampunan, bulan pintu surga dibuka dan pintu neraka ditutup.',
      points: [
        'Bulan Al-Qur\'an: "Ramadan adalah bulan diturunkannya Al-Qur\'an sebagai petunjuk bagi manusia..." (QS. 2:185).',
        'Pintu Surga Dibuka: "Jika Ramadan tiba, pintu-pintu surga dibuka, pintu-pintu neraka ditutup, dan setan-setan dibelenggu." (HR. Bukhari-Muslim).',
        'Lailatul Qadar: Satu malam lebih baik dari 1000 bulan (QS. 97:3) — tanda kasih sayang Allah yang luar biasa.',
        'Ampunan Dosa: "Barangsiapa yang berpuasa Ramadan karena iman dan mengharap pahala dari Allah, niscaya diampuni dosa-dosanya yang telah lalu." (HR. Bukhari).',
        'Bulan Dermawan: Nabi SAW adalah orang paling dermawan, dan paling dermawan saat Ramadan bersama Jibril mengkaji Al-Qur\'an.'
      ],
      practice: 'Buat target Ramadan tahun ini: hafalan surat, khatam Al-Qur\'an, sedekah harian, dan konsistensi tarawih + witir.',
      source: quran('2/185')
    },
    {
      id: 'niat-sahur-buka',
      title: 'Niat, Sahur, Berbuka, & Hal yang Disunnahkan',
      category: 'Praktik Puasa',
      summary: 'Niat di malam hari, sahur sebelum subuh, dan berbuka segera saat adzan Maghrib adalah tiga sunnah utama puasa.',
      points: [
        'Niat: Wajib niat di malam hari (sebelum Subuh) untuk puasa wajib; boleh satu niat untuk sebulan penuh di awal Ramadan.',
        'Sahur: "Bersahurlah kalian, karena dalam sahur ada berkah." (HR. Bukhari-Muslim) — meski hanya seteguk air.',
        'Berbuka Segera: "Manusia senantiasa dalam kebaikan selama mereka menyegerakan berbuka." (HR. Bukhari-Muslim).',
        'Doa Berbuka: "Dzahabazh zhama\'u wabtallatil \'uruqu wa tsabatal ajru insyaallah." (HR. Abu Dawud).',
        'Memperbanyak Ibadah: Puasa bukan alasan malas — Nabi SAW dan sahabat justru lebih aktif ibadah, dakwah, dan jihad di Ramadan.'
      ],
      practice: 'Set alarm sahur 30 menit sebelum imsak; manfaatkan waktu setelah sahur hingga Subuh untuk tahajud dan Al-Qur\'an.',
      source: hadith(1923)
    },
    {
      id: 'pembatal-puasa',
      title: 'Pembatal Puasa & Hal yang Dibolehkan',
      category: 'Hukum Puasa',
      summary: 'Pembatal puasa: makan-minum disengaja, jima\', muntah disengaja, haid/nifas, dan riddah — suntikan & obat tetes ada perinciannya.',
      points: [
        'Pembatal Utama: Makan/minum sengaja, jima\' (hubungan intim), muntah disengaja, keluar mani dengan sengaja.',
        'Haid & Nifas: Puasanya batal; wajib qadha tanpa kaffarah setelah Ramadan.',
        'Suntikan: Suntikan vitamin/nutrisi lewat pembuluh darah membatalkan puasa (mayoritas ulama); suntikan IM/SC untuk obat tidak membatalkan.',
        'Obat Tetes: Tetes mata tidak membatalkan; tetes hidung/telinga → khilaf; tetes yang masuk ke tenggorokan membatalkan.',
        'Tidak Membatalkan: Makan/minum lupa (HR. Bukhari), mimpi basah, muntah tidak sengaja, donor darah (menurut mayoritas).'
      ],
      practice: 'Hafalkanlah: lupa makan/minum tidak membatalkan puasa — lanjutkan puasanya. Bagikan info ini ke keluarga.',
      source: hadith(1933)
    },
    {
      id: 'shalat-tarawih',
      title: 'Shalat Tarawih: Jumlah & Tata Cara',
      category: 'Ibadah Ramadan',
      summary: 'Tarawih 8 rakaat + 3 witir dan 20 rakaat + 3 witir keduanya shahih; yang penting khusyuk dan dikerjakan dengan ilmu.',
      points: [
        'Dasar: "Barangsiapa yang mendirikan shalat di bulan Ramadan karena iman dan mengharap pahala, diampuni dosa-dosanya yang lalu." (HR. Bukhari-Muslim).',
        '8 Rakaat: Dasarnya hadits Aisyah (HR. Muslim) — Nabi SAW shalat malam di Ramadan tidak melebihi 11 rakaat.',
        '20 Rakaat: Praktik Umar bin Khattab, Utsman, Ali, dan mayoritas sahabat di Madinah (HR. Baihaqi shahih).',
        'Tidak Perlu Bertengkar: Kedua pendapat shahih; ikuti imam masjid tempat Anda shalat untuk menjaga persatuan.',
        'Witir: Minimal 1 rakaat, maksimal 11 rakaat — tidak terputus antara tarawih dan witir jika dikerjakan bersama.'
      ],
      practice: 'Usahakan ikuti tarawih berjamaah di masjid minimal 15 hari berturut-turut; manfaatkan kultum singkat setelahnya.',
      source: hadith(2013)
    },
    {
      id: 'itikaf-lailatul-qadar',
      title: 'I\'tikaf & Mencari Lailatul Qadar',
      category: 'Ibadah Ramadan',
      summary: 'I\'tikaf di 10 malam terakhir Ramadan adalah sunnah muakkadah; Lailatul Qadar dicari pada malam-malam ganjil.',
      points: [
        'I\'tikaf: Berdiam diri di masjid dengan niat ibadah — sunnah muakkadah, terutama 10 hari terakhir Ramadan.',
        'Dasar I\'tikaf: "Nabi SAW selalu beri\'tikaf di 10 hari terakhir Ramadan hingga beliau wafat." (HR. Bukhari-Muslim).',
        'Larangan I\'tikaf: Keluar masjid tanpa kebutuhan mendesak, berjima\', dan terlalu banyak bicara yang tidak bermanfaat.',
        'Lailatul Qadar: "Carilah Lailatul Qadar pada malam-malam ganjil dari 10 malam terakhir Ramadan." (HR. Bukhari).',
        'Doa Lailatul Qadar: "Allahumma innaka \'afuwwun tuhibbul \'afwa fa\'fu \'anni." (HR. Tirmidzi — shahih).'
      ],
      practice: 'Rencanakan i\'tikaf minimal 3 malam (27, 29, terakhir Ramadan); bawa Al-Qur\'an, buku doa, dan daftar hajat.',
      source: hadith(2017)
    },
    {
      id: 'tadabbur-ramadan',
      title: 'Tadabbur Al-Qur\'an & Program Ramadan Produktif',
      category: 'Ruh Ramadan',
      summary: 'Ramadan adalah momen terbaik untuk khatam Al-Qur\'an, tadabbur mendalam, dan membangun kebiasaan Islami jangka panjang.',
      points: [
        'Target Khatam: 1 juz per hari = khatam dalam 30 hari; baca setelah setiap shalat fardhu (masing-masing 4-5 halaman).',
        'Tadabbur: Baca terjemah dan tafsir ringkas minimal 1 halaman per hari; catat ayat yang menggugah hati.',
        'Muhasabah Harian: Luangkan 10 menit sebelum tidur untuk muhasabah — apa dosa yang dilakukan, apa kebaikan yang terlewat.',
        'Program 30 Hari: Setiap hari punya target — hafalan doa, tadabbur ayat, sedekah, silaturahim, mengurangi maksiat.',
        'Pasca Ramadan: "Sebaik-baik manusia adalah yang tetap istiqamah beribadah setelah Ramadan sebagaimana ia di dalam Ramadan." (Pesan ulama salaf).'
      ],
      practice: 'Buat buku catatan Ramadan: tulis satu pelajaran dari Al-Qur\'an setiap hari, satu target amal, dan satu doa yang ingin dikabulkan.',
      source: quran('97/1')
    }
  ]
};

export const sharafDasar: Course = {
  id: 'sharaf-dasar',
  title: 'Ilmu Sharaf Dasar',
  description: 'Pelajari morfologi bahasa Arab: wazan fi\'il, tasrif istilahi & lughawi, isim fa\'il, isim maf\'ul, dan masdar.',
  note: 'Jika Nahwu adalah ayah ilmu bahasa Arab untuk membaca baris akhir, Sharaf adalah ibunya untuk memahami asal & pecahan makna kata.',
  lessons: [
    {
      id: 'pengantar-sharaf-wazan',
      title: 'Konsep Akar Kata & Wazan (Timbangan Kata)',
      category: 'Dasar Sharaf',
      summary: 'Mayoritas kata kerja Arab berakar dari 3 huruf (tsulatsi mujarrad) yang ditimbang dengan pola فَعَلَ (fa-\'a-la).',
      points: [
        'Akar Tiga Huruf: Hampir semua kata Arab dibangun dari 3 huruf konsonan utama, misalnya ك - ت - ب (k-t-b = menulis).',
        'Wazan فَعَلَ: Huruf pertama disebut Fa\' Fi\'il, kedua \'Ain Fi\'il, dan ketiga Lam Fi\'il.',
        'Contoh Pecahan: كَتَبَ (telah menulis), يَكْتُبُ (sedang menulis), كَاتِبٌ (penulis), مَكْتُوبٌ (yang ditulis), كِتَابٌ (buku).',
        'Enam Bab Tsulatsi Mujarrad: Dibedakan berdasarkan harakat \'Ain Fi\'il di bentuk lampau (madhi) dan sekarang (mudhari\').',
        'Manfaat Tadabbur: Mengenali akar kata membantu langsung menebak inti makna kata baru dalam Al-Qur\'an.'
      ],
      practice: 'Ambil akar kata ع - ل - م (\'a-l-m = tahu) lalu temukan minimal 4 kata turunannya dalam Al-Qur\'an (misal: \'alim, ya\'lamu, \'ilm, ma\'lum).',
      source: quran('12/2')
    },
    {
      id: 'tasrif-istilahi',
      title: 'Tasrif Istilahi: 10 Perubahan Bentuk Kata',
      category: 'Tasrif',
      summary: 'Tasrif istilahi mengubah satu akar kata menjadi berbagai fungsi makna: kata kerja, pelaku, objek, tempat, hingga alat.',
      points: [
        'Fi\'il Madhi (فَعَلَ): Kata kerja lampau (telah mengerjakan). Contoh: نَصَرَ (telah menolong).',
        'Fi\'il Mudhari\' (يَفْعُلُ): Kata kerja sedang/akan dikerjakan. Contoh: يَنْصُرُ (sedang menolong).',
        'Masdar (فَعْلًا): Kata benda abstrak/gerund. Contoh: نَصْرًا (pertolongan).',
        'Isim Fa\'il (فَاعِلٌ) & Isim Maf\'ul (مَفْعُولٌ): Pelaku (نَاصِرٌ = penolong) dan objek yang dikenai perbuatan (مَنْصُورٌ = yang ditolong).',
        'Fi\'il Amar & Nahyi: Kata perintah (اُنْصُرْ = tolonglah!) dan kata larangan (لَا تَنْصُرْ = jangan tolong!).',
        'Isim Zaman, Makan & Alat: Penunjuk waktu/tempat (مَفْعَلٌ = tempat/waktu) dan alat (مِفْعَلٌ / مِفْتَاحٌ = kunci).'
      ],
      practice: 'Hafalkan tasrif istilahi untuk pola فَعَلَ - يَفْعُلُ - فَعْلًا - فَاعِلٌ - مَفْعُولٌ - اُفْعُلْ - لَا تَفْعُلْ.',
      source: quran('110/1')
    },
    {
      id: 'tasrif-lughawi',
      title: 'Tasrif Lughawi: Perubahan Kata Berdasarkan Pelaku (Dhamir)',
      category: 'Tasrif',
      summary: 'Kata kerja Arab berubah akhiran atau awalannya mengikuti 14 kata ganti (orang ke-1, ke-2, ke-3; tunggal, ganda, jamak; laki-laki, perempuan).',
      points: [
        'Ghaib (Orang ke-3): هُوَ (dia lk), هُمَا (mereka berdua), هُمْ (mereka lk), هِيَ (dia pr), هُمَا, هُنَّ (mereka pr).',
        'Mukhathab (Orang ke-2): أَنْتَ (kamu lk), أَنْتُمَا, أَنْتُمْ (kalian lk), أَنْتِ (kamu pr), أَنْتُمَا, أَنْتُنَّ.',
        'Mutakallim (Orang ke-1): أَنَا (saya) dan نَحْنُ (kami/kita).',
        'Contoh Madhi (كَتَبَ): كَتَبَ (dia lk), كَتَبُوا (mereka lk), كَتَبَتْ (dia pr), كَتَبْتَ (kamu lk), كَتَبْتُ (saya), كَتَبْنَا (kami).',
        'Contoh Mudhari\' (يَكْتُبُ): تَكْتُبُ (kamu lk / dia pr), أَكْتُبُ (saya), نَكْتُبُ (kami).'
      ],
      practice: 'Perhatikan akhiran -تُمْ (-tum) dan -نَا (-na) saat membaca Al-Qur\'an untuk langsung tahu siapa pelakunya (kalian atau kami).',
      source: quran('2/183')
    },
    {
      id: 'fiil-mazid-makna',
      title: 'Tsulatsi Mazid (Kata Kerja Berimbuhan)',
      category: 'Pola Lanjutan',
      summary: 'Penambahan 1, 2, atau 3 huruf pada akar kata mengubah nuansa makna menjadi kausatif (membuat jadi), saling, atau meminta.',
      points: [
        'Wazan أَفْعَلَ (Af\'ala): Mengubah kata intransitif menjadi transitif/membuat jadi. Contoh: نَزَلَ (turun) → أَنْزَلَ (menurunkan).',
        'Wazan فَعَّلَ (Fa\'\'ala): Bermakna intensitas atau bertahap. Contoh: نَزَّلَ (menurunkan secara berangsur-angsur, QS. 3:3).',
        'Wazan فَاعَلَ (Fā\'ala): Bermakna saling berinteraksi antara dua pihak. Contoh: جَاهَدَ / قَاتَلَ (saling berjuang/berperang).',
        'Wazan تَفَعَّلَ & تَفَاعَلَ: Bermakna proses bertahap atau saling. Contoh: تَعَلَّمَ (belajar), تَعَاوَنُوا (saling menolong).',
        'Wazan اِسْتَفْعَلَ (Istaf\'ala): Bermakna memohon/meminta. Contoh: غَفَرَ (mengampuni) → اِسْتَغْفَرَ (memohon ampun).'
      ],
      practice: 'Bandingkan kata أَنْزَلَ dan نَزَّلَ di QS. Ali \'Imran: 3 untuk merasakan indahnya ketelitian makna Al-Qur\'an lewat Ilmu Sharaf.',
      source: quran('3/3')
    },
    {
      id: 'isim-musytaq',
      title: 'Mengenal Isim Musytaq (Kata Benda Turunan)',
      category: 'Morfologi Isim',
      summary: 'Kata benda turunan menyimpan informasi sifat pelaku, objek, perbandingan (superlatif), hingga bentuk mubalaghah (sangat).',
      points: [
        'Isim Fa\'il (فَاعِلٌ) & Isim Maf\'ul (مَفْعُولٌ): Contoh عَابِدٌ (orang yang beribadah) dan مَعْبُودٌ (yang disembah).',
        'Shighah Mubalaghah: Menunjukkan sifat yang sangat kuat/sering. Contoh: غَفَّارٌ (Maha Pengampun), رَحِيمٌ (Maha Penyayang), عَلِيمٌ (Maha Mengetahui).',
        'Isim Tafdhil (أَفْعَلُ): Menunjukkan makna "lebih" atau "paling". Contoh: أَكْبَرُ (Maha Besar / paling besar), أَحْسَنُ (paling baik).',
        'Isim Makan (مَفْعَلٌ / مَفْعِلٌ): Menunjukkan tempat. Contoh: سَجَدَ (sujud) → مَسْجِدٌ (tempat sujud/masjid).'
      ],
      practice: 'Saat mengucap "Allahu Akbar", sadari bahwa "Akbar" berpola أَفْعَلُ (Isim Tafdhil) yang berarti Allah Mahabesar di atas segalanya.',
      source: quran('95/4')
    }
  ]
};

export const tadabburJuzAmma: Course = {
  id: 'tadabbur-juz-amma',
  title: 'Tadabbur Juz \'Amma',
  description: 'Intisari tema, asbabun nuzul ringkas, dan pelajaran hidup dari surat-surat Juz \'Amma (An-Naba\' hingga An-Nas).',
  note: 'Juz \'Amma paling sering dibaca dalam shalat sehari-hari; memahami maknanya menghidupkan kekhusyukan shalat kita.',
  lessons: [
    {
      id: 'tema-besar-juz-amma',
      title: 'Peta Besar Juz \'Amma: Mengguncang Hati Tentang Akhirat',
      category: 'Pengantar',
      summary: 'Mayoritas surat Juz \'Amma adalah surat Makkiyah dengan ayat pendek, ritme kuat, fokus pada Tauhid, Hari Kiamat, dan penyucian jiwa.',
      points: [
        '37 Surat Pendek: Mulai dari QS. An-Naba\' (78) sampai QS. An-Nas (114).',
        'Karakteristik Makkiyah: Kalimat ringkas namun menggetarkan jiwa, banyak sumpah Allah atas fenomena alam (matahari, waktu dhuha, malam).',
        'Tema Sentral: Kepastian Hari Kiamat, pertanggungjawaban amal sekecil dzarrah, dan ketenangan jiwa bersama Allah.',
        'Tips Shalat Khusyuk: Pahami makna minimal 10 surat yang paling sering Anda baca saat shalat wajib & sunnah.'
      ],
      practice: 'Pilih 3 surat pendek yang biasa Anda baca dalam shalat hari ini, lalu baca terjemah dan intisari maknanya sebelum tidur.',
      source: quran('78/1')
    },
    {
      id: 'an-naba-hingga-al-ala',
      title: 'An-Naba\' hingga Al-A\'la: Kepastian Kiamat & Keagungan Pencipta',
      category: 'Bagian Awal Juz 30',
      summary: 'Surat-surat awal Juz \'Amma mengingatkan dahsyatnya hari kebangkitan, catatan amal oleh malaikat, dan kesucian jiwa.',
      points: [
        'An-Naba\' & An-Nazi\'at: Menjawab keraguan kaum musyrikin tentang hari kebangkitan dengan bukti penciptaan langit, gunung, dan tidur.',
        '\'Abasa: Teguran lembut Allah kepada Nabi SAW agar tidak mengabaikan orang fakir/buta (Ibnu Ummi Maktum) demi melayani pembesar Quraisy.',
        'Al-Infithar & Al-Muthaffifin: Malaikat Kiraman Katibin mencatat setiap perbuatan; ancaman keras bagi pelaku kecurangan timbangan & bisnis.',
        'Al-A\'la: Surat favorit Nabi SAW saat Shalat Jumat, Ied, dan Witir; penegasan "Sungguh beruntung orang yang menyucikan diri" (QS. 87:14).'
      ],
      practice: 'Hindari segala bentuk kecurangan kecil dalam kerja, waktu, maupun takaran sebagai pengamalan QS. Al-Muthaffifin.',
      source: quran('87/14')
    },
    {
      id: 'al-fajr-hingga-at-tin',
      title: 'Al-Fajr hingga At-Tin: Ujian Hidup, Harapan, & Kemuliaan Manusia',
      category: 'Bagian Tengah Juz 30',
      summary: 'Kelompok surat ini mengobati kesedihan jiwa, menuntun cara menyikapi ujian kelapangan/kesempitan, dan memuliakan anak yatim.',
      points: [
        'Al-Fajr: Meluruskan salah paham bahwa kekayaan = tanda dimuliakan Allah dan kesempitan = tanda dihinakan (QS. 89:15–16).',
        'Adh-Dhuha & Al-Insyirah: Surat pelipur lara saat Nabi SAW sedih; janji Allah "Sesungguhnya bersama kesulitan ada kemudahan" (QS. 94:5–6).',
        'Asy-Syams: Kunci keberhasilan hidup ada pada tazkiyatun nafs (QS. 91:9–10).',
        'At-Tin: Manusia diciptakan dalam bentuk terbaik (ahsani taqwim), namun bisa jatuh ke tempat serendah-rendahnya jika tanpa iman & amal shalih.'
      ],
      practice: 'Saat merasa tertekan atau overthinking, bacalah QS. Adh-Dhuha dan Al-Insyirah secara perlahan sambil merenungi artinya.',
      source: quran('94/5')
    },
    {
      id: 'al-alaq-hingga-al-humazah',
      title: 'Al-\'Alaq hingga Al-Humazah: Iqra\', Lailatul Qadar, & Timbangan Amal',
      category: 'Bagian Akhir Juz 30',
      summary: 'Wahyu pertama memerintahkan membaca dengan nama Tuhan, disusul kemuliaan Lailatul Qadar dan ketelitian hisab.',
      points: [
        'Al-\'Alaq: Wahyu pertama "Iqra\'" — memadukan ilmu pengetahuan dan tauhid, serta larangan sombong karena merasa serba cukup.',
        'Al-Qadr: Satu malam Lailatul Qadar lebih mulia daripada seribu bulan (± 83 tahun).',
        'Az-Zalzalah: Kebaikan dan keburukan seberat biji dzarrah pun akan diperlihatkan balasannya (QS. 99:7–8).',
        'Al-\'Ashr: Imam Syafi\'i berkata seandainya Allah hanya menurunkan surat ini, sudah cukup menjadi hujjah bagi manusia (iman, amal shalih, saling menasihati dalam kebenaran & kesabaran).'
      ],
      practice: 'Jangan pernah meremehkan kebaikan kecil (senyum, menyingkirkan duri, sedekah receh) karena QS. Az-Zalzalah menjamin semuanya dihitung.',
      source: quran('103/1')
    },
    {
      id: 'al-fil-hingga-an-nas',
      title: 'Al-Fil hingga Al-Mu\'awwidzat: Tauhid Murni & Benteng Perlindungan',
      category: 'Penutup Al-Qur\'an',
      summary: 'Surat-surat penutup Al-Qur\'an meneguhkan syukur nikmat, kemurnian tauhid (Al-Ikhlas), dan perlindungan dari kejahatan lahir-batin.',
      points: [
        'Quraisy & Al-Ma\'un: Ibadah shalat tidak boleh terpisah dari kepedulian sosial terhadap anak yatim dan fakir miskin.',
        'Al-Kafirun: Prinsip toleransi yang tegas — saling menghormati tanpa mencampuradukkan akidah (lakum dinukum waliyadin).',
        'Al-Ikhlas: Menyamai sepertiga Al-Qur\'an karena merangkum tauhid murni akan keesaan dan kesempurnaan Allah.',
        'Al-Falaq & An-Nas: Benteng perlindungan utama pagi, petang, dan sebelum tidur dari sihir, hasad, serta bisikan waswas setan.'
      ],
      practice: 'Rutinkan membaca Al-Ikhlas, Al-Falaq, dan An-Nas masing-masing 3x pada dzikir pagi, petang, dan sebelum tidur.',
      source: quran('112/1')
    }
  ]
};

export const fiqhHajiUmrah: Course = {
  id: 'fiqh-haji-umrah',
  title: 'Fiqh Haji & Umrah (Manasik Lengkap)',
  description: 'Panduan lengkap syarat, rukun, wajib haji & umrah, miqat, larangan ihram, dam, dan badal haji sesuai sunnah.',
  note: 'Ibadah haji dan umrah adalah perjalanan ruhani meneladani Nabi Ibrahim AS dan Rasulullah SAW; sahnya bergantung pada ilmu manasik.',
  lessons: [
    {
      id: 'syarat-rukun-wajib-haji',
      title: 'Membedakan Syarat, Rukun, dan Wajib Haji/Umrah',
      category: 'Dasar Manasik',
      summary: 'Rukun tidak bisa diganti dengan dam (membatalkan ibadah jika ditinggal); wajib haji tetap sah ibadahnya namun wajib membayar dam.',
      points: [
        'Syarat Wajib (Istitha\'ah): Islam, baligh, berakal, merdeka, dan mampu secara fisik, finansial, serta keamanan perjalanan (QS. 3:97).',
        'Rukun Haji (5/6): Ihram (niat), Wuquf di Arafah, Tawaf Ifadhah, Sa\'i, Tahallul (cukur), dan Tertib.',
        'Wajib Haji: Ihram dari Miqat, Mabit di Muzdalifah, Mabit di Mina, Melontar Jumrah, Tawaf Wada\', dan menjauhi larangan ihram.',
        'Rukun Umrah: Ihram dari Miqat, Tawaf, Sa\'i, Tahallul, dan Tertib (tanpa Wuquf di Arafah).'
      ],
      practice: 'Buat checklist pribadi yang membedakan mana Rukun (tak tergantikan) dan mana Wajib (kena dam jika terlewat) sebelum berangkat.',
      source: quran('3/97')
    },
    {
      id: 'jenis-haji-miqat',
      title: 'Tiga Jenis Pelaksanaan Haji & Batas Miqat',
      category: 'Persiapan Ihram',
      summary: 'Jamaah memilih Tamattu\', Ifrad, atau Qiran, dan wajib berniat ihram sebelum melewati batas wilayah Miqat Makani.',
      points: [
        'Haji Tamattu\' (paling banyak dipilih jamaah Indonesia): Umrah dahulu di bulan haji, tahallul, lalu berihram haji saat 8 Dzulhijjah (wajib bayar Dam Hadyu).',
        'Haji Ifrad: Mengerjakan haji saja terlebih dahulu, baru umrah setelahnya (tidak wajib dam).',
        'Haji Qiran: Menggabungkan niat haji dan umrah sekaligus dalam satu ihram (wajib bayar dam).',
        'Miqat Jamaah Indonesia: Yalamlam (jika langsung ke Jeddah/Makkah lewat udara) atau Bir Ali / Dzulhulaifah (jika dari Madinah).'
      ],
      practice: 'Bagi calon jamaah gelombang Madinah, siapkan kain ihram sejak di hotel Madinah agar siap berniat di Masjid Bir Ali.',
      source: hadith(1526)
    },
    {
      id: 'larangan-ihram-dam',
      title: 'Larangan Ihram & Ketentuan Dam (Denda)',
      category: 'Aturan Ihram',
      summary: 'Saat berihram, jamaah menanggalkan kemewahan duniawi dan menaati larangan khusus sebagai simbol kesetaraan di hadapan Allah.',
      points: [
        'Larangan Khusus Laki-laki: Memakai pakaian berjahit (yang membentuk lekuk tubuh) dan menutup kepala secara langsung.',
        'Larangan Khusus Perempuan: Memakai cadar/niqab dan sarung tangan.',
        'Larangan Umum: Memakai wewangian, memotong kuku/rambut, membunuh hewan buruan, akad nikah, berjima\', serta bertengkar/berkata kotor (QS. 2:197).',
        'Dam Tamattu\'/Qiran: Menyembelih 1 ekor kambing; jika tidak mampu, berpuasa 10 hari (3 hari di Tanah Suci, 7 hari setelah pulang ke tanah air).'
      ],
      practice: 'Siapkan sabun/pelembap tanpa parfum selama ihram agar tidak tanpa sengaja melanggar larangan wewangian.',
      source: quran('2/197')
    },
    {
      id: 'rangkaian-puncak-haji',
      title: 'Rangkaian Puncak Haji: 8–13 Dzulhijjah',
      category: 'Puncak Ibadah',
      summary: 'Dari Tarwiyah di Mina, puncak Wuquf di Arafah, Mabit di Muzdalifah, hingga Lempar Jumrah dan Tawaf Ifadhah.',
      points: [
        '8 Dzulhijjah (Tarwiyah): Berihram haji dan menuju Mina untuk bermalam (sunnah).',
        '9 Dzulhijjah (Wuquf di Arafah): Puncak haji ("Al-Hajju \'Arafah" — HR. Tirmidzi). Memperbanyak dzikir, doa, dan istighfar sejak tergelincir matahari hingga Maghrib.',
        'Malam 10 Dzulhijjah (Muzdalifah): Mabit dan mengumpulkan kerikil untuk melontar jumrah.',
        '10 Dzulhijjah (Hari Nahr): Melontar Jumrah Aqabah (7 kerikil), menyembelih hadyu, tahallul awal (cukur rambut), lalu Tawaf Ifadhah & Sa\'i.',
        '11–13 Dzulhijjah (Hari Tasyrik): Mabit di Mina dan melontar 3 Jumrah (Ula, Wustha, Aqabah) masing-masing 7 kerikil; boleh Nafar Awal (12) atau Nafar Tsani (13).'
      ],
      practice: 'Siapkan daftar doa pribadi untuk dipanjatkan saat Wuquf di Arafah, karena doa hari Arafah adalah sebaik-baik doa.',
      source: hadith(1526)
    },
    {
      id: 'badal-haji-umrah-sunnah',
      title: 'Badal Haji, Haji Mabrur, & Adab Ziarah Madinah',
      category: 'Penyempurnaan',
      summary: 'Menghajikan orang tua yang wafat atau uzur tetap diperbolehkan, dan kemabruran haji tampak dari akhlak setelah pulang.',
      points: [
        'Syarat Badal Haji: Orang yang membadalkan harus sudah pernah menunaikan haji untuk dirinya sendiri terlebih dahulu (HR. Abu Dawud).',
        'Siapa yang Boleh Dibadalkan: Orang yang sudah wafat (dan sempat berniat/mampu) atau orang tua renta/sakit permanen yang mustahil bepergian.',
        'Tawaf Wada\': Tawaf perpisahan wajib sebelum meninggalkan Makkah (kecuali wanita haid/nifas mendapat keringanan).',
        'Ziarah Nabawi: Berziarah ke Masjid Nabawi Madinah dan mengucapkan salam di makam Nabi SAW, Abu Bakar, dan Umar dengan penuh adab tanpa perbuatan syirik.'
      ],
      practice: 'Jaga lisan, kesabaran, dan kedermawanan selama manasik maupun sepulangnya ke tanah air sebagai tanda haji mabrur.',
      source: hadith(1521)
    }
  ]
};

export const fiqhQurbanAqiqah: Course = {
  id: 'fiqh-qurban-aqiqah',
  title: 'Fiqh Qurban & Aqiqah',
  description: 'Syarat sah hewan qurban & aqiqah, waktu penyembelihan, aturan pembagian daging, dan hukum qurban patungan.',
  note: 'Menumpahkan darah hewan qurban dengan ikhlas adalah simbol ketaatan total meneladani Nabi Ibrahim AS dan Ismail AS.',
  lessons: [
    {
      id: 'hukum-keutamaan-qurban',
      title: 'Hukum, Waktu, & Keutamaan Qurban (Udhiyah)',
      category: 'Qurban',
      summary: 'Qurban berhukum sunnah muakkadah bagi yang mampu (wajib menurut Hanafiyah), disembelih pada 10–13 Dzulhijjah.',
      points: [
        'Dalil Utama: QS. Al-Kautsar: 2 — "Maka dirikanlah shalat karena Tuhanmu dan berqurbanlah."',
        'Waktu Sah: Dimulai setelah selesai Shalat Idul Adha (10 Dzulhijjah) hingga terbenam matahari 13 Dzulhijjah (Hari Tasyrik).',
        'Menyembelih Sebelum Shalat Ied: Tidak terhitung qurban, hanya menjadi sedekah daging biasa (HR. Bukhari).',
        'Sunnah Bagi Shohibul Qurban: Disunnahkan tidak memotong kuku dan rambut sejak 1 Dzulhijjah hingga hewan disembelih (HR. Muslim).'
      ],
      practice: 'Niatkan menyisihkan tabungan qurban bulanan sejak awal tahun Hijriah agar ringan saat Dzulhijjah tiba.',
      source: quran('108/2')
    },
    {
      id: 'syarat-hewan-patungan',
      title: 'Syarat Sah Hewan, Umur Minimal, & Patungan',
      category: 'Qurban',
      summary: 'Hewan harus cukup umur, sehat tanpa cacat yang mengurangi daging, dan patungan maksimal 7 orang hanya untuk sapi/unta.',
      points: [
        'Jenis & Umur Minimal: Domba (≥ 1 tahun / sudah tanggal gigi seri), Kambing kacang (≥ 2 tahun), Sapi/Kerbau (≥ 2 tahun), Unta (≥ 5 tahun).',
        '4 Cacat yang Tidak Sah (HR. Tirmidzi): Buta jelas, sakit parah, pincang parah, dan kurus kering tak bersumsum.',
        'Aturan Patungan: 1 kambing/domba untuk 1 orang (pahalanya boleh diniatkan untuk sekeluarga serumah). 1 sapi/unta boleh patungan maksimal 7 orang.',
        'Arisan Qurban: Dibolehkan selama akadnya jelas sebagai tabungan/utang yang halal tanpa unsur spekulasi atau penipuan.'
      ],
      practice: 'Periksa gigi dan kondisi fisik hewan secara langsung atau melalui lembaga penyalur amanah sebelum membeli.',
      source: hadith(1960)
    },
    {
      id: 'pembagian-daging-kulit',
      title: 'Tata Cara Penyembelihan & Pembagian Daging',
      category: 'Qurban',
      summary: 'Hewan disembelih dengan pisau tajam menghadap kiblat sambil membaca Bismillah; daging tidak boleh dijadikan upah jagal.',
      points: [
        'Adab Menyembelih: Menajamkan pisau di luar pandangan hewan, membaringkan di sisi kiri, membaca "Bismillahi Allahu Akbar", dan memutus saluran napas & makan.',
        'Pembagian Daging: Dianjurkan dibagi 3 bagian — 1/3 untuk shohibul qurban & keluarga, 1/3 dihadiahkan (kerabat/tetangga), 1/3 disedekahkan ke fakir miskin.',
        'Larangan Upah dari Bagian Hewan: Haram memberi upah tukang potong dari daging atau kulit qurban (HR. Bukhari-Muslim); upah wajib dibayar uang terpisah.',
        'Qurban Online / Luar Daerah: Sah secara fikih melalui akad wakalah (perwakilan) ke lembaga tepercaya untuk didistribusikan ke wilayah rawan pangan.'
      ],
      practice: 'Pastikan panitia qurban di lingkungan Anda menyiapkan anggaran upah jagal terpisah dan tidak menjual kulit untuk upah.',
      source: hadith(1960)
    },
    {
      id: 'fiqh-aqiqah-anak',
      title: 'Fiqh Aqiqah & Penyambutan Kelahiran Anak',
      category: 'Aqiqah',
      summary: 'Aqiqah adalah sembelihan rasa syukur kelahiran anak: 2 kambing untuk laki-laki dan 1 kambing untuk perempuan.',
      points: [
        'Hukum & Waktu Utama: Sunnah muakkadah bagi orang tua yang mampu; waktu terbaik hari ke-7 kelahiran (bisa hari ke-14, ke-21, atau kapan pun mampu).',
        'Jumlah Hewan: 2 ekor kambing setara untuk bayi laki-laki, dan 1 ekor kambing untuk bayi perempuan (HR. Abu Dawud).',
        'Rangkaian Sunnah Hari ke-7: Menyembelih aqiqah, mencukur rambut bayi lalu bersedekah perak/uang seberat rambutnya, dan memberi nama yang baik.',
        'Penyajian Daging: Berbeda dengan qurban yang lebih utama dibagikan mentah, daging aqiqah lebih utama dimasak terlebih dahulu lalu dibagikan atau dihidangkan.'
      ],
      practice: 'Jika saat kecil belum diaqiqahkan oleh orang tua, sebagian ulama (seperti Hasan Al-Bashri & Ahmad) membolehkan seseorang mengaqiqahkan dirinya sendiri saat dewasa.',
      source: hadith(1960)
    }
  ]
};

export const psikologiIslam: Course = {
  id: 'psikologi-islam',
  title: 'Psikologi Islam & Kesehatan Mental',
  description: 'Mengenal struktur jiwa dalam Islam (nafs, qalb, ruh, aql) serta cara mengatasi cemas, stres, dan kesedihan.',
  note: 'Islam tidak mengabaikan luka batin; Al-Qur\'an adalah syifa\' (penawar) bagi penyakit yang ada di dalam dada (QS. Yunus: 57).',
  lessons: [
    {
      id: 'struktur-jiwa-islam',
      title: 'Anatomi Jiwa Manusia: Qalb, Nafs, \'Aql, & Ruh',
      category: 'Konsep Jiwa',
      summary: 'Psikologi Islam memandang manusia secara utuh: jasmani, akal, qalb (pusat emosi & iman), serta ruh yang terhubung kepada Allah.',
      points: [
        'Qalb (Hati/Kalbu): Pusat kesadaran spiritual dan emosional; bisa sehat (qalbun salim), sakit, atau berkarat.',
        'Nafs (Jiwa/Ego): Memiliki tiga tingkat — Nafs Ammarah (mendorong keburukan), Lawwamah (menyesali salah), dan Muthmainnah (jiwa yang tenang).',
        '\'Aql (Akal): Alat menimbang, memahami realitas, dan menahan diri dari impuls merusak.',
        'Ruh: Unsur ilahiyah yang membutuhkan asupan dzikir, ibadah, dan tujuan hidup yang bermakna.'
      ],
      practice: 'Saat emosi memuncak, latih jeda 10 detik untuk bertanya: apakah respon ini datang dari nafs ammarah atau akal & kalbu yang tenang?',
      source: quran('89/27')
    },
    {
      id: 'mengatasi-cemas-overthinking',
      title: 'Terapi Al-Qur\'an Mengatasi Cemas (Anxiety) & Overthinking',
      category: 'Kesehatan Mental',
      summary: 'Kecemasan lahir dari takut masa depan dan sesal masa lalu; Islam menawarkannya obat tawakal, qana\'ah, dan dzikir.',
      points: [
        'Pemetaan Abu Zayd al-Balkhi (Abad ke-9 M): Ilmuwan Muslim ini sudah membedakan stres fisik dan gangguan kejiwaan (al-huzn wal-faza\') 1000 tahun sebelum psikologi modern.',
        'Bedakan Wilayah Ikhtiar & Takdir: Manusia hanya dituntut memaksimalkan ikhtiar; hasil akhir diserahkan penuh kepada Allah (tawakal).',
        'Doa Nabawi Anti-Cemas: "Allahumma inni a\'udzu bika minal hammi wal hazan..." (berlindung dari cemas masa depan & sedih masa lalu — HR. Bukhari).',
        'Ketenangan Lewat Dzikir: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenang" (QS. Ar-Ra\'d: 28).'
      ],
      practice: 'Tulis satu hal yang sedang Anda cemaskan hari ini; pisahkan kolom "Bisa Saya Kendalikan" dan "Saya Serahkan ke Allah".',
      source: quran('13/28')
    },
    {
      id: 'berdamai-dengan-kesedihan',
      title: 'Berdamai dengan Luka, Duka, & Kesedihan',
      category: 'Kesehatan Mental',
      summary: 'Menangis dan bersedih itu manusiawi—Nabi SAW pun menangis saat wafat putra beliau—selama tidak berputus asa dari rahmat Allah.',
      points: [
        'Validasi Emosi: Saat Ibrahim (putra Nabi SAW) wafat, mata beliau meneteskan air mata sambil berkata: "Hati bersedih, mata menangis, namun kami hanya mengucap yang diridhai Allah" (HR. Bukhari).',
        'Larangan Putus Asa: Kesedihan tidak sama dengan keputusasaan; rahmat Allah selalu lebih luas dari dosa dan ujian.',
        'Curhat kepada Allah (Baths & Huzn): Meneladani Nabi Ya\'qub AS — "Sesungguhnya hanya kepada Allah aku mengadukan kesusahan dan kesedihanku" (QS. 12:86).',
        'Ikhtiar Medis & Psikolog: Mengonsumsi obat atau berkonsultasi ke psikolog/psikiater saat mengalami depresi klinis termasuk ikhtiar berobat yang dianjurkan syariat.'
      ],
      practice: 'Hilangkan stigma bahwa depresi berarti kurang iman; dukung teman yang sedang berjuang menjaga kesehatan mentalnya dengan empati.',
      source: quran('12/86')
    },
    {
      id: 'membangun-resiliensi-syukur',
      title: 'Resiliensi Spiritual: Sabar, Syukur, & Memaafkan',
      category: 'Terapi Positif',
      summary: 'Orang beriman memiliki ketahanan mental unik: bersyukur saat lapang dan bersabar saat diuji, keduanya bernilai kebaikan.',
      points: [
        'Hadits Keajaiban Mukmin (HR. Muslim): Semua urusannya baik — mendapat nikmat lalu bersyukur, mendapat musibah lalu bersabar.',
        'Journaling Syukur: Menghitung nikmat kecil (nafas, sehat, iman) terbukti menumbuhkan optimisme psikologis.',
        'Terapi Pemaafan (\'Afw): Memaafkan bukan membenarkan kezaliman, melainkan melepaskan racun dendam dari dada kita sendiri (QS. 42:40).',
        'Kualitas Tidur & Ritual Malam: Wudhu sebelum tidur, membaca ayat kursi, dan melepaskan beban harian membantu sistem saraf beristirahat.'
      ],
      practice: 'Sebelum tidur malam ini, catat 3 hal kecil yang patut Anda syukuri hari ini dan maafkan satu kesalahan orang lain demi ketenangan hati.',
      source: quran('42/40')
    }
  ]
};

export const imamMadzhab: Course = {
  id: 'imam-madzhab',
  title: 'Biografi 4 Imam Madzhab & Ulama Besar',
  description: 'Perjalanan hidup, metode ijtihad, dan kitab utama Imam Abu Hanifah, Malik, Syafi\'i, Ahmad, serta ulama Nusantara.',
  note: 'Para imam madzhab saling menghormati, berguru satu sama lain, dan tidak pernah mengklaim diri paling benar mutlak.',
  lessons: [
    {
      id: 'imam-abu-hanifah',
      title: 'Imam Abu Hanifah (80–150 H): Sang Ahli Ra\'yi & Pedagang Amanah',
      category: '4 Imam Madzhab',
      summary: 'Pendiri Madzhab Hanafi di Kufah; cerdas dalam analogi hukum (qiyas) dan istihsan, serta teguh menjaga integritas dari jabatan politik.',
      points: [
        'Profil: Nu\'man bin Tsabit, lahir di Kufah (Irak); seorang saudagar kain sutra yang sangat jujur dan dermawan.',
        'Metode Ijtihad: Al-Qur\'an, Sunnah, Fatwa Sahabat, Qiyas, Istihsan (kemaslahatan lebih kuat), dan \'Urf (adat yang baik).',
        'Karya & Murid: Pemikirannya dibukukan oleh dua murid utamanya — Imam Abu Yusuf dan Imam Muhammad asy-Syaibani (Kitab Al-Mabsuth).',
        'Integritas: Menolak jabatan hakim agung demi menjaga independensi fatwa meski harus dipenjara hingga wafat.'
      ],
      practice: 'Teladani etika bisnis Imam Abu Hanifah: jika barang dagangan ada cacat kecil, wajib diungkap sebelum akad.',
      source: quran('16/43')
    },
    {
      id: 'imam-malik',
      title: 'Imam Malik bin Anas (93–179 H): Imam Darul Hijrah di Madinah',
      category: '4 Imam Madzhab',
      summary: 'Pendiri Madzhab Maliki; sangat memuliakan hadits Nabi SAW dan tradisi ulama penduduk Madinah (\'Amal Ahlil Madinah).',
      points: [
        'Profil: Menetap seumur hidup di Madinah; tidak pernah menunggang hewan di kota Madinah karena menghormati jasad Rasulullah SAW.',
        'Kitab Agung Al-Muwaththa\': Salah satu kitab hadits dan fikih tertua yang masih lestari hingga hari ini.',
        'Metode Ijtihad: Memberi bobot tinggi pada praktik kolektif penduduk Madinah dan prinsip Maslahah Mursalah (kemaslahatan umum).',
        'Keteguhan: Pernah dicambuk penguasa karena mempertahankan fatwa bahwa talak karena paksaan tidak sah.'
      ],
      practice: 'Tirulah adab Imam Malik: selalu bersuci dan berpenampilan rapi sebelum mempelajari atau membacakan hadits Nabi SAW.',
      source: hadith(1631)
    },
    {
      id: 'imam-syafii',
      title: 'Imam Asy-Syafi\'i (150–204 H): Peletak Batu Pertama Ushul Fiqh',
      category: '4 Imam Madzhab',
      summary: 'Murid Imam Malik sekaligus guru Imam Ahmad; memadukan metode ahli hadits Madinah dan ahli ra\'yi Irak dalam madzhab Syafi\'i.',
      points: [
        'Profil: Muhammad bin Idris asy-Syafi\'i; hafal Al-Qur\'an usia 7 tahun dan hafal Al-Muwaththa\' usia 10 tahun; banyak dianut di Asia Tenggara termasuk Indonesia.',
        'Karya Monumental: Ar-Risalah (kitab Ushul Fiqh pertama di dunia) dan Al-Umm (ensiklopedia fikih).',
        'Qaul Qadim & Qaul Jadid: Beliau merevisi fatwa lamanya (Irak) setelah pindah ke Mesir dan menemukan dalil/konteks baru — teladan kelapangan ilmiah.',
        'Nasihat Emas: "Pendapatku benar namun berpotensi salah, pendapat selainku salah namun berpotensi benar."'
      ],
      practice: 'Biasakan sikap ilmiah Imam Syafi\'i: siap merevisi pendapat lama jika menemukan dalil yang lebih kuat.',
      source: quran('39/18')
    },
    {
      id: 'imam-ahmad-hanbal',
      title: 'Imam Ahmad bin Hanbal (164–241 H): Penjaga Sunnah & Kitab Al-Musnad',
      category: '4 Imam Madzhab',
      summary: 'Pendiri Madzhab Hanbali; ahli hadits besar yang menghafal ratusan ribu riwayat dan tabah menghadapi fitnah Khalqul Qur\'an.',
      points: [
        'Profil: Lahir di Baghdad; menempuh perjalanan jauh ke berbagai negeri demi mengumpulkan hadits shahih.',
        'Kitab Al-Musnad: Memuat sekitar 27.000–30.000 hadits yang menjadi salah satu referensi hadits terbesar umat Islam.',
        'Prinsip Fikih: Berpegang ketat pada nash Al-Qur\'an dan hadits; dalam bab muamalah sangat luas (hukum asal muamalah adalah mubah sampai ada dalil larangan).',
        'Keteguhan Iman: Disiksa dan dipenjara saat peristiwa Mihnah demi mempertahankan akidah Ahlussunnah bahwa Al-Qur\'an adalah Kalamullah.'
      ],
      practice: 'Pelajari satu hadits beserta maknanya setiap pekan sebagai bentuk cinta pada warisan ilmu para ahli hadits.',
      source: hadith(1631)
    },
    {
      id: 'ulama-nusantara',
      title: 'Jejak Ulama Nusantara di Panggung Dunia',
      category: 'Ulama Nusantara',
      summary: 'Ulama Nusantara seperti Syekh Nawawi al-Bantani, Syekh Ahmad Khatib al-Minangkabawi, hingga pendiri ormas Islam mewarisi sanad keilmuan global.',
      points: [
        'Syekh Nawawi al-Bantani (1813–1897): Dijuluki Sayyid Ulama al-Hijaz; menulis lebih dari 100 kitab berbahasa Arab termasuk Tafsir Marah Labid.',
        'Syekh Mahfudz at-Tarmasi & Syekh Yasin al-Fadani: Raksasa ilmu hadits dan sanad keilmuan dari Nusantara yang diakui di Makkah.',
        'KH. Hasyim Asy\'ari & KH. Ahmad Dahlan: Sama-sama murid Syekh Ahmad Khatib al-Minangkabawi; berjuang mendidik umat lewat NU dan Muhammadiyah.',
        'Semangat Persatuan: Perbedaan organisasi dan metode dakwah tidak menghalangi ukhuwah dalam memajukan bangsa.'
      ],
      practice: 'Kenali sejarah dan karya salah satu ulama daerah Anda untuk menumbuhkan rasa syukur atas estafet dakwah di Indonesia.',
      source: quran('58/11')
    }
  ]
};

export const fiqhKontemporer: Course = {
  id: 'fiqh-kontemporer',
  title: 'Fiqh Kontemporer & Fatwa Modern',
  description: 'Hukum paylater, dropship & affiliate, donor organ, hak cipta digital, hingga etika penggunaan AI dalam Islam.',
  note: 'Syariat Islam selalu hidup dan relevan menjawab persoalan zaman lewat ijtihad jama\'i (kolektif) para ulama ahli.',
  lessons: [
    {
      id: 'paylater-cicilan-digital',
      title: 'Hukum PayLater, Kartu Kredit, & Cicilan Online',
      category: 'Muamalah Digital',
      summary: 'Utang yang mensyaratkan tambahan bunga atau denda keterlambatan yang menjadi pendapatan pemberi pinjaman termasuk riba.',
      points: [
        'Prinsip Riba Qardh: "Setiap piutang yang menarik manfaat/tambahan (yang disyaratkan di awal) adalah riba."',
        'PayLater Konvensional: Umumnya mengenakan bunga cicilan atau biaya layanan persentase atas pinjaman serta denda keterlambatan — tidak sesuai syariah.',
        'Jual Beli Kredit (Murabahah) vs Pinjaman: Penjual menjual barang secara kredit dengan harga lebih tinggi dari tunai boleh jika disepakati di awal tanpa bunga majemuk; beda dengan aplikasi pinjaman pihak ketiga berbunga.',
        'Alternatif Halal: Gunakan metode bayar tunai, tabungan terencana, atau pembiayaan syariah yang terdaftar DSN-MUI.'
      ],
      practice: 'Periksa fitur pembayaran otomatis di aplikasi belanja Anda; nonaktifkan PayLater berbunga agar terhindar dari transaksi riba.',
      source: quran('2/275')
    },
    {
      id: 'dropship-affiliate',
      title: 'Hukum Dropship, Reseller, & Program Affiliate',
      category: 'Bisnis Online',
      summary: 'Menjual barang yang belum dimiliki terlarang kecuali melalui akad yang benar seperti Wakalah (perwakilan) atau Salam (pesanan).',
      points: [
        'Larangan Dasar: Nabi SAW melarang menjual barang yang belum berada dalam kepemilikan/penguasaan penjual (HR. Abu Dawud).',
        'Solusi Dropship Halal: Gunakan akad Wakalah bil Ujrah (menjadi agen/perwakilan resmi supplier dengan izin jual) atau beli dulu baru jual.',
        'Program Affiliate: Sah dan halal (akad Samsarah/makelar atau Ju\'alah/sayembara) selama produk yang dipromosikan halal dan promosinya jujur tanpa klaim palsu.',
        'Fake Order / Review Palsu: Memesan fiktif atau membayar ulasan palsu untuk menaikkan rating hukumnya haram karena mengandung penipuan (ghisy).'
      ],
      practice: 'Jika berjualan sistem dropship, pastikan Anda sudah mendapat izin resmi dari pemilik stok dan menjelaskan estimasi pengiriman dengan jujur.',
      source: hadith(2072)
    },
    {
      id: 'donor-organ-bioteknologi',
      title: 'Donor Organ, Transfusi Darah, & Bioteknologi Medis',
      category: 'Fiqh Medis Modern',
      summary: 'Mayoritas ulama dan MUI membolehkan donor darah serta donor organ (dalam kondisi darurat menyelamatkan nyawa) tanpa diperjualbelikan.',
      points: [
        'Transfusi Darah: Mubah bahkan berpahala besar karena menyelamatkan nyawa manusia (QS. Al-Ma\'idah: 32).',
        'Donor Organ Saat Hidup: Boleh untuk organ yang bisa beregenerasi atau berpasangan (misal sebagian hati atau satu ginjal) selama tidak membahayakan nyawa pendonor.',
        'Donor Setelah Wafat: Boleh berdasarkan wasiat sah sebelumnya atau izin ahli waris jika sangat mendesak menyelamatkan nyawa pasien lain (Fatwa MUI).',
        'Larangan Komersialisasi: Tubuh manusia bukan komoditas; jual beli organ tubuh hukumnya haram mutlak.'
      ],
      practice: 'Ikutlah kegiatan donor darah berkala sebagai sedekah nyawa yang nyata bagi sesama.',
      source: quran('5/32')
    },
    {
      id: 'hak-cipta-pembajakan',
      title: 'Hak Cipta Digital, Pembajakan Software, & Konten',
      category: 'Etika Digital',
      summary: 'Fatwa MUI dan Majma\' Fiqh Islami menetapkan bahwa hak cipta adalah harta bernilai (mal) yang wajib dilindungi; membajaknya termasuk mencuri.',
      points: [
        'Status Hak Cipta: Karya tulis, software, desain, dan video termasuk Haq Ibtikar (hak kekayaan intelektual) yang dilindungi syariat (Fatwa MUI No. 1/2003).',
        'Software/Film Bajakan: Mengunduh, memakai untuk komersial, atau memperjualbelikan crack/bajakan tanpa izin pemilik hak cipta adalah perbuatan zalim.',
        'Alternatif Legal: Manfaatkan software open-source gratis (Linux, LibreOffice, GIMP, dll) atau versi free/lisensi resmi.',
        'Plagiarisme Karya Ilmiah: Mengakui karya orang lain sebagai milik sendiri dilarang keras dan merusak keberkahan ilmu.'
      ],
      practice: 'Mulai ganti aplikasi bajakan di perangkat Anda dengan software gratis/open-source atau berlangganan lisensi resmi yang terjangkau.',
      source: quran('4/29')
    },
    {
      id: 'etika-ai-islam',
      title: 'Etika Penggunaan AI (Kecerdasan Buatan) dalam Islam',
      category: 'Teknologi Masa Depan',
      summary: 'AI adalah alat bantu (wasilah); hukumnya mengikuti niat, input data, kejujuran atribusi, dan dampak kemaslahatannya.',
      points: [
        'Alat Bantu, Bukan Pengganti Ulama: Untuk fatwa agama, AI hanya membantu mencari referensi awal; verifikasi hukum tetap merujuk Al-Qur\'an, Hadits shahih, dan ulama.',
        'Larangan Deepfake & Hoaks: Menggunakan AI untuk memalsukan suara/wajah orang lain guna menipu atau memfitnah termasuk dosa besar kebohongan.',
        'Kejujuran Akademik & Kerja: Mengklaim tulisan penuh hasil AI sebagai karya pribadi tanpa transparansi melanggar etika amanah.',
        'Pemanfaatan Maslahah: Mengembangkan AI untuk akses Al-Qur\'an, dakwah, pendidikan, dan medis bernilai amal jariyah.'
      ],
      practice: 'Selalu cek ulang dalil ayat atau nomor hadits yang diberikan AI langsung ke mushaf dan kitab hadits terpercaya.',
      source: quran('49/6')
    }
  ]
};

export const ilmuQiraat: Course = {
  id: 'ilmu-qiraat',
  title: 'Ilmu Qira\'at & Sejarah Mushaf',
  description: 'Mengenal 7 & 10 Qira\'at mutawatir, sejarah penulisan Mushaf Utsmani, serta rasm dan tanda waqaf.',
  note: 'Keragaman qira\'at yang mutawatir bukan pertentangan, melainkan rahmat Allah yang memperkaya makna dan memudahkan lisan umat.',
  lessons: [
    {
      id: 'sabatu-ahruf-qiraat',
      title: 'Hadits Sab\'atu Ahruf & Pengertian Ilmu Qira\'at',
      category: 'Dasar Qira\'at',
      summary: 'Rasulullah SAW bersabda Al-Qur\'an diturunkan atas tujuh huruf (dialek/ragam bacaan) untuk memberi kemudahan bagi umat Islam.',
      points: [
        'Hadits Shahih (HR. Bukhari-Muslim): Nabi SAW mengonfirmasi bacaan Umar bin Khattab dan Hisyam bin Hakim yang berbeda dialek sama-sama benar sesuai turunnya wahyu.',
        'Definisi Qira\'at: Ragam tata cara pelafalan kalimat Al-Qur\'an yang bersanad mutawatir hingga Rasulullah SAW.',
        'Tiga Syarat Qira\'at Shahih: Sesuai kaidah bahasa Arab, sesuai dengan tulisan Mushaf Utsmani (secara rasm), dan memiliki sanad yang mutawatir.',
        'Bukan Karangan Pribadi: Perbedaan qira\'at murni bersumber dari talaqqi (wahyu langsung), bukan ijtihad atau tebakan.'
      ],
      practice: 'Pahami bahwa perbedaan bunyi bacaan seperti "Maliki" (pendek/panjang di Al-Fatihah) keduanya mutawatir dan saling melengkapi makna Raja & Pemilik Hari Pembalasan.',
      source: hadith(2419)
    },
    {
      id: 'sepuluh-imam-qiraat',
      title: 'Mengenal Imam Qira\'at Tujuh & Sepuluh',
      category: 'Imam & Perawi',
      summary: 'Ibnu Mujahid merangkum 7 Imam Qira\'at utama, lalu Ibnu al-Jazari melengkapinya menjadi 10 Imam Qira\'at Mutawatir.',
      points: [
        'Qira\'at Populer di Dunia Islam: Riwayat Hafs \'an \'Ashim (dominan di Indonesia, Timur Tengah, dan mayoritas dunia Islam).',
        'Riwayat Warsy & Qalun \'an Nafi\': Banyak dipakai di Afrika Utara (Maroko, Aljazair, Tunisia, Libya).',
        'Riwayat Ad-Duri \'an Abi \'Amr: Banyak dipakai di wilayah Sudan dan sebagian Afrika Timur.',
        'Karya Rujukan: Matan Asy-Syathibiyyah (7 Qira\'at) dan Thayyibatun Nasyr karya Imam Ibnu al-Jazari (10 Qira\'at).'
      ],
      practice: 'Dengarkan contoh murattal Riwayat Warsy atau Qalun di platform audio Qur\'an tepercaya untuk mengenal kekayaan qira\'at umat Islam.',
      source: quran('15/9')
    },
    {
      id: 'sejarah-mushaf-utsmani',
      title: 'Sejarah Penulisan Mushaf: Era Nabi, Abu Bakar, hingga Utsman',
      category: 'Sejarah Mushaf',
      summary: 'Al-Qur\'an dijaga lewat dua jalur sekaligus: hafalan dada para sahabat dan catatan tertulis resmi sejak masa Nabi SAW.',
      points: [
        'Masa Nabi SAW: Ditulis oleh para juru tulis wahyu (Zaid bin Tsabit, Ali, Mu\'awiyah) di atas pelepah kurma, kulit, dan tulang, namun belum dijilid satu buku.',
        'Masa Abu Bakar Ash-Shiddiq: Atas usul Umar bin Khattab setelah Perang Yamamah (banyak huffaz syahid), Zaid bin Tsabit mengumpulkan semua catatan menjadi satu Mushaf induk.',
        'Masa Utsman bin Affan: Wilayah Islam meluas; terjadi perselisihan dialek. Utsman menyalin ulang menjadi beberapa Mushaf resmi (Mushaf Al-Imam) yang dikirim ke kota-kota besar Islam.',
        'Penambahan Titik & Harakat: Abul Aswad ad-Du\'ali dan Khalil bin Ahmad menambahkan titik huruf dan harakat pada era Tabi\'in untuk memudahkan pembaca non-Arab.'
      ],
      practice: 'Bersyukurlah atas nikmat Mushaf tercetak yang lengkap harakatnya hari ini; jaga adab menyentuh dan membacanya.',
      source: quran('15/9')
    },
    {
      id: 'rasm-utsmani-tanda-waqaf',
      title: 'Mengenal Rasm Utsmani & Perbedaan Tanda Mushaf',
      category: 'Teknis Mushaf',
      summary: 'Mushaf Madinah dan Mushaf Standar Indonesia sama-sama memakai Riwayat Hafs \'an \'Ashim, hanya berbeda gaya penulisan harakat & tanda waqaf.',
      points: [
        'Rasm Utsmani: Sistem ejaan khusus mushaf Utsman (misal kata "Shalat" ditulis dengan wawu: صلوة) yang dipertahankan karena menampung ragam qira\'at dan hikmah makna.',
        'Mushaf Madinah vs Standar Indonesia: Isi ayat dan harakat bacaannya 100% sama; perbedaannya pada simbol sukun, tanwin sejajar/miring, dan bentuk tanda waqaf.',
        'Tanda Waqaf Penting: م (Waqaf Lazim - wajib berhenti), لا (Jangan berhenti), ج (Boleh berhenti/lanjut), صلى (Lebih utama lanjut), قلى (Lebih utama berhenti).',
        'Shifr Mustadir (bulatan penuh di atas huruf): Huruf tersebut tidak dibaca baik saat lanjut maupun berhenti (contoh: أُولَٰئِكَ).'
      ],
      practice: 'Perhatikan tanda waqaf قلى (qila) dan صلى (shala) pada halaman Al-Qur\'an Anda hari ini agar berhenti di tempat yang tepat.',
      source: quran('73/4')
    }
  ]
};

export const fiqhSafar: Course = {
  id: 'fiqh-safar',
  title: 'Fiqh Safar, Jama\'-Qashar, & Shalat Sunnah',
  description: 'Panduan lengkap shalat di perjalanan, syarat jarak qashar, tata cara jama\' taqdim/ta\'khir, dan shalat sunnah.',
  note: 'Allah SWT menyukai jika keringanan (rukhsah) dari-Nya diambil sebagaimana Dia menyukai kewajiban-Nya dijalankan (HR. Ahmad).',
  lessons: [
    {
      id: 'syarat-safar-qashar',
      title: 'Syarat Perjalanan Safar & Hukum Qashar',
      category: 'Shalat Musafir',
      summary: 'Qashar meringkas shalat 4 rakaat (Dzuhur, Ashar, Isya\') menjadi 2 rakaat saat menempuh safar halal minimal ± 81–89 km.',
      points: [
        'Jarak Minimal: Mayoritas ulama menetapkan 4 burud / 16 farsakh (± 81–89 km, patokan aman 85 km).',
        'Shalat yang Di-Qashar: Hanya shalat 4 rakaat (Dzuhur, Ashar, Isya\') menjadi 2 rakaat; Subuh tetap 2 dan Maghrib tetap 3.',
        'Batas Hari Mukim: Menurut Mazhab Syafi\'i, jika berniat tinggal di kota tujuan ≥ 4 hari penuh (selain hari datang & pulang), status musafir berhenti setibanya di tujuan.',
        'Bermakmum ke Imam Mukim: Jika musafir shalat di belakang imam penduduk setempat, wajib menyempurnakan 4 rakaat mengikuti imam.'
      ],
      practice: 'Sebelum bepergian ke luar kota, ukur jarak tempuh tujuan Anda dan niatkan mengambil rukhsah qashar jika memenuhi syarat.',
      source: quran('4/101')
    },
    {
      id: 'tata-cara-jama',
      title: 'Shalat Jama\' Taqdim & Jama\' Ta\'khir',
      category: 'Shalat Musafir',
      summary: 'Jama\' menggabungkan Dzuhur dengan Ashar atau Maghrib dengan Isya\' di salah satu waktunya; tidak boleh menggabungkan Subuh atau Ashar dengan Maghrib.',
      points: [
        'Pasangan Sah: Dzuhur + Ashar, dan Maghrib + Isya\'.',
        'Jama\' Taqdim: Dikerjakan di waktu shalat pertama (Dzuhur atau Maghrib) — syarat: berniat jama\' saat shalat pertama dan berurutan (muwalah) tanpa jeda panjang.',
        'Jama\' Ta\'khir: Dikerjakan di waktu shalat kedua (Ashar atau Isya\') — syarat: berniat jama\' ta\'khir sebelum waktu shalat pertama habis.',
        'Jama\' Karena Hujan / Sakit: Dibolehkan menurut jumhur ulama meski tidak safar bila ada masyaqqah (kesulitan nyata), seperti hujan lebat di masjid atau sakit berat.'
      ],
      practice: 'Biasakan memasang niat jama\' ta\'khir dalam hati sebelum waktu Dzuhur habis jika kendaraan baru berhenti di waktu Ashar.',
      source: hadith(1110)
    },
    {
      id: 'shalat-di-kendaraan',
      title: 'Tata Cara Shalat di Pesawat, Kereta, & Kapal',
      category: 'Praktik Perjalanan',
      summary: 'Shalat wajib diupayakan berdiri menghadap kiblat jika memungkinkan; jika tidak mampu di kursi penumpang, tetap wajib shalat semampunya tepat waktu.',
      points: [
        'Jangan Menunda Hingga Keluar Waktu: Shalat fardhu wajib dikerjakan pada waktunya meski sedang berada di udara atau laut (QS. An-Nisa: 103).',
        'Wudhu & Tayammum: Gunakan air secukupnya (bisa dengan botol semprot kecil di kursi/toilet); tayammum hanya jika benar-benar tidak ada air atau dilarang memakai air.',
        'Posisi di Pesawat/Kereta: Jika ada ruang aman & diizinkan awak kabin, berdiri menghadap kiblat; jika harus duduk di kursi, menghadap arah kendaraan lalu rukuk & sujud dengan isyarat menunduk (sujud lebih rendah dari rukuk).',
        'Shalat Sunnah di Kendaraan: Boleh dikerjakan di atas kendaraan menghadap ke mana saja arah kendaraan melaju (HR. Bukhari).'
      ],
      practice: 'Siapkan botol spray kecil (± 60 ml) untuk berwudhu praktis saat perjalanan jauh dengan kereta atau pesawat.',
      source: quran('4/103')
    },
    {
      id: 'shalat-sunnah-harian',
      title: 'Rangkaian Shalat Sunnah Harian & Khusus',
      category: 'Shalat Sunnah',
      summary: 'Shalat Rawatib, Dhuha, Tahajud, Witir, dan Istikharah menambal kekurangan shalat wajib dan menguatkan kedekatan dengan Allah.',
      points: [
        'Rawatib Muakkadah (12 Rakaat): 2 sebelum Subuh, 4 sebelum Dzuhur, 2 setelah Dzuhur, 2 setelah Maghrib, 2 setelah Isya\' — dijanjikan rumah di surga (HR. Muslim).',
        'Shalat Dhuha (2–8 Rakaat): Sejak matahari naik setinggi tombak hingga sebelum Dzuhur; sedekah atas 360 persendian tubuh.',
        'Tahajud & Witir: Sebaik-baik shalat setelah shalat wajib adalah shalat malam (HR. Muslim); tutup malam dengan witir ganjil (1 atau 3 rakaat).',
        'Shalat Khusus: Istikharah (memohon pilihan terbaik), Gerhana (Kusuf/Khusuf), dan Istisqa\' (memohon hujan saat kemarau panjang).'
      ],
      practice: 'Mulai jaga 2 rakaat sunnah Qabliyah Subuh dan 1 rakaat Witir sebelum tidur sebagai pondasi shalat sunnah harian.',
      source: hadith(1180)
    }
  ]
};

export const fiqhHiburan: Course = {
  id: 'fiqh-hiburan',
  title: 'Fiqh Seni, Hiburan, & Gaya Hidup Muslim',
  description: 'Pandangan ulama tentang musik, fotografi, adab berpakaian, batas bercanda, dan olahraga dalam Islam.',
  note: 'Islam tidak melarang kegembiraan dan keindahan ("Sesungguhnya Allah itu Indah dan mencintai keindahan" — HR. Muslim), selama dalam koridor adab syariat.',
  lessons: [
    {
      id: 'musik-seni-suara',
      title: 'Seni Suara & Musik dalam Pandangan Para Ulama',
      category: 'Seni & Hiburan',
      summary: 'Ulama berbeda pendapat tentang alat musik; semuanya sepakat musik yang melalaikan ibadah, berisi lirik maksiat/syirik, atau memicu ikhtilat hukumnya haram.',
      points: [
        'Pendapat Mayoritas (4 Madzhab Klasik): Alat musik petik dan tiup umumnya dilarang berdasarkan hadits Bukhari tentang al-ma\'azif, kecuali rebana/duff pada walimah dan hari raya.',
        'Pendapat Sebagian Ulama (Ibnu Hazm, Al-Ghazali, Al-Qaradawi): Membolehkan nyanyian dan musik selama liriknya baik, tidak mengundang syahwat, dan tidak melalaikan kewajiban.',
        'Kesepakatan Ulama: Haram mutlak jika berisi lirik kotor/syirik, disertai khamar/ikhtilat bebas, atau membuat meninggalkan shalat.',
        'Seni Tilawah & Nasyid Islami: Mengalunkan Al-Qur\'an dengan suara indah dan syair pembangkit semangat kebaikan sangat dianjurkan.'
      ],
      practice: 'Seleksi playlist hiburan Anda; hindari lagu berlirik maksiat dan imbangi dengan mendengarkan murattal Al-Qur\'an setiap hari.',
      source: quran('31/6')
    },
    {
      id: 'fotografi-lukisan-patung',
      title: 'Hukum Patung, Lukisan, & Fotografi Digital',
      category: 'Seni Visual',
      summary: 'Patung makhluk bernyawa yang disembah atau menandingi ciptaan Allah dilarang keras; mayoritas ulama kontemporer membolehkan fotografi sebagai penangkapan cahaya.',
      points: [
        'Patung 3D Bernyawa: Dilarang keras dalam hadits shahih karena historisnya menjadi pintu berhala dan kesyirikan (kecuali mainan anak-anak menurut jumhur).',
        'Fotografi & Video: Mayoritas ulama kontemporer (termasuk MUI dan Darul Ifta\') membolehkan foto/video karena sekadar merekam bayangan/cahaya, bukan "menciptakan" bentuk baru.',
        'Syarat Konten Visual: Wajib menutup aurat, tidak mengumbar syahwat, dan tidak merendahkan martabat manusia.',
        'Kaligrafi & Ornamen Alam: Seni kaligrafi Al-Qur\'an dan motif flora/geometris berkembang pesat sebagai puncak estetika peradaban Islam.'
      ],
      practice: 'Pastikan foto dan video yang Anda unggah ke media sosial menjaga aurat dan tidak mengandung unsur pamer berlebihan (riya\').',
      source: hadith(2105)
    },
    {
      id: 'adab-berpakaian-perhiasan',
      title: 'Adab Berpakaian, Perhiasan, & Penampilan',
      category: 'Gaya Hidup',
      summary: 'Pakaian Muslim berfungsi menutup aurat dan menghiasi diri tanpa kesombongan (isbal sombong), serta bebas dari tasyabbuh lawan jenis.',
      points: [
        'Emas & Sutra bagi Laki-laki: Diharamkan bagi laki-laki memakai perhiasan emas dan pakaian sutra murni (HR. Tirmidzi), namun dibolehkan bagi perempuan.',
        'Larangan Tasyabbuh Lawan Jenis: Laki-laki dilarang menyerupai pakaian/penampilan perempuan dan sebaliknya (HR. Bukhari).',
        'Kebersihan & Wewangian: Nabi SAW sangat menjaga kebersihan gigi (siwak), rambut, jenggot, kuku, dan menyukai minyak wangi.',
        'Tato & Operasi Pengubah Ciptaan: Tato permanen dan mengubah bentuk tubuh demi kecantikan semata dilarang (kecuali pengobatan cacat/luka).'
      ],
      practice: 'Periksa lemari pakaian Anda; pilih busana yang bersih, rapi, menutup aurat sempurna, dan jauh dari kesombongan.',
      source: quran('7/26')
    },
    {
      id: 'olahraga-bercanda',
      title: 'Olahraga, Game, & Batas Bercanda dalam Islam',
      category: 'Hiburan Harian',
      summary: 'Rasulullah SAW pun berlomba lari bersama Aisyah RA dan bercanda dengan sahabat — namun candaan beliau selalu jujur dan tidak menyakiti.',
      points: [
        'Anjuran Olahraga: Memanah, berkuda, berenang, dan lari dianjurkan karena mukmin yang kuat lebih dicintai Allah daripada mukmin yang lemah (HR. Muslim).',
        'Batas Bercanda: Boleh bercanda untuk mencairkan suasana, namun haram berbohong demi membuat orang tertawa (HR. Abu Dawud) serta haram memperolok agama atau fisik orang lain (QS. 49:11).',
        'Game & Hiburan Digital: Mubah sebagai pelepas penat jika bebas judi/gacha uang nyata, bebas pornografi, dan tidak melalaikan shalat atau amanah keluarga/kerja.',
        'Manajemen Waktu: Setiap detik waktu luang dan kesehatan akan ditanya pertanggungjawabannya di hari kiamat.'
      ],
      practice: 'Jadwalkan olahraga rutin minimal 3x seminggu dengan niat menjaga amanah kesehatan tubuh dari Allah.',
      source: hadith(2664)
    }
  ]
};

export const metodeTahfidz: Course = {
  id: 'metode-tahfidz',
  title: 'Metode Tahfidz & Muraja\'ah Al-Qur\'an',
  description: 'Strategi menghafal Al-Qur\'an di tengah kesibukan, metode tikrar & talaqqi, serta kiat menjaga hafalan.',
  note: 'Menghafal Al-Qur\'an bukan soal kecerdasan semata, melainkan soal keistiqamahan, menjaga maksiat, dan doa.',
  lessons: [
    {
      id: 'niat-adab-hamilul-quran',
      title: 'Meluruskan Niat & Adab Penghafal Al-Qur\'an',
      category: 'Persiapan Ruhani',
      summary: 'Al-Qur\'an adalah cahaya Allah yang tidak akan menetap nyaman di hati yang dipenuhi riya\' dan maksiat.',
      points: [
        'Niat Ikhlas: Menghafal demi meraih ridha Allah dan syafaat Al-Qur\'an, bukan demi gelar atau pujian manusia.',
        'Jauhi Maksiat Mata & Lisan: Imam Syafi\'i diingatkan gurunya (Waki\') bahwa ilmu adalah cahaya Allah yang tidak diberikan kepada pelaku maksiat.',
        'Satu Mushaf Tetap (Mushaf Pojok): Gunakan satu jenis cetakan mushaf (misal Mushaf Madinah 15 baris) agar memori visual posisi ayat terekam kuat.',
        'Perbaiki Tajwid Dulu (Tahsin): Jangan terburu menghafal sebelum bacaan benar secara makhraj dan tajwid lewat guru.'
      ],
      practice: 'Pilih satu mushaf cetak khusus yang nyaman di mata dan jangan gonta-ganti mushaf selama proses menghafal.',
      source: quran('54/17')
    },
    {
      id: 'teknik-tikrar-talaqqi',
      title: 'Teknik Tikrar (Pengulangan) & Talaqqi Bersanad',
      category: 'Metode Menghafal',
      summary: 'Metode paling teruji sejak zaman Nabi SAW adalah talaqqi (setoran lisan ke guru) dan tikrar (mengulang-ulang ayat hingga menempel di lisan).',
      points: [
        'Metode 3T + 1M: Tahsin (perbaiki bacaan), Tasmi\'/Talaqqi (setor ke guru), Tikrar (ulang 20–40 kali per ayat), dan Muraja\'ah (mengulang hafalan lama).',
        'Potong Per Ayat / Per Tema: Hafal ayat 1 ulang 10x, hafal ayat 2 ulang 10x, lalu gabungkan ayat 1–2 ulang 10x.',
        'Pahami Terjemahannya: Mengetahui arti ayat membantu otak menghubungkan alur cerita atau hukum antar-ayat sehingga hafalan lebih awet.',
        'Waktu Emas Menghafal: Setelah Shalat Subuh (pikiran masih segar) dan antara Maghrib–Isya\'.'
      ],
      practice: 'Coba hafalkan 3–5 baris Al-Qur\'an ba\'da Subuh besok dengan teknik mengulang masing-masing 15 kali sambil melihat terjemahnya.',
      source: quran('73/4')
    },
    {
      id: 'strategi-murajaah',
      title: 'Kunci Utama: Manajemen Muraja\'ah (Agar Tidak Lupa)',
      category: 'Menjaga Hafalan',
      summary: 'Rasulullah SAW mengibaratkan hafalan Al-Qur\'an lebih cepat lepas daripada unta yang tidak diikat; kuncinya adalah muraja\'ah harian.',
      points: [
        'Hadits Pengikat Unta (HR. Bukhari-Muslim): Jika terus dijaga dan dibaca, hafalan menetap; jika ditinggalkan, cepat hilang.',
        'Aturan Emas 1:3 atau 80/20: Porsi muraja\'ah hafalan lama harus jauh lebih besar daripada menambah hafalan baru.',
        'Bawa dalam Shalat: Baca surat/halaman yang baru dihafal di dalam shalat sunnah (Tahajud, Dhuha, Rawatib) untuk menguji kekuatan hafalan.',
        'Audio Murattal saat Berkendara: Putar ulang juz yang sedang dimuraja\'ah saat di perjalanan.'
      ],
      practice: 'Tetapkan porsi muraja\'ah wajib sebelum menambah hafalan baru; jika target muraja\'ah hari ini terlewat, tunda dulu hafalan baru.',
      source: hadith(2419)
    },
    {
      id: 'tahfidz-untuk-pekerja',
      title: 'Program Tahfidz Realistis untuk Pekerja & Pelajar Sibuk',
      category: 'Manajemen Waktu',
      summary: 'Menghafal 3–5 baris sehari secara konsisten akan menuntaskan seluruh Al-Qur\'an dalam beberapa tahun dengan hafalan yang kokoh.',
      points: [
        'Prinsip Sedikit Tapi Istiqamah: 5 baris/hari = 1 halaman dalam 3 hari = 1 juz dalam 2 bulan.',
        'Manfaatkan Waktu Tunggu: 10 menit sebelum adzan di masjid atau jeda istirahat siang sangat cukup untuk mengulang 1 halaman.',
        'Cari Partner Sima\'an: Miliki teman setoran mingguan (baik tatap muka atau via panggilan suara) agar ada akuntabilitas.',
        'Mulai dari Surat Favorit & Juz 30/29: Mengumpulkan kemenangan kecil membangun rasa percaya diri.'
      ],
      practice: 'Gunakan fitur Tracker Khatam & Tahfidz di aplikasi ini untuk memantau konsistensi tilawah dan hafalan Anda.',
      source: hadith(2419)
    }
  ]
};

export const adabMenuntutIlmu: Course = {
  id: 'adab-menuntut-ilmu',
  title: 'Adab Menuntut Ilmu (Ta\'limul Muta\'allim)',
  description: 'Etika murid kepada guru, adab terhadap kitab, manajemen waktu belajar, dan cara mengatasi futur.',
  note: 'Para ulama salaf mempelajari adab selama puluhan tahun sebelum mendalami ilmu; karena ilmu tanpa adab hanya melahirkan kesombongan.',
  lessons: [
    {
      id: 'keutamaan-ilmu-syarat',
      title: '6 Syarat Meraih Ilmu Bermanfaat (Syair Imam Syafi\'i)',
      category: 'Fondasi Ilmu',
      summary: 'Imam Syafi\'i merangkum syarat keberhasilan belajar menjadi enam hal: kecerdasan, semangat, kesungguhan, bekal, bimbingan guru, dan waktu yang panjang.',
      points: [
        'Dzaka\' (Kecerdasan) & Hirsh (Semangat Tinggi): Rasa ingin tahu yang tulus untuk mengenal Allah dan agama-Nya.',
        'Ijtihad (Kesungguhan) & Bulghah (Bekal/Biaya): Siap berkorban tenaga, waktu, dan harta demi ilmu.',
        'Shuhbatu Ustadz (Bimbingan Guru): Tidak cukup otodidak dari internet tanpa guru; guru meluruskan salah paham.',
        'Thulu Zaman (Waktu Panjang & Sabar): Ilmu tidak diraih instan dalam semalam, butuh proses bertahap dari dasar ke lanjutan.'
      ],
      practice: 'Tuliskan 6 syarat dari syair Imam Syafi\'i ini di halaman depan buku catatan kajian Anda.',
      source: quran('58/11')
    },
    {
      id: 'adab-kepada-guru',
      title: 'Adab Murid kepada Guru & Majelis Ilmu',
      category: 'Adab Berguru',
      summary: 'Keberkahan ilmu mengalir lewat kerendahan hati murid kepada gurunya, sebagaimana adab Nabi Musa AS kepada Nabi Khidir AS.',
      points: [
        'Menghormati Guru Tanpa Kultus: Mendengarkan penjelasan dengan fokus, tidak memotong pembicaraan, dan berbicara santun.',
        'Teladan Musa & Khidir (QS. Al-Kahfi: 66–70): Nabi Musa yang seorang Rasul Ulul Azmi tetap merendah memohon izin belajar kepada Khidir AS.',
        'Mendoakan Guru: Doakan kebaikan dan kesehatan guru setiap selesai belajar atau dalam sujud.',
        'Adab Bertanya: Bertanya untuk memahami kebenaran, bukan untuk menguji atau menjatuhkan guru.'
      ],
      practice: 'Kirimkan ucapan terima kasih dan doa kebaikan kepada guru ngaji atau ustadz yang pernah membimbing Anda.',
      source: quran('18/66')
    },
    {
      id: 'adab-terhadap-kitab',
      title: 'Adab Terhadap Kitab, Catatan, & Mengikat Ilmu',
      category: 'Metode Belajar',
      summary: '"Ikatlah ilmu dengan tulisan" (HR. Thabrani); ulama memuliakan buku sebagai wadah ilmu dan menyusun catatan secara sistematis.',
      points: [
        'Menjaga Kehormatan Buku: Meletakkan mushaf dan kitab agama di tempat terhormat, tidak menaruhnya di lantai atau menjadikannya bantal.',
        'Mencatat Poin Penting: Jangan mengandalkan ingatan semata saat kajian; buat ringkasan poin dan dalilnya.',
        'Mudzakarah (Diskusi & Mengajar): Ilmu bertambah ketika diajarkan atau didiskusikan ulang bersama teman seperjuangan.',
        'Mengamalkan Ilmu: Imam Ahmad tidak menulis satu hadits pun kecuali setelah berusaha mengamalkannya.'
      ],
      practice: 'Siapkan satu buku catatan khusus kajian (fisik atau digital terstruktur) dan tuliskan minimal 3 poin pelajaran setiap selesai mendengar ceramah.',
      source: hadith(1631)
    },
    {
      id: 'mengatasi-futur',
      title: 'Mengatasi Futur (Lelah & Malas Belajar Agama)',
      category: 'Manajemen Diri',
      summary: 'Setiap hati punya masa semangat (syirrah) dan masa melambat (fatrah); kuncinya jangan sampai berhenti total dari ketaatan.',
      points: [
        'Pahami Siklus Iman (HR. Ahmad): Masa fatrah itu wajar; selama tetap menjaga kewajiban dan tidak melanggar batas halal-haram, ia tetap di atas petunjuk.',
        'Cari Lingkungan Saleh: Bergabung dengan halaqah atau komunitas belajar membantu menjaga ritme saat semangat individu turun.',
        'Turunkan Target Sementara: Jika sedang lelah, kurangi porsi (misal baca 1 halaman saja), tapi jangan putus sama sekali.',
        'Doa Memohon Tambahan Ilmu: "Rabbi zidni \'ilma" (QS. Thaha: 114).'
      ],
      practice: 'Saat merasa malas membuka buku atau kajian, mulailah dengan membaca 5 menit saja bersama secangkir teh agar momentum kembali hidup.',
      source: quran('20/114')
    }
  ]
};

export const birrulWalidain: Course = {
  id: 'birrul-walidain',
  title: 'Birrul Walidain, Hak Tetangga, & Silaturahim',
  description: 'Cara berbakti kepada orang tua saat hidup maupun wafat, menyikapi perbedaan pendapat, dan adab bertetangga.',
  note: 'Keridhaan Allah tergantung pada keridhaan orang tua, dan murka Allah tergantung pada murka keduanya (HR. Tirmidzi).',
  lessons: [
    {
      id: 'kedudukan-birrul-walidain',
      title: 'Kedudukan Bakti kepada Orang Tua Setelah Tauhid',
      category: 'Birrul Walidain',
      summary: 'Al-Qur\'an berulang kali menggandengkan perintah menyembah Allah saja dengan berbuat baik kepada ibu dan bapak (QS. Al-Isra\': 23).',
      points: [
        'Larangan "Ah" (Uff): Jangankan membentak atau memukul, mengucap kata keluhan ringan "ah" saja dilarang keras (QS. 17:23).',
        'Prioritas Ibu 3 Kali Lebih Besar: Hadits shahih menuntun bakti utama kepada ibu yang mengandung, melahirkan, dan menyusui dalam kepayahan.',
        'Pintu Surga Paling Tengah: Menjaga orang tua di masa senjanya adalah kesempatan emas meraih surga (HR. Tirmidzi).',
        'Doa Wajib Anak: "Rabbighfir li wa liwalidayya warhamhuma kama rabbayani shaghira."'
      ],
      practice: 'Hubungi orang tua Anda hari ini (atau kunjungi jika dekat), tanyakan kabar kesehatannya dengan nada suara paling lembut.',
      source: quran('17/23')
    },
    {
      id: 'orang-tua-berbeda-pendapat',
      title: 'Menyikapi Orang Tua yang Keras atau Berbeda Keyakinan',
      category: 'Birrul Walidain',
      summary: 'Tidak ada ketaatan dalam kemaksiatan kepada Allah, namun tetap wajib menemani dan memperlakukan keduanya dengan santun di dunia.',
      points: [
        'Prinsip QS. Luqman: 15: Jika orang tua memaksa syirik/maksiat jangan ditaati, tetapi tetap pergauli keduanya di dunia dengan cara yang ma\'ruf (baik).',
        'Kisah Asma\' binti Abu Bakar: Nabi SAW memerintahkan Asma\' tetap menyambung silaturahim dan memberi hadiah kepada ibunya yang masih musyrik (HR. Bukhari).',
        'Menasihati dengan Lembut: Teladani Nabi Ibrahim AS yang memanggil ayahnya "Ya Abati" (wahai ayahku tersayang) meski berbeda keyakinan.',
        'Batas Ketaatan Setelah Menikah: Suami tetap wajib berbakti kepada ibunya tanpa menzalimi hak istri; istri menghormati mertua dan menjaga keharmonisan kedua keluarga.'
      ],
      practice: 'Jika ada perbedaan pendapat dengan orang tua soal urusan duniawi, utamakan mengalah dengan senyum selama tidak melanggar syariat.',
      source: quran('31/15')
    },
    {
      id: 'bakti-setelah-wafat',
      title: 'Cara Berbakti kepada Orang Tua yang Telah Wafat',
      category: 'Birrul Walidain',
      summary: 'Kematian tidak memutus bakti seorang anak; doa anak shaleh, melunasi utang, dan memuliakan sahabat orang tua terus mengalirkan pahala.',
      points: [
        '5 Amal Bakti Pasca Wafat (HR. Abu Dawud): Mendoakan & memintakan ampun, melaksanakan wasiat yang syar\'i, menyambung silaturahim kerabatnya, dan memuliakan teman dekat orang tua.',
        'Melunasi Utang & Nadzar Puasa/Haji: Anak membantu melunasi utang harta maupun amanah ibadah orang tua.',
        'Sedekah Jariyah Atas Nama Orang Tua: Mewakafkan mushaf, membangun sumur/fasilitas masjid diniatkan pahalanya untuk almarhum ayah/ibu (HR. Bukhari tentang Sa\'ad bin Ubadah).',
        'Menjaga Nama Baik: Tidak melakukan perbuatan yang membuat orang lain mencela orang tua kita.'
      ],
      practice: 'Sisihkan sedekah hari Jumat ini dan niatkan pahalanya untuk kedua orang tua (baik yang masih hidup maupun yang sudah wafat).',
      source: hadith(1631)
    },
    {
      id: 'hak-tetangga-silaturahim',
      title: 'Memuliakan Tetangga & Menyambung Silaturahim',
      category: 'Adab Sosial',
      summary: 'Jibril terus mewasiatkan hak tetangga kepada Nabi SAW hingga beliau mengira tetangga akan ikut mendapat warisan (HR. Bukhari-Muslim).',
      points: [
        'Syarat Iman: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia memuliakan tetangganya dan tidak menyakitinya" (HR. Bukhari).',
        'Berbagi Masakan & Hadiah: Nabi SAW berpesan agar memperbanyak kuah masakan untuk dibagikan ke tetangga sekitar.',
        'Hak Tetangga Non-Muslim: Tetap berhak atas kebaikan sosial, keamanan, dan pertolongan darurat.',
        'Silaturahim Sejati: Bukan sekadar membalas kunjungan orang yang baik kepada kita, melainkan menyambung kembali hubungan kerabat yang sempat terputus (HR. Bukhari).'
      ],
      practice: 'Kirimkan makanan ringan atau buah ke tetangga sebelah rumah minggu ini tanpa menunggu momen khusus.',
      source: hadith(6018)
    }
  ]
};

export const baitulMaqdis: Course = {
  id: 'baitul-maqdis',
  title: 'Baitul Maqdis & Masjid Al-Aqsha dalam Sejarah',
  description: 'Kedudukan Masjid Al-Aqsha dalam Islam, Isra\' Mi\'raj, sejarah pembebasan, dan keutamaan bumi Syam.',
  note: 'Masjid Al-Aqsha adalah bagian tak terpisahkan dari akidah dan sejarah umat Islam sepanjang masa.',
  lessons: [
    {
      id: 'keutamaan-masjid-aqsha',
      title: 'Masjid Al-Aqsha: Kiblat Pertama & Tiga Masjid Suci',
      category: 'Kedudukan Syariat',
      summary: 'Masjid Al-Aqsha adalah masjid kedua yang dibangun di bumi setelah Masjidil Haram dan salah satu dari tiga masjid yang dianjurkan safar ibadah ke sana.',
      points: [
        'Tiga Masjid Utama (HR. Bukhari-Muslim): Tidak dianjurkan bersusah payah safar ibadah kecuali ke Masjidil Haram, Masjid Nabawi, dan Masjid Al-Aqsha.',
        'Kiblat Pertama: Nabi SAW dan para sahabat shalat menghadap Baitul Maqdis selama ± 16–17 bulan di Madinah sebelum kiblat dipindahkan ke Ka\'bah (QS. Al-Baqarah: 144).',
        'Kawasan Al-Aqsha yang Sebenarnya: Seluruh kompleks seluas ± 14,4 hektare (mencakup Masjid Qibli berkubah abu-abu maupun Dome of the Rock/Qubbat As-Sakhrah berkubah emas).',
        'Keberkahan Sekitarnya: Allah menyebut Al-Aqsha sebagai tempat yang "Kami berkahi sekelilingnya" (QS. Al-Isra\': 1).'
      ],
      practice: 'Kenali perbedaan bangunan Masjid Qibli dan Kubah Shakhrah agar tidak salah mengira keseluruhan kompleks Al-Aqsha.',
      source: quran('17/1')
    },
    {
      id: 'isra-miraj-al-aqsha',
      title: 'Peristiwa Isra\' Mi\'raj: Ikatan Makkah & Baitul Maqdis',
      category: 'Sirah & Akidah',
      summary: 'Allah SWT memperjalankan Nabi SAW dari Masjidil Haram ke Masjid Al-Aqsha sebelum naik ke Sidratul Muntaha sebagai pengukuhan estafet risalah para nabi.',
      points: [
        'Imam Seluruh Nabi: Di Masjid Al-Aqsha, Nabi Muhammad SAW mengimami seluruh nabi dan rasul sebelum Mi\'raj — simbol penyatuan tauhid seluruh nabi.',
        'Pelajaran Risalah: Baitul Maqdis adalah amanah yang diwariskan dari Nabi Ibrahim, Ishaq, Ya\'qub, Dawud, Sulaiman, hingga Nabi Muhammad SAW.',
        'Oleh-oleh Shalat Lima Waktu: Perintah shalat fardhu diterima langsung di atas langit ketujuh setelah perjalanan dimulai dari Masjid Al-Aqsha.'
      ],
      practice: 'Setiap shalat lima waktu, ingatlah bahwa perintah shalat turun dalam satu rangkaian peristiwa Isra\' Mi\'raj yang menghubungkan Makkah dan Al-Aqsha.',
      source: quran('17/1')
    },
    {
      id: 'pembebasan-umar-shalahuddin',
      title: 'Pembebasan Umar bin Khattab & Shalahuddin al-Ayyubi',
      category: 'Sejarah Islam',
      summary: 'Dua pembebasan agung Baitul Maqdis dalam sejarah Islam menjadi teladan keadilan, tanpa balas dendam, dan jaminan kebebasan beragama.',
      points: [
        'Pembebasan Damai oleh Umar bin Khattab (15 H / 637 M): Umar datang sendiri menerima kunci kota dari Patriark Sophronius dan menandatangani Perjanjian Umariyah yang melindungi gereja serta penduduk.',
        'Umar Shalat di Luar Gereja Makam Kudus: Beliau menolak shalat di dalam gereja agar tidak dijadikan alasan umat Islam mengambil alih gereja di kemudian hari.',
        'Pembebasan Shalahuddin al-Ayyubi (583 H / 1187 M): Setelah 88 tahun dikuasai Tentara Salib, Shalahuddin merebut kembali Al-Aqsha dan memaafkan penduduk sipil tanpa pembantaian.',
        'Persiapan Spiritual Sebelum Pembebasan: Shalahuddin dan gurunya (Nuruddin Zanki) terlebih dahulu menyatukan umat dan memberantas kemaksiatan.'
      ],
      practice: 'Pelajari kisah keadilan Perjanjian Umariyah sebagai bukti bagaimana Islam menjaga hak minoritas saat memimpin.',
      source: quran('5/8')
    },
    {
      id: 'sikap-muslim-kini',
      title: 'Peran & Kepedulian Muslim Terhadap Bumi Syam',
      category: 'Refleksi Masa Kini',
      summary: 'Kepedulian terhadap Baitul Maqdis diwujudkan lewat ilmu sejarah yang benar, doa qunut nazilah, kepedulian kemanusiaan, dan memperbaiki kualitas diri.',
      points: [
        'Ikatan Ukhuwah: Perumpamaan orang beriman seperti satu tubuh; jika satu anggota sakit, seluruh tubuh merasakan demamnya (HR. Muslim).',
        'Doa & Bantuan Kemanusiaan: Mengirimkan doa terbaik serta menyalurkan bantuan kemanusiaan melalui lembaga resmi terpercaya.',
        'Memperbaiki Kualitas Umat: Kebangkitan peradaban selalu dimulai dari ketakwaan, ilmu pengetahuan, persatuan, dan amanah di negeri masing-masing.'
      ],
      practice: 'Sertakan doa keselamatan dan kedamaian bagi saudara-saudara yang tertindas di Palestina dan seluruh dunia Islam dalam doa harian Anda.',
      source: hadith(2586)
    }
  ]
};

export const khulafaurRasyidin: Course = {
  id: 'khulafaur-rasyidin',
  title: 'Kepemimpinan Khulafaur Rasyidin',
  description: 'Keteladanan keadilan dan kebijakan Abu Bakar, Umar, Utsman, Ali, serta Umar bin Abdul Aziz.',
  note: 'Rasulullah SAW bersabda: "Berpegang teguhlah kalian pada sunnahku dan sunnah Khulafaur Rasyidin yang mendapat petunjuk" (HR. Abu Dawud).',
  lessons: [
    {
      id: 'abu-bakar-ketegasan',
      title: 'Abu Bakar Ash-Shiddiq (11–13 H): Ketegasan di Masa Krisis',
      category: 'Khulafaur Rasyidin',
      summary: 'Pidato pelantikan Abu Bakar meletakkan dasar demokrasi pertanggungjawaban pemimpin: "Taati aku selama aku menaati Allah."',
      points: [
        'Pidato Inaugurasi Agung: "Jika aku berbuat baik bantulah aku, jika aku menyimpang luruskanlah aku; yang lemah di antara kalian kuat di sisiku hingga kuambilkan haknya."',
        'Menyelamatkan Negara dari Disintegrasi: Tegas menghadapi nabi palsu dan penolak zakat agar syariat tidak terpecah setelah wafatnya Nabi SAW.',
        'Pengumpulan Mushaf Al-Qur\'an: Mengambil keputusan visioner atas usul Umar bin Khattab demi menyelamatkan Al-Qur\'an.'
      ],
      practice: 'Teladani kerendahan hati Abu Bakar: terbuka menerima koreksi meski berada di posisi pimpinan.',
      source: hadith(3660)
    },
    {
      id: 'umar-keadilan-tata-kelola',
      title: 'Umar bin Khattab (13–23 H): Arsitek Keadilan & Tata Kelola Negara',
      category: 'Khulafaur Rasyidin',
      summary: 'Umar membangun sistem administrasi negara modern: Baitul Mal, tunjangan sosial rakyat, kalender Hijriah, dan pengawasan ketat pejabat.',
      points: [
        'Ronda Malam & Tanggung Jawab Sosial: Umar memikul sendiri karung gandum di punggungnya untuk ibu dan anak-anak kelaparan di pinggiran Madinah.',
        'Reformasi Institusi: Membentuk Diwan (kementerian), gaji tetap hakim dan tentara, penetapan tahun Hijriah, dan audit harta pejabat sebelum & sesudah menjabat.',
        'Keadilan Tanpa Pandang Bulu: Melindungi hak rakyat kecil meski harus menegur gubernur atau anaknya sendiri.'
      ],
      practice: 'Bagi yang memegang amanah tim/organisasi, biasakan mengecek kondisi anggota yang paling bawah dan mendengar keluhan langsung tanpa sekat.',
      source: quran('4/58')
    },
    {
      id: 'utsman-ali-kedermawanan-hikmah',
      title: 'Utsman bin Affan & Ali bin Abi Thalib: Dermawan & Bijaksana',
      category: 'Khulafaur Rasyidin',
      summary: 'Utsman mewariskan penyatuan Mushaf Al-Qur\'an dan wakaf abadi; Ali mewariskan kedalaman ilmu, keadilan peradilan, dan kesabaran menghadapi fitnah.',
      points: [
        'Utsman bin Affan (23–35 H): Membentuk armada laut pertama Islam dan membukukan Mushaf Al-Imam agar umat Islam bersatu di atas satu bacaan standar.',
        'Ali bin Abi Thalib (35–40 H): Cendekiawan ulung ("Aku kota ilmu dan Ali pintunya"); terkenal dengan surat wasiat kepemimpinan penuh hikmah kepada Gubernur Mesir Malik al-Asytar.',
        'Menjaga Darah Sesama Muslim: Utsman memilih mengorbankan nyawanya sendiri daripada memicu perang saudara di Madinah.'
      ],
      practice: 'Pelajari surat Ali bin Abi Thalib kepada Malik al-Asytar tentang prinsip keadilan bagi semua golongan rakyat.',
      source: hadith(3700)
    },
    {
      id: 'umar-bin-abdul-aziz',
      title: 'Umar bin Abdul Aziz (99–101 H): Khalifah Rasyid Kelima',
      category: 'Teladan Keadilan',
      summary: 'Hanya memerintah 2,5 tahun namun berhasil menghapus kemiskinan hingga amil zakat kesulitan mencari penerima zakat.',
      points: [
        'Reformasi Dimulai dari Diri & Keluarga: Mengembalikan seluruh aset mewah keluarganya ke Baitul Mal pada hari pertama menjabat dan memilih hidup sederhana.',
        'Memadamkan Api Perpecahan: Menghentikan cacian politik di mimbar Jumat dan menggantinya dengan pembacaan QS. An-Nahl: 90 (perintah keadilan & ihsan).',
        'Kemakmuran Merata: Mengoptimalkan distribusi zakat, meringankan pajak zalim, dan membiayai pernikahan pemuda serta pelunasan utang warga miskin.'
      ],
      practice: 'Ingatlah prinsip Umar bin Abdul Aziz: perubahan besar selalu dimulai dari membersihkan integritas diri sendiri terlebih dahulu.',
      source: quran('16/90')
    }
  ]
};

export const fiqhJamaahSujud: Course = {
  id: 'fiqh-jamaah-sujud',
  title: 'Fiqh Shalat Berjamaah, Masbuq, & Sujud Khusus',
  description: 'Panduan lengkap shalat berjamaah, makmum masbuq, syarat imam, serta sujud sahwi, sujud tilawah, dan sujud syukur.',
  note: 'Shalat berjamaah lebih utama 27 derajat daripada shalat sendirian (HR. Bukhari-Muslim).',
  lessons: [
    {
      id: 'keutamaan-syarat-jamaah',
      title: 'Keutamaan Jamaah, Syarat Imam, & Meluruskan Shaf',
      category: 'Shalat Berjamaah',
      summary: 'Orang yang paling berhak menjadi imam adalah yang paling baik bacaan Al-Qur\'annya, lalu paling paham sunnah; shaf harus lurus dan rapat.',
      points: [
        'Urutan Prioritas Imam (HR. Muslim): Yang paling fasih & banyak hafalan Al-Qur\'annya, lalu yang paling alim tentang sunnah, paling dahulu hijrah/taqwa, lalu yang paling tua usianya.',
        'Meluruskan Shaf: Nabi SAW menegaskan agar bahu dan kaki dirapatkan dengan shaf yang lurus agar hati tidak berselisih.',
        'Posisi Makmum: Jika hanya berdua (imam + 1 makmum laki-laki), makmum berdiri tepat di sebelah kanan sejajar atau sedikit di belakang tumit imam; jika 2 orang atau lebih, berdiri di belakang imam.',
        'Tidak Mendahului Imam: Haram hukumnya rukuk atau sujud mendahului imam; makmum mengikuti gerak imam tepat setelah imam selesai berpindah.'
      ],
      practice: 'Saat masuk shaf masjid, pastikan bahu sejajar dan merapat mengisi celah kosong di depan sebelum memulai takbiratul ihram.',
      source: hadith(645)
    },
    {
      id: 'panduan-makmum-masbuq',
      title: 'Panduan Lengkap Makmum Masbuq (Terlambat)',
      category: 'Shalat Berjamaah',
      summary: 'Makmum masbuq langsung bertakbir mengikuti posisi terakhir imam, dan hanya terhitung mendapat rakaat jika sempat rukuk bersama imam.',
      points: [
        'Masuk Sesuai Posisi Imam: Jika imam sedang sujud atau duduk tasyahud, langsung takbiratul ihram berdiri lalu ikuti sujud/duduknya imam (tanpa menunggu berdiri lagi).',
        'Kapan Terhitung Dapat Rakaat?: Jika makmum masih sempat rukuk dengan thuma\'ninah sebelum imam bangun i\'tidal, rakaat tersebut sah terhitung.',
        'Menyempurnakan Rakaat: Setelah imam salam kedua, makmum masbuq berdiri dengan takbir lalu menambah jumlah rakaat yang tertinggal.',
        'Ketinggalan Al-Fatihah saat Rakaat Berjalan: Jika imam sudah rukuk, kewajiban Al-Fatihah makmum masbuq ditanggung imam.'
      ],
      practice: 'Jangan tergesa-gesa berlari mengejar shalat jamaah; berjalanlah dengan tenang (HR. Bukhari) lalu langsung ikuti posisi imam.',
      source: hadith(636)
    },
    {
      id: 'sujud-sahwi-lupa',
      title: 'Sujud Sahwi: Mengatasi Lupa & Ragu dalam Shalat',
      category: 'Sujud Khusus',
      summary: 'Sujud sahwi dilakukan 2 kali sebelum salam (atau sesudah salam jika kelebihan rakaat) untuk menambal kekurangan, kelebihan, atau keraguan rakaat.',
      points: [
        'Sebab Sujud Sahwi: Kelebihan gerakan/rakaat karena lupa, kekurangan sunnah ab\'ad (seperti lupa tasyahud awal atau qunut bagi yang mengamalkan), atau ragu jumlah rakaat.',
        'Cara Memutus Keraguan: Jika ragu apakah sudah 3 atau 4 rakaat, ambil jumlah yang paling yakin (yang paling sedikit = 3), tambah 1 rakaat, lalu sujud sahwi 2x sebelum salam (HR. Muslim).',
        'Jika Lupa Rukun (misal lupa rukuk/sujud): Tidak cukup sujud sahwi — wajib kembali melakukan rukun yang tertinggal (atau menambah 1 rakaat jika sudah masuk rakaat berikutnya), baru sujud sahwi.',
        'Bacaan Sujud Sahwi: Boleh membaca tasbih sujud biasa ("Subhana rabbiyal a\'la") atau doa "Subhana man la yanamu wa la yashu" menurut sebagian ulama.'
      ],
      practice: 'Latih ketenangan jika suatu saat lupa jumlah rakaat: ambil angka terkecil yang diyakini lalu sujud sahwi 2 kali sebelum salam.',
      source: hadith(1224)
    },
    {
      id: 'sujud-tilawah-syukur',
      title: 'Sujud Tilawah & Sujud Syukur',
      category: 'Sujud Khusus',
      summary: 'Sujud tilawah dikerjakan 1 kali saat membaca/mendengar ayat sajdah; sujud syukur dikerjakan 1 kali saat menerima nikmat besar atau terhindar musibah.',
      points: [
        'Sujud Tilawah (15 Ayat Sajdah di Al-Qur\'an): Hukumnya sunnah; boleh dikerjakan di dalam shalat (imam & makmum sujud 1x lalu bangun melanjutkan bacaan) atau di luar shalat (disunnahkan berwudhu dan menghadap kiblat).',
        'Doa Sujud Tilawah (HR. Tirmidzi): "Sajada wajhiya lilladzi khalaqahu wa shawwarahu wa syaqqa sam\'ahu wa basharahu bihaulihi wa quwwatihi..."',
        'Sujud Syukur: Dilakukan spontan 1 kali di luar shalat saat mendapat kabar gembira atau selamat dari bahaya (seperti sujud syukur Ka\'ab bin Malik saat taubatnya diterima).',
        'Tidak Perlu Takbiratul Ihram Khusus (Sujud Syukur): Cukup langsung bersujud menghadap kiblat jika memungkinkan dan mengucap hamdalah serta tasbih.'
      ],
      practice: 'Kenali simbol sajadah (۩) di mushaf Anda agar siap melakukan sujud tilawah saat bertemu ayat sajdah.',
      source: hadith(1077)
    }
  ]
};

export const kisahPilihanQuran: Course = {
  id: 'kisah-pilihan-quran',
  title: 'Kisah Pilihan Al-Qur\'an (Selain Nabi)',
  description: 'Pelajaran hidup dari kisah Ashabul Kahfi, Dzulqarnain, Luqmanul Hakim, Maryam binti Imran, dan Ashabul Ukhdud.',
  note: '"Sungguh pada kisah-kisah mereka itu terdapat pengajaran bagi orang-orang yang mempunyai akal" (QS. Yusuf: 111).',
  lessons: [
    {
      id: 'ashabul-kahfi-pemuda',
      title: 'Ashabul Kahfi: Keteguhan Iman Para Pemuda di Era Fitnah',
      category: 'QS. Al-Kahfi',
      summary: 'Tujuh pemuda beriman meninggalkan istana dan kemewahan demi menyelamatkan akidah, lalu Allah tidurkan 309 tahun dan jadikan teladan abadi.',
      points: [
        'Berani Berbeda Demi Akidah: Di tengah masyarakat penyembah berhala dan raja zalim, para pemuda berdiri menyatakan tauhid (QS. 18:13–14).',
        'Strategi Hijrah & Doa: Saat tidak mampu mengubah keadaan secara terbuka, mereka menyelamatkan iman ke gua sambil berdoa "Rabbana atina min ladunka rahmah..."',
        'Pertolongan Tak Terduga: Allah menjaga tubuh mereka dengan membolak-balikkan posisi tidur dan menumbuhkan rasa segan lewat anjing penjaga di pintu gua.',
        'Etika Muamalah yang Halus: Saat bangun dan mengirim utusan ke pasar, mereka berpesan "walyatalaththaf" — bersikaplah lembut dan menjaga kehalalan makanan (azka tha\'aman).'
      ],
      practice: 'Bagi anak muda: hafalkan doa Ashabul Kahfi (QS. Al-Kahfi: 10) saat mencari petunjuk di tengah tekanan pergaulan.',
      source: quran('18/13')
    },
    {
      id: 'dzulqarnain-pemimpin',
      title: 'Dzulqarnain: Pemimpin Tangguh, Adil, & Rendah Hati',
      category: 'QS. Al-Kahfi',
      summary: 'Raja saleh yang menguasai timur dan barat bumi namun tetap bersikap adil, memberdayakan rakyat, dan mengembalikan semua prestasi kepada Allah.',
      points: [
        'Kekuasaan Berlandaskan Iman & Sebab (Ikhtiar): Allah memberinya kekuasaan dan sarana teknologi, namun ia selalu mengedepankan keadilan — menghukum yang zalim dan memuliakan orang beriman.',
        'Kepemimpinan Partisipatif: Saat diminta membangun tembok penghalang Ya\'juj dan Ma\'juj, ia menolak upah harta namun mengajak rakyat bergotong royong ("fa\'inuni biquwwatin").',
        'Inovasi Teknologi Besi & Tembaga: Membangun benteng logam cair yang kokoh untuk melindungi peradaban manusia.',
        'Puncak Kerendahan Hati: Setelah proyek raksasa selesai, ia berkata "Hadza rahmatun min Rabbi" — ini adalah rahmat Tuhanku, bukan kesombongan diri.'
      ],
      practice: 'Setiap kali proyek atau target kerja berhasil, biasakan mengucap "Hadza min fadhli Rabbi" agar terhindar dari ujub.',
      source: quran('18/98')
    },
    {
      id: 'luqman-al-hakim',
      title: 'Luqmanul Hakim: Kurikulum Pendidikan Keluarga dalam Al-Qur\'an',
      category: 'QS. Luqman',
      summary: 'Luqman bukan seorang nabi, melainkan ayah bijak yang nasihatnya kepada sang anak diabadikan Allah sebagai kurikulum parenting terbaik.',
      points: [
        'Prioritas 1 — Tauhid Murni: "Wahai anakku tersayang (Ya bunayya), janganlah engkau menyekutukan Allah!" (QS. 31:13).',
        'Prioritas 2 — Kesadaran Muraqabah: Allah mengetahui amal sekecil biji sawi di dalam batu karang sekalipun (QS. 31:16).',
        'Prioritas 3 — Pilar Amal & Dakwah: Dirikan shalat, ajak pada kebaikan, cegah kemungkaran, dan bersabar atas ujiannya (QS. 31:17).',
        'Prioritas 4 — Etika Sosial & Suara: Jangan memalingkan muka dengan sombong dan lunakkanlah suaramu (QS. 31:18–19).'
      ],
      practice: 'Panggil anak atau adik Anda dengan panggilan kasih sayang ("anakku sayang") sebelum memberi nasihat sebagaimana gaya Luqman.',
      source: quran('31/13')
    },
    {
      id: 'maryam-dan-ashabul-ukhdud',
      title: 'Maryam binti Imran & Ashabul Ukhdud: Kesucian & Keteguhan',
      category: 'Keteladanan Iman',
      summary: 'Sayyidah Maryam dimuliakan satu surat penuh atas kesucian & ketaatannya; pemuda Ashabul Ukhdud memilih mempertahankan tauhid meski diuji parit api.',
      points: [
        'Maryam binti Imran: Wanita terbaik di zamannya (QS. 3:42), menjaga kehormatan diri dan tekun beribadah di mihrab hingga Allah anugerahkan kelahiran mukjizat Nabi Isa AS.',
        'Ashabul Ukhdud (QS. Al-Buruj): Rakyat beriman bersama seorang pemuda saleh tetap teguh beriman di hadapan raja zalim yang menggali parit api — membuktikan kemenangan sejati adalah selamatnya iman.',
        'Pelajaran dari Qarun (QS. Al-Qashash): Kebalikan dari mukmin di atas, Qarun menyombongkan harta ("ini berkat ilmuku semata") hingga ditelan bumi bersama istananya.'
      ],
      practice: 'Jaga kehormatan diri saat sendiri maupun di keramaian, serta hindari kesombongan Qarun saat rezeki sedang lapang.',
      source: quran('3/42')
    }
  ]
};

export const sejarahDinastiIslam: Course = {
  id: 'sejarah-dinasti-islam',
  title: 'Sejarah Dinasti Islam: Umayyah, Abbasiyah, & Utsmani',
  description: 'Jejak peradaban kekhalifahan Umayyah di Damaskus & Andalusia, Abbasiyah di Baghdad, hingga Utsmani di Konstantinopel.',
  note: 'Memahami pasang surut dinasti Islam mengajarkan kita bahwa kejayaan lahir dari ilmu dan persatuan, sedangkan keruntuhan dipicu perpecahan dan cinta dunia.',
  lessons: [
    {
      id: 'dinasti-umayyah-damaskus-andalusia',
      title: 'Bani Umayyah (661–750 M) & Cahaya Ilmu di Andalusia',
      category: 'Era Umayyah',
      summary: 'Bani Umayyah memperluas wilayah Islam hingga Spanyol (Andalusia) dan Asia Tengah, serta menyatukan bahasa administrasi Arab dan mata uang dinar.',
      points: [
        'Berdirinya Damaskus sebagai Pusat Pemerintahan: Dimulai oleh Mu\'awiyah bin Abi Sufyan setelah peristiwa \'Amul Jama\'ah (tahun persatuan ketika Hasan bin Ali berdamai demi mencegah pertumpahan darah).',
        'Ekspansi Timur & Barat: Thariq bin Ziyad menyeberangi Selat Gibraltar (Jabal Thariq, 711 M) membuka Andalusia; Muhammad bin Qasim membuka wilayah Sindh (India).',
        'Keemasan Cordoba (Andalusia): Ketika Eropa masih dalam masa kegelapan, Cordoba memiliki ratusan ribu buku perpustakaan, lampu jalanan, rumah sakit, dan melahirkan Ibnu Rusyd serta Az-Zahrawi.'
      ],
      practice: 'Pelajari kisah damainya Hasan bin Ali menyerahkan kepemimpinan demi menyelamatkan nyawa umat sebagai teladan mengutamakan persatuan.',
      source: quran('3/103')
    },
    {
      id: 'dinasti-abbasiyah-baghdad',
      title: 'Bani Abbasiyah (750–1258 M): Puncak Zaman Keemasan Baghdad',
      category: 'Era Abbasiyah',
      summary: 'Kota Baghdad menjadi pusat riset dunia melalui Baitul Hikmah; melahirkan ulama hadits, imam madzhab, dan ilmuwan sains terkemuka.',
      points: [
        'Baitul Hikmah (Rumah Kebijaksanaan): Didirikan Harun ar-Rasyid dan Al-Ma\'mun sebagai perpustakaan, pusat penerjemahan, dan laboratorium riset ilmuwan Muslim, Kristen, dan Yahudi.',
        'Lahirnya Raksasa Sains & Fikih: Al-Khawarizmi (aljabar & algoritma), Ibnu Sina (kedokteran), Al-Biruni, sekaligus zaman kodifikasi kitab-kitab hadits Kutubus Sittah dan 4 Imam Madzhab.',
        'Tragedi 1258 M: Konflik internal dan serangan tentara Mongol (Hulagu Khan) menghancurkan Baghdad, lalu peradaban ilmu dilanjutkan oleh Dinasti Mamluk di Mesir dan Utsmani.'
      ],
      practice: 'Ingat bahwa kemajuan sains modern berhutang besar pada etos riset para ilmuwan Muslim era Abbasiyah yang menganggap mencari ilmu sebagai ibadah.',
      source: quran('96/1')
    },
    {
      id: 'dinasti-utsmani-konstantinopel',
      title: 'Kesultanan Utsmani (1299–1924) & Penaklukan Konstantinopel',
      category: 'Era Utsmani',
      summary: 'Sultan Muhammad Al-Fatih menaklukkan Konstantinopel pada usia 21 tahun (1453 M), memadukan strategi militer cerdas, teknologi meriam, dan ketakwaan.',
      points: [
        'Bisyarah Nabi SAW: Rasulullah SAW telah mengabarkan akan dibebaskannya Konstantinopel oleh sebaik-baik pemimpin dan sebaik-baik pasukan (HR. Ahmad).',
        'Strategi Muhammad Al-Fatih (1453 M): Memindahkan puluhan kapal perang melintasi daratan bukit Galata dalam satu malam dan menjamin kebebasan beribadah penduduk Kristen setelah kota dibuka.',
        'Puncak Kejayaan (Sulaiman Al-Qanuni): Menata hukum negara, arsitektur megah oleh Mimar Sinan, dan melindungi jalur perdagangan serta jamaah haji dari Andalusia hingga Aceh (hubungan erat Utsmani–Aceh).'
      ],
      practice: 'Teladani persiapan Muhammad Al-Fatih: menguasai banyak bahasa, ilmu teknik, dan tidak pernah meninggalkan shalat rawatib sejak baligh.',
      source: hadith(1818)
    },
    {
      id: 'ibrah-bangkit-runtuh',
      title: 'Ibrah Sejarah: Sebab Kejayaan & Keruntuhan Peradaban',
      category: 'Hikmah Sejarah',
      summary: 'Sejarah membuktikan umat Islam mulia ketika memadukan iman, keadilan, dan penguasaan ilmu, serta melemah saat terpecah dan tertinggal inovasi.',
      points: [
        'Faktor Kejayaan: Pemimpin adil & berilmu, kebebasan riset ilmiah, kemakmuran wakaf, serta persaudaraan lintas suku.',
        'Faktor Keruntuhan: Perebutan takhta internal, kemewahan pejabat, kemandekan ijtihad/riset sains, dan hilangnya amanah.',
        'Pesan untuk Generasi Kini: Tugas kita bukan sekadar bernostalgia dengan masa lalu, melainkan membangun kembali etos ilmu, akhlak, dan kontribusi nyata hari ini.'
      ],
      practice: 'Ambil satu bidang keahlian Anda hari ini dan niatkan untuk berkontribusi membangun kemajuan umat dengan standar profesional terbaik.',
      source: quran('3/140')
    }
  ]
};

export const panduanMuallaf: Course = {
  id: 'panduan-muallaf',
  title: 'Panduan Muallaf & Langkah Awal Hijrah',
  description: 'Panduan praktis bagi saudara baru atau pemula yang baru mulai belajar Islam: syahadat, shalat bertahap, dan adab keluarga.',
  note: 'Islam menghapus seluruh dosa masa lalu saat seseorang bersyahadat dengan tulus; Allah membimbing hamba-Nya langkah demi langkah.',
  lessons: [
    {
      id: 'makna-syahadat-mandi',
      title: 'Memahami Dua Kalimat Syahadat & Awal Masuk Islam',
      category: 'Fondasi Iman',
      summary: 'Mengucap dua kalimat syahadat dengan sadar adalah pintu gerbang menjadi Muslim; seluruh dosa masa lalu diampuni dan lembaran baru dimulai.',
      points: [
        'Dua Kalimat Syahadat: "Asyhadu alla ilaha illallah" (tidak ada Tuhan yang berhak disembah selain Allah) dan "wa asyhadu anna Muhammadar Rasulullah" (Nabi Muhammad adalah utusan Allah).',
        'Penghapus Dosa Masa Lalu (HR. Muslim): Islam menghapus dosa-dosa sebelum seseorang masuk Islam; kebaikan masa lalunya pun tetap dicatat Allah (HR. Bukhari).',
        'Mandi Besar (Ghusl): Dianjurkan (wajib menurut sebagian ulama) mandi bersuci setelah bersyahadat sebagai simbol lahir baru yang bersih.',
        'Tidak Wajib Ganti Nama: Nama lahir yang baik maknanya tidak perlu diubah; cukup mengganti nama jika bermakna syirik atau buruk.'
      ],
      practice: 'Bagi yang baru masuk Islam atau baru hijrah, rayakan awal baru ini dengan rasa syukur — jangan membebani diri dengan tuntutan sempurna dalam sehari.',
      source: hadith(121)
    },
    {
      id: 'belajar-shalat-bertahap',
      title: 'Langkah Pertama Belajar Wudhu & Shalat dari Nol',
      category: 'Ibadah Dasar',
      summary: 'Mulailah dengan belajar wudhu yang benar dan rukun shalat; jika belum hafal doa Arab panjang, bacalah dzikir yang sudah dikuasai sambil terus belajar.',
      points: [
        'Prioritas Pertama Setelah Syahadat: Menjaga shalat 5 waktu karena shalat adalah tiang agama.',
        'Belum Hafal Al-Fatihah?: Selama proses belajar, baca ayat yang sudah hafal atau tasbih/tahmid/takbir ("Subhanallah, Alhamdulillah, Allahu Akbar") sebagaimana bimbingan Nabi SAW kepada sahabat baru (HR. Abu Dawud).',
        'Gunakan Panduan Bergambar: Aplikasi ini menyediakan halaman Praktik Shalat Bergambar dan Panduan 29 Huruf Hijaiyah untuk latihan perlahan.',
        'Cari Pembimbing Ramah: Bergabunglah dengan masjid atau komunitas muallaf center terpercaya agar tidak belajar sendirian.'
      ],
      practice: 'Mulai hafalkan Surat Al-Fatihah satu ayat per hari dan latih tata cara wudhu menggunakan halaman Praktik Wudhu & Shalat.',
      source: hadith(302)
    },
    {
      id: 'halal-haram-dasar',
      title: 'Mengenal Batas Halal-Haram Dasar dalam Keseharian',
      category: 'Gaya Hidup Baru',
      summary: 'Perubahan bertahap dalam makanan (meninggalkan babi, bangkai, dan alkohol), pergaulan, serta pakaian dilakukan dengan hikmah dan ketenangan.',
      points: [
        'Makanan & Minuman: Menghindari daging babi, darah, bangkai, hewan sembelihan tanpa menyebut nama Allah, serta khamar/alkohol (QS. Al-Ma\'idah: 3).',
        'Pakaian & Aurat: Belajar menutup aurat secara bertahap dengan nyaman dan penuh kesadaran mencintai Allah.',
        'Penghasilan Halal: Memastikan pekerjaan bebas dari penipuan, judi, dan riba.'
      ],
      practice: 'Mulailah membiasakan membaca Basmallah sebelum makan/minum dan mengecek logo halal pada kemasan produk.',
      source: quran('5/3')
    },
    {
      id: 'menyikapi-keluarga-nonmuslim',
      title: 'Menjaga Hubungan Baik dengan Keluarga yang Belum Seiman',
      category: 'Adab Keluarga',
      summary: 'Masuk Islam tidak memutus ikatan kasih sayang kepada orang tua dan saudara; tunjukkan Islam lewat akhlak paling lembut dan bakti yang lebih baik.',
      points: [
        'Tetap Berbakti kepada Orang Tua (QS. Luqman: 15): Perlakuan santun, hadiah, dan perhatian kepada ayah-ibu justru menjadi dakwah paling indah.',
        'Pernikahan & Waris: Konsultasikan status pernikahan atau urusan keluarga secara tenang kepada ustadz/KUA agar terselesaikan sesuai syariat tanpa konflik kasar.',
        'Tetap Hadir di Momen Keluarga: Boleh menghadiri acara keluarga selama tidak mengikuti ritual ibadah agama lain dan menjaga makanan halal.'
      ],
      practice: 'Tunjukkan perubahan akhlak yang lebih sabar, jujur, dan perhatian kepada keluarga setelah memeluk Islam atau berhijrah.',
      source: quran('31/15')
    }
  ]
};

export const adabLisanMajelis: Course = {
  id: 'adab-lisan-majelis',
  title: 'Adab Lisan, Majelis, & Bertamu',
  description: 'Menjaga lisan dari ghibah dan namimah, adab bertamu dan menerima tamu, serta etika musyawarah.',
  note: '"Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam" (HR. Bukhari-Muslim).',
  lessons: [
    {
      id: 'bahaya-ghibah-namimah',
      title: 'Menjaga Lisan dari Ghibah, Namimah, & Fitnah',
      category: 'Penjagaan Lisan',
      summary: 'Ghibah (membicarakan aib orang lain walau benar) diibaratkan Allah seperti memakan daging saudara sendiri yang sudah mati (QS. Al-Hujurat: 12).',
      points: [
        'Bedakan Ghibah vs Fitnah (Buhtan): Jika hal yang dibicarakan benar ada pada dirinya itu ghibah; jika tidak benar itu fitnah/dusta yang dosanya lebih besar (HR. Muslim).',
        'Namimah (Adu Domba): Menyampaikan ucapan seseorang kepada pihak lain untuk merusak hubungan — pelakunya diancam tidak masuk surga (HR. Bukhari-Muslim).',
        '6 Ghibah yang Dibolehkan Syariat (Imam Nawawi): Mengadukan kezaliman ke hakim, meminta bantuan menghentikan kemungkaran, meminta fatwa, memperingatkan bahaya penipu, menyebut pelaku maksiat terang-terangan, dan mengenalkan julukan fisik yang maklum tanpa niat menghina.',
        'Kaffarah Ghibah: Berhenti seketika, istighfar, dan mendoakan kebaikan serta menyebut kebaikan orang yang pernah kita ghibahi.'
      ],
      practice: 'Setiap kali obrolan mulai bergeser membicarakan keburukan orang lain, alihkan topik dengan lembut atau ingatkan dengan senyum.',
      source: quran('49/12')
    },
    {
      id: 'adab-bertamu-menerima-tamu',
      title: 'Adab Bertamu & Memuliakan Tamu',
      category: 'Adab Sosial',
      summary: 'Tamu masuk meminta izin maksimal 3 kali dan menjaga pandangan; tuan rumah memuliakan tamu dengan wajah ramah dan hidangan terbaik semampunya.',
      points: [
        'Meminta Izin Maksimal 3 Kali (HR. Bukhari-Muslim): Jika setelah 3 kali mengetuk/salam belum ada jawaban, hendaknya pulang dengan lapang dada tanpa marah.',
        'Jaga Pandangan & Waktu: Tidak berdiri tepat di depan pintu terbuka yang menampakkan dalam rumah; hindari bertamu di waktu istirahat/makan tanpa janji terlebih dahulu.',
        'Memuliakan Tamu (QS. Adz-Dzariyat: 24–27): Meneladani Nabi Ibrahim AS yang segera menghidangkan jamuan terbaik dengan hangat tanpa merasa terbebani.',
        'Batas Jamuan Wajib & Sunnah: Menjamu tamu secara istimewa pada hari pertama, dan tamu tidak boleh menginap terlalu lama hingga menyusahkan tuan rumah (maksimal 3 hari kecuali diminta).'
      ],
      practice: 'Selalu kirim pesan konfirmasi terlebih dahulu sebelum bertamu ke rumah saudara atau sahabat.',
      source: quran('24/27')
    },
    {
      id: 'adab-majelis-musyawarah',
      title: 'Adab Majelis Ilmu, Rapat, & Musyawarah',
      category: 'Adab Majelis',
      summary: 'Al-Qur\'an memuji orang beriman yang urusannya diputuskan lewat musyawarah (QS. Asy-Syura: 38), melapangkan tempat duduk, dan menutup majelis dengan doa.',
      points: [
        'Melapangkan Tempat Duduk (QS. Al-Mujadilah: 11): Jangan enggan bergeser memberi ruang bagi orang yang baru datang ke majelis.',
        'Dilarang Bisik-Bisik Berdua di Tengah Tiga Orang (HR. Bukhari): Agar tidak menimbulkan prasangka dan perasaan tersisih pada orang ketiga.',
        'Etika Musyawarah (QS. Ali \'Imran: 159): Sampaikan usulan dengan lembut, dengarkan argumen orang lain sampai tuntas, dan tawakal setelah keputusan bersama disepakati.',
        'Doa Kafaratul Majelis: Tutup setiap pertemuan dengan "Subhanakallahumma wa bihamdika asyhadu alla ilaha illa anta astaghfiruka wa atubu ilaik."'
      ],
      practice: 'Biasakan membaca Doa Kafaratul Majelis setiap kali selesai rapat kerja, nongkrong, maupun pengajian.',
      source: quran('58/11')
    }
  ]
};

export const tadabburAsmaulHusna: Course = {
  id: 'tadabbur-asmaul-husna',
  title: 'Tadabbur Asmaul Husna dalam Doa & Kehidupan',
  description: 'Memahami makna nama-nama indah Allah, adab berdoa dengannya, dan meneladani sifat kasih sayang serta keadilan.',
  note: '"Hanya milik Allah Asmaul Husna, maka bermohonlah kepada-Nya dengan menyebut Asmaul Husna itu" (QS. Al-A\'raf: 180).',
  lessons: [
    {
      id: 'adab-berdoa-asmaul-husna',
      title: 'Kaidah Memahami & Berdoa dengan Asmaul Husna',
      category: 'Dasar Tauhid Asma',
      summary: 'Mengenal 99+ nama Allah bukan sekadar menghafal nyanyian, melainkan memahami maknanya, memanggil-Nya sesuai hajat, dan menumbuhkan akhlak mulia.',
      points: [
        'Tiga Tingkatan Menghafal (Ihsaha) dalam HR. Bukhari-Muslim: Menghafal lafaznya, memahami maknanya, dan beribadah/berdoa sesuai konsekuensinya.',
        'Memilih Nama Sesuai Hajat: Memohon ampun dengan Ya Ghaffar, memohon rezeki dengan Ya Razzaq, memohon kesembuhan dengan Ya Syafi, memohon petunjuk dengan Ya Hadi.',
        'Tidak Menyamakan Allah dengan Makhluk (QS. Asy-Syura: 11): Allah Maha Mendengar namun pendengaran-Nya tidak sama dengan makhluk.',
        'Doa Pemilik Nama Agung (Ismul A\'zham): Nama seperti Allah, Al-Hayyul Qayyum, dan Dzul Jalali wal Ikram sangat utama mengawali doa.'
      ],
      practice: 'Sebelum berdoa malam ini, panggil minimal 2 nama Allah yang paling sesuai dengan permohonan Anda.',
      source: quran('7/180')
    },
    {
      id: 'nama-kasih-sayang-ampunan',
      title: 'Ar-Rahman, Ar-Rahim, Al-Ghaffar, & Al-Lathif',
      category: 'Sifat Jamal (Keindahan)',
      summary: 'Sifat kasih sayang dan kelembutan Allah melampaui kemurkaan-Nya; mengenal nama ini menyembuhkan putus asa dan menumbuhkan empati.',
      points: [
        'Ar-Rahman & Ar-Rahim: Kasih sayang Allah yang umum bagi seluruh makhluk di dunia dan kasih sayang khusus abadi bagi orang beriman.',
        'Al-Ghaffar & Al-\'Afuww: Allah tidak hanya mengampuni dosa (menutupinya), tetapi juga menghapus bekasnya hingga seolah tak pernah terjadi.',
        'Al-Lathif (Maha Lembut & Teliti): Allah mengatur takdir lewat jalan halus yang sering baru kita pahami hikmahnya bertahun-tahun kemudian.',
        'Buah Akhlak: Menjadi pribadi yang pemaaf, lembut bertutur kata, dan penuh kasih kepada keluarga maupun sesama makhluk.'
      ],
      practice: 'Maafkan satu kesalahan orang lain hari ini sebagai bentuk meneladani sifat Al-\'Afuww dan Ar-Rahim.',
      source: quran('59/22')
    },
    {
      id: 'nama-keperkasaan-keadilan',
      title: 'Al-Malik, Al-\'Aziz, Al-\'Adl, & Al-Hakim',
      category: 'Sifat Jalal (Keagungan)',
      summary: 'Mengenal keperkasaan dan keadilan Allah membebaskan hati dari takut berlebihan kepada manusia dan menahan diri dari berbuat zalim.',
      points: [
        'Al-Malik & Al-\'Aziz: Raja segala raja dan Maha Perkasa — segala kekuasaan dunia bersifat sementara dan pinjaman.',
        'Al-Hakim (Maha Bijaksana): Setiap syariat dan takdir Allah pasti memiliki hikmah mendalam meski akal manusia terbatas.',
        'Al-Bashir, As-Sami\', & Ar-Raqib: Melahirkan kesadaran muraqabah (merasa diawasi Allah) saat bekerja maupun saat sendirian.'
      ],
      practice: 'Ketika menghadapi keputusan sulit atau ketidakadilan, ucapkan "Hasbunallahu wa ni\'mal Wakil" dan pegang prinsip kejujuran.',
      source: quran('59/23')
    }
  ]
};

export const tadabburSuratPilihan: Course = {
  id: 'tadabbur-surat-pilihan',
  title: 'Tadabbur Surat-Surat Agung Pilihan',
  description: 'Membedah intisari, keutamaan, dan pelajaran praktis dari Al-Fatihah, Ayat Kursi, Al-Kahfi, Yasin, Ar-Rahman, dan Al-Mulk.',
  note: 'Membaca surat-surat pilihan dengan tadabbur mengubah rutinitas lisan menjadi dialog jiwa bersama Allah SWT.',
  lessons: [
    {
      id: 'al-fatihah-dan-ayat-kursi',
      title: 'Al-Fatihah (Ummul Qur\'an) & Ayat Kursi (Penghulu Ayat)',
      category: 'Inti Al-Qur\'an',
      summary: 'Al-Fatihah merangkum dialog hamba dengan Rabbnya dalam setiap rakaat shalat; Ayat Kursi merangkum kemahaesaan dan penjagaan Allah.',
      points: [
        'Al-Fatihah sebagai Dialog (HR. Muslim): Setiap ayat dijawab langsung oleh Allah ("Hamidani \'abdi" — hamba-Ku memuji-Ku), hingga permohonan "Ihdinas shirathal mustaqim".',
        'Iyyaka Na\'budu wa Iyyaka Nasta\'in: Menggabungkan ibadah murni kepada Allah dan pengakuan ketidakberdayaan tanpa pertolongan-Nya.',
        'Ayat Kursi (QS. Al-Baqarah: 255): Allah Al-Hayyu (Mahahidup) Al-Qayyum (Maha Mengurus makhluk tanpa pernah mengantuk/tidur); penjaga utama pagi, petang, ba\'da shalat, dan sebelum tidur.'
      ],
      practice: 'Berhentilah sejenak di setiap akhir ayat Al-Fatihah saat shalat agar merasakan jawaban Allah atas bacaan Anda.',
      source: quran('1/1')
    },
    {
      id: 'surat-al-kahfi-empat-fitnah',
      title: 'Surat Al-Kahfi: Benteng dari Empat Fitnah Kehidupan',
      category: 'Sunnah Jumat',
      summary: 'Dianjurkan dibaca setiap hari Jumat; merangkum empat kisah penyelamat dari fitnah agama, harta, ilmu, dan kekuasaan.',
      points: [
        'Fitnah Agama (Kisah Ashabul Kahfi): Selamatkan iman dengan lingkungan shalih dan doa.',
        'Fitnah Harta (Kisah Pemilik Dua Kebun): Harta hanyalah titipan; ucapkan "Masya Allah la quwwata illa billah" agar tidak sombong.',
        'Fitnah Ilmu (Kisah Nabi Musa & Khidir AS): Setinggi apa pun ilmu manusia, tetap harus rendah hati belajar.',
        'Fitnah Kekuasaan (Kisah Dzulqarnain): Kekuasaan digunakan untuk keadilan dan melindungi yang lemah, bukan menindas.'
      ],
      practice: 'Jadikan membaca Surat Al-Kahfi (atau minimal 10 ayat pertama & terakhir) sebagai agenda rutin setiap malam/hari Jumat.',
      source: quran('18/10')
    },
    {
      id: 'yasin-ar-rahman-al-mulk',
      title: 'Surat Yasin, Ar-Rahman, Al-Waqi\'ah, & Al-Mulk',
      category: 'Surat Populer',
      summary: 'Empat surat yang akrab di tengah masyarakat ini meneguhkan tauhid kebangkitan, syukur nikmat, hakikat rezeki, dan pengawasan alam.',
      points: [
        'Surat Yasin: Menguatkan keyakinan akan kebangkitan dan kerasulan Nabi SAW lewat kisah penduduk negeri (Habib an-Najjar) serta tanda-tanda kekuasaan Allah di alam.',
        'Surat Ar-Rahman: Pengulangan 31 kali "Fabi-ayyi ala-i Rabbikuma tukadzdziban" mengajak manusia dan jin menghitung nikmat Al-Qur\'an hingga alam semesta.',
        'Surat Al-Waqi\'ah: Mengingatkan tiga golongan manusia di hari kiamat (As-Sabiqun, Ashabul Yamin, Ashabusy Syimal) dan hakikat rezeki dari Allah.',
        'Surat Al-Mulk (Penyelamat Siksa Kubur — HR. Tirmidzi): Membiasakan membacanya setiap malam menumbuhkan kesadaran bahwa hidup dan mati adalah ujian amal terbaik (QS. 67:2).'
      ],
      practice: 'Biasakan membaca Surat Al-Mulk sebelum tidur malam dan merenungi ayat keduanya tentang tujuan penciptaan hidup dan mati.',
      source: quran('67/2')
    }
  ]
};

export const fiqhSumpahKaffarah: Course = {
  id: 'fiqh-sumpah-kaffarah',
  title: 'Fiqh Sumpah, Nadzar, & Kaffarah',
  description: 'Hukum sumpah, bahaya sumpah palsu, aturan nadzar yang sah, serta tata cara menunaikan berbagai jenis kaffarah.',
  note: 'Menjaga sumpah dan menepati nadzar adalah tanda kejujuran lisan seorang mukmin di hadapan Allah.',
  lessons: [
    {
      id: 'hukum-sumpah-dan-jenisnya',
      title: 'Tiga Jenis Sumpah & Bahaya Sumpah Palsu',
      category: 'Sumpah (Yamin)',
      summary: 'Hanya sumpah yang disengaja atas nama Allah (Yamin Mun\'aqidah) yang wajib ditepati atau ditebus kaffarah jika dilanggar.',
      points: [
        'Larangan Bersumpah Selain Nama Allah (HR. Abu Dawud): Tidak boleh bersumpah demi ayah, ibu, bumi, atau nyawa; cukup "Wallahi / Billahi / Tallahi".',
        'Yamin Laghw (Sumpah Spontan Tanpa Sengaja): Seperti ucapan "Demi Allah tidak!" dalam obrolan biasa — tidak berdosa dan tidak ada kaffarah (QS. Al-Baqarah: 225).',
        'Yamin Mun\'aqidah: Sumpah serius untuk melakukan/meninggalkan sesuatu di masa depan — jika dilanggar wajib kaffarah.',
        'Yamin Ghamus (Sumpah Palsu): Bersumpah dusta untuk mengambil hak orang atau menipu — termasuk dosa besar yang membenamkan pelakunya ke neraka.'
      ],
      practice: 'Biasakan berbicara jujur tanpa mudah mengobral kata "Demi Allah" untuk hal-hal sepele.',
      source: quran('5/89')
    },
    {
      id: 'aturan-nadzar-islam',
      title: 'Hukum Nadzar Taat, Makruh, & Nadzar Maksiat',
      category: 'Nadzar',
      summary: 'Nadzar ketaatan wajib ditunaikan; namun nadzar bersyarat untuk memaksa takdir tidak mengubah ketentuan Allah dan dilarang jika berupa maksiat.',
      points: [
        'Pengertian Nadzar: Mewajibkan diri sendiri melakukan amal ibadah yang asalnya sunnah atau mubah.',
        'Nadzar Taat (Wajib Ditepati): Contoh: "Jika lulus ujian, saya bernadzar puasa Senin-Kamis 3 kali" — wajib ditunaikan setelah syaratnya terjadi (HR. Bukhari).',
        'Nadzar Maksiat (Haram Ditepati): Contoh bernadzar memutus silaturahim atau berbuat dosa — haram dilaksanakan dan cukup ditebus dengan kaffarah sumpah (HR. Abu Dawud).',
        'Sebaik-baik Amal Tanpa Nadzar: Ibadah dan sedekah tetap lebih utama dilakukan ikhlas tanpa menunggu janji imbalan duniawi.'
      ],
      practice: 'Periksa apakah ada janji/nadzar lama yang pernah Anda ucapkan lalu lupa ditunaikan; segera lunasi secara bertahap.',
      source: hadith(6696)
    },
    {
      id: 'rincian-berbagai-kaffarah',
      title: 'Tata Cara Membayar Berbagai Jenis Kaffarah',
      category: 'Kaffarah',
      summary: 'Kaffarah sumpah membolehkan memilih memberi makan 10 orang miskin sebelum puasa 3 hari; kaffarah jima\' siang Ramadan wajib berurutan (puasa 2 bulan dulu).',
      points: [
        'Kaffarah Sumpah & Nadzar (QS. Al-Ma\'idah: 89): Pilih salah satu: memberi makan 10 orang miskin, memberi pakaian 10 orang miskin, atau memerdekakan budak. Jika tidak mampu ketiganya, baru berpuasa 3 hari.',
        'Kaffarah Jima\' Siang Ramadan (HR. Bukhari-Muslim): Wajib tartib (berurutan): memerdekakan budak → jika tak mampu, puasa 2 bulan berturut-turut → jika tak mampu juga, memberi makan 60 orang miskin.',
        'Kaffarah Pembunuhan Tidak Sengaja (QS. An-Nisa: 92): Membayar diyat ke keluarga korban dan memerdekakan budak mukmin atau puasa 2 bulan berturut-turut.',
        'Mengubah Sumpah Demi Kebaikan: Jika bersumpah melakukan keburukan, batalkan sumpah itu, lakukan yang lebih baik, lalu bayar kaffarah sumpah (HR. Muslim).'
      ],
      practice: 'Gunakan fitur Kalkulator Kaffarah di aplikasi ini bila suatu saat perlu menghitung rincian takaran atau estimasi biayanya.',
      source: quran('5/89')
    }
  ]
};

export const fiqhWasiatHibah: Course = {
  id: 'fiqh-wasiat-hibah',
  title: 'Fiqh Wasiat, Hibah, & Harta Anak Yatim',
  description: 'Membedakan waris, wasiat maksimal 1/3, dan hibah agar bebas sengketa, serta amanah menjaga harta anak yatim.',
  note: 'Menjelaskan pembagian harta secara adil semasa hidup mencegah perpecahan saudara setelah orang tua wafat.',
  lessons: [
    {
      id: 'beda-waris-wasiat-hibah',
      title: 'Membedakan Waris, Wasiat, dan Hibah dengan Tegas',
      category: 'Harta Keluarga',
      summary: 'Hibah berpindah kepemilikan saat pemberi masih hidup; wasiat berlaku setelah wafat (maksimal 1/3 dan bukan untuk ahli waris); sisanya dibagi lewat faraidh.',
      points: [
        'Hibah (Pemberian Semasa Hidup): Sah bila ada ijab-kabul dan serah terima barang (qabdh) saat pemberi masih hidup sehat; jika baru diserahkan setelah wafat, hukumnya berubah menjadi wasiat.',
        'Keadilan Hibah kepada Anak (HR. Bukhari-Muslim): Orang tua dianjurkan bersikap adil dalam memberi hibah kepada anak-anaknya (jangan pilih kasih tanpa alasan syar\'i).',
        'Wasiat (Maksimal ⅓ Harta): Berlaku setelah pewaris wafat dan setelah utang dilunasi; hanya untuk pihak non-ahli waris (seperti masjid, anak angkat, atau kerabat jauh yang terhalang waris).',
        'Aturan "La Washiyyata li Warits" (HR. Tirmidzi): Tidak boleh berwasiat harta tambahan untuk salah satu ahli waris kecuali seluruh ahli waris lain ikhlas mengizinkan.'
      ],
      practice: 'Pastikan jika orang tua menghibahkan rumah/tanah semasa hidup, proses serah terima dan pencatatannya dilakukan secara jelas serta diketahui keluarga.',
      source: hadith(2742)
    },
    {
      id: 'menjaga-harta-anak-yatim',
      title: 'Amanah Berat Menjaga & Mengelola Harta Anak Yatim',
      category: 'Perlindungan Yatim',
      summary: 'Memakan harta anak yatim secara zalim diancam Al-Qur\'an seperti menelan api neraka ke dalam perut (QS. An-Nisa\': 10).',
      points: [
        'Siapa Anak Yatim?: Anak yang belum baligh dan ayahnya telah wafat; status yatim berakhir ketika anak mencapai usia baligh dan dewasa/cakap mengelola harta (rusyd).',
        'Kewajiban Wali Pengelola: Menjaga aset anak yatim, mengembangkannya secara amanah (tidak dibiarkan habis termakan biaya), dan menyerahkan penuh saat mereka dewasa (QS. An-Nisa\': 6).',
        'Boleh Mengambil Upah Sewajarnya jika Fakir: Pengasuh yang miskin boleh mengambil sekadar kebutuhan wajar sebagai imbalan menjaga; pengasuh yang mampu hendaknya menjaga secara sukarela.',
        'Adab Pencatatan: Wajib menghadirkan saksi dan mencatat aset saat menyerahkan kembali harta anak yatim.'
      ],
      practice: 'Jika dipercaya mengelola santunan atau aset anak yatim, pisahkan rekeningnya dari rekening pribadi agar terhindar dari campur aduk harta.',
      source: quran('4/10')
    },
    {
      id: 'urutan-penyelesaian-harta-waris',
      title: '4 Langkah Sebelum Membagi Harta Warisan',
      category: 'Prosedur Faraidh',
      summary: 'Harta peninggalan mayit tidak langsung dibagi ke ahli waris sebelum menyelesaikan biaya jenazah, utang, dan wasiat.',
      points: [
        'Langkah 1 — Biaya Pengurusan Jenazah: Kain kafan, pemandian, dan pemakaman secukupnya tanpa berlebih-lebihan.',
        'Langkah 2 — Pelunasan Seluruh Utang: Utang kepada sesama manusia maupun utang agama (zakat yang belum dibayar, nadzar, fidyah).',
        'Langkah 3 — Penunaian Wasiat: Maksimal ⅓ dari sisa harta bersih setelah dikurangi utang.',
        'Langkah 4 — Pembagian Faraidh: Barulah seluruh sisa harta menjadi hak penuh para ahli waris sesuai porsi Al-Qur\'an.'
      ],
      practice: 'Catat daftar utang, piutang, dan aset Anda dalam dokumen keluarga yang rapi agar tidak menyulitkan ahli waris kelak.',
      source: quran('4/11')
    }
  ]
};

export const kepemimpinanIslami: Course = {
  id: 'kepemimpinan-islami',
  title: 'Kepemimpinan, Organisasi, & Manajemen Konflik Islami',
  description: 'Prinsip syura, memilih rekan kerja berintegritas, delegasi tugas, dan penyelesaian sengketa (ishlah) dalam organisasi.',
  note: '"Setiap kalian adalah pemimpin dan setiap kalian akan dimintai pertanggungjawaban atas apa yang dipimpinnya" (HR. Bukhari-Muslim).',
  lessons: [
    {
      id: 'kriteria-pemimpin-al-qawiyyul-amin',
      title: 'Standar Kepemimpinan: Al-Qawiyyul Amin (Kompeten & Amanah)',
      category: 'Dasar Kepemimpinan',
      summary: 'Al-Qur\'an merumuskan dua syarat inti pemegang amanah: kuat/kompeten di bidangnya (qawiyy) dan jujur/terpercaya (amin) — QS. Al-Qashash: 26.',
      points: [
        'Kompeten Tanpa Amanah: Melahirkan penyalahgunaan wewenang dan korupsi cerdas.',
        'Amanah Tanpa Kompetensi: Mengakibatkan organisasi jalan di tempat dan proyek gagal dijalankan dengan baik.',
        'Larangan Meminta Jabatan karena Ambisi Pribadi (HR. Bukhari-Muslim): Jika jabatan diberikan karena amanah umat, pertolongan Allah menyertai.',
        'Keteladanan Mendahului Perintah: Pemimpin Muslim memimpin dengan contoh nyata (qudwah hasanah) sebagaimana Nabi SAW ikut menggali parit Khandaq.'
      ],
      practice: 'Saat merekrut anggota tim atau memilih pengurus, nilai dua aspek ini seimbang: rekam jejak kejujurannya dan keahlian nyatanya.',
      source: quran('28/26')
    },
    {
      id: 'syura-delegasi-akuntabilitas',
      title: 'Syura (Musyawarah), Delegasi, & Akuntabilitas',
      category: 'Manajemen Organisasi',
      summary: 'Rasulullah SAW mempraktikkan syura dalam strategi Perang Badar, Uhud, dan Khandaq, lalu mendelegasikan tugas ke sahabat sesuai bakatnya.',
      points: [
        'Syura yang Melibatkan Ahli: Nabi SAW menerima usulan Hubab bin Mundzir (lokasi sumur Badar) dan Salman al-Farisi (parit Khandaq) meski berasal dari ide sahabat.',
        'Delegasi Berbasis Bakat: Khalid bin Walid dipercaya di bidang militer, Zaid bin Tsabit di bidang bahasa & penulisan wahyu, Mu\'adz bin Jabal sebagai hakim & pengajar di Yaman.',
        'Prinsip "Inna Allah yuhibbu itqan": Pekerjaan dikerjakan dengan standar rapi, terukur, dan dievaluasi secara berkala (muhasabah).'
      ],
      practice: 'Dalam rapat tim berikutnya, beri kesempatan anggota termuda berbicara terlebih dahulu agar ide segar tidak tenggelam oleh senioritas.',
      source: quran('3/159')
    },
    {
      id: 'ishlah-manajemen-konflik',
      title: 'Manajemen Konflik & Seni Mendamaikan (Ishlah)',
      category: 'Resolusi Konflik',
      summary: 'Al-Qur\'an memerintahkan ishlah (mendamaikan) saat dua kelompok berselisih dengan adil, tanpa memihak buta, dan menjaga rahasia masing-masing.',
      points: [
        'Tabayyun Sebelum Menilai (QS. Al-Hujurat: 6): Dengarkan kedua belah pihak secara seimbang (audi alteram partem) sebagaimana wasiat Nabi SAW kepada Ali bin Abi Thalib.',
        'Prinsip Ishlah yang Adil (QS. Al-Hujurat: 9): Menegakkan keadilan di atas empati, bukan membela kerabat yang salah.',
        'Menjaga Aib Pihak Bertikai: Mediator tidak menyebarkan rahasia konflik ke publik; fokus mencari titik temu maslahah.',
        'Boleh Mengucap Kata Penyejuk Saat Mendamaikan (HR. Bukhari-Muslim): Menyampaikan kebaikan dari satu pihak kepada pihak lain agar hati kembali lunak.'
      ],
      practice: 'Jika melihat dua rekan kerja atau kerabat berselisih, jadilah penengah yang mendengarkan dengan tenang bukan penyebar isu.',
      source: quran('49/9')
    }
  ]
};

export const fiqhDarahWanita: Course = {
  id: 'fiqh-darah-wanita',
  title: 'Fiqh Darah Wanita: Haid, Nifas, & Istihadhah',
  description: 'Panduan detail membedakan darah haid, nifas, dan istihadhah, batas harinya, serta hukum shalat, puasa, dan qadha.',
  note: 'Memahami fiqh darah wanita adalah kewajiban fardhu \'ain bagi setiap muslimah agar ibadahnya sah dan tenang.',
  lessons: [
    {
      id: 'membedakan-haid-dan-suci',
      title: 'Mengenal Darah Haid: Batas Hari, Warna, & Larangan',
      category: 'Haid',
      summary: 'Dalam Mazhab Syafi\'i, batas minimal haid adalah sehari semalam (24 jam), umumnya 6–7 hari, dan maksimal 15 hari 15 malam.',
      points: [
        'Batas Masa Suci Minimal: Jarak minimal antara dua haid adalah 15 hari suci.',
        'Tanda Suci: Berhentinya darah secara total (kering ketika diusap kapas) atau keluarnya cairan putih bening (qashshah baidha\').',
        'Ibadah yang Dilarang Saat Haid: Shalat, puasa, thawaf di Ka\'bah, menyentuh mushaf Al-Qur\'an langsung, berdiam di masjid, dan berhubungan suami istri (QS. Al-Baqarah: 222).',
        'Kewajiban Qadha: Wanita haid hanya wajib mengqadha puasa Ramadan yang tertinggal dan tidak wajib mengqadha shalat (HR. Bukhari-Muslim).'
      ],
      practice: 'Catat tanggal mulai dan selesai haid setiap bulan agar Anda mengenali pola siklus normal diri sendiri.',
      source: quran('2/222')
    },
    {
      id: 'hukum-darah-nifas',
      title: 'Darah Nifas Pasca Melahirkan & Keguguran',
      category: 'Nifas',
      summary: 'Nifas adalah darah yang keluar setelah melahirkan; umumnya 40 hari dan maksimal 60 hari menurut Mazhab Syafi\'i.',
      points: [
        'Kapan Mulai Dihitung?: Dihitung sejak bayi lahir (darah sebelum melahirkan belum disebut nifas, melainkan masih wajib shalat semampunya jika belum haid).',
        'Jika Berhenti Sebelum 40 Hari: Wanita wajib langsung mandi besar dan shalat saat darah sudah benar-benar berhenti, tanpa harus menunggu 40 hari.',
        'Keguguran: Jika janin sudah berbentuk manusia (umumnya ≥ 80–90 hari kehamilan) maka darahnya adalah nifas; jika masih berupa segumpal darah awal, sebagian ulama menyebutnya istihadhah/fasad.'
      ],
      practice: 'Siapkan catatan hari pertama melahirkan agar mudah memantau berakhirnya masa nifas.',
      source: hadith(320)
    },
    {
      id: 'istihadhah-dan-tata-cara-shalat',
      title: 'Istihadhah (Darah Penyakit) & Tata Cara Shalatnya',
      category: 'Istihadhah',
      summary: 'Darah yang keluar melewati batas maksimal haid (15 hari) atau nifas (60 hari) disebut istihadhah; wanita istihadhah tetap wajib shalat dan puasa.',
      points: [
        'Cara Menentukan Haid vs Istihadhah: Pertama, lihat sifat darah (tamyiz — darah hitam/kental adalah haid, darah merah encer istihadhah); kedua, ikuti kebiasaan siklus bulan sebelumnya (misal 7 hari).',
        'Tata Cara Shalat Wanita Istihadhah (HR. Bukhari): Bersihkan area kemaluan, pakai pembalut yang rapat, lalu berwudhu setiap kali hendak shalat setelah masuk waktunya.',
        'Satu Wudhu Satu Shalat Wajib: Wudhu tersebut sah dipakai untuk shalat fardhu yang bersangkutan beserta shalat sunnah pengiringnya selama belum batal karena hal lain (buang angin/kecil).'
      ],
      practice: 'Jika mengalami pendarahan berkepanjangan melebihi 15 hari, segera konsultasi medis ke dokter obgyn sekaligus gunakan panduan istihadhah agar shalat tetap terjaga.',
      source: hadith(306)
    }
  ]
};

export const fiqhPropertiGadai: Course = {
  id: 'fiqh-properti-gadai',
  title: 'Fiqh Properti, KPR Syariah, & Gadai (Rahn)',
  description: 'Rincian akad Murabahah, Musyarakah Mutanaqisah, Rahn (gadai syariah), serta akad Salam & Istishna\' untuk pre-order.',
  note: 'Memilih akad properti dan pembiayaan halal menjaga ketenangan rumah tangga dan keberkahan aset jangka panjang.',
  lessons: [
    {
      id: 'kpr-syariah-murabahah-mmq',
      title: 'KPR Syariah: Akad Murabahah vs Musyarakah Mutanaqisah (MMQ)',
      category: 'Properti Syariah',
      summary: 'KPR syariah menghindari pinjaman berbunga (riba) dengan menggantinya menjadi jual beli margin tetap (Murabahah) atau kepemilikan bersama bertahap (MMQ).',
      points: [
        'Akad Murabahah (Jual Beli Margin Tetap): Bank/developer membeli rumah lalu menjualnya ke nasabah dengan harga pokok + margin yang disepakati di awal; cicilan tetap hingga lunas tanpa bunga mengambang.',
        'Akad Musyarakah Mutanaqisah (MMQ): Bank dan nasabah patungan membeli rumah; porsi kepemilikan bank dibeli nasabah bertahap setiap bulan disertai sewa (ujrah) atas porsi milik bank.',
        'Aturan Denda Keterlambatan (Ta\'zir): Bank syariah tidak boleh mengambil denda sebagai keuntungan pribadi; denda ta\'zir (jika ada) wajib disalurkan ke dana sosial/infak (Fatwa DSN-MUI).',
        'Waspada KPR Syariah Bodong: Pastikan legalitas sertifikat tanah (SHM/IMB), rekam jejak developer, dan pengawasan DPS resmi jika melalui lembaga keuangan.'
      ],
      practice: 'Gunakan fitur Simulasi Pembiayaan Murabahah di aplikasi ini untuk membandingkan total harga jual sebelum menandatangani akad rumah.',
      source: quran('2/275')
    },
    {
      id: 'gadai-syariah-rahn',
      title: 'Gadai Syariah (Rahn): Aturan Jaminan & Biaya Titipan',
      category: 'Gadai (Rahn)',
      summary: 'Dalam Rahn, barang jaminan (marhun) tetap milik penggadai; pemberi pinjaman tidak boleh memanfaatkannya kecuali sekadar biaya nyata pemeliharaan.',
      points: [
        'Dasar Hukum (QS. Al-Baqarah: 283 & HR. Bukhari): Nabi SAW pernah menggadaikan baju besinya kepada seorang Yahudi di Madinah untuk membeli gandum.',
        'Larangan Mengambil Manfaat Barang Gadai: Pemberi utang haram menyewakan atau memakai kendaraan/rumah gadai demi keuntungan utang (termasuk riba).',
        'Ujrah Penitipan (Ijarah): Pada pegadaian syariah resmi (DSN-MUI), biaya penitipan/asuransi brankas dihitung berdasarkan biaya nyata penyimpanan, bukan persentase besaran pinjaman.',
        'Jika Gagal Bayar: Barang jaminan dijual secara adil; jika hasil jual melebihi utang, kelebihannya wajib dikembalikan ke pemilik barang.'
      ],
      practice: 'Jika butuh dana mendesak dengan jaminan emas, pilih layanan Rahn syariah resmi daripada gadai berbunga atau pinjol ilegal.',
      source: quran('2/283')
    },
    {
      id: 'preorder-salam-istishna',
      title: 'Jual Beli Pre-Order: Akad Salam & Istishna\'',
      category: 'Muamalah Modern',
      summary: 'Meski menjual barang yang belum ada dilarang, Islam membolehkan pre-order lewat akad Salam (bayar penuh di muka) dan Istishna\' (pesan buat/properti).',
      points: [
        'Akad Salam (Pre-Order Barang Komoditas): Pembayaran wajib lunas 100% di awal akad, dengan spesifikasi barang, jumlah, dan tanggal pengiriman yang jelas (HR. Bukhari-Muslim).',
        'Akad Istishna\' (Pesan Pembuatan / Konstruksi): Cocok untuk pesan jahit baju, furnitur, atau bangun rumah indent; pembayaran boleh dicicil sesuai progres pembangunan.',
        'Kunci Kehalalan Pre-Order: Kejelasan spesifikasi, tenggat serah terima, dan tidak menjual sesuatu yang tidak mampu diserahterimakan penjual.'
      ],
      practice: 'Saat menjual produk pre-order, cantumkan spesifikasi ukuran/bahan, estimasi tanggal kirim, dan skema pembayaran secara tertulis.',
      source: hadith(2240)
    }
  ]
};

export const adabTidurMimpi: Course = {
  id: 'adab-tidur-mimpi',
  title: 'Adab Tidur, Bangun Malam, & Memahami Mimpi',
  description: 'Sunnah sebelum tidur, adab bangun malam, serta membedakan 3 jenis mimpi menurut hadits Rasulullah SAW.',
  note: 'Tidur dengan adab sunnah mengubah sepertiga umur manusia menjadi pahala ibadah dan penjagaan malaikat.',
  lessons: [
    {
      id: 'sunnah-sebelum-tidur',
      title: 'Rangkaian Sunnah Rasulullah SAW Sebelum Tidur',
      category: 'Adab Tidur',
      summary: 'Berwudhu, mengibas tempat tidur 3 kali, berbaring miring ke kanan, membaca Ayat Kursi & 3 Qul, serta berdoa menutup hari.',
      points: [
        'Wudhu & Mengibas Tempat Tidur (HR. Bukhari-Muslim): Wudhu sebelum tidur didoakan malaikat sepanjang malam; kibas seprai sambil membaca Bismillah untuk menjaga kebersihan.',
        'Posisi Tidur Sunnah: Miring ke sisi kanan (dengan tangan kanan di bawah pipi jika nyaman) dan dilarang tidur tengkurap tanpa uzur.',
        'Benteng Dzikir Sebelum Tidur: Membaca Ayat Kursi (penjaga dari setan hingga Subuh), 2 ayat terakhir Al-Baqarah, serta meniup telapak tangan dengan Al-Ikhlas, Al-Falaq, An-Nas 3x lalu mengusapkannya ke tubuh.',
        'Doa Tidur & Maafkan Manusia: "Bismika Allahumma amutu wa ahya" serta membersihkan hati dari dendam sebelum memejamkan mata.'
      ],
      practice: 'Mulai malam ini, lakukan urutan 3 langkah cepat sebelum tidur: wudhu, Ayat Kursi, dan 3 Qul.',
      source: hadith(6314)
    },
    {
      id: 'tiga-jenis-mimpi-islam',
      title: 'Memahami Tiga Jenis Mimpi & Sikap Saat Mimpi Buruk',
      category: 'Adab Mimpi',
      summary: 'Rasulullah SAW membagi mimpi menjadi kabar gembira dari Allah, bisikan pikiran sendiri (bunga tidur), dan gangguan setan.',
      points: [
        '1. Ru\'ya Shadiqah (Mimpi Baik dari Allah): Bersyukurlah, puji Allah, dan ceritakan hanya kepada orang yang tulus mencintai Anda (HR. Bukhari).',
        '2. Haditsun Nafs (Bunga Tidur): Cerminan kekhawatiran, aktivitas, atau obsesi harian kita — tidak memiliki makna gaib.',
        '3. Takhwif Minal Syaithan (Mimpi Buruk dari Setan): Jangan panik dan jangan diceritakan kepada siapa pun! Meludah kecil ke kiri 3x, baca Ta\'awudz 3x, ubah posisi tidur, dan shalat jika terjaga (HR. Muslim).',
        'Haram Mengarang Mimpi Palsu: Berdusta mengaku bermimpi melihat sesuatu yang tidak dilihat diancam hukuman berat di akhirat (HR. Bukhari).'
      ],
      practice: 'Jika terbangun karena mimpi buruk, jangan langsung menceritakannya ke grup chat; cukup berlindung kepada Allah dan ubah posisi tidur.',
      source: hadith(6985)
    },
    {
      id: 'adab-bangun-malam',
      title: 'Adab Bangun Tidur & Menghidupkan Sepertiga Malam',
      category: 'Bangun Malam',
      summary: 'Mengucap hamdalah ("Alhamdulillahilladzi ahyana ba\'da ma amatana..."), mencuci tangan, dan menunaikan Tahajud atau shalat Subuh tepat waktu.',
      points: [
        'Melepas 3 Ikatan Setan Saat Bangun (HR. Bukhari-Muslim): Ikatan pertama lepas dengan dzikir bangun tidur, kedua dengan wudhu, ketiga dengan shalat — sehingga jiwa menjadi bersemangat.',
        'Mencuci Tangan Sebelum Memasukkan ke Wadah Air: Sunnah higienitas Nabi SAW karena tangan tidak tahu di mana ia bermalam.',
        'Membaca 10 Ayat Terakhir Ali \'Imran: Sunnah Nabi SAW saat bangun untuk shalat malam sambil menatap langit.'
      ],
      practice: 'Latih diri langsung mengucap hamdalah dan doa bangun tidur begitu mata terbuka sebelum menyentuh ponsel.',
      source: hadith(1142)
    }
  ]
};

export const ilmuwanMuslim: Course = {
  id: 'ilmuwan-muslim',
  title: 'Biografi Ilmuwan Muslim Perintis Sains Modern',
  description: 'Mengenal karya dan metode ilmiah Ibnu al-Haytham, Al-Khawarizmi, Ibnu Sina, Al-Jazari, dan Al-Biruni.',
  note: 'Para ilmuwan Muslim tidak memisahkan laboratorium dari masjid; bagi mereka meneliti hukum alam adalah membaca ayat-ayat kauniyah Allah.',
  lessons: [
    {
      id: 'ibnu-al-haytham-al-khawarizmi',
      title: 'Ibnu al-Haytham (Bapak Optik) & Al-Khawarizmi (Bapak Aljabar)',
      category: 'Matematika & Fisika',
      summary: 'Ibnu al-Haytham merumuskan metode ilmiah berbasis eksperimen modern; Al-Khawarizmi melahirkan Aljabar dan konsep Algoritma.',
      points: [
        'Al-Hasan Ibnu al-Haytham (965–1040 M): Menulis Kitab al-Manazir (Book of Optics); membuktikan bahwa mata melihat karena pantulan cahaya masuk ke mata dan merintis prinsip kamera obscura.',
        'Perintis Metode Ilmiah: Ia menegaskan bahwa kebenaran teori harus diuji lewat eksperimen berulang, bukan sekadar asumsi filosofis.',
        'Muhammad bin Musa Al-Khawarizmi (780–850 M): Bekerja di Baitul Hikmah Baghdad; bukunya Al-Jabr wal-Muqabalah menjadi asal kata "Aljabar", dan namanya diabadikan menjadi istilah "Algoritma".'
      ],
      practice: 'Saat menulis kode komputer atau menghitung persamaan matematika, ingatlah warisan intelektual Al-Khawarizmi dan niatkan ilmu untuk kebaikan.',
      source: quran('3/190')
    },
    {
      id: 'ibnu-sina-al-zahrawi-kedokteran',
      title: 'Ibnu Sina & Az-Zahrawi: Pelopor Kedokteran & Bedah Modern',
      category: 'Kedokteran',
      summary: 'Karya Al-Qanun fit-Thibb milik Ibnu Sina menjadi buku ajar fakultas kedokteran Eropa selama lebih dari 500 tahun.',
      points: [
        'Ibnu Sina / Avicenna (980–1037 M): Hafal Al-Qur\'an di usia 10 tahun; menyusun Al-Qanun fit-Thibb yang merumuskan konsep karantina penyakit menular (40 hari / al-arba\'iniyyah) dan uji klinis obat.',
        'Abul Qasim Az-Zahrawi (936–1013 M): Dokter bedah terbesar dari Cordoba (Andalusia); merancang lebih dari 200 instrumen bedah modern (pisau bedah, benang jahit catgut yang larut di tubuh).',
        'Rumah Sakit Islam (Bimaristan): Sudah memiliki bangsal terpisah, apotek, perpustakaan, serta layanan gratis bagi seluruh warga tanpa memandang agama.'
      ],
      practice: 'Teladani etos Ibnu Sina yang selalu shalat dua rakaat memohon petunjuk Allah setiap kali menemui kesulitan memahami masalah ilmiah.',
      source: quran('26/80')
    },
    {
      id: 'al-jazari-al-biruni-maryam',
      title: 'Al-Jazari, Al-Biruni, & Maryam al-Asturlabi: Teknik & Astronomi',
      category: 'Teknik & Astronomi',
      summary: 'Al-Jazari menciptakan mekanisme poros engkol & robotika awal; Al-Biruni mengukur keliling bumi dengan presisi luar biasa.',
      points: [
        'Badi\'uzzaman Al-Jazari (1136–1206 M): Insinyur mekanik yang merancang pompa air otomatis, jam gajah, dan mekanisme crankshaft-connecting rod (fondasi mesin modern).',
        'Abu Rayhan Al-Biruni (973–1048 M): Mengukur jari-jari dan keliling bumi dari puncak gunung di India hanya dengan selisih kurang dari 1% dibanding pengukuran satelit modern.',
        'Maryam al-Asturlabi (Abad ke-10 M): Ilmuwan muslimah asal Aleppo yang mahir merancang astrolab canggih untuk navigasi, penentuan waktu shalat, dan arah kiblat.'
      ],
      practice: 'Dorong generasi muda Muslim untuk menguasai sains, AI, teknik, dan kedokteran dengan landasan akhlak Al-Qur\'an.',
      source: quran('55/5')
    }
  ]
};

export const kaligrafiIslam: Course = {
  id: 'kaligrafi-islam',
  title: 'Sejarah & Jenis Kaligrafi Islam (Khat Arab)',
  description: 'Mengenal 6 gaya khat utama (Naskhi, Tsuluts, Riq\'ah, Diwani, Kufi, Farisi) dan perannya dalam peradaban Islam.',
  note: 'Seni kaligrafi Islam lahir dari kecintaan umat menjaga keindahan tulisan wahyu Al-Qur\'an dan hadits.',
  lessons: [
    {
      id: 'sejarah-perkembangan-khat',
      title: 'Lahirnya Seni Khat Arab & Tokoh Ibnu Muqlah',
      category: 'Sejarah Khat',
      summary: 'Dari tulisan Kufi geometris tanpa titik di awal Islam, kaligrafi berkembang menjadi seni presisi geometris berkat kaidah Ibnu Muqlah.',
      points: [
        'Khat Kufi (Gaya Tertua): Berbentuk tegas, menyudut, dan geometris; dipakai menulis mushaf-mushaf Utsmani awal dan dekorasi masjid.',
        'Revolusi Ibnu Muqlah (Abad ke-10 M): Merumuskan standar proporsi huruf berdasarkan titik pena bambu (qalam) dan lingkaran huruf Alif (Al-Khat al-Mansub).',
        'Pena Qalam & Tinta Alami: Kaligrafer tradisional memotong miring ujung pena bambu/alang-alang dengan sudut khusus untuk menghasilkan ketebalan garis yang harmonis.'
      ],
      practice: 'Perhatikan tulisan mushaf Al-Qur\'an di rumah Anda — amati keteraturan tinggi huruf Alif dan lengkungan huruf Nun.',
      source: quran('68/1')
    },
    {
      id: 'enam-gaya-khat-utama',
      title: 'Mengenal 6 Gaya Khat Utama (Al-Aqlam As-Sittah & Modern)',
      category: 'Jenis Khat',
      summary: 'Setiap gaya khat punya fungsi berbeda: Naskhi untuk mushaf & buku, Tsuluts untuk judul & masjid, Riq\'ah untuk tulisan tangan cepat.',
      points: [
        '1. Khat Naskhi: Paling jelas, seimbang, dan mudah dibaca — menjadi standar penulisan Mushaf Al-Qur\'an dan buku cetak modern.',
        '2. Khat Tsuluts: Paling megah dan artistik — banyak menghiasi kubah masjid, pintu Ka\'bah, dan judul kaligrafi.',
        '3. Khat Riq\'ah: Ringkas, sederhana, dan cepat ditulis — menjadi standar tulisan tangan sehari-hari di dunia Arab.',
        '4. Khat Diwani & Farisi (Nasta\'liq): Diwani lahir di istana Utsmani dengan lengkungan anggun; Farisi/Nasta\'liq populer untuk puisi dan naskah Asia Selatan/Persia.'
      ],
      practice: 'Buka halaman 29 Huruf Hijaiyah di aplikasi ini untuk membandingkan bentuk dasar huruf sebelum belajar menulis khat Naskhi.',
      source: quran('96/4')
    }
  ]
};

export const fiqhPasien: Course = {
  id: 'fiqh-pasien',
  title: 'Fiqh Pasien, Rumah Sakit, & Ibadah Saat Sakit',
  description: 'Panduan bersuci dan shalat bagi pasien dengan infus, gips, atau kateter, shalat berbaring, serta hukum obat saat puasa.',
  note: '"Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya" (QS. Al-Baqarah: 286); sakit tidak menggugurkan shalat, melainkan meringankan caranya.',
  lessons: [
    {
      id: 'bersuci-pasien-infus-gips',
      title: 'Cara Wudhu & Tayammum Pasien (Infus, Gips, & Kateter)',
      category: 'Thaharah Pasien',
      summary: 'Bagian tubuh yang diperban atau digips cukup diusap dengan tangan basah; pasien yang tidak mampu memakai air dapat bertayammum di dinding/debu suci.',
      points: [
        'Luka Diperban / Gips / Infus (Mash \'alal Jabirah): Basuh kulit sehat di sekitarnya dengan air, sedangkan bagian yang tertutup gips/plester cukup diusap lembut dengan air (atau tayammum sebagai pengganti bagian yang tidak boleh kena air menurut Syafi\'iyah).',
        'Pasien Terpasang Kateter (Da\'imul Hadats): Tetap wajib shalat; bersihkan najis semampunya, berwudhu/tayammum setiap masuk waktu shalat, lalu langsung shalat tanpa batal meski air seni masih mengalir ke kantong kateter.',
        'Tayammum Praktis di RS: Gunakan debu suci yang disiapkan di kain/bantal atau permukaan bersih berdebu; tepuk dua kali lalu usap wajah dan kedua telapak tangan hingga pergelangan.'
      ],
      practice: 'Bagi keluarga penunggu pasien di RS, siapkan botol spray air dan tisu basah/handuk kecil agar pasien tetap nyaman bersuci.',
      source: quran('5/6')
    },
    {
      id: 'tata-cara-shalat-berbaring',
      title: 'Tata Cara Shalat Duduk, Berbaring, & Isyarat',
      category: 'Shalat Pasien',
      summary: 'Hadits Imran bin Hushain (HR. Bukhari): Shalatlah sambil berdiri; jika tidak mampu maka duduk; jika tidak mampu maka berbaring miring.',
      points: [
        'Shalat Duduk: Duduk di kursi atau di atas tempat tidur; rukuk dengan menundukkan kepala/punggung sedikit, sujud dengan membungkuk lebih rendah (atau sujud normal jika mampu di lantai).',
        'Shalat Berbaring Miring ke Kanan: Wajah dan dada menghadap kiblat (jika tempat tidur bisa diarahkan); jika tempat tidur tidak dapat diputar ke kiblat, shalat menghadap arah mana saja sesuai kemampuan.',
        'Shalat Telentang: Kaki diarahkan ke kiblat dengan kepala sedikit diganjal bantal menghadap kiblat; rukuk dan sujud dilakukan dengan isyarat kepala atau kedipan mata.',
        'Boleh Menjama\' Shalat (Dzuhur+Ashar / Maghrib+Isya\'): Pasien yang mengalami kesulitan berat atau jadwal operasi boleh menjama\' shalat tanpa mengqasharnya.'
      ],
      practice: 'Ingatkan anggota keluarga yang sedang dirawat di rumah sakit bahwa shalat tetap wajib dikerjakan semampunya dan bisa dilakukan sambil berbaring.',
      source: hadith(1117)
    },
    {
      id: 'obat-medis-saat-puasa',
      title: 'Hukum Obat Medis & Tindakan Dokter Saat Puasa Ramadan',
      category: 'Puasa & Medis',
      summary: 'Suntikan non-nutrisi, obat tetes mata, oksigen murni, dan cek darah tidak membatalkan puasa; infus nutrisi dan cuci darah (hemodialisis) membatalkan.',
      points: [
        'Tidak Membatalkan Puasa (Mayoritas Ulama & Majma\' Fiqh): Suntikan obat IM/IV bukan nutrisi, tes darah/gula darah, obat tetes mata/telinga (selama gendang telinga utuh), oksigen biasa, dan sikat gigi tanpa tertelan.',
        'Obat Inhaler Asma: Ada perbedaan pendapat ulama; sebagian besar mufti kontemporer membolehkan untuk darurat sesak napas ringan (lebih hati-hati: jika ragu, berbuka dan qadha).',
        'Membatalkan Puasa: Infus cairan glukosa/nutrisi, transfusi darah, serta cuci darah (hemodialisis) yang mengeluarkan lalu memasukkan kembali darah bersama cairan nutrisi.',
        'Keringanan Pasien Kronis: Penderita sakit menahun yang tidak ada harapan sembuh untuk berpuasa cukup membayar fidyah.'
      ],
      practice: 'Konsultasikan jadwal minum obat rutin (seperti obat diabetes/hipertensi) kepada dokter sebelum Ramadan agar dosis bisa disesuaikan ke waktu sahur & buka.',
      source: quran('2/184')
    }
  ]
};

export const fiqhSembelihanHalal: Course = {
  id: 'fiqh-sembelihan-halal',
  title: 'Fiqh Sembelihan Halal (JULEHA) & Bahan Pangan',
  description: 'Syarat penyembelihan syar\'i, hukum pemingsanan (stunning), dan titik kritis bahan pangan modern seperti gelatin dan emulsifier.',
  note: 'Memastikan kehalalan daging dan bahan olahan bukan sekadar aturan kuliner, melainkan penentu diterimanya doa (HR. Muslim).',
  lessons: [
    {
      id: 'syarat-penyembelihan-syari',
      title: 'Rukun & Syarat Penyembelihan Syar\'i (Standar JULEHA)',
      category: 'Penyembelihan',
      summary: 'Hewan darat halal wajib disembelih oleh Muslim (atau Ahli Kitab yang sah menurut syarat ketat), menyebut nama Allah, dan memutus saluran napas & makan.',
      points: [
        'Penyembelih: Muslim yang berakal sehat (atau mumayyiz); wajib membaca "Bismillah" dengan sadar saat menyembelih.',
        'Alat Sembelih: Pisau/benda tajam dari logam/batu selain tulang dan kuku; memotong sekali tekan dengan cepat agar tidak menyiksa hewan (ihsan — HR. Muslim).',
        '3–4 Saluran yang Diputus: Saluran napas (hulqum/trakea), saluran makan (mari\'/esofagus), dan dua urat leher (wadajain) tanpa memutus tulang leher sebelum hewan mati.',
        'Hewan Mati Sebelum Disembelih (Bangkai): Haram mutlak dimakan.'
      ],
      practice: 'Saat membeli daging di pasar atau menyembelih qurban, pastikan juru sembelihnya Muslim yang memahami rukun sembelihan syar\'i.',
      source: quran('6/118')
    },
    {
      id: 'hukum-stunning-dan-mesin',
      title: 'Hukum Pemingsanan Hewan (Stunning) & Penyembelihan Mekanis',
      category: 'Industri Halal',
      summary: 'Fatwa MUI membolehkan stunning (pemingsanan ringan) hanya sebagai alat bantu memudahkan penyembelihan selama hewan dipastikan masih hidup (hayat mustaqirrah) saat disembelih.',
      points: [
        'Syarat Ketat Stunning (Fatwa MUI): Hanya boleh membuat hewan pingsan sementara (tidak mematikan dan tidak menyiksa permanen); jika hewan mati akibat stunning sebelum pisau menyentuh leher, dagingnya menjadi bangkai (haram).',
        'Penyembelihan Ayam Mekanis (RPH Modern): Dibolehkan dengan syarat operator Muslim membaca Bismillah per batch/saat menyalakan mesin dan memantau setiap ekor yang terlewat agar disembelih manual.',
        'Bangkai Ikan & Belalang: Dikecualikan dari kewajiban sembelihan — seluruh hewan laut yang hidup di air halal bangkainya (HR. Abu Dawud).'
      ],
      practice: 'Pilih daging ayam/sapi kemasan yang telah memiliki sertifikat halal resmi BPJPH/MUI agar rantai sembelihannya terjamin.',
      source: hadith(1955)
    },
    {
      id: 'titik-kritis-bahan-pangan',
      title: 'Mengenali Titik Kritis Bahan Pangan Modern',
      category: 'Literasi Halal',
      summary: 'Produk olahan sering memakai turunan hewani atau alkohol tersembunyi seperti gelatin, rennet keju, L-cysteine, emulsifier, dan mirin.',
      points: [
        'Gelatin & Kolagen (Permen kenyal, marshmallow, kapsul obat): Berasal dari tulang/kulit sapi atau babi — wajib bersertifikat halal.',
        'Emulsifier (E471 / Mono-digliserida) & Shortening: Bisa berasal dari lemak nabati atau lemak hewani (babi/sapi tidak disembelih syar\'i).',
        'Keju & Enzim Rennet: Rennet hewani dari lambung anak sapi harus berasal dari sembelihan halal, atau gunakan rennet mikroba/nabati.',
        'Mirin, Sake, Angciu, & Rum dalam Masakan: Mengandung khamar/arak masakan — haram digunakan dalam masakan meski alkoholnya menguap saat dipanaskan (Fatwa MUI).'
      ],
      practice: 'Biasakan membaca daftar komposisi (ingredients) dan memastikan logo Halal resmi saat membeli makanan kemasan atau bumbu dapur impor.',
      source: quran('2/168')
    }
  ]
};

export const masjidBersejarah: Course = {
  id: 'masjid-bersejarah',
  title: 'Sejarah & Keutamaan Masjid Bersejarah',
  description: 'Mengenal Masjidil Haram, Masjid Nabawi, Masjid Al-Aqsha, Masjid Quba, Qiblatain, Cordoba, hingga masjid Nusantara.',
  note: 'Masjid bukan sekadar tempat sujud, melainkan pusat pembinaan umat, pendidikan, musyawarah, dan mercusuar peradaban Islam.',
  lessons: [
    {
      id: 'tiga-masjid-suci-dan-quba',
      title: 'Tiga Masjid Suci & Masjid Quba (Masjid Pertama dalam Islam)',
      category: 'Masjid Utama',
      summary: 'Satu shalat di Masjidil Haram bernilai 100.000 kali, di Masjid Nabawi 1.000 kali, di Al-Aqsha 250–500 kali, dan shalat di Quba berpahala umrah.',
      points: [
        'Masjidil Haram (Makkah): Dibangun pondasinya oleh Nabi Ibrahim & Ismail AS di sekitar Ka\'bah; kiblat seluruh umat Islam.',
        'Masjid Nabawi (Madinah): Dibangun langsung oleh Rasulullah SAW dan para sahabat saat tiba di Madinah; di dalamnya terdapat Raudhah ("taman dari taman-taman surga").',
        'Masjid Al-Aqsha (Yerusalem): Kiblat pertama umat Islam dan titik awal Mi\'raj Nabi SAW.',
        'Masjid Quba (Madinah): Masjid pertama yang dibangun Nabi SAW saat hijrah; bersuci dari rumah lalu shalat sunnah 2 rakaat di sana berpahala seperti umrah (HR. Tirmidzi).'
      ],
      practice: 'Jika berkesempatan umrah/haji ke Madinah, luangkan waktu berwudhu dari hotel untuk shalat sunnah di Masjid Quba.',
      source: hadith(1190)
    },
    {
      id: 'masjid-bersejarah-dunia-islam',
      title: 'Masjid Qiblatain, Masjid Cordoba, & Hagia Sophia',
      category: 'Warisan Dunia',
      summary: 'Dari tempat turunnya wahyu pemindahan kiblat hingga monumen arsitektur Andalusia dan Konstantinopel.',
      points: [
        'Masjid Qiblatain (Madinah): Tempat Nabi SAW dan sahabat memutar arah shalat dari Baitul Maqdis ke Ka\'bah di tengah-tengah shalat Dzuhur/Ashar setelah turunnya QS. Al-Baqarah: 144.',
        'Masjid Agung Cordoba (Spanyol): Dibangun Dinasti Umayyah Andalusia (785 M) dengan ratusan lengkungan pilar merah-putih ikonik dan menjadi pusat keilmuan Eropa.',
        'Masjid Al-Azhar (Kairo, Mesir): Didirikan tahun 970 M dan bertahan lebih dari seribu tahun sebagai universitas Islam tertua yang masih aktif melahirkan ulama dunia.',
        'Masjid Sultan Ahmed (Masjid Biru) & Aya Sofya (Istanbul): Simbol kejayaan arsitektur kesultanan Utsmani.'
      ],
      practice: 'Pelajari fungsi sosial masjid di masa Nabi SAW agar masjid di lingkungan kita juga ramah anak, musafir, dan pelajar.',
      source: quran('2/144')
    },
    {
      id: 'masjid-bersejarah-nusantara',
      title: 'Masjid Bersejarah di Indonesia & Kearifan Arsitekturnya',
      category: 'Masjid Nusantara',
      summary: 'Masjid Agung Demak, Menara Kudus, dan Baiturrahman Aceh memadukan fungsi ibadah murni dengan kearifan budaya lokal tanpa meninggalkan syariat.',
      points: [
        'Masjid Agung Demak (1479 M): Dibangun para Walisongo dengan atap tumpang tiga (simbol Iman, Islam, Ihsan) dan empat soko guru kayu jati.',
        'Masjid Menara Kudus (1549 M): Dibangun Sunan Kudus dengan akulturasi arsitektur bata merah yang merangkul masyarakat lokal dengan damai.',
        'Masjid Raya Baiturrahman (Banda Aceh): Masjid bersejarah Kesultanan Aceh yang menjadi benteng perjuangan sekaligus selamat kokoh saat Tsunami Aceh 2004.',
        'Adab Memakmurkan Masjid (QS. At-Taubah: 18): Menjaga kebersihan, shalat tahiyatul masjid 2 rakaat sebelum duduk, dan menghindari transaksi jual beli di ruang shalat.'
      ],
      practice: 'Biasakan shalat Tahiyatul Masjid 2 rakaat setiap kali memasuki masjid sebelum duduk.',
      source: quran('9/18')
    }
  ]
};

export const ilmuMantikMunazharah: Course = {
  id: 'ilmu-mantik-munazharah',
  title: 'Ilmu Mantik & Etika Berdiskusi (Munazharah)',
  description: 'Dasar logika berpikir lurus dalam tradisi ulama Islam, mengenali sesat pikir (fallacy), dan adab berdebat ilmiah.',
  note: 'Al-Qur\'an mengajak manusia berpikir lurus ("afala ta\'qilun"); ulama besar seperti Al-Ghazali menulis kitab Mantik untuk menjaga nalar umat dari kesesatan argumen.',
  lessons: [
    {
      id: 'pengantar-ilmu-mantik',
      title: 'Mengenal Ilmu Mantik (Logika Lurus) dalam Tradisi Ulama',
      category: 'Dasar Mantik',
      summary: 'Ilmu Mantik adalah aturan berpikir untuk menjaga akal agar tidak salah mengambil kesimpulan; digunakan ulama dalam Ushul Fiqh (Qiyas) dan Akidah.',
      points: [
        'Tashawwur (Konsep) & Tashdiq (Putusan): Memahami definisi suatu istilah secara tepat sebelum menghukuminya benar atau salah ("Al-hukmu \'ala syai\'in far\'un \'an tashawwurihi").',
        'Qiyas / Silogisme Sederhana: Premis mayor + premis minor → kesimpulan. Contoh: Semua yang memabukkan adalah khamar; minuman X memabukkan → maka X adalah khamar.',
        'Pembagian Dalalah (Penunjukan Makna): Membedakan makna hakiki, makna kelaziman, dan istilah syar\'i vs istilah bahasa.'
      ],
      practice: 'Sebelum mengomentari isu keagamaan atau berita viral, pastikan Anda sudah memahami definisi istilah yang diperdebatkan dengan tepat.',
      source: quran('17/36')
    },
    {
      id: 'mengenali-sesat-pikir',
      title: 'Mengenali Sesat Pikir (Mughalathah / Logical Fallacy)',
      category: 'Nalar Kritis',
      summary: 'Banyak perdebatan kusir di media sosial terjadi karena sesat pikir: menyerang pribadi (ad hominem), menyamakan dua hal berbeda, atau generalisasi terburu-buru.',
      points: [
        'Menyerang Pribadi (Ad Hominem): Mengabaikan argumen ilmiah lawan lalu menghina fisik, suku, atau masa lalunya.',
        'Generalisasi Berlebihan (Ta\'mim): Menilai seluruh kelompok atau ormas sesat hanya karena kesalahan satu-dua oknum.',
        'Menyamakan Tanpa \'Illat yang Sama (Qiyas Ma\'al Fariq): Membandingkan dua hukum yang sebab utamanya berbeda jauh.',
        'Otoritas Tanpa Dalil: Memaksakan pendapat hanya karena tokoh terkenal mengucapkannya tanpa menguji kesesuaian dengan Al-Qur\'an & Hadits.'
      ],
      practice: 'Saat membaca komentar perdebatan di internet, latih diri memisahkan mana argumen berdalil dan mana serangan emosional.',
      source: quran('49/6')
    },
    {
      id: 'adab-munazharah-imam-syafii',
      title: 'Adab Berdebat Ilmiah (Munazharah) Ala Imam Asy-Syafi\'i',
      category: 'Etika Diskusi',
      summary: 'Tujuan diskusi dalam Islam bukan mengalahkan lawan atau mencari tepuk tangan, melainkan mencari kebenaran — meski kebenaran itu muncul lewat lisan lawan.',
      points: [
        'Pesan Emas Imam Syafi\'i: "Aku tidak pernah berdiskusi dengan seseorang kecuali aku berharap Allah menampakkan kebenaran lewat lisannya."',
        'Syarat Berdiskusi (QS. An-Nahl: 125): Dengan hikmah (ilmu), nasihat yang baik, dan bantahlah dengan cara yang paling santun (ahsan).',
        'Kapan Harus Berhenti Berdebat? (HR. Abu Dawud): Nabi SAW menjamin rumah di pinggiran surga bagi orang yang meninggalkan perdebatan kusir meski ia berada di pihak yang benar.',
        'Mengakui Kesalahan dengan Lapang Dada: Rujuk ilal haq (kembali kepada kebenaran) jauh lebih mulia daripada mempertahankan gengsi.'
      ],
      practice: 'Jika diskusi di media sosial sudah berubah menjadi saling ejek, undur diri dengan santun dan doakan kebaikan bagi lawan bicara.',
      source: quran('16/125')
    }
  ]
};

export const courseLinks = [
  { href: '/tazkiyah', title: tazkiyah.title, description: tazkiyah.description },
  { href: '/aqidah', title: aqidah.title, description: aqidah.description },
  { href: '/fiqh', title: fiqh.title, description: fiqh.description },
  { href: '/ushul-fiqh', title: ushulFiqh.title, description: ushulFiqh.description },
  { href: '/musthalah-hadits', title: musthalahHadits.title, description: musthalahHadits.description },
  { href: '/peradaban', title: peradaban.title, description: peradaban.description },
  { href: '/parenting', title: parenting.title, description: parenting.description },
  { href: '/ulumul-quran', title: ulumulQuran.title, description: ulumulQuran.description },
  { href: '/faraidh', title: faraidh.title, description: faraidh.description },
  { href: '/adab-digital', title: adabDigital.title, description: adabDigital.description },
  { href: '/muslimah', title: muslimah.title, description: muslimah.description },
  { href: '/siyasah', title: siyasah.title, description: siyasah.description },
  { href: '/fitnah-akhir-zaman', title: fitnahAkhirZaman.title, description: fitnahAkhirZaman.description },
  { href: '/kisah-nabi', title: kisahNabi.title, description: kisahNabi.description },
  { href: '/islam-nusantara', title: islamNusantara.title, description: islamNusantara.description },
  { href: '/sahabat-surga', title: sahabatSurga.title, description: sahabatSurga.description },
  { href: '/lingkungan', title: lingkungan.title, description: lingkungan.description },
  { href: '/fiqh-dakwah', title: fiqhDakwah.title, description: fiqhDakwah.description },
  { href: '/munakahat', title: munakahat.title, description: munakahat.description },
  { href: '/muamalah', title: muamalah.title, description: muamalah.description },
  { href: '/integritas', title: integritas.title, description: integritas.description },
  { href: '/komparasi', title: komparasi.title, description: komparasi.description },
  { href: '/sains', title: sains.title, description: sains.description },
  { href: '/makanan-halal', title: makananHalal.title, description: makananHalal.description },
  { href: '/medis', title: medis.title, description: medis.description },
  { href: '/sirah', title: sirah.title, description: sirah.description },
  { href: '/tajweed', title: 'Ilmu Tajwid & Makhraj Huruf', description: '20 kaidah bacaan, 17 makhraj dalam 5 wilayah, serta latihan artikulasi huruf.' },
  { href: '/balaghoh', title: balaghoh.title, description: balaghoh.description },
  { href: '/alam-ghaib', title: alamGhaib.title, description: alamGhaib.description },
  { href: '/adab-ikhtilaf', title: adabIkhtilaf.title, description: adabIkhtilaf.description },
  { href: '/zakat-kontemporer', title: zakatKontemporer.title, description: zakatKontemporer.description },
  { href: '/wakaf', title: wakaf.title, description: wakaf.description },
  { href: '/jenazah-praktis', title: jenazahPraktis.title, description: jenazahPraktis.description },
  { href: '/ilmu-tafsir', title: ilmuTafsir.title, description: ilmuTafsir.description },
  { href: '/nahwu-dasar', title: nahwuDasar.title, description: nahwuDasar.description },
  { href: '/adab-profesi', title: adabProfesi.title, description: adabProfesi.description },
  { href: '/hukum-keluarga-indonesia', title: hukumKeluargaIndonesia.title, description: hukumKeluargaIndonesia.description },
  { href: '/ekonomi-syariah', title: ekonomiSyariah.title, description: ekonomiSyariah.description },
  { href: '/fiqh-ramadan', title: fiqhRamadan.title, description: fiqhRamadan.description },
  { href: '/sharaf-dasar', title: sharafDasar.title, description: sharafDasar.description },
  { href: '/tadabbur-juz-amma', title: tadabburJuzAmma.title, description: tadabburJuzAmma.description },
  { href: '/fiqh-haji-umrah', title: fiqhHajiUmrah.title, description: fiqhHajiUmrah.description },
  { href: '/fiqh-qurban-aqiqah', title: fiqhQurbanAqiqah.title, description: fiqhQurbanAqiqah.description },
  { href: '/psikologi-islam', title: psikologiIslam.title, description: psikologiIslam.description },
  { href: '/imam-madzhab', title: imamMadzhab.title, description: imamMadzhab.description },
  { href: '/fiqh-kontemporer', title: fiqhKontemporer.title, description: fiqhKontemporer.description },
  { href: '/ilmu-qiraat', title: ilmuQiraat.title, description: ilmuQiraat.description },
  { href: '/fiqh-safar', title: fiqhSafar.title, description: fiqhSafar.description },
  { href: '/fiqh-hiburan', title: fiqhHiburan.title, description: fiqhHiburan.description },
  { href: '/metode-tahfidz', title: metodeTahfidz.title, description: metodeTahfidz.description },
  { href: '/adab-menuntut-ilmu', title: adabMenuntutIlmu.title, description: adabMenuntutIlmu.description },
  { href: '/birrul-walidain', title: birrulWalidain.title, description: birrulWalidain.description },
  { href: '/baitul-maqdis', title: baitulMaqdis.title, description: baitulMaqdis.description },
  { href: '/khulafaur-rasyidin', title: khulafaurRasyidin.title, description: khulafaurRasyidin.description },
  { href: '/fiqh-jamaah-sujud', title: fiqhJamaahSujud.title, description: fiqhJamaahSujud.description },
  { href: '/kisah-pilihan-quran', title: kisahPilihanQuran.title, description: kisahPilihanQuran.description },
  { href: '/sejarah-dinasti-islam', title: sejarahDinastiIslam.title, description: sejarahDinastiIslam.description },
  { href: '/panduan-muallaf', title: panduanMuallaf.title, description: panduanMuallaf.description },
  { href: '/adab-lisan-majelis', title: adabLisanMajelis.title, description: adabLisanMajelis.description },
  { href: '/tadabbur-asmaul-husna', title: tadabburAsmaulHusna.title, description: tadabburAsmaulHusna.description },
  { href: '/tadabbur-surat-pilihan', title: tadabburSuratPilihan.title, description: tadabburSuratPilihan.description },
  { href: '/fiqh-sumpah-kaffarah', title: fiqhSumpahKaffarah.title, description: fiqhSumpahKaffarah.description },
  { href: '/fiqh-wasiat-hibah', title: fiqhWasiatHibah.title, description: fiqhWasiatHibah.description },
  { href: '/kepemimpinan-islami', title: kepemimpinanIslami.title, description: kepemimpinanIslami.description },
  { href: '/fiqh-darah-wanita', title: fiqhDarahWanita.title, description: fiqhDarahWanita.description },
  { href: '/fiqh-properti-gadai', title: fiqhPropertiGadai.title, description: fiqhPropertiGadai.description },
  { href: '/adab-tidur-mimpi', title: adabTidurMimpi.title, description: adabTidurMimpi.description },
  { href: '/ilmuwan-muslim', title: ilmuwanMuslim.title, description: ilmuwanMuslim.description },
  { href: '/kaligrafi-islam', title: kaligrafiIslam.title, description: kaligrafiIslam.description },
  { href: '/fiqh-pasien', title: fiqhPasien.title, description: fiqhPasien.description },
  { href: '/fiqh-sembelihan-halal', title: fiqhSembelihanHalal.title, description: fiqhSembelihanHalal.description },
  { href: '/masjid-bersejarah', title: masjidBersejarah.title, description: masjidBersejarah.description },
  { href: '/ilmu-mantik-munazharah', title: ilmuMantikMunazharah.title, description: ilmuMantikMunazharah.description },
];
