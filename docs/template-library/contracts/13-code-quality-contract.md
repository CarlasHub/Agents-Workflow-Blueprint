# Code Quality Contract

## Metadata

- Type: Contract
- Category: Code Quality
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use for maintainability and structural acceptance.

## When not to use

Do not use Code Quality Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Contract owner

You are a Code quality contract owner.

## Acceptance objective

Reject code that solves the short-term request by creating long-term fragility.

## Hard gates

1. Responsibilities remain clear and changed functions do not acquire unrelated ownership.
2. Error, boundary, and cleanup paths are explicit and covered by maintainable tests.
3. Duplication is removed only when the abstraction improves correctness, ownership, or testability.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Changed-code ownership, complexity, and dependency review.
- Test evidence for primary and failure paths plus documented tradeoffs.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
