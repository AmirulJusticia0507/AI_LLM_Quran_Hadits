"""Aggregate counters and 30-day anonymous history; no IP or raw user-agent stored."""
from contextlib import closing
import os
import sqlite3
from datetime import date, datetime, timedelta, timezone
import secrets
import time
from typing import Literal
from pathlib import Path
from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Response
from pydantic import BaseModel, Field

router = APIRouter()
WIB = timezone(timedelta(hours=7))
Device = Literal["Desktop", "Mobile", "Tablet", "Bot", "Unknown"]


def connect(db_path=None):
    target = Path(db_path or os.getenv("VISITS_DB_PATH", "data/visits.sqlite3"))
    target.parent.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(target, timeout=10)
    db.row_factory = sqlite3.Row
    db.executescript("""
        CREATE TABLE IF NOT EXISTS totals (id INTEGER PRIMARY KEY CHECK(id=1), views INTEGER NOT NULL);
        INSERT OR IGNORE INTO totals VALUES (1, 0);
        CREATE TABLE IF NOT EXISTS visitors (day TEXT, visitor TEXT, PRIMARY KEY(day, visitor));
        CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, day TEXT);
        CREATE TABLE IF NOT EXISTS visit_history (
            event TEXT PRIMARY KEY, visitor TEXT NOT NULL, day TEXT NOT NULL,
            visited_at TEXT NOT NULL, path TEXT NOT NULL, device TEXT NOT NULL,
            browser TEXT NOT NULL, os TEXT NOT NULL);
        CREATE INDEX IF NOT EXISTS history_day ON visit_history(day, visited_at);
        CREATE TABLE IF NOT EXISTS admin_attempts (created REAL NOT NULL);
    """)
    return db


class Visit(BaseModel):
    visitor_id: UUID
    event_id: UUID
    path: str = Field(default="/", max_length=200, pattern=r"^/(?:[a-zA-Z0-9_/-]*)$")
    device: Device = "Unknown"
    browser: Literal["Chrome", "Edge", "Firefox", "Safari", "Opera", "Samsung Internet", "Other", "Unknown"] = "Unknown"
    os: Literal["Android", "iOS", "Windows", "macOS", "Linux", "ChromeOS", "Other", "Unknown"] = "Unknown"


def record_visit(visitor_id: str, event_id: str, db_path=None, day=None, *, path="/", device="Unknown", browser="Unknown", os_name="Unknown"):
    now = datetime.now(WIB)
    today = day or now.date().isoformat()
    cutoff = (date.fromisoformat(today) - timedelta(days=29)).isoformat()
    with closing(connect(db_path)) as db, db:
        db.execute("DELETE FROM visitors WHERE day < ?", (today,))
        db.execute("DELETE FROM events WHERE day < ?", (cutoff,))
        db.execute("DELETE FROM visit_history WHERE day < ?", (cutoff,))
        inserted = db.execute("INSERT OR IGNORE INTO events VALUES (?, ?)", (event_id, today)).rowcount
        if inserted:
            db.execute("UPDATE totals SET views=views+1 WHERE id=1")
            db.execute("INSERT OR IGNORE INTO visitors VALUES (?, ?)", (today, visitor_id))
            db.execute("INSERT INTO visit_history VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                       (event_id, visitor_id, today, now.isoformat(), path, device, browser, os_name))
        return {"visitors_today": db.execute("SELECT COUNT(*) FROM visitors WHERE day=?", (today,)).fetchone()[0],
                "total_views": db.execute("SELECT views FROM totals WHERE id=1").fetchone()[0]}


@router.post("/api/visits")
def visit(body: Visit):
    if body.path.startswith(("/admin", "/api")):
        raise HTTPException(400, "Halaman admin tidak dicatat.")
    return record_visit(str(body.visitor_id), str(body.event_id), path=body.path,
                        device=body.device, browser=body.browser, os_name=body.os)


def require_admin_bridge(response: Response, authorization: str = Header(default="")):
    response.headers['Cache-Control'] = 'no-store'
    token = os.getenv("ADMIN_API_TOKEN", "")
    if len(token) < 32:
        raise HTTPException(503, "Akses admin belum dikonfigurasi.")
    if not secrets.compare_digest(authorization.encode(), f"Bearer {token}".encode()):
        raise HTTPException(401, "Akses admin diperlukan.")


class AdminLogin(BaseModel):
    password: str = Field(min_length=1, max_length=256)


@router.post("/api/admin/login", dependencies=[Depends(require_admin_bridge)])
def admin_login(body: AdminLogin):
    expected = os.getenv("ADMIN_PASSWORD", "")
    if len(expected) < 16:
        raise HTTPException(503, "Password admin belum dikonfigurasi.")
    now = time.time()
    # Persistent, shared across workers; requests are accepted only via the bridge.
    with closing(connect()) as db, db:
        db.execute("BEGIN IMMEDIATE")
        db.execute("DELETE FROM admin_attempts WHERE created < ?", (now - 900,))
        if db.execute("SELECT COUNT(*) FROM admin_attempts").fetchone()[0] >= 10:
            raise HTTPException(429, "Terlalu banyak percobaan. Coba lagi dalam 15 menit.")
        valid = secrets.compare_digest(body.password.encode(), expected.encode())
        if not valid:
            db.execute("INSERT INTO admin_attempts VALUES (?)", (now,))
    if not valid:
        raise HTTPException(401, "Password admin salah.")
    return {"ok": True}


@router.get("/api/admin/visits", dependencies=[Depends(require_admin_bridge)])
def history(start: date | None = None, end: date | None = None,
            device: Device | None = None, page: int = Query(1, ge=1, le=100000)):
    today = datetime.now(WIB).date()
    start, end = start or today, end or today
    if start > end or (end - start).days > 29:
        raise HTTPException(400, "Pilih rentang tanggal maksimal 30 hari.")
    conditions = "day >= ? AND day <= ?"
    args = [start.isoformat(), end.isoformat()]
    if device:
        conditions += " AND device = ?"
        args.append(device)
    with closing(connect()) as db, db:
        db.execute("DELETE FROM visit_history WHERE day < ?", ((today - timedelta(days=29)).isoformat(),))
        summary = db.execute(f"SELECT COUNT(*) AS views, COUNT(DISTINCT visitor) AS visitors FROM visit_history WHERE {conditions}", args).fetchone()
        rows = db.execute(f"SELECT visitor, visited_at, path, device, browser, os FROM visit_history WHERE {conditions} ORDER BY visited_at DESC, event DESC LIMIT 25 OFFSET ?", [*args, (page - 1) * 25]).fetchall()
        return {"items": [dict(row) for row in rows], "views": summary["views"], "visitors": summary["visitors"],
                "page": page, "pages": max(1, (summary["views"] + 24) // 25), "retention_days": 30}
