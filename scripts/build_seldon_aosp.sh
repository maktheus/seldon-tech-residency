#!/usr/bin/env bash
# ==============================================================================
# Seldon Tech Residency - Compilador de Módulos SeldonCore na Árvore AOSP
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}  SELDON TECH RESIDENCY: COMPILADOR DE MÓDULOS AOSP ANDROID 15   ${NC}"
echo -e "${BLUE}================================================================${NC}"

if [ -z "$ANDROID_BUILD_TOP" ]; then
    echo -e "${YELLOW}Aviso: Variável ANDROID_BUILD_TOP não está definida.${NC}"
    echo "Para compilar dentro da árvore do AOSP Android 15:"
    echo -e "  1. Navegue até a raiz do seu checkout do AOSP:"
    echo -e "     ${GREEN}cd /caminho/para/aosp-15${NC}"
    echo -e "  2. Carregue as funções de ambiente:"
    echo -e "     ${GREEN}source build/envsetup.sh${NC}"
    echo -e "  3. Selecione o target do emulador x86_64:"
    echo -e "     ${GREEN}lunch sdk_phone_x86_64-trunk_staging-userdebug${NC}"
    echo -e "     (ou ${GREEN}lunch cf_x86_64_phone-trunk_staging-userdebug${NC} para Cuttlefish)"
    echo -e "  4. Crie um symlink do módulo SeldonCore:"
    echo -e "     ${GREEN}ln -s $(pwd)/aosp/packages/services/SeldonCore packages/services/SeldonCore${NC}"
    echo -e "  5. Compile especificamente o módulo e o daemon:"
    echo -e "     ${GREEN}mmma packages/services/SeldonCore${NC}"
    echo ""
    echo -e "${BLUE}O binário gerado estará disponível em:${NC}"
    echo -e "  out/target/product/generic_x86_64/system/bin/seldond"
    exit 0
fi

echo -e "${GREEN}Árvore AOSP detectada em: $ANDROID_BUILD_TOP${NC}"
cd "$ANDROID_BUILD_TOP"
echo "Disparando build do módulo SeldonCore via Soong..."
mmma packages/services/SeldonCore
echo -e "${GREEN}✓ Módulo SeldonCore compilado com sucesso!${NC}"
