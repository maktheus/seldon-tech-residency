"""
=============================================================================
Seldon Tech Residency - Módulo 4: Eficiência Energética
Arquivo: nsga2_optimizer.py
=============================================================================
Implementação do Algoritmo Genético Multiobjetivo NSGA-II para Fronteira de Pareto.
Referência: Deb et al. (IEEE Trans. Evol. Comput., 2002).
"""

import random
from typing import List, Dict, Any, Tuple
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from profiler.soc_power_model import SoCPowerModel


class Individual:
    """Cromossomo de configuração de hardware e métricas multiobjetivo."""
    def __init__(self, big_freq: float, little_freq: float, gpu_freq: float, refresh_rate: int):
        self.genes = {
            "big_freq_ghz": big_freq,
            "little_freq_ghz": little_freq,
            "gpu_freq_mhz": gpu_freq,
            "refresh_rate_hz": refresh_rate
        }
        # Avaliação das funções objetivo
        eval_res = SoCPowerModel.evaluate_configuration(big_freq, little_freq, gpu_freq, refresh_rate)
        self.objectives = eval_res
        
        # Objetivos para minimização interna:
        # obj[0]: -FPS (minimizar -FPS é equivalente a maximizar FPS)
        # obj[1]: Power (mW)
        # obj[2]: Temperatura (°C)
        self.cost = (-eval_res["fps"], eval_res["power_mw"], eval_res["thermal_temp_c"])
        
        self.rank: int = 0
        self.crowding_distance: float = 0.0

    def dominates(self, other: 'Individual') -> bool:
        """Retorna True se self domina other no sentido de Pareto."""
        not_worse = all(s <= o for s, o in zip(self.cost, other.cost))
        strictly_better = any(s < o for s, o in zip(self.cost, other.cost))
        return not_worse and strictly_better


class NSGA2EnergyOptimizer:
    """Otimizador Evolucionário de Pareto para trade-off FPS vs Potência vs Temperatura."""

    def __init__(self, pop_size: int = 40, generations: int = 15, seed: int = 42):
        self.pop_size = pop_size
        self.generations = generations
        self.rng = random.Random(seed)

    def random_individual(self) -> Individual:
        big = round(self.rng.uniform(0.8, 3.2), 2)
        little = round(self.rng.uniform(0.5, 2.0), 2)
        gpu = round(self.rng.uniform(300.0, 950.0), 0)
        refresh = self.rng.choice([60, 120])
        return Individual(big, little, gpu, refresh)

    def fast_non_dominated_sort(self, population: List[Individual]) -> List[List[Individual]]:
        """Ordenação Rápida Não-Dominada (Complexidade O(M * N^2))."""
        fronts: List[List[Individual]] = [[]]
        domination_count = {}
        dominated_solutions = {}

        for p in population:
            domination_count[p] = 0
            dominated_solutions[p] = []
            for q in population:
                if p.dominates(q):
                    dominated_solutions[p].append(q)
                elif q.dominates(p):
                    domination_count[p] += 1
            if domination_count[p] == 0:
                p.rank = 1
                fronts[0].append(p)

        i = 0
        while len(fronts[i]) > 0:
            next_front = []
            for p in fronts[i]:
                for q in dominated_solutions[p]:
                    domination_count[q] -= 1
                    if domination_count[q] == 0:
                        q.rank = i + 2
                        next_front.append(q)
            i += 1
            fronts.append(next_front)
        
        # Remove última lista vazia
        return [f for f in fronts if len(f) > 0]

    def calculate_crowding_distance(self, front: List[Individual]):
        """Calcula a densidade de soluções no espaço de objetivos."""
        l = len(front)
        if l == 0:
            return
        for ind in front:
            ind.crowding_distance = 0.0

        num_objectives = len(front[0].cost)
        for m in range(num_objectives):
            front.sort(key=lambda ind: ind.cost[m])
            front[0].crowding_distance = float('inf')
            front[-1].crowding_distance = float('inf')
            obj_range = front[-1].cost[m] - front[0].cost[m]
            if obj_range == 0.0:
                continue
            for i in range(1, l - 1):
                front[i].crowding_distance += (front[i + 1].cost[m] - front[i - 1].cost[m]) / obj_range

    def run_optimization(self) -> List[Dict[str, Any]]:
        """Executa as gerações do NSGA-II e retorna a Fronteira de Pareto ótima."""
        population = [self.random_individual() for _ in range(self.pop_size)]

        for gen in range(self.generations):
            # Gera população de filhos (Offspring)
            offspring = []
            while len(offspring) < self.pop_size:
                p1, p2 = self.rng.sample(population, 2)
                # Crossover
                child_big = round((p1.genes["big_freq_ghz"] + p2.genes["big_freq_ghz"]) / 2.0, 2)
                child_little = round((p1.genes["little_freq_ghz"] + p2.genes["little_freq_ghz"]) / 2.0, 2)
                child_gpu = round((p1.genes["gpu_freq_mhz"] + p2.genes["gpu_freq_mhz"]) / 2.0, 0)
                child_refresh = self.rng.choice([p1.genes["refresh_rate_hz"], p2.genes["refresh_rate_hz"]])
                
                # Mutação leve (15% chance)
                if self.rng.random() < 0.15:
                    child_big = min(3.2, max(0.8, child_big + self.rng.uniform(-0.2, 0.2)))
                
                offspring.append(Individual(child_big, child_little, child_gpu, child_refresh))

            # União R_t = P_t U Q_t
            combined = population + offspring
            fronts = self.fast_non_dominated_sort(combined)
            
            new_pop = []
            for front in fronts:
                self.calculate_crowding_distance(front)
                if len(new_pop) + len(front) <= self.pop_size:
                    new_pop.extend(front)
                else:
                    # Ordena por crowding distance decrescente
                    front.sort(key=lambda ind: ind.crowding_distance, reverse=True)
                    new_pop.extend(front[:(self.pop_size - len(new_pop))])
                    break
            population = new_pop

        # Retorna a Primeira Frente de Pareto (Rank 1)
        pareto_front = [ind for ind in population if ind.rank == 1]
        pareto_front.sort(key=lambda ind: ind.objectives["fps"])

        return [
            {
                "genes": ind.genes,
                "fps": ind.objectives["fps"],
                "power_mw": ind.objectives["power_mw"],
                "thermal_temp_c": ind.objectives["thermal_temp_c"],
                "profile": "ECO" if ind.objectives["power_mw"] < 1500 else ("BALANCED" if ind.objectives["power_mw"] < 3000 else "GAMING")
            }
            for ind in pareto_front
        ]
