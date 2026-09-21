import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Panduan Jenazah, Yasinan, Haji dan Umrah",
  description: "Panduan shalat jenazah, susunan doa Yasinan, serta tata cara pelaksanaan haji dan umrah.",
};

const jenazah = [
  ["Persiapan", "Jenazah telah dimandikan dan dikafani, lalu diletakkan di depan imam. Jamaah suci, menutup aurat, dan menghadap kiblat. Shalat dilakukan sambil berdiri bagi yang mampu, tanpa rukuk dan sujud."],
  ["Niat dan takbir pertama", "Niatkan shalat jenazah dalam hati untuk memenuhi fardu kifayah, lalu takbiratul ihram. Setelah takbir pertama, baca Surah Al-Fatihah."],
  ["Takbir kedua", "Bertakbir, kemudian membaca shalawat kepada Nabi. Shalawat Ibrahimiyah seperti dalam tasyahud akhir dapat digunakan."],
  ["Takbir ketiga", "Bertakbir, kemudian berdoa dengan ikhlas untuk jenazah. Gunakan doa yang sesuai; dhamir dapat disesuaikan untuk jenazah laki-laki, perempuan, atau jamak."],
  ["Takbir keempat dan salam", "Bertakbir, berdoa singkat, lalu mengucapkan salam. Terdapat perbedaan yang diakui mengenai satu atau dua salam; ikuti imam dan tuntunan guru setempat."],
] as const;

const bacaanJenazah = [
  {
    title: "Doa setelah takbir ketiga",
    arab: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ",
    latin: "Allahummaghfir lahu warhamhu, wa 'afihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' mudkhalahu, waghsilhu bil-ma'i wats-tsalji wal-baradi, wa naqqihi minal-khathaya kama naqqaitats-tsaubal-abyadha minad-danas.",
    arti: "Ya Allah, ampunilah dan rahmatilah dia, selamatkan dan maafkanlah dia. Muliakan tempat singgahnya, luaskan tempat masuknya, basuhlah dia dengan air, salju, dan embun, serta bersihkanlah dia dari kesalahan sebagaimana kain putih dibersihkan dari noda.",
  },
  {
    title: "Doa ringkas untuk seluruh kaum Muslim",
    arab: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا",
    latin: "Allahummaghfir lihayyina wa mayyitina, wa syahidina wa gha'ibina, wa shaghirina wa kabirina, wa dzakarina wa untsana.",
    arti: "Ya Allah, ampunilah orang yang hidup dan yang wafat di antara kami, yang hadir dan yang tidak hadir, yang kecil dan yang besar, serta laki-laki dan perempuan di antara kami.",
  },
] as const;

const yasinan = [
  ["Niat dan pembukaan", "Niatkan membaca Al-Qur'an, berzikir, dan berdoa karena Allah. Majelis dapat dibuka dengan basmalah, istigfar, syahadat, dan shalawat. Susunan ini bukan rukun yang harus selalu sama."],
  ["Hadiah doa", "Sampaikan maksud doa dengan bahasa yang dipahami, misalnya memohon ampun dan rahmat bagi keluarga yang wafat. Hindari keyakinan bahwa hari atau susunan tertentu bersifat wajib tanpa dalil."],
  ["Membaca Surah Yasin", "Baca Surah Yasin dengan tartil. Boleh dibaca bersama atau bergiliran sesuai kebiasaan yang menjaga adab membaca Al-Qur'an."],
  ["Tahlil dan zikir", "Majelis dapat dilanjutkan dengan istigfar, tasbih, tahmid, takbir, tahlil, dan shalawat. Jumlah bacaan mengikuti tuntunan majelis dan tidak diyakini sebagai kewajiban agama."],
  ["Doa penutup", "Berdoalah memohon penerimaan amal, ampunan, rahmat bagi orang yang wafat, serta kebaikan bagi keluarga. Doa boleh memakai bahasa Arab maupun bahasa yang dipahami."],
] as const;

const haji = [
  ["Tentukan jenis haji", "Pilih tamattu', qiran, atau ifrad sesuai bimbingan penyelenggara. Jamaah Indonesia umumnya menjalankan tamattu': umrah terlebih dahulu, tahallul, lalu ihram haji pada 8 Zulhijah."],
  ["Ihram dari miqat", "Mandi dan bersiap sebelum miqat, mengenakan pakaian ihram, berniat, lalu membaca talbiyah. Sejak niat, jauhi larangan ihram. Lokasi miqat mengikuti arah kedatangan."],
  ["Umrah bagi haji tamattu'", "Lakukan tawaf tujuh putaran, shalat dua rakaat bila memungkinkan, sai Safa-Marwah tujuh lintasan, lalu cukur atau pendekkan rambut untuk tahallul."],
  ["8 Zulhijah: menuju Mina", "Berniat ihram haji dari tempat tinggal, membaca talbiyah, lalu menuju Mina. Kerjakan shalat pada waktunya sesuai bimbingan rombongan dan bermalam di Mina."],
  ["9 Zulhijah: wukuf di Arafah", "Berada di Arafah pada waktunya adalah rukun haji. Perbanyak doa, zikir, dan istigfar. Setelah matahari terbenam, bergerak menuju Muzdalifah dengan tertib."],
  ["Muzdalifah dan Mina", "Bermalam di Muzdalifah sesuai ketentuan dan siapkan kerikil secukupnya. Pada 10 Zulhijah di Mina, lontar Jamrah Aqabah tujuh kali, sembelih hadyu bagi tamattu'/qiran, lalu bercukur untuk tahallul awal."],
  ["Tawaf ifadah dan sai", "Kembali ke Makkah untuk tawaf ifadah tujuh putaran. Lakukan sai bila belum dilaksanakan sesuai jenis hajinya. Setelah seluruh sebab tahallul terpenuhi, larangan ihram berakhir."],
  ["Hari tasyrik", "Bermalam di Mina dan melontar tiga jamrah berurutan: Ula, Wustha, lalu Aqabah, masing-masing tujuh kali. Nafar awal dilakukan pada 12 Zulhijah dengan syaratnya; nafar tsani dilanjutkan sampai 13 Zulhijah."],
  ["Tawaf wada'", "Sebelum meninggalkan Makkah, lakukan tawaf perpisahan bagi yang terkena kewajiban. Perempuan haid atau nifas mendapat keringanan sesuai tuntunan syariat."],
] as const;

const umrah = [
  ["Ihram dari miqat", "Bersuci dan memakai pakaian ihram, lalu niat umrah di miqat yang sesuai. Ucapkan talbiyah dan jaga seluruh larangan ihram."],
  ["Tawaf", "Setelah tiba di Masjidil Haram, hentikan talbiyah ketika mulai tawaf. Kelilingi Ka'bah tujuh putaran mulai dan berakhir sejajar Hajar Aswad, dengan Ka'bah di sebelah kiri."],
  ["Shalat dan minum zamzam", "Setelah tawaf, shalat dua rakaat di tempat yang memungkinkan tanpa mengganggu jamaah, kemudian minum zamzam dan berdoa."],
  ["Sai", "Mulai dari Safa menuju Marwah dan akhiri di Marwah. Perjalanan Safa ke Marwah dihitung satu lintasan; selesaikan tujuh lintasan sambil berzikir dan berdoa."],
  ["Tahallul", "Cukur atau pendekkan rambut. Laki-laki dianjurkan mencukur seluruh rambut; perempuan memotong sedikit ujung rambut. Umrah selesai dan larangan ihram berakhir."],
] as const;

function Steps({ items }: Readonly<{ items: ReadonlyArray<readonly [string, string]> }>) {
  return <ol className="grid gap-4">{items.map(([title, detail], index) => <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-slate-200 pb-5 dark:border-slate-800"><span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{index + 1}</span><div><h3 className="font-bold text-lg">{title}</h3><p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{detail}</p></div></li>)}</ol>;
}

const sectionClass = "scroll-mt-24 space-y-6 border-t border-slate-200 pt-8 dark:border-slate-800";

export default function PanduanIbadahPage() {
  return <main className="mx-auto max-w-5xl space-y-10 px-4 py-8">
    <header className="bg-emerald-950 px-6 py-10 text-white sm:px-10">
      <p className="text-sm font-semibold text-emerald-300">Panduan praktik umat</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Jenazah, Yasinan, Haji dan Umrah</h1>
      <p className="mt-4 max-w-3xl leading-7 text-emerald-100">Urutan pelaksanaan, bacaan penting, dan catatan praktis untuk membantu belajar sebelum mengikuti bimbingan langsung dari ustaz, pembimbing manasik, atau petugas setempat.</p>
    </header>

    <nav aria-label="Daftar panduan" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[["#jenazah", "Shalat Jenazah", "4 takbir dan bacaan"], ["#yasinan", "Doa Yasinan", "Susunan majelis dan doa"], ["#haji", "Pelaksanaan Haji", "Dari miqat hingga wada"], ["#umrah", "Pelaksanaan Umrah", "Ihram hingga tahallul"]].map(([href, title, note]) => <a key={href} href={href} className="border border-slate-200 bg-white p-4 hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900"><strong className="block">{title}</strong><span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{note}</span></a>)}
    </nav>

    <aside className="border-l-4 border-amber-500 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100">Panduan ini bersifat pembelajaran dasar. Detail niat, bacaan, dam, kondisi uzur, dan perbedaan mazhab perlu dikonsultasikan kepada pembimbing yang memahami keadaan Anda.</aside>

    <section id="jenazah" className={sectionClass}>
      <div><p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Fardu kifayah</p><h2 className="mt-1 text-2xl font-bold">Tata cara shalat jenazah</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Imam berdiri sejajar kepala jenazah laki-laki dan sekitar bagian tengah jenazah perempuan. Posisi ini merupakan tuntunan; sahnya shalat tidak bergantung pada ketepatan posisi tersebut.</p></div>
      <figure className="space-y-3"><a href="/images/ibadah/sholat-jenazah.png" target="_blank" rel="noopener noreferrer"><Image src="/images/ibadah/sholat-jenazah.png" width={1536} height={1024} alt="Ilustrasi posisi shalat jenazah: imam dan jamaah berdiri menghadap kiblat, jenazah di depan, tangan di bawah dada, tanpa rukuk dan sujud." className="w-full h-auto rounded-2xl" /></a><figcaption className="text-sm leading-6 text-slate-500">Ilustrasi AI peraga masa kini, bukan penggambaran Nabi. Gambar menunjukkan posisi berdiri, letak jenazah, dan posisi tangan. Ikuti langkah tertulis di bawah. Ketuk untuk memperbesar.</figcaption></figure>
      <Steps items={jenazah} />
      <div className="space-y-3"><h3 className="text-xl font-bold">Bacaan doa</h3>{bacaanJenazah.map(item => <details key={item.title} className="border border-slate-200 p-5 dark:border-slate-800"><summary className="cursor-pointer font-semibold">{item.title}</summary><p lang="ar" dir="rtl" className="arabic-text my-5">{item.arab}</p><p className="italic leading-7 text-slate-600 dark:text-slate-300">{item.latin}</p><p className="mt-3 leading-7"><strong>Arti:</strong> {item.arti}</p></details>)}</div>
    </section>

    <section id="yasinan" className={sectionClass}>
      <div><p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Tilawah, zikir, dan doa</p><h2 className="mt-1 text-2xl font-bold">Susunan Yasinan dan doa</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Yasinan adalah tradisi majelis membaca Surah Yasin, berzikir, dan berdoa yang dikenal di banyak masyarakat Muslim Indonesia. Pelaksanaannya tidak memiliki satu susunan baku; terdapat perbedaan pandangan ulama mengenai pengkhususan waktu dan bentuknya, sehingga sikap saling menghormati perlu dijaga.</p></div>
      <Steps items={yasinan} />
      <Link href="/quran?surah=36" className="inline-flex bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800">Buka Surah Yasin</Link>
      <div className="border border-slate-200 p-5 dark:border-slate-800"><h3 className="font-bold">Doa penutup yang dapat dibaca</h3><p lang="ar" dir="rtl" className="arabic-text my-5">اللَّهُمَّ اغْفِرْ لَنَا وَلِوَالِدَيْنَا وَلِمَشَايِخِنَا وَلِجَمِيعِ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ، الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ، وَتَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ</p><p className="italic leading-7 text-slate-600 dark:text-slate-300">Allahummaghfir lana wa liwalidaina wa limasyayikhina wa lijami&apos;il-muslimina wal-muslimat, al-ahya&apos;i minhum wal-amwat, wa taqabbal minna innaka Antas-Sami&apos;ul-&apos;Alim.</p><p className="mt-3 leading-7"><strong>Arti:</strong> Ya Allah, ampunilah kami, kedua orang tua kami, guru-guru kami, dan seluruh Muslim laki-laki dan perempuan, yang hidup maupun yang telah wafat. Terimalah amal kami; sungguh Engkau Maha Mendengar lagi Maha Mengetahui.</p></div>
    </section>

    <section id="haji" className={sectionClass}>
      <div><p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Manasik 8-13 Zulhijah</p><h2 className="mt-1 text-2xl font-bold">Tata cara pelaksanaan haji</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Rukun haji mencakup ihram, wukuf di Arafah, tawaf ifadah, sai, bercukur, dan tertib menurut rincian mazhab Syafi&apos;i. Meninggalkan rukun tidak dapat diselesaikan hanya dengan membayar dam.</p></div>
      <Steps items={haji} />
    </section>

    <section id="umrah" className={sectionClass}>
      <div><p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Manasik ringkas</p><h2 className="mt-1 text-2xl font-bold">Tata cara pelaksanaan umrah</h2><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Umrah dapat dilaksanakan sepanjang tahun, kecuali pembatasan teknis dan ketentuan penyelenggaraan yang berlaku. Berbeda dari haji, umrah tidak mencakup wukuf di Arafah, mabit di Muzdalifah dan Mina, maupun melontar jamrah.</p></div>
      <Steps items={umrah} />
    </section>

    <section className={sectionClass}>
      <h2 className="text-2xl font-bold">Rujukan utama</h2>
      <ul className="list-disc space-y-2 pl-6 leading-7">
        <li><a className="text-emerald-700 underline dark:text-emerald-300" href="https://quran.com/2/196" target="_blank" rel="noopener noreferrer">QS. Al-Baqarah 2:196</a> tentang menyempurnakan haji dan umrah karena Allah.</li>
        <li><a className="text-emerald-700 underline dark:text-emerald-300" href="https://quran.com/3/97" target="_blank" rel="noopener noreferrer">QS. Ali Imran 3:97</a> tentang kewajiban haji bagi yang mampu.</li>
        <li><a className="text-emerald-700 underline dark:text-emerald-300" href="https://sunnah.com/muslim:1218a" target="_blank" rel="noopener noreferrer">Sahih Muslim 1218a</a>, hadis Jabir mengenai tata cara haji Nabi.</li>
        <li><a className="text-emerald-700 underline dark:text-emerald-300" href="https://sunnah.com/muslim:963a" target="_blank" rel="noopener noreferrer">Sahih Muslim 963a</a>, doa Nabi dalam shalat jenazah.</li>
      </ul>
    </section>
  </main>;
}
