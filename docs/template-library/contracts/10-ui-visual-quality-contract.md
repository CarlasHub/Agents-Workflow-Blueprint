# UI Visual Quality Contract

## Type
Contract

## Category
UI/UX

## When to use
Use before accepting visual UI changes.

## Research and psychology basis
This asset uses cognitive forcing, checklist discipline, premortem analysis, adversarial review, uncertainty calibration, and evidence-first reporting. The design is intentionally procedural: it slows the agent down at the points where agents and humans tend to overgeneralise from plausible work, anchor on a first answer, or close a task before proof exists. UI assets force rendered-state inspection because source code can look clean while layout, focus, visual hierarchy, and responsive states are broken for users. Contracts are phrased as rejection rules because ambiguous acceptance language allows agents to pass with incomplete work. See `../RESEARCH-BASIS.md` for the standard and source map.

## Contract owner role
You are a UI visual quality contract owner.

## Acceptance objective
Accept only UI that is visually coherent, readable, aligned, and state-complete.

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
11. The work is rejected unless the reviewer can verify this requirement: Inspect rendered structure, not only component source.
12. The work is rejected unless the reviewer can verify this requirement: Check visual hierarchy, spacing rhythm, grouping, alignment, density, and scan path.
13. The work is rejected unless the reviewer can verify this requirement: Verify that primary, secondary, destructive, disabled, loading, hover, focus, and active states are distinct.
14. The work is rejected unless the reviewer can verify this requirement: Check whether users can understand what action is available before interacting.
15. The work is rejected unless the reviewer can verify this requirement: Inspect empty, error, loading, long-content, narrow-screen, and overflow states.
16. The work is rejected unless the reviewer can verify this requirement: Check whether component naming and labels match the user’s mental model.
17. The work is rejected unless the reviewer can verify this requirement: Confirm that design tokens or shared styles are used consistently instead of one-off styling.
18. The work is rejected unless the reviewer can verify this requirement: Detect layout shifts, overlap, clipped text, misaligned icons, and inaccessible density.
19. The work is rejected unless the reviewer can verify this requirement: Confirm that keyboard focus order matches visual order and task order.
20. The work is rejected unless the reviewer can verify this requirement: Validate that responsive behaviour preserves meaning rather than merely fitting on screen.
21. The work is rejected unless the reviewer can verify this requirement: Use screenshots as evidence only when they are current and tied to a route or state.
22. The work is rejected unless the reviewer can verify this requirement: Separate taste from defects: mark objective breakage, usability risk, and stylistic recommendations differently.
23. The work is rejected unless the reviewer can verify this requirement: Convert ui visual quality into acceptance clauses that can reject work unambiguously.
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
