# Keyboard Interaction Contract

## Metadata

- Type: Contract
- Category: Accessibility
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use for menus, dialogs, forms, tables, navigation, and custom controls.

## When not to use

Do not use outside this boundary: menus, dialogs, forms, tables, navigation, and custom controls. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-ECB7DBF3BE`, `SPC-281E77FD8F`, `SPC-B25B6C49C9`, `SPC-B75C7DAC35`, `SPC-43CE9442C3`, `SPC-E488688DB6`, `SPC-1A84B8E4BD`, `SPC-584BE13706`, `SPC-FF3BE787A8`, `SPC-68342B1555`, `SPC-8897CA6C8F`, `SPC-F771CE14DC`

## Contract owner

You are a Keyboard interaction contract owner.

## Acceptance objective

Accept only keyboard-operable interaction with visible focus and safe escape paths.

## Hard gates

1. Every action is reachable and operable without pointer input in a logical order.
2. Focus is visible, contained when required, and restored or moved predictably after state changes.
3. Dialogs and transient interfaces provide documented escape behavior without keyboard traps.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Recorded key sequence and focus target for each interaction state.
- Forward/reverse traversal, escape, restoration, error, disabled, and narrow-layout results.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
