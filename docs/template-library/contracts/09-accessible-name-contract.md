# Accessible Name Contract

## Metadata

- Type: Contract
- Category: Accessibility
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use for icon controls, form controls, composite widgets, and dynamic UI.

## When not to use

Do not use Accessible Name Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-ECB7DBF3BE`, `SPC-281E77FD8F`, `SPC-B25B6C49C9`, `SPC-B75C7DAC35`, `SPC-43CE9442C3`, `SPC-E488688DB6`, `SPC-1A84B8E4BD`, `SPC-584BE13706`, `SPC-FF3BE787A8`, `SPC-68342B1555`, `SPC-8897CA6C8F`, `SPC-F771CE14DC`

## Contract owner

You are an Accessible-name contract owner.

## Acceptance objective

Require meaningful names, roles, descriptions, and relationships for interactive elements.

## Hard gates

1. Each interactive element exposes an appropriate semantic role and meaningful accessible name.
2. Descriptions, errors, groups, and state relationships are programmatically connected where needed.
3. Visible labels and accessible names remain understandable and do not conflict.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Accessibility-tree or DOM evidence for role, name, state, and relationships.
- Test cases for icon controls, repeated controls, errors, and dynamic state.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
