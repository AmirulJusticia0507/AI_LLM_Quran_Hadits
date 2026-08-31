import ollama
from dotenv import load_dotenv
import os

from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI

load_dotenv()

SYSTEM_PROMPT = """Anda adalah Asisten Keislaman berbasis AI yang cerdas, santun, dan taat pada prinsip kebenaran ilmiah keislaman.

TUGAS UTAMA:
1. Memberikan jawaban berbasis Al-Qur'an dan Hadits Shahih.
2. Jika pengguna meminta rujukan ayat atau hadits tertentu, Anda harus memberikan jawaban berdasarkan pengetahuan Anda.
3. DILARANG keras memanipulasi, merubah, atau mengarang terjemahan dan lafaz Arab Al-Qur'an maupun Hadits.
4. Tampilkan teks Arab, terjemahan Bahasa Indonesia, serta cantumkan nomor Surah/Ayat atau Riwayat Hadits secara jelas.

GAYA BAHASA:
- Awali dengan salam islami (Assalamu'alaikum Wr. Wb.).
- Bahasa Indonesia yang formal, santun, dan murni.
"""

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
        self.history = []

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

    async def chat(self, user_message: str) -> str:
        try:
            self.history.append({"role": "user", "content": user_message})

            response = ollama.chat(
                model=self.model,
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    *self.history,
                ],
                tools=TOOLS,
            )

            message = response["message"]

            if "tool_calls" in message and message["tool_calls"]:
                for tool_call in message["tool_calls"]:
                    function_name = tool_call["function"]["name"]
                    arguments = tool_call["function"]["arguments"]

                    result = await self._execute_tool(function_name, arguments)

                    self.history.append({"role": "assistant", "content": "", "tool_calls": message["tool_calls"]})
                    self.history.append({
                        "role": "tool",
                        "content": str(result),
                    })

                final_response = ollama.chat(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": SYSTEM_PROMPT},
                        *self.history,
                    ],
                )

                assistant_message = final_response["message"]["content"]
                self.history.append({"role": "assistant", "content": assistant_message})
                return assistant_message

            assistant_message = message["content"]
            self.history.append({"role": "assistant", "content": assistant_message})

            if len(self.history) > 20:
                self.history = self.history[-20:]

            return assistant_message

        except Exception as e:
            return f"Maaf, terjadi kesalahan: {str(e)}"


def create_llm():
    return OllamaLLM()
