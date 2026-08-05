#!/usr/bin/env bash
set -euo pipefail

echo "Running deterministic repository checks..."
python3 -S scripts/check_prompts.py
python3 -S scripts/check_workflow.py
python3 -S scripts/check_examples.py
python3 -S scripts/check_claims.py
python3 -S scripts/check_template_library.py
python3 -S scripts/compose_assets.py --check
python3 -S scripts/check_research_basis.py
python3 -S scripts/check_licenses.py
python3 -S scripts/build_seo.py --check
python3 -S scripts/check_links.py
python3 -S scripts/build_starter.py --check
python3 -S scripts/run_evals.py --dry-run --check

if [[ ! -x node_modules/.bin/playwright ]]; then
  echo "[FAIL] JavaScript dependencies are missing; run npm ci first."
  exit 1
fi

echo "Running JavaScript, ZIP, browser, and accessibility checks..."
npm run lint
npm run test
npm run test:zip
npm run test:links
npm run test:e2e
npm run test:a11y
echo "Release verification complete. Passing checks apply only to their documented scope."
