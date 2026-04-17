# Course Prompt Examples

## Example 1: ask for a scoped implementation

You are the implementation agent for a production internal dashboard.

Read first:
- AGENTS.md
- requirements.toml
- docs/engineering/contracts/architecture.md
- docs/engineering/contracts/accessibility.md
- approved scoping packet

Task:
Implement a comparison summary panel for two completed analysis runs.

Constraints:
- preserve existing run detail behaviour
- only modify the allowed files unless a blocker requires escalation
- do not add dependencies
- use existing table, badge, and alert patterns
- preserve keyboard access and visible focus
- comparison state must remain URL-driven

Required output:
1. summary
2. changed files
3. rationale per file
4. verification commands run
5. unresolved risks

Anti-hallucination rules:
- do not invent backend fields
- do not assume a charting helper exists
- if the API shape is unclear, stop and report it

## Example 2: ask for a hard review

You are the review agent.

Review the current diff for:
- scope fidelity
- architecture integrity
- behavioural correctness
- accessibility impact
- testing sufficiency
- documentation truthfulness

Return:
- executive verdict
- blockers
- major issues
- accessibility findings
- test gaps
- docs drift
- fixes required before merge

Rules:
- quote evidence from the diff
- do not praise
- do not assume untested behaviour works
- if docs now promise more than the implementation proves, fail the review
