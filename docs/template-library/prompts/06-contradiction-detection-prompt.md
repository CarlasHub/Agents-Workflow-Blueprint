# Contradiction Detection Prompt

## Metadata

- Type: Prompt
- Category: Reasoning Control
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-PROMPT`

## When to use

Use when docs, tests, UI, code, README, or release language may disagree.

## When not to use

Do not use this merely to rewrite already-confirmed stale documentation; use Documentation Truthfulness for correction after the authoritative behaviour is established.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-PROMPT`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-97E18BC9B1`, `SPC-F97A689D53`, `SPC-28F696EEB8`, `SPC-0011A63FB1`, `SPC-4FC3248A81`, `SPC-E471C258A2`, `SPC-FB2C57BE53`, `SPC-C24179F4D3`, `SPC-F5DE4108CA`, `SPC-B2399CA6E8`, `SPC-3C8402A601`, `SPC-C529DE3CCA`

## Required inputs

- The claim or behaviour being compared across code, tests, configuration, UI, API, documentation, and release evidence.
- Candidate sources of truth and their owners, dates, generated status, and runtime authority.
- The affected consumers and consequences if the contradiction is resolved in either direction.
- Commands or runtime observations capable of distinguishing stale text from broken implementation.

## Specialist role

You are a Contradiction investigator.

## Task-specific mission

Find mismatches between artefacts and stop the agent from smoothing them over.

## Task-specific instructions

1. Inventory every artefact that states or determines the target behaviour, including defaults, examples, schemas, and generated files.
2. Normalize each artefact into a comparable claim containing trigger, input, outcome, error, and boundary.
3. Identify direct contradictions, omissions that imply incompatible behaviour, and version or environment differences that only appear contradictory.
4. Determine the authoritative owner using executable behaviour, explicit contracts, generation sources, and approved product decisions.
5. Exercise a discriminating check instead of resolving disagreement by intuition or document seniority alone.
6. Trace every consumer that must change when the authoritative behaviour is confirmed.
7. Report unresolved ownership conflicts separately from confirmed stale or defective artefacts.

## Decision gates

1. If no authoritative owner can be established, stop corrective edits and request the responsible product or architecture decision.
2. If changing one side would break compatibility or stored data, require migration and consumer evidence before proceeding.
3. Resolve a contradiction only after the discriminating runtime or source check identifies which claim is wrong.

## Required evidence

- A contradiction matrix listing each artefact, its claim, authority, version, and observed consistency result.
- The runtime, test, schema, or generation evidence used to identify the authoritative behaviour.
- A consumer-impact list for code, tests, examples, documentation, and release statements needing alignment.
- The corrected wording or implementation plus a rerun showing that the contradiction no longer exists.

## Failure modes and recovery

1. Two sources disagree and neither is authoritative: preserve both and escalate ownership instead of picking the convenient one.
2. A generated file is edited directly: locate and correct its generator, then reproduce the output.
3. The contradiction varies by version or environment: document the conditional behaviour rather than forcing false uniformity.

## Task-specific rejection conditions

1. Reject conclusions based only on file names, recency, or implementer confidence.
2. Reject fixes that align one document while leaving tests, examples, or consumers contradictory.
3. Reject completion when the authoritative behaviour or affected compatibility boundary remains unresolved.

## Output format

Return this domain-specific record inside the `GOV-HANDOFF-01` handoff:

```markdown
# Contradiction resolution matrix

- Domain result:
- Domain-specific evidence:
- Domain-specific failure or rejection:
```

## Worked example

When README text says dates are automatic but code writes them only after explicit approval, verify the form and storage path, identify code as current behaviour, update all examples, and avoid adding automatic approval without product authority. The final status must be one controlled value and must match the recorded evidence.
