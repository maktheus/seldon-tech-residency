import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs('imagens', exist_ok=True)

# Helper to create images with clean styling
def create_base(width=1200, height=700, bg_color=(15, 23, 42)):
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    return img, draw

# 1. Metodologia Científica e Desenho Experimental
def draw_metodologia():
    img, draw = create_base(1200, 650, (248, 250, 252))
    # Colors
    c_blue = (8, 145, 178)
    c_purple = (124, 58, 237)
    c_green = (5, 150, 105)
    c_amber = (217, 119, 6)
    c_dark = (15, 23, 42)
    
    # Title
    draw.rectangle([0, 0, 1200, 70], fill=c_dark)
    draw.text((40, 22), "METODOLOGIA CIENTÍFICA E PROTOCOLO EXPERIMENTAL EM SISTEMAS", fill=(255, 255, 255))
    
    steps = [
        ("1. Problema Tecnológico", "Identificação de gargalo de latência ou dreno energético", c_blue, 50),
        ("2. Formulação de Hipóteses", "H0: Ausência de ganho real | H1: Melhoria estatisticamente significativa", c_purple, 270),
        ("3. Desenho Experimental", "Controle de ruído: bateria fixada, clock estável, modo avião", c_amber, 490),
        ("4. Coleta & Telemetria", "100 repetições via Perfetto/Macrobenchmark com P99", c_blue, 710),
        ("5. Análise Estatística", "Teste t de Student (p < 0.05) & Rejeição formal de H0", c_green, 930)
    ]
    
    for title, desc, color, x in steps:
        draw.rounded_rectangle([x, 150, x + 210, 480], radius=15, fill=(255, 255, 255), outline=color, width=3)
        draw.rounded_rectangle([x, 150, x + 210, 210], radius=15, fill=color)
        draw.text((x + 15, 175), title, fill=(255, 255, 255))
        # Text wrapping
        words = desc.split()
        line = ""
        y = 240
        for w in words:
            if len(line + " " + w) > 22:
                draw.text((x + 15, y), line, fill=c_dark)
                y += 28
                line = w
            else:
                line += (" " + w if line else w)
        if line:
            draw.text((x + 15, y), line, fill=c_dark)
            
        # Arrow
        if x < 930:
            arrow_x = x + 215
            draw.line([(arrow_x, 315), (arrow_x + 50, 315)], fill=c_purple, width=4)
            draw.polygon([(arrow_x + 50, 315), (arrow_x + 38, 305), (arrow_x + 38, 325)], fill=c_purple)
            
    # Bottom note
    draw.rectangle([50, 530, 1140, 600], fill=(241, 245, 249), outline=(203, 213, 225), width=2)
    draw.text((70, 555), "Resultado: Evidência técnica reprodutível com validade interna, externa e respaldo de propriedade intelectual.", fill=c_dark)
    img.save('imagens/fig_metodologia_cientifica.png')

# 2. Arquitetura em Camadas do AOSP
def draw_aosp_architecture():
    img, draw = create_base(1200, 750, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "ARQUITETURA EM CAMADAS DO ANDROID OPEN SOURCE PROJECT (AOSP)", fill=(255, 255, 255))

    layers = [
        ("Aplicações do Sistema e do Usuário", "Kotlin • Jetpack Compose • Activities • Services • Broadcast Receivers", (8, 145, 178), 110),
        ("Application Framework", "ActivityManager • WindowManager • PackageManager • TelephonyRegistry • PowerManagerService", (59, 130, 246), 230),
        ("Android Runtime (ART) & Bibliotecas Nativas", "Ahead-Of-Time (AOT) • Concurrent GC • /dev/binder IPC • Bionic Libc • WebKit • SQLite", (124, 58, 237), 350),
        ("Hardware Abstraction Layer (HAL)", "Audio HAL • Camera HAL • Sensors HAL • Gralloc • HIDL / AIDL Interfaces", (5, 150, 105), 470),
        ("Kernel Linux & Drivers de Silício", "CFS Scheduler • SELinux Enforcing • LowMemoryKiller (lmkd) • Wakelocks • GPU/SoC Drivers", (217, 119, 6), 590)
    ]

    for title, subs, color, y in layers:
        draw.rounded_rectangle([60, y, 1140, y + 95], radius=12, fill=(255, 255, 255), outline=color, width=3)
        draw.rounded_rectangle([60, y, 400, y + 95], radius=12, fill=color)
        draw.text((80, y + 35), title, fill=(255, 255, 255))
        draw.text((430, y + 38), subs, fill=(15, 23, 42))
        
    img.save('imagens/fig_aosp_arquitetura.png')

# 3. Transação Binder IPC
def draw_binder_ipc():
    img, draw = create_base(1200, 680, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "FLUXO DE TRANSAÇÃO BINDER IPC (ZERO-COPY / SINGLE-COPY)", fill=(255, 255, 255))

    # Process A
    draw.rounded_rectangle([60, 130, 360, 420], radius=15, fill=(240, 253, 250), outline=(8, 145, 178), width=3)
    draw.text((80, 150), "PROCESSO CLIENTE (App)", fill=(8, 145, 178))
    draw.text((80, 185), "• Espaço de Usuário (UID 10182)\n• Invoca método no Proxy AIDL\n• Cria objeto Parcel serializado\n• Chama libbinder nativa", fill=(15, 23, 42))

    # Kernel
    draw.rounded_rectangle([420, 130, 780, 580], radius=15, fill=(245, 243, 255), outline=(124, 58, 237), width=3)
    draw.text((440, 150), "KERNEL LINUX (/dev/binder)", fill=(124, 58, 237))
    draw.text((440, 185), "• Syscall ioctl(BINDER_WRITE_READ)\n• Validação de UID/PID (Sandbox)\n• Consulta ao ServiceManager (Handle 0)\n• Mapeamento mmap() na memória\n  do processo de destino (Zero-Copy)\n• Escalonamento da thread de resposta", fill=(15, 23, 42))

    # Process B
    draw.rounded_rectangle([840, 130, 1140, 420], radius=15, fill=(236, 253, 245), outline=(5, 150, 105), width=3)
    draw.text((860, 150), "PROCESSO SERVIDOR (SystemServer)", fill=(5, 150, 105))
    draw.text((860, 185), "• UID 1000 (System)\n• Threadpool Binder ativa\n• Executa método no Stub AIDL\n• Retorna resultado no Parcel", fill=(15, 23, 42))

    # Transaction Arrows
    draw.line([(360, 260), (420, 260)], fill=(8, 145, 178), width=5)
    draw.polygon([(420, 260), (405, 250), (405, 270)], fill=(8, 145, 178))
    draw.text((370, 235), "ioctl", fill=(8, 145, 178))

    draw.line([(780, 260), (840, 260)], fill=(5, 150, 105), width=5)
    draw.polygon([(840, 260), (825, 250), (825, 270)], fill=(5, 150, 105))
    draw.text((790, 235), "mmap", fill=(5, 150, 105))

    # Return flow
    draw.line([(840, 360), (780, 360)], fill=(217, 119, 6), width=4)
    draw.polygon([(780, 360), (795, 350), (795, 370)], fill=(217, 119, 6))

    draw.line([(420, 360), (360, 360)], fill=(217, 119, 6), width=4)
    draw.polygon([(360, 360), (375, 350), (375, 370)], fill=(217, 119, 6))
    draw.text((540, 370), "Resposta retornada ao App (Latência < 0.2ms)", fill=(217, 119, 6))

    img.save('imagens/fig_binder_ipc.png')

# 4. Quantização Neural FP32 vs INT8
def draw_quantization():
    img, draw = create_base(1200, 650, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "QUANTIZAÇÃO AFIM ON-DEVICE: MAPEAMENTO FLOAT32 PARA INT8", fill=(255, 255, 255))

    # FP32 Box
    draw.rounded_rectangle([60, 120, 560, 440], radius=15, fill=(255, 255, 255), outline=(124, 58, 237), width=3)
    draw.rounded_rectangle([60, 120, 560, 180], radius=15, fill=(124, 58, 237))
    draw.text((80, 140), "PESOS EM FLOAT32 (Contínuo)", fill=(255, 255, 255))
    draw.text((80, 210), "• Precisão simples: 32 bits (4 bytes) por peso\n• Alta faixa dinâmica: [-3.4e38, +3.4e38]\n• Tamanho típico: 16.4 MB (MobileNetV3)\n• Latência CPU: 82 ms / inferência\n• Consumo: 1.82 mWh por frame\n• Exige instruções FP no silício", fill=(15, 23, 42))

    # INT8 Box
    draw.rounded_rectangle([640, 120, 1140, 440], radius=15, fill=(255, 255, 255), outline=(5, 150, 105), width=3)
    draw.rounded_rectangle([640, 120, 1140, 180], radius=15, fill=(5, 150, 105))
    draw.text((660, 140), "PESOS EM INT8 QUANTIZADO (Discreto)", fill=(255, 255, 255))
    draw.text((660, 210), "• Inteiro de 8 bits: 1 byte por peso (-75% RAM)\n• Grade uniforme discreta: [-128, +127]\n• Tamanho comprimido: 4.1 MB\n• Latência NPU: 18 ms / inferência (-78%)\n• Consumo: 0.41 mWh (-77% de energia)\n• Execução direta em DSP/NPU via NNAPI", fill=(15, 23, 42))

    # Central Equation Box
    draw.rounded_rectangle([150, 470, 1050, 590], radius=15, fill=(241, 245, 249), outline=(8, 145, 178), width=3)
    draw.text((180, 495), "Fórmula de Mapeamento Afim:  r ≈ S · (q - Z)   <=>   q = round(r / S) + Z", fill=(8, 145, 178))
    draw.text((180, 535), "S = (valor_max - valor_min) / 255   (Scale Factor)  |  Z = -round(valor_min / S) - 128  (Zero-Point)", fill=(15, 23, 42))

    img.save('imagens/fig_quantizacao_neural.png')

# 5. Doze Mode e Dreno Vampiro
def draw_doze_mode():
    img, draw = create_base(1200, 680, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "CICLO DE VIDA DO DOZE MODE vs DRENO VAMPIRO (WAKELOCK LEAK)", fill=(255, 255, 255))

    # Graph Area
    draw.line([(100, 480), (1100, 480)], fill=(15, 23, 42), width=3) # Eixo X (Tempo)
    draw.line([(100, 130), (100, 480)], fill=(15, 23, 42), width=3)  # Eixo Y (Potência mW)

    draw.text((100, 100), "Potência (mW)", fill=(15, 23, 42))
    draw.text((1040, 495), "Tempo (Horas)", fill=(15, 23, 42))

    # Leak Curve (Red/Amber)
    leak_pts = [(100, 180), (300, 190), (500, 185), (700, 200), (900, 190), (1100, 195)]
    for i in range(len(leak_pts)-1):
        draw.line([leak_pts[i], leak_pts[i+1]], fill=(225, 29, 72), width=4)
    draw.text((720, 160), "Wakelock Leaked (450 mW constante -> Perda de 35% de Bateria)", fill=(225, 29, 72))

    # Doze Curve (Green)
    doze_pts = [(100, 220), (220, 360), (320, 455), (450, 455), (460, 330), (480, 330), (490, 455), (750, 455), (760, 330), (780, 330), (790, 455), (1100, 455)]
    for i in range(len(doze_pts)-1):
        draw.line([doze_pts[i], doze_pts[i+1]], fill=(5, 150, 105), width=4)
    draw.text((520, 425), "Doze Mode Ativo (8 mW em Deep Sleep + Janelas de Manutenção -> -2.1% Bateria)", fill=(5, 150, 105))

    # Labels
    draw.text((100, 500), "0h (Tela Apaga)", fill=(100, 116, 139))
    draw.text((450, 500), "Manutenção 1", fill=(100, 116, 139))
    draw.text((750, 500), "Manutenção 2", fill=(100, 116, 139))
    draw.text((1050, 500), "8h Manhã", fill=(100, 116, 139))

    # Bottom summary box
    draw.rounded_rectangle([100, 540, 1100, 630], radius=12, fill=(240, 253, 244), outline=(5, 150, 105), width=2)
    draw.text((120, 560), "Conclusão AOSP: Agendar tarefas com WorkManager permite ao sistema consolidar tráfego nas Janelas", fill=(5, 150, 105))
    draw.text((120, 590), "de Manutenção, permitindo que a CPU permaneça em Deep Sleep (C-states) por mais de 96% da noite.", fill=(15, 23, 42))

    img.save('imagens/fig_doze_mode_timeline.png')

# 6. Fronteira de Pareto
def draw_pareto():
    img, draw = create_base(1200, 680, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "FRONTEIRA DE PARETO: OTIMIZAÇÃO MULTIOBJETIVO ENTRE FPS, POTÊNCIA E TÉRMICA", fill=(255, 255, 255))

    # Graph Axes
    draw.line([(120, 500), (1080, 500)], fill=(15, 23, 42), width=3) # Potência mW
    draw.line([(120, 130), (120, 500)], fill=(15, 23, 42), width=3)  # FPS

    draw.text((120, 100), "Taxa de Quadros - FPS (Maximizar)", fill=(15, 23, 42))
    draw.text((850, 515), "Potência Dissipada - mW (Minimizar)", fill=(15, 23, 42))

    # Pareto Optimal Curve
    curve_pts = [
        (200, 440, "30 FPS @ 320 mW (Ultra Eco)"),
        (380, 360, "45 FPS @ 580 mW (Leitura)"),
        (580, 280, "60 FPS @ 920 mW (Sweet Spot Seldon)"),
        (820, 200, "90 FPS @ 1750 mW (Fluidez Alta)"),
        (1020, 150, "120 FPS @ 3600 mW (Gaming Extremo)")
    ]

    # Draw curve
    for i in range(len(curve_pts)-1):
        x1, y1, _ = curve_pts[i]
        x2, y2, _ = curve_pts[i+1]
        draw.line([(x1, y1), (x2, y2)], fill=(124, 58, 237), width=4)

    # Draw points
    for x, y, label in curve_pts:
        draw.ellipse([x-8, y-8, x+8, y+8], fill=(5, 150, 105), outline=(255, 255, 255), width=2)
        draw.text((x + 12, y - 8), label, fill=(15, 23, 42))

    # Suboptimal points
    sub_pts = [
        (650, 340, "Subótimo Dominado A (45 FPS @ 1400 mW)"),
        (850, 310, "Subótimo Dominado B (60 FPS @ 2200 mW)")
    ]
    for x, y, label in sub_pts:
        draw.ellipse([x-8, y-8, x+8, y+8], fill=(225, 29, 72), outline=(255, 255, 255), width=2)
        draw.text((x + 12, y - 8), label, fill=(225, 29, 72))
        draw.line([(x, y), (580, 280)], fill=(225, 29, 72), width=2) # dashed link to dominant

    # Explanation
    draw.rounded_rectangle([120, 560, 1080, 640], radius=12, fill=(245, 243, 255), outline=(124, 58, 237), width=2)
    draw.text((140, 580), "Algoritmo NSGA-II: Nenhuma configuração na linha roxa pode ser melhorada sem degradar outro parâmetro.", fill=(124, 58, 237))
    draw.text((140, 608), "Soluções em vermelho são 'dominadas': gastam mais energia sem entregar ganho proporcional de quadros.", fill=(15, 23, 42))

    img.save('imagens/fig_pareto_multiobjetivo.png')

# Run all
draw_metodologia()
draw_aosp_architecture()
draw_binder_ipc()
draw_quantization()
draw_doze_mode()
draw_pareto()
print("Todas as 6 imagens técnicas foram geradas com sucesso em imagens/")
