# Changelog

All notable changes are recorded here.

## 3.0.0 — 2026-08-05

### Added

- A deterministic v3 prompt-quality contract covering boundaries, inputs, instructions, decision gates, evidence, recovery, rejection, output records, examples, source size, composed size, and specialist-content ratio.
- Manifest risk levels, required inputs, expected outputs, and evaluation-case mappings for all 100 assets.
- One fictional evaluation case per prompt, frozen v2.1 composed baselines, five comparison conditions, and checked-in dry-run drift detection.
- A provider-neutral recorded-output scorer with disclosure validation, two-reviewer completeness checks, observed metric aggregation, and a v3-versus-v2.1 release gate.
- Negative validator and scorer tests for missing gates, input drift, invalid output schemas, partial criteria, and invalid review values.

### Changed

- All 40 prompt sources were rewritten as v3 specialist prompts with concrete engineering inputs, domain procedures, decision gates, evidence, failure recovery, rejection conditions, output records, and worked examples.
- All 100 assets, the governance kernel, specialist-control registry, package metadata, and manifest now use version `3.0.0`; stable IDs and paths are preserved.
- Copy-ready composition includes applicability boundaries and required inputs while continuing to normalize shared controls and governance exactly once.
- The common handoff shape now lives once in `GOV-HANDOFF-01`; prompt output templates provide only the domain record nested within it.
- CI and the release script reject drift from the checked-in 40-case dry-run record.
- Current architecture, quality, onboarding, migration, evaluation, and repository documentation now distinguishes deterministic prompt quality from unverified model effectiveness.

### Known limitations

- No model-generated comparison results are included because a usable model runtime and credential path was unavailable to the repository process. Behavioural metrics remain blocked.
- Automated accessibility results do not establish WCAG conformance.
- Remote CI and deployed-site evidence are recorded separately from local verification.

## 2.1.0 — 2026-08-04

### Added

- Split MIT and CC BY 4.0 licensing and third-party notices.
- Shared governance kernel and versioned asset metadata schema.
- Unit, ZIP-integrity, browser, and automated accessibility tests.
- Claim, local-link, metadata, and generated-artifact checks.
- CI quality and browser gates.
- Eight fictional comparative-evaluation fixtures and deterministic dry-run support.
- Stable governance profiles, a normalized specialist-control registry, and deterministic asset composition.
- Contributor, security, accessibility, release, and testing documentation.

### Changed

- Public claims distinguish tested repository behaviour from unverified outcomes.
- All 100 library assets became v2.1 specialist modules; shared governance and repeated specialist controls are composed exactly once.
- Asset popups use one keyboard-accessible dialog containing a concise introduction, literal prompt/skill/contract code, and linked references.
- Full assets lead with specialist instructions, retain shared operating requirements, and place linked source and control references at the end.
- Each popup has one compact icon copy action beside the code; it copies the complete asset and its references.
- Homepage modal behaviour and builder validation were hardened for keyboard and assistive-technology use.
- Builder ZIP generation validates paths, duplicate entries, size limits, UTF-8 content, approval state, and generated manifests.

### Known limitations

- Model-based evaluation results were not included.
- Automated accessibility results did not establish WCAG conformance.
- Remote CI and deployed-site evidence were recorded separately from local verification.
