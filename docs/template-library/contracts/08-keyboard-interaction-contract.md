# Keyboard Interaction Contract

## Type
Contract

## Category
Accessibility

## When to use
Use for menus, dialogs, forms, tables, navigation, and custom controls.

## Research and psychology basis
This contract is research-informed, not magic. It converts prompt-engineering research and review psychology into enforceable repository behaviour for **Accessibility** work. It uses CoT-safe public reasoning records, Tree-of-Thoughts-style branch checks, ReAct observe-act-verify loops, least-to-most decomposition, self-consistency checks, self-refinement after failed checks, process supervision, contract-based critique, and requirements-to-evidence traceability. See `../RESEARCH-BASIS.md`, `../SCIENTIFIC-DNA.md`, and `../PROMPT-ARCHITECTURE.md` for the source map and caveats.


## Research pattern stack

This asset is deliberately built from the following research and engineering controls:

1. **Reason + Act** — Interleave observation, action, and verification so the agent cannot invent outcomes without inspecting the environment. Source: Yao et al. (2022), ReAct: Synergizing Reasoning and Acting in Language Models (https://arxiv.org/abs/2210.03629).
2. **Least-to-Most Prompting** — Decompose complex work into ordered subproblems, solve the smallest safe piece first, then use verified results to proceed. Source: Zhou et al. (2022), Least-to-Most Prompting Enables Complex Reasoning in Large Language Models (https://arxiv.org/abs/2205.10625).
3. **System 2 / cognitive forcing** — Slow the agent down with checklists, premortems, uncertainty labels, and forced evidence before closure. Source: Kahneman (2011), Thinking, Fast and Slow (https://www.penguinrandomhouse.com/books/89360/thinking-fast-and-slow-by-daniel-kahneman/).
4. **Formal verification and traceability** — Map every acceptance claim to a requirement, artefact, verifier, and final status. Source: ISO/IEC/IEEE 15288 systems and software engineering lifecycle process concepts (https://www.iso.org/standard/81702.html).
5. **Self-Consistency** — Compare independent checks, command output, source inspection, and behavioural evidence instead of trusting one plausible answer. Source: Wang et al. (2022), Self-Consistency Improves Chain of Thought Reasoning in Language Models (https://arxiv.org/abs/2203.11171).
6. **Premortem failure analysis** — Assume the work failed and require likely causes before accepting a plan or final claim. Source: Behavioural decision practice used to expose hidden risk before commitment (https://hbr.org/2007/09/performing-a-project-premortem).

## Reasoning trace policy

The agent must expose the reviewable artefacts of reasoning: assumptions, options considered, selected path, rejected path, evidence, command results, and limitations. It must not pad the answer with a long hidden-thought transcript. Reviewers need reproducible evidence, not theatre.

## Scientific control checkpoints

1. **Observe before act** — inspect files, UI states, logs, commands, or docs before proposing certainty.
2. **Decompose before edit** — break the task into small verified steps before broad implementation.
3. **Branch before commit** — compare at least two plausible approaches when the change is material.
4. **Act with containment** — make the smallest safe change that satisfies the approved requirement.
5. **Verify independently** — compare source inspection, command output, behaviour, and documentation claims.
6. **Reflect after failure** — convert any failed command, missing evidence, or contradiction into a correction note.
7. **Trace every claim** — tie final statements to a requirement, file path, command, screenshot, manual observation, or explicit limitation.
8. **Disclose residual uncertainty** — label all remaining gaps as verified, partially verified, not verified, or blocked.

## Scientific DNA
This asset uses the repository's research-backed control kernel. It does **not** ask for hidden chain-of-thought. It asks for reviewer-visible reasoning artefacts: decision records, evidence tables, branch comparisons, verification logs, and limitation disclosures.

### Research pattern map
1. **CoT-safe reasoning record** — require a concise public rationale, not private hidden reasoning.
2. **Tree-of-Thoughts style branching** — compare alternative routes when ambiguity, risk, or reversibility matters.
3. **ReAct loop** — observe repository state, act through bounded changes, observe results, and revise.
4. **Least-to-most decomposition** — solve the smallest blocking sub-problem before larger change.
5. **Self-consistency check** — test the preferred explanation against a rival explanation or rejected route.
6. **Self-refinement loop** — treat failed checks as feedback for repair, not as material to hide.
7. **Process supervision** — make the work path inspectable, not just the final answer.
8. **Contract-based critique** — evaluate output against explicit acceptance and rejection clauses.
9. **Formal traceability** — map each material claim to a requirement, artefact, evidence source, and status.
10. **Deliberate-work control** — slow down closure when evidence is incomplete or contradictory.

### Mandatory public reasoning artefact
Use this structure when the task is complex or risky:

| Requirement or risk | Branch / decision | Evidence needed | Verification result | Status |
| --- | --- | --- | --- | --- |
| <item> | <chosen/rejected route> | <source/behaviour/command/manual evidence> | <result> | verified / partially verified / not verified / blocked |

## Contract owner role
You are a Keyboard interaction contract owner.

## Acceptance objective
Accept only keyboard-operable interaction with visible focus and safe escape paths.

## Enforcement principle
Confidence is not acceptance evidence. The reviewer accepts only traceable facts, observable behaviour, command results, and clearly disclosed limits.

## Acceptance clauses
1. The work is rejected unless the requested outcome and approved scope are stated before editing or accepting work.
2. The work is rejected unless all material assumptions are labelled as confirmed, inferred, or unknown.
3. The work is rejected unless the evidence needed before any success claim is named before the final answer.
4. The work is rejected unless relevant repository instructions and existing contracts are inspected.
5. The work is rejected unless affected files, UI surfaces, scripts, docs, data paths, or review gates are named.
6. The work is rejected unless implementation evidence, review evidence, and release evidence are kept separate.
7. The work is rejected unless the final answer uses only this status vocabulary: verified, partially verified, not verified, blocked.
8. The work is rejected unless unknowns remain visible and are not converted into confident claims.
9. The work is rejected unless exact command results are reported or the reason commands could not run is disclosed.
10. The work is rejected unless incomplete, unverified, risky, and out-of-scope items are stated plainly.
11. The work is rejected unless the reviewer can verify this requirement: Map findings to relevant WCAG 2.2 success criteria when the issue is within WCAG scope.
12. The work is rejected unless the reviewer can verify this requirement: Inspect semantic HTML before adding ARIA; do not replace native behaviour with fragile custom roles.
13. The work is rejected unless the reviewer can verify this requirement: Check accessible names, roles, states, descriptions, and relationships for interactive elements.
14. The work is rejected unless the reviewer can verify this requirement: Verify keyboard operation, focus visibility, tab order, focus restoration, and escape behaviour.
15. The work is rejected unless the reviewer can verify this requirement: Check labels, instructions, errors, required states, and validation feedback for forms.
16. The work is rejected unless the reviewer can verify this requirement: Evaluate contrast, target size, text resizing, reduced motion, and non-colour indicators where relevant.
17. The work is rejected unless the reviewer can verify this requirement: Check announcements for dynamic content, loading, errors, route changes, and status updates.
18. The work is rejected unless the reviewer can verify this requirement: Separate automated findings from manual judgement and assistive-technology risk.
19. The work is rejected unless the reviewer can verify this requirement: Use Playwright or axe-style checks as evidence, not as a complete accessibility verdict.
20. The work is rejected unless the reviewer can verify this requirement: Reject phrases that imply full accessibility without broad manual evidence.
21. The work is rejected unless the reviewer can verify this requirement: Document user impact, not only technical attributes.
22. The work is rejected unless the reviewer can verify this requirement: Confirm that remediation does not create keyboard traps, focus loss, duplicate names, or semantic conflicts.
23. The work is rejected unless the reviewer can verify this requirement: Convert keyboard interaction into acceptance clauses that can reject work unambiguously.
24. The work is rejected unless the reviewer can verify this requirement: Require reviewer-visible evidence for every acceptance clause that materially affects risk.
25. The work is rejected unless the reviewer can verify this requirement: Provide both rejection wording and limited-acceptance wording for partial evidence.
26. The work is rejected unless the reviewer can verify this requirement: Separate hard gates from advisory improvements so the contract is enforceable.

27. The work is rejected unless the applicable research pattern stack is visible in the handoff: observe, decompose, branch, act, verify, reflect, and trace.
28. The work is rejected unless the final claim is tied to reproducible evidence rather than a fluent reasoning narrative.
29. The work is rejected unless at least one plausible failure path or rejected alternative is documented for material changes.
30. The work is rejected unless failed checks are converted into explicit correction requirements.

## Traceability matrix requirement
For any material acceptance decision, require a matrix with these columns:

| Requirement | Evidence source | Verification method | Result | Status |
| --- | --- | --- | --- | --- |

Rules:
1. A requirement without evidence is not verified.
2. A failed check must stay visible.
3. A skipped check must include a reason.
4. A passing command cannot verify unrelated behaviour.
5. The final acceptance status must match the weakest material requirement.

## Required rejection wording
Use this exact pattern when any clause fails:

`Rejected: this work is not accepted because <specific clause> is not satisfied. Evidence missing: <specific missing evidence>.`

## Required limited-acceptance wording
Use this exact pattern when the work is useful but not fully proven:

`Limited acceptance: useful progress was made, but final status is partially verified because <specific limitation>.`

## Required acceptance wording
Use this exact pattern only when all relevant clauses pass:

`Accepted with evidence: <files inspected>; <commands run>; <behaviour verified>; <remaining limitations>. Final status: verified.`

## Reviewer checklist
- Check each clause against actual evidence, not the implementer’s summary.
- Reject unsupported claims even when the work seems likely to be correct.
- Mark unrelated or uninspected behaviour as not verified.
- Require specialist review when accessibility, security, release, data, UI, or performance risk is material.
- Preserve the status vocabulary: verified, partially verified, not verified, blocked.
