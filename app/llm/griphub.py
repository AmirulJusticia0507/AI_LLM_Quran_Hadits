"""OpenAI-compatible chat completions, including streamed tool calls."""
import json
import os

import httpx

from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI
from app.llm.prompt import SYSTEM_PROMPT
from app.llm.tools import TOOLS


def _json_schema(value):
    if isinstance(value, dict):
        return {k: v.lower() if k == "type" and isinstance(v, str) else _json_schema(v)
                for k, v in value.items()}
    if isinstance(value, list):
        return [_json_schema(v) for v in value]
    return value


COMPATIBLE_TOOLS = [{"type": "function", "function": _json_schema(tool)} for tool in TOOLS]


class GripHubLLM:
    def __init__(self):
        self.api_key = os.getenv("GRIPHUB_API_KEY", "").strip()
        if not self.api_key or self.api_key == "your_api_key_here":
            raise ValueError("GRIPHUB_API_KEY belum diisi di .env")
        self.base_url = os.getenv("GRIPHUB_BASE_URL", "https://griphubrouter.web.id/v1").rstrip("/")
        if not self.base_url.startswith("https://"):
            raise ValueError("GRIPHUB_BASE_URL harus menggunakan HTTPS")
        self.model_name = os.getenv("GRIPHUB_MODEL", "").strip()
        if not self.model_name:
            raise ValueError("GRIPHUB_MODEL belum diisi di .env")
        self.history_messages = max(0, min(int(os.getenv("GRIPHUB_HISTORY_MESSAGES", "8")), 20))
        self.quran_api = QuranAPI()
        self.hadith_api = HadithAPI()

    async def _execute_tool(self, name, raw_arguments):
        try:
            args = json.loads(raw_arguments)
            if name == "get_quran_verse":
                from app.models.schemas import QuranVerseRequest
                params = QuranVerseRequest(**args)
                return await self.quran_api.get_verse(surah=params.surah, ayat=params.ayat)
            if name == "get_hadith":
                from app.models.schemas import HadithRequest
                params = HadithRequest(**args)
                return await self.hadith_api.get_hadith(kitab=params.kitab, nomor=params.nomor)
        except (ValueError, TypeError):
            return {"status": "error", "message": "Argumen rujukan tidak valid."}
        return {"status": "error", "message": "Fungsi rujukan tidak dikenal."}

    async def chat_stream(self, user_message, session_id=None, history=None):
        recent_history = list(history[-self.history_messages:]) if history and self.history_messages else []
        messages = [{"role": "system", "content": SYSTEM_PROMPT},
                    *recent_history,
                    {"role": "user", "content": user_message}]
        answer = ""
        try:
            async with httpx.AsyncClient(timeout=httpx.Timeout(120.0, connect=20.0)) as client:
                for _ in range(5):
                    calls = {}
                    round_text = ""
                    finished = False
                    async with client.stream(
                        "POST", f"{self.base_url}/chat/completions",
                        headers={"Authorization": f"Bearer {self.api_key}"},
                        json={"model": self.model_name, "messages": messages,
                              "tools": COMPATIBLE_TOOLS, "stream": True},
                    ) as response:
                        response.raise_for_status()
                        async for line in response.aiter_lines():
                            if not line.startswith("data:"):
                                continue
                            payload = line[5:].strip()
                            if payload == "[DONE]":
                                finished = True
                                break
                            if not payload:
                                continue
                            chunk = json.loads(payload)
                            if chunk.get("error"):
                                raise ValueError("Upstream stream error")
                            for choice in chunk.get("choices", []):
                                if choice.get("finish_reason") in ("length", "content_filter"):
                                    raise ValueError("Incomplete response")
                                if choice.get("finish_reason"):
                                    finished = True
                                delta = choice.get("delta", {})
                                if delta.get("content"):
                                    text = delta["content"]
                                    round_text += text
                                    answer += text
                                    yield json.dumps({"type": "token", "text": text})
                                for part in delta.get("tool_calls", []):
                                    call = calls.setdefault(part["index"], {"id": "", "type": "function", "function": {"name": "", "arguments": ""}})
                                    if part.get("id"):
                                        call["id"] = part["id"]
                                    for field in ("name", "arguments"):
                                        call["function"][field] += part.get("function", {}).get(field) or ""
                    if not finished:
                        raise ValueError("Stream closed before completion")
                    if not calls:
                        if not answer:
                            raise ValueError("Empty response")
                        if history is not None:
                            history.extend([{"role": "user", "content": user_message},
                                            {"role": "assistant", "content": answer}])
                            if self.history_messages:
                                del history[:-self.history_messages]
                            else:
                                history.clear()
                        yield json.dumps({"type": "done"})
                        return
                    ordered_calls = [calls[index] for index in sorted(calls)]
                    messages.append({"role": "assistant", "content": round_text or None, "tool_calls": ordered_calls})
                    for call in ordered_calls:
                        result = await self._execute_tool(call["function"]["name"], call["function"]["arguments"])
                        messages.append({"role": "tool", "tool_call_id": call["id"], "content": json.dumps(result, ensure_ascii=False)})
                raise ValueError("Too many tool rounds")
        except httpx.HTTPStatusError as exc:
            status = exc.response.status_code
            message = {401: "API key GripHub Router ditolak. Periksa konfigurasi backend.",
                       402: "Saldo atau kuota GripHub Router tidak mencukupi.",
                       429: "Batas permintaan GripHub Router tercapai. Coba lagi nanti."}.get(status, f"GripHub Router gagal merespons (HTTP {status}). Periksa model dan layanan.")
            yield json.dumps({"type": "error", "message": message})
        except Exception:
            # Never expose upstream response bodies, headers, or credentials.
            yield json.dumps({"type": "error", "message": "Jawaban GripHub Router belum selesai. Silakan coba lagi."})

    async def chat(self, user_message, history=None, session_id=None):
        parts = []
        async for raw in self.chat_stream(user_message, session_id=session_id, history=history):
            event = json.loads(raw)
            if event["type"] == "error":
                raise RuntimeError(event["message"])
            if event["type"] == "token":
                parts.append(event["text"])
        return "".join(parts)


def create_llm():
    return GripHubLLM()
