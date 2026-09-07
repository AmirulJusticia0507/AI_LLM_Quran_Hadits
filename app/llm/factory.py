import os


def get_llm():
    provider = os.getenv("LLM_PROVIDER", "ollama")
    print(f"[FACTORY] LLM_PROVIDER={provider}")
    print(f"[FACTORY] GEMINI_API_KEY={'SET' if os.getenv('GEMINI_API_KEY') else 'NOT SET'}")

    if provider == "ollama":
        from app.llm.ollama import create_llm
        return create_llm()
    elif provider == "gemini":
        api_key = os.getenv("GEMINI_API_KEY")
        print(f"[FACTORY] GEMINI_API_KEY length: {len(api_key) if api_key else 0}")
        if not api_key or api_key == "your_api_key_here":
            raise ValueError("GEMINI_API_KEY belum diisi di environment variables")
        from app.llm.gemini import create_llm
        return create_llm()
    else:
        raise ValueError(f"Provider '{provider}' belum didukung")
