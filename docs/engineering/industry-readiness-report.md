# v3 industry-readiness implementation report

Recorded: 2026-08-05, Europe/Lisbon

Source baseline: `main` at `fb37a81b22e51d61d73e698c8a3514fbf01e3204`. Implementation commit: `600d6fa177b6b29245f1a2132b92370552fbdbcb`. Hosted quality run, Pages deployment, and public smoke results are recorded in [`release-evidence/2026-08-05-v3-prompt-quality.md`](release-evidence/2026-08-05-v3-prompt-quality.md).

## Executive result

The 40 prompt sources now satisfy an enforced v3 engineering-prompt contract: explicit applicability boundaries, concrete inputs, domain procedures, conditional gates, evidence requirements, recoveries, rejection conditions, output records, and worked examples. The 100-asset manifest, composer, browser UI, evaluation fixtures, tests, generated starter manifest, and current documentation are aligned with version `3.0.0`.

Local deterministic, unit, ZIP, three-engine browser, and automated accessibility gates pass. Structural prompt quality is verified for the enforced rules. Model effectiveness is not verified because no usable model runtime and credential path was available to the repository process, so no model output or score was fabricated. Manual assistive-technology and independent legal review are also unavailable. The release judgement remains `partially verified`.

## Implemented phases

| Phase | Implementation | Evidence | Boundary |
| --- | --- | --- | --- |
| Prompt quality contract | Added manifest risk/input/output/evaluation fields and numerical prompt-quality gates for source size, composition size, specialist ratio, inputs, instructions, gates, evidence, recovery, rejection, output, and example quality | `asset.schema.json`, `assets.json`, `check_template_library.py`, negative Python tests | Structural checks do not establish model behaviour |
| Full prompt rewrite | Rewrote all 40 prompts with domain-specific engineering procedures while preserving stable IDs and paths; skills and contracts remain executable v3-compatible modules | 40 prompt sources; validator pass; representative source inspection | Skills and contracts were version-aligned, not rewritten to the same prompt schema |
| Composition and handoff | Included applicability and required inputs in copied output; moved the repeated handoff schema to `GOV-HANDOFF-01`; retained each shared control once | Python/JavaScript composer parity tests; 100-asset composition check | Downstream agents may still ignore instructions |
| Evaluation infrastructure | Expanded from 8 to 40 fictional cases, froze 40 v2.1 baselines, added five conditions, dry-run drift checking, provider-neutral scoring, two-reviewer completeness, objective-metric de-duplication, and release gates | `run_evals.py --dry-run --check`; scorer unit and failure cases | No recorded model run exists |
| Browser experience | Preserved one dialog containing introduction, complete Markdown prompt code, one compact copy icon, and references; longer v3 prompts remain scrollable | All-100-asset dialog tests in Chromium, Firefox, and WebKit; captured desktop review; narrow and 400%-equivalent overflow assertions | Direct in-app browser control was unavailable in this session |
| Documentation and release | Updated onboarding, architecture, quality rubric, migration, evaluation, testing, changelog, package version, cache version, CI gate, and generated starter manifest | Claim, link, workflow, starter-drift, lint, and full release checks | Hosted CI, Pages, and live-origin evidence are recorded only after publication |

## Quantitative prompt evidence

| Measure | v3 result |
| --- | ---: |
| Prompt sources | 40 |
| Prompt source words | 22,325 total; 516 minimum; 559.5 median; 632 maximum |
| Composed prompt words before references | 1,345 minimum; 1,392.5 median; 1,497 maximum |
| Specialist source share of composed prompt | 38.4% minimum; 40.05% median; 42.2% maximum |
| Prompt risk levels | 14 standard; 12 elevated; 14 high |
| Shared controls | 168 resolved; zero orphan or unclassified duplicate failures |
| Evaluation coverage | 40 cases; every prompt mapped |
| Frozen v2.1 prompt input | 1,220.6 mean words |
| v3 prompt input | 1,628.0 mean words; 33.4% word growth over v2.1 |
| v3 full-workflow input | 2,461.7 mean words |

Word counts are deterministic lexical measurements, not token counts and not evidence of outcome quality. The recorded-run release gate uses disclosed provider token accounting and permits at most 50% mean input-token growth for `v3-prompt` relative to `v2.1-prompt`.

## Verification results

| Command | Observed result |
| --- | --- |
| `python3 -S scripts/check_template_library.py` | Passed: 100 assets, unique IDs and paths, valid dependencies, 168 controls resolved, 0.0% unclassified duplicate ratio |
| `python3 -S scripts/run_evals.py --dry-run --check` | Passed: 40 cases and five conditions; model metrics blocked |
| `python3 -S scripts/compose_assets.py --check` | Passed: 100 copy-ready assets resolve operating rules and specialist controls once |
| `python3 -S scripts/build_starter.py --check` | Passed after intentional regeneration: 305-file manifest is current and reproducible |
| `npm run lint` | Passed |
| `npm run test` | Passed: 21 JavaScript unit and 22 Python unit executions |
| `npm run test:zip` | Passed: 4 ZIP executions |
| `npm run test:browser` | Passed: 129 combined browser/accessibility executions across Chromium, Firefox, and WebKit |
| `npm audit --audit-level=high` | Passed: zero reported vulnerabilities |
| `bash scripts/verify-release.sh` | Passed: all deterministic checks, 105 browser executions, and 24 automated accessibility executions |
| `git diff --check` | Passed at implementation checkpoints |

Local environment: macOS 26.5.1, Python 3.11.7, Node.js 26.5.0, npm 11.17.0, Playwright 1.62.1. The project and CI pin Node.js 22.18.0; the local test result therefore covers a newer Node runtime, while hosted CI must confirm the pinned runtime.

## Retained failures and corrections

1. The first strengthened template validation found an unparseable output-template shape, insufficient concrete-evidence vocabulary for several legitimate artefacts, and 2.27% repeated handoff prose. The domain record was simplified, concrete verifier terms were expanded, and the common handoff moved to the kernel. The validator then passed with 0.0% unclassified duplication.
2. The first generated-artifact check rejected stale `dist/starter-manifest.json`. After all new evaluation documentation was included, the builder regenerated it with 305 files and the drift check passed.
3. The first 129-case browser run passed 126 cases and failed the same assertion in three engines. The assertion counted a sentence across both the introduction and the deliberately complete prompt. It was scoped to the introduction section; the focused three-engine rerun passed, followed by a full 129/129 pass.
4. The initial recorded-output scorer counted objective token and cost fields once per reviewer. It now requires reviewer agreement, de-duplicates those fields per raw output, rejects duplicate reviewer records, rejects malformed numeric types, and has targeted failure coverage.

## UI and accessibility result

The captured dialog shows one modal, a distinct introduction, the full v3 prompt in a literal scrollable code region, one icon-only copy control with an accessible name, and references below the code. Automated tests cover focus containment, Escape, focus restoration, inert background, copy success/fallback, all 100 assets, source/dependency failure fallbacks, 320/390-pixel and 400%-equivalent overflow, and reduced motion across three engines.

Automated axe results cover eight states in each engine. These results do not establish WCAG conformance. Manual screen-reader, voice-control, high-contrast, localisation, and complete zoom/reflow review were not performed. The in-app browser-control integration required for a live side-by-side session was not exposed; the repository Playwright matrix and captured failure artefact were used instead.

## Evaluation result

The dry run proves that all 40 case fixtures, asset paths, frozen v2.1 baselines, v3 compositions, and prompt-size records are internally consistent. It does not call or score a model. `scripts/score_evals.py` can score only a complete external run with disclosed model/configuration/environment/accounting, saved raw outputs, and exactly two independent reviews per case-condition pair.

Behavioural correctness, unsupported claims, evidence quality, reviewer corrections, final-status accuracy, elapsed time, model tokens, and cost remain unavailable. No positive or negative v3-versus-v2.1 effect is claimed.

## Remaining risks

- Model outcomes remain unmeasured; deterministic prompt richness can still fail in a particular model or context.
- Independent legal, security, privacy, accessibility, and organisational-policy review has not been performed.
- Prompt and workflow input size increases context and cost; the 50% token-growth gate requires a recorded run.
- Automated browsers cannot represent every browser version, operating system, assistive technology, input method, locale, or manual usability finding.
- Generated projects remain starter scaffolds and require independent downstream engineering and release review.
- Hosted CI, Pages deployment, and live-origin behavior are not local-test claims and require separate publication evidence.

## Final status

`partially verified`
