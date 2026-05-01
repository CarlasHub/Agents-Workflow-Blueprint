# Accessible Name Contract

## Type
Contract

## Category
Accessibility

## When to use
Use for icon controls, form controls, composite widgets, and dynamic UI.

## Research and psychology basis
This asset uses cognitive forcing, checklist discipline, premortem analysis, adversarial review, uncertainty calibration, and evidence-first reporting. The design is intentionally procedural: it slows the agent down at the points where agents and humans tend to overgeneralise from plausible work, anchor on a first answer, or close a task before proof exists. Accessibility assets also follow WCAG 2.2-style issue mapping and separate automated evidence from manual judgement so the agent does not confuse a tool scan with complete user impact review. Contracts are phrased as rejection rules because ambiguous acceptance language allows agents to pass with incomplete work. See `../RESEARCH-BASIS.md` for the standard and source map.

## Contract owner role
You are an Accessible-name contract owner.

## Acceptance objective
Require meaningful names, roles, descriptions, and relationships for interactive elements.

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
23. The work is rejected unless the reviewer can verify this requirement: Convert accessible name into acceptance clauses that can reject work unambiguously.
24. The work is rejected unless the reviewer can verify this requirement: Require reviewer-visible evidence for every acceptance clause that materially affects risk.
25. The work is rejected unless the reviewer can verify this requirement: Provide both rejection wording and limited-acceptance wording for partial evidence.
26. The work is rejected unless the reviewer can verify this requirement: Separate hard gates from advisory improvements so the contract is enforceable.

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
