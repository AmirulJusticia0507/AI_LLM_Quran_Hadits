"use client";

import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import type { Course } from '@/data/learning';
import NasabLessonCharts from '@/components/NasabLessonCharts';
import { useLanguage } from '@/context/LanguageContext';
import { categoryEnglish, courseEnglish } from '@/data/learning-en';

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener('learning-progress', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('learning-progress', callback);
  };
};
const serverSnapshot = () => '[]';

export default function LearningCourse({ course }: { course: Course }) {
  const { language } = useLanguage();
  const en = language === 'en';

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Semua');
  const [onlyPending, setOnlyPending] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const key = `alhikmah-learning-v1-${course.id}`;
  const raw = useSyncExternalStore(subscribe, () => {
    try { return localStorage.getItem(key) || '[]'; } catch { return '[]'; }
  }, serverSnapshot);
  let completed: string[] = [];
  try {
    const value: unknown = JSON.parse(raw);
    if (Array.isArray(value)) completed = course.lessons.filter(l => value.includes(l.id)).map(l => l.id);
  } catch { /* Ignore invalid saved data. */ }

  function toggle(id: string) {
    const next = completed.includes(id) ? completed.filter(item => item !== id) : [...completed, id];
    try {
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event('learning-progress'));
      setStorageError(false);
    } catch { setStorageError(true); }
  }

  const allLabel = en ? 'All' : 'Semua';
  const localizedCategory = (value: string) => en ? categoryEnglish[value] || value : value;
  const localizedCourse = en ? courseEnglish[course.id] : undefined;
  const englishNasab = {
    title: 'Ba ‘Alawi Lineage: The Prophet’s Descendants and Da‘wah in the Nusantara',
    summary: 'The Prophet’s ﷺ lineage through Sayyidah Fatimah and Sayyidina Husain, Imam Ahmad al-Muhajir’s migration to Hadramaut, the emergence of Habaib family names, and their role in the Nusantara.',
    points: [
      'The Prophet’s ﷺ continuing lineage is through his daughter Sayyidah Fatimah al-Zahra and her husband Sayyidina Ali ibn Abi Talib. Their descendants branched through Sayyidina Hasan, commonly associated with the title Sharif, and Sayyidina Husain, whose descendants are commonly known as Sayyids or Habaib.',
      'The Husaini line continued through Ali Zainal Abidin (As-Sajjad), who survived Karbala, then Muhammad al-Baqir, Ja‘far al-Sadiq, Ali al-Uraidhi, and Imam Ahmad al-Muhajir. The lesson places his migration from Basrah to Hadramaut around 317 AH amid political turmoil.',
      'The Ba ‘Alawi name is traced to Alawi ibn Ubaidillah ibn Ahmad al-Muhajir. Muhammad al-Faqih al-Muqaddam (d. 653 AH) is associated with the symbolic laying down of the sword and a path of da‘wah grounded in scholarship, spiritual discipline, and good character.',
      'Ba ‘Alawi descendants established family branches including Assegaf, Al-Attas, Al-Habsyi, Al-Haddad, Alaydrus, Shihab, Al-Jufri, Bin Yahya, and Al-Kaff, among others.',
      'Lineage records are preserved through family genealogies and, in Indonesia, recorded by Maktab Daimi of Rabithah Alawiyah. “Sayyid” refers to lineage; “Habib” is an honorific used for a Sayyid known for knowledge and piety.',
    ],
    practice: 'Love and honor the Prophet’s family with proper manners and without excess (ghuluw). Follow their examples of knowledge, character, and gentle da‘wah.',
  };
  const categories = [allLabel, ...new Set(course.lessons.map(l => localizedCategory(l.category)))];
  const search = query.trim().toLocaleLowerCase('id');
  const filtered = course.lessons.filter(l =>
    (category === allLabel || localizedCategory(l.category) === category) &&
    (!onlyPending || !completed.includes(l.id)) &&
    [l.title, l.summary, l.category, ...l.points, l.practice, l.source.label].join(' ').toLocaleLowerCase('id').includes(search)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <Link href="/belajar" className="text-sm text-emerald-700 dark:text-emerald-300 underline">
        {en ? '← Learning Center' : '← Pusat Belajar'}
      </Link>
      <header className="rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 text-white p-6 sm:p-10 space-y-3">
        <p className="text-xs uppercase tracking-widest text-emerald-200">
          {en ? 'Al-Hikmah • Learn and practice' : 'Al-Hikmah • Belajar dan mengamalkan'}
        </p>
        <h1 className="text-3xl font-bold">{localizedCourse?.title || course.title}</h1>
        <p className="text-emerald-100 leading-relaxed">{localizedCourse?.description || course.description}</p>
        <p className="text-sm">
          {course.lessons.length} {en ? 'materials' : 'materi'} •{' '}
          {completed.length} {en ? 'completed' : 'selesai dibaca'}
        </p>
        <progress
          aria-label={en ? 'Reading progress' : 'Progres membaca'}
          value={completed.length}
          max={course.lessons.length}
          className="w-full h-2 accent-emerald-400"
        />
      </header>
      <p className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm leading-relaxed">
        {localizedCourse?.note || course.note}
      </p>
      <section aria-label={en ? 'Filter materials' : 'Filter materi'} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <label className="block text-sm font-medium">
          {en ? 'Search materials' : 'Cari materi'}
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={en ? 'Search topic or keyword…' : 'Cari topik atau kata kunci…'}
            className="mt-2 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-3 focus:outline-emerald-500"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map(item => (
            <button
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm ${category === item ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyPending} onChange={e => setOnlyPending(e.target.checked)} className="accent-emerald-600" />
          {en ? 'Show only unread' : 'Tampilkan yang belum selesai'}
        </label>
        <p aria-live="polite" className="text-sm text-slate-500 dark:text-slate-400">
          {filtered.length} {en ? 'materials found. Progress saved in this browser only.' : 'materi ditemukan. Progres tersimpan hanya di browser ini.'}
        </p>
        {storageError && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {en
              ? 'Progress not saved. Browser storage unavailable or full.'
              : 'Progres belum tersimpan. Penyimpanan browser tidak tersedia atau penuh.'}
          </p>
        )}
      </section>
      <div className="space-y-4">
        {filtered.map(lesson => (
          <article id={lesson.id} key={lesson.id} className="scroll-mt-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6">
            <details>
              <summary className="cursor-pointer rounded-lg focus-visible:outline-2 focus-visible:outline-emerald-500">
                <span className="text-xs text-emerald-700 dark:text-emerald-300">
                  {localizedCategory(lesson.category)}{completed.includes(lesson.id) ? (en ? ' • Completed' : ' • Selesai dibaca') : ''}
                </span>
                <h2 className="inline ml-2 text-lg font-bold">{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.title : lesson.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.summary : lesson.summary}</p>
              </summary>
              <div className="pt-5 space-y-4">
                <ul className="list-disc pl-5 space-y-2 text-sm leading-7">
                  {lesson.points.map((point, index) => <li key={point}>{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.points[index] || point : point}</li>)}
                </ul>
                {lesson.id === 'nasab-habaib-ba-alawi' && <NasabLessonCharts />}
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4">
                  <h3 className="font-semibold text-sm mb-2">
                    {en ? 'Practice & application' : 'Latihan & penerapan'}
                  </h3>
                  <p className="text-sm leading-relaxed">{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.practice : lesson.practice}</p>
                </div>
                <a
                  href={lesson.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm underline text-emerald-700 dark:text-emerald-300"
                >
                  {en ? 'Reference' : 'Rujukan'}: {lesson.source.label} ↗
                </a>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={completed.includes(lesson.id)}
                    onChange={() => toggle(lesson.id)}
                    className="accent-emerald-600 h-4 w-4"
                  />
                  {en ? 'Mark as read' : 'Sudah saya baca'}
                </label>
              </div>
            </details>
          </article>
        ))}
        {!filtered.length && (
          <div className="text-center p-10 space-y-3">
            <p>{en ? 'No materials match the filter.' : 'Tidak ada materi yang sesuai dengan filter.'}</p>
            <button
              onClick={() => { setQuery(''); setCategory(allLabel); setOnlyPending(false); }}
              className="text-emerald-700 dark:text-emerald-300 underline"
            >
              {en ? 'Show all materials' : 'Tampilkan semua materi'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
