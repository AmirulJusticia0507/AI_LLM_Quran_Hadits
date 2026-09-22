"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  id: {
    "nav.chat": "Chat AI",
    "nav.quran": "Al-Qur'an",
    "nav.hadith": "Hadits",
    "nav.belajar": "Belajar",
    "nav.about": "Tentang",
    "nav.jadwal": "Jadwal Shalat",
    "nav.dzikir": "Dzikir",
    "nav.asmaul": "Asmaul Husna",
    "nav.doa": "Doa Harian",
    "nav.kiblat": "Arah Kiblat",
    "nav.panduan": "Panduan Ibadah",
    "nav.ibadah": "Ibadah",
    "language.indonesia": "Indonesia",
    "language.english": "English",
  },
  en: {
    "nav.chat": "AI Chat",
    "nav.quran": "Al-Qur'an",
    "nav.hadith": "Hadith",
    "nav.belajar": "Learn",
    "nav.about": "About",
    "nav.jadwal": "Prayer Times",
    "nav.dzikir": "Dhikr",
    "nav.asmaul": "Asmaul Husna",
    "nav.doa": "Daily Duas",
    "nav.kiblat": "Qibla Direction",
    "nav.panduan": "Worship Guide",
    "nav.ibadah": "Worship",
    "language.indonesia": "Indonesia",
    "language.english": "English",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && (saved === "id" || saved === "en")) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string) => {
    if (!mounted) return translations.id[key] || key;
    return translations[language][key] || translations.id[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}