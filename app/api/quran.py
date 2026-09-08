import httpx
from typing import Optional


class QuranAPI:
    BASE_URL = "https://equran.id/api/v2"

    async def get_verse(self, surah: int, ayat: int) -> dict:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{self.BASE_URL}/surat/{surah}")
                response.raise_for_status()

                data = response.json().get("data", {})
                nama_surah = data.get("namaLatin", "")

                for item in data.get("ayat", []):
                    if item.get("nomorAyat") == ayat:
                        # audio: keyed by qari number ("01".."05"); prefer 05 (Misyari Rasyid)
                        audio_map = item.get("audio", {}) or {}
                        audio_url = audio_map.get("05") or next(iter(audio_map.values()), "")
                        return {
                            "status": "success",
                            "surah": nama_surah,
                            "nomor_surah": surah,
                            "nomor_ayat": ayat,
                            "teks_arab": item.get("teksArab", ""),
                            "teks_latin": item.get("teksLatin", ""),
                            "terjemahan": item.get("teksIndonesia", ""),
                            "audio": audio_url,
                        }

                return {"status": "error", "message": "Ayat tidak ditemukan"}

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_tafsir(self, surah: int, ayat: int) -> dict:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{self.BASE_URL}/tafsir/{surah}")
                response.raise_for_status()

                data = response.json().get("data", {})
                nama_surah = data.get("namaLatin", "")

                for item in data.get("tafsir", []):
                    nomor = item.get("ayat", item.get("nomorAyat"))
                    if nomor == ayat:
                        return {
                            "status": "success",
                            "surah": nama_surah,
                            "nomor_surah": surah,
                            "nomor_ayat": ayat,
                            "tafsir": item.get("teks", ""),
                        }

                return {"status": "error", "message": "Tafsir tidak ditemukan"}

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def search_verse(self, query: str) -> dict:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.BASE_URL}/search", params={"q": query, "s": 0}
                )
                response.raise_for_status()

                data = response.json().get("data", {})
                return {
                    "status": "success",
                    "query": query,
                    "total": data.get("total", 0),
                    "results": data.get("data", []),
                }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}


class HadithAPI:
    BASE_URL = "https://hadis-api-id.vercel.app"

    async def get_hadith(self, kitab: str, nomor: int) -> dict:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.BASE_URL}/books/{kitab.lower()}/{nomor}"
                )
                response.raise_for_status()

                data = response.json().get("data", {})
                contents = data.get("contents", {})

                return {
                    "status": "success",
                    "kitab": data.get("name", ""),
                    "nomor": contents.get("number", 0),
                    "teks_arab": contents.get("arab", ""),
                    "terjemahan": contents.get("id", ""),
                }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}
