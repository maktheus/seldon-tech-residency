"""
=============================================================================
Seldon Tech Residency - Módulo 3: Segurança Móvel
Projeto: Framework de Auditoria de Vulnerabilidades "Seldon Fortress"
Arquivo: manifest_auditor.py
=============================================================================
Auditor estático de segurança para AndroidManifest.xml.
"""

import xml.etree.ElementTree as ET
from typing import Dict, List, Any


class ManifestAuditor:
    """Analisa arquivos AndroidManifest.xml identificando falhas de segurança críticas."""
    
    CRITICAL_PERMISSIONS = {
        "android.permission.SYSTEM_ALERT_WINDOW": "Permite sobreposição de tela (Ataque Tapjacking)",
        "android.permission.WRITE_SETTINGS": "Permite alterar configurações globais do sistema",
        "android.permission.READ_LOGS": "Permite leitura de logs confidenciais de outras aplicações",
        "android.permission.MOUNT_UNMOUNT_FILESYSTEMS": "Acesso direto a subsistema de arquivos em bloco"
    }

    @classmethod
    def audit_manifest_string(cls, xml_content: str) -> Dict[str, Any]:
        findings: List[Dict[str, str]] = []
        try:
            root = ET.fromstring(xml_content)
        except ET.ParseError as e:
            return {"error": f"Erro de sintaxe no XML do Manifest: {str(e)}", "risk_score": 100}

        app_node = root.find("application")
        if app_node is None:
            return {"error": "Tag <application> não encontrada.", "risk_score": 50}

        # 1. Auditoria de android:debuggable
        debuggable = app_node.attrib.get("{http://schemas.android.com/apk/res/android}debuggable", "false")
        if debuggable.lower() == "true":
            findings.append({
                "severity": "CRITICAL",
                "component": "application",
                "issue": "android:debuggable='true' detectado em artefato.",
                "mitigation": "Defina android:debuggable='false' em builds release."
            })

        # 2. Auditoria de android:allowBackup
        allow_backup = app_node.attrib.get("{http://schemas.android.com/apk/res/android}allowBackup", "true")
        if allow_backup.lower() == "true":
            findings.append({
                "severity": "MEDIUM",
                "component": "application",
                "issue": "android:allowBackup='true' permite extração de banco de dados via adb backup.",
                "mitigation": "Defina android:allowBackup='false' ou configure regras de backup_rules."
            })

        # 3. Auditoria de Componentes Exportados (Activities, Services, Receivers, Providers)
        component_tags = ["activity", "service", "receiver", "provider"]
        for tag in component_tags:
            for elem in app_node.findall(tag):
                name = elem.attrib.get("{http://schemas.android.com/apk/res/android}name", "Unknown")
                exported = elem.attrib.get("{http://schemas.android.com/apk/res/android}exported", None)
                permission = elem.attrib.get("{http://schemas.android.com/apk/res/android}permission", None)
                intent_filters = elem.findall("intent-filter")

                # Se tem intent-filter no Android antigo, default era exported=true
                is_exported = False
                if exported is not None:
                    is_exported = exported.lower() == "true"
                elif len(intent_filters) > 0:
                    is_exported = True

                if is_exported and not permission:
                    severity = "CRITICAL" if tag == "provider" else "HIGH"
                    findings.append({
                        "severity": severity,
                        "component": f"{tag}: {name}",
                        "issue": f"{tag.capitalize()} exportado publicamente sem proteção de permissão explícita.",
                        "mitigation": "Defina android:exported='false' ou declare android:permission."
                    })

        # 4. Auditoria de Permissões Críticas Solicitadas
        for perm_node in root.findall("uses-permission"):
            perm_name = perm_node.attrib.get("{http://schemas.android.com/apk/res/android}name", "")
            if perm_name in cls.CRITICAL_PERMISSIONS:
                findings.append({
                    "severity": "MEDIUM",
                    "component": f"uses-permission: {perm_name}",
                    "issue": cls.CRITICAL_PERMISSIONS[perm_name],
                    "mitigation": "Remova a permissão se desnecessária ou confira se o app é assinado pela plataforma."
                })

        # Cálculo do Risk Score (0 = seguro, 100 = crítico)
        score = sum(30 if f["severity"] == "CRITICAL" else (15 if f["severity"] == "HIGH" else 5) for f in findings)
        risk_score = min(100, score)

        return {
            "risk_score": risk_score,
            "status": "VULNERABLE" if risk_score > 30 else ("WARNING" if risk_score > 0 else "SECURE"),
            "findings_count": len(findings),
            "findings": findings
        }
