# FEATURE_001: Infraestrutura de Desenvolvimento AOSP Android 15 & Daemon SeldonCore

**Autor:** Matheus Uchoa (Seldon Tech Residency)  
**Módulo Seldon:** Módulos 1, 2, 3 e 4 (Base Comum de Firmware e SO)  
**Status:** Concluída (Pronta para Compilação)  
**Data:** 2026-10-23  

---

## 1. Descrição do Problema e Motivação

O desenvolvimento de projetos de residência de pós-graduação e engenharia de sistemas em Android requer modificações diretas no Android Open Source Project (AOSP). O Android 15 (*Vanilla Ice Cream* / API 35) introduziu novas exigências de compilação:
1. Consolidação da arquitetura **Trunk-Stable** (`trunk_staging`).
2. Uso mandatório de interfaces **AIDL NDK Backend** em substituição ao antigo C++ Binder legado (`libbinder` puro em favor de `libbinder_ndk`).
3. Enforçamento rigoroso de regras de isolamento de **SELinux Treble** para daemons de sistema nativos.
4. Política estrita de gerenciamento térmico e de energia (`ThermalHAL v2` e `PowerManagerService`).

Esta feature estabelece a estrutura de compilação e o daemon de sistema `seldond`, permitindo que os residentes desenvolvam os módulos de Inteligência Artificial, Segurança Ofensiva/Defensiva e Otimização Energética sobre a árvore do Android 15.

---

## 2. Fundamentação Teórica e Estado da Arte

* **Binder IPC & AIDL NDK**: Conforme demonstrado por Enck et al. (OSDI 2014) e documentado na especificação oficial do Android NDK Binder, a transição para AIDL NDK garante ABI estável entre partições `/system` e `/vendor`, prevenindo corrupção de memória e inconsistências de tipos.
* **Isolamento SELinux**: A política implementada adota o modelo de menor privilégio formalizado por Smalley & Craig (NDSS 2013), restringindo chamadas de sistema (seccomp) e acessos a nós `/dev` e `/sys`.

---

## 3. Arquitetura da Solução no AOSP Android 15

### Componentes Criados:
1. **Interface AIDL (`aosp/packages/services/SeldonCore/aidl/com/seldon/os/telemetry/ISeldonTelemetryService.aidl`)**:
   - `getPowerMetrics()`: Coleta métricas instantâneas de tensão e corrente via Power Supply Subsystem.
   - `registerNeuralObserver()`: Registra listeners para quantização dinâmica de modelos NPU/DSP.
   - `enforceHardeningPolicy()`: Valida assinaturas e aplica mitigação de exploits no kernel.
   - `getThermalHeadroom()`: Prevê throttling térmico do SoC.

2. **Daemon Nativo C++ (`seldond`)**:
   - Diretório: `aosp/packages/services/SeldonCore/daemon/`
   - Blueprint Soong: `Android.bp` configurado para compilação estática/compartilhada com `libbinder_ndk`, `libutils` e `liblog`.
   - Inicialização: `seldond.rc` registrado no init com classe `main`, permissão `SYS_NICE` e usuário `system`.

3. **Políticas de Segurança SELinux (`aosp/system/sepolicy/`)**:
   - `seldond.te`: Define o domínio `coredomain` para o serviço.
   - `service_contexts`: Mapeia o nome Binder `seldon.telemetry` para o contexto `seldon_telemetry_service`.
   - `file_contexts`: Rotula o executável `/system/bin/seldond` como `seldond_exec`.

---

## 4. Como Compilar na Árvore AOSP

Quando você clonar o AOSP Android 15 (`repo init -u https://android.googlesource.com/platform/manifest -b android-15.0.0_r1`), basta vincular esta pasta:

```bash
# 1. Carregar ambiente de compilação do Android 15
source build/envsetup.sh

# 2. Selecionar o target (Emulador x86_64 ou Cuttlefish)
lunch sdk_phone_x86_64-trunk_staging-userdebug
# ou
lunch cf_x86_64_phone-trunk_staging-userdebug

# 3. Compilar o módulo SeldonCore
mmma aosp/packages/services/SeldonCore

# 4. Iniciar o emulador e verificar
emulator -avd Seldon_AOSP_API35 -gpu host
adb shell service list | grep seldon
```

---

## 5. Auditoria de Documentação
Esta feature inclui todos os scripts de instalação, verificação e integrações necessárias, atendendo à política de auditoria contínua de documentação do Seldon Tech Residency.
