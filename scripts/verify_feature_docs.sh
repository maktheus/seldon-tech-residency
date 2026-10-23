#!/usr/bin/env bash
# ==============================================================================
# Seldon Tech Residency - Verificador de Conformidade de Documentação de Features
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}  SELDON TECH RESIDENCY - AUDITORIA DE DOCUMENTAÇÃO DE FEATURES ${NC}"
echo -e "${BLUE}================================================================${NC}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# 1. Verificar se diretório docs/features existe e contém documentação
if [ ! -d "docs/features" ]; then
    echo -e "${RED}[ERRO] Diretório docs/features não encontrado!${NC}"
    exit 1
fi

FEATURE_COUNT=$(find docs/features -maxdepth 1 -name "FEATURE_*.md" | wc -l)

echo -e "Features documentadas encontradas: ${GREEN}$FEATURE_COUNT${NC}"

if [ "$FEATURE_COUNT" -eq 0 ]; then
    echo -e "${RED}[FALHA] Nenhuma feature documentada encontrada em docs/features/!${NC}"
    exit 1
fi

# 2. Listar todas as features registradas
echo ""
echo -e "${YELLOW}Catálogo de Especificações de Features:${NC}"
for feat in docs/features/FEATURE_*.md; do
    TITLE=$(head -n 5 "$feat" | grep "^# " | head -n 1 | sed 's/# //')
    echo -e "  📄 [${GREEN}$(basename "$feat")${NC}] - $TITLE"
done

# 3. Verificar existência de CHANGELOG.md
if [ ! -f "CHANGELOG.md" ]; then
    echo -e "${RED}[FALHA] CHANGELOG.md não encontrado!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✓ Auditoria concluída: Todos os requisitos de documentação de features foram cumpridos!${NC}"
exit 0
