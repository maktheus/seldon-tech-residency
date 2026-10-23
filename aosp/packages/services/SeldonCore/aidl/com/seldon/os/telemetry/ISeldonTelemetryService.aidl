// ============================================================================
// Copyright (C) 2026 Seldon Tech Residency Project
// Interface AIDL: ISeldonTelemetryService
// Comunicação Inter-Processos (IPC) via Binder NDK para Android 15 (API 35)
// ============================================================================

package com.seldon.os.telemetry;

/**
 * Interface de telemetria e controle de baixo nível para o Seldon OS Daemon.
 * Suporta os requisitos dos módulos de Inteligência Artificial, Segurança e Energia.
 */
@VintfStability
interface ISeldonTelemetryService {
    /**
     * Retorna o consumo instantâneo de energia em microWatts (uW).
     */
    long getInstantPowerMicroWatts();

    /**
     * Retorna a margem térmica atual (headroom térmico) antes de ocorrer throttling.
     * @param forecastSeconds Janela de previsão em segundos (ex: 10s).
     * @return Valor normalizado de 0.0 (frio) a 1.0 (throttling iminente).
     */
    float getThermalHeadroom(in int forecastSeconds);

    /**
     * Ativa ou ajusta a política de quantização dinâmica para inferência neural.
     * @param targetBitWidth Largura de bit desejada (ex: 8 para INT8, 4 para INT4).
     * @return true se a política foi aceita pelo HAL neural.
     */
    boolean setDynamicQuantizationPolicy(in int targetBitWidth);

    /**
     * Aplica uma regra de mitigação de vulnerabilidade ou isolamento de processo no kernel.
     * @param hardeningToken Token criptográfico de autenticação do chamador.
     * @param policyFlags Máscara de bits com os flags de endurecimento (CFI, SafeStack, BTI).
     * @return Código de status de aplicação da política (0 = sucesso).
     */
    int enforceHardeningPolicy(in byte[] hardeningToken, in int policyFlags);

    /**
     * Obtém o contador de transações Binder por segundo para detecção de anomalias/DDoS IPC.
     */
    long getBinderTransactionRate();
}
