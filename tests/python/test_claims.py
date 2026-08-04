import sys
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from check_claims import scan_text  # noqa: E402


class ClaimChecksTest(unittest.TestCase):
    def test_rejects_positive_unsupported_claim_with_location(self):
        violations = scan_text("Intro\nThis workflow is production-ready.", "sample.md")
        self.assertEqual(len(violations), 1)
        self.assertEqual(violations[0].path, "sample.md")
        self.assertEqual(violations[0].line, 2)
        self.assertEqual(violations[0].phrase, "production-ready")

    def test_allows_explicit_limitation_and_prohibition(self):
        self.assertEqual(scan_text("This workflow is not production-ready."), [])
        self.assertEqual(scan_text("Never claim:\n- fully accessible"), [])
        self.assertEqual(scan_text("Do not say this is scientifically proven."), [])

    def test_rejects_research_backed_and_guaranteed_reliability(self):
        text = "A research-backed system.\nIt guarantees reliable output."
        violations = scan_text(text)
        self.assertEqual([item.rule for item in violations], ["research certainty", "guaranteed reliability"])


if __name__ == "__main__":
    unittest.main()
