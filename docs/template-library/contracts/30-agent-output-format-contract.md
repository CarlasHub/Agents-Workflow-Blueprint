# Agent Output Format Contract

## Metadata

- Type: Contract
- Category: Output
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when agent handoffs must be structured, inspectable, and easy to review.

## When not to use

Do not use outside this boundary: agent handoffs must be structured, inspectable, and easy to review. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-2034581C5D`, `SPC-B28169E5F4`, `SPC-76C2A0C673`, `SPC-F775C269AE`, `SPC-0570993820`, `SPC-30567C30DF`, `SPC-632EF08BBD`, `SPC-F2FAD1D23C`, `SPC-40A0729D73`, `SPC-E15B71EC2C`, `SPC-1D8AAB4CE5`, `SPC-F6533D8814`

## Contract owner

You are an Agent output format contract owner.

## Acceptance objective

Require final answers to expose evidence, risks, commands, and final status consistently.

## Hard gates

1. The final answer begins with the actual result and separates changed files, commands, evidence, limitations, and status.
2. Every reported pass, implementation, deployment, or accessibility statement maps to direct evidence.
3. The answer ends with exactly one controlled status whose strength matches unresolved material requirements.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Final-output sections mapped to the task and evidence ledger.
- Exact command results, unresolved risks, unavailable checks, and status rationale.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
