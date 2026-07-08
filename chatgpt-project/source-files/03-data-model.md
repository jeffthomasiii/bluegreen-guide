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

## Future Place Fields

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

## Future Conditions Fields

Potential live or near-term planning fields:

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

These fields should be treated as changing conditions, not permanent place facts.

## Future Environmental Intelligence Fields

Potential long-term or seasonal context fields:

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

NASA POWER is a candidate source for climate normals, historical weather averages, and seasonal planning context. It should not replace live weather, marine forecast, tide, or official advisory sources.

## Future Advisory Fields

Potential environmental advisory fields:

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

BlueGreen Guide should keep four layers separate:

| Layer | Purpose | Example |
| --- | --- | --- |
| Place Data | Rarely changing location facts | Parking, launch type, restrooms |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | NASA climate normals, water quality, AQI |
| Derived Insights | App-generated guidance from the layers above | Best before 10 AM, good beginner season, check wind after noon |

Derived insights should be generated from traceable input data. If a recommendation is uncertain, it should use cautious wording instead of sounding definitive.

## Data Rules

Do not treat unverified data as confirmed.

Use `unknown`, `needsVerification`, or source notes when details are uncertain.

Safety, access, fees, rules, and conditions should be verified through official sources whenever possible.

Do not invent verified access, parking, fee, tide, wind, water quality, climate, or hazard details.

Separate static place facts, live conditions, environmental context, and generated insights so users can understand what is verified, what is changing, and what is app-generated guidance.
