import sys
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from score_evals import (  # noqa: E402
    CONDITIONS,
    aggregate_reviews,
    release_gate,
    validate_review,
    validate_review_matrix,
    validate_run_manifest,
)


class EvaluationScoringTest(unittest.TestCase):
    def setUp(self):
        self.case = {
            "id": "example-case",
            "acceptance_criteria": ["Criterion A", "Criterion B"],
        }
        self.review = {
            "case_id": "example-case",
            "condition": "v3-prompt",
            "reviewer_id": "reviewer-a",
            "acceptance_scores": {"Criterion A": True, "Criterion B": False},
            "unsupported_claims": 0,
            "final_status_accurate": True,
            "evidence_quality": 3,
            "reviewer_corrections": 1,
            "response_words": 400,
            "elapsed_seconds": 8.5,
            "input_tokens": 1200,
            "output_tokens": 600,
            "cost_usd": 0.01,
            "notes": "Pseudonymous blinded review.",
        }

    def test_validates_disclosed_run_and_complete_review(self):
        run = {
            "run_id": "run-1",
            "model": "disclosed-model",
            "model_version": "snapshot",
            "configuration": "fixed configuration",
            "tools": "same tools for every condition",
            "environment": "isolated fictional evaluation environment",
            "token_accounting": "provider usage fields",
            "cost_accounting": "published unit rates at run date",
            "date": "2026-08-05",
            "conditions": ["minimal", "kernel", "v2.1-prompt", "v3-prompt", "v3-workflow"],
        }
        self.assertEqual(validate_run_manifest(run), [])
        self.assertEqual(validate_review(self.review, {"example-case": self.case}), [])

    def test_rejects_partial_criteria_and_invalid_scores(self):
        review = dict(self.review)
        review["acceptance_scores"] = {"Criterion A": True}
        review["evidence_quality"] = 5
        failures = validate_review(review, {"example-case": self.case})
        self.assertTrue(any("acceptance_scores" in failure for failure in failures))
        self.assertTrue(any("evidence_quality" in failure for failure in failures))

    def test_rejects_malformed_identifiers_and_boolean_numeric_metrics(self):
        review = dict(self.review)
        review["case_id"] = []
        review["unsupported_claims"] = False
        review["elapsed_seconds"] = True
        failures = validate_review(review, {"example-case": self.case})
        self.assertTrue(any("case_id" in failure for failure in failures))
        self.assertTrue(any("unsupported_claims" in failure for failure in failures))
        self.assertTrue(any("elapsed_seconds" in failure for failure in failures))

    def test_aggregates_conditions_and_enforces_candidate_gate(self):
        reviews = []
        for condition, tokens in (("v2.1-prompt", 1000), ("v3-prompt", 1200)):
            for reviewer in ("reviewer-a", "reviewer-b"):
                review = dict(self.review)
                review.update({
                    "condition": condition,
                    "reviewer_id": reviewer,
                    "acceptance_scores": {"Criterion A": True, "Criterion B": True},
                    "input_tokens": tokens,
                    "evidence_quality": 4,
                    "reviewer_corrections": 0,
                })
                reviews.append(review)
        aggregates = aggregate_reviews(reviews)
        gate = release_gate(aggregates, reviews, {"example-case"})
        self.assertEqual(aggregates["v3-prompt"]["acceptance_coverage_percent"], 100)
        self.assertEqual(aggregates["v3-prompt"]["total_cost_usd"], 0.01)
        self.assertEqual(gate["status"], "passed")

    def test_review_matrix_requires_two_reviewers_and_consistent_objective_metrics(self):
        with TemporaryDirectory() as temp_dir:
            directory = Path(temp_dir)
            reviews = []
            for condition in CONDITIONS:
                output_path = directory / "outputs" / "example-case" / f"{condition}.md"
                output_path.parent.mkdir(parents=True, exist_ok=True)
                output_path.write_text("Recorded fictional output.\n", encoding="utf-8")
                for reviewer_id in ("reviewer-a", "reviewer-b"):
                    review = dict(self.review)
                    review.update({"condition": condition, "reviewer_id": reviewer_id})
                    reviews.append(review)
            self.assertEqual(validate_review_matrix(reviews, {"example-case": self.case}, directory), [])

            reviews[1]["cost_usd"] = 0.02
            failures = validate_review_matrix(reviews, {"example-case": self.case}, directory)
            self.assertTrue(any("objective field cost_usd" in failure for failure in failures))

            reviews[1]["cost_usd"] = reviews[0]["cost_usd"]
            reviews[1]["reviewer_id"] = "reviewer-a"
            failures = validate_review_matrix(reviews, {"example-case": self.case}, directory)
            self.assertTrue(any("exactly two independent" in failure for failure in failures))


if __name__ == "__main__":
    unittest.main()
