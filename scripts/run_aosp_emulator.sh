#!/usr/bin/env bash
# ==============================================================================
# Seldon Tech Residency - Lançador do Emulador AOSP Android 15
# Suporta aceleração KVM nativa e modo headless para testes
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}"
export PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH"

AVD_NAME="Seldon_AOSP_API35"

if ! command -v emulator >/dev/null 2>&1; then
    echo -e "${RED}[ERRO] Emulador não encontrado no PATH.${NC}"
    echo -e "Execute primeiro o script: ${YELLOW}./scripts/setup_aosp_android15.sh${NC}"
    exit 1
fi

MODE="${1:-gui}"

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}  INICIANDO EMULADOR AOSP ANDROID 15 (AVD: $AVD_NAME)           ${NC}"
echo -e "${BLUE}================================================================${NC}"

if [ "$MODE" = "headless" ]; then
    echo -e "${YELLOW}Iniciando em modo Headless (Sem Janela / CI Benchmark)...${NC}"
    emulator -avd "$AVD_NAME" -no-window -no-audio -no-boot-anim -gpu swiftshader_indirect -accel on
else
    echo -e "${YELLOW}Iniciando com Interface Gráfica e Aceleração de GPU do Host...${NC}"
    emulator -avd "$AVD_NAME" -gpu host -accel on -memory 4096 -cores 4
fi
