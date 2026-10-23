"""
=============================================================================
Seldon Tech Residency - Módulo 3: Segurança Móvel
Arquivo: selinux_checker.py
=============================================================================
Auditor de regras SELinux (.te) contra permissões perigosas e quebra de neverallows.
"""

import re
from typing import Dict, List, Any


class SELinuxPolicyAuditor:
    """Verifica regras de políticas SELinux procurando violações de isolamento de processo."""

    PROHIBITED_PERMISSIONS = [
        (r"allow\s+untrusted_app\s+.*:file\s+.*write.*", "untrusted_app nunca deve escrever em nós de sistema."),
        (r"allow\s+.*system_file:file\s+.*write.*", "Daemons não devem ter permissão de escrita em system_file."),
        (r"allow\s+.*kmem_device:chr_file.*", "Acesso direto à memória do kernel /dev/kmem é proibido."),
        (r"permissive\s+.*", "Diretiva 'permissive' detectada em produção. Domínio deve rodar em enforcing.")
    ]

    @classmethod
    def audit_policy_text(cls, te_content: str) -> Dict[str, Any]:
        violations = []
        lines = te_content.splitlines()

        for idx, line in enumerate(lines, start=1):
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue

            for pattern, msg in cls.PROHIBITED_PERMISSIONS:
                if re.search(pattern, stripped):
                    violations.append({
                        "line": idx,
                        "rule": stripped,
                        "violation": msg,
                        "severity": "CRITICAL"
                    })

        return {
            "is_secure": len(violations) == 0,
            "violations_count": len(violations),
            "violations": violations
        }
