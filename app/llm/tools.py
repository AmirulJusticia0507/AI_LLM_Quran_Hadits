from pydantic import BaseModel
from typing import Literal


class QuranVerseParams(BaseModel):
    surah: int
    ayat: int


class HadithParams(BaseModel):
    kitab: Literal["abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"]
    nomor: int


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

TOOLS = [QURAN_TOOL, HADITH_TOOL]
