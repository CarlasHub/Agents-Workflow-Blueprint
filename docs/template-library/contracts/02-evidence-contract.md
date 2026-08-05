# Evidence Contract

## Metadata

- Type: Contract
- Category: Evidence
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when every claim must be traceable to inspected files, behaviour, commands, or manual evidence.

## When not to use

Do not use Evidence Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-2034581C5D`, `SPC-B28169E5F4`, `SPC-76C2A0C673`, `SPC-F775C269AE`, `SPC-0570993820`, `SPC-30567C30DF`, `SPC-632EF08BBD`, `SPC-F2FAD1D23C`, `SPC-40A0729D73`, `SPC-E15B71EC2C`, `SPC-1D8AAB4CE5`, `SPC-F6533D8814`

## Contract owner

You are an Evidence contract owner.

## Acceptance objective

Define the minimum evidence required for acceptance.

## Hard gates

1. Each material claim cites inspected source, observed behaviour, command output, or named manual review.
2. Evidence is current, reproducible, and scoped to the claim it supports.
3. Inference, screenshots, mocks, and structural checks are not presented as proof of unrelated runtime behaviour.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- A typed evidence ledger with paths, commands, observations, dates, and environment.
- Contradictory, stale, missing, or indirect evidence identified per claim.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
