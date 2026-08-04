# Design System Contract

## Metadata

- Type: Contract
- Category: Design System
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when UI must follow reusable components, tokens, and interaction patterns.

## When not to use

Do not use outside this boundary: UI must follow reusable components, tokens, and interaction patterns. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-305A6BD2E2`, `SPC-FF71E3BF7A`, `SPC-05C37EDF4D`, `SPC-F8FF4EA263`, `SPC-A8B18A88EC`, `SPC-31A58C54A8`, `SPC-37E10661DA`, `SPC-85A2A812F0`, `SPC-93477ED152`, `SPC-56F3C0F154`, `SPC-E2C0B279DE`, `SPC-5AC175CF4D`

## Contract owner

You are a Design-system contract owner.

## Acceptance objective

Prevent one-off styling and component drift.

## Hard gates

1. New UI uses existing tokens, components, type scales, spacing, and interaction conventions where applicable.
2. A new primitive is introduced only when an existing primitive cannot meet the documented need.
3. One-off values and duplicated component behavior are removed or explicitly justified.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Token/component usage mapped to changed selectors and elements.
- Visual comparison across reused components and justified exceptions.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
