import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Cpu, 
  Shield, 
  Zap, 
  Brain, 
  Clock, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  ChevronRight,
  Search,
  CheckCircle2
} from 'lucide-react';
import { MODULES_DATA, QUIZ_QUESTIONS } from './data/seldonData';
import { ModuleData, Discipline } from './types/seldon';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SeldonHeroScene } from './components/3d/SeldonHeroScene';
import { AndroidStack3D } from './components/3d/AndroidStack3D';
import { NeuralCore3D } from './components/3d/NeuralCore3D';
import { SecurityShield3D } from './components/3d/SecurityShield3D';
import { EnergySoC3D } from './components/3d/EnergySoC3D';
import { BinderSim } from './components/interactive/BinderSim';
import { DozeSim } from './components/interactive/DozeSim';
import { ParetoOptimizer } from './components/interactive/ParetoOptimizer';
import { ThreatModelSim } from './components/interactive/ThreatModelSim';
import { ArchitectureFlow } from './components/interactive/ArchitectureFlow';
import { DisciplineModal } from './components/ui/DisciplineModal';
import { QuizModal } from './components/ui/QuizModal';
import { ProjectArchitectures } from './components/modules/ProjectArchitectures';
import { AospEmulatorConsole } from './components/interactive/AospEmulatorConsole';

export const App: React.FC = () => {
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<{ discipline: Discipline; moduleData: ModuleData } | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter disciplines based on search query
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeModuleId ? MODULES_DATA.filter(m => m.id === activeModuleId) : MODULES_DATA;
    }
    const query = searchQuery.toLowerCase();
    return MODULES_DATA.map(m => {
      const matchingDisciplines = m.disciplines.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.objective.toLowerCase().includes(query) ||
        d.syllabus.toLowerCase().includes(query) ||
        d.keyTopics.some(t => t.toLowerCase().includes(query))
      );
      return { ...m, disciplines: matchingDisciplines };
    }).filter(m => m.disciplines.length > 0);
  }, [activeModuleId, searchQuery]);

  const activeModule = MODULES_DATA.find(m => m.id === activeModuleId) || null;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-grid-cyber pointer-events-none opacity-40 z-0" />
      <div className="fixed inset-0 bg-radial-vignette pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar
        activeModuleId={activeModuleId}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          window.scrollTo({ top: 580, behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* HERO SECTION */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Programa Oficial Seldon • 435 Horas de Especialização</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
              Residência Tecnológica <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400">
                Android, IA & Eficiência
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Explore de forma interativa os 4 módulos formativos. Uma jornada profunda desde o núcleo comum de engenharia de software e observabilidade AOSP até inteligência artificial on-device, cibersegurança e algoritmos de otimização energética multiobjetivo.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Carga Horária Total</span>
                <span className="text-cyan-400 font-bold text-base">435 Horas</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Módulos Integrados</span>
                <span className="text-violet-400 font-bold text-base">4 Trilhas</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Disciplinas Avançadas</span>
                <span className="text-emerald-400 font-bold text-base">16 Disciplinas</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Metodologia</span>
                <span className="text-amber-400 font-bold text-base">100% Prática & PBL</span>
              </div>
            </div>
          </div>

          {/* 3D Hero Scene */}
          <SeldonHeroScene
            activeModuleId={activeModuleId}
            onSelectModule={(id) => {
              setActiveModuleId(id);
              const el = document.getElementById(`module-${id}`);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* MODULE SELECTOR TABS */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Trilhas & Módulos Formativos
            </h2>
            {activeModuleId && (
              <button
                onClick={() => setActiveModuleId(null)}
                className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
              >
                Ver Todos os Módulos
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MODULES_DATA.map((module) => {
              const isSelected = activeModuleId === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModuleId(module.id);
                    const el = document.getElementById(`module-${module.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-xl'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: module.color }}
                  />

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: `${module.color}20`, color: module.color }}>
                      {module.totalHours} Horas
                    </span>
                    <span className="text-xs font-mono text-slate-400">0{module.id}</span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-1 group-hover:text-cyan-300 transition-colors">
                    {module.title.split('–')[0]}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {module.subtitle}
                  </p>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-slate-300 group-hover:text-cyan-400 transition-colors">
                    <span>{module.disciplines.length} disciplinas</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SEARCH STATUS IF ACTIVE */}
        {searchQuery.trim() && (
          <div className="p-3 bg-cyan-950/30 border border-cyan-500/40 rounded-xl text-xs font-mono text-cyan-300 flex items-center justify-between">
            <span>Resultados para: "{searchQuery}" ({filteredModules.reduce((acc, m) => acc + m.disciplines.length, 0)} disciplinas encontradas)</span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-400 hover:text-white cursor-pointer underline"
            >
              Limpar busca
            </button>
          </div>
        )}

        {/* DETAILED MODULE SECTIONS */}
        <div className="space-y-24">
          {filteredModules.map((module) => (
            <section
              key={module.id}
              id={`module-${module.id}`}
              className="space-y-8 scroll-mt-24 pt-4 border-t border-slate-800/80"
            >
              {/* Module Header Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 relative overflow-hidden space-y-4">
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
                  style={{ backgroundColor: module.color }}
                />

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${module.color}25`, color: module.color, border: `1px solid ${module.color}50` }}
                  >
                    {module.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">
                    {module.disciplines.length} Disciplinas
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {module.title}
                  </h2>
                  <p className="text-sm font-medium text-slate-300 font-mono">
                    {module.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {module.description}
                </p>

                {/* Module Highlights Pill Grid */}
                <div className="pt-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Destaques da Formação & Tecnologias:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {module.highlights.map((h, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3D INTERACTIVE EXPERIENCE FOR THIS MODULE */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Experiência 3D Interativa • {module.title.split('–')[0]}</span>
                </div>

                {module.id === 1 && <AndroidStack3D />}
                {module.id === 2 && <NeuralCore3D />}
                {module.id === 3 && <SecurityShield3D />}
                {module.id === 4 && <EnergySoC3D />}
              </div>

              {/* MOTION GRAPHIC / INTERACTIVE SIMULATOR FOR THIS MODULE */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
                  <Zap className="w-4 h-4 text-violet-400" />
                  <span>Simulador Explicativo em Tempo Real</span>
                </div>

                {module.id === 1 && <ArchitectureFlow />}
                {module.id === 2 && <BinderSim />}
                {module.id === 3 && <ThreatModelSim />}
                {module.id === 4 && (
                  <div className="space-y-6">
                    <DozeSim />
                    <ParetoOptimizer />
                  </div>
                )}
              </div>

              {/* DISCIPLINES LIST & SYLLABUS CARDS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    Disciplinas do Módulo ({module.disciplines.length})
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Clique no card para abrir a ementa completa e o caso prático
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {module.disciplines.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDiscipline({ discipline: d, moduleData: module })}
                      className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                            {d.hours} Horas
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {d.id.toUpperCase()}
                          </span>
                        </div>

                        <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                          {d.name}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                          {d.objective}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                        <span>Ver Ementa & Caso Real</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CONSOLE DE DESENVOLVIMENTO & EMULADOR AOSP ANDROID 15 */}
        <AospEmulatorConsole />

        {/* REVISÃO DA LITERATURA E ARQUITETURAS DE SOLUÇÃO DOS 3 PROJETOS FINAIS */}
        <ProjectArchitectures />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <DisciplineModal
        discipline={selectedDiscipline?.discipline || null}
        moduleData={selectedDiscipline?.moduleData || null}
        onClose={() => setSelectedDiscipline(null)}
      />

      <QuizModal
        questions={QUIZ_QUESTIONS}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
};

export default App;
