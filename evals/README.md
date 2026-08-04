# Comparative evaluation suite

This directory contains a repository-level, fictional evaluation suite for comparing three prompt conditions. It does not contain model-generated performance results and must not be described as scientific validation.

## Layout

- `cases/` — tasks, acceptance criteria, selected assets, and failure signals.
- `baselines/` — the minimal, kernel-only, and full-workflow condition instructions.
- `results/` — deterministic dry-run output and, when available, dated disclosed model runs.
- [`evaluation-methodology.md`](../docs/engineering/evaluation-methodology.md) — scoring, disclosure, and interpretation rules.

Run the offline validation:

```bash
python3 -S scripts/run_evals.py --dry-run
```

For the `full` condition, the runner resolves the selected prompt, skill, contract, kernel, and shared specialist controls through the production composer. Dry-run success proves that cases and composed references are structurally usable. It does not prove that any workflow condition improves model behaviour.
