export interface HiwarOption {
  id: string;
  arab: string;
  latin: string;
  arti: string;
  isCorrect: boolean;
  feedback: string;
}

export interface HiwarTurn {
  id: string;
  speaker: string;
  promptArab: string;
  promptLatin: string;
  promptArti: string;
  options: HiwarOption[];
}

export interface HiwarScenario {
  id: string;
  title: string;
  subtitle: string;
  level: 'Pemula' | 'Menengah';
  turns: HiwarTurn[];
}

export const hiwarScenarios: HiwarScenario[] = [
  {
    id: 'perkenalan',
    title: 'Perkenalan & Sapaan',
    subtitle: 'Latihan menyapa, menanyakan kabar, nama, dan asal daerah.',
    level: 'Pemula',
    turns: [
      {
        id: 'p1',
        speaker: 'Ahmad',
        promptArab: 'السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ؟',
        promptLatin: 'As-salāmu ‘alaikum, kaifa ḥāluka?',
        promptArti: 'Semoga keselamatan atasmu, bagaimana kabarmu?',
        options: [
          {
            id: 'p1-a',
            arab: 'وَعَلَيْكُمُ السَّلَامُ، أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ.',
            latin: 'Wa ‘alaikumus-salām, anā bikhair, al-ḥamdulillāh.',
            arti: 'Wa‘alaikumussalam, saya baik-baik saja, alhamdulillah.',
            isCorrect: true,
            feedback: 'Tepat! Jawaban salam sekaligus kabar yang sopan dan natural.',
          },
          {
            id: 'p1-b',
            arab: 'شُكْرًا، أُرِيدُ مَاءً بَارِدًا.',
            latin: 'Syukran, urīdu mā’an bāridan.',
            arti: 'Terima kasih, saya mau air dingin.',
            isCorrect: false,
            feedback: 'Kurang tepat—kalimat itu untuk memesan minum, bukan menjawab kabar.',
          },
          {
            id: 'p1-c',
            arab: 'إِلَى اللِّقَاءِ غَدًا.',
            latin: 'Ilal-liqā’i ghadan.',
            arti: 'Sampai jumpa besok.',
            isCorrect: false,
            feedback: 'Kurang tepat—itu ungkapan perpisahan, bukan jawaban sapaan.',
          },
        ],
      },
      {
        id: 'p2',
        speaker: 'Ahmad',
        promptArab: 'مَا اسْمُكَ؟ وَمِنْ أَيْنَ أَنْتَ؟',
        promptLatin: 'Mā ismuka? Wa min aina anta?',
        promptArti: 'Siapa namamu? Dan dari mana asalmu?',
        options: [
          {
            id: 'p2-a',
            arab: 'اِسْمِي زَيْدٌ، وَأَنَا مِنْ إِنْدُونِيسِيَا.',
            latin: 'Ismī Zaid, wa anā min Indūnīsiyā.',
            arti: 'Namaku Zaid, dan saya dari Indonesia.',
            isCorrect: true,
            feedback: 'Benar! "Ismī..." untuk menyebut nama dan "Anā min..." untuk asal.',
          },
          {
            id: 'p2-b',
            arab: 'بَيْتِي قَرِيبٌ مِنَ السُّوقِ.',
            latin: 'Baitī qarībun minas-sūq.',
            arti: 'Rumahku dekat dari pasar.',
            isCorrect: false,
            feedback: 'Belum menjawab pertanyaan tentang nama dan asal.',
          },
          {
            id: 'p2-c',
            arab: 'لَا أَدْرِي كَمِ السَّاعَةُ.',
            latin: 'Lā adrī kamis-sā‘ah.',
            arti: 'Saya tidak tahu jam berapa.',
            isCorrect: false,
            feedback: 'Kalimat ini berarti tidak tahu waktu sekarang.',
          },
        ],
      },
      {
        id: 'p3',
        speaker: 'Ahmad',
        promptArab: 'أَهْلًا وَسَهْلًا! هَلْ أَنْتَ طَالِبٌ؟',
        promptLatin: 'Ahlan wa sahlan! Hal anta ṭālibun?',
        promptArti: 'Selamat datang! Apakah kamu seorang pelajar?',
        options: [
          {
            id: 'p3-a',
            arab: 'نَعَمْ، أَنَا طَالِبٌ وَأَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ.',
            latin: 'Na‘am, anā ṭālibun wa adrusu al-lughatal-‘arabiyyah.',
            arti: 'Ya, saya seorang pelajar dan saya belajar bahasa Arab.',
            isCorrect: true,
            feedback: 'Mantap! Menggunakan "Na‘am" dan menjelaskan status serta aktivitas belajar.',
          },
          {
            id: 'p3-b',
            arab: 'الطَّعَامُ لَذِيذٌ جِدًّا.',
            latin: 'Aṭ-ṭa‘āmu ladzīdzun jiddan.',
            arti: 'Makanannya enak sekali.',
            isCorrect: false,
            feedback: 'Kurang nyambung—ini komentar tentang makanan.',
          },
          {
            id: 'p3-c',
            arab: 'أَيْنَ مِفْتَاحُ الْغُرْفَةِ؟',
            latin: 'Aina miftāḥul-ghurfah?',
            arti: 'Di mana kunci kamar?',
            isCorrect: false,
            feedback: 'Kurang tepat—ini pertanyaan tentang kunci kamar.',
          },
        ],
      },
      {
        id: 'p4',
        speaker: 'Ahmad',
        promptArab: 'أَنَا سَعِيدٌ جِدًّا بِلِقَائِكَ. مَعَ السَّلَامَةِ!',
        promptLatin: 'Anā sa‘īdun jiddan biliqā’ika. Ma‘as-salāmah!',
        promptArti: 'Saya sangat senang bertemu denganmu. Selamat jalan!',
        options: [
          {
            id: 'p4-a',
            arab: 'شُكْرًا، وَأَنَا أَيْضًا. إِلَى اللِّقَاءِ!',
            latin: 'Syukran, wa anā aiḍan. Ilal-liqā’!',
            arti: 'Terima kasih, saya juga. Sampai jumpa lagi!',
            isCorrect: true,
            feedback: 'Sempurna! Balasan hangat untuk ucapan perpisahan.',
          },
          {
            id: 'p4-b',
            arab: 'صَبَاحُ الْخَيْرِ يَا أُسْتَاذُ.',
            latin: 'Ṣabāḥul-khair yā ustādz.',
            arti: 'Selamat pagi Ustadz.',
            isCorrect: false,
            feedback: 'Kurang tepat—ini sapaan pagi, bukan balasan perpisahan.',
          },
          {
            id: 'p4-c',
            arab: 'كَمْ ثَمَنُ هَذَا الْكِتَابِ؟',
            latin: 'Kam tsamanu hādzal-kitāb?',
            arti: 'Berapa harga buku ini?',
            isCorrect: false,
            feedback: 'Kurang tepat—ini pertanyaan menanyakan harga.',
          },
        ],
      },
    ],
  },
  {
    id: 'pasar',
    title: 'Belanja di Pasar',
    subtitle: 'Latihan menanyakan barang, harga, dan berterima kasih kepada penjual.',
    level: 'Pemula',
    turns: [
      {
        id: 'b1',
        speaker: 'Penjual (البَائِعُ)',
        promptArab: 'أَهْلًا وَسَهْلًا، هَلْ يُمْكِنُنِي أَنْ أُسَاعِدَكَ؟',
        promptLatin: 'Ahlan wa sahlan, hal yumkinunī an usā‘idaka?',
        promptArti: 'Selamat datang, bolehkah saya membantumu?',
        options: [
          {
            id: 'b1-a',
            arab: 'نَعَمْ مِنْ فَضْلِكَ، أُرِيدُ أَنْ أَشْتَرِيَ قَلَمًا وَكِتَابًا.',
            latin: 'Na‘am min faḍlika, urīdu an asytariya qalaman wa kitāban.',
            arti: 'Ya tolong, saya ingin membeli pulpen dan buku.',
            isCorrect: true,
            feedback: 'Tepat! Sopan menggunakan "Min faḍlika" dan "Urīdu an asytariya".',
          },
          {
            id: 'b1-b',
            arab: 'أَنَامُ مُبَكِّرًا كُلَّ لَيْلَةٍ.',
            latin: 'Anāmu mubakkiran kulla lailah.',
            arti: 'Saya tidur lebih awal setiap malam.',
            isCorrect: false,
            feedback: 'Kurang tepat—kalimat ini tentang kebiasaan tidur.',
          },
          {
            id: 'b1-c',
            arab: 'الْجَوُّ حَارٌّ جِدًّا الْيَوْمَ.',
            latin: 'Al-jawwu ḥārrun jiddan al-yaum.',
            arti: 'Cuacanya panas sekali hari ini.',
            isCorrect: false,
            feedback: 'Belum menjawab tawaran bantuan penjual.',
          },
        ],
      },
      {
        id: 'b2',
        speaker: 'Penjual (البَائِعُ)',
        promptArab: 'تَفَضَّلْ، هَذَا قَلَمٌ جَدِيدٌ وَمُمْتَازٌ.',
        promptLatin: 'Tafaḍḍal, hādzā qalamun jadīdun wa mumtāz.',
        promptArti: 'Silakan, ini pulpen baru dan sangat bagus.',
        options: [
          {
            id: 'b2-a',
            arab: 'جَمِيلٌ! كَمْ ثَمَنُ هَذَا الْقَلَمِ؟',
            latin: 'Jamīl! Kam tsamanu hādzal-qalam?',
            arti: 'Bagus! Berapa harga pulpen ini?',
            isCorrect: true,
            feedback: 'Benar! "Kam tsamanu..." adalah cara standar menanyakan harga.',
          },
          {
            id: 'b2-b',
            arab: 'أَيْنَ الْمُسْتَشْفَى مِنْ فَضْلِكَ؟',
            latin: 'Ainal-mustasyfā min faḍlika?',
            arti: 'Di mana rumah sakit, permisi?',
            isCorrect: false,
            feedback: 'Kurang tepat—ini menanyakan lokasi rumah sakit.',
          },
          {
            id: 'b2-c',
            arab: 'أَسْتَيْقِظُ قَبْلَ الْفَجْرِ.',
            latin: 'Astaiqiẓu qablal-fajr.',
            arti: 'Saya bangun sebelum fajar.',
            isCorrect: false,
            feedback: 'Kurang tepat—tidak berkaitan dengan transaksi jual beli.',
          },
        ],
      },
      {
        id: 'b3',
        speaker: 'Penjual (البَائِعُ)',
        promptArab: 'ثَمَنُهُ عَشَرَةُ آلَافِ رُوبِيَّةٍ. هَلْ تُرِيدُ شَيْئًا آخَرَ؟',
        promptLatin: 'Tsamanuhu ‘asyaratu ālāfi rūbiyyah. Hal turīdu syai’an ākhar?',
        promptArti: 'Harganya sepuluh ribu rupiah. Apakah kamu mau sesuatu yang lain?',
        options: [
          {
            id: 'b3-a',
            arab: 'لَا، شُكْرًا جَزِيلًا. هَذِهِ النُّقُودُ.',
            latin: 'Lā, syukran jazīlan. Hādzihin-nuqūd.',
            arti: 'Tidak, terima kasih banyak. Ini uangnya.',
            isCorrect: true,
            feedback: 'Tepat! Menolak dengan sopan lalu menyerahkan uang pembayaran.',
          },
          {
            id: 'b3-b',
            arab: 'عَفْوًا، السَّيَّارَةُ أَمَامَ الْبَيْتِ.',
            latin: '‘Afwan, as-sayyāratu amāmal-bait.',
            arti: 'Maaf, mobil ada di depan rumah.',
            isCorrect: false,
            feedback: 'Kurang nyambung dengan pertanyaan penjual.',
          },
          {
            id: 'b3-c',
            arab: 'نَعَمْ، اِتَّجِهْ إِلَى الْيَسَارِ.',
            latin: 'Na‘am, ittajih ilal-yasār.',
            arti: 'Ya, belok ke kiri.',
            isCorrect: false,
            feedback: 'Ini petunjuk arah, bukan jawaban belanja.',
          },
        ],
      },
    ],
  },
  {
    id: 'restoran',
    title: 'Memesan Makanan & Minuman',
    subtitle: 'Latihan memesan hidangan di restoran dan menanyakan lokasi.',
    level: 'Menengah',
    turns: [
      {
        id: 'r1',
        speaker: 'Pelayan (النَّادِلُ)',
        promptArab: 'مَسَاءُ الْخَيْرِ، مَاذَا تُرِيدُ أَنْ تَأْكُلَ وَتَشْرَبَ؟',
        promptLatin: 'Masā’ul-khair, mādzā turīdu an ta’kula wa tasyraba?',
        promptArti: 'Selamat sore, apa yang ingin kamu makan dan minum?',
        options: [
          {
            id: 'r1-a',
            arab: 'أُرِيدُ أَرُزًّا وَشَايًا بِالنَّعْنَاعِ مِنْ فَضْلِكَ.',
            latin: 'Urīdu aruzzan wa syāyan bin-na‘nā‘ min faḍlika.',
            arti: 'Saya mau nasi dan teh mint, tolong.',
            isCorrect: true,
            feedback: 'Bagus sekali! Penggunaan kata benda objek (manshub) dan permintaan sopan.',
          },
          {
            id: 'r1-b',
            arab: 'الْغُرْفَةُ نَظِيفَةٌ وَمُرَتَّبَةٌ.',
            latin: 'Al-ghurfatu naẓīfatun wa murattabah.',
            arti: 'Kamarnya bersih dan rapi.',
            isCorrect: false,
            feedback: 'Kurang tepat—ini mendeskripsikan kamar.',
          },
          {
            id: 'r1-c',
            arab: 'صَدِيقِي مُوَظَّفٌ فِي الشَّرِكَةِ.',
            latin: 'Ṣadīqī muwaẓẓafun fisy-syarikah.',
            arti: 'Temanku pegawai di perusahaan.',
            isCorrect: false,
            feedback: 'Kurang tepat—ini informasi pekerjaan teman.',
          },
        ],
      },
      {
        id: 'r2',
        speaker: 'Pelayan (النَّادِلُ)',
        promptArab: 'اِنْتَظِرْ لَحْظَةً، هَلْ تُرِيدُ مَاءً بَارِدًا أَيْضًا؟',
        promptLatin: 'Intaẓir laḥẓatan, hal turīdu mā’an bāridan aiḍan?',
        promptArti: 'Tunggu sebentar, apakah kamu mau air dingin juga?',
        options: [
          {
            id: 'r2-a',
            arab: 'نَعَمْ، وَمِنْ فَضْلِكَ أَيْنَ الْحَمَّامُ؟',
            latin: 'Na‘am, wa min faḍlika ainal-ḥammām?',
            arti: 'Ya, dan permisi di mana kamar mandi?',
            isCorrect: true,
            feedback: 'Tepat! Mengiyakan tawaran sekaligus menanyakan letak kamar mandi.',
          },
          {
            id: 'r2-b',
            arab: 'مَا اسْمُ أُسْتَاذِكَ؟',
            latin: 'Mā ismu ustādzika?',
            arti: 'Siapa nama gurumu?',
            isCorrect: false,
            feedback: 'Kurang nyambung dalam situasi memesan makanan.',
          },
          {
            id: 'r2-c',
            arab: 'زُرْتُ بَيْتَ جَدِّي أَمْسِ.',
            latin: 'Zurtu baita jaddī amsi.',
            arti: 'Saya mengunjungi rumah kakek kemarin.',
            isCorrect: false,
            feedback: 'Kurang tepat—ini menceritakan kejadian kemarin.',
          },
        ],
      },
      {
        id: 'r3',
        speaker: 'Pelayan (النَّادِلُ)',
        promptArab: 'الْحَمَّامُ عَلَى يَمِينِكَ خَلْفَ الْبَابِ. تَفَضَّلِ الطَّعَامَ!',
        promptLatin: 'Al-ḥammāmu ‘alā yamīnika khalfal-bāb. Tafaḍḍaliṭ-ṭa‘ām!',
        promptArti: 'Kamar mandi ada di sebelah kananmu di belakang pintu. Silakan makanannya!',
        options: [
          {
            id: 'r3-a',
            arab: 'شُكْرًا جَزِيلًا، الطَّعَامُ لَذِيذٌ جِدًّا!',
            latin: 'Syukran jazīlan, aṭ-ṭa‘āmu ladzīdzun jiddan!',
            arti: 'Terima kasih banyak, makanannya enak sekali!',
            isCorrect: true,
            feedback: 'Sempurna! Mengucapkan terima kasih dan memuji hidangan.',
          },
          {
            id: 'r3-b',
            arab: 'آسِفٌ، لَا أَتَكَلَّمُ اللُّغَةَ.',
            latin: 'Āsif, lā atakallamul-lughah.',
            arti: 'Maaf, saya tidak berbicara bahasa itu.',
            isCorrect: false,
            feedback: 'Kurang pas untuk membalas penyajian makanan.',
          },
          {
            id: 'r3-c',
            arab: 'الِامْتِحَانُ صَعْبٌ جِدًّا.',
            latin: 'Al-imtiḥānu ṣa‘bun jiddan.',
            arti: 'Ujiannya sulit sekali.',
            isCorrect: false,
            feedback: 'Kurang tepat—ini komentar tentang ujian.',
          },
        ],
      },
    ],
  },
];
