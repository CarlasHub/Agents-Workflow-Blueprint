#!/usr/bin/env python3

from pathlib import Path
import json


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
MANIFEST = DIST / "starter-manifest.json"

FILES = [
    "README.md",
    "AGENTS.md",
    "requirements.toml",
    "index.html",
    "site.css",
    ".nojekyll",
    "docs/engineering/workflow.md",
    "docs/engineering/contracts/architecture.md",
    "docs/engineering/contracts/testing.md",
    "docs/engineering/contracts/accessibility.md",
    "docs/engineering/contracts/security.md",
    "docs/engineering/contracts/release.md",
    "docs/engineering/templates/scoping-packet-template.md",
    "docs/engineering/templates/review-packet-template.md",
    "docs/engineering/templates/accessibility-review-template.md",
    "docs/engineering/templates/security-review-template.md",
    "docs/engineering/templates/release-evidence-template.md",
    "PROMPTS/scoping-agent.md",
    "PROMPTS/implementation-agent.md",
    "PROMPTS/review-agent.md",
    "PROMPTS/a11y-review-agent.md",
    "PROMPTS/security-review-agent.md",
    "PROMPTS/release-agent.md",
    "PROMPTS/master-prompt.md",
    "PROMPTS/anti-fake-completion-agent.md",
    "PROMPTS/ui-a11y-audit-agent.md",
    "PROMPTS/feature-health-check-agent.md",
    "PROMPTS/pre-mortem-agent.md",
    "PROMPTS/release-proof-agent.md",
    "examples/exercises/exercise-001-comparison-view/README.md",
    "examples/exercises/exercise-001-comparison-view/expected-good-scoping-packet.md",
    "examples/exercises/exercise-001-comparison-view/expected-bad-scoping-packet.md",
    "examples/exercises/exercise-001-comparison-view/expected-good-review.md",
    "examples/exercises/exercise-001-comparison-view/expected-bad-review.md",
    "examples/template-libraries/agent-templates-production/README.md",
]


def main() -> int:
    DIST.mkdir(exist_ok=True)

    manifest = {
        "name": "agent-workflow-blueprint-2026",
        "artifact_type": "starter-workflow-bundle",
        "verification_scope": "repository workflow scaffolding, not a runnable product build",
        "included_files": FILES,
    }

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
