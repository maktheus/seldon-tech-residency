import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, AlertCircle, HelpCircle, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../../types/seldon';

interface QuizModalProps {
  questions: QuizQuestion[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const QuizModal: React.FC<QuizModalProps> = ({ questions, isOpen, onClose, title = 'Desafio de Conhecimento AOSP & Seldon' }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          {!isFinished ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pr-10">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    {title}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">
                  {currentIndex + 1} / {questions.length}
                </span>
              </div>

              {/* Question */}
              <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold ring-2 ring-emerald-500/20';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950/60 border-rose-400 text-rose-200 ring-2 ring-rose-500/20';
                    } else {
                      btnStyle = 'bg-slate-900/40 border-slate-900 text-slate-600';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm border transition-all cursor-pointer flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 font-mono text-xs text-slate-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon answering */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1 font-mono">
                    {selectedOption === currentQ.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    )}
                    {selectedOption === currentQ.correctIndex ? 'Correto!' : 'Explicação Pedagógica:'}
                  </div>
                  {currentQ.explanation}
                </motion.div>
              )}

              {/* Next button */}
              {isAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-600/30"
                  >
                    <span>{currentIndex === questions.length - 1 ? 'Ver Resultado' : 'Próxima Questão'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Finished Score Card */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto text-cyan-300">
                <Trophy className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-display text-white">
                  Desafio Concluído!
                </h3>
                <p className="text-slate-400 text-sm">
                  Você acertou <strong className="text-cyan-300 font-mono text-lg">{score}</strong> de <strong className="text-slate-200 font-mono text-lg">{questions.length}</strong> questões.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all cursor-pointer border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  Refazer Quiz
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-cyan-600/30"
                >
                  Concluir
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
