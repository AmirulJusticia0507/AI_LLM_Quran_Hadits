"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  BookOpen, 
  ScrollText, 
  Sparkles, 
  Search, 
  Copy, 
  Bookmark, 
  ChevronRight,
  ChevronDown,
  Settings,
  Palette,
  RefreshCw,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle,
  Keyboard,
  MousePointer,
  Zap,
  LifeBuoy,
  Mail,
  GitBranch,
  ExternalLink
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface GuideStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Umum",
    question: "Apa itu Al-Hikmah AI?",
    answer: "Al-Hikmah AI adalah platform asisten keislaman berbasis AI yang mengintegrasikan pencarian kontekstual Al-Qur'an dan Hadits dengan model AI generatif (Gemini/Ollama) untuk menjawab pertanyaan keagamaan dengan rujukan sahih.",
  },
  {
    category: "Umum",
    question: "Apakah layanan ini gratis?",
    answer: "Ya, sepenuhnya gratis untuk penggunaan pribadi, edukasi, dan non-komersial. Tidak ada biaya langganan, iklan, atau paywall.",
  },
  {
    category: "Umum",
    question: "Siapa pengembang sistem ini?",
    answer: "Dikembangkan oleh Amirul Justicia (Full-Stack Developer & AI Enthusiast). Kode sumber tersedia di GitHub: github.com/AmirulJusticia0507",
  },
  {
    category: "AI & Akurasi",
    question: "Seberapa akurat jawaban AI?",
    answer: "AI menggunakan function calling untuk mengambil data real-time dari API Al-Qur'an (equran.id) dan Hadits (hadis-api-id). Namun AI tetap bisa hallucination (salah). SELALU verifikasi ke ulama bersertifikat untuk hukum/fatwa.",
  },
  {
    category: "AI & Akurasi",
    question: "Model AI apa yang digunakan?",
    answer: "Default: Google Gemini 2.5 Flash (cloud, cepat, function calling native). Opsional: Ollama lokal (DeepSeek R1, Llama 3.1, Qwen 2.5, dll) untuk privasi penuh & offline.",
  },
  {
    category: "AI & Akurasi",
    question: "Bisakah AI memberikan fatwa hukum?",
    answer: "TIDAK. AI hanya asisten referensi. Fatwa hukum wajib ditanyakan ke ulama bersertifikat/kompeten (MUI, LPTQ, dll). Jawaban AI hanya bantuan mencari rujukan.",
  },
  {
    category: "Fitur Chat",
    question: "Bagaimana cara bertanya yang efektif?",
    answer: "Jelaskan konteks spesifik: 'Bagaimana hukum shalat sunnah rawatib menurut mazhab Syafi'i?' Lebih baik dari 'Hukum shalat sunnah?'. Gunakan suggested prompts di halaman utama untuk contoh.",
  },
  {
    category: "Fitur Chat",
    question: "Apakah riwayat chat disimpan?",
    answer: "Ya, di localStorage browser Anda (lokal, tidak ke server). Bisa dihapus kapan saja via tombol 'Bersihkan Chat'. Session ID dibuat otomatis untuk konteks percakapan.",
  },
  {
    category: "Fitur Chat",
    question: "Apa itu streaming response?",
    answer: "Jawaban AI ditampilkan secara real-time per token (seperti mengetik). Jika gagal, otomatis fallback ke mode non-streaming.",
  },
  {
    category: "Al-Qur'an & Hadits",
    question: "Berapa surah & kitab yang tersedia?",
    answer: "Al-Qur'an: 114 Surah lengkap. Hadits: 9 kitab (Bukhari, Muslim, Tirmidzi, Abu Dawud, Nasa'i, Ibnu Majah, Ahmad, Malik, Darimi) = Kutubut Tis'ah.",
  },
  {
    category: "Al-Qur'an & Hadits",
    question: "Data rujukan dari mana?",
    answer: "Al-Qur'an: equran.id (API resmi Kemenag RI). Hadits: hadis-api-id.vercel.app. Keduanya sumber terbuka & tepercaya di Indonesia.",
  },
  {
    category: "Al-Qur'an & Hadits",
    question: "Bisa copy/paste teks Arab & terjemahan?",
    answer: "Ya, tombol Copy (ikon clipboard) tersedia di setiap ayat/hadits. Format: Nama Surah/Kitab, nomor, teks Arab, Latin, terjemahan.",
  },
  {
    category: "Teknis",
    question: "Badge LLM 'Offline' / error 503?",
    answer: "Backend tidak tersedia atau GEMINI_API_KEY tidak valid. Cek: 1) Backend Railway running, 2) API Key valid, 3) NEXT_PUBLIC_API_URL benar di Vercel.",
  },
  {
    category: "Teknis",
    question: "CORS error di console browser?",
    answer: "ALLOWED_ORIGINS di backend (Railway) harus include domain Vercel frontend. Update di Railway Variables → Redeploy.",
  },
  {
    category: "Teknis",
    question: "Bisa deploy sendiri (self-host)?",
    answer: "Ya. Frontend (Next.js) → Vercel/Netlify. Backend (FastAPI) → Railway/Render/VPS/Docker. LLM: Gemini API Key atau Ollama lokal. Lihat README & .env.example.",
  },
  {
    category: "Teknis",
    question: "Bagaimana ganti ke Ollama (local LLM)?",
    answer: "Di backend Railway/Render: set LLM_PROVIDER=ollama, OLLAMA_BASE_URL=http://host:11434, OLLAMA_MODEL=deepseek-r1:8b. Pastikan Ollama running & model di-pull.",
  },
];

const GUIDES: GuideStep[] = [
  {
    title: "Mulai Chat AI",
    description: "Ketik pertanyaan di kotak chat atau klik suggested prompts. AI akan menjawab dengan rujukan Al-Qur'an/Hadits otomatis.",
    icon: MessageSquare,
    shortcut: "Enter = Kirim",
  },
  {
    title: "Cari Ayat Al-Qur'an",
    description: "Pilih Surah (dropdown/search) → masukkan nomor ayat → klik 'Tampilkan Ayat'. Atau klik 'Baca Surah' untuk seluruh surah.",
    icon: BookOpen,
    shortcut: "Ctrl+K = Fokus search",
  },
  {
    title: "Cari Hadits",
    description: "Pilih Kitab (grid 9 kitab) → masukkan nomor hadits → klik 'Cari Hadits'. Tombol 'Hadits Acak' untuk eksplorasi.",
    icon: ScrollText,
    shortcut: "Shuffle = Acak",
  },
  {
    title: "Bookmark & Copy",
    description: "Klik ikon Bookmark (simpan) & Copy (salin) di setiap ayat/hadits/jawaban AI. Bookmark tersimpan di localStorage browser.",
    icon: Bookmark,
    shortcut: "Alt+C = Copy",
  },
  {
    title: "Tema & Aksesibilitas",
    description: "Toggle Dark/Light mode di navbar (ikon matahari/bulan). Ukuran font Arab bisa diubah (A+/A-) di halaman Al-Qur'an & Hadits.",
    icon: Palette,
    shortcut: "Ctrl+Shift+L = Toggle tema",
  },
  {
    title: "Mode Offline (Ollama)",
    description: "Deploy backend + Ollama di server/local. Set LLM_PROVIDER=ollama. Data 100% tidak keluar jaringan. Cocok pesantren/instansi.",
    icon: WifiOff,
    shortcut: "LLM_PROVIDER=ollama",
  },
];

const SHORTCUTS = [
  { keys: ["Enter"], action: "Kirim pesan chat" },
  { keys: ["Shift", "Enter"], action: "Baris baru di input chat" },
  { keys: ["Ctrl", "K"], action: "Fokus ke search Al-Qur'an/Hadits" },
  { keys: ["Ctrl", "Shift", "L"], action: "Toggle Dark/Light mode" },
  { keys: ["Alt", "C"], action: "Copy teks ayat/hadits yang difokuskan" },
  { keys: ["Esc"], action: "Tutup modal / dropdown" },
];

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const categories = ["Semua", ...Array.from(new Set(FAQS.map(f => f.category)))];

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-12 px-4">
      <header className="text-center space-y-4 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-800/50">
          <LifeBuoy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Bantuan & Panduan</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Pusat Bantuan Al-Hikmah AI
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Temukan jawaban cepat, panduan fitur, dan solusi masalah umum. Masih bingung? Hubungi kami di GitHub.
        </p>
      </header>

      {/* Quick Guides */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Zap className="w-6 h-6 text-emerald-600" /> Panduan Cepat Fitur Utama
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GUIDES.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <article
                key={i}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/80 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{guide.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{guide.description}</p>
                    {guide.shortcut && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-medium text-slate-600 dark:text-slate-400">
                        <Keyboard className="w-2.5 h-2.5" />
                        {guide.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Keyboard className="w-6 h-6 text-blue-600" /> Keyboard Shortcuts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="pb-2 px-4">Shortcut</th>
                <th className="pb-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {SHORTCUTS.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-4">
                    <kbd className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono text-xs">
                      {s.keys.map((k, idx) => (
                        <span key={idx} className={idx > 0 ? "px-1 text-slate-400" : ""}>{k}</span>
                      ))}
                    </kbd>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{s.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-600" /> Pertanyaan Umum (FAQ)
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {FAQS.filter(f => activeCategory === "Semua" || f.category === activeCategory).map((faq, i) => (
            <details
              key={i}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500/50 transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-medium text-slate-900 dark:text-slate-100 pr-8">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-rose-600" /> Troubleshooting Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { issue: "LLM Status 'Offline'", fix: "Cek backend Railway running & GEMINI_API_KEY valid. Health: /api/health", icon: WifiOff },
            { issue: "CORS Error / Network Error", fix: "Update ALLOWED_ORIGINS di Railway = domain Vercel frontend. Redeploy backend.", icon: AlertCircle },
            { issue: "Data Al-Qur'an/Hadits tidak muncul", fix: "Cek koneksi internet. API eksternal (equran.id, hadis-api) mungkin down sementara.", icon: Wifi },
            { issue: "Chat tidak merespons / loading terus", fix: "Refresh halaman. Cek console (F12) error. Backend mungkin cold-start (Railway gratis).", icon: RefreshCw },
            { issue: "Tema tidak tersimpan", fix: "Pastikan localStorage tidak diblokir browser (private mode/cookie block).", icon: Palette },
            { issue: "Deploy Vercel gagal build", fix: "Cek lucide-react icons (Github→GitBranch, Linkedin→Link2). Pastikan import benar.", icon: CheckCircle },
          ].map((t, i) => (
            <article key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400">
                  {React.createElement(t.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{t.issue}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{t.fix}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Mail className="w-6 h-6 text-emerald-600" /> Masih Butuh Bantuan?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://github.com/AmirulJusticia0507/AI_LLM_Quran_Hadits/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500/50 hover:shadow-lg transition-all flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/80 transition-colors">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">GitHub Issues</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Lapor bug, request fitur, atau tanya teknis</p>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors ml-auto" />
          </a>
          <a
            href="https://github.com/AmirulJusticia0507"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-500/50 hover:shadow-lg transition-all flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/80 transition-colors">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Profil Pengembang</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">GitHub: AmirulJusticia0507</p>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors ml-auto" />
          </a>
          <div className="group p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-amber-500/50 hover:shadow-lg transition-all flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Email</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tersedia di profil GitHub pengembang</p>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 ml-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}