from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.models.schemas import ChatRequest, QuranVerseRequest, HadithRequest
from app.api.quran import QuranAPI
from app.api.hadith import HadithAPI
from app.llm.factory import get_llm

app = FastAPI(
    title="AI LLM Qur'an & Hadits",
    description="Sistem Integrasi LLM dengan API Al-Qur'an dan Hadits",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

quran_api = QuranAPI()
hadith_api = HadithAPI()
llm = None


@app.on_event("startup")
async def startup():
    global llm
    try:
        llm = get_llm()
    except Exception as e:
        print(f"Warning: LLM tidak tersedia: {e}")


@app.get("/")
async def root():
    return {
        "message": "AI LLM Qur'an & Hadits API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not llm:
        raise HTTPException(status_code=503, detail="LLM belum dikonfigurasi")
    try:
        response = await llm.chat(req.message)
        return {"status": "success", "response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
