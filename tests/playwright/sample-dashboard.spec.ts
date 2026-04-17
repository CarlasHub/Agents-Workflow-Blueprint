// Example-only Playwright spec for the worked dashboard domain.
// This starter does not ship a runnable app. Replace this spec when real routes exist.

import { test, expect } from '@playwright/test';

test('comparison controls are keyboard-reachable', async ({ page }) => {
  await page.goto('/compare');
  await expect(page.getByRole('heading', { name: /comparison/i })).toBeVisible();
});
