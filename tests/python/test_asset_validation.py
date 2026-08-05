import copy
import json
import sys
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from asset_composer import compose_assets, parse_registry  # noqa: E402
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

    def test_single_asset_composition_is_copy_ready_and_source_linked(self):
        composition = compose_assets([self.asset["id"]])
        first_control = self.asset["shared_controls"][0]
        control_text = parse_registry()[first_control]

        self.assertTrue(composition.startswith(f"# {self.asset['title']}\n\n## Role"))
        self.assertLess(composition.index("## Instructions"), composition.index("## Shared specialist requirements"))
        self.assertEqual(composition.count("## Shared operating rules"), 1)
        self.assertEqual(composition.count(control_text), 1)
        self.assertEqual(composition.count(f"[{first_control}]("), 1)
        self.assertIn("## References", composition)
        self.assertNotIn("# Composed Agent Workflow Asset", composition)
        self.assertNotIn("## Metadata", composition)
        self.assertNotIn("## Dependencies", composition)

    def test_multi_asset_composition_keeps_modules_and_dependencies_once(self):
        manifest = json.loads((ROOT / "docs/template-library/assets.json").read_text(encoding="utf-8"))
        selected = [manifest[0], manifest[40], manifest[70]]
        composition = compose_assets([asset["id"] for asset in selected])

        self.assertTrue(composition.startswith("# Agent Workflow Pack"))
        for asset in selected:
            self.assertEqual(composition.count(f"## {asset['title']}"), 1)
        self.assertEqual(composition.count("## Shared operating rules"), 1)
        self.assertEqual(composition.count("[Shared governance kernel]("), 1)


if __name__ == "__main__":
    unittest.main()
