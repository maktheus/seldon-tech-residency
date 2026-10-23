import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  TrendingUp, 
  Globe2, 
  Cpu, 
  Smartphone, 
  Car, 
  Landmark, 
  Radio, 
  ShieldCheck, 
  ExternalLink,
  Code2,
  DollarSign,
  ChevronRight,
  Layers
} from 'lucide-react';

export const MarketRoadmapView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'market' | 'tech' | 'clients' | 'incentives'>('market');

  const marketSegments = [
    {
      name: 'Inteligência Artificial On-Device (Edge AI)',
      tam2026: '$30.0B - $46.9B',
      tam2030: '$85.0B',
      cagr: '36.9% a.a.',
      driver: 'Privacidade, latência ultra-baixa (<20ms) e transição de LLMs/Visão para NPUs locais.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Cibersegurança Móvel & Defesa Anti-Fraude',
      tam2026: '$14.8B',
      tam2030: '$28.5B',
      cagr: '17.8% a.a.',
      driver: 'Ataques de sobreposição (Tapjacking), hooking de IPC Binder e fraudes bancárias móveis.',
      color: 'from-amber-500 to-rose-500'
    },
    {
      name: 'Android Automotive OS (AAOS) & Cockpits',
      tam2026: '$8.2B',
      tam2030: '$18.2B',
      cagr: '22.1% a.a.',
      driver: 'Eletrificação veicular, digital clusters e necessidade de boot instantâneo com isolamento SELinux.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Gestão Térmica & Eficiência de Bateria',
      tam2026: '$5.4B',
      tam2030: '$11.2B',
      cagr: '19.5% a.a.',
      driver: 'Displays OLED de 120Hz/144Hz, chips de 3nm e demanda de autonomia de mais de 24h contínuas.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const targetClients = [
    {
      title: 'Fabricantes de Hardware (OEMs)',
      examples: 'Samsung, Motorola / Lenovo, Xiaomi, Google, Transsion',
      demand: 'Licenciamento de módulos de firmware (como seldond) e otimizadores de bateria que aumentam a nota de autonomia em benchmarks oficiais.',
      icon: Smartphone,
      color: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/40'
    },
    {
      title: 'Fabricantes de Semicondutores & SoCs',
      examples: 'Qualcomm (Snapdragon), MediaTek (Dimensity), Arm, Intel Core Ultra',
      demand: 'Bibliotecas HAL e runtimes neurais (INT4/INT8) que demonstram o poder máximo de suas NPUs e clusters big.LITTLE.',
      icon: Cpu,
      color: 'text-amber-400 bg-amber-950/80 border-amber-500/40'
    },
    {
      title: 'Indústria Automotiva & Mobilidade',
      examples: 'GM, Ford, Stellantis, Volvo, BYD, Porsche',
      demand: 'Customizações de Android Automotive OS para painéis digitais onde falhas de software e lentidão não são toleradas.',
      icon: Car,
      color: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40'
    },
    {
      title: 'Fintechs, Bancos & Segurança de Transações',
      examples: 'Nubank, Itaú, Banco Inter, Mercado Pago, Bitso',
      demand: 'Ferramentas como Seldon Fortress que detectam ativamente malwares de acessibilidade e tapjacking antes de transações Pix.',
      icon: Landmark,
      color: 'text-rose-400 bg-rose-950/80 border-rose-500/40'
    },
    {
      title: 'Telecomunicações & Infraestrutura 5G',
      examples: 'Claro, Vivo, TIM, Ericsson, Huawei',
      demand: 'Algoritmos multiobjetivo para otimização de rádio 5G Standalone para evitar esgotamento acelerado da bateria.',
      icon: Radio,
      color: 'text-purple-400 bg-purple-950/80 border-purple-500/40'
    }
  ];

  const emergingTechnologies = [
    {
      name: 'Apache NimBLE & Netsim',
      repo: 'apache/mynewt-nimble • google/netsim',
      description: 'Pilha BLE de baixo consumo com suporte a nimble_bridge no emulador Android para virtualização de UWB e IoT.',
      status: 'Adotado pelo Google AOSP'
    },
    {
      name: 'Rust no Android Nativo',
      repo: 'android/platform_system_core',
      description: 'Reescrita de daemons nativos e drivers de baixo nível em Rust, reduzindo vulnerabilidades de memória em 80%.',
      status: 'Padrão Mandatório Android 15/16'
    },
    {
      name: 'Meta ExecuTorch & Google LiteRT',
      repo: 'pytorch/executorch • google-ai-edge/LiteRT',
      description: 'Runtimes de última geração desenhados especificamente para aceleradores neurais (NPUs Hexagon / DaVinci).',
      status: 'Estado da Arte em Edge AI'
    },
    {
      name: 'Kernel Fuzzing & Syzkaller',
      repo: 'google/syzkaller',
      description: 'Fuzzer de chamadas de sistema e nós do Binder com cobertura guiada para descoberta autônoma de vulnerabilidades no kernel.',
      status: 'Padrão da Indústria para Segurança'
    }
  ];

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background Decorator */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/50 text-purple-300 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
            <span>Visão de Mercado, Clientes & Tecnologias Emergentes</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Mapeamento Comercial & Tecnológico
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Estudo de viabilidade, dimensionamento de mercado (TAM), compradores corporativos e tendências no GitHub.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'market' 
                ? 'bg-purple-500 text-black font-bold shadow-lg shadow-purple-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Mercado (TAM)
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'clients' 
                ? 'bg-purple-500 text-black font-bold shadow-lg shadow-purple-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Clientes-Alvo
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'tech' 
                ? 'bg-purple-500 text-black font-bold shadow-lg shadow-purple-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Novas Tecnologias (GitHub)
          </button>
          <button
            onClick={() => setActiveTab('incentives')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'incentives' 
                ? 'bg-purple-500 text-black font-bold shadow-lg shadow-purple-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            Lei de Informática & Brasil
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'market' && (
          <motion.div
            key="market"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {marketSegments.map((seg) => (
              <div 
                key={seg.name} 
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-white">
                    {seg.name}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                    CAGR: {seg.cagr}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">TAM Atual (2026)</span>
                    <div className="text-lg font-bold font-mono text-cyan-300">{seg.tam2026}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-500/30">
                    <span className="text-[10px] font-mono text-purple-400 uppercase">Projeção (2030)</span>
                    <div className="text-lg font-bold font-mono text-purple-300">{seg.tam2030}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {seg.driver}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'clients' && (
          <motion.div
            key="clients"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {targetClients.map((client) => {
              const Icon = client.icon;
              return (
                <div 
                  key={client.title}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl border ${client.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-mono">{client.title}</h4>
                    </div>
                    <p className="text-[11px] font-mono text-cyan-300/90 font-medium">
                      Exemplos: {client.examples}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {client.demand}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Monetização: B2B</span>
                    <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'tech' && (
          <motion.div
            key="tech"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {emergingTechnologies.map((tech) => (
              <div 
                key={tech.name}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white font-mono">{tech.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                    {tech.status}
                  </span>
                </div>
                <div className="text-xs font-mono text-purple-300/80">
                  {tech.repo}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {tech.description}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'incentives' && (
          <motion.div
            key="incentives"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-950/60 border border-emerald-500/40 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-300 font-bold font-mono text-sm">
                <Globe2 className="w-4 h-4" />
                <span>Oportunidade Estratégica: Lei de Informática & Polo Industrial de Manaus</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                No Brasil, fabricantes de celulares e eletrônicos (Samsung, Motorola/Lenovo, Foxconn) são obrigados por lei a investir <strong>cerca de 5% de seu faturamento bruto</strong> em projetos de Pesquisa e Desenvolvimento (P&D).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-slate-400 text-[10px]">Demanda Crítica</span>
                  <div className="text-emerald-400 font-bold">Engenheiros de AOSP</div>
                  <p className="text-[10px] text-slate-500">Mão de obra mais escassa no país</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-slate-400 text-[10px]">Institutos Parceiros</span>
                  <div className="text-cyan-400 font-bold">Sidia, Eldorado, CESAR</div>
                  <p className="text-[10px] text-slate-500">Centros de P&D com vagas abertas</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-slate-400 text-[10px]">Faixa Salarial de Mercado</span>
                  <div className="text-purple-400 font-bold">R$ 18k a R$ 35k/mês</div>
                  <p className="text-[10px] text-slate-500">Ou $120k-$220k/ano remoto global</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
