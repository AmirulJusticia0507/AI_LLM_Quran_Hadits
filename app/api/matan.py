"""Readers for curated editions; content is fetched from the named sources, not LLMs."""
import asyncio
import time
import unicodedata
from typing import Literal

import httpx

BookId = Literal["arbain-nawawi", "bulughul-maram"]
SOURCES = {
    "arbain-nawawi": "https://ournoor.com/api/v1/hadits",
    "bulughul-maram": "https://raw.githubusercontent.com/AhmedBaset/hadith-json/v1.2.0/db/by_book/other_books/bulugh_almaram.json",
}
CHAPTER_NAMES = ["Bersuci", "Shalat", "Jenazah", "Zakat", "Puasa", "Haji", "Jual beli", "Pernikahan", "Jinayat", "Hudud", "Jihad", "Makanan", "Sumpah dan nazar", "Peradilan", "Memerdekakan budak", "Adab dan akhlak"]


def normalize(text: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", text.casefold())
                   if not unicodedata.combining(c) and c != "ـ")


def clean_text(value) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError("Teks sumber kosong")
    return value.strip()


def parse_book(book: BookId, payload: dict) -> dict:
    if book == "arbain-nawawi":
        rows = [{"number": int(row["no"]), "title": clean_text(row["judul"]),
                 "arabic": clean_text(row["arab"]), "translation": clean_text(row["indo"]),
                 "chapter": 1} for row in payload["data"]]
        chapters = [{"id": 1, "title": "Seluruh hadits"}]
        title, author = "Arba’in Nawawi", "Imam an-Nawawi"
        source_name, source_url = "Noor — API Arba’in Nawawi", "https://ournoor.com/muslim-api/hadits/"
        note = "42 hadits. Teks Arab dan terjemahan Indonesia mengikuti sumber Noor; teks dapat menyertakan perawi serta keterangan riwayat."
        if {r["number"] for r in rows} != set(range(1, 43)):
            raise ValueError("Koleksi Arba’in tidak lengkap")
    else:
        chapters = [{"id": int(c["id"]), "title": CHAPTER_NAMES[int(c["id"]) - 1],
                     "arabic": clean_text(c["arabic"])} for c in payload["chapters"]]
        rows = [{"number": int(row["idInBook"]), "title": f"Teks nomor {row['idInBook']}",
                 "arabic": clean_text(row["arabic"]), "translation": None,
                 "chapter": int(row["chapterId"])} for row in payload["hadiths"]]
        title, author = "Bulughul Maram", "Ibnu Hajar al-Asqalani"
        source_name, source_url = "AhmedBaset/hadith-json v1.2.0 — bersumber dari Sunnah.com", "https://github.com/AhmedBaset/hadith-json/tree/v1.2.0"
        note = "Penomoran mengikuti idInBook dataset v1.2.0, bukan nomor universal semua cetakan. Teks Arab dapat memuat takhrij dan catatan sumber. Terjemahan Indonesia belum tersedia pada edisi ini."
        if len(chapters) != 16 or len(rows) != 1767:
            raise ValueError("Edisi Bulughul Maram tidak lengkap")
    numbers = [row["number"] for row in rows]
    chapter_ids = {c["id"] for c in chapters}
    if len(set(numbers)) != len(numbers) or any(r["chapter"] not in chapter_ids for r in rows):
        raise ValueError("Identitas teks sumber tidak valid")
    return {"id": book, "title": title, "author": author, "note": note,
            "source_name": source_name, "source_url": source_url, "chapters": chapters,
            "entries": sorted(rows, key=lambda r: r["number"])}


class MatanAPI:
    def __init__(self):
        self._cache = {}
        self._locks = {key: asyncio.Lock() for key in SOURCES}

    async def _load(self, book: BookId) -> dict:
        async with self._locks[book]:
            cached = self._cache.get(book)
            if cached and cached[0] > time.monotonic():
                return cached[1]
            async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
                response = await client.get(SOURCES[book])
                response.raise_for_status()
                result = parse_book(book, response.json())
            self._cache[book] = (time.monotonic() + 3600, result)
            return result

    async def browse(self, book: BookId, query: str = "", chapter: int | None = None, page: int = 1) -> dict:
        data = await self._load(book)
        needle = normalize(query.strip())
        chapter_titles = {c["id"]: c["title"] for c in data["chapters"]}
        entries = [row for row in data["entries"] if chapter is None or row["chapter"] == chapter]
        if needle.isdecimal():
            entries = [row for row in entries if row["number"] == int(needle)]
        elif needle:
            entries = [row for row in entries if needle in normalize(" ".join([
                row["title"], row["arabic"], row["translation"] or "", chapter_titles[row["chapter"]],
            ]))]
        pages = max(1, (len(entries) + 4) // 5)
        selected_page = min(page, pages)
        start = (selected_page - 1) * 5
        return {**{k: v for k, v in data.items() if k != "entries"},
                "total": len(data["entries"]), "matched": len(entries), "page": selected_page,
                "pages": pages, "items": entries[start:start + 5]}
