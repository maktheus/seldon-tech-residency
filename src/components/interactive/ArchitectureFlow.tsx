import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const [archMode, setArchMode] = useState<'clean' | 'legacy'>('clean');

  return (
    <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold text-white font-display">
              Comparador Arquitetural Android: Clean Architecture vs Legado
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Entenda como a separação de responsabilidades e o Unidirectional Data Flow (UDF) garantem manutenibilidade e testes unitários
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setArchMode('clean')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              archMode === 'clean'
                ? 'bg-cyan-600/30 border border-cyan-500 text-cyan-200 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Clean Architecture + MVVM
          </button>
          <button
            onClick={() => setArchMode('legacy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              archMode === 'legacy'
                ? 'bg-rose-600/30 border border-rose-500 text-rose-200 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            Monolítico (God Activity)
          </button>
        </div>
      </div>

      {archMode === 'clean' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Layer 1: Presentation */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/40 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">1. Presentation Layer</span>
              <h5 className="font-bold text-white text-sm">Jetpack Compose & ViewModel</h5>
              <p className="text-xs text-slate-300">
                UI 100% declarativa observando <code className="text-cyan-300">uiState: StateFlow&lt;UiState&gt;</code>. Emite intenções do usuário (Eventos).
              </p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded">
                Sem chamadas HTTP ou SQL diretas
              </div>
            </div>

            {/* Layer 2: Domain */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-blue-500/40 space-y-2">
              <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">2. Domain Layer (Puro)</span>
              <h5 className="font-bold text-white text-sm">UseCases & Regras de Negócio</h5>
              <p className="text-xs text-slate-300">
                Código Kotlin puro. Sem importar bibliotecas do SDK Android. 100% testável com testes unitários JUnit em microssegundos.
              </p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded">
                CalculateThermalThrottlingUseCase
              </div>
            </div>

            {/* Layer 3: Data */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-indigo-500/40 space-y-2">
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">3. Data Layer</span>
              <h5 className="font-bold text-white text-sm">Repository Pattern</h5>
              <p className="text-xs text-slate-300">
                Centraliza a fonte da verdade entre cache local (Room / DataStore) e backend remoto (Retrofit / Ktor).
              </p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded">
                SensorRepositoryImpl
              </div>
            </div>

            {/* Layer 4: DI */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/40 space-y-2">
              <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">4. Dependency Injection</span>
              <h5 className="font-bold text-white text-sm">Hilt / Dagger</h5>
              <p className="text-xs text-slate-300">
                Injeção de dependências desacoplada, viabilizando mocks e testes com <code className="text-purple-300">@MockK</code> e <code className="text-purple-300">@Inject</code>.
              </p>
              <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-1.5 rounded">
                SingletonComponent / ViewModelScoped
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Cobertura de Testes: <strong className="text-emerald-300">95%</strong></span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Risco de ANR (Main Thread): <strong className="text-emerald-300">0%</strong></span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Tempo de Refatoração: <strong className="text-emerald-300">Baixo</strong></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-rose-950/20 border border-rose-500/40 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <X className="w-4 h-4 text-rose-400" />
              <span>Anti-Padrão: God Activity (MainActivity.java / .kt com 3.000+ linhas)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tudo é misturado na mesma classe: layout XML, chamadas de rede com <code className="text-rose-300">AsyncTask</code> ou Threads soltas, listeners de botões, persistência com SQLite aberto na main thread e cálculos matemáticos.
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs font-mono pt-2">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-rose-900/50 flex items-center gap-2 text-rose-300">
                <X className="w-4 h-4 text-rose-400" />
                <span>Testabilidade: <strong>Quase Impossível</strong></span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-rose-900/50 flex items-center gap-2 text-rose-300">
                <X className="w-4 h-4 text-rose-400" />
                <span>Queda de Quadros: <strong>Frequente</strong></span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-rose-900/50 flex items-center gap-2 text-rose-300">
                <X className="w-4 h-4 text-rose-400" />
                <span>Memory Leaks: <strong>Provável</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
