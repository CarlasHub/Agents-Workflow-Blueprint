#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync
} from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import {
  composeAssetIntroductionMarkdown,
  composeAssetMarkdown,
  escapeAttribute,
  escapeHtml,
  renderMarkdown,
  splitComposedAssetMarkdown
} from '../site-utils.js';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(SCRIPT_DIR, '..');
export const SITE_URL = 'https://carlashub.github.io/Agents-Workflow-Blueprint/';
export const RENDERED_MANIFEST_PATH = 'dist/rendered-documents.json';
export const SOURCE_ROOTS = [
  'README.md',
  'PROMPTS',
  'docs/engineering',
  'docs/template-library'
];
const SOCIAL_IMAGE_URL = `${SITE_URL}assets/agent-workflow-blueprint-social.png`;
const ASSET_MANIFEST_PATH = 'docs/template-library/assets.json';
const GOVERNANCE_KERNEL_PATH = 'docs/template-library/GOVERNANCE-KERNEL.md';
const SPECIALIST_CONTROLS_PATH = 'docs/template-library/SPECIALIST-CONTROLS.md';
const RESEARCH_SOURCES_PATH = 'docs/template-library/research-sources.json';
const ASSET_TYPES = new Set(['prompt', 'skill', 'contract']);

function posixPath(path) {
  return path.split(posix.sep === '/' ? /[\\/]/ : /[\\/]/).join('/');
}

function walkMarkdown(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return walkMarkdown(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  });
}

export function publicDocumentSources(root = ROOT) {
  const seedFiles = SOURCE_ROOTS.flatMap((sourceRoot) => {
    const absolute = join(root, sourceRoot);
    if (!existsSync(absolute)) throw new Error(`Missing public document source: ${sourceRoot}`);
    return sourceRoot.endsWith('.md') ? [absolute] : walkMarkdown(absolute);
  });
  const sources = new Set(seedFiles.map((path) => posixPath(relative(root, path))));
  const pending = [...sources];
  for (let index = 0; index < pending.length; index += 1) {
    const sourcePath = pending[index];
    const markdown = readFileSync(join(root, sourcePath), 'utf8');
    const links = [...markdown.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)];
    for (const link of links) {
      const rawHref = link[1];
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('//') || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(rawHref)) continue;
      const parsed = splitHref(rawHref);
      if (!parsed?.path) continue;
      let decodedPath;
      try {
        decodedPath = decodeURIComponent(parsed.path);
      } catch {
        continue;
      }
      const linkedPath = posix.normalize(posix.join(posix.dirname(sourcePath), decodedPath));
      const targetSource = parsed.path.endsWith('.md') ? linkedPath : posix.join(linkedPath, 'README.md');
      const absoluteTarget = resolve(root, targetSource);
      const relativeTarget = posixPath(relative(root, absoluteTarget));
      if (relativeTarget.startsWith('../') || !existsSync(absoluteTarget) || sources.has(relativeTarget)) continue;
      sources.add(relativeTarget);
      pending.push(relativeTarget);
    }
  }
  return [...sources].sort();
}

export function renderedDocumentPath(sourcePath) {
  if (!sourcePath.endsWith('.md')) throw new Error(`Not a Markdown source path: ${sourcePath}`);
  return `${sourcePath.slice(0, -3)}.html`;
}

function rootPrefix(outputPath) {
  const parent = posix.dirname(outputPath);
  if (parent === '.') return '';
  return '../'.repeat(parent.split('/').length);
}

function splitHref(href) {
  const match = String(href).match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  return match ? { path: match[1], query: match[2] ?? '', fragment: match[3] ?? '' } : null;
}

export function rewriteDocumentHref(href, sourcePath, sourceSet) {
  const value = String(href ?? '').trim();
  if (!value || value.startsWith('#') || value.startsWith('//') || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(value)) {
    return value;
  }
  const parsed = splitHref(value);
  if (!parsed?.path) return value;
  const sourceDirectory = posix.dirname(sourcePath);
  const linkedPath = posix.normalize(posix.join(sourceDirectory, parsed.path));
  const targetSource = parsed.path.endsWith('.md') ? linkedPath : posix.join(linkedPath, 'README.md');
  if (!sourceSet.has(targetSource)) return value;
  let target = posix.relative(sourceDirectory, renderedDocumentPath(targetSource));
  if (!target) target = posix.basename(renderedDocumentPath(targetSource));
  return `${target}${parsed.query}${parsed.fragment}`;
}

function plainText(value) {
  return String(value ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleFromMarkdown(markdown, sourcePath) {
  const match = String(markdown).match(/^#\s+(.+?)\s*$/m);
  return plainText(match?.[1] ?? posix.basename(sourcePath, '.md'));
}

function markdownWithoutTitle(markdown) {
  return String(markdown).replace(/^#\s+.+?\s*\n(?:\s*\n)?/m, '');
}

function descriptionFromMarkdown(markdown, title) {
  const withoutTitle = markdownWithoutTitle(markdown)
    .replace(/```[\s\S]*?```/g, '')
    .split(/\n\s*\n/)
    .map(plainText)
    .find((block) => block && block !== title && !/^metadata$/i.test(block));
  const description = withoutTitle || `Rendered documentation for ${title}.`;
  return description.length > 157 ? `${description.slice(0, 156).trimEnd()}…` : description;
}

function copyIconMarkup() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M8 8.75A1.75 1.75 0 0 1 9.75 7h8.5A1.75 1.75 0 0 1 20 8.75v8.5A1.75 1.75 0 0 1 18.25 19h-8.5A1.75 1.75 0 0 1 8 17.25v-8.5Z" />
              <path d="M16 7V5.75A1.75 1.75 0 0 0 14.25 4h-8.5A1.75 1.75 0 0 0 4 5.75v8.5A1.75 1.75 0 0 0 5.75 16H8" />
            </svg>`;
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

function pageChrome({ sourcePath, outputPath, title, description, eyebrow, summary, body, asset }) {
  const prefix = rootPrefix(outputPath);
  const canonicalUrl = `${SITE_URL}${outputPath}`;
  const sourceName = posix.basename(sourcePath);
  const typeLabel = asset ? `${asset.type.charAt(0).toUpperCase()}${asset.type.slice(1)}` : 'Documentation';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Agent Workflow Blueprint',
      url: SITE_URL
    }
  };
  return `<!doctype html>
<html lang="en" data-color-mode="dark" data-dark-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="theme-color" content="#0d1117">
    <title>${escapeHtml(title)} | Agent Workflow Blueprint</title>
    <meta name="description" content="${escapeAttribute(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${escapeAttribute(canonicalUrl)}">
    <link rel="sitemap" type="application/xml" href="${prefix}sitemap.xml">
    <link rel="icon" type="image/png" href="${prefix}assets/human-body-brand.png">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Agent Workflow Blueprint">
    <meta property="og:title" content="${escapeAttribute(title)}">
    <meta property="og:description" content="${escapeAttribute(description)}">
    <meta property="og:url" content="${escapeAttribute(canonicalUrl)}">
    <meta property="og:image" content="${SOCIAL_IMAGE_URL}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:alt" content="Agent Workflow Blueprint: Prompts, Skills and Contracts">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttribute(title)}">
    <meta name="twitter:description" content="${escapeAttribute(description)}">
    <meta name="twitter:image" content="${SOCIAL_IMAGE_URL}">
    <link rel="stylesheet" href="${prefix}site.css?v=20260805-5">
    <script type="application/ld+json">${safeJson(structuredData)}</script>
  </head>
  <body class="document-page-body">
    <a class="skip-link" href="#content">Skip to document</a>
    <header class="site-header">
      <div class="topbar shell">
        <a class="brand" href="${prefix}">Agent Workflow Blueprint</a>
        <nav class="site-nav" aria-label="Document navigation">
          <a href="${prefix}">Interactive library</a>
          <a href="${prefix}library/">Static catalogue</a>
          <a href="${prefix}docs/">Documentation</a>
          <a href="${prefix}build-project/">Build project</a>
        </nav>
      </div>
    </header>
    <main id="content" class="document-main">
      <div class="shell document-shell">
        <nav class="document-breadcrumb" aria-label="Breadcrumb">
          <a href="${prefix}">Home</a><span aria-hidden="true">/</span><a href="${prefix}docs/">Docs</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(typeLabel)}</span>
        </nav>
        <header class="document-hero">
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h1>${escapeHtml(title)}</h1>
          <p class="document-summary">${escapeHtml(summary)}</p>
          <div class="document-actions">
            ${asset ? `<a class="button button-primary" href="${prefix}?assetSearch=${encodeURIComponent(asset.title)}">Find in interactive library</a>` : `<a class="button button-primary" href="${prefix}docs/">Browse documentation</a>`}
            <a class="button button-secondary" href="${sourceName}" download>Download Markdown source</a>
          </div>
        </header>
        <article class="markdown-document document-content">
${body}
        </article>
      </div>
    </main>
    <footer class="site-footer">
      <div class="shell footer-grid">
        <div><p class="footer-title">Agent Workflow Blueprint</p><p>Research-informed workflow controls for software-development agents.</p></div>
        <ul class="footer-links">
          <li><a href="${prefix}">Interactive library</a></li>
          <li><a href="${prefix}library/">Static catalogue</a></li>
          <li><a href="${sourceName}" download>Markdown source</a></li>
          <li><a href="${prefix}privacy.html">Privacy and analytics</a></li>
        </ul>
      </div>
    </footer>
    <div class="visually-hidden" id="document-status" role="status" aria-live="polite" aria-atomic="true"></div>
    <script type="module" src="${prefix}document-page.js?v=20260805-1"></script>
    <script type="module" src="${prefix}analytics.js?v=20260805-1" data-analytics-consent data-privacy-href="${prefix}privacy.html"></script>
  </body>
</html>
`;
}

function assetDocumentBody(asset, source, shared) {
  const complete = composeAssetMarkdown(asset, source, shared.kernel, shared.registry, shared.researchSources);
  const introduction = composeAssetIntroductionMarkdown(asset, source, shared.kernel, shared.registry, shared.researchSources);
  const separated = splitComposedAssetMarkdown(complete);
  const typeLabel = `${asset.type.charAt(0).toUpperCase()}${asset.type.slice(1)}`;
  return `          <section class="asset-preview-introduction" aria-label="Introduction">
            ${renderMarkdown(introduction, { headingIds: true })}
          </section>
          <section class="asset-prompt-section document-prompt-section" aria-labelledby="document-agent-body-title">
            <div class="asset-prompt-heading">
              <h2 id="document-agent-body-title">${escapeHtml(typeLabel)} body</h2>
              <button class="prompt-copy-button" type="button" data-copy-target="document-agent-body" aria-label="Copy ${escapeAttribute(asset.type)} body" title="Copy ${escapeAttribute(asset.type)} body">
                ${copyIconMarkup()}
              </button>
            </div>
            <pre class="asset-prompt-code" id="document-agent-body" tabindex="0" aria-label="${escapeAttribute(typeLabel)} body code"><code>${escapeHtml(separated.prompt)}</code></pre>
          </section>
          <section class="asset-preview-references" aria-label="References">
            ${renderMarkdown(separated.references, { headingIds: true })}
          </section>`;
}

function guideDocumentBody(source, sourcePath, sourceSet) {
  const markdown = markdownWithoutTitle(source);
  return `          ${renderMarkdown(markdown, {
    headingIds: true,
    transformHref: (href) => rewriteDocumentHref(href, sourcePath, sourceSet)
  })}`;
}

export function renderedDocuments(root = ROOT) {
  const sources = publicDocumentSources(root);
  const sourceSet = new Set(sources);
  const assets = JSON.parse(readFileSync(join(root, ASSET_MANIFEST_PATH), 'utf8'));
  const assetMap = new Map(assets.map((asset) => [asset.path, asset]));
  for (const asset of assets) {
    if (!ASSET_TYPES.has(asset.type) || !sourceSet.has(asset.path)) {
      throw new Error(`Asset cannot be rendered from its public source: ${asset.id}`);
    }
  }
  const shared = {
    kernel: readFileSync(join(root, GOVERNANCE_KERNEL_PATH), 'utf8'),
    registry: readFileSync(join(root, SPECIALIST_CONTROLS_PATH), 'utf8'),
    researchSources: JSON.parse(readFileSync(join(root, RESEARCH_SOURCES_PATH), 'utf8'))
  };
  const output = new Map();
  const manifestDocuments = [];
  for (const sourcePath of sources) {
    const source = readFileSync(join(root, sourcePath), 'utf8');
    const asset = assetMap.get(sourcePath) ?? null;
    const outputPath = renderedDocumentPath(sourcePath);
    const title = asset?.title ?? titleFromMarkdown(source, sourcePath);
    const description = asset?.summary ?? descriptionFromMarkdown(source, title);
    const eyebrow = asset ? `${asset.type} · ${asset.category}` : 'Rendered documentation';
    const summary = asset?.summary ?? description;
    const body = asset ? assetDocumentBody(asset, source, shared) : guideDocumentBody(source, sourcePath, sourceSet);
    output.set(outputPath, pageChrome({ sourcePath, outputPath, title, description, eyebrow, summary, body, asset }));
    manifestDocuments.push({ source: sourcePath, output: outputPath, kind: asset?.type ?? 'guide' });
  }
  const manifest = {
    generated_by: 'scripts/build_docs.mjs',
    document_count: manifestDocuments.length,
    documents: manifestDocuments
  };
  output.set(RENDERED_MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  return output;
}

function previousOutputs(root = ROOT) {
  const manifestPath = join(root, RENDERED_MANIFEST_PATH);
  if (!existsSync(manifestPath)) return [];
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    return Array.isArray(manifest.documents) ? manifest.documents.map((entry) => entry.output).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function buildDocuments({ check = false, root = ROOT } = {}) {
  const files = renderedDocuments(root);
  const stale = [];
  for (const [outputPath, expected] of files) {
    const absolute = join(root, outputPath);
    if (!existsSync(absolute) || readFileSync(absolute, 'utf8') !== expected) stale.push(outputPath);
  }
  const obsolete = previousOutputs(root).filter((path) => !files.has(path) && path.endsWith('.html'));
  if (check) {
    if (stale.length || obsolete.length) {
      throw new Error(`Rendered documents are stale: ${[...stale, ...obsolete].join(', ')}`);
    }
    return { count: files.size - 1, stale: [] };
  }
  for (const outputPath of obsolete) unlinkSync(join(root, outputPath));
  for (const [outputPath, content] of files) {
    const absolute = join(root, outputPath);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, content, 'utf8');
  }
  return { count: files.size - 1, stale };
}

function main() {
  const check = process.argv.includes('--check');
  try {
    const result = buildDocuments({ check });
    const verb = check ? 'verified' : 'wrote';
    console.log(`Rendered document pages ${verb}: ${result.count} HTML documents.`);
  } catch (error) {
    console.error(`[FAIL] ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
