import sys
from pathlib import Path
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from check_links import scan  # noqa: E402


class LinkChecksTest(unittest.TestCase):
    def test_accepts_existing_path_and_fragment(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "README.md").write_text("[Guide](guide.md#start)\n", encoding="utf-8")
            (root / "guide.md").write_text("# Start\n", encoding="utf-8")
            failures, local, external = scan(root)
            self.assertEqual(failures, [])
            self.assertEqual((local, external), (1, 0))

    def test_rejects_missing_path_and_fragment(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "README.md").write_text("[Missing](no.md)\n[Anchor](guide.md#nope)\n", encoding="utf-8")
            (root / "guide.md").write_text("# Start\n", encoding="utf-8")
            failures, _, _ = scan(root)
            self.assertEqual(len(failures), 2)


if __name__ == "__main__":
    unittest.main()
