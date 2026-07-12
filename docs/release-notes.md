# BlueGreen Guide v1.1.0 Release Notes

**Release name:** Phase 1 Closeout and Design System 2.0  
**Tag:** `v1.1.0`  
**Release type:** Completed curated launch-map proof of concept

## Summary

BlueGreen Guide v1.1.0 closes Phase 1 as a coherent, documented, map-first proof of concept. It brings together the final brand direction, expanded launch collection, curated discovery, official-source review layer, responsive interface, public HTML documentation, canonical data structure, and lightweight validation.

## Highlights

### Curated launch discovery

- 56 canonical launch records across California, Nevada, and Arizona
- Interactive Leaflet and OpenStreetMap map
- Search across names, aliases, regions, water bodies, taxonomy, activities, amenities, tags, and descriptions
- Filters for region, skill, water activity, and maximum difficulty
- Five curated collections using exact place IDs
- Geolocation, fit-to-results, and current-map-view filtering

### Place information

- Launch cards with skill level, water type, difficulty, popularity, best general time, tags, amenities, and verification status
- Responsive place-detail panel
- Official source links and source-review metadata
- Clear `Needs verification` language where material fields remain uncertain
- Credited representative images that do not imply they show the exact launch point

### Brand and documentation

- Final Option B2 landscape identity
- Cormorant Garamond and Inter typography
- Blue, green, and neutral wayfinding semantics
- Final SVG logo and wayfinding icon assets
- Responsive desktop, tablet, and mobile presentation
- Public HTML Documentation Home, Quick Start, Field Guide & User Manual, Release Notes, and Roadmap

### Repository closeout

- Canonical place records in `data/launch-points.json`
- Generated browser data in `data/launch-points.js`
- Curated collection configuration in `data/collections.js`
- Legacy runtime expansion and source-enrichment layers consolidated into canonical records
- Lightweight validation for required fields, IDs, ranges, collection references, generated data, and internal links

## Intentional Limitations

This release remains a proof of concept, not a live conditions or safety service.

Not included:

- Live weather, wind, tides, or water temperature
- Real-time water quality, closures, or hazard alerts
- Accounts, favorites, or personal trip notes
- Ratings, reviews, or community submissions
- AI recommendations
- Fully verified field-level access, fee, parking, amenity, and hazard information for every place

## Safety and verification note

An official source link does not verify every field in a place record. Users should confirm current access, legal launch locations, parking, fees, hours, closures, water quality, weather, wind, tides, vessel traffic, and hazards through official sources before going.

## What comes next

Phase 2 is on hold. When resumed, the recommended next step is a limited structured place-detail pilot using existing locations rather than a broad feature expansion.
