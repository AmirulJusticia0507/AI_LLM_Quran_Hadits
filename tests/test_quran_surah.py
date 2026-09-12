import unittest
from unittest.mock import patch
import httpx
from app.api.quran import QuranAPI


class SurahTests(unittest.IsolatedAsyncioTestCase):
    async def test_all_surahs_keep_requested_number_and_use_one_request(self):
        original = httpx.AsyncClient
        calls = []

        def respond(request):
            number = int(request.url.path.rsplit('/', 1)[1])
            calls.append(number)
            return httpx.Response(200, json={'data': {
                'nomor': number, 'namaLatin': f'Surah {number}', 'jumlahAyat': 2,
                'ayat': [{'nomorAyat': a, 'teksArab': 'fixture', 'teksIndonesia': f'{number}:{a}'} for a in (1, 2)],
            }})

        with patch('app.api.quran.httpx.AsyncClient', side_effect=lambda **kw: original(transport=httpx.MockTransport(respond), **kw)):
            for number in range(1, 115):
                result = await QuranAPI().get_surah(number)
                self.assertEqual(result['nomor_surah'], number)
                self.assertEqual([v['nomor_ayat'] for v in result['ayat']], [1, 2])
                self.assertTrue(all(v['nomor_surah'] == number for v in result['ayat']))
        self.assertEqual(calls, list(range(1, 115)))

    async def test_wrong_or_partial_upstream_data_is_rejected(self):
        original = httpx.AsyncClient
        for data in [
            {'nomor': 1, 'ayat': [1]},
            {'nomor': 36, 'namaLatin': 'Ya-Sin', 'jumlahAyat': 83, 'ayat': [{'nomorAyat': 1, 'teksArab': 'fixture', 'teksIndonesia': 'fixture'}]},
        ]:
            with patch('app.api.quran.httpx.AsyncClient', side_effect=lambda **kw: original(transport=httpx.MockTransport(lambda r: httpx.Response(200, json={'data': data})), **kw)):
                self.assertEqual((await QuranAPI().get_surah(36))['status'], 'error')

    async def test_invalid_number(self):
        for number in (0, 115):
            self.assertEqual((await QuranAPI().get_surah(number))['status'], 'error')
