"""
=============================================================================
Gerador do PDF Oficial do Desafio de Seleção Seldon 2026
Gera: public/desafio_tecnico_seldon_2026.pdf
=============================================================================
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch


def create_desafio_pdf(output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=45,
        leftMargin=45,
        topMargin=45,
        bottomMargin=45
    )

    styles = getSampleStyleSheet()

    # Cores da identidade visual Seldon
    c_primary = colors.HexColor("#0891B2")     # Cyan Seldon
    c_secondary = colors.HexColor("#7C3AED")   # Violet
    c_dark = colors.HexColor("#0F172A")        # Dark slate
    c_accent = colors.HexColor("#059669")      # Green
    c_amber = colors.HexColor("#D97706")       # Amber
    c_bg_light = colors.HexColor("#F8FAFC")

    # Estilos customizados
    title_style = ParagraphStyle(
        "DocTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=20,
        leading=24,
        textColor=c_dark,
        alignment=1, # Centralizado
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        "DocSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=c_primary,
        alignment=1,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        "Heading1_Custom",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=18,
        textColor=c_primary,
        spaceBefore=12,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        "Heading2_Custom",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=15,
        textColor=c_secondary,
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        "Body_Custom",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor("#334155"),
        spaceAfter=6
    )

    callout_style = ParagraphStyle(
        "Callout_Custom",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#1E293B")
    )

    code_style = ParagraphStyle(
        "Code_Custom",
        parent=styles["Normal"],
        fontName="Courier",
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0F172A")
    )

    story = []

    # --- CABEÇALHO ---
    story.append(Paragraph("RESIDÊNCIA TECNOLÓGICA SELDON 2026", title_style))
    story.append(Paragraph("Manual Oficial do Desafio Técnico Prático: Mini-Seldon Core", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=c_primary, spaceAfter=12))

    # --- QUADRO INFORMATIVO DE PRAZOS & CRONOGRAMA ---
    cronograma_data = [
        [Paragraph("<b>Etapa</b>", body_style), Paragraph("<b>Data / Prazo</b>", body_style), Paragraph("<b>Objetivo</b>", body_style)],
        [Paragraph("Disparo do Desafio", body_style), Paragraph("Hoje à Tarde", body_style), Paragraph("Envio do Starter Kit (.zip) para os candidatos", body_style)],
        [Paragraph("<b>Prazo Final de Entrega</b>", body_style), Paragraph("<b>Terça-feira, 23:59</b>", body_style), Paragraph("Submissão do código no GitHub / Zip + Ficha de 1 página", body_style)],
        [Paragraph("Triagem Automatizada", body_style), Paragraph("Quarta-feira (Manhã)", body_style), Paragraph("Execução da suíte de 15 testes em lote", body_style)],
        [Paragraph("Entrevistas Técnicas", body_style), Paragraph("Quarta e Quinta-feira", body_style), Paragraph("Banca individual (15 min) para defesa das soluções", body_style)],
        [Paragraph("Resultado Final", body_style), Paragraph("Quinta-feira, 18:00", body_style), Paragraph("Divulgação dos 20 a 25 titulares antes do feriado", body_style)]
    ]
    t_crono = Table(cronograma_data, colWidths=[1.8*inch, 1.8*inch, 3.4*inch])
    t_crono.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E0F2FE")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_crono)
    story.append(Spacer(1, 10))

    # --- NOTA DE ESCLARECIMENTO DE ESCOPO & Z3 ---
    nota_z3 = [
        [Paragraph("<b>⚠️ NOTA OFICIAL DE ESCOPO & DELIMITAÇÃO TÉCNICA:</b><br/>"
                   "O teste prático de admissão compreende <b>exclusivamente as 3 tarefas guiadas em Python puro</b> descritas neste manual (tempo estimado de execução: 2 a 4 horas). "
                   "Tópicos de fronteira de pesquisa e sistemas profundos exibidos na plataforma interativa (como o provador de teoremas <b>Microsoft Z3</b>, daemons em <b>Rust AOSP</b>, virtualizadores <b>NimBLE</b> e compilação completa do Android 15) representam avanços científicos que <b>entraram como evolução posterior da residência</b> e serão ensinados do zero durante as <b>435 horas de especialização</b>. "
                   "Eles <b>NÃO</b> são pré-requisito e <b>NÃO</b> fazem parte das exigências para entrega nesta terça-feira.", callout_style)]
    ]
    t_nota = Table(nota_z3, colWidths=[7.0*inch])
    t_nota.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FEF3C7")),
        ('BOX', (0,0), (-1,-1), 1, c_amber),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_nota)
    story.append(Spacer(1, 10))

    # --- 1. VISÃO GERAL DO STARTER KIT ---
    story.append(Paragraph("1. Estrutura do Desafio & Starter Kit (80% Pré-Construído)", h1_style))
    story.append(Paragraph(
        "Para garantir foco no raciocínio algorítmico e mitigar atritos de configuração de ambiente, o candidato recebe a arquitetura <b>SeldonCore</b> praticamente pronta. "
        "Não é necessária a instalação de bibliotecas externas via <code>pip</code> — todo o código opera sobre a biblioteca padrão do <b>Python 3.8+</b> (<code>unittest</code>, <code>math</code>, <code>time</code>, <code>dataclasses</code>).",
        body_style
    ))

    story.append(Paragraph(
        "<b>Estrutura de Arquivos Fornecida:</b><br/>"
        "• <code>seldon_core/telemetry.py</code>: Estrutura de dados canônica <code>TelemetryFrame</code>.<br/>"
        "• <code>seldon_core/security_guard.py</code>: [TAREFA 1] Guardião de segurança IPC Binder.<br/>"
        "• <code>seldon_core/anomaly_detector.py</code>: [TAREFA 2] Cálculo de MSE e detecção de anomalias.<br/>"
        "• <code>seldon_core/power_tuner.py</code>: [TAREFA 3] Gerenciador de perfis térmicos e DVFS.<br/>"
        "• <code>tests/test_desafio.py</code>: Suíte oficial contendo 15 testes unitários automatizados.<br/>"
        "• <code>submission_template.md</code>: Ficha de 1 página para fundamentação das escolhas na entrevista.",
        body_style
    ))

    # --- 2. AS 3 TAREFAS CIRÚRGICAS DO CANDIDATO ---
    story.append(Paragraph("2. As 3 Tarefas Práticas a Implementar", h1_style))

    # Tarefa 1
    story.append(Paragraph("🛡️ Tarefa 1: Guardião de Segurança IPC Binder (seldon_core/security_guard.py)", h2_style))
    story.append(Paragraph(
        "<b>Contexto:</b> No AOSP, o IPC Binder compartilha buffers de memória no kernel Linux. Transações gigantescas causam <i>TransactionTooLargeException</i> e derrubam serviços críticos de sistema.<br/>"
        "<b>Sua Missão:</b> Na função <code>validate_transaction(parcel_size_bytes, transaction_token, timestamp)</code>:<br/>"
        "1. Invocar <code>self.clean_expired_tokens(timestamp)</code> para liberar tokens mais antigos que 60 segundos.<br/>"
        "2. Rejeitar transações com <code>parcel_size_bytes &gt; 800 KB</code> (motivo: <code>BUFFER_OVERFLOW</code>) ou <code>&le; 0</code> (motivo: <code>INVALID_SIZE</code>).<br/>"
        "3. Detectar ataques de repetição: se o token já existe no histórico ativo, rejeitar com <code>REPLAY_ATTACK_DETECTED</code>.<br/>"
        "4. Em caso de aprovação, armazenar o token e aprovar com código <code>APPROVED</code>.",
        body_style
    ))

    # Tarefa 2
    story.append(Paragraph("🧠 Tarefa 2: IA On-Device & Detecção de Anomalias (seldon_core/anomaly_detector.py)", h2_style))
    story.append(Paragraph(
        "<b>Contexto:</b> Telemetria de CPU, jank de renderização e saturação de IPC indicam degradações de sistema. Modelos autoassociativos aprendem o que é comportamento nominal e acusam anomalia através do erro de reconstrução.<br/>"
        "<b>Sua Missão:</b><br/>"
        "1. Implementar <code>calculate_mse(vector_a, vector_b)</code> aplicando a fórmula do Erro Quadrático Médio: "
        "<i>MSE = (1/N) * &Sigma; (a_i - b_i)&sup2;</i> (lançando <code>ValueError</code> para vetores de tamanhos diferentes ou vazios).<br/>"
        "2. Implementar <code>evaluate_frame(frame)</code> orquestrando a normalização, reconstrução simulada, cálculo do MSE e classificação de anomalia contra o limiar <code>self.mse_threshold</code>.",
        body_style
    ))

    # Tarefa 3
    story.append(Paragraph("⚡ Tarefa 3: Otimizador Energético & Térmico (seldon_core/power_tuner.py)", h2_style))
    story.append(Paragraph(
        "<b>Contexto:</b> Navegar na Fronteira de Pareto entre taxa de atualização visual (FPS) e durabilidade de bateria, prevenindo o superaquecimento do silício.<br/>"
        "<b>Sua Missão:</b> Na função <code>select_operating_profile(target_fps, chip_temperature_c, battery_level_percent)</code>:<br/>"
        "1. <b>Emergência:</b> Se temperatura &gt; 48.0°C OU bateria &le; 15.0%, forçar imediatamente <code>THERMAL_EMERGENCY</code> (30 FPS).<br/>"
        "2. <b>Performance:</b> Se target_fps &ge; 120, conceder <code>PERFORMANCE</code> somente se bateria &gt; 30% e temperatura &le; 42.0°C (caso contrário, fallback para <code>BALANCED</code>).<br/>"
        "3. <b>Balanced:</b> Se target_fps entre 61 e 119, conceder <code>BALANCED</code> se temperatura &le; 45°C e bateria &gt; 20% (senão, fallback para <code>ECO</code>).<br/>"
        "4. <b>Eco:</b> Para target_fps &le; 60, selecionar <code>ECO</code>.",
        body_style
    ))

    # --- 3. VALIDAÇÃO LOCAL & SUBMISSÃO ---
    story.append(Paragraph("3. Validação Automatizada dos Testes Unitários", h1_style))
    story.append(Paragraph(
        "Em seu terminal, no diretório raiz do Starter Kit, execute o comando nativo do Python:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<b><code>python -m unittest tests/test_desafio.py -v</code></b><br/>"
        "Quando sua implementação estiver correta, todos os <b>15 testes unitários</b> serão aprovados com a mensagem <code>OK</code>.",
        body_style
    ))

    # --- 4. RUBRICA DA BANCA & ROTEIRO DE ENTREVISTAS ---
    story.append(Paragraph("4. Matriz de Avaliação & Entrevistas Técnicas (Quarta e Quinta)", h1_style))
    
    rubrica_data = [
        [Paragraph("<b>Critério de Avaliação</b>", body_style), Paragraph("<b>Peso</b>", body_style), Paragraph("<b>Aspectos Observados pela Banca</b>", body_style)],
        [Paragraph("1. Testes Automatizados", body_style), Paragraph("<b>40 pts</b>", body_style), Paragraph("Sucesso na execução dos 15 testes unitários (critério eliminatório)", body_style)],
        [Paragraph("2. Qualidade e Rigor de Código", body_style), Paragraph("<b>30 pts</b>", body_style), Paragraph("Legibilidade, conformidade com PEP 8, tratamento de erros e ficha técnica", body_style)],
        [Paragraph("3. Entrevista Técnica Individual", body_style), Paragraph("<b>30 pts</b>", body_style), Paragraph("Arguição de 15 minutos: defesa das soluções, domínio autoral e clareza", body_style)],
        [Paragraph("<b>Total Máximo</b>", body_style), Paragraph("<b>100 pts</b>", body_style), Paragraph("Classificação dos 20 a 25 titulares para a turma de 2026", body_style)]
    ]
    t_rub = Table(rubrica_data, colWidths=[2.2*inch, 1.0*inch, 3.8*inch])
    t_rub.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_rub)
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "<b>Roteiro das Entrevistas Técnicas (15 minutos com Matheus + Coordenação):</b><br/>"
        "• <i>Min 00-02:</i> Boas-vindas e introdução.<br/>"
        "• <i>Min 02-05:</i> O candidato compartilha a tela e executa os 15 testes automatizados.<br/>"
        "• <i>Min 05-12:</i> Arguição técnica (Trade-offs de IPC Binder, normalização e MSE de anomalias, comportamento da Fronteira de Pareto em alta temperatura).<br/>"
        "• <i>Min 12-15:</i> Perguntas sobre alinhamento com a residência e disponibilidade de horário.",
        body_style
    ))

    doc.build(story)
    print(f"PDF gerado com sucesso em: {output_path}")


if __name__ == "__main__":
    out = "seldon-tech-residency/public/desafio_tecnico_seldon_2026.pdf"
    create_desafio_pdf(out)
