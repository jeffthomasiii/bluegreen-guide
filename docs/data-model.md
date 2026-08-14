# Data Model

## Canonical Files

BlueGreen Guide keeps place records in canonical JSON and generates browser-ready JavaScript from those files.

- `data/launch-points.json` — authoritative base launch records
- `data/mission-bay-launch-points.json` — authoritative Mission Bay launch records added during the Launch Suitability maintenance pass
- `data/launch-points.js` — generated browser copy of the base launch records
- `data/mission-bay-launch-points.js` — generated browser copy of the Mission Bay launch records
- `data/launch-profile.js` — curated suitability enrichment only; it does not own or create place records
- `data/collections.js` — curated collection configuration

Edit place facts in the canonical JSON files, regenerate the browser copies, and validate before publishing.

```bash
node scripts/build-launch-data-js.js
node scripts/validate-repo.js
```

The runtime dataset is the combined canonical launch data. The Launch Suitability Profile remains distinct from live conditions and from place ownership: it enriches existing launch records with curated planning assessments such as SUP suitability and wind sensitivity; it does not contain current wind speed, weather, tides, water quality, or safety guarantees.

## Current Place Fields

Core static fields:

- `id`
- `name`
- `region`
- `state`
- `lat`
- `lng`
- `waterType`
- `activities`
- `skillLevel`
- `difficulty`
- `popularity` — legacy numeric source retained during migration; no longer shown as a positive star rating
- `bestTime`
- `amenities`
- `tags`
- `description`
- `verificationStatus`
- `sourceUrls`
- `sourceNotes`

Launch Suitability Profile fields:

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

Source-review fields:

- `lastVerified`
- `sourceReviewDate`
- `sourceReviewStatus`

Photo fields:

- `photoStatus`
- `photoUrls`
- `photoNotes`

## Launch Coordinates

Launch markers should represent the practical launch or shoreline access area rather than a broad park, neighborhood, lake, or water-body centroid whenever a more useful access location can be supported.

When an official source confirms the facility but does not publish an exact GPS point, use a reasonable shoreline/access coordinate and state that limitation in `sourceNotes`. Do not describe an inferred coordinate as an official waypoint.

## Launch Suitability Profile

BlueGreen Guide uses the Launch Suitability Profile to compare the practical experience of using paddle launch points. These values are curated planning guidance, not live measurements, mathematical safety scores, or guarantees.

### SUP Suitability

`supSuitability` uses:

- `Excellent`
- `Good`
- `Fair`
- `Challenging`

It summarizes the overall recreational stand-up paddleboarding fit of a location. The assessment may consider launch difficulty, water character, exposure, boat traffic, crowd effects, and practical staging space. It is an editorial assessment rather than a weighted formula.

### Wind Sensitivity

`windSensitivity` uses:

- `Low`
- `Moderate`
- `High`

It describes how strongly increasing wind can degrade the paddling experience at the location. It does **not** describe current wind, guarantee typical wind speed, or mean that a place labeled `High` is always windy.

Current and forecast wind belongs to the future Live Data layer.

### Typical Use

`useLevel` replaces user-facing popularity and uses:

- `Low`
- `Moderate`
- `High`
- `Very High`

It describes general recreational use rather than implying that more use is better. Actual crowd levels vary by weekday, season, time, weather, holidays, events, and other factors.

The legacy numeric `popularity` field remains available internally during the migration so existing records and maintenance logic are not broken. Product UI should prefer `useLevel`.

### Crowd Sensitivity

`crowdSensitivity` uses:

- `Low`
- `Moderate`
- `High`

It describes how much crowding can interfere with launching, carrying equipment, staging, resting, or paddling. It is intentionally separate from Typical Use because a large launch area may absorb heavy use better than a small access point.

### Staging Space

`stagingSpace` uses:

- `Limited`
- `Moderate`
- `Generous`

It describes practical room for unloading, carrying, inflating, rigging, launching, exiting, and temporarily placing paddleboards or kayaks while resting. It is broader than beach or shoreline width alone.

### Assessment Confidence

`assessmentConfidence` uses:

- `Low`
- `Moderate`
- `High`

It describes confidence in the BlueGreen Guide suitability assessment based on the available source material and place information. It is **not** the same as `verificationStatus`.

An official source can confirm that a facility exists without independently verifying BlueGreen Guide's conclusion that a location is `Excellent` for SUP.

## Existing Rating and Guidance Semantics

### Best Time

`bestTime` represents the time of day generally considered most suitable for paddling based on the typical characteristics of the location. It may reflect common patterns such as calmer mornings, wind exposure, general water behavior, or the overall paddling experience.

Best Time is a **general planning recommendation**, not a live-conditions indicator. Future live weather, wind, tide, forecast, and advisory information will supplement this field rather than replace it.

### Skill Level

`skillLevel` represents the paddling experience generally recommended for using the location under typical conditions. The assessment may consider open-water exposure, distance from shore, wave or wake exposure, launch complexity, navigation demands, and the amount of judgment normally required.

Skill Level describes the location; it does not measure an individual user's ability, fitness, equipment, or preparedness.

### Difficulty

`difficulty` remains a 1–5 comparative rating used to distinguish generally easier launch experiences from more demanding ones. It may consider launch access, expected paddling effort, exposure, boat traffic, water movement, and overall complexity.

Difficulty answers a different question from SUP Suitability. A location can be physically easy to launch from while still having high wind sensitivity, crowd constraints, or other factors that reduce its overall SUP suitability.

Difficulty is **not a safety rating**.

### Verification Status

`verificationStatus` describes confidence in available place facts, not the quality or suitability of the launch.

A status of `Needs verification` is used when one or more material details have not been individually confirmed against a current, reliable source. An official link may support part of a record without confirming every field. Access rules, parking, fees, facilities, regulations, and other details can also change over time.

See [Launch Suitability Profile](launch-suitability/) for the public rating explanation, [Development Workflow](development-workflow.md#safety-and-data-rule) for source-handling rules, and [Phase Roadmap](phase-roadmap.md#phase-3-live-conditions-and-trip-planning) for planned live-condition layers.

## Collection Fields

Each collection includes:

- `id`
- `name`
- `description`
- `query`
- `placeIds`

Collections filter by exact `placeIds`. Every referenced ID must exist in the runtime place data.

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

The Launch Suitability Profile is a maintenance refinement and does not reopen the broader Phase 2 structured-place-details scope.

## Later Data Layers

Keep these layers separate:

| Layer | Purpose | Example |
|---|---|---|
| Place Data | Rarely changing facts | Parking, launch type, restrooms |
| Curated Guidance | Comparative planning assessments | SUP suitability, wind sensitivity, staging space |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, check wind after noon |

`windSensitivity` describes how a location responds to wind and belongs to curated guidance. Current wind speed and forecasts belong to Live Data.

## Data Rules

- Do not treat unverified data as confirmed.
- Do not invent access, parking, fees, tides, wind, water quality, climate, or hazard details.
- Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` where appropriate.
- An official link does not automatically verify every field.
- Curated suitability assessments must be presented as guidance, not official or live measurements.
- Use stable IDs and documented taxonomy tokens.
- Keep canonical JSON, generated JavaScript, runtime profile data, collection references, documentation, and validation synchronized.
