"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
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
  GitBranch, 
  Link2, 
  MessageCircle 
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
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
    titleId: "AI Assistant Islami",
    titleEn: "Islamic AI Assistant",
    descriptionId: "Chatbot cerdas yang menjawab pertanyaan keislaman berdasarkan Al-Qur'an, Hadits sahih, dan ilmu tafsir/ fiqih.",
    descriptionEn: "Intelligent chatbot answering Islamic questions based on Al-Qur'an, Sahih Hadith, and tafsir/fiqh scholarship.",
  },
  {
    icon: BookOpen,
    titleId: "Al-Qur'an Digital (114 Surah)",
    titleEn: "Digital Al-Qur'an (114 Surahs)",
    descriptionId: "Pencarian ayat lengkap dengan teks Arab, transliterasi Latin, dan terjemahan Indonesia. Mendukung baca per surah atau ayat spesifik.",
    descriptionEn: "Complete verse lookup with Arabic text, Latin transliteration, and Indonesian translation. Read by surah or specific verse.",
  },
  {
    icon: ScrollText,
    titleId: "Kutubut Tis'ah (9 Kitab Hadits)",
    titleEn: "Kutubut Tis'ah (9 Hadith Books)",
    descriptionId: "Akses ke 9 kitab hadits utama: Bukhari, Muslim, Tirmidzi, Abu Dawud, Nasa'i, Ibnu Majah, Ahmad, Malik, Darimi.",
    descriptionEn: "Access to 9 major hadith books: Bukhari, Muslim, Tirmidhi, Abu Dawood, Nasa'i, Ibn Majah, Ahmad, Malik, Darimi.",
  },
  {
    icon: Bot,
    titleId: "Function Calling & RAG",
    titleEn: "Function Calling & RAG",
    descriptionId: "AI memanggil API Al-Qur'an & Hadits secara real-time saat dibutuhkan, memastikan rujukan akurat dan terverifikasi.",
    descriptionEn: "AI invokes Al-Qur'an & Hadith APIs in real-time as needed, ensuring accurate and verified source citations.",
  },
  {
    icon: Globe,
    titleId: "Multi-Provider LLM",
    titleEn: "Multi-Provider LLM",
    descriptionId: "Support GripHub Router (GPT-5.6 Luna), Google Gemini, dan Ollama (Local). Fleksibel memilih model cloud mutakhir atau self-hosted untuk privasi penuh.",
    descriptionEn: "Supports GripHub Router (GPT-5.6 Luna), Google Gemini, and Ollama (Local). Flexible choice between state-of-the-art cloud and self-hosted privacy.",
  },
  {
    icon: Shield,
    titleId: "Privacy & Offline Ready",
    titleEn: "Privacy & Offline Ready",
    descriptionId: "Dengan Ollama, data tidak keluar dari server. Cocok untuk institusi, pesantren, atau penggunaan pribadi sensitif.",
    descriptionEn: "With Ollama, data remains entirely on-premise. Ideal for institutions, Islamic boarding schools, and sensitive personal inquiries.",
  },
];

const TECH_STACK: TechStack[] = [
  { name: "Next.js 15", icon: "⚛️", color: "text-slate-600 dark:text-slate-400", description: "App Router, Server Components, Streaming" },
  { name: "TypeScript", icon: "📘", color: "text-blue-600", description: "Type safety end-to-end" },
  { name: "Tailwind CSS v4", icon: "🎨", color: "text-cyan-600", description: "Utility-first styling, dark mode native" },
  { name: "FastAPI", icon: "⚡", color: "text-green-600", description: "High-performance Python API backend" },
  { name: "GripHub Router", icon: "🌐", color: "text-emerald-600", description: "OpenAI-compatible router (GPT-5.6 Luna)" },
  { name: "Google Gemini", icon: "🤖", color: "text-violet-600", description: "Generative AI dengan function calling" },
  { name: "Ollama", icon: "🦙", color: "text-orange-600", description: "Local LLM inference (DeepSeek, Llama, dll)" },
  { name: "equran.id API", icon: "📖", color: "text-emerald-600", description: "Data Al-Qur'an resmi Indonesia" },
  { name: "hadis-api-id", icon: "📜", color: "text-amber-600", description: "Data 9 kitab hadits sahih" },
  { name: "Railway", icon: "🚂", color: "text-indigo-600", description: "Cloud deployment backend" },
  { name: "Vercel", icon: "▲", color: "text-slate-900 dark:text-white", description: "Edge deployment frontend" },
];

const CREATOR_INFO = {
  name: "Amirul Putra Justicia",
  role: "Full-Stack Developer & AI Enthusiast",
  github: "https://github.com/AmirulJusticia0507",
  linkedin: "https://linkedin.com/in/amirul-justicia",
  whatsapp: "https://wa.me/6282134402383",
};

const AI_MODELS = [
  { 
    name: "GPT-5.6 Luna", 
    provider: "GripHub Router", 
    type: "Cloud", 
    bestForId: "Default: reasoning cerdas, respon komprehensif, performa tinggi",
    bestForEn: "Default: intelligent reasoning, comprehensive responses, high performance" 
  },
  { 
    name: "Gemini 2.5 Flash", 
    provider: "Google", 
    type: "Cloud", 
    bestForId: "Speed, cost-efficient, function calling native",
    bestForEn: "Speed, cost-efficient, native function calling" 
  },
  { 
    name: "DeepSeek R1 8B", 
    provider: "DeepSeek (via Ollama)", 
    type: "Local", 
    bestForId: "Reasoning, privacy, offline, free",
    bestForEn: "Reasoning, privacy, offline, free" 
  },
  { 
    name: "Llama 3.1 8B", 
    provider: "Meta (via Ollama)", 
    type: "Local", 
    bestForId: "General chat, multilingual, open weights",
    bestForEn: "General chat, multilingual, open weights" 
  },
  { 
    name: "Qwen 2.5 7B", 
    provider: "Alibaba (via Ollama)", 
    type: "Local", 
    bestForId: "Multilingual, coding, efficient",
    bestForEn: "Multilingual, coding, efficient" 
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"features" | "tech" | "ai" | "creator">("features");
  const { language, t } = useLanguage();

  const isEn = language === "en";

  const tabs = [
    { id: "features", label: t("about.tabs.features"), icon: Sparkles },
    { id: "tech", label: t("about.tabs.tech"), icon: Code },
    { id: "ai", label: t("about.tabs.ai"), icon: Brain },
    { id: "creator", label: t("about.tabs.creator"), icon: Heart },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-8 px-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 animate-in fade-in duration-500">
        <div className="inline-flex items-center justify-center gap-3 px-5 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/50">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{t("about.badge")}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-600 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
          {t("about.title")}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t("about.description")}
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 pt-4">
          <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {t("about.surah_count")}</span>
          <span className="flex items-center gap-1.5"><ScrollText className="w-4 h-4" /> {t("about.hadith_books")}</span>
          <span className="flex items-center gap-1.5"><Bot className="w-4 h-4" /> {t("about.multi_llm")}</span>
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> {t("about.privacy_first")}</span>
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("about.features.title")}</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{FEATURES.length} {t("about.features.count")}</span>
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
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                      {isEn ? feature.titleEn : feature.titleId}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isEn ? feature.descriptionEn : feature.descriptionId}
                    </p>
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("about.tech.title")}</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{TECH_STACK.length} {t("about.tech.count")}</span>
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("about.ai.title")}</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{AI_MODELS.length} {t("about.ai.count")}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 px-4">{t("about.ai.th_model")}</th>
                    <th className="pb-3 px-4">{t("about.ai.th_provider")}</th>
                    <th className="pb-3 px-4">{t("about.ai.th_type")}</th>
                    <th className="pb-3 px-4">{t("about.ai.th_best_for")}</th>
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
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                        {isEn ? model.bestForEn : model.bestForId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/50">
              <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                <strong>{t("about.ai.note_label")}</strong> {t("about.ai.note_text")}
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
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{t("about.creator.bio")}</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <a
                href={CREATOR_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition-colors group"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={CREATOR_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors group"
              >
                <Link2 className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={CREATOR_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors group"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" /> {t("about.creator.thanks_title")}
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>• <strong>GripHub Router</strong> — Router OpenAI-compatible &amp; model GPT-5.6 Luna</li>
                <li>• <strong>equran.id</strong> — API Al-Qur&apos;an resmi Indonesia</li>
                <li>• <strong>hadis-api-id.vercel.app</strong> — API 9 kitab hadits sahih</li>
                <li>• <strong>Google Gemini</strong> — Model AI generatif cloud</li>
                <li>• <strong>Ollama Community</strong> — Local LLM inference engine</li>
                <li>• <strong>Vercel &amp; Railway</strong> — Platform deployment gratis</li>
                <li>• <strong>Open Source Community</strong> — Library &amp; tools yang digunakan</li>
              </ul>
            </div>

            <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p>{t("about.creator.footer_love")} <Heart className="w-4 h-4 inline text-rose-500" /></p>
              <p className="mt-1">&quot;{t("about.creator.quote")}&quot;</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
