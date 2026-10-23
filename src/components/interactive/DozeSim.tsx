import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, BatteryCharging, BatteryWarning, Moon, Sun, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const DozeSim: React.FC = () => {
  const [hasWakelockLeak, setHasWakelockLeak] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<'active' | 'screen_off' | 'sensing' | 'light_doze' | 'deep_doze' | 'maintenance'>('deep_doze');

  const states = [
    { id: 'active', label: 'Tela Ligada', power: hasWakelockLeak ? '1.450 mW' : '1.200 mW', sleep: '0%' },
    { id: 'screen_off', label: 'Tela Desligada', power: hasWakelockLeak ? '680 mW' : '220 mW', sleep: '10%' },
    { id: 'sensing', label: 'Sensing (Repouso)', power: hasWakelockLeak ? '520 mW' : '95 mW', sleep: '40%' },
    { id: 'light_doze', label: 'Light Doze', power: hasWakelockLeak ? '450 mW' : '45 mW', sleep: '75%' },
    { id: 'deep_doze', label: 'Deep Doze (Deep Sleep)', power: hasWakelockLeak ? '410 mW (TRAVADO!)' : '8 mW', sleep: hasWakelockLeak ? '0%' : '98%' },
    { id: 'maintenance', label: 'Janela de Manutenção', power: '280 mW', sleep: '20%' }
  ];

  const drainOvernight = hasWakelockLeak ? '34.8%' : '2.1%';
  const hoursLeft = hasWakelockLeak ? '~7.2 horas' : '~180 horas';

  return (
    <div className="glass-panel p-6 rounded-2xl border border-amber-500/30 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-amber-400" />
            <h4 className="text-lg font-bold text-white font-display">
              Simulador do Ciclo de Vida do Doze Mode & Wakelocks
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Veja na prática como um `PARTIAL_WAKE_LOCK` mal gerenciado impede o AOSP de entrar em Deep Sleep
          </p>
        </div>

        {/* Leak Toggle */}
        <div className="flex items-center gap-3 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setHasWakelockLeak(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              !hasWakelockLeak
                ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-200 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            WorkManager Correto
          </button>
          <button
            onClick={() => setHasWakelockLeak(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              hasWakelockLeak
                ? 'bg-rose-600/30 border border-rose-500 text-rose-200 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Wakelock Leaked!
          </button>
        </div>
      </div>

      {/* State Machine Transition Timeline */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
          Estados da Máquina de Estados do PowerManager:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {states.map((s) => {
            const isSelected = currentState === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setCurrentState(s.id as any)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? hasWakelockLeak && s.id === 'deep_doze'
                      ? 'bg-rose-950/60 border-rose-400 text-rose-200 ring-2 ring-rose-500/20'
                      : 'bg-amber-950/60 border-amber-400 text-amber-200 ring-2 ring-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase">{s.label}</div>
                <div className="text-sm font-bold mt-1 text-white">{s.power}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Sleep: {s.sleep}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-world Comparison Output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-mono">Dreno de Bateria (8h em repouso)</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-mono ${hasWakelockLeak ? 'text-rose-400' : 'text-emerald-400'}`}>
              -{drainOvernight}
            </span>
            <span className="text-xs text-slate-400">
              {hasWakelockLeak ? 'Dreno Vampiro Crítico' : 'Consumo Quase Nulo'}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-mono">Autonomia Restante no Estado Atual</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-cyan-300">
              {hoursLeft}
            </span>
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-mono">Comportamento de Rede & Alarmes</span>
          <div className="text-xs text-slate-300">
            {hasWakelockLeak
              ? 'CPU bloqueada de dormir. Rádio celular mantido ativo em estado DCH de alta potência.'
              : 'Conexões suspensas. Sincronizações agrupadas estritamente na Janela de Manutenção.'}
          </div>
        </div>
      </div>

      {/* Code comparison tip */}
      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
        <span className="text-amber-400 font-bold">Solução Pedagógica:</span> Nunca use <code className="text-rose-300">wakeLock.acquire()</code> sem timeout explícito. Utilize <code className="text-emerald-300">WorkManager</code> com <code className="text-cyan-300">Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()</code> para deixar o AOSP agendar a execução quando o aparelho já estiver acordado ou conectado à tomada.
      </div>
    </div>
  );
};
