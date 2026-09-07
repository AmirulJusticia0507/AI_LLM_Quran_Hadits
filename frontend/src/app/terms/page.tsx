"use client";

import { FileText, Shield, AlertCircle, Info, CheckCircle, XCircle, Scale, BookOpen, Mail } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "7 September 2026";
  const version = "2.0";

  const sections = [
    {
      title: "Penerimaan Syarat",
      icon: FileText,
      content: `Dengan mengakses dan menggunakan Al-Hikmah AI (selanjutnya disebut "Platform", "Layanan", atau "Kami"), 
      Anda setuju untuk terikat oleh Syarat & Ketentuan ini ("Syarat"). Jika Anda tidak setuju dengan bagian mana pun 
      dari Syarat ini, harap jangan gunakan Layanan kami.`,
    },
    {
      title: "Deskripsi Layanan",
      icon: BookOpen,
      content: `Al-Hikmah AI adalah platform asisten keislaman berbasis AI yang menyediakan:
      • Chatbot AI untuk menjawab pertanyaan keislaman (Al-Qur'an, Hadits, Tafsir, Fiqih)
      • Pencarian ayat Al-Qur'an lengkap (114 Surah) dengan teks Arab, transliterasi, dan terjemahan
      • Pencarian hadits dari 9 kitab sahih (Kutubut Tis'ah)
      • Fitur bookmark, copy, dan navigasi ayat/hadits
      Layanan ini disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun.`,
    },
    {
      title: "Sumber Data & Rujukan",
      icon: Shield,
      items: [
        "Al-Qur'an: Data dari equran.id (API resmi Al-Qur'an Indonesia)",
        "Hadits: Data dari hadis-api-id.vercel.app (9 kitab: Bukhari, Muslim, Tirmidzi, Abu Dawud, Nasa'i, Ibnu Majah, Ahmad, Malik, Darimi)",
        "AI Model: Google Gemini 2.5 Flash (default) atau Ollama lokal (DeepSeek, Llama, Qwen, dll)",
        "Semua rujukan ditampilkan dengan nomor surah/ayat atau kitab/nomor hadits untuk verifikasi mandiri",
      ],
      disclaimer: `⚠️ PENTING: Jawaban AI HANYA sebagaian bantuan referensi. SELALU konfirmasikan hukum, fatwa, 
      dan urusan agama mendalam kepada ULAMA TERPERCAYA/KOMPETEN. AI dapat membuat kesalahan (hallucination).`,
    },
    {
      title: "Tanggung Jawab Pengguna",
      icon: CheckCircle,
      items: [
        "Menggunakan layanan untuk tujuan yang sah dan tidak melanggar hukum/etika",
        "Tidak menyalahgunakan API, mencoba eksploitasi, atau beban berlebihan pada server",
        "Memverifikasi informasi penting (hukum, fatwa, ibadah) ke ulama bersertifikat sebelum bertindak",
        "Menjaga keamanan akun/perangkat Anda (jika menggunakan fitur lokal/localStorage)",
        "Tidak mereproduksi, mendistribusikan, atau memodifikasi konten layanan untuk komersial tanpa izin",
      ],
    },
    {
      title: "Batasan & Larangan",
      icon: XCircle,
      items: [
        "Menggunakan layanan untuk tujuan ilegal,害人, atau menyebarkan informasi palsu/menyesatkan",
        "Reverse engineering, dekompilasi, atau mencoba mengekstrak model/data sistem",
        "Serangan DoS/DDoS, scraping berlebihan, atau gangguan kinerja server",
        "Menggunakan output AI sebagai fatwa hukum resmi atau keputusan hidup-mati tanpa konsultasi ulama",
        "Menjual, menyewakan, atau mensublisensikan akses ke layanan ini",
      ],
    },
    {
      title: "Kebebasan Tanggung Jawab (Disclaimer)",
      icon: AlertCircle,
      content: `AL-HIKMAH AI DAN PENGEMBANG TIDAK BERTANGGUNG JAWAB ATAS:
      • Ketidakakuratan, ketidaklengkapan, atau keterlambatan informasi yang disediakan AI
      • Keputusan, tindakan, atau kerugian yang timbul dari kepercayaan pada jawaban AI
      • Ketersediaan layanan (uptime), bug, error, atau gangguan teknis
      • Data dari API eksternal (equran.id, hadis-api-id) yang di luar kendali kami
      • Penggunaan model AI yang mungkin menghasilkan hallucination (informasi palsu yang terdengar meyakinkan)
      
      PENGGUNAAN LAYANAN ADALAH RISIKO SENDIRI ANDA. SELALU TABAYYUN (VERIFIKASI) KEPADA ULAMA.`,
    },
    {
      title: "Properti Intelektual",
      icon: Info,
      items: [
        "Kode sumber, desain, dan arsitektur sistem: Hak cipta pengembang (Amirul Justicia)",
        "Data Al-Qur'an & Hadits: Milik publik/domain publik (sumber: equran.id, hadis-api-id)",
        "Model AI (Gemini): Milik Google; Model Ollama: Sesuai lisensi masing-masing (Apache 2.0, dll)",
        "Anda diperbolehkan menggunakan layanan untuk keperluan pribadi, edukasi, dan non-komersial",
        "Redistribusi/modifikasi kode sumber memerlukan izin tertulis dari pengembang",
      ],
    },
    {
      title: "Privasi & Data",
      icon: Shield,
      content: `Pengumpulan dan penggunaan data diatur oleh Kebijakan Privasi kami. 
      Dengan menggunakan Layanan, Anda menyetujui praktik data sebagaimana dijelaskan di Kebijakan Privasi.`,
    },
    {
      title: "Perubahan Syarat",
      icon: AlertCircle,
      content: `Kami berhak mengubah Syarat ini kapan saja. Versi terbaru akan dipublikasikan di halaman ini 
      dengan tanggal "Terakhir diperbarui". Penggunaan berkelanjutan setelah perubahan = penerimaan syarat baru.`,
    },
    {
      title: "Hukum Berlaku & Penyelesaian Sengketa",
      icon: Scale,
      content: `Syarat ini diatur oleh hukum Republik Indonesia. Sengketa diselesaikan melalui musyawarah mufakat 
      terlebih dahulu. Jika gagal, diserahkan ke Pengadilan Negeri yang berwenang di wilayah domisili pengembang.`,
    },
    {
      title: "Kontak",
      icon: Mail,
      content: `Pertanyaan tentang Syarat ini: 
      GitHub: github.com/AmirulJusticia0507
      Email: (tersedia di profil GitHub)`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-12 px-4">
      <header className="text-center space-y-4 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 dark:border-amber-800/50">
          <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Syarat & Ketentuan</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Syarat & Ketentuan Penggunaan
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Harap baca dengan teliti sebelum menggunakan Al-Hikmah AI. Penggunaan layanan berarti Anda menerima syarat ini.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <span>Versi: <span className="font-medium">{version}</span></span>
          <span>Terakhir diperbarui: <span className="font-medium">{lastUpdated}</span></span>
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
                <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {section.disclaimer && (
                  <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-800/50">
                    <p className="text-sm text-red-800 dark:text-red-200"><strong>Peringatan:</strong> {section.disclaimer}</p>
                  </div>
                )}
              </article>
            );
          }
          return (
            <article key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{section.title}</h2>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{section.content}</p>
              </div>
            </article>
          );
        })}
      </div>

      <section className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/50">
        <h2 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
          <Info className="w-5 h-5" /> Ringkasan Penting
        </h2>
        <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
          <li>• <strong>AI ≠ Ulama:</strong> Jawaban AI hanya referensi, bukan fatwa hukum</li>
          <li>• <strong>Tabayyun wajib:</strong> Verifikasi ke ulama bersertifikat sebelum mengamalkan</li>
          <li>• <strong>No warranty:</strong> Layanan "as-is", tidak ada jaminan akurasi 100%</li>
          <li>• <strong>Privasi lokal:</strong> Riwayat chat di browser Anda, tidak di server kami</li>
          <li>• <strong>Gratis & Open:</strong> Untuk kebaikan umat, non-komersial</li>
        </ul>
      </section>
    </div>
  );
}