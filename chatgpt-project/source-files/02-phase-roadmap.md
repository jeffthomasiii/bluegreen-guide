# Phase Roadmap

## Phase 1: Curated Launch Map

Build and refine the static proof of concept.

Current elements:

- Map
- Seed launch data
- Search
- Filters
- Launch cards
- Difficulty
- Popularity
- Best time of day
- Blue-primary visual identity

Next Phase 1 refinements:

- Improve mobile layout
- Add real image strategy
- Add source and verification fields
- Add launch detail view
- Clean up map markers and clustering if needed

## Phase 2: Place Detail Pages

Make individual launch points useful enough for real planning.

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

## Phase 3: Live Conditions and Trip Planning

Help users decide whether today is a good time to go.

Potential integrations:

- Live weather
- Wind speed and direction
- Tide information for coastal launches
- NOAA marine forecasts where relevant
- Water temperature where available
- Sunrise/sunset
- Seasonal access notes
- Simple suitability guidance

Phase 3 should focus on current or near-term conditions. Do not present these as safety guarantees. Use cautionary language such as `Check official source`, `Conditions vary`, or `Needs verification` where appropriate.

## Phase 3.5: Environmental Intelligence

Help users understand when a place is typically at its best.

This phase should add longer-term environmental context after live conditions are in place. It should support seasonal planning, location comparison, and practical outdoor decision-making.

### Climate Intelligence

NASA POWER is a strong candidate for this layer.

Use NASA POWER for climate normals, historical patterns, and seasonal context. Do not use it as the primary source for current paddle conditions.

Potential features:

- Average monthly air temperature
- Historical wind patterns
- Average precipitation
- Cloud cover
- Sunshine or solar exposure patterns
- Seasonal climate summaries
- Best months to visit
- Typical morning versus afternoon conditions
- Climate comparison between launch sites

### Water and Environmental Context

Potential features:

- Water quality advisories
- Harmful algae bloom notices
- Reservoir or lake level notes
- Air Quality Index
- Smoke and wildfire impacts
- UV Index
- Drought context
- Seasonal closures or restrictions

### Derived Insights

Potential features:

- Best months to paddle
- Typical morning conditions
- Typical afternoon wind patterns
- Beginner-season recommendations
- Seasonal planning summaries
- Location comparison summaries

## Data and Insight Architecture

BlueGreen Guide should keep four layers separate:

| Layer | Purpose | Example |
| --- | --- | --- |
| Place Data | Rarely changing location facts | Parking, launch type, restrooms |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | NASA climate normals, water quality, AQI |
| Derived Insights | App-generated guidance from the layers above | Best before 10 AM, good beginner season, check wind after noon |

This prevents the app from mixing verified facts, changing conditions, historical expectations, and generated recommendations.

## Phase 4: Community Layer

Let the app improve from users.

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
- Blue Conditions Score or similar plain-language suitability signal

## Phase 6: Routes and Ecosystem

Expand beyond launch points.

Potential features:

- Paddle routes
- Estimated duration
- Trip logging
- Local clubs
- Outfitters
- Lessons
- Shareable trip plans
