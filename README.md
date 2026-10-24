# ⚡ Seldon Tech Residency | Plataforma Interativa 3D

Plataforma educacional imersiva com visualizações 3D (Three.js), motion design (Framer Motion) e simuladores em tempo real para os 4 módulos formativos do **Programa de Residência Tecnológica Seldon** (435 horas totais de especialização em Android AOSP, Inteligência Artificial, Cibersegurança e Otimização Energética).

Conteúdo extraído e estruturado a partir do documento oficial `Módulos - Seldon.docx`.

---

## 🚀 Experiências Interativas & Recursos

- **🌐 Holograma 3D Central (Seldon Core)**: Núcleo orbital e nós interativos reagindo ao cursor e cliques.
- **📱 Android Architecture Exploder 3D (Módulo 1 - Núcleo Comum - 210h)**: Decomposição em 3D das camadas do AOSP (Linux Kernel, HAL, ART/Binder, Framework e Aplicações) com inspeção interativa.
- **🧠 Neural Core & Quantization Lab 3D (Módulo 2 - IA & Otimização - 75h)**: Visualização da rede neural on-device com alternância em tempo real entre FP32, FP16 e INT8, demonstrando impacto na latência (ms), memória RAM e aceleração por NPU/NNAPI.
- **🛡️ Android Security Fortress 3D (Módulo 3 - Segurança Móvel - 75h)**: Modelo tridimensional com a defesa em profundidade do Android (Hardware Keystore StrongBox, políticas SELinux Mandatory Access Control, Sandbox por UID e Verified Boot AVB 2.0).
- **⚡ SoC Thermal & Power Core 3D (Módulo 4 - Eficiência Energética - 75h)**: Processador de silício 3D com zonas térmicas (big.LITTLE, GPU, NPU) e dissipação de calor em perfis de carga reais.
- **🔄 Simulador IPC Binder**: Passo a passo animado do fluxo de chamada entre processos com zero-copy memory mapping via `/dev/binder`.
- **🌙 Simulador Doze Mode & Wakelocks**: Comparação interativa entre dreno vampiro por `WakeLock` mal gerenciado (-35% em 8h) vs agendamento limpo com `WorkManager` (-2% em 8h).
- **📊 Otimizador Multiobjetivo da Fronteira de Pareto**: Trade-off interativo entre Taxa de Quadros (FPS), Potência Dissipada (mW) e Temperatura do SoC (°C).
- **🔍 Modelagem de Ameaças & Hardening AOSP**: Auditoria de componentes expostos com teste de exploit e aplicação de mitigações de segurança.
- **🏆 Desafio Interativo (Quiz com Confetti)**: Questões pedagógicas com justificativas técnicas detalhadas para fixação de cada assunto.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- **Gráficos 3D**: [Three.js](https://threejs.org/)
- **Motion & Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Efeitos de Celebração**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **CI/CD & Deploy**: GitHub Actions + GitHub Pages

---


---

## 🎯 Processo Seletivo 2026: Desafio Prático "Mini-Seldon"

Para a admissão de novos residentes, o repositório disponibiliza um pacote estruturado e simplificado de avaliação prática:

- 📁 **Diretório do Desafio:** [`desafio_selecao/`](./desafio_selecao/)
- 📦 **Pacote Pronto para Envio aos Candidatos:** [`starter_kit_seldon_2026.zip`](./desafio_selecao/starter_kit_seldon_2026.zip)
- 📖 **Instruções para o Candidato:** [`desafio_selecao/starter_kit/README.md`](./desafio_selecao/starter_kit/README.md)
- 📝 **Ficha de Submissão para Entrevista:** [`submission_template.md`](./desafio_selecao/starter_kit/submission_template.md)
- ⚖️ **Guia da Banca & Perguntas de Entrevista:** [`GUIA_AVALIACAO_E_ENTREVISTA.md`](./desafio_selecao/GUIA_AVALIACAO_E_ENTREVISTA.md)
- ⚡ **Corretor Automatizado em Lote:** `npm run correct:candidates` ou `python desafio_selecao/corrigir_candidatos.py`

```bash
# Executar testes da suíte do desafio de admissão
npm run test:challenge
```

## 📦 Como Executar Localmente

```bash
# Instalar as dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Gerar build estático de produção
npm run build

# Pré-visualizar a build de produção localmente
npm run preview
```

---

## 🌐 Deploy no GitHub Pages

O projeto possui um workflow configurado em `.github/workflows/deploy.yml`. Toda alteração enviada para a branch `master` ou `main` aciona a compilação e publicação automática no GitHub Pages.
