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
- Curated collections continue to filter the generalized place list.
- Dense secondary Mission Bay features are progressively revealed at closer zoom levels instead of stacking markers at normal overview zooms. Vacation Isle is revealed at zoom 16; Tecolote Creek, Perez Cove, Model Yacht Pond, and Enchanted Cove are revealed at zoom 15. Their records remain searchable and visible in results at all zoom levels, and selecting one zooms the map close enough to reveal its marker.

## Visual QA outcome

A pre-merge QA pass identified and fixed two implementation blockers:

1. `ui-refresh.js` was loading after the Mission Bay pilot renderer and replacing its generalized filtering/marker behavior with the older launch-only logic. The load order is now explicit: the UI decoration layer loads first and `mission-bay-place-pilot.js` remains the authoritative final renderer.
2. Dense Mission Bay sub-features produced overlapping markers at common overview zoom levels. The pilot now uses zoom-based marker decluttering rather than changing or inventing coordinates.

A dedicated `scripts/validate-mission-bay-pilot.js` regression check protects the renderer load order, non-paddle-safe filters, collection compatibility, and zoom-based decluttering behavior.

## Hand-launch verification outcome

No additional non-paddle shoreline record was promoted to a verified hand-launch point during this QA pass. Ski Beach, South Shores Park, and Dana Landing remain boating-access records rather than SUP/kayak launch records because the current official sources establish formal boat-launch access but do not, by themselves, verify a desirable or appropriate hand-launch experience for paddleboards or kayaks. Fiesta Island also remains a general shoreline/open-space record pending verification of a specific public hand-launch location.

## Next review

Before treating this pilot as the general place model for the entire app, review:

1. Marker placement against official maps as higher-confidence coordinates become available.
2. Whether Ski Beach, South Shores Park, Dana Landing, Fiesta Island, or other shoreline records can later be verified as specific nonmotorized hand-launch points.
3. Whether `data/launch-points.json` and `data/mission-bay-launch-points.json` should be migrated to a single `data/places.json` file.
4. Whether general place/activity filters should replace the current paddle-oriented filter set in the next structured-place phase.
