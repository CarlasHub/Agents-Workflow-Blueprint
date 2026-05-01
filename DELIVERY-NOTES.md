# Delivery Notes

This package upgrades the repository into a professional agent-governance template product.

## Delivered asset set

- 40 named, scenario-specific prompts
- 30 reusable execution skills
- 30 enforceable acceptance contracts
- searchable manifest at `docs/template-library/assets.json`
- catalogue and starter packs for practical use
- research and standards basis
- quality rubric and weak-vs-strong examples
- Codex usage guide
- GitHub Pages template-hub interface with search, filters, open links, download links, and copy buttons
- validation script for the template library
- pull-request evidence gate

## Design principles

1. Evidence before confidence.
2. Claims must be traceable to files, command output, observed behaviour, or disclosed manual judgement.
3. Agent work is accepted through contracts, not vibes.
4. Implementation, review, specialist review, and release judgement are separate activities.
5. UI, accessibility, security, testing, documentation, and release claims are not implied by passing one command.
6. Final status is restricted to: verified, partially verified, not verified, blocked.

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
Wrote dist/starter-manifest.json with 143 files
Release verification complete.
```

The checks prove repository structure, required workflow artefacts, claim controls, example coverage, template-library counts, template-library depth, manifest integrity, and starter-manifest generation.

The checks do not prove a live deployed application, runtime accessibility behaviour, production security posture, or live UI interactions because this repository is a workflow/template bundle rather than an application build.
