# FEATURE_003: Seldon Fortress - Framework de Auditoria de Vulnerabilidades (Módulo 3)

**Autor:** Matheus Uchoa (Seldon Tech Residency)  
**Módulo Seldon:** Módulo 3: Engenharia de Segurança & Ciberdefesa Móvel  
**Status:** Concluída e Aprovada por Testes  
**Data:** 2026-10-23  

---

## 1. Descrição do Problema e Motivação
A fragmentação e a complexidade do ecossistema Android frequentemente resultam em componentes expostos inadvertidamente (`exported="true"`), flags perigosas de debug ativas em produção e transações IPC Binder sem sanitização de payloads. O framework **Seldon Fortress** atua como uma linha de defesa automatizada em três frentes: estática (Manifest), IPC dinâmica (Binder Guard) e confinamento de sistema operacional (SELinux Checker).

## 2. Fundamentação Teórica e Estado da Arte
- **Análise de Superfície de Ataque no Android:** Alinhado a Enck et al. (OSDI 2014) e Arzt et al. (PLDI 2014), o framework audita superfícies IPC vulneráveis e verifica privilégios em componentes de sistema.
- **SELinux Confinement:** Adota o modelo formal de menor privilégio de Smalley & Craig (NDSS 2013), garantindo que regras `neverallow` não sejam subvertidas por transições de domínio permissivas.

## 3. Arquitetura da Solução
- **Diretório:** `projects/projeto_seguranca_fortress/`
- **Componentes:**
  - `scanner/manifest_auditor.py`: Identifica `allowBackup`, `debuggable`, permissões críticas e Content Providers exportados desprotegidos.
  - `ipc_fuzzer/binder_guard.py`: Bloqueia transações excedendo 800 KB, previne ataques de repetição via token replay e aplica rate limiting contra IPC DoS.
  - `sepolicy_auditor/selinux_checker.py`: Detecta violações a nós protegidos do kernel e diretivas `permissive`.

## 4. Resultados dos Testes Automatizados
- Testes unitários executados em `tests/test_security_fortress.py`.
- 100% de sucesso na interceptação de parcels corrompidos, replay tokens duplicados e manifests com falhas de injeção.
