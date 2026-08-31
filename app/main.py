from contextlib import asynccontextmanager
import time
from collections import defaultdict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import json
import os

from app.models.schemas import ChatRequest, QuranVerseRequest, HadithRequest
from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI
from app.llm.factory import get_llm

load_dotenv()

llm = None


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


@app.post("/api/chat")
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


@app.post("/api/chat/stream")
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
