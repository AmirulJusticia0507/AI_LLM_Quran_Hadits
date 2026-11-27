"use client";

import { useState, useCallback } from 'react';

interface Soal {
  id: number;
  pertanyaan: string;
  pilihan: string[];
  jawaban: number;
  penjelasan: string;
  kategori: string;
}

const bankSoal: Soal[] = [
  { id: 1, pertanyaan: 'Berapa jumlah rakaat shalat Subuh?', pilihan: ['2 rakaat', '3 rakaat', '4 rakaat', '1 rakaat'], jawaban: 0, penjelasan: 'Shalat Subuh terdiri dari 2 rakaat fardhu.', kategori: 'Fiqh' },
  { id: 2, pertanyaan: "Siapakah nabi yang diutus kepada kaum 'Ad?", pilihan: ['Nabi Shalih', 'Nabi Hud', 'Nabi Luth', 'Nabi Ibrahim'], jawaban: 1, penjelasan: "Nabi Hud AS diutus kepada kaum 'Ad yang tinggal di daerah Yaman.", kategori: 'Sirah' },
  { id: 3, pertanyaan: 'Surah Al-Fatihah terdiri dari berapa ayat?', pilihan: ['5 ayat', '6 ayat', '7 ayat', '8 ayat'], jawaban: 2, penjelasan: "Al-Fatihah terdiri dari 7 ayat, disebut juga As-Sab'ul Matsani.", kategori: 'Al-Qur\'an' },
  { id: 4, pertanyaan: 'Apa arti dari kata "Taqwa"?', pilihan: ['Takut kepada Allah', 'Memelihara diri dengan ketaatan', 'Banyak berdoa', 'Rajin beribadah'], jawaban: 1, penjelasan: 'Taqwa berarti memelihara diri dari azab Allah dengan menjalankan perintah-Nya dan menjauhi larangan-Nya.', kategori: 'Aqidah' },
  { id: 5, pertanyaan: 'Berapa nisab zakat emas?', pilihan: ['75 gram', '85 gram', '95 gram', '100 gram'], jawaban: 1, penjelasan: 'Nisab zakat emas adalah 20 mitsqal setara 85 gram emas murni menurut standar kontemporer.', kategori: 'Fiqh' },
  { id: 6, pertanyaan: 'Kitab hadits manakah yang disusun oleh Imam Muslim?', pilihan: ['Shahih Bukhari', 'Sunan Abu Dawud', 'Shahih Muslim', 'Muwatha Malik'], jawaban: 2, penjelasan: 'Shahih Muslim disusun oleh Imam Abu al-Husain Muslim bin al-Hajjaj al-Qusyairi (w. 261 H).', kategori: 'Hadits' },
  { id: 7, pertanyaan: 'Ibnu Sina (Avicenna) terkenal sebagai tokoh dalam bidang apa?', pilihan: ['Matematika', 'Kedokteran', 'Astronomi', 'Kimia'], jawaban: 1, penjelasan: 'Ibnu Sina adalah bapak kedokteran Islam; karyanya Al-Qanun fi Al-Thibb menjadi referensi kedokteran Eropa selama berabad-abad.', kategori: 'Peradaban Islam' },
  { id: 8, pertanyaan: "Apa yang dimaksud dengan 'Ijma'?", pilihan: ['Analogis hukum', 'Konsensus ulama', 'Pendapat satu ulama', 'Hukum adat'], jawaban: 1, penjelasan: "Ijma' adalah kesepakatan seluruh mujtahid umat Islam pada suatu masa atas hukum suatu masalah setelah wafatnya Nabi.", kategori: 'Ushul Fiqh' },
  { id: 9, pertanyaan: 'Siapakah wanita pertama yang masuk Islam?', pilihan: ['Aisyah binti Abu Bakar', 'Fatimah binti Muhammad', 'Khadijah binti Khuwailid', 'Asma binti Abu Bakar'], jawaban: 2, penjelasan: 'Khadijah binti Khuwailid adalah orang pertama yang beriman kepada Rasulullah, baik dari kalangan laki-laki maupun perempuan.', kategori: 'Sirah' },
  { id: 10, pertanyaan: "Berapa juz dalam Al-Qur'an?", pilihan: ['25 juz', '28 juz', '30 juz', '32 juz'], jawaban: 2, penjelasan: "Al-Qur'an terdiri dari 30 juz, 114 surah, dan 6.236 ayat.", kategori: 'Al-Qur\'an' },
  { id: 11, pertanyaan: 'Hukum shalat Jumat bagi laki-laki Muslim yang sudah baligh adalah...', pilihan: ['Sunnah muakkadah', 'Fardhu ain', 'Fardhu kifayah', 'Mubah'], jawaban: 1, penjelasan: 'Shalat Jumat fardhu ain bagi laki-laki Muslim yang baligh, berakal, merdeka, dan mukim (tidak dalam perjalanan).', kategori: 'Fiqh' },
  { id: 12, pertanyaan: 'Al-Khawarizmi terkenal sebagai penemu...', pilihan: ['Aljabar', 'Trigonometri', 'Kalkulus', 'Geometri'], jawaban: 0, penjelasan: 'Muhammad bin Musa Al-Khawarizmi (w. ~850 M) adalah penemu ilmu Aljabar; namanya menjadi asal kata "algorithm".', kategori: 'Peradaban Islam' },
  { id: 13, pertanyaan: 'Berapa rukun Islam?', pilihan: ['4', '5', '6', '7'], jawaban: 1, penjelasan: 'Rukun Islam ada 5: syahadat, shalat, zakat, puasa, dan haji bagi yang mampu.', kategori: 'Aqidah' },
  { id: 14, pertanyaan: 'Ayat Kursi terdapat dalam surah apa?', pilihan: ['Al-Imran', 'An-Nisa', 'Al-Baqarah', 'Al-Maidah'], jawaban: 2, penjelasan: "Ayat Kursi adalah QS. Al-Baqarah: 255 — ayat teragung dalam Al-Qur'an.", kategori: 'Al-Qur\'an' },
  { id: 15, pertanyaan: 'Apa yang dimaksud "Lailatul Qadar"?', pilihan: ['Malam pertama Ramadan', "Malam Nuzulul Qur'an", 'Malam lebih baik dari 1000 bulan', 'Malam Idul Fitri'], jawaban: 2, penjelasan: 'Lailatul Qadar adalah malam yang lebih baik dari seribu bulan (QS. Al-Qadr: 3), terjadi di 10 malam terakhir Ramadan.', kategori: 'Fiqh' },
  { id: 16, pertanyaan: "Berapa surah dalam Al-Qur'an?", pilihan: ['100 surah', '110 surah', '114 surah', '120 surah'], jawaban: 2, penjelasan: "Al-Qur'an terdiri dari 114 surah, dimulai dari Al-Fatihah dan diakhiri An-Nas.", kategori: 'Al-Qur\'an' },
  { id: 17, pertanyaan: 'Siapakah ulul azmi yang berjumlah 5 orang?', pilihan: ['Adam, Nuh, Ibrahim, Musa, Isa', 'Nuh, Ibrahim, Musa, Isa, Muhammad', 'Ibrahim, Musa, Dawud, Isa, Muhammad', 'Adam, Ibrahim, Yusuf, Musa, Muhammad'], jawaban: 1, penjelasan: 'Lima rasul ulul azmi: Nuh, Ibrahim, Musa, Isa, dan Muhammad SAW — mereka memiliki keteguhan paling luar biasa.', kategori: 'Aqidah' },
  { id: 18, pertanyaan: 'Apa nama metode bersuci dengan debu/tanah?', pilihan: ['Wudhu', 'Mandi wajib', 'Tayamum', 'Istinja'], jawaban: 2, penjelasan: 'Tayamum adalah cara bersuci menggunakan debu/tanah bersih sebagai pengganti air saat ada uzur syariat.', kategori: 'Fiqh' },
  { id: 19, pertanyaan: 'Siapakah wali hakim dalam pernikahan?', pilihan: ['Kepala desa', 'Penghulu KUA', 'Pegawai pencatat nikah', 'Imam masjid'], jawaban: 1, penjelasan: 'Penghulu (Kepala KUA atau yang mewakili) bertindak sebagai wali hakim jika wali nasab tidak ada atau enggan menikahkan.', kategori: 'Fiqh' },
  { id: 20, pertanyaan: 'Kitab tafsir Al-Qur\'an karya Hamka berjudul...', pilihan: ['Tafsir Al-Misbah', 'Tafsir Al-Azhar', 'Tafsir Al-Manar', 'Tafsir Al-Kabir'], jawaban: 1, penjelasan: 'Tafsir Al-Azhar adalah karya monumental Hamka (Haji Abdul Malik Karim Amrullah) yang ditulis sebagian besar di penjara.', kategori: 'Al-Qur\'an' },
];

function ambilSoalHarian(): Soal[] {
  const today = new Date().toDateString();
  const seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = [...bankSoal].sort((a, b) => {
    const ra = Math.sin(seed + a.id) * 10000;
    const rb = Math.sin(seed + b.id) * 10000;
    return (ra - Math.floor(ra)) - (rb - Math.floor(rb));
  });
  return shuffled.slice(0, 5);
}

export default function KuisIslam() {
  const [soalList] = useState<Soal[]>(() => ambilSoalHarian());
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const soal = soalList[current];
  const isAnswered = answered[current] !== undefined;

  const pilih = useCallback((idx: number) => {
    if (isAnswered) return;
    const benar = idx === soal.jawaban;
    setSelected(idx);
    setAnswered(prev => ({ ...prev, [current]: benar }));
    if (benar) setScore(s => s + 1);
  }, [isAnswered, soal, current]);

  const lanjut = useCallback(() => {
    if (current < soalList.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }, [current, soalList.length]);

  const ulang = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered({});
    setScore(0);
    setFinished(false);
  };

  const pct = Math.round((score / soalList.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <header className="rounded-3xl bg-linear-to-br from-indigo-800 to-purple-950 text-white p-8 space-y-2">
        <p className="text-xs uppercase tracking-widest text-indigo-200">Al-Hikmah • Kuis Harian</p>
        <h1 className="text-3xl font-bold">Kuis Islam Harian</h1>
        <p className="text-indigo-100 text-sm">5 soal pilihan ganda seputar Al-Qur&apos;an, Hadits, Fiqh, Sirah &amp; Aqidah.</p>
      </header>

      {!finished ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Soal {current + 1} dari {soalList.length}</span>
            <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              {soal.kategori}
            </span>
          </div>
          <progress
            value={current + (isAnswered ? 1 : 0)}
            max={soalList.length}
            className="w-full h-2 accent-indigo-600"
          />

          <h2 className="text-lg font-bold leading-relaxed">{soal.pertanyaan}</h2>

          <div className="space-y-2">
            {soal.pilihan.map((p, idx) => {
              let cls = 'w-full text-left p-4 rounded-xl border transition-colors text-sm ';
              if (!isAnswered) {
                cls += 'border-slate-200 dark:border-slate-700 hover:border-indigo-500 cursor-pointer ';
                if (selected === idx) cls += 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 ';
              } else {
                if (idx === soal.jawaban) cls += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 font-semibold ';
                else if (selected === idx) cls += 'border-red-400 bg-red-50 dark:bg-red-900/30 ';
                else cls += 'border-slate-200 dark:border-slate-700 opacity-50 ';
              }
              return (
                <button key={idx} type="button" className={cls} onClick={() => pilih(idx)}>
                  <span className="inline-flex items-center gap-2">
                    {isAnswered && idx === soal.jawaban && <span>✅</span>}
                    {isAnswered && selected === idx && idx !== soal.jawaban && <span>❌</span>}
                    {String.fromCharCode(65 + idx)}. {p}
                  </span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-sm space-y-2">
              <p className="font-semibold">
                {answered[current] ? '✅ Jawaban Benar!' : '❌ Jawaban Salah'}
              </p>
              <p className="text-slate-600 dark:text-slate-300">{soal.penjelasan}</p>
            </div>
          )}

          {isAnswered && (
            <button
              type="button"
              onClick={lanjut}
              className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-semibold transition-colors"
            >
              {current < soalList.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil'}
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 p-8 text-center space-y-6">
          <div className="text-6xl">{pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '📚'}</div>
          <div>
            <p className="text-sm text-slate-500">Skor Anda</p>
            <p className="text-5xl font-bold text-indigo-700 dark:text-indigo-300 mt-1">
              {score}/{soalList.length}
            </p>
            <p className="text-lg font-semibold mt-2">
              {pct >= 80
                ? 'Luar biasa! Pengetahuan Islam Anda sangat baik.'
                : pct >= 60
                ? 'Bagus! Terus tingkatkan.'
                : 'Semangat belajar! Jangan menyerah.'}
            </p>
          </div>
          <div className="space-y-2 text-left">
            {soalList.map((s, i) => (
              <div key={s.id} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5">{answered[i] ? '✅' : '❌'}</span>
                <span className="text-slate-600 dark:text-slate-300">{s.pertanyaan}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={ulang}
            className="w-full py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-semibold transition-colors"
          >
            Coba Lagi
          </button>
          <p className="text-xs text-slate-500">Soal berubah setiap hari. Datang lagi besok untuk soal baru!</p>
        </div>
      )}
    </div>
  );
}
