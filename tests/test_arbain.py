import unittest
from unittest.mock import patch
from app.api.hadith import HadithAPI
from app.models.schemas import HadithRequest, HadithSearchRequest


async def sync_to_thread(func, *args, **kwargs):
    return func(*args, **kwargs)


class ArbainHadithTests(unittest.TestCase):
    def test_get_arbain_hadith_first_and_last(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            first = asyncio.run(api.get_hadith("arbain-nawawi", 1))
            self.assertEqual(first["status"], "success")
            self.assertEqual(first["nomor"], 1)
            self.assertEqual(first["kitab"], "Arba'in An-Nawawi")
            self.assertIn("Niat", first["bab"])
            self.assertIn("إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ", first["teks_arab"])
            self.assertIn("niat", first["terjemahan"].lower())

            last = asyncio.run(api.get_hadith("arbain-nawawi", 42))
            self.assertEqual(last["status"], "success")
            self.assertEqual(last["nomor"], 42)
            self.assertTrue(len(last["teks_arab"]) > 10)

    def test_search_arbain_hadith(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            res = asyncio.run(api.search_hadith("arbain-nawawi", "niat"))
            self.assertEqual(res["status"], "success")
            self.assertTrue(res["match_total"] >= 1)
            self.assertEqual(res["matches"][0]["number"], 1)

    def test_schema_accepts_arbain(self):
        req = HadithRequest(kitab="arbain-nawawi", nomor=1)
        self.assertEqual(req.kitab, "arbain-nawawi")
        search_req = HadithSearchRequest(kitab="arbain-nawawi", keyword="niat")
        self.assertEqual(search_req.kitab, "arbain-nawawi")


if __name__ == "__main__":
    unittest.main()
