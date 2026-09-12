import json
import os
import unittest
from unittest.mock import AsyncMock, patch

import httpx

from app.llm.bazaarlink import BazaarlinkLLM


def stream(*deltas):
    return ''.join('data: ' + json.dumps({'choices': [{'delta': d}]}) + '\n\n' for d in deltas) + 'data: [DONE]\n\n'


class BazaarlinkTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.env = patch.dict(os.environ, {'BAZAARLINK_API_KEY': 'test-private-key', 'BAZAARLINK_BASE_URL': 'https://example.test/v1'})
        self.env.start()
        self.addCleanup(self.env.stop)
        self.llm = BazaarlinkLLM()

    def client(self, handler):
        real_client = httpx.AsyncClient
        return patch('app.llm.bazaarlink.httpx.AsyncClient', side_effect=lambda **kw: real_client(transport=httpx.MockTransport(handler), **kw))

    async def test_fragmented_tool_calls_and_followup_history(self):
        requests = []

        def handler(request):
            body = json.loads(request.content)
            requests.append(body)
            self.assertEqual(request.headers['Authorization'], 'Bearer test-private-key')
            if len(requests) == 1:
                return httpx.Response(200, text=stream(
                    {'tool_calls': [{'index': 0, 'id': 'call-1', 'function': {'name': 'get_quran_verse', 'arguments': '{"surah":1,'}}]},
                    {'tool_calls': [{'index': 0, 'function': {'arguments': '"ayat":1}'}}]},
                ))
            self.assertEqual(body['messages'][-1]['tool_call_id'], 'call-1')
            self.assertEqual(body['messages'][-2]['tool_calls'][0]['function']['arguments'], '{"surah":1,"ayat":1}')
            return httpx.Response(200, text=stream({'content': 'Jawaban '}, {'content': 'rujukan.'}))

        history = [{'role': 'user', 'content': 'Sebelumnya'}, {'role': 'assistant', 'content': 'Baik'}]
        self.llm.quran_api.get_verse = AsyncMock(return_value={'status': 'success', 'text': 'fixture'})
        with self.client(handler):
            answer = await self.llm.chat('Baca ayat pertama', history=history)
        self.assertEqual(answer, 'Jawaban rujukan.')
        self.assertEqual(requests[0]['messages'][1]['content'], 'Sebelumnya')
        self.assertEqual(history[-1]['content'], answer)
        self.llm.quran_api.get_verse.assert_awaited_once_with(surah=1, ayat=1)

    async def test_error_redacts_upstream_and_does_not_save_history(self):
        with self.client(lambda req: httpx.Response(401, text='test-private-key upstream secret')):
            history = []
            events = [json.loads(e) async for e in self.llm.chat_stream('Hi', history=history)]
        self.assertEqual(events[-1]['type'], 'error')
        self.assertNotIn('test-private-key', json.dumps(events))
        self.assertEqual(history, [])

    async def test_interrupted_stream_is_not_success(self):
        with self.client(lambda req: httpx.Response(200, text='data: {"choices":[{"delta":{"content":"partial"}}]}\n\n')):
            events = [json.loads(e) async for e in self.llm.chat_stream('Hi')]
        self.assertEqual(events[-1]['type'], 'error')
        self.assertFalse(any(e['type'] == 'done' for e in events))

    async def test_invalid_tool_parameters_do_not_call_api(self):
        self.llm.quran_api.get_verse = AsyncMock()
        result = await self.llm._execute_tool('get_quran_verse', '{"surah":999,"ayat":1}')
        self.assertEqual(result['status'], 'error')
        self.llm.quran_api.get_verse.assert_not_awaited()


if __name__ == '__main__':
    unittest.main()
