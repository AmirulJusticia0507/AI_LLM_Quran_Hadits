"use client";

import { useState } from 'react';
import { ArrowLeft, Award, Check, CheckCircle2, Eye, EyeOff, MessageCircle, RotateCcw, XCircle } from 'lucide-react';
import { hiwarScenarios, type HiwarOption, type HiwarScenario } from '@/data/hiwar-tes';

interface CompletedTurn {
  speaker: string;
  promptArab: string;
  promptLatin: string;
  promptArti: string;
  chosen: HiwarOption;
}

interface TesNgobrolArabProps {
  onClose: () => void;
}

export default function TesNgobrolArab({ onClose }: TesNgobrolArabProps) {
  const [activeScenario, setActiveScenario] = useState<HiwarScenario>(hiwarScenarios[0]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<HiwarOption | null>(null);
  const [showHelperText, setShowHelperText] = useState(true);
  const [history, setHistory] = useState<CompletedTurn[]>([]);
  const [finished, setFinished] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

  const currentTurn = activeScenario.turns[turnIndex];
  const score = history.filter((item) => item.chosen.isCorrect).length;

  const resetScenario = (scenario: HiwarScenario) => {
    setActiveScenario(scenario);
    setTurnIndex(0);
    setSelectedOption(null);
    setHistory([]);
    setFinished(false);
  };

  const handleChoose = (option: HiwarOption) => {
    if (selectedOption) return;
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption || !currentTurn) return;
    const updated = [
      ...history,
      {
        speaker: currentTurn.speaker,
        promptArab: currentTurn.promptArab,
        promptLatin: currentTurn.promptLatin,
        promptArti: currentTurn.promptArti,
        chosen: selectedOption,
      },
    ];
    setHistory(updated);
    setSelectedOption(null);

    if (turnIndex + 1 < activeScenario.turns.length) {
      setTurnIndex((prev) => prev + 1);
    } else {
      setFinished(true);
      setCompletedScenarios((prev) =>
        prev.includes(activeScenario.id) ? prev : [...prev, activeScenario.id]
      );
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Panel Tes */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/70 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Tes Ngobrol Bahasa Arab (Hiwar)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pilih balasan percakapan yang tepat lengkap dengan transliterasi &amp; terjemahan Indonesia.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowHelperText((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-400 cursor-pointer"
            >
              {showHelperText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showHelperText ? 'Sembunyikan Transliterasi & Arti' : 'Tampilkan Transliterasi & Arti'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Kamus
            </button>
          </div>
        </div>

        {/* Pilihan Skenario */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Pilih skenario percakapan ({hiwarScenarios.length} topik tersedia • selesai {completedScenarios.length}/{hiwarScenarios.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {hiwarScenarios.map((scenario) => {
              const isDone = completedScenarios.includes(scenario.id);
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => resetScenario(scenario)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeScenario.id === scenario.id
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5" />}
                  {scenario.title} ({scenario.level})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Isi Simulasi Percakapan */}
      {!finished && currentTurn ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              Skenario: {activeScenario.title}
            </span>
            <span>
              Giliran {turnIndex + 1} dari {activeScenario.turns.length}
            </span>
          </div>

          {/* Balon Ucapan Lawan Bicara */}
          <div className="rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/60 p-5 space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {currentTurn.speaker} berkata:
            </p>
            <p
              dir="rtl"
              lang="ar"
              className="font-amiri text-2xl sm:text-3xl leading-loose text-slate-900 dark:text-white text-right"
            >
              {currentTurn.promptArab}
            </p>
            {showHelperText && (
              <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/50 space-y-1">
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  {currentTurn.promptLatin}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  &ldquo;{currentTurn.promptArti}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Pilihan Balasan */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pilih balasan yang tepat:
            </p>
            <div className="grid gap-3">
              {currentTurn.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                let borderStyle = 'border-slate-200 dark:border-slate-800 hover:border-emerald-500';
                if (selectedOption) {
                  if (opt.isCorrect) {
                    borderStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30';
                  } else if (isSelected && !opt.isCorrect) {
                    borderStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={Boolean(selectedOption)}
                    onClick={() => handleChoose(opt)}
                    className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer disabled:cursor-default ${borderStyle}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1">
                        <p
                          dir="rtl"
                          lang="ar"
                          className="font-amiri text-xl sm:text-2xl leading-loose text-slate-900 dark:text-white text-right"
                        >
                          {opt.arab}
                        </p>
                        {(showHelperText || Boolean(selectedOption)) && (
                          <>
                            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                              {opt.latin}
                            </p>
                            {Boolean(selectedOption) && (
                              <p className="text-xs text-slate-600 dark:text-slate-300">
                                {opt.arti}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      {selectedOption && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                      )}
                      {selectedOption && isSelected && !opt.isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-1" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedOption && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4">
              <p className={`text-sm font-medium ${selectedOption.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                {selectedOption.feedback}
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 shrink-0 cursor-pointer"
              >
                {turnIndex + 1 < activeScenario.turns.length ? 'Lanjut Percakapan →' : 'Lihat Hasil Tes'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Hasil Akhir Skenario */
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Selesai! Skor Anda: {score} / {activeScenario.turns.length}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ringkasan dialog lengkap skenario {activeScenario.title} (Arab, Transliterasi, &amp; Terjemahan)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => resetScenario(activeScenario)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Ulangi Skenario
            </button>
          </div>

          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    {item.speaker}
                  </span>
                  <p dir="rtl" lang="ar" className="font-amiri text-xl text-right text-slate-900 dark:text-white">
                    {item.promptArab}
                  </p>
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{item.promptLatin}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{item.promptArti}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Jawaban Anda ({item.chosen.isCorrect ? 'Benar' : 'Kurang Tepat'})
                  </span>
                  <p dir="rtl" lang="ar" className="font-amiri text-xl text-right text-slate-900 dark:text-white">
                    {item.chosen.arab}
                  </p>
                  <p className="text-xs font-medium text-teal-700 dark:text-teal-400">{item.chosen.latin}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{item.chosen.arti}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
