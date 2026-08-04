# Asset architecture migration notes

## Version 2.1.0

All 100 stable asset IDs, paths, and titles remain available. Source assets are now concise specialist modules rather than copies of shared policy.

### What changed

- Shared governance has stable `GOV-*` identifiers in [`GOVERNANCE-KERNEL.md`](GOVERNANCE-KERNEL.md).
- Specialist instructions used by multiple assets have one authoritative `SPC-*` entry in [`SPECIALIST-CONTROLS.md`](SPECIALIST-CONTROLS.md).
- Each manifest entry declares its governance profile and ordered specialist-control references.
- [`compose_assets.py`](../../scripts/compose_assets.py) deterministically includes the kernel, each referenced specialist control, and each selected module once.
- The website uses two views: the prompt, skill, or contract's specialist content and its full composition. Source download and copy actions preserve authoring-level traceability without adding a third tab.
- Every source module retains at least three asset-specific instructions, procedure steps, or hard gates plus a distinct evidence section.
- Validation rejects hollow registry delegation, duplicate specialist bodies or evidence sections, repeated inline specialist controls, near-duplicate controls at the configured threshold, orphaned controls, source/manifest drift, unresolved composition, and any unclassified repeated prose block.

### Adoption

Use the website’s **Copy complete asset** action or run:

```bash
python3 -S scripts/compose_assets.py --asset <asset-id>
```

Repeat `--asset` to compose a prompt, skill, and contract together. Source modules remain readable and stable, but require their declared kernel and registry dependencies when used outside the repository.

## Version 2.0.0

The 100 asset paths and titles remain stable. No prompt, skill, or contract identifier was removed.

### What changed

- Shared scope, evidence, uncertainty, traceability, failure-disclosure, escalation, and handoff rules moved to [`GOVERNANCE-KERNEL.md`](GOVERNANCE-KERNEL.md).
- Each asset now concentrates on its specialist role, mission or objective, task-specific procedure, evidence, and rejection or failure conditions.
- [`assets.json`](assets.json) now records a stable ID, semantic version, purpose, intended model context, dependencies, and evidence expectations.
- [`asset.schema.json`](asset.schema.json) defines the manifest entry contract.
- Validation is quality-based: metadata integrity, stable paths, dependencies, required specialist sections, evidence language, rejection language, and duplicate-block limits replace the previous twenty-numbered-point size gate.

### Adoption

Existing links continue to work. Version 2.0 consumers should migrate to complete v2.1 composition so shared specialist controls are not omitted.

### Deprecated patterns

- Repeating the full research stack and generic output contract in every asset is deprecated.
- Unsupported certainty wording is deprecated; use `research-informed` or `source-mapped` wording.
- Asset quality is no longer inferred from line count or numbered-rule count.

No asset is currently renamed or removed.
