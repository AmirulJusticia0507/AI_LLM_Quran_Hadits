import unittest

from scripts.riyadhus import parse_chapters, parse_sql_dump


class RiyadhusImportTests(unittest.TestCase):
    def test_parse_sql_rows_and_escaped_text(self):
        sql = r"""
        INSERT INTO `riyadhus_shalihin`
          (`id`, `kitab`, `arab`, `terjemah`) VALUES
          (1, 'riyadhus_shalihin', '1 - باب الإخلاص\n1 - متن الحديث',
           '<h1>Bab, Ikhlas</h1><p>1. Terjemahan; niat.</p>');
        """

        chapters = parse_sql_dump(sql)
        self.assertEqual(len(chapters), 1)
        self.assertEqual(chapters[0]["id"], 1)
        self.assertIn("\n", chapters[0]["arab"])
        self.assertIn("Terjemahan; niat", chapters[0]["terjemah"])

        rows = parse_chapters(chapters)
        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]["number"], 1)
        self.assertEqual(rows[0]["chapter_title"], "Bab, Ikhlas")
        self.assertEqual(rows[0]["chapter_number"], 1)
        self.assertEqual(rows[0]["chapter_hadith_number"], 1)
        self.assertEqual(rows[0]["source_arab_number"], 1)
        self.assertEqual(rows[0]["source_translation_number"], 1)
        self.assertEqual(rows[0]["arab"], "متن الحديث")
        self.assertEqual(rows[0]["id"], "Terjemahan; niat.")

    def test_parse_multiple_inserts_and_escaped_quotes(self):
        sql = (
            "INSERT INTO `riyadhus_shalihin` "
            "(`id`, `kitab`, `arab`, `terjemah`) VALUES "
            "(1, 'riyadhus_shalihin', 'arab', '<h1>Bab</h1>');"
            "INSERT INTO `riyadhus_shalihin` "
            "(`id`, `kitab`, `arab`, `terjemah`) VALUES "
            "(2, 'riyadhus_shalihin', 'arab', '<h1>Bab \\'dua\\'</h1>');"
        )

        chapters = parse_sql_dump(sql)
        self.assertEqual([chapter["id"] for chapter in chapters], [1, 2])
        self.assertIn("'dua'", chapters[1]["terjemah"])

    def test_parse_numbered_translation_inside_nested_heading_tags(self):
        chapters = [
            {
                "id": 1,
                "kitab": "riyadhus_shalihin",
                "arab": "1 - باب الإخلاص\n1 - متن الحديث",
                "terjemah": (
                    "<h1>Bab Ikhlas</h1>"
                    '<h1><span><font size="3">1. Terjemahan hadits</font>'
                    "</span></h1>"
                ),
            }
        ]

        rows = parse_chapters(chapters)
        self.assertEqual(len(rows), 1)
        self.assertEqual(rows[0]["id"], "Terjemahan hadits")


if __name__ == "__main__":
    unittest.main()
