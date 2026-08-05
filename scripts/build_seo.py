#!/usr/bin/env python3

"""Build or verify crawlable SEO artefacts for the static site."""

from __future__ import annotations

import argparse
from html import escape
import json
from pathlib import Path, PurePosixPath
import sys
from urllib.parse import quote


ROOT = Path(__file__).resolve().parents[1]
SITE_URL = "https://carlashub.github.io/Agents-Workflow-Blueprint/"
MANIFEST_PATH = ROOT / "docs" / "template-library" / "assets.json"
ROBOTS_PATH = ROOT / "robots.txt"
SITEMAP_PATH = ROOT / "sitemap.xml"
LIBRARY_INDEX_PATH = ROOT / "library" / "index.html"
SOCIAL_IMAGE_URL = f"{SITE_URL}assets/agent-workflow-blueprint-social.png"

CORE_PATHS = (
    "",
    "library/",
    "build-project/",
    "docs/",
    "privacy.html",
    "docs/template-library/START-HERE.md",
    "docs/template-library/CATALOGUE.md",
    "docs/template-library/RESEARCH-BASIS.md",
    "docs/template-library/CODEX-USAGE-GUIDE.md",
    "docs/template-library/PROMPT-ARCHITECTURE.md",
)


def load_assets(path: Path = MANIFEST_PATH) -> list[dict]:
    assets = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(assets, list):
        raise ValueError("asset manifest root must be an array")
    required = {"id", "type", "title", "category", "path", "summary", "tags"}
    seen_ids: set[str] = set()
    seen_paths: set[str] = set()
    for asset in assets:
        if not isinstance(asset, dict) or not required.issubset(asset):
            raise ValueError("asset manifest contains an incomplete entry")
        asset_id = asset["id"]
        asset_path = asset["path"]
        if asset_id in seen_ids or asset_path in seen_paths:
            raise ValueError(f"asset manifest contains a duplicate ID or path: {asset_id}")
        if asset["type"] not in {"prompt", "skill", "contract"}:
            raise ValueError(f"asset manifest contains an unsupported type: {asset['type']}")
        path_parts = PurePosixPath(asset_path).parts
        if (
            not asset_path.startswith("docs/template-library/")
            or not asset_path.endswith(".md")
            or not path_parts
            or any(part in {"", ".", ".."} for part in path_parts)
        ):
            raise ValueError(f"asset manifest contains an unsafe public path: {asset_path}")
        seen_ids.add(asset_id)
        seen_paths.add(asset_path)
    return assets


def public_url(path: str) -> str:
    return SITE_URL + quote(path, safe="/-._~")


def robots_text() -> str:
    return (
        "User-agent: *\n"
        "Allow: /Agents-Workflow-Blueprint/\n\n"
        f"Sitemap: {SITE_URL}sitemap.xml\n"
    )


def sitemap_xml(assets: list[dict]) -> str:
    paths = list(dict.fromkeys((*CORE_PATHS, *(asset["path"] for asset in assets))))
    entries = []
    for path in paths:
        image = ""
        if path == "":
            image = (
                "\n    <image:image>"
                f"<image:loc>{escape(SOCIAL_IMAGE_URL)}</image:loc>"
                "<image:title>Agent Workflow Blueprint</image:title>"
                "</image:image>"
            )
        entries.append(f"  <url>\n    <loc>{escape(public_url(path))}</loc>{image}\n  </url>")
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
        + "\n".join(entries)
        + "\n</urlset>\n"
    )


def asset_card(asset: dict) -> str:
    tags = ", ".join(str(tag) for tag in asset["tags"])
    source_href = f"../{quote(asset['path'], safe='/-._~')}"
    return f'''        <article class="asset-card" id="{escape(asset['id'], quote=True)}">
          <div class="asset-card-head">
            <span class="asset-type">{escape(asset['type'].title())}</span>
            <span class="asset-category">{escape(asset['category'])}</span>
          </div>
          <h3><a href="{source_href}">{escape(asset['title'])}</a></h3>
          <p>{escape(asset['summary'])}</p>
          <p class="catalogue-tags"><strong>Topics:</strong> {escape(tags)}</p>
        </article>'''


def library_index_html(assets: list[dict]) -> str:
    sections = []
    for asset_type in ("prompt", "skill", "contract"):
        selected = [asset for asset in assets if asset["type"] == asset_type]
        cards = "\n".join(asset_card(asset) for asset in selected)
        sections.append(
            f'''      <section class="section" id="{asset_type}s" aria-labelledby="{asset_type}s-title">
        <div class="shell">
          <p class="eyebrow">{len(selected)} {escape(asset_type)} assets</p>
          <h2 id="{asset_type}s-title">{escape(asset_type.title())}s</h2>
          <div class="asset-grid catalogue-grid">
{cards}
          </div>
        </div>
      </section>'''
        )
    return f'''<!doctype html>
<html lang="en" data-color-mode="dark" data-dark-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="theme-color" content="#0d1117">
    <title>100 AI Coding Agent Prompts, Skills and Contracts | Agent Workflow Blueprint</title>
    <meta name="description" content="Browse 100 research-informed prompts, reusable skills and acceptance contracts for evidence-first AI coding-agent workflows.">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="{SITE_URL}library/">
    <link rel="sitemap" type="application/xml" href="../sitemap.xml">
    <link rel="icon" type="image/png" href="../assets/human-body-brand.png">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Agent Workflow Blueprint">
    <meta property="og:title" content="100 AI Coding Agent Prompts, Skills and Contracts">
    <meta property="og:description" content="A crawlable catalogue of evidence-first prompts, procedures and acceptance gates for software-development agents.">
    <meta property="og:url" content="{SITE_URL}library/">
    <meta property="og:image" content="{SOCIAL_IMAGE_URL}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:alt" content="Agent Workflow Blueprint: Prompts, Skills and Contracts">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="100 AI Coding Agent Prompts, Skills and Contracts">
    <meta name="twitter:description" content="A crawlable catalogue of evidence-first prompts, procedures and acceptance gates for software-development agents.">
    <meta name="twitter:image" content="{SOCIAL_IMAGE_URL}">
    <meta name="twitter:image:alt" content="Agent Workflow Blueprint: Prompts, Skills and Contracts">
    <link rel="stylesheet" href="../site.css?v=20260805-4">
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to catalogue</a>
    <header class="site-header">
      <div class="topbar shell">
        <a class="brand" href="../">Agent Workflow Blueprint</a>
        <nav class="site-nav" aria-label="Catalogue navigation">
          <a href="../">Interactive library</a>
          <a href="#prompts">Prompts</a>
          <a href="#skills">Skills</a>
          <a href="#contracts">Contracts</a>
          <a href="../build-project/">Build project</a>
        </nav>
      </div>
    </header>
    <main id="content">
      <section class="hero catalogue-hero">
        <div class="shell">
          <p class="eyebrow">Static, crawlable catalogue</p>
          <h1>100 prompts, skills and contracts for AI coding-agent workflows.</h1>
          <p class="hero-lead">Browse every asset without relying on JavaScript. Use the interactive library to search, preview and copy complete agent-ready bodies.</p>
          <form class="catalogue-search" action="../" method="get" role="search">
            <label for="catalogue-search">Search the interactive library</label>
            <div class="asset-search-wrap">
              <input id="catalogue-search" class="asset-search" type="search" name="assetSearch" placeholder="Search accessibility, testing, security, release…">
              <button class="button button-primary" type="submit">Search</button>
            </div>
          </form>
        </div>
      </section>
{chr(10).join(sections)}
    </main>
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div><p class="footer-title">Agent Workflow Blueprint</p><p>Research-informed workflow controls for software-development agents.</p></div>
        <ul class="footer-links">
          <li><a href="../">Interactive library</a></li>
          <li><a href="../docs/">Documentation</a></li>
          <li><a href="../README.md">README</a></li>
          <li><a href="../sitemap.xml">Sitemap</a></li>
          <li><a href="../privacy.html">Privacy and analytics</a></li>
        </ul>
      </div>
    </footer>
    <script type="module" src="../analytics.js?v=20260805-1" data-analytics-consent data-privacy-href="../privacy.html"></script>
  </body>
</html>
'''


def generated_files(assets: list[dict]) -> dict[Path, str]:
    return {
        ROBOTS_PATH: robots_text(),
        SITEMAP_PATH: sitemap_xml(assets),
        LIBRARY_INDEX_PATH: library_index_html(assets),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="fail if generated SEO files differ")
    args = parser.parse_args()
    try:
        assets = load_assets()
        files = generated_files(assets)
    except (OSError, ValueError, KeyError, TypeError, json.JSONDecodeError) as error:
        print(f"[FAIL] {error}")
        return 1

    if args.check:
        stale = [path.relative_to(ROOT) for path, expected in files.items() if not path.is_file() or path.read_text(encoding="utf-8") != expected]
        if stale:
            print("[FAIL] stale SEO artefacts: " + ", ".join(map(str, stale)))
            return 1
        print(f"SEO artefacts are reproducible: {len(assets)} assets and {len(files)} generated files.")
        return 0

    for path, content in files.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")
    print(f"Wrote {len(files)} SEO artefacts for {len(assets)} assets.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
