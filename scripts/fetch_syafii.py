"""Fetch Musnad Asy-Syafi'i from SQL dump and save as JSON."""
import sys, json, pathlib, re
sys.stdout.reconfigure(encoding='utf-8')

import httpx

URL = (
    "https://raw.githubusercontent.com/irsyadulibad/hadits-database/"
    "master/musnad-syafii.sql"
)

print("Fetching SQL dump...")
resp = httpx.get(URL, timeout=120, follow_redirects=True)
sql = resp.content.decode('utf-8', errors='replace')
print(f"Downloaded {len(sql):,} chars")

# --- inline parser (avoids import issues) ---
_INSERT_RE = re.compile(
    r"INSERT INTO\s+`musnad_syafii`\s*"
    r"\(`id`,\s*`kitab`,\s*`arab`,\s*`terjemah`\)\s*VALUES",
    re.IGNORECASE,
)

def _find_statement_end(text: str, start: int) -> int:
    pos = start
    in_string = False
    escape_next = False
    while pos < len(text):
        ch = text[pos]
        if escape_next:
            escape_next = False
        elif ch == '\\' and in_string:
            escape_next = True
        elif ch == "'" and not in_string:
            in_string = True
        elif ch == "'" and in_string:
            in_string = False
        elif ch == ';' and not in_string:
            return pos
        pos += 1
    return pos

def _parse_sql_string(s: str) -> str:
    s = s.strip()
    if s.upper() == 'NULL':
        return ''
    if s.startswith("'") and s.endswith("'"):
        s = s[1:-1]
    s = s.replace("\\'", "'").replace('\\\\', '\\').replace('\\n', '\n').replace('\\r', '')
    return s

def _split_sql_values(chunk: str) -> list:
    rows = []
    chunk = chunk.strip().lstrip('(')
    i = 0
    while i < len(chunk):
        row_vals = []
        while True:
            chunk_rest = chunk[i:].lstrip()
            if chunk_rest.startswith("'"):
                # string value
                j = i + chunk[i:].index("'") + 1
                while j < len(chunk):
                    if chunk[j] == '\\':
                        j += 2
                    elif chunk[j] == "'":
                        j += 1
                        break
                    else:
                        j += 1
                # find actual start of string (accounting for lstrip)
                start = i + (len(chunk[i:]) - len(chunk[i:].lstrip()))
                start_q = chunk.index("'", i)
                end_q = start_q + 1
                while end_q < len(chunk):
                    if chunk[end_q] == '\\':
                        end_q += 2
                    elif chunk[end_q] == "'":
                        end_q += 1
                        break
                    else:
                        end_q += 1
                row_vals.append(chunk[start_q:end_q])
                i = end_q
            else:
                # non-string (number or NULL)
                end = i
                while end < len(chunk) and chunk[end] not in (',', ')'):
                    end += 1
                row_vals.append(chunk[i:end].strip())
                i = end
            # after value: skip comma or close paren
            while i < len(chunk) and chunk[i] in (' ', '\t', '\n', '\r'):
                i += 1
            if i < len(chunk):
                if chunk[i] == ',':
                    i += 1  # next value in same row
                    # peek: if next non-space is '(', it's a new row
                    j = i
                    while j < len(chunk) and chunk[j] in (' ', '\t', '\n', '\r'):
                        j += 1
                    if j < len(chunk) and chunk[j] == '(':
                        # new row
                        rows.append(row_vals)
                        i = j + 1
                        break
                    continue
                elif chunk[i] == ')':
                    i += 1
                    rows.append(row_vals)
                    # skip ", (" for next row
                    while i < len(chunk) and chunk[i] in (' ', '\t', '\n', '\r', ','):
                        i += 1
                    if i < len(chunk) and chunk[i] == '(':
                        i += 1
                    break
            else:
                rows.append(row_vals)
            break
    return rows

print(f"INSERT matches: {len(list(_INSERT_RE.finditer(sql)))}")

hadiths = []
for match in _INSERT_RE.finditer(sql):
    end = _find_statement_end(sql, match.end())
    rows = _split_sql_values(sql[match.end():end])
    for values in rows:
        if len(values) != 4:
            continue
        num = int(values[0])
        arab = _parse_sql_string(values[2])
        indo = _parse_sql_string(values[3])
        arab_clean = re.sub(r"^مسند\s+الشافعي\s+\d+\s*:\s*", "", arab).strip()
        indo_clean = re.sub(r"^Musnad\s+Syafi'?i\s+\d+\s*:\s*", "", indo, flags=re.IGNORECASE).strip()
        hadiths.append({
            "number": num,
            "arab": arab_clean or arab,
            "id": indo_clean or indo,
            "chapter_number": None,
            "chapter_title": "",
        })

hadiths.sort(key=lambda h: h["number"])
print(f"Total parsed: {len(hadiths)} hadits")
if hadiths:
    print(f"First: #{hadiths[0]['number']} | Last: #{hadiths[-1]['number']}")
    print(f"Sample arab[0]: {hadiths[0]['arab'][:80]}")
    print(f"Sample id[0]: {hadiths[0]['id'][:80]}")

out = pathlib.Path("data/musnad-syafii-parsed.json")
out.write_text(json.dumps(hadiths, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Saved to {out}")
