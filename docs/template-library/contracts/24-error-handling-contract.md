# Error Handling Contract

## Metadata

- Type: Contract
- Category: Reliability
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when adding, changing, or reviewing failures, retries, fallbacks, and messages.

## When not to use

Do not use outside this boundary: adding, changing, or reviewing failures, retries, fallbacks, and messages. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-8FB2382903`, `SPC-7138233293`, `SPC-8EC07E421A`, `SPC-4E2920FBA1`, `SPC-8F58350FF8`, `SPC-500888D594`, `SPC-9253D12F94`, `SPC-164F0D6D2D`, `SPC-6034737B54`, `SPC-CE597C98CD`, `SPC-B96524207B`, `SPC-71CF36EE63`

## Contract owner

You are an Error handling contract owner.

## Acceptance objective

Require errors to be useful, safe, observable, and tested.

## Hard gates

1. Errors preserve a useful user action and diagnostic cause without exposing sensitive internals.
2. Failures are neither swallowed nor converted into misleading success, and cleanup leaves recoverable state.
3. Expected, invalid, unusual, dependency, timeout, and retry paths are intentionally tested.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Error-path source trace and user-visible output.
- Test results for each failure class, logging/telemetry behavior, and recovery state.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
