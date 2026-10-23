import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Flame, BatteryMedium, Cpu, CheckCircle } from 'lucide-react';

interface ParetoPoint {
  id: string;
  name: string;
  fps: number;
  powerMw: number;
  tempC: number;
  batteryHours: number;
  cpuGovernor: string;
  isParetoOptimal: boolean;
}

const CANDIDATES: ParetoPoint[] = [
  { id: '1', name: 'Ultra Economia (Doze Cap)', fps: 30, powerMw: 320, tempC: 28.5, batteryHours: 18.5, cpuGovernor: 'powersave @ 800MHz', isParetoOptimal: true },
  { id: '2', name: 'Leve / Leitura', fps: 45, powerMw: 580, tempC: 30.2, batteryHours: 12.8, cpuGovernor: 'schedutil (LITTLE cores)', isParetoOptimal: true },
  { id: '3', name: 'Equilibrado Seldon (Pareto Sweet Spot)', fps: 60, powerMw: 920, tempC: 33.8, batteryHours: 9.6, cpuGovernor: 'schedutil dinâmico', isParetoOptimal: true },
  { id: '4', name: 'Fluidez Alta (90Hz)', fps: 90, powerMw: 1750, tempC: 38.0, batteryHours: 5.4, cpuGovernor: 'interactive boost', isParetoOptimal: true },
  { id: '5', name: 'Extremo / 120 FPS Gaming', fps: 120, powerMw: 3600, tempC: 44.5, batteryHours: 2.8, cpuGovernor: 'performance (Prime Core)', isParetoOptimal: true },
  { id: 'sub1', name: 'Configuração Subótima A', fps: 45, powerMw: 1400, tempC: 37.0, batteryHours: 6.8, cpuGovernor: 'userspace legado', isParetoOptimal: false },
  { id: 'sub2', name: 'Configuração Subótima B', fps: 60, powerMw: 2200, tempC: 41.2, batteryHours: 4.3, cpuGovernor: 'ondemand sem EAS', isParetoOptimal: false }
];

export const ParetoOptimizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('3');
  const active = CANDIDATES.find((c) => c.id === selectedId) || CANDIDATES[2];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-amber-400" />
            <h4 className="text-lg font-bold text-white font-display">
              Fronteira de Pareto & Otimização Multiobjetivo
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Selecione uma configuração no espaço de soluções e veja como algoritmos genéticos (NSGA-II) encontram o equilíbrio entre FPS, Potência e Térmica
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-xs font-mono text-amber-300">
          Minimizar: [Potência + Temperatura] • Maximizar: [FPS]
        </span>
      </div>

      {/* Interactive Candidate Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {CANDIDATES.filter(c => c.isParetoOptimal).map((c) => {
          const isSelected = selectedId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-950/70 border-amber-400 text-white shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-amber-400 font-bold">{c.fps} FPS</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Pareto Optimal" />
              </div>
              <div className="font-bold text-xs text-slate-200 truncate">{c.name}</div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">{c.powerMw} mW</div>
            </button>
          );
        })}
      </div>

      {/* Trade-off Display Dashboard */}
      <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>Taxa de Quadros (FPS)</span>
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300">{active.fps} FPS</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full transition-all duration-500" style={{ width: `${(active.fps / 120) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <BatteryMedium className="w-4 h-4 text-amber-400" />
            <span>Potência Dissipada</span>
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">{active.powerMw} mW</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${(active.powerMw / 3600) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Temperatura do SoC</span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300">{active.tempC} °C</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-rose-400 h-full transition-all duration-500" style={{ width: `${((active.tempC - 20) / 30) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Autonomia em Tela</span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300">{active.batteryHours} Horas</div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${(active.batteryHours / 20) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-slate-300 flex items-start gap-2">
        <span className="text-amber-400 text-base">📐</span>
        <div>
          <strong className="text-white">Conceito de Não-Dominância de Pareto:</strong> A configuração de 60 FPS com 920 mW é Pareto-ótima porque qualquer tentativa de aumentar o FPS para 90 exigirá gastar +830 mW. Nenhuma outra configuração conhecida entrega 60 FPS gastando menos de 920 mW sem quebrar restrições de estabilidade.
        </div>
      </div>
    </div>
  );
};
