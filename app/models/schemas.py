from pydantic import BaseModel, Field
from typing import Literal
import uuid


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="Pesan dari user")
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()), description="Session ID percakapan")


class QuranVerseRequest(BaseModel):
    surah: int = Field(..., ge=1, le=114)
    ayat: int = Field(..., ge=1)


class HadithRequest(BaseModel):
    kitab: Literal["abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"]
    nomor: int = Field(..., ge=1)


class ProviderSwitch(BaseModel):
    provider: Literal["ollama", "gemini", "bazaarlink"]


class HadithSearchRequest(BaseModel):
    kitab: Literal["abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"]
    keyword: str = Field(..., min_length=1, max_length=100, description="Kata kunci terjemahan")
    max_pages: int = Field(default=8, ge=1, le=12, description="Halaman dipindai (20 hadits/halaman)")
