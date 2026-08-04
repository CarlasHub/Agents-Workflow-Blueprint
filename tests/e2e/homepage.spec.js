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

test('preview shows prompt content first and exposes complete and source views', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');
  const promptContent = dialog.getByRole('button', { name: 'Prompt content' });
  const complete = dialog.getByRole('button', { name: 'Complete composition' });
  const source = dialog.getByRole('button', { name: 'Source module', exact: true });

  await expect(promptContent).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog.locator('[data-markdown-preview-meta]')).toContainText('Prompt content · unique instructions first');
  await expect(dialog.getByRole('heading', { name: 'Task-specific mission' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Metadata' })).toHaveCount(0);

  await complete.click();
  await expect(complete).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog.getByRole('heading', { name: 'Shared governance' })).toHaveCount(1);
  await expect(dialog.getByText('Deterministic composition: shared governance and specialist controls are included once.')).toHaveCount(1);

  await source.click();
  await expect(source).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog.getByRole('heading', { name: 'Metadata' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Dependencies' })).toHaveCount(1);

  await promptContent.click();
  await expect(dialog.getByRole('heading', { name: 'Task-specific mission' })).toHaveCount(1);
});

for (const [start, end] of [[0, 25], [25, 50], [50, 75], [75, 100]]) {
  test(`manifest assets ${start + 1}-${end} open with specialist content available`, async ({ page }) => {
    await page.goto('./');
    const cards = page.locator('.asset-card');
    await expect(cards).toHaveCount(100);
    const dialog = page.getByRole('dialog');
    const expectedSection = {
      prompt: 'Task-specific instructions',
      skill: 'Procedure',
      contract: 'Hard gates'
    };

    for (let index = start; index < end; index += 1) {
      const card = cards.nth(index);
      const assetType = await card.getAttribute('data-type');
      const assetTitle = (await card.locator('h3').textContent()).trim();
      await card.locator('[data-preview-path]').click();
      await expect(dialog.getByRole('heading', { level: 1 })).toHaveText(assetTitle);
      const specialistHeading = dialog.getByRole('heading', { name: expectedSection[assetType] });
      await expect(specialistHeading).toHaveCount(1);
      expect(await specialistHeading.evaluate((heading) => (
        heading.nextElementSibling?.matches('ol') && heading.nextElementSibling.children.length >= 3
      ))).toBe(true);
      await expect(dialog.locator('[data-preview-mode="readable"]')).toHaveAttribute('aria-pressed', 'true');
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
  expect(copied).toContain('# Composed Agent Workflow Asset');
  expect(copied).toContain('### Governance Kernel');
  expect(copied.match(/### Governance Kernel/g)).toHaveLength(1);
  expect(copied).not.toContain('## Dependencies');
});

test('preview offers distinct source and complete copy actions', async ({ page, context, browserName }) => {
  await prepareClipboard(page, context, browserName);
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');

  await dialog.getByRole('button', { name: 'Copy source module' }).click();
  await expect(page.locator('#site-status')).toHaveText(/source module copied/i);
  const source = await readClipboard(page, browserName);
  expect(source).toContain('## Dependencies');
  expect(source).not.toContain('# Composed Agent Workflow Asset');

  await dialog.getByRole('button', { name: 'Copy complete asset' }).click();
  await expect(page.locator('#site-status')).toHaveText(/complete asset copied/i);
  const composed = await readClipboard(page, browserName);
  expect(composed).toContain('# Composed Agent Workflow Asset');
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
  const previewModes = dialog.locator('[data-preview-mode]');
  await expect(previewModes).toHaveCount(3);
  expect(await previewModes.evaluateAll((buttons) => buttons.every((button) => button.disabled))).toBe(true);
});

test('shared dependency failure exposes the source module instead of hiding the prompt', async ({ page }) => {
  await page.route('**/docs/template-library/GOVERNANCE-KERNEL.md', (route) => route.fulfill({ status: 503, body: 'unavailable' }));
  await page.goto('./');
  await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('[data-preview-mode="source"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(dialog.locator('[data-preview-mode="readable"]')).toBeDisabled();
  await expect(dialog.locator('[data-preview-mode="complete"]')).toBeDisabled();
  await expect(dialog.getByRole('heading', { name: 'Metadata' })).toHaveCount(1);
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
