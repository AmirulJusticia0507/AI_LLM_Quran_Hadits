"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useSyncExternalStore } from 'react';
import type { Course } from '@/data/learning';
import NasabLessonCharts from '@/components/NasabLessonCharts';
import HabaibIndonesiaChart from '@/components/HabaibIndonesiaChart';
import MedicalPrinciplesChart from '@/components/MedicalPrinciplesChart';
import MuslimScientistsChart from '@/components/MuslimScientistsChart';
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
  const englishExamples = {
    title: 'Examples of Habaib in Indonesia: Figures, Family Names, and Verification',
    summary: 'A selection of Indonesian scholars and preachers publicly known by the title Habib. This is not a complete list and does not replace individual lineage verification.',
    points: [
      'Historical figures: Habib Ali bin Abdurrahman Al-Habsyi (Habib Ali Kwitang) and Habib Salim bin Ahmad Jindan are known in the history of Islamic teaching in Indonesia.',
      'Contemporary scholars and preachers: Habib Muhammad Luthfi bin Ali bin Yahya, Habib Syech bin Abdul Qodir Assegaf, and Habib Jindan bin Novel bin Salim Jindan.',
      'Other public figures known by the title include Habib Munzir bin Fuad Al-Musawa (founder of Majelis Rasulullah), Habib Muhammad Rizieq Shihab, and Habib Bahar bin Ali bin Smith (also written Sumayt or Sumait).',
      'Public titles and family names do not by themselves prove an individual’s genealogy. For a family’s lineage status, consult the records and verification process of Maktab Daimi Rabithah Alawiyah.',
      'Do not assume that everyone with the Shihab or Smith surname uses the title Habib. Women from families recorded as Alawiyyin are commonly referred to as Syarifah; usage follows each family’s tradition.',
    ],
    practice: 'When referring to a figure, distinguish public titles, family names, and individually verified lineage. Use reliable sources and do not generalize about a family from its surname.',
  };
  const englishMedical: Record<string, { title: string; summary: string; points: string[]; practice: string }> = {
    'ikhtiar-sehat': {
      title: 'Seeking Treatment and Preserving Life (Hifz al-Nafs)',
      summary: 'Protecting health and seeking care when ill can be part of worship and trust in Allah.',
      points: [
        'The Prophet ﷺ encouraged seeking treatment (Sunan Abi Dawud 3855). The hadith encourages care; it does not promise that every illness has a known or guaranteed cure.',
        'Preserving life (hifz al-nafs) is one of the five higher objectives of Islamic law (maqasid al-shariah).',
        'Seeking care is compatible with tawakkul: it means taking reasonable steps and consulting qualified health professionals.',
        'The International Islamic Fiqh Academy says treatment can be obligatory when foregoing it risks death, loss of an organ or function, disability, or transmission; recommended when there is meaningful benefit without those risks; permissible in other cases; and disliked when the treatment risk is greater than the condition being treated.',
        'Assessing need and risk is a clinical matter. A health professional should explain the diagnosis, prognosis, likely benefits, side effects, and alternatives.',
        'A capable patient should be informed and give consent. Emergency care follows applicable clinical and legal rules.',
        'This summary does not diagnose or tell anyone to start, stop, or change medication. Make treatment decisions with the clinician responsible for care.',
      ],
      practice: 'If you are unwell, seek an assessment from a qualified health professional. Ask about benefits, risks, alternatives, and warning signs; do not delay emergency care or change treatment on your own.',
    },
    'kaidah-darurat': {
      title: 'Necessity Principles for Medicines and Treatment',
      summary: 'Shariah concessions for medical ingredients are conditional and limited to the actual need.',
      points: [
        'The legal maxim “necessity permits prohibited matters” is supported in a specific context by Qur’an 2:173, which also limits the concession to necessity without desire for excess or transgression.',
        'A limiting maxim says that necessity is measured according to its extent. This is not a blanket permission for every product whose ingredients or status are uncertain.',
        'MUI Fatwa No. 30/2013 says medicines should ordinarily use pure and halal ingredients. It describes an exception for necessity or an equivalent life-threatening need when no halal and pure ingredient is available and a competent, trusted medical professional recommends it because no halal medicine is available.',
        'A person should not declare a situation medically necessary based only on an ingredient list or social-media claim. Clinicians assess the medical need and alternatives; qualified scholars or fatwa bodies address the religious ruling.',
        'If a suitable halal and pure alternative becomes available, reassess whether the concession still applies. Discuss any change with a doctor or pharmacist; do not abruptly stop treatment without clinical advice.',
        'MUI gives separate details for external-use medicines. The ruling depends on the ingredient, route of use, medical need, and applicable fatwa.',
      ],
      practice: 'Ask a doctor or pharmacist about the medicine’s ingredients and status, suitable alternatives, and the risks of switching or delaying treatment. For a religious ruling, consult MUI guidance or a scholar familiar with medical questions.',
    },
  };
  const englishScientists = {
    title: 'More Muslim Scholars: Medicine, Mathematics, Engineering, and Mapping',
    summary: 'Selected scholars from different periods and regions who worked in medicine, pharmacy, philosophy, mathematics, astronomy, mechanical engineering, and geography.',
    points: [
      'Medicine and surgery: Al-Razi wrote clinical and medical works; Al-Zahrawi compiled al-Tasrif, a medical encyclopedia with a major section on surgery; Ibn al-Nafis described blood passing through the lungs and rejected the idea that it crossed the heart’s ventricular septum; Ibn al-Baytar compiled a major work on medicinal substances and plants.',
      'Mathematics, astronomy, and natural sciences: Al-Kindi wrote on mathematics and several sciences; Nasir al-Din al-Tusi developed astronomical and mathematical work and worked at the Maragha Observatory. Their work grew through translation, debate, and development across generations.',
      'Philosophy and music: Al-Farabi is known for works on logic, philosophy, and music; Ibn Rushd wrote philosophical commentaries and also worked in medicine, law, and religious scholarship in al-Andalus.',
      'Mechanical engineering: Al-Jazari described mechanical devices, water clocks, and automata in his Book of Knowledge of Ingenious Mechanical Devices. His work shows the combination of design, practical knowledge, and workshop skill in his era.',
      'Geography and cartography: Al-Idrisi compiled geographical works and a world map for the court of Sicily in the twelfth century, drawing on the geographical knowledge and travel accounts available in his time.',
      'This is a selection, not a ranking or complete list. Labels such as “first inventor” or “father of modern science” need care: scientific achievements often developed gradually, building on earlier work and involving networks across languages and faiths.',
    ],
    practice: 'Choose one scholar and explore an original work or reliable history-of-science study. Note the field, work, historical context, and what the sources actually support without overstating the claim.',
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
                <h2 className="inline ml-2 text-lg font-bold">{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.title : en && lesson.id === 'contoh-habaib-indonesia' ? englishExamples.title : en && lesson.id === 'ilmuwan-muslim-lintas-bidang' ? englishScientists.title : en && englishMedical[lesson.id] ? englishMedical[lesson.id].title : lesson.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.summary : en && lesson.id === 'contoh-habaib-indonesia' ? englishExamples.summary : en && lesson.id === 'ilmuwan-muslim-lintas-bidang' ? englishScientists.summary : en && englishMedical[lesson.id] ? englishMedical[lesson.id].summary : lesson.summary}</p>
              </summary>
              <div className="pt-5 space-y-4">
                <ul className="list-disc pl-5 space-y-2 text-sm leading-7">
                  {lesson.points.map((point, index) => <li key={point}>{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.points[index] || point : en && lesson.id === 'contoh-habaib-indonesia' ? englishExamples.points[index] || point : en && lesson.id === 'ilmuwan-muslim-lintas-bidang' ? englishScientists.points[index] || point : en && englishMedical[lesson.id] ? englishMedical[lesson.id].points[index] || point : point}</li>)}
                </ul>
                {lesson.id === 'sakaratul-alam-kubur' && (
                  <figure className="overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-900">
                    <Image
                      src="/images/ibadah/sakaratul-barzakh.png"
                      alt={en ? 'Symbolic sunset landscape and a luminous arch representing reflection on death and the unseen Barzakh, not a literal depiction.' : 'Lanskap senja simbolis dengan gerbang bercahaya, sebagai ajakan merenungkan kematian dan alam Barzakh, bukan gambaran literal.'}
                      width={1536}
                      height={1024}
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="h-auto w-full"
                    />
                    <figcaption className="bg-indigo-50 px-4 py-3 text-xs leading-5 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-100">
                      {en ? 'A symbolic illustration for reflection. The unseen is not depicted literally.' : 'Ilustrasi simbolis untuk renungan. Alam gaib tidak digambarkan secara harfiah.'}
                    </figcaption>
                  </figure>
                )}
                {lesson.id === 'nasab-habaib-ba-alawi' && <NasabLessonCharts />}
                {lesson.id === 'contoh-habaib-indonesia' && <HabaibIndonesiaChart />}
                {lesson.id === 'ilmuwan-muslim-lintas-bidang' && <MuslimScientistsChart />}
                {(lesson.id === 'ikhtiar-sehat' || lesson.id === 'kaidah-darurat') && <MedicalPrinciplesChart lessonId={lesson.id} />}
                <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4">
                  <h3 className="font-semibold text-sm mb-2">
                    {en ? 'Practice & application' : 'Latihan & penerapan'}
                  </h3>
                  <p className="text-sm leading-relaxed">{en && lesson.id === 'nasab-habaib-ba-alawi' ? englishNasab.practice : en && lesson.id === 'contoh-habaib-indonesia' ? englishExamples.practice : en && lesson.id === 'ilmuwan-muslim-lintas-bidang' ? englishScientists.practice : en && englishMedical[lesson.id] ? englishMedical[lesson.id].practice : lesson.practice}</p>
                </div>
                <a
                  href={lesson.source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm underline text-emerald-700 dark:text-emerald-300"
                >
                  {en ? 'Reference' : 'Rujukan'}: {en ? lesson.source.labelEn || lesson.source.label : lesson.source.label} ↗
                </a>
                {lesson.extraReferences?.length ? (
                  <div className="space-y-1 text-sm">
                    <h3 className="font-semibold">{en ? 'Further reading' : 'Bacaan lanjutan'}</h3>
                    <ul className="list-disc space-y-1 pl-5">
                      {lesson.extraReferences.map(reference => (
                        <li key={reference.href}>
                          <a href={reference.href} target="_blank" rel="noopener noreferrer" className="underline text-emerald-700 dark:text-emerald-300">{en ? reference.labelEn || reference.label : reference.label} ↗</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
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
