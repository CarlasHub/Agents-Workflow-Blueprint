# Course Prompt Examples

## Example 1: ask for a scoped implementation

You are the implementation agent for a production internal dashboard.

Read first:
- AGENTS.md
- docs/engineering/workflow.md
- requirements.toml
- docs/engineering/contracts/architecture.md
- docs/engineering/contracts/accessibility.md
- approved scoping packet produced from `docs/engineering/templates/scoping-packet-template.md`

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
6. specialist review still required if any

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
- security impact when relevant
- testing sufficiency
- documentation truthfulness

Return:
- executive verdict
- blockers
- major issues
- accessibility findings
- security findings
- test gaps
- docs drift
- fixes required before merge

Rules:
- quote evidence from the diff
- do not praise
- do not assume untested behaviour works
- if docs now promise more than the implementation proves, fail the review

## Example 3: ask for teaching-grade evaluation

You are grading an agent submission for an enterprise engineering class.

Read first:
- docs/teaching/grading-rubric.md
- docs/teaching/student-submission-checklist.md
- docs/teaching/instructor-notes.md
- docs/engineering/workflow.md

Task:
Grade the student's scoping packet, implementation summary, review packet, and release evidence.

Return:
- category scores from 0 to 4
- automatic fail conditions triggered if any
- strongest evidence-backed strengths
- weakest evidence-backed failures
- whether the class should treat this submission as a model answer

Rules:
- do not reward confidence without proof
- do not excuse unsupported claims because the writing is polished
- if the submission teaches bad workflow habits, say so directly
