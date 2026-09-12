/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS test runner. */
// Run: node --test tests/surah-search.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname, '../src/lib/surah-search.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const loaded = { exports: {} };
new Function('exports', 'module', compiled)(loaded.exports, loaded);
const { filterSurahs, selectSearchSurah } = loaded.exports;
const page = fs.readFileSync(path.join(__dirname, '../src/app/quran/page.tsx'), 'utf8');
const listSource = page.split('const SURAH_LIST = ')[1].split('\n];')[0] + '\n]';
const surahs = new Function('return ' + listSource)();

test('searching every surah selects its actual number, not Al-Fatihah', () => {
  assert.equal(surahs.length, 114);
  for (const surah of surahs) {
    assert.equal(selectSearchSurah(surahs, surah.name, 1), surah.num);
    assert.equal(selectSearchSurah(surahs, String(surah.num), 1), surah.num);
  }
});

test('normalizes spaces, punctuation, case and Surat/Surah prefix', () => {
  for (const [query, number] of [['Yasin', 36], ['  al baqarah  ', 2], ['Surat Al Ikhlas', 112], ['surah ar rahman', 55]]) {
    assert.equal(selectSearchSurah(surahs, query, 1), number);
  }
});

test('unknown names and numbers never fall back to Al-Fatihah', () => {
  for (const query of ['tidak ada', '115', '0', '999', '!!!']) {
    assert.equal(selectSearchSurah(surahs, query, 1), null);
    assert.equal(filterSurahs(surahs, query).length, 0);
  }
  assert.equal(selectSearchSurah(surahs, '', 36), 36);
});
