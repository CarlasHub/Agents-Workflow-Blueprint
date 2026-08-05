# Refactor Safety Contract

## Metadata

- Type: Contract
- Category: Refactor
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use for behaviour-preserving structural change.

## When not to use

Do not use Refactor Safety Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Contract owner

You are a Refactor safety contract owner.

## Acceptance objective

Require proof that behaviour is preserved and risk is staged.

## Hard gates

1. Behavioral invariants and public interfaces are recorded before structural change.
2. Characterization and regression tests pass at each reversible refactor stage.
3. Feature additions and unrelated cleanup are excluded from the preservation claim.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Before/after behavior evidence and interface comparison.
- Per-stage checks, rollback points, and explicitly excluded behavior.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
