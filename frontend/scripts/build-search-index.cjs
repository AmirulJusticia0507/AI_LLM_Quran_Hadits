/* eslint-disable @typescript-eslint/no-require-imports -- Build-time Node script. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const pages = [
  ['/', 'Chat AI', 'Tanya jawab keislaman dengan rujukan Al-Qur’an dan hadits.', 'asisten islam pertanyaan konsultasi'],
  ['/quran', 'Al-Qur’an & Terjemahan', 'Baca surah, ayat, terjemahan, dan dengarkan murottal Al-Qur’an.', 'quran qur an surat tafsir audio'],
  ['/hadith', 'Hadits', 'Telusuri koleksi kitab hadits dan baca riwayat beserta terjemahannya.', 'hadis hadith bukhari muslim tirmidzi abu dawud nasai ibnu majah ahmad malik darimi'],
  ['/belajar', 'Pusat Belajar Islam', 'Materi tazkiyah, fiqh ibadah, sirah, tajwid, makhraj huruf, dan balaghoh.', 'pelajaran modul belajar'],
  ['/fiqh', 'Fiqh Ibadah', 'Pelajari bersuci, shalat, puasa, zakat, haji, dan ibadah sehari-hari.', 'fikih fiqih'],
  ['/tazkiyah', 'Tazkiyatun Nafs', 'Membersihkan hati, menjaga niat, dan membangun akhlak baik.', 'akhlak penyucian jiwa'],
  ['/sirah', 'Sirah Nabawiyah', 'Pelajari perjalanan hidup dan keteladanan Nabi Muhammad.', 'sejarah rasul nabi'],
  ['/tajweed', 'Ilmu Tajwid & Makhraj Huruf', 'Kaidah bacaan Al-Qur’an dan latihan pengucapan huruf hijaiyah.', 'tajweed tajwid makharij'],
  ['/balaghoh', 'Ilmu Balaghoh', 'Kesesuaian ungkapan dan makna: maani, bayan, badi, irob, tashrif.', 'balaghah balagoh maani bayan badi makna kiasan'],
  ['/matan', 'Matan Hadits', 'Baca kitab Arba’in Nawawi dan Bulughul Maram.', 'arbain nawawi bulughul maram'],
  ['/doa', 'Doa Harian', 'Kumpulan doa sehari-hari dengan bacaan Arab, latin, dan artinya.', 'doa supplication'],
  ['/dzikir', 'Dzikir & Wirid Harian', 'Bacaan dzikir, wirid, dan penghitung tasbih.', 'zikir dzikir wirid tahlil tasbih'],
  ['/asmaul', 'Asmaul Husna', 'Nama-nama Allah beserta bacaan dan maknanya.', '99 nama allah'],
  ['/jadwal', 'Jadwal Shalat', 'Waktu shalat berdasarkan lokasi dan kalender Hijriah.', 'salat sholat waktu imsak hijriah'],
  ['/kiblat', 'Arah Kiblat', 'Temukan arah kiblat menggunakan kompas.', 'kompas arah ka bah'],
  ['/panduan-ibadah', 'Panduan Ibadah', 'Panduan jenazah, Yasin dan tahlil, serta manasik haji dan umrah.', 'pemakaman manasik yasinan'],
  ['/praktik-ibadah', 'Praktik Wudhu & Shalat', 'Panduan urutan wudhu dan shalat dengan ilustrasi, bacaan, dan rujukan.', 'wudu solat praktek gerakan'],
  ['/about', 'Tentang Al-Hikmah AI', 'Informasi tentang platform Al-Hikmah AI.', 'tentang aplikasi'],
  ['/help', 'Bantuan', 'Panduan penggunaan fitur Al-Hikmah AI.', 'bantuan help cara menggunakan'],
  ['/masukan', 'Masukan & Saran', 'Sampaikan masukan untuk Al-Hikmah AI.', 'feedback saran laporan'],
  ['/privacy', 'Kebijakan Privasi', 'Informasi privasi dan penggunaan data.', 'privasi data'],
  ['/terms', 'Syarat & Ketentuan', 'Ketentuan penggunaan Al-Hikmah AI.', 'syarat ketentuan'],
];

// Only public, authored content is indexed: no environment variables, code,
// class names, user conversations, or responses from external services.
const contentFields = new Set('title judul name arab arabic latin arti translation summary description points practice label note detail definition howTo duration mistakes category letters names exercise tip text content meaning author source_name'.split(' '));
const clean = value => value.replace(/&apos;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
function readContent(file, seen = new Set()) {
  if (seen.has(file) || !fs.existsSync(file)) return [];
  seen.add(file);
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const parts = [];
  function visit(node) {
    if (ts.isJsxText(node)) parts.push(node.text);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const parent = node.parent;
      const property = ts.isPropertyAssignment(parent) && parent.initializer === node && contentFields.has(parent.name.getText(source));
      if (property || ts.isArrayLiteralExpression(parent)) {
        if (!/^https?:|^\/|^[\w-]+:/.test(node.text)) parts.push(node.text);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  // Include authored data and page-specific components (e.g. wirid and makhraj).
  for (const node of source.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier)) continue;
    const specifier = node.moduleSpecifier.text;
    if (specifier === '@/data/learning') continue; // Added per course below.
    if (!/^@\/(data|components)\//.test(specifier)) continue;
    const base = path.join(root, 'src', specifier.slice(2));
    const child = [base + '.ts', base + '.tsx'].find(fs.existsSync);
    if (child) parts.push(...readContent(child, seen));
  }
  return [...new Set(parts.map(clean).filter(Boolean))];
}

const entries = pages.map(([href, title, description, keywords]) => {
  const file = path.join(root, 'src/app', href, 'page.tsx');
  if (!fs.existsSync(file)) throw new Error(`Missing search destination: ${href}`);
  return { href, title, description, category: 'Halaman', text: `${keywords} ${readContent(file).join(' ')}` };
});

// Lessons are indexed individually, including their full authored text.
const learningPath = path.join(root, 'src/data/learning.ts');
const learning = ts.createSourceFile(learningPath, fs.readFileSync(learningPath, 'utf8'), ts.ScriptTarget.Latest, true);
const literal = (object, key) => {
  const property = object.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(learning) === key);
  return property && ts.isStringLiteral(property.initializer) ? property.initializer.text : '';
};
for (const statement of learning.statements) {
  if (!ts.isVariableStatement(statement)) continue;
  for (const declaration of statement.declarationList.declarations) {
    const course = declaration.initializer;
    if (!course || !ts.isObjectLiteralExpression(course)) continue;
    const id = literal(course, 'id');
    const lessons = course.properties.find(p => ts.isPropertyAssignment(p) && p.name.getText(learning) === 'lessons');
    if (!id || !lessons || !ts.isArrayLiteralExpression(lessons.initializer)) continue;
    for (const lesson of lessons.initializer.elements) {
      if (!ts.isObjectLiteralExpression(lesson)) continue;
      const strings = [];
      function collect(node) {
        if (ts.isStringLiteral(node) && !/^https?:/.test(node.text)) strings.push(node.text);
        ts.forEachChild(node, collect);
      }
      collect(lesson);
      entries.push({ href: `/${id}#${literal(lesson, 'id')}`, title: literal(lesson, 'title'), description: literal(lesson, 'summary'), category: literal(course, 'title'), text: strings.join(' ') });
    }
  }
}

for (const page of entries.filter(entry => entry.category === 'Halaman')) {
  const lessons = entries.filter(entry => entry.href.startsWith(`${page.href}#`));
  page.text += ' ' + lessons.map(lesson => lesson.text).join(' ');
}

fs.writeFileSync(path.join(root, 'public/search-index.json'), JSON.stringify(entries));
console.log(`Search index: ${entries.length} pages and lessons`);
