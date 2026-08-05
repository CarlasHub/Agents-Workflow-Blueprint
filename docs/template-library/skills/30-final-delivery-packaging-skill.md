# Final Delivery Packaging Skill

## Metadata

- Type: Skill
- Category: Delivery
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when packaging an upgraded repository, template system, or release bundle.

## When not to use

Do not use Final Delivery Packaging Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-7FFA717A20`, `SPC-C4C0637D2C`, `SPC-5704E6F6F7`, `SPC-CAE6C1B585`, `SPC-911DD1C1CE`, `SPC-EFFC0C67A8`, `SPC-9B148C086E`, `SPC-0DA3292C2B`, `SPC-46167C8D02`, `SPC-88F93E1499`, `SPC-E76E5608BB`, `SPC-281C2DA3D8`

## Specialist role

You are a Delivery packaging lead.

## Purpose

Package files, manifests, docs, verification output, and limitations into a clean handoff.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Final Delivery Packaging Skill procedure.

## Procedure

1. Inventory requested deliverables and reconcile files, generated artefacts, manifests, documentation, and evidence against that list.
2. Remove temporary outputs and stale claims while preserving failures, limitations, and reproducible command results.
3. Produce a deterministic handoff with changed files, verification, recovery information, release status, and next external actions.

## Evidence to collect

- A deliverable-to-file manifest and clean-worktree scope review.
- Exact verification record, unresolved risks, release decision, and recovery or rollback information.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Final Delivery Packaging Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
