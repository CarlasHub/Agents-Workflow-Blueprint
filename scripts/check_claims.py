#!/usr/bin/env python3

from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]

FILES_TO_SCAN = [
    "README.md",
    "index.html",
    "examples/review-packets/sample-release-evidence.md",
    "docs/engineering/workflow.md",
]

FORBIDDEN_PATTERNS = [
    r"\bfully accessible\b",
    r"\bWCAG passed\b",
    r"\bcompliant\b",
    r"\bproduction-ready\b",
    r"\bdeployable application\b",
    r"\brelease ready\b",
]

ALLOWED_CONTEXTS = [
    "Do not",
    "do not",
    "Never",
    "never",
    "not a",
    "not prove",
    "unsupported",
    'says "',
    "without built artifacts",
]

REQUIRED_STARTER_DISCLAIMERS = {
    "index.html": "This repository is a workflow bundle, not a verified product build.",
    "docs/engineering/workflow.md": "It does not prove a shipped product build.",
    "examples/review-packets/sample-release-evidence.md": "NO-GO for claiming application-level behaviour until a real app is added and tested.",
    "README.md": "They do not prove a deployed product.",
}


def fail(message: str) -> None:
    print(f"[FAIL] {message}")


def is_allowed_context(line: str) -> bool:
    return any(marker in line for marker in ALLOWED_CONTEXTS)


def main() -> int:
    failed = False

    for rel_path in FILES_TO_SCAN:
        path = ROOT / rel_path
        if not path.exists():
            fail(f"missing file for claim checks: {rel_path}")
            failed = True
            continue

        lines = path.read_text(encoding="utf-8").splitlines()
        for line_number, line in enumerate(lines, start=1):
            for pattern in FORBIDDEN_PATTERNS:
                if re.search(pattern, line) and not is_allowed_context(line):
                    fail(f"{rel_path}:{line_number} contains unsupported claim language: {line.strip()}")
                    failed = True

    for rel_path, phrase in REQUIRED_STARTER_DISCLAIMERS.items():
        content = (ROOT / rel_path).read_text(encoding="utf-8")
        if phrase not in content:
            fail(f"{rel_path} missing required disclaimer: {phrase}")
            failed = True

    if failed:
        return 1

    print("Claim checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
