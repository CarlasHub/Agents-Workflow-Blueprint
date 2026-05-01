# Regression Test Design Skill

## Type
Skill

## Category
Testing

## When to use
Use when a bug fix or feature needs tests that would catch future breakage.

## Research and psychology basis
This skill is research-informed, not magic. It converts prompt-engineering research and review psychology into enforceable repository behaviour for **Testing** work. It uses CoT-safe public reasoning records, Tree-of-Thoughts-style branch checks, ReAct observe-act-verify loops, least-to-most decomposition, self-consistency checks, self-refinement after failed checks, process supervision, contract-based critique, and requirements-to-evidence traceability. See `../RESEARCH-BASIS.md`, `../SCIENTIFIC-DNA.md`, and `../PROMPT-ARCHITECTURE.md` for the source map and caveats.


## Research pattern stack

This asset is deliberately built from the following research and engineering controls:

1. **Reason + Act** — Interleave observation, action, and verification so the agent cannot invent outcomes without inspecting the environment. Source: Yao et al. (2022), ReAct: Synergizing Reasoning and Acting in Language Models (https://arxiv.org/abs/2210.03629).
2. **Least-to-Most Prompting** — Decompose complex work into ordered subproblems, solve the smallest safe piece first, then use verified results to proceed. Source: Zhou et al. (2022), Least-to-Most Prompting Enables Complex Reasoning in Large Language Models (https://arxiv.org/abs/2205.10625).
3. **System 2 / cognitive forcing** — Slow the agent down with checklists, premortems, uncertainty labels, and forced evidence before closure. Source: Kahneman (2011), Thinking, Fast and Slow.
4. **Formal verification and traceability** — Map every acceptance claim to a requirement, artefact, verifier, and final status. Source: ISO/IEC/IEEE 15288 systems and software engineering lifecycle concepts.
5. **Chain-of-Thought Prompting** — Require a concise, reviewer-facing reasoning summary and evidence ledger before final status, not a private hidden monologue. Source: Wei et al. (2022), Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (https://arxiv.org/abs/2201.11903).
6. **Tree-of-Thoughts** — Require multiple candidate branches, score them against evidence, and choose or reject a branch before implementation. Source: Yao et al. (2023), Tree of Thoughts: Deliberate Problem Solving with Large Language Models (https://arxiv.org/abs/2305.10601).
7. **Self-Consistency** — Compare independent checks, command output, source inspection, and behavioural evidence instead of trusting one plausible answer. Source: Wang et al. (2022), Self-Consistency Improves Chain of Thought Reasoning in Language Models (https://arxiv.org/abs/2203.11171).
8. **Premortem failure analysis** — Assume the work failed and require likely causes before accepting a plan or final claim.

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

## Skill owner role
You are a Regression test designer.

## Skill objective
Design focused tests around the failure path and adjacent risks.

## Required inputs
- User request or review objective
- Relevant repository instructions
- Relevant files, docs, tests, scripts, screenshots, or runtime observations
- Any declared acceptance criteria or constraints
- Known limitations, blocked tools, or unavailable environments

## Skill operating procedure
1. Restate the requested outcome in one sentence and separate it from any inferred goal.
2. Read repository instructions, existing contracts, and relevant examples before proposing action.
3. Map the affected files, UI surfaces, data paths, scripts, docs, and review gates before editing.
4. List assumptions as confirmed, inferred, or unknown, and do not build final claims on unknowns.
5. Define the evidence ladder before work begins: source evidence, behavioural evidence, command evidence, and remaining manual evidence.
6. Use a premortem: assume the change failed after review and name the three most likely causes.
7. Use adversarial review: actively search for facts that would make the preferred solution wrong.
8. Prefer the smallest safe change that satisfies the requirement and preserves surrounding behaviour.
9. Define the behaviour under test in user or system terms before selecting the test type.
10. Prefer tests that fail for the bug or requirement, not tests that merely exercise the new code path.
11. Cover happy path, negative path, boundary path, permission path, and regression path when relevant.
12. Avoid over-mocking the exact behaviour that needs confidence.
13. Use stable selectors and accessible locators for UI tests wherever practical.
14. Check whether the test would catch a wrong implementation or only confirm rendering existence.
15. Separate unit, integration, end-to-end, accessibility, and manual checks in the report.
16. Investigate flakes by isolating timing, state leakage, environment differences, and order dependence.
17. Report skipped tests with reasons and risk impact.
18. Do not update snapshots or assertions unless the changed expectation is justified by the requirement.
19. Include command output and failure traces for reproducibility.
20. Treat missing tests as a known limitation, not as evidence of success.
21. Produce a repeatable procedure for regression test design rather than a one-off answer.
22. Define required inputs, optional inputs, and missing-input handling before execution.
23. Make the handoff useful to a different agent or human reviewer.
24. Include a stop condition for uncertainty that would make continued work unsafe.
25. Cite concrete file paths, function names, selectors, routes, screenshots, or command output for every important claim.
26. Mark any untested behaviour as not verified even when the implementation looks plausible.
27. Treat passing tests as one evidence source, not as proof that UI, accessibility, security, or documentation are correct.
28. State what could not be inspected and why, including missing tools, missing environment, inaccessible runtime, or absent user data.
29. Compare the final result against the original request line by line before producing the handoff.
30. Name the remaining risks that would matter to a maintainer, user, auditor, reviewer, or release owner.
31. Return a concise execution summary before the detailed evidence table.
32. List files changed with one reason per file.
33. List files inspected but not changed when they materially influenced the answer.
34. Report commands run exactly as executed and include pass, fail, skipped, or unavailable results.
35. Include a failure-disclosure section even when the outcome is strong.
36. End with one final status value and do not add marketing language after it.

37. Apply the research pattern stack: observe the artefact, decompose the task, compare paths, act with containment, verify independently, reflect on failures, and trace every claim.
38. Record the evidence source for each deliverable so a reviewer can reproduce the result.
39. When the skill fails, produce a correction note that names the failed checkpoint and the next safe action.

## Branch and feedback discipline
When the skill is used on ambiguous or risky work, include:

1. at least two plausible routes;
2. the evidence each route would need;
3. the rejected route and why it was rejected;
4. the selected route and why it is safer;
5. the failed-check feedback loop if verification does not pass.

## Deliverables
- A bounded task or review objective.
- An inspected-input list with missing inputs called out.
- A step-by-step execution trace that another agent can reproduce.
- An evidence summary with sources, commands, and manual checks separated.
- A limitation list using the status vocabulary: verified, partially verified, not verified, blocked.
- A next-safe-action recommendation that does not overclaim completion.

## Failure modes this skill is designed to prevent
- Treating a confident answer as evidence.
- Skipping repository instructions because the task feels simple.
- Collapsing uncertainty, limitation, and failure into vague reassurance.
- Making broad changes when a narrow intervention is safer.
- Reporting a final status without a reproducible evidence trail.

## Handoff format

### Trigger
Why this skill was used.

### Inputs inspected
What was actually inspected.

### Procedure followed
Numbered notes mapped to the steps above.

### Evidence collected
Files, commands, screenshots, traces, or manual checks.

### Output or recommendation
Actionable result.

### Limitations
Anything incomplete, unverified, risky, or blocked.

### Final status
Use only one of: verified, partially verified, not verified, blocked.
