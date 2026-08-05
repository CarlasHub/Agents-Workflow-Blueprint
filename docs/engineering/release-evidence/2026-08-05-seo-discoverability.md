# SEO discoverability and Analytics consent implementation evidence

Recorded: 2026-08-05, Europe/Lisbon

## Scope

This record covers repository-side search discoverability, crawlable asset content, social-preview metadata, generated SEO artefacts, consent-first GA4 wiring, and their automated checks. It does not claim a deployment, a search-engine crawl, indexing, ranking, Search Console processing, live Analytics collection, or legal consent determination.

## Implemented

- Added a 1200 × 630 social image based on the existing project mark.
- Added complete Open Graph and Twitter Card metadata to the homepage, documentation index, builder, and generated static catalogue.
- Added homepage `WebSite`, `CollectionPage`, `SoftwareSourceCode`, and `Person` JSON-LD entities.
- Added a generated static HTML catalogue containing all 100 manifest assets and ordinary crawlable links to their sources.
- Added a 110-URL canonical sitemap, including the privacy page, and project crawler guidance.
- Added an opt-in GA4 controller for `G-PZEC365PCE` across every public HTML entry point. The external tag stays unloaded before acceptance; rejection persists; advertising storage and signals remain disabled; preferences can be reopened; withdrawal disables later measurement and removes accessible `_ga` cookies.
- Added a user-facing privacy page and tests for refusal, acceptance, exact tag identity, Consent Mode commands, persistence, withdrawal, cookie removal, blocked local storage, and public-page coverage.
- Added deterministic generation, stale-file rejection, failure-case coverage, browser assertions, automated accessibility coverage, CI wiring, release-gate wiring, and aligned operator documentation.

## Verification results

| Command or review | Observed result |
| --- | --- |
| `python3 -S scripts/build_seo.py --check` | Passed: 100 assets and 3 generated SEO files are current and reproducible |
| `python3 -S scripts/build_starter.py --check` | Passed: 318-file starter manifest is current and reproducible |
| `npm run lint` | Passed |
| `npm test` | Passed: 23 JavaScript unit and 28 Python unit executions |
| `npm run test:zip` | Passed: 4 ZIP executions |
| `npm run test:links` | Passed: 653 local links inspected; 618 external links were recorded but not fetched |
| `npm run test:e2e` | Passed: 126 browser executions across Chromium, Firefox, and WebKit |
| `npm run test:a11y` | Passed: 30 automated accessibility executions across Chromium, Firefox, and WebKit |
| `bash scripts/verify-release.sh` | Passed: every configured deterministic, unit, ZIP, link, browser, and automated accessibility gate completed |
| `git diff --check` | Passed |
| Rendered desktop and 390 × 844 review | Static catalogue hierarchy, search handoff, cards, responsive navigation, and narrow layout rendered without observed horizontal overflow |
| Consent and privacy rendered review | The consent region renders below the header without covering controls; desktop and 390 × 844 layouts keep readable text, visible choices, and no observed horizontal overflow |
| Pre-deployment live-origin check | Existing homepage returned HTTP 200; the new static catalogue, sitemap, privacy page, and social image returned HTTP 404 because this worktree has not been committed and deployed |
| Social-image inspection | PNG confirmed at 1200 × 630; project name and Prompts/Skills/Contracts message are legible |

## Retained failure and correction

1. The first accessibility matrix found the new inline static-catalogue link was distinguishable from surrounding muted text only by a low-contrast colour. Axe reported `link-in-text-block` as serious in the homepage, library, and open-dialog states across all three engines. The link now uses the existing inline-link class with a persistent underline.
2. The first consent implementation exposed its non-modal prompt as a second `dialog`, conflicting with the product requirement that the asset preview remain the only dialog. The consent prompt now uses a named `region`; all existing single-dialog behavior remains intact.
3. The first full Analytics browser matrix found that the fixed consent panel could cover a builder restore control in Firefox when the choice was ignored. The consent region now renders in document flow below the header, remains visible, and cannot intercept underlying product controls. The focused failure rerun and complete 126-execution matrix passed.

## Boundaries

- A sitemap is a discovery hint, not evidence that any search engine crawled or indexed a URL.
- The project-local `robots.txt` is not authoritative for the shared `carlashub.github.io` origin root.
- GA4 measurement ID `G-PZEC365PCE` is configured locally, but deployed data arrival and Analytics Realtime reporting are not verified.
- Search Console submission, live-origin smoke testing, remote CI, deployed social-card retrieval, and deployed consent behavior remain post-publication checks.
- Property-level retention, enhanced-measurement settings, downstream Google processing, and legal suitability were not established by repository tests.
- Automated accessibility results do not establish WCAG conformance; the manual checks listed in the accessibility guide remain separate.

## Final status

`partially verified`

Repository implementation and local verification are complete. Deployment, indexing, Search Console, Analytics collection, and legal consent suitability are not verified.
