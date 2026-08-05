# Third-party notices

This file records third-party material used by the repository itself. References cited for research context are listed in [`docs/template-library/RESEARCH-BASIS.md`](docs/template-library/RESEARCH-BASIS.md); citation does not incorporate those works into this repository.

## Development and test dependencies

Development dependencies are installed from npm and are not committed or served by the GitHub Pages site. Their licence texts remain authoritative in their packages.

| Package | Purpose | Licence | Source |
| --- | --- | --- | --- |
| `@playwright/test` | Browser and keyboard testing | Apache-2.0 | https://github.com/microsoft/playwright |
| `@axe-core/playwright` | Automated accessibility checks | MPL-2.0 | https://github.com/dequelabs/axe-core-npm |
| `eslint` | JavaScript static analysis | MIT | https://github.com/eslint/eslint |
| `fflate` | ZIP extraction and integrity tests | MIT | https://github.com/101arrowz/fflate |

## CI-only security tooling

Gitleaks Action v3 runs in GitHub Actions to detect hardcoded secrets. It is not bundled into or served by this project. The workflow pins the action to commit `bcfb9cce635345aac9996cedc19b2de8e01b894f` and Gitleaks CLI version `8.24.3`. Gitleaks Action is used under its published end-user licence for personal GitHub accounts; the authoritative terms remain at https://gitleaks.io/COMMERCIAL-LICENSE.txt.

## Repository media

`assets/human-body-brand.png` is treated as project-owned branding. No permission to use the name or branding as an endorsement is granted by the software or content licences.

If third-party content is added, record its title, author, source URL, licence, modifications, and repository path here before release.
