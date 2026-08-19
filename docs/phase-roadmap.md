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

The Launch Suitability Profile maintenance enhancement was completed and merged on 2026-08-14. The runtime map now contains 59 launch records, including separate Crown Point, De Anza Cove, and Sail Bay launch points within Mission Bay while retaining Mission Bay as the broader destination entry.

The profile adds:

- SUP Suitability
- Wind Sensitivity
- Typical Use
- Crowd Sensitivity
- Staging Space
- Assessment Confidence

Difficulty and Best Time remain separate planning signals. The legacy numeric Popularity value is retained internally during migration but is no longer presented as a positive star rating. Typical Use and Crowd Sensitivity communicate crowding more directly.

The implementation was validated through repository checks and a manual spot review of familiar real-world locations. For the sampled locations, SUP Suitability, Staging Space, and Assessment Confidence aligned with known on-the-ground experience. This supports the current methodology as a useful POC planning framework; it does not replace official-source verification or imply complete field verification across all 59 records.

These fields are curated planning guidance. They do not represent live wind, weather, tides, visitor counts, safety guarantees, or official agency ratings. See [Launch Suitability Profile](launch-suitability/) and [Data Model](data-model.md#launch-suitability-profile).

## v1.2: Mobile Readiness and PWA — In Progress

v1.2 improves the existing Phase 1 proof of concept for real phone use without reopening Phase 2 or introducing a new framework, database, account system, or production backend.

### Initial scope

- Add Progressive Web App metadata and installability
- Add a lightweight service worker for app-shell resilience
- Keep map tiles, live network resources, and external source content network-driven rather than implying full offline map support
- Refine the phone layout from a stacked responsive page toward a map-first app experience
- Add mobile navigation or mobile sheets only where they simplify field use
- Preserve existing search, filters, collections, geolocation, place details, validation, and canonical data workflow
- Review accessibility, touch targets, safe-area behavior, and install-state behavior on mobile
- Field-test common tasks on a phone before considering native app packaging

### Explicitly out of scope for v1.2

- Phase 2 structured-place-data expansion
- Accounts or cloud-synced favorites
- Community features
- Live weather, wind, tide, or water-quality integrations
- AI recommendations
- React, React Native, or another framework rewrite
- Capacitor/App Store packaging before the PWA/mobile UX is proven

The preferred progression is PWA foundation first, then mobile UX refinement, then field testing. A later native-app proof can reuse the working web application if store distribution becomes useful.

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

The Launch Suitability Profile does not reopen Phase 2. It is a completed maintenance improvement to the existing launch-discovery experience.

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

Live conditions will supplement—not replace—the existing curated planning guidance. Best Time and Wind Sensitivity describe general place characteristics or planning context, while current weather, wind, tides, forecasts, and advisories will be presented as a separate live-data layer.

Conditions are planning aids, not safety guarantees. See [Data Model](data-model.md#later-data-layers) for the separation between place data, curated guidance, live data, environmental context, and derived insights.

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
