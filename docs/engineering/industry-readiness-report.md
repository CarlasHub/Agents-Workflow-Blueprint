# Industry-readiness implementation report

Recorded: 2026-08-04

Source baseline: `main` at `9499243b014a80530b43dc640604e69617f059bc`. The implementation is an uncommitted local worktree and has not been published.

## Executive result

The repository now has enforceable source, legal-file, metadata, local-link, unit, ZIP, three-engine browser, and automated accessibility gates. The static GitHub Pages model and backend-free browser builder are preserved. It does not yet satisfy every material criterion: model-based comparative results, independent legal review, manual assistive-technology evidence, and deployed-site verification remain unavailable. Release judgement is therefore `partially verified`.

## Baseline concern disposition

Every listed concern was confirmed at baseline. Formal licence and notice files, duplicated governance, structural-only checking, absent runtime tests, modal focus, reduced motion, live regions, unsupported certainty wording, missing evaluation infrastructure, missing CI, raw-document navigation, and incomplete metadata all required work. The deterministic concerns are resolved in source; the rendered documentation index reduces but does not eliminate direct Markdown use. Comparative evaluation infrastructure exists, but model outcomes remain blocked.

## Engineering decision record

| Area and defect | Smallest relevant implementation | Rejected alternative | Verification | Remaining limitation |
| --- | --- | --- | --- | --- |
| Legal terms were intentions only | Root licence, notice, README, contributor text, and licence checker define path-based MIT/CC BY 4.0 reuse | One custom licence was rejected because it would blur code/content terms and risk incompatible restrictions | `check_licenses.py`; local-link check | No independent legal review; this is not legal advice |
| Public capability language exceeded evidence | Public copy was qualified and repository-wide claim rules report path, line, phrase, and context | A tiny exact-string blacklist was rejected because variants and public files would escape it | Claim unit cases and repository scan | Rules cannot detect every semantic overclaim |
| Shared governance and specialist controls dominated individual assets | Stable `GOV-*` profiles, 168 normalized `SPC-*` controls, 340 non-repeated inline specialist items, distinct evidence sections, deterministic composition, and zero-unclassified-duplication gates retain all 100 IDs and paths | Hollow modules and paraphrased shared rules were rejected because shorter files without specialist procedures would reduce the metric while weakening usefulness | Representative triad previews, all-asset migration, hollow-module and duplicate-body rejection, 100 popup checks, 100 composition checks, and duplicate/near-duplicate metrics | Behavioural effectiveness still requires model evaluation |
| Homepage runtime semantics were incomplete | Vanilla module extraction, safe Markdown rendering, prompt-first previews, complete/source view switching, dialog focus loop, keyboard-accessible scrolling, inert fallback, reduced motion, scoped status, and narrow CSS | Replacing the static site with a framework was rejected because vanilla modules support the required behaviour | Units, 16 homepage cases across Chromium, Firefox, and WebKit, all-100-asset popup coverage, and axe states | Manual assistive-technology testing was not run |
| Builder accepted misleading or unsafe state | Form error associations, exact blank preservation, name/path validation, essential-file confirmation, explicit approval fields, sorted file list, generated manifest, ZIP validation and size limits | A server-side archive service was rejected because it violates browser-local scope | Units, 10 builder browser cases, 4 ZIP cases, axe states | Generated scaffolds still require independent review |
| Release checks did not exercise runtime behaviour | Pinned dependencies, Playwright/axe, local-link checks, drift checks, and two-job CI use least-privilege permissions | One monolithic source-count script was rejected because it could not isolate behavioural failures | Local equivalents executed; workflow inspected | CI has not run remotely in this unpublished worktree |
| No comparison harness existed | Eight fictional cases, three conditions, deterministic prompt-size runner, raw-result rules, and limitations | Fabricated sample model scores and a paid API integration were rejected | `run_evals.py --dry-run` | Correctness, evidence, timing, token, cost, and correction metrics are blocked without model runs |
| Onboarding required repository archaeology | README user journey, rendered docs index, worked example, contributing, security, testing, accessibility, evaluation, release, baseline and report docs | A documentation framework was rejected as unnecessary for a static repository | Local-link check and browser inspection | Markdown remains the canonical source for many detailed documents |

## Quantitative comparison

The same asset-metric method was used before and after.

| Measure | Before | After | Change |
| --- | ---: | ---: | ---: |
| Total source-asset words | 157,173 | 24,920 | -132,253 (-84.1%) |
| Median source-asset words | 1,574.5 | 248 | -1,326.5 (-84.2%) |
| Total source-asset lines | 15,440 | 5,940 | -9,500 (-61.5%) |
| Duplicate extra words | 76,739 | 0 | -76,739 (-100%) |
| Unclassified duplicate ratio | 48.82% | 0.0% | -48.82 percentage points |
| Repeated inline specialist controls | not separately recorded | 0 | normalized |
| Distinct inline specialist items | not separately recorded | 340 | asset-specific content retained |
| Near-duplicate control pairs at ≥0.92 similarity | not separately recorded | 0 | current gate added |
| Shared specialist controls / references | not applicable | 168 / 1,200 | normalized with no orphans |
| Normalized architecture words | not comparable | 30,756 | 24,920 modules + 4,824 registry + 1,012 kernel |
| Automated test executions | 0 | 136 | +136 |
| Distinct automated test definitions | 0 | 68 | +68 |
| Browser behaviour executions | 0 | 78 (26 cases × 3 engines) | +78 |
| Automated accessibility executions | 0 | 24 (8 states × 3 engines) | +24 |
| ZIP-specific unit cases | 0 | 4 | +4 |
| Public unsupported certainty occurrences | 205 | 0 violations across 178 scanned public files | -205 known occurrences |
| CI workflows | 0 | 1 workflow / 2 jobs | added |

Shorter files are not treated as sufficient evidence of quality. The validator requires stable metadata, governance profiles, resolvable ordered controls, reverse usage indexes, specialist coverage, source/manifest agreement, deterministic complete composition, zero repeated inline controls, zero orphaned controls, zero near-duplicate pairs at the configured threshold, and zero unclassified repeated prose blocks.

## Evaluation result

The dry run validates eight cases across minimal, kernel-only, and fully composed workflow conditions and records prompt word sizes. Complete compositions range from 1,872 to 2,137 words and include shared controls once. It does not call or score a model. All behavioural comparison metrics are recorded as blocked in `evals/results/dry-run.json`; no favourable or unfavourable model result exists to report.

## Accessibility result

Automated axe checks pass for eight states in Chromium, Firefox, and WebKit. Playwright keyboard assertions pass for modal initial focus, containment, keyboard-accessible scrolling, Escape, focus restoration, inert background, form-error focus, and interactive builder paths. Narrow 320/390-pixel and reduced-motion assertions pass. Manual screen-reader, high-contrast, measured colour review beyond axe, localisation, and complete 200%/400% visual inspection were not performed; no WCAG conformance claim is made.

## Remaining risks

- Independent counsel has not reviewed ownership, attribution, licence mapping, or third-party provenance.
- Model effectiveness has not been measured; prompt-size differences do not demonstrate outcome quality.
- CI configuration is source-inspected and locally reproduced but has not run on GitHub-hosted infrastructure.
- The live Pages site still reflects the previous published commit until a separately authorised publication.
- The automated three-engine browser matrix cannot represent every browser version, operating system, assistive technology, zoom mode, locale, or manual usability finding.
- The builder deliberately creates a starter scaffold and cannot validate a downstream deployed system.
- Claim heuristics can miss semantically equivalent overstatements or flag new limitation wording until rules are maintained.

## Final status

`partially verified`
