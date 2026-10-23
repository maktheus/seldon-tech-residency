# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.
O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e este projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased] - 2026-10-23

### Adicionado (AOSP Android 15 Development Infrastructure)
- **Infraestrutura AOSP Android 15 (VanillaIceCream / API 35)**:
  - Criação da árvore de módulos `aosp/packages/services/SeldonCore/`.
  - Interface AIDL `ISeldonTelemetryService.aidl` com métodos de IPC para telemetria de energia, IA neural e segurança de sistema.
  - Daemon nativo em C++ (`seldond`) com inicialização via `seldond.rc` e build Soong via `Android.bp`.
  - Políticas de segurança SELinux completas em `aosp/system/sepolicy/` (`seldond.te`, `service_contexts`, `file_contexts`).
- **Política Estrita de Documentação Obrigatória**:
  - Hook de pré-commit `.githooks/pre-commit` bloqueando alterações de código desacompanhadas de documentação técnica.
  - Script de instalação de hooks `scripts/install_hooks.sh`.
  - Verificador de auditoria contínua `scripts/verify_feature_docs.sh`.
  - Template oficial `docs/features/TEMPLATE.md` e documento de política `docs/features/FEATURE_WORKFLOW_POLICY.md`.
  - Especificação completa `docs/features/FEATURE_001_ANDROID15_AOSP_INFRASTRUCTURE.md`.
- **Scripts de Automação de Emulador e Build**:
  - `scripts/setup_aosp_android15.sh`: Prepara SDK, licenças e cria o AVD Android 15 AOSP puro.
  - `scripts/run_aosp_emulator.sh`: Execução acelerada via hardware KVM (GUI ou Headless).
  - `scripts/build_seldon_aosp.sh`: Guia de compilação na árvore AOSP via Soong/Blueprint.
- **Guias Técnicos Completos**:
  - `docs/aosp/ANDROID_15_AOSP_GUIDE.md`: Manual passo-a-passo de compilação da árvore AOSP Android 15, lunch targets e depuração.
  - `docs/aosp/SELDON_SYSTEM_ARCHITECTURE.md`: Arquitetura do daemon de sistema, Binder IPC e integração com os 4 módulos do Seldon.
