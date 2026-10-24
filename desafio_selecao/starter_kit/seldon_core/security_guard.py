"""
=============================================================================
Seldon Tech Residency - Desafio de Seleção (Módulo de Segurança)
Arquivo: security_guard.py
=============================================================================
Monitor de segurança e validação de transações IPC Binder contra corrupção,
ataques de repetição (Replay Attacks) e exaustão de buffer (DoS).
"""

from typing import Dict, Any, Set
import time


class SecurityViolationError(Exception):
    """Exceção levantada quando uma transação viola as regras de segurança."""
    pass


class BinderSecurityGuard:
    """
    Guardião de segurança responsável por inspecionar transações IPC antes do
    despacho aos serviços centrais do sistema.
    """

    # Limite máximo de tamanho do payload seguro (800 KB = 819.200 bytes)
    MAX_PARCEL_BYTES: int = 800 * 1024
    
    # Janela temporal para retenção de tokens de transação (em segundos)
    REPLAY_CACHE_TTL_SECONDS: float = 60.0

    def __init__(self):
        # Dicionário mapeando {token: timestamp_em_segundos}
        self.seen_tokens: Dict[str, float] = {}
        self.rejected_count: int = 0
        self.approved_count: int = 0

    def clean_expired_tokens(self, current_time: float) -> None:
        """Remove da memória tokens mais antigos que a janela de expiração."""
        expired = [
            token for token, timestamp in self.seen_tokens.items()
            if current_time - timestamp > self.REPLAY_CACHE_TTL_SECONDS
        ]
        for token in expired:
            del self.seen_tokens[token]

    def validate_transaction(
        self,
        parcel_size_bytes: int,
        transaction_token: str,
        timestamp: float
    ) -> Dict[str, Any]:
        """
        =======================================================================
        TODO (CANDIDATO - TAREFA 1): Implemente a lógica de validação abaixo.
        =======================================================================
        Regras obrigatórias:
        1. Limpar tokens expirados chamando `self.clean_expired_tokens(timestamp)`.
        
        2. Verificação de Tamanho:
           - Se `parcel_size_bytes` for maior que `self.MAX_PARCEL_BYTES`, a transação
             deve ser REJEITADA.
           - Se `parcel_size_bytes` for menor ou igual a 0, a transação deve ser REJEITADA.
           - Ação esperada: Incrementar `self.rejected_count` e retornar:
             {
                 "allowed": False,
                 "reason": "BUFFER_OVERFLOW" se > MAX_PARCEL_BYTES senão "INVALID_SIZE",
                 "status_code": 400
             }

        3. Prevenção de Ataque de Repetição (Replay Attack):
           - Se `transaction_token` já estiver presente em `self.seen_tokens` e não estiver expirado:
             A transação deve ser REJEITADA.
           - Ação esperada: Incrementar `self.rejected_count` e retornar:
             {
                 "allowed": False,
                 "reason": "REPLAY_ATTACK_DETECTED",
                 "status_code": 403
             }

        4. Se passar em todas as checagens:
           - Registrar o token em `self.seen_tokens[transaction_token] = timestamp`.
           - Incrementar `self.approved_count`.
           - Retornar:
             {
                 "allowed": True,
                 "reason": "APPROVED",
                 "status_code": 200
             }
        """
        # --- INÍCIO DA SUA IMPLEMENTAÇÃO (Remova ou substitua as linhas abaixo) ---
        raise NotImplementedError("Candidato deve implementar a função validate_transaction!")
        # --- FIM DA SUA IMPLEMENTAÇÃO ---
