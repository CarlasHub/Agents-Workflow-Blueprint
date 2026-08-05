# Test Behaviour Contract

## Metadata

- Type: Contract
- Category: Testing
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when tests must prove user or system behaviour rather than shallow implementation details.

## When not to use

Do not use Test Behaviour Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-19737EA9F7`, `SPC-37920A61AD`, `SPC-81E2966D0D`, `SPC-8450AEE278`, `SPC-6A71F4E793`, `SPC-9200311108`, `SPC-8BBDD8F9F9`, `SPC-8DD26F0FCB`, `SPC-9A10CA3699`, `SPC-ECDA180771`, `SPC-C0C6AD53CF`, `SPC-33AB51A64E`

## Contract owner

You are a Behaviour-test contract owner.

## Acceptance objective

Reject tests that pass without proving the important behaviour.

## Hard gates

1. The test fails for the targeted defect or uses an equivalent controlled failure fixture.
2. Assertions verify user-visible or contract behavior rather than only implementation structure.
3. Primary, boundary, invalid, and regression paths are covered at appropriate layers.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Fail-before or fixture evidence and pass-after output.
- Coverage map identifying behaviors each test proves and leaves untested.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
