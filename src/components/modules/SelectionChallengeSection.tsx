import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Brain, 
  Zap, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Sparkles,
  ArrowRight,
  Code2,
  Calendar,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'pending';
  output: string;
}

export const SelectionChallengeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'t1' | 't2' | 't3' | 'rubrica'>('t1');
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simResults, setSimResults] = useState<TestResult[]>([
    { id: '1', name: 'T1: Buffer Overflow Binder (>800 KB Rejeitado)', status: 'passed', output: 'status_code: 400 | reason: BUFFER_OVERFLOW' },
    { id: '2', name: 'T1: Prevenção de Ataque de Repetição (Token Replay)', status: 'passed', output: 'status_code: 403 | reason: REPLAY_ATTACK_DETECTED' },
    { id: '3', name: 'T2: Cálculo do Erro Quadrático Médio (MSE Exato)', status: 'passed', output: 'MSE = 0.000000 (nominal) vs 0.142850 (anomalia)' },
    { id: '4', name: 'T2: Detecção de Anomalia de Telemetria (Jank & CPU)', status: 'passed', output: 'is_anomaly: True | risk_level: CRITICAL' },
    { id: '5', name: 'T3: Salvaguarda Térmica de Emergência (>48°C)', status: 'passed', output: 'profile: THERMAL_EMERGENCY | applied_fps: 30' },
    { id: '6', name: 'T3: Fallback de 120 FPS para BALANCED com Bateria Baixa', status: 'passed', output: 'profile: BALANCED | safety_fallback_applied: True' }
  ]);

  const copyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/maktheus/seldon-tech-residency.git');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const runLiveSimulation = () => {
    setSimRunning(true);
    setTimeout(() => {
      setSimRunning(false);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  return (
    <section id="desafio-tecnico" className="space-y-8 scroll-mt-20">
      {/* SECTION HEADER CARD */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/40 relative overflow-hidden space-y-6 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Processo Seletivo Oficial 2026
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
            <Clock className="w-3.5 h-3.5" />
            Entrega: Terça-feira até 23:59
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
            <Users className="w-3.5 h-3.5" />
            30 Candidatos Convocados
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 text-xs font-mono font-bold">
            <Calendar className="w-3.5 h-3.5" />
            Entrevistas: Quarta e Quinta-feira
          </span>
        </div>

        {/* Title and Intro */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Desafio Técnico Prático: <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400">
              Mini-Seldon Telemetry & Security Engine
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl font-sans">
            Para a admissão na <strong>Residência Tecnológica Seldon</strong>, estruturamos um desafio prático cirúrgico em <strong>Python puro</strong>. 
            Aproximadamente <strong>80% da arquitetura já está implementada</strong> (estruturas de dados, simulação e suíte de 15 testes unitários). 
            Sua missão é completar <strong>3 funções essenciais</strong> cobrindo os pilares do programa: Segurança Móvel, Inteligência Artificial Embarcada e Otimização Energética.
          </p>
        </div>

        {/* NOTA DE ESCLARECIMENTO DE ESCOPO / Z3 */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs text-amber-200/90 leading-relaxed font-sans">
            <strong className="text-amber-300 font-mono block sm:inline">Delimitação de Escopo & Z3: </strong>
            O teste de admissão exige <strong>única e exclusivamente</strong> as 3 tarefas em Python do Starter Kit. Ferramentas e tecnologias avançadas presentes no manual (como o provador formal <strong>Microsoft Z3</strong>, daemons nativos em <strong>Rust</strong>, compilação completa do <strong>AOSP</strong> e bancada física <strong>Monsoon</strong>) representam pesquisas formativas que <em>entraram como evolução posterior da residência</em> e serão ensinadas durante as 435 horas de especialização. Elas <strong>NÃO</strong> fazem parte dos requisitos para entrega nesta terça-feira!
          </div>
        </div>

        {/* DOWNLOAD ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="./starter_kit_seldon_2026.zip"
            download="starter_kit_seldon_2026.zip"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Starter Kit (.zip)</span>
          </a>

          <a
            href="./desafio_tecnico_seldon_2026.pdf"
            download="Desafio_Tecnico_Seldon_2026.pdf"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 font-medium text-xs font-mono transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Guia Oficial do Desafio (.pdf)</span>
          </a>

          <a
            href="./manual_seldon_tecnico.pdf"
            download="Manual_Seldon_Residencia_Tecnologica.pdf"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-medium text-xs font-mono transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Manual Completo 44p (LaTeX)</span>
          </a>

          <button
            onClick={copyClone}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-mono transition-all cursor-pointer"
          >
            {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copiedCmd ? 'Copiado!' : 'git clone repo'}</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE TASK EXPLORER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Detalhamento das 3 Tarefas Guiadas (TODOs)
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Dedicação total estimada: de 2 a 4 horas líquidas de código limpo em Python 3.8+
            </p>
          </div>

          {/* Task Select Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('t1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 't1'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Tarefa 1: Segurança</span>
            </button>

            <button
              onClick={() => setActiveTab('t2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 't2'
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Tarefa 2: IA & MSE</span>
            </button>

            <button
              onClick={() => setActiveTab('t3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 't3'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Tarefa 3: Energia</span>
            </button>

            <button
              onClick={() => setActiveTab('rubrica')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rubrica'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Rubrica da Banca</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 't1' && (
            <motion.div
              key="t1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                  Módulo 3 • Engenharia de Segurança
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Arquivo: <code>seldon_core/security_guard.py</code>
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Guardião de Segurança de Transações IPC Binder
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                O subsistema de IPC Binder no Android compartilha memória restrita no kernel. O candidato deve implementar o método <code>validate_transaction</code>:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold block">1. Validação de Buffer</span>
                  <p className="text-slate-400 text-[11px]">
                    Rejeitar parcels &gt; 800 KB (819.200 bytes) com status 400 (BUFFER_OVERFLOW) e &le; 0 (INVALID_SIZE).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-violet-400 font-bold block">2. Anti-Replay Attack</span>
                  <p className="text-slate-400 text-[11px]">
                    Rejeitar chamadas repetindo tokens conhecidos dentro da janela de TTL (60s) com status 403 (REPLAY_ATTACK_DETECTED).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">3. Limpeza & Aprovação</span>
                  <p className="text-slate-400 text-[11px]">
                    Executar <code>clean_expired_tokens</code>, registrar tokens íntegros e aprovar com status 200 (APPROVED).
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 't2' && (
            <motion.div
              key="t2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-950 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold">
                  Módulo 2 • IA & Sinais de Telemetria
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Arquivo: <code>seldon_core/anomaly_detector.py</code>
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Detector de Anomalias com Erro Quadrático Médio (MSE)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Implementação matemática do cálculo de dispersão de sinal e orquestração do pipeline de predição sobre frames multivariados de 6 sinais:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-violet-400 font-bold block">1. Função calculate_mse(a, b)</span>
                  <p className="text-slate-400 text-[11px]">
                    Calcular rigorosamente MSE = (1/N) * &Sigma; (a_i - b_i)&sup2;. Deve lançar ValueError para vetores vazios ou com comprimentos distintos.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">2. Função evaluate_frame(frame)</span>
                  <p className="text-slate-400 text-[11px]">
                    Normalizar vetor, simular reconstrução do Autoencoder, calcular erro MSE e classificar <code>is_anomaly</code> contra o limiar configurado.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 't3' && (
            <motion.div
              key="t3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                  Módulo 4 • Eficiência Energética & DVFS
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Arquivo: <code>seldon_core/power_tuner.py</code>
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Otimizador de Perfis Térmicos & Fronteira de Pareto
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Gerenciador autônomo de frequências de SoC (big.LITTLE) e taxa de atualização visual (FPS):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-red-400 font-bold block">1. Emergência Térmica</span>
                  <p className="text-slate-400 text-[11px]">
                    Se temperatura &gt; 48°C OU bateria &le; 15%, aplicar forçadamente THERMAL_EMERGENCY (30 FPS e clocks mínimos).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block">2. Regra de Performance</span>
                  <p className="text-slate-400 text-[11px]">
                    120 FPS concedido apenas sob temperatura &le; 42°C e bateria &gt; 30%. Caso contrário, aplicar fallback para BALANCED.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">3. Regra Eco & Histórico</span>
                  <p className="text-slate-400 text-[11px]">
                    FPS &le; 60 opera em modo ECO (1100 mW). Salvar histórico e retornar flags de fallback de segurança.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rubrica' && (
            <motion.div
              key="rubrica"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  Banca Examinadora • Critérios de Seleção
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Entrevistas: Quarta e Quinta-feira (15 minutos individuais)
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">
                Matriz de Avaliação (0 a 100 Pontos)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">1. Testes Automatizados</span>
                  <span className="text-cyan-400 font-bold text-xl block my-1">40 Pontos</span>
                  <p className="text-slate-400 text-[11px]">
                    15 testes unitários em <code>test_desafio.py</code>. Executados em lote na quarta de manhã.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">2. Rigor & Código Limpo</span>
                  <span className="text-violet-400 font-bold text-xl block my-1">30 Pontos</span>
                  <p className="text-slate-400 text-[11px]">
                    Conformidade PEP 8, tratamento de limites numéricos e respostas da ficha de 1 página.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">3. Entrevista Técnica</span>
                  <span className="text-emerald-400 font-bold text-xl block my-1">30 Pontos</span>
                  <p className="text-slate-400 text-[11px]">
                    Defesa de decisões de arquitetura e respostas às 5 perguntas-chave da banca examinadora.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* LIVE SIMULATOR: INTERACTIVE TEST RUNNER PREVIEW */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 bg-slate-950/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base sm:text-lg font-bold font-mono text-white">
              Suíte de 15 Testes Automatizados (Live Preview)
            </h3>
          </div>

          <button
            onClick={runLiveSimulation}
            disabled={simRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${simRunning ? 'animate-spin' : ''}`} />
            <span>{simRunning ? 'Executando...' : 'Re-executar Testes'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 font-mono">
          Comando executado pelo candidato: <code>python -m unittest tests/test_desafio.py -v</code>
        </p>

        {/* Test Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 font-mono text-xs">
          {simResults.map((t) => (
            <div
              key={t.id}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-start justify-between gap-2"
            >
              <div className="space-y-1">
                <span className="text-slate-200 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  {t.name}
                </span>
                <span className="text-[11px] text-cyan-400/90 block">
                  {t.output}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                PASS
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Tempo total de execução da suíte: <strong>0.002s</strong> (Python 3 Unittest)</span>
          <span className="text-emerald-400 font-bold">✓ 15/15 Testes Aprovados</span>
        </div>
      </div>
    </section>
  );
};
