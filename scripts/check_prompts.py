#!/usr/bin/env python3

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]

PROMPT_REQUIREMENTS = {
    "PROMPTS/master-prompt.md": [
        "Mission",
        "Read first",
        "Output contract",
        "PROMPTS/anti-fake-completion-agent.md",
    ],
    "PROMPTS/scoping-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "docs/engineering/templates/scoping-packet-template.md",
    ],
    "PROMPTS/implementation-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "docs/engineering/workflow.md",
        "docs/engineering/templates/scoping-packet-template.md",
    ],
    "PROMPTS/review-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "docs/engineering/templates/review-packet-template.md",
    ],
    "PROMPTS/a11y-review-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "docs/engineering/templates/accessibility-review-template.md",
    ],
    "PROMPTS/release-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "docs/engineering/templates/release-evidence-template.md",
    ],
    "PROMPTS/security-review-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "docs/engineering/templates/security-review-template.md",
    ],
    "PROMPTS/anti-fake-completion-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "Mandatory workflow",
    ],
    "PROMPTS/ui-a11y-audit-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "Accessibility",
    ],
    "PROMPTS/feature-health-check-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "Required checks",
    ],
    "PROMPTS/pre-mortem-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "Failure scenario",
    ],
    "PROMPTS/release-proof-agent.md": [
        "Mission",
        "Read first",
        "Output contract",
        "Release verdict",
    ],
}

OPTIONAL_TEACHING_FILE = "PROMPTS/system-prompt-patterns.md"
OPTIONAL_TEACHING_PHRASES = ["Role + mission + boundary", "Prompt + workflow + checks"]


def fail(message: str) -> None:
    print(f"[FAIL] {message}")


def main() -> int:
    failed = False

    for rel_path, required_phrases in PROMPT_REQUIREMENTS.items():
        path = ROOT / rel_path
        if not path.exists():
            fail(f"missing prompt file: {rel_path}")
            failed = True
            continue

        content = path.read_text(encoding="utf-8")
        for phrase in required_phrases:
            if phrase not in content:
                fail(f"{rel_path} missing required phrase: {phrase}")
                failed = True

    teaching_path = ROOT / OPTIONAL_TEACHING_FILE
    if not teaching_path.exists():
        fail(f"missing teaching file: {OPTIONAL_TEACHING_FILE}")
        failed = True
    else:
        teaching_content = teaching_path.read_text(encoding="utf-8")
        for phrase in OPTIONAL_TEACHING_PHRASES:
            if phrase not in teaching_content:
                fail(f"{OPTIONAL_TEACHING_FILE} missing required phrase: {phrase}")
                failed = True

    if failed:
        return 1

    print("Prompt checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
