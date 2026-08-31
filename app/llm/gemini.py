import json
import google.generativeai as genai
from dotenv import load_dotenv
import os

from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI
from app.llm.tools import TOOLS

load_dotenv()

SYSTEM_PROMPT = """Anda adalah Asisten Keislaman berbasis AI yang cerdas, santun, dan taat pada prinsip kebenaran ilmiah keislaman.

TUGAS UTAMA:
1. Memberikan jawaban berbasis Al-Qur'an dan Hadits Shahih.
2. Jika pengguna meminta rujukan ayat atau hadits tertentu, Anda WAJIB memanggil tool/fungsi untuk mengambil teks asli.
3. DILARANG keras memanipulasi, merubah, atau mengarang terjemahan dan lafaz Arab Al-Qur'an maupun Hadits.
4. Tampilkan teks Arab, terjemahan Bahasa Indonesia, serta cantumkan nomor Surah/Ayat atau Riwayat Hadits secara jelas.

GAYA BAHASA:
- Awali dengan salam islami (Assalamu'alaikum Wr. Wb.).
- Bahasa Indonesia yang formal, santun, dan murni.
"""


class GeminiLLM:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY tidak ditemukan di .env")

        genai.configure(api_key=api_key)
        model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

        self.model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=SYSTEM_PROMPT,
            tools=TOOLS,
        )
        self.chat = self.model.start_chat(history=[])
        self.quran_api = QuranAPI()
        self.hadith_api = HadithAPI()

    async def _execute_tool(self, function_call) -> dict:
        name = function_call.name
        args = dict(function_call.args)

        if name == "get_quran_verse":
            return await self.quran_api.get_verse(
                surah=args["surah"], ayat=args["ayat"]
            )
        elif name == "get_hadith":
            return await self.hadith_api.get_hadith(
                kitab=args["kitab"], nomor=args["nomor"]
            )
        return {"status": "error", "message": "Unknown function"}

    async def chat(self, user_message: str) -> str:
        try:
            response = self.chat.send_message(user_message)

            while response.candidates[0].content.parts:
                has_function_call = any(
                    hasattr(part, "function_call") and part.function_call
                    for part in response.candidates[0].content.parts
                )

                if not has_function_call:
                    break

                function_responses = []
                for part in response.candidates[0].content.parts:
                    if hasattr(part, "function_call") and part.function_call:
                        result = await self._execute_tool(part.function_call)
                        function_responses.append(
                            {
                                "function_response": {
                                    "name": part.function_call.name,
                                    "response": result,
                                }
                            }
                        )

                response = self.chat.send_message(function_responses)

            return response.text

        except Exception as e:
            return f"Maaf, terjadi kesalahan: {str(e)}"


def create_llm():
    return GeminiLLM()
