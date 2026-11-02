import asyncio
import re

import httpx

from app.api.reference_store import ReferenceStore, resolve_mode


class QuranAPI:
    BASE_URL = "https://equran.id/api/v2"

    def __init__(
        self,
        store: ReferenceStore | None = None,
        mode: str | None = None,
    ):
        self.store = store or ReferenceStore()
        self.mode = resolve_mode(mode)

    async def _cache(self, callback, *args) -> None:
        """Best-effort write-through cache; never break the online response."""
        if self.mode != "hybrid":
            return
        try:
            await asyncio.to_thread(callback, *args)
        except Exception:
            pass

    def _offline_only(self, message: str) -> dict:
        return {
            "status": "error",
            "source": "offline",
            "message": f"{message} Jalankan scripts/build_offline_db.py untuk mengisi database offline.",
        }

    async def get_surah(self, surah: int) -> dict:
        """Fetch all verses once, preserving the requested surah identity."""
        if not 1 <= surah <= 114:
            return {"status": "error", "message": "Nomor surah harus 1–114"}

        if self.mode != "online":
            local = await asyncio.to_thread(self.store.get_surah, surah)
            if local:
                return {**local, "source": "offline"}
            if self.mode == "local":
                return self._offline_only(f"Surah {surah} belum tersedia di database offline.")

        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                response = await client.get(f"{self.BASE_URL}/surat/{surah}")
                response.raise_for_status()
                data = response.json()["data"]
            if data.get("nomor") != surah or not data.get("ayat"):
                raise ValueError("Data surah tidak sesuai permintaan")
            verses = []
            for item in data["ayat"]:
                audio = item.get("audio", {}) or {}
                verses.append({
                    "status": "success", "surah": data["namaLatin"],
                    "nomor_surah": surah, "nomor_ayat": item["nomorAyat"],
                    "teks_arab": item["teksArab"], "teks_latin": item.get("teksLatin", ""),
                    "terjemahan": item["teksIndonesia"],
                    "audio": audio.get("05") or next(iter(audio.values()), ""),
                })
            if len(verses) != data["jumlahAyat"]:
                raise ValueError("Data ayat surah belum lengkap")
            await self._cache(self.store.save_surah, data)
            return {"status": "success", "nomor_surah": surah,
                    "surah": data["namaLatin"], "jumlah_ayat": len(verses),
                    "ayat": verses, "source": "online"}
        except (httpx.HTTPError, ValueError, KeyError, TypeError):
            return {"status": "error", "message": "Gagal mengambil surah lengkap. Silakan coba lagi."}

    async def get_verse(self, surah: int, ayat: int) -> dict:
        if self.mode != "online":
            local = await asyncio.to_thread(self.store.get_verse, surah, ayat)
            if local:
                return {**local, "source": "offline"}
            if self.mode == "local":
                return self._offline_only(
                    f"Ayat {surah}:{ayat} belum tersedia di database offline."
                )

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
                        existing = await asyncio.to_thread(self.store.get_surah, surah)
                        if not existing:
                            await self._cache(self.store.save_surah, data)
                        return {
                            "status": "success",
                            "surah": nama_surah,
                            "nomor_surah": surah,
                            "nomor_ayat": ayat,
                            "teks_arab": item.get("teksArab", ""),
                            "teks_latin": item.get("teksLatin", ""),
                            "terjemahan": item.get("teksIndonesia", ""),
                            "audio": audio_url,
                            "source": "online",
                        }

                return {"status": "error", "message": "Ayat tidak ditemukan"}

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_tafsir(self, surah: int, ayat: int) -> dict:
        if self.mode != "online":
            local = await asyncio.to_thread(self.store.get_tafsir, surah, ayat)
            if local:
                return {**local, "source": "offline"}
            if self.mode == "local":
                return self._offline_only(
                    f"Tafsir {surah}:{ayat} belum tersedia di database offline."
                )

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(f"{self.BASE_URL}/tafsir/{surah}")
                response.raise_for_status()

                data = response.json().get("data", {})
                nama_surah = data.get("namaLatin", "")

                for item in data.get("tafsir", []):
                    nomor = item.get("ayat", item.get("nomorAyat"))
                    if nomor == ayat:
                        content = item.get("teks", "")
                        await self._cache(self.store.save_tafsir, surah, ayat, content)
                        return {
                            "status": "success",
                            "surah": nama_surah,
                            "nomor_surah": surah,
                            "nomor_ayat": ayat,
                            "tafsir": content,
                            "source": "online",
                        }

                return {"status": "error", "message": "Tafsir tidak ditemukan"}

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_asbabun_nuzul(self, surah: int, ayat: int) -> dict:
        """Extract revelation context (asbabun nuzul) from tafsir text."""
        result = await self.get_tafsir(surah, ayat)
        if result.get("status") != "success":
            return result
        text = result.get("tafsir", "")
        if not text:
            return {"status": "success", "asbabun_nuzul": None,
                    "sumber": "Tafsir Kemenag via EQuran.id"}
        paragraphs = re.split(r"\n\s*\n", text)
        markers = (
            "sebab turunnya ayat", "asbabun nuzul", "asbab al-nuzul",
            "menurut riwayat", "didirik", "diterbitkan", "wa qulan",
            "dikenal dengan", "disebabkan", "al-nuzul", " sebab turun",
            "keniscayaan", "tidak turun", "sebab turun",
        )
        excluded_prefixes = ("berdasarkan ayat di atas", "sebab turunnya surah",
                             "berikut ayat sebelumnya", "sebab turunnya bab")
        context = next(
            (paragraph.strip() for paragraph in paragraphs
             if any(marker in paragraph.lower() for marker in markers)
             and not any(paragraph.lower().startswith(prefix) for prefix in excluded_prefixes)),
            None,
        )
        if context:
            context = re.sub(r"\s+", " ", context).strip()
        return {"status": "success", "asbabun_nuzul": context,
                "sumber": "Tafsir Kemenag via EQuran.id"}

    async def search_verse(self, query: str) -> dict:
        if self.mode != "online":
            local = await asyncio.to_thread(self.store.search_quran, query)
            has_local_quran = await asyncio.to_thread(self.store.has_quran)
            if local.get("total") or has_local_quran:
                return {**local, "status": "success", "source": "offline"}
            if self.mode == "local":
                return {
                    "status": "success",
                    "query": query,
                    "total": 0,
                    "results": [],
                    "source": "offline",
                    "message": "Database offline belum berisi data Al-Qur'an.",
                }

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
                    "source": "online",
                }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}
