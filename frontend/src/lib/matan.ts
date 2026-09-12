import metadata from "./matan-metadata.json";

export type BookId = keyof typeof metadata;
type Entry = { number: number; title: string; arabic: string; translation: string | null; chapter: number };
type Chapter = { id: number; title: string; arabic?: string };
const sources: Record<BookId, string> = {
  "arbain-nawawi": "https://ournoor.com/api/v1/hadits",
  "bulughul-maram": "https://raw.githubusercontent.com/AhmedBaset/hadith-json/v1.2.0/db/by_book/other_books/bulugh_almaram.json",
};
const chapterNames = ["Bersuci", "Shalat", "Jenazah", "Zakat", "Puasa", "Haji", "Jual beli", "Pernikahan", "Jinayat", "Hudud", "Jihad", "Makanan", "Sumpah dan nazar", "Peradilan", "Memerdekakan budak", "Kitab al-Jami’ (Adab dan akhlak)"];

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Data sumber tidak valid");
  return value as Record<string, unknown>;
}
function rows(value: unknown) {
  if (!Array.isArray(value)) throw new Error("Daftar sumber tidak valid");
  return value.map(record);
}
function text(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) throw new Error("Teks sumber kosong");
  return value.trim();
}
function integer(value: unknown): number {
  if (typeof value !== "number" && typeof value !== "string") throw new Error("Nomor tidak valid");
  const result = Number(value);
  if (!Number.isSafeInteger(result) || result < 1) throw new Error("Nomor tidak valid");
  return result;
}
export function isBookId(value: string): value is BookId {
  return Object.hasOwn(sources, value);
}

export function parseBook(id: BookId, payload: unknown) {
  const data = record(payload);
  let entries: Entry[];
  let chapters: Chapter[];
  if (id === "arbain-nawawi") {
    chapters = [{ id: 1, title: "Seluruh hadits" }];
    entries = rows(data.data).map(row => ({ number: integer(row.no), title: text(row.judul), arabic: text(row.arab), translation: text(row.indo), chapter: 1 }));
  } else {
    chapters = rows(data.chapters).map(row => ({ id: integer(row.id), title: text(chapterNames[integer(row.id) - 1]), arabic: text(row.arabic) }));
    entries = rows(data.hadiths).map(row => ({ number: integer(row.idInBook), title: `Teks nomor ${integer(row.idInBook)}`, arabic: text(row.arabic), translation: null, chapter: integer(row.chapterId) }));
  }
  const expected = id === "arbain-nawawi" ? 42 : 1767;
  const chapterCount = id === "arbain-nawawi" ? 1 : 16;
  const chapterIds = new Set(chapters.map(chapter => chapter.id));
  entries.sort((a, b) => a.number - b.number);
  if (entries.length !== expected || chapters.length !== chapterCount || chapterIds.size !== chapterCount) throw new Error("Koleksi tidak lengkap");
  if (entries.some((entry, index) => entry.number !== index + 1 || !chapterIds.has(entry.chapter))) throw new Error("Identitas teks tidak valid");
  return { ...metadata[id], chapters, entries };
}

type Book = ReturnType<typeof parseBook>;
const cache = new Map<BookId, { expires: number; book: Book }>();
const pending = new Map<BookId, Promise<Book>>();
async function fetchBook(id: BookId): Promise<Book> {
  const response = await fetch(sources[id], { signal: AbortSignal.timeout(30000), cache: "no-store" });
  if (!response.ok) throw new Error("Sumber tidak tersedia");
  const book = parseBook(id, await response.json());
  cache.set(id, { expires: Date.now() + 3600000, book });
  return book;
}
export async function loadBook(id: BookId): Promise<Book> {
  const saved = cache.get(id);
  if (saved && saved.expires > Date.now()) return saved.book;
  const existing = pending.get(id);
  if (existing) return existing;
  const request = fetchBook(id);
  pending.set(id, request);
  try { return await request; } finally { pending.delete(id); }
}
const normalize = (value: string) => value.normalize("NFD").replace(/[\p{M}ـ]/gu, "").toLowerCase();
export function browseBook(book: Book, query: string, chapter: number | null, requestedPage: number) {
  const needle = normalize(query.trim());
  const titles = new Map(book.chapters.map(item => [item.id, item.title]));
  let items = book.entries.filter(entry => chapter === null || entry.chapter === chapter);
  if (/^\d+$/.test(needle)) items = items.filter(entry => entry.number === Number(needle));
  else if (needle) items = items.filter(entry => normalize([entry.title, entry.arabic, entry.translation, titles.get(entry.chapter)].join(" ")).includes(needle));
  const pages = Math.max(1, Math.ceil(items.length / 5));
  const page = Math.min(requestedPage, pages);
  const { entries, ...info } = book;
  return { ...info, total: entries.length, matched: items.length, page, pages, items: items.slice((page - 1) * 5, page * 5) };
}
