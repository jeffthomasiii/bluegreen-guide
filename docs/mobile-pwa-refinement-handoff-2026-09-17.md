# Mobile/PWA Refinement Handoff — 2026-09-17

## Current state

BlueGreen Guide remains in the Phase 1 maintenance and field-test stage. Phase 2 is still on hold.

The approved September 2026 mobile mockup is the current UI/UX composition target for mobile browser and installed PWA work.

Two refinement PRs were completed during this pass:

- PR #23 established the initial mobile/PWA visual standard, brand treatment, typography, and service-worker update strategy.
- PR #24 replaced the lighter restyling approach with **Mobile Shell 2.0**, a more structural mobile composition aligned to the approved mockup.

PR #24 is merged to `main`. The GitHub Pages rebuild and real-device review are still pending.

## Mobile Shell 2.0 now in main

### Explore

The intended current composition is:

- Compact BlueGreen Guide app header
- Image-led scenic hero
- Editorial headline
- Search overlapping the hero
- Water, Land, and Amenities quick controls
- Compact `Places to explore` result set
- One larger first place card plus compact browse cards
- Four-result progressive disclosure
- Curated Collections after the initial discovery results

### Map

The intended current composition is:

- Full-height map-first screen
- Compact search and filter control at the top
- All, Water, Land, and Near me quick controls
- `Search this area`
- Existing blue/green/mixed wayfinding markers
- Compact photo-led selected-place preview above bottom navigation
- Expansion from preview into full Place Detail

### Place Detail

The intended current composition is a dedicated mobile detail experience with:

- Place photography
- Place name and context
- Verification status
- Practical planning attributes
- Amenities and planning notes
- Official sources and safety-aware guidance

Explore and Nearby should open full Place Detail directly. Map should first show the compact preview.

### Nearby

The intended current composition is:

- Approximate-device-location guidance
- Image thumbnails when supported by current data
- Semantic fallback thumbnail treatment where imagery is unavailable
- Place name, region/state, place type, and straight-line distance
- Direct access to full Place Detail

### Navigation

The current mobile navigation target is:

- Explore
- Map
- Nearby
- Guide

No Saved Places, Trips, accounts, ratings, reviews, or other future mockup features have been added.

## PWA state

The service-worker app-shell cache is now `bgg-v1.2-shell-v20`.

The PWA registration flow was updated so an already-controlled page reloads when the new service worker takes control. This is intended to reduce the mixed old-JavaScript/new-CSS condition observed after PR #23.

BlueGreen Guide is still not a fully offline app. Leaflet map tiles and external resources remain network-driven.

## What has been verified

Repository validation for PR #24 passed before merge.

The implementation is merged and the repository state is synchronized.

## What has not been verified yet

The Mobile Shell 2.0 interface has **not yet been accepted through real-device visual testing after the production rebuild**.

Do not treat the following as complete until tested on the installed PWA:

- Explore hero composition and image treatment
- Search overlap and quick-filter spacing
- Compact result-card density
- Curated Collection placement
- Map search/filter controls
- Marker selection and compact place preview
- Preview-to-full-detail transition
- Full Place Detail scrolling and hierarchy
- Nearby thumbnail/fallback presentation
- Four-item bottom navigation
- Safe-area handling
- Horizontal overflow
- Service-worker v20 refresh behavior

## Next session

Start with screenshots from the rebuilt installed PWA.

Review in this order:

1. Explore
2. Map
3. Place Detail
4. Nearby
5. PWA refresh/navigation behavior

For each screen, compare the actual phone UI to the approved mockup and separate feedback into:

- layout/composition
- typography and spacing
- imagery
- controls and navigation
- information density
- interaction behavior
- bugs or cache issues

Then create one focused mobile refinement PR for the approved adjustments.

## Scope guardrails

For the next refinement pass:

- Keep desktop deferred.
- Do not start Phase 2.
- Do not add accounts, Saved Places, Trips, Journal, ratings/reviews, live conditions, or AI features.
- Keep the current static HTML/CSS/JavaScript architecture.
- Preserve the approved Option B2 logo, brand palette, typography direction, and BlueGreen Guide Wayfinding System.
- Keep safety, verification, source, and image-status wording grounded in the existing data.
