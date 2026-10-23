import os
from PIL import Image, ImageDraw

def create_base(width=1200, height=700, bg_color=(248, 250, 252)):
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    return img, draw

# 7. Fortaleza de Segurança AOSP
def draw_security_fortress():
    img, draw = create_base(1200, 700, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "DEFESA EM PROFUNDIDADE: ARQUITETURA DE SEGURANÇA ANDROID AOSP", fill=(255, 255, 255))

    rings = [
        ("Nível 1: Hardware StrongBox / TEE", "Cofre isolado fisicamente • Chaves criptográficas AES-256 e RSA-4096 • Resistente a extração física e ataques de canal lateral", (5, 150, 105), 110),
        ("Nível 2: Android Verified Boot (AVB 2.0)", "Raiz de confiança de hardware em eFuses • Assinatura RSA do bootloader e kernel • dm-verity com verificação de blocos SHA-256", (8, 145, 178), 220),
        ("Nível 3: SELinux Mandatory Access Control (MAC)", "Modo Enforcing estrito no Kernel • Rotulagem obrigatória de contextos (u:r:untrusted_app) • Bloqueio de elevação de privilégios de root", (124, 58, 237), 330),
        ("Nível 4: Application Sandbox (UIDs Unix)", "Isolamento de processos por usuário único (u0_a142) • Diretórios privados /data/data/<pkg> inacessíveis por outros aplicativos", (59, 130, 246), 440),
        ("Nível 5: Runtime Permissions & Criptografia FBE", "Permissões granulares de runtime para câmera/localização • Criptografia baseada em arquivos (FBE) com chaves CE e DE", (217, 119, 6), 550)
    ]

    for title, desc, color, y in rings:
        draw.rounded_rectangle([60, y, 1140, y + 85], radius=12, fill=(255, 255, 255), outline=color, width=3)
        draw.rounded_rectangle([60, y, 420, y + 85], radius=12, fill=color)
        draw.text((80, y + 32), title, fill=(255, 255, 255))
        draw.text((440, y + 32), desc, fill=(15, 23, 42))

    img.save('imagens/fig_seguranca_fortress.png')

# 8. Linha do Tempo de Trace no Perfetto
def draw_perfetto_trace():
    img, draw = create_base(1200, 680, (248, 250, 252))
    draw.rectangle([0, 0, 1200, 70], fill=(15, 23, 42))
    draw.text((40, 22), "VISUALIZAÇÃO DE TRACE NO PERFETTO: IDENTIFICAÇÃO DE JANK E AGENDAMENTO", fill=(255, 255, 255))

    # Tracks
    tracks = [
        ("CPU 0-3 (LITTLE Cores)", 120, (148, 163, 184)),
        ("CPU 4-7 (Performance Cores)", 200, (148, 163, 184)),
        ("MainThread (doFrame / Choreographer)", 280, (8, 145, 178)),
        ("RenderThread (DrawFrame / Vulkan)", 360, (124, 58, 237)),
        ("Binder:4821_2 (IPC Worker)", 440, (5, 150, 105))
    ]

    for name, y, col in tracks:
        draw.text((40, y + 15), name, fill=(15, 23, 42))
        draw.rectangle([340, y, 1140, y + 55], fill=(241, 245, 249), outline=(203, 213, 225), width=2)

    # Normal Frame (16.6ms)
    draw.rounded_rectangle([360, 285, 520, 330], radius=6, fill=(8, 145, 178))
    draw.text((370, 298), "Choreographer#doFrame (8ms)", fill=(255, 255, 255))
    draw.rounded_rectangle([520, 365, 640, 410], radius=6, fill=(124, 58, 237))
    draw.text((530, 378), "RenderThread (6ms)", fill=(255, 255, 255))

    # VSYNC Line
    draw.line([(680, 100), (680, 520)], fill=(5, 150, 105), width=2)
    draw.text((685, 105), "VSYNC (Deadline 16.6ms)", fill=(5, 150, 105))

    # Jank Frame (Lock Contention no Binder)
    draw.rounded_rectangle([700, 285, 1080, 330], radius=6, fill=(225, 29, 72))
    draw.text((710, 298), "JANK FRAME: MainThread travada esperando IPC síncrono no Binder (34ms!)", fill=(255, 255, 255))
    draw.rounded_rectangle([720, 445, 960, 490], radius=6, fill=(217, 119, 6))
    draw.text((730, 458), "ioctl(BINDER_WRITE_READ) Contention", fill=(255, 255, 255))

    # Summary
    draw.rounded_rectangle([40, 550, 1140, 640], radius=12, fill=(254, 242, 242), outline=(225, 29, 72), width=2)
    draw.text((60, 570), "Diagnóstico Perfetto: A MainThread do app fez uma chamada síncrona ao PackageManager durante a inflagem de visualização.", fill=(225, 29, 72))
    draw.text((60, 600), "Solução: Mover consulta de pacotes para corrotina em background com Dispatchers.IO, restaurando a fluidez a 60 FPS estáveis.", fill=(15, 23, 42))

    img.save('imagens/fig_perfetto_timeline.png')

draw_security_fortress()
draw_perfetto_trace()
print("Imagens adicionais geradas com sucesso!")
