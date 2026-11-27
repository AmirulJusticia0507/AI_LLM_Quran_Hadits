"use client";

import { useState, useRef, useCallback } from "react";

// Model pilihan — ringan & cocok untuk offline chat
export const WEB_LLM_MODELS = [
  {
    id: "Qwen2.5-0.5B-Instruct-q4f16_1-MLC",
    label: "Qwen2.5 0.5B (ringan ~380MB)",
    size: "~380 MB",
    desc: "Sangat ringan, respons cepat",
  },
  {
    id: "Llama-3.2-1B-Instruct-q4f16_1-MLC",
    label: "Llama 3.2 1B (sedang ~700MB)",
    size: "~700 MB",
    desc: "Lebih akurat, butuh lebih banyak RAM",
  },
  {
    id: "Phi-3.5-mini-instruct-q4f16_1-MLC",
    label: "Phi-3.5 Mini (kuat ~2.2GB)",
    size: "~2.2 GB",
    desc: "Paling akurat, butuh GPU/RAM besar",
  },
] as const;

export type WebLLMModelId = (typeof WEB_LLM_MODELS)[number]["id"];

export type WebLLMStatus =
  | "idle"
  | "loading"
  | "ready"
  | "generating"
  | "error";

interface WebLLMEngine {
  chat: {
    completions: {
      create: (opts: {
        messages: { role: string; content: string }[];
        temperature?: number;
        max_tokens?: number;
        stream?: boolean;
      }) => Promise<AsyncIterable<{ choices: { delta: { content?: string }; finish_reason?: string }[] }>>;
    };
  };
  unload: () => Promise<void>;
}

interface InitProgressReport {
  progress: number;
  timeElapsed: number;
  text: string;
}

export function useWebLLM() {
  const [status, setStatus] = useState<WebLLMStatus>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadText, setLoadText] = useState("");
  const [loadedModel, setLoadedModel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef<WebLLMEngine | null>(null);

  const loadModel = useCallback(async (modelId: WebLLMModelId) => {
    setStatus("loading");
    setLoadProgress(0);
    setError(null);
    setLoadText("Memuat WebLLM engine…");

    try {
      // Dynamic import agar tidak masuk bundle utama
      const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

      // Unload model sebelumnya jika ada
      if (engineRef.current) {
        await engineRef.current.unload().catch(() => {});
        engineRef.current = null;
      }

      const engine = await CreateMLCEngine(modelId, {
        initProgressCallback: (report: InitProgressReport) => {
          setLoadProgress(Math.round(report.progress * 100));
          setLoadText(report.text || `Memuat model… ${Math.round(report.progress * 100)}%`);
        },
      });

      engineRef.current = engine as unknown as WebLLMEngine;
      setLoadedModel(modelId);
      setStatus("ready");
      setLoadText("Model siap digunakan!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Gagal memuat model";
      setError(msg);
      setStatus("error");
    }
  }, []);

  const generate = useCallback(
    async (
      messages: { role: "user" | "assistant" | "system"; content: string }[],
      onChunk: (chunk: string) => void,
      onDone: () => void
    ) => {
      if (!engineRef.current || status !== "ready") return;
      setStatus("generating");
      try {
        const stream = await engineRef.current.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "Kamu adalah asisten Al-Hikmah AI yang membantu memahami Islam, Al-Qur'an, dan Hadits. Jawab dengan bahasa Indonesia yang sopan, ringkas, dan berdasarkan sumber yang shahih. Mode offline aktif — kamu berjalan langsung di browser pengguna.",
            },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 1024,
          stream: true,
        });
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) onChunk(delta);
          if (chunk.choices[0]?.finish_reason) break;
        }
        onDone();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Gagal generate";
        setError(msg);
      } finally {
        setStatus("ready");
      }
    },
    [status]
  );

  const unload = useCallback(async () => {
    if (engineRef.current) {
      await engineRef.current.unload().catch(() => {});
      engineRef.current = null;
    }
    setStatus("idle");
    setLoadedModel(null);
    setLoadProgress(0);
    setLoadText("");
  }, []);

  return {
    status,
    loadProgress,
    loadText,
    loadedModel,
    error,
    loadModel,
    generate,
    unload,
    isReady: status === "ready",
    isLoading: status === "loading",
    isGenerating: status === "generating",
  };
}
