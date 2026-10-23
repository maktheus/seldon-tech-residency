# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.
O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e este projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased] - 2026-10-23

### Adicionado (Validação Experimental em Smartphone Real: Samsung Galaxy S23 Ultra)
- **Execução Direta no Silício Real (Qualcomm Snapdragon 8 Gen 2 / aarch64)**:
  - Detecção e conexão do flagship `SM-S918B` rodando Android 16 (API 36).
  - Coleta em tempo real de sensores analógicos de bateria (4073 mV / 4.07 V, 28.2°C) e térmicos (31.2°C via ThermalHAL 2.0).
  - Processamento de telemetria física real pela IA embarcada em **0.1178 ms**.
  - Auditoria de pacotes instalados com o Seldon Fortress detectando riscos de Tapjacking.
  - Geração de perfis de energia NSGA-II dedicados para a tela Dynamic AMOLED 2X do S23 Ultra.
  - Relatório detalhado em `docs/aosp/REAL_DEVICE_VALIDATION_REPORT.md` e comando `npm run validate:device`.
  - Especificação de feature em `docs/features/FEATURE_007_REAL_DEVICE_VALIDATION.md`.

### Adicionado (Benchmark Científico Empírico contra a Literatura & Documentação de Processo)
- **Benchmark Empírico Rigoroso (`scripts/benchmark_against_literature.py`)**:
  - Comparação dos 3 projetos contra a literatura seminal (CVPR 2018, PLDI 2014, OSDI 2014, USENIX 2010, IEEE 2002).
  - Comprovação de latência de IA em 0.0209 ms (20.9 $\mu$s), compressão de memória de 75% e taxa de auditoria de 121k transações Binder/s.
  - Comprovação de economia de 62.3% em consumo de bateria no modo Eco via NSGA-II.
  - Relatório técnico exaustivo em `docs/aosp/LITERATURE_BENCHMARK_AND_PROCESS.md` e dados brutos em `benchmark_results.json`.
  - Especificação de feature aprovada em `docs/features/FEATURE_006_LITERATURE_BENCHMARK.md`.

### Adicionado (Deploy e Validação ao Vivo no Emulador AOSP Android 15)
- **Execução Real no Emulador AOSP Android 15 (Kernel 6.6 / API 35)**:
  - Criação e inicialização do AVD `Seldon_AOSP_API35` com imagem pura de AOSP.
  - Script automatizado `scripts/deploy_to_emulator.sh` e comando `npm run aosp:deploy`.
  - Confirmação de superusuário `adb root` (UID 0) e leitura direta de telemetria no kernel Linux (`5000000 uV`).
  - Sincronização e injeção de todos os módulos SeldonCore e projetos em `/data/local/tmp/seldon/`.
  - Especificação técnica documentada em `docs/features/FEATURE_005_LIVE_AOSP_DEPLOYMENT_WORKFLOW.md`.

### Adicionado (Implementação Completa e Testes dos 3 Projetos Finais)
- **Módulo 2 (IA Embarcada & Anomalias)**:
  - Implementação de Autoencoder neural leve com quantização pós-treinamento simétrica em INT8 (`projects/projeto_ia_anomalia/`).
  - Motor de inferência de streaming em tempo real com latência <0.5ms.
  - Suíte de testes unitários e benchmarks passando com 100% de precisão.
  - Especificação técnica documentada em `docs/features/FEATURE_002_IA_ANOMALY_DETECTION.md`.
- **Módulo 3 (Segurança Móvel & Seldon Fortress)**:
  - Framework de análise de superfície de ataque e auditoria estática de `AndroidManifest.xml` (`projects/projeto_seguranca_fortress/`).
  - Validador de integridade IPC Binder Guard mitigando estouro de buffers, replay attacks e saturação DoS.
  - Auditor estático de regras SELinux prevenindo escalonamento de privilégios e violações de `neverallow`.
  - Suíte de testes unitários com simulação de ataques passando com 100% de sucesso.
  - Especificação técnica documentada em `docs/features/FEATURE_003_SECURITY_FORTRESS.md`.
- **Módulo 4 (Eficiência Energética & Algoritmo NSGA-II)**:
  - Implementação canônica do algoritmo genético multiobjetivo NSGA-II com Fast Non-dominated Sorting e Crowding Distance (`projects/projeto_energia_pareto/`).
  - Modelo de potência analítico para SoCs heterogêneos (big.LITTLE, GPU, OLED 60Hz/120Hz).
  - Geração de perfis energéticos autônomos (ECO, BALANCED, GAMING).
  - Suíte de testes validando axiomas de dominância de Pareto e estabilidade térmica.
  - Especificação técnica documentada em `docs/features/FEATURE_004_ENERGY_NSGA2_OPTIMIZER.md`.
- **Orquestrador Geral de Testes**:
  - Script `scripts/run_all_project_tests.sh` executando as 12 suítes de testes automatizados com sucesso em menos de 0.02s.

### Adicionado (AOSP Android 15 Development Infrastructure)
- **Infraestrutura AOSP Android 15 (VanillaIceCream / API 35)**:
  - Criação da árvore de módulos `aosp/packages/services/SeldonCore/`.
  - Interface AIDL `ISeldonTelemetryService.aidl` com métodos de IPC para telemetria de energia, IA neural e segurança de sistema.
  - Daemon nativo em C++ (`seldond`) com inicialização via `seldond.rc` e build Soong via `Android.bp`.
  - Políticas de segurança SELinux completas em `aosp/system/sepolicy/` (`seldond.te`, `service_contexts`, `file_contexts`).
- **Política Estrita de Documentação Obrigatória**:
  - Hook de pré-commit `.githooks/pre-commit` bloqueando alterações de código desacompanhadas de documentação técnica.
  - Script de instalação de hooks `scripts/install_hooks.sh`.
  - Verificador de auditoria contínua `scripts/verify_feature_docs.sh`.
  - Template oficial `docs/features/TEMPLATE.md` e documento de política `docs/features/FEATURE_WORKFLOW_POLICY.md`.
  - Especificação completa `docs/features/FEATURE_001_ANDROID15_AOSP_INFRASTRUCTURE.md`.
- **Scripts de Automação de Emulador e Build**:
  - `scripts/setup_aosp_android15.sh`: Prepara SDK, licenças e cria o AVD Android 15 AOSP puro.
  - `scripts/run_aosp_emulator.sh`: Execução acelerada via hardware KVM (GUI ou Headless).
  - `scripts/build_seldon_aosp.sh`: Guia de compilação na árvore AOSP via Soong/Blueprint.
- **Guias Técnicos Completos**:
  - `docs/aosp/ANDROID_15_AOSP_GUIDE.md`: Manual passo-a-passo de compilação da árvore AOSP Android 15, lunch targets e depuração.
  - `docs/aosp/SELDON_SYSTEM_ARCHITECTURE.md`: Arquitetura do daemon de sistema, Binder IPC e integração com os 4 módulos do Seldon.
