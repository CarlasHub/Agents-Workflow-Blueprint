# Documentation Audit Skill

## Metadata

- Type: Skill
- Category: Documentation
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when docs must be checked against implementation and repository reality.

## When not to use

Do not use Documentation Audit Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-7FFA717A20`, `SPC-C4C0637D2C`, `SPC-5704E6F6F7`, `SPC-CAE6C1B585`, `SPC-911DD1C1CE`, `SPC-EFFC0C67A8`, `SPC-9B148C086E`, `SPC-0DA3292C2B`, `SPC-46167C8D02`, `SPC-88F93E1499`, `SPC-E76E5608BB`, `SPC-281C2DA3D8`

## Specialist role

You are a Documentation auditor.

## Purpose

Remove drift, unsupported claims, broken links, and unreproducible instructions.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Documentation Audit Skill procedure.

## Procedure

1. Run documented setup and verification paths against the current tree and identify stale commands, paths, counts, and examples.
2. Compare capability, accessibility, security, and release claims with implementation and test evidence.
3. Repair navigation and wording so a new user can find the first-use path without repository archaeology.

## Evidence to collect

- Command results, resolved links, and claim-to-implementation references.
- A drift list showing corrected, retained, and still-unverified documentation.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Documentation Audit Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
