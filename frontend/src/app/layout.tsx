import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Al-Hikmah AI - Platform Qur'an & Hadits berbasis AI",
  description: "Asisten Keislaman Cerdas berbasis AI dengan rujukan otentik Al-Qur'an dan Kitab Hadits Sahih.",
  icons: {
    icon: "/favicon.ico",
  },
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
