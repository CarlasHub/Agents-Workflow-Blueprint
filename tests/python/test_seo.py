import json
from pathlib import Path
import sys
import tempfile
import unittest
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from build_seo import (  # noqa: E402
    SITE_URL,
    library_index_html,
    load_assets,
    public_document_sources,
    rendered_document_path,
    robots_text,
    sitemap_xml,
)


class SeoBuildTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.assets = load_assets()

    def test_library_index_contains_every_asset_as_a_crawlable_link(self):
        page = library_index_html(self.assets)
        self.assertEqual(page.count('class="asset-card"'), 100)
        for asset in self.assets:
            self.assertIn(f'id="{asset["id"]}"', page)
            self.assertIn(asset["title"], page)
            self.assertIn(f'../{rendered_document_path(asset["path"])}', page)
            self.assertIn(f'href="../{asset["path"]}" download>Download Markdown source', page)
        self.assertIn('name="assetSearch"', page)
        self.assertIn('name="robots" content="index,follow,max-image-preview:large"', page)
        self.assertIn('name="twitter:card" content="summary_large_image"', page)
        self.assertIn('property="og:image:type" content="image/png"', page)

    def test_sitemap_is_valid_and_contains_unique_canonical_urls(self):
        source = sitemap_xml(self.assets)
        root = ET.fromstring(source)
        namespace = {"sitemap": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locations = [element.text for element in root.findall("sitemap:url/sitemap:loc", namespace)]
        self.assertEqual(len(locations), 5 + len(public_document_sources()))
        self.assertEqual(len(locations), len(set(locations)))
        self.assertTrue(all(location.startswith(SITE_URL) for location in locations))
        self.assertTrue(all(not location.endswith(".md") for location in locations))
        self.assertIn(SITE_URL, locations)
        self.assertIn(f"{SITE_URL}library/", locations)
        self.assertIn(f"{SITE_URL}privacy.html", locations)
        self.assertIn(f"{SITE_URL}docs/template-library/CODEX-USAGE-GUIDE.html", locations)
        self.assertIn(
            f"{SITE_URL}docs/template-library/prompts/01-master-agent-enforcement-prompt.html",
            locations,
        )

    def test_robots_points_to_the_canonical_sitemap(self):
        source = robots_text()
        self.assertIn("User-agent: *", source)
        self.assertIn(f"Sitemap: {SITE_URL}sitemap.xml", source)

    def test_manifest_loader_rejects_duplicate_and_unsafe_paths(self):
        sample = {
            "id": "prompt-example",
            "type": "prompt",
            "title": "Example",
            "category": "Testing",
            "path": "docs/template-library/prompts/example.md",
            "summary": "Example summary",
            "tags": ["testing"],
        }
        with tempfile.TemporaryDirectory() as directory:
            manifest = Path(directory) / "assets.json"
            manifest.write_text(json.dumps([sample, sample]), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "duplicate"):
                load_assets(manifest)

            unsafe = dict(sample, path="docs/template-library/../secret.md")
            manifest.write_text(json.dumps([unsafe]), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "unsafe"):
                load_assets(manifest)


if __name__ == "__main__":
    unittest.main()
