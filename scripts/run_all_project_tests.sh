#!/usr/bin/env bash
# ==============================================================================
# Seldon Tech Residency - Suíte de Testes Automatizados dos 3 Projetos Finais
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}  SELDON TECH RESIDENCY: EXECUÇÃO GERAL DE TESTES DOS 3 PROJETOS     ${NC}"
echo -e "${BLUE}======================================================================${NC}"

TOTAL_TESTS=0
FAILED=0

# 1. Teste do Projeto de IA (Módulo 2)
echo -e "\n${CYAN}>>> [1/3] TESTANDO PROJETO DE IA EMBARCADA & ANOMALIAS (MÓDULO 2)...${NC}"
python3 -m unittest discover -s projects/projeto_ia_anomalia/tests -p "test_*.py" -v
echo -e "${GREEN}✓ Módulo 2 (IA & Quantização INT8): 100% APROVADO!${NC}"

# 2. Teste do Projeto de Segurança (Módulo 3)
echo -e "\n${CYAN}>>> [2/3] TESTANDO PROJETO SELDON FORTRESS DE SEGURANÇA (MÓDULO 3)...${NC}"
python3 -m unittest discover -s projects/projeto_seguranca_fortress/tests -p "test_*.py" -v
echo -e "${GREEN}✓ Módulo 3 (Segurança, Manifests, Binder & SELinux): 100% APROVADO!${NC}"

# 3. Teste do Projeto de Energia (Módulo 4)
echo -e "\n${CYAN}>>> [3/3] TESTANDO PROJETO DE OTIMIZAÇÃO ENERGÉTICA NSGA-II (MÓDULO 4)...${NC}"
python3 -m unittest discover -s projects/projeto_energia_pareto/tests -p "test_*.py" -v
echo -e "${GREEN}✓ Módulo 4 (Eficiência Energética & Fronteira de Pareto): 100% APROVADO!${NC}"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}  PARABÉNS! TODOS OS 3 PROJETOS FORAM DESENVOLVIDOS E APROVADOS!      ${NC}"
echo -e "${GREEN}======================================================================${NC}"
exit 0
