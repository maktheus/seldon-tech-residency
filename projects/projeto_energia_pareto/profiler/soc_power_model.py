"""
=============================================================================
Seldon Tech Residency - Módulo 4: Eficiência Energética
Projeto: Otimizador Multiobjetivo Hardware-Aware (NSGA-II)
Arquivo: soc_power_model.py
=============================================================================
Modelo de potência analítico para arquiteturas SoC heterogêneas (big.LITTLE/DynamIQ).
"""

from typing import Dict, Any


class SoCPowerModel:
    """Modela a dissipação dinâmica (P = C * V^2 * f) e estática de um SoC móvel moderno."""
    
    # Capacitâncias equivalentes normalizadas (nF)
    C_BIG = 1.8
    C_LITTLE = 0.4
    C_GPU = 2.2
    STATIC_LEAKAGE_MW = 180.0

    @classmethod
    def evaluate_configuration(cls, big_freq_ghz: float, little_freq_ghz: float, 
                               gpu_freq_mhz: float, refresh_rate_hz: int) -> Dict[str, float]:
        """
        Avalia um cromossomo de configuração de energia.
        Retorna:
          - 'fps': Taxa de quadros entregue (desejável maximizar)
          - 'power_mw': Potência dissipada em miliWatts (desejável minimizar)
          - 'thermal_temp_c': Temperatura de junção estimada em Celsius (desejável minimizar)
        """
        # 1. Tensão dinâmica aproximada via curva DVFS (V = 0.55 + 0.25 * f)
        v_big = 0.55 + 0.25 * big_freq_ghz
        v_little = 0.50 + 0.20 * little_freq_ghz
        v_gpu = 0.50 + 0.0006 * gpu_freq_mhz

        # 2. Potência Dinâmica dos Clusters (mW)
        p_big = cls.C_BIG * (v_big ** 2) * big_freq_ghz * 1000.0
        p_little = cls.C_LITTLE * (v_little ** 2) * little_freq_ghz * 1000.0
        p_gpu = cls.C_GPU * (v_gpu ** 2) * (gpu_freq_mhz / 1000.0) * 1000.0

        # 3. Potência do Display OLED (60Hz vs 120Hz)
        p_display = 450.0 if refresh_rate_hz == 60 else 920.0

        total_power_mw = cls.STATIC_LEAKAGE_MW + p_big + p_little + p_gpu + p_display

        # 4. Cálculo de FPS suportado
        # O FPS é limitado pelo gargalo entre CPU Big e GPU
        fps_cpu_limit = 35.0 * big_freq_ghz + 10.0 * little_freq_ghz
        fps_gpu_limit = (gpu_freq_mhz / 800.0) * 120.0
        max_deliverable_fps = min(fps_cpu_limit, fps_gpu_limit)
        fps = min(float(refresh_rate_hz), max_deliverable_fps)

        # 5. Temperatura térmica da junção (T = T_amb + P * R_th)
        # Resistência térmica de dissipação do chassi com câmara de vapor (0.0065 °C/mW)
        r_th = 0.0065
        t_ambient = 25.0
        thermal_temp_c = t_ambient + (total_power_mw * r_th)

        return {
            "fps": round(fps, 1),
            "power_mw": round(total_power_mw, 1),
            "thermal_temp_c": round(thermal_temp_c, 1)
        }
