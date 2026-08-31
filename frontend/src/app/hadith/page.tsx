"use client";

import { useState } from "react";
import Swal from "sweetalert2";

interface HadithResult {
  status: string;
  kitab: string;
  nomor: number;
  teks_arab: string;
  terjemahan: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const KITAB_LIST = [
  { id: "bukhari", name: "Shahih Bukhari", maxHadith: 7563 },
  { id: "muslim", name: "Shahih Muslim", maxHadith: 7500 },
  { id: "tirmidzi", name: "Jami' at-Tirmidzi", maxHadith: 3956 },
  { id: "abu-dawud", name: "Sunan Abu Dawud", maxHadith: 5274 },
  { id: "nasai", name: "Sunan an-Nasa'i", maxHadith: 5761 },
  { id: "ibnu-majah", name: "Sunan Ibnu Majah", maxHadith: 4341 },
  { id: "ahmad", name: "Musnad Ahmad", maxHadith: 26363 },
  { id: "malik", name: "Muwatta Malik", maxHadith: 1836 },
  { id: "darimi", name: "Sunan ad-Darimi", maxHadith: 3573 },
];

export default function HadithPage() {
  const [kitab, setKitab] = useState("bukhari");
  const [nomor, setNomor] = useState(1);
  const [result, setResult] = useState<HadithResult | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedKitab = KITAB_LIST.find((k) => k.id === kitab);

  const fetchHadith = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/api/hadith`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kitab, nomor }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Hadits tidak ditemukan");
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
          Cari Hadits
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Pilih kitab perawi dan nomor hadits
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Kitab / Perawi
            </label>
            <select
              value={kitab}
              onChange={(e) => {
                setKitab(e.target.value);
                setNomor(1);
              }}
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {KITAB_LIST.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Nomor Hadits
            </label>
            <input
              type="number"
              min={1}
              max={selectedKitab?.maxHadith || 7563}
              value={nomor}
              onChange={(e) => setNomor(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Maks: {selectedKitab?.maxHadith} hadits
            </p>
          </div>
        </div>

        <button
          onClick={fetchHadith}
          disabled={loading}
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors font-medium"
        >
          {loading ? "Mengambil..." : "🔍 Cari Hadits"}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
              {result.kitab} - Hadits #{result.nomor}
            </span>
          </div>

          <div className="arabic-text text-gray-800 dark:text-gray-100 mb-6 text-center leading-loose">
            {result.teks_arab}
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
