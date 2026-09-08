from contextlib import asynccontextmanager
import time
from collections import defaultdict
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import json
import os

from app.models.schemas import ChatRequest, QuranVerseRequest, HadithRequest, ProviderSwitch, HadithSearchRequest
from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI
from app.llm.factory import get_llm

load_dotenv()

llm = None
llm_provider = os.getenv("LLM_PROVIDER", "ollama")


@asynccontextmanager
async def lifespan(app: FastAPI):
    global llm
    try:
        llm = get_llm()
    except Exception as e:
        print(f"Warning: LLM tidak tersedia: {e}")
    yield


app = FastAPI(
    title="AI LLM Qur'an & Hadits",
    description="Sistem Integrasi LLM dengan API Al-Qur'an dan Hadits",
    version="1.1.0",
    lifespan=lifespan,
)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SessionManager:
    """In-memory session store with TTL auto-cleanup."""

    def __init__(self, ttl_seconds: int = 1800):
        self.sessions: dict[str, list[dict]] = defaultdict(list)
        self.last_active: dict[str, float] = {}
        self.ttl = ttl_seconds

    def get_history(self, session_id: str) -> list[dict]:
        self._cleanup()
        return self.sessions[session_id]

    def add_message(self, session_id: str, message: dict):
        self.sessions[session_id].append(message)
        self.last_active[session_id] = time.time()

    def clear(self, session_id: str):
        self.sessions.pop(session_id, None)
        self.last_active.pop(session_id, None)

    def _cleanup(self):
        now = time.time()
        expired = [sid for sid, ts in self.last_active.items() if now - ts > self.ttl]
        for sid in expired:
            self.sessions.pop(sid, None)
            self.last_active.pop(sid, None)


session_mgr = SessionManager()
quran_api = QuranAPI()
hadith_api = HadithAPI()

# --- Rate limiting sederhana (sliding window in-memory, per IP) ---
RATE_LIMIT = int(os.getenv("CHAT_RATE_LIMIT", "30"))
RATE_WINDOW = 60
_rate_store: dict[str, list[float]] = {}


async def rate_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    hits = [t for t in _rate_store.get(ip, []) if now - t < RATE_WINDOW]
    if len(hits) >= RATE_LIMIT:
        raise HTTPException(
            status_code=429,
            detail="Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.",
        )
    hits.append(now)
    _rate_store[ip] = hits


@app.get("/api/health")
async def health():
    return {
        "status": "ok",
        "llm_configured": llm is not None,
        "llm_provider": os.getenv("LLM_PROVIDER", "none"),
    }


@app.get("/")
async def root():
    return {
        "message": "AI LLM Qur'an & Hadits API",
        "version": "1.1.0",
        "docs": "/docs",
    }


@app.post("/api/chat", dependencies=[Depends(rate_limit)])
async def chat(req: ChatRequest):
    if not llm:
        raise HTTPException(
            status_code=503,
            detail="LLM belum dikonfigurasi. Silakan isi GEMINI_API_KEY di .env atau jalankan Ollama.",
        )
    try:
        history = session_mgr.get_history(req.session_id)
        response = await llm.chat(req.message, history=history, session_id=req.session_id)
        return {"status": "success", "response": response, "session_id": req.session_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat/stream", dependencies=[Depends(rate_limit)])
async def chat_stream(req: ChatRequest):
    if not llm:
        raise HTTPException(
            status_code=503,
            detail="LLM belum dikonfigurasi. Silakan isi GEMINI_API_KEY di .env atau jalankan Ollama.",
        )
    if not hasattr(llm, "chat_stream"):
        raise HTTPException(
            status_code=501,
            detail="Streaming tidak didukung oleh provider LLM saat ini.",
        )

    async def event_generator():
        async for chunk in llm.chat_stream(req.message, session_id=req.session_id):
            yield f"data: {chunk}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@app.post("/api/quran/verse")
async def get_quran_verse(req: QuranVerseRequest):
    result = await quran_api.get_verse(surah=req.surah, ayat=req.ayat)
    if result["status"] == "error":
        raise HTTPException(status_code=404, detail=result["message"])
    return result


def _gemini_available() -> bool:
    key = os.getenv("GEMINI_API_KEY", "")
    return bool(key) and key != "your_api_key_here"


@app.get("/api/llm/providers")
async def list_providers():
    return {
        "active": llm_provider,
        "configured": llm is not None,
        "providers": [
            {"id": "ollama", "name": "Ollama (Lokal)", "available": True},
            {"id": "gemini", "name": "Gemini (Cloud)", "available": _gemini_available()},
        ],
    }


@app.post("/api/llm/provider")
async def switch_provider(req: ProviderSwitch):
    global llm, llm_provider
    if req.provider == "gemini" and not _gemini_available():
        raise HTTPException(status_code=400, detail="GEMINI_API_KEY belum diisi di .env")
    prev = os.getenv("LLM_PROVIDER")
    os.environ["LLM_PROVIDER"] = req.provider
    try:
        new_llm = get_llm()
    except Exception as e:
        if prev is None:
            os.environ.pop("LLM_PROVIDER", None)
        else:
            os.environ["LLM_PROVIDER"] = prev
        raise HTTPException(status_code=400, detail=str(e))
    llm = new_llm
    llm_provider = req.provider
    return {"status": "success", "active": req.provider}


@app.post("/api/quran/tafsir")
async def get_quran_tafsir(req: QuranVerseRequest):
    result = await quran_api.get_tafsir(surah=req.surah, ayat=req.ayat)
    if result["status"] == "error":
        raise HTTPException(status_code=404, detail=result["message"])
    return result


@app.get("/api/quran/search")
async def search_quran(q: str):
    result = await quran_api.search_verse(q)
    return result


@app.post("/api/hadith")
async def get_hadith(req: HadithRequest):
    result = await hadith_api.get_hadith(kitab=req.kitab, nomor=req.nomor)
    if result["status"] == "error":
        raise HTTPException(status_code=404, detail=result["message"])
    return result


@app.post("/api/hadith/search", dependencies=[Depends(rate_limit)])
async def search_hadith(req: HadithSearchRequest):
    result = await hadith_api.search_hadith(
        kitab=req.kitab, keyword=req.keyword, max_pages=req.max_pages
    )
    if result["status"] == "error":
        raise HTTPException(status_code=404, detail=result["message"])
    return result
