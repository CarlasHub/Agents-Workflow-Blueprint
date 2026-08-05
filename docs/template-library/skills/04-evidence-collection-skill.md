# Evidence Collection Skill

## Metadata

- Type: Skill
- Category: Evidence
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when gathering proof for implementation, review, documentation, or release claims.

## When not to use

Do not use Evidence Collection Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-2034581C5D`, `SPC-B28169E5F4`, `SPC-76C2A0C673`, `SPC-F775C269AE`, `SPC-0570993820`, `SPC-30567C30DF`, `SPC-632EF08BBD`, `SPC-F2FAD1D23C`, `SPC-40A0729D73`, `SPC-E15B71EC2C`, `SPC-1D8AAB4CE5`, `SPC-F6533D8814`

## Specialist role

You are an Evidence collector.

## Purpose

Collect source, behaviour, test, and limitation evidence without inflating conclusions.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Evidence Collection Skill procedure.

## Procedure

1. Turn each material claim into a concrete evidence request before collecting artefacts.
2. Collect source, runtime, command, and manual evidence separately, preserving failed and contradictory observations.
3. Grade each claim by its strongest available evidence and refuse to promote inference to observation.

## Evidence to collect

- A claim-to-evidence ledger containing exact paths, commands, outputs, or observations.
- Failed, conflicting, stale, or unavailable evidence retained with collection context.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Evidence Collection Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
