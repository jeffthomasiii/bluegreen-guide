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

Completed release scope:

- Static HTML, CSS, and JavaScript app
- Leaflet and OpenStreetMap
- 56 canonical launch records at the v1.1.0 closeout
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

Phase 1 is closed as a working proof of concept. Ongoing source checks, field verification, image replacement, defect correction, data refinement, and future clustering evaluation are maintenance rather than unfinished features.

### Post-v1.1.0 Maintenance — Launch Suitability Profile Complete

The Launch Suitability Profile maintenance enhancement was completed and merged on 2026-08-14. It introduced separate Mission Bay launch records and added:

- SUP Suitability
- Wind Sensitivity
- Typical Use
- Crowd Sensitivity
- Staging Space
- Assessment Confidence

Difficulty and Best Time remain separate planning signals. The legacy numeric Popularity value is retained internally during migration but is no longer presented as a positive star rating. Typical Use and Crowd Sensitivity communicate crowding more directly.

These fields are curated planning guidance. They do not represent live wind, weather, tides, visitor counts, safety guarantees, or official agency ratings. See [Launch Suitability Profile](launch-suitability/) and [Data Model](data-model.md#paddle-suitability-profile).

## v1.2: Mobile/PWA Field-Test Build — Current

v1.2 prepares the existing Phase 1 proof of concept for real phone and on-site use without reopening Phase 2 or introducing a framework, database, account system, or production backend.

Completed/current v1.2 scope includes:

- Progressive Web App metadata and installability
- Lightweight service worker for app-shell resilience
- Map tiles, external sources, and changing network resources remain network-driven rather than implying full offline map support
- Mobile Explore, Map, and Nearby navigation
- Mobile search/filter sheets and compact map-first controls
- Responsive filter wrapping and touch-friendly controls
- Preserved search, collections, geolocation, place details, and validation
- Generalized base place data in `data/places.json`
- A deliberately small green/mixed field-test pilot
- Water and Land discovery filters, with mixed places discoverable through both
- Current runtime validation resolving 89 unique active places
- Custom public domain and branded alpha/testing entry routes

### Current field-test pilot

The field-test layer contains 10 records: four mixed blue/green destinations and six green-space destinations. One record, Diamond Valley Lake, overlays the existing stable-ID place rather than creating a duplicate, so the pilot contributes nine net-new runtime places.

This pilot tests whether the current BlueGreen architecture, taxonomy, wayfinding, mobile UX, and place model work beyond paddle-only discovery. It is maintenance/validation work, not the start of Phase 2.

Field testing should focus on:

- Mobile usability in real outdoor planning contexts
- Water/Land/mixed discovery semantics
- Search and filter usefulness
- Practical visitor, launch, shoreline, and trail-access marker placement
- Place-card and detail clarity
- Launch Suitability usefulness for paddle-relevant places
- Source and verification wording
- Representative imagery and photography gaps
- Defects or confusing interactions that should be corrected before expanding scope

### Explicitly out of scope for v1.2

- Phase 2 structured-place-data expansion across the full dataset
- Accounts or cloud-synced favorites
- Community features
- Live weather, wind, tide, or water-quality integrations
- AI recommendations
- React, React Native, or another framework rewrite
- Capacitor/App Store packaging before the PWA/mobile UX is proven

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

The Launch Suitability Profile and current green/mixed field-test pilot do not reopen Phase 2. They are maintenance improvements used to validate the existing architecture and identify what the structured place model actually needs.

Do not expand into accounts, community features, live conditions, AI, or a framework rewrite as part of the Phase 2 pilot.

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

Live conditions will supplement—not replace—the existing curated planning guidance. Best Time and Wind Sensitivity describe general place characteristics or planning context, while current weather, wind, tides, forecasts, and advisories will be presented as a separate live-data layer.

Conditions are planning aids, not safety guarantees.

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

Keep permanent place facts, curated guidance, live conditions, environmental context, and derived insights structurally distinct.

## Phase 4: Community Layer

Potential features include ratings, reviews, photos, suggested edits, favorites, reports of inaccurate information, and trip notes.

## Phase 5: Intelligent Recommendations

Potential features include natural-language search, ranked recommendations, personalized filters, conditions-aware suggestions, and plain-language suitability signals.

## Phase 6: Routes and Ecosystem

Potential features include paddle routes, hiking and shoreline routes, duration, trip logging, clubs, outfitters, lessons, shareable plans, and broader blue-space and green-space discovery.
