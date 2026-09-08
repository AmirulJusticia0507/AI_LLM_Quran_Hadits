import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Al-Hikmah AI - Platform Qur'an & Hadits berbasis AI",
    template: "%s | Al-Hikmah AI",
  },
  description:
    "Asisten Keislaman Cerdas berbasis AI dengan rujukan otentik Al-Qur'an dan Kitab Hadits Sahih. Dilengkapi jadwal shalat, murottal audio, tafsir, dan panduan tajwid.",
  keywords: [
    "Al-Qur'an",
    "Hadits",
    "AI Islam",
    "tafsir",
    "jadwal shalat",
    "tajwid",
    "chatbot islami",
  ],
  authors: [{ name: "Amirul Justicia" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Al-Hikmah AI",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Al-Hikmah AI",
    title: "Al-Hikmah AI - Platform Qur'an & Hadits berbasis AI",
    description:
      "Tanya jawab keislaman dengan AI, rujukan Al-Qur'an & Hadits sahih, jadwal shalat, murottal, dan tafsir.",
  },
  twitter: {
    card: "summary",
    title: "Al-Hikmah AI - Platform Qur'an & Hadits berbasis AI",
    description:
      "Asisten Keislaman Cerdas berbasis AI dengan rujukan otentik Al-Qur'an dan Hadits sahih.",
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${amiri.variable}`} suppressHydrationWarning>
      <head>
        {/* Inline script: apply theme BEFORE React hydration to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s===null&&d))document.documentElement.classList.add('dark')}catch(e){}})()`
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-300 relative">
        {/* Subtle Decorative Background Glow Elements */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full filter blur-[120px] pointer-events-none -z-10 animate-pulse-fast"></div>
        <div className="fixed bottom-10 right-1/4 w-120 h-120 bg-teal-500/10 dark:bg-teal-500/15 rounded-full filter blur-[140px] pointer-events-none -z-10"></div>
        
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-6 max-w-6xl">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
