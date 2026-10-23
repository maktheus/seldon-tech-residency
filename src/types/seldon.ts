export interface Discipline {
  id: string;
  name: string;
  hours: number;
  objective: string;
  syllabus: string;
  keyTopics: string[];
  interactiveDemoType: 'architecture' | 'perfetto' | 'binder' | 'neural' | 'quantization' | 'threat-matrix' | 'keystore' | 'doze' | 'pareto' | 'code-sandbox' | 'ci-pipeline' | 'scientific-method';
  practicalCase: {
    title: string;
    description: string;
    scenario: string;
    solution: string;
    codeSnippet?: string;
    metrics?: { label: string; value: string; delta?: string }[];
  };
}

export interface ModuleData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  accentColor: string;
  gradient: string;
  totalHours: number;
  description: string;
  objective: string;
  disciplines: Discipline[];
  highlights: string[];
  threeDType: 'aosp-stack' | 'neural-core' | 'security-shield' | 'energy-soc';
}

export interface QuizQuestion {
  id: string;
  moduleId: number;
  disciplineId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
