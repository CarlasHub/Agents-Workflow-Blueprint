# Industry-readiness baseline

Recorded: 2026-08-04

Baseline commit: `9499243b014a80530b43dc640604e69617f059bc` on `main`.

This record separates source inspection, runtime observation, and release judgement. It describes the repository before the industry-readiness implementation began.

## Measurement method

- Asset scope: Markdown files in `docs/template-library/prompts/`, `skills/`, and `contracts/`.
- Words: tokens matching letters, numbers, apostrophes, underscores, or hyphens.
- Duplicate text: extra occurrences of identical, whitespace-normalised Markdown blocks containing at least 20 words. The ratio is duplicate extra words divided by all asset words.
- Automated test count: test cases in a JavaScript or browser test suite. Existing validation scripts are counted separately because they are checks, not behavioural test cases.
- Browser observations: local static server and the deployed GitHub Pages site at 1440 × 1000 and 390 × 844.

## Measured starting values

| Measure | Baseline |
| --- | ---: |
| Prompts | 40 |
| Skills | 30 |
| Contracts | 30 |
| Total asset lines | 15,440 |
| Total asset words | 157,173 |
| Median asset size | 1,574.5 words / 157 lines |
| Largest asset | `contracts/30-agent-output-format-contract.md`, 1,699 words |
| Repeated blocks | 42 |
| Duplicate extra words | 76,739 (48.82%) |
| Unsupported `research-backed` occurrences | 205 across 104 public files |
| Existing verification scripts | 8 |
| Automated JavaScript/browser test cases | 0 |
| CI workflow files | 0 |

## Existing verification result

`bash scripts/verify-release.sh` passed before edits. It ran prompt, workflow, example, claim, template-library, research-basis, and starter-manifest checks and wrote a 146-file manifest. Source inspection confirmed that these checks primarily validate files, phrases, counts, numbered-point depth, links between known assets, and manifest generation. They did not execute the browser UI or open a generated ZIP.

## Confirmed strengths

- Static GitHub Pages architecture and browser-local project builder are already present.
- The library has stable paths and a complete 40/30/30 catalogue.
- Repository instructions explicitly separate implementation, review, verification, and release claims.
- Existing checks disclose that structural verification does not prove application behaviour.
- The site has native controls, a skip link, visible focus styles, a no-JavaScript catalogue fallback, and an explicit limitations panel.
- The builder keeps approval pending unless the approval option is selected.

## Concern classification

| Concern | Classification | Evidence |
| --- | --- | --- |
| Intended licences but no formal files | confirmed | No `LICENSE`, `LICENSE-CODE`, `LICENSE-CONTENT`, `NOTICE`, or third-party notice existed. |
| Governance/research duplication | confirmed | 48.82% duplicate-block overhead; ten section headings occurred in all 100 assets. |
| Checks mainly structural | confirmed | Existing scripts inspect phrases, paths, counts, and generated manifest metadata. |
| No browser, keyboard, accessibility, or ZIP-integrity tests | confirmed | No JavaScript test package or test cases existed. |
| Incomplete modal semantics | confirmed | Dialog had initial focus and Escape/return-focus handling, but no focus containment or background inertness. |
| Reduced motion incomplete | confirmed | Homepage entrance animation existed with no `prefers-reduced-motion` rule. |
| Broad live regions | confirmed | Builder root and complete generated-file views used `aria-live="polite"`. |
| Unsupported `research-backed` overclaim | confirmed | 205 occurrences appeared in public assets and generated content. |
| No comparative evaluations | confirmed | No `evals/` suite, runner, raw results, or baseline comparison existed. |
| Incomplete CI/release automation | confirmed | No workflow files, lock file, browser tests, link check, or dependency audit existed. |
| Raw Markdown navigation | confirmed | Primary onboarding and card links opened source Markdown directly. |
| Incomplete metadata/release presentation | confirmed | Canonical, Open Graph, social-preview, favicon, theme-colour, and release evidence were absent or incomplete. |

## Runtime observations

Desktop inspection showed a coherent dark visual system and usable primary hierarchy. At 390px, the live and local homepage overflowed horizontally: the navigation, truth panel, hero heading, and command block extended beyond the viewport. This is a confirmed responsive defect, not a full accessibility verdict.

## Unavailable or incomplete baseline checks

- No assistive-technology session was performed.
- Colour contrast was not measured programmatically at baseline.
- 200% and 400% zoom were not behaviourally tested at baseline.
- The builder ZIP was not downloaded and extracted at baseline.
- External links were not exhaustively checked at baseline.
- No model evaluation was available; no model results were inferred or fabricated.

## Baseline release judgement

The starting repository was a strong, evidence-conscious prototype with substantial reusable content. It was not independently verifiable as an industry-ready product because material legal, duplication, runtime, accessibility, CI, ZIP-integrity, evaluation, and onboarding evidence was absent.

Final baseline status: `not verified`.
