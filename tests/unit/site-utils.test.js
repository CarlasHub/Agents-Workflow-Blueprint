import test from 'node:test';
import assert from 'node:assert/strict';

import {
  composeAssetMarkdown,
  composeReadableAssetMarkdown,
  escapeHtml,
  filterAssets,
  normalise,
  parseSpecialistControls,
  referencedSpecialistControls,
  renderMarkdown,
  safeHref,
  specialistControlHref
} from '../../site-utils.js';

test('escapeHtml encodes markup-significant characters', () => {
  assert.equal(escapeHtml('<img src=x onerror="bad"> &\''), '&lt;img src=x onerror=&quot;bad&quot;&gt; &amp;&#39;');
});

test('normalise folds case, accents, and repeated whitespace', () => {
  assert.equal(normalise('  Acessíbilidade\n  REVIEW '), 'acessibilidade review');
});

test('safeHref accepts expected links and rejects executable schemes', () => {
  assert.equal(safeHref('docs/guide.md'), 'docs/guide.md');
  assert.equal(safeHref('../guide.md#start'), '../guide.md#start');
  assert.equal(safeHref('https://example.test/guide'), 'https://example.test/guide');
  assert.equal(safeHref('javascript:alert(1)'), '#');
  assert.equal(safeHref('data:text/html,bad'), '#');
  assert.equal(safeHref('//unexpected.example/path'), '#');
  assert.match(specialistControlHref('SPC-AAAAAAAAAA'), /SPECIALIST-CONTROLS\.md#spc-aaaaaaaaaa$/);
  assert.equal(specialistControlHref('SPC-invalid'), '#');
});

test('filterAssets combines normalised text search and type filtering', () => {
  const assets = [
    { type: 'prompt', title: 'Accessibility review', category: 'UI', summary: 'Keyboard checks', tags: ['WCAG'] },
    { type: 'skill', title: 'Release evidence', category: 'Release', summary: 'Commands', tags: [] }
  ];
  assert.deepEqual(filterAssets(assets, 'ACÇESSIBILITY', 'prompt'), [assets[0]]);
  assert.deepEqual(filterAssets(assets, 'release', 'prompt'), []);
  assert.deepEqual(filterAssets(assets, '', 'all'), assets);
});

test('renderMarkdown escapes HTML and sanitises links', () => {
  const html = renderMarkdown('# Title\n\n<script>alert(1)</script>\n\n[bad](javascript:alert(1))');
  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /href="#"/);
  assert.doesNotMatch(html, /<script>/);
});

test('renderMarkdown supports lists, code, quotes, and tables', () => {
  const html = renderMarkdown('- one\n- two\n\n> note\n\n```js\nconst x = 1;\n```\n\n| A | B |\n| --- | --- |\n| 1 | 2 |');
  assert.match(html, /<ul><li>one<\/li><li>two<\/li><\/ul>/);
  assert.match(html, /<blockquote>note<\/blockquote>/);
  assert.match(html, /<pre><code class="js">const x = 1;<\/code><\/pre>/);
  assert.match(html, /<table>/);
});

test('complete asset composition resolves controls once and removes source-only references', () => {
  const asset = { id: 'prompt-example', shared_controls: ['SPC-AAAAAAAAAA', 'SPC-BBBBBBBBBB'] };
  const source = `# Example\n\n## Dependencies\n\n- Kernel\n\n## Shared specialist controls\n\nControls: \`SPC-AAAAAAAAAA\`, \`SPC-BBBBBBBBBB\`\n\n## Task-specific mission\n\nInspect the result.`;
  const kernel = '# Governance Kernel\n\nKernel rule.';
  const registry = `# Registry\n\n## SPC-AAAAAAAAAA\n\n### Control\n\nFirst shared control.\n\n### Used by\n\n- prompt-example\n\n## SPC-BBBBBBBBBB\n\n### Control\n\nSecond shared control.\n\n### Used by\n\n- prompt-example`;
  const composed = composeAssetMarkdown(asset, source, kernel, registry);

  assert.equal(parseSpecialistControls(registry).size, 2);
  assert.deepEqual(referencedSpecialistControls(source), asset.shared_controls);
  assert.equal((composed.match(/### Governance Kernel/g) ?? []).length, 1);
  assert.equal((composed.match(/\*\*SPC-AAAAAAAAAA:\*\*/g) ?? []).length, 1);
  assert.equal((composed.match(/\*\*SPC-BBBBBBBBBB:\*\*/g) ?? []).length, 1);
  assert.doesNotMatch(composed, /## Dependencies/);
  assert.doesNotMatch(composed, /Controls: `SPC-/);
  assert.match(composed, /Inspect the result/);
});

test('readable asset composition puts specialist content first without repeated source metadata', () => {
  const asset = {
    id: 'prompt-example',
    governance_profile: 'GOV-PROFILE-PROMPT',
    shared_controls: ['SPC-AAAAAAAAAA']
  };
  const source = `# Example Prompt\n\n## Metadata\n\n- Type: Prompt\n\n## When to use\n\nUse for a focused review.\n\n## Dependencies\n\n- Kernel\n\n## Shared specialist controls\n\nControls: \`SPC-AAAAAAAAAA\`\n\n## Task-specific mission\n\nInspect the result.`;
  const registry = '# Registry\n\n## SPC-AAAAAAAAAA\n\n### Control\n\nCollect direct evidence.\n\n### Used by\n\n- prompt-example';
  const readable = composeReadableAssetMarkdown(asset, source, '# Governance Kernel\n\nKernel rule.', registry);

  assert.match(readable, /^# Example Prompt/);
  assert.match(readable, /## Task-specific mission\n\nInspect the result/);
  assert.match(readable, /## Resolved shared specialist controls/);
  assert.match(readable, /Collect direct evidence/);
  assert.match(readable, /## Shared governance applied/);
  assert.doesNotMatch(readable, /## Metadata/);
  assert.doesNotMatch(readable, /## Dependencies/);
  assert.doesNotMatch(readable, /Kernel rule/);
});

test('complete asset composition rejects drift and missing controls', () => {
  const registry = '# Registry\n\n## SPC-AAAAAAAAAA\n\n### Control\n\nOnly control.\n\n### Used by\n\n- prompt-example';
  const source = '# Example\n\n## Shared specialist controls\n\nControls: `SPC-AAAAAAAAAA`';
  assert.throws(
    () => composeAssetMarkdown(
      { id: 'prompt-example', shared_controls: ['SPC-BBBBBBBBBB'] },
      source,
      '# Kernel',
      registry
    ),
    /source and manifest control references differ/i
  );
  assert.throws(
    () => composeAssetMarkdown(
      { id: 'prompt-example', shared_controls: ['SPC-AAAAAAAAAA', 'SPC-BBBBBBBBBB'] },
      '# Example\n\n## Shared specialist controls\n\nControls: `SPC-AAAAAAAAAA`, `SPC-BBBBBBBBBB`',
      '# Kernel',
      registry
    ),
    /unresolved specialist controls/i
  );
});
