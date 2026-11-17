"use client";

import { useState } from "react";
import { Sparkles, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AsmaulHusna {
  arab: string;
  latin: string;
  arti: string;
  artiEn?: string;
}

const ASMAUL_HUSNA: AsmaulHusna[] = [
  { arab: "الله", latin: "Allah", arti: "Allah" },
  { arab: "الرحمن", latin: "Ar-Rahman", arti: "Maha Pengasih" },
  { arab: "الرحيم", latin: "Ar-Rahim", arti: "Maha Penyayang" },
  { arab: "الملك", latin: "Al-Malik", arti: "Maha Merajai" },
  { arab: "القدوس", latin: "Al-Quddus", arti: "Maha Suci" },
  { arab: "السلام", latin: "As-Salam", arti: "Maha Pemberi Kesejahteraan" },
  { arab: "المؤمن", latin: "Al-Mu'min", arti: "Maha Pemberi Keamanan" },
  { arab: "المهيمن", latin: "Al-Muhaimin", arti: "Maha Pemelihara" },
  { arab: "العزيز", latin: "Al-Aziz", arti: "Maha Perkasa" },
  { arab: "الجبار", latin: "Al-Jabbar", arti: "Maha Memaksa" },
  { arab: "المتكبر", latin: "Al-Mutakabbir", arti: "Maha Megah" },
  { arab: "الخالق", latin: "Al-Khaliq", arti: "Maha Pencipta" },
  { arab: "البارئ", latin: "Al-Bari'", arti: "Maha Melepaskan" },
  { arab: "المصور", latin: "Al-Mushawwir", arti: "Maha Membentuk Rupa" },
  { arab: "الغفار", latin: "Al-Ghaffar", arti: "Maha Pengampun" },
  { arab: "القهار", latin: "Al-Qahhar", arti: "Maha Memaksa" },
  { arab: "الوهاب", latin: "Al-Wahhab", arti: "Maha Pemberi Karunia" },
  { arab: "الرزاق", latin: "Ar-Razzaq", arti: "Maha Pemberi Rezeki" },
  { arab: "الفتاح", latin: "Al-Fattah", arti: "Maha Pembuka Rahmat" },
  { arab: "العليم", latin: "Al-Alim", arti: "Maha Mengetahui" },
  { arab: "القابض", latin: "Al-Qabidh", arti: "Maha Menyempitkan" },
  { arab: "الباسط", latin: "Al-Basith", arti: "Maha Melapangkan" },
  { arab: "الخافض", latin: "Al-Khafidh", arti: "Maha Merendahkan" },
  { arab: "الرافع", latin: "Ar-Rafi'", arti: "Maha Meninggikan" },
  { arab: "المعز", latin: "Al-Mu'izz", arti: "Maha Memuliakan" },
  { arab: "المذل", latin: "Al-Mudzill", arti: "Maha Menghinakan" },
  { arab: "السميع", latin: "As-Sami'", arti: "Maha Mendengar" },
  { arab: "البصير", latin: "Al-Bashir", arti: "Maha Melihat" },
  { arab: "الحكم", latin: "Al-Hakam", arti: "Maha Menetapkan" },
  { arab: "العدل", latin: "Al-Adl", arti: "Maha Adil" },
  { arab: "اللطيف", latin: "Al-Lathif", arti: "Maha Lembut" },
  { arab: "الخبير", latin: "Al-Khabir", arti: "Maha Mengenal" },
  { arab: "الحليم", latin: "Al-Halim", arti: "Maha Penyantun" },
  { arab: "العظيم", latin: "Al-Azhim", arti: "Maha Agung" },
  { arab: "الغفور", latin: "Al-Ghafur", arti: "Maha Pengampun" },
  { arab: "الشكور", latin: "Asy-Syakur", arti: "Maha Pembalas Budi" },
  { arab: "العلي", latin: "Al-Aliyy", arti: "Maha Tinggi" },
  { arab: "الكبير", latin: "Al-Kabir", arti: "Maha Besar" },
  { arab: "الحفيظ", latin: "Al-Hafizh", arti: "Maha Memelihara" },
  { arab: "المقيت", latin: "Al-Muqit", arti: "Maha Pemberi Kecukupan" },
  { arab: "الحسيب", latin: "Al-Hasib", arti: "Maha Membuat Perhitungan" },
  { arab: "الجليل", latin: "Al-Jalil", arti: "Maha Luhur" },
  { arab: "الكريم", latin: "Al-Karim", arti: "Maha Mulia" },
  { arab: "الرقيب", latin: "Ar-Raqib", arti: "Maha Mengawasi" },
  { arab: "المجيب", latin: "Al-Mujib", arti: "Maha Mengabulkan" },
  { arab: "الواسع", latin: "Al-Wasi'", arti: "Maha Luas" },
  { arab: "الحكيم", latin: "Al-Hakim", arti: "Maha Bijaksana" },
  { arab: "الودود", latin: "Al-Wadud", arti: "Maha Mengasihi" },
  { arab: "المجيد", latin: "Al-Majid", arti: "Maha Mulia" },
  { arab: "الباعث", latin: "Al-Ba'its", arti: "Maha Membangkitkan" },
  { arab: "الشهيد", latin: "Asy-Syahid", arti: "Maha Menyaksikan" },
  { arab: "الحق", latin: "Al-Haqq", arti: "Maha Benar" },
  { arab: "الوكيل", latin: "Al-Wakil", arti: "Maha Memelihara" },
  { arab: "القوي", latin: "Al-Qawiyy", arti: "Maha Kuat" },
  { arab: "المتين", latin: "Al-Matin", arti: "Maha Kokoh" },
  { arab: "الولي", latin: "Al-Waliyy", arti: "Maha Melindungi" },
  { arab: "الحميد", latin: "Al-Hamid", arti: "Maha Terpuji" },
  { arab: "المحصي", latin: "Al-Muhshi", arti: "Maha Menghitung" },
  { arab: "المبدئ", latin: "Al-Mubdi'", arti: "Maha Memulai" },
  { arab: "المعيد", latin: "Al-Mu'id", arti: "Maha Mengembalikan" },
  { arab: "المحيي", latin: "Al-Muhyi", arti: "Maha Menghidupkan" },
  { arab: "المميت", latin: "Al-Mumit", arti: "Maha Mematikan" },
  { arab: "الحي", latin: "Al-Hayy", arti: "Maha Hidup" },
  { arab: "القيوم", latin: "Al-Qayyum", arti: "Maha Mandiri" },
  { arab: "الواجد", latin: "Al-Wajid", arti: "Maha Penemu" },
  { arab: "الماجد", latin: "Al-Majid", arti: "Maha Mulia" },
  { arab: "الواحد", latin: "Al-Wahid", arti: "Maha Tunggal" },
  { arab: "الصمد", latin: "Ash-Shamad", arti: "Maha Dibutuhkan" },
  { arab: "القادر", latin: "Al-Qadir", arti: "Maha Menentukan" },
  { arab: "المقتدر", latin: "Al-Muqtadir", arti: "Maha Berkuasa" },
  { arab: "المقدم", latin: "Al-Muqaddim", arti: "Maha Mendahulukan" },
  { arab: "المؤخر", latin: "Al-Mu'akhkhir", arti: "Maha Mengakhirkan" },
  { arab: "الأول", latin: "Al-Awwal", arti: "Maha Awal" },
  { arab: "الآخر", latin: "Al-Akhir", arti: "Maha Akhir" },
  { arab: "الظاهر", latin: "Azh-Zhahir", arti: "Maha Nyata" },
  { arab: "الباطن", latin: "Al-Bathin", arti: "Maha Ghaib" },
  { arab: "الوالي", latin: "Al-Wali", arti: "Maha Memerintah" },
  { arab: "المتعالي", latin: "Al-Muta'ali", arti: "Maha Tinggi" },
  { arab: "البر", latin: "Al-Barr", arti: "Maha Penderma" },
  { arab: "التواب", latin: "At-Tawwab", arti: "Maha Penerima Tobat" },
  { arab: "المنتقم", latin: "Al-Muntaqim", arti: "Maha Pemberi Balasan" },
  { arab: "العفو", latin: "Al-Afuww", arti: "Maha Pemaaf" },
  { arab: "الرؤوف", latin: "Ar-Ra'uf", arti: "Maha Pengasuh" },
  { arab: "مالك الملك", latin: "Malikul Mulk", arti: "Maha Penguasa Kerajaan" },
  { arab: "ذو الجلال والإكرام", latin: "Dzul Jalali wal Ikram", arti: "Maha Pemilik Kebesaran dan Kemuliaan" },
  { arab: "المقسط", latin: "Al-Muqsith", arti: "Maha Pemberi Keadilan" },
  { arab: "الجامع", latin: "Al-Jami'", arti: "Maha Mengumpulkan" },
  { arab: "الغني", latin: "Al-Ghaniyy", arti: "Maha Kaya" },
  { arab: "المغني", latin: "Al-Mughni", arti: "Maha Pemberi Kekayaan" },
  { arab: "المانع", latin: "Al-Mani'", arti: "Maha Mencegah" },
  { arab: "الضار", latin: "Adh-Dharr", arti: "Maha Penimpa Kemudharatan" },
  { arab: "النافع", latin: "An-Nafi'", arti: "Maha Memberi Manfaat" },
  { arab: "النور", latin: "An-Nur", arti: "Maha Bercahaya" },
  { arab: "الهادي", latin: "Al-Hadi", arti: "Maha Pemberi Petunjuk" },
  { arab: "البديع", latin: "Al-Badi'", arti: "Maha Pencipta" },
  { arab: "الباقي", latin: "Al-Baqi", arti: "Maha Kekal" },
  { arab: "الوارث", latin: "Al-Warits", arti: "Maha Pewaris" },
  { arab: "الرشيد", latin: "Ar-Rasyid", arti: "Maha Pandai" },
  { arab: "الصبور", latin: "Ash-Shabur", arti: "Maha Sabar" },
];

const ASMAUL_EN_MAP: Record<string, string> = {'Allah': 'The One and Only God', 'Ar-Rahman': 'The Entirely Merciful', 'Ar-Rahim': 'The Especially Merciful', 'Al-Malik': 'The Absolute Ruler / King', 'Al-Quddus': 'The Pure / The Most Holy', 'As-Salam': 'The Source of Peace', "Al-Mu'min": 'The Inspirer of Faith / Granter of Security', 'Al-Muhaimin': 'The Guardian / Preserver', 'Al-Aziz': 'The Almighty / The Victorious', 'Al-Jabbar': 'The Compeller / Restorer', 'Al-Mutakabbir': 'The Supreme / The Majestic', 'Al-Khaliq': 'The Creator', "Al-Bari'": 'The Originator / Maker', 'Al-Mushawwir': 'The Fashioner of Forms', 'Al-Ghaffar': 'The All-Forgiving', 'Al-Qahhar': 'The Subduer / All-Prevailing', 'Al-Wahhab': 'The Bestower', 'Ar-Razzaq': 'The Provider', 'Al-Fattah': 'The Opener / The Judge', 'Al-Alim': 'The All-Knowing', 'Al-Qabidh': 'The Withholder', 'Al-Basith': 'The Extender / Expander', 'Al-Khafidh': 'The Abaser', "Ar-Rafi'": 'The Exalter', "Al-Mu'izz": 'The Bestower of Honor', 'Al-Mudzill': 'The Dishonorer / Humiliator', "As-Sami'": 'The All-Hearing', 'Al-Bashir': 'The All-Seeing', 'Al-Hakam': 'The Impartial Judge', 'Al-Adl': 'The Utterly Just', 'Al-Lathif': 'The Subtle / The Gentle', 'Al-Khabir': 'The All-Aware', 'Al-Halim': 'The Most Forbearing', 'Al-Azhim': 'The Magnificent', 'Al-Ghafur': 'The Great Forgiver', 'Asy-Syakur': 'The Most Appreciative', 'Al-Aliyy': 'The Most High', 'Al-Kabir': 'The Most Great', 'Al-Hafizh': 'The Preserver', 'Al-Muqit': 'The Sustainer', 'Al-Hasib': 'The Reckoner', 'Al-Jalil': 'The Majestic', 'Al-Karim': 'The Most Generous', 'Ar-Raqib': 'The Watchful', 'Al-Mujib': 'The Responsive', "Al-Wasi'": 'The All-Encompassing', 'Al-Hakim': 'The All-Wise', 'Al-Wadud': 'The Most Loving', 'Al-Majid': 'The Glorious', "Al-Ba'its": 'The Resurrector', 'Asy-Syahid': 'The Witness', 'Al-Haqq': 'The Absolute Truth', 'Al-Wakil': 'The Trustee', 'Al-Qawiyy': 'The Strong', 'Al-Matin': 'The Firm / Steadfast', 'Al-Waliyy': 'The Protecting Friend', 'Al-Hamid': 'The Praiseworthy', 'Al-Muhshi': 'The Accounter / Counter', "Al-Mubdi'": 'The Originator', "Al-Mu'id": 'The Restorer', 'Al-Muhyi': 'The Giver of Life', 'Al-Mumit': 'The Bringer of Death', 'Al-Hayy': 'The Ever-Living', 'Al-Qayyum': 'The Self-Sustaining', 'Al-Wajid': 'The Perceiver / Finder', 'Al-Majid (2)': 'The Illustrious', 'Al-Wahid': 'The One', 'Al-Ahad': 'The Unique', 'Ash-Shamad': 'The Eternal Refuge', 'Al-Qadir': 'The Capable / Powerful', 'Al-Muqtadir': 'The Determiner / Omnipotent', 'Al-Muqaddim': 'The Expediter', "Al-Mu'akhkhir": 'The Delayer', 'Al-Awwal': 'The First', 'Al-Akhir': 'The Last', 'Azh-Zhahir': 'The Manifest', 'Al-Bathin': 'The Hidden', 'Al-Wali': 'The Sole Governor', "Al-Muta'ali": 'The Self-Exalted', 'Al-Barr': 'The Source of Goodness', 'At-Tawwab': 'The Ever-Pardoning', 'Al-Muntaqim': 'The Avenger', 'Al-Afuww': 'The Pardoner', "Ar-Ra'uf": 'The Most Kind', 'Malikul Mulk': 'Owner of All Sovereignty', 'Dzul Jalali wal Ikram': 'Lord of Majesty and Generosity', 'Al-Muqsith': 'The Equitable', "Al-Jami'": 'The Gatherer', 'Al-Ghaniyy': 'The Self-Sufficient', 'Al-Mughni': 'The Enricher', "Al-Mani'": 'The Preventer', 'Adh-Dharr': 'The Creator of Harm', "An-Nafi'": 'The Creator of Good', 'An-Nur': 'The Light', 'Al-Hadi': 'The Guide', "Al-Badi'": 'The Incomparable Originator', 'Al-Baqi': 'The Everlasting', 'Al-Warits': 'The Ultimate Inheritor', 'Ar-Rasyid': 'The Guide to the Right Path', 'Ash-Shabur': 'The Most Patient'};

export default function AsmaulPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [query, setQuery] = useState("");

  const filtered = ASMAUL_HUSNA.filter(
    (a) => {
      const q = query.toLowerCase();
      const en = ASMAUL_EN_MAP[a.latin]?.toLowerCase() || "";
      return a.latin.toLowerCase().includes(q) ||
             a.arti.toLowerCase().includes(q) ||
             en.includes(q);
    }
  );

  return (
    <div className="max-w-5xl mx-auto w-full px-2 sm:px-4">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">Asmaul Husna</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{isEn ? "99 Beautiful Names of Allah SWT and their meanings" : "99 Nama Allah SWT beserta artinya"}</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isEn ? "Search name or meaning… e.g. Merciful" : "Cari nama atau arti… mis. Penyayang"}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">{isEn ? "No names match your search. Try another keyword." : "Tidak ditemukan. Coba kata kunci lain."}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((a) => {
            const num = ASMAUL_HUSNA.indexOf(a) + 1;
            return (
              <div
                key={num}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md p-4 flex items-center gap-3"
              >
                <span className="w-9 h-9 shrink-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm flex items-center justify-center tabular-nums">
                  {num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">{a.latin}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{isEn ? (ASMAUL_EN_MAP[a.latin] || a.arti) : a.arti}</p>
                </div>
                <p className="arabic-text text-2xl font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                  {a.arab}
                </p>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-[10px] sm:text-[11px] text-center text-slate-400 dark:text-slate-500 mt-4">
        {isEn
          ? <>“The most beautiful names belong to Allah: so call on Him by them.” (Surah Al-A&apos;raf: 180)</>
          : <>“Hanya milik Allah Asmaul Husna, maka bermohonlah kepada-Nya dengan menyebut Asmaul Husna itu.” (QS. Al-A&apos;raf: 180)</>}
      </p>
    </div>
  );
}
