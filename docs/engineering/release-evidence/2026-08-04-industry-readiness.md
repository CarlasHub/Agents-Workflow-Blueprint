# Release evidence — 2026-08-04 industry-readiness implementation

## Source state

- Baseline commit: `9499243b014a80530b43dc640604e69617f059bc`
- Implementation release commit: `22e0cdd2619f5ad92854ddafc098e7ea94e9c2ae`
- Branch: `main`
- Publication: implementation release commit pushed to `main` and fast-forwarded to the configured `gh-pages` source
- GitHub Actions: run `30930578524` passed both quality jobs
- GitHub Pages: deployment `5747939438` succeeded for the implementation release commit

## Environment

- Date/timezone: 2026-08-04, Europe/Lisbon
- macOS: 26.5.1
- Python: 3.11.7 (CI is pinned by `.python-version` to 3.13.7)
- Node.js: 26.5.0 (CI and `.nvmrc` are pinned to 22.18.0)
- npm: 11.17.0
- Local Google Chrome: 149.0.7827.201
- Automated browsers: Playwright 1.62.1 bundled Chromium, Firefox, and WebKit

## Commands and observed results

| Command | Result | Evidence or limitation |
| --- | --- | --- |
| `npm ci` | passed | 76 packages installed from the lock file; local Node 26.5.0 produced an expected engine warning because the project and CI pin Node 22.18.0. |
| `npm audit --audit-level=high` | passed after authorised network retry | Zero vulnerabilities reported. The first sandboxed request was unavailable because registry DNS was blocked. |
| `python3 -S scripts/asset_metrics.py` | passed | 24,920 source-asset words; median 248; 340 distinct inline specialist items; 168 shared controls; 1,200 references; no orphan, repeated-inline, near-duplicate, or unclassified duplicate controls; 0.0% duplicate ratio. |
| `python3 -S scripts/compose_assets.py --check` | passed | All 100 assets resolved the kernel and specialist controls exactly once. |
| `python3 -S scripts/run_evals.py --dry-run --output evals/results/dry-run.json` | passed | Eight cases and three conditions validated; model metrics blocked. |
| `npm run test:a11y -- --repeat-each=2` | passed | All eight states passed twice after removal of transient opacity contrast. |
| `ruby -e "require 'yaml'; YAML.load_file('.github/workflows/quality.yml'); puts 'GitHub Actions YAML parses.'"` | passed | Workflow YAML parsed locally. |
| `node --check site.js` and changed-module syntax checks | passed | Homepage and builder modules parsed. |
| `python3 -m py_compile scripts/*.py` | passed | Python scripts compiled in the local interpreter. |
| `git diff --check` | passed | No whitespace-error output. |
| `bash scripts/verify-release.sh` | passed | Final local run: 20 JavaScript units, 10 Python units, 4 ZIP units, 488 local links, 105 browser executions, 24 automated accessibility executions, and all 100 compositions passed. |
| `gh run watch 30930578524 --exit-status` | passed | GitHub-hosted source/unit and browser/accessibility jobs passed; browser job executed the 105-case matrix and the 24-case accessibility matrix. |
| `git merge-base --is-ancestor origin/gh-pages main` | passed | Existing Pages history was an ancestor of the verified release; no force push was required. |
| `git push origin main:gh-pages` | passed | Fast-forwarded `gh-pages` from `9499243` to `22e0cdd`. |
| `gh api -X GET repos/CarlasHub/Agents-Workflow-Blueprint/deployments/5747939438/statuses` | passed | GitHub reported `success` and the canonical environment URL. |
| Live Chromium smoke test against `https://carlashub.github.io/Agents-Workflow-Blueprint/` | passed | Loaded 100 cards; opened `Master Agent Enforcement Prompt` with specialist content first; switched complete/source modes; found no horizontal overflow at 1440 px or 390 px. |

An earlier consolidated run failed one homepage axe state because opacity animation transiently lowered text contrast. That failure was retained, the animation was corrected, all eight states were repeated twice, and the final consolidated run passed.

During the v2.1 composition work, the first browser run failed because a new modal test selected 101 identically named copy buttons instead of scoping the locator to the dialog. The locator was corrected. The prompt-first popup change then exposed a three-row/four-child dialog-grid overlap, an unfocusable scroll region, and test-harness clipboard permission differences. The grid gained a dedicated row, the scroll region gained keyboard focus and visible focus treatment, and the harness now exercises the Clipboard API in Chromium and the application fallback in Firefox/WebKit. The all-asset popup check was subsequently split into bounded 10-asset cases after slower hosted WebKit runs exceeded per-test timeouts; the final local and hosted 105-case matrices passed without weakening coverage. The first source bundle also correctly rejected a stale starter manifest; it was regenerated to 229 files and its drift check passed.

## Accessibility

Automated and scripted keyboard evidence is present across Chromium, Firefox, and WebKit. No manual screen-reader, high-contrast, or complete visual zoom session was performed. No conformance claim is made.

## Evaluation

The eight-case, three-condition dry run passed fixture, reference, and prompt-size validation. Model-dependent correctness, claims, evidence, correction, status, time, token, and cost metrics are blocked because no model runtime was supplied. No model result was fabricated.

## Known limitations

See [`industry-readiness-report.md`](../industry-readiness-report.md). The release remains partially verified until model comparison, independent legal review, and manual accessibility review are available. Remote CI and a focused deployed-site smoke test are complete.

## Final status

`partially verified`
