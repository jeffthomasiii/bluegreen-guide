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
| `verificationStatus` | string | Current source-review state, such as `Needs verification` or `Verified` |
| `lastVerified` | string/null | Date the entry was last checked against sources, or `null` when not checked |
| `sourceUrls` | array | Official park, marina, city, tourism, or outfitter references |
| `sourceNotes` | string | Short caution or verification note shown in the detail view |

## Optional Supported Fields

These fields are supported by the app but do not need to be present on every Phase 1 seed record.

| Field | Type | Purpose |
|---|---:|---|
| `photoStatus` | string | `representative` for placeholder photos or `location` for verified launch photos |
| `photoUrls` | array | Photo objects with URL, alt text, credit, credit URL, license, and license URL |
| `photoNotes` | string | Short note explaining whether the image is representative or location-specific |

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
| `photoCredits` | array | Optional normalized credit list if photo metadata is moved out of `photoUrls` |

## Data Principle

Do not present guessed safety or access information as verified. If a field is uncertain, mark it as `unknown`, omit it, or add a `needsVerification` flag.

For Phase 1, seed launch points should default to:

- `verificationStatus`: `Needs verification`
- `lastVerified`: `null`
- `sourceUrls`: `[]`
- `sourceNotes`: a clear reminder to check official sources for access, parking, fees, rentals, rules, tides, wind, and hazards
- `photoStatus`: `representative` until an image is confirmed to show the actual launch point
- `photoUrls`: public or user-provided images with visible credit and license metadata
- `photoNotes`: a clear reminder when the image is not verified as the exact launch point
