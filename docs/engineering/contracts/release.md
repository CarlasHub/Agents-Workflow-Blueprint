# Release Contract

## Purpose

Prevent documentation drift, false capability claims, and unverified shipping language.

## Core rule

Public-facing material must describe the current, verified state of the software.
Not the intended state.
Not the roadmap state.
Not the optimistic state.

## Required release checks

- build command exists and runs
- required test commands run
- release verification command exists
- docs match current feature set
- screenshots are not stale
- examples do not rely on hidden setup without saying so
- known limitations are disclosed if they affect real use
- configuration caveats are documented if needed for deployment

## Common failure modes

- docs promise formats that export code does not produce
- screenshots show states or controls that no longer exist
- README still mentions local-only setup as if it were production-ready
- claims imply multi-user or enterprise readiness without auth, audit, or job durability proof
- accessibility language overstates what scans proved

## Go / no-go

Fail the release if:
- the implementation and docs disagree materially
- tests were not run for relevant flows
- release claims are unsupported
- example files are misleading
- screenshots are stale in a way that could mislead teams
