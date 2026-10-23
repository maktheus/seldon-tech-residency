import React from 'react';
import { Cpu, Shield, Zap, Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/80 py-12 px-4 sm:px-6 lg:px-8 mt-20 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-white">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-base tracking-wide font-display">
              SELDON RESIDENCY
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            Programa de Residência Tecnológica focado em Android Open Source Project (AOSP), Inteligência Artificial aplicada, Cibersegurança Móvel e Otimização Energética.
          </p>
        </div>

        <div>
          <h5 className="font-mono uppercase text-slate-300 font-bold mb-3 tracking-wider text-[11px]">
            Trilhas Formativas
          </h5>
          <ul className="space-y-2">
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Núcleo Comum (210h)</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> IA & Otimização AOSP (75h)</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Segurança Móvel & Hardening (75h)</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Eficiência Energética & Pareto (75h)</li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono uppercase text-slate-300 font-bold mb-3 tracking-wider text-[11px]">
            Recursos Tecnológicos
          </h5>
          <ul className="space-y-2 font-mono text-[11px]">
            <li>• Three.js WebGL Interactive 3D</li>
            <li>• Framer Motion Dynamic Graphics</li>
            <li>• Simulador Doze Mode & Wakelocks</li>
            <li>• Simulador IPC Binder Zero-Copy</li>
            <li>• Modelagem STRIDE & Hardware StrongBox</li>
          </ul>
        </div>

        <div>
          <h5 className="font-mono uppercase text-slate-300 font-bold mb-3 tracking-wider text-[11px]">
            Deploy & Código Aberto
          </h5>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Desenvolvido com React, TypeScript, TailwindCSS e Three.js para execução estática no GitHub Pages.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300">
              Total: 435 Horas de Conteúdo
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
        <div>
          Residência Tecnológica Seldon • Todos os módulos e ementas extraídos do documento oficial.
        </div>
        <div>
          Deploy automatizado via GitHub Actions
        </div>
      </div>
    </footer>
  );
};
