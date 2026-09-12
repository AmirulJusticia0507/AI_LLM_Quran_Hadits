"""Persistent aggregate visits; no IP addresses or message contents are stored."""
from contextlib import closing
import os
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path
from uuid import UUID

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class Visit(BaseModel):
    visitor_id: UUID
    event_id: UUID


def record_visit(visitor_id: str, event_id: str, db_path=None, day=None):
    target = Path(db_path or os.getenv("VISITS_DB_PATH", "data/visits.sqlite3"))
    target.parent.mkdir(parents=True, exist_ok=True)
    today = day or datetime.now(timezone(timedelta(hours=7))).date().isoformat()
    with closing(sqlite3.connect(target, timeout=10)) as db, db:
        db.execute("CREATE TABLE IF NOT EXISTS totals (id INTEGER PRIMARY KEY CHECK(id=1), views INTEGER NOT NULL)")
        db.execute("INSERT OR IGNORE INTO totals VALUES (1, 0)")
        db.execute("CREATE TABLE IF NOT EXISTS visitors (day TEXT, visitor TEXT, PRIMARY KEY(day, visitor))")
        db.execute("CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, day TEXT)")
        db.execute("DELETE FROM visitors WHERE day < ?", (today,))
        db.execute("DELETE FROM events WHERE day < ?", (today,))
        inserted = db.execute("INSERT OR IGNORE INTO events VALUES (?, ?)", (event_id, today)).rowcount
        if inserted:
            db.execute("UPDATE totals SET views=views+1 WHERE id=1")
            db.execute("INSERT OR IGNORE INTO visitors VALUES (?, ?)", (today, visitor_id))
        return {"visitors_today": db.execute("SELECT COUNT(*) FROM visitors WHERE day=?", (today,)).fetchone()[0],
                "total_views": db.execute("SELECT views FROM totals WHERE id=1").fetchone()[0]}


@router.post("/api/visits")
def visit(body: Visit):
    return record_visit(str(body.visitor_id), str(body.event_id))
