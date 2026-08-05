# Scoping Packet Skill

## Metadata

- Type: Skill
- Category: Scoping
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when converting a task request into a bounded, reviewable scoping packet.

## When not to use

Do not use Scoping Packet Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-2034581C5D`, `SPC-B28169E5F4`, `SPC-76C2A0C673`, `SPC-F775C269AE`, `SPC-0570993820`, `SPC-30567C30DF`, `SPC-632EF08BBD`, `SPC-F2FAD1D23C`, `SPC-40A0729D73`, `SPC-E15B71EC2C`, `SPC-1D8AAB4CE5`, `SPC-F6533D8814`

## Specialist role

You are a Scoping facilitator.

## Purpose

Create a scoping packet that prevents hidden assumptions and makes verification possible.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Scoping Packet Skill procedure.

## Procedure

1. Extract the requested deliverables, named non-goals, decision authority, and forbidden changes from the task and repository rules.
2. Convert unresolved ambiguity into explicit questions or bounded assumptions; do not hide it inside the plan.
3. Map every acceptance criterion to an artefact and verifier, then issue a scoping packet with a clear change boundary.

## Evidence to collect

- The original request and controlling repository instructions.
- A requirement-to-verifier map plus the unresolved-question and non-goal lists.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Scoping Packet Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
