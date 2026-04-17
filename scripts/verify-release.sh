#!/usr/bin/env bash
set -euo pipefail

echo "Running release verification..."
npm run lint
npm run test
npm run test:playwright
npm run build
node scripts/check-prompts.js
echo "Release verification complete."
