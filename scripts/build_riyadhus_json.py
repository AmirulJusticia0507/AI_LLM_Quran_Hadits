import sys, os
sys.path.insert(0, '.')
sys.stdout.reconfigure(encoding='utf-8')

import httpx, json
from scripts.riyadhus import SOURCE_URL, parse_sql_dump, parse_chapters

print("Downloading Riyadhus Shalihin SQL dump...")
resp = httpx.get(SOURCE_URL, timeout=60, follow_redirects=True)
sql = resp.content.decode('utf-8', errors='replace')
print(f"Downloaded {len(sql):,} chars")

print("Parsing SQL chapters...")
chapters = parse_sql_dump(sql)
print(f"Parsed {len(chapters)} chapters")

print("Extracting hadith records...")
records = parse_chapters(chapters)
print(f"Total extracted: {len(records)} hadiths")

if records:
    print(f"First (#1): Bab {records[0]['chapter_title']} | {records[0]['id'][:60]}")
    print(f"Last (#{records[-1]['number']}): Bab {records[-1]['chapter_title']} | {records[-1]['id'][:60]}")

with open("data/riyadhus-shalihin.json", "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

with open("frontend/src/data/riyadhus-shalihin.json", "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print("Saved to data/riyadhus-shalihin.json and frontend/src/data/riyadhus-shalihin.json")
