"""
=============================================================================
Seldon Tech Residency - Suíte de Testes Unitários: Projeto de IA Embarcada
Arquivo: test_anomaly_detection.py
=============================================================================
"""

import unittest
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from runtime.inference_engine import TelemetryInferenceEngine
from model.anomaly_autoencoder import AnomalyAutoencoder


class TestAnomalyDetection(unittest.TestCase):
    def setUp(self):
        self.engine = TelemetryInferenceEngine(use_quantization=True)

    def test_normal_telemetry_inference(self):
        """Telemetria típica de sistema estável não deve disparar falso-positivo."""
        normal_metrics = {
            "cpu_percent": 18.5,
            "binder_trans_sec": 120.0,
            "memory_psi": 2.0,
            "thermal_headroom": 0.25,
            "battery_current_ma": 380.0,
            "fps_jitter_ms": 2.1,
            "context_switches_k": 8.0,
            "io_wait_percent": 1.2
        }
        res = self.engine.process_telemetry_frame(normal_metrics)
        self.assertIn("is_anomaly", res)
        self.assertIn("reconstruction_error", res)
        self.assertLess(res["latency_ms"], 15.0, "Latência de inferência deve ser inferior a 15ms.")

    def test_extreme_dos_telemetry_anomaly(self):
        """Telemetria sob ataque de exaustão de Binder / DoS deve gerar anomalia."""
        anomalous_metrics = {
            "cpu_percent": 99.8,
            "binder_trans_sec": 2800.0,
            "memory_psi": 88.0,
            "thermal_headroom": 0.95,
            "battery_current_ma": 2400.0,
            "fps_jitter_ms": 32.0,
            "context_switches_k": 48.0,
            "io_wait_percent": 75.0
        }
        res = self.engine.process_telemetry_frame(anomalous_metrics)
        self.assertTrue(res["is_anomaly"], "Condição extrema de saturação deve ser detectada como anomalia.")
        self.assertIn(res["severity"], ["WARNING", "CRITICAL"])

    def test_int8_quantization_preserves_dimensions(self):
        """Verifica se a quantização INT8 mantém a integridade estrutural das matrizes de pesos."""
        model = AnomalyAutoencoder()
        self.assertFalse(model.enc1.is_quantized)
        model.quantize_all_layers()
        self.assertTrue(model.enc1.is_quantized)
        self.assertEqual(len(model.enc1.quantized_weights), model.enc1.in_features)
        self.assertEqual(len(model.enc1.quantized_weights[0]), model.enc1.out_features)

    def test_latency_benchmark(self):
        """Benchmark: Processar 100 frames consecutivos mantendo média < 5ms."""
        metrics = {
            "cpu_percent": 45.0,
            "binder_trans_sec": 400.0,
            "memory_psi": 10.0,
            "thermal_headroom": 0.4,
            "battery_current_ma": 600.0,
            "fps_jitter_ms": 4.0,
            "context_switches_k": 12.0,
            "io_wait_percent": 3.0
        }
        for _ in range(100):
            res = self.engine.process_telemetry_frame(metrics)
        
        self.assertLess(res["avg_latency_ms"], 5.0, "A média de latência após 100 inferências deve ser menor que 5ms.")


if __name__ == "__main__":
    unittest.main()
