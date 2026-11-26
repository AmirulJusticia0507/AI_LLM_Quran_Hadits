import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const ROUTES = [
  "/", "/quran", "/hadith", "/rujukan", "/matan", "/jadwal", "/dzikir", "/asmaul", "/doa", "/kiblat",
  "/tajweed", "/balaghoh", "/belajar", "/tazkiyah", "/aqidah", "/fiqh", "/ushul-fiqh", "/musthalah-hadits",
  "/peradaban", "/parenting", "/ulumul-quran", "/faraidh", "/adab-digital", "/muslimah", "/siyasah",
  "/fitnah-akhir-zaman", "/kisah-nabi", "/islam-nusantara", "/sahabat-surga", "/lingkungan", "/fiqh-dakwah",
  "/munakahat", "/muamalah", "/integritas", "/komparasi", "/sains", "/makanan-halal", "/medis", "/sirah",
  "/alam-ghaib", "/adab-ikhtilaf", "/zakat-kontemporer", "/wakaf", "/jenazah-praktis", "/ilmu-tafsir",
  "/nahwu-dasar", "/adab-profesi", "/hukum-keluarga-indonesia", "/ekonomi-syariah", "/fiqh-ramadan",
  "/sharaf-dasar", "/tadabbur-juz-amma", "/fiqh-haji-umrah", "/fiqh-qurban-aqiqah", "/psikologi-islam",
  "/imam-madzhab", "/fiqh-kontemporer", "/ilmu-qiraat", "/kalkulator-zakat", "/kalkulator-waris",
  "/kuis-islam", "/kalkulator-fidyah", "/flashcard-quran", "/kalender-hijriah",
  "/hijaiyah", "/praktik-ibadah", "/panduan-ibadah", "/silsilah-habaib", "/about", "/help", "/masukan", "/privacy", "/terms"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
