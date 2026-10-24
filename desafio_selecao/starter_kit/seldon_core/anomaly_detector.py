"""
=============================================================================
Seldon Tech Residency - Desafio de Seleção (Módulo de IA & Otimização)
Arquivo: anomaly_detector.py
=============================================================================
Detector de anomalias em séries temporais de telemetria AOSP baseado no Erro
Quadrático Médio de Reconstrução (MSE - Mean Squared Error).
"""

from typing import List, Dict, Any, Tuple
import math
from .telemetry import TelemetryFrame


class AnomalyDetector:
    """
    Motor leve de detecção de anomalias operacionais.
    Compara o vetor de telemetria atual com o vetor reconstruído pelo modelo.
    """

    # Escalas de normalização para os 6 sinais do TelemetryFrame:
    # [CPU (100%), Memória (12288MB), IPC (2000 tx/s), Temp (100°C), Bat (100%), FrameTime (66.6ms)]
    MAX_SCALES: List[float] = [100.0, 12288.0, 2000.0, 100.0, 100.0, 66.6]

    def __init__(self, mse_threshold: float = 0.05):
        """
        :param mse_threshold: Limiar crítico acima do qual o sinal é classificado como anômalo.
        """
        self.mse_threshold: float = mse_threshold
        self.total_evaluations: int = 0
        self.anomalies_detected: int = 0

    def normalize_vector(self, raw_vector: List[float]) -> List[float]:
        """
        Normaliza os valores brutos para a escala [0.0, 1.0].
        (Já implementado para você).
        """
        normalized = []
        for val, scale in zip(raw_vector, self.MAX_SCALES):
            norm_val = max(0.0, min(1.0, val / scale))
            normalized.append(norm_val)
        return normalized

    def simulate_autoencoder_reconstruction(self, norm_vector: List[float]) -> List[float]:
        """
        Simula a reconstrução de um Autoencoder treinado em perfis normais.
        Sinais nominais são reconstruídos com altíssima fidelidade (~98%).
        Sinais anômalos sofrem grande distorção na passagem pelo bottleneck.
        (Já implementado para você).
        """
        # Compressão simulada no espaço latente
        latent = (norm_vector[0] * 0.4 + norm_vector[1] * 0.3 + norm_vector[2] * 0.3)
        reconstructed = []
        for i, val in enumerate(norm_vector):
            # Se a telemetria estiver extrema (fora da distribuição normal)
            if val > 0.8:
                recon_val = val * 0.5  # Gera alto erro de reconstrução proposital
            else:
                recon_val = val * 0.98 + (latent * 0.02)
            reconstructed.append(recon_val)
        return reconstructed

    @staticmethod
    def calculate_mse(vector_a: List[float], vector_b: List[float]) -> float:
        """
        =======================================================================
        TODO (CANDIDATO - TAREFA 2.1): Calcule o Erro Quadrático Médio (MSE).
        =======================================================================
        Fórmula:
            MSE = (1 / N) * SUM_{i=0}^{N-1} (vector_a[i] - vector_b[i])^2

        Regras:
        1. Se os vetores tiverem tamanhos diferentes ou forem vazios, levante ValueError.
        2. Retorne o valor numérico (float) com precisão padrão.
        """
        # --- INÍCIO DA SUA IMPLEMENTAÇÃO ---
        raise NotImplementedError("Candidato deve implementar a função calculate_mse!")
        # --- FIM DA SUA IMPLEMENTAÇÃO ---

    def evaluate_frame(self, frame: TelemetryFrame) -> Dict[str, Any]:
        """
        =======================================================================
        TODO (CANDIDATO - TAREFA 2.2): Avalie o frame de telemetria.
        =======================================================================
        Passo a passo:
        1. Obter o vetor bruto com `frame.to_vector()`.
        2. Normalizar o vetor chamando `self.normalize_vector(raw_vector)`.
        3. Obter o vetor reconstruído chamando `self.simulate_autoencoder_reconstruction(norm_vector)`.
        4. Calcular o erro MSE entre `norm_vector` e `reconstructed_vector` usando `self.calculate_mse(...)`.
        5. Determinar se há anomalia:
           - `is_anomaly = mse > self.mse_threshold`
           - Se for anomalia, incrementar `self.anomalies_detected`.
        6. Incrementar `self.total_evaluations`.
        7. Retornar um dicionário com:
           {
               "timestamp": frame.timestamp,
               "mse": round(mse, 6),
               "threshold": self.mse_threshold,
               "is_anomaly": is_anomaly,
               "risk_level": "CRITICAL" se mse > (self.mse_threshold * 2) else ("WARNING" se is_anomaly else "NORMAL")
           }
        """
        # --- INÍCIO DA SUA IMPLEMENTAÇÃO ---
        raise NotImplementedError("Candidato deve implementar a função evaluate_frame!")
        # --- FIM DA SUA IMPLEMENTAÇÃO ---
