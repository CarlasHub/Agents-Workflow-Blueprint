# Repository-level evaluation methodology

## Objective and limit

The suite compares prompt conditions for 40 fictional engineering tasks, with at least one case for every v3 prompt. It is a provider-neutral evaluation harness, not scientific validation and not evidence of universal effectiveness. Only a disclosed recorded run can support statements about observed model behaviour.

## Conditions

Every case uses the same task, model snapshot, system configuration, tools, and runtime limits under five conditions:

1. `minimal` — the task plus a concise baseline instruction.
2. `kernel` — the task plus the shared governance kernel.
3. `v2.1-prompt` — the task plus the frozen v2.1 composed version of the selected prompt.
4. `v3-prompt` — the task plus the v3 selected prompt composed through the production composer.
5. `v3-workflow` — the task plus the v3 prompt, selected skill and contract, governance kernel, and resolved specialist controls.

The v2.1 files under `evals/baselines/v2.1-composed/` are immutable comparison inputs. Do not regenerate them from v3 sources.

For a real run, disclose the run ID, model name, model version or snapshot, system and reasoning configuration, tool permissions, date, execution environment, token-accounting method, and cost-accounting method. A comparison is invalid if conditions receive different hidden context or capabilities.

## Cases and metrics

The 40 fictional cases cover implementation, diagnosis, scope, architecture, API, data flow, UI, responsive behavior, keyboard use, accessibility, tests, documentation, security, secrets, observability, release evidence, and final merge decisions. Each case defines acceptance criteria and deliberate failure signals.

Two independent reviewers score every case and condition. The recorded metrics are:

- criterion-level acceptance;
- unsupported completion claims;
- final-status accuracy;
- evidence quality from 0 to 4;
- reviewer corrections;
- response words and elapsed time;
- input and output tokens;
- cost when available;
- reviewer notes and retained disagreements.

Reviewers must inspect the saved raw output, not a summary. Use pseudonymous reviewer identifiers, keep corrections and unfavourable outcomes, and do not contain production secrets or personal data in cases, outputs, or notes.

## Deterministic dry run

```bash
python3 -S scripts/run_evals.py --dry-run --check
```

This validates fixture schemas, prompt coverage, asset paths, condition composition, frozen baselines, and deterministic input word counts. It does not execute a model. Behavioural metrics remain `blocked` in `evals/results/dry-run.json` and must not be inferred from structural quality.

After an intentional evaluation-input change, regenerate and review the checked-in record:

```bash
python3 -S scripts/run_evals.py --dry-run --output evals/results/dry-run.json
```

## Recorded runs and scoring

Store an external run using [`evals/recorded/README.md`](../../evals/recorded/README.md), including `run.json`, every raw condition output, and two independent reviews per case-condition pair. Score it with:

```bash
python3 -S scripts/score_evals.py --input evals/recorded/<run-id> --output evals/results/<run-id>.json
```

The scorer rejects incomplete disclosure, missing outputs, unknown cases or conditions, incomplete criterion maps, invalid metric types, and fewer than two distinct reviewer IDs per case-condition pair.

## v3 release gate

The recorded v3 prompt condition passes only when all of these checks pass against the recorded v2.1 prompt condition:

1. acceptance-criterion coverage does not decrease;
2. mean evidence quality does not decrease;
3. final-status accuracy does not decrease;
4. mean reviewer corrections do not increase;
5. mean reviewer-reported unsupported claims do not increase;
6. mean v3 input tokens are no more than 150% of the v2.1 mean;
7. every high-risk v3 review records zero unsupported claims;
8. every high-risk v3 review marks the final status accurate.

The gate is a repository release policy for this finite suite. Passing it does not establish safety, correctness, accessibility, compliance, or effectiveness outside the disclosed run.

## Interpretation

Report per-condition aggregates with the model and run disclosures beside them. Treat reviewer disagreement, blocked cases, failures, and cost increases as results. Do not extrapolate from this sample to other models, tasks, organisations, languages, tool configurations, or risk levels. A dry run supports only fixture and composition claims; a recorded run supports only observations about that run.
