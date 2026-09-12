/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS test runner. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadHelper(name) {
  const source = fs.readFileSync(path.join(__dirname, '../src/lib', name + '.ts'), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const loaded = { exports: {} };
  new Function('exports', 'module', code)(loaded.exports, loaded);
  return loaded.exports;
}

const { readChatStream } = loadHelper('chat-stream');
const { ensureMessageIds, makeMessage } = loadHelper('chat-message');

test('stream preserves fragmented JSON and multibyte Arabic text', async () => {
  const expected = [{ type: 'token', text: 'بسم الله' }, { type: 'token', text: ' — jawaban' }, { type: 'done' }];
  const bytes = new TextEncoder().encode(expected.map(event => 'data: ' + JSON.stringify(event) + '\r\n\r\n').join(''));
  const body = new ReadableStream({ start(controller) {
    for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
    controller.close();
  } });
  const events = [];
  await readChatStream(new Response(body), event => events.push(event));
  assert.deepEqual(events, expected);
  assert.equal(body.locked, false);
});

test('handles server errors and final events without newline', async () => {
  const events = [];
  const body = ': heartbeat\ndata: invalid\ndata: {"type":"token","text":123}\ndata: {"type":"error","message":"Coba lagi"}\ndata: [DONE]';
  await readChatStream(new Response(body), event => events.push(event));
  assert.deepEqual(events, [{ type: 'error', message: 'Coba lagi' }, { type: 'done' }]);
});

test('missing body fails explicitly', async () => {
  await assert.rejects(() => readChatStream(new Response(null), () => {}), /stream jawaban/);
});

test('legacy duplicate messages receive unique IDs that survive reload and edits', () => {
  const original = [{ role: 'user', content: 'Salam' }, { role: 'user', content: 'Salam' }];
  const migrated = ensureMessageIds(original);
  assert.notEqual(migrated[0].id, migrated[1].id);
  assert.deepEqual(original, [{ role: 'user', content: 'Salam' }, { role: 'user', content: 'Salam' }]);
  migrated[0].content = 'Changed';
  assert.deepEqual(ensureMessageIds(migrated), migrated);
  const duplicated = ensureMessageIds([migrated[0], migrated[0]]);
  assert.equal(duplicated[0].id, migrated[0].id);
  assert.notEqual(duplicated[1].id, migrated[0].id);
  assert(makeMessage('assistant', 'Answer').id);
});
