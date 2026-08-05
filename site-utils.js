export function normalise(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .replace(/\s+/g, ' ')
    .trim();
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

export function safeHref(value) {
  const href = String(value ?? '').trim();
  if (!href || /[\u0000-\u001f\u007f]/.test(href) || href.startsWith('//') || href.includes('\\')) return '#';
  if (href.startsWith('#')) return href;

  const scheme = href.match(/^([A-Za-z][A-Za-z0-9+.-]*):/u)?.[1]?.toLowerCase();
  if (scheme) return ['http', 'https', 'mailto'].includes(scheme) ? href : '#';
  return href;
}

export function getCategoryLabel(category) {
  return String(category ?? '').trim() || 'Uncategorised';
}

export function getTypeLabel(type) {
  const value = String(type ?? '').trim();
  if (!value) return 'Unknown';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function filterAssets(assets, query, type = 'all') {
  const term = normalise(query);
  return assets.filter((asset) => {
    const typeMatch = type === 'all' || asset.type === type;
    const haystack = normalise([
      asset.title,
      asset.type,
      asset.category,
      asset.summary,
      ...(Array.isArray(asset.tags) ? asset.tags : [])
    ].join(' '));
    return typeMatch && haystack.includes(term);
  });
}

const SPECIALIST_CONTROL_ID = /^SPC-[A-F0-9]{10}$/;
const REPOSITORY_BLOB_URL = 'https://github.com/CarlasHub/Agents-Workflow-Blueprint/blob/main';
const GOVERNANCE_KERNEL_URL = `${REPOSITORY_BLOB_URL}/docs/template-library/GOVERNANCE-KERNEL.md`;
const SPECIALIST_CONTROL_REGISTRY_URL = `${REPOSITORY_BLOB_URL}/docs/template-library/SPECIALIST-CONTROLS.md`;
const RESEARCH_BASIS_URL = `${REPOSITORY_BLOB_URL}/docs/template-library/RESEARCH-BASIS.md`;

export function repositoryFileHref(path) {
  const value = String(path ?? '').trim();
  if (!value || value.split('/').some((segment) => !segment || segment === '..') || !/^[A-Za-z0-9._/-]+$/.test(value)) {
    return '#';
  }
  return `${REPOSITORY_BLOB_URL}/${value}`;
}

export function specialistControlHref(controlId) {
  return SPECIALIST_CONTROL_ID.test(controlId)
    ? `${SPECIALIST_CONTROL_REGISTRY_URL}#${controlId.toLowerCase()}`
    : '#';
}

export function parseSpecialistControls(markdown) {
  const source = String(markdown ?? '').replace(/\r\n/g, '\n');
  const headings = [...source.matchAll(/^## (SPC-[A-F0-9]{10})\n/gm)];
  const controls = new Map();
  headings.forEach((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    const match = block.match(/^### Control\n\n(.+?)(?=\n\n### |(?![\s\S]))/ms);
    if (!match) throw new Error(`${heading[1]} is missing its Control section`);
    if (controls.has(heading[1])) throw new Error(`Duplicate specialist control: ${heading[1]}`);
    controls.set(heading[1], match[1].replace(/\s+/g, ' ').trim());
  });
  return controls;
}

export function parseResearchSources(data) {
  if (!Array.isArray(data)) throw new Error('Research source registry must be an array');
  const sources = new Map();
  data.forEach((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error('Research source entries must be objects');
    }
    const label = String(entry.label ?? '').trim();
    if (!label) throw new Error('Research source entry is missing its label');
    if (sources.has(label)) throw new Error(`Duplicate research source: ${label}`);
    for (const field of ['citation', 'url', 'translation']) {
      if (!String(entry[field] ?? '').trim()) throw new Error(`Research source ${label} is missing ${field}`);
    }
    if (!String(entry.url).startsWith('https://') || safeHref(entry.url) === '#') {
      throw new Error(`Research source ${label} must use a safe HTTPS URL`);
    }
    sources.set(label, entry);
  });
  return sources;
}

export function referencedSpecialistControls(markdown) {
  const source = String(markdown ?? '').replace(/\r\n/g, '\n');
  const section = source.match(/^## Shared specialist controls\n([\s\S]*?)(?=^## |(?![\s\S]))/m)?.[1] ?? '';
  return [...new Set(section.match(/\bSPC-[A-F0-9]{10}\b/g) ?? [])];
}

export function removeMarkdownSections(markdown, headingsToRemove) {
  const excluded = new Set(headingsToRemove);
  const source = String(markdown ?? '').replace(/\r\n/g, '\n');
  const headings = [...source.matchAll(/^## ([^\n]+)\n/gm)];
  const ranges = headings
    .map((heading, index) => ({
      heading: heading[1].trim(),
      start: heading.index,
      end: headings[index + 1]?.index ?? source.length
    }))
    .filter((entry) => excluded.has(entry.heading));
  return ranges.reverse().reduce(
    (result, range) => result.slice(0, range.start) + result.slice(range.end),
    source
  ).trim();
}

function secondLevelSections(markdown) {
  const source = String(markdown ?? '').replace(/\r\n/g, '\n');
  const headings = [...source.matchAll(/^## ([^\n]+)\n/gm)];
  return new Map(headings.map((heading, index) => [
    heading[1].trim(),
    source.slice(heading.index + heading[0].length, headings[index + 1]?.index ?? source.length).trim()
  ]));
}

function friendlyAssetModule(markdown) {
  const body = removeMarkdownSections(markdown, [
    'Metadata',
    'When to use',
    'When not to use',
    'Dependencies',
    'Shared specialist controls',
    'Research basis'
  ])
    .replace(/^# [^\n]+\n*/m, '')
    .replace(/^## Specialist role$/gm, '## Role')
    .replace(/^## Contract owner$/gm, '## Role')
    .replace(/^## Task-specific mission$/gm, '## Mission')
    .replace(/^## Task-specific instructions$/gm, '## Instructions')
    .replace(/^## Required inputs$/gm, '## Inputs required')
    .replace(/^## Required evidence$/gm, '## Evidence required')
    .replace(/^## Evidence to collect$/gm, '## Evidence required')
    .replace(/^## Task-specific rejection conditions$/gm, '## Rejection conditions')
    .replace(/^## Output format$/gm, '## Response format')
    .trim();
  return body;
}

function governanceHeadingLabel(heading) {
  return heading.replace(/^`GOV-[^`]+`\s+—\s+/, '').trim();
}

function governanceProfileBody(profilesMarkdown, profile) {
  const headings = [...String(profilesMarkdown ?? '').matchAll(/^### `([^`]+)`\n/gm)];
  const selectedIndex = headings.findIndex((heading) => heading[1] === profile);
  if (selectedIndex < 0) throw new Error(`Unknown governance profile: ${profile}`);
  const selected = headings[selectedIndex];
  return profilesMarkdown.slice(
    selected.index + selected[0].length,
    headings[selectedIndex + 1]?.index ?? profilesMarkdown.length
  ).trim();
}

function composeGovernanceInstructions(asset, kernelMarkdown) {
  const sections = secondLevelSections(kernelMarkdown);
  const profileSection = sections.get('Asset execution profiles');
  if (!profileSection) throw new Error('Governance kernel is missing asset execution profiles');
  const commonSections = [...sections.entries()].filter(([heading]) => (
    heading !== 'Asset execution profiles' && heading !== 'Composition rule'
  ));
  if (!commonSections.length) throw new Error('Governance kernel is missing shared operating rules');

  const parts = ['## Shared operating rules'];
  commonSections.forEach(([heading, body]) => {
    parts.push('', `### ${governanceHeadingLabel(heading)}`, '', body);
  });
  parts.push(
    '',
    `### ${getTypeLabel(asset.type)} requirements`,
    '',
    governanceProfileBody(profileSection, asset.governance_profile)
  );
  return parts.join('\n');
}

function sourceReferences(asset, researchSourceData) {
  const sourceUrl = repositoryFileHref(asset.path);
  if (sourceUrl === '#') throw new Error('Asset source path is invalid');
  if (!Array.isArray(asset.research_pattern_labels) || !asset.research_pattern_labels.length) {
    throw new Error('Asset is missing curated research labels');
  }
  const researchSources = parseResearchSources(researchSourceData);
  const missingResearch = asset.research_pattern_labels.filter((label) => !researchSources.has(label));
  if (missingResearch.length) throw new Error(`Unresolved research sources: ${missingResearch.join(', ')}`);
  const typeLabel = String(asset.type ?? 'asset').toLowerCase();
  const references = [
    '## References',
    '',
    '### Research basis',
    '',
    `- [Research-to-control mapping](${RESEARCH_BASIS_URL})`,
    ...asset.research_pattern_labels.map((label) => {
      const source = researchSources.get(label);
      return `- **${label}:** [${source.citation}](${source.url}) — ${source.translation}`;
    }),
    '',
    '### Asset and control sources',
    '',
    `- [Source ${typeLabel} module](${sourceUrl})`,
    `- [Shared governance kernel](${GOVERNANCE_KERNEL_URL})`,
    `- [Specialist control registry](${SPECIALIST_CONTROL_REGISTRY_URL})`
  ];
  if (asset.shared_controls.length) {
    references.push(
      `- Control definitions: ${asset.shared_controls.map((controlId) => `[${controlId}](${specialistControlHref(controlId)})`).join(', ')}`
    );
  }
  return references.join('\n');
}

export function composeAssetMarkdown(asset, assetMarkdown, kernelMarkdown, registryMarkdown, researchSourceData) {
  const controlIds = asset?.shared_controls;
  if (
    !asset?.id
    || !['prompt', 'skill', 'contract'].includes(asset.type)
    || !asset.id.startsWith(`${asset.type}-`)
    || !Array.isArray(controlIds)
    || new Set(controlIds).size !== controlIds.length
  ) {
    throw new Error('Asset composition metadata is invalid');
  }
  if (controlIds.some((controlId) => !SPECIALIST_CONTROL_ID.test(controlId))) {
    throw new Error('Asset composition contains a malformed specialist control ID');
  }
  const sourceControls = referencedSpecialistControls(assetMarkdown);
  if (sourceControls.join('\n') !== controlIds.join('\n')) {
    throw new Error('Asset source and manifest control references differ');
  }
  const controls = parseSpecialistControls(registryMarkdown);
  const missing = controlIds.filter((controlId) => !controls.has(controlId));
  if (missing.length) throw new Error(`Unresolved specialist controls: ${missing.join(', ')}`);

  const sections = secondLevelSections(assetMarkdown);
  const typeSignatures = {
    prompt: ['Task-specific mission', 'Task-specific instructions'],
    skill: ['Purpose', 'Procedure', 'Handoff format'],
    contract: ['Acceptance objective', 'Hard gates', 'Acceptance language']
  };
  const forbiddenSignatures = {
    prompt: ['Procedure', 'Hard gates', 'Acceptance language'],
    skill: ['Task-specific mission', 'Task-specific instructions', 'Hard gates', 'Acceptance language'],
    contract: ['Task-specific mission', 'Task-specific instructions', 'Procedure', 'Handoff format']
  };
  const missingSignatures = typeSignatures[asset.type].filter((heading) => !sections.has(heading));
  const conflictingSignatures = forbiddenSignatures[asset.type].filter((heading) => sections.has(heading));
  if (missingSignatures.length || conflictingSignatures.length) {
    throw new Error(`Asset source does not match its declared ${asset.type} structure`);
  }

  const parts = [friendlyAssetModule(assetMarkdown)];
  if (controlIds.length) {
    parts.push('', '## Shared specialist requirements', '');
    controlIds.forEach((controlId, index) => {
      parts.push(`${index + 1}. ${controls.get(controlId)}`);
    });
  }
  parts.push('', composeGovernanceInstructions(asset, kernelMarkdown), '', sourceReferences(asset, researchSourceData));
  return `${parts.join('\n').trim()}\n`;
}

export function splitComposedAssetMarkdown(markdown) {
  const source = String(markdown ?? '').replace(/\r\n/g, '\n').trim();
  const marker = '\n## References\n';
  const referenceIndex = source.lastIndexOf(marker);
  if (referenceIndex < 0) throw new Error('Composed asset is missing its References section');
  return {
    prompt: `${source.slice(0, referenceIndex).trim()}\n`,
    references: `${source.slice(referenceIndex + 1).trim()}\n`
  };
}

export function composeAssetIntroductionMarkdown(asset, assetMarkdown, kernelMarkdown, registryMarkdown, researchSourceData) {
  // Run the canonical composer first so the introduction cannot hide dependency drift.
  composeAssetMarkdown(asset, assetMarkdown, kernelMarkdown, registryMarkdown, researchSourceData);
  const sections = secondLevelSections(assetMarkdown);
  const typeLabel = getTypeLabel(asset.type);
  const targetOutcome = Array.isArray(asset.expected_outputs) && asset.expected_outputs.length
    ? asset.expected_outputs[0]
    : 'Complete the described specialist task.';
  return [
    `### ${typeLabel} overview`,
    '',
    `**Target outcome:** ${targetOutcome}`,
    '',
    '#### Use this when',
    '',
    sections.get('When to use') || asset.summary || 'Use this asset for the described specialist task.',
    '',
    '#### Do not use this when',
    '',
    sections.get('When not to use') || 'Do not use this asset outside its stated specialist boundary.'
  ].join('\n').trim() + '\n';
}

export function markdownHeadingId(value) {
  return String(value ?? '')
    .replace(/`([^`]+)`/g, '$1')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .replace(/[^\p{L}\p{N}_\- ]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function renderInlineMarkdown(value, options = {}) {
  let html = escapeHtml(value);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => (
    (() => {
      const transformed = typeof options.transformHref === 'function' ? options.transformHref(href) : href;
      const safe = safeHref(transformed);
      const external = /^https?:/i.test(safe);
      const attributes = external ? ' target="_blank" rel="noreferrer"' : '';
      return `<a href="${escapeAttribute(safe)}"${attributes}>${text}</a>`;
    })()
  ));
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return html;
}

function splitTableRow(line) {
  return line.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
}

function renderTable(rows, options = {}) {
  if (rows.length < 2) return rows.map((row) => `<p>${renderInlineMarkdown(row, options)}</p>`).join('');
  const header = splitTableRow(rows[0]);
  const bodyRows = rows.slice(2).map(splitTableRow);
  return `
    <div class="markdown-table-wrap">
      <table>
        <thead><tr>${header.map((cell) => `<th>${renderInlineMarkdown(cell, options)}</th>`).join('')}</tr></thead>
        <tbody>${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell, options)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
  `;
}

export function renderMarkdown(markdown, options = {}) {
  const lines = String(markdown ?? '').replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let paragraph = [];
  let listType = null;
  let listItems = [];
  let tableRows = [];
  let inCode = false;
  let codeLines = [];
  let codeLanguage = '';
  const headingCounts = new Map();

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(' '), options)}</p>`);
    paragraph = [];
  }
  function flushList() {
    if (!listType) return;
    html.push(`<${listType}>${listItems.map((item) => `<li>${renderInlineMarkdown(item, options)}</li>`).join('')}</${listType}>`);
    listType = null;
    listItems = [];
  }
  function flushTable() {
    if (!tableRows.length) return;
    html.push(renderTable(tableRows, options));
    tableRows = [];
  }
  function flushOpenBlocks() {
    flushParagraph();
    flushList();
    flushTable();
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code class="${escapeAttribute(codeLanguage)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        inCode = false;
        codeLines = [];
        codeLanguage = '';
      } else {
        flushOpenBlocks();
        inCode = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }
    if (!trimmed) {
      flushOpenBlocks();
      continue;
    }
    if (/^\|.+\|$/.test(trimmed)) {
      flushParagraph();
      flushList();
      tableRows.push(trimmed);
      continue;
    }
    flushTable();
    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const baseId = markdownHeadingId(heading[2]);
      const duplicate = headingCounts.get(baseId) ?? 0;
      headingCounts.set(baseId, duplicate + 1);
      const headingId = duplicate === 0 ? baseId : `${baseId}-${duplicate}`;
      const idAttribute = options.headingIds && headingId ? ` id="${escapeAttribute(headingId)}"` : '';
      html.push(`<h${heading[1].length}${idAttribute}>${renderInlineMarkdown(heading[2], options)}</h${heading[1].length}>`);
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      flushOpenBlocks();
      html.push('<hr>');
      continue;
    }
    const quote = trimmed.match(/^>\s?(.+)$/);
    if (quote) {
      flushOpenBlocks();
      html.push(`<blockquote>${renderInlineMarkdown(quote[1], options)}</blockquote>`);
      continue;
    }
    const unordered = trimmed.match(/^[-*]\s+(.+)$/);
    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextType = unordered ? 'ul' : 'ol';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((unordered || ordered)[1]);
      continue;
    }
    paragraph.push(trimmed);
  }

  if (inCode) html.push(`<pre><code class="${escapeAttribute(codeLanguage)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
  flushOpenBlocks();
  return html.join('');
}
