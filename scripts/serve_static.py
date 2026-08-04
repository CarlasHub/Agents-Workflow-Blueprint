#!/usr/bin/env python3

"""Serve the repository for local browser tests without access-log noise."""

from __future__ import annotations

import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format_string: str, *args: object) -> None:
        return


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=4178)
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), QuietHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
