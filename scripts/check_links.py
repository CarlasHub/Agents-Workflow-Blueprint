#!/usr/bin/env python3

"""Check repository-local Markdown and HTML links, including fragments."""

from __future__ import annotations

from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_PARTS = {"node_modules", "playwright-report", "test-results", ".git"}
MARKDOWN_LINK = re.compile(r"!?\[[^\]]*\]\(([^)\s]+)(?:\s+[\"'][^\"']*[\"'])?\)")
HTML_LINK = re.compile(r"\b(?:href|src)=[\"']([^\"']+)[\"']", re.I)
HTML_ID = re.compile(r"\bid=[\"']([^\"']+)[\"']", re.I)
HEADING = re.compile(r"^#{1,6}\s+(.+?)\s*#*\s*$", re.M)


def github_slug(text: str) -> str:
    value = re.sub(r"[^\w\- ]", "", text.strip().casefold(), flags=re.UNICODE)
    return re.sub(r"\s+", "-", value)


def anchors(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() == ".html":
        return set(HTML_ID.findall(text))
    found: set[str] = set()
    counts: dict[str, int] = {}
    for heading in HEADING.findall(text):
        base = github_slug(re.sub(r"`([^`]+)`", r"\1", heading))
        count = counts.get(base, 0)
        found.add(base if count == 0 else f"{base}-{count}")
        counts[base] = count + 1
    return found


def resolve_target(source: Path, raw_link: str) -> tuple[Path | None, str, bool]:
    if any(marker in raw_link for marker in ("${", "{{", "<")):
        return None, "", True
    parsed = urlsplit(raw_link)
    if parsed.scheme or raw_link.startswith("//"):
        return None, parsed.fragment, True
    target_path = unquote(parsed.path)
    target = source if not target_path else (source.parent / target_path).resolve()
    if target.is_dir():
        markdown_index = target / "README.md"
        html_index = target / "index.html"
        target = markdown_index if source.suffix.lower() == ".md" and markdown_index.exists() else html_index
    return target, unquote(parsed.fragment), False


def scan(root: Path = ROOT) -> tuple[list[str], int, int]:
    root = root.resolve()
    failures: list[str] = []
    local_count = 0
    external_count = 0
    files = [
        path for path in root.rglob("*")
        if path.is_file()
        and path.suffix.lower() in {".md", ".html"}
        and not any(part in EXCLUDED_PARTS for part in path.relative_to(root).parts)
    ]
    anchor_cache: dict[Path, set[str]] = {}

    for source in sorted(files):
        text = source.read_text(encoding="utf-8")
        matches = MARKDOWN_LINK.findall(text) if source.suffix.lower() == ".md" else HTML_LINK.findall(text)
        for raw_link in matches:
            if raw_link.startswith(("mailto:", "tel:")):
                external_count += 1
                continue
            target, fragment, external = resolve_target(source, raw_link)
            if external:
                external_count += 1
                continue
            if target is None:
                continue
            local_count += 1
            rel_source = source.relative_to(root)
            if root not in target.parents and target != root:
                failures.append(f"{rel_source}: link escapes repository: {raw_link}")
                continue
            if not target.exists():
                failures.append(f"{rel_source}: missing target for {raw_link}: {target.relative_to(root)}")
                continue
            if fragment:
                if target not in anchor_cache:
                    anchor_cache[target] = anchors(target)
                if fragment not in anchor_cache[target]:
                    failures.append(f"{rel_source}: missing fragment #{fragment} in {target.relative_to(root)}")

    return failures, local_count, external_count


def main() -> int:
    failures, local_count, external_count = scan()
    for failure in failures:
        print(f"[FAIL] {failure}")
    if failures:
        print(f"Link checks failed: {len(failures)} issue(s), {local_count} local links inspected.")
        return 1
    print(f"Link checks passed: {local_count} local links inspected; {external_count} external links recorded but not requested over the network.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
