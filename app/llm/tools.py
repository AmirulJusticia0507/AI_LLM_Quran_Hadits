from pydantic import BaseModel
from typing import Literal


class QuranVerseParams(BaseModel):
    surah: int
    ayat: int


class HadithParams(BaseModel):
    kitab: Literal["abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"]
    nomor: int


class QuranSearchParams(BaseModel):
    query: str


class HadithSearchParams(BaseModel):
    kitab: str
    query: str


QURAN_TOOL = {
    "name": "get_quran_verse",
    "description": "Mengambil teks Arab, Latin, dan terjemahan Bahasa Indonesia dari ayat Al-Qur'an berdasarkan nomor Surah dan Ayat.",
    "parameters": {
        "type": "OBJECT",
        "properties": {
            "surah": {
                "type": "INTEGER",
                "description": "Nomor surah dalam Al-Qur'an (1 - 114)",
            },
            "ayat": {
                "type": "INTEGER",
                "description": "Nomor ayat dalam surah tersebut",
            },
        },
        "required": ["surah", "ayat"],
    },
}

HADITH_TOOL = {
    "name": "get_hadith",
    "description": "Mengambil matan Arab dan terjemahan hadits berdasarkan perawi dan nomor hadits.",
    "parameters": {
        "type": "OBJECT",
        "properties": {
            "kitab": {
                "type": "STRING",
                "description": "Nama perawi/kitab hadits",
                "enum": ["abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"],
            },
            "nomor": {
                "type": "INTEGER",
                "description": "Nomor urut hadits dalam kitab tersebut",
            },
        },
        "required": ["kitab", "nomor"],
    },
}

QURAN_SEARCH_TOOL = {
    "name": "search_quran",
    "description": "Mencari kandidat ayat Al-Qur'an berdasarkan kata kunci terjemahan. Setelah mendapat kandidat, ambil ayat lengkap dengan get_quran_verse sebelum mengutipnya.",
    "parameters": {"type": "OBJECT", "properties": {"query": {"type": "STRING", "description": "Kata kunci Bahasa Indonesia, maksimal beberapa kata."}}, "required": ["query"]},
}

HADITH_SEARCH_TOOL = {
    "name": "search_hadith",
    "description": "Mencari kandidat hadits dalam satu kitab berdasarkan kata kunci terjemahan. Setelah mendapat kandidat, ambil teks lengkap dengan get_hadith sebelum mengutipnya.",
    "parameters": {"type": "OBJECT", "properties": {"kitab": {"type": "STRING", "enum": ["abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi", "riyadhus-shalihin", "arbain-nawawi", "musnad-syafii", "bulughul-maram"]}, "query": {"type": "STRING"}}, "required": ["kitab", "query"]},
}

TOOLS = [QURAN_TOOL, HADITH_TOOL, QURAN_SEARCH_TOOL, HADITH_SEARCH_TOOL]


def source_from_tool(name: str, args: dict, result: dict) -> dict | None:
    """Make an auditable source event only from a successful full-text lookup."""
    if result.get("status") != "success":
        return None
    if name == "get_quran_verse":
        return {"type": "quran", "surah": result.get("surah"), "surah_number": result.get("nomor_surah", args.get("surah")), "verse": result.get("nomor_ayat", args.get("ayat")), "source": result.get("source", "unknown"), "excerpt": result.get("terjemahan", "")[:220]}
    if name == "get_hadith":
        return {"type": "hadith", "kitab": result.get("kitab", args.get("kitab")), "number": result.get("nomor", args.get("nomor")), "source": result.get("source", "unknown"), "excerpt": result.get("terjemahan", "")[:220]}
    return None
