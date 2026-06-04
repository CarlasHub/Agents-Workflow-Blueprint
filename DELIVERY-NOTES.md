# Delivery Notes

This package upgrades the repository into a professional agent-governance template product.

## Delivered asset set

- 40 named, scenario-specific prompts
- 30 reusable execution skills
- 30 enforceable acceptance contracts
- searchable manifest at `docs/template-library/assets.json`
- catalogue and starter packs for practical use
- research and standards basis
- human-AI quality standard covering sociotechnical framing, trust calibration, mental-model calibration, human handoff, automation-bias resistance, untrusted-content boundaries, output validation, and accessibility/cognitive-load checks
- quality rubric and weak-vs-strong examples
- Codex usage guide
- GitHub Pages template-hub interface with search, filters, open links, download links, and copy buttons
- Build project static route for browser-local governed starter ZIP generation
- generated project quality artefacts and `npm run quality:check`
- validation script for the template library
- pull-request evidence gate

## Design principles

1. Evidence before confidence.
2. Claims must be traceable to files, command output, observed behaviour, or disclosed manual judgement.
3. Agent work is accepted through contracts, not vibes.
4. Implementation, review, specialist review, and release judgement are separate activities.
5. UI, accessibility, security, testing, documentation, and release claims are not implied by passing one command.
6. Final status is restricted to: verified, partially verified, not verified, blocked.
7. Human-AI quality is treated as evidence discipline: calibrated trust, clear limits, correction paths, handoff, and sociotechnical risk review.

## Verification performed in this environment

The following verification path completed successfully:

```bash
bash scripts/verify-release.sh
```

Observed output:

```text
Running release verification...
Prompt checks passed.
Workflow checks passed.
Example checks passed.
Claim checks passed.
Template library checks passed.
Research basis checks passed.
Wrote dist/starter-manifest.json with 146 files
Release verification complete.
```

The checks prove repository structure, required workflow artefacts, claim controls, example coverage, template-library counts, template-library depth, research-basis controls, manifest integrity, and starter-manifest generation.

The checks do not prove a live deployed product, runtime accessibility behaviour in every browser, production security posture, or backend behaviour because this repository is a workflow/template bundle with a static browser-local starter route rather than a deployed application platform.
