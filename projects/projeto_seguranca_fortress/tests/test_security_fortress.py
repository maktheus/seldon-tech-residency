"""
=============================================================================
Seldon Tech Residency - Suíte de Testes Unitários: Projeto de Segurança Móvel
Arquivo: test_security_fortress.py
=============================================================================
"""

import unittest
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from scanner.manifest_auditor import ManifestAuditor
from ipc_fuzzer.binder_guard import BinderTransactionGuard
from sepolicy_auditor.selinux_checker import SELinuxPolicyAuditor


class TestSecurityFortress(unittest.TestCase):

    def test_vulnerable_manifest_detection(self):
        """Manifest com ContentProvider exportado e debuggable deve ser classificado como VULNERABLE."""
        vuln_xml = """<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.insecure.app">
            <application android:debuggable="true" android:allowBackup="true">
                <provider android:name=".UserDataProvider" android:exported="true" android:authorities="com.insecure.data" />
                <activity android:name=".AdminActivity" android:exported="true">
                    <intent-filter>
                        <action android:name="android.intent.action.VIEW" />
                    </intent-filter>
                </activity>
            </application>
        </manifest>"""
        res = ManifestAuditor.audit_manifest_string(vuln_xml)
        self.assertEqual(res["status"], "VULNERABLE")
        self.assertGreaterEqual(res["risk_score"], 60)
        self.assertGreater(res["findings_count"], 0)

    def test_hardened_manifest_compliance(self):
        """Manifest endurecido com componentes não-exportados e permissões fechadas."""
        secure_xml = """<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.secure.app">
            <application android:debuggable="false" android:allowBackup="false">
                <provider android:name=".UserDataProvider" android:exported="false" android:authorities="com.secure.data" />
                <activity android:name=".MainActivity" android:exported="false" />
            </application>
        </manifest>"""
        res = ManifestAuditor.audit_manifest_string(secure_xml)
        self.assertEqual(res["status"], "SECURE")
        self.assertEqual(res["risk_score"], 0)
        self.assertEqual(res["findings_count"], 0)

    def test_binder_guard_rejects_oversized_parcel(self):
        """Binder Guard deve abortar transação acima de 800 KB."""
        guard = BinderTransactionGuard()
        res = guard.validate_transaction(parcel_bytes=900 * 1024, transaction_code=1, token="tok_1")
        self.assertFalse(res["allowed"])
        self.assertEqual(res["action"], "DROP_TRANSACTION")

    def test_binder_guard_prevents_replay_attack(self):
        """Reenvio de transação com mesmo token deve ser identificado como ataque de repetição."""
        guard = BinderTransactionGuard()
        res1 = guard.validate_transaction(parcel_bytes=1024, transaction_code=2, token="unique_token_xyz")
        self.assertTrue(res1["allowed"])

        res2 = guard.validate_transaction(parcel_bytes=1024, transaction_code=2, token="unique_token_xyz")
        self.assertFalse(res2["allowed"])
        self.assertEqual(res2["action"], "FLAG_MALICIOUS_CALLER")

    def test_selinux_neverallow_violation_detection(self):
        """Auditor de SELinux deve pegar regra ilegal de escrita em system_file."""
        illegal_policy = """
        # Regra maliciosa de escalonamento
        type bad_daemon, domain;
        allow bad_daemon system_file:file { write execute };
        permissive bad_daemon;
        """
        audit = SELinuxPolicyAuditor.audit_policy_text(illegal_policy)
        self.assertFalse(audit["is_secure"])
        self.assertEqual(audit["violations_count"], 2)


if __name__ == "__main__":
    unittest.main()
