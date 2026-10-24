"""
=============================================================================
Seldon Tech Residency - Desafio de Seleção
Módulo: Telemetria & Estruturas de Dados
Arquivo: telemetry.py
=============================================================================
Estruturas canônicas de dados utilizadas pelo subsistema SeldonCore.
"""

from dataclasses import dataclass
from typing import Dict, List, Any


@dataclass
class TelemetryFrame:
    """
    Representação de um frame de telemetria coletado dos nós do sistema.
    Valores nominais:
      - cpu_usage_percent: 0.0 a 100.0 (%)
      - memory_usage_mb: 0.0 a 12288.0 (MB)
      - binder_tx_per_sec: transações IPC por segundo
      - chip_temperature_c: temperatura do SoC em Celsius
      - battery_level_percent: 0.0 a 100.0 (%)
      - frame_time_ms: tempo de renderização por quadro (ms)
    """
    timestamp: float
    cpu_usage_percent: float
    memory_usage_mb: float
    binder_tx_per_sec: float
    chip_temperature_c: float
    battery_level_percent: float
    frame_time_ms: float

    def to_vector(self) -> List[float]:
        """Converte o frame para um vetor ordenado de 6 dimensões."""
        return [
            self.cpu_usage_percent,
            self.memory_usage_mb,
            self.binder_tx_per_sec,
            self.chip_temperature_c,
            self.battery_level_percent,
            self.frame_time_ms
        ]

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "TelemetryFrame":
        return cls(
            timestamp=float(data.get("timestamp", 0.0)),
            cpu_usage_percent=float(data.get("cpu_usage_percent", 0.0)),
            memory_usage_mb=float(data.get("memory_usage_mb", 0.0)),
            binder_tx_per_sec=float(data.get("binder_tx_per_sec", 0.0)),
            chip_temperature_c=float(data.get("chip_temperature_c", 25.0)),
            battery_level_percent=float(data.get("battery_level_percent", 100.0)),
            frame_time_ms=float(data.get("frame_time_ms", 16.6))
        )
