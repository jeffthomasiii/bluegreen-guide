# Mobile and PWA Interface Standard

**Status:** Mobile Shell 2.0 merged; refinement round 1 in review  
**Scope:** Mobile browser and installed PWA only  
**Desktop:** Deferred to a separate design and testing phase

## Purpose

The September 2026 BlueGreen Guide mobile product mockup is the UI/UX composition target, not merely a styling reference.

Mobile work should reproduce the mockup's hierarchy, density, image-led discovery, map-first behavior, and place-detail flow while using only capabilities and data appropriate to the current field-test build.

The static HTML/CSS/JavaScript architecture remains unchanged.

## Approved mobile/PWA direction

- Use the approved Option B2 BlueGreen Guide identity.
- Keep Primary Blue `#176F8F` as the principal interaction color.
- Keep Green Accent `#6F8F63` for land semantics and natural-space accents.
- Use Cormorant Garamond for editorial and place headings; use Inter for functional UI.
- Use real or correctly labeled representative imagery already supported by the place-data/photo strategy.
- Favor image-led discovery, restrained borders, compact cards, soft elevation, and clear hierarchy.
- Keep search and map access prominent.
- Use the mobile bottom navigation: Explore, Map, Nearby, Saved, More.
- Saved and Trips are visual placeholders only in the current field-test build; no data is persisted.
- Present advanced filters in a compact touch-friendly bottom sheet.
- Use blue/green/neutral Wayfinding System semantics consistently; color is never the only cue.
- Keep verification and official-source guidance visible without allowing warnings to dominate the interface.
- Respect safe areas and installed-PWA display behavior.

## Current mobile composition

### Explore

Explore is a discovery page rather than a mobile rendering of the desktop filter rail.

It uses:

1. A condensed, image-led hero with the BlueGreen Guide editorial voice.
2. A rotating set of existing supported place/representative images.
3. Search and a square rounded filter control.
4. Water, Land, and Nearby quick controls on one row.
5. Blue water icon semantics, green land icon semantics, and dark-blue Nearby semantics.
6. A compact `Places to explore` result set designed to expose the first result without requiring an initial scroll on common phone heights.
7. One larger first result followed by compact browse cards.
8. Curated Collections after the initial discovery results.
9. Progressive disclosure instead of rendering a long list of full-size cards.

Amenities is not shown as a quick control until it has a dedicated, meaningful interaction rather than opening the generic filter sheet.

### Map

Map remains the primary spatial discovery surface.

It uses:

- A rounded-rectangle search field with a separate square rounded filter button.
- Compact All, Water, Land, and Near me controls.
- `Search this area` as a rounded rectangle rather than a pill.
- Blue, green, and mixed wayfinding markers.
- A compact selected-place preview anchored above bottom navigation.
- Full place details only after the user chooses `View place details`.

### Place Detail

Place Detail is a dedicated mobile screen rather than an enlarged result card.

It uses:

- A full-width place-specific or correctly labeled representative hero image.
- A back arrow rather than a close X.
- Place name, location/context, and verification status.
- Overview, context-appropriate information, and Nearby tabs.
- Compact Key Details.
- A sticky Get Directions action.
- A visible Save placeholder that does not persist data.
- Official sources and safety-aware planning guidance.

For water/paddle places the second tab may be labeled `Launch Info`. For trail/land contexts it may be labeled `Trail Info`. Otherwise use `Place Info`.

Desktop Place Detail remains on the existing desktop presentation until the separate desktop refinement phase.

### Nearby

Nearby uses the user's approximate device location only after browser permission.

It shows:

- A concise straight-line distance disclaimer.
- The same supported place/representative imagery used elsewhere in the app when available.
- Place name, region/state, place type, and distance.
- Save and More placeholder actions.
- Direct access to full Place Detail.

### Saved

Saved is a visual planning placeholder only.

It includes:

- Saved Places
- My Trips

The current build must clearly state that nothing is stored and no account or persistent planning model has been introduced.

### More

More is the mobile/PWA resource hub.

It currently exposes:

- User Guide
- Quick Start
- Blue + Green Spaces explainer
- Planning Guidance / Launch Suitability
- Documentation home
- Settings placeholder

Public documentation should use a compact mobile/PWA presentation when opened from More.

## Filter behavior

Advanced filters remain available, but the sheet should be less visually dominant than the earlier implementation.

Use:

- a shallower bottom sheet
- compact two-column controls when space allows
- concise actions
- a dimmed but not heavy backdrop

Do not add a dedicated Amenities quick filter until there is a clear amenity-specific interaction.

## PWA update behavior

The service-worker shell cache is versioned whenever shipped UI assets change.

The current refinement uses `bgg-v1.2-shell-v21`.

Already-controlled PWA pages refresh when a newly installed service worker takes control. This helps avoid mixed old-JavaScript/new-CSS states.

Selected documentation pages and the shared documentation stylesheet are included in the app shell for a more coherent installed-PWA experience, but BlueGreen Guide still should not be described as fully offline. Map tiles and external resources remain network-driven.

## Intentionally not added

This refinement does not add:

- Accounts or profile behavior
- Persistent Saved Places
- Persistent Trips
- Journal
- Community ratings or reviews
- Live weather, wind, tides, water quality, or hazards
- AI recommendations
- A framework, backend, or database
- Desktop styling changes

## Real-device review checklist

After the GitHub Pages rebuild completes, verify on a real phone and installed PWA:

- Compact header/logo and safe-area spacing
- Rotating Explore hero imagery
- Explore search/filter geometry
- Water/Land/Nearby quick-control layout and color semantics
- First Explore place visible in the initial viewport
- Compact result-card density
- Curated collection behavior
- Map search/filter geometry
- Search-this-area control
- Marker rendering and selection
- Compact map place preview
- Back-arrow Place Detail flow
- Place hero imagery
- Overview / Info / Nearby tabs
- Get Directions and Save placeholder actions
- Nearby imagery, distance, Save, and More actions
- Saved Places / My Trips placeholder screen
- More resource screen
- Mobile documentation presentation
- Five-item bottom navigation and active-state treatment
- Service-worker v21 refresh behavior
- No horizontal overflow at common phone widths

Automated repository validation is required, but it does not replace device review.
