# Git Hygiene Contract

## Metadata

- Type: Contract
- Category: Delivery
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when packaging branch changes, commits, generated files, or merge handoffs.

## When not to use

Do not use Git Hygiene Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-D9266B2129`, `SPC-305203AAA3`, `SPC-3D20B487AD`, `SPC-EA427713A8`, `SPC-26C4D5B46B`, `SPC-35DB6BB883`, `SPC-7C1C296D50`, `SPC-069C123D49`, `SPC-7531ECF3F7`, `SPC-B7DED1701F`, `SPC-51A2F90F74`, `SPC-48BCE38DB5`

## Contract owner

You are a Git hygiene contract owner.

## Acceptance objective

Require clean, reviewable, relevant changes without accidental artefacts.

## Hard gates

1. The diff contains only authorized source, tests, docs, manifests, and reproducible generated artefacts.
2. Temporary files, secrets, logs, build outputs, editor state, and unrelated user changes are absent.
3. Commit history and message make the change reviewable without hiding failures or combining unrelated work.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Status, staged diff, ignored-file review, and generated-drift output.
- Commit scope, provenance of generated files, and any intentionally retained local state.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
