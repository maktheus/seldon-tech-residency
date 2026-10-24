#!/usr/bin/env python3
"""
=============================================================================
Seldon Tech Residency - Suíte de Testes: Verificação Formal com Z3
Testa a integração matemática com o provador de teoremas Z3 (SMT Solver)
=============================================================================
"""

import unittest
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from scripts.z3_formal_verification import Z3FormalVerifier


class TestZ3Verification(unittest.TestCase):
    def test_selinux_privilege_escalation_unsat(self):
        """Z3 deve provar UNSAT (nenhum caminho de exploit de untrusted_app para root)."""
        res = Z3FormalVerifier.verify_selinux_neverallow()
        self.assertEqual(res["solver_output"], "unsat")
        self.assertTrue(res["is_secure"])

    def test_thermal_dvfs_feasibility_sat(self):
        """Z3 deve provar SAT e sintetizar modelo válido para 60 FPS em até 45°C."""
        res = Z3FormalVerifier.verify_thermal_dvfs_feasibility(target_fps=60, max_temp_c=45.0)
        self.assertEqual(res["status"], "sat")
        self.assertTrue(res["feasible"])
        self.assertIsNotNone(res["model"])

    def test_extreme_thermal_unsat(self):
        """Z3 deve provar UNSAT para metas fisicamente inalcançáveis (120 FPS em 35°C)."""
        res = Z3FormalVerifier.verify_thermal_dvfs_feasibility(target_fps=120, max_temp_c=35.0)
        self.assertEqual(res["status"], "unsat")
        self.assertFalse(res["feasible"])


if __name__ == "__main__":
    unittest.main()
