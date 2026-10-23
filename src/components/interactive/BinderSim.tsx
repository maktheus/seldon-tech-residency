import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, ShieldCheck, Zap } from 'lucide-react';

export const BinderSim: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const steps = [
    {
      title: '1. Chamada do Cliente (App Process)',
      source: 'App Process (PID 4821)',
      target: 'libbinder (User Space)',
      action: 'O app chama `getSystemService(BATTERY_SERVICE)` e invoca um método na interface AIDL (`IBatteryStats.getStatistics()`).',
      status: 'Marshaling de argumentos em um objeto `Parcel` na memória do processo.'
    },
    {
      title: '2. Transição para o Kernel (/dev/binder)',
      source: 'libbinder',
      target: 'Kernel Linux Driver (/dev/binder)',
      action: 'Executa a syscall `ioctl(BINDER_WRITE_READ)` transferindo o ponteiro do Parcel para o driver Binder no kernel.',
      status: 'O kernel valida as credenciais (UID e PID) do remetente para garantir a sandbox.'
    },
    {
      title: '3. Resolução no ServiceManager',
      source: 'Kernel /dev/binder',
      target: 'servicemanager (PID 1)',
      action: 'Se o handle do serviço ainda não for conhecido, o `servicemanager` valida se o app tem permissão e retorna o token de referência.',
      status: 'Identificador do serviço validado pelo SELinux.'
    },
    {
      title: '4. Entrega ao System Server',
      source: 'Kernel /dev/binder',
      target: 'system_server (PID 920)',
      action: 'O kernel mapeia os dados do Parcel diretamente na memória do processo destino via `mmap` compartilhado (Zero-Copy overhead).',
      status: 'O SystemServer acorda uma thread da threadpool Binder para processar a requisição.'
    },
    {
      title: '5. Retorno da Resposta (IPC Concluído)',
      source: 'system_server',
      target: 'App Process (PID 4821)',
      action: 'Os dados solicitados são gravados no Parcel de retorno e entregues de volta ao App sem travar a MainThread.',
      status: 'Operação concluída em 0.18 milissegundos.'
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };

  const handleAutoRun = () => {
    setIsRunning(true);
    setStep(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setStep(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1800);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-violet-500/30 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
            <h4 className="text-lg font-bold text-white font-display">
              Simulador Interativo de IPC Binder no AOSP
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Veja passo a passo como o Android realiza comunicação interprocessos segura com memória compartilhada
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-mono font-medium transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-violet-600/30"
          >
            <Play className="w-3.5 h-3.5" />
            {isRunning ? 'Executando...' : 'Animar Transação'}
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono transition-all cursor-pointer"
          >
            Passo Seguinte (0{step + 1}/05)
          </button>
          <button
            onClick={() => { setStep(0); setIsRunning(false); }}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg border border-slate-700 cursor-pointer"
            title="Reiniciar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Diagram of Processes & Kernel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Process A: App */}
        <div className={`p-4 rounded-xl border transition-all ${
          step === 0 || step === 4 ? 'bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-500/20' : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-cyan-300 font-bold">App Process</span>
            <span className="text-slate-400">User Space (UID 10182)</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-cyan-200">
              IBatteryStats.aidl
            </div>
            <div className="text-[11px] text-slate-400">Parcel serializado</div>
          </div>
        </div>

        {/* Kernel: /dev/binder */}
        <div className={`p-4 rounded-xl border transition-all ${
          step === 1 || step === 2 || step === 3 ? 'bg-violet-950/40 border-violet-400 ring-2 ring-violet-500/20' : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-violet-300 font-bold">Kernel Linux</span>
            <span className="text-amber-400 text-[10px]">Ring 0</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-violet-200">
              /dev/binder (ioctl)
            </div>
            <div className="text-[11px] text-slate-400">Mapeamento mmap Zero-Copy</div>
          </div>
        </div>

        {/* Process B: system_server */}
        <div className={`p-4 rounded-xl border transition-all ${
          step === 3 || step === 4 ? 'bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-500/20' : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-emerald-300 font-bold">System Server</span>
            <span className="text-slate-400">UID 1000 (System)</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] text-emerald-200">
              BatteryManagerService
            </div>
            <div className="text-[11px] text-slate-400">Threadpool Binder Worker</div>
          </div>
        </div>
      </div>

      {/* Step Explanation Card with motion */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900/90 p-4 rounded-xl border border-violet-500/30 flex items-start gap-4"
      >
        <div className="p-2.5 rounded-lg bg-violet-600/20 border border-violet-500/40 text-violet-300 shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">{steps[step].title}</span>
            <span className="px-2 py-0.5 rounded bg-violet-950 border border-violet-800 text-[10px] font-mono text-violet-300">
              {steps[step].source} → {steps[step].target}
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            {steps[step].action}
          </p>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mecanismo: {steps[step].status}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
