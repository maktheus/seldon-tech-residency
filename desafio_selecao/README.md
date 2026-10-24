# 🎯 Processo Seletivo Seldon Tech Residency 2026
### Desafio Técnico Prático: Mini-Seldon Telemetry & Security Engine

Este diretório contém o pacote completo do **Desafio Prático de Seleção** estruturado para a triagem e avaliação dos candidatos ao Programa de Residência Tecnológica Seldon.

---

## ⚡ Racional das Modificações & Redução de Escopo

Atendendo ao alinhamento estratégico com a coordenação do programa (para aplicação aos **30 candidatos pré-selecionados**, entrega na **Terça-feira até 23:59** e entrevistas na **Quarta e Quinta-feira** antes do feriado):

1. **Eliminação de Atritos de Ambiente:**
   - Cortadas exigências de compilação de código AOSP monolítico (250 GB), daemons C++/Rust nativos, provador de teoremas Microsoft Z3 e virtualizadores de rádio BLE.
   - O desafio foi centralizado em **Python 3 padrão (sem `pip install`)**, garantindo execução imediata em qualquer máquina (Windows, Mac ou Linux).

2. **Entrega de 80% da Base Pronta ("Fazer a maior parte"):**
   - O candidato recebe as estruturas de telemetria, simulação de modelo e suíte de testes já construídas.
   - Ele precisa implementar apenas **3 funções essenciais (`TODOs`)**:
     - **Tarefa 1 (Segurança Móvel):** Sanitização de buffer Binder e prevenção de Replay Attacks.
     - **Tarefa 2 (IA & Otimização):** Cálculo de Erro Quadrático Médio (MSE) e limiar de anomalia.
     - **Tarefa 3 (Eficiência Energética):** Gerenciador de perfis térmicos e fallback de FPS na Fronteira de Pareto.

3. **Tempo Estimado:**
   - 2 a 4 horas de dedicação líquida. Viável e respeitoso com o prazo até terça-feira à noite.

4. **Foco na Arguição Técnica:**
   - Ficha de 1 página (`submission_template.md`) onde o candidato defende suas escolhas de código, servindo como roteiro para as entrevistas individuais de 15 minutos na quarta e quinta-feira.

---

## 📁 Estrutura de Arquivos

```
desafio_selecao/
├── starter_kit_seldon_2026.zip     # Arquivo compactado pronto para envio aos candidatos
├── README.md                        # Este documento explicativo
├── GUIA_AVALIACAO_E_ENTREVISTA.md   # Manual de pontuação e perguntas de entrevista para a banca
├── corrigir_candidatos.py           # Script automatizado para correção em lote na quarta-feira
└── starter_kit/                     # Código-fonte base entregue ao candidato
    ├── README.md                    # Instruções detalhadas para o candidato
    ├── submission_template.md       # Ficha de submissão (1 página)
    ├── seldon_core/
    │   ├── __init__.py
    │   ├── telemetry.py
    │   ├── security_guard.py        # [TAREFA 1]
    │   ├── anomaly_detector.py      # [TAREFA 2]
    │   └── power_tuner.py           # [TAREFA 3]
    └── tests/
        ├── __init__.py
        └── test_desafio.py          # 15 testes unitários automatizados
```

---

## 🚀 Como a Coordenação e o Tech Lead Devem Operar

1. **Hoje à Tarde:**
   - Enviar o arquivo `starter_kit_seldon_2026.zip` por e-mail / WhatsApp aos ~30 candidatos com as instruções do `starter_kit/README.md`.
2. **Terça-feira (23:59):**
   - Receber os repositórios/arquivos dos candidatos.
3. **Quarta-feira (Manhã):**
   - Rodar `python desafio_selecao/corrigir_candidatos.py --submissions_dir <pasta_com_entregas>`.
4. **Quarta e Quinta-feira:**
   - Conduzir as entrevistas de 15 minutos seguindo as perguntas do `GUIA_AVALIACAO_E_ENTREVISTA.md` e selecionar os 20 a 25 titulares.
