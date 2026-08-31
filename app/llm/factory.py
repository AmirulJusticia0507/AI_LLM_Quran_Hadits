from dotenv import load_dotenv
import os

load_dotenv()


def get_llm():
    provider = os.getenv("LLM_PROVIDER", "ollama")

    if provider == "ollama":
        from app.llm.ollama import create_llm
        return create_llm()
    elif provider == "gemini":
        from app.llm.gemini import create_llm
        return create_llm()
    else:
        raise ValueError(f"Provider '{provider}' belum didukung")
