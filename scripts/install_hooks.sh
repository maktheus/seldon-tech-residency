#!/usr/bin/env bash
# ==============================================================================
# Seldon Tech Residency - Instalação de Git Hooks Automática
# ==============================================================================

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo "Configurando Git Hooks na pasta .githooks..."
chmod +x .githooks/pre-commit
git config core.hooksPath .githooks

echo "✓ Git hooks configurados com sucesso! O pre-commit hook de documentação obrigatória está ativo."
