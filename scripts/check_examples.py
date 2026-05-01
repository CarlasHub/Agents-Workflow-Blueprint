#!/usr/bin/env python3

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = {
    "examples/review-packets/sample-review-output.md": [
        "Executive verdict",
        "Release blockers",
        "Documentation drift",
    ],
    "examples/review-packets/sample-scoping-packet.md": [
        "Task restatement",
        "Risk map",
        "Go / pause recommendation",
    ],
    "examples/review-packets/sample-release-evidence.md": [
        "Commands run",
        "Built artifact",
        "Final go / no-go recommendation",
    ],
    "examples/exercises/exercise-001-comparison-view/README.md": [
        "Comparison View Workflow Drill",
        "Student deliverables",
    ],
    "examples/exercises/exercise-001-comparison-view/expected-good-scoping-packet.md": [
        "Expected Good Scoping Packet",
        "Go / pause recommendation",
    ],
    "examples/exercises/exercise-001-comparison-view/expected-bad-scoping-packet.md": [
        "Expected Bad Scoping Packet",
        "Why this is bad",
    ],
    "examples/exercises/exercise-001-comparison-view/expected-good-review.md": [
        "Expected Good Review",
        "Non-negotiable fixes before merge",
    ],
    "examples/exercises/exercise-001-comparison-view/expected-bad-review.md": [
        "Expected Bad Review",
        "Why this is bad",
    ],
}


def fail(message: str) -> None:
    print(f"[FAIL] {message}")


def main() -> int:
    failed = False

    for rel_path, phrases in REQUIRED_FILES.items():
        path = ROOT / rel_path
        if not path.exists():
            fail(f"missing example file: {rel_path}")
            failed = True
            continue
        content = path.read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in content:
                fail(f"{rel_path} missing phrase: {phrase}")
                failed = True

    if failed:
        return 1

    print("Example checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
