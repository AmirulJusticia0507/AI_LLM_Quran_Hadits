"use client";

import { useState } from "react";
import { 
  Sparkles, 
  BookOpen, 
  ScrollText, 
  Bot, 
  Brain, 
  Globe, 
  Shield,
  Code,
  Heart,
  ArrowRight,
  Github,
  Linkedin
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface TechStack {
  name: string;
  icon: string;
  color: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "AI Assistant Islami",
    description: "Chatbot cerdas yang menjawab pertanyaan keislaman berdasarkan Al-Qur'an, Hadits sahih, dan ilmu tafsir/ fiqih.",
  },
  {
    icon: BookOpen,
    title: "Al-Qur'an Digital (114 Surah)",
    description: "Pencarian ayat lengkap dengan teks Arab, transliterasi Latin, dan terjemahan Indonesia. Mendukung baca per surah atau ayat spesifik.",
  },
  {
    icon: ScrollText,
    title: "Kutubut Tis'ah (9 Kitab Hadits)",
    description: "Akses ke 9 kitab hadits utama: Bukhari, Muslim, Tirmidzi, Abu Dawud, Nasa'i, Ibnu Majah, Ahmad, Malik, Darimi.",
  },
  {
    icon: Bot,
    title: "Function Calling & RAG",
    description: "AI memanggil API Al-Qur'an & Hadits secara real-time saat dibutuhkan, memastikan rujukan akurat dan terverifikasi.",
  },
  {
    icon: Globe,
    title: "Multi-Provider LLM",
    description: "Support Gemini (Google) dan Ollama (Local). Bisa pakai cloud atau self-hosted untuk privasi penuh.",
  },
  {
    icon: Shield,
    title: "Privacy & Offline Ready",
    description: "Dengan Ollama, data tidak keluar dari server. Cocok untuk institusi, pesantren, atau penggunaan pribadi sensitif.",
  },
];

const TECH_STACK: TechStack[] = [
  { name: "Next.js 15", icon: "⚛️", color: "text-slate-600 dark:text-slate-400", description: "App Router, Server Components, Streaming" },
  { name: "TypeScript", icon: "📘", color: "text-blue-600", description: "Type safety end-to-end" },
  { name: "Tailwind CSS v4", icon: "🎨", color: "text-cyan-600", description: "Utility-first styling, dark mode native" },
  { name: "FastAPI", icon: "⚡", color: "text-green-600", description: "High-performance Python API backend" },
  { name: "Google Gemini", icon: "🤖", color: "text-violet-600", description: "Generative AI dengan function calling" },
  { name: "Ollama", icon: "🦙", color: "text-orange-600", description: "Local LLM inference (DeepSeek, Llama, dll)" },
  { name: "equran.id API", icon: "📖", color: "text-emerald-600", description: "Data Al-Qur'an resmi Indonesia" },
  { name: "hadis-api-id", icon: "📜", color: "text-amber-600", description: "Data 9 kitab hadits sahih" },
  { name: "Railway", icon: "🚂", color: "text-indigo-600", description: "Cloud deployment backend" },
  { name: "Vercel", icon: "▲", color: "text-slate-900 dark:text-white", description: "Edge deployment frontend" },
];

const CREATOR_INFO = {
  name: "Amirul Justicia",
  role: "Full-Stack Developer & AI Enthusiast",
  bio: "Pengembang sistem Al-Hikmah AI dengan latar belakang pengembangan web modern dan minat mendalam pada teknologi AI untuk keislaman. Berkomitmen membangun tools yang bermanfaat untuk umat.",
  github: "https://github.com/AmirulJusticia0507",
  linkedin: "https://linkedin.com/in/amirul-justicia",
};

const AI_MODELS = [
  { name: "Gemini 2.5 Flash", provider: "Google", type: "Cloud", bestFor: "Speed, cost-efficient, function calling native" },
  { name: "DeepSeek R1 8B", provider: "DeepSeek (via Ollama)", type: "Local", bestFor: "Reasoning, privacy, offline, free" },
  { name: "Llama 3.1 8B", provider: "Meta (via Ollama)", type: "Local", bestFor: "General chat, multilingual, open weights" },
  { name: "Qwen 2.5 7B", provider: "Alibaba (via Ollama)", type: "Local", bestFor: "Multilingual, coding, efficient" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"features" | "tech" | "ai" | "creator">("features");

  const tabs = [
    { id: "features", label: "Fitur Utama", icon: Sparkles },
    { id: "tech", label: "Teknologi", icon: Code },
    { id: "ai", label: "Model AI", icon: Brain },
    { id: "creator", label: "Pembuat", icon: Heart },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-8 px-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center gap-3 px-5 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Al-Hikmah AI v2.0</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-600 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
          Tentang Sistem Al-Hikmah AI
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Platform AI keislaman terintegrasi yang menggabungkan kecerdasan buatan modern dengan sumber rujukan otentik 
          Al-Qur'an dan Hadits sahih untuk menjawab pertanyaan keagamaan dengan akurat, terverifikasi, dan bertanggung jawab.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-4">
          <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> 114 Surah</span>
          <span className="flex items-center gap-1.5"><ScrollText className="w-4 h-4" /> 9 Kitab Hadits</span>
          <span className="flex items-center gap-1.5"><Bot className="w-4 h-4" /> Multi-LLM</span>
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Privacy First</span>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="flex flex-wrap gap-2 bg-slate-100/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50" aria-label="About tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Tab Panels */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Features Tab */}
        {activeTab === "features" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Fitur Unggulan</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{FEATURES.length} Fitur</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={i}
                    className="group p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-500/5"
                  >
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 w-fit mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/80 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Tech Stack Tab */}
        {activeTab === "tech" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Tumpukan Teknologi</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{TECH_STACK.length} Teknologi</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TECH_STACK.map((tech, i) => (
                <article
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl" aria-hidden="true">{tech.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100">{tech.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tech.color} bg-opacity-10`}>
                        {tech.description}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* AI Models Tab */}
        {activeTab === "ai" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Model AI yang Didukung</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{AI_MODELS.length} Model</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-4">Model</th>
                    <th className="pb-3 px-4">Provider</th>
                    <th className="pb-3 px-4">Tipe</th>
                    <th className="pb-3 px-4">Kelebihan Utama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {AI_MODELS.map((model, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-slate-900 dark:text-slate-100">{model.name}</td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{model.provider}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          model.type === "Cloud"
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                            : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
                        }`}>
                          {model.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{model.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50">
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                <strong>Catatan:</strong> Default menggunakan <strong>Gemini 2.5 Flash</strong> (cloud, cepat, function calling native). 
                Bisa diganti ke <strong>Ollama</strong> (local, gratis, privasi penuh) dengan set <code className="px-1.5 py-0.5 bg-white/50 dark:bg-slate-800/50 rounded text-xs font-mono">LLM_PROVIDER=ollama</code> 
                di environment variables backend.
              </p>
            </div>
          </section>
        )}

        {/* Creator Tab */}
        {activeTab === "creator" && (
          <section className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-linear-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white text-3xl shadow-xl shadow-emerald-500/25">
                <Heart className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{CREATOR_INFO.name}</h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">{CREATOR_INFO.role}</p>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{CREATOR_INFO.bio}</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <a
                href={CREATOR_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition-colors group"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={CREATOR_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors group"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" /> Ucapan Terima Kasih
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• <strong>equran.id</strong> — API Al-Qur'an resmi Indonesia</li>
                <li>• <strong>hadis-api-id.vercel.app</strong> — API 9 kitab hadits sahih</li>
                <li>• <strong>Google Gemini</strong> — Model AI generatif</li>
                <li>• <strong>Ollama Community</strong> — Local LLM inference engine</li>
                <li>• <strong>Vercel & Railway</strong> — Platform deployment gratis</li>
                <li>• <strong>Open Source Community</strong> — Library & tools yang digunakan</li>
              </ul>
            </div>

            <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p>Dibangun dengan <Heart className="w-4 h-4 inline text-rose-500" /> untuk kemaslahatan umat</p>
              <p className="mt-1">"Manfaatkan ilmu sebelum hilang, dan sebarkan kebaikan sebelum terlambat"</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}