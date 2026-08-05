# Security policy

## Supported versions

Security fixes are applied to the current default branch. No long-term support branches are maintained.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting feature for this repository. If GitHub does not expose that control to you, contact the repository owner through the non-public contact method listed on their GitHub profile. Do not open a public issue for an unpatched vulnerability.

Include the affected path or page, reproduction steps using fictional data, impact, browser or environment, and a minimal proposed mitigation if known. Never paste a live secret into the report. If a real credential has been exposed, revoke or rotate it first and report only its type, redacted identifier, affected path, and exposure window. Receipt and remediation times are not guaranteed.

## Automated controls

- GitHub secret scanning and push protection inspect supported credential patterns.
- The `Security gates` workflow runs Gitleaks with redacted output on pushes and pull requests and scans the complete Git history weekly.
- The quality workflow runs `npm audit --audit-level=high` for the pinned JavaScript dependency tree.
- Dependabot alerts and security updates monitor supported dependencies between repository pushes.

These controls are complementary and can miss secrets or vulnerabilities. A passing check is not evidence that arbitrary content is safe to publish.

## Scope and boundaries

The public website and project builder are static and browser-local. The repository has no application backend or authentication service. Generated ZIPs are starter scaffolds and require independent review. Dependency and automated security checks reduce known risk but do not establish that the project is secure or compliant.
