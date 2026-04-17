# Sample Review Packet

## Executive verdict
CONDITIONAL PASS

## Release blockers
- Export docs mention PDF output, but implementation only supports CSV.
- Comparison dialog opens but no explicit focus-return assertion exists.

## Major issues
- Delta computation duplicated in UI layer and report-export module.
- Error state for missing baseline run is not tested.

## Technical missteps
- Comparison state shaping appears in both the route loader and the export formatter instead of one shared domain path.

## Accessibility findings
- visual_composition_review: red/green delta styling appears to rely too much on colour alone
- state_limited_review: no explicit confirmation that async comparison refresh announces completion

## Security findings
- moderate: export endpoint review is still unverified, so role enforcement for comparison export remains an evidence gap

## Testing verdict
- good regression coverage for filter persistence
- missing keyboard test for closing the comparison drawer and returning focus

## Documentation drift
- screenshot references old filter layout

## Non-negotiable fixes before merge
- remove the unsupported PDF claim from docs or implement it and verify it
- add a focus-return assertion for closing the comparison drawer

## Optional follow-up improvements
- consolidate delta formatting into one shared domain module
