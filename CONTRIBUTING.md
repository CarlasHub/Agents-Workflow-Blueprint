# Contributing

Contributions should be small, reviewable, and aligned with the browser-local static architecture. By contributing, you agree that code is provided under MIT and written content under CC BY 4.0 as mapped in [`LICENSE`](LICENSE).

## Add or update an asset

1. Read [`GOVERNANCE-KERNEL.md`](docs/template-library/GOVERNANCE-KERNEL.md), [`SPECIALIST-CONTROLS.md`](docs/template-library/SPECIALIST-CONTROLS.md), and [`QUALITY-RUBRIC.md`](docs/template-library/QUALITY-RUBRIC.md).
2. Keep the asset specialist-specific; do not copy the shared governance sections into it.
3. Include when to use and not use it, dependencies, evidence requirements, rejection or failure conditions, and honest final-status language.
4. If an instruction is already used by another asset, reference its `SPC-*` ID. Add a new registry control only when at least two assets use exactly that instruction.
5. Add or update the matching entry in [`assets.json`](docs/template-library/assets.json), including its governance profile and ordered `shared_controls`. Preserve stable IDs and paths unless migration is necessary.
6. If an ID or path changes, add a migration note and update every catalogue and starter-pack reference.
7. Regenerate rendered pages with `node scripts/build_docs.mjs`, then run `python3 -S scripts/compose_assets.py --check`, `python3 -S scripts/check_template_library.py`, and the full verification described below.

## Code and website changes

Preserve the static GitHub Pages and browser-local builder model. Do not add a backend, secret, paid API, cloud dependency, or analytics tracker without explicit maintainer approval and documented privacy, consent, data-minimisation, and verification boundaries. Preserve the rule that `gtag.js` does not load before explicit consent, keep advertising storage and signals disabled, and retain refusal, persistence, withdrawal, and exact-ID browser coverage. Add focused unit, browser, accessibility, and failure-case coverage when behaviour changes.

Maintained written content stays in Markdown. Public navigation and sitemap entries must use the generated sibling HTML routes; raw Markdown links on rendered pages are permitted only as clearly labelled downloads. Do not hand-edit generated document HTML or `dist/rendered-documents.json`. Change the source or renderer, run `node scripts/build_docs.mjs`, and verify with `npm run test:docs`.

## Verification

```bash
npm ci
npx playwright install chromium
bash scripts/verify-release.sh
```

The release gate runs deterministic checks and browser automation. Complete any relevant manual accessibility, security, and visual review and record what was not checked. Do not commit generated test output, `node_modules`, screenshots containing personal data, or secrets.

## Pull requests

Describe the defect or requirement, smallest relevant files, chosen implementation, rejected alternative, focused and regression commands, actual results, and remaining limitations. Link behavioural changes to tests and documentation. Do not claim checks that were skipped or unavailable.
