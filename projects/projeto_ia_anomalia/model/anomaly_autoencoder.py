"""
=============================================================================
Seldon Tech Residency - Módulo 2: Inteligência Artificial Embarcada
Projeto: Sistema de Detecção de Anomalias em Tempo Real com Quantização INT8
Arquivo: anomaly_autoencoder.py
=============================================================================
Implementação de arquitetura Autoencoder leve (Dense/Conv1D equivalente)
com quantização pós-treinamento simétrica em INT8 e cálculo de erro de reconstrução.
"""

import math
import random
from typing import List, Tuple, Dict


def relu(x: float) -> float:
    return max(0.0, x)


def sigmoid(x: float) -> float:
    # Sigmoid com clipping para evitar overflow numérico
    if x < -20.0:
        return 0.0
    if x > 20.0:
        return 1.0
    return 1.0 / (1.0 + math.exp(-x))


class DenseLayer:
    """Camada totalmente conectada (Dense) com suporte a quantização INT8."""
    def __init__(self, in_features: int, out_features: int, activation: str = "relu", seed: int = 42):
        self.in_features = in_features
        self.out_features = out_features
        self.activation = activation
        
        # Inicialização He/Xavier
        rng = random.Random(seed)
        limit = math.sqrt(6.0 / (in_features + out_features))
        self.weights: List[List[float]] = [
            [rng.uniform(-limit, limit) for _ in range(out_features)]
            for _ in range(in_features)
        ]
        self.bias: List[float] = [0.0] * out_features
        
        # Parâmetros de Quantização INT8
        self.quantized_weights: List[List[int]] = []
        self.weight_scale: float = 1.0
        self.is_quantized: bool = False

    def forward(self, x: List[float]) -> List[float]:
        outputs = []
        for j in range(self.out_features):
            val = self.bias[j]
            if self.is_quantized:
                # Inferência acelerada em aritmética inteira com dequantização
                int_acc = sum(x_val * self.quantized_weights[i][j] for i, x_val in enumerate(x))
                val += int_acc * self.weight_scale
            else:
                val += sum(x[i] * self.weights[i][j] for i in range(self.in_features))
            
            if self.activation == "relu":
                val = relu(val)
            elif self.activation == "sigmoid":
                val = sigmoid(val)
            outputs.append(val)
        return outputs

    def quantize_int8(self):
        """Quantização simétrica INT8: escala = max(|W|) / 127"""
        max_val = max(abs(w) for row in self.weights for w in row)
        if max_val == 0.0:
            max_val = 1e-6
        self.weight_scale = max_val / 127.0
        self.quantized_weights = [
            [int(round(w / self.weight_scale)) for w in row]
            for row in self.weights
        ]
        self.is_quantized = True


class AnomalyAutoencoder:
    """
    Autoencoder leve para compressão e reconstrução de sinais de telemetria AOSP.
    Topologia: Input (8) -> Bottleneck (3) -> Output (8)
    Features monitoradas:
      [0] CPU Utilization (0-100%)
      [1] Binder IPC Transaction Rate (trans/s)
      [2] Memory Pressure Stall (PSI)
      [3] SoC Thermal Zone Headroom (0-1)
      [4] Battery Discharge Current (mA)
      [5] Display FPS Jitter
      [6] Context Switches Rate (k/s)
      [7] I/O Wait Time (%)
    """
    def __init__(self, input_dim: int = 8, latent_dim: int = 3, threshold: float = 0.08):
        self.input_dim = input_dim
        self.latent_dim = latent_dim
        self.threshold = threshold
        
        # Camadas do Encoder
        self.enc1 = DenseLayer(input_dim, 6, activation="relu", seed=101)
        self.enc2 = DenseLayer(6, latent_dim, activation="relu", seed=102)
        
        # Camadas do Decoder
        self.dec1 = DenseLayer(latent_dim, 6, activation="relu", seed=201)
        self.dec2 = DenseLayer(6, input_dim, activation="sigmoid", seed=202)

    def forward(self, x: List[float]) -> Tuple[List[float], float]:
        """Executa a passagem para frente e calcula o Erro Quadrático Médio (MSE)."""
        h1 = self.enc1.forward(x)
        latent = self.enc2.forward(h1)
        h2 = self.dec1.forward(latent)
        reconstruction = self.dec2.forward(h2)
        
        # Cálculo de MSE
        mse = sum((orig - rec) ** 2 for orig, rec in zip(x, reconstruction)) / self.input_dim
        return reconstruction, mse

    def quantize_all_layers(self):
        """Aplica quantização INT8 a todas as camadas do modelo."""
        self.enc1.quantize_int8()
        self.enc2.quantize_int8()
        self.dec1.quantize_int8()
        self.dec2.quantize_int8()

    def predict_anomaly(self, telemetry_vector: List[float]) -> Dict[str, any]:
        """Classifica se o vetor de telemetria representa uma anomalia em runtime."""
        reconstruction, mse = self.forward(telemetry_vector)
        is_anomaly = mse > self.threshold
        return {
            "is_anomaly": is_anomaly,
            "reconstruction_error": mse,
            "threshold": self.threshold,
            "severity": "CRITICAL" if mse > self.threshold * 2.0 else ("WARNING" if is_anomaly else "NORMAL")
        }
