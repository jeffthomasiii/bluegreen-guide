# Premium Interface Refinement

**Status:** Implementation pass in review  
**Design system:** BlueGreen Guide Design System 2.0 remains authoritative

## Purpose

This refinement brings the working BlueGreen Guide PWA closer to the approved premium product mockup without replacing the current product architecture or reopening Phase 2.

The goal is a more polished, editorial, outdoor-oriented interface while preserving the practical map-first proof of concept.

## What changes

The refinement focuses on presentation rather than product scope:

- More generous spacing and stronger visual hierarchy
- Premium panel and card treatment with restrained shadows and softer borders
- More deliberate use of Cormorant Garamond for editorial/place headings
- Inter remains the functional UI typeface
- Deep blue remains the primary product/action color
- Green remains the secondary land/natural-space accent
- Blue/green/neutral wayfinding semantics remain unchanged
- Desktop map and sidebar are presented as coordinated product surfaces rather than edge-to-edge utility panes
- Mobile Explore, Map, and Nearby keep the existing navigation model but adopt the same premium surface language
- Place cards and place-detail sheets receive a more editorial presentation while retaining verification and source information

## What does not change

This is not a brand replacement or feature expansion.

The following remain unchanged:

- Approved Option B2 landscape identity
- `Discover Better Outdoors` tagline
- Existing approved palette and semantic wayfinding rules
- Static HTML/CSS/JavaScript architecture
- Leaflet/OpenStreetMap map implementation
- Current place-data layers and validation model
- Search, filters, collections, geolocation, place details, and source-review behavior
- Safety-aware verification language

## Mockup elements intentionally deferred

The concept mockup includes several future-looking product ideas. They are not part of this styling pass unless separately approved through the roadmap:

- User accounts/profile system
- Saved Places persistence
- Trips
- Journal
- Community ratings/reviews
- Production-grade Field Guide content expansion
- New live conditions or environmental integrations

The mockup is therefore treated as a visual-direction reference rather than a literal feature specification.

## Implementation approach

The current implementation uses `premium-refresh.css` as a final visual layer after the existing CSS stack. This keeps the refinement incremental and easy to compare or roll back while the design is tested on desktop, tablet, and mobile.

The PWA service-worker cache must be bumped when this shipped visual layer changes so installed field-test builds do not remain on older styling.
