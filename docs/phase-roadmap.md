# Phase Roadmap

## Design System 2.0 — Complete

The approved BlueGreen Guide rebrand is now the visual foundation for all phases.

Completed decisions:

- Option B2 landscape mark selected
- Permanent brand logo separated from activity-specific icons
- Blue, green, and neutral wayfinding semantics established
- Cross-device direction documented for desktop, tablet, mobile, and watch
- Typography, color, icon, marker, photography, and component guidance documented

The brand represents water, land, discovery, and guidance. It is not tied to paddleboarding, kayaking, or another single activity.

## Phase 1: Curated Launch Map — Complete POC

Goal: Build a working map-based proof of concept.

Included now:

- Static web app
- OpenStreetMap/Leaflet map
- 52 seed launch points
- Search and filters
- Launch cards
- Launch detail view with verification status and source links
- Difficulty, popularity, and best-time data
- Mobile-friendly layout
- Credited representative images for Phase 1 photo placeholders
- BlueGreen Guide Design System 2.0 direction

Phase 1 is complete as a functional proof of concept. The guide should still be treated as seed data until the follow-up source and photo passes are complete.

Post-Phase 1 cleanup:

- Apply final exported Option B2 logo assets
- Align markers, filters, chips, and icons with the Wayfinding System
- Replace representative images with verified place photos
- Add real source notes for all seed data
- Add more place-specific safety fields
- Add map clustering if the dataset grows

## Phase 2: Better Place Pages

Goal: Make each location useful enough to plan a real outing.

Features:

- Dedicated place detail views
- Multiple photos per location
- Parking details
- Fees and permit notes
- Restroom availability
- Rentals and outfitter links
- Dog-friendly notes
- Accessibility notes
- Hazards and safety considerations
- Official links
- Source citations
- Last verified date

Place pages may combine blue-space, green-space, and neutral attributes without changing the permanent brand identity.

## Phase 3: Live Conditions and Trip Planning

Goal: Help users answer: Should I go today?

Features:

- Live weather
- Wind speed and direction
- Tide information for coastal locations
- NOAA marine forecast links where relevant
- Water temperature where available
- Sunrise and sunset timing
- Seasonal access notes
- Simple suitability guidance

Use conditions as planning aids, not safety guarantees. Prefer language such as `Check official source`, `Conditions vary`, or `Needs verification`.

## Phase 3.5: Environmental Intelligence

Goal: Help users answer: When is this place typically at its best?

Potential features:

- Climate normals and historical patterns
- Typical morning and afternoon conditions
- Water-quality advisories
- Harmful algae bloom notices
- Reservoir or lake-level context
- Air quality, smoke, wildfire, and UV context
- Seasonal closures or restrictions
- Best months to visit
- Location comparison summaries

NASA POWER is a candidate for climate normals and seasonal context. It should not replace live weather, marine forecasts, tide data, or official advisories.

## Data and Insight Architecture

| Layer | Purpose | Example |
| --- | --- | --- |
| Place Data | Rarely changing location facts | Parking, launch type, restrooms |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, check wind after noon |

Keep these layers visually and structurally distinct.

## Phase 4: Community Layer

Goal: Let the guide improve through responsible user contributions.

Features:

- Ratings
- Reviews
- Photo submissions
- Suggested edits
- Report inaccurate information
- Favorite places
- Trip notes

## Phase 5: Intelligent Recommendations

Goal: Turn the guide from a map into a decision helper.

Example:

> Find somewhere within an hour of Riverside that is beginner-friendly, calm in the morning, dog-friendly, and not too crowded.

Features:

- Natural-language search
- Ranked recommendations
- Personalized filters
- Conditions-aware suggestions
- Saved preferences
- Plain-language suitability signals

## Phase 6: Routes and Ecosystem

Goal: Grow beyond isolated places.

Features:

- Paddle routes
- Hiking and shoreline routes
- Mileage and estimated duration
- Local clubs and meetups
- Outfitters and lessons
- Trip logging
- Shareable trip plans

The Wayfinding System should expand through documented categories rather than one-off icons or colors.
