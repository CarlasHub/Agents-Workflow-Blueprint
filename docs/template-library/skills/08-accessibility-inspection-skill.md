# Accessibility Inspection Skill

## Metadata

- Type: Skill
- Category: Accessibility
- Version: 3.0.0
- Governance profile: `GOV-PROFILE-SKILL`

## When to use

Use when inspecting semantic structure, names, keyboard behaviour, and user impact.

## When not to use

Do not use Accessibility Inspection Skill as standalone authority to change or accept work. Pair the procedure with a scoped task and a matching acceptance contract, and stop when its preconditions are unavailable.

## Dependencies

- [`Kernel`](../GOVERNANCE-KERNEL.md): `GOV-PROFILE-SKILL`
- [`Registry`](../SPECIALIST-CONTROLS.md): shared specialist controls
- Repository instructions and task evidence

## Shared specialist controls

Controls: `SPC-ECB7DBF3BE`, `SPC-281E77FD8F`, `SPC-B25B6C49C9`, `SPC-B75C7DAC35`, `SPC-43CE9442C3`, `SPC-E488688DB6`, `SPC-1A84B8E4BD`, `SPC-584BE13706`, `SPC-FF3BE787A8`, `SPC-68342B1555`, `SPC-8897CA6C8F`, `SPC-F771CE14DC`

## Specialist role

You are an Accessibility inspector.

## Purpose

Run a structured accessibility inspection that separates automated checks from manual judgement.

## Preconditions

Apply `GOV-PROFILE-SKILL`; obtain the target, authority, and evidence needed for the Accessibility Inspection Skill procedure.

## Procedure

1. Inventory semantics, names, relationships, keyboard paths, focus behaviour, announcements, motion, contrast, and reflow risks.
2. Run available automated and behavioural checks, then separate their findings from guided manual and assistive-technology review.
3. Map confirmed issues to affected users and acceptance criteria without claiming conformance from partial coverage.

## Evidence to collect

- DOM or source evidence, automated results, and keyboard observations by tested state.
- Manual-check record naming browser, viewport, zoom, input, assistive technology, and untested areas.

## Failure handling

Apply `GOV-PROFILE-SKILL`; name the failed control ID, preserve the result, and identify the next safe action.

## Deliverables

Deliver the Accessibility Inspection Skill result, its reproducible procedure, evidence, limitations, and controlled status.

## Handoff format

Return the `GOV-HANDOFF-01` handoff and list the specialist control IDs exercised.
