#!/usr/bin/env python3

"""Check split-licence files and public references."""

from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = ("LICENSE", "LICENSE-CODE", "LICENSE-CONTENT", "NOTICE", "THIRD-PARTY-NOTICES.md")
EXPECTED = {
    "LICENSE-CODE": ("MIT License", "Permission is hereby granted", "THE SOFTWARE IS PROVIDED \"AS IS\""),
    "LICENSE-CONTENT": ("Creative Commons Attribution 4.0 International", "https://creativecommons.org/licenses/by/4.0/legalcode"),
    "LICENSE": ("LICENSE-CODE", "LICENSE-CONTENT", "Markdown content under `docs/"),
    "NOTICE": ("split-licensed", "attribution"),
    "THIRD-PARTY-NOTICES.md": ("Playwright", "axe-core", "ESLint", "fflate"),
}


def main() -> int:
    failures: list[str] = []
    for rel_path in REQUIRED:
        path = ROOT / rel_path
        if not path.is_file():
            failures.append(f"missing licence or notice file: {rel_path}")
            continue
        content = path.read_text(encoding="utf-8")
        for phrase in EXPECTED[rel_path]:
            if phrase.casefold() not in content.casefold():
                failures.append(f"{rel_path} missing required licence marker: {phrase}")
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    for phrase in ("MIT License", "CC BY 4.0", "not legal advice"):
        if phrase.casefold() not in readme.casefold():
            failures.append(f"README.md missing licence guidance: {phrase}")
    if failures:
        for failure in failures:
            print(f"[FAIL] {failure}")
        return 1
    print("Split-licence checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
