# Mobile/PWA Refinement Handoff — 2026-09-17

## Session checkpoint — end of 2026-09-18

BlueGreen Guide remains in the Phase 1 maintenance and field-test stage. Phase 2 is still intentionally on hold.

The approved September 2026 mobile mockup remains the composition and visual-reference target for the mobile browser and installed PWA.

This document is the working handoff for the next BlueGreen Guide session. Historical implementation detail is preserved in `docs/changelog.md`.

## Where the mobile/PWA stands now

The installed PWA has been reviewed repeatedly on a real Android phone after production merges. The current shell is stable enough to stop feature work for the night.

### Navigation

The accepted mobile navigation is:

- Explore
- Map
- Nearby
- Saved
- More

### Saved Places

Saved Places is no longer a placeholder.

Current behavior:

- Save/unsave from Nearby.
- Save/unsave from Place Detail.
- Saved state stays synchronized across supported mobile surfaces.
- Saved place IDs persist locally on the device.
- Saved cards open Place Detail.
- Saved cards expose a compact secondary-actions menu.
- Remove actions provide an Undo toast.

There is no account, cloud sync, or backend.

### My Trips

My Trips is now functional as a local-first planning feature.

Current behavior:

- Create a named trip.
- Optional start/end dates.
- Optional notes.
- Add a place to an existing trip.
- Create a new trip directly from a place.
- Open places from a trip.
- Reorder places with simple up/down controls.
- Remove places.
- Delete trips.

Trip data persists locally on the current device only.

### Nearby place actions

The three-dot place action menu is functional.

Available actions include:

- View place details
- Add to Trip
- Open in Maps
- Share place
- Open an official source when one is available

The bookmark remains the primary one-tap Save action.

### Settings

Settings is now functional and visually accepted for this stage.

Current controls:

- Use device location
- Miles / Kilometers
- Saved Places count
- Trips count
- Clear Saved Places
- Clear Trips
- Reset local app data

The compact switch and radio controls were corrected after real-device review.

### More

More is the mobile/PWA resource hub.

Current cards:

- User Guide
- Quick Start
- Blue + Green Spaces
- Planning Guidance
- Documentation
- Settings

The More-card layout was refined against the approved mockup:

- white cards
- standalone teal line icons
- icons positioned toward the upper-left
- title/subtitle anchored toward the lower-left
- reduced excess whitespace
- final icon target: 56px on standard mobile widths and 52px on narrow phones

The current More screen is accepted for now.

## PWA update behavior

The current app-shell cache is `bgg-v1.2-shell-v28`.

The mobile planning stylesheet is loaded as:

`mobile-planning.css?v=28`

A stale-style problem was found during the More-icon refinement. The service worker was updated so same-origin CSS, JavaScript, and manifest requests use network-first behavior with cached fallback. Other same-origin assets retain the existing cache behavior.

This change is important: future UI refinements should not require repeated CSS-value changes simply to overcome a stale installed-PWA asset.

BlueGreen Guide is still not a fully offline app. Leaflet tiles and other external resources remain network-driven.

## PRs completed in this session

The following work is merged to `main`:

- PR #28 — local Saved Places, Trips, Nearby actions, and Settings
- PR #29 — initial visual refinement for More, Settings controls, and saved-place actions
- PR #30 — mockup alignment for More cards and corrected Settings controls
- PR #31 — increased More icon scale
- PR #32 — fixed PWA static-asset refresh behavior
- PR #33 — final More icon scale increase and v28 cache-busting

## What is accepted for now

The following can be treated as settled enough to move forward:

- five-item bottom navigation
- functional Saved Places
- functional local Trips
- Nearby bookmark and overflow actions
- Settings behavior and control sizing
- More card composition and icon scale
- PWA static-asset refresh strategy

Do not keep iterating on these without new device feedback that identifies a specific issue.

## Next session

Start with **documentation**, not another feature pass.

### Step 1 — documentation cleanup and refinement

Bring public and repository documentation into alignment with the actual current build.

Important stale statements to remove or revise include references to:

- Saved Places being a placeholder
- My Trips being a placeholder
- Save being non-persistent
- Settings being a placeholder
- older four-item navigation
- older service-worker versions
- older mobile-refinement status

Review at minimum:

- `README.md`
- `docs/index.html`
- `docs/user-guide/`
- `docs/quick-start/`
- `docs/release-notes/`
- `docs/roadmap/`
- `docs/mobile-pwa-interface-standard.md`
- `docs/changelog.md`

Documentation should clearly state that Saved Places and Trips are **device-local**, not account/cloud features.

### Step 2 — holistic UX/UI refinement

After the documentation is synchronized, review the mobile/PWA as one product rather than screen-by-screen patches.

Review these surfaces together:

1. Explore
2. Map
3. Nearby
4. Saved Places
5. My Trips
6. More
7. Settings
8. Place Detail

Compare each against the approved mockup and the now-established BlueGreen visual language.

Focus on:

- spacing rhythm
- typography hierarchy
- card proportions
- image treatment
- control geometry
- icon scale and consistency
- bottom-sheet behavior
- active states
- empty states
- transitions
- information density
- cross-screen consistency

The goal is refinement and consistency, not new feature expansion.

## Scope guardrails for the next session

- Keep desktop refinement deferred.
- Do not start Phase 2.
- Do not add accounts or cloud synchronization.
- Do not add ratings/reviews, live conditions, or AI features during the UX/UI refinement pass.
- Keep the static HTML/CSS/JavaScript architecture.
- Preserve the approved Option B2 identity, brand palette, typography direction, and Wayfinding System.
- Keep safety, verification, source, and image-status wording grounded in the existing data.
- Saved Places and Trips remain local-first/device-local unless a future phase explicitly changes the architecture.
