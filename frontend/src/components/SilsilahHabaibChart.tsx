"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Search,
  GitBranch,
  Layers,
  Award
} from "lucide-react";

export interface AncestorNode {
  id: string;
  level: number;
  nameId: string;
  nameEn: string;
  arabic: string;
  year?: string;
  locationId: string;
  locationEn: string;
  titleId: string;
  titleEn: string;
  bioId: string;
  bioEn: string;
  branch?: "rasul" | "hasani" | "husaini" | "muhajir" | "faqih" | "azmatkhan" | "marga";
  margaList?: { name: string; founder: string; descId: string; descEn: string }[];
}

export const SILSILAH_DATA: AncestorNode[] = [
  {
    id: "nabi-muhammad",
    level: 1,
    nameId: "Nabi Muhammad ﷺ",
    nameEn: "Prophet Muhammad ﷺ",
    arabic: "مُحَمَّدٌ رَسُولُ اللَّهِ ﷺ",
    year: "571 – 632 M (11 H)",
    locationId: "Makkah & Madinah Al-Munawwarah",
    locationEn: "Makkah & Madinah Al-Munawwarah",
    titleId: "Sayyidul Anbiya wal Mursalin (Penutup Para Nabi)",
    titleEn: "Master of Prophets & Messengers",
    bioId: "Pangkal utama mata air nasab suci. Seluruh putra beliau (Al-Qasim, Abdullah, Ibrahim) wafat di usia kanak-kanak. Garis nasab yang berlanjut ditetapkan Allah Ta'ala hanya melalui putri tercinta beliau, Sayyidah Fatimah Az-Zahra RA.",
    bioEn: "The primary origin of the noble lineage. All his sons passed away in childhood. Allah decreed that the Prophet's continuing lineage flows exclusively through his beloved daughter, Sayyidah Fatimah Az-Zahra RA.",
    branch: "rasul",
  },
  {
    id: "ali-fatimah",
    level: 2,
    nameId: "Sayyidah Fatimah Az-Zahra RA & Sayyidina Ali bin Abi Thalib RA",
    nameEn: "Sayyidah Fatimah Az-Zahra RA & Sayyidina Ali bin Abi Thalib RA",
    arabic: "فَاطِمَةُ الزَّهْرَاء وَعَلِيُّ بْنُ أَبِي طَالِب رَضِيَ اللَّهُ عَنْهُمَا",
    year: "Fatimah (w. 11 H) • Ali (w. 40 H)",
    locationId: "Madinah & Kufah (Irak)",
    locationEn: "Madinah & Kufah (Iraq)",
    titleId: "Sayyidatu Nisa'i Ahlil Jannah & Amirul Mukminin",
    titleEn: "Leader of Paradise Women & Commander of the Faithful",
    bioId: "Pernikahan berkah antara putri bungsu Rasulullah ﷺ dengan sepupu sekaligus sahabat terdepan beliau, Sayyidina Ali Karramallahu Wajhah. Dari mereka lahir Sayyidina Hasan dan Sayyidina Husain.",
    bioEn: "The blessed marriage between the Prophet's daughter and his cousin, Sayyidina Ali. From this union were born Sayyidina Hasan and Sayyidina Husain.",
    branch: "rasul",
  },
  {
    id: "husain",
    level: 3,
    nameId: "Sayyidina Al-Husain RA (dan Sayyidina Al-Hasan RA)",
    nameEn: "Sayyidina Al-Husain RA (and Sayyidina Al-Hasan RA)",
    arabic: "سَيِّدُنَا الْحُسَيْن الشَّهِيد (وَسَيِّدُنَا الْحَسَن)",
    year: "Husain (4 – 61 H / 680 M)",
    locationId: "Madinah & Karbala (Irak)",
    locationEn: "Madinah & Karbala (Iraq)",
    titleId: "Sayyidu Syababi Ahlil Jannah (Pemimpin Pemuda Surga)",
    titleEn: "Master of the Youth of Paradise",
    bioId: "Keturunan Sayyidina Hasan umumnya bergelar Syarif (Asyraf, tersebar di Maroko & Hijaz), sedangkan keturunan Sayyidina Husain umumnya bergelar Sayyid/Habib yang menjadi leluhur kaum Ba 'Alawi di Hadramaut dan Nusantara.",
    bioEn: "Descendants of Hasan generally bear the title Sharif (Morocco, Hijaz), while descendants of Husain bear the title Sayyid/Habib, ancestors of the Ba 'Alawi family.",
    branch: "husaini",
  },
  {
    id: "ali-zainal-abidin",
    level: 4,
    nameId: "Imam Ali Zainal Abidin (As-Sajjad)",
    nameEn: "Imam Ali Zainal Abidin (As-Sajjad)",
    arabic: "عَلِي زَيْن العَابِدِين (السَّجَّاد)",
    year: "38 – 95 H (659 – 713 M)",
    locationId: "Madinah Al-Munawwarah",
    locationEn: "Madinah Al-Munawwarah",
    titleId: "Zainal Abidin (Perhiasan Para Ahli Ibadah)",
    titleEn: "Ornament of the Worshippers",
    bioId: "Satu-satunya putra Sayyidina Husain yang selamat dari tragedi Karbala karena sedang sakit keras. Tokoh zuhud yang termasyhur sedekah rahasianya di kota Madinah setiap malam.",
    bioEn: "The sole surviving son of Sayyidina Husain from Karbala. Renowned for his deep piety, nocturnal secret charity in Madinah, and spiritual supplications.",
    branch: "husaini",
  },
  {
    id: "muhammad-al-baqir",
    level: 5,
    nameId: "Imam Muhammad Al-Baqir",
    nameEn: "Imam Muhammad Al-Baqir",
    arabic: "مُحَمَّد البَاقِر",
    year: "57 – 114 H (676 – 732 M)",
    locationId: "Madinah Al-Munawwarah",
    locationEn: "Madinah Al-Munawwarah",
    titleId: "Al-Baqir (Pembuka Tabir Kedalaman Ilmu)",
    titleEn: "The Revealer of Profound Knowledge",
    bioId: "Ulama besar Tabi'in di Madinah yang memperluas dan mengkodifikasi transmisi ilmu fiqih, tafsir, dan hadits Rasulullah ﷺ.",
    bioEn: "Prominent scholar of the Tabi'in generation who expounded and codified the jurisprudence and prophetic traditions in Madinah.",
    branch: "husaini",
  },
  {
    id: "jafar-ash-shadiq",
    level: 6,
    nameId: "Imam Ja'far Ash-Shadiq",
    nameEn: "Imam Ja'far Ash-Shadiq",
    arabic: "جَعْفَر الصَّادِق",
    year: "83 – 148 H (702 – 765 M)",
    locationId: "Madinah Al-Munawwarah",
    locationEn: "Madinah Al-Munawwarah",
    titleId: "Ash-Shadiq (Sang Jujur & Mahaguru Para Imam Mazhab)",
    titleEn: "The Truthful & Master of Jurists",
    bioId: "Mahaguru para pendiri mazhab Ahlus Sunnah. Imam Abu Hanifah dan Imam Malik bin Anas tercatat menimba ilmu dari kemuliaan beliau.",
    bioEn: "Eminent teacher of major Sunni imams including Abu Hanifah and Malik ibn Anas; master of hadith, fiqh, and natural sciences.",
    branch: "husaini",
  },
  {
    id: "ali-al-uraidhi",
    level: 7,
    nameId: "Sayyid Ali Al-Uraidhi",
    nameEn: "Sayyid Ali Al-Uraidhi",
    arabic: "عَلِي العُرَيْضِي",
    year: "w. 210 H (825 M)",
    locationId: "Al-Uraidh (Dekat Madinah)",
    locationEn: "Al-Uraidh (Near Madinah)",
    titleId: "Shahibul Uraidh",
    titleEn: "Master of Al-Uraidh",
    bioId: "Putra bungsu Imam Ja'far Ash-Shadiq yang menyingkir dari pusat politik kekuasaan dan mendirikan pemukiman damai di lembah Al-Uraidh dekat Madinah.",
    bioEn: "Youngest son of Ja'far Ash-Shadiq who relocated outside Madinah to Al-Uraidh to dedicate his life to worship and teaching away from political intrigue.",
    branch: "husaini",
  },
  {
    id: "muhammad-an-naqib",
    level: 8,
    nameId: "Sayyid Muhammad An-Naqib",
    nameEn: "Sayyid Muhammad An-Naqib",
    arabic: "مُحَمَّد النَّقِيب",
    year: "w. 250 H (864 M)",
    locationId: "Basrah (Irak)",
    locationEn: "Basrah (Iraq)",
    titleId: "Naqibul Asyraf Basrah",
    titleEn: "Chief Registrar of the Nobles in Basrah",
    bioId: "Pemimpin dan pencatat resmi keturunan Alawiyyin di Basrah, Irak. Menjaga kemurnian pencatatan nasab keluarga Nabi.",
    bioEn: "Chief custodian and genealogist of the Alawi family in Basrah, maintaining rigorous records of prophetic lineage.",
    branch: "husaini",
  },
  {
    id: "isa-ar-rumi",
    level: 9,
    nameId: "Sayyid Isa Ar-Rumi",
    nameEn: "Sayyid Isa Ar-Rumi",
    arabic: "عِيسَى الرُّومِي",
    year: "w. 298 H (910 M)",
    locationId: "Basrah (Irak)",
    locationEn: "Basrah (Iraq)",
    titleId: "Al-Arif Billah",
    titleEn: "The Knower of Allah",
    bioId: "Ulama terpandang di Basrah yang dikenal karena paras cerah kemerahan (sehingga digelari Ar-Rumi) dan ketaatan ibadahnya.",
    bioEn: "Distinguished nobleman and scholar in Basrah noted for his fair complexion and devotion to spiritual sciences.",
    branch: "husaini",
  },
  {
    id: "ahmad-al-muhajir",
    level: 10,
    nameId: "Al-Imam Ahmad Al-Muhajir",
    nameEn: "Al-Imam Ahmad Al-Muhajir",
    arabic: "أَحْمَدُ الْمُهَاجِر إِلَى اللَّهِ",
    year: "260 – 345 H (873 – 956 M)",
    locationId: "Basrah (Irak) ➔ Hadramaut (Yaman)",
    locationEn: "Basrah (Iraq) ➔ Hadramaut (Yemen)",
    titleId: "Al-Muhajir Ilallah (Pelopor Hijrah Penyelamat Akidah)",
    titleEn: "The Emigrant to Allah",
    bioId: "TOKOH SENTRAL. Berhijrah pada tahun 317 H membawa serta keluarga dan pengikut dari Basrah ke Hadramaut (Yaman) demi menyelamatkan akidah Ahlus Sunnah dan keturunan Nabi dari huru-hara fitnah kekuasaan Abbasiyah dan pemberontakan Zanj/Qaramithah.",
    bioEn: "CENTRAL FIGURE. Emigrated in 317 AH from Basrah to Hadramaut, Yemen, preserving the family's Sunni faith and prophetic bloodline from political upheaval in Iraq.",
    branch: "muhajir",
  },
  {
    id: "ubaidillah",
    level: 11,
    nameId: "Sayyid Ubaidillah bin Ahmad",
    nameEn: "Sayyid Ubaidillah bin Ahmad",
    arabic: "عُبَيْدُ اللَّهِ بْن أَحْمَد",
    year: "w. 383 H (993 M)",
    locationId: "Hadramaut (Yaman)",
    locationEn: "Hadramaut (Yemen)",
    titleId: "Ubaidillah (Hamba Kecil Allah)",
    titleEn: "The Devoted Servant of Allah",
    bioId: "Putra Imam Ahmad Al-Muhajir yang setia menemani sang ayah hijrah dan meletakkan akar keluarga Alawiyyin di perkampungan Hadramaut.",
    bioEn: "Son of Ahmad Al-Muhajir who accompanied his father and firmly established the family in the valleys of Hadramaut.",
    branch: "muhajir",
  },
  {
    id: "alawi-awwal",
    level: 12,
    nameId: "Sayyid Alawi I (Asal Nama 'Ba Alawi')",
    nameEn: "Sayyid Alawi I (Origin of 'Ba Alawi')",
    arabic: "عَلَوِي الأَوَّل",
    year: "w. 400 H (1009 M)",
    locationId: "Bayt Jubayr (Hadramaut)",
    locationEn: "Bayt Jubayr (Hadramaut)",
    titleId: "Jaddus Sadah Al Ba 'Alawi",
    titleEn: "Forefather of the Ba 'Alawi Sayyids",
    bioId: "Dari nama beliau inilah seluruh keturunan klan ini dinamakan Ba 'Alawi (Bani Alawi). Kelahiran pertama keturunan Nabi yang tumbuh besar di tanah Hadramaut.",
    bioEn: "The eponym from whom the entire clan takes its name: Ba 'Alawi (Descendants of Alawi). First generation born in Hadramaut.",
    branch: "muhajir",
  },
  {
    id: "ali-khali-qasam",
    level: 13,
    nameId: "Sayyid Ali Khali' Qasam",
    nameEn: "Sayyid Ali Khali' Qasam",
    arabic: "عَلِي خَالِع قَسَم",
    year: "w. 527 H (1133 M)",
    locationId: "Qasam & Tarim (Hadramaut)",
    locationEn: "Qasam & Tarim (Hadramaut)",
    titleId: "Khali' Qasam (Pembeli Lembah Qasam)",
    titleEn: "Founder of Qasam Valley",
    bioId: "Membeli tanah di Hadramaut dan menamainya 'Qasam' (seperti nama kebun kakeknya di Basrah), lalu memindahkan keluarga ke kota Tarim yang kelak menjadi pusat spiritual para Habaib.",
    bioEn: "Purchased the valley of Qasam and later relocated the family towards Tarim, which became the global spiritual capital of the Ba 'Alawi tradition.",
    branch: "muhajir",
  },
  {
    id: "shahib-mirbath",
    level: 14,
    nameId: "Sayyid Muhammad Shahib Mirbath",
    nameEn: "Sayyid Muhammad Shahib Mirbath",
    arabic: "مُحَمَّد صَاحِب مِرْبَاط",
    year: "w. 556 H (1161 M)",
    locationId: "Mirbath (Oman) & Hadramaut",
    locationEn: "Mirbath (Oman) & Hadramaut",
    titleId: "Shahib Mirbath (Titik Temu Seluruh Habaib)",
    titleEn: "The Common Ancestor of All Habaib",
    bioId: "TITIK TEMU UTAMA NASAB. Seluruh Habaib di dunia saat ini (Assegaf, Al-Attas, Al-Habsyi, dll.) serta para wali Azmatkhan (Walisongo) bersumber dari putra-putra Muhammad Shahib Mirbath.",
    bioEn: "THE GREAT CONFLUENCE. Every Ba 'Alawi Habib today as well as the Azmatkhan/Walisongo lineage converge through the sons of Muhammad Shahib Mirbath.",
    branch: "faqih",
  },
  {
    id: "faqih-muqaddam",
    level: 15,
    nameId: "Al-Imam Muhammad Al-Faqih Al-Muqaddam",
    nameEn: "Al-Imam Muhammad Al-Faqih Al-Muqaddam",
    arabic: "مُحَمَّد الفَقِيه المُقَدَّم",
    year: "574 – 653 H (1178 – 1255 M)",
    locationId: "Tarim, Hadramaut",
    locationEn: "Tarim, Hadramaut",
    titleId: "Al-Ustadh Al-A'zham (Peletak Thariqah Alawiyyah)",
    titleEn: "The Supreme Master & Founder of Tariqa Alawiyya",
    bioId: "TOKOH DAKWAH DAMAI. Secara simbolis mematahkan pedang perangnya, menyatakan bahwa keturunan Nabi melepaskan senjata fisik dan memilih jalan tasawuf, ilmu fiqih, dan akhlak luhur tanpa kekerasan. Dari sinilah lahir marga-marga besar Habaib.",
    bioEn: "ICON OF PEACEFUL DA'WAH. Symbolically broke his sword, renouncing military armed force in favor of spiritual purification (tasawwuf), jurisprudence, and peaceful scholarship.",
    branch: "faqih",
  },
  {
    id: "marga-habaib",
    level: 16,
    nameId: "Marga-Marga Utama Habaib Ba 'Alawi di Nusantara",
    nameEn: "Major Ba 'Alawi Clans (Marga) in the Archipelago",
    arabic: "قَبَائِلُ وَعَشَائِرُ السَّادَةِ بَاعَلَوِي",
    year: "Abad ke-8 H s.d. Sekarang",
    locationId: "Nusantara (Indonesia, Malaysia, Singapura) & Yaman",
    locationEn: "Nusantara (Indonesia, Malaysia, Singapore) & Yemen",
    titleId: "As-Sadah Al-Alawiyyin",
    titleEn: "The Alawi Sayyids",
    bioId: "Dari keturunan Al-Faqih Al-Muqaddam dan kerabatnya, lahir puluhan marga (fam) terkemuka yang hijrah berdakwah ke Asia Tenggara sejak ratusan tahun silam.",
    bioEn: "From Al-Faqih Al-Muqaddam and relatives emerged dozens of renowned family clans who migrated as scholars, merchants, and peacemakers across Southeast Asia.",
    branch: "marga",
    margaList: [
      { name: "Assegaf (Al-Saqqaf)", founder: "Abdurrahman Assegaf (w. 819 H)", descId: "Dijuluki As-Saqqaf (atap pengayom) karena keluasan ilmu dan karamahnya menaungi para ulama zamannya.", descEn: "Named 'the shelter' due to his towering erudition that provided canopy to contemporary scholars." },
      { name: "Al-Attas", founder: "Umar bin Abdurrahman Al-Attas (w. 1072 H)", descId: "Penyusun Ratib Al-Attas; ulama yang zuhud dan pelindung kaum dhuafa.", descEn: "Author of Ratib Al-Attas; renowned ascetic and patron of the needy." },
      { name: "Al-Habsyi", founder: "Abu Bakar bin Ali Al-Habsyi (w. 857 H)", descId: "Pernah bermukim di Habasyah (Ethiopia); melahirkan tokoh besar seperti Habib Ali Al-Habsyi (Shohibul Simtudduror).", descEn: "Traced to stays in Abyssinia; produced legends like Habib Ali (author of Simtudduror)." },
      { name: "Al-Haddad", founder: "Ahmad bin Abu Bakar Al-Haddad", descId: "Keturunannya adalah Al-Imam Abdullah bin Alawi Al-Haddad (Shohibur Ratib), pembaharu tarekat Alawiyyah.", descEn: "Family of Imam Abdullah ibn Alawi Al-Haddad, the spiritual renewer of Tariqa Alawiyya." },
      { name: "Alaydrus (Al-Aydrus)", founder: "Abdullah Alaydrus (w. 865 H)", descId: "Dijuluki 'Al-Aydrus' (singa/pemimpin pemuka); penyusun Ratib Alaydrus.", descEn: "Titled 'the lion/leader of spirituality'; author of the renowned Ratib Alaydrus." },
      { name: "Shihab (Bin Syahab)", founder: "Syihabuddin Ahmad (w. 870 H)", descId: "Gelar 'Bintang Penerang Agama'; melahirkan banyak intelektual dan pakar tafsir terkemuka.", descEn: "Meaning 'meteor of the faith', known for profound Quranic exegesis and scholars." },
      { name: "Al-Jufri", founder: "Abu Bakar bin Muhammad Al-Jufri", descId: "Marga ulama dan dai lembut yang aktif berdakwah di pesisir Nusantara dan Afrika Timur.", descEn: "Renowned line of peaceful teachers active in maritime Southeast Asia and East Africa." },
      { name: "Bin Yahya", founder: "Yahya bin Hasan", descId: "Banyak melahirkan mufti, hakim syariat, dan tokoh nasional (seperti Raden Saleh Syarif Bustaman & Habib Ali Kwitang).", descEn: "Produced supreme muftis, judges, and cultural pioneers like artist Raden Saleh." },
      { name: "Al-Kaff, Basyaiban, Al-Munawwar, Al-Musawa, BSA", founder: "Cabang Silsilah Ba 'Alawi", descId: "Marga-marga mulia lainnya yang tersebar di Batavia/Jakarta, Surabaya, Palembang, Banjarmasin, Cirebon, dll.", descEn: "Other noble family branches widely settled across Java, Sumatra, Kalimantan, and Maluku." },
    ],
  },
];

export default function SilsilahHabaibChart() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<AncestorNode>(SILSILAH_DATA[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-flowing animation through generations
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveLevel((prev) => {
          const next = prev >= 16 ? 1 : prev + 1;
          const node = SILSILAH_DATA.find((n) => n.level === next) || SILSILAH_DATA[0];
          setSelectedNode(node);
          return next;
        });
      }, 3200);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handleSelectNode = (node: AncestorNode) => {
    setSelectedNode(node);
    setActiveLevel(node.level);
    setIsPlaying(false);
  };

  const filteredNodes = SILSILAH_DATA.filter((n) => {
    const q = searchQuery.toLowerCase();
    const matchesName = n.nameId.toLowerCase().includes(q) || n.nameEn.toLowerCase().includes(q);
    const matchesMarga = n.margaList?.some((m) => m.name.toLowerCase().includes(q));
    const matchesLoc = n.locationId.toLowerCase().includes(q) || n.locationEn.toLowerCase().includes(q);
    return matchesName || matchesMarga || matchesLoc;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-950 via-teal-900 to-slate-950 text-white p-6 sm:p-10 shadow-2xl border border-emerald-500/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? "Interactive Lineage Chart" : "Bagan Interaktif Silsilah Nasab"}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {isEn
              ? "From Prophet Muhammad ﷺ to the Ba 'Alawi Clans"
              : "Pohon Silsilah Garis Keturunan Nabi Muhammad ﷺ hingga Marga Habaib"}
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            {isEn
              ? "Observe the animated generational flow tracing the noble prophetic lineage from Sayyidah Fatimah Az-Zahra RA, Sayyidina Husain RA, the migration of Imam Ahmad Al-Muhajir to Hadramaut, to the emergence of modern Habaib clans in the Malay Archipelago."
              : "Saksikan animasi alur nasab bergerak dari Rasulullah ﷺ melalui Sayyidah Fatimah Az-Zahra RA, Sayyidina Husain RA, hijrahnya Imam Ahmad Al-Muhajir ke Hadramaut, hingga berkembangnya marga-marga Habaib Ba 'Alawi di Nusantara."}
          </p>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer ${
                isPlaying
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20"
                  : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20"
              }`}
            >
              <Play className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
              <span>
                {isPlaying
                  ? isEn ? "Pause Flow Animation" : "Jeda Animasi Alur"
                  : isEn ? "Play Flow Animation" : "Mulai Animasi Alur"}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveLevel(1);
                setSelectedNode(SILSILAH_DATA[0]);
                setIsPlaying(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? "Reset from Prophet ﷺ" : "Ulang dari Rasulullah ﷺ"}</span>
            </button>

            <span className="text-xs text-emerald-300/80 font-medium ml-auto">
              {isEn ? "Step:" : "Generasi:"} {activeLevel} / 16
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Tree + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive Tree Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-3xl p-5 sm:p-6 bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            
            {/* Filter / Search input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isEn ? "Search ancestor or clan (e.g. Assegaf, Muhajir, Husain)…" : "Cari tokoh nasab atau marga (mis. Assegaf, Muhajir, Husain)…"}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Tree Nodes List with Flow Connectors */}
            <div className="space-y-3 relative">
              {filteredNodes.map((node, index) => {
                const isActive = activeLevel === node.level;
                const isSelected = selectedNode.id === node.id;
                const isPast = activeLevel > node.level;

                return (
                  <div key={node.id} className="relative">
                    {/* Connecting Animated Line to Next Node */}
                    {index < filteredNodes.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-1 flex justify-center -mb-3 z-0">
                        <div
                          className={`w-0.5 h-full transition-all duration-500 ${
                            isPast
                              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                              : isActive
                              ? "bg-linear-to-b from-emerald-500 to-slate-300 dark:to-slate-700 animate-pulse"
                              : "bg-slate-200 dark:bg-slate-800"
                          }`}
                        />
                      </div>
                    )}

                    {/* Node Card */}
                    <button
                      onClick={() => handleSelectNode(node)}
                      className={`relative z-10 w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-600/15 ring-2 ring-emerald-500/30"
                          : isActive
                          ? "bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 shadow-md ring-2 ring-amber-400/40 scale-[1.01]"
                          : "bg-white dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800 hover:border-emerald-400/60"
                      }`}
                    >
                      {/* Generation Badge / Dot */}
                      <div
                        className={`size-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                          isSelected || isActive
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                            : isPast
                            ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-400/40"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {node.level}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {node.year || (isEn ? "Epoch" : "Masa")}
                          </span>
                          <span lang="ar" dir="rtl" className="arabic-text text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                            {node.arabic}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 mt-1">
                          {isEn ? node.nameEn : node.nameId}
                        </h3>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {isEn ? node.titleEn : node.titleId} • {isEn ? node.locationEn : node.locationId}
                        </p>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform mt-3 ${isSelected ? "text-emerald-600 rotate-90" : "text-slate-400"}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Selected Node Detail Panel */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="glass-card rounded-3xl p-6 sm:p-7 bg-white/95 dark:bg-slate-900/95 border-2 border-emerald-500/30 shadow-2xl space-y-5 animate-in fade-in duration-300">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/40">
                {isEn ? `Generation Level ${selectedNode.level}` : `Generasi Tingkat ke-${selectedNode.level}`}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> {isEn ? "Lineage Detail" : "Rincian Nasab"}
              </span>
            </div>

            {/* Arabic Big Callout */}
            <div className="py-5 px-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/20 text-center">
              <p lang="ar" dir="rtl" className="arabic-text text-xl sm:text-2xl font-bold text-emerald-900 dark:text-emerald-200 leading-relaxed">
                {selectedNode.arabic}
              </p>
            </div>

            {/* Titles & Info */}
            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                {isEn ? selectedNode.nameEn : selectedNode.nameId}
              </h2>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {isEn ? selectedNode.titleEn : selectedNode.titleId}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-medium">
                  📍 {isEn ? selectedNode.locationEn : selectedNode.locationId}
                </span>
                {selectedNode.year && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-medium">
                    ⏳ {selectedNode.year}
                  </span>
                )}
              </div>
            </div>

            {/* Biography & Role */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                {isEn ? "Historical Significance & Role:" : "Peran Sejarah & Signifikansi Nasab:"}
              </span>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                {isEn ? selectedNode.bioEn : selectedNode.bioId}
              </p>
            </div>

            {/* If Marga Level, Show Clans List */}
            {selectedNode.margaList && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  {isEn ? "Major Ba 'Alawi Clans (Fam):" : "Marga-Marga Populer di Nusantara:"}
                </span>
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {selectedNode.margaList.map((m) => (
                    <div key={m.name} className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-emerald-200">{m.name}</h4>
                        <span className="text-[10px] text-slate-400 font-medium">{m.founder}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {isEn ? m.descEn : m.descId}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Verification Box */}
            <div className="rounded-2xl border border-amber-300/80 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/20 p-4 text-xs leading-relaxed text-amber-950 dark:text-amber-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                <ShieldCheck className="w-4 h-4" />
                <span>{isEn ? "Lineage Authentication" : "Verifikasi & Otentisitas Nasab"}</span>
              </div>
              <p>
                {isEn
                  ? "Lineage records in Indonesia are officially documented and verified by Maktab Daimi (Rabithah Alawiyah, founded 1928) against classical syajarah manuscripts dating back across the centuries."
                  : "Pencatatan nasab Alawiyyin di Indonesia diverifikasi ketat oleh Maktab Daimi (Rabithah Alawiyah, berdiri 1928) melalui pencocokan buku silsilah induk turun-temurun."}
              </p>
            </div>

            {/* Back link to Islam Nusantara */}
            <Link
              href="/islam-nusantara"
              className="w-full py-3 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <GitBranch className="w-4 h-4" />
              <span>{isEn ? "Explore Islam Nusantara Module" : "Pelajari Modul Islam Nusantara"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
