/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS test runner. */
// Requires Playwright and a running frontend (TEST_BASE_URL, default localhost:3100).
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const requests = [];
    let delayNext = false;
    let releaseDelayed;
    let notifyDelayed;
    const delayStarted = new Promise(resolve => { notifyDelayed = resolve; });
    const fixture = (surah, ayat = 1) => ({ status: 'success', surah: `Fixture-${surah}`, nomor_surah: surah, nomor_ayat: ayat, teks_arab: 'fixture', teks_latin: 'fixture', terjemahan: `Ayat ${surah}:${ayat}` });
    await page.route('**/api/quran/verse', async route => {
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' } });
      const body = route.request().postDataJSON();
      requests.push(body);
      if (delayNext) {
        delayNext = false;
        await new Promise(resolve => { releaseDelayed = resolve; notifyDelayed(); });
      }
      await route.fulfill({ json: fixture(body.surah, body.ayat), headers: { 'access-control-allow-origin': '*' } });
    });
    const fullRequests = [];
    await page.route('**/api/quran/surah/*', route => {
      const number = Number(route.request().url().split('/').at(-1));
      fullRequests.push(number);
      return route.fulfill({ json: { status: 'success', ayat: [fixture(number), fixture(number, 2)] }, headers: { 'access-control-allow-origin': '*' } });
    });
    await page.goto(`${process.env.TEST_BASE_URL || 'http://localhost:3100'}/quran`);
    const search = page.getByRole('textbox', { name: 'Cari nama atau nomor surah' });
    const select = page.getByRole('combobox', { name: 'Pilih surah' });
    const show = page.getByRole('button', { name: 'Tampilkan Ayat' });
    for (const [query, number] of [['Yasin', 36], ['al baqarah', 2], ['Surat Al Ikhlas', 112], ['55', 55], ['114', 114]]) {
      await search.fill(query);
      assert.equal(await select.inputValue(), String(number));
      await show.click();
      await page.getByText(`Surah Fixture-${number}`, { exact: true }).waitFor();
      assert.deepEqual(requests.at(-1), { surah: number, ayat: 1 });
    }
    await search.fill('tidak ada');
    assert(await show.isDisabled());
    assert(await page.getByRole('button', { name: 'Baca Surah' }).isDisabled());
    await search.fill('112');
    await page.getByRole('button', { name: 'Baca Surah' }).click();
    await page.getByRole('heading', { name: 'Surah Fixture-112 — 2 Ayat' }).waitFor();
    assert.deepEqual(fullRequests, [112]);

    await search.fill('36');
    delayNext = true;
    await show.click();
    await delayStarted;
    await search.fill('55');
    await show.click();
    await page.getByText('Surah Fixture-55', { exact: true }).waitFor();
    releaseDelayed();
    await page.waitForTimeout(300);
    assert(await page.getByText('Surah Fixture-55', { exact: true }).isVisible());
    assert.equal(await page.getByText('Surah Fixture-36', { exact: true }).count(), 0);
    assert.deepEqual(errors, []);
    console.log('Browser regression passed: search selection, request payload, empty results, full surah, stale response.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
