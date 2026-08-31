"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Chat AI", icon: "💬" },
  { href: "/quran", label: "Al-Qur'an", icon: "📖" },
  { href: "/hadith", label: "Hadits", icon: "📚" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-emerald-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700 dark:text-emerald-400">
            <span className="text-2xl">🕌</span>
            <span>AI Qur&apos;an & Hadits</span>
          </Link>

          <div className="flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
