# Keyboard Testing Skill

## Type
Skill

## Category
Accessibility

## When to use
Use when interactive flows must be tested by keyboard.

## Research and psychology basis
This asset uses cognitive forcing, checklist discipline, premortem analysis, adversarial review, uncertainty calibration, and evidence-first reporting. The design is intentionally procedural: it slows the agent down at the points where agents and humans tend to overgeneralise from plausible work, anchor on a first answer, or close a task before proof exists. Accessibility assets also follow WCAG 2.2-style issue mapping and separate automated evidence from manual judgement so the agent does not confuse a tool scan with complete user impact review. Skills are written as repeatable procedures so the agent has to follow the same evidence path each time instead of improvising a polished answer. See `../RESEARCH-BASIS.md` for the standard and source map.

## Skill owner role
You are a Keyboard test operator.

## Skill objective
Verify keyboard navigation, focus order, traps, restoration, and state changes.

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
9. Map findings to relevant WCAG 2.2 success criteria when the issue is within WCAG scope.
10. Inspect semantic HTML before adding ARIA; do not replace native behaviour with fragile custom roles.
11. Check accessible names, roles, states, descriptions, and relationships for interactive elements.
12. Verify keyboard operation, focus visibility, tab order, focus restoration, and escape behaviour.
13. Check labels, instructions, errors, required states, and validation feedback for forms.
14. Evaluate contrast, target size, text resizing, reduced motion, and non-colour indicators where relevant.
15. Check announcements for dynamic content, loading, errors, route changes, and status updates.
16. Separate automated findings from manual judgement and assistive-technology risk.
17. Use Playwright or axe-style checks as evidence, not as a complete accessibility verdict.
18. Reject phrases that imply full accessibility without broad manual evidence.
19. Document user impact, not only technical attributes.
20. Confirm that remediation does not create keyboard traps, focus loss, duplicate names, or semantic conflicts.
21. Produce a repeatable procedure for keyboard testing rather than a one-off answer.
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
