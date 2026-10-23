import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Shield, Zap, BookOpen, Layers, Terminal, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';

interface ProjectSpec {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  icon: any;
  literature: {
    title: string;
    authors: string;
    venue: string;
    contribution: string;
  }[];
  architecture: {
    layers: {
      name: string;
      color: string;
      components: string[];
      description: string;
    }[];
    dataFlow: string[];
    sla: { metric: string; target: string }[];
  };
}

const PROJECTS: ProjectSpec[] = [
  {
    id: 2,
    title: 'Projeto 2: Seldon Anomaly Watcher',
    subtitle: 'Otimização Autônoma do AOSP com IA On-Device e Detecção em Nanossegundos',
    badge: 'Módulo 2 • IA & Otimização',
    color: '#8b5cf6',
    icon: Brain,
    literature: [
      {
        title: 'BPF Performance Tools: Deep Analysis and Mobile/Server Observability',
        authors: 'Brendan Gregg',
        venue: 'Addison-Wesley Professional, 2019',
        contribution: 'Demonstra a superioridade de pontos de rastreamento estáticos (tracepoints) e buffers sem bloqueio no kernel em relação ao sampling periódico via /proc, reduzindo o overhead de observabilidade para < 1.5% da CPU.'
      },
      {
        title: 'LSTM-based Encoder-Decoder for Multi-sensor Anomaly Detection',
        authors: 'Pankaj Malhotra et al.',
        venue: 'ICML Workshop on Anomaly Detection, 2016',
        contribution: 'Comprova que redes neurais autoassociativas aprendem dinâmicas multivariadas complexas em séries temporais de sistema operacional, superando regras estáticas de desvio padrão na detecção de falhas silenciosas.'
      },
      {
        title: 'Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference',
        authors: 'Benoit Jacob et al. (Google Research)',
        venue: 'IEEE CVPR, 2018',
        contribution: 'Estabelece a base matemática da quantização afim (FP32 -> INT8), permitindo que tensores sejam computados com matemática de inteiros puros em NPUs/DSPs, poupando 75% de RAM e acelerando a inferência em 4x.'
      }
    ],
    architecture: {
      layers: [
        {
          name: '1. Kernel Probe & Telemetria AOSP',
          color: '#06b6d4',
          components: ['ftrace tracefs', 'sched_switch events', '/dev/binder interceptor', 'ART GC pause counter'],
          description: 'Amostragem em memória circular ashmem com resolução de nanossegundos e zero-overhead na thread principal de renderização.'
        },
        {
          name: '2. Engine de IA On-Device (LiteRT / NNAPI)',
          color: '#8b5cf6',
          components: ['Autoencoder Convolucional 1D', 'Pesos Quantizados INT8', 'Driver Android NNAPI', 'NPU Snapdragon / MediaTek APU'],
          description: 'Executa inferência local com latência < 2.5 ms por janela de 500ms, calculando o Erro Quadrático Médio de reconstrução (MSE).'
        },
        {
          name: '3. Atuador Proativo de Políticas AOSP',
          color: '#10b981',
          components: ['ActivityManagerService Handler', 'Reclassificador OOM Score', 'Ajuste SCHED_FIFO', 'ISeldonPolicyCallback AIDL'],
          description: 'Eleva preventivamente a prioridade de threads sob risco de jank e rebaixa tarefas em segundo plano causadoras de contenção de locks.'
        }
      ],
      dataFlow: [
        'Kernel emite evento sched_switch no tracefs',
        'Coletor agrega fatias de tempo em janelas de 500ms',
        'Tensores quantizados INT8 são enviados à NPU via LiteRT',
        'Erro de reconstrução MSE ultrapassa limiar tau_critico',
        'Atuador no SystemServer reclassifica prioridade antes do frame perder o deadline de 16.6ms'
      ],
      sla: [
        { metric: 'Latência Máxima de Inferência', target: '< 2.5 ms (na NPU)' },
        { metric: 'Redução de Jank Frames', target: '> 95% de eliminação de engasgos' },
        { metric: 'Ocupação de Memória RAM', target: '< 16 MB RSS' },
        { metric: 'Dependência de Nuvem', target: '0% (100% On-Device Offline)' }
      ]
    }
  },
  {
    id: 3,
    title: 'Projeto 3: Seldon SecGuard DevSecOps',
    subtitle: 'Plataforma Automatizada de Auditoria Contínua, Fuzzing de IPC e Hardening AOSP',
    badge: 'Módulo 3 • Segurança Móvel',
    color: '#10b981',
    icon: Shield,
    literature: [
      {
        title: 'FlowDroid: Precise Context, Flow, Field, Object-sensitive and Lifecycle-aware Taint Analysis for Android Apps',
        authors: 'Steven Arzt et al.',
        venue: 'ACM SIGPLAN PLDI, 2014',
        contribution: 'Consolidou o estado da arte na análise de fluxo de dados contaminados (taint analysis) modelando com exatidão o ciclo de vida complexo de componentes Android (Activities/Callbacks).'
      },
      {
        title: 'Security Enhanced (SE) Android: Bringing Flexible MAC to Android',
        authors: 'Stephen Smalley & Robert Craig',
        venue: 'Network and Distributed System Security Symposium (NDSS), 2013',
        contribution: 'Formalizou a integração do SELinux no AOSP, demonstrando que o confinamento por domínios e tipo neutraliza escalações de privilégio de root e isola Daemons do sistema.'
      },
      {
        title: 'TaintDroid: An Information-Flow Tracking System for Realtime Privacy Monitoring on Smartphones',
        authors: 'William Enck et al.',
        venue: 'USENIX OSDI, 2014',
        contribution: 'Pioneirismo em rastreamento dinâmico em tempo de execução, demonstrando a necessidade de monitorar canais de IPC Binder e transmissões de dados sensíveis na borda.'
      }
    ],
    architecture: {
      layers: [
        {
          name: '1. Motor SAST de Inspeção de Manifestos & Bytecode',
          color: '#06b6d4',
          components: ['aapt2 & baksmali Parser', 'Regras de Componentes Exportados', 'Validador de NetworkSecurityConfig', 'Verificador TLS 1.3'],
          description: 'Desempacota o APK compilado na pipeline CI e bloqueia builds que declarem componentes exportados sem android:permission.'
        },
        {
          name: '2. Fuzzer de Interfaces IPC Binder (AIDL Fuzzer)',
          color: '#f59e0b',
          components: ['Gerador Estocástico de Parcels', 'Mutações de Limite (Boundary Values)', 'Monitor de Kernel Panics', 'Detector de Memory Leaks'],
          description: 'Injeta transações malformadas via ioctl no /dev/binder em ambiente controlado para estressar interfaces de serviços nativos.'
        },
        {
          name: '3. Auditor SELinux & Hardware StrongBox',
          color: '#10b981',
          components: ['Compilador de Políticas sepolicy', 'Verificador dm-verity (AVB 2.0)', 'Driver StrongBox Keymint', 'Emissor de Relatório SARIF'],
          description: 'Valida se as chaves criptográficas estão isoladas em Secure Element físico e se o sistema mantém integridade criptográfica da partição.'
        }
      ],
      dataFlow: [
        'Pipeline CI compila APK de Release no GitHub Actions',
        'Motor SAST inspeciona manifesto em busca de falhas de permissão',
        'Fuzzer AIDL executa 10.000 chamadas estocásticas no emulador seguro',
        'Auditor testa geração de chave AES-256 no StrongBox emulando TEE',
        'Relatório SARIF emitido: Release bloqueado se houver vulnerabilidade crítica'
      ],
      sla: [
        { metric: 'Tempo de Varredura Completa na CI', target: '< 90 segundos' },
        { metric: 'Taxa de Falsos Positivos', target: '< 2.0%' },
        { metric: 'Conformidade de Hardware', target: '100% StrongBox Keymint Aprovado' },
        { metric: 'Cobertura de Componentes Exportados', target: '100% Auditados' }
      ]
    }
  },
  {
    id: 4,
    title: 'Projeto 4: Seldon EcoOptimizer',
    subtitle: 'Bancada Física Monsoon e Otimizador Evolucionário Multiobjetivo na Fronteira de Pareto',
    badge: 'Módulo 4 • Eficiência Energética',
    color: '#f59e0b',
    icon: Zap,
    literature: [
      {
        title: 'An Analysis of Power Consumption in a Smartphone',
        authors: 'Aaron Carroll & Gernot Heiser',
        venue: 'USENIX ATC, 2010',
        contribution: 'Primeira dissecação empírica rigorosa de potência em nível de componente de hardware, evidenciando que CPU, rádio celular e tela representam a quase totalidade do dreno de bateria.'
      },
      {
        title: 'Where is the Energy Spent Inside My App? Fine Grained Energy Accounting with Eprof',
        authors: 'Abhinav Pathak, Y. Charlie Hu et al.',
        venue: 'EuroSys, 2012',
        contribution: 'Demonstrou que até 75% do gasto energético em apps provém da energia residual da cauda de conexão de rádio celular (RRC tail energy) e de wake locks retidos.'
      },
      {
        title: 'A Fast and Elitist Multiobjective Genetic Algorithm: NSGA-II',
        authors: 'Kalyanmoy Deb et al.',
        venue: 'IEEE Transactions on Evolutionary Computation, 2002',
        contribution: 'Algoritmo genético canônico para otimização multiobjetivo, introduzindo ordenação não-dominada rápida e distância de apinhamento para mapeamento exato da Fronteira de Pareto.'
      }
    ],
    architecture: {
      layers: [
        {
          name: '1. Bancada de Instrumentação Física em Alta Frequência',
          color: '#f59e0b',
          components: ['Monsoon Power Monitor (5 kHz)', 'Alimentação Direta a 3.85V', 'Termografia Infravermelha do SoC', 'Câmara Controlada a 22°C'],
          description: 'Captura transitórios de corrente em nível de microssegundos eliminando as imprecisões do Fuel Gauge da bateria química.'
        },
        {
          name: '2. Parser e Bridge de Telemetria do AOSP',
          color: '#06b6d4',
          components: ['dumpsys batterystats circular', 'Detector de Drenos Vampiros', 'Rastreador de WakeLocks por UID', 'Parser de Transições do Doze Mode'],
          description: 'Sincroniza as amostras elétricas físicas com os eventos de software registrados pelo PowerManagerService e pelo kernel.'
        },
        {
          name: '3. Motor de Otimização Multiobjetivo (NSGA-II)',
          color: '#12b981',
          components: ['Algoritmo Genético NSGA-II', 'Tuner de Governador EAS (big.LITTLE)', 'Matriz de Trade-off (FPS vs mW vs °C)', 'Mapeador da Fronteira de Pareto'],
          description: 'Encontra automaticamente a calibração de firmware que minimiza potência dissipada e temperatura preservando 60 FPS estáveis.'
        }
      ],
      dataFlow: [
        'Monsoon alimenta o smartphone a 3.85V e amostra corrente a 5 kHz',
        'Script de ensaio executa carga de uso padronizada (scroll, render, rede)',
        'Battery Historian cruza dados de WakeLocks e transições de estado do Doze',
        'NSGA-II simula 50 gerações de configurações de frequências DVFS e governadores',
        'Configuração Pareto-ótima (Sweet Spot: 60 FPS @ 920 mW) é gravada no kernel'
      ],
      sla: [
        { metric: 'Economia Energética Global', target: '>= 18.0% de redução em mW' },
        { metric: 'Estabilidade de Taxa de Quadros', target: '>= 59.5 FPS médios contínuos' },
        { metric: 'Redução de Temperatura Máxima', target: '>= 4.0 °C mais frio em carga' },
        { metric: 'Dreno Vampiro Noturno', target: '< 2.5% em 8 horas de repouso' }
      ]
    }
  }
];

export const ProjectArchitectures: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number>(2);
  const active = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <section className="space-y-8 pt-8 border-t border-slate-800/80">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Revisão da Literatura & Arquiteturas de Solução
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Fundamentação do estado da arte acadêmico e projeto de engenharia em camadas para cada um dos 3 desafios finais da Residência Seldon
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          {PROJECTS.map((p) => {
            const isSelected = selectedProjectId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-white font-bold border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                style={{ color: isSelected ? p.color : undefined }}
              >
                <p.icon className="w-3.5 h-3.5" />
                <span>M{p.id} Projeto</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* Project Header Banner */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 relative overflow-hidden space-y-2">
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
              style={{ backgroundColor: active.color }}
            />
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${active.color}25`, color: active.color, border: `1px solid ${active.color}50` }}
              >
                {active.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              {active.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-mono">
              {active.subtitle}
            </p>
          </div>

          {/* Grid: Literature Review & Solution Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Literature Review (State of the Art) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Revisão da Literatura & Estado da Arte</span>
              </div>

              <div className="space-y-3">
                {active.literature.map((paper, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                  >
                    <div className="text-xs font-bold text-white leading-snug">
                      "{paper.title}"
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400">
                      {paper.authors} • <span className="text-slate-400">{paper.venue}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                      <strong className="text-slate-100">Contribuição Científica: </strong>
                      {paper.contribution}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: System Architecture & SLAs */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                <Layers className="w-4 h-4 text-violet-400" />
                <span>Arquitetura de Solução em Camadas</span>
              </div>

              {/* Architecture Layers */}
              <div className="space-y-3">
                {active.architecture.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: layer.color }} />
                        {layer.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {layer.components.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Flow & SLAs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Data Flow */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fluxo de Execução do Pipeline</span>
                  </div>
                  <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside font-mono text-[11px]">
                    {active.architecture.dataFlow.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* SLAs & Metrics */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Métricas de Aceitação & SLAs</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    {active.architecture.sla.map((s, idx) => (
                      <div key={idx} className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 text-[11px]">{s.metric}</span>
                        <span className="text-cyan-300 font-bold">{s.target}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
