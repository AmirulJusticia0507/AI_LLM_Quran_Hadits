import unittest
from unittest.mock import patch
from app.api.hadith import HadithAPI
from app.models.schemas import HadithRequest, HadithSearchRequest


async def sync_to_thread(func, *args, **kwargs):
    return func(*args, **kwargs)


class RiyadhusHadithTests(unittest.TestCase):
    def test_get_riyadhus_hadith_first_and_last(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            first = asyncio.run(api.get_hadith("riyadhus-shalihin", 1))
            self.assertEqual(first["status"], "success")
            self.assertEqual(first["nomor"], 1)
            self.assertEqual(first["kitab"], "Riyadhus Shalihin")
            self.assertTrue(len(first["teks_arab"]) > 10)
            self.assertTrue(len(first["terjemahan"]) > 10)
            self.assertIn("Niat", first["bab"])

            last = asyncio.run(api.get_hadith("riyadhus-shalihin", 1903))
            self.assertEqual(last["status"], "success")
            self.assertEqual(last["nomor"], 1903)
            self.assertTrue(len(last["teks_arab"]) > 10)

    def test_search_riyadhus_hadith(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            res = asyncio.run(api.search_hadith("riyadhus-shalihin", "niat"))
            self.assertEqual(res["status"], "success")
            self.assertTrue(res["match_total"] >= 1)
            self.assertEqual(res["scanned"], 1903)
            self.assertEqual(res["total"], 1903)

    def test_schema_accepts_riyadhus(self):
        req = HadithRequest(kitab="riyadhus-shalihin", nomor=1)
        self.assertEqual(req.kitab, "riyadhus-shalihin")
        search_req = HadithSearchRequest(kitab="riyadhus-shalihin", keyword="niat")
        self.assertEqual(search_req.kitab, "riyadhus-shalihin")


if __name__ == "__main__":
    unittest.main()
