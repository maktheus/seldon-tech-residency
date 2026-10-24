"""
=============================================================================
Seldon Tech Residency - Script de Correção Automatizada em Lote
Arquivo: corrigir_candidatos.py
=============================================================================
Uso pela Banca Avaliadora:
    python corrigir_candidatos.py --submissions_dir ./entregas_candidatos
=============================================================================
"""

import os
import sys
import argparse
import unittest
import io
from typing import Dict, Any, List


def evaluate_candidate_folder(candidate_path: str, tests_path: str) -> Dict[str, Any]:
    """Executa a suíte de testes unitários sobre a pasta de código do candidato."""
    candidate_name = os.path.basename(candidate_path)
    
    # Adiciona a pasta do candidato ao sys.path temporariamente
    if candidate_path not in sys.path:
        sys.path.insert(0, candidate_path)

    # Carrega os testes
    loader = unittest.TestLoader()
    suite = loader.discover(tests_path, pattern="test_*.py")
    
    # Redireciona stdout/stderr para não poluir
    stream = io.StringIO()
    runner = unittest.TextTestRunner(stream=stream, verbosity=0)
    result = runner.run(suite)

    # Remove do sys.path
    if candidate_path in sys.path:
        sys.path.remove(candidate_path)

    total_tests = result.testsRun
    failed_tests = len(result.failures) + len(result.errors)
    passed_tests = total_tests - failed_tests
    score_40 = (passed_tests / total_tests * 40.0) if total_tests > 0 else 0.0

    return {
        "candidate": candidate_name,
        "total": total_tests,
        "passed": passed_tests,
        "failed": failed_tests,
        "score_tests_40": round(score_40, 1),
        "status": "APROVADO_PARA_ENTREVISTA" if passed_tests >= 12 else "REPROVADO_PRELIMINAR"
    }


def main():
    default_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "starter_kit"))
    parser = argparse.ArgumentParser(description="Corretor automatizado em lote para o Desafio Seldon 2026")
    parser.add_argument("--submissions_dir", type=str, default=default_dir, help="Diretório com as submissões dos candidatos")
    args = parser.parse_args()

    tests_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "starter_kit", "tests"))
    
    print("=" * 70)
    print("  SELDON TECH RESIDENCY 2026 - CORRETOR DE SUBMISSÕES EM LOTE")
    print("=" * 70)

    # Se apontar diretamente para uma pasta de código única
    if os.path.exists(os.path.join(args.submissions_dir, "seldon_core")):
        res = evaluate_candidate_folder(os.path.abspath(args.submissions_dir), tests_dir)
        print(f"\nCandidato: {res['candidate']}")
        print(f"Testes Aprovados: {res['passed']}/{res['total']}")
        print(f"Nota da Etapa Automatizada: {res['score_tests_40']} / 40.0 pts")
        print(f"Classificação: {res['status']}\n")
        return

    # Se for uma pasta contendo subpastas de múltiplos candidatos
    if not os.path.isdir(args.submissions_dir):
        print(f"Diretório '{args.submissions_dir}' não encontrado.")
        sys.exit(1)

    candidates = [
        os.path.join(args.submissions_dir, d) for d in os.listdir(args.submissions_dir)
        if os.path.isdir(os.path.join(args.submissions_dir, d))
    ]

    if not candidates:
        print("Nenhuma pasta de candidato encontrada.")
        return

    results = []
    for cand_dir in sorted(candidates):
        r = evaluate_candidate_folder(cand_dir, tests_dir)
        results.append(r)

    # Exibe tabela consolidada
    print(f"\n{'CANDIDATO':<25} | {'TESTES':<8} | {'NOTA (40)':<10} | {'STATUS'}")
    print("-" * 70)
    for r in results:
        print(f"{r['candidate']:<25} | {r['passed']}/{r['total']:<6} | {r['score_tests_40']:<10} | {r['status']}")

    print("=" * 70)
    print(f"Total de submissões avaliadas: {len(results)}")


if __name__ == "__main__":
    main()
