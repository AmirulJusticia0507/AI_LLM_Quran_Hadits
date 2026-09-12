import asyncio
import unittest
from unittest.mock import AsyncMock, patch

import httpx

from app.api.matan import MatanAPI, parse_book


def arbain_payload():
    return {"data": [{"no": str(n), "judul": f"Judul {n}", "arab": "إِنَّمَا الأَعْمَالُ", "indo": f"Terjemahan {n}"} for n in range(1, 43)]}


class MatanTests(unittest.IsolatedAsyncioTestCase):
    async def test_pagination_and_exact_number(self):
        api = MatanAPI()
        api._load = AsyncMock(return_value=parse_book("arbain-nawawi", arbain_payload()))
        result = await api.browse("arbain-nawawi", page=2)
        self.assertEqual([r["number"] for r in result["items"]], [6, 7, 8, 9, 10])
        self.assertEqual(result["pages"], 9)
        self.assertEqual((await api.browse("arbain-nawawi", "42"))["items"][0]["number"], 42)
        self.assertEqual((await api.browse("arbain-nawawi", "tidak ditemukan"))["matched"], 0)
        self.assertEqual((await api.browse("arbain-nawawi", "إنما"))["matched"], 42)
        self.assertEqual((await api.browse("arbain-nawawi", chapter=2))["matched"], 0)

    async def test_single_upstream_request_for_concurrent_readers(self):
        calls = []
        original = httpx.AsyncClient
        def handler(request):
            calls.append(str(request.url))
            return httpx.Response(200, json=arbain_payload())
        api = MatanAPI()
        with patch("app.api.matan.httpx.AsyncClient", side_effect=lambda **kw: original(transport=httpx.MockTransport(handler), **kw)):
            await asyncio.gather(api.browse("arbain-nawawi"), api.browse("arbain-nawawi", page=2))
        self.assertEqual(len(calls), 1)

    async def test_incomplete_data_is_not_published(self):
        data = arbain_payload()
        data["data"].pop()
        with self.assertRaises(ValueError):
            parse_book("arbain-nawawi", data)

    async def test_bulugh_chapter_filter_and_no_fabricated_translation(self):
        payload = {"chapters": [{"id": n, "arabic": "كتاب"} for n in range(1, 17)],
                   "hadiths": [{"idInBook": n, "chapterId": (n - 1) % 16 + 1, "arabic": "نص"} for n in range(1, 1768)]}
        api = MatanAPI()
        api._load = AsyncMock(return_value=parse_book("bulughul-maram", payload))
        result = await api.browse("bulughul-maram", chapter=2)
        self.assertEqual(result["total"], 1767)
        self.assertTrue(all(item["chapter"] == 2 and item["translation"] is None for item in result["items"]))
