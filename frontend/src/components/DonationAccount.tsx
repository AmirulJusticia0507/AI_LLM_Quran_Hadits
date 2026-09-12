"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const ACCOUNT = {
  bank: "BRI",
  number: "024501071112509",
  name: "Amirul Putra Justicia",
};

export default function DonationAccount() {
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT.number);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section aria-labelledby="account-title" className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-lg space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="account-title" className="text-xl font-bold">Transfer donasi / infaq</h2>
        <span className="rounded-xl bg-blue-50 dark:bg-blue-950/50 px-4 py-2 font-extrabold text-blue-800 dark:text-blue-300">Bank {ACCOUNT.bank}</span>
      </div>
      <dl className="space-y-4">
        <div>
          <dt className="text-sm text-slate-500 dark:text-slate-400">Nomor rekening</dt>
          <dd id="donation-account-number" className="mt-2 select-all break-all font-mono text-2xl sm:text-3xl font-bold tracking-wide text-emerald-700 dark:text-emerald-300" dir="ltr">{revealed ? ACCOUNT.number : "XXXX XXXX XXX XXXX"}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500 dark:text-slate-400">Atas nama</dt>
          <dd className="mt-1 font-semibold">{ACCOUNT.name}</dd>
        </div>
      </dl>
      <button type="button" aria-controls="donation-account-number" aria-expanded={revealed} onClick={() => { setRevealed(!revealed); setStatus("idle"); }} className="w-full rounded-xl border border-emerald-300 dark:border-emerald-800 px-5 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer">
        {revealed ? "Sembunyikan nomor rekening" : "Lihat nomor rekening"}
      </button>
      {revealed && <button type="button" onClick={copyAccount} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 cursor-pointer">
        {status === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {status === "copied" ? "Nomor rekening tersalin" : "Salin nomor rekening"}
      </button>}
      <p role="status" className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {status === "error" ? "Nomor rekening belum bisa disalin otomatis. Pilih dan salin nomor di atas secara manual." : "Pastikan nama penerima di aplikasi bank sesuai sebelum menyelesaikan transfer."}
      </p>
    </section>
  );
}
