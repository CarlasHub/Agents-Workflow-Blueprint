# Repository-level evaluation methodology

## Objective

The suite compares prompt conditions for a small set of fictional engineering-review tasks. It is an evaluation harness, not scientific validation and not evidence of universal effectiveness.

## Conditions

1. `minimal`: the task and a concise instruction to complete it.
2. `kernel`: the task plus the shared governance kernel.
3. `full`: the task and the deterministic composition of the kernel, referenced specialist controls, one prompt, one skill, and one contract. Shared controls are included once.

Keep model identifier, model version or snapshot, system configuration, tool permissions, temperature or reasoning configuration, date, token accounting method, and execution environment visible for every real run. Do not compare conditions with different tools or hidden context.

## Cases and metrics

Eight fictional cases cover a bug fix, accessibility remediation, unsupported success claim, documentation contradiction, security configuration review, incomplete tests, scope creep, and release evidence. Each case defines acceptance criteria and deliberate failure signals.

Record task correctness, unsupported completion claims, missed acceptance criteria, evidence quality, reviewer corrections, final-status accuracy, input prompt words, response words, elapsed time, tokens, cost when available, and blocked or failed runs. Preserve unfavourable and incomplete results.

## Running without a model

```bash
python3 -S scripts/run_evals.py --dry-run
```

Dry-run mode validates schemas, paths, conditions, expected checks, and prompt sizes. It does not generate outputs or scores. Model-dependent metrics are marked `blocked`, not inferred.

## Running with recorded outputs

This repository intentionally does not embed a paid provider integration or API key path. A reviewer may execute each condition in an approved external model environment, save redacted raw text under a dated result directory, and use the case criteria for blinded review. Raw outputs must contain only fictional data and must disclose any omitted material.

At least two independent reviewers should score ambiguous criteria. Corrections and disagreements remain in the result. Report observed differences per case and condition; do not extrapolate from this sample to other models, tasks, organisations, or risk levels.
