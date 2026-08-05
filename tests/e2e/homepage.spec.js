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

test('preview opens with a concise introduction followed by a copy-ready full prompt', async ({ page }) => {
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');
  const introduction = dialog.getByRole('tab', { name: 'Intro', exact: true });
  const complete = dialog.getByRole('tab', { name: 'Full prompt' });

  await expect(dialog.getByRole('tab')).toHaveCount(2);
  await expect(introduction).toHaveAttribute('aria-selected', 'true');
  await expect(dialog.locator('[data-markdown-preview-meta]')).toContainText('Prompt introduction · purpose and fit');
  await expect(dialog.getByRole('heading', { name: 'Purpose' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Agent role' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Ready to use' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Instructions' })).toHaveCount(0);

  await complete.click();
  await expect(complete).toHaveAttribute('aria-selected', 'true');
  await expect(dialog.locator('[data-markdown-preview-meta]')).toContainText('standalone and copy-ready');
  await expect(dialog.getByRole('heading', { name: 'Role', exact: true })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Instructions', exact: true })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Shared specialist requirements' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'Shared operating rules' })).toHaveCount(1);
  await expect(dialog.getByRole('heading', { name: 'References' })).toHaveCount(1);
  await expect(dialog.getByRole('link', { name: 'Source prompt module' })).toHaveAttribute('href', /prompts\/01-master-agent-enforcement-prompt\.md$/);
  await expect(dialog.getByRole('link', { name: /^SPC-/ }).first()).toHaveAttribute('href', /SPECIALIST-CONTROLS\.md#spc-/);

  await page.keyboard.press('ArrowLeft');
  await expect(introduction).toBeFocused();
  await expect(introduction).toHaveAttribute('aria-selected', 'true');
  await expect(dialog.getByRole('heading', { name: 'Ready to use' })).toHaveCount(1);
});

for (let start = 0; start < 100; start += 10) {
  const end = start + 10;
  test(`manifest assets ${start + 1}-${end} open with an intro and copy-ready full asset`, async ({ page }) => {
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
      await expect(dialog.getByRole('heading', { level: 1 })).toHaveText(assetTitle);
      await expect(dialog.getByRole('heading', { name: 'Ready to use' })).toHaveCount(1);
      await dialog.getByRole('tab', { name: `Full ${assetType}` }).click();
      const specialistHeading = dialog.getByRole('heading', { name: expectedSection[assetType] });
      await expect(specialistHeading).toHaveCount(1);
      expect(await specialistHeading.evaluate((heading) => (
        heading.nextElementSibling?.matches('ol') && heading.nextElementSibling.children.length >= 3
      ))).toBe(true);
      await expect(dialog.getByRole('heading', { name: 'References' })).toHaveCount(1);
      await expect(dialog.locator('[data-preview-mode="complete"]')).toHaveAttribute('aria-selected', 'true');
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
  expect(copied).toMatch(/^# Master Agent Enforcement Prompt/);
  expect(copied).toContain('## Instructions');
  expect(copied).toContain('## Shared operating rules');
  expect(copied).toContain('## References');
  expect(copied).not.toContain('# Composed Agent Workflow Asset');
  expect(copied).not.toContain('## Dependencies');
});

test('preview exposes one clear full-prompt copy action', async ({ page, context, browserName }) => {
  await prepareClipboard(page, context, browserName);
  await page.goto('./');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');

  await expect(dialog.getByRole('button', { name: 'Copy source module' })).toHaveCount(0);
  await expect(dialog.getByRole('link', { name: 'Download source' })).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Copy full prompt' }).click();
  await expect(page.locator('#site-status')).toHaveText(/ready to paste/i);
  const composed = await readClipboard(page, browserName);
  expect(composed).toMatch(/^# Master Agent Enforcement Prompt/);
  expect(composed).toContain('## References');
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
  await expect(previewModes).toHaveCount(2);
  expect(await previewModes.evaluateAll((buttons) => buttons.every((button) => button.disabled))).toBe(true);
});

test('shared dependency failure exposes the source module instead of hiding the prompt', async ({ page }) => {
  await page.route('**/docs/template-library/GOVERNANCE-KERNEL.md', (route) => route.fulfill({ status: 503, body: 'unavailable' }));
  await page.goto('./');
  await expect(page.locator('#asset-status')).toHaveText('100 assets shown');
  await page.locator('[data-preview-path]').first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('[data-preview-mode="readable"]')).toHaveAttribute('aria-selected', 'true');
  await expect(dialog.locator('[data-preview-mode="readable"]')).toHaveText('Prompt source');
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
