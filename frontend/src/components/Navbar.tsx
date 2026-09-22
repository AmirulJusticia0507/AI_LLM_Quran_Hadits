"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageSquare, BookOpen, ScrollText, Moon, Sun, Menu, X, Sparkles, Info, GraduationCap, Clock, ChevronDown, Fingerprint, HeartHandshake, Compass, BookMarked, Globe } from "lucide-react";

const navItems = [
  { href: "/", labelKey: "nav.chat", icon: MessageSquare, badge: "AI Assistant" },
  { href: "/quran", labelKey: "nav.quran", icon: BookOpen, badge: "30 Juz" },
  { href: "/hadith", labelKey: "nav.hadith", icon: ScrollText, badge: "9 Kitab" },
  { href: "/belajar", labelKey: "nav.belajar", icon: GraduationCap, badge: "4 Modul Islam" },
  { href: "/about", labelKey: "nav.about", icon: Info, badge: "Info" },
];

const ibadahItems = [
  { href: "/jadwal", labelKey: "nav.jadwal", icon: Clock, badge: "GPS + Hijriah" },
  { href: "/dzikir", labelKey: "nav.dzikir", icon: Fingerprint, badge: "Counter" },
  { href: "/asmaul", labelKey: "nav.asmaul", icon: Sparkles, badge: "99 Nama" },
  { href: "/doa", labelKey: "nav.doa", icon: HeartHandshake, badge: "14 Doa" },
  { href: "/kiblat", labelKey: "nav.kiblat", icon: Compass, badge: "Kompas" },
  { href: "/panduan-ibadah", labelKey: "nav.panduan", icon: BookMarked, badge: "Jenazah + Manasik" },
];

// ---------------------------------------------------------------------------
// Theme store using useSyncExternalStore — React-canonical external state API.
// No setState inside any effect. DOM class is the single source of truth.
// ---------------------------------------------------------------------------

type Listener = () => void;
const themeListeners = new Set<Listener>();

function subscribeTheme(cb: Listener) {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
}

function getThemeSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

function getThemeServerSnapshot(): boolean {
  return false;
}

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  themeListeners.forEach((cb) => cb());
}

// ---------------------------------------------------------------------------

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setLanguage(language === "id" ? "en" : "id")}
        aria-label={t("language.indonesia") + " / " + t("language.english")}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/50 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
      >
        <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-sm font-medium whitespace-nowrap">
          {language === "id" ? "ID" : "EN"}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ibadahOpen, setIbadahOpen] = useState(false);
  const ibadahRef = useRef<HTMLDivElement>(null);

  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ibadahRef.current && !ibadahRef.current.contains(e.target as Node)) {
        setIbadahOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ibadahActive = ibadahItems.some((item) => pathname === item.href);

  const toggleTheme = () => applyTheme(!isDark);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/10 shadow-lg shadow-emerald-950/5 dark:shadow-black/20" 
        : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50"
    }`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white text-2xl shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all duration-300">
                🕌
              </div>
              <div className="absolute -inset-0.5 rounded-2xl bg-emerald-500/20 blur opacity-0 group-hover:opacity-100 transition duration-300" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-600 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
                  Al-Hikmah AI
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-2.5 h-2.5" /> v2.0
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Pusat Studi AI Qur&apos;an & Hadits
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/belajar" && ["/tazkiyah", "/fiqh", "/sirah", "/tajweed"].includes(pathname));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isActive
                      ? "text-white bg-linear-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-600/25"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`} />
                  <span className="whitespace-nowrap">{t(item.labelKey)}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping absolute top-2 right-2" />
                  )}
                </Link>
              );
            })}

            {/* Dropdown Ibadah */}
            <div ref={ibadahRef} className="relative shrink-0">
              <button
                onClick={() => setIbadahOpen((v) => !v)}
                aria-label={t("nav.ibadah")}
                className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  ibadahActive || ibadahOpen
                    ? "text-white bg-linear-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-600/25"
                    : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                }`}
              >
                <Compass className={`w-4 h-4 shrink-0 ${ibadahActive || ibadahOpen ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`} />
                <span className="whitespace-nowrap">{t("nav.ibadah")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${ibadahOpen ? "rotate-180" : ""}`} />
              </button>
              {ibadahOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xl p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {ibadahItems.map((item) => {
                    const SubIcon = item.icon;
                    const subActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIbadahOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                          subActive
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <SubIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium flex-1">{t(item.labelKey)}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          {item.badge}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="ml-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/60 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/60 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka menu navigasi"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/belajar" && ["/tazkiyah", "/fiqh", "/sirah", "/tajweed"].includes(pathname));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-emerald-500"}`} />
                  <span>{t(item.labelKey)}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {item.badge}
                </span>
              </Link>
            );
          })}

          {/* Seksi Ibadah di drawer */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-4 pt-2">
            {t("nav.ibadah")}
          </p>
          {ibadahItems.map((item) => {
            const SubIcon = item.icon;
            const subActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  subActive
                    ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <SubIcon className={`w-5 h-5 ${subActive ? "text-white" : "text-emerald-500"}`} />
                  <span>{t(item.labelKey)}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  subActive ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}