"use client";

import { useState } from "react";
import { WifiOff, Download, Cpu, ChevronDown, ChevronUp, X, AlertTriangle } from "lucide-react";
import { WEB_LLM_MODELS, type WebLLMModelId, type WebLLMStatus } from "@/hooks/useWebLLM";

interface OfflineModeProps {
  status: WebLLMStatus;
  loadProgress: number;
  loadText: string;
  loadedModel: string | null;
  error: string | null;
  onLoad: (modelId: WebLLMModelId) => void;
  onUnload: () => void;
  onDismiss?: () => void;
}

export default function OfflineModePanel({
  status,
  loadProgress,
  loadText,
  loadedModel,
  error,
  onLoad,
  onUnload,
  onDismiss,
}: OfflineModeProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState<WebLLMModelId>(
    WEB_LLM_MODELS[0].id
  );

  const isIdle = status === "idle";
  const isLoading = status === "loading";
  const isReady = status === "ready" || status === "generating";
  const isError = status === "error";

  const currentModelInfo = WEB_LLM_MODELS.find((m) => m.id === loadedModel);

  return (
    <div className="rounded-2xl border border-amber-300/50 dark:border-amber-700/40 bg-amber-50 dark:bg-amber-950/40 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="shrink-0 w-8 h-8 rounded-full bg-amber-200 dark:bg-amber-800/60 flex items-center justify-center">
          <WifiOff className="w-4 h-4 text-amber-700 dark:text-amber-300" />
        </div>
        <div className="flex-1 min-w-0">
          {isReady ? (
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              ✅ Mode Offline Aktif
              {currentModelInfo && (
                <span className="ml-2 text-xs font-normal text-slate-500 dark:text-slate-400">
                  {currentModelInfo.label}
                </span>
              )}
            </p>
          ) : (
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Backend offline — Aktifkan Mode Offline
            </p>
          )}
          <p className="text-xs text-amber-700/70 dark:text-amber-400/70 truncate">
            {isReady
              ? "AI berjalan langsung di browser kamu (WebGPU)"
              : "Jalankan model AI langsung di browser tanpa internet"}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {isReady && (
            <button
              onClick={onUnload}
              title="Nonaktifkan mode offline"
              className="text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-1 rounded"
            >
              Nonaktifkan
            </button>
          )}
          {!isReady && onDismiss && (
            <button
              onClick={onDismiss}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {!isReady && (
            <button
              onClick={() => setExpanded((p) => !p)}
              className="text-amber-700 dark:text-amber-300 p-1 rounded hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors"
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Loading progress */}
      {isLoading && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium">
              {loadText || "Memuat model…"}
            </span>
          </div>
          <div className="w-full bg-amber-200 dark:bg-amber-800/40 rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-right text-xs text-amber-600 dark:text-amber-400 mt-1">
            {loadProgress}%
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            ⚠️ Model akan tersimpan di cache browser. Download hanya sekali.
          </p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="px-4 pb-4">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 dark:text-red-300">
              <p className="font-semibold mb-1">Gagal memuat model</p>
              <p>Browser mungkin tidak mendukung WebGPU. Gunakan Chrome 113+ atau Edge 113+.</p>
              {error && <p className="mt-1 text-[11px] opacity-80 break-all">{error}</p>}
            </div>
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="mt-3 w-full text-sm py-2 rounded-xl border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Panel pilih model (idle / error + expanded) */}
      {(isIdle || isError) && expanded && (
        <div className="px-4 pb-4 border-t border-amber-200/60 dark:border-amber-800/40 pt-3">
          {/* WebGPU info */}
          <div className="flex items-start gap-2 mb-3 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/30">
            <Cpu className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              WebLLM berjalan di GPU browser kamu via WebGPU. Butuh Chrome/Edge 113+. Model diunduh 1× lalu tersimpan di cache.
            </p>
          </div>

          {/* Model selector */}
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-2">
            Pilih Model:
          </label>
          <div className="flex flex-col gap-2 mb-3">
            {WEB_LLM_MODELS.map((model) => (
              <label
                key={model.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedModel === model.id
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-600"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="webllm-model"
                  value={model.id}
                  checked={selectedModel === model.id}
                  onChange={() => setSelectedModel(model.id)}
                  className="mt-0.5 accent-emerald-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {model.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {model.desc} · <span className="font-medium text-amber-600 dark:text-amber-400">{model.size}</span>
                  </p>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={() => onLoad(selectedModel)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Muat Model & Aktifkan Offline
          </button>
        </div>
      )}

      {/* Idle collapsed — tombol aktifkan */}
      {isIdle && !expanded && (
        <div className="px-4 pb-3">
          <button
            onClick={() => setExpanded(true)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-amber-400 dark:border-amber-600 text-amber-800 dark:text-amber-200 text-sm hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors"
          >
            <Cpu className="w-4 h-4" />
            Aktifkan Mode Offline (WebLLM)
          </button>
        </div>
      )}
    </div>
  );
}
