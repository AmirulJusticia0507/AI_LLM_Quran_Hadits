export type SurahOption = { num: number; name: string; verses: number };

export function normalizeSurahName(value: string): string {
  return value.toLocaleLowerCase('id').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^(?:surah|surat)\s+/, '')
    .replace(/[^a-z0-9]/g, '');
}

export function filterSurahs<T extends SurahOption>(surahs: T[], query: string): T[] {
  const name = normalizeSurahName(query.trim());
  if (!name) return query.trim() ? [] : surahs;
  return surahs.filter(s => /^\d+$/.test(name)
    ? s.num === Number(name)
    : normalizeSurahName(s.name).includes(name));
}

export function selectSearchSurah<T extends SurahOption>(surahs: T[], query: string, current: number): number | null {
  const matches = filterSurahs(surahs, query);
  const exact = matches.find(s => normalizeSurahName(s.name) === normalizeSurahName(query.trim()));
  return exact?.num ?? matches.find(s => s.num === current)?.num ?? matches[0]?.num ?? null;
}
