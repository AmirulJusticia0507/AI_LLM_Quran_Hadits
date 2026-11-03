import sys, sqlite3, json, re
sys.stdout.reconfigure(encoding='utf-8')

con = sqlite3.connect(':memory:')
sql = open('data/hisnul_muslim.sql', encoding='utf-8').read()
con.executescript(sql)
cur = con.cursor()

cur.execute('''
    SELECT 
        d.id, 
        d.group_id, 
        g.in_title, 
        d.ar_dua, 
        d.in_translation, 
        d.in_reference
    FROM dua d
    JOIN dua_group g ON d.group_id = g.id
    ORDER BY d.id
''')

rows = cur.fetchall()
doas = []
for r in rows:
    num = r[0]
    group_id = r[1]
    kategori = (r[2] or "").strip()
    arab = (r[3] or "").strip()
    indo = (r[4] or "").strip()
    sumber = (r[5] or "").strip()
    
    # Clean redundant whitespace
    indo = re.sub(r'\s+', ' ', indo)
    arab = re.sub(r'\s+', ' ', arab)
    sumber = re.sub(r'\s+', ' ', sumber)
    
    doas.append({
        "id": num,
        "group_id": group_id,
        "kategori": kategori,
        "judul": kategori,
        "arab": arab,
        "arti": indo,
        "sumber": sumber
    })

print(f"Extracted {len(doas)} Hisnul Muslim items")
print("Sample #1:", doas[0])
print("Sample #267:", doas[-1])

# Write files
with open('data/hisnul-muslim.json', 'w', encoding='utf-8') as f:
    json.dump(doas, f, ensure_ascii=False, indent=2)

with open('frontend/src/data/hisnul-muslim.json', 'w', encoding='utf-8') as f:
    json.dump(doas, f, ensure_ascii=False, indent=2)

print("Saved to data/hisnul-muslim.json and frontend/src/data/hisnul-muslim.json")
