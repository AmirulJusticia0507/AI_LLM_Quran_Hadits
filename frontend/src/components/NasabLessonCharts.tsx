const charts = [
  {
    title: '1. Pangkal nasab melalui Sayyidah Fatimah RA',
    groups: [
      ['Rasulullah ﷺ', 'Sayyidah Fatimah RA + Sayyidina Ali RA'],
      ['Sayyidina Hasan RA', 'Sayyidina Husain RA'],
      ['Syarif / Asyraf', 'Sayyid / Sadah (Habaib)'],
    ],
  },
  {
    title: '2. Jalur Karbala menuju Hadramaut',
    groups: [
      ['Sayyidina Husain RA', 'Karbala · 61 H'],
      ['Ali Zainal Abidin', 'Muhammad Al-Baqir', 'Ja’far Ash-Shadiq', 'Ali Al-Uraidhi'],
      ['Imam Ahmad Al-Muhajir', 'Basrah → Hadramaut · sekitar 317 H'],
    ],
  },
  {
    title: '3. Ba ‘Alawi dan dakwah damai',
    groups: [
      ['Ahmad Al-Muhajir', 'Ubaidillah', 'Alawi'],
      ['Bani Alawi / Ba ‘Alawi'],
      ['Al-Faqih Al-Muqaddam', 'Ilmu syariat · tasawuf · akhlak'],
    ],
  },
  {
    title: '4. Percabangan marga dan jaringan Nusantara',
    groups: [
      ['Ba ‘Alawi di Hadramaut'],
      ['Assegaf · Al-Attas · Al-Habsyi · Al-Haddad', 'Alaydrus · Shihab · Al-Jufri', 'Bin Yahya · Al-Kaff · lainnya'],
      ['Jaringan ulama dan dakwah di Nusantara'],
    ],
  },
  {
    title: '5. Penjagaan nasab dan makna gelar',
    groups: [
      ['Syajarah ansab / catatan keluarga'],
      ['Pencocokan dan pencatatan', 'Maktab Daimi · Rabithah Alawiyah'],
      ['Sayyid: sebutan nasab', 'Habib: gelar penghormatan'],
    ],
  },
  {
    title: '6. Dalil, adab, dan praktik',
    groups: [
      ['QS. Asy-Syura: 23', 'Mawaddah fil qurba'],
      ['Cinta dan muliakan Ahlul Bait'],
      ['Tanpa ghuluw', 'Teladani ilmu, akhlak, dan dakwah santun'],
    ],
  },
];

export default function NasabLessonCharts() {
  return (
    <section aria-label="Bagan ringkasan pelajaran nasab Habaib" className="space-y-4">
      <h3 className="font-semibold">Bagan ringkas tiap pokok bahasan</h3>
      <div className="grid gap-4 lg:grid-cols-2">
        {charts.map((chart) => (
          <article key={chart.title} className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-4 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-slate-900">
            <h4 className="mb-3 text-sm font-bold text-emerald-900 dark:text-emerald-200">{chart.title}</h4>
            <div className="space-y-2">
              {chart.groups.map((group, index) => (
                <div key={`${chart.title}-${index}`}>
                  <div className="flex flex-wrap justify-center gap-2">
                    {group.map((item) => <span key={item} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-xs font-medium text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">{item}</span>)}
                  </div>
                  {index < chart.groups.length - 1 && <div aria-hidden="true" className="py-1 text-center text-emerald-600">↓</div>}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
