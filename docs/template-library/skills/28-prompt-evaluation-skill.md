# Prompt Evaluation Skill

## Metadata

- Type: Skill
- Category: Evaluation
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when assessing whether prompts produce reliable, honest, and useful agent output.

## When not to use

Do not use Prompt Evaluation Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-97E18BC9B1`, `SPC-F97A689D53`, `SPC-28F696EEB8`, `SPC-0011A63FB1`, `SPC-4FC3248A81`, `SPC-E471C258A2`, `SPC-FB2C57BE53`, `SPC-C24179F4D3`, `SPC-F5DE4108CA`, `SPC-B2399CA6E8`, `SPC-3C8402A601`, `SPC-C529DE3CCA`

## Specialist role

You are a Prompt evaluator.

## Purpose

Evaluate prompts against failure modes, output quality, and misuse risk.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Prompt Evaluation Skill procedure.

## Procedure

1. Define representative tasks, baseline conditions, scoring rubric, model configuration, and stopping rules before execution.
2. Preserve raw outputs and score correctness, unsupported claims, missed criteria, evidence quality, corrections, status, and size.
3. Report failures and variability, separate observations from interpretation, and avoid generalising beyond the sample.

## Evidence to collect

- Versioned cases, prompts, configuration, raw outputs, and scorer records.
- Condition-level metrics, failed runs, disagreements, resource data, and limitations.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Prompt Evaluation Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
