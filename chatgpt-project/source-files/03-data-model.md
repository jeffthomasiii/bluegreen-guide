# Data Model

## Data Files

Canonical JSON:

- `data/places.json` — authoritative base place records
- `data/mission-bay-launch-points.json` — authoritative Mission Bay place-pilot records that replace the legacy aggregate Mission Bay record at runtime
- `data/green-space-field-test.json` — authoritative 10-place green/mixed field-test supplement while those records are tested on site

Generated/browser data:

- `data/places.js` — generated browser copy of the base records
- `data/mission-bay-launch-points.js` — browser loader for the Mission Bay records
- `data/green-space-field-test.js` — browser loader for the green/mixed field-test records

Other runtime data:

- `data/launch-profile.js` — curated Launch Suitability enrichment only; it must not create or own place records
- `data/collections.js` — curated collection configuration

After editing canonical JSON:

```bash
node scripts/build-place-data-js.js
node scripts/validate-repo.js
```

Repository validation resolves 89 active runtime places in the field-test branch: 79 existing active records after Mission Bay replacement plus four mixed and six green pilot places. A recent deployed-app screenshot displayed 80 places before the pilot; reconcile that one-place cache/runtime discrepancy rather than manufacturing an additional record. Keller Trail / Greer Ranch remains outside the canonical dataset until the specific trailhead/access point can be better verified.

Keep static place facts, curated guidance, live conditions, environmental context, and generated insights distinct.

## Current Place Fields

Core place fields include:

- `id`
- `name`
- `region`
- `state`
- `lat`
- `lng`
- `waterType` — legacy field name retained for compatibility; green records may use a plain-language environment description
- `activities`
- `skillLevel` — paddle-specific where applicable
- `difficulty` — paddle-specific where applicable
- `popularity` — legacy numeric source retained internally during migration
- `bestTime`
- `amenities`
- `tags`
- `description`
- `verificationStatus`
- `sourceUrls`
- `sourceNotes`

Launch Suitability Profile fields apply to paddle-relevant places:

- `supSuitability` — `Excellent`, `Good`, `Fair`, `Challenging`
- `windSensitivity` — `Low`, `Moderate`, `High`
- `useLevel` — `Low`, `Moderate`, `High`, `Very High`
- `crowdSensitivity` — `Low`, `Moderate`, `High`
- `stagingSpace` — `Limited`, `Moderate`, `Generous`
- `assessmentConfidence` — `Low`, `Moderate`, `High`

Supported search and wayfinding fields:

- `aliases`
- `waterBody`
- `spaceType`
- `placeTypes`
- `activityTypes`
- `amenityTypes`
- `attributeTypes`

Source-review fields:

- `lastVerified`
- `sourceReviewDate`
- `sourceReviewStatus`

Photo fields:

- `photoStatus`
- `photoUrls`
- `photoNotes`

## Coordinate Semantics

A map marker should represent a practical visitor, launch, shoreline-access, or trail-access area when that location can be reasonably supported, not merely a broad place centroid when a more useful point is known.

If an official source confirms the place but does not provide an exact GPS waypoint, use a reasonable representative coordinate, document the inference in `sourceNotes`, and do not present it as an official coordinate. Field testing should refine access-point coordinates where useful.

## Place Classification

`spaceType` represents the BlueGreen environment relationship:

- `blue` — water place or water-centered access point
- `green` — land place or land-centered access point
- `mixed` — a destination with meaningful blue-space and green-space characteristics

`placeTypes` describes what the place actually is, for example `regional-park`, `state-recreation-area`, `botanic-garden`, `ecological-reserve`, `trail-network`, or `reservoir-recreation-area`.

`activityTypes` describes what people may do there. Environment, place type, and activity must remain separate concepts so a mixed reservoir park can support both boating and hiking without being forced into a single activity identity.

Mixed places intentionally qualify for both Water and Land discovery filters in the field-test UI.

## Launch Suitability Semantics

### SUP Suitability

A curated overall assessment of how well the location generally fits recreational stand-up paddleboarding. It may consider launch difficulty, exposure, water character, vessel interaction, crowd effects, and staging. It is not a mathematical safety score.

### Wind Sensitivity

Describes how strongly increasing wind can degrade the paddling experience at a location. It does not mean the location is normally windy and does not represent current or forecast wind.

### Typical Use

`useLevel` replaces the user-facing Popularity star treatment. High use is not automatically positive; it may increase parking, shoreline, staging, or water congestion.

### Crowd Sensitivity

Describes how much crowding interferes with launching, carrying, staging, resting, or paddling. Keep this separate from Typical Use because different sites absorb crowds differently.

### Staging Space

Describes practical room for unloading, inflating, rigging, carrying, launching, exiting, and temporarily placing paddleboards or kayaks while resting.

### Assessment Confidence

Describes confidence in the BlueGreen Guide suitability assessment. It is separate from `verificationStatus`, which describes confidence in place facts.

## Existing Guidance

- `difficulty` remains a 1–5 comparative measure of launch complexity for paddle-relevant records.
- `bestTime` remains plain-language general planning guidance.
- Neither is a live-condition or safety guarantee.
- Legacy `popularity` may support migration logic but product UI should prefer `useLevel` and `crowdSensitivity` where those fields apply.

## Collection Fields

Each collection includes:

- `id`
- `name`
- `description`
- `query`
- `placeIds`

Every referenced ID must exist in runtime place data.

## Wayfinding Semantics

- `blue` — water places and water activities
- `green` — land places and land activities
- `neutral` — amenities and universal attributes
- `mixed` — meaningful blue-space and green-space characteristics shown through the relevant categories

Color supports meaning but does not replace labels, icons, or shapes.

## Future Phase 2 Fields

Potential structured place fields remain:

- `entryType`
- `accessNotes`
- `parkingType`
- `fees`
- `restrooms`
- `rentals`
- `dogsAllowed`
- `accessibility`
- `tideImpact`
- `hazards`

The green-space field-test pilot and Launch Suitability Profile are maintenance/validation refinements and do not reopen Phase 2.

## Data Layers

| Layer | Purpose | Example |
|---|---|---|
| Place Data | Rarely changing facts | Parking, place type, restrooms |
| Curated Guidance | Comparative planning assessments | SUP suitability, wind sensitivity, staging space |
| Live Data | Current or near-term conditions | Weather, current wind, tides, current closures |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, check wind after noon |

## Data Rules

- Do not treat unverified data as confirmed.
- Do not invent access, parking, fees, tides, wind, water quality, climate, closures, or hazard details.
- Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` where appropriate.
- An official link does not automatically verify every field.
- Curated suitability fields must be labeled as planning guidance, not official or live measurements.
- Use stable IDs and documented taxonomy tokens.
- Keep canonical JSON layers, generated/browser JavaScript, profile data, collection references, documentation, and validation synchronized.
