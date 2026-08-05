# Data Privacy Review Skill

## Metadata

- Type: Skill
- Category: Privacy
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when personal, tenant, customer, analytics, export, or audit data may be collected or exposed.

## When not to use

Do not use Data Privacy Review Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-E11FEFF55C`, `SPC-92FC5AFD97`, `SPC-33483AA6F2`, `SPC-826EA422DD`, `SPC-79F28504C6`, `SPC-4436404CB9`, `SPC-5B042223E4`, `SPC-85D9D0A23C`, `SPC-2020040A69`, `SPC-CC24B506CF`, `SPC-8410E57EDA`, `SPC-0B89F8D640`

## Specialist role

You are a Data privacy reviewer.

## Purpose

Check data minimisation, retention, sharing, logging, and access boundaries.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Data Privacy Review Skill procedure.

## Procedure

1. Inventory each data element, source, purpose, legal or policy basis, destination, access path, retention, and deletion route.
2. Challenge collection and logging against minimisation, necessity, consent, and user-expectation boundaries.
3. Trace exceptional flows such as exports, backups, analytics, errors, support access, and third-party sharing.

## Evidence to collect

- A field-level data-flow and retention map using fictional or redacted examples.
- Minimisation decisions, access controls, deletion evidence, and unresolved policy questions.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Data Privacy Review Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
