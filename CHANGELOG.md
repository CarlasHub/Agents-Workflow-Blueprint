# Changelog

All notable changes are recorded here. The project uses date-based release headings until a tagged version policy is adopted.

## Unreleased

### Added

- Split MIT and CC BY 4.0 licensing and third-party notices.
- Shared governance kernel and versioned asset metadata schema.
- Unit, ZIP-integrity, browser, and automated accessibility tests.
- Claim, local-link, metadata, and generated-artifact checks.
- CI quality and browser gates.
- Fictional comparative-evaluation fixtures and deterministic dry-run support.
- Stable governance profiles, a normalized specialist-control registry, and deterministic asset composition.
- Contributor, security, accessibility, release, and testing documentation.

### Changed

- Public claims now distinguish tested repository behaviour from unverified outcomes.
- All 100 library assets are v2.1 specialist modules; shared governance and repeated specialist controls are composed exactly once.
- Asset popups show the prompt, skill, or contract's specialist content first, with explicit complete-composition and source-module views.
- Website copy actions distinguish a concise source module from a complete composed asset.
- Homepage modal behaviour and builder validation were hardened for keyboard and assistive-technology use.
- Builder ZIP generation now validates paths, duplicate entries, size limits, UTF-8 content, approval state, and generated manifests.

### Known limitations

- Model-based evaluation results are not included because no model runtime was supplied.
- Automated accessibility results do not establish WCAG conformance.
- Remote CI and deployed-site evidence are recorded separately from local verification.
