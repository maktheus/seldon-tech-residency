# FEATURE_005: Fluxo de Desenvolvimento Rápido e Deploy no AOSP Android 15 ao Vivo

**Autor:** Matheus Uchoa (Seldon Tech Residency)  
**Módulo Seldon:** Núcleo Comum de Formação & Infraestrutura de Sistemas AOSP  
**Status:** Concluída e Validada no Dispositivo  
**Data:** 2026-10-23  

---

## 1. Descrição do Problema e Motivação
Na engenharia de sistemas operacionais embarcados, a compilação completa da árvore do AOSP (250+ GB) a cada alteração de código é inviável no ciclo diário de prototipação devido ao tempo excessivo (45 a 90 minutos por compilação). 

Esta feature implementa o **fluxo de desenvolvimento rápido padrão da indústria** adotado por engenheiros da Google e Samsung:
1. Execução de uma imagem pura oficial do AOSP Android 15 (*userdebug*) acelerada via KVM.
2. Shell superusuário nativo via `adb root` (UID 0).
3. Remontagem de partições de sistema (`adb remount`).
4. Injeção e teste de daemons nativos C++, interfaces AIDL e projetos de telemetria em segundos.

---

## 2. Fundamentação Teórica e Arquitetura no Android 15
- **Kernel Linux 6.6 AOSP GKI:** O emulador executa o kernel oficial Android 15 (`6.6.30-android15`) com subsistema de energia em `/sys/class/power_supply` e zonas térmicas em `/sys/class/thermal`.
- **SELinux Enforcing:** O ambiente roda com SELinux ativo em modo Enforcing, validando que serviços e daemons nativos respeitem domínios de segurança e contextos de IPC.
- **Toybox / Binder Driver:** Comunicação via nó de dispositivo `/dev/binder` nativo.

---

## 3. Comandos de Automação Implementados
- `npm run aosp:setup`: Baixa a imagem pura `system-images;android-35;default;x86_64` e cria o AVD `Seldon_AOSP_API35`.
- `npm run aosp:emulator`: Inicializa o emulador AOSP Android 15 com aceleração por hardware KVM.
- `npm run aosp:deploy`: Executa `scripts/deploy_to_emulator.sh`, elevando para `adb root` e injetando os módulos em `/data/local/tmp/seldon/`.

---

## 4. Validação em Runtime Real
- Dispositivo detectado: `emulator-5554` (Android SDK built for x86_64).
- Versão do Android: **15 (API 35)**.
- Kernel: `Linux localhost 6.6.30-android15-8-gdd9c02ccfe27-ab11987101`.
- Leitura de subsistema de energia: nó `/sys/class/power_supply/*/voltage_now` retornado: **5000000 uV** (5V).
- Teste de root: UID 0 confirmado.
