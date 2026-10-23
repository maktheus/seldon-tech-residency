"""
=============================================================================
Seldon Tech Residency - Módulo 3: Segurança Móvel
Arquivo: binder_guard.py
=============================================================================
Monitor de segurança e validação de transações IPC Binder contra corrupção e DoS.
"""

import time
from typing import Dict, Any, List


class BinderTransactionGuard:
    """Valida a integridade de transações Binder antes de atingirem os esqueletos AIDL."""
    
    # O limite do buffer de transação do Binder no kernel Linux é de 1MB por processo
    MAX_PARCEL_SIZE_BYTES = 800 * 1024  # 800 KB segurança
    MAX_TRANSACTIONS_PER_SEC = 500

    def __init__(self):
        self.call_history: List[float] = []
        self.seen_replay_tokens = set()

    def validate_transaction(self, parcel_bytes: int, transaction_code: int, token: str) -> Dict[str, Any]:
        current_time = time.time()
        
        # 1. Checagem de Tamanho de Parcel (Prevenção de TransactionTooLargeException e Heap Overflow)
        if parcel_bytes > self.MAX_PARCEL_SIZE_BYTES:
            return {
                "allowed": False,
                "reason": f"Tamanho da transação ({parcel_bytes} bytes) excede o buffer seguro do Binder.",
                "action": "DROP_TRANSACTION"
            }

        # 2. Prevenção de Ataque de Repetição (Replay Attack)
        if token in self.seen_replay_tokens:
            return {
                "allowed": False,
                "reason": "Token de transação duplicado detectado. Ataque de repetição interceptado.",
                "action": "FLAG_MALICIOUS_CALLER"
            }
        self.seen_replay_tokens.add(token)

        # 3. Rate Limiting contra Ataques de Negação de Serviço (DoS IPC)
        self.call_history = [t for t in self.call_history if current_time - t < 1.0]
        if len(self.call_history) >= self.MAX_TRANSACTIONS_PER_SEC:
            return {
                "allowed": False,
                "reason": "Taxa de transações Binder excedeu 500 trans/s. Throttling ativado.",
                "action": "RATE_LIMIT_CALLER"
            }
        self.call_history.append(current_time)

        return {
            "allowed": True,
            "reason": "Transação Binder íntegra e aprovada pelo Seldon Fortress.",
            "action": "DISPATCH_TO_SERVICE"
        }
