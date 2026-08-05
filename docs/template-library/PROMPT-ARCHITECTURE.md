# Prompt Architecture Guide

This guide defines the v3 architecture used by the Agent Workflow Blueprint. It separates prompt-specific engineering instructions from shared governance and repeated specialist controls so copied output remains rich, reviewable, and deterministic.

## Source layers

The library has three authored layers:

1. [`GOVERNANCE-KERNEL.md`](GOVERNANCE-KERNEL.md) owns scope, assumptions, evidence, traceability, status, escalation, claim control, the common handoff, and prompt/skill/contract execution profiles.
2. [`SPECIALIST-CONTROLS.md`](SPECIALIST-CONTROLS.md) owns specialist instructions that are reused by more than one asset.
3. Each prompt, skill, or contract owns its applicability boundary, inputs, specialist procedure, domain evidence, domain failures, and output record.
4. [`research-sources.json`](research-sources.json) resolves each curated research label to an exact paper or standard and states how the source is translated into an observable repository control.

[`assets.json`](assets.json) records version, risk, required inputs, expected outputs, dependencies, and evaluation-case mappings. `scripts/compose_assets.py` and the website use the same composition rules.

## v3 prompt source contract

Each of the 40 prompts contains these sections:

1. `Metadata` — type, category, v3 version, and governance profile.
2. `When to use` — the intended task boundary.
3. `When not to use` — an explicit exclusion and named alternative.
4. `Dependencies` and `Shared specialist controls` — resolvable composition inputs.
5. `Required inputs` — four or more concrete items needed for safe execution.
6. `Specialist role` and `Task-specific mission` — narrow authority and desired outcome.
7. `Task-specific instructions` — five to ten ordered domain actions.
8. `Decision gates` — stop, approval, escalation, and completion decisions.
9. `Required evidence` — concrete artefacts and failure-path proof.
10. `Failure modes and recovery` — paired failure handling, not optimistic defaults.
11. `Task-specific rejection conditions` — hard reasons not to accept the result.
12. `Output format` — a compact domain record nested in the common handoff.
13. `Worked example` — a concrete interpretation and final-status constraint.

The numerical quality thresholds are defined in [`QUALITY-RUBRIC.md`](QUALITY-RUBRIC.md) and enforced by `scripts/check_template_library.py`.

## Copy-ready composition

Body composition produces one agent-ready prompt in this order:

1. selected source modules, beginning with required inputs and continuing through role, mission, instructions, gates, evidence, failures, rejection conditions, output record, and example;
2. every referenced specialist control once;
3. the applicable governance kernel rules and execution profiles once.

The source title, applicability sections, metadata, dependency declarations, raw shared-control ID lists, and research/source references are review context rather than agent instructions. The website renders them outside the code region and excludes them from both copy actions. `scripts/compose_assets.py` has the same body-only default; `--with-references` appends a separate review section when explicitly requested.

## Common handoff and domain record

All assets use `GOV-HANDOFF-01` once:

```markdown
# Agent workflow handoff

## Scope and inputs
## Findings or implementation result
## Decisions and rejected alternative
## Evidence and failure-path results
## Remaining risks and required approvals
## Final status
```

The selected prompt's domain output record belongs inside `Findings or implementation result`. Prompt sources do not repeat the full handoff schema.

## Evidence ladder

| Evidence level | Meaning | Acceptable examples |
| --- | --- | --- |
| Source evidence | The deciding artefact was inspected. | File, function, route, component, config, contract. |
| Behaviour evidence | The relevant runtime state was observed. | UI state, browser interaction, API response, log. |
| Command evidence | A reproducible check was run. | Test, lint, build, schema validator, security scan. |
| Specialist evidence | Domain risk was reviewed. | WCAG mapping, keyboard journey, threat boundary, performance budget. |
| Release evidence | A claim is tied to release criteria. | Review packet, known limitations, controlled final status. |

A fluent answer without the evidence required for its material claim is not accepted.

## Decision and reasoning rules

Use branch evaluation for material, ambiguous, cross-cutting, security-sensitive, accessibility-sensitive, or hard-to-reverse choices. Record the selected route, at least one plausible alternative, evidence needed, and the reason for rejection.

Do not request hidden chain-of-thought. Require a public decision record containing assumptions, alternatives, evidence, verification, limitations, and status.

## Controlled status

Only four final statuses are allowed:

- `verified` — all material requirements have reproducible evidence;
- `partially verified` — useful work exists but material evidence is incomplete;
- `not verified` — evidence is insufficient, contradictory, or a material check failed;
- `blocked` — progress cannot safely continue without missing authority, context, tooling, or an external state change.

No marketing claim may follow the final status.

## Quality boundary

Deterministic validation establishes source structure, manifest consistency, control resolution, composition limits, and fixture coverage. It does not establish model correctness or industry-wide effectiveness. Use the recorded-output process in [`evaluation-methodology.md`](../engineering/evaluation-methodology.md) for behavioural evidence.

## Research vocabulary cross-reference

This architecture uses the repository's source-mapped control vocabulary: CoT-safe public reasoning, Tree-of-Thoughts branch evaluation, ReAct observation loops, Least-to-most decomposition, Self-consistency checks, Self-refinement after failed checks, Process supervision, and traceability. The terms describe design influences, not a claim that every model implements a named internal mechanism.
