import test from 'node:test';
import assert from 'node:assert/strict';

import {
  composeAssetMarkdown,
  composeAssetIntroductionMarkdown,
  escapeHtml,
  filterAssets,
  normalise,
  parseSpecialistControls,
  referencedSpecialistControls,
  renderMarkdown,
  repositoryFileHref,
  safeHref,
  splitComposedAssetMarkdown,
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
  assert.match(repositoryFileHref('docs/template-library/prompts/example.md'), /blob\/main\/docs\/template-library\/prompts\/example\.md$/);
  assert.equal(repositoryFileHref('../private.md'), '#');
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

test('full asset composition is copy-ready, operational, and source-linked', () => {
  const asset = {
    id: 'prompt-example',
    title: 'Example',
    type: 'prompt',
    path: 'docs/template-library/prompts/example.md',
    governance_profile: 'GOV-PROFILE-PROMPT',
    shared_controls: ['SPC-AAAAAAAAAA', 'SPC-BBBBBBBBBB']
  };
  const source = `# Example\n\n## Metadata\n\n- Type: Prompt\n\n## When to use\n\nUse for a focused review.\n\n## Dependencies\n\n- Kernel\n\n## Shared specialist controls\n\nControls: \`SPC-AAAAAAAAAA\`, \`SPC-BBBBBBBBBB\`\n\n## Specialist role\n\nYou are a reviewer.\n\n## Task-specific mission\n\nInspect the result.\n\n## Task-specific instructions\n\n1. Inspect the source.\n2. Exercise the failure path.\n3. Report evidence.`;
  const kernel = `# Governance Kernel\n\n## \`GOV-BOUNDARY-01\` — Operating boundary\n\nKeep the task bounded.\n\n## Asset execution profiles\n\n### \`GOV-PROFILE-PROMPT\`\n\nInspect before acting.\n\n### \`GOV-PROFILE-SKILL\`\n\nRun the procedure.\n\n## Composition rule\n\nInclude dependencies once.`;
  const registry = `# Registry\n\n## SPC-AAAAAAAAAA\n\n### Control\n\nFirst shared control.\n\n### Used by\n\n- prompt-example\n\n## SPC-BBBBBBBBBB\n\n### Control\n\nSecond shared control.\n\n### Used by\n\n- prompt-example`;
  const composed = composeAssetMarkdown(asset, source, kernel, registry);

  assert.equal(parseSpecialistControls(registry).size, 2);
  assert.deepEqual(referencedSpecialistControls(source), asset.shared_controls);
  assert.match(composed, /^# Example\n\n## Role\n\nYou are a reviewer/);
  assert.ok(composed.indexOf('## Instructions') < composed.indexOf('## Shared specialist requirements'));
  assert.equal((composed.match(/First shared control/g) ?? []).length, 1);
  assert.equal((composed.match(/Second shared control/g) ?? []).length, 1);
  assert.equal((composed.match(/## Shared operating rules/g) ?? []).length, 1);
  assert.match(composed, /### Prompt requirements\n\nInspect before acting/);
  assert.match(composed, /## References[\s\S]*\[Source prompt module\]/);
  assert.match(composed, /\[SPC-AAAAAAAAAA\]\([^)]*#spc-aaaaaaaaaa\)/);
  assert.doesNotMatch(composed, /# Composed Agent Workflow Asset/);
  assert.doesNotMatch(composed, /## Metadata/);
  assert.doesNotMatch(composed, /## When to use/);
  assert.doesNotMatch(composed, /## Dependencies/);
  assert.doesNotMatch(composed, /Controls: `SPC-/);
  assert.match(composed, /Inspect the result/);

  const separated = splitComposedAssetMarkdown(composed);
  assert.match(separated.prompt, /^# Example/);
  assert.doesNotMatch(separated.prompt, /## References/);
  assert.match(separated.references, /^## References/);
  assert.match(separated.references, /\[Source prompt module\]/);
  assert.equal(`${separated.prompt.trim()}\n\n${separated.references.trim()}\n`, composed);
});

test('asset introduction stays concise and excludes prompt instructions', () => {
  const asset = {
    id: 'prompt-example',
    title: 'Example Prompt',
    type: 'prompt',
    path: 'docs/template-library/prompts/example.md',
    summary: 'Use for a focused review.',
    governance_profile: 'GOV-PROFILE-PROMPT',
    shared_controls: ['SPC-AAAAAAAAAA']
  };
  const source = `# Example Prompt\n\n## Metadata\n\n- Type: Prompt\n\n## When to use\n\nUse for a focused review.\n\n## When not to use\n\nDo not use for implementation.\n\n## Dependencies\n\n- Kernel\n\n## Shared specialist controls\n\nControls: \`SPC-AAAAAAAAAA\`\n\n## Specialist role\n\nYou are a reviewer.\n\n## Task-specific mission\n\nInspect the result.`;
  const registry = '# Registry\n\n## SPC-AAAAAAAAAA\n\n### Control\n\nCollect direct evidence.\n\n### Used by\n\n- prompt-example';
  const kernel = `# Governance Kernel\n\n## \`GOV-BOUNDARY-01\` — Operating boundary\n\nKeep the task bounded.\n\n## Asset execution profiles\n\n### \`GOV-PROFILE-PROMPT\`\n\nInspect before acting.\n\n## Composition rule\n\nInclude dependencies once.`;
  const introduction = composeAssetIntroductionMarkdown(asset, source, kernel, registry);

  assert.match(introduction, /^### Introduction/);
  assert.match(introduction, /Use for a focused review/);
  assert.doesNotMatch(introduction, /Inspect the result|You are a reviewer|Do not use for implementation/);
  assert.doesNotMatch(introduction, /Ready to use|Full prompt|Purpose|Agent role|Not for/);
  assert.doesNotMatch(introduction, /Collect direct evidence/);
  assert.doesNotMatch(introduction, /Keep the task bounded/);
});

test('composed asset splitting rejects output without references', () => {
  assert.throws(
    () => splitComposedAssetMarkdown('# Example\n\n## Instructions\n\nDo the work.\n'),
    /missing its References section/i
  );
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
