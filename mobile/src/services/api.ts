import { API_URL } from "../config";

interface ApiResponse {
  status: string;
  message?: string;
}

export interface QuranVerse extends ApiResponse {
  surah: string;
  nomor_surah: number;
  nomor_ayat: number;
  teks_arab: string;
  teks_latin: string;
  terjemahan: string;
}

export interface HadithResult extends ApiResponse {
  kitab: string;
  nomor: number;
  teks_arab: string;
  terjemahan: string;
}

export interface ChatResponse extends ApiResponse {
  response: string;
}

export async function chatAI(message: string): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Gagal memproses pesan");
  return data;
}

export async function getQuranVerse(
  surah: number,
  ayat: number
): Promise<QuranVerse> {
  const res = await fetch(`${API_URL}/api/quran/verse`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ surah, ayat }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Ayat tidak ditemukan");
  return data;
}

export async function getHadith(
  kitab: string,
  nomor: number
): Promise<HadithResult> {
  const res = await fetch(`${API_URL}/api/hadith`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kitab, nomor }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Hadits tidak ditemukan");
  return data;
}
