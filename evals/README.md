# Comparative evaluation suite

This directory contains a repository-level, fictional evaluation suite for comparing five prompt conditions across all 40 prompts. It contains deterministic fixtures and scoring infrastructure, not model-generated performance results or scientific validation.

## Layout

- `cases/` — 40 tasks with acceptance criteria, failure signals, and selected prompt, skill, and contract paths.
- `baselines/` — minimal, kernel-only, full-workflow, and frozen v2.1 composed instructions.
- `results/dry-run.json` — checked-in deterministic coverage, composition, and prompt-size record.
- `recorded/` — the format for externally generated, redacted outputs and independent reviews.
- [`evaluation-methodology.md`](../docs/engineering/evaluation-methodology.md) — conditions, scoring, release gates, disclosure requirements, and interpretation limits.

## Deterministic validation

Reject drift from the checked-in dry-run record:

```bash
python3 -S scripts/run_evals.py --dry-run --check
```

Regenerate the record only after an intentional fixture, prompt, composer, or condition change:

```bash
python3 -S scripts/run_evals.py --dry-run --output evals/results/dry-run.json
```

The runner verifies that every prompt has a case, every referenced asset exists, the v2.1 baseline is present, all five conditions compose, and their input word counts are reproducible. Success does not prove that one condition improves model behaviour.

## Recorded-output scoring

Generate outputs in an approved external environment, preserve them using the [`recorded/` format](recorded/README.md), and obtain two independent reviews for every case and condition. Then run:

```bash
python3 -S scripts/score_evals.py --input evals/recorded/<run-id> --output evals/results/<run-id>.json
```

The scorer validates disclosure and review completeness, aggregates observed metrics, and applies the documented v3-versus-v2.1 release gate. It does not call a model, create credentials, or infer missing results.
