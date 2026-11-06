"""Durable, local-first storage for private chats and opt-in public shares."""
import json
import sqlite3
import uuid
from contextlib import contextmanager
from pathlib import Path
from datetime import datetime, timezone


class ChatStore:
    def __init__(self, path: str | Path = "data/chat.sqlite3"):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.ensure_schema()

    def _connect(self):
        connection = sqlite3.connect(self.path)
        connection.row_factory = sqlite3.Row
        return connection

    @contextmanager
    def _connection(self):
        connection = self._connect()
        try:
            yield connection
            connection.commit()
        finally:
            connection.close()

    def ensure_schema(self):
        with self._connection() as connection:
            connection.executescript("""
            CREATE TABLE IF NOT EXISTS chat_sessions (
              id TEXT PRIMARY KEY, title TEXT NOT NULL DEFAULT 'Percakapan Baru',
              share_slug TEXT UNIQUE, is_public INTEGER NOT NULL DEFAULT 0,
              created_at TEXT NOT NULL, updated_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS chat_messages (
              id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT NOT NULL,
              role TEXT NOT NULL CHECK(role IN ('user','assistant')), content TEXT NOT NULL,
              sources_json TEXT NOT NULL DEFAULT '[]', created_at TEXT NOT NULL,
              FOREIGN KEY(session_id) REFERENCES chat_sessions(id)
            );
            CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id, id);
            CREATE INDEX IF NOT EXISTS idx_chat_sessions_public ON chat_sessions(is_public, updated_at DESC);
            CREATE TABLE IF NOT EXISTS rate_limits (key TEXT NOT NULL, seen_at REAL NOT NULL);
            CREATE INDEX IF NOT EXISTS idx_rate_limits_key_seen ON rate_limits(key, seen_at);
            """)

    @staticmethod
    def _now():
        return datetime.now(timezone.utc).isoformat()

    def add_message(self, session_id: str, role: str, content: str, sources: list | None = None):
        now = self._now()
        title = content.strip().replace("\n", " ")[:80] if role == "user" else "Percakapan Baru"
        with self._connection() as connection:
            connection.execute("INSERT OR IGNORE INTO chat_sessions (id, title, created_at, updated_at) VALUES (?, ?, ?, ?)", (session_id, title or "Percakapan Baru", now, now))
            connection.execute("INSERT INTO chat_messages (session_id, role, content, sources_json, created_at) VALUES (?, ?, ?, ?, ?)", (session_id, role, content, json.dumps(sources or [], ensure_ascii=False), now))
            connection.execute("UPDATE chat_sessions SET updated_at = ? WHERE id = ?", (now, session_id))

    def share(self, session_id: str) -> str | None:
        slug = uuid.uuid4().hex[:12]
        with self._connection() as connection:
            exists = connection.execute("SELECT 1 FROM chat_sessions WHERE id = ?", (session_id,)).fetchone()
            if not exists:
                return None
            connection.execute("UPDATE chat_sessions SET is_public = 1, share_slug = ?, updated_at = ? WHERE id = ?", (slug, self._now(), session_id))
        return slug

    def unshare(self, session_id: str) -> bool:
        with self._connection() as connection:
            result = connection.execute("UPDATE chat_sessions SET is_public = 0, share_slug = NULL, updated_at = ? WHERE id = ?", (self._now(), session_id))
        return result.rowcount > 0

    def public_chat(self, slug: str):
        with self._connection() as connection:
            session = connection.execute("SELECT id, title, created_at, updated_at FROM chat_sessions WHERE share_slug = ? AND is_public = 1", (slug,)).fetchone()
            if not session:
                return None
            messages = connection.execute("SELECT role, content, sources_json, created_at FROM chat_messages WHERE session_id = ? ORDER BY id", (session["id"],)).fetchall()
        return {**dict(session), "messages": [{**dict(message), "sources": json.loads(message["sources_json"])} for message in messages]}

    def explore(self, limit: int = 20):
        with self._connection() as connection:
            rows = connection.execute("SELECT title, share_slug, updated_at FROM chat_sessions WHERE is_public = 1 ORDER BY updated_at DESC LIMIT ?", (limit,)).fetchall()
        return [dict(row) for row in rows]

    def sessions(self, limit: int = 50):
        with self._connection() as connection:
            rows = connection.execute("SELECT id, title, updated_at FROM chat_sessions ORDER BY updated_at DESC LIMIT ?", (limit,)).fetchall()
        return [dict(row) for row in rows]

    def session(self, session_id: str):
        with self._connection() as connection:
            session = connection.execute("SELECT id, title, updated_at FROM chat_sessions WHERE id = ?", (session_id,)).fetchone()
            if not session: return None
            rows = connection.execute("SELECT role, content, sources_json, created_at FROM chat_messages WHERE session_id = ? ORDER BY id", (session_id,)).fetchall()
        return {**dict(session), "messages": [{**dict(row), "sources": json.loads(row["sources_json"])} for row in rows]}

    def allow_rate(self, key: str, now: float, window: float, limit: int) -> bool:
        with self._connection() as connection:
            connection.execute("DELETE FROM rate_limits WHERE seen_at < ?", (now - window,))
            count = connection.execute("SELECT COUNT(*) FROM rate_limits WHERE key = ? AND seen_at >= ?", (key, now - window)).fetchone()[0]
            if count >= limit: return False
            connection.execute("INSERT INTO rate_limits (key, seen_at) VALUES (?, ?)", (key, now))
        return True
