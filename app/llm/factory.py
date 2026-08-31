from dotenv import load_dotenv
import os

load_dotenv()


def get_llm():
    provider = os.getenv("LLM_PROVIDER", "ollama")

    if provider == "ollama":
        from app.llm.ollama import create_llm
        return create_llm()
    elif provider == "gemini":
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key or api_key == "your_api_key_here":
            raise ValueError("GEMINI_API_KEY belum diisi di .env")
        from app.llm.gemini import create_llm
        return create_llm()
    else:
        raise ValueError(f"Provider '{provider}' belum didukung")
