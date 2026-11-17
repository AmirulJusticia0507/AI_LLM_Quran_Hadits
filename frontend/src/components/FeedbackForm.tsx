"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function FeedbackForm() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nama = String(data.get("nama") ?? "").trim();
    const asal = String(data.get("asal") ?? "").trim();
    const pesan = String(data.get("pesan") ?? "").trim();
    if (!nama || !asal || !pesan) {
      setError(isEn ? "Please fill in your name, origin, and message." : "Isi nama, asal, dan pesan terlebih dahulu. Isian tidak boleh hanya spasi.");
      return;
    }
    setError("");
    const message = [
      isEn ? "Assalamu'alaikum, I would like to provide feedback for Al-Hikmah AI." : "Assalamu'alaikum, saya ingin menyampaikan masukan untuk Al-Hikmah AI.",
      "",
      `${isEn ? "Sender Name" : "Nama pengirim"}: ${nama}`,
      `${isEn ? "Origin/City" : "Asal"}: ${asal}`,
      "",
      `${isEn ? "Feedback message" : "Isi pesan"}:`,
      pesan
    ].join("\n");
    window.location.assign(`https://wa.me/6282134402383?text=${encodeURIComponent(message)}`);
  }
  const fieldClass = "mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-600";
  return <form onSubmit={submit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
    <label className="block text-sm font-medium">
      {isEn ? "Sender Name" : "Nama pengirim"}
      <input name="nama" autoComplete="name" required maxLength={100} className={fieldClass} placeholder={isEn ? "Your name" : "Nama kamu"} />
    </label>
    <label className="block text-sm font-medium">
      {isEn ? "Origin / Location" : "Asal / dari mana"}
      <input name="asal" required maxLength={150} className={fieldClass} placeholder={isEn ? "e.g. Jakarta / study community" : "Contoh: Bandung / komunitas belajar"} />
      <span className="mt-2 block text-xs text-slate-500">
        {isEn ? "Just city or community, no full address needed." : "Cukup kota atau komunitas, tidak perlu alamat lengkap."}
      </span>
    </label>
    <label className="block text-sm font-medium">
      {isEn ? "Message" : "Isi pesan"}
      <textarea name="pesan" required maxLength={1500} rows={6} className={fieldClass} placeholder={isEn ? "Share suggestions, issue reports, or features you want to see…" : "Ceritakan saran, kendala, atau fitur yang kamu harapkan…"} />
    </label>
    {error && <p role="alert" className="text-sm text-rose-600 dark:text-rose-300">{error}</p>}
    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
      {isEn
        ? "The button below opens WhatsApp with your pre-filled message. Review and send it via WhatsApp. This form does not store messages in any website database."
        : "Tombol berikut membuka WhatsApp dengan pesan yang sudah terisi. Periksa pesannya lalu tekan kirim di WhatsApp. Formulir ini tidak menyimpan masukan ke database website."}
    </p>
    <button type="submit" className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
      {isEn ? "Continue to WhatsApp →" : "Lanjut ke WhatsApp →"}
    </button>
  </form>;
}
