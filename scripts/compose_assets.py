#!/usr/bin/env python3

"""Compose copy-ready prompt-library assets from normalized source modules."""

from __future__ import annotations

import argparse
from pathlib import Path
import sys

from asset_composer import ROOT, CompositionError, compose_assets, load_manifest, validate_all_compositions


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--asset", action="append", default=[], help="Asset ID; repeat to compose a pack")
    parser.add_argument("--output", help="Optional output path inside the repository")
    parser.add_argument("--check", action="store_true", help="Validate deterministic composition for all assets")
    parser.add_argument("--list", action="store_true", help="List available asset IDs")
    parser.add_argument(
        "--with-references",
        action="store_true",
        help="Append research, source-module, governance, and specialist-control references",
    )
    args = parser.parse_args()

    if args.list:
        for asset in load_manifest():
            print(f"{asset['id']}\t{asset['title']}")
        return 0

    if args.check:
        failures = validate_all_compositions()
        for failure in failures:
            print(f"[FAIL] {failure}")
        if failures:
            return 1
        print("Asset composition checks passed: 100 copy-ready assets resolve operating rules and specialist controls exactly once.")
        return 0

    try:
        composed = compose_assets(args.asset, include_references=args.with_references)
    except (CompositionError, KeyError, OSError) as error:
        print(f"[FAIL] {error}", file=sys.stderr)
        return 1

    if args.output:
        output = (ROOT / args.output).resolve()
        if ROOT not in output.parents:
            print("[FAIL] --output must resolve inside the repository", file=sys.stderr)
            return 1
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(composed, encoding="utf-8")
        print(f"Wrote {output.relative_to(ROOT)}")
    else:
        sys.stdout.write(composed)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
