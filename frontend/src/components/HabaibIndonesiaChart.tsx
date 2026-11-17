"use client";

import { useLanguage } from '@/context/LanguageContext';

const branches = [
  {
    id: 'history',
    titleId: 'Tokoh sejarah',
    titleEn: 'Historical figures',
    names: [
      'Habib Ali bin Abdurrahman Al-Habsyi (Habib Ali Kwitang)',
      'Habib Salim bin Ahmad Jindan',
      'Habib Munzir bin Fuad Al-Musawa',
    ],
  },
  {
    id: 'today',
    titleId: 'Ulama dan pendakwah masa kini',
    titleEn: 'Contemporary scholars and preachers',
    names: [
      'Habib Muhammad Luthfi bin Ali bin Yahya',
      'Habib Syech bin Abdul Qodir Assegaf',
      'Habib Jindan bin Novel bin Salim Jindan',
      'Habib Muhammad Rizieq Shihab',
      'Habib Bahar bin Ali bin Smith (Sumayt/Sumait)',
    ],
  },
];

export default function HabaibIndonesiaChart() {
  const { language } = useLanguage();
  const en = language === 'en';

  return (
    <figure aria-label={en ? 'Examples of Habaib in Indonesia' : 'Bagan contoh Habaib di Indonesia'} className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-teal-50 p-4 dark:border-emerald-900 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 sm:p-5">
      <figcaption className="mb-4 text-center text-sm font-bold text-emerald-900 dark:text-emerald-200">
        {en ? 'Examples of Habaib known in Indonesia' : 'Contoh Habaib yang dikenal di Indonesia'}
      </figcaption>
      <div className="mx-auto max-w-md rounded-xl border border-emerald-300 bg-emerald-700 px-4 py-3 text-center text-sm font-bold text-white shadow-sm dark:border-emerald-700">
        {en ? 'Habaib in Indonesia · selected examples' : 'Habaib di Indonesia · contoh pilihan'}
      </div>
      <div aria-hidden="true" className="py-2 text-center text-xl leading-none text-emerald-600">↓</div>
      <div className="grid gap-3 md:grid-cols-2">
        {branches.map(branch => (
          <section key={branch.id} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
            <h4 className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-teal-800 dark:text-teal-200">
              {en ? branch.titleEn : branch.titleId}
            </h4>
            <ul className="space-y-2">
              {branch.names.map(name => (
                <li key={name} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-center text-xs leading-5 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  {name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
        {en
          ? 'Examples only, not a complete list. Public use of the title or a family name is not, by itself, individual lineage verification. See the linked sources and Maktab Daimi records.'
          : 'Contoh, bukan daftar lengkap. Gelar yang digunakan publik atau nama marga saja bukan verifikasi nasab perorangan. Lihat sumber tertaut dan catatan Maktab Daimi.'}
      </p>
    </figure>
  );
}
