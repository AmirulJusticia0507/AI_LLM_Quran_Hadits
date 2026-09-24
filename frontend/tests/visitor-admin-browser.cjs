/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser test. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');

(async () => {
  assert.ok(process.env.TEST_ADMIN_PASSWORD, 'Set TEST_ADMIN_PASSWORD for the local test backend');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
    assert.equal((await page.request.get(`${base}/api/admin/visits`)).status(), 401);
    assert.equal((await page.request.post(`${base}/api/admin/session`, { data: { password: process.env.TEST_ADMIN_PASSWORD }, headers: { Origin: 'https://evil.example' } })).status(), 403);
    await page.goto(base + '/quran');
    const link = page.getByRole('link', { name: /Pengunjung hari ini:/ });
    await link.waitFor();
    await link.click();
    await page.waitForURL('**/admin/pengunjung');
    await page.getByLabel('Password admin').fill('wrong');
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'Password admin salah' }).waitFor();
    await page.getByLabel('Password admin').fill(process.env.TEST_ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Masuk', exact: true }).click();
    await page.getByRole('cell', { name: '/quran', exact: true }).first().waitFor();
    const cookies = await page.context().cookies();
    const session = cookies.find(cookie => cookie.name === 'alhikmah_admin');
    assert.ok(session?.httpOnly && session.secure && session.sameSite === 'Strict');
    const response = await page.request.get(base + '/api/admin/visits');
    assert.equal(response.status(), 200);
    assert.equal(response.headers()['cache-control'], 'no-store');
    assert.ok((await response.json()).items.every(item => !item.path.startsWith('/admin')));
    await page.setViewportSize({ width: 375, height: 812 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.getByRole('combobox', { name: /Perangkat/ }).selectOption('Tablet');
    await page.getByRole('button', { name: 'Tampilkan', exact: true }).click();
    await page.getByText('Belum ada kunjungan tercatat pada filter ini.', { exact: false }).waitFor();
    await page.getByRole('button', { name: 'Keluar', exact: true }).click();
    await page.getByLabel('Password admin').waitFor();
    assert.equal((await page.request.get(base + '/api/admin/visits')).status(), 401);
    assert.deepEqual(errors, []);
    console.log('PASS: access control, CSRF, login, real visit history, secure cookie, device filter, mobile layout, logout.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
