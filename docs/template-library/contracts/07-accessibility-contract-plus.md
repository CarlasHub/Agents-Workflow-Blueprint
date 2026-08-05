# Accessibility Contract Plus

## Metadata

- Type: Contract
- Category: Accessibility
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use for UI work that must preserve semantic structure, keyboard access, and WCAG-aligned reasoning.

## When not to use

Do not use Accessibility Contract Plus to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-ECB7DBF3BE`, `SPC-281E77FD8F`, `SPC-B25B6C49C9`, `SPC-B75C7DAC35`, `SPC-43CE9442C3`, `SPC-E488688DB6`, `SPC-1A84B8E4BD`, `SPC-584BE13706`, `SPC-FF3BE787A8`, `SPC-68342B1555`, `SPC-8897CA6C8F`, `SPC-F771CE14DC`

## Contract owner

You are an Accessibility contract owner.

## Acceptance objective

Define acceptance gates for accessibility-related changes without fake coverage claims.

## Hard gates

1. Applicable semantics, naming, keyboard, focus, announcements, motion, contrast, and reflow behaviors are evaluated.
2. Automated findings are separated from manual and assistive-technology evidence.
3. No WCAG or accessibility-conformance claim exceeds the tested criteria, states, browsers, and methods.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Automated results, keyboard journeys, DOM evidence, and manual checklist status.
- Affected-user impact, mapped criteria, untested states, and remaining manual review.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
