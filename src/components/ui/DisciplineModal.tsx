import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Target, BookOpen, Cpu, Code, CheckCircle, Sparkles } from 'lucide-react';
import { Discipline, ModuleData } from '../../types/seldon';

interface DisciplineModalProps {
  discipline: Discipline | null;
  moduleData: ModuleData | null;
  onClose: () => void;
}

export const DisciplineModal: React.FC<DisciplineModalProps> = ({ discipline, moduleData, onClose }) => {
  if (!discipline || !moduleData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-slate-700/80 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 pr-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold" style={{ backgroundColor: `${moduleData.color}25`, color: moduleData.color, border: `1px solid ${moduleData.color}50` }}>
                {moduleData.title.split('–')[0]}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Carga Horária: {discipline.hours}h
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {discipline.name}
            </h2>
          </div>

          {/* Objective Box */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
            <Target className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Objetivo Pedagógico da Disciplina:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {discipline.objective}
              </p>
            </div>
          </div>

          {/* Syllabus Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>Ementa Oficial e Conteúdos Programáticos</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {discipline.syllabus}
            </div>
          </div>

          {/* Key Topics Tags */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Competências & Habilidades Centrais:
            </span>
            <div className="flex flex-wrap gap-2">
              {discipline.keyTopics.map((topic, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/70 border border-slate-700 text-xs font-mono text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Practical Case Study */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/80 space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h4 className="text-base font-bold text-white font-display">
                Caso Prático na Indústria: {discipline.practicalCase.title}
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-100">Cenário: </strong>
              {discipline.practicalCase.scenario}
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-slate-100">Metodologia & Solução: </strong>
              {discipline.practicalCase.solution}
            </p>

            {/* Metrics if present */}
            {discipline.practicalCase.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {discipline.practicalCase.metrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 block">{m.label}</span>
                    <span className="text-sm font-bold font-mono text-cyan-300 mt-0.5 block">{m.value}</span>
                    {m.delta && <span className="text-[10px] text-emerald-400 font-mono">{m.delta}</span>}
                  </div>
                ))}
              </div>
            )}

            {/* Code snippet if present */}
            {discipline.practicalCase.codeSnippet && (
              <div className="space-y-1 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Code className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Código de Exemplo AOSP / Kotlin:</span>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-200 overflow-x-auto">
                  {discipline.practicalCase.codeSnippet}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-cyan-600/30"
            >
              Fechar Detalhes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
