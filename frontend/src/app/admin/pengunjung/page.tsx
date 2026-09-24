"use client";

import { useCallback, useEffect, useState } from 'react';
import { LockKeyhole, LogOut, RefreshCw, Users, MonitorSmartphone } from 'lucide-react';

type Visit = { visitor: string; visited_at: string; path: string; device: string; browser: string; os: string };
type History = { items: Visit[]; views: number; visitors: number; page: number; pages: number; retention_days: number };
const inputClass = 'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900';
const devices: Record<string, string> = { Mobile: 'HP', Tablet: 'Tablet', Desktop: 'Desktop', Bot: 'Bot', Unknown: 'Tidak diketahui' };
function todayWib() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()); }

export default function VisitorHistory() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState<History | null>(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [device, setDevice] = useState('');
  const [applied, setApplied] = useState({ start: '', end: '', device: '' });

  const load = useCallback(async (from: string, to: string, kind: string, page = 1) => {
    setBusy(true); setError(''); setData(null);
    try {
      const params = new URLSearchParams({ start: from, end: to, page: String(page) });
      if (kind) params.set('device', kind);
      const response = await fetch(`/api/admin/visits?${params}`, { cache: 'no-store' });
      if (response.status === 401) { setAuthenticated(false); throw new Error('Sesi berakhir. Silakan login kembali.'); }
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || 'Riwayat gagal dimuat.');
      setData(result);
      setApplied({ start: from, end: to, device: kind });
    } catch (problem) { setError(problem instanceof Error ? problem.message : 'Koneksi bermasalah. Silakan coba lagi.'); }
    finally { setBusy(false); }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function initialize() {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('Gagal memeriksa sesi.');
        const session = await response.json();
        if (controller.signal.aborted) return;
        const today = todayWib();
        setStart(today); setEnd(today); setAuthenticated(session.authenticated);
        if (session.authenticated) await load(today, today, '');
      } catch {
        if (!controller.signal.aborted) { setAuthenticated(false); setError('Sesi belum dapat diperiksa. Silakan login.'); }
      }
    }
    void initialize();
    return () => controller.abort();
  }, [load]);

  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || 'Login gagal.');
      setPassword(''); setAuthenticated(true);
      const today = todayWib(); setStart(today); setEnd(today); setDevice('');
      await load(today, today, '');
    } catch (problem) { setError(problem instanceof Error ? problem.message : 'Koneksi bermasalah.'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/api/admin/session', { method: 'DELETE' });
      if (!response.ok) throw new Error('Gagal keluar. Silakan coba lagi.');
      setAuthenticated(false); setData(null); setPassword('');
    } catch { setError('Gagal keluar. Silakan coba lagi.'); }
    finally { setBusy(false); }
  }

  return <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 text-slate-800 dark:text-slate-100">
    <header className="flex flex-wrap items-start justify-between gap-4 rounded-3xl bg-linear-to-br from-emerald-800 to-teal-950 p-6 text-white sm:p-8">
      <div><p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-200"><LockKeyhole className="h-4 w-4" />Khusus admin</p><h1 className="text-2xl font-bold sm:text-3xl">Riwayat Pengunjung</h1><p className="mt-2 text-sm text-emerald-100">Lihat kunjungan, halaman yang dibuka, dan perkiraan perangkat pengunjung.</p></div>
      {authenticated && <button disabled={busy} onClick={logout} className="flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2 text-sm disabled:opacity-50"><LogOut className="h-4 w-4" />Keluar</button>}
    </header>
    {error && <p role="alert" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">{error}</p>}
    {authenticated === null ? <p role="status">Memeriksa sesi admin…</p> : !authenticated ? <form onSubmit={login} className="mx-auto max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-bold">Masuk sebagai admin</h2><p className="text-sm text-slate-500 dark:text-slate-400">Gunakan password admin untuk melihat detail riwayat. Sesi berlaku 8 jam.</p>
      <label className="block text-sm font-medium">Password admin<input type="password" required maxLength={256} autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className={`${inputClass} mt-2`} /></label>
      <button disabled={busy} className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white disabled:opacity-50">{busy ? 'Memeriksa…' : 'Masuk'}</button>
    </form> : <>
      <form onSubmit={event => { event.preventDefault(); void load(start, end, device); }} className="grid items-end gap-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-2 text-sm"><span>Dari tanggal (WIB)</span><input type="date" required value={start} onChange={event => setStart(event.target.value)} className={inputClass} /></label>
        <label className="space-y-2 text-sm"><span>Sampai tanggal (WIB)</span><input type="date" required min={start} value={end} onChange={event => setEnd(event.target.value)} className={inputClass} /></label>
        <label className="space-y-2 text-sm"><span>Perangkat</span><select value={device} onChange={event => setDevice(event.target.value)} className={inputClass}><option value="">Semua perangkat</option>{Object.entries(devices).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <button disabled={busy} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"><RefreshCw className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} />{busy ? 'Memuat…' : 'Tampilkan'}</button>
      </form>
      {busy && <p role="status" className="text-sm">Memuat riwayat kunjungan…</p>}
      {data && <>
        <div className="grid gap-4 sm:grid-cols-2">{[[Users, 'Browser unik dalam hasil', data.visitors], [MonitorSmartphone, 'Pembukaan halaman dalam hasil', data.views]].map(([Icon, title, count], index) => { const Symbol = Icon as typeof Users; return <div key={index} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30"><Symbol className="mb-2 h-5 w-5 text-emerald-600" /><p className="text-sm">{title as string}</p><p className="mt-1 text-3xl font-bold">{Number(count).toLocaleString('id-ID')}</p></div>; })}</div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800"><table className="w-full min-w-[750px] text-left text-sm"><caption className="p-4 text-left font-semibold">Detail kunjungan — terbaru lebih dahulu</caption><thead className="bg-slate-100 dark:bg-slate-900"><tr>{['Waktu (WIB)', 'ID browser anonim', 'Halaman', 'Perangkat', 'Browser', 'Sistem operasi'].map(title => <th scope="col" className="p-3" key={title}>{title}</th>)}</tr></thead><tbody>{data.items.map((visit, index) => <tr key={`${visit.visitor}-${visit.visited_at}-${index}`} className="border-t border-slate-200 dark:border-slate-800"><td className="whitespace-nowrap p-3">{new Date(visit.visited_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}</td><td className="p-3"><span title={visit.visitor} className="font-mono">{visit.visitor.slice(0, 8)}…</span><details className="text-xs"><summary className="cursor-pointer text-emerald-700 dark:text-emerald-300">ID lengkap</summary><span className="block max-w-44 break-all pt-2">{visit.visitor}</span></details></td><td className="p-3 font-mono">{visit.path}</td><td className="p-3">{devices[visit.device] || visit.device}</td><td className="p-3">{visit.browser}</td><td className="p-3">{visit.os}</td></tr>)}</tbody></table>{!data.items.length && <p className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">Belum ada kunjungan tercatat pada filter ini. Coba tanggal atau perangkat lain.</p>}</div>
        <div className="flex items-center justify-between gap-3 text-sm"><button disabled={busy || data.page <= 1} onClick={() => load(applied.start, applied.end, applied.device, data.page - 1)} className="rounded-xl border px-4 py-2 disabled:opacity-40">Sebelumnya</button><span>Halaman {data.page} / {data.pages}</span><button disabled={busy || data.page >= data.pages} onClick={() => load(applied.start, applied.end, applied.device, data.page + 1)} className="rounded-xl border px-4 py-2 disabled:opacity-40">Berikutnya</button></div>
      </>}
      <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">Detail tersimpan selama 30 hari sejak pencatatan riwayat diaktifkan. ID menunjukkan browser, bukan identitas orang. Perangkat dan browser adalah perkiraan; mode privat, penghapusan penyimpanan, dan bot dapat memengaruhi hitungan. IP, nama asli, dan isi chat tidak dicatat. Halaman admin tidak dihitung sebagai kunjungan.</p>
    </>}
  </div>;
}
