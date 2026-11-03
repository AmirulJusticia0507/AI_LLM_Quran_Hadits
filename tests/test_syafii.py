import unittest
from unittest.mock import patch
from app.api.hadith import HadithAPI
from app.models.schemas import HadithRequest, HadithSearchRequest


async def sync_to_thread(func, *args, **kwargs):
    return func(*args, **kwargs)


class SyafiiHadithTests(unittest.TestCase):
    def test_get_syafii_hadith_first_and_last(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            first = asyncio.run(api.get_hadith("musnad-syafii", 1))
            self.assertEqual(first["status"], "success")
            self.assertEqual(first["nomor"], 1)
            self.assertEqual(first["kitab"], "Musnad Asy-Syafi'i")
            self.assertTrue(len(first["teks_arab"]) > 10)
            self.assertIn("Syafi'i", first["terjemahan"])

            last = asyncio.run(api.get_hadith("musnad-syafii", 1800))
            self.assertEqual(last["status"], "success")
            self.assertEqual(last["nomor"], 1800)
            self.assertTrue(len(last["teks_arab"]) > 10)

    def test_search_syafii_hadith(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            res = asyncio.run(api.search_hadith("musnad-syafii", "shalat"))
            self.assertEqual(res["status"], "success")
            self.assertTrue(res["match_total"] > 0)
            self.assertEqual(res["total"], 1800)

    def test_schema_accepts_syafii(self):
        req = HadithRequest(kitab="musnad-syafii", nomor=1)
        self.assertEqual(req.kitab, "musnad-syafii")
        search_req = HadithSearchRequest(kitab="musnad-syafii", keyword="shalat")
        self.assertEqual(search_req.kitab, "musnad-syafii")


if __name__ == "__main__":
    unittest.main()
