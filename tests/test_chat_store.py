import tempfile
import unittest
from pathlib import Path

from app.api.chat_store import ChatStore


class ChatStoreTests(unittest.TestCase):
    def test_private_chat_becomes_visible_only_after_opt_in_share(self):
        with tempfile.TemporaryDirectory() as directory:
            store = ChatStore(Path(directory) / "chat.sqlite3")
            store.add_message("session-a", "user", "Apa itu sabar?")
            store.add_message("session-a", "assistant", "Jawaban", [{"type": "quran", "verse": 153}])
            self.assertEqual(store.explore(), [])
            slug = store.share("session-a")
            self.assertIsNotNone(slug)
            shared = store.public_chat(slug)
            self.assertEqual(shared["messages"][1]["sources"][0]["verse"], 153)
            self.assertEqual(store.explore()[0]["share_slug"], slug)
