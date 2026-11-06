import type { Reference } from "@/lib/chat-message";

const quranPattern = /(?:QS\.?|Q\.S\.?|Al-Qur'?an)\s*([A-Za-zÀ-ÿ'’ -]+?)\s*(?:\[?(\d{1,3})\]?)?\s*:\s*(\d{1,3}(?:\s*[-–]\s*\d{1,3})?)/gi;
const hadithPattern = /(?:HR\.?|H\.R\.?|Riwayat)\s+([A-Za-zÀ-ÿ'’ -]+?)(?:\s*(?:No\.?|nomor)\s*(\d+))?(?=[,.;\n)|]|$)/gi;

function clean(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Pulls only clearly-labelled citations out of a response. They are a reading
 * aid, not a new verification claim: the underlying text still comes from the
 * response generated after the provider tools ran.
 */
export function extractReferences(content: string): Reference[] {
  const references = new Map<string, Reference>();

  for (const match of content.matchAll(quranPattern)) {
    const surah = clean(match[1]);
    const surahNumber = match[2];
    const verse = clean(match[3]);
    if (!surah || !verse) continue;
    const label = `QS. ${surah}${surahNumber ? ` [${surahNumber}]` : ""}: ${verse}`;
    references.set(`quran:${label.toLocaleLowerCase("id")}`, {
      id: `quran:${label.toLocaleLowerCase("id")}`,
      type: "quran",
      label,
      detail: "Buka pembaca Al-Qur’an untuk memeriksa teks dan terjemahan.",
      href: "/quran",
    });
  }

  for (const match of content.matchAll(hadithPattern)) {
    const book = clean(match[1]);
    const number = match[2];
    if (!book || book.length < 3) continue;
    const label = `HR. ${book}${number ? ` No. ${number}` : ""}`;
    references.set(`hadith:${label.toLocaleLowerCase("id")}`, {
      id: `hadith:${label.toLocaleLowerCase("id")}`,
      type: "hadith",
      label,
      detail: "Buka koleksi Hadits untuk menelusuri riwayat dan terjemahannya.",
      href: "/hadith",
    });
  }

  return [...references.values()].slice(0, 8);
}
