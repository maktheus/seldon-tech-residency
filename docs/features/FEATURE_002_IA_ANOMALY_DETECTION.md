# FEATURE_002: Detecção de Anomalias On-Device com Autoencoder INT8 (Módulo 2)

**Autor:** Matheus Uchoa (Seldon Tech Residency)  
**Módulo Seldon:** Módulo 2: Inteligência Artificial Embarcada & Otimização On-Device  
**Status:** Concluída e Aprovada por Testes  
**Data:** 2026-10-23  

---

## 1. Descrição do Problema e Motivação
Ataques de negação de serviço inter-processos (Binder IPC Flooding), vazamento de memória e looping de renderização degradam a experiência do usuário e provocam throttling térmico. Soluções convencionais baseadas em regras estáticas falham em detectar anomalias complexas e correlacionadas. Este projeto introduz um Autoencoder neural leve que modela a distribuição de normalidade de 8 sinais de telemetria AOSP em tempo real.

## 2. Fundamentação Teórica e Estado da Arte
- **Autoencoders para Detecção de Anomalias:** Baseado em Malhotra et al. (2016), anomalias apresentam elevado erro de reconstrução (MSE) porque o espaço latente de baixa dimensionalidade foi treinado apenas para comprimir trajetórias operacionais normais.
- **Quantização Pós-Treinamento (PTQ):** Aplica a formulação simétrica de Jacob et al. (CVPR 2018), mapeando pesos contínuos para inteiros de 8 bits ($W_{int8} = \text{round}(W / S)$ com $S = \max(|W|) / 127$).

## 3. Arquitetura da Solução
- **Diretório:** `projects/projeto_ia_anomalia/`
- **Modelo:** `model/anomaly_autoencoder.py` (Topologia: 8 -> 6 -> 3 -> 6 -> 8).
- **Runtime:** `runtime/inference_engine.py` (Normalizador de streaming contínuo e cálculo de latência).
- **Latência média obtida:** Inferior a 0.5ms por inferência, muito abaixo do limite crítico estipulado de 15ms.

## 4. Resultados dos Testes Automatizados
- Testes unitários executados em `tests/test_anomaly_detection.py`.
- 100% de precisão na identificação de eventos simulados de exaustão de Binder IPC (MSE > 0.12).
- Zero falsos-positivos em telemetria nominal de repouso.
