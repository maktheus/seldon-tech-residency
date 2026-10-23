import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Play, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Code2, 
  Layers, 
  Lock, 
  RefreshCw,
  GitCommit,
  Check
} from 'lucide-react';

export const AospEmulatorConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'aidl' | 'sepolicy' | 'githook'>('terminal');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '$ ./scripts/verify_feature_docs.sh',
    '[SELDON QUALITY GATE] Verificando conformidade...',
    '✓ 2 especificações técnicas válidas em docs/features/',
    '✓ CHANGELOG.md atualizado',
    '✓ Política de Documentação Obrigatória: ATENDIDA (Código 0)',
    '',
    'Aguardando comando: [Executar Setup] ou [Iniciar Emulador]'
  ]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const runSetupSim = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs([
      '$ ./scripts/setup_aosp_android15.sh',
      '[1/4] Verificando /dev/kvm... OK (Leitura e Escrita liberadas)',
      '[2/4] Verificando JDK 17... OK (OpenJDK 17.0.12)',
      '[3/4] Baixando Android cmdline-tools oficial para Linux...',
      '[4/4] Aceitando licenças e baixando imagem AOSP Android 15 (API 35 x86_64)...',
      'Configurando AVD: Seldon_AOSP_API35 (Pixel 8 / Android 15 VanillaIceCream)...',
      '✓ AMBIENTE AOSP ANDROID 15 PRONTO PARA EXECUÇÃO!'
    ]);
    setTimeout(() => setIsRunning(false), 800);
  };

  const runEmulatorSim = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs([
      '$ ./scripts/run_aosp_emulator.sh',
      'Iniciando QEMU/KVM com aceleração por hardware Host GPU...',
      '[INIT] Android 15 VanillaIceCream booting (kernel 6.6-android15)...',
      '[INIT] Starting init_daemon: /system/bin/seldond (class main, user system)...',
      '[seldond] SeldonTelemetryService registered at com.seldon.os.telemetry.ISeldonTelemetryService/default',
      '[seldond] ABinderProcess_startThreadPool() max_threads=4',
      '[seldond] Telemetria de bateria lida: 1850000 uW (~1.85W)',
      '[seldond] Margem térmica calculada: 0.35 (Segura / Normal)',
      '✓ Emulador Online! adb root habilitado de fábrica.'
    ]);
    setTimeout(() => setIsRunning(false), 800);
  };

  const runGitHookSim = (hasDoc: boolean) => {
    setIsRunning(true);
    if (hasDoc) {
      setTerminalLogs([
        '$ git commit -m "feat(aosp): implementa daemon seldond e AIDL"',
        '[SELDON QUALITY GATE] Verificando política de documentação...',
        'Arquivos de código detectados: aosp/daemon/main.cpp, aosp/aidl/ISeldonTelemetryService.aidl',
        'Documentação detectada: docs/features/FEATURE_001_ANDROID15_AOSP_INFRASTRUCTURE.md, CHANGELOG.md',
        '✓ Código e documentação staged simultaneamente. Política atendida!',
        '[master 9a4f21b] feat(aosp): implementa daemon seldond e AIDL'
      ]);
    } else {
      setTerminalLogs([
        '$ git commit -m "feat: novo codigo sem docs"',
        '[SELDON QUALITY GATE] Verificando política de documentação...',
        'Arquivos de código detectados: aosp/daemon/main.cpp',
        'Nenhuma documentação staged!',
        '✗ [BLOQUEIO] POLÍTICA DE DOCUMENTAÇÃO VIOLADA!',
        'Você está tentando commitar alterações de código-fonte sem atualizar a documentação.',
        'Diretrizes: Adicione docs/features/FEATURE_XXX.md ou CHANGELOG.md.',
        'Commit abortado pelo hook pre-commit.'
      ]);
    }
    setTimeout(() => setIsRunning(false), 600);
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>AOSP Android 15 (VanillaIceCream / API 35) & SeldonCore</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-display">
            Ambiente de Desenvolvimento & Emulação AOSP
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Árvore de módulos com Binder AIDL NDK, Daemon Nativo C++, SELinux Enforcing e Hook de Auditoria Contínua.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'terminal' 
                ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Terminal AOSP
          </button>
          <button
            onClick={() => setActiveTab('aidl')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'aidl' 
                ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            AIDL & Soong (.bp)
          </button>
          <button
            onClick={() => setActiveTab('sepolicy')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'sepolicy' 
                ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            SELinux Policies
          </button>
          <button
            onClick={() => setActiveTab('githook')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'githook' 
                ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitCommit className="w-3.5 h-3.5" />
            Documentação Obrigatória
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap gap-3 items-center">
              <button
                onClick={runSetupSim}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs border border-cyan-500/30 flex items-center gap-2 transition-all hover:scale-105"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                Testar Setup Automatizado (setup_aosp_android15.sh)
              </button>
              <button
                onClick={runEmulatorSim}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold font-mono text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                Lançar Emulador Android 15 (run_aosp_emulator.sh)
              </button>
            </div>

            {/* Terminal Window */}
            <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-400 font-sans">bash • aosp-15-x86_64</span>
                </div>
                <span>KVM: Active (16 cores / 22 threads)</span>
              </div>

              <div className="space-y-1 pt-2 min-h-[160px] max-h-[240px] overflow-y-auto">
                {terminalLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`${
                      log.startsWith('$') ? 'text-cyan-400 font-bold' :
                      log.includes('OK') || log.includes('✓') ? 'text-emerald-400' :
                      log.includes('✗') || log.includes('ERRO') || log.includes('BLOQUEIO') ? 'text-red-400' :
                      log.includes('[INIT]') || log.includes('[seldond]') ? 'text-amber-300' :
                      'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'aidl' && (
          <motion.div
            key="aidl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* AIDL File */}
            <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 border-b border-slate-800 pb-2">
                <span>ISeldonTelemetryService.aidl</span>
                <button
                  onClick={() => copyToClipboard('ISeldonTelemetryService.aidl', 'aidl')}
                  className="hover:text-white"
                >
                  {copied === 'aidl' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copiar'}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto p-2 bg-slate-950/60 rounded-xl leading-relaxed">
{`package com.seldon.os.telemetry;

@VintfStability
interface ISeldonTelemetryService {
    long getInstantPowerMicroWatts();
    float getThermalHeadroom(in int forecastSeconds);
    boolean setDynamicQuantizationPolicy(in int targetBitWidth);
    int enforceHardeningPolicy(in byte[] token, in int flags);
    long getBinderTransactionRate();
}`}
              </pre>
            </div>

            {/* Android.bp */}
            <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300 border-b border-slate-800 pb-2">
                <span>Android.bp (Soong Blueprint)</span>
                <button
                  onClick={() => copyToClipboard('Android.bp', 'bp')}
                  className="hover:text-white"
                >
                  {copied === 'bp' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copiar'}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto p-2 bg-slate-950/60 rounded-xl leading-relaxed">
{`cc_binary {
    name: "seldond",
    init_rc: ["seldond.rc"],
    srcs: ["main.cpp", "SeldonTelemetryService.cpp"],
    shared_libs: [
        "libbase",
        "libbinder_ndk",
        "com.seldon.os.telemetry-V1-ndk"
    ],
    sanitize: { cfi: true, scudo: true }
}`}
              </pre>
            </div>
          </motion.div>
        )}

        {activeTab === 'sepolicy' && (
          <motion.div
            key="sepolicy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs font-mono flex items-start gap-3">
              <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">SELinux Treble Confinement no Android 15:</span>
                <p className="text-slate-300 mt-1">
                  O daemon nativo roda isolado sob o tipo <code className="text-amber-300">seldond</code> com regra de não-transgressão (<code className="text-red-400">neverallow</code>) para escrita em <code className="text-slate-200">system_file</code>, e permissões estritas para telemetria de bateria e zonas térmicas.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#030712] border border-slate-800 p-4 font-mono text-xs space-y-2">
              <div className="text-xs text-cyan-300 border-b border-slate-800 pb-2">
                aosp/system/sepolicy/seldond.te
              </div>
              <pre className="text-[11px] text-slate-300 overflow-x-auto p-2 bg-slate-950/60 rounded-xl leading-relaxed">
{`type seldond, domain, coredomain;
type seldond_exec, exec_type, file_type, system_file_type;

init_daemon_domain(seldond)
binder_use(seldond)
binder_service(seldond)
add_service(seldond, seldon_telemetry_service)

allow seldond sysfs_batteryinfo:dir r_dir_perms;
allow seldond sysfs_thermal:file r_file_perms;

neverallow seldond system_file:file { write execute_no_trans };`}
              </pre>
            </div>
          </motion.div>
        )}

        {activeTab === 'githook' && (
          <motion.div
            key="githook"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Política Rígida de Engenharia: Documentação Obrigatória por Feature</span>
              </div>
              <p className="text-slate-300">
                Todo commit no repositório passa pelo hook de validação <code className="text-cyan-400">.githooks/pre-commit</code>. Commits contendo alteração em arquivos de código sem documentos em <code className="text-amber-300">docs/</code> ou <code className="text-amber-300">CHANGELOG.md</code> são <strong>bloqueados de forma mandatória</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => runGitHookSim(false)}
                className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 hover:bg-red-950/50 transition-all text-left space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-400">Simular Violação</span>
                  <XCircle className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  Commit com alteração em C++ / AIDL sem staged doc: <strong>Dispara Bloqueio</strong>.
                </p>
              </button>

              <button
                onClick={() => runGitHookSim(true)}
                className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 hover:bg-emerald-950/50 transition-all text-left space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">Simular Conformidade</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xs text-slate-300 font-mono">
                  Commit com código + <code className="text-emerald-300">docs/features/</code>: <strong>Aprovado</strong>.
                </p>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
