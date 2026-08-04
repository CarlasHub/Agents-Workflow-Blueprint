# Responsive Behaviour Contract

## Metadata

- Type: Contract
- Category: Responsive UI
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when layout must remain usable across viewports and content lengths.

## When not to use

Do not use outside this boundary: layout must remain usable across viewports and content lengths. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-305A6BD2E2`, `SPC-FF71E3BF7A`, `SPC-05C37EDF4D`, `SPC-F8FF4EA263`, `SPC-A8B18A88EC`, `SPC-31A58C54A8`, `SPC-37E10661DA`, `SPC-85A2A812F0`, `SPC-93477ED152`, `SPC-56F3C0F154`, `SPC-E2C0B279DE`, `SPC-5AC175CF4D`

## Contract owner

You are a Responsive behaviour contract owner.

## Acceptance objective

Require responsive meaning, not only responsive fit.

## Hard gates

1. Content order, priority, controls, and meaning remain usable—not merely visible—at supported widths.
2. Long text, zoom-equivalent widths, and localisation expansion do not cause overlap or inaccessible overflow.
3. Pointer, touch, and keyboard targets remain operable after layout changes.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Viewport-by-state browser results and overflow measurements.
- Narrow, wide, long-content, and zoom/reflow observations with untested devices named.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
