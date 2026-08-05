# Release evidence — 2026-08-05 v3 prompt quality

## Source state

- Baseline commit: `fb37a81b22e51d61d73e698c8a3514fbf01e3204`
- v3 implementation commit: `600d6fa177b6b29245f1a2132b92370552fbdbcb`
- Branch: `main`
- Version: `3.0.0`
- Publication: implementation commit pushed to `main` and fast-forwarded to the configured `gh-pages` source after hosted quality checks passed
- GitHub Actions: quality run `30997651781` passed both jobs for the exact implementation commit
- GitHub Pages: deployment `5760047027` succeeded for the exact implementation commit
- Canonical environment: `https://carlashub.github.io/Agents-Workflow-Blueprint/`

This evidence record is a documentation-only follow-up to the implementation commit. It does not alter the prompt, composer, validator, scorer, UI, or test behavior verified below.

## Environment

- Date/timezone: 2026-08-05, Europe/Lisbon
- Local macOS: 26.5.1
- Local Python: 3.11.7
- Local Node.js: 26.5.0
- Local npm: 11.17.0
- Project and CI Node.js: 22.18.0
- Browser automation: Playwright 1.62.1 Chromium, Firefox, and WebKit projects

## Commands and observed results

| Command | Result | Evidence boundary |
| --- | --- | --- |
| `python3 -S scripts/check_template_library.py` | Passed | 100 assets; 40 prompts meet v3 source/composition gates; 168 controls resolved; 0.0% unclassified duplicate ratio |
| `python3 -S scripts/run_evals.py --dry-run --check` | Passed | 40 cases and five conditions; model metrics blocked because no model was called |
| `python3 -S scripts/compose_assets.py --check` | Passed | All 100 copy-ready assets resolved governance and specialist controls once |
| `python3 -S scripts/build_starter.py --check` | Passed | The 305-file generated manifest was reproducible at the implementation commit |
| `npm audit --audit-level=high` | Passed | Zero reported vulnerabilities at the time of the run |
| `npm run test:all` | Passed | 21 JavaScript units, 22 Python units, 4 ZIP tests, 129 browser/accessibility executions, composition, lint, and links passed locally |
| `bash scripts/verify-release.sh` | Passed | All deterministic gates, 105 browser executions, and 24 automated accessibility executions passed locally |
| `gh run watch 30997651781 --exit-status` | Passed | Hosted source/unit job completed in 1m24s; hosted browser/accessibility job completed in 5m27s on the pinned toolchain |
| `git merge-base --is-ancestor origin/gh-pages main` | Passed | The verified implementation was a safe fast-forward from the existing Pages source |
| `git push origin main:gh-pages` | Passed | `gh-pages` advanced from `fb37a81` to `600d6fa` without force |
| Deployment status for `5760047027` | Passed | GitHub reported `success` and the canonical environment URL |
| Public Chromium smoke check | Passed | 100 asset controls; one dialog; one introduction; one full-prompt heading; one copy control; one references heading; all required v3 prompt sections; no horizontal overflow at 1440px or 390px |

## Retained failures and corrections

1. Initial strengthened validation found an unparseable output template, insufficient concrete-evidence classification for legitimate verifier terms, and 2.27% repeated handoff prose. The common handoff moved to the kernel, domain records were normalized, verifier vocabulary was corrected, and the final duplicate ratio was 0.0%.
2. The first starter drift check rejected the old generated manifest. It was regenerated after all v3 and evaluation files were present and the check passed.
3. The first combined browser run passed 126 of 129 executions. The three failures were the same stale dialog-wide text-count assertion: v3 intentionally includes the applicability text in both the introduction and full prompt. The assertion was scoped to the introduction; the focused 3/3 rerun and full 129/129 rerun passed.
4. The first scorer design duplicated objective cost/token values across reviewers. The scorer now requires exactly two distinct reviewer records, enforces agreement on objective fields, de-duplicates objective metrics by raw output, and rejects malformed data.
5. The first `git fetch` before Pages publication encountered a sandboxed DNS failure. The approved network retry succeeded, ancestry was confirmed, and the fast-forward push completed.

## Accessibility and UI boundary

Automated axe checks and scripted keyboard behavior passed in Chromium, Firefox, and WebKit. The public smoke check confirmed the requested single-dialog introduction, prompt-code, copy-icon, and references structure. No manual screen-reader, voice-control, high-contrast, localisation, or full zoom/reflow review was performed. No WCAG conformance claim is made.

The in-app browser-control integration was not exposed in this session. Repository Playwright automation, a captured desktop artefact, and a direct public Chromium smoke test were used. This is narrower than an independent manual assistive-technology review.

## Evaluation boundary

The repository contains deterministic fixtures, frozen v2.1 baselines, five conditions, and an independently reviewed recorded-output scorer. No usable model runtime and credential path was available to the repository process, so no model output was generated and no behavioural comparison was claimed. Prompt structure, richness, composition, and evaluation readiness are verified; model effectiveness is not.

## Final status

`partially verified`
