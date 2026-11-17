"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Shield, FileText, Database, User, Globe } from "lucide-react";

export default function PrivacyPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const lastUpdated = isEn ? "September 24, 2026" : "24 September 2026";

  const sections = [
    {
      title: isEn ? "Data We Collect" : "Data yang Kami Kumpulkan",
      icon: Database,
      items: isEn ? [
        "Chat messages sent to the AI Assistant (to process queries and provide responses)",
        "Conversation history (stored locally in browser via localStorage, never sent to servers except during active chat queries)",
        "Theme preferences (light/dark mode), Arabic font size, and UI customizations (kept locally)",
        "Anonymous visit statistics via unique browser token and page-open counters, without IP addresses, names, phone numbers, or message contents.",
      ] : [
        "Pesan chat yang Anda kirim ke AI Assistant (untuk memproses permintaan dan menyediakan jawaban)",
        "Riwayat percakapan (disimpan lokal di browser via localStorage, tidak dikirim ke server kecuali untuk memproses chat)",
        "Preferensi tema (light/dark mode), ukuran font, dan pengaturan UI lainnya (lokal di browser)",
        "Statistik kunjungan menggunakan ID browser acak di localStorage dan ID pembukaan halaman tanpa IP, nama, atau isi pesan.",
      ],
    },
    {
      title: isEn ? "How Data Is Used" : "Cara Data Digunakan",
      icon: FileText,
      items: isEn ? [
        "Processing inquiries via AI models (GripHub / Gemini / Ollama) to generate accurate answers",
        "Retrieving Al-Qur'an and Hadith citations from authoritative APIs based on your prompt",
        "Storing history client-side in localStorage for seamless reference resumption",
        "Improving service stability and user experience through anonymized visit metrics",
      ] : [
        "Memproses pertanyaan Anda ke model AI (GripHub / Gemini / Ollama) untuk menghasilkan jawaban",
        "Mengambil rujukan Al-Qur'an dan Hadits dari API eksternal berdasarkan permintaan",
        "Menyimpan riwayat chat secara lokal di perangkat Anda (localStorage) untuk kemudahan akses",
        "Meningkatkan kualitas layanan melalui analitik anonim",
      ],
    },
    {
      title: isEn ? "Data Storage & Security" : "Penyimpanan & Keamanan Data",
      icon: Shield,
      items: isEn ? [
        "Chat history is retained exclusively in your browser (localStorage)",
        "Backend communications utilize secure HTTPS (TLS 1.2+)",
        "Backend preserves no persistent conversation logs (temporary in-memory TTL sessions only)",
        "Local Ollama mode enables 100% offline inference with zero outbound network traffic",
      ] : [
        "Riwayat chat disimpan hanya di browser Anda (localStorage), tidak di database server kami",
        "Komunikasi frontend-backend menggunakan HTTPS (TLS 1.2+)",
        "Backend tidak menyimpan log percakapan pengguna secara permanen (hanya in-memory session)",
        "Opsi Ollama (local LLM) memungkinkan inferensi AI sepenuhnya offline tanpa data keluar",
      ],
    },
    {
      title: isEn ? "External APIs Used" : "API Eksternal yang Digunakan",
      icon: Globe,
      items: [
        { name: "equran.id", purpose: isEn ? "Indonesian Al-Qur'an data (Arabic, Latin, translation)" : "Data Al-Qur'an (teks Arab, Latin, terjemahan Indonesia)" },
        { name: "hadis-api-id.vercel.app", purpose: isEn ? "9 canonical hadith collections" : "Data 9 kitab hadits sahih" },
        { name: "GripHub Router", purpose: isEn ? "Cloud LLM (GPT-5.6 Luna) inference" : "Model AI cloud (GPT-5.6 Luna)" },
        { name: "Google Gemini API", purpose: isEn ? "Generative AI model (cloud)" : "Model AI generatif (cloud)" },
        { name: "Ollama (optional)", purpose: isEn ? "Local on-premise LLM inference" : "Local LLM inference tanpa internet" },
      ],
    },
    {
      title: isEn ? "Your Rights" : "Hak Anda",
      icon: User,
      items: isEn ? [
        "Clear all conversation history at any time using the 'Clear Chat' button",
        "Toggle theme, font sizes, and language preferences whenever desired",
        "Run offline local models (Ollama) for maximal data sovereignty",
      ] : [
        "Menghapus riwayat chat kapan saja via tombol 'Bersihkan Chat' di halaman Chat AI",
        "Mengubah preferensi tema, font, dan pengaturan UI kapan saja",
        "Menggunakan mode Ollama lokal untuk privasi maksimal",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 px-4">
      <header className="text-center space-y-4 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50">
          <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            {isEn ? "Privacy Policy" : "Kebijakan Privasi"}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isEn ? "Al-Hikmah AI Privacy Policy" : "Kebijakan Privasi Al-Hikmah AI"}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {isEn
            ? "Our commitment to protecting your privacy and transparent data usage."
            : "Komitmen kami dalam melindungi privasi dan data pengguna dengan transparansi penuh."}
        </p>
        <div className="text-xs text-slate-500">
          <span>{isEn ? "Last updated:" : "Terakhir diperbarui:"} <span className="font-medium">{lastUpdated}</span></span>
        </div>
      </header>

      <div className="space-y-6">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <article key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
                {section.items.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {typeof item === "string" ? item : <span><strong>{item.name}</strong>: {item.purpose}</span>}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
