import asyncio

import httpx

from app.api.reference_store import ReferenceStore, resolve_mode


class HadithAPI:
    BASE_URL = "https://hadis-api-id.vercel.app"

    AVAILABLE_BOOKS = [
        "abu-dawud",
        "ahmad",
        "bukhari",
        "darimi",
        "ibnu-majah",
        "malik",
        "muslim",
        "nasai",
        "nasai-4",
        "nasai-5",
        "tirmidzi",
        "riyadhus-shalihin",
        "arbain-nawawi",
    ]
    OFFLINE_ONLY_BOOKS = {"riyadhus-shalihin", "arbain-nawawi"}

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

    def _invalid_book(self) -> dict:
        return {
            "status": "error",
            "message": f"Kitab tidak tersedia. Pilih: {', '.join(self.AVAILABLE_BOOKS)}",
        }

    def _offline_only_error(self, kitab: str) -> dict:
        return {
            "status": "error",
            "source": "offline",
            "message": (
                f"Kitab {kitab} hanya tersedia dari database offline. "
                "Jalankan scripts/build_offline_db.py --only hadith dan gunakan "
                "REFERENCE_MODE=hybrid atau local."
            ),
        }

    @staticmethod
    def _load_arbain_json() -> list[dict]:
        from pathlib import Path
        import json
        path = Path("data/arbain-nawawi.json")
        if not path.is_file():
            return []
        try:
            with open(path, "r", encoding="utf-8") as f:
                payload = json.load(f)
            return payload.get("data", [])
        except Exception:
            return []

    def _get_arbain_builtin(self, nomor: int) -> dict | None:
        items = self._load_arbain_json()
        for item in items:
            if int(item.get("no", 0)) == nomor:
                return {
                    "status": "success",
                    "kitab": "Arba'in An-Nawawi",
                    "nomor": nomor,
                    "teks_arab": item.get("arab", ""),
                    "terjemahan": item.get("indo", ""),
                    "bab": item.get("judul", ""),
                    "nomor_bab": 1,
                    "nomor_dalam_bab": nomor,
                    "source": "offline",
                }
        return None

    async def get_hadith(self, kitab: str, nomor: int) -> dict:
        kitab_lower = kitab.lower()
        if kitab_lower not in self.AVAILABLE_BOOKS:
            return self._invalid_book()

        if self.mode != "online":
            local = await asyncio.to_thread(self.store.get_hadith, kitab_lower, nomor)
            if local:
                return {**local, "source": "offline"}
            if kitab_lower == "arbain-nawawi":
                builtin = self._get_arbain_builtin(nomor)
                if builtin:
                    return builtin
            if self.mode == "local":
                return {
                    "status": "error",
                    "source": "offline",
                    "message": (
                        f"Hadits {kitab_lower} #{nomor} belum tersedia di database offline. "
                        "Jalankan scripts/build_offline_db.py untuk mengisi database offline."
                    ),
                }

        if kitab_lower == "arbain-nawawi":
            builtin = self._get_arbain_builtin(nomor)
            if builtin:
                return builtin

        if kitab_lower in self.OFFLINE_ONLY_BOOKS:
            return self._offline_only_error(kitab_lower)

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.BASE_URL}/hadith/{kitab_lower}/{nomor}"
                )
                response.raise_for_status()

                data = response.json()
                name = data.get("name", kitab.title())
                arab = data.get("arab", "")
                terjemahan = data.get("id", "")
                await self._cache(
                    self.store.save_hadith,
                    kitab_lower,
                    name,
                    int(data.get("number", nomor)),
                    arab,
                    terjemahan,
                )

                return {
                    "status": "success",
                    "kitab": name,
                    "nomor": data.get("number", nomor),
                    "teks_arab": arab,
                    "terjemahan": terjemahan,
                    "source": "online",
                }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def search_hadith(self, kitab: str, keyword: str, max_pages: int = 8) -> dict:
        """Cari kata kunci dalam terjemahan.

        Bila database offline sudah memuat kitab tersebut secara lengkap,
        pencarian dilakukan lewat FTS5 sehingga mencakup seluruh riwayat.
        Jika belum, pencarian memindai halaman pertama API (hasil parsial)
        dan melaporkan ``scanned``/``total`` secara jujur.
        """
        kitab_lower = kitab.lower()
        if kitab_lower not in self.AVAILABLE_BOOKS:
            return self._invalid_book()

        if kitab_lower in self.OFFLINE_ONLY_BOOKS:
            if self.mode != "online":
                book = await asyncio.to_thread(
                    self.store.get_hadith_book, kitab_lower
                )
                if book and book["stored"] > 0:
                    local = await asyncio.to_thread(
                        self.store.search_hadith, kitab_lower, keyword
                    )
                    return {
                        "status": "success",
                        "kitab": kitab_lower,
                        "keyword": keyword,
                        "matches": local["matches"],
                        "match_total": local["match_total"],
                        "scanned": local["scanned"],
                        "total": local["total"],
                        "partial": book["stored"] < book["hadiths_count"],
                        "source": "offline",
                    }
            if kitab_lower == "arbain-nawawi":
                items = self._load_arbain_json()
                kw = keyword.casefold()
                matches = []
                for item in items:
                    text_all = f"{item.get('judul', '')} {item.get('indo', '')}".casefold()
                    if kw in text_all:
                        matches.append({
                            "number": int(item.get("no", 0)),
                            "arab": item.get("arab", ""),
                            "id": item.get("indo", ""),
                            "bab": item.get("judul", ""),
                            "nomor_bab": 1,
                        })
                return {
                    "status": "success",
                    "kitab": kitab_lower,
                    "keyword": keyword,
                    "matches": matches,
                    "match_total": len(matches),
                    "scanned": len(items),
                    "total": len(items),
                    "partial": False,
                    "source": "offline",
                }
            return self._offline_only_error(kitab_lower)

        if self.mode != "online":
            book = await asyncio.to_thread(self.store.get_hadith_book, kitab_lower)
            book_ready = bool(
                book and book["hadiths_count"] > 0
                and book["stored"] >= book["hadiths_count"]
            )
            if book_ready or self.mode == "local":
                local = await asyncio.to_thread(
                    self.store.search_hadith, kitab_lower, keyword
                )
                partial = bool(
                    book and book["hadiths_count"] > book["stored"]
                )
                return {
                    "status": "success",
                    "kitab": kitab_lower,
                    "keyword": keyword,
                    "matches": local["matches"],
                    "match_total": local["match_total"],
                    "scanned": local["scanned"],
                    "total": local["total"],
                    "partial": partial,
                    "source": "offline",
                }

        kw = keyword.casefold()
        matches: list[dict] = []
        scanned = 0
        total = 0
        sem = asyncio.Semaphore(4)

        async def fetch_page(client: httpx.AsyncClient, page: int) -> dict:
            async with sem:
                r = await client.get(
                    f"{self.BASE_URL}/hadith/{kitab_lower}",
                    params={"page": page},
                )
                r.raise_for_status()
                return r.json()

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                first = await fetch_page(client, 1)
                total = int(first.get("total", 0))
                pages = [first]
                if max_pages > 1 and total > 20:
                    rest = await asyncio.gather(
                        *[fetch_page(client, p) for p in range(2, max_pages + 1)],
                        return_exceptions=True,
                    )
                    pages += [p for p in rest if isinstance(p, dict)]

                for page_data in pages:
                    items = page_data.get("items", [])
                    scanned += len(items)
                    for item in items:
                        teks = item.get("id", "") or ""
                        if kw in teks.casefold():
                            matches.append({
                                "number": item.get("number", 0),
                                "arab": item.get("arab", ""),
                                "id": teks,
                            })
                            if len(matches) >= 20:
                                break
                    if len(matches) >= 20:
                        break

            return {
                "status": "success",
                "kitab": kitab_lower,
                "keyword": keyword,
                "matches": matches,
                "match_total": len(matches),
                "scanned": scanned,
                "total": total,
                "partial": scanned < total,
                "source": "online",
            }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_hadith_range(self, kitab: str, start: int, end: int) -> dict:
        kitab_lower = kitab.lower()
        if kitab_lower not in self.AVAILABLE_BOOKS:
            return self._invalid_book()

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.BASE_URL}/hadith/{kitab_lower}",
                    params={"range": f"{start}-{end}"},
                )
                response.raise_for_status()

                data = response.json().get("data", {})
                return {
                    "status": "success",
                    "kitab": data.get("name", kitab.title()),
                    "hadits": data.get("hadiths", []),
                    "source": "online",
                }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}
