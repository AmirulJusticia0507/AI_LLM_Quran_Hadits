import sys, os, glob, re, json
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')

html_dir = 'data/kode27/bulughul.maram-main'
files = glob.glob(os.path.join(html_dir, '*.html'))
files = [f for f in files if not os.path.basename(f).startswith('index')]

hadith_dict = {}

def clean_text(s: str) -> str:
    s = re.sub(r'[\r\n\t]+', ' ', s)
    s = re.sub(r'\s{2,}', ' ', s)
    return s.strip()

for fpath in files:
    fname = os.path.basename(fpath)
    with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()
    
    # Fix known issues in HTML before parsing:
    if fname == '12waktus.html':
        # replace second HADITS KE-139 with HADITS KE-140
        idx1 = html.find('HADITS KE-139')
        if idx1 != -1:
            idx2 = html.find('HADITS KE-139', idx1 + 10)
            if idx2 != -1:
                html = html[:idx2] + 'HADITS KE-140' + html[idx2 + len('HADITS KE-139'):]
    elif fname == '44syaratjualbeli.html':
        # insert HADITS KE-630 before Abu Ayyub al-Anshari
        target = 'وَعَنْ أَبِي   أَيُّوبَ اَلْأَنْصَارِيِّ'
        if target in html:
            html = html.replace(target, '<p>HADITS KE-630</p>' + target, 1)

    soup = BeautifulSoup(html, 'html.parser')
    h3 = soup.find('h3')
    bab = h3.get_text(strip=True) if h3 else ""
    bab = clean_text(bab.replace('Tentang', '').strip())
    
    chunks = re.split(r'HADITS\s+KE-(\d+)', html, flags=re.IGNORECASE)
    for i in range(1, len(chunks), 2):
        num = int(chunks[i])
        chunk_html = chunks[i+1]
        c_soup = BeautifulSoup(chunk_html, 'html.parser')
        
        arab_parts = []
        for el in c_soup.find_all(attrs={"lang": re.compile(r'ar', re.I)}):
            t = el.get_text(separator=' ', strip=True)
            if re.search(r'[\u0600-\u06FF]', t):
                arab_parts.append(t)
        
        if not arab_parts:
            for el in c_soup.find_all(attrs={"dir": "rtl"}):
                t = el.get_text(separator=' ', strip=True)
                if re.search(r'[\u0600-\u06FF]', t):
                    arab_parts.append(t)
        
        arab = clean_text(" ".join(arab_parts))
        
        ps = c_soup.find_all('p')
        indo_parts = []
        for p in ps:
            ptxt = p.get_text(separator=' ', strip=True)
            if not ptxt:
                continue
            if 'HADITS KE-' in ptxt.upper():
                continue
            if len(re.findall(r'[\u0600-\u06FF]', ptxt)) > len(ptxt) * 0.4:
                continue
            indo_parts.append(ptxt)
        
        indo = clean_text(" ".join(indo_parts))
        
        if num not in hadith_dict or len(indo) > len(hadith_dict[num]['id']):
            hadith_dict[num] = {
                "number": num,
                "bab": bab,
                "arab": arab,
                "id": indo,
            }

items = [hadith_dict[k] for k in sorted(hadith_dict.keys())]
print(f'Total extracted: {len(items)}')
print(f'Range: {items[0]["number"]} to {items[-1]["number"]}')

missing = [i for i in range(1, items[-1]["number"] + 1) if i not in hadith_dict]
print(f'Missing numbers: {len(missing)} {missing}')

empty_arab = [it for it in items if not it["arab"]]
empty_id = [it for it in items if not it["id"]]
print(f'Empty arab: {len(empty_arab)}, Empty id: {len(empty_id)}')

# Save JSON
out1 = 'data/bulughul-maram.json'
with open(out1, 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

out2 = 'frontend/src/data/bulughul-maram.json'
with open(out2, 'w', encoding='utf-8') as f:
    json.dump(items, f, ensure_ascii=False, indent=2)

print(f'Saved {len(items)} hadiths to {out1} and {out2}')
