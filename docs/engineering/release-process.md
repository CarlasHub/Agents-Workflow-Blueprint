# Release process

## Preconditions

- Worktree changes have been reviewed and the target commit is known.
- Node.js matches `.nvmrc`; Python 3 and the Chromium, Firefox, and WebKit Playwright browsers are available.
- Dependencies were installed with `npm ci` from `package-lock.json`.
- No secrets, personal data, production data, or unpublished third-party material are present.

## Gate

```bash
npm audit --audit-level=high
bash scripts/verify-release.sh
```

The gate runs Python verification, metadata and licence checks, all-asset deterministic composition, rendered-document and SEO reproducibility checks, source-manifest comparison, lint, unit tests, ZIP tests, local-link checks, browser tests, and automated accessibility tests. It must not modify tracked source files.

## Evidence

Copy [`release-evidence-template.md`](templates/release-evidence-template.md) and record the exact commit or worktree state, operating environment, commands, results, browser coverage, accessibility evidence, evaluation status, known limitations, and final status. Attach Playwright artefacts only when they help explain a failure; do not upload sensitive data.

## Publication

Release verification does not authorise committing, tagging, pushing, creating a pull request, publishing GitHub Pages, submitting a sitemap, or changing Analytics property settings. Those actions require explicit maintainer approval. After deployment, smoke-test canonical links, metadata, homepage search and modal, static library index, one rendered guide, one rendered prompt, sitemap, builder generation, and ZIP download on the deployed URL. Confirm the rendered guide is served as `text/html`, the prompt body copy control copies only the agent-ready body, maintained-document links use HTML routes, and raw Markdown appears only as an explicit download. Verify that rejecting Analytics makes no `gtag.js` request, accepting loads only `G-PZEC365PCE`, withdrawal persists, and expected page views appear in Realtime. Use Search Console to submit `https://carlashub.github.io/Agents-Workflow-Blueprint/sitemap.xml` and record the observed processing result; submission is a discovery hint, not indexing proof.

## Rollback

If a release gate or deployed smoke test fails, mark the release `not verified`, preserve the failure evidence, and revert through normal version-control review. Do not edit generated evidence to hide an unfavourable result.
