#!/usr/bin/env python3

"""Build or check the deterministic source-bundle manifest."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "dist" / "starter-manifest.json"
ROOT_FILES = {
    ".gitignore", ".nojekyll", ".nvmrc", ".python-version",
    "AGENTS.md", "CHANGELOG.md", "CODE_OF_CONDUCT.md", "CONTRIBUTING.md",
    "DELIVERY-NOTES.md", "LICENSE", "LICENSE-CODE", "LICENSE-CONTENT", "NOTICE",
    "README.md", "SECURITY.md", "THIRD-PARTY-NOTICES.md",
    "eslint.config.js", "index.html", "package-lock.json", "package.json",
    "playwright.config.js", "requirements.toml", "site-utils.js", "site.css", "site.js",
}
SOURCE_DIRS = (".github", "PROMPTS", "assets", "build-project", "docs", "evals", "examples", "scripts", "tests")
EXCLUDED_PARTS = {"__pycache__", "node_modules", "playwright-report", "test-results"}
EXCLUDED_SUFFIXES = {".pyc", ".DS_Store"}


def source_files() -> list[str]:
    files = set(ROOT_FILES)
    for rel_dir in SOURCE_DIRS:
        directory = ROOT / rel_dir
        if not directory.exists():
            continue
        for path in directory.rglob("*"):
            if not path.is_file() or any(part in EXCLUDED_PARTS for part in path.parts):
                continue
            if path.suffix in EXCLUDED_SUFFIXES:
                continue
            files.add(str(path.relative_to(ROOT)))
    return sorted(files)


def build_manifest() -> dict:
    included_files = source_files()
    missing = [rel for rel in included_files if not (ROOT / rel).is_file()]
    if missing:
        raise ValueError("missing starter files: " + ", ".join(missing))
    assets = json.loads((ROOT / "docs/template-library/assets.json").read_text(encoding="utf-8"))
    counts = {kind: sum(asset["type"] == kind for asset in assets) for kind in ("prompt", "skill", "contract")}
    return {
        "name": "agent-workflow-blueprint",
        "artifact_type": "source-workflow-bundle",
        "verification_scope": "repository source and workflow scaffolding, not a deployed product",
        "template_library_assets": {
            "prompts": counts["prompt"],
            "skills": counts["skill"],
            "contracts": counts["contract"],
        },
        "included_files": included_files,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="fail if the tracked manifest differs")
    args = parser.parse_args()
    try:
        expected = json.dumps(build_manifest(), indent=2) + "\n"
    except (ValueError, KeyError, json.JSONDecodeError) as error:
        print(f"[FAIL] {error}")
        return 1
    if args.check:
        if not MANIFEST.is_file():
            print(f"[FAIL] missing generated artifact: {MANIFEST.relative_to(ROOT)}")
            return 1
        if MANIFEST.read_text(encoding="utf-8") != expected:
            print("[FAIL] dist/starter-manifest.json is stale; run python3 -S scripts/build_starter.py")
            return 1
        print("Generated starter manifest is reproducible and current.")
        return 0
    MANIFEST.parent.mkdir(exist_ok=True)
    MANIFEST.write_text(expected, encoding="utf-8")
    count = len(json.loads(expected)["included_files"])
    print(f"Wrote {MANIFEST.relative_to(ROOT)} with {count} files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
