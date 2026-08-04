# Verification Contract

## Metadata

- Type: Contract
- Category: Verification
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when commands, manual checks, and evidence gaps define acceptance.

## When not to use

Do not use outside this boundary: commands, manual checks, and evidence gaps define acceptance. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-19737EA9F7`, `SPC-37920A61AD`, `SPC-81E2966D0D`, `SPC-8450AEE278`, `SPC-6A71F4E793`, `SPC-9200311108`, `SPC-8BBDD8F9F9`, `SPC-8DD26F0FCB`, `SPC-9A10CA3699`, `SPC-ECDA180771`, `SPC-C0C6AD53CF`, `SPC-33AB51A64E`

## Contract owner

You are a Verification contract owner.

## Acceptance objective

Accept only work with reproducible verification or explicit blocked status.

## Hard gates

1. Every acceptance criterion has an executed verifier or an explicit unavailable result.
2. Commands are reported exactly with environment, exit status, and observed output.
3. A passing check is used only for the behavior and scope it actually exercises.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Requirement-to-verifier table and raw command outcomes.
- Skipped, failed, flaky, manual, and environment-dependent checks.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
