# Data Model

## Canonical Files

- `data/launch-points.json` — authoritative place records
- `data/launch-points.js` — generated browser copy
- `data/collections.js` — curated collection configuration

Edit the JSON source, regenerate the browser copy, and validate before publishing.

```bash
node scripts/build-launch-data-js.js
node scripts/validate-repo.js
```

## Current Place Fields

Core fields:

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
- `popularity`
- `bestTime`
- `amenities`
- `tags`
- `description`
- `verificationStatus`
- `sourceUrls`
- `sourceNotes`

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

## Collection Fields

Each collection includes:

- `id`
- `name`
- `description`
- `query`
- `placeIds`

Collections filter by exact `placeIds`. Every referenced ID must exist in the canonical place data.

## Wayfinding Semantics

- `blue` — water places and water activities
- `green` — land places and land activities
- `neutral` — amenities and universal attributes
- `mixed` — meaningful blue-space and green-space characteristics shown through the relevant categories

Color supports meaning but does not replace labels, icons, or shapes.

## Future Phase 2 Fields

Potential structured place fields:

- `entryType`
- `accessNotes`
- `parkingType`
- `fees`
- `restrooms`
- `rentals`
- `dogsAllowed`
- `accessibility`
- `windSensitivity`
- `tideImpact`
- `hazards`

## Later Data Layers

Keep these layers separate:

| Layer | Purpose | Example |
|---|---|---|
| Place Data | Rarely changing facts | Parking, launch type, restrooms |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, check wind after noon |

## Data Rules

- Do not treat unverified data as confirmed.
- Do not invent access, parking, fees, tides, wind, water quality, climate, or hazard details.
- Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` where appropriate.
- An official link does not automatically verify every field.
- Use stable IDs and documented taxonomy tokens.
- Keep canonical JSON, generated JavaScript, collection references, documentation, and validation synchronized.
