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

## Rating and Guidance Semantics

The current ratings are curated comparison tools. They summarize available place information and general experience rather than providing a precise formula, live measurement, or safety determination.

### Best Time

`bestTime` represents the time of day generally considered most suitable for paddling based on the typical characteristics of the location. It may reflect common patterns such as calmer mornings, wind exposure, general water behavior, or the overall paddling experience.

Best Time is a **general planning recommendation**, not a live-conditions indicator. Future live weather, wind, tide, forecast, and advisory information will supplement this field rather than replace it.

### Skill Level

`skillLevel` represents the paddling experience generally recommended for using the location under typical conditions. The assessment may consider open-water exposure, distance from shore, wave or wake exposure, launch complexity, navigation demands, and the amount of judgment normally required.

Skill Level describes the location; it does not measure an individual user's ability, fitness, equipment, or preparedness.

### Difficulty

`difficulty` is a comparative rating used to help users distinguish generally easier launch experiences from more demanding ones. It may consider launch access, expected paddling effort, exposure, boat traffic, wind sensitivity, water movement, and overall complexity.

Difficulty is **not a safety rating**. A location with a lower difficulty score may still become unsuitable because of changing weather, water, access, or personal circumstances.

### Popularity

`popularity` is a relative estimate of how recognized or commonly used a location appears to be. It may draw from public recreation information, inclusion in official or recognized guides, general local familiarity, and evidence of recreational use.

Popularity is not based on verified attendance totals, real-time crowd levels, or live visitor counts.

### Verification Status

`verificationStatus` describes confidence in the available place information, not the quality or suitability of the launch.

A status of `Needs verification` is used when one or more material details have not been individually confirmed against a current, reliable source. An official link may support part of a record without confirming every field. Access rules, parking, fees, facilities, regulations, and other details can also change over time.

Using `Needs verification` allows BlueGreen Guide to remain transparent rather than presenting assumptions as confirmed facts. Ongoing maintenance can move records toward `Verified` as information is reviewed and a verification date is recorded.

See [Development Workflow](development-workflow.md#safety-and-data-rule) for the project's safety and source-handling rules and [Phase Roadmap](phase-roadmap.md#phase-3-live-conditions-and-trip-planning) for planned live-condition layers.

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
| Derived Insights | App-generated or curated guidance | Generally best in the morning, check wind after noon |

`bestTime` belongs to the **Derived Insights** layer because it summarizes typical or generally preferred conditions. It should not be confused with **Live Data** such as current weather, tides, wind, forecasts, or advisories.

## Data Rules

- Do not treat unverified data as confirmed.
- Do not invent access, parking, fees, tides, wind, water quality, climate, or hazard details.
- Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` where appropriate.
- An official link does not automatically verify every field.
- Use stable IDs and documented taxonomy tokens.
- Keep canonical JSON, generated JavaScript, collection references, documentation, and validation synchronized.
