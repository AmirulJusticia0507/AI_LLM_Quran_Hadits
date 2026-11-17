"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const jenazahId = [
  ["Persiapan", "Jenazah telah dimandikan dan dikafani, lalu diletakkan di depan imam. Jamaah suci, menutup aurat, dan menghadap kiblat. Shalat dilakukan sambil berdiri bagi yang mampu, tanpa rukuk dan sujud."],
  ["Niat dan takbir pertama", "Niatkan shalat jenazah dalam hati untuk memenuhi fardu kifayah, lalu takbiratul ihram. Setelah takbir pertama, baca Surah Al-Fatihah."],
  ["Takbir kedua", "Bertakbir, kemudian membaca shalawat kepada Nabi. Shalawat Ibrahimiyah seperti dalam tasyahud akhir dapat digunakan."],
  ["Takbir ketiga", "Bertakbir, kemudian berdoa dengan ikhlas untuk jenazah. Gunakan doa yang sesuai; dhamir dapat disesuaikan untuk jenazah laki-laki, perempuan, atau jamak."],
  ["Takbir keempat dan salam", "Bertakbir, berdoa singkat, lalu mengucapkan salam. Terdapat perbedaan yang diakui mengenai satu atau dua salam; ikuti imam dan tuntunan guru setempat."],
] as const;

const jenazahEn = [
  ["Preparation", "The deceased is washed and shrouded, then placed before the imam. Worshippers must be in ritual purity, cover their awrah, and face the Qiblah. The prayer is performed standing for those able, without ruku' or sujud."],
  ["Intention & 1st Takbir", "Intend the funeral prayer in the heart to fulfill fard kifayah, then pronounce takbiratul ihram. After the first takbir, recite Surah Al-Fatihah."],
  ["2nd Takbir", "Pronounce takbir, then send blessings upon the Prophet (peace be upon him). The Ibrahimiyyah blessings as in the final tashahhud are recommended."],
  ["3rd Takbir", "Pronounce takbir, then make sincere supplication for the deceased. Pronouns may be adapted for male, female, or multiple deceased."],
  ["4th Takbir & Salam", "Pronounce takbir, offer a brief supplication, and end with the salam. Both one or two salams are recognized in authentic traditions; follow the imam."],
] as const;

const bacaanJenazah = [
  {
    titleId: "Doa setelah takbir ketiga",
    titleEn: "Supplication after the 3rd takbir",
    arab: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ",
    latin: "Allahummaghfir lahu warhamhu, wa 'afihi wa'fu 'anhu, wa akrim nuzulahu, wa wassi' mudkhalahu, waghsilhu bil-ma'i wats-tsalji wal-baradi, wa naqqihi minal-khathaya kama naqqaitats-tsaubal-abyadha minad-danas.",
    artiId: "Ya Allah, ampunilah dan rahmatilah dia, selamatkan dan maafkanlah dia. Muliakan tempat singgahnya, luaskan tempat masuknya, basuhlah dia dengan air, salju, dan embun, serta bersihkanlah dia dari kesalahan sebagaimana kain putih dibersihkan dari noda.",
    artiEn: "O Allah, forgive and have mercy upon him, excuse him and pardon him. Honor his dwelling, expand his entrance, wash him with water, snow, and hail, and cleanse him of transgressions as a white garment is cleansed from stains.",
  },
  {
    titleId: "Doa ringkas untuk seluruh kaum Muslim",
    titleEn: "Concise supplication for all Muslims",
    arab: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا",
    latin: "Allahummaghfir lihayyina wa mayyitina, wa syahidina wa gha'ibina, wa shaghirina wa kabirina, wa dzakarina wa untsana.",
    artiId: "Ya Allah, ampunilah orang yang hidup dan yang wafat di antara kami, yang hadir dan yang tidak hadir, yang kecil dan yang besar, serta laki-laki dan perempuan di antara kami.",
    artiEn: "O Allah, forgive our living and our deceased, those present and those absent, our young and our old, our males and our females.",
  },
] as const;

const yasinanId = [
  ["Niat dan pembukaan", "Niatkan membaca Al-Qur'an, berzikir, dan berdoa karena Allah. Majelis dapat dibuka dengan basmalah, istigfar, syahadat, dan shalawat. Susunan ini bukan rukun yang harus selalu sama."],
  ["Hadiah doa", "Sampaikan maksud doa dengan bahasa yang dipahami, misalnya memohon ampun dan rahmat bagi keluarga yang wafat. Hindari keyakinan bahwa hari atau susunan tertentu bersifat wajib tanpa dalil."],
  ["Membaca Surah Yasin", "Baca Surah Yasin dengan tartil. Boleh dibaca bersama atau bergiliran sesuai kebiasaan yang menjaga adab membaca Al-Qur'an."],
  ["Tahlil dan zikir", "Majelis dapat dilanjutkan dengan istigfar, tasbih, tahmid, takbir, tahlil, dan shalawat. Jumlah bacaan mengikuti tuntunan majelis dan tidak diyakini sebagai kewajiban agama."],
  ["Doa penutup", "Berdoalah memohon penerimaan amal, ampunan, rahmat bagi orang yang wafat, serta kebaikan bagi keluarga. Doa boleh memakai bahasa Arab maupun bahasa yang dipahami."],
] as const;

const yasinanEn = [
  ["Intention & Opening", "Intend Quranic recitation, dhikr, and supplication sincerely for Allah. The gathering may commence with basmalah, istighfar, shahadah, and blessings upon the Prophet. This format is a customary recommendation, not a fixed religious requirement."],
  ["Dedication of Dua", "Express the objective of supplication in your language, seeking forgiveness and mercy for deceased family members. Avoid believing that specific days or counts are religiously binding without textual proof."],
  ["Reciting Surah Yasin", "Recite Surah Yasin with proper tajweed and tartil. It may be recited collectively or alternately according to Quranic reading etiquette."],
  ["Tahlil and Remembrance", "The gathering may proceed with istighfar, tasbih, tahmid, takbir, tahlil, and salawat according to the group's custom without viewing the counts as religious mandates."],
  ["Closing Supplication", "Pray for acceptance of good deeds, forgiveness, mercy for the deceased, and goodness for family members. Supplications may be in Arabic or your own language."],
] as const;

const hajiId = [
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

const hajiEn = [
  ["Choose Hajj Type", "Select Tamattu', Qiran, or Ifrad based on your guidance. Pilgrims generally perform Tamattu': completing Umrah first, performing tahallul, and entering ihram for Hajj on the 8th of Dhul-Hijjah."],
  ["Ihram from the Miqat", "Perform ghusl and prepare before the miqat, wear ihram garments, make the intention, and recite the talbiyah. Observe all ihram prohibitions immediately."],
  ["Umrah for Hajj Tamattu'", "Perform tawaf of seven circuits, pray two rak'ahs if feasible, perform sa'i between Safa and Marwah for seven laps, then trim or shave hair for tahallul."],
  ["8th Dhul-Hijjah: To Mina", "Enter ihram for Hajj from your accommodation, recite talbiyah, and proceed to Mina. Perform the five daily prayers in their times and spend the night in Mina."],
  ["9th Dhul-Hijjah: Wuquf at Arafah", "Standing at Arafah during its time is the supreme pillar of Hajj. Engage in abundant dua, dhikr, and seeking forgiveness. Move to Muzdalifah in an orderly manner after sunset."],
  ["Muzdalifah and Mina", "Spend the night in Muzdalifah according to guidelines and gather pebbles. On the 10th of Dhul-Hijjah in Mina, stone Jamrat al-Aqabah seven times, slaughter the hady for Tamattu'/Qiran, and shave/trim hair for the first tahallul."],
  ["Tawaf al-Ifadah and Sa'i", "Return to Makkah to perform Tawaf al-Ifadah (seven circuits). Perform sa'i if not yet completed according to your hajj type. All ihram restrictions are lifted once conditions are fulfilled."],
  ["Days of Tashriq", "Spend the nights in Mina and stone all three pillars sequentially: Al-Ula, Al-Wusta, and Al-Aqabah, each with seven pebbles. Early departure (nafar awwal) can occur on the 12th; full departure is on the 13th."],
  ["Tawaf al-Wada'", "Before leaving Makkah, perform the farewell circumambulation for those obligated. Women experiencing menstruation or postnatal bleeding are exempted according to sharia guidelines."],
] as const;

const umrahId = [
  ["Ihram dari miqat", "Bersuci dan memakai pakaian ihram, lalu niat umrah di miqat yang sesuai. Ucapkan talbiyah dan jaga seluruh larangan ihram."],
  ["Tawaf", "Setelah tiba di Masjidil Haram, hentikan talbiyah ketika mulai tawaf. Kelilingi Ka'bah tujuh putaran mulai dan berakhir sejajar Hajar Aswad, dengan Ka'bah di sebelah kiri."],
  ["Shalat dan minum zamzam", "Setelah tawaf, shalat dua rakaat di tempat yang memungkinkan tanpa mengganggu jamaah, kemudian minum zamzam dan berdoa."],
  ["Sai", "Mulai dari Safa menuju Marwah dan akhiri di Marwah. Perjalanan Safa ke Marwah dihitung satu lintasan; selesaikan tujuh lintasan sambil berzikir dan berdoa."],
  ["Tahallul", "Cukur atau pendekkan rambut. Laki-laki dianjurkan mencukur seluruh rambut; perempuan memotong sedikit ujung rambut. Umrah selesai dan larangan ihram berakhir."],
] as const;

const umrahEn = [
  ["Ihram from the Miqat", "Purify yourself, put on ihram garments, and make the intention for Umrah at the designated miqat. Recite the talbiyah and strictly avoid ihram prohibitions."],
  ["Tawaf", "Upon arriving at the Sacred Mosque, cease talbiyah at the start of tawaf. Circle the Ka'bah seven times starting and ending aligned with the Black Stone, keeping the Ka'bah to your left."],
  ["Prayer & Zamzam", "After tawaf, pray two rak'ahs wherever feasible without obstructing others, then drink Zamzam water and make supplications."],
  ["Sa'i", "Start at Safa and walk toward Marwah, concluding at Marwah. The traverse from Safa to Marwah counts as one lap; complete seven laps while engaging in dhikr and supplication."],
  ["Tahallul", "Shave or trim hair. Men are encouraged to shave completely; women trim a fingertip length from the hair ends. Umrah is now complete and all ihram restrictions are lifted."],
] as const;

function Steps({ items }: Readonly<{ items: ReadonlyArray<readonly [string, string]> }>) {
  return (
    <ol className="grid gap-4">
      {items.map(([title, detail], index) => (
        <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
          <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            {index + 1}
          </span>
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

const sectionClass = "scroll-mt-24 space-y-6 border-t border-slate-200 pt-8 dark:border-slate-800";

export default function PanduanIbadahPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const navLinks = isEn
    ? [
        ["#jenazah", "Funeral Prayer (Janazah)", "4 takbirs and recitations"],
        ["#yasinan", "Yasin Recitation", "Assembly order & supplication"],
        ["#haji", "Hajj Pilgrimage", "From miqat to farewell tawaf"],
        ["#umrah", "Umrah Pilgrimage", "From ihram to tahallul"],
      ]
    : [
        ["#jenazah", "Shalat Jenazah", "4 takbir dan bacaan"],
        ["#yasinan", "Doa Yasinan", "Susunan majelis dan doa"],
        ["#haji", "Pelaksanaan Haji", "Dari miqat hingga wada"],
        ["#umrah", "Pelaksanaan Umrah", "Ihram hingga tahallul"],
      ];

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-4 py-8">
      <header className="rounded-3xl bg-emerald-950 px-6 py-10 text-white sm:px-10">
        <p className="text-sm font-semibold text-emerald-300">
          {isEn ? "Practical Worship Guides" : "Panduan praktik umat"}
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          {isEn ? "Funeral Prayer, Yasinan, Hajj & Umrah" : "Jenazah, Yasinan, Haji dan Umrah"}
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-emerald-100">
          {isEn
            ? "Step-by-step procedures, essential supplications, and practical notes to prepare learners before direct guidance from local scholars, mu'allim, or pilgrimage guides."
            : "Urutan pelaksanaan, bacaan penting, dan catatan praktis untuk membantu belajar sebelum mengikuti bimbingan langsung dari ustaz, pembimbing manasik, atau petugas setempat."}
        </p>
      </header>

      <nav aria-label={isEn ? "Guide directory" : "Daftar panduan"} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {navLinks.map(([href, title, note]) => (
          <a
            key={href}
            href={href}
            className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 transition-colors"
          >
            <strong className="block text-slate-900 dark:text-slate-100">{title}</strong>
            <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{note}</span>
          </a>
        ))}
      </nav>

      <aside className="border-l-4 border-amber-500 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100 rounded-r-2xl">
        {isEn
          ? "This guide provides foundational knowledge. Specifics regarding intentions, recitations, compensation (dam), excused conditions, and school variations should be confirmed with your qualified guide or local scholar."
          : "Panduan ini bersifat pembelajaran dasar. Detail niat, bacaan, dam, kondisi uzur, dan perbedaan mazhab perlu dikonsultasikan kepada pembimbing yang memahami keadaan Anda."}
      </aside>

      <section id="jenazah" className={sectionClass}>
        <div>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {isEn ? "Communal Obligation (Fard Kifayah)" : "Fardu kifayah"}
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {isEn ? "Funeral Prayer Procedure" : "Tata cara shalat jenazah"}
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            {isEn
              ? "The imam stands level with the head of a deceased male and near the middle of a deceased female. This positioning is recommended; the validity of the prayer is not compromised by slight variation."
              : "Imam berdiri sejajar kepala jenazah laki-laki dan sekitar bagian tengah jenazah perempuan. Posisi ini merupakan tuntunan; sahnya shalat tidak bergantung pada ketepatan posisi tersebut."}
          </p>
        </div>
        <figure className="space-y-3">
          <a href="/images/ibadah/ilustrasi_ai_sholat_jenazah.jpg" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/ibadah/ilustrasi_ai_sholat_jenazah.jpg"
              width={1536}
              height={1024}
              alt="Ilustrasi posisi shalat jenazah"
              className="w-full h-auto rounded-2xl"
            />
          </a>
          <figcaption className="text-sm leading-6 text-slate-500">
            {isEn
              ? "Modern educational visual model illustrating standing orientation, placement of the deceased, and hand position. Follow the written steps below. Tap to enlarge."
              : "Ilustrasi AI peraga masa kini, bukan penggambaran Nabi. Gambar menunjukkan posisi berdiri, letak jenazah, dan posisi tangan. Ikuti langkah tertulis di bawah. Ketuk untuk memperbesar."}
          </figcaption>
        </figure>
        <Steps items={isEn ? jenazahEn : jenazahId} />
        <div className="space-y-3">
          <h3 className="text-xl font-bold">{isEn ? "Supplication Recitations" : "Bacaan doa"}</h3>
          {bacaanJenazah.map((item) => (
            <details key={item.titleId} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800 bg-white dark:bg-slate-900">
              <summary className="cursor-pointer font-semibold text-slate-900 dark:text-slate-100">
                {isEn ? item.titleEn : item.titleId}
              </summary>
              <p lang="ar" dir="rtl" className="arabic-text my-5 text-xl">
                {item.arab}
              </p>
              <p className="italic leading-7 text-slate-600 dark:text-slate-300">{item.latin}</p>
              <p className="mt-3 leading-7">
                <strong>{isEn ? "Meaning: " : "Arti: "}</strong>
                {isEn ? item.artiEn : item.artiId}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section id="yasinan" className={sectionClass}>
        <div>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {isEn ? "Recitation, Remembrance & Dua" : "Tilawah, zikir, dan doa"}
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {isEn ? "Yasin Gathering & Supplications" : "Susunan Yasinan dan doa"}
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            {isEn
              ? "Yasinan is a customary assembly of reciting Surah Yasin, dhikr, and praying widely observed among Indonesian Muslim communities. There is no single mandatory arrangement; respect for differing scholarly views on specific timing should be preserved."
              : "Yasinan adalah tradisi majelis membaca Surah Yasin, berzikir, dan berdoa yang dikenal di banyak masyarakat Muslim Indonesia. Pelaksanaannya tidak memiliki satu susunan baku; terdapat perbedaan pandangan ulama mengenai pengkhususan waktu dan bentuknya, sehingga sikap saling menghormati perlu dijaga."}
          </p>
        </div>
        <Steps items={isEn ? yasinanEn : yasinanId} />
        <Link
          href="/quran?surah=36"
          className="inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 transition-colors"
        >
          {isEn ? "Open Surah Yasin" : "Buka Surah Yasin"}
        </Link>
        <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">
            {isEn ? "Recommended Closing Supplication" : "Doa penutup yang dapat dibaca"}
          </h3>
          <p lang="ar" dir="rtl" className="arabic-text my-5 text-xl">
            اللَّهُمَّ اغْفِرْ لَنَا وَلِوَالِدَيْنَا وَلِمَشَايِخِنَا وَلِجَمِيعِ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ، الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ، وَتَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ
          </p>
          <p className="italic leading-7 text-slate-600 dark:text-slate-300">
            Allahummaghfir lana wa liwalidaina wa limasyayikhina wa lijami&apos;il-muslimina wal-muslimat, al-ahya&apos;i minhum wal-amwat, wa taqabbal minna innaka Antas-Sami&apos;ul-&apos;Alim.
          </p>
          <p className="mt-3 leading-7">
            <strong>{isEn ? "Meaning: " : "Arti: "}</strong>
            {isEn
              ? "O Allah, forgive us, our parents, our teachers, and all Muslim men and women, both living and deceased. Accept our deeds; surely You are the All-Hearing, All-Knowing."
              : "Ya Allah, ampunilah kami, kedua orang tua kami, guru-guru kami, dan seluruh Muslim laki-laki dan perempuan, yang hidup maupun yang telah wafat. Terimalah amal kami; sungguh Engkau Maha Mendengar lagi Maha Mengetahui."}
          </p>
        </div>
      </section>

      <section id="haji" className={sectionClass}>
        <div>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {isEn ? "Pilgrimage Rituals (8-13 Dhul-Hijjah)" : "Manasik 8-13 Zulhijah"}
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {isEn ? "Hajj Pilgrimage Procedure" : "Tata cara pelaksanaan haji"}
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            {isEn
              ? "The essential pillars of Hajj include ihram, standing at Arafah, Tawaf al-Ifadah, sa'i, shaving/trimming, and adherence to sequence. Omitting an essential pillar cannot be compensated merely by paying dam."
              : "Rukun haji mencakup ihram, wukuf di Arafah, tawaf ifadah, sai, bercukur, dan tertib menurut rincian mazhab Syafi'i. Meninggalkan rukun tidak dapat diselesaikan hanya dengan membayar dam."}
          </p>
        </div>
        <Steps items={isEn ? hajiEn : hajiId} />
      </section>

      <section id="umrah" className={sectionClass}>
        <div>
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {isEn ? "Concise Umrah Rituals" : "Manasik ringkas"}
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {isEn ? "Umrah Pilgrimage Procedure" : "Tata cara pelaksanaan umrah"}
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            {isEn
              ? "Umrah can be performed throughout the year according to regulatory guidelines. Unlike Hajj, Umrah does not include standing at Arafah, staying overnight in Muzdalifah or Mina, or stoning the jamarat."
              : "Umrah dapat dilaksanakan sepanjang tahun, kecuali pembatasan teknis dan ketentuan penyelenggaraan yang berlaku. Berbeda dari haji, umrah tidak mencakup wukuf di Arafah, mabit di Muzdalifah dan Mina, maupun melontar jamrah."}
          </p>
        </div>
        <Steps items={isEn ? umrahEn : umrahId} />
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-bold">{isEn ? "Primary Scriptural Sources" : "Rujukan utama"}</h2>
        <ul className="list-disc space-y-2 pl-6 leading-7">
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-300" href="https://quran.com/2/196" target="_blank" rel="noopener noreferrer">
              QS. Al-Baqarah 2:196
            </a>{" "}
            {isEn ? "on completing Hajj and Umrah for the sake of Allah." : "tentang menyempurnakan haji dan umrah karena Allah."}
          </li>
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-300" href="https://quran.com/3/97" target="_blank" rel="noopener noreferrer">
              QS. Ali Imran 3:97
            </a>{" "}
            {isEn ? "on the obligation of Hajj for those with the means." : "tentang kewajiban haji bagi yang mampu."}
          </li>
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-300" href="https://sunnah.com/muslim:1218a" target="_blank" rel="noopener noreferrer">
              Sahih Muslim 1218a
            </a>
            , {isEn ? "narration of Jabir describing the Prophet's Hajj." : "hadis Jabir mengenai tata cara haji Nabi."}
          </li>
          <li>
            <a className="text-emerald-700 underline dark:text-emerald-300" href="https://sunnah.com/muslim:963a" target="_blank" rel="noopener noreferrer">
              Sahih Muslim 963a
            </a>
            , {isEn ? "the Prophet's supplication during funeral prayer." : "doa Nabi dalam shalat jenazah."}
          </li>
        </ul>
      </section>
    </main>
  );
}
