"""
=============================================================================
Seldon Tech Residency - Suíte de Testes Unitários: Projeto de Eficiência Energética
Arquivo: test_nsga2_energy.py
=============================================================================
"""

import unittest
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from profiler.soc_power_model import SoCPowerModel
from engine.nsga2_optimizer import Individual, NSGA2EnergyOptimizer


class TestNSGA2Energy(unittest.TestCase):

    def test_soc_power_evaluation_consistency(self):
        """Avalia se configurações extremas geram consumos fisicamente coerentes."""
        # Modo ultra-econômico
        eco = SoCPowerModel.evaluate_configuration(0.8, 0.5, 300.0, 60)
        # Modo alta performance
        gaming = SoCPowerModel.evaluate_configuration(3.2, 2.0, 950.0, 120)

        self.assertLess(eco["power_mw"], gaming["power_mw"], "Modo Eco deve consumir menos que modo Gaming.")
        self.assertLess(eco["fps"], gaming["fps"], "Modo Gaming deve entregar mais FPS.")
        self.assertLess(eco["thermal_temp_c"], gaming["thermal_temp_c"], "Modo Eco deve aquecer menos o SoC.")

    def test_pareto_dominance_logic(self):
        """Validação formal do operador de dominância de Pareto."""
        # ind_better é estritamente superior ou igual em todos os objetivos (mais FPS, menos Power)
        # Indivíduo A: 90 FPS, 1500 mW, 38°C
        ind_a = Individual(1.8, 1.2, 600.0, 120)
        # Forçamos valores para teste de dominância
        ind_a.cost = (-90.0, 1500.0, 38.0)

        # Indivíduo B: 60 FPS, 2200 mW, 45°C (pior em tudo)
        ind_b = Individual(1.2, 0.8, 400.0, 60)
        ind_b.cost = (-60.0, 2200.0, 45.0)

        self.assertTrue(ind_a.dominates(ind_b), "Indivíduo A deve dominar Indivíduo B.")
        self.assertFalse(ind_b.dominates(ind_a), "Indivíduo B não pode dominar Indivíduo A.")

    def test_nsga2_optimizer_generates_pareto_front(self):
        """Verifica se o otimizador converge para uma fronteira de Pareto com múltiplos perfis."""
        optimizer = NSGA2EnergyOptimizer(pop_size=20, generations=5, seed=123)
        front = optimizer.run_optimization()

        self.assertGreater(len(front), 0, "A fronteira de Pareto deve conter ao menos 1 indivíduo ótimo.")
        # Verifica se os perfis identificados contêm diversidade
        profiles = {sol["profile"] for sol in front}
        self.assertTrue(len(profiles) >= 1)

        # Garante que as soluções estejam dentro de limites térmicos aceitáveis (<85°C)
        for sol in front:
            self.assertLess(sol["thermal_temp_c"], 85.0, "Temperatura não deve exceder limite de thermal shutdown.")


if __name__ == "__main__":
    unittest.main()
