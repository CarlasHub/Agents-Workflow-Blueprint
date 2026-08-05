# Logging Safety Contract

## Metadata

- Type: Contract
- Category: Observability
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when adding or changing logs, metrics, traces, or alerts.

## When not to use

Do not use Logging Safety Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-A42B28B42C`, `SPC-7EE53242C4`, `SPC-D1283E6C6A`, `SPC-EFF97EDB2E`, `SPC-FDB4A280CF`, `SPC-FE7AAAFCCC`, `SPC-70F680638D`, `SPC-FC008E8455`, `SPC-7DF0ADB083`, `SPC-EEA9B39F0F`, `SPC-C595067E22`, `SPC-FC8CF96A37`

## Contract owner

You are a Logging safety contract owner.

## Acceptance objective

Make telemetry useful without creating sensitive-data or noise risk.

## Hard gates

1. Logs exclude secrets and unnecessary personal, payload, token, and credential data.
2. Events use bounded severity, stable fields, correlation context, and actionable failure information.
3. Volume, retention, access, redaction, and failure behavior are tested for sensitive and noisy paths.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Representative redacted events and logging call-site review.
- Sensitive-input, error, volume, retention, and access-control results.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
