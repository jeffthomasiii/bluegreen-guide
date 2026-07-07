# Data Model

The current prototype uses `data/launch-points.json` as a lightweight stand-in for a future database.

## Current Launch Point Fields

| Field | Type | Purpose |
|---|---:|---|
| `id` | string | Stable unique identifier |
| `name` | string | Public-facing launch name |
| `region` | string | County, metro, or regional label |
| `state` | string | State abbreviation |
| `lat` | number | Latitude |
| `lng` | number | Longitude |
| `waterType` | string | Bay, harbor, reservoir, river, etc. |
| `activities` | array | SUP, Kayak, Canoe |
| `skillLevel` | string | Beginner, Intermediate, Advanced |
| `difficulty` | number | 1 to 5 difficulty score |
| `popularity` | number | 1 to 5 popularity score |
| `bestTime` | string | Simple best-time note |
| `amenities` | array | Parking, restrooms, rentals, etc. |
| `tags` | array | Searchable condition or experience labels |
| `description` | string | Short practical summary |

## Future Fields

| Field | Type | Notes |
|---|---:|---|
| `entryType` | string | Beach, ramp, dock, marina, shoreline |
| `parkingType` | string | Free, paid, limited, street, permit |
| `fees` | string | Day-use, launch, parking, permit |
| `restrooms` | string | Yes, no, nearby, seasonal |
| `rentals` | string | On-site, nearby, none, unknown |
| `dogsAllowed` | string | Yes, no, leash only, seasonal |
| `windSensitivity` | string | Low, moderate, high |
| `tideImpact` | string | None, low, moderate, high |
| `hazards` | array | Boat traffic, surf launch, cold water, wind, currents |
| `sourceUrls` | array | Official park, marina, city, or outfitter references |
| `photoCredits` | array | Required for any external imagery |
| `lastVerified` | string | Date last reviewed |

## Data Principle

Do not present guessed safety or access information as verified. If a field is uncertain, mark it as `unknown`, omit it, or add a `needsVerification` flag.
