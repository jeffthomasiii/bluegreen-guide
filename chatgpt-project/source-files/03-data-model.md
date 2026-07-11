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

## Wayfinding Taxonomy

The design system separates what a place **is**, what a user can **do**, and what characteristics or services the place **has**.

Recommended future fields:

- `spaceType`: `blue`, `green`, `mixed`, or `universal`
- `placeTypes`: place categories such as `lake`, `harbor`, `park`, `trail`, or `campground`
- `activityTypes`: activities such as `paddle-launch`, `kayak-launch`, `hiking`, or `fishing`
- `amenityTypes`: services or facilities such as `parking`, `restrooms`, `rentals`, or `picnic-table`
- `attributeTypes`: descriptive qualities such as `dog-friendly`, `accessible`, `scenic-view`, or `beginner-friendly`
- `wayfindingIcon`: approved icon token from the Wayfinding System
- `markerStyle`: approved map-marker token

### Color semantics

- `blue` — water places and water activities
- `green` — land places and land activities
- `neutral` — amenities and universal attributes
- `mixed` — a place containing meaningful blue-space and green-space experiences; the UI should show the relevant categories rather than inventing a fourth permanent brand color

Color is a supporting cue, not the only source of meaning. Icons should remain understandable through shape and labels.

Example:

```json
{
  "spaceType": "blue",
  "placeTypes": ["harbor"],
  "activityTypes": ["paddle-launch", "kayak-launch"],
  "amenityTypes": ["parking", "restrooms", "rentals"],
  "attributeTypes": ["beginner-friendly", "scenic-view"],
  "wayfindingIcon": "paddle-launch",
  "markerStyle": "blue-place"
}
```

## Future Place Fields

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

## Future Conditions Fields

- `currentWeather`
- `forecastSummary`
- `windSpeed`
- `windDirection`
- `windGusts`
- `tideStatus`
- `nextHighTide`
- `nextLowTide`
- `marineForecastUrl`
- `waterTemperature`
- `sunrise`
- `sunset`
- `conditionsSourceUrls`
- `conditionsUpdatedAt`

These fields describe changing conditions, not permanent place facts.

## Future Environmental Intelligence Fields

- `averageMonthlyTemperature`
- `averageMonthlyWind`
- `averageMonthlyPrecipitation`
- `averageCloudCover`
- `averageSunshine`
- `typicalMorningConditions`
- `typicalAfternoonConditions`
- `bestMonths`
- `seasonalSummary`
- `climateSourceUrls`
- `climateDataUpdatedAt`

NASA POWER is a candidate source for climate normals and seasonal context. It should not replace current weather, marine forecasts, tides, or official advisories.

## Future Advisory Fields

- `waterQualityStatus`
- `waterQualitySourceUrl`
- `algaeBloomStatus`
- `reservoirLevelStatus`
- `airQualityIndex`
- `smokeImpact`
- `uvIndex`
- `seasonalClosureStatus`
- `advisoryUpdatedAt`

## Data and Insight Layers

| Layer | Purpose | Example |
| --- | --- | --- |
| Place Data | Rarely changing location facts | Parking, launch type, restrooms |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, good beginner season |

## Data Rules

- Do not treat unverified data as confirmed.
- Use `unknown`, `needsVerification`, or source notes when details are uncertain.
- Verify safety, access, fees, rules, and conditions through official sources whenever possible.
- Do not invent verified access, parking, fees, tides, wind, water quality, climate, or hazard details.
- Keep static facts, live conditions, environmental context, and generated insights separate.
- Use approved Wayfinding System tokens instead of hard-coded icon names or arbitrary colors.
