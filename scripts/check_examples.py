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
    "tests/playwright/sample-dashboard.spec.ts": [
        "Example-only Playwright spec",
        "This starter does not ship a runnable app",
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
    "examples/template-libraries/agent-templates-production/README.md": [
        "Agent Templates Production Library",
        "100 total Markdown files",
    ],
}

TEMPLATE_LIBRARY_ROOT = "examples/template-libraries/agent-templates-production"
EXPECTED_TEMPLATE_COUNTS = {
    "prompts": 40,
    "skills": 30,
    "contracts": 30,
}
EXPECTED_TEMPLATE_DOMAINS = [
    "General_Core",
    "Software_Engineering",
    "Legal_Compliance",
    "Data_Finance",
    "Strategic_Ops",
]


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

    library_root = ROOT / TEMPLATE_LIBRARY_ROOT
    if not library_root.exists():
        fail(f"missing template library root: {TEMPLATE_LIBRARY_ROOT}")
        failed = True
    else:
        prompt_count = len(list(library_root.glob("*/prompts/*.md")))
        skill_count = len(list(library_root.glob("*/skills/*.md")))
        contract_count = len(list(library_root.glob("*/contracts/*.md")))
        actual_counts = {
            "prompts": prompt_count,
            "skills": skill_count,
            "contracts": contract_count,
        }

        for kind, expected in EXPECTED_TEMPLATE_COUNTS.items():
            actual = actual_counts[kind]
            if actual != expected:
                fail(
                    f"template library count mismatch for {kind}: expected {expected}, got {actual}"
                )
                failed = True

        for domain in EXPECTED_TEMPLATE_DOMAINS:
            domain_path = library_root / domain
            if not domain_path.exists():
                fail(f"missing template domain folder: {domain}")
                failed = True

    if failed:
        return 1

    print("Example checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
