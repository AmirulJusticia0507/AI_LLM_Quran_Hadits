/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node test runner. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, '../src/lib/site-search.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const loaded = { exports: {} };
new Function('exports', 'module', compiled)(loaded.exports, loaded);
const { searchSite } = loaded.exports;
const entries = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/search-index.json'), 'utf8'));

test('finds authored material beyond menu titles', () => {
  for (const [query, href] of [['sebelum makan', '/doa'], ['Maha Pengasih', '/asmaul'], ['ikhfa', '/tajweed'], ['miqat', '/panduan-ibadah'], ['Yasin', '/quran']]) {
    assert.ok(searchSite(entries, query).some(entry => entry.href === href), query);
  }
});
test('ranks specific lessons and supports spelling aliases', () => {
  assert.equal(searchSite(entries, 'Enam rukun wudu')[0].href, '/fiqh#wudhu');
  assert.equal(searchSite(entries, 'ikhlas dan menjaga niat')[0].href, '/tazkiyah#ikhlas');
  assert.ok(searchSite(entries, 'sholat').some(entry => entry.href === '/jadwal'));
  assert.ok(searchSite(entries, 'hadis').some(entry => entry.href === '/hadith'));
});
test('ignores case, punctuation and Arabic diacritics', () => {
  assert.equal(searchSite(entries, '  AL-QUR’AN  ')[0].href, '/quran');
  assert.ok(searchSite(entries, 'الرَّحْمَن').some(entry => entry.href === '/asmaul'));
});
test('empty, punctuation-only, and unrelated queries have no matches', () => {
  for (const query of ['', '  ', '!!!', 'x', 'medmatch', 'xyznonexistent']) assert.deepEqual(searchSite(entries, query), []);
  assert.deepEqual(searchSite(entries, 'wudhu xyznonexistent'), []);
});
test('every result points to a real page and lesson anchors exist in source data', () => {
  const learning = fs.readFileSync(path.join(__dirname, '../src/data/learning.ts'), 'utf8');
  assert.equal(new Set(entries.map(entry => entry.href)).size, entries.length);
  for (const entry of entries) {
    const [route, anchor] = entry.href.split('#');
    assert.ok(fs.existsSync(path.join(__dirname, '../src/app', route, 'page.tsx')), entry.href);
    if (anchor) assert.ok(learning.includes(`id: '${anchor}'`), entry.href);
  }
});
