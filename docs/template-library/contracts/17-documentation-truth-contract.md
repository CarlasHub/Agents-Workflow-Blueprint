# Documentation Truth Contract

## Metadata

- Type: Contract
- Category: Documentation
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use when docs, examples, and guides must match real implementation.

## When not to use

Do not use outside this boundary: docs, examples, and guides must match real implementation. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-7FFA717A20`, `SPC-C4C0637D2C`, `SPC-5704E6F6F7`, `SPC-CAE6C1B585`, `SPC-911DD1C1CE`, `SPC-EFFC0C67A8`, `SPC-9B148C086E`, `SPC-0DA3292C2B`, `SPC-46167C8D02`, `SPC-88F93E1499`, `SPC-E76E5608BB`, `SPC-281C2DA3D8`

## Contract owner

You are a Documentation truth contract owner.

## Acceptance objective

Reject docs that promise capability without proof.

## Hard gates

1. Every command, path, count, screenshot, and capability statement matches the current repository.
2. Runtime, accessibility, security, evaluation, and deployment claims identify their evidence boundary.
3. Examples use fictional data and do not imply behavior that has not been implemented.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Executed documentation commands and resolved internal links.
- Claim-to-source/test mapping plus stale or intentionally unverified items.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
