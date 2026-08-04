#!/usr/bin/env python3

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = [
    "index.html", "site.css", "site.js", "site-utils.js", ".nojekyll",
    "LICENSE", "LICENSE-CODE", "LICENSE-CONTENT", "NOTICE", "THIRD-PARTY-NOTICES.md",
    "CONTRIBUTING.md", "SECURITY.md", "CODE_OF_CONDUCT.md", "CHANGELOG.md",
    "docs/index.html", "docs/engineering/workflow.md", "docs/engineering/testing-strategy.md",
    "docs/engineering/accessibility-testing.md", "docs/engineering/release-process.md",
    "docs/engineering/evaluation-methodology.md", "docs/engineering/industry-readiness-baseline.md",
    "docs/template-library/GOVERNANCE-KERNEL.md", "docs/template-library/SPECIALIST-CONTROLS.md",
    "docs/template-library/asset.schema.json", "scripts/compose_assets.py",
    "docs/engineering/templates/scoping-packet-template.md",
    "docs/engineering/templates/review-packet-template.md",
    "docs/engineering/templates/accessibility-review-template.md",
    "docs/engineering/templates/security-review-template.md",
    "docs/engineering/templates/release-evidence-template.md",
    "examples/exercises/exercise-001-comparison-view/README.md", "examples/worked-example.md",
    "PROMPTS/security-review-agent.md", ".github/workflows/quality.yml",
]
REQUIRED_COMMANDS = [
    "python3 -S scripts/check_prompts.py", "python3 -S scripts/check_workflow.py",
    "python3 -S scripts/check_examples.py", "python3 -S scripts/check_claims.py",
    "python3 -S scripts/check_template_library.py", "python3 -S scripts/check_research_basis.py",
    "python3 -S scripts/compose_assets.py --check",
    "python3 -S scripts/check_licenses.py", "python3 -S scripts/build_starter.py --check",
    "python3 -S scripts/run_evals.py --dry-run", "npm run lint", "npm run test",
    "npm run test:e2e", "npm run test:a11y", "npm run test:links", "npm run test:zip",
]


def main() -> int:
    failures: list[str] = []
    for rel_path in REQUIRED_FILES:
        if not (ROOT / rel_path).is_file():
            failures.append(f"missing workflow file: {rel_path}")
    requirements = (ROOT / "requirements.toml").read_text(encoding="utf-8")
    for command in REQUIRED_COMMANDS:
        if command not in requirements:
            failures.append(f"requirements.toml missing must_run command: {command}")
    workflow = (ROOT / "docs/engineering/workflow.md").read_text(encoding="utf-8")
    for phrase in ("Required artifacts", "Specialist review when relevant", "Starter-repository verification scope"):
        if phrase not in workflow:
            failures.append(f"docs/engineering/workflow.md missing phrase: {phrase}")
    if failures:
        for failure in failures:
            print(f"[FAIL] {failure}")
        return 1
    print("Workflow checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
