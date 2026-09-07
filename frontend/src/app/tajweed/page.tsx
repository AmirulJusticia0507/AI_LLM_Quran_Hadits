"use client";

import { useMemo, useState } from "react";
import {
  GraduationCap,
  Search,
  Volume2,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface TajweedRule {
  id: string;
  name: string;
  arab: string;
  category: string;
  letters: string[];
  definition: string;
  howTo: string;
  duration: string;
  examples: { arab: string; latin: string; note: string }[];
  mistakes: string;
  level: "Dasar" | "Menengah" | "Lanjutan";
}

const CATEGORIES = [
  "Semua",
  "Nun Sukun & Tanwin",
  "Mim Sukun",
  "Mad",
  "Qalqalah & Ghunnah",
  "Tafkhim & Tarqiq",
  "Waqaf",
] as const;

const RULES: TajweedRule[] = [
  {
    id: "izhar-halqi",
    name: "Izhar Halqi",
    arab: "إظهار حلقي",
    category: "Nun Sukun & Tanwin",
    letters: ["ء", "هـ", "ع", "ح", "غ", "خ"],
    definition: "Membaca nun sukun (نْ) atau tanwin dengan jelas tanpa dengung ketika bertemu salah satu dari 6 huruf halqi (tenggorokan).",
    howTo: "Ucapkan نْ / tanwin dengan jelas, tidak ditahan, langsung masuk ke huruf berikutnya tanpa ghunnah.",
    duration: "1 harakat (pendek, tanpa tahan)",
    examples: [
      { arab: "مِنْهَا", latin: "min-hā", note: "نْ bertemu هـ → dibaca jelas" },
      { arab: "عَذَابٌ أَلِيمٌ", latin: "'adzābun alīm", note: "tanwin bertemu ء → dibaca jelas" },
      { arab: "غَفُورٌ حَلِيمٌ", latin: "ghafūrun ḥalīm", note: "tanwin bertemu ح → dibaca jelas" },
    ],
    mistakes: "Menahan bacaan dengan dengung seperti ikhfa, atau memutus suara terlalu keras.",
    level: "Dasar",
  },
  {
    id: "idgham-bighunnah",
    name: "Idgham Bighunnah",
    arab: "إدغام بغنة",
    category: "Nun Sukun & Tanwin",
    letters: ["ي", "ن", "م", "و"],
    definition: "Meleburkan nun sukun/tanwin ke huruf berikutnya disertai dengung (ghunnah). Hurufnya terkumpul dalam kata يَنْمُو.",
    howTo: "LeBURkan نْ ke huruf ي ن م و sambil dengungkan dari hidung sekitar 2 harakat.",
    duration: "2 harakat dengan ghunnah",
    examples: [
      { arab: "مَنْ يَقُولُ", latin: "may yaqūl", note: "نْ + ي → melebur + dengung" },
      { arab: "عَذَابٌ مُهِينٌ", latin: "'adzābum muhīn", note: "tanwin + م → melebur + dengung" },
      { arab: "مِنْ وَالٍ", latin: "miw wāl", note: "نْ + و → melebur + dengung" },
    ],
    mistakes: "Tidak mendengung, atau mendengung terlalu panjang lebih dari 2 harakat.",
    level: "Dasar",
  },
  {
    id: "idgham-bilaghunnah",
    name: "Idgham Bilaghunnah",
    arab: "إدغام بلا غنة",
    category: "Nun Sukun & Tanwin",
    letters: ["ل", "ر"],
    definition: "Meleburkan nun sukun/tanwin ke huruf ل atau ر TANPA dengung.",
    howTo: "Masukkan نْ sepenuhnya ke ل / ر, dibaca tegas tanpa suara hidung.",
    duration: "1 harakat, tanpa ghunnah",
    examples: [
      { arab: "مِنْ لَدُنْهُ", latin: "mil ladunh", note: "نْ + ل → melebur tanpa dengung" },
      { arab: "غَفُورٌ رَحِيمٌ", latin: "ghafūrur raḥīm", note: "tanwin + ر → melebur tanpa dengung" },
    ],
    mistakes: "Ikut mendengung seperti bighunnah, atau tidak melebur sempurna.",
    level: "Dasar",
  },
  {
    id: "iqlab",
    name: "Iqlab",
    arab: "إقلاب",
    category: "Nun Sukun & Tanwin",
    letters: ["ب"],
    definition: "Mengubah bunyi nun sukun/tanwin menjadi mim (مْ) ketika bertemu huruf ب, disertai ghunnah.",
    howTo: "Ubah نْ menjadi bunyi مْ samar, bibir merapat ringan, dengungkan 2 harakat. Ditandai mim kecil (م) di mushaf.",
    duration: "2 harakat dengan ghunnah",
    examples: [
      { arab: "مِنْۢ بَعْدِ", latin: "mim ba'd", note: "نْ + ب → berubah jadi مْ + dengung" },
      { arab: "سَمِيعٌۢ بَصِيرٌ", latin: "samī'um baṣīr", note: "tanwin + ب → berubah jadi مْ" },
    ],
    mistakes: "Bibir merapat terlalu rapat hingga jadi mim murni, atau tidak mendengung.",
    level: "Menengah",
  },
  {
    id: "ikhfa-haqiqi",
    name: "Ikhfa Haqiqi",
    arab: "إخفاء حقيقي",
    category: "Nun Sukun & Tanwin",
    letters: ["ت", "ث", "ج", "د", "ذ", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ف", "ق", "ك"],
    definition: "Menyamarkan bunyi nun sukun/tanwin antara izhar dan idgham disertai ghunnah ketika bertemu 15 huruf sisanya.",
    howTo: "Siapkan lidah ke makhraj huruf berikutnya, samarkan نْ sambil dengungkan 2 harakat. Tebal/tipis mengikuti huruf setelahnya.",
    duration: "2 harakat dengan ghunnah",
    examples: [
      { arab: "مِنْ سُوءٍ", latin: "ming sū'", note: "نْ + س → samar + dengung tipis" },
      { arab: "عَنْ صَلَاتِهِمْ", latin: "'ang ṣalātihim", note: "نْ + ص → samar + dengung tebal" },
      { arab: "كِرَامًا كَاتِبِينَ", latin: "kirāmang kātibīn", note: "tanwin + ك → samar + dengung" },
    ],
    mistakes: "Dibaca jelas seperti izhar, atau melebur penuh seperti idgham.",
    level: "Menengah",
  },
  {
    id: "ikhfa-syafawi",
    name: "Ikhfa Syafawi",
    arab: "إخفاء شفوي",
    category: "Mim Sukun",
    letters: ["ب"],
    definition: "Menyamarkan mim sukun (مْ) ketika bertemu ب disertai ghunnah.",
    howTo: "Rapatkan bibir ringan tanpa menekan kuat, samarkan مْ sambil dengung 2 harakat.",
    duration: "2 harakat dengan ghunnah",
    examples: [
      { arab: "وَهُمْ بِالْآخِرَةِ", latin: "wa hum bil-ākhirah", note: "مْ + ب → samar + dengung" },
      { arab: "تَرْمِيهِمْ بِحِجَارَةٍ", latin: "tarmīhim biḥijārah", note: "مْ + ب → samar + dengung" },
    ],
    mistakes: "Menekan bibir terlalu kuat hingga jadi mim murni, atau tidak dengung.",
    level: "Menengah",
  },
  {
    id: "idgham-mimi",
    name: "Idgham Mimi / Mitslain",
    arab: "إدغام متماثلين",
    category: "Mim Sukun",
    letters: ["م"],
    definition: "Meleburkan mim sukun ke mim berharakat berikutnya disertai ghunnah.",
    howTo: "Gabungkan dua م jadi satu tasydid, dengungkan 2 harakat.",
    duration: "2 harakat dengan ghunnah",
    examples: [
      { arab: "لَهُمْ مَا", latin: "lahum mā", note: "مْ + م → melebur + dengung" },
      { arab: "فِي قُلُوبِهِمْ مَرَضٌ", latin: "fī qulūbihim maraḍ", note: "مْ + م → tasydid + dengung" },
    ],
    mistakes: "Tidak mendengung atau memutus antara dua mim.",
    level: "Dasar",
  },
  {
    id: "izhar-syafawi",
    name: "Izhar Syafawi",
    arab: "إظهار شفوي",
    category: "Mim Sukun",
    letters: ["selain م dan ب"],
    definition: "Membaca mim sukun dengan jelas ketika bertemu semua huruf selain م dan ب.",
    howTo: "Ucapkan مْ jelas tanpa dengung dan tanpa menahan.",
    duration: "1 harakat, tanpa ghunnah",
    examples: [
      { arab: "لَهُمْ فِيهَا", latin: "lahum fīhā", note: "مْ + ف → jelas (hati-hati jangan samar)" },
      { arab: "أَلَمْ تَرَ", latin: "alam tara", note: "مْ + ت → jelas" },
    ],
    mistakes: "Menyamarkan مْ sebelum ف dan و hingga terdengar seperti ikhfa.",
    level: "Dasar",
  },
  {
    id: "mad-thobii",
    name: "Mad Thobi'i",
    arab: "مد طبيعي",
    category: "Mad",
    letters: ["ا", "و", "ي"],
    definition: "Bacaan panjang dasar 2 harakat: fathah + alif, dhammah + wawu mati, kasrah + ya mati.",
    howTo: "Panjangkan 2 ketukan secara konsisten, tidak lebih.",
    duration: "2 harakat",
    examples: [
      { arab: "قَالَ", latin: "qāla", note: "fathah + ا → 2 harakat" },
      { arab: "يَقُولُ", latin: "yaqūl", note: "dhammah + و → 2 harakat" },
      { arab: "قِيلَ", latin: "qīla", note: "kasrah + ي → 2 harakat" },
    ],
    mistakes: "Dipanjangkan lebih dari 2 harakat atau dibaca pendek 1 harakat.",
    level: "Dasar",
  },
  {
    id: "mad-wajib-muttasil",
    name: "Mad Wajib Muttasil",
    arab: "مد واجب متصل",
    category: "Mad",
    letters: ["mad + hamzah 1 kata"],
    definition: "Mad thobi'i bertemu hamzah dalam SATU kata, wajib dipanjangkan.",
    howTo: "Panjangkan 4–5 harakat (pilih konsisten).",
    duration: "4–5 harakat",
    examples: [
      { arab: "السَّمَاءِ", latin: "as-samā'", note: "ا + ء satu kata → 4-5 harakat" },
      { arab: "سُوءَ", latin: "sū'", note: "و + ء satu kata → 4-5 harakat" },
    ],
    mistakes: "Hanya dibaca 2 harakat seperti mad thobi'i biasa.",
    level: "Menengah",
  },
  {
    id: "mad-jaiz-munfasil",
    name: "Mad Jaiz Munfasil",
    arab: "مد جائز منفصل",
    category: "Mad",
    letters: ["mad + hamzah beda kata"],
    definition: "Mad thobi'i di akhir kata bertemu hamzah di awal kata berikutnya, boleh dibaca 2, 4, atau 5 harakat.",
    howTo: "Pilih 2 / 4 / 5 harakat dan konsisten dalam sekali bacaan.",
    duration: "2, 4, atau 5 harakat",
    examples: [
      { arab: "إِنَّا أَعْطَيْنَاكَ", latin: "innā a'ṭaināk", note: "ا akhir kata + ء awal kata" },
      { arab: "لَا أَعْبُدُ", latin: "lā a'bud", note: "boleh 2/4/5 harakat" },
    ],
    mistakes: "Tidak konsisten panjang-pendek dalam satu bacaan.",
    level: "Menengah",
  },
  {
    id: "mad-lazim",
    name: "Mad Lazim",
    arab: "مد لازم",
    category: "Mad",
    letters: ["mad + sukun asli"],
    definition: "Mad bertemu sukun asli (bukan karena waqaf). Wajib dibaca 6 harakat. Ada kilmi (kata) dan harfi (huruf pembuka surah).",
    howTo: "Panjangkan penuh 6 harakat, baik mutsaqqal (tasydid) maupun mukhaffaf.",
    duration: "6 harakat (wajib)",
    examples: [
      { arab: "الضَّالِّينَ", latin: "aḍ-ḍāllīn", note: "kilmi mutsaqqal → 6 harakat" },
      { arab: "آلْآنَ", latin: "āl-ān", note: "kilmi mukhaffaf → 6 harakat" },
      { arab: "الم", latin: "alif lām mīm", note: "harfi: لام dibaca 6 harakat" },
    ],
    mistakes: "Dibaca kurang dari 6 harakat.",
    level: "Lanjutan",
  },
  {
    id: "mad-arid",
    name: "Mad 'Arid Lissukun",
    arab: "مد عارض للسكون",
    category: "Mad",
    letters: ["mad + waqaf"],
    definition: "Mad thobi'i bertemu huruf yang disukunkan karena waqaf (berhenti). Boleh 2, 4, atau 6 harakat.",
    howTo: "Saat waqaf, pilih 2/4/6 harakat. Saat washal (lanjut) kembali 2 harakat.",
    duration: "2, 4, atau 6 harakat saat waqaf",
    examples: [
      { arab: "الْعَالَمِينَ", latin: "al-'ālamīn", note: "waqaf di نْ → boleh 2/4/6" },
      { arab: "الرَّحِيمِ", latin: "ar-raḥīm", note: "waqaf di مْ → boleh 2/4/6" },
    ],
    mistakes: "Saat washal ikut dipanjangkan 6 harakat.",
    level: "Menengah",
  },
  {
    id: "mad-lin",
    name: "Mad Lin",
    arab: "مد لين",
    category: "Mad",
    letters: ["وْ / يْ setelah fathah + waqaf"],
    definition: "Wawu/ya sukun didahului fathah lalu waqaf. Dibaca lembut, boleh 2/4/6 harakat.",
    howTo: "Lunakkan bacaan, jangan dipanjangkan kaku seperti mad thobi'i.",
    duration: "2, 4, atau 6 harakat saat waqaf",
    examples: [
      { arab: "قُرَيْشٍ", latin: "quraisy", note: "يْ + waqaf → lembut" },
      { arab: "الْخَوْفِ", latin: "al-khauf", note: "وْ + waqaf → lembut" },
    ],
    mistakes: "Dibaca seperti mad thobi'i kaku atau terlalu pendek.",
    level: "Menengah",
  },
  {
    id: "mad-iwad",
    name: "Mad Iwad",
    arab: "مد عوض",
    category: "Mad",
    letters: ["tanwin fathah + waqaf"],
    definition: "Tanwin fathah (ً) yang diwaqafkan berubah menjadi mad 2 harakat, kecuali ta marbuthah (ة).",
    howTo: "Ganti tanwin fathah jadi fathah + alif 2 harakat. Ta marbuthah dibaca هْ mati.",
    duration: "2 harakat",
    examples: [
      { arab: "عَلِيمًا", latin: "'alīmā", note: "waqaf → alif 2 harakat" },
      { arab: "رَحْمَةً", latin: "raḥmah", note: "ta marbuthah → dibaca هْ, bukan iwad" },
    ],
    mistakes: "Tetap membaca tanwin (an) saat waqaf.",
    level: "Dasar",
  },
  {
    id: "mad-shilah",
    name: "Mad Shilah",
    arab: "مد صلة",
    category: "Mad",
    letters: ["هـ dhamir"],
    definition: "Ha dhamir (هُ / هِ) yang diapit huruf hidup: qashirah dibaca 2 harakat, thawilah (bertemu hamzah) 4-5 harakat.",
    howTo: "Panjangkan هُ jadi هُوْ dan هِ jadi هِيْ 2 harakat. Jika setelahnya hamzah → 4-5 harakat.",
    duration: "2 harakat (qashirah), 4-5 (thawilah)",
    examples: [
      { arab: "إِنَّهُ كَانَ", latin: "innahū kān", note: "هُ diapit hidup → 2 harakat" },
      { arab: "لَهُ أَجْرُهُ", latin: "lahū ajruh", note: "thawilah → 4-5 harakat" },
    ],
    mistakes: "Tidak memanjangkan ha dhamir sama sekali.",
    level: "Lanjutan",
  },
  {
    id: "qalqalah",
    name: "Qalqalah",
    arab: "قلقلة",
    category: "Qalqalah & Ghunnah",
    letters: ["ق", "ط", "ب", "ج", "د"],
    definition: "Pantulan suara pada 5 huruf (ق ط ب ج د, singkatan قُطْبُ جَدٍّ) ketika sukun. Sughra: di tengah kata. Kubra: saat waqaf (lebih kuat).",
    howTo: "Pantulankan dengan jelas, jangan sampai terdengar seperti berharakat penuh. Kubra lebih memantul dari sughra.",
    duration: "Pantulan seketika (tidak dihitung harakat)",
    examples: [
      { arab: "يَقْطَعُونَ", latin: "yaqṭa'ūn", note: "قْ tengah → sughra" },
      { arab: "الْفَلَقِ", latin: "al-falaq", note: "waqaf di قْ → kubra" },
      { arab: "مَسَدٍ", latin: "masad", note: "waqaf di دْ → kubra" },
    ],
    mistakes: "Pantulan terlalu lemah (hilang) atau terlalu kuat hingga jadi harakat.",
    level: "Dasar",
  },
  {
    id: "ghunnah",
    name: "Ghunnah",
    arab: "غنة",
    category: "Qalqalah & Ghunnah",
    letters: ["نْ / مْ bertasydid, idgham, iqlab, ikhfa"],
    definition: "Dengung dari hidung (khaishum) 2 harakat. Wajib pada nun/mim bertasydid (أَشَدّ), lalu idgham bighunnah, iqlab, ikhfa.",
    howTo: "Alirkan suara ke hidung 2 ketukan. Tingkatan terkuat: نّ dan مّ.",
    duration: "2 harakat",
    examples: [
      { arab: "إِنَّ", latin: "inna", note: "نّ → ghunnah wajib terkuat" },
      { arab: "ثُمَّ", latin: "tsumma", note: "مّ → ghunnah wajib terkuat" },
      { arab: "مِنْ بَعْدِ", latin: "mim ba'd", note: "iqlab → ghunnah 2 harakat" },
    ],
    mistakes: "Dengung dari tenggorokan/mulut bukan hidung, atau durasi kurang dari 2 harakat.",
    level: "Dasar",
  },
  {
    id: "tafkhim-tarqiq",
    name: "Tafkhim & Tarqiq (Ra & Lam Jalalah)",
    arab: "تفخيم وترقيق",
    category: "Tafkhim & Tarqiq",
    letters: ["ر", "ل (lafzhul jalalah)"],
    definition: "Ra dibaca tebal (tafkhim) saat fathah/dhammah, tipis (tarqiq) saat kasrah. Lam pada lafazh Allah tebal jika didahului fathah/dhammah, tipis jika kasrah.",
    howTo: "Tebal: angkat pangkal lidah. Tipis: rendahkan. Dengarkan perbedaan: رَ (tebal) vs رِ (tipis).",
    duration: "Mengikuti harakat huruf",
    examples: [
      { arab: "رَبِّ", latin: "rabb", note: "رَ fathah → tebal" },
      { arab: "رِجَالٌ", latin: "rijāl", note: "رِ kasrah → tipis" },
      { arab: "وَاللَّهُ", latin: "wallāh", note: "lam jalalah setelah fathah → tebal" },
      { arab: "بِاللَّهِ", latin: "billāh", note: "lam jalalah setelah kasrah → tipis" },
    ],
    mistakes: "Ra selalu dibaca tebal, atau lam jalalah selalu tipis.",
    level: "Menengah",
  },
  {
    id: "waqaf",
    name: "Tanda Waqaf",
    arab: "علامات الوقف",
    category: "Waqaf",
    letters: ["م ۚ ۖ ۗ ۘ ∴"],
    definition: "Rambu berhenti/menyambung: م (lazim/wajib berhenti), ۚ (jaiz/tsaw; berhenti lebih utama), ۖ (murakhkhash; lanjut lebih utama), ۗ (tidak boleh berhenti), ∴ (berhenti di salah satu titik).",
    howTo: "Ikuti tanda di mushaf agar makna tidak terputus. Waqaf qabih (buruk) bisa merusak makna.",
    duration: "Berhenti dengan sukun + nafas",
    examples: [
      { arab: "… م …", latin: "waqaf lazim", note: "wajib berhenti" },
      { arab: "… ۚ …", latin: "waqaf jaiz", note: "boleh berhenti/lanjut, berhenti lebih baik" },
      { arab: "… ۗ …", latin: "la waqfa", note: "jangan berhenti" },
    ],
    mistakes: "Berhenti sembarangan di tengah makna hingga mengubah arti ayat.",
    level: "Menengah",
  },
];

const LEVELS = ["Semua Level", "Dasar", "Menengah", "Lanjutan"] as const;

export default function TajweedPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Semua");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("Semua Level");
  const [openId, setOpenId] = useState<string | null>("izhar-halqi");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RULES.filter((r) => {
      if (category !== "Semua" && r.category !== category) return false;
      if (level !== "Semua Level" && r.level !== level) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.arab.includes(query.trim()) ||
        r.definition.toLowerCase().includes(q) ||
        r.letters.join(" ").includes(query.trim())
      );
    });
  }, [query, category, level]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 px-2 sm:px-4 py-6 sm:py-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" /> Ilmu Tajwid Praktis
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              Panduan Tajwid: Ghunnah, Idgham & Lainnya
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
              Pelajari hukum nun sukun, mim sukun, mad, qalqalah, ghunnah, tafkhim-tarqiq, dan waqaf
              dengan huruf, contoh ayat, durasi, dan kesalahan umum.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center shrink-0">
            <span className="text-xs text-emerald-200 uppercase font-semibold block">Total Kaidah</span>
            <span className="text-2xl font-black text-white">{RULES.length} Kaidah</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari: ghunnah, idgham, mad, qalqalah, waqaf, ب, نْ..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Kategori:
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    category === c
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Level:
            </p>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    level === l
                      ? "bg-teal-600 text-white shadow-md shadow-teal-600/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 hover:border-teal-500"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Menampilkan <span className="font-bold text-emerald-600 dark:text-emerald-400">{filtered.length}</span> dari {RULES.length} kaidah
        </p>
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((rule) => {
          const isOpen = openId === rule.id;
          return (
            <article
              key={rule.id}
              className={`rounded-3xl p-5 sm:p-6 shadow-lg space-y-4 bg-white/95 dark:bg-slate-900/95 border transition-all ${
                isOpen
                  ? "border-emerald-500/50 shadow-emerald-500/10"
                  : "border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : rule.id)}
                className="w-full text-left cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        {rule.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          rule.level === "Dasar"
                            ? "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                            : rule.level === "Menengah"
                            ? "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                            : "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                        }`}
                      >
                        {rule.level}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {rule.name}
                    </h2>
                    <p className="text-emerald-700 dark:text-emerald-300 font-semibold text-sm mt-0.5" dir="rtl">
                      {rule.arab}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {rule.letters.map((l, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm font-bold border border-slate-200 dark:border-slate-700"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </button>

              {isOpen && (
                <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {rule.definition}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/20">
                      <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Cara Baca
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{rule.howTo}</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-500/20">
                      <p className="text-[11px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Durasi
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold">{rule.duration}</p>
                      <p className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mt-2.5 mb-1 flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5" /> Dengung?
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {rule.duration.toLowerCase().includes("ghunnah") ? "Ya, dengung dari hidung" : "Lihat durasi di atas"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Contoh Ayat:
                    </p>
                    {rule.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80"
                      >
                        <p className="text-right text-lg sm:text-xl font-bold text-slate-900 dark:text-emerald-100 leading-loose" dir="rtl">
                          {ex.arab}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-1">{ex.latin}</p>
                        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1 flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          {ex.note}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50">
                    <p className="text-[11px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Kesalahan Umum
                    </p>
                    <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">{rule.mistakes}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-600 text-white flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm leading-relaxed">
                      Tanya AI untuk latihan: <span className="font-semibold">“Berikan 3 contoh {rule.name} beserta cara bacanya”</span> di menu Chat AI.
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-slate-500 dark:text-slate-400">
          Tidak ada kaidah yang cocok dengan pencarian. Coba kata kunci lain seperti “mad”, “mim”, atau “waqaf”.
        </div>
      )}
    </div>
  );
}
