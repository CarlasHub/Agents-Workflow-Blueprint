#!/usr/bin/env python3

"""Validate and aggregate provider-neutral, independently reviewed evaluation runs."""

from __future__ import annotations

import argparse
from collections import defaultdict
from datetime import date
import json
import math
from pathlib import Path
import statistics
import sys

from run_evals import CONDITIONS, ROOT, load_cases


REQUIRED_RUN_FIELDS = {
    "run_id", "model", "model_version", "configuration", "tools", "environment",
    "token_accounting", "cost_accounting", "date", "conditions",
}
REQUIRED_REVIEW_FIELDS = {
    "case_id", "condition", "reviewer_id", "acceptance_scores", "unsupported_claims",
    "final_status_accurate", "evidence_quality", "reviewer_corrections", "response_words",
    "elapsed_seconds", "input_tokens", "output_tokens", "cost_usd", "notes",
}
OBJECTIVE_REVIEW_FIELDS = (
    "response_words", "elapsed_seconds", "input_tokens", "output_tokens", "cost_usd",
)


def validate_run_manifest(run: dict) -> list[str]:
    failures: list[str] = []
    if not isinstance(run, dict):
        return ["run.json root must be an object"]
    missing = sorted(REQUIRED_RUN_FIELDS - set(run))
    if missing:
        return ["run.json missing fields: " + ", ".join(missing)]
    if run["conditions"] != list(CONDITIONS):
        failures.append("run.json conditions must match the disclosed evaluation conditions in order")
    for field in (
        "run_id", "model", "model_version", "configuration", "tools", "environment",
        "token_accounting", "cost_accounting",
    ):
        if not isinstance(run[field], str) or not run[field].strip():
            failures.append(f"run.json {field} must be a non-empty string")
    try:
        date.fromisoformat(run["date"])
    except (TypeError, ValueError):
        failures.append("run.json date must use YYYY-MM-DD")
    return failures


def validate_review(review: dict, cases: dict[str, dict]) -> list[str]:
    failures: list[str] = []
    if not isinstance(review, dict):
        return ["every review must be an object"]
    missing = sorted(REQUIRED_REVIEW_FIELDS - set(review))
    if missing:
        return ["review missing fields: " + ", ".join(missing)]
    case_id = review["case_id"]
    if not isinstance(case_id, str) or not case_id.strip():
        failures.append("case_id must be a non-empty string")
    elif case_id not in cases:
        failures.append(f"review references unknown case: {case_id}")
    if not isinstance(review["condition"], str) or review["condition"] not in CONDITIONS:
        failures.append(f"review references unknown condition: {review['condition']}")
    if not isinstance(review["reviewer_id"], str) or not review["reviewer_id"].strip():
        failures.append("reviewer_id must be a non-empty pseudonymous identifier")
    expected_criteria = set(cases.get(case_id, {}).get("acceptance_criteria", [])) if isinstance(case_id, str) else set()
    scores = review["acceptance_scores"]
    if not isinstance(scores, dict) or set(scores) != expected_criteria or any(type(value) is not bool for value in scores.values()):
        failures.append(f"{case_id} acceptance_scores must contain one boolean for every case criterion")
    for field in ("unsupported_claims", "reviewer_corrections", "response_words", "input_tokens", "output_tokens"):
        if type(review[field]) is not int or review[field] < 0:
            failures.append(f"{case_id} {field} must be a non-negative integer")
    if type(review["final_status_accurate"]) is not bool:
        failures.append(f"{case_id} final_status_accurate must be boolean")
    if type(review["evidence_quality"]) is not int or not 0 <= review["evidence_quality"] <= 4:
        failures.append(f"{case_id} evidence_quality must be an integer from 0 to 4")
    for field in ("elapsed_seconds", "cost_usd"):
        if (
            type(review[field]) not in (int, float)
            or not math.isfinite(review[field])
            or review[field] < 0
        ):
            failures.append(f"{case_id} {field} must be a non-negative number")
    if not isinstance(review["notes"], str):
        failures.append(f"{case_id} notes must be a string")
    return failures


def aggregate_reviews(reviews: list[dict]) -> dict[str, dict]:
    groups: dict[str, list[dict]] = defaultdict(list)
    for review in reviews:
        groups[review["condition"]].append(review)
    aggregates: dict[str, dict] = {}
    for condition in CONDITIONS:
        selected = groups.get(condition, [])
        output_records = {
            review["case_id"]: review
            for review in selected
        }
        outputs = list(output_records.values())
        criteria = [value for review in selected for value in review["acceptance_scores"].values()]
        aggregates[condition] = {
            "case_count": len(outputs),
            "review_count": len(selected),
            "acceptance_coverage_percent": round(100 * sum(criteria) / len(criteria), 2) if criteria else 0,
            "reviewer_reported_unsupported_claims": sum(review["unsupported_claims"] for review in selected),
            "mean_unsupported_claims": round(statistics.fmean(review["unsupported_claims"] for review in selected), 2) if selected else 0,
            "final_status_accuracy_percent": round(100 * sum(review["final_status_accurate"] for review in selected) / len(selected), 2) if selected else 0,
            "mean_evidence_quality": round(statistics.fmean(review["evidence_quality"] for review in selected), 2) if selected else 0,
            "mean_reviewer_corrections": round(statistics.fmean(review["reviewer_corrections"] for review in selected), 2) if selected else 0,
            "mean_response_words": round(statistics.fmean(review["response_words"] for review in outputs), 2) if outputs else 0,
            "mean_elapsed_seconds": round(statistics.fmean(review["elapsed_seconds"] for review in outputs), 2) if outputs else 0,
            "mean_input_tokens": round(statistics.fmean(review["input_tokens"] for review in outputs), 2) if outputs else 0,
            "mean_output_tokens": round(statistics.fmean(review["output_tokens"] for review in outputs), 2) if outputs else 0,
            "total_cost_usd": round(sum(review["cost_usd"] for review in outputs), 6),
        }
    return aggregates


def release_gate(aggregates: dict[str, dict], reviews: list[dict], high_risk_case_ids: set[str]) -> dict:
    baseline = aggregates["v2.1-prompt"]
    candidate = aggregates["v3-prompt"]
    high_risk_candidate = [
        review for review in reviews
        if review["condition"] == "v3-prompt" and review["case_id"] in high_risk_case_ids
    ]
    checks = {
        "acceptance_coverage_non_regression": candidate["acceptance_coverage_percent"] >= baseline["acceptance_coverage_percent"],
        "evidence_quality_non_regression": candidate["mean_evidence_quality"] >= baseline["mean_evidence_quality"],
        "status_accuracy_non_regression": candidate["final_status_accuracy_percent"] >= baseline["final_status_accuracy_percent"],
        "reviewer_corrections_non_regression": candidate["mean_reviewer_corrections"] <= baseline["mean_reviewer_corrections"],
        "unsupported_claims_non_regression": candidate["mean_unsupported_claims"] <= baseline["mean_unsupported_claims"],
        "input_token_growth_within_50_percent": (
            baseline["mean_input_tokens"] > 0
            and candidate["mean_input_tokens"] <= baseline["mean_input_tokens"] * 1.5
        ),
        "high_risk_candidate_has_no_unsupported_claims": bool(high_risk_candidate) and all(
            review["unsupported_claims"] == 0 for review in high_risk_candidate
        ),
        "high_risk_candidate_status_is_accurate": bool(high_risk_candidate) and all(
            review["final_status_accurate"] for review in high_risk_candidate
        ),
    }
    return {"status": "passed" if all(checks.values()) else "failed", "checks": checks}


def validate_review_matrix(reviews: list[dict], cases: dict[str, dict], directory: Path) -> list[str]:
    failures: list[str] = []
    expected_pairs = {(case_id, condition) for case_id in cases for condition in CONDITIONS}
    grouped_reviews: dict[tuple[str, str], list[dict]] = defaultdict(list)
    for review in reviews:
        grouped_reviews[(review["case_id"], review["condition"])].append(review)
    for pair in sorted(expected_pairs):
        pair_reviews = grouped_reviews[pair]
        reviewer_ids = {review["reviewer_id"] for review in pair_reviews}
        if len(pair_reviews) != 2 or len(reviewer_ids) != 2:
            failures.append(f"{pair[0]} / {pair[1]} requires exactly two independent review records")
        if pair_reviews:
            for field in OBJECTIVE_REVIEW_FIELDS:
                if len({review[field] for review in pair_reviews}) > 1:
                    failures.append(f"{pair[0]} / {pair[1]} reviewers disagree on objective field {field}")
        output_path = directory / "outputs" / pair[0] / f"{pair[1]}.md"
        if not output_path.is_file():
            failures.append(f"missing recorded output: {output_path.relative_to(directory)}")
        elif not output_path.read_text(encoding="utf-8").strip():
            failures.append(f"recorded output is empty: {output_path.relative_to(directory)}")
    unexpected_pairs = sorted(set(grouped_reviews) - expected_pairs)
    for case_id, condition in unexpected_pairs:
        failures.append(f"unexpected review pair: {case_id} / {condition}")
    return failures


def load_recorded_run(directory: Path) -> tuple[dict, list[dict], dict[str, dict]]:
    run_path = directory / "run.json"
    reviews_path = directory / "reviews.json"
    if not run_path.is_file() or not reviews_path.is_file():
        raise ValueError("recorded run requires run.json and reviews.json")
    run = json.loads(run_path.read_text(encoding="utf-8"))
    reviews = json.loads(reviews_path.read_text(encoding="utf-8"))
    if not isinstance(reviews, list):
        raise ValueError("reviews.json root must be an array")
    cases = {case["id"]: case for case in load_cases()}
    failures = validate_run_manifest(run)
    valid_reviews: list[dict] = []
    for review in reviews:
        review_failures = validate_review(review, cases)
        failures.extend(review_failures)
        if review_failures:
            continue
        valid_reviews.append(review)
    failures.extend(validate_review_matrix(valid_reviews, cases, directory))
    if failures:
        raise ValueError("\n".join(failures))
    return run, reviews, cases


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True, help="recorded run directory")
    parser.add_argument("--output", type=Path, help="optional aggregate JSON destination")
    args = parser.parse_args()
    directory = args.input if args.input.is_absolute() else ROOT / args.input
    try:
        run, reviews, cases = load_recorded_run(directory)
    except (OSError, UnicodeError, json.JSONDecodeError, ValueError) as error:
        print(f"[FAIL] {error}")
        return 1
    manifest = {asset["path"]: asset for asset in json.loads((ROOT / "docs/template-library/assets.json").read_text(encoding="utf-8"))}
    high_risk_case_ids = {
        case_id for case_id, case in cases.items() if manifest[case["prompt"]]["risk_level"] == "high"
    }
    aggregates = aggregate_reviews(reviews)
    result = {
        "suite_version": "2.0.0",
        "run": run,
        "aggregates": aggregates,
        "release_gate": release_gate(aggregates, reviews, high_risk_case_ids),
        "limitation": "Observed results apply only to the disclosed model, configuration, tools, cases, outputs, and reviewers.",
    }
    output = json.dumps(result, indent=2) + "\n"
    if args.output:
        target = args.output if args.output.is_absolute() else ROOT / args.output
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(output, encoding="utf-8")
    print(output, end="")
    return 0 if result["release_gate"]["status"] == "passed" else 1


if __name__ == "__main__":
    sys.exit(main())
