# Phase Roadmap

## Design System 2.0 — Locked

The BlueGreen Guide rebrand is the approved visual foundation for all current and future phases.

Completed decisions:

- Option B2 landscape mark selected as the core identity direction
- Permanent brand logo separated from activity-specific category icons
- Blue, green, and neutral color semantics established
- BlueGreen Guide Wayfinding System defined
- Cross-device direction established for desktop, tablet, mobile, and watch
- Typography, color, icon, map-marker, and component guidance documented

The brand identity represents water, land, and discovery. It must not be tied to paddleboarding, kayaking, or another single activity.

## Phase 1: Curated Launch Map — Complete POC

Build and refine the static proof of concept.

Current elements:

- Interactive map
- Seed launch data
- Search and filters
- Launch cards
- Difficulty and popularity guidance
- Best time of day
- Launch detail view
- Source and verification fields
- Representative image strategy
- Mobile layout
- BlueGreen Guide Design System 2.0 direction

Remaining maintenance and refinement:

- Apply final brand assets when production-ready logo files are exported
- Align map markers, filters, chips, and icons with the Wayfinding System
- Continue source verification and replace representative images over time
- Improve clustering only where the current map experience requires it

## Phase 2: Place Detail Pages

Make individual places useful enough for real planning.

Potential fields:

- Entry type
- Parking
- Fees
- Restrooms
- Rentals
- Dog policy
- Accessibility
- Hazards
- Official links
- Last verified date

Design-system implication: place pages may include blue-space, green-space, and universal attributes without changing the permanent brand identity.

## Phase 3: Live Conditions and Trip Planning

Help users decide whether today is a good time to go.

Potential integrations:

- Live weather
- Wind speed and direction
- Tide information for coastal locations
- NOAA marine forecasts where relevant
- Water temperature where available
- Sunrise and sunset
- Seasonal access notes
- Simple suitability guidance

Do not present conditions as safety guarantees. Use language such as `Check official source`, `Conditions vary`, or `Needs verification` where appropriate.

## Phase 3.5: Environmental Intelligence

Help users understand when a place is typically at its best.

Potential features:

- Climate normals and seasonal patterns
- Historical wind and precipitation patterns
- Typical morning and afternoon conditions
- Water quality advisories
- Harmful algae bloom notices
- Reservoir or lake-level context
- Air quality, smoke, wildfire, and UV context
- Seasonal closures or restrictions
- Best months to visit
- Location comparison summaries

NASA POWER is a candidate for climate normals and historical context. It should not replace live weather, marine forecasts, tide data, or official advisories.

## Data and Insight Architecture

| Layer | Purpose | Example |
| --- | --- | --- |
| Place Data | Rarely changing location facts | Parking, launch type, restrooms |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | Climate normals, water quality, AQI |
| Derived Insights | App-generated guidance | Best before 10 AM, check wind after noon |

Keep these layers visually and structurally distinct.

## Phase 4: Community Layer

Let the guide improve through responsible user contributions.

Potential features:

- Ratings
- Reviews
- Photos
- Suggested edits
- Favorite places
- Trip notes

## Phase 5: Intelligent Recommendations

Let users describe what they want in natural language.

Example:

> Find somewhere within an hour of Riverside that is beginner-friendly, calm in the morning, dog-friendly, and not too crowded.

Potential features:

- Natural-language search
- Ranked recommendations
- Personalized filters
- Conditions-aware suggestions
- Plain-language suitability signals

## Phase 6: Routes and Ecosystem

Expand beyond individual places.

Potential features:

- Paddle routes
- Hiking and shoreline routes
- Estimated duration
- Trip logging
- Local clubs
- Outfitters
- Lessons
- Shareable trip plans

The Wayfinding System should expand through documented categories rather than one-off icons or colors.
