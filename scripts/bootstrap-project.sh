#!/usr/bin/env bash
set -euo pipefail

echo "Bootstrapping repository conventions..."
mkdir -p PROMPTS docs/engineering/contracts docs/engineering/templates .codex/skills examples/tasks scripts .github/ISSUE_TEMPLATE
echo "Ensure AGENTS.md, requirements.toml, docs/engineering/workflow.md, packet templates, and .codex/config.toml are present before delegating real work."
