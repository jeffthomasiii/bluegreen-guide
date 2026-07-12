# Official Source Verification

## Purpose

BlueGreen Guide uses official sources to support launch-point planning information while keeping uncertain or changing details clearly labeled.

## Source priority

Use sources in this order:

1. Official park, harbor, marina, city, county, state, tribal, or federal facility page
2. Official facility operator page when the operator controls access or launch services
3. Official boating-facility or recreation directory
4. Official water-quality, closure, or hazard page

Tourism pages, blogs, mapping sites, social media, and general review sites are not treated as verification sources.

## Current implementation

`data/official-sources.js` runs after the base and Phase 1 expansion datasets and before `app.js`.

It:

- removes nonofficial links from the rendered source list;
- adds location-specific official sources where identified;
- adds official regional or state directories when a dedicated facility page has not yet been identified;
- records a `sourceReviewDate` and `sourceReviewStatus`;
- preserves `Needs verification` unless a future field-by-field review confirms the record.

## Important distinction

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

## Maintenance rule

When adding or editing a place:

1. Add the most specific official facility or managing-agency page available.
2. Add a secondary official source when it provides different planning information.
3. Do not use an unofficial page merely because it is more descriptive.
4. Keep the record marked `Needs verification` when any material field remains uncertain.
5. Recheck links and changing information during each scheduled data-review pass.
