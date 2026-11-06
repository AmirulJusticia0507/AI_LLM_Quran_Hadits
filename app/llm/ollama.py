import ollama
import json
from dotenv import load_dotenv
import os

from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI
from app.llm.prompt import SYSTEM_PROMPT
from app.llm.tools import source_from_tool

load_dotenv()

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_quran_verse",
            "description": "Mengambil teks Arab, Latin, dan terjemahan Bahasa Indonesia dari ayat Al-Qur'an berdasarkan nomor Surah dan Ayat.",
            "parameters": {
                "type": "object",
                "properties": {
                    "surah": {
                        "type": "integer",
                        "description": "Nomor surah dalam Al-Qur'an (1 - 114)",
                    },
                    "ayat": {
                        "type": "integer",
                        "description": "Nomor ayat dalam surah tersebut",
                    },
                },
                "required": ["surah", "ayat"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_hadith",
            "description": "Mengambil matan Arab dan terjemahan hadits berdasarkan perawi dan nomor hadits.",
            "parameters": {
                "type": "object",
                "properties": {
                    "kitab": {
                        "type": "string",
                        "description": "Nama perawi/kitab hadits",
                        "enum": ["bukhari", "muslim", "tirmidzi", "abu-daud", "nasai", "ibnu-majah"],
                    },
                    "nomor": {
                        "type": "integer",
                        "description": "Nomor urut hadits dalam kitab tersebut",
                    },
                },
                "required": ["kitab", "nomor"],
            },
        },
    },
]


class OllamaLLM:
    def __init__(self):
        self.base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
        self.model = os.getenv("OLLAMA_MODEL", "deepseek-r1:8b")
        self.quran_api = QuranAPI()
        self.hadith_api = HadithAPI()

    async def _execute_tool(self, function_name: str, arguments: dict) -> dict:
        if function_name == "get_quran_verse":
            return await self.quran_api.get_verse(
                surah=arguments["surah"], ayat=arguments["ayat"]
            )
        elif function_name == "get_hadith":
            return await self.hadith_api.get_hadith(
                kitab=arguments["kitab"], nomor=arguments["nomor"]
            )
        return {"status": "error", "message": "Unknown function"}

    async def chat(self, user_message: str, history: list[dict] = None, session_id: str = None) -> str:
        try:
            messages = list(history) if history else []
            messages.append({"role": "user", "content": user_message})

            response = ollama.chat(
                model=self.model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    *messages,
                ],
                tools=TOOLS,
            )

            message = response["message"]

            if "tool_calls" in message and message["tool_calls"]:
                for tool_call in message["tool_calls"]:
                    function_name = tool_call["function"]["name"]
                    arguments = tool_call["function"]["arguments"]
                    result = await self._execute_tool(function_name, arguments)
                    messages.append({"role": "assistant", "content": "", "tool_calls": message["tool_calls"]})
                    messages.append({"role": "tool", "content": str(result)})

                final_response = ollama.chat(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": SYSTEM_PROMPT},
                        *messages,
                    ],
                )
                assistant_message = final_response["message"]["content"]
            else:
                assistant_message = message["content"]

            messages.append({"role": "assistant", "content": assistant_message})

            # Update caller's history (keep last 20)
            if history is not None:
                history.clear()
                history.extend(messages[-20:])

            return assistant_message

        except Exception as e:
            return f"Maaf, terjadi kesalahan: {str(e)}"

    async def chat_stream(self, user_message: str, history: list[dict] = None, session_id: str = None):
        """SSE-compatible local flow with tool-result provenance."""
        messages = list(history) if history else []
        messages.append({"role": "user", "content": user_message})
        response = ollama.chat(model=self.model, messages=[{"role": "system", "content": SYSTEM_PROMPT}, *messages], tools=TOOLS)
        message = response["message"]
        sources = []
        if message.get("tool_calls"):
            for call in message["tool_calls"]:
                name, args = call["function"]["name"], call["function"]["arguments"]
                result = await self._execute_tool(name, args)
                source = source_from_tool(name, args, result)
                if source: sources.append(source)
                messages.extend([{"role": "assistant", "content": "", "tool_calls": message["tool_calls"]}, {"role": "tool", "content": str(result)}])
            final = ollama.chat(model=self.model, messages=[{"role": "system", "content": SYSTEM_PROMPT}, *messages])
            answer = final["message"]["content"]
        else:
            answer = message["content"]
        if sources:
            yield json.dumps({"type": "sources", "sources": sources})
        yield json.dumps({"type": "token", "text": answer})
        yield json.dumps({"type": "done"})


def create_llm():
    return OllamaLLM()
