/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser smoke test. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3100');
    const field = page.getByRole('searchbox', { name: 'Cari materi dan fitur Al-Hikmah' });
    await field.fill('enam rukun wudu');
    const lesson = page.getByRole('link', { name: /Enam rukun wudhu/ });
    await lesson.waitFor();
    await lesson.click();
    await page.waitForURL('**/fiqh#wudhu');
    assert.ok(await page.locator('#wudhu').isVisible());
    await field.fill('xyznonexistent');
    await page.getByText('Belum ada materi yang cocok.', { exact: false }).waitFor();
    await field.press('Escape');
    await page.getByRole('region', { name: 'Hasil pencarian' }).waitFor({ state: 'hidden' });
    await page.setViewportSize({ width: 375, height: 812 });
    await field.fill('sebelum makan');
    const doa = page.getByRole('region', { name: 'Hasil pencarian' }).getByRole('link', { name: /Doa Harian/ });
    await doa.waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await doa.click();
    await page.waitForURL('**/doa');
    await page.reload();
    await page.route('**/search-index.json', route => route.fulfill({ status: 503, body: 'unavailable' }));
    await field.fill('zakat');
    await page.getByRole('button', { name: 'Coba lagi' }).waitFor();
    await page.unroute('**/search-index.json');
    await page.getByRole('button', { name: 'Coba lagi' }).click();
    await page.getByRole('link', { name: /Zakat/ }).first().waitFor();
    assert.deepEqual(errors, []);
    console.log('PASS: desktop/mobile search, lesson navigation, empty state, Escape, error recovery, no runtime errors.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
