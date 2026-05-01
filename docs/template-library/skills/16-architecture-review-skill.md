# Architecture Review Skill

## Type
Skill

## Category
Architecture

## When to use
Use when reviewing boundaries, ownership, coupling, and long-term maintainability.

## Research and psychology basis
This asset uses cognitive forcing, checklist discipline, premortem analysis, adversarial review, uncertainty calibration, and evidence-first reporting. The design is intentionally procedural: it slows the agent down at the points where agents and humans tend to overgeneralise from plausible work, anchor on a first answer, or close a task before proof exists. Architecture assets emphasise maintainability, ownership, testability, and staged change because broad rewrites often hide risk behind tidier-looking structure. Skills are written as repeatable procedures so the agent has to follow the same evidence path each time instead of improvising a polished answer. See `../RESEARCH-BASIS.md` for the standard and source map.

## Skill owner role
You are an Architecture reviewer.

## Skill objective
Assess architectural health and propose safe correction paths.

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
9. Inspect module boundaries and identify whether responsibilities are isolated or leaking across layers.
10. Look for hidden coupling through shared state, implicit globals, broad utilities, or context objects.
11. Detect duplicated logic that should be consolidated only when consolidation would not obscure intent.
12. Flag large functions, broad conditionals, brittle naming, and unclear ownership.
13. Check whether data contracts, UI contracts, and API contracts are mixed in the same place.
14. Identify dead code, unreachable branches, unused exports, and stale configuration.
15. Evaluate whether abstractions simplify real behaviour or merely add indirection.
16. Inspect error handling paths for silent failure, swallowed exceptions, and misleading fallbacks.
17. Check whether future tests can target the behaviour without excessive mocking.
18. Detect accidental framework drift, dependency creep, and inconsistent file organisation.
19. Recommend refactors in safe phases rather than one risky rewrite.
20. Tie every architectural recommendation to maintainability, correctness, testability, or risk reduction.
21. Produce a repeatable procedure for architecture review rather than a one-off answer.
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
