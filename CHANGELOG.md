# Changelog

All notable changes are recorded here.

## Unreleased

### Added

- A generated, crawlable HTML catalogue containing all 100 prompts, skills, and contracts, plus a canonical XML sitemap and project crawler guidance.
- A 1200 × 630 social preview image based on the project mark, with Open Graph and Twitter Card metadata across the public entry pages.
- Manifest-backed SEO generation, drift checks, Python coverage, browser assertions, and an automated accessibility check for the static catalogue.
- Search and analytics documentation that separates repository implementation from external Search Console and Google Analytics account actions.
- A consent-first GA4 integration for measurement ID `G-PZEC365PCE`, a user-facing privacy page, persistent rejection and preference controls, revocation handling, and browser coverage proving that the Google tag stays unloaded before opt-in.

### Changed

- Public entry pages now expose stronger titles and descriptions, canonical and sitemap links, index/follow directives, social metadata, and structured data where applicable.
- The homepage, documentation, and footer now provide ordinary crawlable links to the static catalogue and sitemap.
- CI and the consolidated release gate now reject stale generated SEO artefacts.
- Every public HTML entry point now loads the same local consent controller while preserving the asset preview as the product's only dialog.

### Limitations

- A sitemap is a discovery hint, not proof of search-engine indexing; observed results require post-deployment Search Console verification.
- Local tests do not prove deployed GA4 data arrival, property-level retention settings, or legal suitability for a visitor or organisation.
- A project-local `robots.txt` cannot control the shared `github.io` host root; it becomes authoritative only when deployed at the origin root.

## 3.0.1 — 2026-08-05

### Added

- A normalized nine-source research registry that resolves every curated asset research label to an exact scholarly paper or engineering standard and documents the repository-level translation. Every prompt must cite each research pattern it declares.
- Validation and tests for unresolved citations, unsafe citation URLs, asset-type prefix drift, and prompt/skill/contract structural contamination.

### Changed

- The website now keeps goal, applicability, exclusions, and research provenance outside the code region.
- Both website copy paths and the default CLI composition now return only the agent-executable body: specialist content, resolved shared specialist requirements, and shared operating rules.
- Single-asset bodies no longer repeat the catalogue title. Multi-asset packs retain typed module boundaries so prompts, skills, and contracts cannot be confused.
- `scripts/compose_assets.py --with-references` explicitly appends research, source-module, governance, and specialist-control references for review artefacts.

### Limitations

- The curated source links document design influences; they do not prove that an individual prompt will maximize task performance for every model or environment.
- Deterministic structure and browser tests do not replace recorded model evaluations or expert review for a concrete deployment.

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
