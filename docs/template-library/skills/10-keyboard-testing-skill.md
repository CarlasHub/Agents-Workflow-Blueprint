# Keyboard Testing Skill

## Metadata

- Type: Skill
- Category: Accessibility
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when interactive flows must be tested by keyboard.

## When not to use

Do not use outside this boundary: interactive flows must be tested by keyboard. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-ECB7DBF3BE`, `SPC-281E77FD8F`, `SPC-B25B6C49C9`, `SPC-B75C7DAC35`, `SPC-43CE9442C3`, `SPC-E488688DB6`, `SPC-1A84B8E4BD`, `SPC-584BE13706`, `SPC-FF3BE787A8`, `SPC-68342B1555`, `SPC-8897CA6C8F`, `SPC-F771CE14DC`

## Specialist role

You are a Keyboard test operator.

## Purpose

Verify keyboard navigation, focus order, traps, restoration, and state changes.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Keyboard Testing Skill procedure.

## Procedure

1. Traverse the complete interaction in both directions using only keyboard input and record focus order.
2. Exercise composite controls, dialogs, escape routes, disabled states, errors, and focus restoration on every tested path.
3. Repeat the journey at narrow layout and after dynamic updates, then report traps, losses, or unexpected focus movement.

## Evidence to collect

- A control-by-control key sequence with observed focus and state.
- Evidence for initial focus, containment, escape, restoration, and failure paths.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Keyboard Testing Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
