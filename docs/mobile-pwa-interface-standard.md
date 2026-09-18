# Mobile and PWA Interface Standard

**Status:** Approved direction, implementation in review  
**Scope:** Mobile browser and installed PWA only  
**Desktop:** Deferred to a separate design and testing phase

## Purpose

The September 2026 BlueGreen Guide product mockup is the visual reference for the next UI/UX refinement. The implementation should carry its design principles into the working product without treating every future-looking mockup element as an approved feature.

This pass intentionally keeps the existing static architecture and current Phase 1 feature set.

## Approved mobile/PWA direction

- Use the approved Option B2 BlueGreen Guide identity.
- Keep Primary Blue `#176F8F` as the principal interaction color.
- Keep Green Accent `#6F8F63` for land semantics and natural-space accents.
- Use Cormorant Garamond for editorial/place headings and Inter for functional UI.
- Favor image-led place cards, restrained borders, soft elevation, and generous but efficient spacing.
- Keep search and map access prominent.
- Keep Explore, Map, and Nearby as the current mobile navigation model.
- Present filters as touch-friendly controls and sheets rather than dense desktop-style forms.
- Use the blue/green/neutral Wayfinding System consistently; color is never the only cue.
- Make verification and official-source guidance visible without turning the interface into a warning-heavy experience.
- Respect safe areas and standalone PWA display behavior.

## Current implementation

The mobile/PWA refinement is implemented as a final mobile-only stylesheet, `mobile-pwa-standard.css`, loaded after the existing responsive layers.

A small semantic Explore introduction is added by `mobile-compact.js` to establish the editorial hierarchy shown in the approved mockup:

- Discover Better Outdoors
- Explore the outdoors with confidence
- Real places. Practical guidance. Check details before you go.

The service-worker shell cache is versioned so installed field-test builds receive the new interface assets.

## Intentionally unchanged

This mobile/PWA pass does not add:

- Accounts or profile behavior
- Saved Places persistence
- Trips or Journal
- Community ratings or reviews
- Live weather, wind, tides, water quality, or hazards
- AI recommendations
- A framework, backend, or database
- Desktop styling changes

Desktop refinement should be handled in a separate branch and review phase when desktop testing is available.

## Review checklist

Before merge, verify on a real phone or installed PWA:

- Header/logo clarity and safe-area spacing
- Explore editorial hierarchy
- Search and filter controls
- Water, Land, and Amenities wayfinding controls
- Curated collection wrapping
- Place-card readability and tap targets
- Map search/filter placement
- Search-this-area behavior
- Marker selection and place-detail sheet
- Nearby flow and geolocation fallback wording
- Bottom navigation active state
- PWA refresh after the service-worker cache update
- No horizontal overflow at common phone widths

Automated validation remains required, but it does not replace device review.
