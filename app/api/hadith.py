import httpx


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
    ]

    async def get_hadith(self, kitab: str, nomor: int) -> dict:
        kitab_lower = kitab.lower()
        if kitab_lower not in self.AVAILABLE_BOOKS:
            return {
                "status": "error",
                "message": f"Kitab tidak tersedia. Pilih: {', '.join(self.AVAILABLE_BOOKS)}",
            }

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(
                    f"{self.BASE_URL}/hadith/{kitab_lower}/{nomor}"
                )
                response.raise_for_status()

                data = response.json()

                return {
                    "status": "success",
                    "kitab": data.get("name", kitab.title()),
                    "nomor": data.get("number", nomor),
                    "teks_arab": data.get("arab", ""),
                    "terjemahan": data.get("id", ""),
                }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def search_hadith(self, kitab: str, keyword: str, max_pages: int = 8) -> dict:
        """Cari kata kunci dalam terjemahan — pindai max_pages halaman pertama (20/halaman).

        Upstream tidak menyediakan pencarian server-side, jadi hasilnya
        parsial untuk kitab besar. scanned/total selalu dilaporkan jujur.
        """
        import asyncio

        kitab_lower = kitab.lower()
        if kitab_lower not in self.AVAILABLE_BOOKS:
            return {
                "status": "error",
                "message": f"Kitab tidak tersedia. Pilih: {', '.join(self.AVAILABLE_BOOKS)}",
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
                "scanned": scanned,
                "total": total,
                "partial": scanned < total,
            }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_hadith_range(self, kitab: str, start: int, end: int) -> dict:
        kitab_lower = kitab.lower()
        if kitab_lower not in self.AVAILABLE_BOOKS:
            return {
                "status": "error",
                "message": f"Kitab tidak tersedia. Pilih: {', '.join(self.AVAILABLE_BOOKS)}",
            }

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
                }

        except httpx.HTTPError as e:
            return {"status": "error", "message": f"HTTP error: {str(e)}"}
        except Exception as e:
            return {"status": "error", "message": str(e)}
