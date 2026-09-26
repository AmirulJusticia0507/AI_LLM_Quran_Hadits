import json
import os
import unittest
from types import SimpleNamespace
from unittest.mock import patch

from app.llm.gemini import GeminiLLM, GENERATION_CONFIG
from app.llm.prompt import SYSTEM_PROMPT


def chunk(*parts):
    return SimpleNamespace(candidates=[SimpleNamespace(content=SimpleNamespace(parts=list(parts)))])


class GeminiStreamTests(unittest.IsolatedAsyncioTestCase):
    async def test_stream_continues_after_tool_result(self):
        function_call = SimpleNamespace(name="get_hadith", args={"kitab": "bukhari", "nomor": 1})
        tool_part = SimpleNamespace(function_call=function_call)
        final_part = SimpleNamespace(text="### Dalil Hadits\nTeks lengkap.")

        class Chat:
            def __init__(self):
                self.calls = []

            def send_message(self, message, **kwargs):
                self.calls.append((message, kwargs))
                return iter([chunk(tool_part)]) if len(self.calls) == 1 else iter([chunk(final_part)])

        chat = Chat()
        llm = object.__new__(GeminiLLM)
        llm._get_chat = lambda _: chat

        async def tool_result(call):
            self.assertEqual((call.name, dict(call.args)), ("get_hadith", {"kitab": "bukhari", "nomor": 1}))
            return {"status": "success", "teks_arab": "نص كامل", "terjemahan": "Terjemahan lengkap"}

        llm._execute_tool = tool_result
        events = [json.loads(event) async for event in llm.chat_stream("Tampilkan hadits")]
        self.assertEqual(events, [{"type": "token", "text": "### Dalil Hadits\nTeks lengkap."}, {"type": "done"}])
        self.assertEqual(len(chat.calls), 2)
        self.assertTrue(chat.calls[1][1]["stream"])
        self.assertEqual(chat.calls[1][0][0]["function_response"]["response"]["teks_arab"], "نص كامل")

    async def test_stream_returns_guard_error_after_five_tool_rounds(self):
        tool_part = SimpleNamespace(function_call=SimpleNamespace(name="get_hadith", args={"kitab": "bukhari", "nomor": 1}))

        class Chat:
            def send_message(self, *_args, **_kwargs):
                return iter([chunk(tool_part)])

        llm = object.__new__(GeminiLLM)
        llm._get_chat = lambda _: Chat()
        llm._execute_tool = lambda _: {"status": "success"}
        # Convert the synchronous helper to the async interface used in production.
        async def result(_):
            return {"status": "success"}
        llm._execute_tool = result
        events = [json.loads(event) async for event in llm.chat_stream("Hadits")]
        self.assertEqual(events[-1]["type"], "error")


class PromptTests(unittest.TestCase):
    def test_prompt_requires_complete_verified_sources(self):
        for phrase in [
            "WAJIB mengambil teks aslinya melalui tool/fungsi yang tersedia",
            "Teks Arab lengkap",
            "Terjemahan Indonesia lengkap dari tool",
            "tidak boleh dipotong memakai elipsis",
            "max_output_tokens",
        ]:
            source = SYSTEM_PROMPT if phrase != "max_output_tokens" else repr(GENERATION_CONFIG)
            self.assertIn(phrase, source)


if __name__ == "__main__":
    unittest.main()
