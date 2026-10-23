# Arquitetura do Sistema SeldonCore no AOSP Android 15

Este documento detalha o design de software e o fluxo de dados do subsistema nativo **SeldonCore** integrado à árvore do Android Open Source Project (AOSP) Android 15.

---

## 1. Topologia de Camadas no AOSP

```
+-------------------------------------------------------------+
|               Aplicações de Usuário & Sistema               |
|      (Ex: Dashboard de IA, Scanner de Ameaças, Profiler)     |
+-------------------------------------------------------------+
                               |
                               | (Java Binder Stubs)
                               v
+-------------------------------------------------------------+
|               Android Framework (Java / AIDL)               |
|            com.seldon.os.telemetry.ISeldonTelemetryService  |
+-------------------------------------------------------------+
                               |
                               | ioctl(/dev/binder)
                               v
+-------------------------------------------------------------+
|              Linux Kernel Binder Driver (IPC)               |
+-------------------------------------------------------------+
                               ^
                               | (C++ NDK Binder Skeletons)
                               |
+-------------------------------------------------------------+
|                 Daemon Nativo: seldond (C++)                 |
|       - Telemetria de Energia (/sys/class/power_supply)     |
|       - Monitor de Margem Térmica (/sys/class/thermal)      |
|       - Controlador de Quantização Neural (INT4/INT8)       |
|       - Mitigador Ativo de Vulnerabilidades (SELinux/Kernel)|
+-------------------------------------------------------------+
                               |
           +-------------------+-------------------+
           |                                       |
           v                                       v
+-----------------------+              +-----------------------+
|  Hardware Power HAL   |              |  Neural Networks HAL  |
| (Qualcomm / Exynos)   |              |    (NNAPI / APU)      |
+-----------------------+              +-----------------------+
```

---

## 2. Integração com os Módulos do Seldon Tech Residency

### Módulo 2: Inteligência Artificial Embarcada
* O daemon expõe o método `setDynamicQuantizationPolicy(targetBitWidth)`.
* Quando a margem térmica do SoC aproxima-se de 1.0 (aquecimento excessivo) ou a bateria entra em nível crítico (<15%), o daemon notifica o framework para comutar modelos neurais de `FP16` para `INT8` ou `INT4`, reduzindo os TOPS e a dissipação térmica em até 65%.

### Módulo 3: Engenharia de Segurança & Vulnerabilidades
* O daemon implementa `enforceHardeningPolicy(token, flags)`.
* Comunica-se com o subsistema de segurança para validar tokens criptográficos antes de habilitar mitigação de overflow ou isolar processos anômalos que estejam executando flooding de transações Binder.

### Módulo 4: Otimização Energética & Hardware-Aware
* O daemon lê periodicamente nós do subsistema `power_supply` no kernel (`/sys/class/power_supply/battery/power_now` e `voltage_now`).
* Alimenta heurísticas multi-objetivo baseadas em NSGA-II para equilibrar taxa de quadros e taxa de descarga da bateria.

---

## 3. Segurança e Confinamento SELinux

O daemon `seldond` opera sob o domínio restrito `seldond`:
- **Regra de Não-Transgressão:** Possui `neverallow` para impedir modificação em arquivos do sistema (`system_file`).
- **Comunicação Confinada:** Apenas aplicações do sistema (`system_app`) e processos autenticados possuem privilégios no `service_contexts` para invocar os métodos da interface `ISeldonTelemetryService`.
