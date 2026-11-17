"use client";

import { useLanguage } from "@/context/LanguageContext";

const WIRID = [
  {
    id: "pagi-petang",
    titleId: "Dzikir pagi dan petang",
    titleEn: "Morning and evening dhikr",
    waktuId: "100 kali pada pagi hari dan 100 kali pada petang hari",
    waktuEn: "100 times in the morning and 100 times in the evening",
    arab: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    latin: "Subhanallahi wa bihamdih",
    artiId: "Mahasuci Allah, dan segala puji bagi-Nya.",
    artiEn: "Glory be to Allah, and all praise is due to Him.",
    petunjukId: "Bacaan ringkas untuk dzikir pagi dan petang.",
    petunjukEn: "Concise recitation for morning and evening remembrance.",
    sumber: "Sahih Muslim 2692",
    url: "https://sunnah.com/muslim:2692",
  },
  {
    id: "istighfar-shalat",
    titleId: "Istighfar setelah shalat",
    titleEn: "Istighfar after prayer",
    waktuId: "3 kali setelah selesai shalat",
    waktuEn: "3 times after completing prayer",
    arab: "أَسْتَغْفِرُ اللَّهَ",
    latin: "Astaghfirullah",
    artiId: "Aku memohon ampun kepada Allah.",
    artiEn: "I seek forgiveness from Allah.",
    petunjukId: "Dilanjutkan dengan bacaan Allahumma antas-salam di bawah ini.",
    petunjukEn: "Followed by the recitation of Allahumma antas-salam below.",
    sumber: "Sahih Muslim 591",
    url: "https://sunnah.com/muslim:591",
  },
  {
    id: "salam",
    titleId: "Doa setelah istighfar",
    titleEn: "Supplication after istighfar",
    waktuId: "Setelah shalat, sesudah istighfar",
    waktuEn: "After prayer, following istighfar",
    arab: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ ذَا الْجَلَالِ وَالْإِكْرَامِ",
    latin: "Allahumma antas-salam wa minkas-salam, tabarakta dzal-jalali wal-ikram.",
    artiId: "Ya Allah, Engkaulah Yang Mahasejahtera, dan dari-Mu datang kesejahteraan. Mahaberkah Engkau, Pemilik keagungan dan kemuliaan.",
    artiEn: "O Allah, You are Peace and from You comes peace. Blessed are You, Possessor of glory and honor.",
    petunjukId: "Bacaan dzikir setelah selesai shalat.",
    petunjukEn: "Dhikr recitation upon finishing prayer.",
    sumber: "Sahih Muslim 591",
    url: "https://sunnah.com/muslim:591",
  },
  {
    id: "tasbih-shalat",
    titleId: "Tasbih, tahmid, dan takbir setelah shalat",
    titleEn: "Tasbih, tahmid, and takbir after prayer",
    waktuId: "Masing-masing 33 kali",
    waktuEn: "33 times each",
    arab: "سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ",
    latin: "Subhanallah • Alhamdulillah • Allahu akbar",
    artiId: "Mahasuci Allah • Segala puji bagi Allah • Allah Mahabesar.",
    artiEn: "Glory be to Allah • All praise is due to Allah • Allah is the Greatest.",
    petunjukId: "Jumlahnya 99 bacaan, kemudian genapkan menjadi 100 dengan tahlil pada kartu berikutnya. Ini salah satu bentuk dzikir yang diriwayatkan.",
    petunjukEn: "Total of 99 recitations, then complete to 100 with the tahlil on the next card. This is one of the narrated forms of dhikr.",
    sumber: "Sahih Muslim 597a",
    url: "https://sunnah.com/muslim:597a",
  },
  {
    id: "tahlil-shalat",
    titleId: "Tahlil penggenap setelah shalat",
    titleEn: "Completing tahlil after prayer",
    waktuId: "1 kali setelah rangkaian 33–33–33",
    waktuEn: "1 time following the 33–33–33 sequence",
    arab: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    latin: "La ilaha illallahu wahdahu la syarika lah, lahul-mulku wa lahul-hamdu wa huwa ‘ala kulli syai’in qadir.",
    artiId: "Tidak ada sesembahan yang berhak disembah selain Allah semata, tanpa sekutu bagi-Nya. Milik-Nya kerajaan dan segala puji. Dia Mahakuasa atas segala sesuatu.",
    artiEn: "None has the right to be worshipped except Allah alone, without partner. To Him belongs all dominion and praise, and He is over all things competent.",
    petunjukId: "Dibaca sebagai penggenap rangkaian pada kartu sebelumnya.",
    petunjukEn: "Recited to complete the 100 count of the preceding sequence.",
    sumber: "Sahih Muslim 597a",
    url: "https://sunnah.com/muslim:597a",
  },
  {
    id: "tidur",
    titleId: "Dzikir sebelum tidur",
    titleEn: "Dhikr before sleeping",
    waktuId: "Tasbih 33 kali, tahmid 33 kali, takbir 34 kali",
    waktuEn: "Tasbih 33 times, tahmid 33 times, takbir 34 times",
    arab: "سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ",
    latin: "Subhanallah • Alhamdulillah • Allahu akbar",
    artiId: "Mahasuci Allah • Segala puji bagi Allah • Allah Mahabesar.",
    artiEn: "Glory be to Allah • All praise is due to Allah • Allah is the Greatest.",
    petunjukId: "Dibaca ketika hendak tidur. Jumlah takbir pada rangkaian ini adalah 34 kali.",
    petunjukEn: "Recited when preparing to sleep. The takbir count in this sequence is 34 times.",
    sumber: "Sahih Muslim 2727a",
    url: "https://sunnah.com/muslim:2727a",
  },
] as const;

export default function WiridHarian() {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section aria-labelledby="wirid-heading" className="my-6 space-y-4">
      <h2 id="wirid-heading" className="text-xl font-bold">
        {isEn ? "Daily Dhikr & Wirid Guide" : "Panduan dzikir dan wirid harian"}
      </h2>
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
        {isEn
          ? "Selected recitations for morning–evening, post-prayer, and before sleep. Open each card to view Arabic text, transliteration, meaning, and authentic references."
          : "Pilihan bacaan pagi–petang, setelah shalat, dan sebelum tidur. Buka setiap bacaan untuk melihat teks Arab, latin, arti, serta rujukannya. Panduan ringkas ini belum mencakup seluruh dzikir yang diriwayatkan."}
      </p>
      {WIRID.map((item) => (
        <details key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-emerald-600">
            {isEn ? item.titleEn : item.titleId}
            <span className="block mt-2 text-sm font-normal text-emerald-700 dark:text-emerald-300">
              {isEn ? item.waktuEn : item.waktuId}
            </span>
          </summary>
          <div className="mt-5 space-y-4">
            <p lang="ar" dir="rtl" className="arabic-text whitespace-pre-wrap wrap-break-word">
              {item.arab}
            </p>
            <p className="font-medium">{item.latin}</p>
            <p className="text-sm leading-7">
              <span className="font-semibold">{isEn ? "Meaning: " : "Arti: "}</span>
              {isEn ? item.artiEn : item.artiId}
            </p>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {isEn ? item.petunjukEn : item.petunjukId}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline text-emerald-700 dark:text-emerald-300 inline-block"
            >
              {isEn ? "Reference: " : "Rujukan: "}{item.sumber}
            </a>
          </div>
        </details>
      ))}
    </section>
  );
}
