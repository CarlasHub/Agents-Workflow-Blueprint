# Recorded evaluation run format

Create one directory per disclosed external run:

```text
evals/recorded/<run-id>/
├── run.json
├── reviews.json
└── outputs/
    └── <case-id>/
        ├── minimal.md
        ├── kernel.md
        ├── v2.1-prompt.md
        ├── v3-prompt.md
        └── v3-workflow.md
```

Use only fictional or properly redacted material. Keep raw outputs unchanged after review begins. Do not store API keys, production data, personal data, hidden system prompts, or confidential tool results.

## `run.json`

```json
{
  "run_id": "2026-08-05-model-snapshot-a",
  "model": "provider/model-name",
  "model_version": "immutable-snapshot-or-version",
  "configuration": "system, temperature/reasoning, limits, and token accounting",
  "tools": "identical tool permissions and fixtures for every condition",
  "environment": "runtime, region, operating system, and other material execution details",
  "token_accounting": "provider usage fields or disclosed alternative",
  "cost_accounting": "rate source and calculation method",
  "date": "2026-08-05",
  "conditions": ["minimal", "kernel", "v2.1-prompt", "v3-prompt", "v3-workflow"]
}
```

## `reviews.json`

The root is an array. Include two records with distinct pseudonymous `reviewer_id` values for every case and condition. `acceptance_scores` must contain every acceptance-criterion string from that case as a Boolean key-value pair.

The two reviewers must record identical `response_words`, `elapsed_seconds`, `input_tokens`, `output_tokens`, and `cost_usd` for the same raw output. The scorer de-duplicates these objective fields before aggregation; it rejects reviewer disagreement so token and cost totals cannot be counted twice or silently altered.

```json
[
  {
    "case_id": "small-bug-fix",
    "condition": "v3-prompt",
    "reviewer_id": "reviewer-a",
    "acceptance_scores": {
      "Root cause identified": true,
      "Exact-multiple case corrected": true,
      "Boundary regression test included": true,
      "Unrelated behaviour preserved": true
    },
    "unsupported_claims": 0,
    "final_status_accurate": true,
    "evidence_quality": 4,
    "reviewer_corrections": 0,
    "response_words": 612,
    "elapsed_seconds": 18.4,
    "input_tokens": 2210,
    "output_tokens": 940,
    "cost_usd": 0.0,
    "notes": "Blinded review; no correction required."
  }
]
```

`evidence_quality` uses 0 for absent evidence, 1 for unsupported assertions, 2 for partial artefact references, 3 for traceable source or command evidence, and 4 for traceable evidence plus relevant failure-path and limitation disclosure.

## Validate and score

```bash
python3 -S scripts/score_evals.py --input evals/recorded/<run-id> --output evals/results/<run-id>.json
```

The command returns non-zero for invalid records or a failed release gate. Its result applies only to the disclosed run.
