import unittest
from unittest.mock import patch
from app.api.hadith import HadithAPI
from app.models.schemas import HadithRequest, HadithSearchRequest


async def sync_to_thread(func, *args, **kwargs):
    return func(*args, **kwargs)


class BulughulHadithTests(unittest.TestCase):
    def test_get_bulughul_hadith_first_and_last(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            first = asyncio.run(api.get_hadith("bulughul-maram", 1))
            self.assertEqual(first["status"], "success")
            self.assertEqual(first["nomor"], 1)
            self.assertEqual(first["kitab"], "Bulughul Maram")
            self.assertIn("Air", first["bab"])
            self.assertIn("الْبَحْرِ", first["teks_arab"])
            self.assertIn("laut", first["terjemahan"].lower())

            last = asyncio.run(api.get_hadith("bulughul-maram", 1323))
            self.assertEqual(last["status"], "success")
            self.assertEqual(last["nomor"], 1323)
            self.assertTrue(len(last["teks_arab"]) > 10)
            self.assertIn("dzikir", last["bab"].lower())

    def test_search_bulughul_hadith(self):
        import asyncio
        with patch("app.api.hadith.asyncio.to_thread", side_effect=sync_to_thread):
            api = HadithAPI(mode="local")
            res = asyncio.run(api.search_hadith("bulughul-maram", "laut"))
            self.assertEqual(res["status"], "success")
            self.assertTrue(res["match_total"] >= 1)
            self.assertEqual(res["matches"][0]["number"], 1)

    def test_schema_accepts_bulughul(self):
        req = HadithRequest(kitab="bulughul-maram", nomor=1)
        self.assertEqual(req.kitab, "bulughul-maram")
        search_req = HadithSearchRequest(kitab="bulughul-maram", keyword="laut")
        self.assertEqual(search_req.kitab, "bulughul-maram")


if __name__ == "__main__":
    unittest.main()
