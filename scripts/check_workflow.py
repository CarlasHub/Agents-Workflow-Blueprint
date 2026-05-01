#!/usr/bin/env python3

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "index.html",
    "site.css",
    ".nojekyll",
    ".codex/config.toml",
    ".codex/skills/strict-agent-workflow/SKILL.md",
    "docs/engineering/workflow.md",
    "docs/engineering/templates/scoping-packet-template.md",
    "docs/engineering/templates/review-packet-template.md",
    "docs/engineering/templates/accessibility-review-template.md",
    "docs/engineering/templates/security-review-template.md",
    "docs/engineering/templates/release-evidence-template.md",
    "docs/teaching/grading-rubric.md",
    "docs/teaching/student-submission-checklist.md",
    "docs/teaching/instructor-notes.md",
    "examples/exercises/exercise-001-comparison-view/README.md",
    "PROMPTS/security-review-agent.md",
]

REQUIRED_REQUIREMENTS_COMMANDS = [
    "python3 scripts/check_prompts.py",
    "python3 scripts/check_workflow.py",
    "python3 scripts/check_examples.py",
    "python3 scripts/check_claims.py",
    "python3 scripts/build_starter.py",
]


def fail(message: str) -> None:
    print(f"[FAIL] {message}")


def require_phrase(content: str, phrase: str, file_label: str) -> bool:
    if phrase not in content:
        fail(f"{file_label} missing required phrase: {phrase}")
        return False
    return True


def main() -> int:
    failed = False

    for rel_path in REQUIRED_FILES:
        path = ROOT / rel_path
        if not path.exists():
            fail(f"missing workflow file: {rel_path}")
            failed = True

    config_path = ROOT / ".codex/config.toml"
    if config_path.exists():
        config_content = config_path.read_text(encoding="utf-8")
        failed = not require_phrase(config_content, 'model = "gpt-5.4"', ".codex/config.toml") or failed
        failed = not require_phrase(
            config_content, 'sandbox_mode = "workspace-write"', ".codex/config.toml"
        ) or failed
        failed = not require_phrase(
            config_content, 'approval_policy = "on-request"', ".codex/config.toml"
        ) or failed

    requirements_path = ROOT / "requirements.toml"
    if requirements_path.exists():
        requirements_content = requirements_path.read_text(encoding="utf-8")
        for command in REQUIRED_REQUIREMENTS_COMMANDS:
            if command not in requirements_content:
                fail(f"requirements.toml missing must_run command: {command}")
                failed = True

    workflow_content = (ROOT / "docs/engineering/workflow.md").read_text(encoding="utf-8")
    for phrase in [
        "Required artifacts",
        "Specialist review when relevant",
        "Starter-repository verification scope",
        "For teaching and grading",
    ]:
        if phrase not in workflow_content:
            fail(f"docs/engineering/workflow.md missing phrase: {phrase}")
            failed = True

    index_content = (ROOT / "index.html").read_text(encoding="utf-8")
    for phrase in [
        "Carla Goncalves",
        "https://carlashub.com",
    ]:
        if phrase not in index_content:
            fail(f"index.html missing required attribution phrase: {phrase}")
            failed = True

    if failed:
        return 1

    print("Workflow checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
