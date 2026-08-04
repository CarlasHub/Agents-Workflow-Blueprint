# Testing strategy

## Purpose

The test suite separates deterministic source checks, JavaScript units, browser behaviour, automated accessibility checks, ZIP inspection, and manual review. Passing one layer does not imply the others passed.

## Test layers

| Layer | Command | What it checks |
| --- | --- | --- |
| Python source checks | `npm test` | Claim rules, asset metadata, local-link logic, prompts, workflow, examples, research mapping, and licences through Python unit and release scripts. |
| JavaScript units | `npm run test:unit` | Escaping, safe links, normalisation, filtering, manifest data, project names, generated files, and approval state. |
| Asset composition | `npm run test:compose` | All 100 modules resolve the kernel and referenced specialist controls exactly once, without missing or duplicate IDs. |
| ZIP integrity | `npm run test:zip` | CRC-readable archives, UTF-8 content, duplicate or unsafe path rejection, and empty-set rejection. |
| Browser behaviour | `npm run test:e2e` | Homepage and builder workflows in Chromium, Firefox, and WebKit, including keyboard modal behaviour and extracted ZIP content. |
| Automated accessibility | `npm run test:a11y` | Axe checks across eight representative page states in Chromium, Firefox, and WebKit plus DOM assertions. |
| Local links | `npm run test:links` | Repository-relative Markdown and HTML references and local fragments. External URLs are counted but not fetched. |
| Full local release gate | `bash scripts/verify-release.sh` | All configured deterministic and browser gates in release order. |

## Reproduce CI locally

Use Node.js `22.18.0` and Python 3:

```bash
npm ci
npx playwright install chromium firefox webkit
npm audit --audit-level=high
bash scripts/verify-release.sh
```

The browser server is started by Playwright on `127.0.0.1:4178`. Tests use deterministic fictional fixtures and must not use personal, production, or secret data.

## Coverage boundaries

The Chromium, Firefox, and WebKit matrix does not cover every browser version, operating system, screen reader, locale, high-contrast mode, or input device. The link checker does not make network requests. Unit tests prove the repository implementations under test, not the quality of model output or generated downstream systems.

Add failure cases whenever a parser, validator, router, renderer, path boundary, or public claim changes. Do not replace behavioural assertions with file-count checks.
