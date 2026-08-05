import { test, expect } from '@playwright/test';

async function prepareClipboard(page, context, browserName) {
  if (browserName === 'chromium') {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:4178' });
    return;
  }
  await page.addInitScript(() => {
    globalThis.__testClipboard = '';
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    Object.getPrototypeOf(document).execCommand = function execCommand(command) {
      if (command !== 'copy') return false;
      globalThis.__testClipboard = document.activeElement?.value ?? '';
      return true;
    };
  });
}

async function readClipboard(page, browserName) {
  return page.evaluate((currentBrowser) => (
    currentBrowser === 'chromium' ? navigator.clipboard.readText() : globalThis.__testClipboard
  ), browserName);
}

test('homepage loads the asset manifest', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveTitle('Agent Workflow Blueprint');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Control agent work');
  await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
  await expect(page.locator('.asset-card')).toHaveCount(100);
});

test('asset search normalises input and supports an empty state', async ({ page }) => {
  await page.goto('./');
  const search = page.getByRole('searchbox', { name: 'Search assets' });
  await search.fill('accessibility');
  await expect(page.locator('.asset-card')).not.toHaveCount(0);
  await expect(page.locator('.asset-card').first()).toContainText(/accessibility/i);
  await search.fill('no-such-template-zzzz');
  await expect(page.getByRole('heading', { name: 'Try a broader search or switch the filter.' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(search).toBeFocused();
  await expect(page.locator('.asset-card')).toHaveCount(100);
});

test('type filters expose state and show only the selected asset type', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
  const skills = page.getByRole('button', { name: 'Skills' });
  await skills.click();
  await expect(skills).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#asset-status')).toHaveText('30 assets shown');
  await expect(page.locator('.asset-card[data-type="skill"]')).toHaveCount(30);
  await expect(page.locator('.asset-card:not([data-type="skill"])')).toHaveCount(0);
});

test('preview modal contains focus, makes the page inert, closes with Escape, and returns focus', async ({ page }) => {
  await page.goto('./');
  const trigger = page.locator('[data-preview-path]').first();
  await trigger.click();
  const dialog = page.getByRole('dialog');
  const close = page.getByRole('button', { name: 'Close markdown preview' });
  await expect(dialog).toBeVisible();
  await expect(close).toBeFocused();
  await expect(page.locator('#main')).toHaveAttribute('inert', '');

  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  const focusable = dialog.locator('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
  await focusable.last().focus();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator('#main')).not.toHaveAttribute('inert', '');
});

test('preview closes with its close control', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  await page.getByRole('button', { name: 'Close markdown preview' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('preview keeps applicability and research outside the agent-ready prompt body', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');
  const promptCode = dialog.locator('[data-prompt-code]');
  const copy = dialog.getByRole('button', { name: 'Copy prompt body' });

  await expect(dialog.getByRole('tab')).toHaveCount(0);
  await expect(dialog.locator('[data-markdown-preview-meta]')).toContainText('applicability, agent-ready prompt body, and research references');
  await expect(dialog.getByRole('heading', { name: 'Prompt overview' })).toHaveCount(1);
  const applicabilityHeadings = dialog.locator('.asset-preview-introduction h4');
  await expect(applicabilityHeadings.filter({ hasText: /^Use this when$/ })).toHaveCount(1);
  await expect(applicabilityHeadings.filter({ hasText: /^Do not use this when$/ })).toHaveCount(1);
  await expect(dialog.locator('.asset-preview-introduction').getByText(/Use at the start of a serious coding-agent session/)).toHaveCount(1);
  await expect(dialog.locator('.asset-preview-introduction').getByText(/Do not use this broad governor/)).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Prompt body' })).toHaveCount(1);
  await expect(promptCode).toContainText('## Inputs required');
  await expect(promptCode).toContainText('## Role');
  await expect(promptCode).toContainText('## Instructions');
  await expect(promptCode).toContainText('## Decision gates');
  await expect(promptCode).toContainText('## Failure modes and recovery');
  await expect(promptCode).toContainText('## Worked example');
  await expect(promptCode).toContainText('## Shared operating rules');
  await expect(promptCode).not.toContainText('# Master Agent Enforcement Prompt');
  await expect(promptCode).not.toContainText('## Use this when');
  await expect(promptCode).not.toContainText('## Do not use this when');
  await expect(promptCode).not.toContainText('## References');
  await expect(dialog.getByRole('heading', { name: 'References' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Research basis' })).toHaveCount(1);
  await expect(dialog.getByRole('link', { name: /ReAct: Synergizing Reasoning and Acting/ })).toHaveAttribute('href', 'https://arxiv.org/abs/2210.03629');
  await expect(dialog.getByRole('link', { name: 'Source prompt module' })).toHaveAttribute('href', /prompts\/01-master-agent-enforcement-prompt\.md$/);
  await expect(dialog.getByRole('link', { name: /^SPC-/ }).first()).toHaveAttribute('href', /SPECIALIST-CONTROLS\.md#spc-/);
  await expect(copy.locator('svg')).toHaveCount(1);
  expect((await copy.textContent()).trim()).toBe('');
});

for (let start = 0; start < 100; start += 10) {
  const end = start + 10;
  test(`manifest assets ${start + 1}-${end} keep metadata outside their typed bodies`, async ({ page }) => {
    await page.goto('./');
    const cards = page.locator('.asset-card');
    await expect(cards).toHaveCount(100);
    const dialog = page.getByRole('dialog');
    const expectedSection = {
      prompt: 'Instructions',
      skill: 'Procedure',
      contract: 'Hard gates'
    };

    for (let index = start; index < end; index += 1) {
      const card = cards.nth(index);
      const assetType = await card.getAttribute('data-type');
      const assetTitle = (await card.locator('h3').textContent()).trim();
      await card.locator('[data-preview-path]').click();
      await expect(dialog.locator('#markdown-preview-title')).toHaveText(assetTitle);
      const typeLabel = assetType.charAt(0).toUpperCase() + assetType.slice(1);
      await expect(dialog.getByRole('heading', { name: `${typeLabel} overview` })).toHaveCount(1);
      await expect(dialog.getByRole('heading', { name: `${typeLabel} body` })).toHaveCount(1);
      const promptText = await dialog.locator('[data-prompt-code]').textContent();
      const sectionMarker = `## ${expectedSection[assetType]}\n\n`;
      expect(promptText).toContain(sectionMarker);
      const sectionBody = promptText.slice(promptText.indexOf(sectionMarker) + sectionMarker.length).split(/\n\n## /, 1)[0];
      expect(sectionBody.match(/^\d+\./gm)?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(promptText).not.toContain('## Use this when');
      expect(promptText).not.toContain('## Do not use this when');
      expect(promptText).not.toContain('## References');
      await expect(dialog.getByRole('heading', { name: 'References' })).toHaveCount(1);
      await expect(dialog.getByRole('heading', { name: 'Research basis' })).toHaveCount(1);
      await expect(dialog.getByRole('button', { name: `Copy ${assetType} body` })).toHaveCount(1);
      await expect(dialog.getByRole('tab')).toHaveCount(0);
      await dialog.getByRole('button', { name: 'Close markdown preview' }).click();
    }
  });
}

test('copy action reports an accessible result', async ({ page, context, browserName }) => {
  await prepareClipboard(page, context, browserName);
  await page.goto('./');
  await page.locator('[data-copy-path]').first().click();
  await expect(page.locator('#site-status')).toHaveText(/copied to the clipboard/i);
  const copied = await readClipboard(page, browserName);
  expect(copied).toMatch(/^## Inputs required/);
  expect(copied).toContain('## Instructions');
  expect(copied).toContain('## Shared operating rules');
  expect(copied).not.toContain('## References');
  expect(copied).not.toContain('## Use this when');
  expect(copied).not.toContain('## Do not use this when');
  expect(copied).not.toContain('# Master Agent Enforcement Prompt');
  expect(copied).not.toContain('# Composed Agent Workflow Asset');
  expect(copied).not.toContain('## Dependencies');
});

test('preview exposes one clear body-only copy action', async ({ page, context, browserName }) => {
  await prepareClipboard(page, context, browserName);
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');

  await expect(dialog.getByRole('button', { name: 'Copy source module' })).toHaveCount(0);
  await expect(dialog.getByRole('link', { name: 'Download source' })).toHaveCount(0);
  const copy = dialog.getByRole('button', { name: 'Copy prompt body' });
  await expect(copy.locator('svg')).toHaveCount(1);
  await copy.focus();
  await expect(copy).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#site-status')).toHaveText(/ready to paste/i);
  const composed = await readClipboard(page, browserName);
  expect(composed).toMatch(/^## Inputs required/);
  expect(composed).not.toContain('## References');
  expect(composed).not.toContain('## Use this when');
  expect(composed).not.toContain('## Do not use this when');
  expect(composed).not.toContain('## Dependencies');
});

test('manifest and preview failures expose usable fallbacks', async ({ page }) => {
  await page.route('**/docs/template-library/assets.json', (route) => route.fulfill({ status: 503, body: 'unavailable' }));
  await page.goto('./');
  await expect(page.locator('#asset-status')).toContainText('Could not load the asset manifest');
  await expect(page.getByRole('link', { name: 'Open catalogue' })).toHaveAttribute('href', 'docs/template-library/CATALOGUE.md');
});

test('preview source failure preserves a direct download fallback', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
  const trigger = page.locator('[data-preview-path]').first();
  const path = await trigger.getAttribute('data-preview-path');
  await page.route(`**/${path}`, (route) => route.fulfill({ status: 503, body: 'unavailable' }));
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'The Markdown could not be loaded.' })).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Download source' })).toHaveAttribute('href', path);
  await expect(dialog.locator('[data-preview-mode]')).toHaveCount(0);
  await expect(dialog.locator('[data-copy-preview]')).toHaveCount(0);
});

test('shared dependency failure exposes the source module instead of hiding the prompt', async ({ page }) => {
  await page.route('**/docs/template-library/GOVERNANCE-KERNEL.md', (route) => route.fulfill({ status: 503, body: 'unavailable' }));
  await page.goto('./');
  await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('tab')).toHaveCount(0);
  await expect(dialog.getByRole('heading', { name: 'Source module' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Prompt source' })).toHaveCount(1);
  await expect(dialog.locator('[data-prompt-code]')).toContainText('## Metadata');
  await expect(dialog.getByRole('button', { name: 'Copy prompt source' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'References' })).toHaveCount(1);
  await expect(dialog.getByRole('link', { name: 'Download source' })).toHaveAttribute('href', /01-master-agent-enforcement-prompt\.md$/);
  await expect(page.locator('#site-status')).toHaveText(/dependencies could not be resolved/i);
});

test('no-JavaScript fallback link exists in the delivered HTML', async ({ request }) => {
  const response = await request.get('./');
  const html = await response.text();
  expect(html).toContain('<noscript>');
  expect(html).toContain('href="docs/template-library/CATALOGUE.md"');
});

test('homepage has no horizontal overflow at narrow and 400%-equivalent widths', async ({ page }) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test('reduced-motion preference suppresses decorative animation and smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const styles = await page.locator('.hero-copy').evaluate((element) => {
    const computed = getComputedStyle(element);
    return { animationDuration: computed.animationDuration, scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior };
  });
  expect(Number.parseFloat(styles.animationDuration)).toBeLessThanOrEqual(0.01);
  expect(styles.scrollBehavior).toBe('auto');
});

test('rendered documentation index is reachable and usable at narrow width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./docs/');
  await expect(page).toHaveTitle('Documentation — Agent Workflow Blueprint');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Start with the workflow');
  await expect(page.getByRole('link', { name: 'shared kernel' })).toHaveAttribute('href', 'template-library/GOVERNANCE-KERNEL.md');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
