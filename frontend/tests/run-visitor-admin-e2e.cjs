/* eslint-disable @typescript-eslint/no-require-imports -- Isolated integration test runner. */
const { spawn } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const frontend = path.resolve(__dirname, '..');
const root = path.resolve(frontend, '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'alhikmah-admin-e2e-'));
const children = [];
const env = { ...process.env, ADMIN_API_TOKEN: randomBytes(32).toString('hex'), ADMIN_SESSION_SECRET: randomBytes(32).toString('hex'), ADMIN_PASSWORD: randomBytes(24).toString('hex'), VISITS_DB_PATH: path.join(temp, 'visits.sqlite3'), BACKEND_URL: 'http://127.0.0.1:8029', TEST_BASE_URL: 'http://localhost:3129' };
env.TEST_ADMIN_PASSWORD = env.ADMIN_PASSWORD;
function start(command, args, cwd) {
  const child = spawn(command, args, { cwd, env, stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true });
  child.stderr.on('data', data => { if (!data.toString().startsWith('INFO:')) process.stderr.write(data); });
  child.on('error', error => console.error(error.message));
  children.push(child);
  return child;
}
async function ready(url) {
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(url)).ok) return; } catch { /* Wait for local startup. */ }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Test server failed to start: ${url}`);
}
(async () => {
  try {
    const python = process.env.TEST_PYTHON || path.join(root, '.venv', process.platform === 'win32' ? 'Scripts/python.exe' : 'bin/python');
    start(python, ['-c', "from fastapi import FastAPI; from app.api.visits import router; import uvicorn; app=FastAPI(); app.include_router(router); uvicorn.run(app,host='127.0.0.1',port=8029)"], root);
    await ready(env.BACKEND_URL + '/openapi.json');
    start(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3129'], frontend);
    await ready(env.TEST_BASE_URL + '/api/admin/session');
    const test = spawn(process.execPath, ['tests/visitor-admin-browser.cjs'], { cwd: frontend, env, stdio: 'inherit', windowsHide: true });
    children.push(test);
    const code = await new Promise(resolve => test.on('exit', resolve));
    if (code !== 0) throw new Error('Visitor browser tests failed');
  } finally {
    await Promise.all(children.filter(child => child.exitCode === null).map(child => new Promise(resolve => { child.once('exit', resolve); child.kill(); })));
    // Only remove files created in this test's exact temporary directory.
    for (const file of fs.readdirSync(temp)) fs.unlinkSync(path.join(temp, file));
    fs.rmdirSync(temp);
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
