"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    "nav.chat": "Chat AI",
    "nav.quran": "Al-Qur'an",
    "nav.hadith": "Hadits",
    "nav.references": "Rujukan",
    "nav.belajar": "Belajar",
    "nav.about": "Tentang",
    "nav.jadwal": "Jadwal Shalat",
    "nav.dzikir": "Dzikir",
    "nav.asmaul": "Asmaul Husna",
    "nav.doa": "Doa Harian",
    "nav.kiblat": "Arah Kiblat",
    "nav.panduan": "Panduan Ibadah",
    "nav.ibadah": "Ibadah",
    "language.indonesia": "Indonesia",
    "language.english": "English",

    // Footer
    "footer.brand.tagline": "Platform Asisten Keislaman berbasis Kecerdasan Buatan (AI) yang mengintegrasikan pencarian kontekstual Al-Qur'an dan Hadits dengan rujukan sahih dan terpercaya.",
    "footer.brand.badge": "Rujukan Sahih Al-Qur'an & Kutubut Tis'ah",
    "footer.features.title": "Fitur Utama",
    "footer.features.chat": "Chatbot AI Keislaman",
    "footer.features.quran": "Al-Qur'an & Terjemahan",
    "footer.features.hadith": "Kumpulan Kitab Hadits",
    "footer.features.jadwal": "Jadwal Shalat & Hijriah",
    "footer.features.dzikir": "Dzikir Counter",
    "footer.features.asmaul": "Asmaul Husna",
    "footer.features.doa": "Doa Harian",
    "footer.features.kiblat": "Arah Kiblat",
    "footer.features.panduan": "Panduan Ibadah Lengkap",
    "footer.features.praktik": "Praktik Shalat Bergambar",
    "footer.features.hijaiyah": "29 Huruf Hijaiyah Interaktif",
    "footer.learn.title": "Pusat Belajar Islam",
    "footer.learn.cta": "Jelajahi 73 Modul Lengkap →",
    "footer.learn.selected": "Modul Pilihan:",
    "footer.info.title": "Informasi",
    "footer.info.feedback": "Kirim Masukan via WhatsApp →",
    "footer.info.disclaimer": "Dikembangkan untuk memberikan kemudahan dalam mempelajari ajaran Islam. Selalu konfirmasikan hukum dan fatwa mendalam kepada ulama terpercaya.",
    "footer.info.copyright": "AI Qur'an & Hadits System.",
    "footer.bottom.made_with": "Dibuat dengan",
    "footer.bottom.for_ummat": "untuk Ummat Islam",
    "footer.bottom.privacy": "Privasi",
    "footer.bottom.terms": "Syarat & Ketentuan",
    "footer.bottom.help": "Bantuan",

    // Visitor Stats
    "stats.today": "Pengunjung hari ini:",
    "stats.total": "Total kunjungan:",
    "stats.unavailable": "Statistik kunjungan belum tersedia.",
    "stats.admin": "Riwayat pengunjung (admin)",
    "stats.note": "Perkiraan browser unik per hari (WIB); total kunjungan menghitung pembukaan halaman.",

    // Belajar Hub Page
    "belajar.subtitle": "Ilmu • Amal • Akhlak",
    "belajar.title": "Pusat Belajar Islam",
    "belajar.description": "Perdalam aqidah & eskatologi, tadabbur Asmaul Husna, rawat hati, pelajari fiqih ibadah, ushul fiqh, ilmu mantik & etika diskusi, pernikahan, muamalah bisnis, kepemimpinan & organisasi Islami, etika integritas anti-korupsi, komparasi agama, sains Al-Qur'an, biografi ilmuwan muslim, kaligrafi Arab, pangan & sembelihan halal, fiqih medis & ibadah pasien RS, kritik hadits, sejarah peradaban emas, sejarah dinasti Umayyah-Abbasiyah-Utsmani, sejarah masjid bersejarah, parenting Islami, birrul walidain & adab bertetangga, adab menuntut ilmu, adab lisan & bertamu, adab tidur & mimpi, panduan muallaf & hijrah, metode tahfidz & muraja'ah, ulumul Qur'an & metodologi tafsir, ilmu tafsir, ilmu qira'at & sejarah mushaf, ilmu nahwu & sharaf dasar, tadabbur Juz 'Amma & surat agung pilihan, kisah pilihan Al-Qur'an, hukum waris faraidh, wasiat-hibah-anak yatim, adab & etika digital bersosial media, tokoh muslimah teladan & fiqh darah wanita, maqashid syari'ah & tata kelola publik (siyasah), fitnah akhir zaman & Al-Masih Ad-Dajjal, silsilah & mukjizat 25 nabi dan rasul, kepemimpinan Khulafaur Rasyidin, biografi 4 imam madzhab & ulama besar, sejarah Baitul Maqdis & Masjid Al-Aqsha, sejarah Islam Nusantara & kearifan Walisongo, 10 sahabat nabi dijamin surga, fiqh lingkungan & ekologi pelestarian alam, fiqh dakwah & seni komunikasi persuasif, malaikat, jin & benteng ruqyah syar'iyyah, psikologi Islam & kesehatan mental, adab ikhtilaf & toleransi antar-madzhab (Islam wasathiyyah), teladani Rasulullah ﷺ, perbaiki tajwid, balaghah, zakat kontemporer, wakaf produktif, pengurusan jenazah, adab profesi muslim, hukum keluarga Islam di Indonesia, ekonomi syariah, properti-KPR-gadai syariah, fiqh jamaah & sujud khusus, fiqh sumpah-nadzar-kaffarah, fiqh safar & jama'-qashar, fiqh seni & gaya hidup, fiqh haji & umrah, fiqh qurban & aqiqah, fiqh kontemporer, hingga fiqh Ramadan lengkap. 73 modul interaktif komprehensif & 14 alat bantu Islami siap diakses offline & online.",
    "belajar.start": "Mulai belajar →",
    "belajar.hijaiyah.badge": "Dasar Membaca Qur'an",
    "belajar.hijaiyah.cta": "Panduan 29 Huruf Hijaiyah & Khat Sambung →",
    "belajar.praktik.badge": "Tata Cara Praktik",
    "belajar.praktik.cta": "Panduan Bergambar Wudhu dan Shalat Nabi →",
    "belajar.panduan.badge": "Fardhu Kifayah & Manasik",
    "belajar.panduan.cta": "Panduan Jenazah, Yasinan, Haji dan Umrah →",
    "belajar.matan.title": "Perpustakaan Matan Kitab →",
    "belajar.matan.desc": "Baca Arba'in Nawawi dan Bulughul Maram beserta rujukan sumbernya.",
    "belajar.disclaimer": "Materi dasar disertai rujukan untuk dipelajari lebih lanjut. Latihan bacaan Al-Qur'an sebaiknya disimak langsung oleh guru.",

    // About Page
    "about.badge": "Al-Hikmah AI v2.0",
    "about.title": "Tentang Sistem Al-Hikmah AI",
    "about.description": "Platform AI keislaman terintegrasi yang menggabungkan kecerdasan buatan modern dengan sumber rujukan otentik Al-Qur'an dan Hadits sahih untuk menjawab pertanyaan keagamaan dengan akurat, terverifikasi, dan bertanggung jawab.",
    "about.surah_count": "114 Surah",
    "about.hadith_books": "9 Kitab Hadits",
    "about.multi_llm": "Multi-LLM",
    "about.privacy_first": "Privacy First",
    "about.tabs.features": "Fitur Utama",
    "about.tabs.tech": "Teknologi",
    "about.tabs.ai": "Model AI",
    "about.tabs.creator": "Pembuat",
    "about.features.title": "Fitur Unggulan",
    "about.features.count": "Fitur",
    "about.tech.title": "Tumpukan Teknologi",
    "about.tech.count": "Teknologi",
    "about.ai.title": "Model AI yang Didukung",
    "about.ai.count": "Model",
    "about.ai.th_model": "Model",
    "about.ai.th_provider": "Provider",
    "about.ai.th_type": "Tipe",
    "about.ai.th_best_for": "Kelebihan Utama",
    "about.ai.note_label": "Catatan:",
    "about.ai.note_text": "Default aktif saat ini menggunakan GPT-5.6 Luna via GripHub Router (cloud, reasoning cerdas, rujukan akurat). Bisa beralih ke Google Gemini atau Ollama Local (DeepSeek, Llama, Qwen) dengan mengatur variabel LLM_PROVIDER di konfigurasi backend atau langsung melalui dropdown pemilih model AI di tampilan Chatbot.",
    "about.creator.bio": "Pengembang sistem Al-Hikmah AI dengan latar belakang pengembangan web modern dan minat mendalam pada teknologi AI untuk keislaman. Berkomitmen membangun tools yang bermanfaat untuk umat.",
    "about.creator.thanks_title": "Ucapan Terima Kasih",
    "about.creator.quote": "Manfaatkan ilmu sebelum hilang, dan sebarkan kebaikan sebelum terlambat",
    "about.creator.footer_love": "Dibangun dengan cinta untuk kemaslahatan umat",

    // Hijaiyah Page
    "hijaiyah.badge": "Fonetika Dasar Al-Qur'an",
    "hijaiyah.title": "Panduan Interaktif 29 Huruf Hijaiyah",
    "hijaiyah.description": "Kenali 29 huruf Al-Qur'an dari Alif hingga Ya lengkap dengan bentuk penulisan sambung (awal, tengah, akhir), harakat fathah/kasrah/dhammah, titik makhraj artikulasi, dan sifat bunyi huruf.",
    "hijaiyah.modes.card": "Kartu Huruf",
    "hijaiyah.modes.connected": "Bentuk Sambung (Khat)",
    "hijaiyah.modes.harakat": "Harakat (A - I - U)",
    "hijaiyah.modes.quiz": "Kuis Tebak Huruf",
    "hijaiyah.search_placeholder": "Cari huruf (cth: Ba, Dal, ب, ج)...",
    "hijaiyah.region.all": "Semua",
    "hijaiyah.card.click_detail": "Klik kartu untuk melihat detail makhraj & sifat huruf",
    "hijaiyah.quiz.guess": "Tebak Nama Huruf Ini:",
    "hijaiyah.quiz.score": "Skor:",
    "hijaiyah.quiz.correct": "Masya Allah, Jawaban Anda Benar! (+10 poin)",
    "hijaiyah.quiz.incorrect": "Kurang tepat. Jawaban yang benar adalah:",
    "hijaiyah.quiz.next": "Lanjut Huruf Berikutnya →",
    "hijaiyah.modal.makhraj": "Titik Makhraj:",
    "hijaiyah.modal.sifat": "Sifat Huruf:",
    "hijaiyah.modal.close": "Tutup Detail",

    // Tajweed Page
    "tajweed.badge": "Tartil & Makharijul Huruf",
    "tajweed.title": "Panduan Ilmu Tajwid Lengkap",
    "tajweed.description": "Pelajari kaidah hukum bacaan Al-Qur'an lengkap dengan audio contoh pelafalan, cara baca praktis, durasi harakat, contoh ayat, serta kesalahan umum yang sering terjadi.",
    "tajweed.search_placeholder": "Cari kaidah tajwid, contoh latin, atau istilah (misal: ikhfa, mad, nun sukun)...",
    "tajweed.level.all": "Semua Level",
    "tajweed.level.basic": "Dasar",
    "tajweed.level.intermediate": "Menengah",
    "tajweed.level.advanced": "Lanjutan",
    "tajweed.card.how_to": "Cara Baca",
    "tajweed.card.duration": "Durasi",
    "tajweed.card.ghunnah": "Dengung?",
    "tajweed.card.ghunnah_yes": "Ya, dengung dari hidung",
    "tajweed.card.ghunnah_see": "Lihat durasi di atas",
    "tajweed.card.examples": "Contoh Ayat:",
    "tajweed.card.mistakes": "Kesalahan Umum",
    "tajweed.card.ask_ai_prefix": "Tanya AI untuk latihan:",
    "tajweed.card.ask_ai_suffix": "di menu Chat AI.",
    "tajweed.no_results": "Tidak ada kaidah yang cocok dengan pencarian. Coba kata kunci lain seperti “mad”, “mim”, atau “waqaf”.",
  },
  en: {
    // Navbar
    "nav.chat": "AI Chat",
    "nav.quran": "Al-Qur'an",
    "nav.hadith": "Hadith",
    "nav.references": "References",
    "nav.belajar": "Learn",
    "nav.about": "About",
    "nav.jadwal": "Prayer Times",
    "nav.dzikir": "Dhikr",
    "nav.asmaul": "Asmaul Husna",
    "nav.doa": "Daily Duas",
    "nav.kiblat": "Qibla Direction",
    "nav.panduan": "Worship Guide",
    "nav.ibadah": "Worship",
    "language.indonesia": "Indonesia",
    "language.english": "English",

    // Footer
    "footer.brand.tagline": "AI-powered Islamic Assistant platform that integrates contextual search of Al-Qur'an and Hadith with authentic and verified references.",
    "footer.brand.badge": "Authentic References from Al-Qur'an & Kutubut Tis'ah",
    "footer.features.title": "Main Features",
    "footer.features.chat": "Islamic AI Chatbot",
    "footer.features.quran": "Al-Qur'an & Translation",
    "footer.features.hadith": "Hadith Collections",
    "footer.features.jadwal": "Prayer Times & Hijri Calendar",
    "footer.features.dzikir": "Dhikr Counter",
    "footer.features.asmaul": "Asmaul Husna (99 Names)",
    "footer.features.doa": "Daily Supplications",
    "footer.features.kiblat": "Qibla Compass",
    "footer.features.panduan": "Complete Worship Guide",
    "footer.features.praktik": "Illustrated Prayer Guide",
    "footer.features.hijaiyah": "Interactive 29 Hijaiyah Letters",
    "footer.learn.title": "Islamic Learning Hub",
    "footer.learn.cta": "Explore All 73 Modules →",
    "footer.learn.selected": "Featured Modules:",
    "footer.info.title": "Information",
    "footer.info.feedback": "Send Feedback via WhatsApp →",
    "footer.info.disclaimer": "Developed to facilitate Islamic learning. Always verify complex rulings and rulings with trusted scholars.",
    "footer.info.copyright": "AI Qur'an & Hadith System.",
    "footer.bottom.made_with": "Made with",
    "footer.bottom.for_ummat": "for the Muslim Ummah",
    "footer.bottom.privacy": "Privacy",
    "footer.bottom.terms": "Terms & Conditions",
    "footer.bottom.help": "Help",

    // Visitor Stats
    "stats.today": "Visitors today:",
    "stats.total": "Total visits:",
    "stats.unavailable": "Visit statistics unavailable.",
    "stats.admin": "Visitor history (admin)",
    "stats.note": "Estimated unique daily browsers (WIB); total visits count page opens.",

    // Belajar Hub Page
    "belajar.subtitle": "Knowledge • Practice • Character",
    "belajar.title": "Islamic Learning Center",
    "belajar.description": "Deepen aqidah & eschatology, Asmaul Husna tadabbur, purify the heart, master worship fiqh, ushul fiqh, Islamic logic (mantiq) & debate ethics, marriage, business ethics, Islamic leadership & organization, anti-corruption integrity, comparative religion, Quranic science, Muslim scientists, Arabic calligraphy, halal food & slaughtering, medical & hospital patient fiqh, hadith criticism, Islamic golden civilization, Umayyad-Abbasid-Ottoman history, historic mosques, Islamic parenting, honoring parents & neighbors, etiquette of seeking knowledge, speech & hospitality etiquette, sleep & dreams etiquette, new Muslim guide, tahfidz & muraja'ah methods, sciences of the Quran & tafsir, tafsir methodology, qira'at & mushaf history, basic Arabic nahwu & sharaf, Juz 'Amma & great surahs tadabbur, selected Quranic stories, inheritance law (faraidh), will-hibah-orphan wealth, digital etiquette, exemplary Muslim women & women's blood fiqh, maqashid sharia & governance (siyasah), end-time trials & Dajjal, miracles of 25 prophets, Khulafaur Rasyidin leadership, biographies of the 4 Imams & great scholars, Baitul Maqdis & Al-Aqsha history, history of Islam in the Archipelago & Walisongo, 10 companions guaranteed paradise, environmental fiqh & Islamic ecology, persuasive dakwah, angels, jinn & ruqyah shariyyah, Islamic psychology & mental health, ethics of disagreement & moderation (wasatiyyah), emulate Prophet Muhammad ﷺ, improve tajweed, balaghah, contemporary zakat, productive waqf, funeral rites, Muslim professional ethics, Indonesian Islamic family law, sharia economics, Islamic property-KPR-rahn, congregational prayer & sujud, oaths-vows-kaffarah, travel fiqh (jama'-qashar), Islamic lifestyle & arts, Hajj & Umrah fiqh, Qurban & Aqiqah, contemporary fatwas, and Ramadan fiqh. 73 comprehensive interactive modules & 14 Islamic tools ready offline & online.",
    "belajar.start": "Start learning →",
    "belajar.hijaiyah.badge": "Quranic Reading Fundamentals",
    "belajar.hijaiyah.cta": "Guide to 29 Hijaiyah Letters & Connected Script →",
    "belajar.praktik.badge": "Practical Step-by-Step",
    "belajar.praktik.cta": "Illustrated Guide to Wudhu and Prophet's Prayer →",
    "belajar.panduan.badge": "Fardhu Kifayah & Pilgrimage",
    "belajar.panduan.cta": "Guide to Funeral Rites, Yasin, Hajj & Umrah →",
    "belajar.matan.title": "Classical Text Library →",
    "belajar.matan.desc": "Read Arba'in Nawawi and Bulughul Maram with authoritative references.",
    "belajar.disclaimer": "Foundational material with references for further study. Quran recitation practice should ideally be guided directly by a teacher.",

    // About Page
    "about.badge": "Al-Hikmah AI v2.0",
    "about.title": "About Al-Hikmah AI System",
    "about.description": "An integrated Islamic AI platform combining modern artificial intelligence with authentic sources of Al-Qur'an and Sahih Hadith to answer religious questions accurately, verifiably, and responsibly.",
    "about.surah_count": "114 Surahs",
    "about.hadith_books": "9 Hadith Books",
    "about.multi_llm": "Multi-LLM",
    "about.privacy_first": "Privacy First",
    "about.tabs.features": "Key Features",
    "about.tabs.tech": "Technology",
    "about.tabs.ai": "AI Models",
    "about.tabs.creator": "Creator",
    "about.features.title": "Key Features",
    "about.features.count": "Features",
    "about.tech.title": "Tech Stack",
    "about.tech.count": "Technologies",
    "about.ai.title": "Supported AI Models",
    "about.ai.count": "Models",
    "about.ai.th_model": "Model",
    "about.ai.th_provider": "Provider",
    "about.ai.th_type": "Type",
    "about.ai.th_best_for": "Key Strengths",
    "about.ai.note_label": "Note:",
    "about.ai.note_text": "Current active default is GPT-5.6 Luna via GripHub Router (cloud, smart reasoning, accurate citations). You can switch to Google Gemini or Ollama Local (DeepSeek, Llama, Qwen) by configuring the LLM_PROVIDER environment variable in the backend or via the AI model dropdown in the Chatbot interface.",
    "about.creator.bio": "Developer of Al-Hikmah AI with a background in modern web engineering and a deep passion for AI applications in Islamic studies. Dedicated to building beneficial tools for the ummah.",
    "about.creator.thanks_title": "Acknowledgements",
    "about.creator.quote": "Benefit from knowledge before it fades, and spread goodness before it is too late",
    "about.creator.footer_love": "Built with love for the benefit of the ummah",

    // Hijaiyah Page
    "hijaiyah.badge": "Quranic Basic Phonetics",
    "hijaiyah.title": "Interactive Guide to 29 Hijaiyah Letters",
    "hijaiyah.description": "Explore the 29 Arabic letters from Alif to Ya complete with cursive forms (initial, medial, final), short vowels (fathah/kasrah/dhammah), articulation points (makhraj), and letter phonetic characteristics.",
    "hijaiyah.modes.card": "Letter Cards",
    "hijaiyah.modes.connected": "Connected Forms (Khat)",
    "hijaiyah.modes.harakat": "Vowels (A - I - U)",
    "hijaiyah.modes.quiz": "Letter Quiz",
    "hijaiyah.search_placeholder": "Search letter (e.g. Ba, Dal, ب, ج)...",
    "hijaiyah.region.all": "All",
    "hijaiyah.card.click_detail": "Click any card to inspect makhraj and sound characteristics",
    "hijaiyah.quiz.guess": "Guess This Letter's Name:",
    "hijaiyah.quiz.score": "Score:",
    "hijaiyah.quiz.correct": "Masha Allah, Correct Answer! (+10 points)",
    "hijaiyah.quiz.incorrect": "Incorrect. The correct answer is:",
    "hijaiyah.quiz.next": "Next Letter →",
    "hijaiyah.modal.makhraj": "Articulation Point (Makhraj):",
    "hijaiyah.modal.sifat": "Characteristics (Sifat):",
    "hijaiyah.modal.close": "Close Details",

    // Tajweed Page
    "tajweed.badge": "Tartil & Makharijul Huruf",
    "tajweed.title": "Comprehensive Tajweed Guide",
    "tajweed.description": "Learn the rules of Al-Qur'an recitation complete with practical guides, harakat durations, verse examples, and common mistakes to avoid.",
    "tajweed.search_placeholder": "Search tajweed rule, latin example, or term (e.g. ikhfa, mad, nun sukun)...",
    "tajweed.level.all": "All Levels",
    "tajweed.level.basic": "Basic",
    "tajweed.level.intermediate": "Intermediate",
    "tajweed.level.advanced": "Advanced",
    "tajweed.card.how_to": "How to Recite",
    "tajweed.card.duration": "Duration",
    "tajweed.card.ghunnah": "Nasalization?",
    "tajweed.card.ghunnah_yes": "Yes, nasal resonance (ghunnah)",
    "tajweed.card.ghunnah_see": "See duration above",
    "tajweed.card.examples": "Verse Examples:",
    "tajweed.card.mistakes": "Common Mistakes",
    "tajweed.card.ask_ai_prefix": "Ask AI for practice:",
    "tajweed.card.ask_ai_suffix": "in the AI Chat menu.",
    "tajweed.no_results": "No rules match your search. Try another keyword like “mad”, “mim”, or “waqaf”.",
  },
};

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "id";
  const saved = localStorage.getItem("language") as Language | null;
  if (saved === "id" || saved === "en") return saved;
  return "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string) => {
    if (!mountedRef.current) return translations.id[key] || key;
    return translations[language][key] || translations.id[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
