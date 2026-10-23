import os
from PIL import Image, ImageDraw

def create_base(width=1200, height=750, bg_color=(248, 250, 252)):
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    return img, draw

# 1. Arquitetura do Projeto 2: IA & Otimização AOSP
def draw_arq_ia():
    img, draw = create_base(1200, 750, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "ARQUITETURA DE SOLUÇÃO: SISTEMA DE TELEMETRIA E IA ON-DEVICE NO AOSP", fill=(255, 255, 255))

    # Coluna 1: Coleta de Telemetria (Kernel & ART)
    draw.rounded_rectangle([50, 120, 380, 680], radius=15, fill=(240, 253, 250), outline=(8, 145, 178), width=3)
    draw.rounded_rectangle([50, 120, 380, 180], radius=15, fill=(8, 145, 178))
    draw.text((70, 140), "1. CAMADA DE OBSERVABILIDADE", fill=(255, 255, 255))
    draw.text((70, 205), "• Buffer de ftrace & Perfetto Probe\n• Eventos sched_switch em nanossegundos\n• Interceptação do Driver /dev/binder\n• Contador de ciclos de GC no ART\n• Amostragem circular em memória ashmem\n• Zero-overhead em MainThread", fill=(15, 23, 42))

    # Coluna 2: Engine de IA On-Device (LiteRT / NNAPI)
    draw.rounded_rectangle([420, 120, 780, 680], radius=15, fill=(245, 243, 255), outline=(124, 58, 237), width=3)
    draw.rounded_rectangle([420, 120, 780, 180], radius=15, fill=(124, 58, 237))
    draw.text((440, 140), "2. ENGINE DE IA ON-DEVICE", fill=(255, 255, 255))
    draw.text((440, 205), "• Modelo: Autoencoder Convolucional 1D\n• Quantização Afim INT8 (Pesos de 1 byte)\n• Formato: FlatBuffers (.tflite otimizado)\n• Runtime: LiteRT com delegação NNAPI\n• Execução em hardware acelerado (NPU)\n• Erro de Reconstrução MSE calculado em tempo real\n• Latência de inferência < 2.5 ms", fill=(15, 23, 42))

    # Coluna 3: Atuador do AOSP (System Server)
    draw.rounded_rectangle([820, 120, 1150, 680], radius=15, fill=(236, 253, 245), outline=(5, 150, 105), width=3)
    draw.rounded_rectangle([820, 120, 1150, 180], radius=15, fill=(5, 150, 105))
    draw.text((840, 140), "3. ATUAÇÃO PROATIVA NO AOSP", fill=(255, 255, 255))
    draw.text((840, 205), "• Notificação via IPC AIDL ao ActivityManager\n• Reclassificação dinâmica de OOM Score\n• Ajuste de prioridade de threads (SCHED_FIFO)\n• Mitigação de Jank antes da queda de frame\n• Relatório de auditoria de estabilidade\n• Autonomia 100% desconectada da nuvem", fill=(15, 23, 42))

    # Conectores entre colunas
    draw.line([(380, 350), (420, 350)], fill=(8, 145, 178), width=5)
    draw.polygon([(420, 350), (405, 340), (405, 360)], fill=(8, 145, 178))

    draw.line([(780, 350), (820, 350)], fill=(124, 58, 237), width=5)
    draw.polygon([(820, 350), (805, 340), (805, 360)], fill=(124, 58, 237))

    img.save('imagens/fig_arq_projeto_ia.png')

# 2. Arquitetura do Projeto 3: Segurança Móvel DevSecOps
def draw_arq_seguranca():
    img, draw = create_base(1200, 750, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "ARQUITETURA DE SOLUÇÃO: PLATAFORMA DEVSECOPS E AUDITORIA AOSP", fill=(255, 255, 255))

    steps = [
        ("1. Pipeline SAST / DAST", "• Decompilação automatizada com Jadx\n• Varredura de AndroidManifest.xml\n• Detecção de Exported Components\n• Verificação de Permissões Críticas\n• Auditoria de NetworkSecurityConfig", (8, 145, 178), 50),
        ("2. Fuzzer de IPC Binder", "• Geração de transações mutadas via AIDL\n• Injeção de Parcels malformados\n• Monitoramento de panics no kernel\n• Teste de limites em ContentProviders\n• Validação de sanitização SQL", (217, 119, 6), 330),
        ("3. Auditoria SELinux / AVB", "• Inspeção de regras de domínio (.te)\n• Verificação de modo Enforcing estrito\n• Validação da cadeia dm-verity\n• Teste de integridade de partição\n• Logs forenses via auditd e logcat", (124, 58, 237), 610),
        ("4. StrongBox Vault Tester", "• Geração de chaves AES-256 no TEE\n• Validação de isolamento de hardware\n• Exigência de biometria de usuário\n• Emissão de Relatório Rastreável\n• Bloqueio automático de release", (5, 150, 105), 890)
    ]

    for title, desc, color, x in steps:
        draw.rounded_rectangle([x, 130, x + 260, 670], radius=15, fill=(255, 255, 255), outline=color, width=3)
        draw.rounded_rectangle([x, 130, x + 260, 190], radius=15, fill=color)
        draw.text((x + 15, 150), title, fill=(255, 255, 255))
        draw.text((x + 15, 215), desc, fill=(15, 23, 42))

        if x < 890:
            draw.line([(x + 260, 380), (x + 330, 380)], fill=color, width=4)
            draw.polygon([(x + 330, 380), (x + 315, 370), (x + 315, 390)], fill=color)

    img.save('imagens/fig_arq_projeto_seguranca.png')

# 3. Arquitetura do Projeto 4: Eficiência Energética & Pareto
def draw_arq_energia():
    img, draw = create_base(1200, 750, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "ARQUITETURA DE SOLUÇÃO: BANCADA DE MEDIÇÃO E OTIMIZADOR DE PARETO", fill=(255, 255, 255))

    # Bloco 1: Instrumentação Física
    draw.rounded_rectangle([50, 120, 380, 680], radius=15, fill=(254, 243, 199), outline=(217, 119, 6), width=3)
    draw.rounded_rectangle([50, 120, 380, 180], radius=15, fill=(217, 119, 6))
    draw.text((70, 140), "1. BANCADA FÍSICA MONSOON", fill=(255, 255, 255))
    draw.text((70, 205), "• Alimentação direta nos bornes (3.85V)\n• Amostragem de corrente a 5 kHz\n• Sensor térmico infravermelho de SoC\n• Protocolo rigoroso de controle de ruído:\n  - Luminosidade travada a 150 nits\n  - Modo Avião / Wi-Fi isolado\n  - Temperatura ambiente a 22°C\n• Exportação de dados brutos (V, I, mW)", fill=(15, 23, 42))

    # Bloco 2: Telemetria de Software (Battery Historian)
    draw.rounded_rectangle([420, 120, 780, 680], radius=15, fill=(240, 253, 250), outline=(8, 145, 178), width=3)
    draw.rounded_rectangle([420, 120, 780, 180], radius=15, fill=(8, 145, 178))
    draw.text((440, 140), "2. PROFILING DO AOSP", fill=(255, 255, 255))
    draw.text((440, 205), "• dumpsys batterystats & bugreports\n• Rastreamento de WakeLocks (UIDs)\n• Máquina de Estados do Doze Mode\n• Contadores de Frequência de CPU (DVFS)\n• Estados de Rádio Celular (RRC)\n• Sincronização temporal de hardware\n  e software com resolução de ms", fill=(15, 23, 42))

    # Bloco 3: Otimizador NSGA-II
    draw.rounded_rectangle([820, 120, 1150, 680], radius=15, fill=(245, 243, 255), outline=(124, 58, 237), width=3)
    draw.rounded_rectangle([820, 120, 1150, 180], radius=15, fill=(124, 58, 237))
    draw.text((840, 140), "3. OTIMIZADOR MULTIOBJETIVO", fill=(255, 255, 255))
    draw.text((840, 205), "• Algoritmo Genético NSGA-II\n• Espaço de Busca: EAS & Governadores\n• Funções Objetivo:\n  - Minimização de Potência (mW)\n  - Minimização de Temperatura (°C)\n  - Maximização de Fluidez (FPS)\n• Fronteira de Pareto com soluções\n  não-dominadas ótimas em silício", fill=(15, 23, 42))

    # Conectores
    draw.line([(380, 350), (420, 350)], fill=(217, 119, 6), width=5)
    draw.polygon([(420, 350), (405, 340), (405, 360)], fill=(217, 119, 6))

    draw.line([(780, 350), (820, 350)], fill=(8, 145, 178), width=5)
    draw.polygon([(820, 350), (805, 340), (805, 360)], fill=(8, 145, 178))

    img.save('imagens/fig_arq_projeto_energia.png')

draw_arq_ia()
draw_arq_seguranca()
draw_arq_energia()
print("As 3 imagens de arquitetura foram geradas com sucesso!")
