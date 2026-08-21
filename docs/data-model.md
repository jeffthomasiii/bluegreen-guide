# Data Model

## Canonical Files

BlueGreen Guide keeps place records in canonical JSON and uses lightweight browser loaders for the static GitHub Pages app.

- `data/places.json` — authoritative base place records
- `data/mission-bay-launch-points.json` — authoritative Mission Bay place-pilot records that replace the legacy aggregate Mission Bay record at runtime
- `data/green-space-field-test.json` — authoritative 10-place green/mixed field-test supplement during on-site testing
- `data/places.js` — generated browser copy of the base place records
- `data/mission-bay-launch-points.js` — Mission Bay browser loader
- `data/green-space-field-test.js` — green/mixed field-test browser loader
- `data/launch-profile.js` — curated paddle-suitability enrichment only; it does not own or create place records
- `data/collections.js` — curated collection configuration

After editing canonical JSON:

```bash
node scripts/build-place-data-js.js
node scripts/validate-repo.js
```

Repository validation currently resolves 89 active runtime places in the field-test branch: 79 existing active records after Mission Bay replacement plus four mixed and six green pilot records. A recent deployed-app screenshot displayed 80 places before the pilot. Reconcile that one-place difference as a cache/runtime/legacy-data issue rather than manufacturing an additional record.

Keller Trail / Greer Ranch remains outside the canonical dataset until its specific trailhead/access point can be better verified.

## Place Classification

Keep environment, place type, and activity as separate concepts.

### `spaceType`

- `blue` — water place or water-centered access point
- `green` — land place or land-centered access point
- `mixed` — a destination with meaningful blue-space and green-space characteristics

Mixed places intentionally qualify for both Water and Land discovery filters in the field-test UI.

### `placeTypes`

`placeTypes` describes what a place is, for example:

- `state-recreation-area`
- `regional-park`
- `reservoir-recreation-area`
- `open-space-reserve`
- `wilderness-park`
- `urban-open-space`
- `historic-park`
- `botanic-garden`
- `ecological-reserve`
- `trail-network`
- `paddle-launch`

### `activityTypes`

`activityTypes` describes what people may do at a place. A mixed reservoir park can therefore support boating and hiking without being forced into a single activity identity.

## Current Place Fields

Core static fields include:

- `id`
- `name`
- `region`
- `state`
- `lat`
- `lng`
- `waterType` — legacy field name retained for compatibility; green records may use a plain-language environment description
- `activities`
- `amenities`
- `tags`
- `description`
- `verificationStatus`
- `sourceUrls`
- `sourceNotes`
- `bestTime`

Paddle-specific legacy/current fields apply where relevant:

- `skillLevel`
- `difficulty`
- `popularity` — legacy numeric source retained internally during migration
- `supSuitability`
- `windSensitivity`
- `useLevel`
- `crowdSensitivity`
- `stagingSpace`
- `assessmentConfidence`

Supported search and wayfinding fields:

- `aliases`
- `waterBody`
- `spaceType`
- `placeTypes`
- `activityTypes`
- `amenityTypes`
- `attributeTypes`
- `paddleRelevant`

Source-review fields:

- `lastVerified`
- `sourceReviewDate`
- `sourceReviewStatus`

Photo fields:

- `photoStatus`
- `photoUrls`
- `photoNotes`

## Coordinate Semantics

A marker should represent a practical visitor, launch, shoreline-access, or trail-access area when that location can be reasonably supported, rather than a broad place centroid when a more useful access point is known.

When an official source confirms a place but does not publish an exact GPS waypoint, use a reasonable representative coordinate only when useful, document the inference in `sourceNotes`, and do not present it as an official coordinate. Field testing should refine access coordinates where practical.

## Paddle Suitability Profile

The Launch Suitability Profile remains a paddle-specific guidance layer. Records with `paddleRelevant: false` do not require paddle-only fields.

### SUP Suitability

`supSuitability` uses `Excellent`, `Good`, `Fair`, or `Challenging`. It summarizes the overall recreational stand-up paddleboarding fit of a location and is editorial planning guidance rather than a safety score.

### Wind Sensitivity

`windSensitivity` uses `Low`, `Moderate`, or `High`. It describes how strongly increasing wind can degrade the paddling experience; it does not describe current or forecast wind.

### Typical Use

`useLevel` uses `Low`, `Moderate`, `High`, or `Very High`. It describes general recreational use rather than implying that more use is better.

### Crowd Sensitivity

`crowdSensitivity` uses `Low`, `Moderate`, or `High` and describes how much crowding can interfere with launching, carrying, staging, resting, or paddling.

### Staging Space

`stagingSpace` uses `Limited`, `Moderate`, or `Generous` and describes practical room for unloading, rigging, launching, exiting, and temporarily placing paddle equipment.

### Assessment Confidence

`assessmentConfidence` uses `Low`, `Moderate`, or `High`. It describes confidence in BlueGreen Guide's suitability assessment and is separate from `verificationStatus`, which describes confidence in place facts.

## Existing Guidance Semantics

`bestTime`, `skillLevel`, and `difficulty` remain general paddle-planning guidance where applicable. They are not live conditions, individual ability assessments, or safety guarantees.

`verificationStatus` describes confidence in available place facts, not the quality or suitability of a destination. Use `Needs verification` whenever material details remain uncertain even if an official source confirms the place exists.

## Collection Fields

Each collection includes:

- `id`
- `name`
- `description`
- `query`
- `placeIds`

Collections filter by exact `placeIds`. Every referenced ID must exist in runtime place data.

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
| Place Data | Rarely changing facts | Place type, parking, restrooms |
| Curated Guidance | Comparative planning assessments | SUP suitability, wind sensitivity, staging space |
| Live Data | Current or near-term conditions | Weather, current wind, tides, current closures |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, check wind after noon |

Keep these layers distinct.

## Data Rules

- Do not treat unverified data as confirmed.
- Do not invent access, parking, fees, tides, wind, water quality, climate, closures, or hazard details.
- Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` where appropriate.
- An official link does not automatically verify every field.
- Curated suitability assessments must be presented as guidance, not official or live measurements.
- Use stable IDs and documented taxonomy tokens.
- Keep canonical JSON layers, browser/runtime data, profile data, collection references, documentation, and validation synchronized.

See [Development Workflow](development-workflow.md) for maintenance steps and [Phase Roadmap](phase-roadmap.md) for the boundary between the current field-test pilot and future structured-place work.
