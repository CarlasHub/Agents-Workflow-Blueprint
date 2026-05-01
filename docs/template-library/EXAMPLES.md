# Examples: Weak Output vs Strong Output

## Example 1: fake completion

### Weak output

> Done. The UI is fixed and everything passes.

### Why it fails

- No files are named.
- No UI state is described.
- No command output is shown.
- No limitation is disclosed.
- The final claim is stronger than the evidence.

### Stronger output

> Limited acceptance: the spacing issue in `src/components/Card.tsx` was adjusted and `npm test` passed. The narrow-screen state was not inspected because no browser runtime was available. Final status: partially verified.

## Example 2: accessibility overclaim

### Weak output

> The component is accessible now.

### Why it fails

- It does not mention semantics, keyboard behaviour, accessible names, or manual checks.
- It implies broad coverage from an unspecified change.

### Stronger output

> The icon button now has a visible text alternative and keyboard focus remains visible. Automated checks were not run and screen-reader behaviour was not manually verified. Final status: partially verified.

## Example 3: documentation truth

### Weak output

> Updated README to say the project is complete.

### Why it fails

- Completeness is not evidence.
- README can only describe what the repository proves.

### Stronger output

> Updated README to describe the 100-asset template library, verification scripts, and starter-level limits. The repository does not prove a deployed product. Final status: verified for documentation alignment.
