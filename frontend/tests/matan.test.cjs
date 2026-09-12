/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS test runner. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const Module = require('node:module');
function load(file, resolver) {
  const filename = path.resolve(__dirname, file);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = module.paths;
  if (resolver) mod.require = resolver;
  mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
  return mod.exports;
}
const library = load('../src/lib/matan.ts');
const route = load('../src/app/api/matan/[kitab]/route.ts', () => library);
const fixture = () => ({ data: Array.from({ length: 42 }, (_, i) => ({ no: i + 1, judul: `Hadits ${i + 1}`, arab: 'نِيَّة', indo: 'Niat' })) });
const request = (book, query = '') => route.GET(new Request(`http://website.test/api/matan/${book}${query}`), { params: Promise.resolve({ kitab: book }) });

test('validates complete editions and supports search and pagination', () => {
  const book = library.parseBook('arbain-nawawi', fixture());
  assert.equal(library.browseBook(book, 'نية', null, 1).matched, 42);
  assert.deepEqual(library.browseBook(book, '12', null, 1).items.map(row => row.number), [12]);
  assert.equal(library.browseBook(book, '', null, 100).page, 9);
  assert.equal(library.browseBook(book, 'absent', null, 1).matched, 0);
  assert.equal(library.browseBook(book, '', 2, 1).matched, 0);
  const bad = fixture(); bad.data.pop();
  assert.throws(() => library.parseBook('arbain-nawawi', bad));
  const duplicate = fixture(); duplicate.data[1].no = 1;
  assert.throws(() => library.parseBook('arbain-nawawi', duplicate));
});

test('same-origin route rejects invalid input, retries failures and caches successful source reads', async () => {
  const original = global.fetch;
  const urls = [];
  global.fetch = async url => { urls.push(url); return new Response('', { status: 503 }); };
  try {
    assert.equal((await request('unknown')).status, 404);
    assert.equal((await request('arbain-nawawi', '?page=0')).status, 400);
    assert.equal((await request('arbain-nawawi', '?bab=17')).status, 400);
    assert.equal((await request('arbain-nawawi', '?q=' + 'a'.repeat(151))).status, 400);
    assert.equal(urls.length, 0);
    assert.equal((await request('arbain-nawawi')).status, 502);
    global.fetch = async url => { urls.push(url); return Response.json(fixture()); };
    const response = await request('arbain-nawawi', '?q=42');
    assert.equal(response.status, 200);
    assert.equal((await response.json()).items[0].number, 42);
    assert.equal((await request('arbain-nawawi')).status, 200);
    assert.deepEqual(urls, ['https://ournoor.com/api/v1/hadits', 'https://ournoor.com/api/v1/hadits']);
  } finally { global.fetch = original; }
});
