# Architecture Boundary Contract

## Metadata

- Type: Contract
- Category: Architecture
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when module, layer, dependency, or ownership boundaries matter.

## When not to use

Do not use outside this boundary: module, layer, dependency, or ownership boundaries matter. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A613B10548`, `SPC-A73107D15B`, `SPC-8D72280D87`, `SPC-E3C1AD4005`, `SPC-C09D70A638`, `SPC-019E2A4C55`, `SPC-99EA88416B`, `SPC-B66E265E54`, `SPC-0A5BED7F7E`, `SPC-DC6C05703F`, `SPC-6D43E61D6A`, `SPC-C1851C2F70`

## Contract owner

You are an Architecture boundary contract owner.

## Acceptance objective

Preserve system boundaries and reject uncontrolled coupling.

## Hard gates

1. Dependencies point through declared interfaces and do not bypass ownership or trust boundaries.
2. State and side effects have one identifiable owner with bounded lifecycle and error handling.
3. Any boundary migration is staged, compatible, and verified against current consumers.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Dependency/data-flow map and concrete boundary call sites.
- Consumer tests, migration stages, rejected alternatives, and residual coupling.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
