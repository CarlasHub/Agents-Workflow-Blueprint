# Accessibility testing

## Evidence model

Accessibility is a release requirement, but automated results are only one evidence source. This repository distinguishes automated results, keyboard checks, guided manual checks, and checks not performed. It does not claim WCAG conformance from axe or Playwright.

## Automated checks

Run:

```bash
npm run test:a11y
npm run test:e2e
```

The automated suite covers the homepage, library controls, preview dialog, builder landing page, form, preview, assembly, and success states in Chromium, Firefox, and WebKit. Behavioural tests cover initial dialog focus, tab containment, Escape, trigger-focus restoration, background inertness, scoped announcements, accessible errors, and narrow viewport overflow.

## Manual checklist

Record browser, operating system, viewport, zoom, input, assistive technology, date, tester, findings, and untested areas.

- Traverse every interactive control with keyboard only in a logical order.
- Confirm visible focus at normal, 200%, and 400% zoom.
- Confirm dialog name and description, contained focus, Escape behaviour, and focus restoration with a screen reader.
- Exercise search, filters, copy fallback, form errors, removal warnings, build progress, and ZIP success announcements.
- Inspect reflow at 320 CSS pixels and with long text or localisation expansion.
- Check normal, hover, focus, disabled, error, and selected-state contrast with a contrast measurement tool.
- Test forced-colours or high-contrast mode and reduced motion.
- Verify headings, landmarks, link purposes, labels, descriptions, and error associations.
- Confirm state is not communicated by colour alone.

## Current boundary

Automated Chromium, Firefox, and WebKit checks are reproducible. Manual screen-reader, high-contrast, colour measurement, and complete 400% zoom review must be recorded per release when performed. An unchecked item remains an open review item, not a passed requirement.
