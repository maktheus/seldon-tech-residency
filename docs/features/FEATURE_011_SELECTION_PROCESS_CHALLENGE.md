# FEATURE_011: Pacote Modular de Desafio Prático para o Processo Seletivo 2026

**Autor:** Matheus Uchoa (Seldon Tech Residency)  
**Módulo Seldon:** Gestão de Talentos & Núcleo Comum de Seleção (Módulos 1, 2, 3 e 4)  
**Status:** Concluída e Aprovada por Testes  
**Data:** 2026-10-24  

---

## 1. Descrição do Problema e Motivação
O repositório original continha requisitos de infraestrutura e projetos avançados (compilação completa de AOSP de 250 GB, daemons C++/Rust nativos com AIDL, provas matemáticas com Microsoft Z3 e bancos de ensaio físico com Monsoon). Para o processo seletivo de entrada, onde 41 candidatos foram triados para ~30 participantes com prazo exíguo de entrega (terça-feira à noite) e entrevistas na quarta e quinta-feira antes do feriado, a complexidade original se mostrou desmedida para um teste de admissão.

Esta feature implementa o **Mini-Seldon Telemetry & Security Engine**, um desafio técnico prático onde 80% do boilerplate é fornecido pronto e o candidato desenvolve 3 componentes cirúrgicos em Python puro (sem dependências externas), avaliando segurança de IPC Binder, detecção de anomalias com MSE e otimização energética na Fronteira de Pareto.

## 2. Decisões de Escopo e Reduções Aplicadas
- **Cortado:** Exigência de ambiente Linux com compilação AOSP (`lunch`/`mmma`), toolchains Rust/C++ nativas, provador de teoremas Z3 SMT e virtualizador NimBLE/Netsim.
- **Mantido e Simplificado:**
  1. *Segurança Móvel:* Implementação da sanitização de transações Binder e prevenção de ataques de repetição (Replay Attacks) em `security_guard.py`.
  2. *IA On-Device:* Implementação do cálculo de Erro Quadrático Médio (MSE) e limiar adaptativo de detecção em `anomaly_detector.py`.
  3. *Eficiência Energética:* Implementação de seleção de perfil de hardware (ECO, BALANCED, PERFORMANCE, EMERGENCY) e preservação térmica em `power_tuner.py`.
- **Artefatos Entregues:**
  - `desafio_selecao/starter_kit/`: Código-fonte com `TODOs` claros e suíte de 15 testes unitários (`test_desafio.py`).
  - `desafio_selecao/starter_kit/submission_template.md`: Ficha técnica de 1 página para embasar a entrevista de 15 minutos.
  - `desafio_selecao/GUIA_AVALIACAO_E_ENTREVISTA.md`: Roteiro de perguntas e rubrica objetiva (0 a 100) para selecionar os 20 a 25 aprovados finais.
  - `desafio_selecao/corrigir_candidatos.py`: Corretor automatizado em lote.
  - `desafio_selecao/starter_kit_seldon_2026.zip`: Pacote compactado pronto para envio.

## 3. Arquitetura da Solução
- **Diretório:** `desafio_selecao/`
- **Módulos Centrais:**
  - `seldon_core/telemetry.py`: Dataclass `TelemetryFrame` com conversão de vetor multivariado de 6 sinais.
  - `seldon_core/security_guard.py`: Classe `BinderSecurityGuard` com TTL de tokens e barramento de estouro de buffer (800 KB).
  - `seldon_core/anomaly_detector.py`: Classe `AnomalyDetector` com normalização MinMax e reconstrução de sinal.
  - `seldon_core/power_tuner.py`: Classe `PowerTuner` com regras de dominância e salvaguardas térmicas (48°C / 15% bat).

## 4. Resultados dos Testes Automatizados
- 15 testes unitários implementados em `starter_kit/tests/test_desafio.py`.
- 100% de cobertura dos casos de sucesso, valores de borda e rejeição de anomalias.
- Execução determinística em menos de 0.01s na biblioteca padrão `unittest`.
