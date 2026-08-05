import { test, expect } from '@playwright/test';

const MEASUREMENT_ID = 'G-PZEC365PCE';
const CONSENT_KEY = 'agent-workflow-blueprint.analytics-consent.v1';
const TAG_URL = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

test('Google Analytics stays unloaded until explicit consent and rejection persists', async ({ page }) => {
  const tagRequests = [];
  page.on('request', (request) => {
    if (request.url() === TAG_URL) tagRequests.push(request.url());
  });

  await page.goto('./');
  const consent = page.getByRole('region', { name: 'Help improve this project?' });
  await expect(consent).toBeVisible();
  await expect(page.locator('script[data-agent-workflow-analytics]')).toHaveCount(0);
  expect(tagRequests).toHaveLength(0);

  await consent.getByRole('button', { name: 'Continue without analytics' }).click();
  await expect(consent).toBeHidden();
  await expect(page.getByRole('button', { name: 'Analytics settings' })).toBeVisible();
  expect(await page.evaluate((key) => window.localStorage.getItem(key), CONSENT_KEY)).toBe('denied');
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], MEASUREMENT_ID)).toBe(true);
  expect(tagRequests).toHaveLength(0);

  await page.reload();
  await expect(consent).toBeHidden();
  await expect(page.getByRole('button', { name: 'Analytics settings' })).toBeVisible();
  expect(tagRequests).toHaveLength(0);
});

test('explicit consent loads only the configured GA4 tag and can be withdrawn', async ({ page }) => {
  const tagRequests = [];
  await page.route(TAG_URL, async (route) => {
    tagRequests.push(route.request().url());
    await route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
  });

  await page.goto('./');
  const consent = page.getByRole('region', { name: 'Help improve this project?' });
  expect(tagRequests).toHaveLength(0);
  await consent.getByRole('button', { name: 'Allow analytics' }).click();

  await expect(page.locator('script[data-agent-workflow-analytics]')).toHaveAttribute('src', TAG_URL);
  await expect.poll(() => tagRequests.length).toBe(1);
  expect(await page.evaluate((key) => window.localStorage.getItem(key), CONSENT_KEY)).toBe('granted');
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], MEASUREMENT_ID)).toBe(false);

  const commands = await page.evaluate(() => window.dataLayer.map((entry) => [entry[0], entry[1]]));
  expect(commands).toContainEqual(['consent', 'default']);
  expect(commands).toContainEqual(['consent', 'update']);
  expect(commands).toContainEqual(['config', MEASUREMENT_ID]);

  await page.evaluate(() => { document.cookie = '_ga=test-client-id; Path=/; SameSite=Lax'; });
  expect(await page.evaluate(() => document.cookie)).toContain('_ga=');
  await page.getByRole('button', { name: 'Analytics settings' }).click();
  await expect(consent).toContainText('Analytics is currently allowed');
  await consent.getByRole('button', { name: 'Continue without analytics' }).click();

  expect(await page.evaluate((key) => window.localStorage.getItem(key), CONSENT_KEY)).toBe('denied');
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], MEASUREMENT_ID)).toBe(true);
  expect(await page.evaluate(() => document.cookie)).not.toContain('_ga=');
  expect(tagRequests).toHaveLength(1);
});

test('every public HTML entry point exposes the consent and privacy controls', async ({ page }) => {
  const pages = [
    ['./', 'privacy.html'],
    ['./library/', '../privacy.html'],
    ['./docs/', '../privacy.html'],
    ['./build-project/', '../privacy.html'],
    ['./privacy.html', 'privacy.html'],
    ['./docs/template-library/CODEX-USAGE-GUIDE.html', '../../privacy.html'],
    ['./docs/template-library/prompts/12-bug-root-cause-remediation-prompt.html', '../../../privacy.html']
  ];

  for (const [path, privacyHref] of pages) {
    await page.goto(path);
    const consent = page.getByRole('region', { name: 'Help improve this project?' });
    await expect(consent).toBeVisible();
    await expect(consent.getByRole('link', { name: 'Read the privacy details' })).toHaveAttribute('href', privacyHref);
    await expect(page.locator('script[data-agent-workflow-analytics]')).toHaveCount(0);
  }
});

test('storage failure keeps consent page-scoped and does not silently enable later loads', async ({ page }) => {
  await page.addInitScript(() => {
    window.Storage.prototype.getItem = () => { throw new Error('storage blocked'); };
    window.Storage.prototype.setItem = () => { throw new Error('storage blocked'); };
  });
  await page.route(TAG_URL, (route) => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));

  await page.goto('./');
  const consent = page.getByRole('region', { name: 'Help improve this project?' });
  await consent.getByRole('button', { name: 'Allow analytics' }).click();
  await expect(page.locator('[data-analytics-status]')).toHaveText('Analytics allowed for this page only.');
  await expect(page.locator('script[data-agent-workflow-analytics]')).toHaveCount(1);

  await page.reload();
  await expect(consent).toBeVisible();
  await expect(page.locator('script[data-agent-workflow-analytics]')).toHaveCount(0);
});
