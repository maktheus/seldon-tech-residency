#!/usr/bin/env python3
"""
=============================================================================
Seldon Tech Residency - Suíte de Testes: Tecnologias de Próxima Geração
Validação de NimBLE, INT4 Quantization, Perfetto Tracing e Rust Daemon
=============================================================================
"""

import unittest
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from scripts.nimble_netsim_telemetry_poc import NimbleBleTelemetryBridge
from scripts.quantization_int4_benchmark import PureINT4WeightQuantizer
from scripts.perfetto_anomaly_tracer import PerfettoAnomalyTracer


class TestNextGenTech(unittest.TestCase):
    def test_nimble_ble_encoding_decoding(self):
        """Pacote BLE Advertisement codificado deve ser decodificado fielmente mantendo teto de 31B."""
        bridge = NimbleBleTelemetryBridge(node_id=12)
        packet = bridge.encode_telemetry_beacon(
            battery_mv=4100,
            temp_c=31.5,
            cpu_usage_pct=42.0,
            anomaly_score=0.15,
            status_flag=1
        )
        self.assertLessEqual(len(packet), 31, "Tamanho máximo de anúncio BLE primário é 31 bytes.")
        
        decoded = bridge.decode_telemetry_beacon(packet)
        self.assertEqual(decoded["company_id"], "0x05ED")
        self.assertEqual(decoded["battery_mv"], 4100)
        self.assertAlmostEqual(decoded["battery_temp_c"], 31.5, places=1)
        self.assertEqual(decoded["cpu_usage_pct"], 42)
        self.assertEqual(decoded["anomaly_pct"], 15)
        self.assertEqual(decoded["device_name"], "SLD-12")

    def test_int4_quantization_integrity(self):
        """Quantização INT4 com nibbles empacotados deve reduzir memória em mais de 80%."""
        quantizer = PureINT4WeightQuantizer()
        weights = [
            [0.45, -0.22, 0.81, -0.65],
            [-0.11, 0.33, -0.77, 0.52]
        ]
        packed, scale, rows, cols = quantizer.quantize_matrix_to_int4(weights)
        
        # 8 pesos em FP32 = 32 bytes. Em INT4 empacotado = 4 bytes!
        self.assertEqual(len(packed), 4, "8 pesos em INT4 devem ocupar exatamente 4 bytes (2 por byte).")
        
        recon = quantizer.dequantize_int4_matrix(packed, scale, rows, cols)
        for r in range(rows):
            for c in range(cols):
                # O erro absoluto em relação à escala deve ser < 1 passo de quantização
                self.assertLess(abs(weights[r][c] - recon[r][c]), scale * 1.5)

    def test_perfetto_trigger_generation(self):
        """Gatilho dinâmico de Perfetto deve registrar eventos ftrace e criar arquivo de trace."""
        tracer = PerfettoAnomalyTracer(trace_output_dir="/tmp/seldon_test_traces")
        incident = {
            "anomaly_score": 0.55,
            "severity": "CRITICAL",
            "source": "TestModule"
        }
        report = tracer.trigger_anomaly_trace(incident)
        self.assertTrue(os.path.exists(report["trace_file"]))
        self.assertIn("sched/sched_switch", report["tracked_events"])
        self.assertIn("binder/binder_transaction", report["tracked_events"])


if __name__ == "__main__":
    unittest.main()
