# Phase Roadmap

## Phase 1: Curated Launch Map

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
- Blue-primary visual identity

Phase 1 is complete as a functional proof of concept. The app has the core user flow in place, but the guide should still be treated as unverified seed data until the follow-up source and photo passes are complete.

Post-Phase 1 cleanup:

- Replace representative images with verified launch-point photos
- Add real source notes for all seed data
- Add more launch-specific safety fields
- Add map clustering if the dataset grows

## Phase 2: Better Place Pages

Goal: Make each location feel useful enough to plan a real outing.

Features:

- Dedicated launch-point detail view
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

## Phase 3: Live Conditions and Trip Planning

Goal: Help users answer: Should I go today?

This phase should focus on current or near-term conditions that can change by the hour or day. These fields should be clearly presented as planning aids, not guarantees of safety.

Features:

- Live weather
- Wind speed and direction
- Tide information for coastal launches
- NOAA marine forecast links where relevant
- Water temperature where available
- Sunrise/sunset timing
- Seasonal access notes
- Simple suitability guidance such as `Good this morning`, `Check conditions`, or `Consider another day`

Important boundary:

- Phase 3 should prioritize live conditions first.
- Do not combine long-term climate normals with live trip guidance until the app can clearly explain the difference between current conditions and historical expectations.
- Avoid making unsupported safety claims. Use language such as `Check official source`, `Conditions vary`, or `Needs verification` when appropriate.

## Phase 3.5: Environmental Intelligence

Goal: Help users answer: When is this place typically at its best?

This phase adds long-term environmental context after live planning data is in place. It should help users compare locations, understand seasonal patterns, and choose better times of year or times of day.

### Climate Intelligence

Potential source: NASA POWER.

NASA POWER should be treated as a supplementary climate and environmental dataset, not as the app's primary live weather source. It is most useful for historical averages, climatology, and seasonal planning context.

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

Example UI direction:

```text
Seasonal Climate

Best Months
May - October

Typical July
High: 79°F
Morning Wind: 5 mph
Rainfall: Very Low

Powered by NASA POWER
```

### Water and Environmental Context

Potential features:

- Water quality advisories where available
- Harmful algae bloom notices where available
- Reservoir or lake level notes where relevant
- Air Quality Index
- Smoke and wildfire impact notices
- UV Index
- Drought context
- Seasonal closures or restrictions

### Derived Insights

Potential outputs:

- Best months to paddle
- Typical morning conditions
- Typical afternoon wind patterns
- Beginner-season recommendations
- Seasonal planning summaries
- Location comparison summaries

Important boundary:

- Environmental Intelligence should explain typical conditions, not promise current safety.
- Live trip recommendations should still rely on current weather, wind, tide, marine forecast, and official advisories.
- Any generated insight should be traceable to its input source or marked as a general planning estimate.

## Data and Insight Architecture

BlueGreen Guide should keep four layers separate as the product grows:

| Layer | Purpose | Example |
| --- | --- | --- |
| Place Data | Rarely changing location facts | Parking, launch type, restrooms |
| Live Data | Current or near-term conditions | Weather, wind, tides |
| Environmental Data | Historical, seasonal, or advisory context | NASA climate normals, water quality, AQI |
| Derived Insights | App-generated guidance from the layers above | Best before 10 AM, good beginner season, check wind after noon |

This separation keeps the app trustworthy and easier to maintain. It also creates a clean foundation for later recommendation features without mixing verified facts, changing conditions, and app-generated guidance.

## Phase 4: Community Layer

Goal: Let the app improve through real paddler feedback.

Features:

- User ratings
- Reviews
- Photo submissions
- Suggested edits
- Report inaccurate information
- Favorite locations
- Trip notes

## Phase 5: Intelligent Recommendations

Goal: Turn the app from a map into a decision helper.

Example request:

> I want somewhere within an hour of Riverside that is beginner-friendly, calm in the morning, dog-friendly, and not too crowded.

Features:

- Natural-language search
- Ranked recommendations
- Personalized filters
- Conditions-aware suggestions
- Saved user preferences
- Blue Conditions Score or similar plain-language suitability signal

The recommendation layer should be built from the data architecture above. It should distinguish between static place facts, live conditions, long-term environmental patterns, and app-generated insights.

## Phase 6: Routes, Clubs, and Ecosystem

Goal: Grow beyond isolated launch points.

Features:

- Suggested paddle routes
- Mileage and estimated duration
- Local clubs and meetups
- Outfitters and lessons
- Trip logging
- Shareable trip plans
