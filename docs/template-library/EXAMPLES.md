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


## Example: scientific-DNA rewrite

### Weak prompt

```text
Fix the UI and tell me when it is done.
```

### Strong prompt

```text
Use the UI truth pack. Observe the rendered UI or available screenshots first. Decompose the problem into spacing, hierarchy, interaction states, responsive behaviour, and accessibility. Compare at least two possible fixes if the layout defect could be structural. Apply the smallest safe change. Verify with available commands or disclose missing runtime checks. Map every claim to evidence. End with verified, partially verified, not verified, or blocked.
```

### Why the strong version works better

- It uses ReAct by requiring observation before action.
- It uses least-to-most by splitting UI quality into smaller checks.
- It uses Tree-of-Thoughts-style branching when the fix path is ambiguous.
- It uses process supervision by requiring the path to be inspectable.
- It uses traceability by mapping claims to evidence and status.
