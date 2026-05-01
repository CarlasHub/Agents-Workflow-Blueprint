# Traceability Matrix Pattern

Use this pattern when an agent must prove that work satisfies requirements instead of merely describing what it did.

## Requirement-to-evidence matrix

| Requirement | Source inspected | Action taken | Verification evidence | Status | Remaining gap |
| --- | --- | --- | --- | --- | --- |
| <requirement> | <file/path/UI/doc> | <change/review> | <command/manual check> | verified / partially verified / not verified / blocked | <gap> |

## Rules

1. Every material requirement gets one row.
2. Every acceptance claim must point to a row.
3. Unknowns stay visible as unknowns.
4. Passing tests cannot prove unrelated UI, security, accessibility, or docs claims.
5. Manual checks must be named, not implied.
6. Unavailable tools must be disclosed.
7. A requirement with no evidence cannot be marked verified.
8. A release claim must include limitation rows.
9. A contract clause can reject work even when implementation looks plausible.
10. The final status must match the weakest material row.

## Example

| Requirement | Source inspected | Action taken | Verification evidence | Status | Remaining gap |
| --- | --- | --- | --- | --- | --- |
| Copy button works | `index.html`, `site.css` | Added `navigator.clipboard.writeText` handler | Manual browser check unavailable in static repo verification | partially verified | Browser runtime still needs manual test |
| Template count is 100 | `docs/template-library/assets.json` | Manifest checked by script | `python3 -S scripts/check_template_library.py` passed | verified | None |


## Required research vocabulary cross-reference

This document participates in the same control vocabulary used across the library: CoT-safe public reasoning, Tree-of-Thoughts branch evaluation, ReAct observation loops, Least-to-most decomposition, Self-consistency checks, Self-refinement after failed checks, Process supervision, and traceability.
