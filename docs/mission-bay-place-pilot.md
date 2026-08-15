# Mission Bay BlueGreen Destination Pilot

## Purpose

Mission Bay is the first BlueGreen Guide destination represented as a group of distinct blue spaces, green spaces, mixed shoreline places, wildlife areas, and paddle/boating access points rather than one aggregate launch record.

The pilot keeps the existing static HTML/CSS/JavaScript architecture and does not add accounts, a database, live conditions, community features, or AI.

## Data approach

Mission Bay pilot records remain in `data/mission-bay-launch-points.json` during this compatibility phase. The filename is legacy; the file now contains general places as well as paddle launches.

New structured fields used by the pilot:

- `spaceType`: `blue`, `green`, or `mixed`
- `placeTypes`: structured place categories such as `beach`, `park`, `wetland`, `wildlife-area`, `paddle-launch`, or `boat-launch`
- `activityTypes`: structured activities for the place
- `amenityTypes`: structured amenity labels
- `attributeTypes`: universal attributes such as scenic-view
- `paddleRelevant`: whether paddle-specific planning fields apply

Paddle-specific fields such as `skillLevel`, `difficulty`, `supSuitability`, `windSensitivity`, and `stagingSpace` are required only when `paddleRelevant` is true.

## Destination replacement

The legacy aggregate `mission-bay` record remains in the base JSON temporarily for backward compatibility, but it is removed from the active runtime list when the Mission Bay pilot dataset loads. Curated collections now point to specific Mission Bay places instead of the aggregate record.

## Initial Mission Bay place set

The pilot includes distinct records for Crown Point, De Anza Cove, Sail Bay / Fanuel Park, Mission Point, Bonita Cove, Ventura Cove, Ski Beach, Fiesta Island, Enchanted Cove, South Shores Park, Santa Clara Point / San Juan Cove, Dana Landing, Mariner's Point, Hospitality Point, Sunset Point, Playa Pacifica, Tecolote Shores, Vacation Isle, Kendall-Frost Reserve & Northern Wildlife Preserve, Tecolote Creek, Southern Wildlife Preserve, Famosa Slough Wildlife Preserve, Perez Cove, Bahia Point, and Model Yacht Pond.

## Source policy

Primary research for this pilot uses official City of San Diego Mission Bay park, beach, boating, facility, and wildlife-preserve pages, plus the County of San Diego beach and bay water-quality site.

Static place information is kept separate from live conditions. Records use `Needs verification` where access, current rules, map-marker precision, or other trip-specific details are not fully confirmed. Approximate map placement must not be treated as turn-by-turn navigation.

## UI behavior

- Paddle launches retain blue water markers and paddle suitability information.
- Blue-only places use a blue circular marker.
- Green-only places use a green rounded-square marker.
- Mixed blue-green places use a combined blue/green marker treatment.
- Non-paddle places do not display SUP difficulty, wind sensitivity, or staging ratings.
- Existing paddle filters only constrain records where those paddle fields are applicable.

## Next review

Before treating this pilot as the general place model for the entire app, review:

1. Marker placement against official maps.
2. Which Mission Bay shoreline records should additionally be verified as hand-launch points.
3. Whether `data/launch-points.json` and `data/mission-bay-launch-points.json` should be migrated to a single `data/places.json` file.
4. Whether general place/activity filters should replace the current paddle-oriented filter set in the next structured-place phase.
