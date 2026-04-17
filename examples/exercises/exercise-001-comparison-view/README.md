# Exercise 001: Comparison View Workflow Drill

## Purpose

Teach students how to run the full enterprise workflow for a realistic dashboard task:

1. scoping
2. implementation
3. review
4. specialist review
5. verification
6. release honesty

## Inputs

- task brief: `examples/tasks/task-001-add-comparison-view.md`
- domain brief: `examples/briefs/internal-quality-dashboard.md`
- workflow rules: `AGENTS.md`, `requirements.toml`, `docs/engineering/workflow.md`

## Student deliverables

- scoping packet using `docs/engineering/templates/scoping-packet-template.md`
- implementation summary tied to the real diff
- review packet using `docs/engineering/templates/review-packet-template.md`
- accessibility review if the task changes user interaction
- security review if export or access control behaviour is touched
- release evidence packet using `docs/engineering/templates/release-evidence-template.md`

## Instructor use

Compare the student output against:

- `examples/exercises/exercise-001-comparison-view/expected-good-scoping-packet.md`
- `examples/exercises/exercise-001-comparison-view/expected-bad-scoping-packet.md`
- `examples/exercises/exercise-001-comparison-view/expected-good-review.md`
- `examples/exercises/exercise-001-comparison-view/expected-bad-review.md`
- `docs/teaching/grading-rubric.md`
