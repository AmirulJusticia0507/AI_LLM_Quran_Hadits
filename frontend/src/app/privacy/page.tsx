"use client";

import React from "react";
import { Shield, FileText, Database, Lock, User, AlertCircle, Mail, Globe } from "lucide-react";

interface SectionItem {
  text?: string;
  name?: string;
  purpose?: string;
  privacy?: string;
}

interface Section {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SectionItem[];
}

export default function PrivacyPage() {
  const lastUpdated = "7 September 2026";

  const sections = [
    {
      title: "Data yang Kami Kumpulkan",
      icon: Database,
      items: [
        "Pesan chat yang Anda kirim ke AI Assistant (untuk memproses permintaan dan menyediakan jawaban)",
        "Riwayat percakapan (disimpan lokal di browser via localStorage, tidak dikirim ke server kecuali untuk memproses chat)",
        "Preferensi tema (light/dark mode), ukuran font, dan pengaturan UI lainnya (lokal di browser)",
        "Data sesi anonim untuk analitik penggunaan dasar (tidak mencakup identitas pribadi)",
      ],
    },
    {
      title: "Cara Data Digunakan",
      icon: FileText,
      items: [
        "Memproses pertanyaan Anda ke model AI (Gemini/Ollama) untuk menghasilkan jawaban",
        "Mengambil rujukan Al-Qur'an dan Hadits dari API eksternal (equran.id, hadis-api-id) berdasarkan permintaan",
        "Menyimpan riwayat chat secara lokal di perangkat Anda (localStorage) untuk kemudahan akses",
        "Meningkatkan kualitas layanan melalui analitik anonim (tanpa identitas pribadi)",
      ],
    },
    {
      title: "Penyimpanan & Keamanan Data",
      icon: Shield,
      items: [
        "Riwayat chat disimpan **hanya di browser Anda** (localStorage), tidak di database server kami",
        "API Key LLM (Gemini) disimpan aman di environment variables backend (Railway), tidak terekspos ke frontend",
        "Komunikasi frontend-backend menggunakan HTTPS (TLS 1.2+)",
        "Backend tidak menyimpan log percakapan pengguna secara permanen (hanya in-memory session dengan TTL 30 menit)",
        "Opsi Ollama (local LLM) memungkinkan inferensi AI **sepenuhnya offline** tanpa data keluar dari server",
      ],
    },
    {
      title: "API Eksternal yang Digunakan",
      icon: Globe,
      items: [
        { name: "equran.id", purpose: "Data Al-Qur'an (teks Arab, Latin, terjemahan Indonesia)", privacy: "Tidak menyimpan data pengguna" },
        { name: "hadis-api-id.vercel.app", purpose: "Data 9 kitab hadits sahih", privacy: "Tidak menyimpan data pengguna" },
        { name: "Google Gemini API", purpose: "Model AI generatif (cloud)", privacy: "Kebijakan privasi Google berlaku" },
        { name: "Ollama (opsional)", purpose: "Local LLM inference", privacy: "Data tidak keluar dari server Anda" },
      ],
    },
    {
      title: "Hak Anda",
      icon: User,
      items: [
        "Menghapus riwayat chat kapan saja via tombol 'Bersihkan Chat' di halaman Chat AI",
        "Mengubah preferensi tema, font, dan pengaturan UI kapan saja",
        "Meminta penghapusan data dengan menghubungi kami (jika ada data yang tersimpan di server)",
        "Menggunakan mode Ollama lokal untuk privasi maksimal (data tidak keluar perangkat/server)",
      ],
    },
    {
      title: "Perubahan Kebijakan",
      icon: AlertCircle,
      items: [
        "Kebijakan ini dapat diperbarui sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal 'Terakhir diperbarui'.",
        "Penggunaan berkelanjutan setelah perubahan berarti Anda menerima kebijakan terbaru.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 px-4">
      <header className="text-center space-y-4 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50">
          <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Kebijakan Privasi</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Kebijakan Privasi Al-Hikmah AI
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Kami berkomitmen melindungi privasi Anda. Halaman ini menjelaskan data apa yang dikumpulkan, 
          bagaimana digunakan, dan hak Anda atas data tersebut.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Terakhir diperbarui: <span className="font-medium">{lastUpdated}</span>
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((section, i) => {
          const Icon = section.icon;
          const isApiSection = section.title === "API Eksternal yang Digunakan";
          return (
            <article key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
              </div>
              {isApiSection ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="pb-2 px-3">Layanan</th>
                        <th className="pb-2 px-3">Tujuan</th>
                        <th className="pb-2 px-3">Catatan Privasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {section.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="py-3 px-3 font-medium text-slate-900 dark:text-slate-100">{typeof item === "object" && item.name ? item.name : ""}</td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{typeof item === "object" && item.purpose ? item.purpose : ""}</td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{typeof item === "object" && item.privacy ? item.privacy : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{typeof item === "string" ? item : ""}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>

      <section className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50">
        <h2 className="text-lg font-bold text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
          <Mail className="w-5 h-5" /> Hubungi Kami
        </h2>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">
          Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin meminta penghapusan data,
          silakan hubungi pengembang melalui GitHub: 
          <a href="https://github.com/AmirulJusticia0507" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-600 dark:hover:text-emerald-400">
            github.com/AmirulJusticia0507
          </a>
        </p>
      </section>
    </div>
  );
}