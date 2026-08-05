# Privacy and Data Contract

## Metadata

- Type: Contract
- Category: Privacy
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use for personal, tenant, analytics, export, retention, or audit data.

## When not to use

Do not use Privacy and Data Contract to perform implementation or manufacture missing evidence. Apply it only to reviewable artefacts produced by the relevant task and procedure.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-E11FEFF55C`, `SPC-92FC5AFD97`, `SPC-33483AA6F2`, `SPC-826EA422DD`, `SPC-79F28504C6`, `SPC-4436404CB9`, `SPC-5B042223E4`, `SPC-85D9D0A23C`, `SPC-2020040A69`, `SPC-CC24B506CF`, `SPC-8410E57EDA`, `SPC-0B89F8D640`

## Contract owner

You are a Privacy and data contract owner.

## Acceptance objective

Require minimisation, access control, safe retention, and honest data-flow evidence.

## Hard gates

1. Each collected field has a necessary purpose, allowed access path, destination, retention period, and deletion route.
2. Collection, sharing, logging, export, backup, and support flows minimise data and match disclosed boundaries.
3. Real personal or production data is excluded from tests, examples, and evaluation fixtures.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Field-level data-flow, access, retention, and deletion evidence.
- Minimisation decisions, fictional fixtures, third-party flows, and open policy questions.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
