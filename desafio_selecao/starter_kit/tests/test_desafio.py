"""
=============================================================================
Seldon Tech Residency - Suíte de Testes Automatizados do Desafio de Seleção
Arquivo: test_desafio.py
=============================================================================
Execute estes testes em seu terminal com o comando:
    python -m unittest tests/test_desafio.py -v
ou:
    python tests/test_desafio.py
"""

import unittest
import sys
import os
import time

# Adiciona o diretório base ao sys.path para importação do seldon_core
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from seldon_core.telemetry import TelemetryFrame
from seldon_core.security_guard import BinderSecurityGuard
from seldon_core.anomaly_detector import AnomalyDetector
from seldon_core.power_tuner import PowerTuner, OperatingProfile


class TestDesafioSeldon(unittest.TestCase):

    # =========================================================================
    # TAREFA 1: TESTES DO GUARDIÃO DE SEGURANÇA IPC BINDER
    # =========================================================================

    def test_t1_valid_transaction_approved(self):
        """Transação dentro dos limites normais deve ser aprovada com status 200."""
        guard = BinderSecurityGuard()
        res = guard.validate_transaction(parcel_size_bytes=1024, transaction_token="tok_alpha_1", timestamp=100.0)
        self.assertTrue(res["allowed"])
        self.assertEqual(res["reason"], "APPROVED")
        self.assertEqual(res["status_code"], 200)
        self.assertEqual(guard.approved_count, 1)

    def test_t1_buffer_overflow_rejected(self):
        """Transações maiores que 800 KB (819.200 bytes) devem ser barradas."""
        guard = BinderSecurityGuard()
        res = guard.validate_transaction(parcel_size_bytes=900 * 1024, transaction_token="tok_big_1", timestamp=100.0)
        self.assertFalse(res["allowed"])
        self.assertEqual(res["reason"], "BUFFER_OVERFLOW")
        self.assertEqual(res["status_code"], 400)
        self.assertEqual(guard.rejected_count, 1)

    def test_t1_invalid_size_rejected(self):
        """Tamanhos menores ou iguais a zero devem ser rejeitados."""
        guard = BinderSecurityGuard()
        res_zero = guard.validate_transaction(parcel_size_bytes=0, transaction_token="tok_zero", timestamp=100.0)
        self.assertFalse(res_zero["allowed"])
        self.assertEqual(res_zero["reason"], "INVALID_SIZE")

        res_neg = guard.validate_transaction(parcel_size_bytes=-50, transaction_token="tok_neg", timestamp=100.0)
        self.assertFalse(res_neg["allowed"])
        self.assertEqual(res_neg["reason"], "INVALID_SIZE")

    def test_t1_replay_attack_intercepted(self):
        """Reuso do mesmo token dentro da janela de validade deve ser identificado como ataque."""
        guard = BinderSecurityGuard()
        # Primeira chamada com token "unique_jwt_xyz"
        res1 = guard.validate_transaction(parcel_size_bytes=2048, transaction_token="unique_jwt_xyz", timestamp=10.0)
        self.assertTrue(res1["allowed"])

        # Chamada repetida no tempo 15.0 (dentro da janela de 60s)
        res2 = guard.validate_transaction(parcel_size_bytes=2048, transaction_token="unique_jwt_xyz", timestamp=15.0)
        self.assertFalse(res2["allowed"])
        self.assertEqual(res2["reason"], "REPLAY_ATTACK_DETECTED")
        self.assertEqual(res2["status_code"], 403)

    def test_t1_token_expiration_allows_reuse(self):
        """Após o TTL de 60 segundos, tokens antigos devem ser limpos da memória."""
        guard = BinderSecurityGuard()
        # Primeira chamada no tempo 0.0
        res1 = guard.validate_transaction(parcel_size_bytes=512, transaction_token="temp_tok", timestamp=0.0)
        self.assertTrue(res1["allowed"])

        # Segunda chamada no tempo 70.0 (mais de 60s depois -> expirou)
        res2 = guard.validate_transaction(parcel_size_bytes=512, transaction_token="temp_tok", timestamp=70.0)
        self.assertTrue(res2["allowed"], "Token expirado deveria ter sido limpo e permitido novamente.")

    # =========================================================================
    # TAREFA 2: TESTES DE DETECÇÃO DE ANOMALIAS COM MSE
    # =========================================================================

    def test_t2_calculate_mse_identical_vectors(self):
        """Vetores idênticos devem ter erro quadrático médio igual a 0.0."""
        vec = [0.1, 0.5, 0.9, 0.2]
        mse = AnomalyDetector.calculate_mse(vec, vec)
        self.assertAlmostEqual(mse, 0.0, places=6)

    def test_t2_calculate_mse_known_values(self):
        """Validação matemática precisa da fórmula do MSE."""
        # a = [1.0, 2.0], b = [2.0, 4.0]
        # diffs = [-1.0, -2.0] -> squared = [1.0, 4.0] -> mean = 5.0 / 2 = 2.5
        vec_a = [1.0, 2.0]
        vec_b = [2.0, 4.0]
        mse = AnomalyDetector.calculate_mse(vec_a, vec_b)
        self.assertAlmostEqual(mse, 2.5, places=5)

    def test_t2_calculate_mse_dimension_mismatch_raises(self):
        """Vetores com dimensões divergentes ou vazios devem levantar ValueError."""
        with self.assertRaises(ValueError):
            AnomalyDetector.calculate_mse([1.0, 2.0], [1.0])

        with self.assertRaises(ValueError):
            AnomalyDetector.calculate_mse([], [])

    def test_t2_evaluate_frame_nominal_is_not_anomaly(self):
        """Frame de telemetria com consumo normal não deve acusar anomalia."""
        detector = AnomalyDetector(mse_threshold=0.05)
        nominal_frame = TelemetryFrame(
            timestamp=100.0,
            cpu_usage_percent=25.0,
            memory_usage_mb=2048.0,
            binder_tx_per_sec=120.0,
            chip_temperature_c=32.0,
            battery_level_percent=85.0,
            frame_time_ms=16.6
        )
        res = detector.evaluate_frame(nominal_frame)
        self.assertFalse(res["is_anomaly"])
        self.assertEqual(res["risk_level"], "NORMAL")
        self.assertLess(res["mse"], 0.05)
        self.assertEqual(detector.total_evaluations, 1)
        self.assertEqual(detector.anomalies_detected, 0)

    def test_t2_evaluate_frame_extreme_triggers_anomaly(self):
        """Pico anômalo de CPU (98%), memória (11.5GB) e IPC deve disparar anomalia."""
        detector = AnomalyDetector(mse_threshold=0.05)
        anomaly_frame = TelemetryFrame(
            timestamp=101.0,
            cpu_usage_percent=98.0,
            memory_usage_mb=11800.0,
            binder_tx_per_sec=1950.0,
            chip_temperature_c=78.0,
            battery_level_percent=40.0,
            frame_time_ms=58.0
        )
        res = detector.evaluate_frame(anomaly_frame)
        self.assertTrue(res["is_anomaly"])
        self.assertIn(res["risk_level"], ["WARNING", "CRITICAL"])
        self.assertGreater(res["mse"], 0.05)
        self.assertEqual(detector.anomalies_detected, 1)

    # =========================================================================
    # TAREFA 3: TESTES DE OTIMIZAÇÃO ENERGÉTICA E TÉRMICA
    # =========================================================================

    def test_t3_thermal_emergency_on_high_temperature(self):
        """Se a temperatura ultrapassar 48°C, deve acionar THERMAL_EMERGENCY imediatamente."""
        tuner = PowerTuner()
        res = tuner.select_operating_profile(target_fps=120, chip_temperature_c=52.0, battery_level_percent=90.0)
        self.assertEqual(res["selected_profile"], OperatingProfile.THERMAL_EMERGENCY.value)
        self.assertEqual(res["applied_fps"], 30)

    def test_t3_thermal_emergency_on_critical_battery(self):
        """Se a bateria for <= 15%, deve acionar THERMAL_EMERGENCY mesmo com chip frio."""
        tuner = PowerTuner()
        res = tuner.select_operating_profile(target_fps=90, chip_temperature_c=28.0, battery_level_percent=12.0)
        self.assertEqual(res["selected_profile"], OperatingProfile.THERMAL_EMERGENCY.value)
        self.assertEqual(res["applied_fps"], 30)

    def test_t3_performance_profile_granted_under_ideal_conditions(self):
        """120 FPS deve ser concedido com bateria > 30% e temperatura <= 42°C."""
        tuner = PowerTuner()
        res = tuner.select_operating_profile(target_fps=120, chip_temperature_c=36.0, battery_level_percent=80.0)
        self.assertEqual(res["selected_profile"], OperatingProfile.PERFORMANCE.value)
        self.assertEqual(res["applied_fps"], 120)
        self.assertFalse(res["safety_fallback_applied"])

    def test_t3_performance_fallback_to_balanced(self):
        """Se solicitar 120 FPS mas a bateria for 25% (ou temp 44°C), deve fazer fallback para BALANCED."""
        tuner = PowerTuner()
        # Bateria 25% (<= 30%)
        res = tuner.select_operating_profile(target_fps=120, chip_temperature_c=35.0, battery_level_percent=25.0)
        self.assertEqual(res["selected_profile"], OperatingProfile.BALANCED.value)
        self.assertEqual(res["applied_fps"], 90)
        self.assertTrue(res["safety_fallback_applied"])

    def test_t3_eco_profile_selection(self):
        """Para target_fps <= 60 em condições nominais, deve selecionar ECO."""
        tuner = PowerTuner()
        res = tuner.select_operating_profile(target_fps=60, chip_temperature_c=30.0, battery_level_percent=70.0)
        self.assertEqual(res["selected_profile"], OperatingProfile.ECO.value)
        self.assertEqual(res["applied_fps"], 60)
        self.assertEqual(len(tuner.profile_history), 1)


if __name__ == "__main__":
    unittest.main()
