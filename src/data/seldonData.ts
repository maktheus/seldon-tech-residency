import { ModuleData, QuizQuestion } from '../types/seldon';

export const MODULES_DATA: ModuleData[] = [
  {
    id: 1,
    slug: 'nucleo-comum',
    title: 'Módulo 1 – Núcleo Comum de Formação',
    subtitle: 'Base Obrigatória de Nivelamento & Engenharia de Software Android',
    badge: 'Nível Base • 210 Horas',
    color: '#06b6d4',
    accentColor: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    totalHours: 210,
    threeDType: 'aosp-stack',
    objective:
      'Desenvolver fundamentos comuns em engenharia de software, desenvolvimento Android, arquitetura de sistemas móveis, experimentação científica, qualidade, segurança e gestão de projetos, preparando os participantes para atuar em desafios tecnológicos reais.',
    description:
      'O Núcleo Comum de Formação constitui a espinha dorsal da residência tecnológica. Nela, os residentes aprendem desde rigor metodológico e coleta de métricas empíricas até a construção de apps Android robustos com Kotlin, Jetpack Compose, Clean Architecture e esteiras de integração contínua (CI/CD).',
    highlights: [
      'Experimentação científica e formulação de hipóteses com métricas empíricas',
      'Metodologias Ágeis, Gestão de Requisitos e Rastreabilidade completa de ponta a ponta',
      'Aprendizagem Baseada em Projetos (PBL) com resolução de problemas da indústria',
      'Padrões Arquiteturais: MVVM, MVI, Clean Architecture e Injeção de Dependência',
      'Ecossistema Kotlin moderno, Coroutines, Flow e Jetpack Compose',
      'Pipelines de Automação, Testes Android (Robolectric/Espresso) e Segurança defensiva'
    ],
    disciplines: [
      {
        id: 'm1-d1',
        name: 'Dados, Experimentação e Metodologia Científica',
        hours: 30,
        objective:
          'Capacitar os residentes para formular problemas, estabelecer métricas e produzir evidências tecnicamente verificáveis.',
        syllabus:
          'Definição de problemas e hipóteses; pesquisa bibliográfica e tecnológica; estado da arte; desenho experimental; definição de variáveis, métricas e linhas de base; coleta, limpeza e organização de dados; análise exploratória; comparação de resultados; repetibilidade; interpretação de evidências; limitações e ameaças à validade; elaboração de relatórios técnicos; comunicação dos resultados; fundamentos de propriedade intelectual.',
        keyTopics: [
          'Formulação de Hipóteses Nulas e Alternativas',
          'Desenho Experimental Fatorial e Isolamento de Ruído',
          'Métricas e Linhas de Base (Baseline Control)',
          'Análise Exploratória e Distribuição Estatística',
          'Ameaças à Validade Interna e Externa',
          'Propriedade Intelectual e Patentes em Software'
        ],
        interactiveDemoType: 'scientific-method',
        practicalCase: {
          title: 'Estudo Experimental de Taxa de Renderização (Jank Frame Rate)',
          scenario:
            'A equipe precisa comprovar cientificamente se a migração de RecyclerView XML para LazyColumn no Jetpack Compose reduziu o jank frame rate (quadros que ultrapassam 16.6ms em 60Hz) em dispositivos de entrada.',
          description:
            'Aplica-se o protocolo experimental com amostragem de 100 execuções controladas, eliminando variáveis intervenientes como carga de bateria, temperatura ambiente e apps em background.',
          solution:
            'Definição da métrica percentil 99th (P99 frame time). Coleta via Perfetto + macrobenchmark. Aplicação de teste t de Student para rejeição da hipótese nula com p < 0.01.',
          metrics: [
            { label: 'Baseline (P99 XML)', value: '28.4 ms', delta: 'Alto Jank' },
            { label: 'Novo (P99 Compose)', value: '14.1 ms', delta: '-50.3%' },
            { label: 'Confiança Estatística', value: '99.4%', delta: 'p < 0.006' }
          ]
        }
      },
      {
        id: 'm1-d2',
        name: 'Engenharia de Software, Requisitos e Gestão do Desenvolvimento',
        hours: 24,
        objective:
          'Desenvolver competências para compreender o problema, especificar requisitos, organizar o trabalho e manter a rastreabilidade das atividades e entregas.',
        syllabus:
          'Ciclos de vida de software; fundamentos de métodos ágeis; levantamento e análise de requisitos; requisitos funcionais e não funcionais; histórias de usuário; critérios de aceitação; modelagem essencial; documentação técnica; controle de versão; gestão de configuração; planejamento de atividades; backlog; rastreabilidade entre desafio, requisito, atividade, evidência e resultado; trabalho colaborativo e comunicação técnica.',
        keyTopics: [
          'Matriz de Rastreabilidade de Requisitos (RTM)',
          'Critérios de Aceitação e BDD (Given-When-Then)',
          'Gestão de Configuração e GitFlow / Trunk-Based',
          'Requisitos Não Funcionais (SLAs, Latência, Bateria)',
          'Documentação Técnica com Markdown e C4 Model'
        ],
        interactiveDemoType: 'architecture',
        practicalCase: {
          title: 'Rastreabilidade RTM em Soluções Críticas de Telecom',
          scenario:
            'Exigência de compliance onde cada linha de código alterada no firmware de rede precisa estar ligada a um Requisito Funcional (RF) e a um Teste de Aceitação automatizado.',
          description:
            'Implementação de uma esteira com rastreabilidade formal via identificadores em commits, issues e relatórios de cobertura JUnit.',
          solution:
            'Garantia de 100% de cobertura de rastreabilidade (Desafio -> Requisito -> Código -> Evidência de Teste).',
          metrics: [
            { label: 'Rastreabilidade de Requisitos', value: '100%' },
            { label: 'Critérios de Aceite Automatizados', value: '48 / 48' }
          ]
        }
      },
      {
        id: 'm1-d3',
        name: 'Metodologia de Projetos, Ética e Habilidades Profissionais',
        hours: 30,
        objective:
          'Preparar os residentes para atuar em equipes multidisciplinares e produzir entregas acadêmicas e técnicas rastreáveis.',
        syllabus:
          'Aprendizagem Baseada em Projetos – PBL; compreensão e delimitação de desafios; planejamento de projetos; organização de backlog; definição de papéis e responsabilidades; comunicação técnica; apresentação de resultados; trabalho em equipe; gestão do tempo; ética profissional; proteção de dados; confidencialidade; propriedade intelectual; documentação de decisões; registro de evidências; preparação do plano de trabalho da equipe para a Residência Tecnológica.',
        keyTopics: [
          'Aprendizagem Baseada em Problemas e Desafios (PBL)',
          'Ética em Engenharia e LGPD no Tratamento de Telemetria',
          'Resoluções de Conflitos e Comunicação Não-Violenta',
          'Arquitetura de Decisão: Architecture Decision Records (ADRs)',
          'Apresentações Técnicas e Pitching de Resultados Científicos'
        ],
        interactiveDemoType: 'scientific-method',
        practicalCase: {
          title: 'Governança de Dados de Telemetria sob a LGPD',
          scenario:
            'Coleta de métricas de uso e falhas em um parque de 50.000 dispositivos Android corporativos.',
          description:
            'Mapeamento dos fluxos de dados, anonimização de identificadores de hardware (IMEI/MAC) via hashing SHA-256 com salt local antes do envio ao servidor.',
          solution:
            'Elaboração do Relatório de Impacto à Proteção de Dados (RIPD) e adoção de consentimento explícito.',
          metrics: [
            { label: 'Privacidade Preservada', value: '100% K-Anonymity' },
            { label: 'Conformidade LGPD', value: 'Aprovado' }
          ]
        }
      },
      {
        id: 'm1-d4',
        name: 'Arquitetura de Software',
        hours: 18,
        objective:
          'Compreender e aplicar princípios arquiteturais necessários ao desenvolvimento de aplicações Android organizadas, testáveis e sustentáveis.',
        syllabus:
          'Orientação a objetos aplicada; princípios SOLID; separação de responsabilidades; arquitetura em camadas; fundamentos de MVC, MVP e MVVM; Clean Architecture; modularização; injeção de dependência; organização de componentes; manutenibilidade, testabilidade e qualidade de código.',
        keyTopics: [
          'Princípios SOLID no Ecossistema Android',
          'Clean Architecture: Domain, Data e Presentation Layers',
          'Padrão MVVM com StateFlow e Unidirectional Data Flow (UDF)',
          'Injeção de Dependência Moderna com Hilt / Koin',
          'Modularização por Funcionalidade (Feature Modules)'
        ],
        interactiveDemoType: 'architecture',
        practicalCase: {
          title: 'Refatoração de God Activity para Clean Architecture + MVVM',
          scenario:
            'App legado de controle de sensores com uma única MainActivity de 4.200 linhas contendo regras de negócio, chamadas HTTP e manipulação de UI.',
          description:
            'Separação em camadas estritas: Domain (UseCases puros em Kotlin sem dependências Android), Data (Repository Pattern + Local/Remote DataSources) e Presentation (ViewModel com MutableStateFlow e UI Compose declarativa).',
          solution:
            'Injeção de dependência com Hilt. Testabilidade de regras de negócio unitárias elevada para 95%.',
          codeSnippet: `// Domain UseCase puro (Clean Architecture)
class CalculateThermalThrottlingUseCase @Inject constructor(
    private val sensorRepository: SensorRepository
) {
    suspend operator fun invoke(deviceId: String): ThermalStatus {
        val temp = sensorRepository.getSocTemperature(deviceId)
        return when {
            temp > 75.0 -> ThermalStatus.EMERGENCY_THROTTLE
            temp > 50.0 -> ThermalStatus.WARNING_SCALING
            else -> ThermalStatus.NOMINAL
        }
    }
}`
        }
      },
      {
        id: 'm1-d5',
        name: 'Inteligência Artificial: Fundamentos, Frameworks e Aplicações',
        hours: 36,
        objective:
          'Compreender o fluxo de desenvolvimento e avaliação de modelos de inteligência artificial e sua integração inicial com aplicações Android.',
        syllabus:
          'Fundamentos de inteligência artificial e aprendizado de máquina; classificação, regressão e agrupamento; preparação e transformação de dados; treinamento, validação e teste; métricas de avaliação; sobreajuste e generalização; introdução a redes neurais; uso de frameworks e bibliotecas; consumo de APIs de IA; princípios de inferência on-device; integração de modelos a aplicações Android; ética e uso responsável.',
        keyTopics: [
          'Pipeline Completo de ML: Coleta, Feature Engineering e Split',
          'Classificação vs Regressão vs Clustering',
          'Matriz de Confusão, Precision, Recall e F1-Score',
          'Introdução a Perceptrons e Redes Neurais Profundas',
          'Consumo de Modelos em Nuvem vs Princípios de Inferência Local'
        ],
        interactiveDemoType: 'neural',
        practicalCase: {
          title: 'Predição de Congestionamento de Rede Móvel com Random Forest',
          scenario:
            'Prever queda de vazão de dados (throughput) com base em métricas de sinal (RSRP, RSRQ, SINR) coletadas via TelephonyManager.',
          description:
            'Treinamento e validação de modelo supervisionado comparando regressão linear com ensemble models.',
          solution:
            'Modelo alcançou R² de 0.91 e latência de inferência de 2.1ms.',
          metrics: [
            { label: 'Acurácia / R²', value: '0.91' },
            { label: 'Tempo de Inferência', value: '2.1 ms' }
          ]
        }
      },
      {
        id: 'm1-d6',
        name: 'Programação Java/Kotlin e Desenvolvimento de Aplicações Android',
        hours: 42,
        objective:
          'Capacitar os residentes para desenvolver aplicações Android funcionais utilizando Kotlin e os principais componentes da plataforma, com fundamentos de interoperabilidade com Java.',
        syllabus:
          'Fundamentos essenciais de Java e Kotlin; orientação a objetos; coleções; tratamento de erros; programação assíncrona; estrutura de projetos Android; ciclo de vida; Activities; Fragments; Services; Intents; navegação; persistência local; consumo de APIs; permissões; depuração; testes básicos; introdução ao Jetpack Compose; boas práticas de desenvolvimento.',
        keyTopics: [
          'Kotlin Avançado: Extension Functions, Sealed Classes, Coroutines',
          'Os 4 Pilares AOSP: Activities, Services, Broadcast Receivers, Content Providers',
          'UI Moderna e Reativa com Jetpack Compose',
          'Persistência Reativa com Room Database e DataStore',
          'Consumo assíncrono com Retrofit, OkHttp e Ktor Client'
        ],
        interactiveDemoType: 'code-sandbox',
        practicalCase: {
          title: 'App de Monitoramento de Rede Assíncrono com Kotlin Flow',
          scenario:
            'Construção de uma aplicação reativa que escuta eventos de conectividade em tempo real sem travar a Main Thread.',
          description:
            'Uso de `callbackFlow` para converter listeners de rede do Android em fluxos reativos limpos com Jetpack Compose.',
          solution:
            'Zero travamento da thread de UI com recomposição precisa e gerenciamento correto do ciclo de vida com `repeatOnLifecycle`.',
          codeSnippet: `// Flow reativo de status de rede
val networkStatusFlow: Flow<NetworkStatus> = callbackFlow {
    val callback = object : ConnectivityManager.NetworkCallback() {
        override fun onAvailable(network: Network) { trySend(NetworkStatus.Connected) }
        override fun onLost(network: Network) { trySend(NetworkStatus.Disconnected) }
    }
    connectivityManager.registerDefaultNetworkCallback(callback)
    awaitClose { connectivityManager.unregisterNetworkCallback(callback) }
}`
        }
      },
      {
        id: 'm1-d7',
        name: 'Testes, Automação, Segurança e Integração Contínua',
        hours: 30,
        objective:
          'Compreender estratégias de verificação, automação e segurança aplicáveis ao desenvolvimento de soluções Android.',
        syllabus:
          'Qualidade de software; testes unitários, funcionais, de integração e de sistema; definição de casos, critérios e dados de teste; testes Android; fundamentos de automação; análise estática e dinâmica; integração contínua; pipelines; gestão de defeitos; análise de logs; registro de evidências; fundamentos de segurança Android; proteção de dados; LGPD; confidencialidade e desenvolvimento seguro.',
        keyTopics: [
          'Pirâmide de Testes: Unitários, Integração e E2E Instrumentalizados',
          'MockK, JUnit 5 e Robolectric para testes velozes sem emulador',
          'Análise Estática de Código com Detekt, Android Lint e SonarQube',
          'Pipelines CI/CD no GitHub Actions com assinatura de APK e testes',
          'Fundamentos de Segurança Defensiva e OWASP Mobile Top 10'
        ],
        interactiveDemoType: 'ci-pipeline',
        practicalCase: {
          title: 'Pipeline CI/CD Automatizado com Portões de Qualidade (Quality Gates)',
          scenario:
            'Automatizar todo o fluxo de verificação para que nenhum PR seja aceito se quebrar testes ou se tiver vulnerabilidades conhecidas.',
          description:
            'Configuração de workflow no GitHub Actions com steps de checkout, setup do JDK 17, Gradle cache, Lint estático, execução de testes unitários com Robolectric e geração de relatório de cobertura JaCoCo.',
          solution:
            'Tempo médio de execução em 3 minutos e 40 segundos com 100% de automação.',
          metrics: [
            { label: 'Tempo de Pipeline', value: '3m 40s' },
            { label: 'Cobertura de Testes', value: '88.5%' }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    slug: 'trilha-ia-otimizacao',
    title: 'Módulo 2 – Trilha de Inteligência Artificial aplicada à Otimização de Sistemas Android',
    subtitle: 'Observabilidade AOSP, Redes Neurais e IA On-Device de Baixa Latência',
    badge: 'Especialização • 75 Horas',
    color: '#8b5cf6',
    accentColor: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    totalHours: 75,
    threeDType: 'neural-core',
    objective:
      'Desenvolver competências para coletar e analisar dados de funcionamento de dispositivos Android, construir e avaliar modelos de inteligência artificial e implementar soluções eficientes para detecção de anomalias, predição de comportamento e otimização de recursos computacionais.',
    description:
      'Esta trilha mergulha no coração do sistema operacional Android (AOSP), capacitando o residente a dissecar a arquitetura em camadas (Kernel Linux, HAL, ART, Binder IPC, System Services) e utilizar telemetria avançada via Perfetto. Com esses dados, constroem-se modelos de Machine Learning e Deep Learning de alta fidelidade que são quantizados e otimizados para execução local (on-device) na NPU/GPU do celular.',
    highlights: [
      'Arquitetura interna do AOSP: Binder IPC, System Services e Android Runtime (ART)',
      'Profiling em nível de nanossegundos com Perfetto Trace, Systrace e ADB avançado',
      'Modelos de Machine Learning e Redes Neurais Profundas para predição de anomalias',
      'Técnicas de IA On-Device: Quantização Post-Training (INT8/FP16) e Pruning',
      'Aceleração de Hardware via Android NNAPI, LiteRT (TFLite) e MediaPipe',
      'Compromissos essenciais entre acurácia, latência (ms), memória RAM e aquecimento'
    ],
    disciplines: [
      {
        id: 'm2-d1',
        name: 'Android Open Source Project – Observabilidade e Desempenho',
        hours: 25,
        objective:
          'Compreender a arquitetura interna do Android e identificar componentes, métricas e pontos de observabilidade relevantes à análise e à otimização de desempenho.',
        syllabus:
          'Arquitetura em camadas do Android; Kernel Linux; HAL; ART; Binder IPC; Application Framework; System Services; gerenciamento de processos e memória; ADB; Logcat; Perfetto; coleta de métricas; observabilidade; identificação de gargalos e oportunidades de otimização.',
        keyTopics: [
          'Camadas AOSP: Linux Kernel -> HAL -> ART -> Services -> Apps',
          'Mecanismo de Comunicação Inter-Processos: Binder IPC e ashmem',
          'Gerenciador de Memória LMK (Low Memory Killer / LMKd)',
          'Coleta Avançada de Traces no Perfetto: Slices, Counters e CPU Schedulers',
          'Diagnóstico de Gargalos: Lock Contention, Jitter de Renderização e GC Pauses'
        ],
        interactiveDemoType: 'perfetto',
        practicalCase: {
          title: 'Investigação e Eliminação de Queda de Quadros (Jank) com Perfetto',
          scenario:
            'Uma aplicação exibe engasgos recorrentes ao rolar listas complexas. O Logcat tradicional não apontava erros de exceção.',
          description:
            'Captura de trace com Perfetto ativando as categorias `sched`, `freq`, `am`, `wm`, `view` e `binder_driver`.',
          solution:
            'Identificou-se que a thread de renderização (`RenderThread`) estava travando esperando um retorno síncrono de chamada IPC Binder ao PackageManager dentro do loop de desenho.',
          metrics: [
            { label: 'Frames com Jank', value: 'de 23% para 0.4%', delta: '-98%' },
            { label: 'Tempo no Binder (MainThread)', value: 'de 42ms para 0.1ms' }
          ]
        }
      },
      {
        id: 'm2-d2',
        name: 'Aprendizado de Máquina e Aprendizado Profundo',
        hours: 30,
        objective:
          'Selecionar, desenvolver, treinar e avaliar modelos de aprendizado de máquina e aprendizado profundo aplicáveis a sistemas Android.',
        syllabus:
          'Preparação de dados; aprendizado supervisionado e não supervisionado; classificação; regressão; agrupamento; seleção de atributos; redes neurais; treinamento, validação e teste; métricas; sobreajuste; generalização; comparação de modelos.',
        keyTopics: [
          'Engenharia de Recursos a partir de Traces e Métricas do Sistema',
          'Detecção de Anomalias com Autoencoders e Isolation Forests',
          'Redes Neurais Convolucionais e Recorrentes (CNNs e LSTMs) em Séries Temporais',
          'Técnicas de Regularização: Dropout, Batch Normalization e Early Stopping',
          'Métricas Rigorosas: ROC-AUC, Precision-Recall Curve, MAE e RMSE'
        ],
        interactiveDemoType: 'neural',
        practicalCase: {
          title: 'Detecção de Comportamento Anômalo de Apps em Background',
          scenario:
            'Detectar quando um aplicativo começa a consumir ciclos de CPU de forma atípica devido a loops infinitos ou vazamentos de threads.',
          description:
            'Treinamento de um Autoencoder com dados de telemetria nominal (uso de CPU, frequência de interrupts, chamadas de sistema).',
          solution:
            'O erro de reconstrução do autoencoder dispara alertas preditivos 12 minutos antes da bateria esgotar.',
          metrics: [
            { label: 'Precisão na Detecção', value: '96.8%' },
            { label: 'Taxa de Falsos Alarmes', value: '0.9%' }
          ]
        }
      },
      {
        id: 'm2-d3',
        name: 'IA On-device e Otimização de Modelos',
        hours: 20,
        objective:
          'Compreender estratégias para adaptar e avaliar modelos de inteligência artificial executados em dispositivos móveis.',
        syllabus:
          'Inferência em dispositivos móveis; conversão e compatibilidade de modelos; quantização; compressão; latência; memória; consumo energético; seleção de modelos; definição de linhas de base; critérios de comparação; limitações de hardware e software.',
        keyTopics: [
          'Quantização: FP32 para FP16 e INT8 (Post-Training Quantization vs QAT)',
          'Compressão de Modelos via Pruning (Poda de Pesos) e Destilação de Conhecimento',
          'Execução Otimizada com LiteRT (TensorFlow Lite), ONNX Runtime e NNAPI',
          'Aceleração em NPU e DSP vs CPU multithreaded',
          'Trade-offs: Impacto na Acurácia Top-1 vs Redução de 75% no Tamanho'
        ],
        interactiveDemoType: 'quantization',
        practicalCase: {
          title: 'Quantização INT8 de Rede de Visão Computacional para o Chipset',
          scenario:
            'Modelo MobileNetV3 em float32 possui 16.4 MB e gasta 85ms por inferência, consumindo muita energia e gerando aquecimento.',
          description:
            'Aplicação de Post-Training Full Integer Quantization (INT8) utilizando um dataset de calibração representativo de 100 imagens.',
          solution:
            'Tamanho reduzido para 4.1 MB (redução de 75%), latência caiu para 19ms na GPU/NPU mantendo 98.8% da acurácia original.',
          metrics: [
            { label: 'Tamanho do Modelo', value: '4.1 MB (era 16.4 MB)', delta: '-75%' },
            { label: 'Latência por Frame', value: '19 ms (era 85 ms)', delta: '-77.6%' },
            { label: 'Consumo Energético', value: '0.45 mWh (era 1.9 mWh)', delta: '-76%' }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    slug: 'trilha-seguranca',
    title: 'Módulo 3 – Trilha de Segurança de Dispositivos Móveis e Automação de Validações',
    subtitle: 'Hardening AOSP, Modelagem de Ameaças, SELinux e Automação de Testes de Segurança',
    badge: 'Especialização • 75 Horas',
    color: '#10b981',
    accentColor: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    totalHours: 75,
    threeDType: 'security-shield',
    objective:
      'Desenvolver competências para analisar a arquitetura de segurança do Android, modelar ameaças, identificar e validar vulnerabilidades, realizar testes de segurança autorizados e desenvolver mecanismos automatizados de verificação, respeitando princípios éticos, legais e de comunicação responsável.',
    description:
      'Esta trilha aborda a segurança defensiva e a análise de vulnerabilidades em dispositivos móveis. Os residentes compreendem os mecanismos mais profundos do AOSP (Sandbox baseada em UID, políticas SELinux, Android Keystore protegido por hardware, criptografia e Verified Boot), além de automatizarem verificações estáticas e dinâmicas com produção de evidências rastreáveis.',
    highlights: [
      'Modelagem formal de ameaças com STRIDE e mapeamento de superfície de ataque',
      'Arquitetura AOSP: Linux Kernel Sandboxing, UIDs isolados e SELinux Mandatory Access Control',
      'Cadeia de Confiança (Chain of Trust) e Verified Boot (AVB 2.0)',
      'Hardware Keystore, StrongBox e Isolamento Criptográfico em TEE (TrustZone)',
      'Análise Estática (SAST) e Dinâmica (DAST) em componentes exportados',
      'Scripts automatizados de verificação de conformidade de segurança e logs forenses'
    ],
    disciplines: [
      {
        id: 'm3-d1',
        name: 'Introdução à Cibersegurança, Modelagem de Ameaças e Análise de Vulnerabilidades',
        hours: 35,
        objective:
          'Identificar ativos, ameaças, vulnerabilidades e superfícies de ataque em dispositivos e aplicações Android.',
        syllabus:
          'Identificação de ativos; superfícies e vetores de ataque; agentes de ameaça; modelagem de ameaças; priorização de riscos; vulnerabilidades em aplicações e componentes Android; análise estática e dinâmica; princípios de hardening; mecanismos de mitigação.',
        keyTopics: [
          'Metodologias de Modelagem: STRIDE, DREAD e PASTA',
          'Superfície de Ataque Android: Exported Components, Intents Implícitas e Deep Links',
          'Vulnerabilidades Críticas: Injeção de SQL em ContentProviders, Path Traversal',
          'Ferramentas de Análise Estática: Semgrep, MobSF e Jadx',
          'Hardening de Código: Ofuscação com R8/ProGuard, Anti-Tampering e Verificação de Assinatura'
        ],
        interactiveDemoType: 'threat-matrix',
        practicalCase: {
          title: 'Auditoria de Segurança em Content Provider Vulnerável',
          scenario:
            'Um app bancário terceirizado declarou um ContentProvider com `android:exported="true"` sem permissões de leitura/escrita delimitadas.',
          description:
            'Demonstração em ambiente controlado de leitura indevida do banco de dados SQLite local por outro aplicativo malicioso não privilegiado.',
          solution:
            'Correção com restrição estrita via permissão customizada de nível `signature` e validação com `UriMatcher`.',
          codeSnippet: `<!-- Correção no AndroidManifest.xml -->
<permission android:name="com.seldon.sec.READ_VAULT"
    android:protectionLevel="signature" />

<provider
    android:name=".data.VaultProvider"
    android:authorities="com.seldon.sec.provider"
    android:exported="true"
    android:readPermission="com.seldon.sec.READ_VAULT" />`
        }
      },
      {
        id: 'm3-d2',
        name: 'Android Open Source Project – Arquitetura de Segurança Android',
        hours: 20,
        objective:
          'Compreender a arquitetura interna do Android e os mecanismos responsáveis pela segurança da plataforma.',
        syllabus:
          'Arquitetura Android; Kernel; HAL; ART; Binder IPC; sandbox; permissões; SELinux; Verified Boot; Android Keystore; criptografia; cadeia de confiança; controle de acesso; atualizações de segurança; ADB e logs de segurança.',
        keyTopics: [
          'Sandbox Android: Isolamento por UID/GID Unix por aplicativo',
          'Security-Enhanced Linux (SELinux): Modos Enforcing/Permissive, Te-rules e Labels',
          'Android Verified Boot (AVB): Raiz de confiança de hardware até o sistema de arquivos dm-verity',
          'Android Keystore: Geração de chaves em hardware seguro (TEE / StrongBox Keymint)',
          'Criptografia de Arquivos (FBE - File-Based Encryption) e Credential Storage'
        ],
        interactiveDemoType: 'keystore',
        practicalCase: {
          title: 'Proteção de Token de Autenticação com Keystore + Biometria',
          scenario:
            'Garantir que a chave de autenticação nunca possa ser extraída da memória, mesmo se o sistema operacional for comprometido ou sofrer root.',
          description:
            'Geração de chave AES-256 no StrongBox com exigência de autenticação biométrica do usuário para cada uso.',
          solution:
            'Tentativas de uso sem validação biométrica geram exceção `UserNotAuthenticatedException` pelo hardware de segurança.',
          codeSnippet: `// Geração de chave respaldada por Hardware Keystore
val keyGenerator = KeyGenerator.getInstance(KeyProperties.KEY_ALGORITHM_AES, "AndroidKeyStore")
val keyGenParameterSpec = KeyGenParameterSpec.Builder("SeldonMasterKey",
    KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
    .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
    .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
    .setUserAuthenticationRequired(true)
    .setIsStrongBoxBacked(true)
    .build()
keyGenerator.init(keyGenParameterSpec)
keyGenerator.generateKey()`
        }
      },
      {
        id: 'm3-d3',
        name: 'Automação de Testes e Validações de Segurança',
        hours: 20,
        objective:
          'Planejar verificações automatizadas e produzir evidências rastreáveis de segurança em ambiente controlado.',
        syllabus:
          'Estratégias de testes de segurança; definição de casos e critérios; automação de verificações; scripts de validação; coleta de logs; tratamento de resultados; falsos positivos e negativos; execução em ambiente controlado; registro e rastreabilidade das evidências.',
        keyTopics: [
          'Pipelines DevSecOps: Testes de Segurança Contínuos',
          'Scripts em Python e Bash para inspeção de APKs e Manifestos',
          'Fuzzing de Intents e Chamadas IPC Binder',
          'Mitigação e Tratamento de Falsos Positivos com Triagem Estruturada',
          'Geração de Relatórios com Rastreabilidade de Evidências em Compliance'
        ],
        interactiveDemoType: 'ci-pipeline',
        practicalCase: {
          title: 'Scanner Automatizado de Configurações Inseguras de Rede (Network Security Config)',
          scenario:
            'Garantir que nenhum build de Release permita tráfego HTTP em texto claro (`cleartextTrafficPermitted="true"`) ou aceite CAs de certificados inválidos.',
          description:
            'Script automatizado integrado à pipeline CI que descompacta o manifesto do APK compilado e valida a política de segurança de rede.',
          solution:
            'Bloqueio automático do merge caso o APK viole o TLS 1.3 obrigatório.',
          metrics: [
            { label: 'Tempo de Varredura', value: '4.8 segundos' },
            { label: 'Vulnerabilidades Mitigadas', value: '100% de conformidade' }
          ]
        }
      }
    ]
  },
  {
    id: 4,
    slug: 'trilha-eficiencia-energetica',
    title: 'Módulo 4 – Trilha de Eficiência Energética avaliada por Algoritmos de Otimização',
    subtitle: 'Doze Mode, Profiling Físico de Potência e Otimização Heurística Multi-Objetivo',
    badge: 'Especialização • 75 Horas',
    color: '#f59e0b',
    accentColor: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    totalHours: 75,
    threeDType: 'energy-soc',
    objective:
      'Desenvolver competências para medir e analisar o consumo energético de dispositivos Android, construir modelos de predição, identificar padrões anormais e aplicar algoritmos de otimização para melhorar a eficiência energética sem comprometer o desempenho, a estabilidade e a experiência do usuário.',
    description:
      'Esta trilha aborda a física e a engenharia do consumo de energia em dispositivos móveis modernos. Os participantes dominam a gestão energética do AOSP (PowerManager, Wakelocks, Doze Mode, App Standby Buckets), realizam medições empíricas com amostradores de corrente física e software profilers (Battery Historian), e aplicam algoritmos de otimização mono e multiobjetivo (Fronteira de Pareto) para equilibrar potência, framerate e temperatura.',
    highlights: [
      'Gestão energética profunda no AOSP: PowerManagerService, BatteryService e Wakelocks',
      'Ciclo de Vida do Doze Mode: Light Doze, Deep Doze e Maintenance Windows',
      'Instrumentação física com Monsoon Power Monitor e software profiling via Battery Historian',
      'Protocolos experimentais controlados com repetibilidade e eliminação de ruídos',
      'Modelagem matemática de consumo energético baseada em estados de CPU/GPU e rádio',
      'Algoritmos de Otimização Multiobjetivo: Algoritmos Genéticos (NSGA-II) e Trade-offs de Pareto'
    ],
    disciplines: [
      {
        id: 'm4-d1',
        name: 'Android Open Source Project – Gestão Energética da Plataforma',
        hours: 25,
        objective:
          'Compreender a arquitetura Android e os mecanismos responsáveis pelo gerenciamento energético e de recursos computacionais.',
        syllabus:
          'Arquitetura Android aplicada ao gerenciamento de recursos; processos e memória; Power Manager; Battery Manager; Alarm Manager; JobScheduler; WorkManager; CPU, GPU e NPU; estados de energia; gerenciamento térmico; conectividade; sensores; wakelocks; Doze Mode e App Standby.',
        keyTopics: [
          'PowerManager e o Ciclo de Vida de Wakelocks (PARTIAL_WAKE_LOCK)',
          'Estados de Baixo Consumo: Doze Mode (Deep & Light) e App Standby Buckets',
          'Agendamento Inteligente de Tarefas: JobScheduler e WorkManager com Restrições',
          'Gerenciamento Térmico e Escalonamento Dinâmico de Frequência (DVFS)',
          'Consumo de Rádio Celular (RRC States) e Módulos de GPS/Sensores'
        ],
        interactiveDemoType: 'doze',
        practicalCase: {
          title: 'Resolução de Dreno Vampiro de Bateria causado por Wakelock Falso',
          scenario:
            'Usuários relatam perda de 35% de bateria durante a noite com o aparelho em repouso e tela desligada.',
          description:
            'Geração de `bugreport` do Android e análise detalhada no Battery Historian.',
          solution:
            'Identificação de um `WakeLock` adquirido por um serviço de geolocalização que nunca chamava `release()` quando o sinal de GPS era perdido. Substituição por `WorkManager` com restrição de conectividade.',
          metrics: [
            { label: 'Dreno em Standby Noturno', value: 'de 35% para 2.1%', delta: '-94%' },
            { label: 'Tempo em Deep Sleep', value: '96.4% do repouso' }
          ]
        }
      },
      {
        id: 'm4-d2',
        name: 'Medição e Profiling Energético',
        hours: 25,
        objective:
          'Planejar medições de consumo energético em dispositivos Android com consistência, repetibilidade e qualidade.',
        syllabus:
          'Fundamentos de consumo energético; instrumentação; métricas de potência, energia, autonomia e desempenho; protocolos experimentais; cenários de uso; controle de variáveis; linhas de base; coleta e organização de dados; repetibilidade; precisão e confiabilidade.',
        keyTopics: [
          'Fundamentos: Tensão (V), Corrente (I), Potência Instantânea (mW) e Energia (mWh)',
          'Equipamentos de Medição Física: Monsoon High Voltage Power Monitor',
          'Software Profiling: Dumpsys batterystats, Bugreports e Battery Historian',
          'Isolamento de Variáveis: Luminosidade de tela, temperatura ambiente e modo avião',
          'Cálculo de Desvio Padrão e Repetibilidade de Ensaios Científicos'
        ],
        interactiveDemoType: 'scientific-method',
        practicalCase: {
          title: 'Bancada Experimental Automatizada com Amostragem a 5kHz',
          scenario:
            'Medir com exatidão científica o impacto energético de codecs de vídeo (H.264 decodificado por hardware vs AV1 por software).',
          description:
            'Alimentação do dispositivo diretamente pelos bornes de bateria usando o medidor Monsoon acoplado via script Python.',
          solution:
            'Comprovou-se que a decodificação por hardware consome 420 mW médios contra 1.850 mW da decodificação por software.',
          metrics: [
            { label: 'Potência Média (HW Decode)', value: '420 mW' },
            { label: 'Potência Média (SW Decode)', value: '1.850 mW', delta: '+340%' },
            { label: 'Duração Estimada da Bateria', value: '14.2h vs 3.2h' }
          ]
        }
      },
      {
        id: 'm4-d3',
        name: 'Modelagem e Algoritmos de Otimização',
        hours: 25,
        objective:
          'Compreender métodos de modelagem e otimização do consumo energético em sistemas Android.',
        syllabus:
          'Modelagem do consumo energético; análise exploratória; identificação de padrões; otimização mono e multiobjetivo; funções objetivo; restrições; busca e heurísticas; comparação de configurações; compromissos entre energia, desempenho, estabilidade e experiência do usuário.',
        keyTopics: [
          'Modelagem Estatística de Consumo por Componente (Power Profiles XML)',
          'Otimização Multiobjetivo: Conceito de Dominância e Fronteira de Pareto',
          'Algoritmos Heurísticos: Algoritmos Genéticos (NSGA-II), Simulated Annealing',
          'Formulação Matemática: Minimização de Potência com Restrição de 60 FPS',
          'Trade-offs: Qualidade Visual vs Taxa de Amostragem de Sensores vs Térmica'
        ],
        interactiveDemoType: 'pareto',
        practicalCase: {
          title: 'Otimização Multiobjetivo de Frequência de CPU com Algoritmo Genético',
          scenario:
            'Encontrar a melhor combinação de governadores de CPU (Interactive vs Schedutil) e limites de clock que maximize o tempo de bateria sem permitir engasgos visuais na tela.',
          description:
            'Execução do algoritmo NSGA-II simulando 50 gerações de configurações no kernel do dispositivo.',
          solution:
            'A solução ótima de Pareto economizou 18% de bateria global preservando 59.8 FPS médios estáveis.',
          metrics: [
            { label: 'Economia Energética', value: '18.4%' },
            { label: 'Estabilidade de Frames', value: '59.8 FPS' },
            { label: 'Temperatura Máxima do SoC', value: '38.2 °C' }
          ]
        }
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    moduleId: 1,
    disciplineId: 'm1-d1',
    question: 'Qual é o principal objetivo da formulação de uma hipótese nula em um experimento de desempenho de software?',
    options: [
      'Provar que o novo código é necessariamente mais rápido que o antigo',
      'Assumir temporariamente que não há diferença estatística real entre as versões para validar se os resultados não decorrem de mero acaso',
      'Eliminar a necessidade de medir variáveis de controle',
      'Garantir que a aplicação não apresente erros de compilação'
    ],
    correctIndex: 1,
    explanation: 'A hipótese nula (H0) assume ausência de efeito. Se o p-valor obtido for menor que o limiar de significância (ex: p < 0.05), rejeita-se H0 em favor da hipótese alternativa com respaldo estatístico.'
  },
  {
    id: 'q2',
    moduleId: 1,
    disciplineId: 'm1-d4',
    question: 'Na Clean Architecture aplicada ao Android, qual camada deve conter as regras de negócio puras sem depender do framework Android?',
    options: [
      'Presentation Layer (ViewModels e Telas)',
      'Data Layer (Retrofit e Room)',
      'Domain Layer (UseCases e Entidades de Domínio)',
      'Framework Layer (Activities e Services)'
    ],
    correctIndex: 2,
    explanation: 'A camada de Domínio (Domain Layer) deve ser escrita em Kotlin puro, sem referências a classes do SDK Android (como Context ou Bundle), permitindo testes unitários velozes e desacoplamento total.'
  },
  {
    id: 'q3',
    moduleId: 2,
    disciplineId: 'm2-d1',
    question: 'Por qual motivo o Perfetto Trace é preferível em relação a simples logs no Logcat para análise de jank no Android?',
    options: [
      'Porque o Logcat não funciona em dispositivos reais',
      'Porque o Perfetto captura nanossegundos da atividade de threads, escalonamento de CPU (sched) e chamadas Binder IPC com overhead mínimo',
      'Porque o Perfetto converte automaticamente código Kotlin em C++',
      'Porque o Logcat só monitora a bateria'
    ],
    correctIndex: 1,
    explanation: 'O Perfetto grava eventos diretamente do kernel Linux via ftrace e do runtime com resolução de nanossegundos, possibilitando visualizar exatamente quando uma thread foi suspensa ou aguardou por IPC.'
  },
  {
    id: 'q4',
    moduleId: 2,
    disciplineId: 'm2-d3',
    question: 'Qual a principal vantagem da quantização INT8 de modelos neurais em dispositivos móveis?',
    options: [
      'Aumentar o tamanho do modelo em 4x para maior precisão',
      'Reduzir a ocupação de memória em ~75% e acelerar inferências com instruções vetoriais ou NPUs dedicadas',
      'Converter redes neurais em tabelas SQL',
      'Permitir que o modelo treine mais rápido na nuvem'
    ],
    correctIndex: 1,
    explanation: 'Ao converter pesos e ativações de Float32 (4 bytes) para Int8 (1 byte), o tamanho do modelo é reduzido para 1/4 e unidades de processamento de hardware (NPUs/DSPs) executam a matemática de inteiros com muito menos energia e menor latência.'
  },
  {
    id: 'q5',
    moduleId: 3,
    disciplineId: 'm3-d2',
    question: 'O que garante que as chaves criptográficas geradas no Android Keystore com `setIsStrongBoxBacked(true)` permaneçam seguras mesmo em caso de comprometimento do kernel?',
    options: [
      'Elas ficam gravadas em um arquivo .txt oculto no diretório /system',
      'Elas são protegidas em um hardware isolado e resistente a adulterações físicas (Secure Element / TEE dedicado)',
      'Elas são transmitidas para a nuvem a cada reinicialização',
      'Elas utilizam senhas de 8 caracteres geradas pelo usuário'
    ],
    correctIndex: 1,
    explanation: 'O StrongBox é um módulo de hardware com CPU, memória e armazenamento criptográfico totalmente físicos e separados do SoC principal, impedindo a extração das chaves mesmo que o Kernel Linux sofra exploit com privilégios de root.'
  },
  {
    id: 'q6',
    moduleId: 4,
    disciplineId: 'm4-d1',
    question: 'Quando o Android entra no modo "Deep Doze", qual das seguintes restrições NÃO é imposta aos aplicativos normais?',
    options: [
      'O acesso à rede é suspenso',
      'Wakelocks comuns são ignorados pelo sistema',
      'Todos os aplicativos são desinstalados da memória permanente',
      'Jobs agendados e sincronizações são adiados até a próxima janela de manutenção (Maintenance Window)'
    ],
    correctIndex: 2,
    explanation: 'O Doze Mode suspende conexões de rede, ignora wakelocks e adia jobs para economizar bateria, mas nunca desinstala nem exclui aplicativos do usuário.'
  },
  {
    id: 'q7',
    moduleId: 4,
    disciplineId: 'm4-d3',
    question: 'Em um problema de otimização energética multiobjetivo, o que define a "Fronteira de Pareto"?',
    options: [
      'O conjunto de soluções em que nenhum objetivo pode ser melhorado sem piorar outro',
      'A única solução que zera totalmente o consumo de energia',
      'Uma linha que indica o momento exato em que a bateria atinge 0%',
      'O limite de clock mínimo suportado pela CPU'
    ],
    correctIndex: 0,
    explanation: 'Na otimização multiobjetivo (ex: conciliar Framerate Alto vs Consumo Baixo de Bateria), a Fronteira de Pareto é o conjunto de soluções não-dominadas onde qualquer ganho adicional de FPS acarretará em aumento de potência dissipada.'
  }
];
