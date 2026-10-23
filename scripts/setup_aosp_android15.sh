#!/usr/bin/env bash
# ==============================================================================
# Seldon Tech Residency - Setup Automatizado do Ambiente AOSP Android 15
# Target: Android 15 (VanillaIceCream / API 35) x86_64
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}================================================================${NC}"
echo -e "${BLUE}  SELDON TECH RESIDENCY: CONFIGURADOR AOSP ANDROID 15 (API 35)   ${NC}"
echo -e "${BLUE}================================================================${NC}"

# 1. Checagem de Hardware e KVM
echo -e "\n${YELLOW}[1/4] Verificando aceleração de hardware e Kernel KVM...${NC}"
if [ -e /dev/kvm ] && [ -w /dev/kvm ]; then
    echo -e "${GREEN}✓ /dev/kvm está ativo e acessível com permissões de leitura/escrita!${NC}"
else
    echo -e "${RED}✗ /dev/kvm não está acessível ou permissões insuficientes.${NC}"
    echo -e "Execute: sudo chmod 666 /dev/kvm ou adicione seu usuário ao grupo kvm."
    exit 1
fi

# 2. Checagem de Java
echo -e "\n${YELLOW}[2/4] Verificando versão do Java (Requer JDK 17)...${NC}"
if command -v java >/dev/null 2>&1; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo -e "${GREEN}✓ Java detectado: $JAVA_VERSION${NC}"
else
    echo -e "${RED}✗ Java não encontrado no PATH.${NC}"
    exit 1
fi

# 3. Definição do Diretório do Android SDK
export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$HOME/Android/Sdk}"
mkdir -p "$ANDROID_SDK_ROOT/cmdline-tools"

echo -e "\n${YELLOW}[3/4] Configurando Android Command-Line Tools em: $ANDROID_SDK_ROOT...${NC}"

CMDLINE_TOOLS_URL="https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip"
if [ ! -d "$ANDROID_SDK_ROOT/cmdline-tools/latest" ]; then
    echo "Baixando cmdline-tools oficial do Google..."
    TMP_ZIP="/tmp/cmdline-tools.zip"
    curl -sSL "$CMDLINE_TOOLS_URL" -o "$TMP_ZIP"
    unzip -q -o "$TMP_ZIP" -d "$ANDROID_SDK_ROOT/cmdline-tools"
    mv "$ANDROID_SDK_ROOT/cmdline-tools/cmdline-tools" "$ANDROID_SDK_ROOT/cmdline-tools/latest"
    rm -f "$TMP_ZIP"
    echo -e "${GREEN}✓ cmdline-tools instalado com sucesso!${NC}"
else
    echo -e "${GREEN}✓ cmdline-tools já existente.${NC}"
fi

export PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH"

# 4. Aceitar licenças e baixar componentes do AOSP Android 15
echo -e "\n${YELLOW}[4/4] Aceitando licenças e baixando imagem AOSP Android 15 x86_64...${NC}"
yes | sdkmanager --licenses >/dev/null 2>&1 || true

echo "Instalando platform-tools e emulador..."
sdkmanager "platform-tools" "emulator"

IMAGE_TARGET="system-images;android-35;default;x86_64"
echo "Instalando imagem pura do AOSP Android 15: $IMAGE_TARGET..."
sdkmanager "$IMAGE_TARGET"

# 5. Criar AVD se não existir
AVD_NAME="Seldon_AOSP_API35"
if avdmanager list avd | grep -q "$AVD_NAME"; then
    echo -e "${GREEN}✓ Dispositivo virtual '$AVD_NAME' já configurado.${NC}"
else
    echo "Criando dispositivo virtual '$AVD_NAME' (Pixel 7 / API 35 AOSP)..."
    echo "no" | avdmanager create avd -n "$AVD_NAME" -k "$IMAGE_TARGET" --device "pixel_7" --force
    echo -e "${GREEN}✓ AVD '$AVD_NAME' criado com sucesso!${NC}"
fi

echo -e "\n${GREEN}================================================================${NC}"
echo -e "${GREEN}✓ AMBIENTE ANDROID 15 PRONTO PARA EXECUÇÃO E TESTES!${NC}"
echo -e "Para iniciar o emulador, execute: ${YELLOW}./scripts/run_aosp_emulator.sh${NC}"
echo -e "${GREEN}================================================================${NC}"
