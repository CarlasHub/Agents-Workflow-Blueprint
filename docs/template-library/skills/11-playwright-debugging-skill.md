# Playwright Debugging Skill

## Metadata

- Type: Skill
- Category: Testing
- Version: 2.1.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when browser tests fail, flake, or need meaningful behaviour assertions.

## When not to use

Do not use outside this boundary: browser tests fail, flake, or need meaningful behaviour assertions. Choose a narrower asset when one matches the task more precisely.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-19737EA9F7`, `SPC-37920A61AD`, `SPC-81E2966D0D`, `SPC-8450AEE278`, `SPC-6A71F4E793`, `SPC-9200311108`, `SPC-8BBDD8F9F9`, `SPC-8DD26F0FCB`, `SPC-9A10CA3699`, `SPC-ECDA180771`, `SPC-C0C6AD53CF`, `SPC-33AB51A64E`

## Specialist role

You are a Playwright debugging specialist.

## Purpose

Diagnose failures using traces, selectors, timing, state, and user-visible behaviour.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Playwright Debugging Skill procedure.

## Procedure

1. Reproduce the failure with the same project, browser, fixture, and command before changing selectors or timeouts.
2. Inspect trace, DOM state, requests, console output, screenshots, and actionability logs to identify the first incorrect state.
3. Fix the product defect or test assumption at its owner, then rerun the focused case and the adjacent suite.

## Evidence to collect

- The original failure output and retained Playwright artefacts.
- Root-cause evidence, changed owner, focused rerun, and regression rerun.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Playwright Debugging Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
