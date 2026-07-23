# Phase Roadmap

## Design System 2.0 — Complete

The Option B2 landscape identity, final logo assets, typography, color system, wayfinding icons, markers, and responsive direction are established and applied.

Brand semantics:

- Blue — water places and water activities
- Green — land places and land activities
- Neutral — amenities, services, and universal attributes

The permanent brand identity represents water, land, discovery, and guidance without being tied to one activity.

## Phase 1: Curated Launch Map — Complete POC

**Release:** v1.1.0

Completed scope:

- Static HTML, CSS, and JavaScript app
- Leaflet and OpenStreetMap
- 56 canonical launch records
- Search across names, aliases, regions, water bodies, taxonomy, activities, amenities, tags, and descriptions
- Region, skill, activity, and difficulty filters
- Five curated collections using explicit place IDs
- Map-bounds filtering and geolocation
- Launch cards and responsive place details
- Representative credited images
- Official source links, source-review metadata, and verification notes
- Final Design System 2.0 implementation
- Public HTML documentation
- Canonical data workflow and lightweight validation

Phase 1 is closed as a working proof of concept. Ongoing source checks, field verification, image replacement, defect correction, and future clustering evaluation are maintenance rather than unfinished features.

The current **Best Time**, **Skill Level**, **Difficulty**, and **Popularity** values are curated planning guidance. They help users compare places but do not represent live conditions, guarantees, or measured visitor counts. See [Data Model](data-model.md#rating-and-guidance-semantics) for the meaning of each field.

## Phase 2: Structured Place Details — On Hold

When resumed, begin with a limited pilot using existing places and normalized fields for:

- Entry or launch type
- Access notes
- Parking
- Fees and permits
- Restrooms
- Rentals
- Dog policy
- Accessibility
- Hazards
- Official links
- Last verified date

Do not expand into accounts, community features, live conditions, AI, or a framework rewrite as part of the pilot.

## Phase 3: Live Conditions and Trip Planning

Potential integrations:

- Weather
- Wind speed and direction
- Tide information
- NOAA marine forecast links
- Water temperature
- Sunrise and sunset
- Seasonal access notes
- Plain-language suitability guidance

Live conditions will supplement—not replace—the existing **Best Time** planning guidance. Best Time will continue to describe a location's typical or generally preferred paddling window, while current weather, wind, tides, forecasts, and advisories will be presented as a separate live-data layer.

Conditions are planning aids, not safety guarantees. See [Data Model](data-model.md#later-data-layers) for the separation between place data, live data, environmental context, and derived insights.

## Phase 3.5: Environmental Intelligence

Potential features:

- Climate normals and seasonal patterns
- Typical morning and afternoon conditions
- Water-quality advisories
- Harmful algae bloom notices
- Reservoir or lake-level context
- Air quality, smoke, wildfire, and UV context
- Seasonal closures
- Best months to visit

Keep permanent place facts, live conditions, environmental context, and derived insights structurally distinct.

## Phase 4: Community Layer

Potential features include ratings, reviews, photos, suggested edits, favorites, reports of inaccurate information, and trip notes.

## Phase 5: Intelligent Recommendations

Potential features include natural-language search, ranked recommendations, personalized filters, conditions-aware suggestions, and plain-language suitability signals.

## Phase 6: Routes and Ecosystem

Potential features include paddle routes, hiking and shoreline routes, duration, trip logging, clubs, outfitters, lessons, shareable plans, and broader blue-space and green-space discovery.
