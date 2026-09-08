"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useSyncExternalStore } from "react";
import { MessageSquare, BookOpen, ScrollText, Moon, Sun, Menu, X, Sparkles, Info, GraduationCap, Clock } from "lucide-react";

const navItems = [
  { href: "/", label: "Chat AI", icon: MessageSquare, badge: "AI Assistant" },
  { href: "/quran", label: "Al-Qur'an", icon: BookOpen, badge: "30 Juz" },
  { href: "/hadith", label: "Hadits", icon: ScrollText, badge: "9 Kitab" },
  { href: "/jadwal", label: "Jadwal", icon: Clock, badge: "Shalat" },
  { href: "/tajweed", label: "Tajwid", icon: GraduationCap, badge: "Ghunnah, Idgham, dll" },
  { href: "/about", label: "Tentang", icon: Info, badge: "Info" },
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
  // Reads from DOM — always accurate on client.
  return document.documentElement.classList.contains("dark");
}

function getThemeServerSnapshot(): boolean {
  // Server always returns false → Moon icon → matches SSR.
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
  // Notify all subscribers so useSyncExternalStore triggers re-render.
  themeListeners.forEach((cb) => cb());
}

// ---------------------------------------------------------------------------

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // isDark comes from DOM class — no React state, no setState in effect.
  // Server snapshot = false, client snapshot = reads classList.
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
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/70 dark:bg-slate-900/70 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "text-white bg-linear-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-600/25"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping absolute top-2 right-2" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
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

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
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
                  <span>{item.label}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
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
