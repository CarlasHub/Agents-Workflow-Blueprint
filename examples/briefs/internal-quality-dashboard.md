# Example Product Brief: Internal Quality Dashboard

## Product summary

Build an internal web application for engineering, QA, accessibility, and leadership teams to inspect technical quality across multiple URLs and releases.

## Core capabilities

- submit one or many URLs for analysis
- queue and track analysis runs
- collect performance, accessibility, and structural quality signals
- compare current run against previous baselines
- display trend charts and breakdown tables
- filter by team, product area, environment, and severity
- export findings and reports
- restrict access by role
- keep an audit history of who ran, reviewed, and exported reports

## Non-functional expectations

- reliable background job handling
- clear loading, empty, and failure states
- accessible data-dense UI
- support for long-lived history
- docs that match reality
- release gates for build, tests, screenshots, and examples

## Common traps this example is meant to surface

- in-memory job state pretending to be production-safe
- charts without text summaries
- filters with weak names and poor state exposure
- export claims that exceed actual implementation
- docs describing roadmap features as shipped features
- agents making unsupported architecture leaps
