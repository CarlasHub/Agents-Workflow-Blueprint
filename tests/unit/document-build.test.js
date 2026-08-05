import test from 'node:test';
import assert from 'node:assert/strict';

import {
  publicDocumentSources,
  renderedDocumentPath,
  renderedDocuments,
  rewriteDocumentHref
} from '../../scripts/build_docs.mjs';

test('public document graph includes every maintained asset and linked guide', () => {
  const sources = publicDocumentSources();
  assert.equal(sources.length, 156);
  assert.equal(sources.filter((path) => path.startsWith('docs/template-library/prompts/')).length, 40);
  assert.equal(sources.filter((path) => path.startsWith('docs/template-library/skills/')).length, 30);
  assert.equal(sources.filter((path) => path.startsWith('docs/template-library/contracts/')).length, 30);
  assert.ok(sources.includes('docs/template-library/CODEX-USAGE-GUIDE.md'));
  assert.ok(sources.includes('docs/engineering/seo-and-analytics.md'));
  assert.ok(sources.includes('examples/worked-example.md'));
  assert.ok(sources.includes('evals/README.md'));
});

test('rendered routes replace Markdown extensions and preserve fragments', () => {
  const sources = new Set([
    'docs/template-library/START-HERE.md',
    'docs/template-library/CATALOGUE.md',
    'evals/README.md'
  ]);
  assert.equal(renderedDocumentPath('docs/template-library/START-HERE.md'), 'docs/template-library/START-HERE.html');
  assert.equal(
    rewriteDocumentHref('CATALOGUE.md#prompts', 'docs/template-library/START-HERE.md', sources),
    'CATALOGUE.html#prompts'
  );
  assert.equal(
    rewriteDocumentHref('https://example.test/source.md', 'docs/template-library/START-HERE.md', sources),
    'https://example.test/source.md'
  );
  assert.equal(rewriteDocumentHref('evals', 'README.md', sources), 'evals/README.html');
});

test('generated guide and asset pages use HTML canonicals and explicit source actions', () => {
  const documents = renderedDocuments();
  const guide = documents.get('docs/template-library/CODEX-USAGE-GUIDE.html');
  const asset = documents.get('docs/template-library/prompts/12-bug-root-cause-remediation-prompt.html');

  assert.match(guide, /CODEX-USAGE-GUIDE\.html/);
  assert.match(guide, /href="CODEX-USAGE-GUIDE\.md" download>Download Markdown source/);
  assert.match(guide, /<h2 id="recommended-sequence">Recommended sequence<\/h2>/);
  assert.doesNotMatch(guide, /href="CODEX-USAGE-GUIDE\.md">/);

  assert.match(asset, /<h2 id="document-agent-body-title">Prompt body<\/h2>/);
  assert.match(asset, /data-copy-target="document-agent-body"/);
  assert.match(asset, /<pre class="asset-prompt-code"[^>]*><code>## Inputs required/);
  assert.match(asset, /href="12-bug-root-cause-remediation-prompt\.md" download>Download Markdown source/);
  assert.doesNotMatch(asset, /<code># Bug Root Cause Remediation Prompt/);
});

test('generated pages expose local Markdown only as explicit downloads', () => {
  const documents = renderedDocuments();
  for (const [path, html] of documents) {
    if (!path.endsWith('.html')) continue;
    const localMarkdownAnchors = html.matchAll(/<a\b([^>]*\bhref="(?!https?:|\/\/)[^"]+\.md(?:\?[^"#]*)?(?:#[^"]*)?"[^>]*)>/g);
    for (const match of localMarkdownAnchors) {
      assert.match(match[1], /\bdownload(?:="[^"]*")?/, `${path} contains a primary local Markdown link: ${match[0]}`);
    }
  }
});
