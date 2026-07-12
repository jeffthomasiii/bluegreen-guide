# Data Model

BlueGreen Guide v1.1.0 uses one canonical place dataset and one curated collection configuration.

## Canonical Files

- `data/launch-points.json` — authoritative place records
- `data/launch-points.js` — generated browser copy of the JSON records
- `data/collections.js` — curated collection definitions

Do not edit `data/launch-points.js` directly. Generate it from the JSON source with:

```bash
node scripts/build-launch-data-js.js
```

Then run:

```bash
node scripts/validate-repo.js
```

## Required Place Fields

| Field | Type | Purpose |
|---|---:|---|
| `id` | string | Stable unique identifier |
| `name` | string | Public-facing place name |
| `region` | string | County, metro, mountain, or regional label |
| `state` | string | State abbreviation |
| `lat` | number | Latitude |
| `lng` | number | Longitude |
| `waterType` | string | Bay, harbor, reservoir, river, beach, or similar context |
| `activities` | array | SUP, Kayak, Canoe, or other supported activities |
| `skillLevel` | string | Beginner, Intermediate, or Advanced |
| `difficulty` | number | General 1-to-5 difficulty score |
| `popularity` | number | General 0-to-5 popularity score |
| `bestTime` | string | General planning note rather than a live condition |
| `amenities` | array | Human-readable amenity summaries |
| `tags` | array | Searchable planning and experience labels |
| `description` | string | Short practical summary |
| `verificationStatus` | string | `Needs verification` or `Verified` |
| `sourceUrls` | array | Official source objects with `label` and `url` |
| `sourceNotes` | string | Scope and uncertainty note |

## Supported Wayfinding Fields

| Field | Type | Purpose |
|---|---:|---|
| `aliases` | array | Alternate names included in search |
| `waterBody` | string | Shared water body or geographic relationship |
| `spaceType` | string | `blue`, `green`, `mixed`, or `neutral` |
| `placeTypes` | array | Place categories such as harbor, lake, beach, park, or marina |
| `activityTypes` | array | Structured activities such as paddle-launch or kayak-launch |
| `amenityTypes` | array | Structured services such as parking, restrooms, or rentals |
| `attributeTypes` | array | Qualities such as beginner-friendly, scenic-view, or calm-water |

Color is a supporting cue rather than the only source of meaning:

- `blue` — water places and water activities
- `green` — land places and land activities
- `neutral` — amenities and universal attributes
- `mixed` — meaningful blue-space and green-space characteristics shown through the relevant categories

## Verification and Source Fields

| Field | Type | Purpose |
|---|---:|---|
| `lastVerified` | string/null | Date material place fields were verified, or `null` |
| `sourceReviewDate` | string/null | Date the authority and relevance of source links were reviewed |
| `sourceReviewStatus` | string | Scope of the source-link review |
| `sourceUrls` | array | Official facility, agency, operator, or directory links |
| `sourceNotes` | string | Clear explanation of what still requires confirmation |

An official link does not automatically verify access, parking, fees, hours, amenities, water quality, weather, wind, tides, vessel traffic, or hazards.

## Photo Fields

| Field | Type | Purpose |
|---|---:|---|
| `photoStatus` | string | `representative` or `location` |
| `photoUrls` | array | Photo objects with URL, alt text, credit, source, and license metadata |
| `photoNotes` | string | Explanation of image scope or uncertainty |

Use `location` only when the image is confirmed to show the specific place.

## Collection Model

Each object in `data/collections.js` includes:

| Field | Type | Purpose |
|---|---:|---|
| `id` | string | Stable collection identifier |
| `name` | string | Public collection name |
| `description` | string | Editorial explanation and caution |
| `query` | string | Optional descriptive/search metadata |
| `placeIds` | array | Exact canonical place IDs included in the collection |

The application filters collections by `placeIds`. Validation fails when a collection references a missing place.

## Future Structured Place Fields

Potential Phase 2 fields include:

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

## Data Rules

- Do not present uncertain access, safety, fees, rules, conditions, or hazards as verified.
- Use `Unknown`, `Needs verification`, `Check official source`, or `Conditions vary` where appropriate.
- Keep permanent place facts separate from live conditions, environmental context, and generated insights.
- Use stable IDs and documented taxonomy tokens rather than one-off colors or labels.
- Update the canonical JSON first, regenerate the browser copy, and run validation before publishing.
