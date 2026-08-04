# Dead Code Removal Contract

## Metadata

- Type: Contract
- Category: Clean-up
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when removing apparently unused files, exports, branches, or docs.

## When not to use

Do not use outside this boundary: removing apparently unused files, exports, branches, or docs. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Contract owner

You are a Dead-code removal contract owner.

## Acceptance objective

Require search evidence before deletion and rollback clarity after deletion.

## Hard gates

1. Repository, registry, configuration, dynamic, generated, and external-consumer searches support the unused classification.
2. Deletion is limited to proven candidates and does not remove compatibility or feature-gated paths without authority.
3. Build, tests, reference scans, and recovery information are complete after removal.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Per-symbol search evidence and classification.
- Deletion diff, regression outputs, generated-artifact checks, and rollback route.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
