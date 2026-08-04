import copy
import json
import sys
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from check_template_library import specialist_body_failures, valid_manifest_entry  # noqa: E402


class AssetValidationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.asset = json.loads((ROOT / "docs/template-library/assets.json").read_text(encoding="utf-8"))[0]

    def test_accepts_current_manifest_entry(self):
        self.assertEqual(valid_manifest_entry(self.asset, 0), [])

    def test_rejects_missing_metadata(self):
        asset = copy.deepcopy(self.asset)
        del asset["version"]
        failures = valid_manifest_entry(asset, 0)
        self.assertTrue(any("missing keys" in failure for failure in failures))

    def test_rejects_missing_kernel_dependency(self):
        asset = copy.deepcopy(self.asset)
        asset["dependencies"].remove("docs/template-library/GOVERNANCE-KERNEL.md")
        failures = valid_manifest_entry(asset, 0)
        self.assertTrue(any("governance kernel" in failure for failure in failures))

    def test_rejects_hollow_specialist_body(self):
        failures = specialist_body_failures(
            "example.md",
            "Procedure",
            "Follow the referenced specialist controls as the executable procedure.",
        )
        self.assertTrue(any("at least 3" in failure for failure in failures))
        self.assertTrue(any("delegates its entire specialist body" in failure for failure in failures))

    def test_accepts_three_asset_specific_items(self):
        body = "1. Inspect the owner.\n2. Exercise the failure path.\n3. Record direct evidence."
        self.assertEqual(specialist_body_failures("example.md", "Procedure", body), [])


if __name__ == "__main__":
    unittest.main()
