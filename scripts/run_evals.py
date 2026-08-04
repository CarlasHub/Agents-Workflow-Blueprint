#!/usr/bin/env python3

"""Validate fictional evaluation cases and emit a deterministic dry-run record."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import sys

from asset_composer import compose_assets, load_manifest


ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "evals" / "cases"
KERNEL = "docs/template-library/GOVERNANCE-KERNEL.md"
CONDITIONS = {
    "minimal": ["evals/baselines/minimal.md"],
    "kernel": ["evals/baselines/kernel-only.md", KERNEL],
    "full": ["evals/baselines/full-workflow.md"],
}
REQUIRED_FIELDS = {
    "id", "category", "title", "task", "prompt", "skill", "contract",
    "acceptance_criteria", "failure_signals",
}


def word_count(text: str) -> int:
    return len(re.findall(r"\b[\w'-]+\b", text, flags=re.UNICODE))


def read_source(rel_path: str) -> str:
    path = ROOT / rel_path
    if not path.is_file():
        raise ValueError(f"missing referenced path: {rel_path}")
    return path.read_text(encoding="utf-8")


def load_cases() -> list[dict]:
    cases: list[dict] = []
    seen: set[str] = set()
    for path in sorted(CASES.glob("*.json")):
        try:
            case = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            raise ValueError(f"{path.relative_to(ROOT)} invalid JSON: {error}") from error
        missing = sorted(REQUIRED_FIELDS - case.keys())
        if missing:
            raise ValueError(f"{path.relative_to(ROOT)} missing fields: {', '.join(missing)}")
        if case["id"] in seen:
            raise ValueError(f"duplicate evaluation ID: {case['id']}")
        seen.add(case["id"])
        if not case["acceptance_criteria"] or not case["failure_signals"]:
            raise ValueError(f"{case['id']} requires acceptance criteria and failure signals")
        for field in ("prompt", "skill", "contract"):
            read_source(case[field])
        cases.append(case)
    if len(cases) != 8:
        raise ValueError(f"expected 8 evaluation cases, found {len(cases)}")
    return cases


def create_dry_run(cases: list[dict]) -> dict:
    results = []
    manifest_by_path = {asset["path"]: asset["id"] for asset in load_manifest()}
    for case in cases:
        sizes = {}
        for condition, sources in CONDITIONS.items():
            if condition == "full":
                selected_ids = [manifest_by_path[case[field]] for field in ("prompt", "skill", "contract")]
                text = "\n".join([read_source(sources[0]), compose_assets(selected_ids)])
            else:
                text = "\n".join(read_source(source) for source in sources)
            sizes[condition] = word_count(f"{text}\n{case['task']}")
        results.append({
            "case_id": case["id"],
            "prompt_words": sizes,
            "behavioural_metrics": "blocked: dry-run mode does not execute a model",
        })
    return {
        "suite_version": "1.0.0",
        "mode": "dry-run",
        "case_count": len(cases),
        "conditions": list(CONDITIONS),
        "model": None,
        "configuration": None,
        "observed_results": "unavailable",
        "limitation": "Fixture and prompt-size validation only; no model output was generated or scored.",
        "cases": results,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="validate fixtures without a model")
    parser.add_argument("--output", type=Path, help="write the deterministic JSON record")
    args = parser.parse_args()
    if not args.dry_run:
        print("[FAIL] only --dry-run is supported; model execution is intentionally external")
        return 2
    try:
        record = create_dry_run(load_cases())
    except ValueError as error:
        print(f"[FAIL] {error}")
        return 1
    output = json.dumps(record, indent=2) + "\n"
    if args.output:
        output_path = args.output if args.output.is_absolute() else ROOT / args.output
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(output, encoding="utf-8")
        print(f"Wrote {output_path.relative_to(ROOT)}")
    print(f"Evaluation dry run passed: {len(record['cases'])} cases, 3 conditions; model metrics blocked.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
