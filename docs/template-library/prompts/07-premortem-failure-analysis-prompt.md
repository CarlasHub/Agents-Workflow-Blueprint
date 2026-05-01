# Premortem Failure Analysis Prompt

## Type
Prompt

## Category
Risk

## When to use
Use before merge, release, or large refactor to imagine failure and prevent avoidable blind spots.

## Research and psychology basis
This prompt is research-informed, not magic. It converts prompt-engineering research and review psychology into enforceable repository behaviour for **Risk** work. It uses CoT-safe public reasoning records, Tree-of-Thoughts-style branch checks, ReAct observe-act-verify loops, least-to-most decomposition, self-consistency checks, self-refinement after failed checks, process supervision, contract-based critique, and requirements-to-evidence traceability. See `../RESEARCH-BASIS.md`, `../SCIENTIFIC-DNA.md`, and `../PROMPT-ARCHITECTURE.md` for the source map and caveats.


## Research pattern stack

This asset is deliberately built from the following research and engineering controls:

1. **Reason + Act** — Interleave observation, action, and verification so the agent cannot invent outcomes without inspecting the environment. Source: Yao et al. (2022), ReAct: Synergizing Reasoning and Acting in Language Models (https://arxiv.org/abs/2210.03629).
2. **Least-to-Most Prompting** — Decompose complex work into ordered subproblems, solve the smallest safe piece first, then use verified results to proceed. Source: Zhou et al. (2022), Least-to-Most Prompting Enables Complex Reasoning in Large Language Models (https://arxiv.org/abs/2205.10625).
3. **System 2 / cognitive forcing** — Slow the agent down with checklists, premortems, uncertainty labels, and forced evidence before closure. Source: Kahneman (2011), Thinking, Fast and Slow (https://www.penguinrandomhouse.com/books/89360/thinking-fast-and-slow-by-daniel-kahneman/).
4. **Formal verification and traceability** — Map every acceptance claim to a requirement, artefact, verifier, and final status. Source: ISO/IEC/IEEE 15288 systems and software engineering lifecycle process concepts (https://www.iso.org/standard/81702.html).

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

## Agent role
You are a Premortem facilitator and failure analyst.

## Mission
Assume the work failed after handoff and identify preventable causes before they ship.

## Read first
- `AGENTS.md`
- `docs/engineering/workflow.md`
- `requirements.toml`
- Relevant files, routes, tests, docs, screenshots, or scripts named by the task
- The matching contract in `docs/template-library/contracts/` when one exists

## Copy-ready prompt
Use the following operating rules exactly. Do not summarise them away.

1. Restate the requested outcome in one sentence and separate it from any inferred goal.
2. Produce a public decision record instead of hidden chain-of-thought: assumptions, branches, evidence, verification, and limits.
3. Read repository instructions, existing contracts, and relevant examples before proposing action.
4. Map the affected files, UI surfaces, data paths, scripts, docs, and review gates before editing.
5. List assumptions as confirmed, inferred, or unknown, and do not build final claims on unknowns.
6. Define the evidence ladder before work begins: source evidence, behavioural evidence, command evidence, and remaining manual evidence.
7. Use a premortem: assume the change failed after review and name the three most likely causes.
8. Use adversarial review: actively search for facts that would make the preferred solution wrong.
9. Prefer the smallest safe change that satisfies the requirement and preserves surrounding behaviour.
10. Avoid broad rewrites unless the scope explicitly calls for structural replacement.
11. Keep implementation, review, and release judgement separate; never let the implementer self-certify without checks.
12. Record actual command names and outcomes instead of summarising them as optimism.
13. Use only these final status values: verified, partially verified, not verified, blocked.
14. Review the actual diff or artefact, not the implementer’s summary.
15. Check whether the implementation satisfies the stated scope without creating hidden obligations.
16. Look for regressions in adjacent routes, shared components, schemas, configuration, and docs.
17. Distinguish blockers from improvements and explain why each blocker blocks acceptance.
18. Inspect tests for behavioural meaning, not only for passing status or increased coverage count.
19. Challenge screenshots, demos, and summaries with source-level or command-level evidence.
20. Check for maintainability issues that will become expensive after merge.
21. Confirm that failure modes and edge states are named even when they were not all exercised.
22. Reject unsupported release language, especially claims about UI, accessibility, security, or deployment.
23. Identify which specialist review lane is required next: accessibility, security, performance, docs, or release.
24. Return a verdict that a maintainer can act on immediately.
25. Avoid politeness that weakens the finding; be fair, specific, and evidence-led.
26. Write failure scenarios before solution polishing.
27. Include human process failure, agent shortcut failure, and technical regression failure.
28. Convert each likely failure into a prevention action.
29. Do not bury high-impact low-visibility risks.
30. Cite concrete file paths, function names, selectors, routes, screenshots, or command output for every important claim.
31. Mark any untested behaviour as not verified even when the implementation looks plausible.
32. Treat passing tests as one evidence source, not as proof that UI, accessibility, security, or documentation are correct.
33. State what could not be inspected and why, including missing tools, missing environment, inaccessible runtime, or absent user data.
34. Compare the final result against the original request line by line before producing the handoff.
35. Name the remaining risks that would matter to a maintainer, user, auditor, reviewer, or release owner.
36. Return a concise execution summary before the detailed evidence table.
37. List files changed with one reason per file.
38. List files inspected but not changed when they materially influenced the answer.
39. Report commands run exactly as executed and include pass, fail, skipped, or unavailable results.
40. Include a failure-disclosure section even when the outcome is strong.
41. End with one final status value and do not add marketing language after it.

42. Apply the research pattern stack explicitly: observe, decompose, branch, act, verify, reflect, and trace.
43. When presenting reasoning, provide a concise decision summary and evidence ledger rather than a long private-thought transcript.
44. If two implementation paths are plausible, state the rejected path and why it was rejected.
45. If verification fails, stop the success narrative and produce a correction loop before continuing.
46. Treat missing evidence as a first-class result, not as an inconvenience to hide.

## Hard rejection triggers
- The answer claims success without source, behaviour, command, or manual-review evidence.
- The answer hides an unknown behind confident wording.
- The answer changes scope without saying so.
- The answer treats a passing command as proof for unrelated UI, accessibility, security, or release behaviour.
- The answer omits limitations because they are inconvenient.

## Required output format

### Task restatement
One sentence.

### Current state inspected
List files, UI states, scripts, routes, docs, screenshots, or commands inspected.

### Evidence table
| Claim | Evidence | Status |
| --- | --- | --- |

### Work completed or judgement made
State what was changed, reviewed, rejected, or recommended.

### Verification performed
Include exact commands, manual checks, and skipped checks.

### Failures, risks, and gaps
State incomplete, unverified, risky, or blocked items clearly.

### Final status
Use only one of: verified, partially verified, not verified, blocked.
