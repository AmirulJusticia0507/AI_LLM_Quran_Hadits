"use client";

import { useState } from "react";
import Swal from "sweetalert2";

interface QuranVerse {
  status: string;
  surah: string;
  nomor_surah: number;
  nomor_ayat: number;
  teks_arab: string;
  teks_latin: string;
  terjemahan: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SURAH_LIST = [
  { num: 1, name: "Al-Fatihah" },
  { num: 2, name: "Al-Baqarah" },
  { num: 3, name: "Ali 'Imran" },
  { num: 4, name: "An-Nisa'" },
  { num: 5, name: "Al-Ma'idah" },
  { num: 6, name: "Al-An'am" },
  { num: 7, name: "Al-A'raf" },
  { num: 8, name: "Al-Anfal" },
  { num: 9, name: "At-Tawbah" },
  { num: 10, name: "Yunus" },
  { num: 11, name: "Hud" },
  { num: 12, name: "Yusuf" },
  { num: 13, name: "Ar-Ra'd" },
  { num: 14, name: "Ibrahim" },
  { num: 15, name: "Al-Hijr" },
  { num: 16, name: "An-Nahl" },
  { num: 17, name: "Al-Isra'" },
  { num: 18, name: "Al-Kahf" },
  { num: 19, name: "Maryam" },
  { num: 20, name: "Taha" },
  { num: 21, name: "Al-Anbiya" },
  { num: 22, name: "Al-Hajj" },
  { num: 23, name: "Al-Mu'minun" },
  { num: 24, name: "An-Nur" },
  { num: 25, name: "Al-Furqan" },
  { num: 26, name: "Ash-Shu'ara" },
  { num: 27, name: "An-Naml" },
  { num: 28, name: "Al-Qasas" },
  { num: 29, name: "Al-Ankabut" },
  { num: 30, name: "Ar-Rum" },
  { num: 31, name: "Luqman" },
  { num: 32, name: "As-Sajdah" },
  { num: 33, name: "Al-Ahzab" },
  { num: 34, name: "Saba'" },
  { num: 35, name: "Fatir" },
  { num: 36, name: "Ya Sin" },
  { num: 37, name: "As-Saffat" },
  { num: 38, name: "Sad" },
  { num: 39, name: "Az-Zumar" },
  { num: 40, name: "Ghafir" },
  { num: 41, name: "Fussilat" },
  { num: 42, name: "Ash-Shura" },
  { num: 43, name: "Az-Zukhruf" },
  { num: 44, name: "Ad-Dukhan" },
  { num: 45, name: "Al-Jathiyah" },
  { num: 46, name: "Al-Ahqaf" },
  { num: 47, name: "Muhammad" },
  { num: 48, name: "Al-Fath" },
  { num: 49, name: "Al-Hujurat" },
  { num: 50, name: "Qaf" },
  { num: 51, name: "Adh-Dhariyat" },
  { num: 52, name: "At-Tur" },
  { num: 53, name: "An-Najm" },
  { num: 54, name: "Al-Qamar" },
  { num: 55, name: "Ar-Rahman" },
  { num: 56, name: "Al-Waqi'ah" },
  { num: 57, name: "Al-Hadid" },
  { num: 58, name: "Al-Mujadilah" },
  { num: 59, name: "Al-Hashr" },
  { num: 60, name: "Al-Mumtahanah" },
  { num: 61, name: "As-Saff" },
  { num: 62, name: "Al-Jumu'ah" },
  { num: 63, name: "Al-Munafiqun" },
  { num: 64, name: "At-Taghabun" },
  { num: 65, name: "At-Talaq" },
  { num: 66, name: "At-Tahrim" },
  { num: 67, name: "Al-Mulk" },
  { num: 68, name: "Al-Qalam" },
  { num: 69, name: "Al-Haqqah" },
  { num: 70, name: "Al-Ma'arij" },
  { num: 71, name: "Nuh" },
  { num: 72, name: "Al-Jinn" },
  { num: 73, name: "Al-Muzzammil" },
  { num: 74, name: "Al-Muddaththir" },
  { num: 75, name: "Al-Qiyamah" },
  { num: 76, name: "Al-Insan" },
  { num: 77, name: "Al-Mursalat" },
  { num: 78, name: "An-Naba'" },
  { num: 79, name: "An-Nazi'at" },
  { num: 80, name: "Abasa" },
  { num: 81, name: "At-Takwir" },
  { num: 82, name: "Al-Infitar" },
  { num: 83, name: "Al-Mutaffifin" },
  { num: 84, name: "Al-Inshiqaq" },
  { num: 85, name: "Al-Buruj" },
  { num: 86, name: "At-Tariq" },
  { num: 87, name: "Al-A'la" },
  { num: 88, name: "Al-Ghashiyah" },
  { num: 89, name: "Al-Fajr" },
  { num: 90, name: "Al-Balad" },
  { num: 91, name: "Ash-Shams" },
  { num: 92, name: "Al-Layl" },
  { num: 93, name: "Ad-Duha" },
  { num: 94, name: "Ash-Sharh" },
  { num: 95, name: "At-Tin" },
  { num: 96, name: "Al-Alaq" },
  { num: 97, name: "Al-Qadr" },
  { num: 98, name: "Al-Bayyinah" },
  { num: 99, name: "Az-Zalzalah" },
  { num: 100, name: "Al-Adiyat" },
  { num: 101, name: "Al-Qari'ah" },
  { num: 102, name: "At-Takathur" },
  { num: 103, name: "Al-Asr" },
  { num: 104, name: "Al-Humazah" },
  { num: 105, name: "Al-Fil" },
  { num: 106, name: "Quraysh" },
  { num: 107, name: "Al-Ma'un" },
  { num: 108, name: "Al-Kawthar" },
  { num: 109, name: "Al-Kafirun" },
  { num: 110, name: "An-Nasr" },
  { num: 111, name: "Al-Masad" },
  { num: 112, name: "Al-Ikhlas" },
  { num: 113, name: "Al-Falaq" },
  { num: 114, name: "An-Nas" },
];

export default function QuranPage() {
  const [surah, setSurah] = useState(1);
  const [ayat, setAyat] = useState(1);
  const [result, setResult] = useState<QuranVerse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchVerse = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/api/quran/verse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ surah, ayat }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Ayat tidak ditemukan");
      }

      setResult(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Gagal mengambil data";
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessage,
        confirmButtonColor: "#10b981",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">
          Cari Ayat Al-Qur&apos;an
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Pilih surah dan nomor ayat untuk melihat teks Arab dan terjemahannya
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Surah
            </label>
            <select
              value={surah}
              onChange={(e) => setSurah(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SURAH_LIST.map((s) => (
                <option key={s.num} value={s.num}>
                  {s.num}. {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Ayat
            </label>
            <input
              type="number"
              min={1}
              value={ayat}
              onChange={(e) => setAyat(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          onClick={fetchVerse}
          disabled={loading}
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors font-medium"
        >
          {loading ? "Mengambil..." : "🔍 Cari Ayat"}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
              {result.surah} ({result.nomor_surah}:{result.nomor_ayat})
            </span>
          </div>

          <div className="arabic-text text-gray-800 dark:text-gray-100 mb-6 text-center leading-loose">
            {result.teks_arab}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 italic mb-4 text-center">
            {result.teks_latin}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {result.terjemahan}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
