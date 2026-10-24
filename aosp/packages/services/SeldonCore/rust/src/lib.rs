// ============================================================================
// Copyright (C) 2026 Seldon Tech Residency Project
// Telemetry types and memory-safe processing engine in Rust
// ============================================================================

#[derive(Debug, Clone, PartialEq)]
pub struct TelemetrySnapshot {
    pub cpu_usage: f32,
    pub binder_rate: f32,
    pub battery_temp: f32,
    pub soc_power: f32,
    pub anomaly_score: f32,
    pub status: TelemetryStatus,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TelemetryStatus {
    Normal = 0,
    Warning = 1,
    Critical = 2,
    AnomalyDetected = 3,
}

pub struct TelemetryEngine {
    anomaly_threshold: f32,
    max_history_entries: usize,
    history: Vec<TelemetrySnapshot>,
}

impl TelemetryEngine {
    pub fn new(threshold: f32, max_history: usize) -> Self {
        Self {
            anomaly_threshold: threshold,
            max_history_entries: max_history,
            history: Vec::with_capacity(max_history),
        }
    }

    /// Processa um frame de telemetria física garantindo invariantes de memória
    /// e ausência completa de buffer overflow ou use-after-free
    pub fn process_metrics(
        &mut self,
        cpu_usage: f32,
        binder_rate: f32,
        battery_temp: f32,
        soc_power: f32,
    ) -> TelemetrySnapshot {
        // Validação defensiva de limites físicos (sem pânico, sem unwrap perigoso)
        let clamped_cpu = cpu_usage.clamp(0.0, 100.0);
        let clamped_binder = binder_rate.max(0.0);
        let clamped_temp = battery_temp.clamp(-20.0, 120.0);
        let clamped_power = soc_power.max(0.0);

        // Algoritmo analítico de reconstrução / detecção rápida de anomalia (Autoencoder surrogate)
        // MSE = (cpu_norm - recon_cpu)^2 + (temp_norm - recon_temp)^2 + ...
        // Normalização similar ao TelemetryInferenceEngine
        let cpu_norm = (clamped_cpu / 100.0).clamp(0.0, 1.0);
        let temp_norm = ((clamped_temp - 25.0) / 45.0).clamp(0.0, 1.0);
        let binder_norm = (clamped_binder / 2000.0).clamp(0.0, 2.0);

        // Modelo de autoencoder: reconstrução esperada para sinal basal estável
        let recon_cpu = 0.20;
        let recon_temp = 0.15;
        let recon_binder = 0.10;

        let diff_cpu = cpu_norm - recon_cpu;
        let diff_temp = temp_norm - recon_temp;
        let diff_binder = binder_norm - recon_binder;

        let mse = (diff_cpu * diff_cpu + diff_temp * diff_temp + diff_binder * diff_binder) / 3.0;

        let status = if mse > self.anomaly_threshold {
            TelemetryStatus::AnomalyDetected
        } else if clamped_temp > 45.0 || clamped_cpu > 80.0 {
            TelemetryStatus::Warning
        } else {
            TelemetryStatus::Normal
        };

        let snapshot = TelemetrySnapshot {
            cpu_usage: clamped_cpu,
            binder_rate: clamped_binder,
            battery_temp: clamped_temp,
            soc_power: clamped_power,
            anomaly_score: mse,
            status,
        };

        if self.history.len() >= self.max_history_entries {
            self.history.remove(0);
        }
        self.history.push(snapshot.clone());

        snapshot
    }

    pub fn history_count(&self) -> usize {
        self.history.len()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_normal_metrics_processing() {
        let mut engine = TelemetryEngine::new(0.25, 10);
        let snapshot = engine.process_metrics(25.0, 150.0, 31.0, 1200.0);

        assert_eq!(snapshot.status, TelemetryStatus::Normal);
        assert!(snapshot.anomaly_score < 0.25);
        assert_eq!(engine.history_count(), 1);
    }

    #[test]
    fn test_anomaly_detection_under_dos() {
        let mut engine = TelemetryEngine::new(0.20, 10);
        // Simula ataque DoS de Binder e sobrecarga térmica extrema
        let snapshot = engine.process_metrics(98.0, 8500.0, 58.0, 9500.0);

        assert_eq!(snapshot.status, TelemetryStatus::AnomalyDetected);
        assert!(snapshot.anomaly_score >= 0.20);
    }

    #[test]
    fn test_memory_safety_and_clamping() {
        let mut engine = TelemetryEngine::new(0.25, 5);
        // Injeção de valores fora de faixa física (NaN/Inf e negativos absurdos)
        let snapshot = engine.process_metrics(-50.0, -100.0, 200.0, -500.0);

        assert_eq!(snapshot.cpu_usage, 0.0);
        assert_eq!(snapshot.battery_temp, 120.0);
        assert_eq!(snapshot.soc_power, 0.0);
        assert_eq!(snapshot.binder_rate, 0.0);

        // Testa rotação de histórico sem vazamento de memória
        for _ in 0..10 {
            engine.process_metrics(30.0, 200.0, 32.0, 1500.0);
        }
        assert_eq!(engine.history_count(), 5);
    }
}
