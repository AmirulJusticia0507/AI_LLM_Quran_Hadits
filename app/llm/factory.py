from dotenv import load_dotenv
import os

from app.llm.gemini import create_llm

load_dotenv()


def get_llm():
    provider = os.getenv("LLM_PROVIDER", "gemini")

    if provider == "gemini":
        return create_llm()
    else:
        raise ValueError(f"Provider '{provider}' belum didukung")
