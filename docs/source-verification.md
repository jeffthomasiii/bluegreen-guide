# Official Source Verification

## Purpose

BlueGreen Guide uses official sources to support outdoor place and launch-planning information while keeping uncertain or changing details clearly labeled.

## Source Priority

Use sources in this order:

1. Official park, harbor, marina, city, county, state, tribal, or federal facility page
2. Official facility operator page when the operator controls access or recreation services
3. Official boating-facility, trail, open-space, or recreation directory
4. Official water-quality, closure, navigation, fire, environmental, or hazard page

Tourism pages, blogs, mapping sites, social media, and general review sites may help with discovery but are not treated as verification sources for material place facts.

## Current Implementation

Reviewed source links and source-review metadata are stored directly in the current canonical place layers:

- `data/places.json`
- `data/mission-bay-launch-points.json`
- `data/green-space-field-test.json`

Each record may include:

- `sourceUrls`
- `sourceReviewDate`
- `sourceReviewStatus`
- `verificationStatus`
- `lastVerified`
- `sourceNotes`

Browser/runtime loaders are generated or maintained separately from the canonical place facts. The Launch Suitability Profile is curated guidance for paddle-relevant places and is not a verification source.

## Important Distinction

An official link does not automatically verify every field in a place record.

Before a record is marked `Verified`, confirm the material claims that apply to that place, such as:

- legal visitor, trail, shoreline, or launch access
- parking location and restrictions
- fees and permits
- operating hours and closures
- restroom and amenity availability
- recreation/activity rules
- accessibility claims
- water quality where relevant
- tides, wind, weather, water level, fire restrictions, or trail conditions when they are presented as current information
- vessel traffic and navigation rules where relevant
- known hazards and seasonal restrictions
- exact access coordinates when presented as an official waypoint

A source review confirms the authority and relevance of links. Field verification or claim-level review confirms specific place facts.

## Coordinate Verification

A practical visitor, launch, shoreline-access, or trail-access coordinate is more useful than a broad centroid, but usefulness must not be confused with official precision.

When an agency confirms the place but does not publish an exact GPS waypoint:

- use a reasonable representative coordinate only when it improves planning
- document the inference in `sourceNotes`
- do not label the coordinate as official
- refine it during field testing when practical

## Maintenance Workflow

When adding or editing a place:

1. Edit the appropriate canonical JSON layer.
2. Add the most specific official facility or managing-agency page available.
3. Add another official source only when it provides materially different planning information.
4. Keep the record marked `Needs verification` when any material field remains uncertain.
5. Set `sourceReviewDate` when source authority and relevance are reviewed.
6. Set `lastVerified` only when the material place fields themselves are checked.
7. Document inferred coordinates, representative imagery, or unresolved access questions in the relevant notes fields.
8. Run `node scripts/build-place-data-js.js` after canonical place-data changes.
9. Run `node scripts/validate-repo.js`.
10. Review the affected place in the app before publishing.

Recheck links and changing information during scheduled maintenance passes. Do not convert temporary closures, current weather, wind, tides, water quality, fire restrictions, or other changing conditions into permanent static place facts.
