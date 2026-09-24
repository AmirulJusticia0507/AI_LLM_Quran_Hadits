export type SearchEntry = {
  href: string;
  title: string;
  description: string;
  category: string;
  text: string;
};

export function normalizeSearch(value: string): string {
  return value.toLocaleLowerCase('id').normalize('NFD')
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[’'`]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

const aliases: Record<string, string> = {
  sholat: 'shalat', salat: 'shalat', solat: 'shalat',
  wudu: 'wudhu', fikih: 'fiqh', fiqih: 'fiqh',
  hadis: 'hadits', hadith: 'hadits', tajweed: 'tajwid', zikir: 'dzikir',
  yasin: 'ya sin',
};
const searchable = (value: string) => normalizeSearch(value).split(/\s+/).map(word => aliases[word] || word).join(' ');

export function searchSite(entries: SearchEntry[], query: string): SearchEntry[] {
  const normalized = searchable(query);
  if (normalized.length < 2) return [];
  const tokens = normalized.split(/\s+/);
  return entries.map(entry => {
    const title = searchable(entry.title);
    const description = searchable(entry.description);
    const content = `${title} ${description} ${searchable(entry.category)} ${searchable(entry.text)}`;
    if (!tokens.every(token => content.includes(token))) return { entry, score: 0 };
    const score = 1 + (title === normalized ? 100 : 0) + (title.includes(normalized) ? 40 : 0)
      + tokens.reduce((sum, token) => sum + (title.includes(token) ? 10 : 0) + (description.includes(token) ? 3 : 0), 0);
    return { entry, score };
  }).filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'id'))
    .map(result => result.entry);
}
