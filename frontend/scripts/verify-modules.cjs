/* eslint-disable @typescript-eslint/no-require-imports -- Node verification script. */
const fs = require('node:fs');
const path = require('node:path');

const frontendRoot = path.resolve(__dirname, '..');
const learningPath = path.join(frontendRoot, 'src/data/learning.ts');
const navbarPath = path.join(frontendRoot, 'src/components/Navbar.tsx');
const langPath = path.join(frontendRoot, 'src/context/LanguageContext.tsx');
const sitemapPath = path.join(frontendRoot, 'src/app/sitemap.ts');
const searchIndexPath = path.join(frontendRoot, 'public/search-index.json');

const learningText = fs.readFileSync(learningPath, 'utf8');
const navbarText = fs.readFileSync(navbarPath, 'utf8');
const langText = fs.readFileSync(langPath, 'utf8');
const sitemapText = fs.readFileSync(sitemapPath, 'utf8');

const courseLinksMatch = learningText.match(/export const courseLinks = \[([\s\S]*?)\];/);
if (!courseLinksMatch) {
  console.error('❌ Tidak dapat menemukan array courseLinks di learning.ts');
  process.exit(1);
}

const hrefMatches = [...courseLinksMatch[1].matchAll(/href:\s*'([^']+)'/g)].map((m) => m[1]);
const errors = [];

// 1. Cek duplikasi href di courseLinks
const seenHrefs = new Set();
for (const href of hrefMatches) {
  if (seenHrefs.has(href)) {
    errors.push(`Duplikat href di courseLinks: ${href}`);
  }
  seenHrefs.add(href);

  // 2. Cek keberadaan file src/app/<slug>/page.tsx
  const pageFile = path.join(frontendRoot, 'src/app', href.slice(1), 'page.tsx');
  if (!fs.existsSync(pageFile)) {
    errors.push(`File halaman tidak ditemukan: src/app${href}/page.tsx`);
  }

  // 3. Cek pendaftaran di Navbar.tsx dan sitemap.ts
  if (!navbarText.includes(`"${href}"`) && !navbarText.includes(`'${href}'`)) {
    errors.push(`Rute ${href} belum terdaftar di active state Navbar.tsx`);
  }
  if (!sitemapText.includes(`"${href}"`) && !sitemapText.includes(`'${href}'`)) {
    errors.push(`Rute ${href} belum terdaftar di sitemap.ts`);
  }
}

// 4. Cek sinkronisasi jumlah modul di Navbar.tsx & LanguageContext.tsx
const totalModules = hrefMatches.length;
if (!navbarText.includes(`${totalModules} Modul Islam`)) {
  errors.push(`Badge di Navbar.tsx belum sinkron dengan total ${totalModules} modul`);
}
if (!langText.includes(`Jelajahi ${totalModules} Modul Lengkap`)) {
  errors.push(`footer.learn.cta (ID) di LanguageContext.tsx belum sinkron (${totalModules})`);
}
if (!langText.includes(`Explore All ${totalModules} Modules`)) {
  errors.push(`footer.learn.cta (EN) di LanguageContext.tsx belum sinkron (${totalModules})`);
}

// 5. Cek search-index.json
if (!fs.existsSync(searchIndexPath)) {
  errors.push('public/search-index.json belum dibuat. Jalankan npm run predev atau build-search-index.cjs');
} else {
  const indexData = JSON.parse(fs.readFileSync(searchIndexPath, 'utf8'));
  if (!Array.isArray(indexData) || indexData.length < totalModules) {
    errors.push('Isi public/search-index.json tidak lengkap');
  }
}

if (errors.length > 0) {
  console.error('❌ Ditemukan ketidakkonsistenan:');
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(`✅ Verifikasi sukses: ${totalModules} modul lengkap, sinkron di halaman, Navbar, LanguageContext, sitemap, dan search-index.`);
