"""Import validated Quran, tafsir, hadith, and matan reference data into PostgreSQL."""

from __future__ import annotations

import argparse
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import httpx
from dotenv import load_dotenv
from psycopg import connect
from psycopg.types.json import Jsonb

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))


EQURAN = "https://equran.id/api/v2"
HADITH_API = "https://hadis-api-id.vercel.app"
MATAN_SOURCES = {
    "arbain-nawawi": "https://ournoor.com/api/v1/hadits",
    "bulughul-maram": "https://raw.githubusercontent.com/AhmedBaset/hadith-json/v1.2.0/db/by_book/other_books/bulugh_almaram.json",
}
HADITH_BOOKS = (
    "abu-dawud", "ahmad", "bukhari", "darimi", "ibnu-majah",
    "malik", "muslim", "nasai", "tirmidzi",
)


SCHEMA = """
CREATE TABLE IF NOT EXISTS reference_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    imported_at TIMESTAMPTZ NOT NULL
);
CREATE TABLE IF NOT EXISTS quran_surahs (
    id SMALLINT PRIMARY KEY CHECK (id BETWEEN 1 AND 114),
    name_arabic TEXT NOT NULL,
    name_latin TEXT NOT NULL,
    translated_name TEXT NOT NULL,
    revelation_place TEXT NOT NULL,
    verses_count SMALLINT NOT NULL,
    description TEXT NOT NULL,
    audio_full JSONB NOT NULL DEFAULT '{}'::jsonb,
    source_id TEXT NOT NULL REFERENCES reference_sources(id)
);
CREATE TABLE IF NOT EXISTS quran_verses (
    surah_id SMALLINT NOT NULL REFERENCES quran_surahs(id) ON DELETE CASCADE,
    verse_number SMALLINT NOT NULL,
    arabic_text TEXT NOT NULL,
    latin_text TEXT NOT NULL,
    translation_id TEXT NOT NULL,
    audio JSONB NOT NULL DEFAULT '{}'::jsonb,
    source_id TEXT NOT NULL REFERENCES reference_sources(id),
    PRIMARY KEY (surah_id, verse_number)
);
CREATE TABLE IF NOT EXISTS quran_tafsirs (
    surah_id SMALLINT NOT NULL REFERENCES quran_surahs(id) ON DELETE CASCADE,
    verse_number SMALLINT NOT NULL,
    content TEXT NOT NULL,
    source_id TEXT NOT NULL REFERENCES reference_sources(id),
    PRIMARY KEY (surah_id, verse_number),
    FOREIGN KEY (surah_id, verse_number)
        REFERENCES quran_verses(surah_id, verse_number) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS hadith_books (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    hadiths_count INTEGER NOT NULL,
    source_id TEXT NOT NULL REFERENCES reference_sources(id)
);
CREATE TABLE IF NOT EXISTS hadiths (
    book_slug TEXT NOT NULL REFERENCES hadith_books(slug) ON DELETE CASCADE,
    hadith_number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    translation_id TEXT NOT NULL,
    source_id TEXT NOT NULL REFERENCES reference_sources(id),
    PRIMARY KEY (book_slug, hadith_number)
);
CREATE INDEX IF NOT EXISTS hadith_translation_search
    ON hadiths USING GIN (to_tsvector('simple', translation_id));
CREATE TABLE IF NOT EXISTS matan_books (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    source_id TEXT NOT NULL REFERENCES reference_sources(id)
);
CREATE TABLE IF NOT EXISTS matan_chapters (
    book_slug TEXT NOT NULL REFERENCES matan_books(slug) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    arabic_title TEXT,
    PRIMARY KEY (book_slug, chapter_number)
);
CREATE TABLE IF NOT EXISTS matan_entries (
    book_slug TEXT NOT NULL REFERENCES matan_books(slug) ON DELETE CASCADE,
    entry_number INTEGER NOT NULL,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    arabic_text TEXT NOT NULL,
    translation_id TEXT,
    PRIMARY KEY (book_slug, entry_number),
    FOREIGN KEY (book_slug, chapter_number)
        REFERENCES matan_chapters(book_slug, chapter_number) ON DELETE CASCADE
);
"""


def fetch_json(client: httpx.Client, url: str, **kwargs):
    last_error = None
    for attempt in range(1, 4):
        try:
            response = client.get(url, **kwargs)
            response.raise_for_status()
            return response.json()
        except (httpx.HTTPError, ValueError) as exc:
            last_error = exc
            if attempt < 3:
                time.sleep(attempt * 2)
    raise RuntimeError(f"Gagal mengambil sumber {url}: {type(last_error).__name__}")


def upsert_source(db, source_id: str, name: str, url: str):
    db.execute(
        """INSERT INTO reference_sources (id, name, url, imported_at)
           VALUES (%s, %s, %s, %s)
           ON CONFLICT (id) DO UPDATE SET
             name=EXCLUDED.name, url=EXCLUDED.url, imported_at=EXCLUDED.imported_at""",
        (source_id, name, url, datetime.now(timezone.utc)),
    )


def execute_many(db, statement: str, rows):
    with db.cursor() as cursor:
        cursor.executemany(statement, rows)


def import_quran(db, client: httpx.Client):
    source_id = "equran-id-v2"
    upsert_source(db, source_id, "EQuran.id API v2", EQURAN)
    verse_total = 0
    tafsir_total = 0
    for number in range(1, 115):
        surah = fetch_json(client, f"{EQURAN}/surat/{number}")["data"]
        tafsir = fetch_json(client, f"{EQURAN}/tafsir/{number}")["data"]
        verses = surah.get("ayat", [])
        tafsirs = tafsir.get("tafsir", [])
        expected = int(surah["jumlahAyat"])
        if surah.get("nomor") != number or len(verses) != expected or len(tafsirs) != expected:
            raise ValueError(f"Data surah {number} tidak lengkap")

        db.execute(
            """INSERT INTO quran_surahs VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
               ON CONFLICT (id) DO UPDATE SET
                 name_arabic=EXCLUDED.name_arabic, name_latin=EXCLUDED.name_latin,
                 translated_name=EXCLUDED.translated_name,
                 revelation_place=EXCLUDED.revelation_place,
                 verses_count=EXCLUDED.verses_count, description=EXCLUDED.description,
                 audio_full=EXCLUDED.audio_full, source_id=EXCLUDED.source_id""",
            (number, surah["nama"], surah["namaLatin"], surah["arti"],
             surah["tempatTurun"], expected, surah.get("deskripsi", ""),
             Jsonb(surah.get("audioFull") or {}), source_id),
        )
        execute_many(db,
            """INSERT INTO quran_verses VALUES (%s,%s,%s,%s,%s,%s,%s)
               ON CONFLICT (surah_id, verse_number) DO UPDATE SET
                 arabic_text=EXCLUDED.arabic_text, latin_text=EXCLUDED.latin_text,
                 translation_id=EXCLUDED.translation_id, audio=EXCLUDED.audio,
                 source_id=EXCLUDED.source_id""",
            [(number, row["nomorAyat"], row["teksArab"], row.get("teksLatin", ""),
              row["teksIndonesia"], Jsonb(row.get("audio") or {}), source_id)
             for row in verses],
        )
        execute_many(db,
            """INSERT INTO quran_tafsirs VALUES (%s,%s,%s,%s)
               ON CONFLICT (surah_id, verse_number) DO UPDATE SET
                 content=EXCLUDED.content, source_id=EXCLUDED.source_id""",
            [(number, row.get("ayat", row.get("nomorAyat")), row["teks"], source_id)
             for row in tafsirs],
        )
        db.commit()
        verse_total += len(verses)
        tafsir_total += len(tafsirs)
        print(f"Quran {number:03}/114: {surah['namaLatin']} ({expected} ayat)", flush=True)
    if verse_total != 6236 or tafsir_total != 6236:
        raise ValueError(f"Jumlah ayat/tafsir tidak valid: {verse_total}/{tafsir_total}")
    return verse_total, tafsir_total


def import_hadith(db, client: httpx.Client):
    source_id = "hadis-api-id"
    upsert_source(db, source_id, "Hadis API Indonesia", HADITH_API)
    imported = 0
    for slug in HADITH_BOOKS:
        payload = fetch_json(
            client, f"{HADITH_API}/hadith/{slug}", params={"page": 1, "limit": 100000}
        )
        rows = payload.get("items", [])
        total = int(payload.get("total", 0))
        numbers = [int(row["number"]) for row in rows]
        if len(rows) != total or len(set(numbers)) != total:
            raise ValueError(f"Koleksi hadis {slug} tidak lengkap: {len(rows)}/{total}")
        db.execute(
            """INSERT INTO hadith_books VALUES (%s,%s,%s,%s)
               ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name,
                 hadiths_count=EXCLUDED.hadiths_count, source_id=EXCLUDED.source_id""",
            (slug, payload["name"], total, source_id),
        )
        execute_many(db,
            """INSERT INTO hadiths VALUES (%s,%s,%s,%s,%s)
               ON CONFLICT (book_slug, hadith_number) DO UPDATE SET
                 arabic_text=EXCLUDED.arabic_text,
                 translation_id=EXCLUDED.translation_id, source_id=EXCLUDED.source_id""",
            [(slug, int(row["number"]), row.get("arab") or "", row.get("id") or "", source_id)
             for row in rows],
        )
        db.commit()
        imported += total
        print(f"Hadis {slug}: {total} riwayat", flush=True)
    return imported


def import_matan(db, client: httpx.Client):
    from app.api.matan import parse_book

    imported = 0
    for slug, url in MATAN_SOURCES.items():
        source_id = f"matan-{slug}"
        parsed = parse_book(slug, fetch_json(client, url))
        upsert_source(db, source_id, parsed["source_name"], parsed["source_url"])
        db.execute(
            """INSERT INTO matan_books VALUES (%s,%s,%s,%s)
               ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,
                 author=EXCLUDED.author, source_id=EXCLUDED.source_id""",
            (slug, parsed["title"], parsed["author"], source_id),
        )
        execute_many(db,
            """INSERT INTO matan_chapters VALUES (%s,%s,%s,%s)
               ON CONFLICT (book_slug, chapter_number) DO UPDATE SET
                 title=EXCLUDED.title, arabic_title=EXCLUDED.arabic_title""",
            [(slug, row["id"], row["title"], row.get("arabic")) for row in parsed["chapters"]],
        )
        execute_many(db,
            """INSERT INTO matan_entries VALUES (%s,%s,%s,%s,%s,%s)
               ON CONFLICT (book_slug, entry_number) DO UPDATE SET
                 chapter_number=EXCLUDED.chapter_number, title=EXCLUDED.title,
                 arabic_text=EXCLUDED.arabic_text, translation_id=EXCLUDED.translation_id""",
            [(slug, row["number"], row["chapter"], row["title"], row["arabic"],
              row.get("translation")) for row in parsed["entries"]],
        )
        db.commit()
        imported += len(parsed["entries"])
        print(f"Matan {slug}: {len(parsed['entries'])} teks", flush=True)
    return imported


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--only", choices=("all", "quran", "hadith", "matan"), default="all",
        help="Dataset yang akan diimpor",
    )
    args = parser.parse_args()
    load_dotenv()
    database_url = os.getenv("DATABASE_URL", "")
    if "neon.tech" not in database_url:
        raise SystemExit("DATABASE_URL Neon belum dikonfigurasi")

    results = {}
    with connect(database_url, connect_timeout=15) as db:
        db.execute(SCHEMA)
        db.commit()
        with httpx.Client(timeout=90, follow_redirects=True) as client:
            if args.only in ("all", "quran"):
                results["quran_verses"], results["quran_tafsirs"] = import_quran(db, client)
            if args.only in ("all", "hadith"):
                results["hadiths"] = import_hadith(db, client)
            if args.only in ("all", "matan"):
                results["matan_entries"] = import_matan(db, client)

    print("Import selesai:", results, flush=True)


if __name__ == "__main__":
    main()
