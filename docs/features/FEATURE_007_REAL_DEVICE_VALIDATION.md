# FEATURE_007: Validação e Telemetria em Dispositivo Físico Real (Samsung Galaxy S23 Ultra)

**Autor:** Matheus Uchoa (Seldon Tech Residency)  
**Módulo Seldon:** Consolidação Transversal em Hardware Físico Real (Módulos 1, 2, 3 e 4)  
**Status:** Concluída e Validada em Hardware Real  
**Data:** 2026-10-23  

---

## 1. Descrição do Problema e Motivação
A validação em emuladores é crucial para testes rápidos e CI/CD, mas a homologação final de engenharia de software embarcado exige execução sobre silício real (heterogeneidade térmica de empacotamento, sensores analógicos de bateria, gerenciamento de clock do SoC e pilhas de segurança do fabricante). Esta feature executa e documenta a validação dos 3 projetos sobre um dispositivo comercial topo de linha conectado via ADB.

---

## 2. Especificações do Dispositivo Conectado
- **Aparelho:** Samsung Galaxy S23 Ultra (`SM-S918B`)
- **Serial ADB:** `RQCW103D36K`
- **SoC:** Qualcomm Snapdragon 8 Gen 2 for Galaxy (`qcom`, `aarch64`, 8 núcleos: 1x Cortex-X3 + 2x Cortex-A715 + 2x Cortex-A710 + 3x Cortex-A510 + GPU Adreno 740)
- **Sistema Operacional:** Android 16 (API Level 36 - *Baklava* / Preview)
- **Nível de Patch de Segurança:** 2026-06-05

---

## 3. Resultados Experimentais Obtidos no Silício Real

### A. Telemetria de Sensores Físicos
- **Tensão da Bateria:** **4073.0 mV (4.07 V)**
- **Nível de Carga:** 27%
- **Temperatura da Bateria:** **28.2°C**
- **Temperatura do SoC (Application Processor via ThermalHAL 2.0):** **31.2°C**

### B. Módulo 2: Inferência de IA em Tempo Real
- A telemetria real foi processada pelo Autoencoder INT8 em **0.1178 ms** (menos de 0.12 ms).
- Erro de reconstrução (MSE): **0.151599** (Status WARNING justificado pela taxa de injeção de corrente rápida de recarga USB-C > 2A).

### C. Módulo 3: Auditoria Seldon Fortress nos Pacotes Reais
- Auditoria de pacotes instalados (`com.riotgames.league.wildrift`, `org.ppsspp.ppsspp`, `pbsc.cyclefinder.tembici`, `br.com.consumidor`).
- Detecção de risco de sobreposição de tela / Tapjacking (`android.permission.SYSTEM_ALERT_WINDOW`) no aplicativo Tembici.

### D. Módulo 4: Otimização NSGA-II para Snapdragon 8 Gen 2
- Geração da Fronteira de Pareto com perfis adaptativos:
  - **Modo ECO:** 60 Hz \| Big CPU 1.17 GHz \| GPU 519 MHz \| **3488.5 mW** (Temperatura estabilizada em **47.7°C**).
  - **Modo GAMING:** 120 Hz \| Big CPU 2.53 GHz \| GPU 690 MHz \| **9017.3 mW** (101.0 FPS alvo).
  - Economia de bateria projetada: **61.3%** no modo Eco.

---

## 4. Script de Execução e Reprodução
```bash
npm run validate:device
# ou
python3 scripts/validate_real_device.py
```
