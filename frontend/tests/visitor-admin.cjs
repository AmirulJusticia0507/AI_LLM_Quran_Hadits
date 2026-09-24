/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node tests. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
function load(name) {
  const source = fs.readFileSync(path.join(__dirname, '../src/lib', name + '.ts'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const loaded = { exports: {} };
  new Function('require', 'exports', 'module', compiled)(require, loaded.exports, loaded);
  return loaded.exports;
}
const { visitorDevice } = load('visitor-device');
const { createAdminSession, verifyAdminSession, sameOrigin } = load('admin-session');
test('signed admin sessions reject tampering, expiration, missing configuration and future dates', () => {
  process.env.ADMIN_SESSION_SECRET = 'test-only-secret-' + 'a'.repeat(32);
  const now = Date.now();
  const token = createAdminSession(now);
  assert.equal(verifyAdminSession(token, now), true);
  assert.equal(verifyAdminSession(token, now + 8 * 3600 * 1000), false);
  assert.equal(verifyAdminSession(token, now - 10000), false);
  assert.equal(verifyAdminSession(token.slice(0, -1) + (token.endsWith('a') ? 'b' : 'a'), now), false);
  assert.equal(verifyAdminSession('garbage', now), false);
  process.env.ADMIN_SESSION_SECRET = '';
  assert.equal(verifyAdminSession(token, now), false);
});
test('login and logout require same-origin requests', () => {
  assert.equal(sameOrigin(new Request('https://example.com/api/admin/session', { headers: { Origin: 'https://evil.com' } })), false);
  assert.equal(sameOrigin(new Request('https://example.com/api/admin/session', { headers: { Origin: 'https://example.com' } })), true);
});
test('device estimates classify tablets, mobiles, browser variants and bots', () => {
  assert.deepEqual(visitorDevice('Mozilla/5.0 (Linux; Android 14) Chrome/123.0 Mobile Safari/537.36'), { device: 'Mobile', os: 'Android', browser: 'Chrome' });
  assert.equal(visitorDevice('Mozilla/5.0 (Windows NT 10.0) Chrome/123.0 Safari/537.36 Edg/123.0').browser, 'Edge');
  assert.equal(visitorDevice('Mozilla/5.0 (iPad; CPU OS 16) Safari/604.1').device, 'Tablet');
  assert.equal(visitorDevice('Mozilla/5.0 (Linux; Android 14) Chrome/123.0 Safari/537.36').device, 'Tablet');
  assert.equal(visitorDevice('Googlebot/2.1').device, 'Bot');
  assert.equal(visitorDevice('').device, 'Unknown');
});
