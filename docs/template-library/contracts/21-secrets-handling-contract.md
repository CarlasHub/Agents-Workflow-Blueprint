# Secrets Handling Contract

## Metadata

- Type: Contract
- Category: Security
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use for environment variables, credentials, CI, logs, tokens, and configuration.

## When not to use

Do not use Secrets Handling Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-E11FEFF55C`, `SPC-92FC5AFD97`, `SPC-33483AA6F2`, `SPC-826EA422DD`, `SPC-79F28504C6`, `SPC-4436404CB9`, `SPC-5B042223E4`, `SPC-85D9D0A23C`, `SPC-2020040A69`, `SPC-CC24B506CF`, `SPC-8410E57EDA`, `SPC-0B89F8D640`

## Contract owner

You are a Secrets handling contract owner.

## Acceptance objective

Prevent secrets from being exposed, persisted unsafely, or documented unsafely.

## Hard gates

1. No secret value appears in source, history-bound artefacts, client output, logs, fixtures, or documentation.
2. Required credentials enter through approved configuration and are least-privileged, rotatable, and redacted.
3. Suspected exposure triggers revocation and rotation evidence rather than a deletion-only response.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Redacted secret scans and configuration-flow inspection.
- Rotation/revocation status, owner, regression controls, and unresolved exposure scope.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
