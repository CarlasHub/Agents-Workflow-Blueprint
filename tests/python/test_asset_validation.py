import copy
import json
import sys
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from asset_composer import compose_assets, parse_registry  # noqa: E402
from check_template_library import prompt_quality_failures, specialist_body_failures, valid_manifest_entry  # noqa: E402


class AssetValidationTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.asset = json.loads((ROOT / "docs/template-library/assets.json").read_text(encoding="utf-8"))[0]

    def test_accepts_current_manifest_entry(self):
        self.assertEqual(valid_manifest_entry(self.asset, 0), [])

    def test_rejects_evaluation_mapping_drift(self):
        asset = copy.deepcopy(self.asset)
        asset["evaluation_cases"] = []
        failures = valid_manifest_entry(
            asset,
            0,
            evaluation_case_ids={"expected-case"},
            expected_evaluation_cases={"expected-case"},
        )
        self.assertTrue(any("no behavioural evaluation case" in failure for failure in failures))
        self.assertTrue(any("do not match case asset selections" in failure for failure in failures))

    def test_accepts_current_v3_prompt_quality(self):
        source = (ROOT / self.asset["path"]).read_text(encoding="utf-8")
        self.assertEqual(prompt_quality_failures(self.asset, self.asset["path"], source), [])

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

    def test_rejects_legacy_prompt_boundary_and_hollow_v3_sections(self):
        source = (ROOT / self.asset["path"]).read_text(encoding="utf-8")
        source = source.replace(
            source.split("## When not to use\n\n", 1)[1].split("\n\n## Dependencies", 1)[0],
            "Do not use outside this boundary: the stated task.",
        )
        source = source.replace(
            source.split("## Decision gates\n\n", 1)[1].split("\n\n## Required evidence", 1)[0],
            "1. Proceed when ready.",
        )
        failures = prompt_quality_failures(self.asset, "example.md", source)
        self.assertTrue(any("When not to use" in failure for failure in failures))
        self.assertTrue(any("decision gates" in failure for failure in failures))

    def test_rejects_detailed_boundary_without_an_alternative_route(self):
        source = (ROOT / self.asset["path"]).read_text(encoding="utf-8")
        original = source.split("## When not to use\n\n", 1)[1].split("\n\n## Dependencies", 1)[0]
        source = source.replace(
            original,
            "Do not use this prompt for an unrelated engineering task because its intended scope and available evidence are materially different from the request.",
        )
        failures = prompt_quality_failures(self.asset, "example.md", source)
        self.assertTrue(any("alternative route" in failure for failure in failures))

    def test_rejects_manifest_input_drift_and_missing_response_schema(self):
        source = (ROOT / self.asset["path"]).read_text(encoding="utf-8")
        source = source.replace("- The exact requested outcome", "- A materially different requested outcome", 1)
        source = source.replace("```markdown", "```text", 1)
        failures = prompt_quality_failures(self.asset, "example.md", source)
        self.assertTrue(any("Required inputs do not match" in failure for failure in failures))
        self.assertTrue(any("response template" in failure for failure in failures))

    def test_single_asset_composition_is_copy_ready_and_source_linked(self):
        composition = compose_assets([self.asset["id"]])
        first_control = self.asset["shared_controls"][0]
        control_text = parse_registry()[first_control]

        self.assertTrue(composition.startswith(f"# {self.asset['title']}\n\n## Use this when"))
        self.assertLess(composition.index("## Inputs required"), composition.index("## Role"))
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
