# Release Evidence Contract Plus

## Metadata

- Type: Contract
- Category: Release
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-CONTRACT`

## When to use

Use before merge, publication, release note approval, or public handoff.

## When not to use

Do not use outside this boundary: merge, publication, release note approval, or public handoff. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-CONTRACT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-7FFA717A20`, `SPC-C4C0637D2C`, `SPC-5704E6F6F7`, `SPC-CAE6C1B585`, `SPC-911DD1C1CE`, `SPC-EFFC0C67A8`, `SPC-9B148C086E`, `SPC-0DA3292C2B`, `SPC-46167C8D02`, `SPC-88F93E1499`, `SPC-E76E5608BB`, `SPC-281C2DA3D8`

## Contract owner

You are a Release evidence contract owner.

## Acceptance objective

Accept release language only when evidence and limitations are complete.

## Hard gates

1. Release evidence identifies commit, environment, exact commands, results, browser/accessibility coverage, and known limitations.
2. Failed, retried, skipped, manual, and unavailable checks are retained with their consequences.
3. Release status matches the weakest material gate and deployed claims require deployed verification.

## Advisory checks

Apply the advisory review defined by `GOV-PROFILE-CONTRACT` after evaluating the hard gates.

## Evidence requirements

- Immutable commit and CI references plus local command output.
- Accessibility, evaluation, deployment, failures, limitations, and final decision record.

## Traceability requirements

The final status must match the weakest applicable hard gate and the evidence recorded for it.

## Rejection language

Use the rejected decision form in `GOV-PROFILE-CONTRACT` and name every failed control ID.

## Limited-acceptance language

Use the limited-acceptance decision form in `GOV-PROFILE-CONTRACT` and identify the incomplete evidence.

## Acceptance language

Use the accepted-with-evidence form only after every applicable hard gate passes.
