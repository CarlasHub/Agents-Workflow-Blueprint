# Release Notes Review Skill

## Metadata

- Type: Skill
- Category: Release
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when release notes must represent verified behaviour and known limitations.

## When not to use

Do not use outside this boundary: release notes must represent verified behaviour and known limitations. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-7FFA717A20`, `SPC-C4C0637D2C`, `SPC-5704E6F6F7`, `SPC-CAE6C1B585`, `SPC-911DD1C1CE`, `SPC-EFFC0C67A8`, `SPC-9B148C086E`, `SPC-0DA3292C2B`, `SPC-46167C8D02`, `SPC-88F93E1499`, `SPC-E76E5608BB`, `SPC-281C2DA3D8`

## Specialist role

You are a Release notes reviewer.

## Purpose

Produce release notes that disclose evidence and avoid exaggerated claims.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Release Notes Review Skill procedure.

## Procedure

1. Compare every release-note statement with the actual diff, tests, deployment state, and known limitations.
2. Separate user-visible changes, internal changes, fixes, breaking changes, and unresolved risks.
3. Remove promotional certainty and include failed or unavailable checks that affect release judgement.

## Evidence to collect

- The exact release diff, verification output, and deployment evidence.
- Claim-by-claim release-note traceability and visible known limitations.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Release Notes Review Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
