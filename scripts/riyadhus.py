"""Parse the Riyadhus Shalihin SQL dump into numbered hadith records."""

from __future__ import annotations

import html
import re
from typing import Any

SOURCE_URL = (
    "https://raw.githubusercontent.com/irsyadulibad/hadits-database/"
    "db43bdaa70ee528a0e663c089d3dab5bb4d855f0/riyadhus-shalihin.sql"
)
EXPECTED_CHAPTERS = 372

_INSERT_RE = re.compile(
    r"INSERT INTO\s+`riyadhus_shalihin`\s*"
    r"\(`id`,\s*`kitab`,\s*`arab`,\s*`terjemah`\)\s*VALUES",
    re.IGNORECASE,
)
_INDO_NUMBER_RE = re.compile(
    r"(?:<[^>]+>\s*)+(\d{1,5})\.\s+", re.IGNORECASE
)
_ARAB_NUMBER_RE = re.compile(r"(?:^|\n)\s*(\d{1,5})\s*-\s+")
_ARAB_CHAPTER_RE = re.compile(r"\d+\s*-\s*(باب|كتاب|كتَاب)[^\n\r<]*")


def _find_statement_end(sql: str, start: int) -> int:
    in_string = False
    escaped = False
    for index in range(start, len(sql)):
        char = sql[index]
        if escaped:
            escaped = False
        elif in_string and char == "\\":
            escaped = True
        elif char == "'":
            in_string = not in_string
        elif char == ";" and not in_string:
            return index
    raise ValueError("Akhir statement INSERT Riyadhus Shalihin tidak ditemukan")


def _parse_sql_string(value: str) -> str:
    value = value.strip()
    if value.upper() == "NULL":
        return ""
    if len(value) < 2 or value[0] != "'" or value[-1] != "'":
        return value

    text = value[1:-1]
    decoded: list[str] = []
    index = 0
    escapes = {
        "0": "\0",
        "b": "\b",
        "n": "\n",
        "r": "\r",
        "t": "\t",
        "Z": "\x1a",
        "\\": "\\",
        "'": "'",
        '"': '"',
    }
    while index < len(text):
        char = text[index]
        if char == "\\" and index + 1 < len(text):
            index += 1
            char = text[index]
            decoded.append(escapes.get(char, char))
        else:
            decoded.append(char)
        index += 1
    return "".join(decoded)


def _split_sql_values(block: str) -> list[list[str]]:
    rows: list[list[str]] = []
    row: list[str] = []
    value_start = -1
    in_string = False
    escaped = False
    depth = 0

    for index, char in enumerate(block):
        if escaped:
            escaped = False
            continue
        if in_string and char == "\\":
            escaped = True
            continue
        if char == "'":
            in_string = not in_string
            continue
        if in_string:
            continue
        if char == "(":
            if depth == 0:
                row = []
                value_start = index + 1
            depth += 1
        elif char == ")" and depth:
            depth -= 1
            if depth == 0:
                row.append(block[value_start:index].strip())
                rows.append(row)
        elif char == "," and depth == 1:
            row.append(block[value_start:index].strip())
            value_start = index + 1
    return rows


def parse_sql_dump(sql: str) -> list[dict[str, Any]]:
    """Extract the source chapter rows without executing SQL."""
    chapters: list[dict[str, Any]] = []
    for match in _INSERT_RE.finditer(sql):
        end = _find_statement_end(sql, match.end())
        for values in _split_sql_values(sql[match.end():end]):
            if len(values) != 4:
                raise ValueError(
                    f"Baris SQL bab {len(chapters) + 1} memiliki "
                    f"{len(values)} kolom, seharusnya 4"
                )
            chapters.append(
                {
                    "id": int(values[0]),
                    "kitab": _parse_sql_string(values[1]),
                    "arab": _parse_sql_string(values[2]),
                    "terjemah": _parse_sql_string(values[3]),
                }
            )
    if not chapters:
        raise ValueError("Tidak menemukan INSERT Riyadhus Shalihin dalam SQL")
    return chapters


def _strip_html(text: str) -> str:
    text = re.sub(r"<br\s*/?>|<hr[^>]*>", "\n", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s+", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def _split_numbered(text: str, pattern: re.Pattern[str]) -> tuple[str, list[tuple[int, str]]]:
    matches = list(pattern.finditer(text))
    if not matches:
        return _strip_html(text), []
    opening = _strip_html(text[:matches[0].start()])
    items = [
        (
            int(match.group(1)),
            _strip_html(text[match.end():next_match.start() if next_match else len(text)]),
        )
        for match, next_match in zip(matches, [*matches[1:], None])
    ]
    return opening, items


def parse_chapters(chapters: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Flatten numbered chapter content while retaining chapter metadata."""
    records: list[dict[str, Any]] = []
    for chapter in chapters:
        translation = html.unescape(chapter["terjemah"])
        title_match = re.search(
            r"<h1[^>]*>([\s\S]*?)</h1>", translation, re.IGNORECASE
        )
        title = _strip_html(title_match.group(1)) if title_match else ""
        if title_match:
            translation = translation.replace(title_match.group(0), "", 1)

        arabic = chapter["arab"].replace("\r\n", "\n").replace("\r", "\n")
        arabic_title = _ARAB_CHAPTER_RE.search(arabic)
        if not title and arabic_title:
            title = _strip_html(arabic_title.group(0))
        if arabic_title:
            arabic = arabic[:arabic_title.start()] + arabic[arabic_title.end():]

        arabic = re.sub(r"<br\s*/?>", "\n", arabic, flags=re.IGNORECASE)
        arabic_matches = [
            match
            for match in _ARAB_NUMBER_RE.finditer(arabic)
            if not re.sub(
                r"[\u064B-\u065F\u0670]", "", arabic[match.end():].strip()
            ).startswith(("باب", "كتاب"))
        ]
        arabic_items = [
            (
                int(match.group(1)),
                _strip_html(
                    arabic[
                        match.end():
                        next_match.start() if next_match else len(arabic)
                    ]
                ),
            )
            for match, next_match in zip(
                arabic_matches, [*arabic_matches[1:], None]
            )
        ]

        _, translation_items = _split_numbered(translation, _INDO_NUMBER_RE)
        count = max(len(arabic_items), len(translation_items))
        for index in range(count):
            arabic_number, arabic_text = (
                arabic_items[index] if index < len(arabic_items) else (None, "")
            )
            translation_number, translation_text = (
                translation_items[index]
                if index < len(translation_items)
                else (None, "")
            )
            if not arabic_text and not translation_text:
                continue
            records.append(
                {
                    "number": len(records) + 1,
                    "arab": arabic_text,
                    "id": translation_text,
                    "chapter_number": int(chapter["id"]),
                    "chapter_title": title or f"Bab {chapter['id']}",
                    "chapter_hadith_number": index + 1,
                    "source_arab_number": arabic_number,
                    "source_translation_number": translation_number,
                }
            )
    if not records:
        raise ValueError("Tidak ada riwayat yang berhasil diparsing dari dataset")
    return records
