"use client";

import { useLanguage } from '@/context/LanguageContext';

type MedicalLessonId = 'ikhtiar-sehat' | 'kaidah-darurat';

const careFlow = {
  id: {
    title: 'Bagan ikhtiar berobat dan menjaga jiwa',
    steps: ['Keluhan atau kebutuhan kesehatan', 'Evaluasi oleh tenaga kesehatan kompeten', 'Bahas diagnosis, manfaat, risiko, dan alternatif'],
    outcomes: [
      ['Risiko serius bila tidak ditangani', 'Berobat dapat menjadi wajib menurut resolusi IIFA'],
      ['Manfaat nyata, tanpa ancaman berat', 'Berobat dianjurkan atau dibolehkan sesuai keadaan'],
      ['Tindakan berisiko lebih besar dari manfaat', 'Risiko perlu ditimbang; cari pendapat klinis lain bila perlu'],
    ],
    note: 'Pasien mendapat penjelasan dan memberi persetujuan bila mampu. Kondisi gawat darurat mengikuti ketentuan klinis dan hukum yang berlaku.',
  },
  en: {
    title: 'Care-seeking and preservation of life',
    steps: ['Health concern or need', 'Assessment by a qualified health professional', 'Discuss diagnosis, benefits, risks, and alternatives'],
    outcomes: [
      ['Serious harm if untreated', 'Treatment may be obligatory under the IIFA resolution'],
      ['Meaningful benefit without severe threat', 'Treatment may be recommended or permissible, depending on the case'],
      ['Risks outweigh expected benefit', 'Weigh the risks and seek another clinical opinion when appropriate'],
    ],
    note: 'Patients should receive an explanation and give consent when able. Emergencies follow applicable clinical and legal rules.',
  },
};

const necessityFlow = {
  id: {
    title: 'Bagan menilai keringanan obat saat darurat',
    steps: ['Terapi dibutuhkan secara klinis', 'Periksa bahan dan alternatif halal serta suci'],
    branches: [
      ['Alternatif yang sesuai tersedia', 'Gunakan alternatif tersebut; alasan darurat perlu ditinjau kembali.'],
      ['Belum ada alternatif yang sesuai', 'Tenaga medis kompeten menilai kebutuhan dan merekomendasikan terapi.'],
    ],
    finish: 'Jika syarat fatwa terpenuhi, gunakan sebatas kadar kebutuhan; evaluasi ulang bila pilihan terapi berubah.',
    note: 'Fatwa MUI No. 30/2013 menyebut kondisi darurat atau kebutuhan setara darurat yang mengancam jiwa, belum adanya bahan halal dan suci, serta rekomendasi tenaga medis kompeten dan tepercaya.',
  },
  en: {
    title: 'Assessing a medicine exception in necessity',
    steps: ['Treatment is clinically needed', 'Check ingredients and suitable halal, pure alternatives'],
    branches: [
      ['A suitable alternative is available', 'Use that alternative; reassess whether necessity still applies.'],
      ['No suitable alternative is available', 'A qualified health professional assesses the need and recommends treatment.'],
    ],
    finish: 'If the fatwa conditions are met, use only what the need requires; reassess if treatment options change.',
    note: 'MUI Fatwa No. 30/2013 describes necessity or equivalent life-threatening need, no halal and pure alternative, and a recommendation from a competent, trusted medical professional.',
  },
};

function Node({ children, strong = false }: Readonly<{ children: React.ReactNode; strong?: boolean }>) {
  return <div className={`rounded-xl border px-3 py-3 text-center text-xs leading-5 ${strong ? 'border-emerald-300 bg-emerald-700 font-semibold text-white dark:border-emerald-700' : 'border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'}`}>{children}</div>;
}

function Arrow() {
  return <div aria-hidden="true" className="py-1 text-center text-lg leading-none text-emerald-600">↓</div>;
}

export default function MedicalPrinciplesChart({ lessonId }: Readonly<{ lessonId: MedicalLessonId }>) {
  const { language } = useLanguage();
  const en = language === 'en';

  if (lessonId === 'ikhtiar-sehat') {
    const copy = en ? careFlow.en : careFlow.id;
    return (
      <figure className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-teal-50 p-4 dark:border-emerald-900 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30">
        <figcaption className="mb-3 text-center text-sm font-bold text-emerald-900 dark:text-emerald-200">{copy.title}</figcaption>
        <div className="mx-auto max-w-xl space-y-1">
          {copy.steps.map(step => <div key={step}><Node>{step}</Node><Arrow /></div>)}
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {copy.outcomes.map(([condition, ruling]) => <div key={condition} className="space-y-2"><Node strong>{condition}</Node><Node>{ruling}</Node></div>)}
        </div>
        <p className="mt-3 rounded-lg bg-sky-50 p-3 text-xs leading-5 text-sky-950 dark:bg-sky-950/40 dark:text-sky-100">{copy.note}</p>
      </figure>
    );
  }

  const copy = en ? necessityFlow.en : necessityFlow.id;
  return (
    <figure className="rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 via-white to-orange-50 p-4 dark:border-amber-900 dark:from-amber-950/30 dark:via-slate-900 dark:to-orange-950/20">
      <figcaption className="mb-3 text-center text-sm font-bold text-amber-950 dark:text-amber-200">{copy.title}</figcaption>
      <div className="mx-auto max-w-xl space-y-1">
        {copy.steps.map(step => <div key={step}><Node>{step}</Node><Arrow /></div>)}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {copy.branches.map(([condition, result]) => <div key={condition} className="space-y-2"><Node strong>{condition}</Node><Node>{result}</Node></div>)}
      </div>
      <div className="mx-auto max-w-xl"><Arrow /><Node>{copy.finish}</Node></div>
      <p className="mt-3 rounded-lg bg-amber-100 p-3 text-xs leading-5 text-amber-950 dark:bg-amber-950/50 dark:text-amber-100">{copy.note}</p>
    </figure>
  );
}
