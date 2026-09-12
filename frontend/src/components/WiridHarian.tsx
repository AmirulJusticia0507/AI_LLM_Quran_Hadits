const WIRID = [
  {
    id: "pagi-petang", title: "Dzikir pagi dan petang", waktu: "100 kali pada pagi hari dan 100 kali pada petang hari",
    arab: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", latin: "Subhanallahi wa bihamdih",
    arti: "Mahasuci Allah, dan segala puji bagi-Nya.",
    petunjuk: "Bacaan ringkas untuk dzikir pagi dan petang.", sumber: "Sahih Muslim 2692", url: "https://sunnah.com/muslim:2692",
  },
  {
    id: "istighfar-shalat", title: "Istighfar setelah shalat", waktu: "3 kali setelah selesai shalat",
    arab: "أَسْتَغْفِرُ اللَّهَ", latin: "Astaghfirullah", arti: "Aku memohon ampun kepada Allah.",
    petunjuk: "Dilanjutkan dengan bacaan Allahumma antas-salam di bawah ini.", sumber: "Sahih Muslim 591", url: "https://sunnah.com/muslim:591",
  },
  {
    id: "salam", title: "Doa setelah istighfar", waktu: "Setelah shalat, sesudah istighfar",
    arab: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ ذَا الْجَلَالِ وَالْإِكْرَامِ",
    latin: "Allahumma antas-salam wa minkas-salam, tabarakta dzal-jalali wal-ikram.",
    arti: "Ya Allah, Engkaulah Yang Mahasejahtera, dan dari-Mu datang kesejahteraan. Mahaberkah Engkau, Pemilik keagungan dan kemuliaan.",
    petunjuk: "Bacaan dzikir setelah selesai shalat.", sumber: "Sahih Muslim 591", url: "https://sunnah.com/muslim:591",
  },
  {
    id: "tasbih-shalat", title: "Tasbih, tahmid, dan takbir setelah shalat", waktu: "Masing-masing 33 kali",
    arab: "سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ",
    latin: "Subhanallah • Alhamdulillah • Allahu akbar",
    arti: "Mahasuci Allah • Segala puji bagi Allah • Allah Mahabesar.",
    petunjuk: "Jumlahnya 99 bacaan, kemudian genapkan menjadi 100 dengan tahlil pada kartu berikutnya. Ini salah satu bentuk dzikir yang diriwayatkan.", sumber: "Sahih Muslim 597a", url: "https://sunnah.com/muslim:597a",
  },
  {
    id: "tahlil-shalat", title: "Tahlil penggenap setelah shalat", waktu: "1 kali setelah rangkaian 33–33–33",
    arab: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "La ilaha illallahu wahdahu la syarika lah, lahul-mulku wa lahul-hamdu wa huwa ‘ala kulli syai’in qadir.",
    arti: "Tidak ada sesembahan yang berhak disembah selain Allah semata, tanpa sekutu bagi-Nya. Milik-Nya kerajaan dan segala puji. Dia Mahakuasa atas segala sesuatu.",
    petunjuk: "Dibaca sebagai penggenap rangkaian pada kartu sebelumnya.", sumber: "Sahih Muslim 597a", url: "https://sunnah.com/muslim:597a",
  },
  {
    id: "tidur", title: "Dzikir sebelum tidur", waktu: "Tasbih 33 kali, tahmid 33 kali, takbir 34 kali",
    arab: "سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ",
    latin: "Subhanallah • Alhamdulillah • Allahu akbar",
    arti: "Mahasuci Allah • Segala puji bagi Allah • Allah Mahabesar.",
    petunjuk: "Dibaca ketika hendak tidur. Jumlah takbir pada rangkaian ini adalah 34 kali.", sumber: "Sahih Muslim 2727a", url: "https://sunnah.com/muslim:2727a",
  },
] as const;

export default function WiridHarian() {
  return <section aria-labelledby="wirid-heading" className="my-6 space-y-4">
    <h2 id="wirid-heading" className="text-xl font-bold">Panduan dzikir dan wirid harian</h2>
    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Pilihan bacaan pagi–petang, setelah shalat, dan sebelum tidur. Buka setiap bacaan untuk melihat teks Arab, latin, arti, serta rujukannya. Panduan ringkas ini belum mencakup seluruh dzikir yang diriwayatkan.</p>
    {WIRID.map(item => <details key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-emerald-600">{item.title}<span className="block mt-2 text-sm font-normal text-emerald-700 dark:text-emerald-300">{item.waktu}</span></summary>
      <div className="mt-5 space-y-4">
        <p lang="ar" dir="rtl" className="arabic-text whitespace-pre-wrap wrap-break-word">{item.arab}</p>
        <p className="font-medium">{item.latin}</p>
        <p className="text-sm leading-7">Arti: {item.arti}</p>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.petunjuk}</p>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-emerald-700 dark:text-emerald-300">Rujukan: {item.sumber}</a>
      </div>
    </details>)}
  </section>;
}
