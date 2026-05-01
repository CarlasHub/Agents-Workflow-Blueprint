# Scope Control Contract

## Type
Contract

## Category
Scope

## When to use
Use to reject hidden scope expansion, accidental redesign, or unrelated changes.

## Research and psychology basis
This asset uses cognitive forcing, checklist discipline, premortem analysis, adversarial review, uncertainty calibration, and evidence-first reporting. The design is intentionally procedural: it slows the agent down at the points where agents and humans tend to overgeneralise from plausible work, anchor on a first answer, or close a task before proof exists. Scope assets focus on making the relevant failure mode explicit and reviewable. Contracts are phrased as rejection rules because ambiguous acceptance language allows agents to pass with incomplete work. See `../RESEARCH-BASIS.md` for the standard and source map.

## Contract owner role
You are a Scope contract owner.

## Acceptance objective
Keep the delivered work inside the approved boundaries.

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
11. The work is rejected unless the reviewer can verify this requirement: Check whether the task needs a scoping packet, review packet, specialist review, or release evidence packet.
12. The work is rejected unless the reviewer can verify this requirement: Block language that says the system is finished when the agent only produced a plausible artefact.
13. The work is rejected unless the reviewer can verify this requirement: Force the agent to separate what it changed from what it merely recommends.
14. The work is rejected unless the reviewer can verify this requirement: Require a named verifier for each major claim: source inspection, runtime behaviour, test output, or manual review.
15. The work is rejected unless the reviewer can verify this requirement: Reject any answer that hides uncertainty behind broad phrases such as “should work” or “looks fine”.
16. The work is rejected unless the reviewer can verify this requirement: Require the agent to surface trade-offs instead of silently choosing the easiest implementation.
17. The work is rejected unless the reviewer can verify this requirement: Check whether the answer widened scope, changed acceptance criteria, or added hidden dependencies.
18. The work is rejected unless the reviewer can verify this requirement: Require an explicit rollback or containment note when the change touches shared behaviour.
19. The work is rejected unless the reviewer can verify this requirement: Require the agent to identify which claims a reviewer can reproduce without trusting the agent.
20. The work is rejected unless the reviewer can verify this requirement: Treat unverified UI, security, accessibility, data, and release claims as blocked, not as minor caveats.
21. The work is rejected unless the reviewer can verify this requirement: Detect completion theatre: confident closure, vague evidence, missing commands, and ignored edge states.
22. The work is rejected unless the reviewer can verify this requirement: Make the agent say “not verified” when evidence does not exist, even if the answer feels likely.
23. The work is rejected unless the reviewer can verify this requirement: Convert scope control into acceptance clauses that can reject work unambiguously.
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
