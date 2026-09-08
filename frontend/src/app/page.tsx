"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send,
  Trash2,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  BookOpen,
  ScrollText,
  ShieldCheck,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  ArrowUp,
  History,
  Plus,
  Download,
  X
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SUGGESTED_PROMPTS = [
  {
    title: "Keutamaan Surah Al-Kahfi",
    prompt: "Apa saja keutamaan membaca Surah Al-Kahfi pada hari Jumat berdasarkan hadits sahih?",
    category: "Al-Qur'an",
    icon: BookOpen,
  },
  {
    title: "Hadits Menjaga Lisan",
    prompt: "Tuliskan hadits tentang pentingnya menjaga lisan dan tutur kata yang baik beserta artinya.",
    category: "Hadits",
    icon: ScrollText,
  },
  {
    title: "Tafsir Ringkas Ayat Kursi",
    prompt: "Jelaskan makna dan keagungan Ayat Kursi (Al-Baqarah: 255) dalam ajaran Islam.",
    category: "Tafsir",
    icon: Lightbulb,
  },
  {
    title: "Adab dan Tata Cara Shalat Tahajud",
    prompt: "Bagaimana tata cara shalat Tahajud, waktu terbaik melaksanakannya, dan doa yang dianjurkan?",
    category: "Fiqih & Ibadah",
    icon: ShieldCheck,
  },
];

interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
  messages: Message[];
}

const SESSIONS_KEY = "alhikmah_chat_sessions";

function sessionTitle(msgs: Message[]): string {
  const first = msgs.find((m) => m.role === "user")?.content.trim() ?? "";
  if (!first) return "Percakapan Baru";
  return first.length > 42 ? first.slice(0, 42) + "…" : first;
}

function blankSession(): ChatSession {
  return {
    id: crypto.randomUUID(),
    title: "Percakapan Baru",
    updatedAt: new Date().toISOString(),
    messages: [],
  };
}

// Lazy state init — reads localStorage during initial render (client only).
// Avoids setState inside useEffect which violates the strict lint rule.
// Migrates legacy single-history format into the first session.
function loadSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(SESSIONS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    const legacy = localStorage.getItem("alhikmah_chat_messages");
    const legacyId = localStorage.getItem("alhikmah_session_id") || crypto.randomUUID();
    if (legacy) {
      const msgs = JSON.parse(legacy);
      if (Array.isArray(msgs) && msgs.length > 0) {
        return [{
          id: legacyId,
          title: sessionTitle(msgs),
          updatedAt: new Date().toISOString(),
          messages: msgs,
        }];
      }
    }
  } catch {}
  return [blankSession()];
}

function persistSessions(next: ChatSession[]) {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(next));
  } catch {}
}

export default function ChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>(loadSessions);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const activeId = pinnedId ?? sessions[0]?.id ?? "";
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [llmStatus, setLlmStatus] = useState<"checking" | "online" | "offline">("checking");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Ref accumulates streamed tokens outside React render cycle — avoids
  // React compiler's "immutable captured variable" error on reassignment.
  const assistantContentRef = useRef("");

  const activeSession = sessions.find((s) => s.id === activeId) ?? sessions[0];
  const messages = useMemo(() => activeSession?.messages ?? [], [activeSession]);
  // Session id doubles as backend session id — history stays per conversation.
  const sessionId = activeSession?.id ?? "";

  // Single write path: updates active session messages + auto-title + persist.
  const updateMessages = (updater: (prev: Message[]) => Message[]) => {
    setSessions((prev) => {
      const next = prev.map((s) => {
        if (s.id !== activeId) return s;
        const msgs = updater(s.messages);
        return {
          ...s,
          messages: msgs,
          title: s.title === "Percakapan Baru" ? sessionTitle(msgs) : s.title,
          updatedAt: new Date().toISOString(),
        };
      });
      persistSessions(next);
      return next;
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      setShowScrollTop(scrollHeight - scrollTop - clientHeight > 300);
    }
  }, []);

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const autoResizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const resetTextareaHeight = () => {
    const el = textareaRef.current;
    if (el) el.style.height = "auto";
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => setLlmStatus(data.llm_configured ? "online" : "offline"))
      .catch(() => setLlmStatus("offline"));
  }, []);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = query.trim();
    if (!textToSend) {
      setInput("");
      resetTextareaHeight();
    }

    const timestamp = getCurrentTime();

    updateMessages((prev) => [
      ...prev, 
      { role: "user", content: userMessage, timestamp }
    ]);
    setLoading(true);

    try {
      // Try streaming first
      const res = await fetch(`${API_URL}/api/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, session_id: sessionId }),
      });

      if (res.ok && res.headers.get("content-type")?.includes("text/event-stream")) {
        // SSE streaming — use ref to accumulate tokens without violating
        // React compiler's immutability rules on local const variables.
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        assistantContentRef.current = "";

        updateMessages((prev) => [
          ...prev,
          { role: "assistant", content: "", timestamp: getCurrentTime() },
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.type === "token") {
                    assistantContentRef.current += data.text;
                    updateMessages((prev) => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: assistantContentRef.current,
                      };
                      return updated;
                    });
                  } else if (data.type === "error") {
                    assistantContentRef.current = `Maaf, ${data.message}`;
                    updateMessages((prev) => {
                      const updated = [...prev];
                      updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: assistantContentRef.current,
                      };
                      return updated;
                    });
                  }
                } catch {}
              }
            }
          }
        }
      } else {
        // Fallback to non-streaming
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 503) {
            throw new Error("LLM belum dikonfigurasi. Silakan isi GEMINI_API_KEY di .env atau jalankan Ollama.");
          }
          throw new Error(data.detail || "Gagal memproses pesan dari server.");
        }
        updateMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response, timestamp: getCurrentTime() },
        ]);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan koneksi";
      // Remove empty assistant message if it exists
      updateMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && !last.content) {
          return prev.slice(0, -1);
        }
        return prev;
      });
      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim",
        text: errorMessage,
        confirmButtonColor: "#059669",
        customClass: {
          popup: "rounded-2xl dark:bg-slate-900 dark:text-white border dark:border-slate-800"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index as unknown as number);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearChat = () => {
    Swal.fire({
      title: "Hapus Riwayat Chat?",
      text: "Semua pesan dalam sesi percakapan ini akan dihapus.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus Semua",
      cancelButtonText: "Batal",
      customClass: {
        popup: "rounded-2xl dark:bg-slate-900 dark:text-white border dark:border-slate-800"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset sesi aktif dengan id backend baru + bersihkan format lama
        const newId = crypto.randomUUID();
        setSessions((prev) => {
          const next = prev.map((s) =>
            s.id === activeId
              ? { ...s, id: newId, title: "Percakapan Baru", messages: [], updatedAt: new Date().toISOString() }
              : s
          );
          persistSessions(next);
          return next;
        });
        setPinnedId(newId);
        try {
          localStorage.removeItem("alhikmah_chat_messages");
          localStorage.removeItem("alhikmah_session_id");
        } catch {}
      }
    });
  };

  const createSession = () => {
    const fresh = blankSession();
    setSessions((prev) => {
      const next = [fresh, ...prev];
      persistSessions(next);
      return next;
    });
    setPinnedId(fresh.id);
    resetTextareaHeight();
    setShowSessions(false);
  };

  const deleteSession = (id: string) => {
    const next = sessions.filter((s) => s.id !== id);
    const final = next.length > 0 ? next : [blankSession()];
    persistSessions(final);
    setSessions(final);
    if (id === activeId) setPinnedId(final[0]?.id ?? null);
  };

  const sessionToMarkdown = (s: ChatSession): string => {
    const lines = [
      `# ${s.title}`,
      "",
      `_Diekspor dari Al-Hikmah AI • ${new Date(s.updatedAt).toLocaleString("id-ID")}_`,
      "",
    ];
    for (const m of s.messages) {
      const who = m.role === "user" ? "🧑 Anda" : "🤖 Al-Hikmah AI";
      lines.push(`## ${who}${m.timestamp ? ` • ${m.timestamp}` : ""}`, "", m.content, "");
    }
    return lines.join("\n");
  };

  const exportSession = () => {
    if (!activeSession || messages.length === 0) return;
    const blob = new Blob([sessionToMarkdown(activeSession)], {
      type: "text/markdown;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    const safe = activeSession.title.slice(0, 30).replace(/[^\w\- ]+/g, "").trim() || "chat";
    a.download = `al-hikmah-${safe}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyAllSession = async () => {
    if (!activeSession || messages.length === 0) return;
    try {
      await navigator.clipboard.writeText(sessionToMarkdown(activeSession));
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Seluruh percakapan disalin!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {}
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-5xl mx-auto w-full px-2 sm:px-4">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-3 sm:mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 truncate">
              Chatbot AI Keislaman
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                llmStatus === "online"
                  ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300/40 dark:border-emerald-800/40"
                  : llmStatus === "offline"
                  ? "bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border-red-300/40 dark:border-red-800/40"
                  : "bg-yellow-100 dark:bg-yellow-950/80 text-yellow-700 dark:text-yellow-300 border-yellow-300/40 dark:border-yellow-800/40"
              }`}>
                {llmStatus === "online" ? "Online" : llmStatus === "offline" ? "Offline" : "Checking..."}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Tanyakan masalah agama, Al-Qur&apos;an, Hadits & Tafsir secara responsif
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowSessions((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all active:scale-95 cursor-pointer ${
              showSessions
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            }`}
            title="Riwayat percakapan"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Riwayat ({sessions.length})</span>
          </button>
          <button
            onClick={createSession}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200 dark:border-emerald-900/50 transition-all active:scale-95 cursor-pointer"
            title="Mulai percakapan baru"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chat Baru</span>
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 rounded-xl border border-rose-200 dark:border-rose-900/50 transition-all active:scale-95 cursor-pointer"
              title="Hapus pesan di sesi ini"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bersihkan</span>
            </button>
          )}
        </div>
      </div>

      {/* Sessions Panel */}
      {showSessions && (
        <div className="mb-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg p-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-56 overflow-y-auto space-y-1.5">
            {sessions.map((s) => {
              const isActive = s.id === activeId;
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all ${
                    isActive
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800"
                      : "bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <button
                    onClick={() => {
                      setPinnedId(s.id);
                      setShowSessions(false);
                    }}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <p className={`text-xs font-semibold truncate ${isActive ? "text-emerald-700 dark:text-emerald-300" : "text-slate-800 dark:text-slate-200"}`}>
                      {s.title}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                      {s.messages.length} pesan • {new Date(s.updatedAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </button>
                  {sessions.length > 1 && (
                    <button
                      onClick={() => deleteSession(s.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
                      title="Hapus sesi ini"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {messages.length > 0 && (
            <div className="flex gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <button
                onClick={copyAllSession}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> Salin Semua
              </button>
              <button
                onClick={exportSession}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Unduh .md
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Chat Box Container */}
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 relative min-h-0"
      >
        
        {/* Empty State / Welcome Screen */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] py-6 sm:py-8 text-center max-w-2xl mx-auto space-y-4 sm:space-y-6 px-2">
            <div className="relative">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-3xl bg-linear-to-tr from-emerald-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white text-3xl sm:text-4xl shadow-xl shadow-emerald-500/25">
                🕌
              </div>
              <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow-md">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
              </div>
            </div>

            <div>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2 tracking-tight">
                Assalamu&apos;alaikum Wr. Wb.
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Selamat datang di <span className="font-semibold text-emerald-600 dark:text-emerald-400">Al-Hikmah AI</span>. Ajukan pertanyaan seputar hukum Islam, ayat Al-Qur&apos;an, hadits sahih, maupun panduan ibadah.
              </p>
            </div>

            {/* Quick Prompt Cards Grid */}
            <div className="w-full pt-2 sm:pt-4">
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 text-left">
                💡 Contoh Pertanyaan Populer:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {SUGGESTED_PROMPTS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(item.prompt)}
                      className="group p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all text-left flex items-start gap-3 cursor-pointer"
                    >
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate pr-2">
                            {item.title}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {item.prompt}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Message Bubbles */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 sm:gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center text-sm font-semibold shrink-0 shadow-md ${
                msg.role === "user"
                  ? "bg-linear-to-tr from-emerald-600 to-teal-600 text-white"
                  : "bg-slate-800 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble Content — w-fit agar lebar mengikuti isi, max-w agar adaptif di layar kecil */}
            <div
              className={`w-fit max-w-[92%] sm:max-w-[85%] md:max-w-[78%] min-w-16 rounded-3xl p-3 sm:p-4 md:p-5 relative group ${
                msg.role === "user"
                  ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs shadow-lg shadow-emerald-600/15"
                  : "bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-slate-700/80 shadow-md"
              }`}
            >
              {/* Header inside Bubble */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-700/60 text-xs">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  {msg.role === "assistant" ? (
                    <><Sparkles className="w-3.5 h-3.5" /> Al-Hikmah Assistant</>
                  ) : (
                    <><User className="w-3.5 h-3.5" /> Anda</>
                  )}
                </span>
                <button
                  onClick={() => copyToClipboard(msg.content, `${msg.role}-${i}`)}
                  className="flex items-center gap-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1 rounded-md cursor-pointer"
                  title="Salin Pesan"
                >
                  {copiedIndex === (`${msg.role}-${i}` as unknown as number) ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] text-emerald-500">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Message content — Markdown for AI, plain for user */}
              {msg.role === "assistant" ? (
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none min-w-0 prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 overflow-wrap-anywhere wrap-break-word prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:text-xs sm:prose-pre:text-sm prose-table:block prose-table:overflow-x-auto prose-table:max-w-full prose-img:max-w-full prose-img:rounded-xl prose-code:wrap-break-word">
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </Markdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere leading-relaxed text-sm md:text-base font-normal min-w-0">
                  {msg.content}
                </div>
              )}

              {/* Timestamp */}
              {msg.timestamp && (
                <div
                  className={`text-[10px] mt-2 text-right ${
                    msg.role === "user"
                      ? "text-emerald-100/80"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {msg.timestamp}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start gap-2 sm:gap-3 animate-in fade-in duration-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-slate-800 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 px-4 sm:px-5 py-3 sm:py-4 rounded-3xl rounded-tl-xs shadow-md flex items-center gap-3">
              <div className="flex gap-1.5 items-center">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" />
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                Al-Hikmah AI sedang memproses jawaban & rujukan...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 sm:bottom-28 right-4 sm:right-6 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center hover:bg-emerald-500 transition-all active:scale-95 cursor-pointer animate-in fade-in touch-manipulation"
        >
          <ArrowUp className="w-4 h-4 sm:w-4 sm:h-4" />
        </button>
      )}

      {/* Input Form Bar */}
      <div className="mt-3 sm:mt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-end gap-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2 sm:p-2 shadow-xl focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500 transition-all"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResizeTextarea();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Tanyakan hal tentang Al-Qur'an, Hadits, Fiqih... (Enter kirim, Shift+Enter baris baru)"
            disabled={loading}
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none text-sm sm:text-base disabled:opacity-50 min-w-0 resize-none overflow-y-auto max-h-40 leading-relaxed"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2 text-sm shrink-0 cursor-pointer touch-manipulation"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span className="hidden sm:inline">Kirim</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-[10px] sm:text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
          Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[9px] sm:text-[10px]">Enter</kbd> untuk mengirim, <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[9px] sm:text-[10px]">Shift+Enter</kbd> baris baru. AI dapat membuat kekeliruan, selalu tabayyun dengan ulama.
        </p>
      </div>
    </div>
  );
}
