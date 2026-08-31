# Dokumentasi Sistem AI LLM Integration: Al-Qur'an & Hadits API

Dokumen ini berisi arsitektur sistem, spesifikasi API, prompt engineering, dan contoh implementasi Python untuk mengintegrasikan Large Language Model (LLM) dengan **API Al-Qur'an Digital** dan **API Hadits Rasulullah SAW**.

---

## 1. Arsitektur Sistem (Retrieval-Augmented Generation / Tool Calling)

Sistem ini menggunakan alur **LLM Function Calling / Tool Use** agar LLM dapat melakukan validasi rujukan ayat atau hadits secara akurat sebelum memberikan jawaban.

```
+---------------+      1. Prompt User      +-----------------+
|               | -----------------------> |                 |
|     User      |                          |    LLM Engine   |
|               | <----------------------- | (e.g. Gemini /  |
+---------------+    4. Jawaban Akhir      |     GPT-4o)     |
                                           +-----------------+
                                               |         ^
                             2. Call Tool /    |         | 3. Data Teks
                                Function       v         |    Ayat / Hadits
                                           +-----------------+
                                           |  API Integrator |
                                           |  (Python/Node)  |
                                           +-----------------+
                                               |         ^
                                               | Request | Response
                                               v         |
                                           +-----------------+
                                           | Public APIs     |
                                           | (Quran & Hadith)|
                                           +-----------------+
```

---

## 2. API Endpoint Rujukan

### A. Al-Qur'an Digital API

* **Provider:** Quran.com API v4 (atau EQuran.id)
* **Base URL:** `https://api.quran.com/api/v4` (atau `https://equran.id/api/v2`)
* **Endpoint Populer:**
  * `GET /verses/by_key/{chapter_id}:{verse_number}?translations=33` (Ambil ayat & terjemahan Bahasa Indonesia)
  * `GET /search?q={query}&language=id` (Pencarian kata kunci ayat)

### B. Hadits API

* **Provider:** Hadith API (Ghufron / Hadith API)
* **Base URL:** `https://hadis-api-id.vercel.app` (atau `https://api.hadith.gading.dev`)
* **Endpoint Populer:**
  * `GET /books/{perawi}/{nomor}` (Ambil hadits spesifik, misal: `bukhari`, `muslim`, `tirmidzi`)
  * `GET /books/{perawi}?range=1-10` (Ambil rentang hadits)

---

## 3. Skema Tool Calling (JSON Schema untuk LLM)

Berikut adalah definisi tool/fungsi yang perlu dideklarasikan ke sistem LLM:

```json
[
  {
    "name": "get_quran_verse",
    "description": "Mengambil teks Arab, Latin, dan terjemahan Bahasa Indonesia dari ayat Al-Qur'an berdasarkan nomor Surah dan Ayat.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "surah": {
          "type": "INTEGER",
          "description": "Nomor surah dalam Al-Qur'an (1 - 114)"
        },
        "ayat": {
          "type": "INTEGER",
          "description": "Nomor ayat dalam surah tersebut"
        }
      },
      "required": ["surah", "ayat"]
    }
  },
  {
    "name": "get_hadith",
    "description": "Mengambil matan Arab dan terjemahan hadits berdasarkan perawi dan nomor hadits.",
    "parameters": {
      "type": "OBJECT",
      "properties": {
        "kitab": {
          "type": "STRING",
          "description": "Nama perawi/kitab hadits (contoh: bukhari, muslim, tirmidzi, abu-daud, nasai, ibnu-majah)",
          "enum": ["bukhari", "muslim", "tirmidzi", "abu-daud", "nasai", "ibnu-majah"]
        },
        "nomor": {
          "type": "INTEGER",
          "description": "Nomor urut hadits dalam kitab tersebut"
        }
      },
      "required": ["kitab", "nomor"]
    }
  }
]
```

---

## 4. System Prompt untuk LLM

Gunakan System Prompt berikut agar agent LLM bersikap santun, akurat, dan tidak mengarang (halusinasi) dalil.

```markdown
Anda adalah Asisten Keislaman berbasis AI yang cerdas, santun, dan taat pada prinsip kebenaran ilmiah keislaman.

TUGAS UTAMA:
1. Memberikan jawaban berbasis Al-Qur'an dan Hadits Shahih.
2. Jika pengguna meminta rujukan ayat atau hadits tertentu, Anda WAJIB memanggil tool/fungsi `get_quran_verse` atau `get_hadith` untuk mengambil teks asli.
3. DILARANG keras memanipulasi, merubah, atau mengarang terjemahan dan lafaz Arab Al-Qur'an maupun Hadits.
4. Tampilkan teks Arab, teks Latin (opsional), terjemahan Bahasa Indonesia, serta cantumkan nomor Surah/Ayat atau Riwayat Hadits secara jelas.

GAYA BAHASA:
- Awali dengan salam islami (Assalamu'alaikum Wr. Wb.).
- Bahasa Indonesia yang formal, santun, dan murni.
```

---

## 5. Contoh Implementasi Kode (Python)

Berikut contoh implementasi lengkap menggunakan Python (`requests` untuk fetch API):

```python
import requests
import json

class IslamicDataFetcher:
    def __init__(self):
        self.quran_base_url = "https://equran.id/api/v2"
        self.hadith_base_url = "https://hadis-api-id.vercel.app"

    def get_quran_verse(self, surah: int, ayat: int) -> dict:
        try:
            url = f"{self.quran_base_url}/surat/{surah}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json().get('data', {})
                nama_surah = data.get('namaLatin')
              
                for item in data.get('ayat', []):
                    if item.get('nomorAyat') == ayat:
                        return {
                            "status": "success",
                            "surah": nama_surah,
                            "nomor_surah": surah,
                            "nomor_ayat": ayat,
                            "teks_arab": item.get('teksArab'),
                            "teks_latin": item.get('teksLatin'),
                            "terjemahan": item.get('teksIndonesia')
                        }
                return {"status": "error", "message": "Ayat tidak ditemukan"}
            return {"status": "error", "message": "Gagal menghubungi API Al-Qur'an"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def get_hadith(self, kitab: str, nomor: int) -> dict:
        try:
            url = f"{self.hadith_base_url}/books/{kitab.lower()}/{nomor}"
            response = requests.get(url)
            if response.status_code == 200:
                data = response.json().get('data', {})
                contents = data.get('contents', {})
                return {
                    "status": "success",
                    "kitab": data.get('name'),
                    "nomor": contents.get('number'),
                    "teks_arab": contents.get('arab'),
                    "terjemahan": contents.get('id')
                }
            return {"status": "error", "message": "Hadits tidak ditemukan"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    fetcher = IslamicDataFetcher()
  
    # Simulasi LLM memanggil Tool get_quran_verse
    quran_result = fetcher.get_quran_verse(surah=1, ayat=2)
    print("--- HASIL QURAN ---")
    print(json.dumps(quran_result, indent=2, ensure_ascii=False))
  
    # Simulasi LLM memanggil Tool get_hadith
    hadith_result = fetcher.get_hadith(kitab="bukhari", nomor=1)
    print("\n--- HASIL HADITS ---")
    print(json.dumps(hadith_result, indent=2, ensure_ascii=False))
```

---

## 6. Alur Kerja Integrasi LLM (Execution Flow)

1. **User Input:** *"Berikan saya ayat tentang keutamaan sabar di Surah Al-Baqarah ayat 153."*
2. **LLM Evaluation:** LLM mengenali kebutuhan data eksternal dan memicu tool calling:
   `get_quran_verse(surah=2, ayat=153)`
3. **Backend Action:** Backend Python mengeksekusi fungsi API dan mengembalikan JSON.
4. **Final Response Generation:** LLM menyusun balasan akhir yang rapi dan kontekstual kepada user berdasarkan payload JSON yang didapat.
