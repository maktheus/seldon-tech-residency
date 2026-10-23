# FEATURE_004: Otimizador Energético Multiobjetivo Hardware-Aware NSGA-II (Módulo 4)

**Autor:** Matheus Uchoa (Seldon Tech Residency)  
**Módulo Seldon:** Módulo 4: Eficiência Energética e Otimização Multiobjetivo  
**Status:** Concluída e Aprovada por Testes  
**Data:** 2026-10-23  

---

## 1. Descrição do Problema e Motivação
Aumentar a fluidez visual de um aplicativo móvel (ex: elevar a taxa de quadros para 120 FPS) costuma exigir aumento exponencial de frequência nos clusters de CPU e GPU ($P \propto V^2 \cdot f$), acelerando o aquecimento do chassi e a degradação da bateria. O desafio reside em descobrir a **Fronteira de Pareto ótima**, onde nenhum ganho em FPS pode ser obtido sem um aumento desproporcional no consumo de energia.

## 2. Fundamentação Teórica e Estado da Arte
- **Algoritmo NSGA-II:** Implementação rigorosa do algoritmo de Deb et al. (IEEE Trans. Evol. Comput., 2002), utilizando *Fast Non-dominated Sorting* com complexidade $O(M N^2)$ e operador de distância de apinhamento (*crowding distance*) para garantir diversidade nas soluções não-dominadas.
- **Modelo Físico de Potência:** Baseado em Carroll & Heiser (2010), combinando dissipação dinâmica de clusters big.LITTLE, leakage estático e potência do painel OLED (60Hz vs 120Hz).

## 3. Arquitetura da Solução
- **Diretório:** `projects/projeto_energia_pareto/`
- **Componentes:**
  - `profiler/soc_power_model.py`: Equações dinâmicas de DVFS e modelo térmico com câmara de vapor.
  - `engine/nsga2_optimizer.py`: População evolucionária com crossover aritmético, mutação gaussiana e elitismo.
  - Gera automaticamente perfis classificados: `ECO` (<1500 mW), `BALANCED` (<3000 mW) e `GAMING` (máximo FPS suportado).

## 4. Resultados dos Testes Automatizados
- Testes unitários executados em `tests/test_nsga2_energy.py`.
- 100% de conformidade com os axiomas de dominância de Pareto e limites de segurança térmica de junção.
