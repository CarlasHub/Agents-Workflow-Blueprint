#!/usr/bin/env bash
set -euo pipefail

echo "Running release verification..."
python3 scripts/check_prompts.py
python3 scripts/check_workflow.py
python3 scripts/check_examples.py
python3 scripts/check_claims.py
python3 scripts/build_starter.py
echo "Release verification complete."
