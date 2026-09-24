import os
import sqlite3
import tempfile
import unittest
from contextlib import closing
from datetime import datetime, timedelta
from pathlib import Path
from unittest.mock import patch
from uuid import uuid4

from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.api.visits import WIB, record_visit, router


class VisitorAdminTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.db = str(Path(self.temp.name) / 'visits.db')
        self.env = patch.dict(os.environ, {'VISITS_DB_PATH': self.db, 'ADMIN_API_TOKEN': 'test-bridge-' + 'a' * 32, 'ADMIN_PASSWORD': 'test-password-long-enough'})
        self.env.start()
        app = FastAPI()
        app.include_router(router)
        self.client = TestClient(app)
        self.headers = {'Authorization': 'Bearer ' + os.environ['ADMIN_API_TOKEN']}

    def tearDown(self):
        self.env.stop()
        self.temp.cleanup()

    def test_authentication_and_persistent_login_limit(self):
        self.assertEqual(self.client.get('/api/admin/visits').status_code, 401)
        self.assertEqual(self.client.post('/api/admin/login', json={'password': 'anything'}).status_code, 401)
        login = lambda password: self.client.post('/api/admin/login', headers=self.headers, json={'password': password})
        self.assertEqual(login('test-password-long-enough').status_code, 200)
        for _ in range(10):
            self.assertEqual(login('wrong').status_code, 401)
        self.assertEqual(login('wrong').status_code, 429)
        with patch.dict(os.environ, {'ADMIN_API_TOKEN': ''}):
            self.assertEqual(self.client.get('/api/admin/visits', headers=self.headers).status_code, 503)

    def test_history_metadata_duplicates_pagination_and_filters(self):
        visitor = str(uuid4())
        payload = {'visitor_id': visitor, 'event_id': str(uuid4()), 'path': '/quran', 'device': 'Mobile', 'browser': 'Chrome', 'os': 'Android'}
        self.assertEqual(self.client.post('/api/visits', json=payload).status_code, 200)
        self.client.post('/api/visits', json=payload)
        for _ in range(26):
            record_visit(visitor, str(uuid4()), path='/doa', device='Desktop')
        result = self.client.get('/api/admin/visits', headers=self.headers).json()
        self.assertEqual((result['views'], result['visitors'], result['pages'], len(result['items'])), (27, 1, 2, 25))
        result = self.client.get('/api/admin/visits?device=Mobile', headers=self.headers).json()
        self.assertEqual(result['views'], 1)
        self.assertEqual(result['items'][0]['os'], 'Android')
        self.assertEqual(result['items'][0]['visitor'], visitor)
        self.assertEqual(len(self.client.get('/api/admin/visits?page=2', headers=self.headers).json()['items']), 2)
        self.assertEqual(self.client.get('/api/admin/visits?start=2026-01-01&end=2026-12-31', headers=self.headers).status_code, 400)
        self.assertEqual(self.client.get('/api/admin/visits?device=arbitrary', headers=self.headers).status_code, 422)
        for path in ['/admin/pengunjung', '/api/admin/visits', '/quran?q=private', '//evil.com']:
            self.assertIn(self.client.post('/api/visits', json={**payload, 'path': path}).status_code, [400, 422])

    def test_migration_preserves_total_and_retention(self):
        with closing(sqlite3.connect(self.db)) as db, db:
            db.execute('CREATE TABLE totals (id INTEGER PRIMARY KEY, views INTEGER NOT NULL)')
            db.execute('INSERT INTO totals VALUES (1, 120)')
        today = datetime.now(WIB).date()
        old = (today - timedelta(days=31)).isoformat()
        record_visit('old', 'old', day=old)
        result = record_visit('new', 'new')
        self.assertEqual(result['total_views'], 122)
        with closing(sqlite3.connect(self.db)) as db:
            self.assertEqual(db.execute('SELECT COUNT(*) FROM visit_history').fetchone()[0], 1)
            columns = [row[1] for row in db.execute('PRAGMA table_info(visit_history)')]
            self.assertNotIn('ip', columns)
            self.assertNotIn('user_agent', columns)


if __name__ == '__main__':
    unittest.main()
