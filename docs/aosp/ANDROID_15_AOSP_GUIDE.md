# Guia Definitivo: Compilação e Desenvolvimento no AOSP Android 15 (Vanilla Ice Cream)

Este guia documenta o procedimento completo para configurar, compilar e executar modificações no **Android 15 (API 35)**, com foco nos projetos de pesquisa e engenharia de software embarcado do **Seldon Tech Residency**.

---

## 1. Visão Geral do Android 15 para Engenharia de Baixo Nível

O Android 15 introduz mudanças fundamentais para quem atua em nível de sistema operacional:
1. **Trunk-Stable Architecture**: Substituição das antigas branches fragmentadas pela branch contínua com flags de compilação em `trunk_staging`.
2. **AIDL NDK Obrigatório**: Descontinuação progressiva de interfaces C++ `libbinder` não-estáveis em favor do `libbinder_ndk` com anotações `@VintfStability`.
3. **Isolamento de Memória Avançado**: Suporte nativo a Scudo Memory Allocator, CFI (Control Flow Integrity) por padrão e MTE (Memory Tagging Extension) em processadores ARM v9.
4. **Virtualização com Cuttlefish**: O dispositivo de referência oficial do Google para validação de CTS/VTS é o Cuttlefish (`cf_x86_64_phone`).

---

## 2. Requisitos de Máquina e Ambiente Linux

- **Sistema Operacional:** Linux x86_64 (Arch Linux, Ubuntu 22.04 LTS ou Debian 12).
- **Processador:** Suporte a virtualização KVM (`/dev/kvm`).
- **Memória RAM:** Mínimo de 32 GB (Recomendado 64 GB para compilação simultânea em paralelo).
- **Armazenamento:** 250 GB livres para checkout de código + 100 GB para o diretório de build (`out/`).

---

## 3. Passo a Passo de Compilação na Árvore AOSP

### Passo 1: Inicialização do Repositório do AOSP
```bash
mkdir -p ~/android15 && cd ~/android15
repo init -u https://android.googlesource.com/platform/manifest -b android-15.0.0_r1 --depth=1
repo sync -c -j$(nproc)
```

### Passo 2: Configuração de Variáveis de Ambiente
```bash
source build/envsetup.sh
```

### Passo 3: Seleção do Target de Compilação (Lunch)
Para emulador QEMU tradicional:
```bash
lunch sdk_phone_x86_64-trunk_staging-userdebug
```

Para emulador de referência Cuttlefish (WebRTC):
```bash
lunch cf_x86_64_phone-trunk_staging-userdebug
```

### Passo 4: Integração dos Módulos SeldonCore
Crie um link simbólico da pasta de módulos deste repositório para a árvore do AOSP:
```bash
ln -s /caminho/para/seldon-tech-residency/aosp/packages/services/SeldonCore packages/services/SeldonCore
ln -s /caminho/para/seldon-tech-residency/aosp/system/sepolicy/seldond.te system/sepolicy/private/seldond.te
```

### Passo 5: Compilação Incremental via Soong / Blueprint
```bash
# Compilar apenas o módulo e o daemon nativo sem precisar compilar o SO inteiro:
mmma packages/services/SeldonCore -j$(nproc)
```

---

## 4. Execução do Emulador e Testes em Runtime

Inicie o emulador configurado:
```bash
emulator -avd Seldon_AOSP_API35 -gpu host -accel on
```

Após o boot do sistema, conecte via `adb` com permissões de superusuário:
```bash
# 1. Obter shell de root
adb root
adb remount

# 2. Enviar o binário compilado diretamente para /system/bin
adb push out/target/product/generic_x86_64/system/bin/seldond /system/bin/
adb shell chmod 755 /system/bin/seldond

# 3. Iniciar o serviço manualmente ou via init
adb shell /system/bin/seldond &

# 4. Verificar se o serviço registrou no Binder ServiceManager
adb shell service list | grep seldon
# Saída esperada:
# com.seldon.os.telemetry.ISeldonTelemetryService/default: [com.seldon.os.telemetry.ISeldonTelemetryService]

# 5. Monitorar logs do daemon
adb logcat -s seldond
```
