import unittest
from pathlib import Path
import json


class DoaHisnulMuslimTests(unittest.TestCase):
    def setUp(self):
        self.json_path = Path("data/hisnul-muslim.json")

    def test_json_file_exists_and_contains_267_doas(self):
        self.assertTrue(self.json_path.is_file(), "data/hisnul-muslim.json harus ada")
        with open(self.json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.assertEqual(len(data), 267)
        first = data[0]
        self.assertEqual(first["id"], 1)
        self.assertIn("bangun", first["kategori"].lower())
        self.assertTrue(len(first["arab"]) > 10)
        self.assertTrue(len(first["arti"]) > 10)
        self.assertTrue(len(first["sumber"]) > 5)

        last = data[-1]
        self.assertEqual(last["id"], 267)
        self.assertTrue(len(last["arab"]) > 10)

    def test_all_doas_have_arabic_and_indonesian(self):
        with open(self.json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        for d in data:
            self.assertTrue(bool(d["arab"].strip()), f"Doa #{d['id']} tidak boleh kosong Arab")
            self.assertTrue(bool(d["arti"].strip()), f"Doa #{d['id']} tidak boleh kosong arti")
            self.assertTrue(bool(d["kategori"].strip()), f"Doa #{d['id']} harus punya kategori")


if __name__ == "__main__":
    unittest.main()
