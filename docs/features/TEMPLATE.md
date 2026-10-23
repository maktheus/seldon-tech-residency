# FEATURE_XXX: [Nome Curto da Funcionalidade]

**Autor:** [Nome do Residente]  
**Módulo Seldon:** [Módulo 1 / 2 / 3 / 4]  
**Status:** [Proposta / Em Desenvolvimento / Concluída]  
**Data:** AAAA-MM-DD  

---

## 1. Descrição do Problema e Motivação
Explicação técnica do desafio no AOSP, limitação do framework Android padrão ou vulnerabilidade/ineficiência que motivou esta implementação.

## 2. Fundamentação Teórica e Estado da Arte
Citações de artigos científicos relevantes, RFCs, papers do USENIX/IEEE ou documentação oficial do Android Open Source Project.

## 3. Arquitetura da Solução no AOSP
- **Camada AOSP Afetada:** (Kernel / HAL / Daemon Nativo C++ / Framework Java / App de Sistema)
- **Interface AIDL / IPC:** Métodos expostos pelo Binder.
- **Estrutura de Arquivos:**
  - `aosp/.../Android.bp`
  - `aosp/.../daemon.cpp`
  - `aosp/.../sepolicy.te`

## 4. Política de Segurança e SELinux
- Domínio do processo: `type my_daemon, domain, coredomain;`
- Tipos de arquivo e contexto de serviço:
- Regras de permissão `allow`:

## 5. Plano de Verificação e Testes
- Comandos de compilação:
  ```bash
  source build/envsetup.sh
  lunch sdk_phone_x86_64-trunk_staging-userdebug
  mmma <caminho_do_modulo>
  ```
- Comandos de teste em runtime (`adb shell`, `logcat`, `dumpsys`):
  ```bash
  adb shell service list | grep my_service
  ```
