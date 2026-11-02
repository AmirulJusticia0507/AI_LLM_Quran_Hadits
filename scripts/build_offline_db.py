"""Bangun database SQLite offline untuk Al-Qur'an, tafsir, dan kitab hadits.

Contoh:
    python scripts/build_offline_db.py                 # semua dataset
    python scripts/build_offline_db.py --only quran    # hanya Qur'an + tafsir
    python scripts/build_offline_db.py --only hadith   # hanya 9 kitab hadits
    python scripts/build_offline_db.py --rebuild       # buat ulang dari nol

Data diunduh sekali dari sumber yang sama dengan versi online (equran.id dan
hadis-api-id), lalu divalidasi sebelum disimpan. Script aman dijalankan ulang:
surah/kitab yang sudah lengkap akan dilewati.
"""

from __future__ import annotations

import argparse
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.api.reference_store import ReferenceStore  # noqa: E402

EQURAN = "https://equran.id/api/v2"
HADITH_API = "https://hadis-api-id.vercel.app"
EXPECTED_VERSES = 6236
EXPECTED_TAFSIRS = 6236
HADITH_BOOKS = (
    "abu-dawud",
    "ahmad",
    "bukhari",
    "darimi",
    "ibnu-majah",
    "malik",
    "muslim",
    "nasai",
    "tirmidzi",
)
PAGE_SIZE = 1000


def fetch_json(client: httpx.Client, url: str, **kwargs) -> dict:
    last_error: Exception | None = None
    for attempt in range(1, 4):
        try:
            response = client.get(url, **kwargs)
            response.raise_for_status()
            return response.json()
        except (httpx.HTTPError, ValueError) as exc:
            last_error = exc
            if attempt < 3:
                time.sleep(attempt * 2)
    raise RuntimeError(f"Gagal mengambil {url}: {type(last_error).__name__}")


def import_quran(store: ReferenceStore, client: httpx.Client) -> None:
    for number in range(1, 115):
        if store.surah_complete(number):
            print(f"Qur'an {number:03}/114: sudah lengkap, dilewati", flush=True)
            continue

        surah = fetch_json(client, f"{EQURAN}/surat/{number}")["data"]
        tafsir = fetch_json(client, f"{EQURAN}/tafsir/{number}")["data"]
        verses = surah.get("ayat", [])
        tafsirs = tafsir.get("tafsir", [])
        expected = int(surah["jumlahAyat"])

        if surah.get("nomor") != number:
            raise ValueError(f"Nomor surah {number} tidak sesuai respons upstream")
        if len(verses) != expected:
            raise ValueError(f"Ayat surah {number} tidak lengkap: {len(verses)}/{expected}")
        if len(tafsirs) != expected:
            raise ValueError(f"Tafsir surah {number} tidak lengkap: {len(tafsirs)}/{expected}")

        store.save_surah(surah)
        tafsir_rows = []
        for item in tafsirs:
            ayat = item.get("ayat", item.get("nomorAyat"))
            if ayat is None:
                raise ValueError(f"Tafsir surah {number} tanpa nomor ayat")
            tafsir_rows.append((int(ayat), item.get("teks", "")))
        store.save_tafsirs(number, tafsir_rows)
        print(
            f"Qur'an {number:03}/114: {surah.get('namaLatin', '')} "
            f"({expected} ayat + tafsir)",
            flush=True,
        )


def fetch_hadith_book(client: httpx.Client, slug: str) -> tuple[str, int, list[dict]]:
    meta = fetch_json(
        client, f"{HADITH_API}/hadith/{slug}", params={"page": 1, "limit": 1}
    )
    name = meta.get("name", slug.title())
    total = int(meta.get("total", 0))
    if total <= 0:
        raise ValueError(f"Total hadits {slug} tidak valid: {total}")

    rows: list[dict] = []
    page = 1
    while True:
        payload = fetch_json(
            client,
            f"{HADITH_API}/hadith/{slug}",
            params={"page": page, "limit": PAGE_SIZE},
        )
        items = payload.get("items") or []
        rows.extend(items)
        print(
            f"  {slug}: halaman {page} -> {len(rows):,}/{total:,}",
            flush=True,
        )
        if not items or len(rows) >= total:
            break
        page += 1
        if page > 5000:
            raise ValueError(f"Paginasi {slug} melebihi batas wajar")

    numbers = [int(row["number"]) for row in rows]
    if len(rows) != total or len(set(numbers)) != total:
        raise ValueError(
            f"Koleksi hadis {slug} tidak lengkap: {len(rows)}/{total} "
            f"({len(set(numbers))} nomor unik)"
        )
    return name, total, rows


def import_hadith(store: ReferenceStore, client: httpx.Client) -> None:
    for slug in HADITH_BOOKS:
        meta = fetch_json(
            client, f"{HADITH_API}/hadith/{slug}", params={"page": 1, "limit": 1}
        )
        total = int(meta.get("total", 0))
        existing = store.get_hadith_book(slug)
        if (
            existing
            and total > 0
            and existing["hadiths_count"] == total
            and existing["stored"] == total
        ):
            print(f"Hadis {slug}: sudah lengkap ({total:,}), dilewati", flush=True)
            continue

        name, total, rows = fetch_hadith_book(client, slug)
        saved = store.save_hadith_book(slug, name, total, rows)
        print(f"Hadis {slug}: {saved:,} riwayat tersimpan", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--db",
        default=None,
        help="Lokasi database SQLite (default: data/reference.sqlite3)",
    )
    parser.add_argument(
        "--only",
        choices=("all", "quran", "hadith"),
        default="all",
        help="Dataset yang akan diimpor",
    )
    parser.add_argument(
        "--rebuild",
        action="store_true",
        help="Hapus database lama lalu bangun ulang dari nol",
    )
    parser.add_argument(
        "--vacuum",
        action="store_true",
        help="Rapatkan file database setelah selesai",
    )
    args = parser.parse_args()

    store = ReferenceStore(args.db)
    if args.rebuild:
        for suffix in ("", "-wal", "-shm"):
            target = Path(f"{store.path}{suffix}")
            if target.exists():
                target.unlink()
                print(f"Dihapus: {target}", flush=True)

    store.ensure_schema()
    print(f"Database offline: {store.path}", flush=True)

    try:
        with httpx.Client(timeout=120, follow_redirects=True) as client:
            if args.only in ("all", "quran"):
                print("\n== Al-Qur'an + tafsir ==", flush=True)
                import_quran(store, client)
            if args.only in ("all", "hadith"):
                print("\n== Kitab hadits ==", flush=True)
                import_hadith(store, client)
    except KeyboardInterrupt:
        print("\nDihentikan. Data yang sudah tersimpan tetap bisa dipakai.", flush=True)
        raise SystemExit(130)
    except RuntimeError as exc:
        print(f"\nGAGAL: {exc}", flush=True)
        raise SystemExit(1)

    stats = store.stats()
    if args.only in ("all", "quran"):
        if stats["quran_verses"] != EXPECTED_VERSES:
            raise SystemExit(
                f"Jumlah ayat tidak valid: {stats['quran_verses']}/{EXPECTED_VERSES}"
            )
        if stats["quran_tafsirs"] != EXPECTED_TAFSIRS:
            raise SystemExit(
                f"Jumlah tafsir tidak valid: {stats['quran_tafsirs']}/{EXPECTED_TAFSIRS}"
            )

    store.set_meta("imported_at", datetime.now(timezone.utc).isoformat())
    store.set_meta("schema_version", "1")
    if args.vacuum:
        connection = store._write()
        try:
            connection.execute("VACUUM")
        finally:
            connection.close()
    store.optimize()

    size_mb = store.path.stat().st_size / (1024 * 1024)
    print("\nSelesai.", flush=True)
    print(f"  File     : {store.path} ({size_mb:.1f} MB)", flush=True)
    print(f"  Ayat     : {stats['quran_verses']:,}", flush=True)
    print(f"  Tafsir   : {stats['quran_tafsirs']:,}", flush=True)
    print(f"  Kitab    : {stats['hadith_books']}", flush=True)
    print(f"  Hadits   : {stats['hadiths']:,}", flush=True)


if __name__ == "__main__":
    main()
