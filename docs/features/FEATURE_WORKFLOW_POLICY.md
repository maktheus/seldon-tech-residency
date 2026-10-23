# Diretriz e Política de Documentação Obrigatória de Features

> **Regra Geral do Seldon Tech Residency**: Nenhum código deve ser integrado à árvore principal sem documentação técnica completa, detalhando a motivação científica, a arquitetura no AOSP, o fluxo de IPC (Binder/AIDL), a política de segurança (SELinux) e o plano de testes.

---

## 1. O Princípio da Documentação Contínua

No desenvolvimento de sistemas operacionais embarcados como o Android (AOSP), alterações em subsistemas de baixo nível (HAL, Daemons C++, Framework Java) possuem alto impacto em estabilidade, consumo de bateria e segurança.

Por essa razão, este repositório impõe uma **política rígida de auditoria por Git Hook**:
- Todo commit contendo modificações em arquivos de código (`.cpp`, `.h`, `.java`, `.kt`, `.aidl`, `.bp`, `.rc`, `.tsx`) **é rejeitado automaticamente** se não incluir atualizações na pasta `docs/` ou no arquivo `CHANGELOG.md`.

---

## 2. Ciclo de Vida de uma Feature (Definition of Done)

Para que uma funcionalidade seja considerada **concluída**, os seguintes artefatos devem existir:

1. **Documento de Especificação da Feature (`docs/features/FEATURE_XXX_<nome>.md`)**:
   - Criado a partir do template [`docs/features/TEMPLATE.md`](./TEMPLATE.md).
   - Deve conter o problema resolvido, referências bibliográficas do estado da arte, diagrama de sequência IPC, permissões SELinux necessárias e comandos de validação.
2. **Atualização no `CHANGELOG.md`**:
   - Registro cronológico seguindo o padrão [Keep a Changelog](https://keepachangelog.com/).
3. **Módulos de Build AOSP (`Android.bp` / `sepolicy`)**:
   - Nomes padronizados, flags de compilação sem warnings tratados (`-Wall -Werror`).
4. **Validação**:
   - Execução do script `scripts/verify_feature_docs.sh` com retorno 0 (sucesso).

---

## 3. Bypass e Casos de Exceção

Não são permitidos commits com `--no-verify` exceto em hotfixes de emergência com aprovação expressa do Tech Lead. O Git Hook `.githooks/pre-commit` garante a aplicação contínua dessa política.
