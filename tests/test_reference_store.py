import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import httpx

from app.api.hadith import HadithAPI
from app.api.quran import QuranAPI
from app.api.reference_store import ReferenceStore


def surah_payload(number=1, count=3):
    return {
        "nomor": number,
        "nama": "الفاتحة",
        "namaLatin": f"Surah {number}",
        "jumlahAyat": count,
        "tempatTurun": "Mekah",
        "arti": "Pembukaan",
        "deskripsi": "",
        "audioFull": {"05": "full.mp3"},
        "ayat": [
            {
                "nomorAyat": ayat,
                "teksArab": f"arab-{ayat}",
                "teksLatin": f"latin-{ayat}",
                "teksIndonesia": "Dengan nama Allah Yang Maha Pengasih" if ayat == 1 else f"ayat {ayat}",
                "audio": {"05": f"audio-{ayat}.mp3"},
            }
            for ayat in range(1, count + 1)
        ],
    }


class ReferenceStoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.store = ReferenceStore(Path(self.tmp.name) / "reference.sqlite3")
        self.store.ensure_schema()

    def tearDown(self):
        self.tmp.cleanup()

    def test_quran_roundtrip_and_search(self):
        self.store.save_surah(surah_payload())
        self.store.save_tafsir(1, 1, "Tafsir ayat satu")

        surah = self.store.get_surah(1)
        self.assertEqual(surah["jumlah_ayat"], 3)
        self.assertEqual(surah["ayat"][0]["teks_arab"], "arab-1")

        verse = self.store.get_verse(1, 2)
        self.assertEqual(verse["nomor_ayat"], 2)
        self.assertEqual(verse["audio"], "audio-2.mp3")

        tafsir = self.store.get_tafsir(1, 1)
        self.assertEqual(tafsir["tafsir"], "Tafsir ayat satu")

        results = self.store.search_quran("pengasih")
        self.assertEqual(results["total"], 1)
        self.assertEqual(results["results"][0]["nomor_surah"], 1)
        self.assertTrue(self.store.has_quran())

    def test_hadith_roundtrip_and_search(self):
        rows = [
            {"number": n, "arab": f"arab-{n}", "id": "Hadits tentang niat" if n == 1 else f"Hadits {n}"}
            for n in range(1, 26)
        ]
        self.store.save_hadith_book("bukhari", "Bukhari", 25, rows)

        hadith = self.store.get_hadith("bukhari", 1)
        self.assertEqual(hadith["teks_arab"], "arab-1")

        result = self.store.search_hadith("bukhari", "niat")
        self.assertEqual(result["match_total"], 1)
        self.assertEqual(result["matches"][0]["number"], 1)
        self.assertFalse(result["partial"])

    def test_hadith_chapter_metadata_roundtrip_and_search(self):
        self.store.save_hadith_book(
            "riyadhus-shalihin",
            "Riyadhus Shalihin",
            1,
            [
                {
                    "number": 1,
                    "arab": "نص الحديث",
                    "id": "Hadits tentang niat",
                    "chapter_number": 2,
                    "chapter_title": "Ikhlas",
                    "chapter_hadith_number": 1,
                    "source_arab_number": 3,
                    "source_translation_number": 4,
                }
            ],
        )

        hadith = self.store.get_hadith("riyadhus-shalihin", 1)
        self.assertEqual(hadith["bab"], "Ikhlas")
        self.assertEqual(hadith["nomor_bab"], 2)
        self.assertEqual(hadith["nomor_dalam_bab"], 1)
        self.assertEqual(hadith["nomor_sumber_arab"], 3)
        self.assertEqual(hadith["nomor_sumber_terjemahan"], 4)

        result = self.store.search_hadith("riyadhus-shalihin", "niat")
        self.assertEqual(result["matches"][0]["bab"], "Ikhlas")
        self.assertEqual(result["matches"][0]["nomor_bab"], 2)

    def test_existing_database_gets_hadith_chapter_columns(self):
        legacy_path = Path(self.tmp.name) / "legacy.sqlite3"
        connection = sqlite3.connect(legacy_path)
        try:
            connection.executescript(
                """
                CREATE TABLE reference_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
                CREATE TABLE hadith_books (
                    slug TEXT PRIMARY KEY, name TEXT NOT NULL,
                    hadiths_count INTEGER NOT NULL DEFAULT 0
                );
                CREATE TABLE hadiths (
                    book_slug TEXT NOT NULL, hadith_number INTEGER NOT NULL,
                    arabic_text TEXT NOT NULL DEFAULT '',
                    translation_id TEXT NOT NULL DEFAULT '',
                    PRIMARY KEY (book_slug, hadith_number)
                );
                INSERT INTO hadith_books VALUES ('bukhari', 'Bukhari', 1);
                INSERT INTO hadiths VALUES ('bukhari', 1, 'arab', 'translation');
                """
            )
        finally:
            connection.close()

        legacy_store = ReferenceStore(legacy_path)
        hadith = legacy_store.get_hadith("bukhari", 1)
        self.assertEqual(hadith["teks_arab"], "arab")
        self.assertIsNone(hadith["bab"])
        self.assertIsNone(hadith["nomor_bab"])

    def test_surah_complete_requires_tafsir(self):
        self.store.save_surah(surah_payload())
        self.assertFalse(self.store.surah_complete(1))
        for ayat in range(1, 4):
            self.store.save_tafsir(1, ayat, "tafsir")
        self.assertTrue(self.store.surah_complete(1))

    def test_incomplete_surah_is_not_served(self):
        payload = surah_payload(count=3)
        payload["ayat"] = payload["ayat"][:2]
        self.store.save_surah(payload)
        self.assertIsNone(self.store.get_surah(1))
        self.assertIsNotNone(self.store.get_verse(1, 1))


class LocalFirstTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.store = ReferenceStore(Path(self.tmp.name) / "reference.sqlite3")
        self.store.ensure_schema()

    def tearDown(self):
        self.tmp.cleanup()

    async def test_local_mode_never_calls_network(self):
        api = QuranAPI(store=self.store, mode="local")
        with patch("app.api.quran.httpx.AsyncClient") as client:
            result = await api.get_verse(1, 1)
        client.assert_not_called()
        self.assertEqual(result["status"], "error")
        self.assertEqual(result["source"], "offline")

    async def test_hybrid_caches_online_surah_for_offline_use(self):
        original = httpx.AsyncClient

        def respond(request):
            return httpx.Response(200, json={"data": surah_payload()})

        with patch(
            "app.api.quran.httpx.AsyncClient",
            side_effect=lambda **kw: original(
                transport=httpx.MockTransport(respond), **kw
            ),
        ):
            online = await QuranAPI(store=self.store, mode="hybrid").get_verse(1, 1)
        self.assertEqual(online["source"], "online")
        self.assertIsNotNone(self.store.get_verse(1, 2))

        offline = await QuranAPI(store=self.store, mode="hybrid").get_verse(1, 2)
        self.assertEqual(offline["source"], "offline")
        self.assertEqual(offline["teks_arab"], "arab-2")

    async def test_offline_hadith_search_covers_whole_book(self):
        rows = [
            {"number": n, "arab": f"arab-{n}", "id": f"Hadits {n}"}
            for n in range(1, 31)
        ]
        rows[-1]["id"] = "Hadits tentang sabar"
        self.store.save_hadith_book("muslim", "Muslim", 30, rows)

        api = HadithAPI(store=self.store, mode="local")
        result = await api.search_hadith("muslim", "sabar")
        self.assertEqual(result["status"], "success")
        self.assertEqual(result["source"], "offline")
        self.assertFalse(result["partial"])
        self.assertEqual(result["scanned"], 30)
        self.assertEqual(result["matches"][0]["number"], 30)

    async def test_riyadhus_shalihin_uses_local_data_only(self):
        self.store.save_hadith_book(
            "riyadhus-shalihin",
            "Riyadhus Shalihin",
            1,
            [{"number": 1, "arab": "arab", "id": "Hadits niat"}],
        )
        api = HadithAPI(store=self.store, mode="hybrid")

        with patch("app.api.hadith.httpx.AsyncClient") as client:
            result = await api.get_hadith("riyadhus-shalihin", 1)
            search = await api.search_hadith("riyadhus-shalihin", "niat")

        client.assert_not_called()
        self.assertEqual(result["source"], "offline")
        self.assertEqual(result["nomor"], 1)
        self.assertEqual(search["source"], "offline")
        self.assertEqual(search["matches"][0]["number"], 1)

    async def test_riyadhus_shalihin_reports_missing_offline_data(self):
        api = HadithAPI(store=self.store, mode="hybrid")
        with patch("app.api.hadith.httpx.AsyncClient") as client:
            result = await api.get_hadith("riyadhus-shalihin", 99999)
        client.assert_not_called()
        self.assertEqual(result["status"], "error")
        self.assertEqual(result["source"], "offline")


if __name__ == "__main__":
    unittest.main()
