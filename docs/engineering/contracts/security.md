# Security and Secrets Contract

## Purpose

Avoid agent-assisted damage around auth, secrets, privacy, and operational safety.

## Rules

- Never commit secrets.
- Never move secrets into client code.
- Never weaken auth for convenience.
- Never rely on UI hiding as authorization.
- Log and expose errors in user-safe language.
- Sensitive operational actions must be authenticated and auditable.

## Agent-specific rules

- If a task touches auth, session state, tokens, provider keys, exports, or access control, raise security review sensitivity.
- Do not add demo shortcuts into production paths.
- Do not recommend localStorage for sensitive secrets.
- Do not generate example code that normalises insecure practice.
