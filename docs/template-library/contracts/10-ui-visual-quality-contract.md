# UI Visual Quality Contract

## Metadata

- Type: Contract
- Category: UI/UX
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use before accepting visual UI changes.

## When not to use

Do not use UI Visual Quality Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-305A6BD2E2`, `SPC-FF71E3BF7A`, `SPC-05C37EDF4D`, `SPC-F8FF4EA263`, `SPC-A8B18A88EC`, `SPC-31A58C54A8`, `SPC-37E10661DA`, `SPC-85A2A812F0`, `SPC-93477ED152`, `SPC-56F3C0F154`, `SPC-E2C0B279DE`, `SPC-5AC175CF4D`

## Contract owner

You are a UI visual quality contract owner.

## Acceptance objective

Accept only UI that is visually coherent, readable, aligned, and state-complete.

## Hard gates

1. Hierarchy, typography, spacing, alignment, density, and content remain coherent in every critical state.
2. Loading, empty, error, disabled, focus, hover, success, and long-content states are intentionally rendered.
3. No clipping, overlap, unreadable contrast, or horizontal overflow occurs at supported widths.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Current screenshots or runtime inspection with viewport and state.
- Visual-state inventory and measured or automated layout/contrast results.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
