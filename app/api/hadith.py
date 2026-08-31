import httpx


class HadithAPI:
    BASE_URL = "https://hadis-api-id.vercel.app"

    AVAILABLE_BOOKS = [
        "bukhari",
        "muslim",
        "tirmidzi",
        "abu-daud",
        "nasai",
        "ibnu-majah",
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
                    f"{self.BASE_URL}/books/{kitab_lower}/{nomor}"
                )
                response.raise_for_status()

                data = response.json().get("data", {})
                contents = data.get("contents", {})

                return {
                    "status": "success",
                    "kitab": data.get("name", kitab.title()),
                    "nomor": contents.get("number", nomor),
                    "teks_arab": contents.get("arab", ""),
                    "terjemahan": contents.get("id", ""),
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
                    f"{self.BASE_URL}/books/{kitab_lower}",
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
