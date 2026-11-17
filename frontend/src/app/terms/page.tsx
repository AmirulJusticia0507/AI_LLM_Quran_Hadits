"use client";

import { useLanguage } from "@/context/LanguageContext";
import { FileText, Shield, AlertCircle, CheckCircle, Scale, BookOpen, Mail } from "lucide-react";

export default function TermsPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const lastUpdated = isEn ? "September 7, 2026" : "7 September 2026";
  const version = "2.0";

  const sections = [
    {
      title: isEn ? "Acceptance of Terms" : "Penerimaan Syarat",
      icon: FileText,
      content: isEn 
        ? `By accessing and using Al-Hikmah AI (hereinafter referred to as "the Platform", "the Service", or "We"), you agree to be bound by these Terms & Conditions ("Terms"). If you disagree with any part of these Terms, please do not use our Service.`
        : `Dengan mengakses dan menggunakan Al-Hikmah AI (selanjutnya disebut "Platform", "Layanan", atau "Kami"), Anda setuju untuk terikat oleh Syarat & Ketentuan ini ("Syarat"). Jika Anda tidak setuju dengan bagian mana pun dari Syarat ini, harap jangan gunakan Layanan kami.`,
    },
    {
      title: isEn ? "Service Description" : "Deskripsi Layanan",
      icon: BookOpen,
      content: isEn
        ? `Al-Hikmah AI is an AI-powered Islamic assistant platform providing:
• AI Chatbot to answer Islamic questions (Al-Qur'an, Hadith, Tafsir, Fiqh)
• Comprehensive Al-Qur'an verse search (114 Surahs) with Arabic script, transliteration, and Indonesian translation
• Hadith lookup from 9 canonical collections (Kutubut Tis'ah)
• Bookmark, copy, and verse/hadith navigation utilities
This Service is provided "as is" and "as available" without warranties of any kind.`
        : `Al-Hikmah AI adalah platform asisten keislaman berbasis AI yang menyediakan:
• Chatbot AI untuk menjawab pertanyaan keislaman (Al-Qur'an, Hadits, Tafsir, Fiqih)
• Pencarian ayat Al-Qur'an lengkap (114 Surah) dengan teks Arab, transliterasi, dan terjemahan
• Pencarian hadits dari 9 kitab sahih (Kutubut Tis'ah)
• Fitur bookmark, copy, dan navigasi ayat/hadits
Layanan ini disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun.`,
    },
    {
      title: isEn ? "Data Sources & Citations" : "Sumber Data & Rujukan",
      icon: Shield,
      items: isEn ? [
        "Al-Qur'an: Data from equran.id (official Indonesian Al-Qur'an API)",
        "Hadith: Data from hadis-api-id.vercel.app (9 collections: Bukhari, Muslim, Tirmidhi, Abu Dawood, Nasa'i, Ibn Majah, Ahmad, Malik, Darimi)",
        "AI Models: GripHub Router GPT-5.6 Luna (default), Google Gemini, or local Ollama (DeepSeek, Llama, Qwen, etc.)",
        "All citations display chapter/verse numbers or book/hadith numbers for independent verification",
      ] : [
        "Al-Qur'an: Data dari equran.id (API resmi Al-Qur'an Indonesia)",
        "Hadits: Data dari hadis-api-id.vercel.app (9 kitab: Bukhari, Muslim, Tirmidzi, Abu Dawud, Nasa'i, Ibnu Majah, Ahmad, Malik, Darimi)",
        "AI Model: GripHub Router GPT-5.6 Luna (default), Google Gemini, atau Ollama lokal (DeepSeek, Llama, Qwen, dll)",
        "Semua rujukan ditampilkan dengan nomor surah/ayat atau kitab/nomor hadits untuk verifikasi mandiri",
      ],
      disclaimer: isEn
        ? `⚠️ IMPORTANT: AI responses serve SOLELY as reference assistance. ALWAYS verify religious rulings, fatwas, and complex jurisprudence matters with TRUSTED AND QUALIFIED SCHOLARS. AI can make mistakes (hallucinations).`
        : `⚠️ PENTING: Jawaban AI HANYA sebagai bantuan referensi. SELALU konfirmasikan hukum, fatwa, dan urusan agama mendalam kepada ULAMA TERPERCAYA/KOMPETEN. AI dapat membuat kesalahan (hallucination).`,
    },
    {
      title: isEn ? "User Responsibilities" : "Tanggung Jawab Pengguna",
      icon: CheckCircle,
      items: isEn ? [
        "Use the service for lawful and ethical purposes",
        "Do not abuse the API, attempt unauthorized exploits, or overload servers",
        "Verify critical information (legal rulings, fatwas, acts of worship) with qualified scholars before acting",
        "Maintain the security of your device/browser localStorage data",
        "Do not reproduce or redistribute service content for unauthorized commercial gain",
      ] : [
        "Menggunakan layanan untuk tujuan yang sah dan tidak melanggar hukum/etika",
        "Tidak menyalahgunakan API, mencoba eksploitasi, atau beban berlebihan pada server",
        "Memverifikasi informasi penting (hukum, fatwa, ibadah) ke ulama bersertifikat sebelum bertindak",
        "Menjaga keamanan akun/perangkat Anda (jika menggunakan fitur lokal/localStorage)",
        "Tidak mereproduksi, mendistribusikan, atau memodifikasi konten layanan untuk komersial tanpa izin",
      ],
    },
    {
      title: isEn ? "Changes to Terms" : "Perubahan Syarat",
      icon: AlertCircle,
      content: isEn
        ? `We reserve the right to modify these Terms at any time. The latest version will be posted on this page with the "Last updated" date. Continued use constitutes acceptance of revised terms.`
        : `Kami berhak mengubah Syarat ini kapan saja. Versi terbaru akan dipublikasikan di halaman ini dengan tanggal "Terakhir diperbarui". Penggunaan berkelanjutan setelah perubahan = penerimaan syarat baru.`,
    },
    {
      title: isEn ? "Governing Law" : "Hukum Berlaku & Penyelesaian Sengketa",
      icon: Scale,
      content: isEn
        ? `These terms are governed by the laws of the Republic of Indonesia. Disputes are initially resolved through mutual consultation.`
        : `Syarat ini diatur oleh hukum Republik Indonesia. Sengketa diselesaikan melalui musyawarah mufakat terlebih dahulu.`,
    },
    {
      title: isEn ? "Contact" : "Kontak",
      icon: Mail,
      content: `GitHub: github.com/AmirulJusticia0507\nWhatsApp: +62 821-3440-2383`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 px-4">
      <header className="text-center space-y-4 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 dark:border-amber-800/50">
          <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
            {isEn ? "Terms & Conditions" : "Syarat & Ketentuan"}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          {isEn ? "Terms & Conditions of Use" : "Syarat & Ketentuan Penggunaan"}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {isEn
            ? "Please read carefully before using Al-Hikmah AI. Using our services constitutes acceptance of these terms."
            : "Harap baca dengan teliti sebelum menggunakan Al-Hikmah AI. Penggunaan layanan berarti Anda menerima syarat ini."}
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <span>{isEn ? "Version:" : "Versi:"} <span className="font-medium">{version}</span></span>
          <span>{isEn ? "Last updated:" : "Terakhir diperbarui:"} <span className="font-medium">{lastUpdated}</span></span>
        </div>
      </header>

      <div className="space-y-6">
        {sections.map((section, i) => {
          const Icon = section.icon;
          if (section.items) {
            return (
              <article key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4 list-disc list-inside">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
                {section.disclaimer && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                    {section.disclaimer}
                  </div>
                )}
              </article>
            );
          }

          return (
            <article key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
