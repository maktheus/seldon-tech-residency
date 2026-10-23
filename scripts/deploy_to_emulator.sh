#!/usr/bin/env bash
# ==============================================================================
# Seldon Tech Residency - Script de Injeção e Validação em Runtime no AOSP
# Injeta daemons nativos, políticas e scripts de teste no Android 15 via adb root
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}"
export PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}  SELDON TECH RESIDENCY: DEPLOY & TESTE EM TEMPO REAL NO ANDROID 15   ${NC}"
echo -e "${BLUE}======================================================================${NC}"

# 1. Aguardar dispositivo
echo -e "${YELLOW}[1/5] Aguardando dispositivo AOSP via adb...${NC}"
adb wait-for-device

# 2. Obter privilégios de root nativos (disponíveis de fábrica no AOSP puro)
echo -e "\n${YELLOW}[2/5] Elevando privilégios para adb root...${NC}"
adb root
sleep 1
adb wait-for-device
ROOT_UID=$(adb shell id -u | tr -d '\r')

if [ "$ROOT_UID" = "0" ]; then
    echo -e "${GREEN}✓ Root ativo com sucesso! (UID 0 - Superusuário)${NC}"
else
    echo -e "${RED}✗ Falha ao obter root. Verifique se a imagem é AOSP userdebug.${NC}"
fi

# 3. Desbloquear partição /system para escrita (OverlayFS / Remount)
echo -e "\n${YELLOW}[3/5] Remontando partições de sistema como graváveis (adb remount)...${NC}"
adb remount || true

# 4. Criar diretório de trabalho do Seldon no dispositivo
echo -e "\n${YELLOW}[4/5] Injetando artefatos do SeldonCore no dispositivo...${NC}"
adb shell mkdir -p /data/local/tmp/seldon/projects
adb shell mkdir -p /data/local/tmp/seldon/aosp

# Enviar arquivos de configuração AOSP e projetos
adb push aosp/packages/services/SeldonCore /data/local/tmp/seldon/aosp/
adb push projects /data/local/tmp/seldon/

echo -e "${GREEN}✓ Módulos e projetos sincronizados com /data/local/tmp/seldon!${NC}"

# 5. Executar inspeção de subsistemas no Android 15
echo -e "\n${YELLOW}[5/5] Inspecionando ambiente Android 15 em runtime...${NC}"
DEVICE_MODEL=$(adb shell getprop ro.product.model | tr -d '\r')
DEVICE_BUILD=$(adb shell getprop ro.build.version.release | tr -d '\r')
DEVICE_SDK=$(adb shell getprop ro.build.version.sdk | tr -d '\r')
DEVICE_SECURITY=$(adb shell getenforce | tr -d '\r')

echo -e "  Modelo: ${CYAN}$DEVICE_MODEL${NC}"
echo -e "  Versão do Android: ${CYAN}$DEVICE_BUILD (API $DEVICE_SDK)${NC}"
echo -e "  Status SELinux: ${CYAN}$DEVICE_SECURITY${NC}"

# Testar leitura de bateria no kernel do Android
echo -e "\n${BLUE}Leitura de telemetria de energia direta do Kernel Linux no AOSP:${NC}"
adb shell "cat /sys/class/power_supply/*/voltage_now 2>/dev/null || dumpsys battery | head -n 6"

echo -e "\n${GREEN}======================================================================${NC}"
echo -e "${GREEN}✓ DEPLOY E INTEGRAÇÃO NO EMULADOR ANDROID 15 CONCLUÍDOS COM SUCESSO!  ${NC}"
echo -e "${GREEN}======================================================================${NC}"
