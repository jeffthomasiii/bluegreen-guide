# Changelog

## Unreleased — Launch Suitability Maintenance

### Added

- Launch Suitability Profile with SUP Suitability, Wind Sensitivity, Typical Use, Crowd Sensitivity, Staging Space, and Assessment Confidence
- Separate Crown Point, De Anza Cove, and Sail Bay launch records within Mission Bay
- Public Launch Suitability Profile documentation
- Runtime validation for the new assessment fields and 59 launch records

### Changed

- Launch cards and map popups now prioritize SUP suitability, difficulty, wind sensitivity, and typical use
- Place details now expose the full Launch Suitability Profile
- User-facing Popularity star ratings are replaced by Typical Use and Crowd Sensitivity; the legacy numeric popularity value remains internally during migration
- Search includes launch aliases, water bodies, and Launch Suitability Profile values
- Documentation now distinguishes curated place guidance from live wind, weather, tides, visitor counts, and safety information

### Notes

The profile is curated planning guidance rather than a safety rating or live-condition system. Existing launch records receive a consistent seeded assessment with moderate confidence unless a more specific assessment is documented. Crown Point, De Anza Cove, and Sail Bay received a location-specific official-source review on 2026-08-13. Conditions and use levels vary; users should check current official sources before going.

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

- Collections now filter by explicit place IDs rather than text-query matching
- Search now includes aliases, water bodies, and wayfinding taxonomy fields
- Phase 1 status is consistently documented as a complete proof of concept
- Place data, generated browser data, collection configuration, release notes, and roadmap are synchronized
- Responsive app and documentation presentation refined across desktop, tablet, and mobile layouts

### Removed

- Public links from the documentation website to raw Markdown files
- Legacy runtime expansion and source-enrichment layers after their data was consolidated into canonical records

### Notes

Most records remain marked `Needs verification`. Official links support planning but do not automatically verify every access, fee, parking, amenity, condition, or hazard field.

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
