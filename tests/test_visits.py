import tempfile
import unittest
from pathlib import Path
from app.api.visits import record_visit


class VisitTests(unittest.TestCase):
    def test_unique_reload_duplicate_and_day_rollover(self):
        with tempfile.TemporaryDirectory() as folder:
            db = Path(folder) / "visits.db"
            def hit(visitor, event, day="2026-09-12"):
                return record_visit(visitor, event, db, day)
            self.assertEqual(hit("a", "1"), {"visitors_today": 1, "total_views": 1})
            self.assertEqual(hit("a", "1")["total_views"], 1)
            self.assertEqual(hit("a", "2"), {"visitors_today": 1, "total_views": 2})
            self.assertEqual(hit("b", "3")["visitors_today"], 2)
            self.assertEqual(hit("a", "4", "2026-09-13"), {"visitors_today": 1, "total_views": 4})
