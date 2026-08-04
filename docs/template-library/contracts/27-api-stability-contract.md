# API Stability Contract

## Metadata

- Type: Contract
- Category: API
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when public API, schema, route, exported function, or integration behaviour may change.

## When not to use

Do not use outside this boundary: public API, schema, route, exported function, or integration behaviour may change. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-8FB2382903`, `SPC-7138233293`, `SPC-8EC07E421A`, `SPC-4E2920FBA1`, `SPC-8F58350FF8`, `SPC-500888D594`, `SPC-9253D12F94`, `SPC-164F0D6D2D`, `SPC-6034737B54`, `SPC-CE597C98CD`, `SPC-B96524207B`, `SPC-71CF36EE63`

## Contract owner

You are an API stability contract owner.

## Acceptance objective

Preserve consumers or document and verify the migration path.

## Hard gates

1. Existing consumers retain documented fields, semantics, defaults, errors, and ordering unless a breaking change is approved.
2. New and legacy inputs exercise success, validation, failure, and compatibility paths.
3. Deprecation or breaking change includes versioning, migration guidance, timing, and consumer evidence.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Producer schema and complete known-consumer inventory.
- Compatibility tests, migration fixtures, deprecation record, and unresolved external consumers.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
