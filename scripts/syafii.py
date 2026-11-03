"""Parse the Musnad Asy-Syafi'i SQL dump into numbered hadith records."""

from __future__ import annotations

import re
from typing import Any
from scripts.riyadhus import (
    _find_statement_end,
    _parse_sql_string,
    _split_sql_values,
    _strip_html,
)

SOURCE_URL = (
    "https://raw.githubusercontent.com/irsyadulibad/hadits-database/"
    "master/musnad-syafii.sql"
)
EXPECTED_HADITHS = 1800

_INSERT_RE = re.compile(
    r"INSERT INTO\s+`musnad_syafii`\s*"
    r"\(`id`,\s*`kitab`,\s*`arab`,\s*`terjemah`\)\s*VALUES",
    re.IGNORECASE,
)


def parse_sql_dump(sql: str) -> list[dict[str, Any]]:
    """Extract hadith records from the SQL dump."""
    hadiths: list[dict[str, Any]] = []
    for match in _INSERT_RE.finditer(sql):
        end = _find_statement_end(sql, match.end())
        for values in _split_sql_values(sql[match.end():end]):
            if len(values) != 4:
                raise ValueError(
                    f"Baris SQL hadits {len(hadiths) + 1} memiliki "
                    f"{len(values)} kolom, seharusnya 4"
                )
            num = int(values[0])
            arab = _strip_html(_parse_sql_string(values[2]))
            indo = _strip_html(_parse_sql_string(values[3]))

            # Bersihkan prefix seperti "مسند الشافعي 1: " atau "Musnad Syafi'i 1: " jika ada
            arab_clean = re.sub(r"^مسند\s+الشافعي\s+\d+\s*:\s*", "", arab).strip()
            indo_clean = re.sub(r"^Musnad\s+Syafi'?i\s+\d+\s*:\s*", "", indo, flags=re.IGNORECASE).strip()

            hadiths.append(
                {
                    "number": num,
                    "arab": arab_clean or arab,
                    "id": indo_clean or indo,
                    "chapter_number": None,
                    "chapter_title": "",
                    "chapter_hadith_number": num,
                    "source_arab_number": num,
                    "source_translation_number": num,
                }
            )
    if not hadiths:
        raise ValueError("Tidak menemukan INSERT musnad_syafii dalam SQL")
    return sorted(hadiths, key=lambda h: h["number"])
