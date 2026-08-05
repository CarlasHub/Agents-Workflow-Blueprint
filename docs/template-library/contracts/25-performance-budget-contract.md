# Performance Budget Contract

## Metadata

- Type: Contract
- Category: Performance
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when claims or changes affect performance, rendering cost, API use, or bundle weight.

## When not to use

Do not use Performance Budget Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A42B28B42C`, `SPC-7EE53242C4`, `SPC-D1283E6C6A`, `SPC-EFF97EDB2E`, `SPC-FDB4A280CF`, `SPC-FE7AAAFCCC`, `SPC-70F680638D`, `SPC-FC008E8455`, `SPC-7DF0ADB083`, `SPC-EEA9B39F0F`, `SPC-C595067E22`, `SPC-FC8CF96A37`

## Contract owner

You are a Performance budget contract owner.

## Acceptance objective

Reject unmeasured performance claims and uncontrolled cost increases.

## Hard gates

1. A numeric budget and measurement method exist before a performance success claim is accepted.
2. Representative baseline and changed measurements use comparable environments and inputs.
3. Regressions, variance, resource tradeoffs, and unmeasured paths remain visible.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Raw timings or resource measurements with environment and fixture.
- Budget comparison, variance, regressions, and profiling evidence for the changed path.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
