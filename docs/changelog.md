# Changelog

## 2026-09-01 — Documentation State Sync

### Changed

- Current-state documentation now identifies v1.2 as the active mobile/PWA field-test build
- Canonical public URLs now use `bgg.justathoughtblog.org`
- Maintainer instructions now use `data/places.json` and `node scripts/build-place-data-js.js`
- Public guidance is being aligned with Water/Land discovery, mixed places, mobile Explore/Map/Nearby navigation, and Launch Suitability terminology
- Historical v1.1.0 closeout records remain preserved as historical release documentation

## v1.2 — Mobile/PWA and Field-Test Build — Current

### Added

- Progressive Web App metadata and installable app shell
- Service worker with versioned app-shell caching
- Mobile Explore, Map, and Nearby navigation
- Mobile search/filter sheets and map tools
- Responsive filter wrapping and compact mobile controls
- Branded custom domain and alpha/testing entry routes
- Generalized `data/places.json` base dataset
- Green/mixed field-test data layer
- Water and Land discovery filtering with mixed places available through both

### Changed

- The runtime place model expanded beyond launch-only records so parks, reserves, gardens, and mixed blue/green destinations can be tested without changing the permanent brand identity
- Repository validation currently resolves 89 unique active runtime places
- The 10-record green/mixed field-test layer contributes nine net-new places because Diamond Valley Lake overlays an existing stable-ID place
- Generated place-data workflow now uses `node scripts/build-place-data-js.js`
- Map and mobile layouts were refined for on-site testing and touch use
- Search/filter control styling was aligned across Explore and Map views

### Notes

Phase 1 remains complete. v1.2 is a maintenance and validation build used to test mobile usability, the generalized place architecture, blue/green/mixed wayfinding, and a small land-space pilot before Phase 2 resumes.

The field-test pilot does not imply that all access, parking, fees, amenities, photography, coordinates, trail conditions, or hazards have been fully verified. Most records still require source or field verification.

## 2026-08-14 — Launch Suitability Maintenance — Complete

### Added

- Launch Suitability Profile with SUP Suitability, Wind Sensitivity, Typical Use, Crowd Sensitivity, Staging Space, and Assessment Confidence
- Separate Crown Point, De Anza Cove, and Sail Bay launch records within Mission Bay
- Public Launch Suitability Profile documentation
- Runtime validation for the new assessment fields and 59 launch records at that point in development
- Canonical Mission Bay launch data and generated browser data kept separate from suitability enrichment

### Changed

- Launch cards and map popups prioritize SUP suitability, difficulty, wind sensitivity, and typical use
- Place details expose the full Launch Suitability Profile
- User-facing Popularity star ratings were replaced by Typical Use and Crowd Sensitivity; the legacy numeric popularity value remains internally during migration
- Search includes launch aliases, water bodies, and Launch Suitability Profile values
- Mission Bay launch markers use practical shoreline/access locations rather than broad park or neighborhood centroids
- Documentation distinguishes curated place guidance from live wind, weather, tides, visitor counts, and safety information

### Review and validation

- Repository validation passed with 59 launch records and five collections at the time of this maintenance release
- The new suitability ratings received a manual spot review against familiar real-world locations after merge
- SUP Suitability, Staging Space, and Assessment Confidence were specifically reviewed and found consistent with known on-the-ground experience for the sampled locations
- This spot review was a useful product-quality check, but it did not convert all records to officially verified status or replace source-by-source review

### Notes

The profile is curated planning guidance rather than a safety rating or live-condition system. Conditions and use levels vary; users should check current official sources before going.

## v1.1.0 — Phase 1 Closeout and Design System 2.0

### Added

- Final Option B2 logo assets and wayfinding icon sprite
- Blue, green, and neutral wayfinding presentation
- Five curated editorial collections
- Four additional launch records for a total of 56
- Water-body and taxonomy relationships for selected coastal places
- Official-source review metadata and location-specific source links where identified
- Public HTML Quick Start, Release Notes, and Roadmap pages
- Final documentation screenshots
- Canonical data consolidation workflow
- Lightweight repository validation and GitHub Actions checks

### Changed

- Collections filter by explicit place IDs rather than text-query matching
- Search includes aliases, water bodies, and wayfinding taxonomy fields
- Phase 1 status is consistently documented as a complete proof of concept
- Place data, generated browser data, collection configuration, release notes, and roadmap were synchronized for the v1.1.0 closeout
- Responsive app and documentation presentation were refined across desktop, tablet, and mobile layouts

### Removed

- Public links from the documentation website to raw Markdown files
- Legacy runtime expansion and source-enrichment layers after their data was consolidated into canonical records

### Notes

This section intentionally preserves the v1.1.0 historical state. Most records remained marked `Needs verification`. Official links supported planning but did not automatically verify every access, fee, parking, amenity, condition, or hazard field.

## v1.0.0 — Initial Phase 1 Prototype

### Added

- Interactive map-based launch discovery
- Initial curated launch-point dataset
- Search and filter controls
- Launch result cards and detail panel
- Verification and source fields
- Mobile-friendly layout
- Initial documentation landing page, Field Guide, Quick Start, FAQ, and screenshot placeholder system

### Notes

The initial release established the core static proof of concept. The completed Phase 1 state is represented by v1.1.0.
