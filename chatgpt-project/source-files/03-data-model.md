# Data Model

## Data Files

- `data/launch-points.json` — authoritative static place records
- `data/launch-points.js` — generated browser copy
- `data/launch-profile.js` — curated Launch Suitability Profile and current maintenance additions
- `data/collections.js` — curated collection configuration

After editing canonical JSON:

```bash
node scripts/build-launch-data-js.js
node scripts/validate-repo.js
```

Keep static place facts, curated guidance, live conditions, environmental context, and generated insights distinct.

## Current Place Fields

Core place fields include:

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
- `popularity` — legacy numeric source retained internally during migration
- `bestTime`
- `amenities`
- `tags`
- `description`
- `verificationStatus`
- `sourceUrls`
- `sourceNotes`

Launch Suitability Profile fields:

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

- `difficulty` remains a 1–5 comparative measure of launch complexity.
- `bestTime` remains plain-language general planning guidance.
- Neither is a live-condition or safety guarantee.
- Legacy `popularity` may support migration logic but product UI should prefer `useLevel` and `crowdSensitivity`.

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

The Launch Suitability Profile is a maintenance refinement and does not reopen Phase 2.

## Data Layers

| Layer | Purpose | Example |
|---|---|---|
| Place Data | Rarely changing facts | Parking, launch type, restrooms |
| Curated Guidance | Comparative planning assessments | SUP suitability, wind sensitivity, staging space |
| Live Data | Current or near-term conditions | Weather, current wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, check wind after noon |

## Data Rules

- Do not treat unverified data as confirmed.
- Do not invent access, parking, fees, tides, wind, water quality, climate, or hazard details.
- Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` where appropriate.
- An official link does not automatically verify every field.
- Curated suitability fields must be labeled as planning guidance, not official or live measurements.
- Use stable IDs and documented taxonomy tokens.
- Keep canonical JSON, generated JavaScript, profile data, collection references, documentation, and validation synchronized.
