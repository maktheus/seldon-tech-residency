"""
=============================================================================
Seldon Tech Residency - Módulo 2: Inteligência Artificial Embarcada
Arquivo: inference_engine.py
=============================================================================
Motor de Inferência On-Device com normalização de streaming e rastreamento de latência.
"""

import time
from typing import Dict, List
import sys
import os

# Adiciona o diretório do modelo ao sys.path para importação
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from model.anomaly_autoencoder import AnomalyAutoencoder


class TelemetryInferenceEngine:
    """Motor de inferência para execução em segundo plano com latência <15ms."""
    def __init__(self, use_quantization: bool = True):
        self.model = AnomalyAutoencoder(input_dim=8, latent_dim=3, threshold=0.12)
        if use_quantization:
            self.model.quantize_all_layers()
        self.total_inferences = 0
        self.total_latency_ms = 0.0

    @staticmethod
    def normalize_telemetry(raw_metrics: Dict[str, float]) -> List[float]:
        """Normaliza sinais brutos de telemetria AOSP para o intervalo [0.0, 1.0]."""
        return [
            min(1.0, max(0.0, raw_metrics.get("cpu_percent", 0.0) / 100.0)),
            min(1.0, max(0.0, raw_metrics.get("binder_trans_sec", 0.0) / 2000.0)),
            min(1.0, max(0.0, raw_metrics.get("memory_psi", 0.0) / 100.0)),
            min(1.0, max(0.0, raw_metrics.get("thermal_headroom", 0.0))),
            min(1.0, max(0.0, raw_metrics.get("battery_current_ma", 0.0) / 2500.0)),
            min(1.0, max(0.0, raw_metrics.get("fps_jitter_ms", 0.0) / 33.3)),
            min(1.0, max(0.0, raw_metrics.get("context_switches_k", 0.0) / 50.0)),
            min(1.0, max(0.0, raw_metrics.get("io_wait_percent", 0.0) / 100.0)),
        ]

    def process_telemetry_frame(self, raw_metrics: Dict[str, float]) -> Dict[str, any]:
        """Executa a inferência medindo a latência exata em milissegundos."""
        start_time = time.perf_counter()
        
        normalized = self.normalize_telemetry(raw_metrics)
        result = self.model.predict_anomaly(normalized)
        
        latency_ms = (time.perf_counter() - start_time) * 1000.0
        self.total_inferences += 1
        self.total_latency_ms += latency_ms

        result["latency_ms"] = latency_ms
        result["avg_latency_ms"] = self.total_latency_ms / self.total_inferences
        return result
