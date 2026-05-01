# Prompt Architecture Guide

This guide defines the internal architecture used by the 100 assets. It is designed for coding agents, repository reviewers, and template-library maintainers.

## The nine-layer prompt architecture

1. **Role lock** — assign a narrow specialist role with authority to reject weak work.
2. **Mission boundary** — state the desired outcome and what must not be claimed.
3. **Input inspection** — require repository, UI, test, docs, and constraint inspection before action.
4. **Least-to-most decomposition** — split work into small tasks that can be verified.
5. **Branch evaluation** — compare candidate routes for risk, cost, reversibility, and evidence.
6. **ReAct execution** — observe, act, observe again, then adjust.
7. **Evidence ladder** — require source, behaviour, command, and manual-review evidence.
8. **Traceability matrix** — map requirement to evidence and status.
9. **Failure disclosure** — final answer must include incomplete, unverified, risky, or blocked items.

## The standard evidence ladder

| Evidence level | Meaning | Acceptable examples |
| --- | --- | --- |
| Source evidence | The relevant artefact was inspected. | File path, function, component, config, contract. |
| Behaviour evidence | Real behaviour was observed. | UI state, browser interaction, API response, log. |
| Command evidence | A check was run and recorded. | Test command, lint command, build command, script output. |
| Specialist evidence | Domain risk was checked. | WCAG mapping, security boundary review, performance budget. |
| Release evidence | Claim is tied to release criteria. | Release packet, known limitations, final status. |

## The branch-evaluation rule

Use branch evaluation when any of the following are true:

1. the task changes shared behaviour;
2. the UI may regress;
3. accessibility or security risk is present;
4. requirements are ambiguous;
5. the first fix feels obvious but unproven;
6. the change is hard to reverse;
7. tests are missing or shallow;
8. documentation claims could drift from implementation.

Required output:

```text
Branch A: <route>, benefits, risks, evidence needed.
Branch B: <route>, benefits, risks, evidence needed.
Selected branch: <route> because <evidence-based reason>.
Rejected branch: <route> because <specific risk or mismatch>.
```

## The public reasoning rule

A serious prompt should not say “show your hidden reasoning”. It should say:

```text
Provide a public decision record with enough detail for review: assumptions, alternatives considered, evidence, verification, limitations, and status.
```

## The final-status rule

Only four final statuses are allowed:

- `verified` — all relevant claims have evidence.
- `partially verified` — useful work exists, but material claims remain unverified.
- `not verified` — no adequate evidence supports the claim.
- `blocked` — work cannot safely continue without missing input, tool access, runtime, or decision.

No marketing sentence may appear after the final status.


## Required research vocabulary cross-reference

This document participates in the same control vocabulary used across the library: CoT-safe public reasoning, Tree-of-Thoughts branch evaluation, ReAct observation loops, Least-to-most decomposition, Self-consistency checks, Self-refinement after failed checks, Process supervision, and traceability.
