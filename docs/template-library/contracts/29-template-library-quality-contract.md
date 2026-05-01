# Template Library Quality Contract

## Type
Contract

## Category
Template Product

## When to use
Use for this repository’s prompt, skill, and contract assets.

## Research and psychology basis
This asset uses cognitive forcing, checklist discipline, premortem analysis, adversarial review, uncertainty calibration, and evidence-first reporting. The design is intentionally procedural: it slows the agent down at the points where agents and humans tend to overgeneralise from plausible work, anchor on a first answer, or close a task before proof exists. Site/product assets use discoverability, progressive enhancement, and copy-friction reduction so a template library behaves like a usable product rather than a static file dump. Contracts are phrased as rejection rules because ambiguous acceptance language allows agents to pass with incomplete work. See `../RESEARCH-BASIS.md` for the standard and source map.

## Contract owner role
You are a Template library quality contract owner.

## Acceptance objective
Reject filler templates and require scenario-specific, copy-ready, enforceable assets.

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
11. The work is rejected unless the reviewer can verify this requirement: Check that the site explains the product in the first screen without relying on repository knowledge.
12. The work is rejected unless the reviewer can verify this requirement: Expose template categories, copy actions, download links, starter packs, and examples clearly.
13. The work is rejected unless the reviewer can verify this requirement: Verify that every public link points to a real file and that labels match destination content.
14. The work is rejected unless the reviewer can verify this requirement: Check mobile layout, keyboard navigation, focus visibility, skip link, contrast, and interactive affordance.
15. The work is rejected unless the reviewer can verify this requirement: Avoid turning documentation into marketing-only copy that drifts from real repository files.
16. The work is rejected unless the reviewer can verify this requirement: Add machine-readable metadata when the site needs filtering, cards, or copy-ready behaviour.
17. The work is rejected unless the reviewer can verify this requirement: Separate prompts, skills, contracts, engineering templates, examples, and research basis.
18. The work is rejected unless the reviewer can verify this requirement: Provide “when to use” guidance so users select the smallest correct asset.
19. The work is rejected unless the reviewer can verify this requirement: Make failure examples visible; a template system should teach what bad output looks like.
20. The work is rejected unless the reviewer can verify this requirement: Ensure the site can work on GitHub Pages without a build pipeline unless one is documented.
21. The work is rejected unless the reviewer can verify this requirement: Keep JavaScript progressive and accessible; plain links must still work.
22. The work is rejected unless the reviewer can verify this requirement: Treat copy buttons as usability features, not as the only access path.
23. The work is rejected unless the reviewer can verify this requirement: Convert template library quality into acceptance clauses that can reject work unambiguously.
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
