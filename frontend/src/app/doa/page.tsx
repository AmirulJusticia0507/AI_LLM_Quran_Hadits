"use client";

import { useState } from "react";
import { HeartHandshake, Search, Copy, Check } from "lucide-react";

interface Doa {
  judul: string;
  arab: string;
  latin: string;
  arti: string;
  sumber?: string;
}

const DOA_LIST: Doa[] = [
  {
    judul: "Sebelum Makan",
    arab: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    latin: "Allahumma barik lana fima razaqtana wa qina 'adzaban nar",
    arti: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.",
    sumber: "HR. Abu Dawud & Tirmidzi",
  },
  {
    judul: "Sesudah Makan",
    arab: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    latin: "Alhamdulillahilladzi ath'amana wa saqana wa ja'alana muslimin",
    arti: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang Islam.",
    sumber: "HR. Abu Dawud & Tirmidzi",
  },
  {
    judul: "Sebelum Tidur",
    arab: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَبِاسْمِكَ أَمُوتُ",
    latin: "Bismikallahumma ahya wa bismika amut",
    arti: "Dengan nama-Mu ya Allah aku hidup dan dengan nama-Mu aku mati.",
    sumber: "HR. Bukhari & Muslim",
  },
  {
    judul: "Bangun Tidur",
    arab: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    latin: "Alhamdulillahilladzi ahyana ba'da ma amatana wa ilaihin nusyur",
    arti: "Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami dan kepada-Nya kami dibangkitkan.",
    sumber: "HR. Bukhari",
  },
  {
    judul: "Masuk Kamar Mandi",
    arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
    latin: "Allahumma inni a'udzu bika minal khubutsi wal khabaits",
    arti: "Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan.",
    sumber: "HR. Bukhari & Muslim",
  },
  {
    judul: "Keluar Kamar Mandi",
    arab: "غُفْرَانَكَ",
    latin: "Ghufraanaka",
    arti: "Aku memohon ampunan-Mu (ya Allah).",
    sumber: "HR. Abu Dawud & Tirmidzi",
  },
  {
    judul: "Bepergian / Naik Kendaraan",
    arab: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
    latin: "Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin",
    arti: "Maha Suci (Allah) yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya. (QS. Az-Zukhruf: 13)",
    sumber: "QS. Az-Zukhruf: 13",
  },
  {
    judul: "Masuk Masjid",
    arab: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    latin: "Allahummaftah li abwaba rahmatik",
    arti: "Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.",
    sumber: "HR. Muslim",
  },
  {
    judul: "Keluar Masjid",
    arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    latin: "Allahumma inni as'aluka min fadhlik",
    arti: "Ya Allah, aku memohon kepada-Mu sebagian dari karunia-Mu.",
    sumber: "HR. Muslim",
  },
  {
    judul: "Ketika Hujan Turun",
    arab: "اللَّهُمَّ صَيِّبًا نَافِعًا",
    latin: "Allahumma shayyiban nafi'an",
    arti: "Ya Allah, (jadikanlah hujan ini) hujan yang bermanfaat.",
    sumber: "HR. Bukhari",
  },
  {
    judul: "Memohon Ilmu Bermanfaat",
    arab: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي وَزِدْنِي عِلْمًا",
    latin: "Allahummanfa'ni bima 'allamtani wa 'allimni ma yanfa'uni wa zidni 'ilma",
    arti: "Ya Allah, berilah aku manfaat dari ilmu yang telah Engkau ajarkan kepadaku, ajarilah aku ilmu yang bermanfaat bagiku, dan tambahkanlah ilmu kepadaku.",
    sumber: "HR. Tirmidzi & Ibnu Majah",
  },
  {
    judul: "Untuk Kedua Orang Tua",
    arab: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    latin: "Rabbighfir li wa liwalidayya warhamhuma kama rabbayani shaghira",
    arti: "Ya Tuhanku, ampunilah aku dan kedua orang tuaku, dan sayangilah keduanya sebagaimana mereka menyayangiku di waktu kecil.",
    sumber: "QS. Al-Isra': 24",
  },
  {
    judul: "Mohon Keteguhan Hati",
    arab: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    latin: "Ya muqallibal qulub, tsabbit qalbi 'ala dinik",
    arti: "Wahai Dzat yang membolak-balikkan hati, teguhkanlah hatiku di atas agama-Mu.",
    sumber: "HR. Tirmidzi",
  },
  {
    judul: "Sayyidul Istighfar",
    arab: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    latin: "Allahumma anta rabbi, la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastatha'tu, a'udzu bika min syarri ma shana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidzanbi, faghfirli, fa innahu la yaghfirudz dzunuba illa anta",
    arti: "Ya Allah, Engkau Tuhanku, tiada tuhan selain Engkau. Engkau menciptakanku dan aku hamba-Mu. Aku berada di atas perjanjian dan janji-Mu semampuku. Aku berlindung kepada-Mu dari kejahatan yang aku perbuat. Aku mengakui nikmat-Mu atasku dan aku mengakui dosaku, maka ampunilah aku, karena tidak ada yang mengampuni dosa kecuali Engkau.",
    sumber: "HR. Bukhari",
  },
];

export default function DoaPage() {
  const [query, setQuery] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const filtered = DOA_LIST.filter(
    (d) =>
      d.judul.toLowerCase().includes(query.toLowerCase()) ||
      d.arti.toLowerCase().includes(query.toLowerCase())
  );

  const copyDoa = (d: Doa, i: number) => {
    const text = `${d.judul}\n\n${d.arab}\n\nLatin: ${d.latin}\n\nArtinya: ${d.arti}${d.sumber ? `\n(${d.sumber})` : ""}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-2 sm:px-4">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">Doa Harian</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{DOA_LIST.length} doa sehari-hari • Arab, Latin & arti</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari doa… mis. tidur, makan, hujan"
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">Tidak ditemukan. Coba kata kunci lain.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((d, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md p-4 sm:p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                  {d.judul}
                </span>
                <button
                  onClick={() => copyDoa(d, i)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1 cursor-pointer"
                  title="Salin doa"
                >
                  {copiedIdx === i ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] text-emerald-500">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Salin</span>
                    </>
                  )}
                </button>
              </div>
              <p className="arabic-text text-right text-2xl sm:text-3xl font-bold text-slate-900 dark:text-emerald-100 leading-loose">
                {d.arab}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                {d.latin}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                {d.arti}
              </p>
              {d.sumber ? (
                <p className="text-[11px] text-slate-400 dark:text-slate-500">📚 {d.sumber}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
