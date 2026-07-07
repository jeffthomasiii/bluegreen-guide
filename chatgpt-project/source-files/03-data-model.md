# Data Model

The current prototype uses `data/launch-points.json`.

## Current Fields

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

## Future Fields

Recommended additions:

- `entryType`
- `parkingType`
- `fees`
- `restrooms`
- `rentals`
- `dogsAllowed`
- `accessibility`
- `windSensitivity`
- `tideImpact`
- `hazards`
- `sourceUrls`
- `photoUrls`
- `photoCredits`
- `lastVerified`
- `needsVerification`

## Data Rules

Do not treat unverified data as confirmed.

Use `unknown`, `needsVerification`, or source notes when details are uncertain.

Safety, access, fees, rules, and conditions should be verified through official sources whenever possible.
