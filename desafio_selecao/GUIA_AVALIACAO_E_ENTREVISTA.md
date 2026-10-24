# 🎯 Guia de Avaliação Técnica & Roteiro de Entrevistas
### Banca Examinadora — Processo Seletivo Seldon Tech Residency 2026
**Destinatários:** Matheus Uchoa (Tech Lead) & Coordenação do Programa (+55 92 8402-5442)

---

## 📅 1. Cronograma Operacional Alinhado

| Data / Horário | Etapa | Responsável | Ação Principal |
| :--- | :--- | :--- | :--- |
| **Sexta-feira (Hoje à Tarde)** | Envio do Desafio | Coordenação | Disparar o `starter_kit.zip` para os ~30 candidatos triados (dos 41 inscritos). |
| **Sábado a Terça-feira** | Execução Prática | Candidatos | Desenvolvimento das 3 tarefas (tempo estimado: 2 a 4 horas líquidas). |
| **Terça-feira (23:59)** | Prazo Limite | Candidatos | Envio do código no GitHub / arquivo `.zip` + Ficha `submission_template.md`. |
| **Quarta-feira (08:00 - 09:30)** | Triagem Automatizada | Matheus | Execução em lote dos testes unitários dos 30 envios (gera ranking preliminar). |
| **Quarta-feira (10:00 - 18:00)** | Entrevistas (Bloco 1) | Matheus + Coordenador | Entrevistas individuais de 15 min com candidatos 01 a 12. |
| **Quinta-feira (09:00 - 17:00)** | Entrevistas (Bloco 2) | Matheus + Coordenador | Entrevistas individuais de 15 min com candidatos 13 a 24. |
| **Quinta-feira (18:00)** | Deliberação Final | Matheus + Coordenador | Consolidação das notas e seleção final dos 20 a 25 residentes titulares. |
| **Sexta-feira** | **Feriado** | — | Processo seletivo concluído com sucesso antes do recesso. |

---

## 📊 2. Matriz de Pontuação Objetiva (0 a 100 Pontos)

| Critério | Peso | O que avaliar |
| :--- | :---: | :--- |
| **1. Conformidade dos Testes Automatizados** | **40 pts** | Execução dos 15 testes unitários (`test_desafio.py`):<br>• 15/15 testes passando = 40 pts<br>• 12 a 14 testes = 30 pts<br>• 9 a 11 testes = 20 pts<br>• Menos de 9 testes = Eliminado ou pontuação residual. |
| **2. Qualidade e Rigor de Código** | **30 pts** | • Clareza, legibilidade e conformidade com PEP 8 (10 pts)<br>• Tratamento de exceções e validação de limites numéricos (10 pts)<br>• Boas práticas e documentação nas respostas da ficha (10 pts) |
| **3. Desempenho na Entrevista Técnica** | **30 pts** | • Domínio autoral do código (comprovação de que ele mesmo implementou) (10 pts)<br>• Capacidade de explicar trade-offs de engenharia (10 pts)<br>• Comunicação técnica clara e alinhamento com a residência (10 pts) |

---

## 🎙️ 3. Roteiro Padronizado de Entrevista (15 Minutos)

Para manter a isonomia e conseguir entrevistar 20 a 25 candidatos em 2 dias (Quarta e Quinta), sugerimos a seguinte estrutura de tempo:

- **00 - 02 min:** Acolhimento e introdução rápida pelo Coordenador.
- **02 - 05 min:** O candidato compartilha a tela, executa `python -m unittest tests/test_desafio.py` e demonstra os testes passando.
- **05 - 12 min:** Arguição técnica com 3 perguntas selecionadas do banco abaixo.
- **12 - 15 min:** Perguntas sobre disponibilidade de tempo e expectativas para as 435 horas de residência.

### Banco de Perguntas Técnicas para a Arguição:

#### 🔹 Pergunta 1 (Segurança / IPC):
> *"Na Tarefa 1, por que é indispensável limitar o tamanho da transação Binder em 800 KB e o que aconteceria com o Android se um app pudesse enviar parcels de 10 MB livremente?"*
- **Resposta Excelente:** Explica que o Binder no Linux compartilha um buffer de memória mapeada (geralmente 1 MB por processo). Se uma transação for maior que isso, causa `TransactionTooLargeException`, satura a memória do driver e pode derrubar daemons de sistema em cascata.
- **Resposta Fraca:** Diz apenas que "gasta muita internet" ou "deixa lento", sem entender o conceito de IPC e buffer compartilhado.

#### 🔹 Pergunta 2 (IA & Telemetria):
> *"Na Tarefa 2, como o cálculo do Erro Quadrático Médio (MSE) permite identificar anomalias sem precisarmos treinar a rede com dados de ataques previamente conhecidos?"*
- **Resposta Excelente:** Explica o conceito de modelo autoassociativo / não supervisionado: o modelo aprende a distribuição do que é "normal" (telemetria nominal). Quando ocorre um comportamento anômalo ou ataque, o modelo não consegue reconstruir o padrão fielmente, gerando um erro MSE alto que ultrapassa o threshold.
- **Resposta Fraca:** Confunde aprendizado supervisionado com não-supervisionado ou não sabe explicar o significado de MSE.

#### 🔹 Pergunta 3 (Eficiência Energética & Pareto):
> *"Na Tarefa 3, por que seu algoritmo força uma redução de 120 FPS para 90 FPS ou 60 FPS quando o processador atinge temperaturas elevadas ou bateria baixa?"*
- **Resposta Excelente:** Cita a relação de potência dinâmica ($P \propto V^2 \cdot f$) e a Fronteira de Pareto. Em alta temperatura, manter 120 FPS exige frequências máximas de CPU/GPU que levariam ao thermal shutdown do chassi. Fazer fallback preserva a usabilidade com menor dissipação térmica.
- **Resposta Fraca:** Diz apenas que "é uma regra do if", sem compreender o princípio físico de trade-off entre consumo e taxa de quadros.

#### 🔹 Pergunta 4 (Desafio de Engenharia de Software):
> *"Se você tivesse que migrar essa lógica em Python para rodar dentro do AOSP nativo em produção, qual linguagem utilizaria (C++ ou Rust) e quais cuidados tomaria com concorrência e memória?"*
- **Resposta Excelente:** Cita Rust pela garantia de segurança de memória sem garbage collector, ou C++ moderno com RAII e smart pointers, destacando o uso de locks leves ou lock-free queues para não travar a thread de telemetria.

---

## ⚡ 4. Script de Correção Rápida em Lote (Para Quarta-feira de Manhã)

Para testar instantaneamente todas as pastas de candidatos enviadas, use o script `corrigir_candidatos.py`:

```bash
# Executa a suíte de testes em cada pasta de candidato e gera a planilha de notas preliminares
python desafio_selecao/corrigir_candidatos.py --submissions_dir ./entregas_candidatos
```
*(Gera um relatório automático com aprovados, testes passados e tempo de execução).*
