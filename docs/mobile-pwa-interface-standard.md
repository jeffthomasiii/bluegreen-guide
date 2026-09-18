# Mobile and PWA Interface Standard

**Status:** Mobile Shell 2.0 merged to `main`; real-device refinement pending  
**Scope:** Mobile browser and installed PWA only  
**Desktop:** Deferred to a separate design and testing phase

## Purpose

The September 2026 BlueGreen Guide mobile product mockup is the UI/UX composition target, not merely a styling reference.

Mobile implementation should reproduce the mockup's hierarchy, density, image-led discovery, map-first behavior, and place-detail flow while using only capabilities and data that exist in the current BlueGreen Guide proof of concept.

The static HTML/CSS/JavaScript architecture remains unchanged.

## Approved mobile/PWA direction

- Use the approved Option B2 BlueGreen Guide identity.
- Keep Primary Blue `#176F8F` as the principal interaction color.
- Keep Green Accent `#6F8F63` for land semantics and natural-space accents.
- Use Cormorant Garamond for editorial and place headings; use Inter for functional UI.
- Use real or correctly labeled representative imagery already supported by the place-data/photo strategy.
- Favor image-led discovery, restrained borders, compact cards, soft elevation, and clear hierarchy.
- Keep search and map access prominent.
- Use four current destinations in the mobile shell: Explore, Map, Nearby, and Guide.
- Present advanced filters in a touch-friendly bottom sheet.
- Use blue/green/neutral Wayfinding System semantics consistently; color is never the only cue.
- Keep verification and official-source guidance visible without allowing warnings to dominate the interface.
- Respect safe areas and installed-PWA display behavior.

## Mobile Shell 2.0 composition

### Explore

Explore is a discovery page rather than a mobile rendering of the desktop filter rail.

It uses:

1. An image-led hero with the BlueGreen Guide editorial voice.
2. Search overlapping the bottom of the hero.
3. Water, Land, and Amenities quick wayfinding controls.
4. A compact `Places to explore` result set.
5. One larger image-led first result followed by compact browse cards.
6. Curated Collections after the initial discovery results.
7. Progressive disclosure instead of rendering a long list of full-size cards.

### Map

Map remains the primary spatial discovery surface.

It uses:

- Search at the top of the map.
- Compact All, Water, Land, and Near me controls.
- A separate filter button for advanced filters.
- `Search this area` after map movement.
- Blue, green, and mixed wayfinding markers.
- A compact selected-place preview anchored above bottom navigation.
- Full place details only after the user chooses `View place details`.

### Place Detail

Place Detail is a dedicated mobile screen rather than an enlarged result card.

It prioritizes:

- Place photography.
- Place name and location/context.
- Verification status.
- Practical planning attributes.
- Amenities and planning notes.
- Official sources and safety-aware guidance.

Map selection first opens a compact preview. Explore and Nearby open the full place-detail screen directly.

### Nearby

Nearby uses the user's approximate device location only after browser permission.

It shows:

- A concise distance disclaimer.
- Image-led or semantic-fallback place cards.
- Place name, region/state, place type, and straight-line distance.
- Full place details without forcing the user through the Map screen first.

## Existing capabilities intentionally used

Mobile Shell 2.0 reuses the current:

- Search
- Water/Land discovery filtering
- Advanced filters
- Curated collections
- Leaflet/OpenStreetMap map
- Geolocation
- Place photos
- Place details
- Verification/source information
- Public Guide/documentation

## Intentionally not added

The mockup contains future-looking concepts that are not part of this phase:

- Accounts or profile behavior
- Saved Places persistence
- Trips
- Journal
- Community ratings or reviews
- Live weather, wind, tides, water quality, or hazards
- AI recommendations
- A framework, backend, or database
- Desktop styling changes

Desktop refinement remains a separate branch and review phase.

## PWA update behavior

The service-worker shell cache is versioned whenever shipped UI assets change.

Mobile Shell 2.0 also refreshes an already-controlled page when a newly installed service worker takes control. This is intended to avoid a mixed interface where new CSS is displayed with older cached JavaScript.

BlueGreen Guide still should not be described as fully offline. Map tiles and external resources remain network-driven.

## Review checklist

After the GitHub Pages rebuild completes, verify on a real phone and installed PWA:

- Compact header/logo and safe-area spacing
- Hero image and editorial hierarchy
- Search overlap and filter control
- Water, Land, and Amenities quick controls
- Compact Explore cards and four-result progressive disclosure
- Curated collection behavior after the result list
- Map search and quick-filter row
- Search-this-area behavior
- Marker rendering and selection
- Compact map place preview
- Full-screen Place Detail from Explore and Nearby
- Expand-to-detail behavior from Map
- Nearby thumbnails/fallbacks and distance wording
- Four-item bottom navigation including Guide
- Service-worker refresh from the previous shell
- No horizontal overflow at common phone widths

Automated repository validation is required, but it does not replace device review.


## Current handoff state — 2026-09-17

PR #24 merged Mobile Shell 2.0 to `main`. GitHub Pages still needs to rebuild before the new shell can be evaluated on the installed PWA.

The next work session should begin with real-device review rather than new feature work. Capture screenshots of Explore, Map, Place Detail, and Nearby, note visual or interaction mismatches against the approved mockup, and make a tightly scoped follow-up refinement PR.

Do not advance desktop work until the mobile/PWA refinement is accepted.
