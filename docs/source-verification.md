# Official Source Verification

## Purpose

BlueGreen Guide uses official sources to support launch-point planning information while keeping uncertain or changing details clearly labeled.

## Source Priority

Use sources in this order:

1. Official park, harbor, marina, city, county, state, tribal, or federal facility page
2. Official facility operator page when the operator controls access or launch services
3. Official boating-facility or recreation directory
4. Official water-quality, closure, navigation, or hazard page

Tourism pages, blogs, mapping sites, social media, and general review sites are not treated as verification sources.

## Current Implementation

As of v1.1.0, reviewed source links and source-review metadata are stored directly in the canonical records in `data/launch-points.json`.

Each record may include:

- `sourceUrls`
- `sourceReviewDate`
- `sourceReviewStatus`
- `verificationStatus`
- `lastVerified`
- `sourceNotes`

`data/launch-points.js` is generated from the canonical JSON file for direct browser loading.

## Important Distinction

An official link does not automatically verify every field in a place record.

Before a record is marked `Verified`, confirm the current status of:

- legal launch access;
- parking location and restrictions;
- fees and permits;
- operating hours and closures;
- restroom and amenity availability;
- water quality;
- tides, wind, weather, and water level;
- vessel traffic and navigation rules;
- known hazards and seasonal restrictions.

A source review confirms the authority and relevance of links. Field verification confirms specific claims.

## Maintenance Workflow

When adding or editing a place:

1. Edit `data/launch-points.json`.
2. Add the most specific official facility or managing-agency page available.
3. Add another official source only when it provides different planning information.
4. Keep the record marked `Needs verification` when any material field remains uncertain.
5. Set `sourceReviewDate` when source authority and relevance are reviewed.
6. Set `lastVerified` only when the material place fields themselves are checked.
7. Regenerate `data/launch-points.js` with `node scripts/build-launch-data-js.js`.
8. Run `node scripts/validate-repo.js`.

Recheck links and changing information during scheduled maintenance passes.
