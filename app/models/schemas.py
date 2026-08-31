from pydantic import BaseModel
from typing import Literal


class ChatRequest(BaseModel):
    message: str


class QuranVerseRequest(BaseModel):
    surah: int
    ayat: int


class HadithRequest(BaseModel):
    kitab: Literal["abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"]
    nomor: int
