# 🚀 Mini-Seldon Telemetry & Security Engine
### Desafio Técnico Prático — Processo Seletivo Seldon Tech Residency 2026

Bem-vindo(a) ao desafio técnico prático do **Programa de Residência Tecnológica Seldon**!

O objetivo deste desafio é avaliar sua capacidade de raciocínio lógico, engenharia de software limpa, manipulação de dados de telemetria e compreensão de conceitos fundamentais de sistemas operacionais móveis modernos (segurança, inteligência artificial embarcada e eficiência energética).

---

## ⏱️ Informações Gerais & Prazo de Entrega

- **Prazo Impreterível:** **Terça-feira até às 23:59 (horário de Manaus / Brasília)**.
- **Tempo Estimado de Resolução:** Entre 2 e 4 horas.
- **Entrevistas Técnicas:** Quarta-feira e Quinta-feira (agendamento individual de 15 minutos com a banca avaliadora).
- **Pré-requisitos de Ambiente:** Apenas **Python 3.8+** instalado. Não é necessária nenhuma instalação externa via `pip`. Toda a arquitetura foi desenhada sobre a biblioteca padrão do Python (`math`, `time`, `typing`, `dataclasses`, `unittest`).

---

## 🎯 Estrutura do Desafio

Você recebeu a arquitetura base do subsistema **SeldonCore**, onde aproximadamente 80% do boilerplate já está pronto. Sua missão é completar **3 tarefas pontuais (`TODOs`)**:

```
starter_kit/
├── seldon_core/
│   ├── __init__.py
│   ├── telemetry.py          # Estrutura de dados canônica do frame de telemetria
│   ├── security_guard.py     # [TAREFA 1] Validador e sanitizador de chamadas IPC
│   ├── anomaly_detector.py   # [TAREFA 2] Cálculo de MSE e detecção de anomalias
│   └── power_tuner.py        # [TAREFA 3] Gerenciador de perfis de energia e DVFS
├── tests/
│   ├── __init__.py
│   └── test_desafio.py       # 15 testes unitários automatizados
├── submission_template.md    # Ficha de submissão (1 página) para a entrevista
└── README.md                 # Este guia de instruções
```

---

## 📝 Descrição das Tarefas

### 🛡️ Tarefa 1: Guardião de Segurança IPC Binder (`seldon_core/security_guard.py`)
No Android/AOSP, o Binder é o mecanismo primário de comunicação entre processos (IPC). Transações malformadas ou com payloads gigantescos podem derrubar daemons essenciais (`TransactionTooLargeException`) ou permitir ataques de repetição (*Replay Attacks*).
- **O que fazer:** Localize a função `validate_transaction` marcada com `TODO (CANDIDATO - TAREFA 1)`.
- **Implementar:**
  1. Limpeza de tokens expirados chamando `self.clean_expired_tokens(timestamp)`.
  2. Validação de tamanho: rejeitar transações `<= 0` (código `INVALID_SIZE`) ou `> MAX_PARCEL_BYTES` (800 KB, código `BUFFER_OVERFLOW`).
  3. Prevenção de repetição: rejeitar transações cujo token já esteja presente no histórico não-expirado (código `REPLAY_ATTACK_DETECTED`).
  4. Registro e aprovação de transações válidas (código `APPROVED`).

---

### 🧠 Tarefa 2: IA On-Device & Detecção de Anomalias (`seldon_core/anomaly_detector.py`)
Monitorar em tempo real se o smartphone está sofrendo com degradações anormais (vazamento de memória, looping de CPU, gargalo de renderização).
- **O que fazer:** Localize os dois `TODOs` na classe `AnomalyDetector`.
- **Implementar:**
  1. `calculate_mse(vector_a, vector_b)`: Calcular a fórmula matemática exata do Erro Quadrático Médio:
     $$\text{MSE} = \frac{1}{N} \sum_{i=0}^{N-1} (a_i - b_i)^2$$
     (Validar se os vetores não são vazios e possuem mesmo tamanho; caso contrário, lançar `ValueError`).
  2. `evaluate_frame(frame)`: Orquestrar a normalização, reconstrução simulada pelo Autoencoder, cálculo do MSE e classificação de anomalia contra o `threshold`.

---

### ⚡ Tarefa 3: Otimizador Energético e Térmico (`seldon_core/power_tuner.py`)
Equilibrar taxa de quadros (FPS) sem superaquecer o processador ou drenar a bateria prematuramente (*Fronteira de Pareto*).
- **O que fazer:** Localize o `TODO (CANDIDATO - TAREFA 3)` na função `select_operating_profile`.
- **Implementar:**
  1. **Regra de Emergência:** Se a temperatura for `> 48.0 °C` ou a bateria for `<= 15.0%`, selecionar imediatamente `OperatingProfile.THERMAL_EMERGENCY` (30 FPS).
  2. **Regra de Performance:** Se `target_fps >= 120`, conceder `OperatingProfile.PERFORMANCE` apenas se bateria `> 30.0%` e temperatura `<= 42.0 °C`. Caso contrário, fazer fallback para `BALANCED` (90 FPS).
  3. **Regra de Equilíbrio:** Se `target_fps` entre 61 e 119, conceder `BALANCED` se temperatura `<= 45.0 °C` e bateria `> 20.0%`. Caso contrário, fallback para `ECO` (60 FPS).
  4. **Regra Eco:** Para `target_fps <= 60`, selecionar `OperatingProfile.ECO`.
  5. Registrar histórico e retornar os parâmetros consolidados de frequência e potência.

---

## 🧪 Como Executar os Testes Automatizados

Em seu terminal, navegue até a pasta `starter_kit` e execute:

```bash
# Executar a suíte completa de 15 testes
python -m unittest tests/test_desafio.py -v
```

Ao iniciar, você verá os testes falharem com `NotImplementedError`. À medida que implementar as tarefas, os testes passarão um a um até atingir `Ran 15 tests ... OK`.

---

## 📦 Como Submeter Sua Resolução

1. Preencha a ficha [`submission_template.md`](./submission_template.md) com suas informações e uma breve justificativa de suas soluções.
2. Envie o link do seu repositório no GitHub (ou compacte a pasta em um arquivo `.zip`) conforme as orientações enviadas no e-mail / canal do processo seletivo até **Terça-feira, às 23:59**.
3. Esteja preparado(a) para demonstrar a execução dos testes e explicar suas decisões técnicas na entrevista individual na quarta ou quinta-feira!

Boa sorte! 💡
