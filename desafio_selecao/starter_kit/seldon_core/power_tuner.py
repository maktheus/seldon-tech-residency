"""
=============================================================================
Seldon Tech Residency - Desafio de Seleção (Módulo de Eficiência Energética)
Arquivo: power_tuner.py
=============================================================================
Otimizador de perfis de energia e temperatura para gerenciamento autônomo
de SoCs heterogêneos (big.LITTLE, GPU e taxa de atualização de tela).
"""

from typing import Dict, Any, List
from enum import Enum


class OperatingProfile(str, Enum):
    ECO = "ECO"
    BALANCED = "BALANCED"
    PERFORMANCE = "PERFORMANCE"
    THERMAL_EMERGENCY = "THERMAL_EMERGENCY"


class PowerTuner:
    """
    Controlador de estados de energia (DVFS) do SeldonCore.
    Ajusta dinamicamente os parâmetros do SoC para balancear fluidez (FPS)
    e preservar a vida útil da bateria e os limites térmicos do chassi.
    """

    # Configurações de hardware por perfil (Já definidas para você)
    PROFILE_SPECS = {
        OperatingProfile.ECO: {
            "max_fps": 60,
            "cpu_freq_ghz": 1.4,
            "gpu_freq_mhz": 400.0,
            "estimated_power_mw": 1100.0,
            "cooling_mode": "PASSIVE"
        },
        OperatingProfile.BALANCED: {
            "max_fps": 90,
            "cpu_freq_ghz": 2.2,
            "gpu_freq_mhz": 650.0,
            "estimated_power_mw": 2400.0,
            "cooling_mode": "DYNAMIC"
        },
        OperatingProfile.PERFORMANCE: {
            "max_fps": 120,
            "cpu_freq_ghz": 3.0,
            "gpu_freq_mhz": 900.0,
            "estimated_power_mw": 4800.0,
            "cooling_mode": "ACTIVE"
        },
        OperatingProfile.THERMAL_EMERGENCY: {
            "max_fps": 30,
            "cpu_freq_ghz": 0.8,
            "gpu_freq_mhz": 250.0,
            "estimated_power_mw": 600.0,
            "cooling_mode": "AGGRESSIVE_DOWNCLOCK"
        }
    }

    # Limiares de segurança
    CRITICAL_TEMP_CELSIUS: float = 48.0
    CRITICAL_BATTERY_PERCENT: float = 15.0

    def __init__(self):
        self.current_profile: OperatingProfile = OperatingProfile.BALANCED
        self.profile_history: List[OperatingProfile] = []

    def select_operating_profile(
        self,
        target_fps: int,
        chip_temperature_c: float,
        battery_level_percent: float
    ) -> Dict[str, Any]:
        """
        =======================================================================
        TODO (CANDIDATO - TAREFA 3): Implemente a seleção de perfil de energia.
        =======================================================================
        Regras de decisão:
        1. Condição de Emergência (Prioridade Absoluta):
           - Se `chip_temperature_c > self.CRITICAL_TEMP_CELSIUS` OU
             `battery_level_percent <= self.CRITICAL_BATTERY_PERCENT`:
             O perfil selecionado DEVE ser `OperatingProfile.THERMAL_EMERGENCY`.

        2. Modo Performance:
           - Se o usuário requisitou `target_fps >= 120`:
             - Só pode ser concedido se:
               `battery_level_percent > 30.0` E `chip_temperature_c <= 42.0`.
             - Caso contrário (bateria <= 30% ou temperatura > 42°C), faça fallback
               automático para `OperatingProfile.BALANCED`.

        3. Modo Balanced:
           - Se o usuário requisitou `target_fps` entre 61 e 119 (ex: 90 FPS):
             - Concedido se `chip_temperature_c <= 45.0` e `battery_level_percent > 20.0`.
             - Caso contrário, fallback para `OperatingProfile.ECO`.

        4. Modo Eco:
           - Se `target_fps <= 60` (ou forçado por restrições energéticas):
             - Selecionar `OperatingProfile.ECO`.

        5. Atualização de Estado:
           - Atualizar `self.current_profile = perfil_escolhido`.
           - Adicionar o perfil escolhido à lista `self.profile_history`.
           - Retornar um dicionário com:
             {
                 "selected_profile": perfil_escolhido.value,
                 "applied_fps": spec["max_fps"],
                 "cpu_freq_ghz": spec["cpu_freq_ghz"],
                 "estimated_power_mw": spec["estimated_power_mw"],
                 "safety_fallback_applied": (perfil_escolhido.value != OperatingProfile.PERFORMANCE.value and target_fps >= 120)
             }
        """
        # --- INÍCIO DA SUA IMPLEMENTAÇÃO ---
        raise NotImplementedError("Candidato deve implementar a função select_operating_profile!")
        # --- FIM DA SUA IMPLEMENTAÇÃO ---
