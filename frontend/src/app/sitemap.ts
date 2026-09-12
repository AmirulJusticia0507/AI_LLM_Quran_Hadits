import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const ROUTES = ["/", "/quran", "/hadith", "/jadwal", "/dzikir", "/asmaul", "/doa", "/kiblat", "/tajweed", "/belajar", "/tazkiyah", "/fiqh", "/sirah", "/donasi", "/about", "/help", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
