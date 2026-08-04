# Dead Code Detection Skill

## Metadata

- Type: Skill
- Category: Clean-up
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when deciding whether files, exports, branches, styles, or docs are unused.

## When not to use

Do not use outside this boundary: deciding whether files, exports, branches, styles, or docs are unused. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Specialist role

You are a Dead-code investigator.

## Purpose

Prove unused status before removal and record search evidence.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Dead Code Detection Skill procedure.

## Procedure

1. Search declarations, imports, dynamic registries, configuration, generated references, documentation, and runtime entry points.
2. Classify each candidate as unreachable, unused, externally consumed, generated, feature-gated, or unresolved.
3. Remove only proven candidates in bounded batches and rerun build, tests, and reference searches after each batch.

## Evidence to collect

- Repository-wide reference searches and relevant runtime or build evidence.
- Per-candidate classification, deletion diff, post-removal checks, and rollback route.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Dead Code Detection Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
