import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Bug, Lock, Unlock, Terminal } from 'lucide-react';

interface ThreatItem {
  id: string;
  component: string;
  type: string;
  vuln: string;
  impact: string;
  mitigation: string;
  mitigated: boolean;
}

const INITIAL_THREATS: ThreatItem[] = [
  {
    id: 't1',
    component: 'VaultContentProvider',
    type: 'Content Provider',
    vuln: 'android:exported="true" sem android:readPermission',
    impact: 'Qualquer app malicioso no dispositivo pode ler os dados de telemetria e tokens SQLite privados.',
    mitigation: 'Definir android:readPermission="com.seldon.sec.READ_VAULT" com nível de proteção signature.',
    mitigated: false
  },
  {
    id: 't2',
    component: 'NetworkSecurityConfig',
    type: 'Configuração de Rede',
    vuln: 'cleartextTrafficPermitted="true"',
    impact: 'Transmissão de tráfego HTTP sem TLS, suscetível a ataques Man-in-the-Middle (MitM) na rede Wi-Fi.',
    mitigation: 'Forçar cleartextTrafficPermitted="false" e aplicar Certificate Pinning (HPKP).',
    mitigated: false
  },
  {
    id: 't3',
    component: 'DiagnosticReceiver',
    type: 'Broadcast Receiver',
    vuln: 'Intent Implícita não protegida',
    impact: 'Injeção de comandos de depuração falsos forçando o app a limpar o cache ou reiniciar serviços.',
    mitigation: 'Configurar android:exported="false" e exigir permissão de sistema para intents locais.',
    mitigated: false
  }
];

export const ThreatModelSim: React.FC = () => {
  const [threats, setThreats] = useState<ThreatItem[]>(INITIAL_THREATS);
  const [activeConsoleLog, setActiveConsoleLog] = useState<string>('Console pronto. Selecione uma vulnerabilidade para simular o exploit ou aplique a mitigação.');

  const toggleMitigation = (id: string) => {
    setThreats((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newState = !t.mitigated;
          if (newState) {
            setActiveConsoleLog(`[HARDENING APLICADO] ${t.component}: Política restritiva compilada com sucesso. Ataques bloqueados pelo SELinux/Sandbox.`);
          } else {
            setActiveConsoleLog(`[ALERTA DE SEGURANÇA] ${t.component}: Proteção desativada. Vetor de ataque aberto para exploração.`);
          }
          return { ...t, mitigated: newState };
        }
        return t;
      })
    );
  };

  const simulateExploit = (threat: ThreatItem) => {
    if (threat.mitigated) {
      setActiveConsoleLog(`[EXPLOIT BLOQUEADO] Tentativa de ataque a ${threat.component}: SecurityException disparada! O sistema operacional Android rejeitou a requisição por falta de permissão.`);
    } else {
      setActiveConsoleLog(`[EXPLOIT BEM SUCEDIDO] Invadindo ${threat.component}... DADOS EXTRAÍDOS COM SUCESSO! Vulnerabilidade crítica comprovada.`);
    }
  };

  const allMitigated = threats.every((t) => t.mitigated);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <h4 className="text-lg font-bold text-white font-display">
              Matriz de Modelagem de Ameaças & Hardening AOSP
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulador interativo de auditoria de segurança estática e dinâmica em componentes Android
          </p>
        </div>

        <button
          onClick={() => {
            const willMitigateAll = !allMitigated;
            setThreats((prev) => prev.map((t) => ({ ...t, mitigated: willMitigateAll })));
            setActiveConsoleLog(
              willMitigateAll
                ? '[DEVSECOPS] Todas as diretivas de hardening foram aplicadas em lote! Auditoria 100% aprovada.'
                : '[DEVSECOPS] Todas as mitigações foram revertidas para estado vulnerável.'
            );
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer bg-slate-900 border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/40"
        >
          {allMitigated ? 'Desativar Todas as Mitigações' : '🛡️ Aplicar Hardening em Todas'}
        </button>
      </div>

      {/* Threats Grid */}
      <div className="space-y-3">
        {threats.map((threat) => (
          <div
            key={threat.id}
            className={`p-4 rounded-xl border transition-all ${
              threat.mitigated
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : 'bg-rose-950/20 border-rose-500/40'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${threat.mitigated ? 'bg-emerald-400' : 'bg-rose-400 animate-ping'}`} />
                <span className="font-mono font-bold text-white text-sm">{threat.component}</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400">
                  {threat.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => simulateExploit(threat)}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-800/60 rounded text-xs font-mono transition-all cursor-pointer flex items-center gap-1"
                >
                  <Bug className="w-3.5 h-3.5" />
                  Testar Exploit
                </button>
                <button
                  onClick={() => toggleMitigation(threat.id)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${
                    threat.mitigated
                      ? 'bg-emerald-600/30 border border-emerald-500 text-emerald-200'
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {threat.mitigated ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  {threat.mitigated ? 'Hardening Ativo' : 'Vulnerável (Corrigir)'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="text-slate-300">
                <span className="text-rose-400 font-mono block text-[11px]">Vulnerabilidade Identificada:</span>
                <code className="text-rose-200 font-mono text-[11px] block mt-0.5">{threat.vuln}</code>
                <p className="text-slate-400 mt-1 text-[11px]">{threat.impact}</p>
              </div>
              <div className="text-slate-300">
                <span className="text-emerald-400 font-mono block text-[11px]">Mitigação AOSP Recomendada:</span>
                <code className="text-emerald-200 font-mono text-[11px] block mt-0.5">{threat.mitigation}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Terminal Log Output */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
        <div className="flex items-center gap-2 text-slate-500 pb-1 border-b border-slate-800">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Console de Teste Automatizado de Segurança (MobSF / ADB Runner)</span>
        </div>
        <p className="text-emerald-300 pt-1 leading-relaxed">
          {activeConsoleLog}
        </p>
      </div>
    </div>
  );
};
