# Asset architecture migration notes

## Version 3.0.1

Asset IDs, source paths, source versions, and specialist-control IDs remain stable. Composition now separates review context from agent instructions.

- Website and CLI copy output excludes the source title, applicability, metadata, dependencies, and references.
- Goal, “Use this when”, “Do not use this when”, curated research citations, and implementation references remain visible in the website dialog outside the code region.
- `research-sources.json` resolves every `research_pattern_labels` entry to an exact paper or standard plus the repository-level translation.
- `scripts/compose_assets.py --with-references` is available for review artefacts that intentionally append citations and implementation sources.
- Multi-asset packs preserve explicit Prompt, Skill, and Contract module boundaries; single-asset output starts directly with the executable body.

## Version 3.0.0

All 100 stable asset IDs, paths, titles, governance profiles, and specialist-control IDs remain available. The change strengthens prompt sources and machine-readable quality metadata without removing skills, contracts, starter packs, or static-site behavior.

### What changed

- All 40 prompts now include explicit use and non-use boundaries, four or more required inputs, five to ten domain-specific instructions, decision gates, concrete evidence, failure-and-recovery pairs, rejection conditions, a domain output record, and a worked example.
- The common handoff schema lives once in `GOV-HANDOFF-01`; each prompt contributes only its domain-specific record.
- The manifest records `risk_level`, `required_inputs`, `expected_outputs`, and `evaluation_cases` for every asset.
- Every prompt maps to at least one fictional evaluation case. The suite covers 40 cases and compares five conditions, including frozen v2.1 and v3 prompt inputs.
- Validation enforces prompt source size, composed size, specialist-content ratio, input alignment, conditional gates, concrete evidence, recoveries, rejection conditions, output schema, example quality, evaluation coverage, and existing normalized-control rules.

### Adoption

Existing v2.1 links and asset IDs continue to resolve. Recompose copied assets to receive the v3 prompt content:

```bash
python3 -S scripts/compose_assets.py --asset <asset-id>
```

Do not replace the frozen files in `evals/baselines/v2.1-composed/`; they are comparison inputs. Deterministic v3 validation does not establish behavioural improvement. Use the recorded-output process in `docs/engineering/evaluation-methodology.md` for that evidence.

## Version 2.1.0

All 100 stable asset IDs, paths, and titles remain available. Source assets are now concise specialist modules rather than copies of shared policy.

### What changed

- Shared governance has stable `GOV-*` identifiers in [`GOVERNANCE-KERNEL.md`](GOVERNANCE-KERNEL.md).
- Specialist instructions used by multiple assets have one authoritative `SPC-*` entry in [`SPECIALIST-CONTROLS.md`](SPECIALIST-CONTROLS.md).
- Each manifest entry declares its governance profile and ordered specialist-control references.
- [`compose_assets.py`](../../scripts/compose_assets.py) deterministically renders each selected module, the applicable kernel rules, and each referenced specialist control once in copy-ready order.
- The website uses one dialog containing a short introduction, the full standalone prompt, skill, or contract as literal Markdown code, a compact copy control, and linked references.
- Every source module retains at least three asset-specific instructions, procedure steps, or hard gates plus a distinct evidence section.
- Validation rejects hollow registry delegation, duplicate specialist bodies or evidence sections, repeated inline specialist controls, near-duplicate controls at the configured threshold, orphaned controls, source/manifest drift, unresolved composition, and any unclassified repeated prose block.

### Adoption

Use the compact copy control beside the website’s prompt/skill/contract code or run:

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
