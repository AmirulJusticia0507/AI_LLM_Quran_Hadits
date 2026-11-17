"use client";

import { useLanguage } from '@/context/LanguageContext';

const fields = [
  {
    id: 'medicine',
    titleId: 'Kedokteran & farmasi',
    titleEn: 'Medicine & pharmacy',
    people: ['Al-Razi', 'Al-Zahrawi', 'Ibn al-Nafis', 'Ibn al-Baytar'],
    workId: 'Klinik · bedah · anatomi · bahan obat',
    workEn: 'Clinical medicine · surgery · anatomy · materia medica',
  },
  {
    id: 'maths',
    titleId: 'Matematika, astronomi & ilmu alam',
    titleEn: 'Mathematics, astronomy & natural sciences',
    people: ['Al-Kindi', 'Nasir al-Din al-Tusi'],
    workId: 'Matematika · model astronomi · observatorium',
    workEn: 'Mathematics · astronomical models · observatory work',
  },
  {
    id: 'thought',
    titleId: 'Filsafat, logika & musik',
    titleEn: 'Philosophy, logic & music',
    people: ['Al-Farabi', 'Ibn Rushd (Averroes)'],
    workId: 'Logika · filsafat · musik · kedokteran',
    workEn: 'Logic · philosophy · music · medicine',
  },
  {
    id: 'engineering',
    titleId: 'Rekayasa mekanik',
    titleEn: 'Mechanical engineering',
    people: ['Al-Jazari'],
    workId: 'Perangkat mekanik · jam air · automata',
    workEn: 'Mechanical devices · water clocks · automata',
  },
  {
    id: 'geography',
    titleId: 'Geografi & kartografi',
    titleEn: 'Geography & cartography',
    people: ['Al-Idrisi'],
    workId: 'Karya geografi · peta dunia · laporan perjalanan',
    workEn: 'Geographical writing · world map · travel accounts',
  },
];

export default function MuslimScientistsChart() {
  const { language } = useLanguage();
  const en = language === 'en';

  return (
    <figure aria-label={en ? 'Selected Muslim scholars by field' : 'Pilihan tokoh ilmuwan Muslim menurut bidang'} className="rounded-2xl border border-sky-200 bg-linear-to-br from-sky-50 via-white to-indigo-50 p-4 dark:border-sky-900 dark:from-sky-950/35 dark:via-slate-900 dark:to-indigo-950/25 sm:p-5">
      <figcaption className="mb-4 text-center text-sm font-bold text-sky-950 dark:text-sky-200">
        {en ? 'A selection of scholars across fields' : 'Pilihan ilmuwan dari berbagai bidang'}
      </figcaption>
      <div className="mx-auto max-w-lg rounded-xl border border-sky-300 bg-sky-800 px-4 py-3 text-center text-sm font-bold text-white dark:border-sky-700">
        {en ? 'Scholars in the medieval Islamic world' : 'Ilmuwan di dunia Islam abad pertengahan'}
      </div>
      <div aria-hidden="true" className="py-2 text-center text-xl leading-none text-sky-600">↓</div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(field => (
          <section key={field.id} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
            <h4 className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-indigo-800 dark:text-indigo-200">
              {en ? field.titleEn : field.titleId}
            </h4>
            <ul className="flex flex-wrap justify-center gap-2">
              {field.people.map(person => <li key={person} className="rounded-lg border border-sky-100 bg-sky-50 px-2.5 py-2 text-center text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">{person}</li>)}
            </ul>
            <p className="mt-2 text-center text-[11px] leading-5 text-slate-600 dark:text-slate-300">{en ? field.workEn : field.workId}</p>
          </section>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
        {en
          ? 'Selected examples, not a complete list. Scientific work developed over time through scholarship and exchange; individual contributions should be described according to historical evidence.'
          : 'Contoh pilihan, bukan daftar lengkap. Ilmu berkembang bertahap melalui kajian dan pertukaran pengetahuan; kontribusi tiap tokoh perlu dijelaskan sesuai bukti sejarah.'}
      </p>
    </figure>
  );
}
