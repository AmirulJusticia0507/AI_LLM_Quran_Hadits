"""SQLite reference store for offline Qur'an, tafsir, and hadith data.

The store is intentionally synchronous so it can be used by both the FastAPI
layer (wrapped with ``asyncio.to_thread``) and the offline build script.

Mode is controlled by ``REFERENCE_MODE``:

``hybrid`` (default)
    Read the local database first. On a miss, call the online API and cache
    the result for the next request.
``local``
    Read the local database only. Never touch the network.
``online``
    Bypass the local database entirely (useful for tests and debugging).
"""

from __future__ import annotations

import json
import os
import re
import sqlite3
import threading
from pathlib import Path
from typing import Any, Iterable

DEFAULT_DB_PATH = "data/reference.sqlite3"
DEFAULT_MODE = "hybrid"
VALID_MODES = {"hybrid", "local", "online"}
QURAN_TOTAL_VERSES = 6236

SCHEMA = """
CREATE TABLE IF NOT EXISTS reference_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS quran_surahs (
    id INTEGER PRIMARY KEY CHECK (id BETWEEN 1 AND 114),
    name_arabic TEXT NOT NULL,
    name_latin TEXT NOT NULL,
    translated_name TEXT NOT NULL DEFAULT '',
    revelation_place TEXT NOT NULL DEFAULT '',
    verses_count INTEGER NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    audio_full TEXT NOT NULL DEFAULT '{}'
);
CREATE TABLE IF NOT EXISTS quran_verses (
    surah_id INTEGER NOT NULL,
    verse_number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL,
    latin_text TEXT NOT NULL DEFAULT '',
    translation_id TEXT NOT NULL,
    audio TEXT NOT NULL DEFAULT '{}',
    PRIMARY KEY (surah_id, verse_number)
);
CREATE TABLE IF NOT EXISTS quran_tafsirs (
    surah_id INTEGER NOT NULL,
    verse_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (surah_id, verse_number)
);
CREATE TABLE IF NOT EXISTS hadith_books (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    hadiths_count INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS hadiths (
    book_slug TEXT NOT NULL,
    hadith_number INTEGER NOT NULL,
    arabic_text TEXT NOT NULL DEFAULT '',
    translation_id TEXT NOT NULL DEFAULT '',
    PRIMARY KEY (book_slug, hadith_number)
);
CREATE INDEX IF NOT EXISTS idx_quran_verses_surah ON quran_verses(surah_id);
CREATE INDEX IF NOT EXISTS idx_hadiths_book ON hadiths(book_slug);
CREATE VIRTUAL TABLE IF NOT EXISTS quran_search USING fts5(
    translation_id,
    latin_text,
    surah_id UNINDEXED,
    verse_number UNINDEXED,
    tokenize = 'unicode61 remove_diacritics 2'
);
CREATE VIRTUAL TABLE IF NOT EXISTS hadith_search USING fts5(
    translation_id,
    book_slug UNINDEXED,
    hadith_number UNINDEXED,
    tokenize = 'unicode61 remove_diacritics 2'
);
"""

_TOKEN_RE = re.compile(r"[0-9A-Za-z\u0600-\u06FF]+")


def resolve_mode(mode: str | None = None) -> str:
    value = (mode or os.getenv("REFERENCE_MODE") or DEFAULT_MODE).strip().lower()
    return value if value in VALID_MODES else DEFAULT_MODE


def _fts_match(keyword: str, operator: str) -> str:
    """Turn free text into a safe FTS5 query with prefix matching."""
    tokens = _TOKEN_RE.findall(keyword)
    if not tokens:
        return ""
    return f" {operator} ".join(f'"{token}"*' for token in tokens)


def _fts_match_candidates(keyword: str) -> list[str]:
    candidates = [_fts_match(keyword, "AND"), _fts_match(keyword, "OR")]
    return [value for index, value in enumerate(candidates) if value and value not in candidates[:index]]


def _pick_audio(audio: dict | None) -> str:
    audio = audio or {}
    return audio.get("05") or next(iter(audio.values()), "")


class ReferenceStore:
    """Local-first SQLite store with FTS5 search."""

    def __init__(self, path: str | Path | None = None):
        raw_path = path or os.getenv("REFERENCE_DB_PATH") or DEFAULT_DB_PATH
        self.path = Path(raw_path).expanduser()
        self._schema_ready = False
        self._lock = threading.Lock()

    # ------------------------------------------------------------------ setup
    @property
    def exists(self) -> bool:
        try:
            return self.path.is_file() and self.path.stat().st_size > 0
        except OSError:
            return False

    def ensure_schema(self) -> None:
        """Create the schema on first use (also enables write-through caching)."""
        if self._schema_ready:
            return
        with self._lock:
            if self._schema_ready:
                return
            self.path.parent.mkdir(parents=True, exist_ok=True)
            connection = sqlite3.connect(self.path, timeout=30)
            try:
                connection.execute("PRAGMA journal_mode=WAL")
                connection.execute("PRAGMA synchronous=NORMAL")
                connection.executescript(SCHEMA)
                connection.commit()
            finally:
                connection.close()
            self._schema_ready = True

    def _read(self) -> sqlite3.Connection:
        if not self.exists:
            raise FileNotFoundError(self.path)
        connection = sqlite3.connect(self.path, timeout=15)
        connection.row_factory = sqlite3.Row
        return connection

    def _write(self) -> sqlite3.Connection:
        self.ensure_schema()
        connection = sqlite3.connect(self.path, timeout=30)
        connection.row_factory = sqlite3.Row
        return connection

    def optimize(self) -> None:
        if not self.exists:
            return
        connection = self._write()
        try:
            connection.execute("PRAGMA optimize")
            connection.commit()
        finally:
            connection.close()

    # --------------------------------------------------------------- qur'an
    def has_quran(self) -> bool:
        if not self.exists:
            return False
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return False
        try:
            return bool(
                connection.execute(
                    "SELECT EXISTS(SELECT 1 FROM quran_verses LIMIT 1)"
                ).fetchone()[0]
            )
        except sqlite3.Error:
            return False
        finally:
            connection.close()

    def surah_complete(self, surah: int) -> bool:
        """True when a surah and its tafsir are both fully stored."""
        if not self.exists:
            return False
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return False
        try:
            row = connection.execute(
                "SELECT verses_count FROM quran_surahs WHERE id = ?", (surah,)
            ).fetchone()
            if not row or not row["verses_count"]:
                return False
            verses = connection.execute(
                "SELECT COUNT(*) FROM quran_verses WHERE surah_id = ?", (surah,)
            ).fetchone()[0]
            tafsirs = connection.execute(
                "SELECT COUNT(*) FROM quran_tafsirs WHERE surah_id = ?", (surah,)
            ).fetchone()[0]
            return verses == row["verses_count"] and tafsirs == row["verses_count"]
        except sqlite3.Error:
            return False
        finally:
            connection.close()

    def get_surah(self, surah: int) -> dict | None:
        if not self.exists:
            return None
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return None
        try:
            surah_row = connection.execute(
                "SELECT * FROM quran_surahs WHERE id = ?", (surah,)
            ).fetchone()
            if not surah_row:
                return None
            rows = connection.execute(
                "SELECT * FROM quran_verses WHERE surah_id = ? ORDER BY verse_number",
                (surah,),
            ).fetchall()
            if not rows or len(rows) != surah_row["verses_count"]:
                return None
            verses = [
                {
                    "status": "success",
                    "surah": surah_row["name_latin"],
                    "nomor_surah": surah,
                    "nomor_ayat": row["verse_number"],
                    "teks_arab": row["arabic_text"],
                    "teks_latin": row["latin_text"],
                    "terjemahan": row["translation_id"],
                    "audio": _pick_audio(json.loads(row["audio"] or "{}")),
                }
                for row in rows
            ]
            return {
                "status": "success",
                "nomor_surah": surah,
                "surah": surah_row["name_latin"],
                "jumlah_ayat": len(verses),
                "ayat": verses,
            }
        except (sqlite3.Error, ValueError):
            return None
        finally:
            connection.close()

    def get_verse(self, surah: int, ayat: int) -> dict | None:
        if not self.exists:
            return None
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return None
        try:
            row = connection.execute(
                """SELECT v.*, s.name_latin
                   FROM quran_verses v
                   JOIN quran_surahs s ON s.id = v.surah_id
                   WHERE v.surah_id = ? AND v.verse_number = ?""",
                (surah, ayat),
            ).fetchone()
            if not row:
                return None
            return {
                "status": "success",
                "surah": row["name_latin"],
                "nomor_surah": surah,
                "nomor_ayat": ayat,
                "teks_arab": row["arabic_text"],
                "teks_latin": row["latin_text"],
                "terjemahan": row["translation_id"],
                "audio": _pick_audio(json.loads(row["audio"] or "{}")),
            }
        except (sqlite3.Error, ValueError):
            return None
        finally:
            connection.close()

    def get_tafsir(self, surah: int, ayat: int) -> dict | None:
        if not self.exists:
            return None
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return None
        try:
            row = connection.execute(
                """SELECT t.content, s.name_latin
                   FROM quran_tafsirs t
                   JOIN quran_surahs s ON s.id = t.surah_id
                   WHERE t.surah_id = ? AND t.verse_number = ?""",
                (surah, ayat),
            ).fetchone()
            if not row:
                return None
            return {
                "status": "success",
                "surah": row["name_latin"],
                "nomor_surah": surah,
                "nomor_ayat": ayat,
                "tafsir": row["content"],
            }
        except sqlite3.Error:
            return None
        finally:
            connection.close()

    def save_surah(self, data: dict) -> int:
        """Persist an EQuran ``data`` payload (surah + all verses + FTS rows)."""
        surah_id = int(data["nomor"])
        verses = data.get("ayat") or []
        connection = self._write()
        try:
            connection.execute(
                """INSERT INTO quran_surahs
                   (id, name_arabic, name_latin, translated_name, revelation_place,
                    verses_count, description, audio_full)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                   ON CONFLICT(id) DO UPDATE SET
                     name_arabic = excluded.name_arabic,
                     name_latin = excluded.name_latin,
                     translated_name = excluded.translated_name,
                     revelation_place = excluded.revelation_place,
                     verses_count = excluded.verses_count,
                     description = excluded.description,
                     audio_full = excluded.audio_full""",
                (
                    surah_id,
                    data.get("nama", ""),
                    data.get("namaLatin", ""),
                    data.get("arti", ""),
                    data.get("tempatTurun", ""),
                    int(data.get("jumlahAyat") or len(verses)),
                    data.get("deskripsi", ""),
                    json.dumps(data.get("audioFull") or {}, ensure_ascii=False),
                ),
            )
            for row in verses:
                number = int(row["nomorAyat"])
                connection.execute(
                    """INSERT INTO quran_verses
                       (surah_id, verse_number, arabic_text, latin_text, translation_id, audio)
                       VALUES (?, ?, ?, ?, ?, ?)
                       ON CONFLICT(surah_id, verse_number) DO UPDATE SET
                         arabic_text = excluded.arabic_text,
                         latin_text = excluded.latin_text,
                         translation_id = excluded.translation_id,
                         audio = excluded.audio""",
                    (
                        surah_id,
                        number,
                        row.get("teksArab", ""),
                        row.get("teksLatin", ""),
                        row.get("teksIndonesia", ""),
                        json.dumps(row.get("audio") or {}, ensure_ascii=False),
                    ),
                )
                rowid = surah_id * 1000 + number
                connection.execute("DELETE FROM quran_search WHERE rowid = ?", (rowid,))
                connection.execute(
                    """INSERT INTO quran_search
                       (rowid, translation_id, latin_text, surah_id, verse_number)
                       VALUES (?, ?, ?, ?, ?)""",
                    (
                        rowid,
                        row.get("teksIndonesia", ""),
                        row.get("teksLatin", ""),
                        surah_id,
                        number,
                    ),
                )
            connection.commit()
            return len(verses)
        finally:
            connection.close()

    def save_tafsir(self, surah: int, ayat: int, content: str) -> None:
        self.save_tafsirs(surah, [(ayat, content)])

    def save_tafsirs(self, surah: int, items: Iterable[tuple[int, str]]) -> int:
        """Persist many tafsir rows for one surah in a single transaction."""
        connection = self._write()
        try:
            saved = 0
            for ayat, content in items:
                connection.execute(
                    """INSERT INTO quran_tafsirs (surah_id, verse_number, content)
                       VALUES (?, ?, ?)
                       ON CONFLICT(surah_id, verse_number) DO UPDATE SET
                         content = excluded.content""",
                    (surah, ayat, content),
                )
                saved += 1
            connection.commit()
            return saved
        finally:
            connection.close()

    def search_quran(self, query: str, limit: int = 20) -> dict:
        empty = {
            "query": query,
            "total": 0,
            "results": [],
            "scanned": 0,
            "expected": QURAN_TOTAL_VERSES,
            "partial": True,
        }
        if not self.exists:
            return empty
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return empty
        try:
            stored = connection.execute(
                "SELECT COUNT(*) FROM quran_verses"
            ).fetchone()[0]
            coverage = {
                "scanned": stored,
                "expected": QURAN_TOTAL_VERSES,
                "partial": stored < QURAN_TOTAL_VERSES,
            }
            for match in _fts_match_candidates(query):
                total = connection.execute(
                    "SELECT COUNT(*) FROM quran_search WHERE quran_search MATCH ?",
                    (match,),
                ).fetchone()[0]
                if not total:
                    continue
                rows = connection.execute(
                    """SELECT v.surah_id, v.verse_number, v.arabic_text, v.latin_text,
                              v.translation_id, s.name_latin
                       FROM quran_search
                       JOIN quran_verses v
                         ON v.surah_id = quran_search.surah_id
                        AND v.verse_number = quran_search.verse_number
                       JOIN quran_surahs s ON s.id = v.surah_id
                       WHERE quran_search MATCH ?
                       ORDER BY rank
                       LIMIT ?""",
                    (match, limit),
                ).fetchall()
                return {
                    "query": query,
                    "total": total,
                    "results": [
                        {
                            "surah": row["name_latin"],
                            "nomor_surah": row["surah_id"],
                            "nomor_ayat": row["verse_number"],
                            "teks_arab": row["arabic_text"],
                            "teks_latin": row["latin_text"],
                            "terjemahan": row["translation_id"],
                        }
                        for row in rows
                    ],
                    **coverage,
                }
            return {**empty, **coverage}
        except sqlite3.Error:
            return empty
        finally:
            connection.close()

    # --------------------------------------------------------------- hadith
    def get_hadith_book(self, kitab: str) -> dict | None:
        if not self.exists:
            return None
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return None
        try:
            row = connection.execute(
                "SELECT * FROM hadith_books WHERE slug = ?", (kitab,)
            ).fetchone()
            if not row:
                return None
            actual = connection.execute(
                "SELECT COUNT(*) FROM hadiths WHERE book_slug = ?", (kitab,)
            ).fetchone()[0]
            return {
                "slug": row["slug"],
                "name": row["name"],
                "hadiths_count": row["hadiths_count"],
                "stored": actual,
            }
        except sqlite3.Error:
            return None
        finally:
            connection.close()

    def get_hadith(self, kitab: str, nomor: int) -> dict | None:
        if not self.exists:
            return None
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return None
        try:
            row = connection.execute(
                """SELECT h.*, b.name
                   FROM hadiths h
                   JOIN hadith_books b ON b.slug = h.book_slug
                   WHERE h.book_slug = ? AND h.hadith_number = ?""",
                (kitab, nomor),
            ).fetchone()
            if not row:
                return None
            return {
                "status": "success",
                "kitab": row["name"],
                "nomor": row["hadith_number"],
                "teks_arab": row["arabic_text"],
                "terjemahan": row["translation_id"],
            }
        except sqlite3.Error:
            return None
        finally:
            connection.close()

    def save_hadith_book(
        self, kitab: str, name: str, total: int, rows: Iterable[dict]
    ) -> int:
        connection = self._write()
        try:
            connection.execute(
                """INSERT INTO hadith_books (slug, name, hadiths_count)
                   VALUES (?, ?, ?)
                   ON CONFLICT(slug) DO UPDATE SET
                     name = excluded.name,
                     hadiths_count = excluded.hadiths_count""",
                (kitab, name, total),
            )
            saved = 0
            for row in rows:
                self._upsert_hadith(connection, kitab, row)
                saved += 1
            connection.commit()
            return saved
        finally:
            connection.close()

    def save_hadith(
        self, kitab: str, kitab_name: str, nomor: int, arab: str, terjemahan: str
    ) -> None:
        connection = self._write()
        try:
            connection.execute(
                """INSERT INTO hadith_books (slug, name, hadiths_count)
                   VALUES (?, ?, 0)
                   ON CONFLICT(slug) DO UPDATE SET name = excluded.name""",
                (kitab, kitab_name),
            )
            self._upsert_hadith(
                connection,
                kitab,
                {"number": nomor, "arab": arab, "id": terjemahan},
            )
            connection.commit()
        finally:
            connection.close()

    def _upsert_hadith(
        self, connection: sqlite3.Connection, kitab: str, row: dict
    ) -> None:
        nomor = int(row["number"])
        arab = row.get("arab") or ""
        terjemahan = row.get("id") or ""
        connection.execute(
            """INSERT INTO hadiths
               (book_slug, hadith_number, arabic_text, translation_id)
               VALUES (?, ?, ?, ?)
               ON CONFLICT(book_slug, hadith_number) DO UPDATE SET
                 arabic_text = excluded.arabic_text,
                 translation_id = excluded.translation_id""",
            (kitab, nomor, arab, terjemahan),
        )
        connection.execute(
            "DELETE FROM hadith_search WHERE book_slug = ? AND hadith_number = ?",
            (kitab, nomor),
        )
        connection.execute(
            """INSERT INTO hadith_search
               (translation_id, book_slug, hadith_number)
               VALUES (?, ?, ?)""",
            (terjemahan, kitab, nomor),
        )

    def search_hadith(self, kitab: str, keyword: str, limit: int = 20) -> dict:
        empty = {
            "matches": [],
            "match_total": 0,
            "scanned": 0,
            "total": 0,
            "partial": False,
        }
        book = self.get_hadith_book(kitab)
        if not book:
            return empty
        empty["scanned"] = book["stored"]
        empty["total"] = book["hadiths_count"] or book["stored"]
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return empty
        try:
            for match in _fts_match_candidates(keyword):
                match_total = connection.execute(
                    """SELECT COUNT(*) FROM hadith_search
                       WHERE hadith_search MATCH ? AND book_slug = ?""",
                    (match, kitab),
                ).fetchone()[0]
                if not match_total:
                    continue
                rows = connection.execute(
                    """SELECT h.hadith_number, h.arabic_text, h.translation_id
                       FROM hadith_search
                       JOIN hadiths h
                         ON h.book_slug = hadith_search.book_slug
                        AND h.hadith_number = hadith_search.hadith_number
                       WHERE hadith_search MATCH ? AND hadith_search.book_slug = ?
                       ORDER BY rank
                       LIMIT ?""",
                    (match, kitab, limit),
                ).fetchall()
                return {
                    "matches": [
                        {
                            "number": row["hadith_number"],
                            "arab": row["arabic_text"],
                            "id": row["translation_id"],
                        }
                        for row in rows
                    ],
                    "match_total": match_total,
                    "scanned": book["stored"],
                    "total": book["hadiths_count"] or book["stored"],
                    "partial": False,
                }
            return empty
        except sqlite3.Error:
            return empty
        finally:
            connection.close()

    # ---------------------------------------------------------------- status
    def stats(self) -> dict[str, Any]:
        result: dict[str, Any] = {
            "path": str(self.path),
            "exists": self.exists,
            "quran_surahs": 0,
            "quran_verses": 0,
            "quran_tafsirs": 0,
            "hadith_books": 0,
            "hadiths": 0,
            "imported_at": None,
        }
        if not self.exists:
            return result
        try:
            connection = self._read()
        except (FileNotFoundError, sqlite3.Error):
            return result
        try:
            result["quran_surahs"] = connection.execute(
                "SELECT COUNT(*) FROM quran_surahs"
            ).fetchone()[0]
            result["quran_verses"] = connection.execute(
                "SELECT COUNT(*) FROM quran_verses"
            ).fetchone()[0]
            result["quran_tafsirs"] = connection.execute(
                "SELECT COUNT(*) FROM quran_tafsirs"
            ).fetchone()[0]
            result["hadith_books"] = connection.execute(
                "SELECT COUNT(*) FROM hadith_books"
            ).fetchone()[0]
            result["hadiths"] = connection.execute(
                "SELECT COUNT(*) FROM hadiths"
            ).fetchone()[0]
            row = connection.execute(
                "SELECT value FROM reference_meta WHERE key = 'imported_at'"
            ).fetchone()
            if row:
                result["imported_at"] = row["value"]
        except sqlite3.Error:
            pass
        finally:
            connection.close()
        return result

    def set_meta(self, key: str, value: str) -> None:
        connection = self._write()
        try:
            connection.execute(
                """INSERT INTO reference_meta (key, value) VALUES (?, ?)
                   ON CONFLICT(key) DO UPDATE SET value = excluded.value""",
                (key, value),
            )
            connection.commit()
        finally:
            connection.close()
