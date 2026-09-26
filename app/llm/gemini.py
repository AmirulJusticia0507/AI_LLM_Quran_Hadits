import json
import asyncio
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from dotenv import load_dotenv
import os

from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI
from app.llm.tools import TOOLS
from app.llm.prompt import SYSTEM_PROMPT

load_dotenv()

SAFETY_SETTINGS = {
    HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
    HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
    HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
    HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE,
}

# Keep enough room for a complete Arabic source, its Indonesian translation,
# and the surrounding explanation. The model may still choose to end earlier.
GENERATION_CONFIG = genai.types.GenerationConfig(
    max_output_tokens=8192,
    temperature=0.45,
)


class GeminiLLM:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY tidak ditemukan di .env")

        genai.configure(api_key=api_key)
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        self.quran_api = QuranAPI()
        self.hadith_api = HadithAPI()
        self.chats: dict[str, object] = {}

    def _get_chat(self, session_id: str):
        if session_id not in self.chats:
            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=SYSTEM_PROMPT,
                tools=TOOLS,
                safety_settings=SAFETY_SETTINGS,
                generation_config=GENERATION_CONFIG,
            )
            self.chats[session_id] = model.start_chat(history=[])
        return self.chats[session_id]

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

    def _extract_text(self, response) -> str:
        try:
            if response.candidates and response.candidates[0].content.parts:
                text_parts = [
                    part.text
                    for part in response.candidates[0].content.parts
                    if hasattr(part, "text") and part.text
                ]
                if text_parts:
                    return "".join(text_parts)
            return ""
        except (AttributeError, IndexError):
            return ""

    async def chat(self, user_message: str, history: list[dict] = None, session_id: str = None) -> str:
        try:
            chat_session = self._get_chat(session_id or "default")
            response = chat_session.send_message(
                user_message,
                safety_settings=SAFETY_SETTINGS,
                generation_config=GENERATION_CONFIG,
            )

            while response.candidates and response.candidates[0].content.parts:
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

                response = chat_session.send_message(
                    function_responses,
                    safety_settings=SAFETY_SETTINGS,
                    generation_config=GENERATION_CONFIG,
                )

            text = self._extract_text(response)
            if not text:
                return "Maaf, tidak dapat memproses jawaban. Silakan coba pertanyaan lain."
            return text

        except Exception as e:
            error_msg = str(e)
            if "SAFETY" in error_msg.upper() or "blocked" in error_msg.lower():
                return "Maaf, jawaban diblokir oleh filter keamanan. Silakan coba dengan pertanyaan yang lebih spesifik."
            return f"Maaf, terjadi kesalahan: {error_msg}"

    async def chat_stream(self, user_message: str, session_id: str = None):
        """Generator for SSE streaming."""
        try:
            chat_session = self._get_chat(session_id or "default")

            response = chat_session.send_message(
                user_message,
                safety_settings=SAFETY_SETTINGS,
                generation_config=GENERATION_CONFIG,
                stream=True,
            )

            full_text = ""
            for _ in range(5):
                function_calls = []
                for chunk in response:
                    if not chunk.candidates or not chunk.candidates[0].content.parts:
                        continue
                    for part in chunk.candidates[0].content.parts:
                        if hasattr(part, "function_call") and part.function_call:
                            function_calls.append(part.function_call)
                        elif hasattr(part, "text") and part.text:
                            text = part.text
                            full_text += text
                            yield json.dumps({"type": "token", "text": text})

                if not function_calls:
                    break

                function_responses = []
                for function_call in function_calls:
                    result = await self._execute_tool(function_call)
                    function_responses.append(
                        {
                            "function_response": {
                                "name": function_call.name,
                                "response": result,
                            }
                        }
                    )
                # Start a new stream from the tool result. Previously this
                # response was discarded, so a sourced answer could end early.
                response = chat_session.send_message(
                    function_responses,
                    safety_settings=SAFETY_SETTINGS,
                    generation_config=GENERATION_CONFIG,
                    stream=True,
                )
            else:
                yield json.dumps({"type": "error", "message": "Batas pengambilan dalil tercapai. Silakan ulangi pertanyaan dengan fokus yang lebih spesifik."}) + "\n"
                return

            if not full_text:
                yield json.dumps({"type": "token", "text": "Maaf, tidak dapat memproses jawaban. Silakan coba pertanyaan lain."}) + "\n"

            yield json.dumps({"type": "done"}) + "\n"

        except Exception as e:
            error_msg = str(e)
            if "SAFETY" in error_msg.upper() or "blocked" in error_msg.lower():
                yield json.dumps({"type": "error", "message": "Jawaban diblokir oleh filter keamanan."}) + "\n"
            else:
                yield json.dumps({"type": "error", "message": f"Terjadi kesalahan: {error_msg}"}) + "\n"


def create_llm():
    return GeminiLLM()
