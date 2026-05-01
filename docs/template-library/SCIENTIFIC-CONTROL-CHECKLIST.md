# Scientific Control Checklist

Use this checklist before publishing, merging, or claiming success from any agent-assisted work.

1. Has the agent observed the real artefacts before acting?
2. Has it separated the user request from inferred goals?
3. Has it labelled assumptions as confirmed, inferred, or unknown?
4. Has it decomposed the task into the smallest safe subproblems?
5. Has it compared more than one implementation path when the decision is material?
6. Has it identified a plausible failure path before implementation?
7. Has it named the affected files, routes, UI states, data paths, scripts, and docs?
8. Has it implemented only inside the approved scope?
9. Has it avoided broad rewrites when a minimal safe change is sufficient?
10. Has it run commands that actually test the changed behaviour?
11. Has it avoided treating one passing command as proof for unrelated behaviour?
12. Has it inspected UI output when UI quality is part of the claim?
13. Has it inspected keyboard and accessibility behaviour when accessibility is part of the claim?
14. Has it mapped release claims to specific artefacts and verifiers?
15. Has it compared implementation evidence, behavioural evidence, and documentation evidence?
16. Has it recorded failed checks instead of hiding them?
17. Has it converted failures into correction requirements?
18. Has it disclosed what could not be verified?
19. Has it avoided “should work”, “looks good”, and “done” unless the claim is proven?
20. Has it produced a final status using only verified, partially verified, not verified, or blocked?
21. Has it listed files changed and why?
22. Has it listed files inspected but not changed when they influenced the work?
23. Has it exposed the rejected path for material decisions?
24. Has it included a reviewer-reproducible evidence table?
25. Has it avoided marketing language after the final status?
